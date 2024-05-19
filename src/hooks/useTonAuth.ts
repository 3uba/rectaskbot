import { useContext, useEffect, useRef } from "react";
import { useIsConnectionRestored, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import axios from "axios";
import Cookies from "universal-cookie";
import { AuthContext } from "../store/AuthContext";

const AUTH_COOKIE = 'jwt';
const TOKEN_TTL = 1000 * 60 * 20;

interface AuthenticateResponse {
    ok: boolean;
    token?: string;
    error?: string;
}

export function useTonAuth() {
    const { token, setToken } = useContext(AuthContext);
    const isConnectionRestored = useIsConnectionRestored();
    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();
    const interval = useRef<ReturnType<typeof setInterval> | undefined>();
    const cookies = new Cookies(); 

    useEffect(() => {
        return;

        if (!isConnectionRestored || !setToken) {
            return;
        }

        clearInterval(interval.current);

        if (!wallet) {
            cookies.remove(AUTH_COOKIE); 
            setToken(null);

            const refreshPayload = async () => {
                // tonConnectUI.setConnectRequestParameters({ state: 'loading' });
                // const value = await backendAuth.generatePayload();
                // if (!value) {
                //     tonConnectUI.setConnectRequestParameters(null);
                // } else {
                //     tonConnectUI.setConnectRequestParameters({state: 'ready', value});
                // }
            }

            refreshPayload();
            setInterval(refreshPayload, TOKEN_TTL);
            return;
        }

        const token = cookies.get(AUTH_COOKIE); 
        if (token) {
            setToken(token);
            return;
        }

        if (wallet.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof)) {
            axios.post<AuthenticateResponse>("", {
                proof: wallet.connectItems.tonProof.proof, 
                account: wallet.account
            }).then((result) => {
                if (result.data.token?.length) {
                    setToken(result.data.token);
                    cookies.set(AUTH_COOKIE, result.data.token, { path: '/' }); 
                } else {
                    alert('Please try another wallet');
                    tonConnectUI.disconnect();
                }
            }).catch((error) => {
                console.log(error)
            })
        } else {
            alert('Please try another wallet');
            tonConnectUI.disconnect();
        }

    }, [wallet, isConnectionRestored, setToken])

    const login = (token: string) => {
        setToken(token)
    }

    const logout = () => {
        setToken(null)
    }

    return { login, logout, token, setToken }
}

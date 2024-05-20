import { useContext, useEffect, useRef } from "react";
import { ConnectAdditionalRequest, useIsConnectionRestored, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { AuthContext } from "../store/AuthContext";
import axios from "axios";

import config from "../../config.json";

const LOCALSTORAGE_KEY = 'token';
const PAYLOAD_TTLMS = 1000 * 60 * 20;
const SERVER_URL = config.apiUrl;

export function useTonAuth() {
    const { token, setToken } = useContext(AuthContext);
    const isConnectionRestored = useIsConnectionRestored();
    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();
    const interval = useRef<ReturnType<typeof setInterval> | undefined>();

    useEffect(() => {
        if (!isConnectionRestored || !setToken) {
            return;
        }

        clearInterval(interval.current);

        if (!wallet) {
            localStorage.removeItem(LOCALSTORAGE_KEY);
            setToken(null);

            const refreshPayload = async () => {
                tonConnectUI.setConnectRequestParameters({ state: 'loading' });

                const response = await axios.get<ConnectAdditionalRequest>(`${SERVER_URL}/auth/generatePayload`);
                const value = response.data

                if (!value) {
                    tonConnectUI.setConnectRequestParameters(null);
                } else {
                    // @ts-ignore
                    tonConnectUI.setConnectRequestParameters({state: 'ready', value});
                }
            }

            refreshPayload();
            setInterval(refreshPayload, PAYLOAD_TTLMS);
            return;
        }

        const storedToken = localStorage.getItem(LOCALSTORAGE_KEY);
        if (storedToken) {
            setToken(storedToken);
            return;
        }

        if (wallet.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof)) {
            axios.post(`${SERVER_URL}/auth/checkProof`, {
                proof: wallet.connectItems.tonProof.proof,
                account: wallet.account
            }).then(result => {
                console.log(result)
                if (result.data) {
                    setToken(result.data);
                    localStorage.setItem(LOCALSTORAGE_KEY, result.data);
                } else {
                    alert('Please try another wallet1');
                    tonConnectUI.disconnect();
                }
            }).catch(e => {
                console.error(e);
                alert('Please try another wallet2');
                tonConnectUI.disconnect();
            });
        } else {
            alert('Please try another wallet3');
            tonConnectUI.disconnect();
        }

    }, [wallet, isConnectionRestored, setToken]);

    return { setToken, token };
}

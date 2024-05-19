import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";

import WebApp from '@twa-dev/sdk'

WebApp.ready();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TonConnectUIProvider
			manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
			uiPreferences={{ theme: THEME.DARK }}
			walletsListConfiguration={{
			includeWallets: [
				{
					appName: "tonwallet",
					name: "TON Wallet",
					imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
					aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
					universalLink: "https://wallet.ton.org/ton-connect",
					jsBridgeKey: "tonwallet",
					bridgeUrl: "https://bridge.tonapi.io/bridge",
					platforms: ["chrome", "android"]
				}
			]
			}}
			actionsConfiguration={{
				twaReturnUrl: 'https://t.me/RectaskBot'
			}}
		>
            <App />
        </TonConnectUIProvider>
    </React.StrictMode>,
)

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
			language="en"
			uiPreferences={{ theme: THEME.DARK }}
			actionsConfiguration={{
				twaReturnUrl: 'https://t.me/RectaskBot'
			}}
		>
            <App />
        </TonConnectUIProvider>
    </React.StrictMode>,
)

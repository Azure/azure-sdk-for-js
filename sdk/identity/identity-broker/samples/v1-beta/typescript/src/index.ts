// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates usage of @azure/identity-broker and @azure/identity
 * packages for WAM MSA support.
 */

import {
  InteractiveBrowserCredential,
  InteractiveBrowserCredentialNodeOptions,
  useIdentityPlugin,
} from "@azure/identity";
import { nativeBrokerPlugin } from "@azure/identity-broker";
import dotenv from "dotenv";
import { app, BrowserWindow } from "electron";
const win = new BrowserWindow();

useIdentityPlugin(nativeBrokerPlugin);

// Load the environment
dotenv.config();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })
  win.loadFile('index.html')
  return win.getNativeWindowHandle()
}

app.on('ready', async () => {
  let winHandle = createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      winHandle = createWindow()
    }
  })
try{

  const options: InteractiveBrowserCredentialNodeOptions = {
    clientId: process.env.AZURE_CLIENT_ID || "client",
    authorityHost: process.env.AZURE_AUTHORITY_HOST,
    tenantId: process.env.AZURE_TENANT_ID,    
    brokerOptions: {
      enabled: true,
      legacyEnableMsaPassthrough: true,
      parentWindowHandle: Uint8Array.from(win.getNativeWindowHandle()),      
    },
  };
  const credential = new InteractiveBrowserCredential(options);

  // This is the scope we will use to get a token from the Microsoft Entra token endpoint.
  // By default, we'll use the Microsoft Graph scope as an example, but when
  // you use the credential with an Azure SDK package, it will configure the
  // scope for you automatically.
  const scope = process.env.AAD_TEST_SCOPE ?? "https://graph.microsoft.com/.default";

  const token = await credential.getToken(scope);

  console.log(`Token: ${token.token}: ${token.expiresOnTimestamp}`);
}
catch(e){
  console.log(e);
}
})
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
/**
 * @summary Authenticates using Interactive Browser Credential
 */
const { InteractiveBrowserCredential, useIdentityPlugin } = require("@azure/identity");
const { cachePersistencePlugin } = require("@azure/identity-cache-persistence");
const path = require('node:path');
const fs = require("node:fs");
useIdentityPlugin(cachePersistencePlugin);
const { setLogLevel } = require("@azure/logger");
setLogLevel("verbose")
require("dotenv").config();
const clientId = process.env.AZURE_CLIENT_ID; // The app registration client Id in the Microsoft Entra tenant
const tenantId = process.env.AZURE_TENANT_ID; // The tenant ID in Microsoft Entra ID

const loginHint = `kaghiya@microsoft.com`;
const authenticationRecordFolderPath = path.join("C:/code", "IdentityService");
const authenticationRecordFilePath = path.join(authenticationRecordFolderPath, `cortex_notes@${loginHint}.json`);
let authenticationRecord;
async function main() {
try {
    const jsonString = await fs.readFile(authenticationRecordFilePath, {
        encoding: 'utf8'
    });
    authenticationRecord = JSON.parse(jsonString);
} catch (err) {
    console.log(err);
    // ignore
}
const scopes = ["https://management.core.windows.net//.default"];
const credential = new InteractiveBrowserCredential({
    tenantId,
    clientId,
    tokenCachePersistenceOptions: {
        enabled: true,
    },
    loginHint: loginHint,
    authenticationRecord: authenticationRecord
});
if (!authenticationRecord) {
    console.log("aTTEMPT TO LOGIN WITHOUT AUTH RECORD");
    authenticationRecord = await credential.authenticate(scopes);
    try {
        // await fs.mkdir(authenticationRecordFolderPath, {
        //     recursive: true
        // });
        let jsonString = JSON.stringify(authenticationRecord);
        await fs.writeFile(authenticationRecordFilePath, jsonString, (fileErr) => {
            if (fileErr) throw fileErr;
            console.log('The file has been saved!');
          });
    } catch (error) {
        console.log(error);
        // ignore
    }
}
// const authProvider = new TokenCredentialAuthenticationProvider(credential, {
//     scopes: scopes,
// });
    
// const graphClient = Client.initWithMiddleware({ authProvider: authProvider });
}
main().catch((err) => {
    console.error("The sample encountered an error:", err);
  });
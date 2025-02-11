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
const clientId = "7b18c730-2cd5-44d1-b683-1f0d9422703f"; // The app registration client Id in the Microsoft Entra tenant
const tenantId = "3539240a-3160-4406-932b-9afaa7e0fd24"; // The tenant ID in Microsoft Entra ID
const loginHint = `kaghiya@microsoft.com`;
const authenticationRecordFolderPath = path.join("C:/code/", "IdentityService");
const authenticationRecordFilePath = path.join(authenticationRecordFolderPath, `cortex_notes@${loginHint}.json`);
let authenticationRecord;
async function main() {
try {
    let jsonString;
    await fs.readFile(authenticationRecordFilePath, {encoding: "utf-8"},async (err, data)=>{
        if (err){
            console.error(err)
        }
        if(data){
            console.log(`data found: ${data}`)
            jsonString = data;
            authenticationRecord = JSON.parse(jsonString);
            await doAuthenticate(authenticationRecord)
        }
    });
    console.log(`jsonString => ${jsonString}`)
   
} catch (err) {
    console.log(err);
}
async function doAuthenticate(authenticationRecord){
    const scopes = ['Mail.ReadWrite', 'Calendars.Read'];
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
        console.log("No authenticaton record found");
        authenticationRecord = await credential.authenticate(scopes);
        try {
            let jsonString = JSON.stringify(authenticationRecord);
            await fs.writeFile(authenticationRecordFilePath, jsonString, (fileErr) => {
                if (fileErr) throw fileErr;
                console.log('The file has been saved!');
              });
        } catch (error) {
            console.log(error);
        }
    }
    else{
        console.log("calling with authentication record")
        await credential.getToken(scopes);
        console.log("login successful");
    
    }
}
}
main().catch((err) => {
    console.error("The sample encountered an error:", err);
  });

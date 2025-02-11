// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates using persistent token caching with Interactive Browser Credential
 */
import { InteractiveBrowserCredential, useIdentityPlugin, AuthenticationRecord } from "@azure/identity";
import { cachePersistencePlugin } from "@azure/identity-cache-persistence";
import path from 'node:path';
import fs from 'node:fs';
import { setLogLevel } from "@azure/logger";
import dotenv from 'dotenv';

useIdentityPlugin(cachePersistencePlugin);
setLogLevel("verbose");
dotenv.config();

const clientId = "APP-REGISTRATION-CLIENT-ID"; // The app registration client Id in the Microsoft Entra tenant
const tenantId = "TENANT-ID"; // The tenant ID in Microsoft Entra ID
const loginHint = `EMAIL-ADDRESS`; // The email address of the user
const authenticationRecordFolderPath = path.join(__dirname, "authenticationRecords");
const authenticationRecordFilePath = path.join(authenticationRecordFolderPath, `cortex_notes@${loginHint}.json`);

let authenticationRecord: AuthenticationRecord | undefined;

async function main() {
    try {
        let jsonString: string | undefined;
        await fs.promises.readFile(authenticationRecordFilePath, { encoding: "utf-8" })
            .then(data => {
                console.log(`data found: ${data}`);
                jsonString = data;
                authenticationRecord = JSON.parse(jsonString) as AuthenticationRecord;
                return doAuthenticate(authenticationRecord);
            })
            .catch(err => {
                console.error(err);
            });
        console.log(`jsonString => ${jsonString}`);
    } catch (err) {
        console.log(err);
    }
}

async function doAuthenticate(authenticationRecord?: AuthenticationRecord) {
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
        console.log("No authentication record found");
        authenticationRecord = await credential.authenticate(scopes);
        try {
            const jsonString = JSON.stringify(authenticationRecord);
            await fs.promises.writeFile(authenticationRecordFilePath, jsonString);
            console.log('The file has been saved!');
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("Authenticating with authentication record");
        await credential.getToken(scopes);
        console.log("login successful");
    }
}

main().catch((err) => {    
    console.error("The sample encountered an error:", err);
});

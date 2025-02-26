// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates using persistent token caching with Interactive Browser Credential
 */
import type { AuthenticationRecord } from "@azure/identity";
import { InteractiveBrowserCredential, useIdentityPlugin } from "@azure/identity";
import { cachePersistencePlugin } from "@azure/identity-cache-persistence";
import path from "node:path";
import fs from "node:fs";
import "dotenv/config";

useIdentityPlugin(cachePersistencePlugin);
// The app registration client ID in the Microsoft Entra tenant
const clientId = "APP-REGISTRATION-CLIENT-ID";
// The tenant ID in Microsoft Entra ID
const tenantId = "TENANT-ID";
// The email address of the user
const loginHint = `EMAIL-ADDRESS`;
// The file path to save the authentication record
const authenticationRecordFilePath = path.resolve(__dirname, "authenticationRecord.json");

async function main(): Promise<void> {
  try {
    const fileContents = await fs.promises.readFile(authenticationRecordFilePath, "utf8");
    const authenticationRecord = JSON.parse(fileContents);
    await doAuthenticate(authenticationRecord);
  } catch (e) {
    console.error(e);
    await doAuthenticate();
  }
}

async function doAuthenticate(authenticationRecord?: AuthenticationRecord): Promise<void> {
  const scopes = ["Mail.ReadWrite", "Calendars.Read"];
  const credential = new InteractiveBrowserCredential({
    tenantId,
    clientId,
    tokenCachePersistenceOptions: {
      enabled: true,
    },
    loginHint: loginHint,
    authenticationRecord: authenticationRecord,
  });

  if (!authenticationRecord) {
    console.log("No authentication record found");
    authenticationRecord = await credential.authenticate(scopes);
    try {
      const jsonString = JSON.stringify(authenticationRecord);
      await fs.promises.writeFile(authenticationRecordFilePath, jsonString);
      console.log("The file has been saved!");
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

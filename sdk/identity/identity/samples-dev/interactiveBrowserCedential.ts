// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Authenticates using Interactive Browser Credential
 */

import { InteractiveBrowserCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const clientId = process.env.AZURE_CLIENT_ID; // The app registration client Id in the AAD tenant
const tenantId = process.env.AZURE_TENANT_ID; // The tenant ID in Azure Active Directory

async function main() {
  const credential = new InteractiveBrowserCredential({
    clientId,
    tenantId,
  });

  try {
    const token = await credential.getToken("https://storage.azure.com/.default");
    console.log(token);
  } catch (err) {
    console.log("Error with InteractiveBrowserCredential:", err);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

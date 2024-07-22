// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Authenticates using Interactive Browser Credential
 */

const { InteractiveBrowserCredential } = require("@azure/identity");

require("dotenv").config();

const clientId = process.env.AZURE_CLIENT_ID; // The app registration client Id in the Microsoft Entra tenant
const tenantId = process.env.AZURE_TENANT_ID; // The tenant ID in Microsoft Entra ID

async function main() {
  const credential = new InteractiveBrowserCredential({
    clientId,
    tenantId,
    browserCustomizationOptions: {
      successMessage: "Authentication Completed. You can close the browser.",
    },
  });

  const token = await credential.getToken("https://storage.azure.com/.default");
  console.log(
    "InteractiveBrowserCredential: Successfully got a token with expiry time:",
    token.expiresOnTimestamp,
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

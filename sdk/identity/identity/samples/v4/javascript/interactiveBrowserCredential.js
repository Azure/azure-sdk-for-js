// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates using Interactive Browser Credential
 */

const { InteractiveBrowserCredential } = require("@azure/identity");
const { setLogLevel } = require("@azure/logger");
setLogLevel("verbose")
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

  const token = await credential.getToken("https://graph.microsoft.com/.default");
  const authenticationRecord = await credential.authenticate("https://graph.microsoft.com/.default");
  console.log("InteractiveBrowserCredential: Authentication Record:", authenticationRecord);
  console.log(
    "InteractiveBrowserCredential: Successfully got a token with expiry time:",
    token.expiresOnTimestamp,
  );

    const cred3 = new InteractiveBrowserCredential({
    clientId: "7960e60e-aabb-47e7-9ac5-7145dd8157a4",
    tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47"
  });
  const token3 = await cred3.getToken("https://graph.microsoft.com/profile");
  console.log(
    "InteractiveBrowserCredential: Successfully got a token with expiry time:",
    token3.expiresOnTimestamp,
  );

  // const cred2 = new InteractiveBrowserCredential({
  //   clientId,
  //   tenantId,
  //   authenticationRecord
  // });
  // const token2 = await cred2.getToken("https://graph.microsoft.com/.default");
  // console.log(
  //   "InteractiveBrowserCredential: Successfully got a token with expiry time:",
  //   token2.expiresOnTimestamp,
  // );
  // const cred3 = new InteractiveBrowserCredential({
  //   clientId: "7960e60e-aabb-47e7-9ac5-7145dd8157a4",
  //   tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47"
  // });
  // const token3 = await cred3.getToken("https://graph.microsoft.com/.default");
  // console.log(
  //   "InteractiveBrowserCredential: Successfully got a token with expiry time:",
  //   token3.expiresOnTimestamp,
  // );
  const token4 = await credential.getToken("https://graph.microsoft.com/.default");
  console.log(
    "InteractiveBrowserCredential: Successfully got a token with expiry time:",
    token4.expiresOnTimestamp,
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

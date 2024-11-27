// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates with an app registration’s client Id and secret.
 */

const { DeviceCodeCredential } = require("@azure/identity");
const { useIdentityPlugin } = require("@azure/identity");
const { cachePersistencePlugin } = require("@azure/identity-cache-persistence");

useIdentityPlugin(cachePersistencePlugin);
// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const credential = new DeviceCodeCredential({
    tenantId: "27029f03-7c64-4ef6-88e4-14539e6c8d8c",
    clientId: "ed0e15fd-bb43-44e2-8d9c-b9c9758e0a46",
    tokenCachePersistenceOptions: {
      enabled: true,
    }
  });
  await credential.getToken("https://graph.microsoft.com/.default");
  const authenticationRecord = await credential.authenticate(["https://graph.microsoft.com/.default"]);
  console.log(authenticationRecord);
  const credential2 = new DeviceCodeCredential({
    tenantId: "27029f03-7c64-4ef6-88e4-14539e6c8d8c",
    clientId: "ed0e15fd-bb43-44e2-8d9c-b9c9758e0a46",
    tokenCachePersistenceOptions: {
      enabled: true,
    },
    authenticationRecord
  })
  await credential2.getToken("https://graph.microsoft.com/.default");
  console.log(await credential2.authenticate("https://graph.microsoft.com/.default"))
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});

module.exports = { main };

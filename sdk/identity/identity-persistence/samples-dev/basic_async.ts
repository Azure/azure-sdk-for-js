// Copyright (c) Microsoft Corporation
// Licensed under the MIT license

import {
  useIdentityExtension,
  DeviceCodeCredential,
  AccessToken,
  IdentityExtensionModule
} from "@azure/identity";

import dotenv from "dotenv";
dotenv.config();

async function logToken(getToken: () => Promise<AccessToken>) {
  console.log((await getToken()).token);
}

async function main() {
  await useIdentityExtension(
    new Promise<IdentityExtensionModule>((resolve) =>
      resolve(require("@azure/identity-persistence"))
    )
  );
  const credential = new DeviceCodeCredential({ tokenCachePersistenceOptions: {} });

  const getToken = () => credential.getToken("https://witemple-appconfig.azconfig.io/.default");

  console.log(1);
  await logToken(getToken);
  console.log(2);
  await logToken(getToken);
}

main().catch((error) => {
  console.error("The sample encountered an error:", error);
  process.exit(1);
});

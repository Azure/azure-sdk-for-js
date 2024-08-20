// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CertificateClient } from "../../../src/index.js";
import { uniqueString } from "./recorderUtils.js";
import {
  env,
  isLiveMode,
  Recorder,
  RecorderStartOptions,
  VitestTestContext,
} from "@azure-tools/test-recorder";
import TestClient from "./testClient.js";
import { createTestCredential } from "@azure-tools/test-credential";

export async function authenticate(ctx: VitestTestContext): Promise<any> {
  const suffix = uniqueString();

  const startOptions: RecorderStartOptions = {
    envSetupForPlayback: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
      KEYVAULT_NAME: "keyvault_name",
      KEYVAULT_URI: "https://keyvault_name.vault.azure.net/",
    },
    sanitizerOptions: {
      generalSanitizers: [
        {
          regex: true,
          target: `"access_token":"[^"]*"`,
          value: `"access_token":"access_token"`,
        },
        {
          regex: true,
          target: `"value": "MII[^"]+"`,
          // replace pkcs12 certificate value with base64 encoding of "base64_placeholder"
          value: `"value": "YmFzZTY0X3BsYWNlaG9sZGVy"`,
        },
      ],
    },
    removeCentralSanitizers: [
      // This sanitizer sanitizes the secret ID, but this ID has a specific format that is parsed by the SDK, and is not a secret
      "AZSDK3430",
      // The 'name' property exists in certificate contacts and is not a secret
      "AZSDK3493",
    ],
  };

  const recorder = new Recorder(ctx);
  await recorder.start(startOptions);
  if (suffix !== "") {
    await recorder.addSanitizers({
      generalSanitizers: [
        {
          target: suffix,
          value: "",
        },
      ],
    });
  }
  const credential = createTestCredential();

  const keyVaultUrl = env.KEYVAULT_URI;
  if (!keyVaultUrl) {
    throw new Error("Missing KEYVAULT_URI environment variable.");
  }

  const client = new CertificateClient(
    keyVaultUrl,
    credential,
    recorder.configureClientOptions({
      disableChallengeResourceVerification: !isLiveMode(),
    }),
  );
  const testClient = new TestClient(client);

  return { recorder, client, credential, testClient, suffix, keyVaultUrl };
}

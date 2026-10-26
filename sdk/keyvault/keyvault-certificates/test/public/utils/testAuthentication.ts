// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificateClient } from "../../../src/index.js";
import { uniqueString } from "./recorderUtils.js";
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { env, isLiveMode, Recorder } from "@azure-tools/test-recorder";
import TestClient from "./testClient.js";
import { createTestCredential } from "@azure-tools/test-credential";

export async function authenticate(ctx: TestInfo): Promise<any> {
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
          target: '"value"\\s*:\\s*"(?!A+={0,2}")[A-Za-z0-9+/_-]{200,}={0,2}"',
          // Replace opaque PKCS12 containers and backup blobs, but retain public certificate fields.
          value: `"value": "YmFzZTY0X3BsYWNlaG9sZGVy"`,
        },
        {
          regex: true,
          target:
            "-----BEGIN (?:RSA |EC |ENCRYPTED )?PRIVATE KEY-----[\\s\\S]*?-----END (?:RSA |EC |ENCRYPTED )?PRIVATE KEY-----",
          value: "Sanitized private key",
        },
      ],
      headerSanitizers: [
        { key: "x-ms-keyvault-network-info", value: "Sanitized" },
        { key: "x-ms-keyvault-rbac-assignment-id", value: "Sanitized" },
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

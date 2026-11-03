// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecretClient } from "../../../src/index.js";
import type {
  FindReplaceSanitizer,
  RecorderStartOptions,
  VitestTestContext,
} from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, env, isRecordMode, Recorder } from "@azure-tools/test-recorder";
import { uniqueString } from "./recorderUtils.js";
import TestClient from "./testClient.js";
import { createTestCredential } from "@azure-tools/test-credential";

export async function authenticate(ctx: VitestTestContext): Promise<any> {
  const generalSanitizers: FindReplaceSanitizer[] = [
    {
      regex: true,
      // Backup blobs are opaque service data, not the secret values exercised by these tests.
      target: '"value"\\s*:\\s*"(?!A+={0,2}")[A-Za-z0-9+/_-]{200,}={0,2}"',
      value: `"value": "YmFzZTY0X3BsYWNlaG9sZGVy"`,
    },
  ];

  const secretSuffix = uniqueString();
  if (isRecordMode()) {
    generalSanitizers.push({
      target: secretSuffix,
      value: "",
    });

    // Add logic to sanitize the hostname of the url.
    // Some nextLink URLs from paging include the port number, e.g. https://myvault.vault.azure.net:443/... this means that
    // the environment variable substitution of KEYVAULT_URI in envSetupForPlayback doesn't capture it, so we need to add a
    // more specific sanitizer.
    const { hostname } = new URL(assertEnvironmentVariable("KEYVAULT_URI"));
    generalSanitizers.push({
      target: hostname,
      value: `keyvault_name.vault.azure.net`,
    });
  }

  const recorderStartOptions: RecorderStartOptions = {
    envSetupForPlayback: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
      KEYVAULT_URI: "https://keyvault_name.vault.azure.net/",
    },
    sanitizerOptions: {
      generalSanitizers,
      headerSanitizers: [
        { key: "x-ms-keyvault-network-info", value: "Sanitized" },
        { key: "x-ms-keyvault-rbac-assignment-id", value: "Sanitized" },
      ],
    },
    removeCentralSanitizers: [
      // The secret ID has a specific format that is parsed by the SDK, cannot be sanitized, and is not a secret
      "AZSDK3430",
    ],
  };

  const recorder = new Recorder(ctx);
  await recorder.start(recorderStartOptions);
  const credential = createTestCredential();

  const keyVaultUrl = env.KEYVAULT_URI;
  if (!keyVaultUrl) {
    throw new Error("Missing KEYVAULT_URI environment variable.");
  }

  const client = new SecretClient(
    keyVaultUrl,
    credential,
    recorder.configureClientOptions({
      disableChallengeResourceVerification: true,
    }),
  );
  const testClient = new TestClient(client);

  return { recorder, client, testClient, secretSuffix, credential };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import { env, Recorder, RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { KeyClient } from "@azure/keyvault-keys";
import {
  KeyVaultAccessControlClient,
  KeyVaultBackupClient,
  KeyVaultSettingsClient,
} from "../../../src/index.js";

import { getEnvironmentVariable } from "./common.js";
import { randomUUID } from "@azure/core-util";

export async function authenticate(that: TestInfo): Promise<any> {
  const recorder = new Recorder(that);
  let generatedUUIDs = 0;

  function generateFakeUUID(): string {
    return recorder.variable(`uuid-${++generatedUUIDs}`, randomUUID());
  }

  const recorderStartOptions: RecorderStartOptions = {
    envSetupForPlayback: {
      AZURE_MANAGEDHSM_URI: "https://azure_managedhsm.managedhsm.azure.net/",
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
      BLOB_CONTAINER_NAME: "uri",
      BLOB_STORAGE_ACCOUNT_NAME: "blob_storage_account_name",
      BLOB_STORAGE_SAS_TOKEN: "blob_storage_sas_token",
      BLOB_STORAGE_URI: "https://uri.blob.core.windows.net/",
      CLIENT_OBJECT_ID: "01ea9a65-813e-4238-8204-bf7328d63fc6",
    },
    sanitizerOptions: {
      generalSanitizers: [
        {
          target: `keyvault_name\\.[a-z-]+\\.azure[a-z-]*\\.net`,
          regex: true,
          value: `keyvault_name.managedhsm.azure.net`,
        },
        {
          target: `[a-zA-Z0-9-]+\\.blob\\.core\\.windows\\.net`,
          regex: true,
          value: `uri.blob.core.windows.net`,
        },
      ],
    },
    removeCentralSanitizers: [
      // Setting "name" is not a secret
      "AZSDK3493",
      // Role definition ID is not a secret
      "AZSDK3430",
      // Principal ID is not a secret in this context
      "AZSDK3444",
    ],
  };

  await recorder.start(recorderStartOptions);
  const suffix = recorder.variable("suffix", `suffix-${Math.floor(Math.random() * 1000000)}`);

  const credential = createTestCredential({
    authorityHost: env.AZURE_AUTHORITY_HOST, // undefined by default is expected
  });

  const keyVaultHsmUrl = getEnvironmentVariable("AZURE_MANAGEDHSM_URI");

  const accessControlClient = new KeyVaultAccessControlClient(
    keyVaultHsmUrl,
    credential,
    recorder.configureClientOptions({
      disableChallengeResourceVerification: true,
    }),
  );
  const keyClient = new KeyClient(
    keyVaultHsmUrl,
    credential,
    recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
  );
  const backupClient = new KeyVaultBackupClient(
    keyVaultHsmUrl,
    credential,
    recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
  );
  const settingsClient = new KeyVaultSettingsClient(
    keyVaultHsmUrl,
    credential,
    recorder.configureClientOptions({
      disableChallengeResourceVerification: true,
    }),
  );

  return {
    recorder,
    accessControlClient,
    backupClient,
    keyClient,
    settingsClient,
    suffix,
    generateFakeUUID,
  };
}

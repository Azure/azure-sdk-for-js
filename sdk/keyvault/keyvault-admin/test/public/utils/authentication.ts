// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTestCredential } from "@azure-tools/test-credential";
import { env, Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { KeyClient } from "@azure/keyvault-keys";
import { v4 as uuidv4 } from "uuid";
import { Context } from "mocha";

import {
  KeyVaultAccessControlClient,
  KeyVaultBackupClient,
  KeyVaultSettingsClient,
} from "../../../src";

import { getEnvironmentVariable, getServiceVersion } from "./common";

export async function authenticate(
  that: Context,
  serviceVersion: ReturnType<typeof getServiceVersion>
): Promise<any> {
  const recorder = new Recorder(that.currentTest);
  let generatedUUIDs = 0;

  function generateFakeUUID(): string {
    return recorder.variable(`uuid-${++generatedUUIDs}`, uuidv4());
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
          target: `keyvault_name\.[a-z-]+\.azure[a-z-]*\.net`,
          regex: true,
          value: `keyvault_name.managedhsm.azure.net`,
        },
        {
          target: `[a-z-]+\.blob\.core\.windows\.net`,
          regex: true,
          value: `uri.blob.core.windows.net`,
        },
      ],
    },
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
      serviceVersion,
      disableChallengeResourceVerification: true,
    })
  );
  const keyClient = new KeyClient(
    keyVaultHsmUrl,
    credential,
    recorder.configureClientOptions({ serviceVersion, disableChallengeResourceVerification: true })
  );
  const backupClient = new KeyVaultBackupClient(
    keyVaultHsmUrl,
    credential,
    recorder.configureClientOptions({ serviceVersion, disableChallengeResourceVerification: true })
  );
  const settingsClient = new KeyVaultSettingsClient(
    keyVaultHsmUrl,
    credential,
    recorder.configureClientOptions({
      serviceVersion,
      disableChallengeResourceVerification: true,
    })
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

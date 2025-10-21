// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { afterAll, beforeAll, describe, it, beforeEach, afterEach } from "vitest";
import { createByosBatchAccount, deleteBatchAccount } from "./utils/arm-resources/batch-account.js";
import type { BatchClient } from "../src/clientDefinitions.js";
import { createRecorder, createBatchClientV2 } from "./utils/recordedClient.js";
import { isUnexpected } from "../src/isUnexpected.js";
import {
  createKeyInKeyVaultAndGetUrl,
  createKeyVaultForByosBatchAccount,
  deleteKeyVault,
} from "./utils/arm-resources/key-vault.js";
import { createDiskEncryptionSet } from "./utils/arm-resources/disk-encryption-set.js";
import { getResourceName } from "./utils/helpers.js";

const BYOS_ACCOUNT = "jssdkbyosaccount";
const KEY_VAULT_NAME = "jssdkbyoskv";
const DES_NAME = "jssdkbyosdes";

describe("BYOS Account", () => {
  let accountEndpoint = "https://dummy.eastus.batch.azure.com";
  let batchClient: BatchClient;
  let recorder: Recorder;
  let desResourceId: string;

  beforeAll(async () => {
    if (isPlaybackMode()) {
      return;
    }

    const keyVault = await createKeyVaultForByosBatchAccount(KEY_VAULT_NAME);
    console.log("successfully create key vault:", KEY_VAULT_NAME);

    const { key, keyUrl } = await createKeyInKeyVaultAndGetUrl(
      keyVault.properties!.vaultUri!,
      "TestKey1",
    );
    console.log("successfully create key in key vault:", key.name);

    const account = await createByosBatchAccount(
      BYOS_ACCOUNT,
      keyVault.id!,
      keyVault.properties!.vaultUri!,
    );
    accountEndpoint = `https://${account.accountEndpoint!}`;
    console.log("successfully create byos account:", BYOS_ACCOUNT);

    const diskEncryptionSet = await createDiskEncryptionSet(DES_NAME, keyVault.id!, keyUrl);
    desResourceId = diskEncryptionSet.id!;
    console.log("successfully create disk encryption set:", DES_NAME);
  });

  afterAll(async () => {
    if (isPlaybackMode()) {
      return;
    }
    await deleteBatchAccount(BYOS_ACCOUNT);
    console.log("successfully delete byos account:", BYOS_ACCOUNT);

    await deleteKeyVault(KEY_VAULT_NAME);
    console.log("successfully delete key vault:", KEY_VAULT_NAME);
  });

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    batchClient = createBatchClientV2({
      recorder,
      accountEndpoint,
    });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list supported images", async () => {
    const res = await batchClient.path("/supportedimages").get();

    if (isUnexpected(res)) {
      throw new Error(`Failed to list supported images: ${res.body?.message}`);
    }
    console.log("supported images:", res.body.value?.length);
  });

  it("should create a pool with CMK disk encryption", async () => {
    const poolId = getResourceName("byospool");
    const res = await batchClient.path("/pools").post({
      body: {
        id: recorder.variable("BYOS_POOL_ID", poolId),
        vmSize: "STANDARD_D2_V3",
        virtualMachineConfiguration: {
          imageReference: {
            publisher: "MicrosoftWindowsServer",
            offer: "WindowsServer",
            sku: "2022-Datacenter-smalldisk",
            version: "latest",
          },
          nodeAgentSKUId: "batch.node.windows amd64",
          osDisk: {
            managedDisk: {
              diskEncryptionSet: {
                id: recorder.variable("BYOS_DES_ID", desResourceId),
              },
            },
          },
        },
      },
      contentType: "application/json; odata=minimalmetadata",
    });
    if (isUnexpected(res)) {
      throw new Error(`Failed to create pool: ${res.body?.message}`);
    }
    console.log("created pool:", poolId);
  });
});

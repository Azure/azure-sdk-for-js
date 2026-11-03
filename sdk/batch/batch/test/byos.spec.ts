// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { afterAll, beforeAll, describe, it, beforeEach, afterEach, expect } from "vitest";
import { getExistingBatchAccount } from "./utils/arm-resources/batch-account.js";
import type { BatchClient } from "../src/index.js";
import { createRecorder, createBatchClient } from "./utils/recordedClient.js";
import {
  createKeyInKeyVaultAndGetUrl,
  createKeyVaultForByosBatchAccount,
  deleteKeyVault,
  grantKeyVaultAdministrator,
} from "./utils/arm-resources/key-vault.js";
import {
  createDiskEncryptionSet,
  deleteDiskEncryptionSet,
} from "./utils/arm-resources/disk-encryption-set.js";
import { getResourceName } from "./utils/helpers.js";
import {
  fakeAzureBatchEndpoint,
  fakeDesResourceId,
  fakeInVmAccessProfileVersionResourceId,
} from "./utils/fakeTestSecrets.js";
import {
  createComputeGallery,
  createVmAccessProfileVersion,
  deleteComputeGallery,
  deleteVmAccessProfileVersion,
} from "./utils/arm-resources/compute-gallary.js";
import { getByosBatchAccountName, getUserObjectId } from "./utils/arm-resources/env-const.js";
import { wait } from "./utils/wait.js";

const KEY_VAULT_NAME = getResourceName("deskv");
const DES_NAME = getResourceName("byosdes");
const GALLERY_NAME = getResourceName("byosgallery");
const VM_ACCESS_PROFILE_NAME = getResourceName("accessprofile");

describe("BYOS Account", () => {
  let accountEndpoint = fakeAzureBatchEndpoint;
  let desResourceId = fakeDesResourceId;
  let vmAccessProfileVersionResourceId = fakeInVmAccessProfileVersionResourceId;
  let batchClient: BatchClient;
  let recorder: Recorder;

  beforeAll(async () => {
    if (isPlaybackMode()) {
      return;
    }

    const keyVault = await createKeyVaultForByosBatchAccount(KEY_VAULT_NAME);
    console.log("created key vault:", KEY_VAULT_NAME);

    await grantKeyVaultAdministrator(keyVault.id!, await getUserObjectId(), "User");
    console.log("granted Key Vault Administrator role to test user");

    const { key, keyUrl } = await createKeyInKeyVaultAndGetUrl(
      keyVault.properties!.vaultUri!,
      "TestKey1",
    );
    console.log("created key in key vault:", key.name);

    const diskEncryptionSet = await createDiskEncryptionSet(DES_NAME, keyVault.id!, keyUrl);
    desResourceId = diskEncryptionSet.id!;
    console.log("created disk encryption set:", DES_NAME);

    await createComputeGallery(GALLERY_NAME);
    console.log("created compute gallery:", GALLERY_NAME);

    vmAccessProfileVersionResourceId = await createVmAccessProfileVersion(
      GALLERY_NAME,
      VM_ACCESS_PROFILE_NAME,
      "1.0.0",
    ).then((version) => version.id!);
    console.log(
      "successfully create in-VM access control profile version:",
      vmAccessProfileVersionResourceId,
    );

    const account = await getExistingBatchAccount(getByosBatchAccountName());
    accountEndpoint = `https://${account.accountEndpoint!}`;
  });

  afterAll(async () => {
    if (isPlaybackMode()) {
      return;
    }

    await deleteKeyVault(KEY_VAULT_NAME);
    console.log("deleted key vault:", KEY_VAULT_NAME);

    await deleteDiskEncryptionSet(DES_NAME);
    console.log("deleted disk encryption set:", DES_NAME);

    await deleteVmAccessProfileVersion(GALLERY_NAME, VM_ACCESS_PROFILE_NAME);
    console.log("deleted in-VM access control profile:", VM_ACCESS_PROFILE_NAME);

    wait(10000); // wait for 10 seconds to ensure the previous resource is fully deleted

    await deleteComputeGallery(GALLERY_NAME);
    console.log("deleted compute gallery:", GALLERY_NAME);
  });

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    batchClient = createBatchClient({
      recorder,
      accountEndpoint,
    });
    await recorder.addSanitizers({
      generalSanitizers: [
        {
          target: accountEndpoint,
          value: fakeAzureBatchEndpoint,
        },
        {
          target: desResourceId,
          value: fakeDesResourceId,
        },
        {
          target: vmAccessProfileVersionResourceId,
          value: fakeInVmAccessProfileVersionResourceId,
        },
      ],
    });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list supported images", async () => {
    const images = [];
    for await (const image of batchClient.listSupportedImages()) {
      images.push(image);
    }
    expect(images.length).toBeGreaterThan(0);
  });

  it("should create a pool with CMK disk encryption", async () => {
    const poolId = recorder.variable("BYOS_POOL_ID", getResourceName("byospool"));
    await batchClient.createPool({
      id: poolId,
      vmSize: "STANDARD_D2_V3",
      virtualMachineConfiguration: {
        imageReference: {
          publisher: "MicrosoftWindowsServer",
          offer: "WindowsServer",
          sku: "2022-Datacenter-smalldisk",
          version: "latest",
        },
        nodeAgentSkuId: "batch.node.windows amd64",
        osDisk: {
          managedDisk: {
            diskEncryptionSet: {
              id: desResourceId,
            },
          },
        },
      },
    });

    const pool = await batchClient.getPool(poolId);

    expect(pool.id).toEqual(poolId);
    expect(pool.virtualMachineConfiguration?.osDisk?.managedDisk?.diskEncryptionSet?.id).toEqual(
      desResourceId,
    );
  });

  it('should create a pool with IMDS Metadata Security Protocol set to "InVmAccessControlProfileVersion"', async () => {
    const poolId = recorder.variable("BYOS_POOL_ID_MSP", getResourceName("byospoolmsp"));
    await batchClient.createPool({
      id: poolId,
      vmSize: "STANDARD_D2_V3",
      virtualMachineConfiguration: {
        imageReference: {
          publisher: "MicrosoftWindowsServer",
          offer: "WindowsServer",
          sku: "2022-Datacenter-smalldisk",
          version: "latest",
        },
        nodeAgentSkuId: "batch.node.windows amd64",
        securityProfile: {
          proxyAgentSettings: {
            enabled: true,
            imds: {
              inVmAccessControlProfileReferenceId: vmAccessProfileVersionResourceId,
            },
            wireServer: {
              mode: "Audit",
            },
          },
        },
      },
    });

    const pool = await batchClient.getPool(poolId);

    expect(pool.id).toEqual(poolId);
    expect(
      pool.virtualMachineConfiguration?.securityProfile?.proxyAgentSettings?.imds
        ?.inVmAccessControlProfileReferenceId,
    ).toEqual(vmAccessProfileVersionResourceId);

    expect(
      pool.virtualMachineConfiguration?.securityProfile?.proxyAgentSettings?.wireServer?.mode,
    ).toEqual("Audit");
  });
});

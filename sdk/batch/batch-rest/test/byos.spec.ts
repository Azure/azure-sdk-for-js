// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { afterAll, beforeAll, describe, it, beforeEach, afterEach, expect } from "vitest";
import { createByosBatchAccount, deleteBatchAccount } from "./utils/arm-resources/batch-account.js";
import type { BatchClient } from "../src/clientDefinitions.js";
import { createRecorder, createBatchClientV2 } from "./utils/recordedClient.js";
import { isUnexpected } from "../src/isUnexpected.js";
import {
  createKeyInKeyVaultAndGetUrl,
  createKeyVaultForByosBatchAccount,
  deleteKeyVault,
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
import { getByosBatchAccountName } from "./utils/arm-resources/env-const.js";

const KEY_VAULT_NAME = getResourceName("byoskv");
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
    console.log("successfully create key vault:", KEY_VAULT_NAME);

    const { key, keyUrl } = await createKeyInKeyVaultAndGetUrl(
      keyVault.properties!.vaultUri!,
      "TestKey1",
    );
    console.log("successfully create key in key vault:", key.name);

    const account = await createByosBatchAccount(
      getByosBatchAccountName(),
      keyVault.id!,
      keyVault.properties!.vaultUri!,
    );
    accountEndpoint = `https://${account.accountEndpoint!}`;
    console.log("successfully create byos account:", getByosBatchAccountName());

    const diskEncryptionSet = await createDiskEncryptionSet(DES_NAME, keyVault.id!, keyUrl);
    desResourceId = diskEncryptionSet.id!;
    console.log("successfully create disk encryption set:", DES_NAME);

    await createComputeGallery(GALLERY_NAME);
    console.log("successfully create compute gallery:", GALLERY_NAME);

    vmAccessProfileVersionResourceId = await createVmAccessProfileVersion(
      GALLERY_NAME,
      VM_ACCESS_PROFILE_NAME,
      "1.0.0",
    ).then((version) => version.id!);
    console.log(
      "successfully create in-VM access control profile version:",
      vmAccessProfileVersionResourceId,
    );
  });

  afterAll(async () => {
    if (isPlaybackMode()) {
      return;
    }

    await deleteKeyVault(KEY_VAULT_NAME);
    console.log("successfully delete key vault:", KEY_VAULT_NAME);

    await deleteDiskEncryptionSet(DES_NAME);
    console.log("successfully delete disk encryption set:", DES_NAME);

    await deleteVmAccessProfileVersion(GALLERY_NAME, VM_ACCESS_PROFILE_NAME);
    console.log("successfully delete in-VM access control profile:", VM_ACCESS_PROFILE_NAME);

    await deleteComputeGallery(GALLERY_NAME);
    console.log("successfully delete compute gallery:", GALLERY_NAME);
  });

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    batchClient = createBatchClientV2({
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
    const res = await batchClient.path("/supportedimages").get();

    if (isUnexpected(res)) {
      throw new Error(`Failed to list supported images: ${res.body?.message}`);
    }
    console.log("supported images:", res.body.value?.length);
  });

  it("should create a pool with CMK disk encryption", async () => {
    const poolId = recorder.variable("BYOS_POOL_ID", getResourceName("byospool"));
    const res = await batchClient.path("/pools").post({
      body: {
        id: poolId,
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
                id: desResourceId,
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

    const poolRes = await batchClient.path("/pools/{poolId}", poolId).get();
    if (isUnexpected(poolRes)) {
      throw new Error(`Failed to get pool: ${poolRes.body?.message}`);
    }
    console.log("retrieved pool:", poolId);

    expect(poolRes.body.id).toEqual(poolId);
    expect(
      poolRes.body.virtualMachineConfiguration?.osDisk?.managedDisk?.diskEncryptionSet?.id,
    ).toEqual(desResourceId);
  });

  it('should create a pool with IMDS Metadata Security Protocol set to "InVmAccessControlProfileVersion"', async () => {
    const poolId = recorder.variable("BYOS_POOL_ID_MSP", getResourceName("byospoolmsp"));
    const res = await batchClient.path("/pools").post({
      body: {
        id: poolId,
        vmSize: "STANDARD_D2_V3",
        virtualMachineConfiguration: {
          imageReference: {
            publisher: "MicrosoftWindowsServer",
            offer: "WindowsServer",
            sku: "2022-Datacenter-smalldisk",
            version: "latest",
          },
          nodeAgentSKUId: "batch.node.windows amd64",
          securityProfile: {
            proxyAgentSettings: {
              enabled: true,
              imds: {
                inVMAccessControlProfileReferenceId: vmAccessProfileVersionResourceId,
              },
              wireServer: {
                mode: "Audit",
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

    const poolRes = await batchClient.path("/pools/{poolId}", poolId).get();
    if (isUnexpected(poolRes)) {
      throw new Error(`Failed to get pool: ${poolRes.body?.message}`);
    }
    console.log("retrieved pool:", poolId);

    expect(poolRes.body.id).toEqual(poolId);
    expect(
      poolRes.body.virtualMachineConfiguration?.securityProfile?.proxyAgentSettings?.imds
        ?.inVMAccessControlProfileReferenceId,
    ).toEqual(vmAccessProfileVersionResourceId);

    expect(
      poolRes.body.virtualMachineConfiguration?.securityProfile?.proxyAgentSettings?.wireServer
        ?.mode,
    ).toEqual("Audit");
  });
});

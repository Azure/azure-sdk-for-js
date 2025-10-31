// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createTestResourceGroup,
  deleteTestResourceGroup,
} from "./utils/arm-resources/resource-group.js";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import {
  getAzureBatchServicePrincipalObjectId,
  getByosBatchAccountName,
  getByosKeyVaultName,
  getHoboBatchAccountName,
} from "./utils/arm-resources/env-const.js";
import {
  createByosBatchAccount,
  createHoboBatchAccount,
  deleteBatchAccount,
} from "./utils/arm-resources/batch-account.js";
import {
  createKeyVaultForByosBatchAccount,
  deleteKeyVault,
  grantKeyVaultSecretsOfficer,
} from "./utils/arm-resources/key-vault.js";

let teardownHappened = false;
let setupHappened = false;

export async function setup(): Promise<void> {
  if (isPlaybackMode()) {
    return;
  }
  if (setupHappened) {
    console.log("[global-setup] setup has already happened, skipping...");
    return;
  }
  setupHappened = true;
  await createTestResourceGroup();
  console.log("[global-setup] created test resource group");

  const keyVaultForByosAccount = await createKeyVaultForByosBatchAccount(getByosKeyVaultName());
  console.log("[global-setup] created key vault for BYOS batch account");

  await grantKeyVaultSecretsOfficer(
    keyVaultForByosAccount.id!,
    getAzureBatchServicePrincipalObjectId(),
    "ServicePrincipal",
  );
  console.log(
    "[global-setup] granted Key Vault Secrets Officer role to Batch Service Principal",
  );

  await createByosBatchAccount(
    getByosBatchAccountName(),
    keyVaultForByosAccount.id!,
    keyVaultForByosAccount.properties.vaultUri!,
  );
  console.log("[global-setup] create BYOS batch account");

  await createHoboBatchAccount(getHoboBatchAccountName());
  console.log("[global-setup] create HOBO batch account");
}

export async function teardown(): Promise<void> {
  if (isPlaybackMode()) {
    return;
  }

  if (teardownHappened) {
    console.log("[global-teardown] teardown has already happened, skipping...");
    return;
  }
  teardownHappened = true;

  await deleteBatchAccount(getHoboBatchAccountName());
  console.log("[global-teardown] deleted HOBO batch account");

  await deleteBatchAccount(getByosBatchAccountName());
  console.log("[global-teardown] deleted BYOS batch account");

  await deleteKeyVault(getByosKeyVaultName());
  console.log("[global-teardown] deleted key vault for BYOS batch account");

  await deleteTestResourceGroup();
  console.log("[global-teardown] deleted test resource group");
}

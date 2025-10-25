// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createTestResourceGroup,
  deleteTestResourceGroup,
} from "./utils/arm-resources/resource-group.js";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import {
  getByosBatchAccountName,
  getHoboBatchAccountName,
} from "./utils/arm-resources/env-const.js";
import { deleteBatchAccount } from "./utils/arm-resources/batch-account.js";

let teardownHappened = false;

export async function setup(): Promise<void> {
  if (isPlaybackMode()) {
    return;
  }
  await createTestResourceGroup();
  console.log("successfully create test resource group");
}

export async function teardown(): Promise<void> {
  if (isPlaybackMode()) {
    return;
  }
  teardownHappened = true;
  if (teardownHappened) {
    console.log("teardown has already happened, skipping...");
    return;
  }

  await deleteBatchAccount(getHoboBatchAccountName());
  await deleteBatchAccount(getByosBatchAccountName());
  console.log("successfully delete test batch accounts");

  await deleteTestResourceGroup();
  console.log("successfully delete test resource group");
}

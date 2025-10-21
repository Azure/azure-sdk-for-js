// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeAll, afterAll } from "vitest";
import {
  createTestResourceGroup,
  deleteTestResourceGroup,
} from "./utils/arm-resources/resource-group.js";
import { isPlaybackMode } from "@azure-tools/test-recorder";

beforeAll(async () => {
  if (isPlaybackMode()) {
    return;
  }
  await createTestResourceGroup();
  console.log("successfully create test resource group");
});

afterAll(async () => {
  if (isPlaybackMode()) {
    return;
  }
  await deleteTestResourceGroup();
  console.log("successfully delete test resource group");
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { assert } from "chai";

export const assertPropertyNames = <T>(
  expectedInstance: AzureKeyCredential,
  actualInstance: T,
): void => {
  assert.includeMembers(
    Object.getOwnPropertyNames(expectedInstance),
    Object.getOwnPropertyNames(actualInstance),
    `Object is not an instance of ${expectedInstance.constructor.name}.`,
  );
};

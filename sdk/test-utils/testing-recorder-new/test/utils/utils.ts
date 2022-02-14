// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableEntity } from "@azure/data-tables";
import { env } from "@azure-tools/test-recorder";

const stringValue = "This is a string";

export function createSimpleEntity(): TableEntity {
  return {
    partitionKey: "simpleEntity",
    rowKey: "03590009-4169-46ce-9e33-d011dbaf308c", //uuid(),
    stringTypeProperty1: stringValue,
    stringTypeProperty2: stringValue,
    stringTypeProperty3: stringValue,
    stringTypeProperty4: stringValue,
    stringTypeProperty5: stringValue,
    stringTypeProperty6: stringValue,
    stringTypeProperty7: stringValue,
  };
}

export function assertEnvironmentVariable(variable: string): string {
  const value = env[variable];
  if (!value) {
    throw new Error(`${variable} is not defined in your environment`);
  }
  return value;
}

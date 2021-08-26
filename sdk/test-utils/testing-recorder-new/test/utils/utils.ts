// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableEntity } from "@azure/data-tables";

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
    stringTypeProperty7: stringValue
  };
}

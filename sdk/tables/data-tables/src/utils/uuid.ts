// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateUuid } from "@azure/core-http";

// This is used as a workaround to be able to stub generateUuid
// during testing.
export class Uuid {
  public static generateUuid() {
    return generateUuid();
  }
}

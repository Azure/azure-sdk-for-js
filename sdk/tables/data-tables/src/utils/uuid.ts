// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomUUID } from "@azure/core-util";

// This is used as a workaround to be able to stub generateUuid
// during testing.
export class Uuid {
  public static generateUuid(): string {
    return randomUUID();
  }
}

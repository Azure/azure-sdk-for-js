// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 as uuidv4 } from "uuid";

// This is used as a workaround to be able to stub generateUuid
// during testing.
export class Uuid {
  public static generateUuid(): string {
    return uuidv4();
  }
}

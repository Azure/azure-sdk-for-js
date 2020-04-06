// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";

export class BrowserClient {
  B(): string {
    if (isNode) {
      throw new Error("This method can only run on Browser");
    }
    return "Browser";
  }

  C(): string {
    if (process.env.TEST_MODE) {
      throw new Error("This method can only run on Live Mode");
    }
    return "Live";
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";

export class NodeClient {
  A(): string {
    if (!isNode) {
      throw new Error("This method can only run on Node");
    }
    return "Node";
  }

  C(): string {
    if (process.env.TEST_MODE) {
      throw new Error("This method can only run on Live Mode");
    }
    return "Live";
  }
}

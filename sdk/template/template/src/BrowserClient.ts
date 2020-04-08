// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";

export interface BrowserClientEnv {
  TEST_MODE?: string;
}

export class BrowserClient {
  public env: BrowserClientEnv;

  constructor(env: BrowserClientEnv) {
    this.env = env;
  }

  B(): string {
    if (isNode) {
      throw new Error("This method can only run on Browser");
    }
    return "Browser";
  }

  C(): string {
    if (this.env.TEST_MODE) {
      throw new Error("This method can only run on Live Mode");
    }
    return "Live";
  }
}

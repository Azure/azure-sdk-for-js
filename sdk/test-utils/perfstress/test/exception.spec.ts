// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, PerfStressTestError } from "../src";

export class SynchronousException extends PerfStressTest<string> {
  public options = {};
  run(): void {
    try {
      throw new PerfStressTestError();
    } finally {
      // Nothing to do here
    }
  }
}

export class AsynchronousException extends PerfStressTest<string> {
  public options = {};
  async run(): Promise<void> {
    try {
      throw new PerfStressTestError();
    } finally {
      // Nothing to do here
    }
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, ParsedPerfStressOptions, PerfStressTestError } from "../src";

export class SynchronousException extends PerfStressTest<ParsedPerfStressOptions> {
  run(): void {
    try {
      throw new PerfStressTestError();
    } finally {
      // Nothing to do here
    }
  }
}

export class AsynchronousException extends PerfStressTest<ParsedPerfStressOptions> {
  async run(): Promise<void> {
    try {
      throw new PerfStressTestError();
    } finally {
      // Nothing to do here
    }
  }
}

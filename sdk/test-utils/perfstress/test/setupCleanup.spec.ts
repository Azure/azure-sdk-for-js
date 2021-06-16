// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressTest, PerfStressOptionDictionary } from "../src";

/**
 * Showcases and verifies some of the expected behaviors of the setup, globalSetup, cleanup and globalCleanup methods
 * of the PerfStressTest class.
 */
export class SetupCleanupTest extends PerfStressTest {
  public options: PerfStressOptionDictionary = {};

  public state = {
    globalSetup: 0,
    globalCleanup: 0,
    setup: 0,
    cleanup: 0
  };

  public globalSetup() {
    this.state.globalSetup++;
  }

  public setup() {
    this.state.setup++;
  }
  public cleanup() {
    this.state.cleanup++;
  }

  public globalCleanup() {
    if (this.state.globalCleanup > 0) {
      throw new Error("globalCleanup() shouldn't be called more than once.");
    }
    if (this.state.globalSetup !== 1) {
      throw new Error("globalCleanup() should be called exactly once.");
    }
    if (this.state.setup !== this.parsedOptions.parallel.value) {
      throw new Error(
        "setup() should be called exactly as many times as the parallel paramter says."
      );
    }
    if (this.state.cleanup !== this.parsedOptions.parallel.value) {
      throw new Error(
        "cleanup() should be called exactly as many times as the parallel paramter says."
      );
    }
  }

  run(): void {}
  async runAsync(): Promise<void> {}
}

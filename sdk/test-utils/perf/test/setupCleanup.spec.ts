// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfTest, PerfOptionDictionary } from "../src";

/**
 * Showcases and verifies some of the expected behaviors of the setup, globalSetup, cleanup and globalCleanup methods
 * of the PerfTest class.
 */
export class SetupCleanupTest extends PerfTest {
  public options: PerfOptionDictionary = {};

  public state = {
    globalSetup: 0,
    globalCleanup: 0,
    setup: 0,
    cleanup: 0
  };

  public globalSetup(): void {
    this.state.globalSetup++;
  }

  public setup(): void {
    this.state.setup++;
  }
  public cleanup(): void {
    this.state.cleanup++;
  }

  public globalCleanup(): void {
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

  async run(): Promise<void> {
    // do nothing
  }
}

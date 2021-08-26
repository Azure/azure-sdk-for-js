// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { expect } from "chai";
import { RecorderError, RecordingStateManager } from "../src/utils";

describe("TestProxyClient functions", () => {
  it("", function() {});
});

describe("State Manager", function() {
  it("throws error if started twice", function() {
    const manager = new RecordingStateManager();
    manager.state = "started";
    try {
      manager.state = "started";
    } catch (error) {
      expect((error as RecorderError).name).to.equal("RecorderError");
      expect((error as RecorderError).message).to.equal(
        "Already started, should not have called start again."
      );
    }
  });

  it("throws error if stopped twice", function() {
    const manager = new RecordingStateManager();
    try {
      manager.state = "stopped";
    } catch (error) {
      expect((error as RecorderError).name).to.equal("RecorderError");
      expect((error as RecorderError).message).to.equal(
        "Already stopped, should not have called stop again."
      );
    }
  });
});

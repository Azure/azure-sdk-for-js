// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
//
// Mirrors .NET `Azure.ResourceManager.StorageMover.Tests.Scenario.AgentTests`.

import { afterEach, beforeEach, describe, it } from "vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import { setupRecorder } from "./testHelper.js";

describe("AgentTests", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    ({ recorder } = await setupRecorder(ctx));
  });

  afterEach(async () => {
    if (recorder) {
      await recorder.stop();
    }
  });

  // SKIP per cross-language playbook: agents cannot be created by the RP — they
  // need a registered agent VM that we don't have in CI/dev subscriptions.
  // Same skip is applied in the Python and Java ports.
  it.skip("gets agent and updates upload limit schedule (requires registered agent VM)", async () => {
    // Intentionally empty — see the playbook in
    // notes\Work\Tasks\storage-mover-scenario-tests-cross-language.md for the
    // re-enable plan.
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, describe, expect, it, vi } from "vitest";
import { Recorder } from "@azure-tools/test-recorder";
import { NoOpCredential } from "@azure-tools/test-credential";
import { createClient } from "../public/utils/recordedClient.js";
import { createEdgeActionsManagement } from "../../src/api/index.js";
import { responsePolicy } from "../utils/responseSpec.js";

afterEach(() => vi.unstubAllEnvs());

describe("recorded client configuration", () => {
  it("does not mutate shared options when adding recorder policies", (test) => {
    vi.stubEnv("TEST_MODE", "playback");
    vi.stubEnv("SUBSCRIPTION_ID", "00000000-0000-0000-0000-000000000000");
    const recorder = new Recorder(test);
    const options = {
      additionalPolicies: [{ policy: responsePolicy([]), position: "perCall" as const }],
    };
    createClient(recorder, options);
    createClient(recorder, options);
    expect(options.additionalPolicies).toHaveLength(1);
    const context = createEdgeActionsManagement(
      new NoOpCredential(),
      process.env.SUBSCRIPTION_ID!,
      recorder.configureClientOptions(options),
    );
    expect(() => context.pipeline.getOrderedPolicies()).not.toThrow();
  });
});

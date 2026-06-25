// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationClient, FeatureFlag } from "../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { createAppConfigurationClientForTests, startRecorder } from "./utils/testHelpers.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("AppConfigurationClient - FeatureFlag endpoint", () => {
  let client: AppConfigurationClient;
  let recorder: Recorder;
  let featureFlagName: string;
  const label = "label-1";

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    client = createAppConfigurationClientForTests(recorder.configureClientOptions({}));
    featureFlagName = recorder.variable(
      "ff-name",
      `ff-name-${Math.floor(Math.random() * 1000)}`,
    );
  });

  afterEach(async () => {
    try {
      await client.deleteFeatureFlag(featureFlagName, { label });
    } catch {
      // best-effort cleanup
    }
    await recorder.stop();
  });

  it("can set and get a simple feature flag", async () => {
    const setResponse = await client.setFeatureFlag({
      name: featureFlagName,
      label,
      enabled: true,
      description: "a simple feature flag",
    });
    assert.equal(setResponse.name, featureFlagName);
    assert.equal(setResponse.label, label);
    assert.equal(setResponse.enabled, true);

    const getResponse = await client.getFeatureFlag(featureFlagName, { label });
    assert.equal(getResponse.name, featureFlagName);
    assert.equal(getResponse.label, label);
    assert.equal(getResponse.enabled, true);
    assert.equal(getResponse.description, "a simple feature flag");
  });

  it("can set and get a rich feature flag", async () => {
    const richFlag: FeatureFlag = {
      name: featureFlagName,
      label,
      enabled: true,
      description: "a rich feature flag",
      conditions: {
        requirementType: "All",
        filters: [
          {
            name: "Microsoft.TimeWindow",
            parameters: { Start: "Mon, 01 Jan 2024 00:00:00 GMT" },
          },
          {
            name: "Microsoft.Percentage",
            parameters: { Value: "50" },
          },
        ],
      },
      variants: [
        { name: "On", value: "true" },
        { name: "Off", value: "false" },
      ],
      allocation: {
        defaultWhenEnabled: "On",
        defaultWhenDisabled: "Off",
        percentile: [
          { variant: "On", from: 0, to: 50 },
          { variant: "Off", from: 50, to: 100 },
        ],
      },
      telemetry: {
        enabled: true,
      },
      tags: { team: "test" },
    };

    await client.setFeatureFlag(richFlag);

    const getResponse = await client.getFeatureFlag(featureFlagName, { label });
    assert.equal(getResponse.name, featureFlagName);
    assert.equal(getResponse.conditions?.requirementType, "All");
    assert.deepEqual(
      getResponse.conditions?.filters?.map((f) => f.name).sort(),
      ["Microsoft.Percentage", "Microsoft.TimeWindow"],
    );
    assert.deepEqual(
      getResponse.variants?.map((v) => v.name).sort(),
      ["Off", "On"],
    );
    assert.equal(getResponse.allocation?.defaultWhenEnabled, "On");
    assert.equal(getResponse.allocation?.defaultWhenDisabled, "Off");
    assert.equal(getResponse.allocation?.percentile?.length, 2);
    assert.equal(getResponse.telemetry?.enabled, true);
    assert.deepEqual(getResponse.tags, richFlag.tags);
  });

  it("can list feature flags", async () => {
    await client.setFeatureFlag({ name: featureFlagName, label, enabled: true });

    let found = false;
    for await (const flag of client.listFeatureFlags({ nameFilter: featureFlagName })) {
      if (flag.name === featureFlagName) {
        found = true;
        assert.equal(flag.label, label);
      }
    }
    assert.equal(found, true, "Expected to find the feature flag in the list");
  });

  it("can list feature flag revisions", async () => {
    await client.setFeatureFlag({ name: featureFlagName, label, enabled: false });
    await client.setFeatureFlag({ name: featureFlagName, label, enabled: true });

    const revisions: FeatureFlag[] = [];
    for await (const revision of client.listFeatureFlagRevisions({
      nameFilter: featureFlagName,
      labelFilter: label,
    })) {
      revisions.push(revision);
    }
    assert.isAtLeast(revisions.length, 2, "Expected at least two revisions");
  });

  it("can delete a feature flag", async () => {
    await client.setFeatureFlag({ name: featureFlagName, label, enabled: true });
    await client.deleteFeatureFlag(featureFlagName, { label });

    let found = false;
    for await (const flag of client.listFeatureFlags({ nameFilter: featureFlagName })) {
      if (flag.name === featureFlagName) {
        found = true;
      }
    }
    assert.equal(found, false, "Expected the feature flag to be deleted");
  });
});

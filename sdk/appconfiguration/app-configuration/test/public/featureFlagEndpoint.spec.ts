// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FeatureFlag, FeatureFlagClient, FeatureFlagParam } from "../../src/index.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createFeatureFlagClientForTests, startRecorder } from "./utils/testHelpers.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("FeatureFlagClient - FeatureFlag endpoint", () => {
  let client: FeatureFlagClient;
  let recorder: Recorder;
  let featureFlagName: string;
  const label = "label-1";

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    await recorder.setMatcher("CustomDefaultMatcher", {
      excludedHeaders: ["sync-token"],
    });
    client = createFeatureFlagClientForTests(recorder.configureClientOptions({}));
    featureFlagName = recorder.variable("ff-name", `ff-name-${Math.floor(Math.random() * 1000)}`);
  });

  afterEach(async () => {
    try {
      await client.deleteFeatureFlag({ name: featureFlagName, label });
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
    assert.isDefined(setResponse._response);

    const getResponse = await client.getFeatureFlag({ name: featureFlagName, label });
    assert.equal(getResponse.name, featureFlagName);
    assert.equal(getResponse.label, label);
    assert.equal(getResponse.enabled, true);
    assert.equal(getResponse.description, "a simple feature flag");
    assert.equal(getResponse.statusCode, 200);
    assert.isDefined(getResponse._response);
  });

  it("can add a feature flag and fails when it already exists", async () => {
    const addResponse = await client.addFeatureFlag({
      name: featureFlagName,
      label,
      enabled: true,
      description: "an added feature flag",
    });
    assert.equal(addResponse.name, featureFlagName);
    assert.equal(addResponse.label, label);
    assert.equal(addResponse.enabled, true);

    let threw = false;
    try {
      await client.addFeatureFlag({ name: featureFlagName, label, enabled: false });
    } catch (error: any) {
      threw = true;
      assert.equal(error.statusCode, 412);
    }
    assert.equal(threw, true, "Expected adding an existing feature flag to throw a 412");
  });

  it("can set and get a rich feature flag", async () => {
    const richFlag: FeatureFlagParam = {
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

    const getResponse = await client.getFeatureFlag({ name: featureFlagName, label });
    assert.equal(getResponse.name, featureFlagName);
    assert.equal(getResponse.conditions?.requirementType, "All");
    assert.deepEqual(getResponse.conditions?.filters?.map((f) => f.name).sort(), [
      "Microsoft.Percentage",
      "Microsoft.TimeWindow",
    ]);
    assert.deepEqual(getResponse.variants?.map((v) => v.name).sort(), ["Off", "On"]);
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

  // This creates hundreds of feature flags and can hit service throttling, so it is skipped in live mode.
  it("can list feature flags with multiple pages", { skip: isLiveMode() }, async () => {
    const expectedNumberOfLabels = 200;
    let setFeatureFlagPromises = [];

    for (let i = 0; i < expectedNumberOfLabels; i++) {
      setFeatureFlagPromises.push(
        client.setFeatureFlag({
          name: featureFlagName,
          label: i.toString(),
          enabled: true,
        }),
      );

      if (i !== 0 && i % 2 === 0) {
        await Promise.all(setFeatureFlagPromises);
        setFeatureFlagPromises = [];
      }
    }

    await Promise.all(setFeatureFlagPromises);

    const featureFlags: FeatureFlag[] = [];
    for await (const featureFlag of client.listFeatureFlags({ nameFilter: featureFlagName })) {
      featureFlags.push(featureFlag);
    }

    assert.equal(featureFlags.length, expectedNumberOfLabels);
    const uniqueLabels = new Set(featureFlags.map((featureFlag) => featureFlag.label));
    assert.equal(uniqueLabels.size, expectedNumberOfLabels);
    for (let i = 0; i < expectedNumberOfLabels; i++) {
      assert.ok(uniqueLabels.has(i.toString()));
    }

    for (let i = 0; i < expectedNumberOfLabels; i++) {
      await client.deleteFeatureFlag({ name: featureFlagName, label: i.toString() });
    }
  });

  it("can list feature flag revisions", async () => {
    await client.setFeatureFlag({ name: featureFlagName, label, enabled: false });
    await client.setFeatureFlag({ name: featureFlagName, label, enabled: true });

    const revisions: FeatureFlag[] = [];
    const pages = client
      .listFeatureFlagRevisions({
        nameFilter: featureFlagName,
        labelFilter: label,
      })
      .byPage();
    for await (const page of pages) {
      revisions.push(...page.items);
    }
    assert.isAtLeast(revisions.length, 2, "Expected at least two revisions");
  });

  it("can delete a feature flag", async () => {
    await client.setFeatureFlag({ name: featureFlagName, label, enabled: true });
    const deleteResponse = await client.deleteFeatureFlag({ name: featureFlagName, label });
    assert.isTrue(deleteResponse.statusCode === 200 || deleteResponse.statusCode === 204);
    assert.isDefined(deleteResponse._response);

    let found = false;
    for await (const flag of client.listFeatureFlags({ nameFilter: featureFlagName })) {
      if (flag.name === featureFlagName) {
        found = true;
      }
    }
    assert.equal(found, false, "Expected the feature flag to be deleted");
  });
});

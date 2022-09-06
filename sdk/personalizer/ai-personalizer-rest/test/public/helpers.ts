// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { PersonalizerClient, ServiceConfiguration } from "../../src";

export async function isMultiSlotEnabled(client: PersonalizerClient): Promise<boolean> {
  const policy = await client.path("/configurations/policy").get();
  return policy.body.arguments.includes("--ccb_explore_adf");
}

export async function enableMultiSlot(client: PersonalizerClient): Promise<void> {
  const policy = await client.path("/configurations/policy").get();
  if (policy.body.arguments.includes("--ccb_explore_adf")) {
    return;
  }

  const configuration = await client.path("/configurations/service").get();
  if (configuration.body.isAutoOptimizationEnabled) {
    const newConfiguration: ServiceConfiguration = {
      rewardWaitTime: configuration.body.rewardWaitTime,
      rewardAggregation: configuration.body.rewardAggregation,
      defaultReward: configuration.body.defaultReward,
      explorationPercentage: configuration.body.explorationPercentage,
      modelExportFrequency: configuration.body.modelExportFrequency,
      logMirrorEnabled: configuration.body.logMirrorEnabled,
      logMirrorSasUri: configuration.body.logMirrorSasUri,
      logRetentionDays: configuration.body.logRetentionDays,
      learningMode: configuration.body.learningMode,
      isAutoOptimizationEnabled: false,
      autoOptimizationFrequency: configuration.body.autoOptimizationFrequency,
      autoOptimizationStartDate: configuration.body.autoOptimizationStartDate,
    };
    const updateConfigurationResponse = await client
      .path("/configurations/service")
      .put({ body: newConfiguration });
    assert.equal(updateConfigurationResponse.status, "200");
    delay(30000);
  }

  const multiSlotPolicy = {
    name: "enable multislot",
    arguments: policy.body.arguments.replace("--cb_explore_adf", "--ccb_explore_adf"),
  };
  const updatePolicyResponse = await client
    .path("/configurations/policy")
    .put({ body: multiSlotPolicy });
  assert.equal(updatePolicyResponse.status, "200");
  delay(30000);
}

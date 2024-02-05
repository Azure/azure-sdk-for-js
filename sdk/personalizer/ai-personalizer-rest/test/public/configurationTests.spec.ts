// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, delay, env } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import createPersonalizerClient, {
  PersonalizerClient,
  PolicyContract,
  PolicyContractOutput,
  PolicyUpdateParameters,
  ServiceConfiguration,
  ServiceConfigurationOutput,
  ServiceConfigurationUpdateParameters,
  isUnexpected,
} from "../../src";

describe("Configuration Tests", () => {
  let recorder: Recorder;
  let client: PersonalizerClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createPersonalizerClient(
      env["PERSONALIZER_ENDPOINT_SINGLE_SLOT"] ?? "",
      {
        key: env["PERSONALIZER_API_KEY_SINGLE_SLOT"] ?? "",
      },
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("update configuration test", async function () {
    const configuration: ServiceConfigurationUpdateParameters = {
      body: {
        rewardAggregation: "average",
        modelExportFrequency: "PT3M",
        defaultReward: 1.0,
        rewardWaitTime: "PT4H",
        explorationPercentage: 0.3,
        logRetentionDays: 100,
        learningMode: "Online",
      },
    };

    const updatedConfiguration = await updateConfiguration(client, configuration);
    assertServiceConfigurationEquals(updatedConfiguration, configuration.body);
    await delay(30 * 1000);
    const newConfiguration = await getConfiguration(client);
    assertServiceConfigurationEquals(newConfiguration, configuration.body);
  });

  it("update policy test", async function () {
    const policy: PolicyUpdateParameters = {
      body: {
        name: "app1",
        arguments:
          "--cb_explore_adf --quadratic GT --quadratic MR --quadratic GR --quadratic ME --quadratic OT --quadratic OE --quadratic OR --quadratic MS --quadratic GX --ignore A --cb_type ips --epsilon 0.2",
      },
    };
    const updatedPolicy = await updatePolicy(client, policy);
    assertPolicyEquals(updatedPolicy, policy.body);
    await delay(30 * 1000);
    const newPolicy = await getPolicy(client);
    assertPolicyEquals(newPolicy, policy.body);
  });

  it("reset policy test", async function () {
    const expectedPolicy: PolicyContractOutput = {
      name: "app1",
      arguments: "--cb_explore_adf --epsilon 0.2 --power_t 0 -l 0.001 --cb_type mtr -q ::",
    };
    const policyWithReset = await resetPolicy(client);
    assertPolicyEquals(policyWithReset, expectedPolicy);
    await delay(30 * 1000);
    const newPolicy = await getPolicy(client);
    assertPolicyEquals(newPolicy, expectedPolicy);
  });
});

async function getConfiguration(client: PersonalizerClient): Promise<ServiceConfigurationOutput> {
  const response = await client.path("/configurations/service").get();
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  return response.body;
}

async function updateConfiguration(
  client: PersonalizerClient,
  configuration: ServiceConfigurationUpdateParameters,
): Promise<ServiceConfigurationOutput> {
  const response = await client.path("/configurations/service").put(configuration);
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  return response.body;
}

async function getPolicy(client: PersonalizerClient): Promise<PolicyContractOutput> {
  const response = await client.path("/configurations/policy").get();
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  return response.body;
}

async function updatePolicy(
  client: PersonalizerClient,
  policy: PolicyUpdateParameters,
): Promise<PolicyContractOutput> {
  const response = await client.path("/configurations/policy").put(policy);
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  return response.body;
}

async function resetPolicy(client: PersonalizerClient): Promise<PolicyContractOutput> {
  const response = await client.path("/configurations/policy").delete();
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  return response.body;
}
function assertServiceConfigurationEquals(
  actual: ServiceConfigurationOutput,
  expected: ServiceConfiguration,
) {
  assert.equal(actual.rewardAggregation, expected.rewardAggregation);
  assert.equal(actual.modelExportFrequency, expected.modelExportFrequency);
  assert.equal(actual.defaultReward, expected.defaultReward);
  assert.equal(actual.rewardWaitTime, expected.rewardWaitTime);
  assert.equal(actual.explorationPercentage, expected.explorationPercentage);
  assert.equal(actual.logRetentionDays, expected.logRetentionDays);
}

function assertPolicyEquals(actual: PolicyContractOutput, expected: PolicyContract) {
  assert.equal(actual.arguments, expected.arguments);
}

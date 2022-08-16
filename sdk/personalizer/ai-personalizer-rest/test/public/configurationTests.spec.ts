// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, delay } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import Personalizer, {
  GeneratedClient,
  PolicyContract,
  PolicyContractOutput,
  PolicyUpdateParameters,
  ServiceConfiguration,
  ServiceConfigurationOutput,
  ServiceConfigurationUpdateParameters,
} from "../../src";
import { env } from "process";

describe("Configuration Tests", () => {
  let recorder: Recorder;
  let client: GeneratedClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = Personalizer(env["PERSONALIZER_ENDPOINT_SINGLE_SLOT"] ?? "", {
      key: env["PERSONALIZER_API_KEY_SINGLE_SLOT"] ?? "",
    });
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

    const updatedConfiguration = await updateConfigurationAsync(client, configuration);
    assertServiceConfigurationEquals(updatedConfiguration, configuration.body);
    await delay(30 * 1000);
    const newConfiguration = await getConfigurationAsync(client);
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
    const updatedPolicy = await updatePolicyAsync(client, policy);
    assertPolicyEquals(updatedPolicy, policy.body);
    await delay(30 * 1000);
    const newPolicy = await getPolicyAsync(client);
    assertPolicyEquals(newPolicy, policy.body);
  });

  it("reset policy test", async function () {
    const expectedPolicy: PolicyContractOutput = {
      name: "app1",
      arguments: "--cb_explore_adf --epsilon 0.2 --power_t 0 -l 0.001 --cb_type mtr -q ::",
    };
    const resetPolicy = await resetPolicyAsync(client);
    assertPolicyEquals(resetPolicy, expectedPolicy);
    await delay(30 * 1000);
    const newPolicy = await getPolicyAsync(client);
    assertPolicyEquals(newPolicy, expectedPolicy);
  });

  async function getConfigurationAsync(
    client: GeneratedClient
  ): Promise<ServiceConfigurationOutput> {
    const response = await client.path("/configurations/service").get();
    // TODO: isUnexpected does not work as expected since responseMap does not include the baseUrl ( /personalizer/v1.1-preview.3) in the dictionary.
    // if (isUnexpected(response)) {
    //   throw response.body.error.code;
    // }
    return response.body as ServiceConfigurationOutput;
  }

  async function updateConfigurationAsync(
    client: GeneratedClient,
    configuration: ServiceConfigurationUpdateParameters
  ): Promise<ServiceConfigurationOutput> {
    const response = await client.path("/configurations/service").put(configuration);
    // TODO: isUnexpected does not work as expected since responseMap does not include the baseUrl ( /personalizer/v1.1-preview.3) in the dictionary.
    // if (isUnexpected(response)) {
    //   throw response.body.error.code;
    // }
    return response.body as ServiceConfigurationOutput;
  }

  async function getPolicyAsync(client: GeneratedClient): Promise<PolicyContractOutput> {
    const response = await client.path("/configurations/policy").get();
    // TODO: isUnexpected does not work as expected since responseMap does not include the baseUrl ( /personalizer/v1.1-preview.3) in the dictionary.
    // if (isUnexpected(response)) {
    //   throw response.body.error.code;
    // }
    return response.body as PolicyContractOutput;
  }

  async function updatePolicyAsync(
    client: GeneratedClient,
    policy: PolicyUpdateParameters
  ): Promise<PolicyContractOutput> {
    const response = await client.path("/configurations/policy").put(policy);
    // TODO: isUnexpected does not work as expected since responseMap does not include the baseUrl ( /personalizer/v1.1-preview.3) in the dictionary.
    // if (isUnexpected(response)) {
    //   throw response.body.error.code;
    // }
    return response.body as PolicyContractOutput;
  }

  async function resetPolicyAsync(client: GeneratedClient): Promise<PolicyContractOutput> {
    const response = await client.path("/configurations/policy").delete();
    // TODO: isUnexpected does not work as expected since responseMap does not include the baseUrl ( /personalizer/v1.1-preview.3) in the dictionary.
    // if (isUnexpected(response)) {
    //   throw response.body.error.code;
    // }
    return response.body as PolicyContractOutput;
  }
  function assertServiceConfigurationEquals(
    actual: ServiceConfigurationOutput,
    expected: ServiceConfiguration
  ) {
    assert.equal(actual.rewardAggregation, expected.rewardAggregation);
    assert.equal(actual.modelExportFrequency, expected.modelExportFrequency);
    assert.equal(actual.defaultReward, expected.defaultReward);
    assert.equal(actual.rewardWaitTime, expected.rewardWaitTime);
    assert.equal(actual.explorationPercentage, expected.explorationPercentage);
    assert.equal(actual.logRetentionDays, expected.logRetentionDays);
  }
});

function assertPolicyEquals(actual: PolicyContractOutput, expected: PolicyContract) {
  assert.equal(actual.arguments, expected.arguments);
}

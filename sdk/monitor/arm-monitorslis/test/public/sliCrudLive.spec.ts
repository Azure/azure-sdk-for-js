// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { RestError } from "@azure/core-rest-pipeline";
import { assert, afterEach, beforeEach, describe, it } from "vitest";
import { MonitorClient } from "../../src/index.js";
import { createRecorder } from "./utils/recordedClient.js";

const SERVICE_GROUP_NAME = process.env.SERVICE_GROUP_NAME || "arm-sdk-tests-sg";
const AMW_RESOURCE_ID =
  process.env.AMW_RESOURCE_ID ||
  "/subscriptions/6820e35f-0fe6-4af3-aad2-27414fa82621/resourceGroups/mfrei/providers/microsoft.monitor/accounts/streaming-3p-slo-am2cbn-eastus2euap-1";
const MANAGED_IDENTITY_RESOURCE_ID =
  process.env.MANAGED_IDENTITY_RESOURCE_ID ||
  "/subscriptions/6820e35f-0fe6-4af3-aad2-27414fa82621/resourceGroups/mfrei/providers/Microsoft.ManagedIdentity/userAssignedIdentities/mfrei-test-user-managed-identity";
const SOURCE_AMW_RESOURCE_ID = process.env.SOURCE_AMW_RESOURCE_ID || AMW_RESOURCE_ID;
const SOURCE_MANAGED_IDENTITY_RESOURCE_ID =
  process.env.SOURCE_MANAGED_IDENTITY_RESOURCE_ID || MANAGED_IDENTITY_RESOURCE_ID;

function getSliBody() {
  return {
    properties: {
      description: "Live test SLI - measures latency of test API",
      category: "Latency",
      evaluationType: "WindowBased",
      enableAlert: true,
      destinationAmwAccounts: [
        {
          resourceId: AMW_RESOURCE_ID,
          identity: MANAGED_IDENTITY_RESOURCE_ID,
        },
      ],
      baselineProperties: {
        baseline: {
          value: 99,
          evaluationPeriodDays: 30,
          evaluationCalculationType: "CalendarDays",
        },
      },
      sliProperties: {
        windowUptimeCriteria: { target: 95, comparator: ">=" },
        signals: {
          signalFormula: "A",
          signalSources: [
            {
              signalSourceId: "A",
              sourceAmwAccountManagedIdentity: SOURCE_MANAGED_IDENTITY_RESOURCE_ID,
              sourceAmwAccountResourceId: SOURCE_AMW_RESOURCE_ID,
              metricNamespace: "TestMetrics",
              metricName: "TestLatency",
              filters: [
                {
                  dimensionName: "ApiName",
                  operator: "==",
                  value: "TestApi",
                },
              ],
              spatialAggregation: {
                type: "Average",
                dimensions: ["Region"],
              },
              temporalAggregation: {
                type: "Average",
                windowSizeMinutes: 5,
              },
            },
          ],
        },
      },
    },
  };
}

describe("SLI CRUD Live Tests", () => {
  let recorder: Recorder;
  let client: MonitorClient;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    const credential = createTestCredential();
    client = new MonitorClient(credential, recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should perform full CRUD lifecycle", async function () {
    const sliName = recorder.variable("sliName", `jssli${new Date().getTime()}`);

    // Step 1: Create SLI
    const createResult = await client.slis.createOrUpdate(
      SERVICE_GROUP_NAME,
      sliName,
      getSliBody(),
    );
    assert.isNotNull(createResult);
    assert.equal(createResult.name, sliName);
    assert.isNotNull(createResult.properties);
    assert.equal(createResult.properties?.category, "Latency");

    // Step 2: Get SLI - verify it exists
    const getResult = await client.slis.get(SERVICE_GROUP_NAME, sliName);
    assert.isNotNull(getResult);
    assert.equal(getResult.name, sliName);
    assert.isNotNull(getResult.properties);
    assert.equal(getResult.properties?.category, "Latency");

    // Step 3: List SLIs under the parent and verify the created SLI is present
    const sliNames: string[] = [];
    for await (const sli of client.slis.listByParent(SERVICE_GROUP_NAME)) {
      if (sli.name) {
        sliNames.push(sli.name);
      }
    }
    assert.include(sliNames, sliName);

    // Step 4: Delete SLI
    await client.slis.delete(SERVICE_GROUP_NAME, sliName);

    // Step 5: Get SLI - expect 404
    try {
      await client.slis.get(SERVICE_GROUP_NAME, sliName);
      assert.fail("Expected a 404 error but the request succeeded");
    } catch (error) {
      assert.instanceOf(error, RestError);
      assert.equal((error as RestError).statusCode, 404);
    }
  });
});

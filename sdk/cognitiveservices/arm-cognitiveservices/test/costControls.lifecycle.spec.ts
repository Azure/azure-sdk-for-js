/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { randomUUID } from "@azure/core-util";
import { CognitiveServicesManagementClient } from "../src/cognitiveServicesManagementClient.js";
import type { AccountCostControl, CostControlTimePeriod } from "../src/models/index.js";
import { KnownCostControlCategory, KnownCostControlTimeGrain } from "../src/models/index.js";
import { afterEach, assert, beforeEach, describe, expect, it } from "vitest";

const subscriptionIdPlaceholder = "00000000-0000-0000-0000-000000000000";
const resourceGroupPlaceholder = "sanitized-resource-group";
const accountNamePlaceholder = "sanitized-cognitive-account";
const sanitizedEtag = '"sanitized-etag"';

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
    AZURE_SUBSCRIPTION_ID: subscriptionIdPlaceholder,
    AZURE_RESOURCE_GROUP: resourceGroupPlaceholder,
    AZURE_COGNITIVE_SERVICES_ACCOUNT: accountNamePlaceholder,
  },
  removeCentralSanitizers: [
    "AZSDK3493", // Cost Control and rule names are not secrets.
    "AZSDK3430", // Resource IDs are sanitized through the environment variables above.
  ],
  sanitizerOptions: {
    bodyKeySanitizers: [
      { jsonPath: "$.etag", value: sanitizedEtag },
      { jsonPath: "$.value[*].etag", value: sanitizedEtag },
    ],
    headerSanitizers: [
      { key: "etag", value: sanitizedEtag },
      { key: "if-match", value: sanitizedEtag },
      { key: "x-ms-correlation-request-id", value: "sanitized-correlation-request-id" },
      { key: "x-ms-operation-identifier", value: "sanitized-operation-identifier" },
      { key: "x-ms-routing-request-id", value: "sanitized-routing-request-id" },
    ],
  },
};

function createCostControl(amount: number, timePeriod: CostControlTimePeriod): AccountCostControl {
  return {
    properties: {
      category: KnownCostControlCategory.Cost,
      amount,
      timeGrain: KnownCostControlTimeGrain.Monthly,
      timePeriod,
    },
  };
}

function requiredEnvironmentVariable(name: string): string {
  const value = env[name];
  if (!value) {
    throw new Error(`Set the ${name} environment variable before recording or running live tests.`);
  }
  return value;
}

describe("Cost Controls recorded lifecycle", () => {
  let recorder: Recorder;
  let client: CognitiveServicesManagementClient;
  let resourceGroupName: string;
  let accountName: string;
  let costControlName: string;
  let timePeriod: CostControlTimePeriod;
  let recorderStarted: boolean;

  beforeEach(async (context) => {
    recorderStarted = false;
    recorder = new Recorder(context);
    await recorder.start(recorderOptions);
    recorderStarted = true;
    costControlName = recorder.variable("costControlName", `sdk-cost-control-${randomUUID()}`);
    const now = new Date();
    timePeriod = {
      startDate: new Date(
        recorder.variable(
          "startDate",
          new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString(),
        ),
      ),
      endDate: new Date(
        recorder.variable(
          "endDate",
          new Date(Date.UTC(now.getUTCFullYear() + 1, now.getUTCMonth(), 1)).toISOString(),
        ),
      ),
    };

    const subscriptionId = requiredEnvironmentVariable("AZURE_SUBSCRIPTION_ID");
    resourceGroupName = requiredEnvironmentVariable("AZURE_RESOURCE_GROUP");
    accountName = requiredEnvironmentVariable("AZURE_COGNITIVE_SERVICES_ACCOUNT");
    client = new CognitiveServicesManagementClient(
      createTestCredential(),
      subscriptionId,
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async () => {
    if (recorderStarted) {
      await recorder.stop();
    }
  });

  it("creates, gets, lists, updates, deletes, and confirms deletion", async () => {
    let created = false;
    let testFailed = false;

    try {
      const createdCostControl = await client.accountCostControls.createOrUpdate(
        resourceGroupName,
        accountName,
        costControlName,
        createCostControl(25, timePeriod),
        { ifNoneMatch: "*" },
      );
      created = true;
      assert.equal(createdCostControl.name, costControlName);
      expect(createdCostControl.properties).toMatchObject({
        category: "Cost",
        amount: 25,
        timeGrain: "Monthly",
        timePeriod,
      });
      assert.isEmpty(createdCostControl.properties?.notifications ?? {});
      assert.isEmpty(createdCostControl.properties?.providerProperties?.actions ?? {});

      await client.accountCostControls.checkExistence(
        resourceGroupName,
        accountName,
        costControlName,
      );
      const fetched = await client.accountCostControls.get(
        resourceGroupName,
        accountName,
        costControlName,
      );
      assert.isString(fetched.etag);
      assert.equal(fetched.properties?.category, "Cost");
      assert.equal(fetched.properties?.amount, 25);
      assert.deepEqual(fetched.properties?.timePeriod, timePeriod);

      const listed: AccountCostControl[] = [];
      for await (const item of client.accountCostControls.list(resourceGroupName, accountName)) {
        listed.push(item);
      }
      assert.include(
        listed.map((item) => item.name),
        costControlName,
      );

      const updated = await client.accountCostControls.update(
        resourceGroupName,
        accountName,
        costControlName,
        {
          properties: {
            amount: 50,
          },
        },
        { ifMatch: isPlaybackMode() ? sanitizedEtag : fetched.etag },
      );
      assert.equal(updated.properties?.amount, 50);
      assert.equal(updated.properties?.category, fetched.properties?.category);
      assert.equal(updated.properties?.timeGrain, fetched.properties?.timeGrain);
      assert.deepEqual(updated.properties?.timePeriod, timePeriod);

      const fetchedAfterUpdate = await client.accountCostControls.get(
        resourceGroupName,
        accountName,
        costControlName,
      );
      assert.isString(fetchedAfterUpdate.etag);
      assert.equal(fetchedAfterUpdate.properties?.amount, 50);

      await client.accountCostControls.delete(resourceGroupName, accountName, costControlName, {
        ifMatch: isPlaybackMode() ? sanitizedEtag : fetchedAfterUpdate.etag,
      });
      created = false;

      await expect(
        client.accountCostControls.get(resourceGroupName, accountName, costControlName),
      ).rejects.toMatchObject({ statusCode: 404 });
      await expect(
        client.accountCostControls.checkExistence(resourceGroupName, accountName, costControlName),
      ).rejects.toMatchObject({ statusCode: 404 });
    } catch (error) {
      testFailed = true;
      throw error;
    } finally {
      if (created) {
        try {
          await client.accountCostControls.delete(resourceGroupName, accountName, costControlName);
        } catch (error) {
          if (
            typeof error !== "object" ||
            error === null ||
            !("statusCode" in error) ||
            error.statusCode !== 404
          ) {
            if (!testFailed) {
              throw error;
            }
            console.error("Failed to clean up the test cost control.", error);
          }
        }
      }
    }
  });
});

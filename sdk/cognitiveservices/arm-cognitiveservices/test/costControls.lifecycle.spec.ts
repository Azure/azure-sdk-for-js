/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, isPlaybackMode, Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { CognitiveServicesManagementClient } from "../src/cognitiveServicesManagementClient.js";
import type { CostControl, CostControlRule } from "../src/models/index.js";
import { afterEach, assert, beforeEach, describe, expect, it } from "vitest";

const subscriptionIdPlaceholder = "00000000-0000-0000-0000-000000000000";
const resourceGroupPlaceholder = "sanitized-resource-group";
const accountNamePlaceholder = "sanitized-cognitive-account";
const sanitizedEtag = '"sanitized-etag"';
const recordedApiVersion = "2026-09-15-preview";

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

const costControlName = "sdk-cost-control-lifecycle";

function createRule(amount: number): CostControlRule {
  return {
    name: "account-budget",
    counterKey: [{ type: "account" }],
    unit: "usd",
    amount,
    period: "month",
    recurring: true,
    thresholds: [{ type: "percentage", value: 0, action: "audit" }],
  };
}

function createCostControl(displayName: string, amount: number): CostControl {
  return {
    properties: {
      displayName,
      rules: [createRule(amount)],
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

  beforeEach(async (context) => {
    recorder = new Recorder(context);
    await recorder.start(recorderOptions);
    await recorder.addSanitizers(
      {
        uriSanitizers: [
          {
            regex: true,
            target: "api-version=[^&]+",
            value: `api-version=${recordedApiVersion}`,
          },
        ],
      },
      ["playback"],
    );

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
    await recorder.stop();
  });

  it("creates, gets, lists, updates, deletes, and confirms deletion", async () => {
    let created = false;
    let testFailed = false;

    try {
      const createdCostControl = await client.costControls.createOrUpdate(
        resourceGroupName,
        accountName,
        costControlName,
        createCostControl("SDK Cost Control lifecycle", 25),
        { ifNoneMatch: "*" },
      );
      created = true;
      assert.equal(createdCostControl.name, costControlName);
      assert.equal(createdCostControl.properties?.rules[0].thresholds?.[0].action, "audit");

      const fetched = await client.costControls.get(
        resourceGroupName,
        accountName,
        costControlName,
      );
      assert.isString(fetched.etag);
      assert.equal(fetched.properties?.rules[0].amount, 25);

      const listed: CostControl[] = [];
      for await (const item of client.costControls.list(resourceGroupName, accountName)) {
        listed.push(item);
      }
      assert.include(
        listed.map((item) => item.name),
        costControlName,
      );

      const updated = await client.costControls.update(
        resourceGroupName,
        accountName,
        costControlName,
        {
          properties: {
            displayName: "SDK Cost Control lifecycle updated",
            rules: [createRule(50)],
          },
        },
        { ifMatch: isPlaybackMode() ? sanitizedEtag : fetched.etag },
      );
      assert.equal(updated.properties?.displayName, "SDK Cost Control lifecycle updated");
      assert.equal(updated.properties?.rules[0].amount, 50);

      const fetchedAfterUpdate = await client.costControls.get(
        resourceGroupName,
        accountName,
        costControlName,
      );
      assert.isString(fetchedAfterUpdate.etag);
      assert.equal(fetchedAfterUpdate.properties?.rules[0].amount, 50);

      await client.costControls.delete(resourceGroupName, accountName, costControlName, {
        ifMatch: isPlaybackMode() ? sanitizedEtag : fetchedAfterUpdate.etag,
      });
      created = false;

      await expect(
        client.costControls.get(resourceGroupName, accountName, costControlName),
      ).rejects.toMatchObject({ statusCode: 404 });
    } catch (error) {
      testFailed = true;
      throw error;
    } finally {
      if (created) {
        try {
          await client.costControls.delete(resourceGroupName, accountName, costControlName);
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
          }
        }
      }
    }
  });
});

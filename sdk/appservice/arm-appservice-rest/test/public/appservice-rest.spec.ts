// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode, env } from "@azure-tools/test-recorder";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import type { WebSiteManagementClient } from "@azure-rest/arm-appservice";
import { paginate, getLongRunningPoller } from "@azure-rest/arm-appservice";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

export const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Web test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: WebSiteManagementClient;
  let resourceGroup: string;
  let appservicePlanName: string;
  let name: string;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createClient(recorder);
    subscriptionId = env.SUBSCRIPTION_ID ?? "";
    resourceGroup = env.RESOURCE_GROUP ?? "";
    appservicePlanName = "myappserviceplanxxx";
    name = "mysitexxxx";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("appServicePlans create test", async () => {
    const initialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}",
        subscriptionId,
        resourceGroup,
        appservicePlanName,
      )
      .put({
        body: {
          location: "eastus",
          sku: {
            name: "S1",
            tier: "STANDARD",
            capacity: 1,
          },
          properties: {
            perSiteScaling: false,
            isXenon: false,
          },
        },
      });
    const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);
    const res = await poller.pollUntilDone();
    assert.strictEqual(res.status, "200");
    assert.isTrue(res.body !== undefined);
  });

  it("webApps create test", async () => {
    const initialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}",
        subscriptionId,
        resourceGroup,
        name,
      )
      .put({
        body: {
          location: "eastus",
          properties: {
            serverFarmId:
              "/subscriptions/" +
              subscriptionId +
              `/resourceGroups/${env.RESOURCE_GROUP}/providers/Microsoft.Web/serverfarms/myappserviceplanxxx`,
            reserved: false,
            isXenon: false,
            hyperV: false,
            siteConfig: {
              netFrameworkVersion: "v4.6",
              appSettings: [
                {
                  name: "WEBSITE_NODE_DEFAULT_VERSION",
                  value: "10.14",
                },
              ],
              localMySqlEnabled: false,
              http20Enabled: true,
            },
            scmSiteAlsoStopped: false,
            httpsOnly: false,
          },
        },
      });
    const poller = await getLongRunningPoller(client, initialResponse, testPollingOptions);
    const res = await poller.pollUntilDone();
    assert.strictEqual(res.status, "200");
    assert.isTrue(res.body !== undefined);
  });

  it("appServicePlans get test", async () => {
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}",
        subscriptionId,
        resourceGroup,
        appservicePlanName,
      )
      .get();
    assert.strictEqual(res.status, "200");
  });

  it("webApps get test", async () => {
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}",
        subscriptionId,
        resourceGroup,
        name,
      )
      .get();
    assert.strictEqual(res.status, "200");
  });

  it.skip("appServicePlans list test", async () => {
    const resArray = new Array();
    const initialResposne = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms",
        subscriptionId,
        resourceGroup,
      )
      .get();
    /**
     *  {
          status: '200',
          body: { value: [ [Object] ], nextLink: null, id: null }
        }
    */
    // Body Property nextLink should be a string or undefined
    const res = paginate(client, initialResposne);
    for await (const item of res) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("webApps list test", async () => {
    const resArray = new Array();
    const initialResposne = await client
      .path("/subscriptions/{subscriptionId}/providers/Microsoft.Web/sites", subscriptionId)
      .get();
    const res = paginate(client, initialResposne);
    for await (const item of res) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("webApps update test", async () => {
    const res = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}",
        subscriptionId,
        resourceGroup,
        name,
      )
      .patch({
        body: {
          properties: {
            serverFarmId:
              "/subscriptions/" +
              subscriptionId +
              `/resourceGroups/${env.RESOURCE_GROUP}/providers/Microsoft.Web/serverfarms/myappserviceplanxxx`,
            reserved: false,
            isXenon: false,
            hyperV: false,
            siteConfig: {
              netFrameworkVersion: "v4.6",
              localMySqlEnabled: false,
              http20Enabled: true,
            },
            scmSiteAlsoStopped: false,
          },
        },
      });
    assert.strictEqual(res.status, "200");
    assert.isTrue(res.body !== undefined);
  });

  it("webApps delete test", async () => {
    await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}",
        subscriptionId,
        resourceGroup,
        name,
      )
      .delete();
    const resArray = new Array();
    const initialResposne = await client
      .path("/subscriptions/{subscriptionId}/providers/Microsoft.Web/sites", subscriptionId)
      .get();
    const result = paginate(client, initialResposne);
    for await (const item of result) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });

  it("appServicePlans delete test", async () => {
    await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}",
        subscriptionId,
        resourceGroup,
        appservicePlanName,
      )
      .delete();
    const resArray = new Array();
    const initialResposne = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms",
        subscriptionId,
        resourceGroup,
      )
      .get();
    const result = paginate(client, initialResposne);
    for await (const item of result) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });
});

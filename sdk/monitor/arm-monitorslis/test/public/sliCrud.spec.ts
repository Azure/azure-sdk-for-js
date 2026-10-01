// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { MonitorClient } from "../../src/index.js";
import type { Sli } from "../../src/models/index.js";
import { afterEach, assert, beforeEach, describe, it } from "vitest";

const sanitizedSubscriptionId = "00000000-0000-0000-0000-000000000000";
const sanitizedResourceGroup = "arm-sdk-tests-rg";
const sanitizedAmwResourceId = `/subscriptions/${sanitizedSubscriptionId}/resourceGroups/${sanitizedResourceGroup}/providers/microsoft.monitor/accounts/amw-arm-sdk-tests-rg`;
const sanitizedManagedIdentityResourceId = `/subscriptions/${sanitizedSubscriptionId}/resourceGroups/${sanitizedResourceGroup}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/uami-arm-sdk-tests-rg`;
const sanitizedServiceGroupName = "arm-sdk-tests-sg";

const envSetupForPlayback: Record<string, string> = {
  AZURE_SUBSCRIPTION_ID: sanitizedSubscriptionId,
  AZURE_TENANT_ID: "72f988bf-86f1-41af-91ab-2d7cd011db47",
  AMW_RESOURCE_ID: sanitizedAmwResourceId,
  MANAGED_IDENTITY_RESOURCE_ID: sanitizedManagedIdentityResourceId,
  SERVICE_GROUP_NAME: sanitizedServiceGroupName,
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
};

describe("Microsoft.Monitor/slis live test", () => {
  let recorder: Recorder;
  let client: MonitorClient;
  let serviceGroupName: string;
  let amwResourceId: string;
  let managedIdentityResourceId: string;
  let sliName: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);

    const credential = createTestCredential();
    client = new MonitorClient(credential, recorder.configureClientOptions({}));

    serviceGroupName = env.SERVICE_GROUP_NAME ?? sanitizedServiceGroupName;
    amwResourceId = env.AMW_RESOURCE_ID ?? sanitizedAmwResourceId;
    managedIdentityResourceId =
      env.MANAGED_IDENTITY_RESOURCE_ID ?? sanitizedManagedIdentityResourceId;
    sliName = recorder.variable("sliName", `jssli${Date.now()}`);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("creates, gets, and deletes an SLI", async () => {
    const sli: Sli = {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          [managedIdentityResourceId]: {},
        },
      },
      properties: {
        description: "Live test SLI - measures latency of test API",
        category: "Latency",
        evaluationType: "WindowBased",
        destinationAmwAccounts: [
          {
            resourceId: amwResourceId,
            identity: managedIdentityResourceId,
          },
        ],
        baselineProperties: {
          baseline: {
            value: 99,
            evaluationPeriodDays: 30,
            evaluationCalculationType: "CalendarDays",
          },
        },
        enableAlert: true,
        sliProperties: {
          windowUptimeCriteria: {
            target: 95,
            comparator: "gte",
          },
          signals: {
            signalSources: [
              {
                signalSourceId: "A",
                sourceAmwAccountManagedIdentity: managedIdentityResourceId,
                sourceAmwAccountResourceId: amwResourceId,
                // Real Azure Managed Prometheus metric scraped by an AKS
                // cluster with the Azure Monitor metrics addon turned on and
                // pointed at this AMW. container_cpu_usage_seconds_total is
                // always populated.
                metricNamespace: "customdefault",
                metricName: "container_cpu_usage_seconds_total",
                filters: [
                  {
                    dimensionName: "container",
                    operator: "ne",
                    value: "POD",
                  },
                ],
                spatialAggregation: {
                  type: "Sum",
                  dimensions: ["instance"],
                },
                temporalAggregation: {
                  type: "Rate",
                  windowSizeMinutes: 1,
                },
              },
            ],
            signalFormula: "A",
          },
        },
      },
    };

    const created = await client.slis.createOrUpdate(serviceGroupName, sliName, sli);
    assert.isOk(created.name);
    // The proxy may sanitize generated names to the literal "Sanitized".
    assert.include([sliName, "Sanitized"], created.name as string);

    const fetched = await client.slis.get(serviceGroupName, sliName);
    assert.equal(fetched.properties?.category, "Latency");
    assert.equal(fetched.properties?.evaluationType, "WindowBased");

    await client.slis.delete(serviceGroupName, sliName);

    let getAfterDeleteError: unknown;
    try {
      await client.slis.get(serviceGroupName, sliName);
    } catch (err) {
      getAfterDeleteError = err;
    }
    assert.isDefined(getAfterDeleteError, "expected a 404 after delete");
    const status = (getAfterDeleteError as { statusCode?: number }).statusCode;
    assert.equal(status, 404);
  }, 600_000);
});

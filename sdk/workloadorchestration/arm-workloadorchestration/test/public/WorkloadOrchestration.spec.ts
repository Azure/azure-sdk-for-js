/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { env, Recorder, isPlaybackMode } from "@azure-tools/test-recorder";

import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";
import { WorkloadOrchestrationManagementClient } from "../../src/workloadOrchestrationManagementClient.js";

import * as logger from '@azure/logger';  

logger.setLogLevel('verbose');  

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("WorkloadOrchestration test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: WorkloadOrchestrationManagementClient;

  beforeEach(async (context) => {
    process.env.SystemRoot = process.env.SystemRoot || "C:\\Windows";
    recorder = await createRecorder(context);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new WorkloadOrchestrationManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("configTemplates list test", async function () {
    const resArray = new Array();
    for await (let item of client.configTemplates.listBySubscription()) {
      resArray.push(item);
    }
    assert.ok(resArray);
  });

  it.only("solutionTemplates createVersion test", async function () {
    const resourceGroupName = "test-rg";
    const solutionTemplateName = "test-solution-template";
    const schemaName = "test-schema";
    const schemaVersion = "1.0.0";
    const version = "1.0.0";

    const configurationsStr = `schema:
  name: ${schemaName}
  version: ${schemaVersion}
configs:
  AppName: Hotmelt
  TemperatureRangeMax: \${{$val(TemperatureRangeMax)}}
  ErrorThreshold: \${{$val(ErrorThreshold)}}
  HealthCheckEndpoint: \${{$val(HealthCheckEndpoint)}}
  EnableLocalLog: \${{$val(EnableLocalLog)}}
  AgentEndpoint: \${{$val(AgentEndpoint)}}
  HealthCheckEnabled: \${{$val(HealthCheckEnabled)}}
  ApplicationEndpoint: \${{$val(ApplicationEndpoint)}}`;

    const result = await client.solutionTemplates.createVersion(
      resourceGroupName,
      solutionTemplateName,
      {
        version: version,
        solutionTemplateVersion: {
          properties: {
            configurations: configurationsStr,
            specification: {
              components: [
                {
                  name: "helmcomponent",
                  type: "helm.v3",
                  properties: {
                    chart: {
                      repo: "ghcr.io/eclipse-symphony/tests/helm/simple-chart",
                      version: "0.3.0",
                      wait: true,
                      timeout: "5m",
                    },
                  },
                },
              ],
            },
            orchestratorType: "TO",
          },
        },
      },
    );

    assert.ok(result);
    assert.ok(result.properties);
    console.log("Solution template version created successfully:", result.name);
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../src/index.js";
import type { RedTeam } from "../../../src/index.js";

describe("red team - basic operations", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create and get a red team scan", async function () {
    const modelEndpoint = process.env["RED_TEAM_MODEL_ENDPOINT"] || "<red team model endpoint>";
    const modelApiKey = process.env["RED_TEAM_MODEL_API_KEY"] || "<red team model API key>";
    const deploymentName = "gpt-5.2";

    const redTeam: RedTeam = {
      name: "",
      attackStrategies: ["base64"],
      riskCategories: ["Violence"],
      displayName: "redteamtest1",
      target: {
        type: "AzureOpenAIModel",
        modelDeploymentName: deploymentName,
      },
    };

    const redTeamResponse = await projectsClient.beta.redTeams.create(redTeam, {
      requestOptions: {
        headers: {
          "model-endpoint": modelEndpoint,
          "model-api-key": modelApiKey,
        },
      },
    });

    assert.isNotNull(redTeamResponse);
    assert.isNotNull(redTeamResponse.name);
    console.log(`Red Team scan created with scan name: ${redTeamResponse.name}`);

    // Get the red team scan
    const getRedTeamResponse = await projectsClient.beta.redTeams.get(redTeamResponse.name);
    assert.isNotNull(getRedTeamResponse);
    assert.equal(getRedTeamResponse.name, redTeamResponse.name);
    console.log(`Red Team scan status: ${getRedTeamResponse.status}`);
  });

  it("should list red team scans", async function () {
    const scans: RedTeam[] = [];
    for await (const scan of projectsClient.beta.redTeams.list()) {
      scans.push(scan);
      console.log(`Found scan: ${scan.name}, Status: ${scan.status}`);
    }

    assert.isArray(scans);
    console.log(`Total scans found: ${scans.length}`);
  });
});

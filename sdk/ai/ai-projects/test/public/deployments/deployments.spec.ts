// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../src/index.js";
import type { ModelDeployment, Deployment } from "../../../src/index.js";

describe("deployments - basic operations", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all deployments", async function () {
    const deployments: ModelDeployment[] = [];

    for await (const deployment of projectsClient.deployments.list()) {
      if (
        deployment.type === "ModelDeployment" &&
        "modelName" in deployment &&
        "modelPublisher" in deployment &&
        "modelVersion" in deployment
      ) {
        deployments.push(deployment);
      }
    }

    assert.isArray(deployments);
    console.log(`Retrieved ${deployments.length} model deployments`);
    for (const deployment of deployments) {
      console.log(
        `  name: ${deployment.name}, publisher: ${deployment.modelPublisher}, model: ${deployment.modelName}`,
      );
    }
  });

  it("should list deployments filtered by model publisher", async function () {
    const modelPublisher = process.env["MODEL_PUBLISHER"] || "Microsoft";
    const filteredDeployments: ModelDeployment[] = [];

    for await (const deployment of projectsClient.deployments.list({ modelPublisher })) {
      if (deployment.type === "ModelDeployment" && "modelPublisher" in deployment) {
        filteredDeployments.push(deployment);
      }
    }

    assert.isArray(filteredDeployments);
    console.log(
      `Retrieved ${filteredDeployments.length} deployments from model publisher '${modelPublisher}'`,
    );
  });

  it("should get a single deployment by name", async function () {
    const deployments: Deployment[] = [];

    for await (const deployment of projectsClient.deployments.list()) {
      if (deployment.type === "ModelDeployment") {
        deployments.push(deployment);
        if (deployments.length >= 1) break;
      }
    }

    if (deployments.length === 0) {
      console.log("No deployments found, skipping get test");
      return;
    }

    const deploymentName = deployments[0].name;
    const singleDeployment = await projectsClient.deployments.get(deploymentName);

    assert.isNotNull(singleDeployment);
    assert.equal(singleDeployment.name, deploymentName);
    console.log(`Retrieved deployment: ${JSON.stringify(singleDeployment)}`);
  });
});

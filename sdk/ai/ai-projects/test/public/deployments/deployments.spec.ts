// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient, DeploymentsOperations, ModelDeployment } from "@azure/ai-projects";

describe("deployments - basic", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let deployments: DeploymentsOperations;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    deployments = projectsClient.deployments;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and connection operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(deployments);
  });

  it("should list deployments", async function () {
    // List deployments
    const deploymentsListIterator = deployments.list();
    const deploymentNames: string[] = [];
    for await (const deployment of deploymentsListIterator) {
      deploymentNames.push(deployment.name);
    }

    assert.isNotNull(deploymentNames);

    const deploymentName = deploymentNames[0];
    const deployment = await deployments.get(deploymentName);
    assert.isNotNull(deployment);
    assert.equal(deployment.name, deploymentName);
  });

  it("should retrieve a deployment with publisher", async function () {
    // List deployments
    const allAeploymentList: ModelDeployment[] = [];
    const allDeploymentsListIterator = deployments.list();
    for await (const deployment of allDeploymentsListIterator) {
      allAeploymentList.push(deployment as ModelDeployment);
    }

    assert.isNotNull(allAeploymentList);

    const modelPublisher = allAeploymentList[0].modelPublisher;
    // List deployments with a specific publisher
    const deploymentsListIterator = deployments.list({
      modelPublisher,
    });
    const deploymentsList: ModelDeployment[] = [];
    for await (const deployment of deploymentsListIterator) {
      deploymentsList.push(deployment as ModelDeployment);
    }

    assert.isNotNull(deploymentsList);
  });
});

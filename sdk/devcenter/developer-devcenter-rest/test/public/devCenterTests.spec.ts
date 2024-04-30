// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient, createRecorder } from "./utils/recordedClient.js";
import { describe, it, beforeEach, afterEach, expect } from "vitest";
import {
  AzureDeveloperDevCenterClient,
  ProjectOutput,
  isUnexpected,
  paginate,
} from "../../src/index.js";

describe("DevCenter Project Operations Tests", function () {
  let recorder: Recorder;
  let client: AzureDeveloperDevCenterClient;
  let endpoint: string;

  beforeEach(async function (context) {
    recorder = await createRecorder(context);
    endpoint = env["ENDPOINT"] || "";

    client = createRecordedClient(recorder, endpoint, {
      allowInsecureConnection: false,
    });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Get project in a DevCenter", async function () {
    const projectName = env["DEFAULT_PROJECT_NAME"] || "";
    const project = await client.path("/projects/{projectName}", projectName).get();

    if (isUnexpected(project)) {
      throw project.body.error;
    }

    expect(project.body.name).to.equal(env["DEFAULT_PROJECT_NAME"]);
  });

  it("List all projects in a DevCenter", async function () {
    const projectList = await client.path("/projects").get();
    const projects: ProjectOutput[] = [];

    if (isUnexpected(projectList)) {
      throw projectList.body.error;
    }

    console.log("Iterating through project results:");

    for await (const project of paginate(client, projectList)) {
      const { name } = project;
      console.log(`Received project "${name}"`);
      projects.push(project);
    }

    expect(projects.length).to.equal(1);
    expect(projects[0].name).to.equal(env["DEFAULT_PROJECT_NAME"]);
  });
});

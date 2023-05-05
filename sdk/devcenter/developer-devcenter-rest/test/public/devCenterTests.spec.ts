// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, Recorder } from "@azure-tools/test-recorder";
import { assert, expect } from "chai";
import { createRecordedClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import {
  AzureDevCenterClient,
  ProjectOutput,
  isUnexpected,
  paginate
} from "../../src/index";

describe("DevCenter Project Operations Tests", () => {
    let recorder: Recorder;
    let client: AzureDevCenterClient;
    let endpoint: string;
    
    beforeEach(async function (this: Context) {
        recorder = await createRecorder(this);
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
    })

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
    })
})
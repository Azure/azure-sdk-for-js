// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient, ToolUnion } from "../../../src/index.js";

const toolboxName = "test-toolbox";

const webSearchTool: ToolUnion = {
  type: "web_search",
};

describe("toolboxes - basic operations", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create, get, list, update, and delete a toolbox", async function () {
    // Create a toolbox version
    const version = await projectsClient.beta.toolboxes.createVersion(
      toolboxName,
      [webSearchTool],
      {
        description: "Test toolbox",
      },
    );
    assert.isNotNull(version);
    assert.equal(version.name, toolboxName);
    assert.isNotNull(version.version);
    assert.isNotNull(version.id);
    assert.isArray(version.tools);
    assert.isTrue(version.tools.length >= 1);
    console.log(`Created toolbox version: ${version.name} v${version.version}`);

    // Get the toolbox
    const retrieved = await projectsClient.beta.toolboxes.get(toolboxName);
    assert.isNotNull(retrieved);
    assert.equal(retrieved.name, toolboxName);
    assert.isNotNull(retrieved.default_version);
    console.log(
      `Retrieved toolbox: ${retrieved.name} (default_version: ${retrieved.default_version})`,
    );

    // List toolboxes
    const allToolboxes = [];
    for await (const tb of projectsClient.beta.toolboxes.list()) {
      allToolboxes.push(tb);
    }
    assert.isTrue(allToolboxes.length >= 1);
    console.log(`Found ${allToolboxes.length} toolbox(es)`);

    // Update the toolbox to point to the created version
    const updated = await projectsClient.beta.toolboxes.update(toolboxName, version.version);
    assert.isNotNull(updated);
    assert.equal(updated.name, toolboxName);
    assert.equal(updated.default_version, version.version);
    console.log(`Updated toolbox default_version to: ${updated.default_version}`);

    // Delete the toolbox
    await projectsClient.beta.toolboxes.delete(toolboxName);
    console.log(`Deleted toolbox: ${toolboxName}`);
  });

  it("should manage toolbox versions", async function () {
    // Create first version
    const v1 = await projectsClient.beta.toolboxes.createVersion(toolboxName, [webSearchTool], {
      description: "Version 1",
    });
    assert.isNotNull(v1);
    assert.isNotNull(v1.version);
    console.log(`Created v1: ${v1.version}`);

    // Create second version with a different tool type
    const codeInterpreterTool: ToolUnion = {
      type: "code_interpreter",
    };
    const v2 = await projectsClient.beta.toolboxes.createVersion(
      toolboxName,
      [codeInterpreterTool],
      {
        description: "Version 2",
      },
    );
    assert.isNotNull(v2);
    assert.isNotNull(v2.version);
    assert.notEqual(v1.version, v2.version);
    console.log(`Created v2: ${v2.version}`);

    // Get a specific version
    const retrievedV1 = await projectsClient.beta.toolboxes.getVersion(toolboxName, v1.version);
    assert.isNotNull(retrievedV1);
    assert.equal(retrievedV1.version, v1.version);
    console.log(`Retrieved version: ${retrievedV1.version}`);

    // List all versions
    const versions = [];
    for await (const v of projectsClient.beta.toolboxes.listVersions(toolboxName)) {
      versions.push(v);
    }
    assert.isTrue(versions.length >= 2);
    console.log(`Found ${versions.length} version(s)`);

    // Set v2 as default so v1 can be deleted
    await projectsClient.beta.toolboxes.update(toolboxName, v2.version);

    // Delete a specific version
    await projectsClient.beta.toolboxes.deleteVersion(toolboxName, v1.version);
    console.log(`Deleted version: ${v1.version}`);

    // Clean up
    await projectsClient.beta.toolboxes.delete(toolboxName);
    console.log(`Deleted toolbox: ${toolboxName}`);
  });
});

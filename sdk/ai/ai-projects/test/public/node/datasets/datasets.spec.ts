// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../../src/index.js";
import { fileURLToPath } from "node:url";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("datasets - basic operations", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should upload a file and create a dataset version", async function () {
    const containerConnectionName = assertEnvironmentVariable("AZURE_STORAGE_CONNECTION_NAME");
    const datasetName = "sample-dataset-basic";
    const version1 = "1.0.2";

    const dataset1 = await projectsClient.datasets.uploadFile(
      datasetName,
      version1,
      path.join(__dirname, "data", "sample_folder", "sample_file1.txt"),
      {
        connectionName: containerConnectionName,
      },
    );

    assert.isNotNull(dataset1);
    assert.equal(dataset1.name, datasetName);
    assert.equal(dataset1.version, version1);
    console.log("Dataset created:", JSON.stringify(dataset1));

    // Clean up
    await projectsClient.datasets.delete(datasetName, version1);
    console.log("Dataset deleted");
  });

  it("should upload a folder and create a dataset version", async function () {
    const containerConnectionName = assertEnvironmentVariable("AZURE_STORAGE_CONNECTION_NAME");
    const folderDatasetName = "sample-dataset-basic-folder";
    const version2 = "2.0.2";

    const dataset2 = await projectsClient.datasets.uploadFolder(
      folderDatasetName,
      version2,
      path.join(__dirname, "data", "sample_folder"),
      {
        connectionName: containerConnectionName,
        filePattern: "sample_file[1-2]\\.txt$",
      },
    );

    assert.isNotNull(dataset2);
    assert.equal(dataset2.name, folderDatasetName);
    console.log("Dataset folder created:", JSON.stringify(dataset2));

    // Clean up
    await projectsClient.datasets.delete(folderDatasetName, version2);
    console.log("Dataset deleted");
  });

  it("should get a dataset version and list versions", async function () {
    const containerConnectionName = assertEnvironmentVariable("AZURE_STORAGE_CONNECTION_NAME");
    const datasetName = "sample-dataset-list-test";
    const version1 = "1.0.2";

    // Create a dataset to list
    const dataset = await projectsClient.datasets.uploadFile(
      datasetName,
      version1,
      path.join(__dirname, "data", "sample_folder", "sample_file1.txt"),
      {
        connectionName: containerConnectionName,
      },
    );
    assert.isNotNull(dataset);

    // Get the specific version
    const datasetVersion = await projectsClient.datasets.get(datasetName, version1);
    assert.isNotNull(datasetVersion);
    assert.equal(datasetVersion.name, datasetName);
    assert.equal(datasetVersion.version, version1);
    console.log("Dataset version:", JSON.stringify(datasetVersion));

    // List all versions
    const versions = [];
    for await (const version of projectsClient.datasets.listVersions(datasetName)) {
      versions.push(version);
    }
    assert.isTrue(versions.length >= 1);
    console.log(`Retrieved ${versions.length} versions`);

    // Clean up
    await projectsClient.datasets.delete(datasetName, version1);
    console.log("Dataset deleted");
  });
});

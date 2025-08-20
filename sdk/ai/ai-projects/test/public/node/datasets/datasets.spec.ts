// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import type {
  AIProjectClient,
  DatasetVersionUnion,
  DatasetsOperations,
} from "@azure/ai-projects";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("datasets - basic", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let datasets: DatasetsOperations;
  const datasetName = "test-dataset";
  const folderDatasetName = "test-folder-dataset";
  // Test may fail, if happens please use a different version
  const VERSION1 = "1.4.10";
  const VERSION1_UPDATE = "1.5.10";
  const VERSION2 = "2.4.10";
  const VERSION3 = "3.4.10";
  let containerConnectionName: string;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    datasets = projectsClient.datasets;

    // Get connection name from environment variable or use a default for recording
    containerConnectionName = assertEnvironmentVariable("AZURE_STORAGE_CONNECTION_NAME");
  });
  afterEach(async function () {
    // Clean up any created datasets
    try {
      await datasets.delete(datasetName, VERSION1);
    } catch (e) {
      // Ignore errors if dataset doesn't exist
    }

    try {
      await datasets.delete(folderDatasetName, VERSION2);
    } catch (e) {
      // Ignore errors if dataset doesn't exist
    }
    try {
      await datasets.delete(folderDatasetName, VERSION3);
    } catch (e) {
      // Ignore errors if dataset doesn't exist
    }

    await recorder.stop();
  });

  // Helper function to create a temporary folder with test files
  function createTempFolder(folderPath: string): void {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Create a few test files in the folder
    fs.writeFileSync(path.join(folderPath, "file1.txt"), "Test content for file 1");
    fs.writeFileSync(path.join(folderPath, "file2.txt"), "Test content for file 2");

    // Create a subfolder with files
    const subfolderPath = path.join(folderPath, "subfolder");
    if (!fs.existsSync(subfolderPath)) {
      fs.mkdirSync(subfolderPath, { recursive: true });
    }
    fs.writeFileSync(path.join(subfolderPath, "file3.txt"), "Test content for file 3");
  }

  // Helper function to remove temporary folder
  function removeTempFolder(folderPath: string): void {
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);

      for (const file of files) {
        const currentPath = path.join(folderPath, file);
        if (fs.lstatSync(currentPath).isDirectory()) {
          removeTempFolder(currentPath);
        } else {
          fs.unlinkSync(currentPath);
        }
      }

      // Remove the empty folder
      fs.rmdirSync(folderPath);
    }
  }

  it("client and dataset operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(datasets);
  });

  it("should create a dataset and perform various operations on it", async function () {
    // Create a temporary test file
    const testFilePath = path.join(__dirname, "test-file.txt");
    fs.writeFileSync(testFilePath, "This is test content for dataset testing");

    try {
      await recorder.setMatcher("CustomDefaultMatcher", {
        compareBodies: false,
      });
      // 1. Create dataset through file upload
      const dataset = await datasets.uploadFile(datasetName, VERSION1, testFilePath, {
        connectionName: containerConnectionName,
      });
      assert.isNotNull(dataset);
      assert.equal(dataset.name, datasetName);
      assert.equal(dataset.version, VERSION1);

      // Update the dataset version
      const updatedDataset = await datasets.createOrUpdate(datasetName, VERSION1_UPDATE, dataset);
      assert.isNotNull(updatedDataset);
      assert.equal(updatedDataset.version, VERSION1_UPDATE);

      // 2. Get credentials for the dataset
      const credentials = await datasets.getCredentials(dataset.name, dataset.version, {});
      assert.isNotNull(credentials);

      // 3. List dataset versions
      const versionsIterator = datasets.listVersions(datasetName);
      const versions: DatasetVersionUnion[] = [];
      for await (const version of versionsIterator) {
        versions.push(version);
      }
      assert.isNotEmpty(versions);
      assert.isAtLeast(versions.length, 1);
      assert.equal(versions[0].name, datasetName);

      // 4. List all datasets
      const datasetsIterator = datasets.list();
      const datasetsList: DatasetVersionUnion[] = [];
      for await (const d of datasetsIterator) {
        datasetsList.push(d);
      }
      assert.isNotNull(datasetsList);
      assert.isAtLeast(datasetsList.length, 1);
    } finally {
      // Clean up the temporary file
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
      }
    }
  });

  it("should get a specific dataset version", async function () {
    // First create a dataset
    const testFilePath = path.join(__dirname, "test-file.txt");
    fs.writeFileSync(testFilePath, "This is test content for dataset testing");

    try {
      await recorder.setMatcher("CustomDefaultMatcher", {
        compareBodies: false,
      });
      const createdDataset = await datasets.uploadFile(datasetName, VERSION2, testFilePath, {
        connectionName: containerConnectionName,
      });

      // Get the specific dataset version
      const retrievedDataset = await datasets.get(datasetName, VERSION2);

      assert.isNotNull(retrievedDataset);
      assert.equal(retrievedDataset.name, datasetName);
      assert.equal(retrievedDataset.version, VERSION2);
      assert.deepEqual(retrievedDataset, createdDataset);
    } finally {
      // Clean up the temporary file
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
      }
    }
  });

  it("should upload a folder and create a dataset", async function () {
    // Create a temporary folder with test files
    const tempFolderPath = path.join(__dirname, "test-folder");
    createTempFolder(tempFolderPath);

    try {
      await recorder.setMatcher("CustomDefaultMatcher", {
        compareBodies: false,
      });
      // Upload folder to create a dataset
      const dataset = await datasets.uploadFolder(folderDatasetName, VERSION3, tempFolderPath, {
        connectionName: containerConnectionName,
      });

      assert.isNotNull(dataset);
      assert.equal(dataset.name, folderDatasetName);
      assert.equal(dataset.version, VERSION3);

      // Verify we can retrieve the dataset
      const retrievedDataset = await datasets.get(folderDatasetName, VERSION3);
      assert.isNotNull(retrievedDataset);
      assert.equal(retrievedDataset.name, folderDatasetName);
      assert.equal(retrievedDataset.version, VERSION3);
    } finally {
      // Clean up the temporary folder
      removeTempFolder(tempFolderPath);
    }
  });
});

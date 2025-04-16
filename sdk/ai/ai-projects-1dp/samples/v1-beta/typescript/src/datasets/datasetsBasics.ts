// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic dataset operations.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of datasets,
 * upload files/folders, create datasets, manage dataset versions, and delete datasets.
 */

import type { DatasetVersionUnion } from "@azure/ai-projects-1dp";
import { AIProjectClient } from "@azure/ai-projects-1dp";
import { DefaultAzureCredential } from "@azure/identity";
import * as path from "path";
import { fileURLToPath } from "url";

import * as dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
// const apiKey = process.env["AZURE_AI_PROJECT_API_KEY"] || "<project key>";

async function main(): Promise<void> {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());

  // sample files to use in the demonstration
  const sampleFolder = "sample_folder";

  // Create a unique dataset name for this sample run
  const datasetName = `sample-dataset`;

  console.log("Upload a single file and create a new Dataset to reference the file.");
  console.log("Here we explicitly specify the dataset version.");
  const dataset1 = await project.datasets.uploadFileAndCreate(
    datasetName,
    "1",
    path.join(__dirname, sampleFolder, "sample_file1.txt"),
  );
  console.log(dataset1);

  console.log(
    "Upload all files in a folder (including subfolders) to the existing Dataset to reference the folder.",
  );
  console.log("Here again we explicitly specify a new dataset version");
  const dataset2 = await project.datasets.uploadFolderAndCreate(
    datasetName,
    "2",
    path.join(__dirname, sampleFolder),
  );
  console.log(dataset2);

  console.log(
    "Upload a single file to the existing dataset, while letting the service increment the version",
  );
  const dataset3 = await project.datasets.uploadFileAndCreate(
    datasetName,
    "3",
    path.join(__dirname, sampleFolder, "sample_file2.txt"),
  );
  console.log(dataset3);

  console.log("Get an existing Dataset version `1`:");
  const datasetVersion1 = await project.datasets.getVersion(datasetName, "1");
  console.log(datasetVersion1);

  console.log(`Listing all versions of the Dataset named '${datasetName}':`);
  const datasetVersions = await project.datasets.listVersions(datasetName);
  for await (const version of datasetVersions) {
    console.log(version);
  }

  console.log("List latest versions of all Datasets:");
  const latestDatasets = project.datasets.listLatest();
  for await (const dataset of latestDatasets) {
    console.log(dataset);
  }

  // List the details of all the datasets
  const datasets = project.datasets.listVersions(datasetName);
  const allDatasets: DatasetVersionUnion[] = [];
  for await (const dataset of datasets) {
    allDatasets.push(dataset);
  }
  console.log(`Retrieved ${allDatasets.length} datasets`);

  console.log("Delete all Dataset versions created above:");
  await project.datasets.deleteVersion(datasetName, "1");
  await project.datasets.deleteVersion(datasetName, "2");
  await project.datasets.deleteVersion(datasetName, dataset3.version);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

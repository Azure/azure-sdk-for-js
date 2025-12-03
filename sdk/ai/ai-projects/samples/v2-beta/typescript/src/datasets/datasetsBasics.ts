// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic dataset operations.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of datasets,
 * upload files/folders, create datasets, manage dataset versions, and delete datasets.
 */

import type { DatasetVersionUnion } from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import * as path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint string>";
const containerConnectionName =
  process.env["AZURE_STORAGE_CONNECTION_NAME"] || "<storage connection name>";
const VERSION1 = "1.0";
const VERSION1_UPDATE = "1.1";
const VERSION2 = "2.0";
const VERSION3 = "3.0";

async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // sample files to use in the demonstration
  const sampleFolder = "sample_folder";

  // Create a unique dataset name for this sample run
  const datasetName = `sample-dataset-basic`;
  const folderDatasetName = `${datasetName}-folder`;

  console.log("Upload a single file and create a new Dataset to reference the file.");
  console.log("Here we explicitly specify the dataset version.");
  const dataset1 = await project.datasets.uploadFile(
    datasetName,
    VERSION1,
    path.join(__dirname, sampleFolder, "sample_file1.txt"),
    {
      connectionName: containerConnectionName,
    },
  );
  console.log("Dataset1 created:", JSON.stringify(dataset1, null, 2));

  const updatedDataset1 = await project.datasets.createOrUpdate(
    datasetName,
    VERSION1_UPDATE,
    dataset1,
  );
  console.log("Dataset1 updated:", JSON.stringify(updatedDataset1, null, 2));

  const credential = await project.datasets.getCredentials(dataset1.name, dataset1.version, {});
  console.log("Credential for the dataset:", credential);

  console.log(
    "Upload all files in a folder (including subfolders) to the existing Dataset to reference the folder.",
  );
  console.log("Here again we explicitly specify a new dataset version");
  const dataset2 = await project.datasets.uploadFolder(
    folderDatasetName,
    VERSION2,
    path.join(__dirname, sampleFolder),
    {
      connectionName: containerConnectionName,
      // only upload sample_file1.txt and sample_file2.txt
      filePattern: /sample_file[1-2]\.txt$/,
    },
  );
  console.log("Dataset2 created:", JSON.stringify(dataset2, null, 2));

  console.log(
    "Upload a single file to the existing dataset, while letting the service increment the version",
  );
  const dataset3 = await project.datasets.uploadFile(
    datasetName,
    VERSION3,
    path.join(__dirname, sampleFolder, "sample_file2.txt"),
    {
      connectionName: containerConnectionName,
    },
  );
  console.log("Dataset3 created:", JSON.stringify(dataset3, null, 2));

  console.log("Get an existing Dataset version `1`:");
  const datasetVersion1 = await project.datasets.get(datasetName, VERSION1);
  console.log("Dataset version 1:", JSON.stringify(datasetVersion1, null, 2));

  console.log(`Listing all versions of the Dataset named '${datasetName}':`);
  const datasetVersions = project.datasets.listVersions(datasetName);
  for await (const version of datasetVersions) {
    console.log("List versions:", version);
  }

  console.log("List latest versions of all Datasets:");
  const latestDatasets = project.datasets.list();
  for await (const dataset of latestDatasets) {
    console.log("List datasets:", dataset);
  }

  // List the details of all the datasets
  const datasets = project.datasets.listVersions(datasetName);
  const allDatasets: DatasetVersionUnion[] = [];
  for await (const dataset of datasets) {
    allDatasets.push(dataset);
  }
  console.log(`Retrieved ${allDatasets.length} datasets`);

  console.log("Delete all Datasets created above:");
  await project.datasets.delete(datasetName, VERSION1);
  await project.datasets.delete(folderDatasetName, VERSION2);
  await project.datasets.delete(datasetName, dataset3.version);
  console.log("All specified Datasets have been deleted.");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

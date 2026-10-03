// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Upload a folder as a dataset, obtain its storage credentials, and download its files.
 *
 * Set FOUNDRY_PROJECT_ENDPOINT to your project endpoint. Optionally set
 * AZURE_STORAGE_CONNECTION_NAME to a storage connection, DATA_FOLDER to a local input folder,
 * and DOWNLOAD_FOLDER to the directory in which a new download subfolder will be created.
 * The storage connection must exist in this project. If its name is omitted, the project
 * must have a default AzureStorageAccount connection.
 * The defaults use the checked-in sample_folder and the operating system temporary directory.
 * The sample deletes the dataset it creates and leaves the downloaded files for inspection.
 *
 * @summary Upload and download dataset files using Azure Blob Storage.
 */

const { AIProjectClient, isRestError } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const { ContainerClient } = require("@azure/storage-blob");
const { randomUUID } = require("node:crypto");
const { mkdir, mkdtemp } = require("node:fs/promises");
const { tmpdir } = require("node:os");
const path = require("node:path");
const { fileURLToPath } = require("node:url");
require("dotenv/config");

async function main() {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  if (!projectEndpoint) {
    throw new Error("Set FOUNDRY_PROJECT_ENDPOINT before running this sample.");
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const configuredConnectionName = process.env["AZURE_STORAGE_CONNECTION_NAME"]?.trim();
  const connection = await (
    configuredConnectionName
      ? project.connections.get(configuredConnectionName)
      : project.connections.getDefault("AzureStorageAccount")
  ).catch((error) => {
    if (configuredConnectionName && isRestError(error) && error.statusCode === 404) {
      throw new Error(
        `Storage connection "${configuredConnectionName}" was not found in this project. ` +
          "Set AZURE_STORAGE_CONNECTION_NAME to an existing project connection name, " +
          "or omit it to use the project's default AzureStorageAccount connection.",
        { cause: error },
      );
    }
    throw error;
  });
  if (connection.type !== "AzureStorageAccount") {
    throw new Error(`Connection "${connection.name}" must have type AzureStorageAccount.`);
  }
  console.log(`Using storage connection ${connection.name}.`);
  const dataFolder =
    process.env["DATA_FOLDER"] || fileURLToPath(new URL("./sample_folder/", import.meta.url));
  const downloadRoot = path.resolve(process.env["DOWNLOAD_FOLDER"] || tmpdir());
  await mkdir(downloadRoot, { recursive: true });
  const downloadFolder = await mkdtemp(path.join(downloadRoot, "dataset-download-"));
  const datasetName = `download-${randomUUID()}`;
  let datasetVersion;

  try {
    console.log(`Uploading files from ${dataFolder}...`);
    const dataset = await project.datasets.uploadFolder(datasetName, "1.0", dataFolder, {
      connectionName: connection.name,
      filePattern: "[.](txt|csv|md)$",
    });
    datasetVersion = dataset.version;
    console.log(`Created dataset ${dataset.name}, version ${dataset.version}.`);

    const credentials = await project.datasets.getCredentials(dataset.name, dataset.version);
    // Use the SAS URI to authenticate the storage client; do not print it.
    const container = new ContainerClient(credentials.blobReference.credential.sasUri);
    let downloadedFiles = 0;
    for await (const blob of container.listBlobsFlat()) {
      const destination = path.resolve(downloadFolder, blob.name);
      const relativePath = path.relative(downloadFolder, destination);
      if (
        !relativePath ||
        relativePath === ".." ||
        relativePath.startsWith(`..${path.sep}`) ||
        path.isAbsolute(relativePath)
      ) {
        throw new Error(`Blob name cannot be saved inside the download folder: ${blob.name}`);
      }
      await mkdir(path.dirname(destination), { recursive: true });
      await container.getBlobClient(blob.name).downloadToFile(destination);
      console.log(`Downloaded ${relativePath}`);
      downloadedFiles++;
    }
    console.log(`Downloaded ${downloadedFiles} file(s) to ${downloadFolder}.`);
  } finally {
    if (datasetVersion) {
      await project.datasets.delete(datasetName, datasetVersion);
      console.log(`Deleted dataset ${datasetName}, version ${datasetVersion}.`);
    }
  }
}

main().catch((err) => {
  console.error("Sample failed:", err);
});

module.exports = { main };

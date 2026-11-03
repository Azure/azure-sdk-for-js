// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the `.beta.models` operations to
 * register a local model with a Microsoft Foundry project, list and
 * inspect model versions, retrieve storage credentials, update version
 * metadata, and delete a model version.
 *
 * The convenience method `createFromSource` wraps the three-step sequence
 * (pendingUpload → file upload → createAsync) and polls until the new
 * ModelVersion is observable.
 *
 * @summary Demonstrates full model version CRUD operations.
 */

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelName = process.env["MODEL_NAME"] || "sample-model";
const modelVersion = process.env["MODEL_VERSION"] || "1";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsFolder = path.resolve(__dirname, "assets");

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  // Create a model version by uploading local files
  console.log(`Creating model '${modelName}' version '${modelVersion}' from '${assetsFolder}'...`);
  const model = await project.beta.models.create(modelName, modelVersion, assetsFolder, {
    weightType: "FullWeight",
    description: "Sample model registered from modelsBasics.ts",
    tags: { source: "modelsBasics.ts" },
  });
  console.log(`Created: ${model.name} v${model.version} (blobUri: ${model.blobUri})`);

  // List all versions of this model
  console.log(`\nListing versions of model '${modelName}':`);
  for await (const mv of project.beta.models.listVersions(modelName)) {
    console.log(`  - version: ${mv.version}`);
  }

  // List the latest version of every registered model
  console.log("\nListing all models:");
  for await (const mv of project.beta.models.list()) {
    console.log(`  - ${mv.name}@${mv.version}`);
  }

  // Get blob credentials
  console.log(`\nGetting credentials for '${modelName}' version '${modelVersion}'...`);
  const credentials = await project.beta.models.getCredentials(modelName, modelVersion, {
    blobUri: model.blobUri,
  });
  console.log(`Credentials retrieved (blobUri: ${credentials.blobReference.blobUri})`);

  // Update model version metadata
  console.log(`\nUpdating model '${modelName}' version '${modelVersion}'...`);
  const updated = await project.beta.models.update(
    modelName,
    { description: "Updated description", tags: { source: "modelsBasics.ts", updated: "true" } },
    modelVersion,
  );
  console.log(`Updated: ${updated.name} v${updated.version} (description: ${updated.description})`);

  // Delete the model version
  console.log(`\nDeleting model '${modelName}' version '${modelVersion}'...`);
  await project.beta.models.delete(modelName, modelVersion);
  console.log("Model version deleted.");
}

main().catch(console.error);

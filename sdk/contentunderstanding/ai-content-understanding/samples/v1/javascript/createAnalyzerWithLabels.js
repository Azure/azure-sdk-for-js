// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Create a custom analyzer with labeled training data.
 *
 * This sample demonstrates the API pattern for creating a custom analyzer with labeled training
 * data from Azure Blob Storage. Labeled data improves extraction accuracy by providing annotated
 * examples that teach the model how to identify and extract specific fields from your documents.
 *
 * This sample is mainly to show the API pattern for creating an analyzer with labeled training
 * data. For an easier labeling workflow, use Content Understanding Studio, a web-based UI that
 * provides a convenient way to label documents, manage training data, and build custom analyzers
 * in the same interface.
 *
 * The sample follows four steps:
 *
 * 1. Build field schema — Define the fields you want to extract (e.g., MerchantName, Items,
 *    TotalPrice)
 * 2. Resolve training data — Read the SAS URL from the environment, or auto-upload local files
 *    and generate one
 * 3. Create knowledge source — Wrap the SAS URL in a LabeledDataKnowledgeSource
 * 4. Create the analyzer — Pass the field schema and knowledge source to createAnalyzer
 */

require("dotenv/config");
const fs = require("fs");
const path = require("path");
const { DefaultAzureCredential } = require("@azure/identity");
const { AzureKeyCredential } = require("@azure/core-auth");
const { ContentUnderstandingClient } = require("@azure/ai-content-understanding");
const {
  BlobServiceClient,
  ContainerClient,
  ContainerSASPermissions,
  generateBlobSASQueryParameters,
} = require("@azure/storage-blob");

function getCredential() {
  const key = process.env["CONTENTUNDERSTANDING_KEY"];
  if (key) {
    return new AzureKeyCredential(key);
  }
  return new DefaultAzureCredential();
}

async function main() {
  console.log("== Create Analyzer With Labels Sample ==");

  const endpoint = process.env["CONTENTUNDERSTANDING_ENDPOINT"];
  if (!endpoint) {
    throw new Error("CONTENTUNDERSTANDING_ENDPOINT is required.");
  }

  const client = new ContentUnderstandingClient(endpoint, getCredential());

  const analyzerId = `receipt_analyzer_${Math.floor(Date.now() / 1000)}`;

  // Step 1: Build the receipt field schema
  const itemDefinition = {
    type: "object",
    method: "extract",
    description: "Individual item details",
    properties: {
      Quantity: {
        type: "string",
        method: "extract",
        description: "Quantity of the item",
      },
      Name: {
        type: "string",
        method: "extract",
        description: "Name of the item",
      },
      Price: {
        type: "string",
        method: "extract",
        description: "Price of the item",
      },
    },
  };

  const fieldSchema = {
    name: "receipt_schema",
    description: "Schema for receipt extraction with items",
    fields: {
      MerchantName: {
        type: "string",
        method: "extract",
        description: "Name of the merchant",
      },
      Items: {
        type: "array",
        method: "generate",
        description: "List of items purchased",
        itemDefinition,
      },
      TotalPrice: {
        type: "string",
        method: "extract",
        description: "Total amount",
      },
    },
  };

  // Step 2: Resolve training data SAS URL
  // You can either provide a pre-generated SAS URL (Option A) or let the sample
  // upload local label files and generate one automatically (Option B).
  // See Sample16_CreateAnalyzerWithLabels.md for manual upload instructions.
  // Option A: use a pre-generated SAS URL with Read + List permissions
  let trainingDataSasUrl = process.env["CONTENTUNDERSTANDING_TRAINING_DATA_SAS_URL"];

  // Option B: upload local label files and auto-generate a SAS URL
  if (!trainingDataSasUrl) {
    const storageAccount = process.env["CONTENTUNDERSTANDING_TRAINING_DATA_STORAGE_ACCOUNT"];
    const container = process.env["CONTENTUNDERSTANDING_TRAINING_DATA_CONTAINER"];
    if (storageAccount && container) {
      const credential = new DefaultAzureCredential();
      // Assets folder is at ../assets relative to samples/v1/javascript or samples/v1/typescript
      const localLabelDir = path.join("..", "..", "assets", "training_samples");
      const prefix = process.env["CONTENTUNDERSTANDING_TRAINING_DATA_PREFIX"] || undefined;

      // Upload local training data files to Azure Blob Storage
      const containerClient = new ContainerClient(
        `https://${storageAccount}.blob.core.windows.net/${container}`,
        credential,
      );
      await containerClient.createIfNotExists();

      const files = fs.readdirSync(localLabelDir);
      for (const fileName of files) {
        const filePath = path.join(localLabelDir, fileName);
        if (!fs.statSync(filePath).isFile()) {
          continue;
        }
        const blobName = prefix ? `${prefix.replace(/\/$/, "")}/${fileName}` : fileName;
        console.log(`Uploading ${fileName} -> ${blobName}`);
        await containerClient.getBlockBlobClient(blobName).uploadFile(filePath);
      }

      // Generate a User Delegation SAS URL (Read + List) for the container
      const blobServiceClient = new BlobServiceClient(
        `https://${storageAccount}.blob.core.windows.net`,
        credential,
      );
      const startsOn = new Date();
      const expiresOn = new Date(startsOn.getTime() + 60 * 60 * 1000); // 1 hour
      const userDelegationKey = await blobServiceClient.getUserDelegationKey(startsOn, expiresOn);
      const sasToken = generateBlobSASQueryParameters(
        {
          containerName: container,
          permissions: ContainerSASPermissions.parse("rl"),
          expiresOn,
        },
        userDelegationKey,
        storageAccount,
      ).toString();
      trainingDataSasUrl = `https://${storageAccount}.blob.core.windows.net/${container}?${sasToken}`;
    }
  }

  const trainingDataPrefix = process.env["CONTENTUNDERSTANDING_TRAINING_DATA_PREFIX"] || undefined;

  // Step 3: Create knowledge source from labeled data (if available)
  const knowledgeSources = [];
  if (trainingDataSasUrl) {
    const labeledSource = {
      kind: "labeledData",
      containerUrl: trainingDataSasUrl,
      fileListPath: "",
      ...(trainingDataPrefix ? { prefix: trainingDataPrefix } : {}),
    };
    knowledgeSources.push(labeledSource);
  }

  // Step 4: Create the analyzer
  const config = {
    enableLayout: true,
    enableOcr: true,
  };

  const customAnalyzer = {
    baseAnalyzerId: "prebuilt-document",
    description: "Receipt analyzer with labeled training data",
    config,
    fieldSchema,
    models: {
      completion: "gpt-4.1",
      embedding: "text-embedding-3-large",
    },
    knowledgeSources,
  };

  const poller = client.createAnalyzer(analyzerId, customAnalyzer, { allowReplace: true });
  const result = await poller.pollUntilDone();

  console.log(`Analyzer created: ${analyzerId}`);
  console.log(`  Description: ${result.description}`);
  console.log(`  Base analyzer: ${result.baseAnalyzerId}`);
  console.log(
    `  Fields: ${result.fieldSchema?.fields ? Object.keys(result.fieldSchema.fields).length : 0}`,
  );
  console.log(`  Knowledge sources: ${result.knowledgeSources?.length ?? 0}`);

  // Clean up - delete the analyzer
  await client.deleteAnalyzer(analyzerId);
  console.log(`Analyzer '${analyzerId}' deleted.`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

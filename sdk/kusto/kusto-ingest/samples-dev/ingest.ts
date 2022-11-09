// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of IngestClient and StreamingIngestClient to ingest data into Kusto.
 */

import * as dotenv from "dotenv";
import * as fs from "fs";
import {
  CompressionType,
  DataFormat,
  JsonColumnMapping,
  IngestClient,
  IngestionDescriptors,
  IngestionMappingKind,
  IngestionProperties as IngestionProps,
  IngestStatusQueues,
  ReportLevel,
  ReportMethod,
  StreamingIngestClient,
} from "@azure/kusto-ingest";
import { KustoConnectionStringBuilder } from "@azure/kusto-data";

const { BlobDescriptor, StreamDescriptor } = IngestionDescriptors;

// Load the .env file if it exists
dotenv.config();

const clusterName = process.env.KUSTO_CLUSTER_NAME || "<cluster>";
const appId = process.env.KUSTO_APP_ID || "<app id>";
const appKey = process.env.KUSTO_APP_KEY || "<app key>";
const authorityId = process.env.KUSTO_AUTHORITY_ID || "<authority id>";

const props = new IngestionProps({
  database: "Database",
  table: "Table",
  format: DataFormat.JSON,
  ingestionMapping: [
    new JsonColumnMapping("TargetColumn1", "$.sourceProp1"),
    new JsonColumnMapping("TargetColumn2", "$.sourceProp2"),
    new JsonColumnMapping("TargetColumn3", "$.sourceProp3"),
  ],
  ingestionMappingType: IngestionMappingKind.JSON,
  reportLevel: ReportLevel.FailuresAndSuccesses,
  reportMethod: ReportMethod.Queue,
});

const ingestClient = new IngestClient(
  KustoConnectionStringBuilder.withAadApplicationKeyAuthentication(
    `https://ingest-${clusterName}.kusto.windows.net`,
    appId,
    appKey,
    authorityId
  ),
  props
);

const statusQueues = new IngestStatusQueues(ingestClient);

// Streaming ingest client
const props2 = new IngestionProps({
  database: "Database",
  table: "Table",
  format: DataFormat.JSON,
  ingestionMappingReference: "Pre-defined mapping name",
});

// Init with engine endpoint
const streamingIngestClient = new StreamingIngestClient(
  KustoConnectionStringBuilder.withAadApplicationKeyAuthentication(
    `https://${clusterName}.kusto.windows.net`,
    appId,
    appKey,
    authorityId
  ),
  props2
);

async function startIngestion() {
  console.log("Ingest from file");

  await ingestClient.ingestFromFile("file.json");
  console.log("Ingestion from file done");

  await waitForStatus();

  await ingestClient.ingestFromBlob(
    new BlobDescriptor(
      "https://<account>.blob.core.windows.net/<container>/file.json.gz",
      1024 * 50 /* 50MB file */
    )
  );
  console.log("Ingestion from blob done");

  await waitForStatus();
}

async function waitForStatus(numberOFIngestions: number = 1): Promise<void> {
  while ((await statusQueues.failure.isEmpty()) && (await statusQueues.success.isEmpty())) {
    console.log("Waiting for status...");
    await sleep(1000);
  }

  const failures = await statusQueues.failure.pop(numberOFIngestions);
  for (let failure of failures) {
    console.log(`Failed: ${JSON.stringify(failure)}`);
  }
  const successes = await statusQueues.success.pop(numberOFIngestions);
  for (let success of successes) {
    console.log(`Succeeded: ${JSON.stringify(success)}`);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function startStreamingIngestion(): Promise<void> {
  // Ingest from file with either file path or FileDescriptor
  await streamingIngestClient.ingestFromFile("file.json", props2);
  console.log("Streaming ingestion from file done");

  // Ingest from stream with either ReadStream or StreamDescriptor
  let stream = fs.createReadStream("file.json");
  await streamingIngestClient.ingestFromStream(stream, props2);
  console.log("Streaming ingestion from stream done");

  // For gzip data set StreamDescriptor.compressionType to CompressionType.GZIP
  stream = fs.createReadStream("file.json.gz");
  const streamDescriptor = new StreamDescriptor(stream, "id", CompressionType.GZIP);
  await streamingIngestClient.ingestFromStream(streamDescriptor, props2);
  console.log("Streaming ingestion from compressed stream done");
}

startIngestion().catch((err) => {
  console.error("The ingestion sample encountered an error:", err);
});

startStreamingIngestion().catch((err) => {
  console.error("The streaming ingestion sample encountered an error:", err);
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the SharePoint knowledge source preview kinds
 * added in `13.1.0-beta.1`:
 *   - `indexedSharePoint`: SharePoint content is crawled into Azure AI
 *     Search and is available for hybrid search and vector retrieval.
 *   - `remoteSharePoint`: SharePoint content stays in place — queries
 *     are issued remotely at retrieval time.
 *
 * Both shapes are constructed below. The `indexedSharePoint` source is
 * created against the service when the required environment variables
 * are present; otherwise the sample only prints the constructed shapes
 * so the API surface is still illustrated.
 */

import { DefaultAzureCredential } from "@azure/identity";
import type {
  IndexedSharePointKnowledgeSource,
  RemoteSharePointKnowledgeSource,
} from "@azure/search-documents";
import { KnownIndexedSharePointContainerName, SearchIndexClient } from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const sharePointConnectionString = process.env.SHAREPOINT_CONNECTION_STRING || "";

const INDEXED_KS_NAME = "example-indexed-sharepoint-knowledge-source-sample";
const REMOTE_KS_NAME = "example-remote-sharepoint-knowledge-source-sample";

async function main(): Promise<void> {
  console.log(`Running SharePoint Knowledge Source Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());

  // Construct an indexed SharePoint knowledge source.
  const indexedSharePoint: IndexedSharePointKnowledgeSource = {
    name: INDEXED_KS_NAME,
    kind: "indexedSharePoint",
    description: "Indexes SharePoint libraries into Azure AI Search.",
    indexedSharePointParameters: {
      connectionString:
        sharePointConnectionString ||
        "SharePointOnlineEndpoint=https://contoso.sharepoint.com/sites/Marketing;",
      containerName: KnownIndexedSharePointContainerName.AllSiteLibraries,
      query: "filename:*.docx",
    },
  };

  // Construct a remote SharePoint knowledge source. Remote SharePoint
  // does not crawl content — queries are forwarded to SharePoint at
  // retrieval time using the configured filter expression.
  const remoteSharePoint: RemoteSharePointKnowledgeSource = {
    name: REMOTE_KS_NAME,
    kind: "remoteSharePoint",
    description: "Queries SharePoint content remotely without indexing.",
    remoteSharePointParameters: {
      filterExpression: "FileType:docx",
      resourceMetadata: ["Author", "Created", "Modified"],
    },
  };

  if (!sharePointConnectionString) {
    console.log(
      "Skipping live create: set SHAREPOINT_CONNECTION_STRING to provision the indexed " +
        "SharePoint knowledge source against the service. The remote SharePoint source is " +
        "shown for shape only.",
    );
    console.log(`  - ${indexedSharePoint.kind}: ${indexedSharePoint.name}`);
    console.log(`  - ${remoteSharePoint.kind}: ${remoteSharePoint.name}`);
    return;
  }

  try {
    const createdIndexed = await client.createKnowledgeSource(indexedSharePoint);
    console.log(`Created ${createdIndexed.kind} knowledge source: ${createdIndexed.name}`);
  } finally {
    await client.deleteKnowledgeSource(INDEXED_KS_NAME).catch(() => {});
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

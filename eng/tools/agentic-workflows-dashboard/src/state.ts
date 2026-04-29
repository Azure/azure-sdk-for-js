/**
 * Stateful collection - tracks what has been ingested to avoid duplicates
 * 
 * State is stored in Azure Blob Storage and tracks the last collected
 * timestamp per repository, allowing incremental collection.
 */

import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const CONTAINER_NAME = "collection-state";
const STATE_BLOB_NAME = "workflow-runs-state.json";

export interface RepoState {
  /** Last collected timestamp (ISO string) - fetch runs created after this */
  lastCollectedAt: string;
  /** Last successful collection timestamp */
  lastRunAt: string;
  /** Number of runs collected in last run */
  lastRunCount: number;
}

export interface CollectionState {
  version: number;
  repos: Record<string, RepoState>;
}

/**
 * Get blob client for state storage
 */
function getBlobClient(storageAccountName: string) {
  const credential = new DefaultAzureCredential();
  const blobServiceUrl = `https://${storageAccountName}.blob.core.windows.net`;
  const blobServiceClient = new BlobServiceClient(blobServiceUrl, credential);
  const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
  return containerClient.getBlockBlobClient(STATE_BLOB_NAME);
}

/**
 * Load collection state from blob storage
 * Returns empty state if not found
 */
export async function loadState(storageAccountName: string): Promise<CollectionState> {
  const blobClient = getBlobClient(storageAccountName);
  
  try {
    const downloadResponse = await blobClient.download();
    const content = await streamToString(downloadResponse.readableStreamBody!);
    return JSON.parse(content) as CollectionState;
  } catch (error: unknown) {
    // Return empty state if blob doesn't exist
    if ((error as { statusCode?: number }).statusCode === 404) {
      return { version: 1, repos: {} };
    }
    throw error;
  }
}

/**
 * Save collection state to blob storage
 */
export async function saveState(storageAccountName: string, state: CollectionState): Promise<void> {
  const credential = new DefaultAzureCredential();
  const blobServiceUrl = `https://${storageAccountName}.blob.core.windows.net`;
  const blobServiceClient = new BlobServiceClient(blobServiceUrl, credential);
  const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
  
  // Ensure container exists
  await containerClient.createIfNotExists();
  
  const blobClient = containerClient.getBlockBlobClient(STATE_BLOB_NAME);
  const content = JSON.stringify(state, null, 2);
  await blobClient.upload(content, Buffer.byteLength(content));
}

/**
 * Get the "since" timestamp for a repository
 * Returns ISO string to use in GitHub API created filter
 */
export function getSinceTimestamp(state: CollectionState, repo: string): string | null {
  const repoState = state.repos[repo];
  return repoState?.lastCollectedAt ?? null;
}

/**
 * Update state after successful collection
 */
export function updateRepoState(
  state: CollectionState,
  repo: string,
  latestRunCreatedAt: string,
  runCount: number
): void {
  state.repos[repo] = {
    lastCollectedAt: latestRunCreatedAt,
    lastRunAt: new Date().toISOString(),
    lastRunCount: runCount,
  };
}

/**
 * Helper to convert stream to string
 */
async function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf-8");
}

/**
 * Format state for display
 */
export function formatStateForDisplay(state: CollectionState): string {
  const lines = ["Collection State:"];
  for (const [repo, repoState] of Object.entries(state.repos)) {
    const lastAt = new Date(repoState.lastCollectedAt).toISOString().slice(0, 16);
    lines.push(`  ${repo}: ${lastAt} (${repoState.lastRunCount} runs)`);
  }
  return lines.join("\n");
}

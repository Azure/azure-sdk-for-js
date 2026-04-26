/**
 * Azure Monitor ingestion client using Data Collection Rules
 */

import { DefaultAzureCredential } from "@azure/identity";
import { LogsIngestionClient } from "@azure/monitor-ingestion";
import type { WorkflowRunRecord } from "./types.js";

export class AzureMonitorClient {
  private client: LogsIngestionClient | null = null;
  private dcrId: string;
  private streamName: string;
  private verbose: boolean;

  constructor(
    dceEndpoint: string,
    dcrId: string,
    streamName: string,
    verbose = false
  ) {
    this.dcrId = dcrId;
    this.streamName = streamName;
    this.verbose = verbose;

    // Initialize client with DefaultAzureCredential
    // This supports managed identity, Azure CLI, environment variables, etc.
    const credential = new DefaultAzureCredential();
    this.client = new LogsIngestionClient(dceEndpoint, credential);
  }

  /**
   * Ingest workflow run records to Azure Monitor
   */
  async ingestRuns(records: WorkflowRunRecord[]): Promise<void> {
    if (!this.client) {
      throw new Error("Azure Monitor client not initialized");
    }

    if (records.length === 0) {
      if (this.verbose) {
        console.log("  No records to ingest");
      }
      return;
    }

    try {
      // Batch upload (SDK handles chunking internally)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await this.client.upload(this.dcrId, this.streamName, records as any);

      if (this.verbose) {
        console.log(`  Ingested ${records.length} records to Azure Monitor`);
      }
    } catch (error) {
      console.error("  Error ingesting to Azure Monitor:", error);
      throw error;
    }
  }
}

/**
 * Mock client for dry-run mode
 */
export class MockAzureMonitorClient {
  private verbose: boolean;
  private records: WorkflowRunRecord[] = [];

  constructor(verbose = false) {
    this.verbose = verbose;
  }

  async ingestRuns(records: WorkflowRunRecord[]): Promise<void> {
    this.records.push(...records);
    if (this.verbose) {
      console.log(`  [DRY RUN] Would ingest ${records.length} records`);
    }
  }

  getRecords(): WorkflowRunRecord[] {
    return this.records;
  }

  getSummary(): { byRepo: Record<string, number>; byConclusion: Record<string, number> } {
    const byRepo: Record<string, number> = {};
    const byConclusion: Record<string, number> = {};

    for (const r of this.records) {
      byRepo[r.Repository] = (byRepo[r.Repository] || 0) + 1;
      const conclusion = r.Conclusion || "in_progress";
      byConclusion[conclusion] = (byConclusion[conclusion] || 0) + 1;
    }

    return { byRepo, byConclusion };
  }
}

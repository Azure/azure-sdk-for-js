// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PerfStressOptionDictionary, getEnvVar } from "@azure/test-utils-perfstress";
import { MonitorQueryLog } from "./monitorQueryLog.spec";
import { QueryBatch } from "@azure/monitor-query";

type MonitorQueryTestOptions = Record<string, unknown>;

export class LogQueryBatchTest extends MonitorQueryLog<MonitorQueryTestOptions> {
  workspaceId: string;
  queryBatch: QueryBatch[];
  public options: PerfStressOptionDictionary<MonitorQueryTestOptions> = {};
  constructor() {
    super();
    this.workspaceId = getEnvVar("MONITOR_WORKSPACE_ID");
    this.queryBatch = [
      {
        workspaceId: this.workspaceId,
        query: "AzureActivity | summarize count()",
        timespan: { startTime: new Date("2021-07-25"), endTime: new Date("2021-07-26") }
      },
      {
        workspaceId: this.workspaceId,
        query:
          "AppRequests | take 10  | summarize avgRequestDuration=avg(DurationMs) by bin(TimeGenerated, 10m), _ResourceId",
        timespan: { startTime: new Date("2021-07-25"), endTime: new Date("2021-07-26") }
      },
      {
        workspaceId: this.workspaceId,
        query: "AppRequests | take 2",
        timespan: { duration: "" },
        includeQueryStatistics: true
      }
    ];
  }

  async runAsync(): Promise<void> {
    await this.client.queryBatch(this.queryBatch);
  }
}

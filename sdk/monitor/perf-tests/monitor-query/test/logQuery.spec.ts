// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PerfStressOptionDictionary, getEnvVar } from "@azure/test-utils-perfstress";
import { MonitorQueryLog } from "./monitorQueryLog.spec";

type MonitorQueryTestOptions = Record<string, unknown>;

export class LogQueryTest extends MonitorQueryLog<MonitorQueryTestOptions> {
  workspaceId: string;
  query: string;
  public options: PerfStressOptionDictionary<MonitorQueryTestOptions> = {};
  constructor() {
    super();
    this.workspaceId = getEnvVar("MONITOR_WORKSPACE_ID");
    this.query = "AppRequests | summarize avgRequestDuration=avg(DurationMs) by bin(TimeGenerated, 10m), _ResourceId";
  }

  async runAsync(): Promise<void> {
    await this.client.queryWorkspace(this.workspaceId, this.query,{ startTime: new Date("2021-07-25"),endTime: new Date("2021-07-26") } );

  }
}
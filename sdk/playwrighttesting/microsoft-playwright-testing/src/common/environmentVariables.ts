// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomUUID } from "crypto";

export class EnvironmentVariables {
  get accessToken(): string {
    return process.env["PLAYWRIGHT_SERVICE_ACCESS_TOKEN"]!;
  }
  runId: string;
  accountId: string | undefined;
  userId: string | undefined;
  userName: string | undefined;
  correlationId: string | undefined;
  shardId: string | undefined;
  region: string | undefined;
  runName: string;
  constructor() {
    this.runId = process.env["PLAYWRIGHT_SERVICE_RUN_ID"]!;
    this.runName = process.env["PLAYWRIGHT_SERVICE_RUN_NAME"]!;
    this.correlationId = randomUUID();
  }
}

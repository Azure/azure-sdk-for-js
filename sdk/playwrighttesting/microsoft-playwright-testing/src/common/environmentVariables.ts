// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { randomUUID } from "crypto";

export class EnvironmentVariables {
  accessToken: string;
  runId: string;
  accountId: string | undefined;
  userId: string | undefined;
  userName: string | undefined;
  correlationId: string | undefined;
  shardId: string | undefined;
  region: string | undefined;
  constructor() {
    this.accessToken = process.env["PLAYWRIGHT_SERVICE_ACCESS_TOKEN"]!;
    this.runId = process.env["PLAYWRIGHT_SERVICE_RUN_ID"]!;
    this.correlationId = randomUUID();
  }
}

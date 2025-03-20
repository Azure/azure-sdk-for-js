// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { randomUUID } from "node:crypto";
import { InternalEnvironmentVariables } from "./constants.js";

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
    this.runName = process.env["_MPT_SERVICE_RUN_NAME"]!;
    this.runId = process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]!;
    this.correlationId = randomUUID();
  }
}

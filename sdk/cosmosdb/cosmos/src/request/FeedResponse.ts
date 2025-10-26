// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants, InternalHttpHeaders } from "../common/index.js";
import type { CosmosHeaders } from "../queryExecutionContext/headerUtils.js";
import {
  decodeAndParseJSONString,
  getRequestChargeIfAny,
} from "../queryExecutionContext/headerUtils.js";
import type { CosmosDiagnostics } from "../CosmosDiagnostics.js";

export class FeedResponse<TResource> {
  constructor(
    public readonly resources: TResource[],
    private readonly headers: CosmosHeaders,
    public readonly hasMoreResults: boolean,
    public readonly diagnostics: CosmosDiagnostics,
  ) { }

  public get continuation(): string {
    return this.continuationToken;
  }
  public get continuationToken(): string {
    // Detect if query is not ready to serve continuation token
    const isContinuationNotReady =
      this.headers[InternalHttpHeaders.ContinuationReady] === "false";
    const continuationToken = this.headers[Constants.HttpHeaders.Continuation];

    if (isContinuationNotReady && continuationToken === undefined) {
      throw new Error(
        "Query is not ready to serve continuation token. Keep calling hasMoreResults() until you get some data",
      );
    }

    return continuationToken;
  }
  public get queryMetrics(): string {
    return this.headers[Constants.HttpHeaders.QueryMetrics];
  }
  public get requestCharge(): number {
    return getRequestChargeIfAny(this.headers);
  }
  public get activityId(): string {
    return this.headers[Constants.HttpHeaders.ActivityId];
  }
  public get correlatedActivityId(): string {
    return this.headers[Constants.HttpHeaders.CorrelatedActivityId];
  }
  public get indexMetrics(): string {
    return decodeAndParseJSONString(this.headers[Constants.HttpHeaders.IndexUtilization]);
  }
}

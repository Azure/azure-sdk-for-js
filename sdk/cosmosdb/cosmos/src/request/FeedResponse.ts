// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants } from "../common/index.js";
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
  ) {}

  /**
   * @deprecated Use `continuationToken` instead. The `continuation` property will be removed in a future major version.
   */
  public get continuation(): string | undefined {
    return this.continuationToken;
  }

  /**
   * Opaque token for resuming query execution from where it left off.
   *
   * Use this with `FeedOptions.continuationToken` in a subsequent query to resume pagination.
   * The token is undefined if there are no more results (when `hasMoreResults` is false).
   *
   * @example Resume a paginated query using continuation token:
   * ```ts
   * const options: FeedOptions = { enableQueryControl: true, maxItemCount: 10 };
   * let response = await container.items.query("SELECT * from c", options).fetchNext();
   *
   * while (response.hasMoreResults) {
   *   const nextOptions = { ...options, continuationToken: response.continuationToken };
   *   response = await container.items.query("SELECT * from c", nextOptions).fetchNext();
   * }
   * ```
   */
  public get continuationToken(): string | undefined {
    return this.headers[Constants.HttpHeaders.Continuation];
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

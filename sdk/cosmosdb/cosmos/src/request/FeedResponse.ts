// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Constants } from "../common";
import { CosmosDiagnostics } from "../diagnostics/CosmosDiagnostics";
import { CosmosHeaders } from "../queryExecutionContext";

export class FeedResponse<TResource> extends CosmosDiagnostics {
  constructor(
    public readonly resources: TResource[],
    private readonly headers: CosmosHeaders,
    public readonly hasMoreResults: boolean
  ) {
    super();
  }

  public getcosmosDiagnosticsRegionsContacted() {
    return this.getRegionsContacted();
  }
  public getcosmosDiagnostisDurationInMs() {
    return this.getDuration();
  }
  public getcosmosDiagnostics(): string {
    return this.getCosmosDiagnostics();
  }
  public get continuation(): string {
    return this.continuationToken;
  }
  public get continuationToken(): string {
    return this.headers[Constants.HttpHeaders.Continuation];
  }
  public get queryMetrics(): string {
    return this.headers[Constants.HttpHeaders.QueryMetrics];
  }
  public get requestCharge(): number {
    return this.headers[Constants.HttpHeaders.RequestCharge];
  }
  public get activityId(): string {
    return this.headers[Constants.HttpHeaders.ActivityId];
  }
}

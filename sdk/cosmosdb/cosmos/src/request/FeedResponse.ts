// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Constants } from "../common";
import { CosmosHeaders } from "../queryExecutionContext";
import { IndexMetricWriter, IndexUtilizationInfo } from "../indexMetrics";

export class FeedResponse<TResource> {
  constructor(
    public readonly resources: TResource[],
    private readonly headers: CosmosHeaders,
    public readonly hasMoreResults: boolean
  ) {}
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
  public get indexMetrics(): string {
    const result: { result?: IndexUtilizationInfo } = { result: undefined };

    let writer = new IndexMetricWriter();
    if (
      IndexUtilizationInfo.tryCreateFromDelimitedBase64String(
        this.headers[Constants.HttpHeaders.IndexUtilization],
        result
      )
    ) {
      return writer.writeIndexMetrics(result.result);
    } else {
      return "No index utilized";
    }
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Constants } from "../common";
import { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders";
import { StatusCode, SubStatusCode } from "./StatusCodes";

export class ResourceResponse<TResource> {
  constructor(
    public readonly resource: TResource,
    public readonly headers: CosmosHeaders,
    public readonly statusCode: StatusCode,
    public readonly substatus?: SubStatusCode
  ) {}
  public get requestCharge(): number {
    return Number(this.headers[Constants.HttpHeaders.RequestCharge]) || 0;
  }
  public get activityId(): string {
    return this.headers[Constants.HttpHeaders.ActivityId] as string;
  }
  public get etag(): string {
    return this.headers[Constants.HttpHeaders.ETag] as string;
  }
}

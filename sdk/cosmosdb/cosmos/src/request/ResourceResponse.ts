// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Constants } from "../common";
import { CosmosDiagnostics } from "../diagnostics/CosmosDiagnostics";
import { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders";
import { StatusCode, SubStatusCode } from "./StatusCodes";

export class ResourceResponse<TResource> extends CosmosDiagnostics {
  constructor(
    public readonly resource: TResource | undefined,
    public readonly headers: CosmosHeaders,
    public readonly statusCode: StatusCode,
    public readonly substatus?: SubStatusCode
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
    console.log(this.getCosmosDiagnostics());
    return this.getCosmosDiagnostics();
  }
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

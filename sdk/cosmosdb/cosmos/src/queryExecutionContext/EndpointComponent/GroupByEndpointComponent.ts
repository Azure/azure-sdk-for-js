// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
// import { getInitialHeader, mergeHeaders } from "../headerUtils";

/** @hidden */
export class GroupByEndpointComponent implements ExecutionContext {
  constructor(private executionContext: ExecutionContext) {}

  public async nextItem(): Promise<Response<any>> {
    return this.executionContext.nextItem();
  }

  public async current(): Promise<Response<any>> {
    return this.executionContext.current();
  }

  public hasMoreResults() {
    return this.executionContext.hasMoreResults();
  }
}

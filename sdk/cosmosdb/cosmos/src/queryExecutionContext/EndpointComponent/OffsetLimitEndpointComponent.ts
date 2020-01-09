// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { getInitialHeader, mergeHeaders } from "../headerUtils";

/** @hidden */
export class OffsetLimitEndpointComponent implements ExecutionContext {
  constructor(
    private executionContext: ExecutionContext,
    private offset: number,
    private limit: number
  ) {}

  public async nextItem(): Promise<Response<any>> {
    const aggregateHeaders = getInitialHeader();
    while (this.offset > 0) {
      // Grab next item but ignore the result. We only need the headers
      const { headers } = await this.executionContext.nextItem();
      this.offset--;
      mergeHeaders(aggregateHeaders, headers);
    }
    if (this.limit > 0) {
      const { result, headers } = await this.executionContext.nextItem();
      this.limit--;
      mergeHeaders(aggregateHeaders, headers);
      return { result, headers: aggregateHeaders };
    }
    // If both limit and offset are 0, return nothing
    return { result: undefined, headers: getInitialHeader() };
  }

  public hasMoreResults() {
    return (this.offset > 0 || this.limit > 0) && this.executionContext.hasMoreResults();
  }
}

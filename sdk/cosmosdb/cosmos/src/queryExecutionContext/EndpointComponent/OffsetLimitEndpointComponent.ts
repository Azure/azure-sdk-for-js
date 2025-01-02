// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import type { Response } from "../../request";
import type { ExecutionContext } from "../ExecutionContext";
import { getInitialHeader, mergeHeaders } from "../headerUtils";

/** @hidden */
export class OffsetLimitEndpointComponent implements ExecutionContext {
  constructor(
    private executionContext: ExecutionContext,
    private offset: number,
    private limit: number,
  ) {}

  public async nextItem(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    const aggregateHeaders = getInitialHeader();
    while (this.offset > 0) {
      // Grab next item but ignore the result. We only need the headers
      const { headers } = await this.executionContext.nextItem(diagnosticNode);
      this.offset--;
      mergeHeaders(aggregateHeaders, headers);
    }
    if (this.limit > 0) {
      const { result, headers } = await this.executionContext.nextItem(diagnosticNode);
      this.limit--;
      mergeHeaders(aggregateHeaders, headers);
      return { result, headers: aggregateHeaders };
    }
    // If both limit and offset are 0, return nothing
    return {
      result: undefined,
      headers: getInitialHeader(),
    };
  }

  public hasMoreResults(): boolean {
    return (this.offset > 0 || this.limit > 0) && this.executionContext.hasMoreResults();
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    const aggregateHeaders = getInitialHeader();
    const buffer: any[] = [];
    const response = await this.executionContext.fetchMore(diagnosticNode);
    mergeHeaders(aggregateHeaders, response.headers);
    if (response === undefined || response.result === undefined) {
      return { result: undefined, headers: response.headers };
    }
    
    response.result.forEach((item:any) => {
      if (this.offset > 0) {
        this.offset--;
      } else if (this.limit > 0) {
        buffer.push(item);
        this.limit--;
      }
    });
    return { result: buffer, headers: aggregateHeaders };
  }
}

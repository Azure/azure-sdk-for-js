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

    for (const item of response.result) {
      if (this.offset > 0) {
        this.offset--;
      } else if (this.limit > 0) {
        buffer.push(item);
        this.limit--;
      }
    }
    return { result: buffer, headers: aggregateHeaders };
  }
}

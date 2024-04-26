// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { CosmosHeaders } from "../CosmosHeaders";
import { getInitialHeader, mergeHeaders } from "../headerUtils";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import PriorityQueue from "priorityqueuejs";

interface NonStreamingOrderByResponse {
  result: NonStreamingOrderByResult;
  headers: CosmosHeaders;
}

export interface NonStreamingOrderByResult {
  orderByItems: [];
  payload: any;
}

/** @hidden */
export class NonStreamingOrderByEndpointComponent implements ExecutionContext {
  constructor(
    private executionContext: ExecutionContext,
    // private queryInfo: QueryInfo,
    private comparator: any,
  ) {}

  private resultsPQ: PriorityQueue<NonStreamingOrderByResult>;
  private completed: boolean = false;

  public async nextItem(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    if (!this.resultsPQ) {
      this.resultsPQ = new PriorityQueue<NonStreamingOrderByResult>(this.comparator);
    }

    if (this.resultsPQ.size() > 0) {
      return {
        result: this.resultsPQ.deq(),
        headers: getInitialHeader(),
      };
    }

    if (this.completed) {
      return {
        result: undefined,
        headers: getInitialHeader(),
      };
    }

    const resHeaders = getInitialHeader();

    while (this.executionContext.hasMoreResults()) {
      // Grab the next result
      const { result, headers } = (await this.executionContext.nextItem(
        diagnosticNode,
      )) as NonStreamingOrderByResponse;
      mergeHeaders(resHeaders, headers);

      // If it exists, put it in queue
      console.log("result", result);
      if (result) {
        this.resultsPQ.enq(result);
      }
    }
    this.completed = true;
    return {
      result: this.resultsPQ.deq(),
      headers: resHeaders,
    };
  }

  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults() || this.resultsPQ.size() > 0;
  }
}

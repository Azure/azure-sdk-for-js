// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import { hashObject } from "../../utils/hashObject.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import type { ContinuationTokenManager } from "../ContinuationTokenManager.js";
import type { FeedOptions } from "../../request/index.js";

/** @hidden */
export class OrderedDistinctEndpointComponent implements ExecutionContext {
  private hashedLastResult: string;
  private continuationTokenManager: ContinuationTokenManager | undefined;

  constructor(
    private executionContext: ExecutionContext,
    options?: FeedOptions
  ) {
    // Get the continuation token manager from options if available
    this.continuationTokenManager = (options as any)?.continuationTokenManager;
  }

  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    const buffer: any[] = [];
    const response = await this.executionContext.fetchMore(diagnosticNode);
    if (
      response === undefined ||
      response.result === undefined ||
      response.result.buffer === undefined
    ) {
      return { result: undefined, headers: response.headers };
    }

    // Process each item and maintain hashedLastResult for distinct filtering
    for (const item of response.result.buffer) {
      if (item) {
        const hashedResult = await hashObject(item);
        if (hashedResult !== this.hashedLastResult) {
          buffer.push(item);
          this.hashedLastResult = hashedResult;
        }
      }
    }
    // TODO: convert this method to void 
    // let updatedPartitionKeyRangeMap = response.result.partitionKeyRangeMap;

    // // Use continuation token manager to process distinct query logic and update partition key range map
    // if (this.continuationTokenManager && response.result.partitionKeyRangeMap) {
    //   updatedPartitionKeyRangeMap = await this.continuationTokenManager.processDistinctQueryAndUpdateRangeMap(
    //     response.result.partitionKeyRangeMap,
    //     response.result.buffer,
    //     hashObject
    //   );
    // }

    return { 
      result:  buffer,
      headers: response.headers 
    };
  }


}

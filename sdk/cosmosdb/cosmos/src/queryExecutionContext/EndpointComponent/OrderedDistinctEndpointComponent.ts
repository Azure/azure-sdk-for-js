// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Response } from "../../request/index.js";
import type { ExecutionContext } from "../ExecutionContext.js";
import { hashObject } from "../../utils/hashObject.js";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";

/** @hidden */
export class OrderedDistinctEndpointComponent implements ExecutionContext {
  private hashedLastResult: string;
  constructor(private executionContext: ExecutionContext) {}

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

    const updatedPartitionKeyRangeMap = new Map<string, any>();
    
    // Process each item and maintain hashedLastResult for each partition range
    for (const item of response.result.buffer) {
      if (item) {
        const hashedResult = await hashObject(item);
        if (hashedResult !== this.hashedLastResult) {
          buffer.push(item);
          this.hashedLastResult = hashedResult;
        }
      }
    }

    // Update partition key range map with hashedLastResult for each range
    if (response.result.partitionKeyRangeMap) {
      let startIndex = 0;
      for (const [rangeId, rangeMapping] of response.result.partitionKeyRangeMap) {
        const { indexes } = rangeMapping;
        
        // Find the last document in this partition range that made it to the final buffer
        let lastHashForThisRange: string | undefined;
        
        if (indexes[0] !== -1 && indexes[1] !== -1) {
          // Check if any items from this range are in the final buffer
          const rangeStartInOriginal = indexes[0];
          const rangeEndInOriginal = indexes[1];
          const rangeSize = rangeEndInOriginal - rangeStartInOriginal + 1;

          // Find the last item from this range in the original buffer
          for (let i = startIndex; i < startIndex + rangeSize; i++, startIndex++) {
            if (i < response.result.buffer.length) {
              const item = response.result.buffer[i];
              if (item) {
                lastHashForThisRange = await hashObject(item);
              }
            }
          }
        }

        // Update the range mapping with the hashed last result
        updatedPartitionKeyRangeMap.set(rangeId, {
          ...rangeMapping,
          hashedLastResult: lastHashForThisRange || rangeMapping.hashedLastResult,
        });
      }
    }

    return { 
      result: {
        buffer: buffer, 
        partitionKeyRangeMap: updatedPartitionKeyRangeMap
      }, 
      headers: response.headers 
    };
  }


}

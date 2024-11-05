// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Response } from "../../request";
import type { ExecutionContext } from "../ExecutionContext";
import { hashObject } from "../../utils/hashObject";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";

/** @hidden */
export class UnorderedDistinctEndpointComponent implements ExecutionContext {
  private hashedResults: Set<string>;
  constructor(private executionContext: ExecutionContext) {
    this.hashedResults = new Set();
  }

  public async nextItem(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    const { headers, result } = await this.executionContext.nextItem(diagnosticNode);
    if (result) {
      const hashedResult = await hashObject(result);
      if (this.hashedResults.has(hashedResult)) {
        return { result: undefined, headers };
      }
      this.hashedResults.add(hashedResult);
    }
    return { result, headers };
  }

  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }
}

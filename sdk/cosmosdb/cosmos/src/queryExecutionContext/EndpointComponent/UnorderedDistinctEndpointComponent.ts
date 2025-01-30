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

  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }

  public async fetchMore(diagnosticNode?: DiagnosticNodeInternal): Promise<Response<any>> {
    const buffer: any[] = [];
    const response = await this.executionContext.fetchMore(diagnosticNode);
    if (response === undefined || response.result === undefined) {
      return { result: undefined, headers: response.headers };
    }
    for (const item of response.result) {
      if (item) {
        const hashedResult = await hashObject(item);
        if (!this.hashedResults.has(hashedResult)) {
          buffer.push(item);
          this.hashedResults.add(hashedResult);
        }
      }
    }
    return { result: buffer, headers: response.headers };
  }
}

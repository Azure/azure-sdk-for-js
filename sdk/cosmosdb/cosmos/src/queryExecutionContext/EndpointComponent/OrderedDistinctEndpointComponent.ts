// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Response } from "../../request";
import type { ExecutionContext } from "../ExecutionContext";
import { hashObject } from "../../utils/hashObject";
import type { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";

/** @hidden */
export class OrderedDistinctEndpointComponent implements ExecutionContext {
  private hashedLastResult: string;
  constructor(private executionContext: ExecutionContext) {}

  public async nextItem(diagnosticNode: DiagnosticNodeInternal): Promise<Response<any>> {
    const { headers, result } = await this.executionContext.nextItem(diagnosticNode);
    if (result) {
      const hashedResult = await hashObject(result);
      if (hashedResult === this.hashedLastResult) {
        return { result: undefined, headers };
      }
      this.hashedLastResult = hashedResult;
    }
    return { result, headers };
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
        if (hashedResult !== this.hashedLastResult) {
          buffer.push(item);
          this.hashedLastResult = hashedResult;
        }
      }
    }
    return { result: buffer, headers: response.headers };
  }
}

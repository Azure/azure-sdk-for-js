// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { hashObject } from "../../utils/hashObject";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";

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
}

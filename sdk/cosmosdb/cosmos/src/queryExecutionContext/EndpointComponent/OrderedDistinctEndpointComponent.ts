// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { hashObject } from "../../utils/hashObject";

/** @hidden */
export class OrderedDistinctEndpointComponent implements ExecutionContext {
  private hashedLastResult: string;
  constructor(private executionContext: ExecutionContext) {}

  public async nextItem(): Promise<Response<any>> {
    const { headers, result, diagnostics } = await this.executionContext.nextItem();
    if (result) {
      const hashedResult = await hashObject(result);
      if (hashedResult === this.hashedLastResult) {
        return { result: undefined, headers, diagnostics };
      }
      this.hashedLastResult = hashedResult;
    }
    return { result, headers, diagnostics };
  }

  public hasMoreResults(): boolean {
    return this.executionContext.hasMoreResults();
  }
}

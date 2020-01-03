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
    const { headers, result } = await this.executionContext.nextItem();
    if (result) {
      const hashedResult = await hashObject(result);
      if (hashedResult === this.hashedLastResult) {
        return { result: undefined, headers };
      }
      this.hashedLastResult = hashedResult;
    }
    return { result, headers };
  }

  public hasMoreResults() {
    return this.executionContext.hasMoreResults();
  }
}

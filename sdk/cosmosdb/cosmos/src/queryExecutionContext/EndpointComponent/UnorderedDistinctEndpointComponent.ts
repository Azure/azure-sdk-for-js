// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { hashObject } from "../../utils/hashObject";

/** @hidden */
export class UnorderedDistinctEndpointComponent implements ExecutionContext {
  private hashedResults: Set<string>;
  constructor(private executionContext: ExecutionContext) {
    this.hashedResults = new Set();
  }

  public async nextItem(): Promise<Response<any>> {
    const { headers, result } = await this.executionContext.nextItem();
    if (result) {
      const hashedResult = await hashObject(result);
      if (this.hashedResults.has(hashedResult)) {
        return { result: undefined, headers };
      }
      this.hashedResults.add(hashedResult);
    }
    return { result, headers };
  }

  public hasMoreResults() {
    return this.executionContext.hasMoreResults();
  }
}

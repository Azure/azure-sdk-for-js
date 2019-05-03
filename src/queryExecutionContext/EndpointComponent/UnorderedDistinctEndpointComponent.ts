import { sha1 } from "crypto-hash";
import stableStringify from "fast-json-stable-stringify";
import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";

/** @hidden */
export class UnorderedDistinctEndpointComponent implements ExecutionContext {
  private hashedResults: Set<string>;
  constructor(private executionContext: ExecutionContext) {
    this.hashedResults = new Set();
  }

  public async nextItem(): Promise<Response<any>> {
    const { headers, result } = await this.executionContext.nextItem();
    if (result) {
      const stringifiedResult = stableStringify(result);
      const hashedResult = await sha1(stringifiedResult);
      if (this.hashedResults.has(hashedResult)) {
        return { result: undefined, headers };
      }
      this.hashedResults.add(hashedResult);
    }
    return { result, headers };
  }

  public async current(): Promise<Response<any>> {
    return this.executionContext.current();
  }

  public hasMoreResults() {
    return this.executionContext.hasMoreResults();
  }
}

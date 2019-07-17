import { Response } from "../../request";
import { ExecutionContext } from "../ExecutionContext";
import { getInitialHeader } from "../headerUtils";

/** @hidden */
export class OffsetLimitEndpointComponent implements ExecutionContext {
  constructor(private executionContext: ExecutionContext, private offset: number, private limit: number) {}

  public async nextItem(): Promise<Response<any>> {
    if (this.offset > 0) {
      // Grab next item but ignore the result. We only need the headers
      const { headers } = await this.executionContext.nextItem();
      this.offset--;
      return { result: undefined, headers };
    }
    if (this.limit > 0) {
      const response = await this.executionContext.nextItem();
      this.limit--;
      return response;
    }
    // If both limit and offset are 0, return nothing
    return { result: undefined, headers: getInitialHeader() };
  }

  public async current(): Promise<Response<any>> {
    if (this.offset > 0) {
      const current = await this.executionContext.current();
      return { result: undefined, headers: current.headers };
    }
    return this.executionContext.current();
  }

  public hasMoreResults() {
    return (this.offset > 0 || this.limit > 0) && this.executionContext.hasMoreResults();
  }
}

import { Response } from "../../request/request";
import { IExecutionContext } from "../IExecutionContext";
import { IEndpointComponent } from "./IEndpointComponent";

/** @hidden */
export class TopEndpointComponent implements IEndpointComponent {
  /**
   * Represents an endpoint in handling top query. It only returns as many results as top arg specified.
   * @constructor TopEndpointComponent
   * @param { object } executionContext - Underlying Execution Context
   * @ignore
   */
  constructor(private executionContext: IExecutionContext, private topCount: number) {}

  /**
   * Execute a provided function on the next element in the TopEndpointComponent.
   * @memberof TopEndpointComponent
   * @instance
   * @param {callback} callback - Function to execute for each element. \
   * the function takes two parameters error, element.
   */
  public async nextItem(): Promise<Response<any>> {
    if (this.topCount <= 0) {
      return { result: undefined, headers: undefined };
    }
    this.topCount--;
    try {
      return this.executionContext.nextItem();
    } catch (err) {
      throw err;
    }
  }

  /**
   * Retrieve the current element on the TopEndpointComponent.
   * @memberof TopEndpointComponent
   * @instance
   * @param {callback} callback - Function to execute for the current element. \
   * the function takes two parameters error, element.
   */
  public async current(): Promise<Response<any>> {
    if (this.topCount <= 0) {
      return { result: undefined, headers: undefined };
    }
    try {
      return this.executionContext.current();
    } catch (err) {
      throw err;
    }
  }

  /**
   * Determine if there are still remaining resources to processs.
   * @memberof TopEndpointComponent
   * @instance
   * @returns {Boolean} true if there is other elements to process in the TopEndpointComponent.
   */
  public hasMoreResults() {
    return this.topCount > 0 && this.executionContext.hasMoreResults();
  }
}

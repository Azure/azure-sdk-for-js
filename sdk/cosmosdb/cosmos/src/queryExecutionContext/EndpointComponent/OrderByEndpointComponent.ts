import { Response } from "../../request/request";
import { IExecutionContext } from "../IExecutionContext";
import { IEndpointComponent } from "./IEndpointComponent";

/** @hidden */
export class OrderByEndpointComponent implements IEndpointComponent {
  /**
   * Represents an endpoint in handling an order by query. For each processed orderby \
   * result it returns 'payload' item of the result
   * @constructor OrderByEndpointComponent
   * @param {object} executionContext              - Underlying Execution Context
   * @ignore
   */
  constructor(private executionContext: IExecutionContext) {}
  /**
   * Execute a provided function on the next element in the OrderByEndpointComponent.
   * @memberof OrderByEndpointComponent
   * @instance
   * @param {callback} callback - Function to execute for each element. the function \
   * takes two parameters error, element.
   */
  public async nextItem(): Promise<Response<any>> {
    try {
      const { result: item, headers } = await this.executionContext.nextItem();
      return {
        result: item !== undefined ? item.payload : undefined,
        headers
      };
    } catch (err) {
      throw err;
    }
  }

  /**
   * Retrieve the current element on the OrderByEndpointComponent.
   * @memberof OrderByEndpointComponent
   * @instance
   * @param {callback} callback - Function to execute for the current element. \
   * the function takes two parameters error, element.
   */
  public async current(): Promise<Response<any>> {
    try {
      const { result: item, headers } = await this.executionContext.current();
      return {
        result: item !== undefined ? item.payload : undefined,
        headers
      };
    } catch (err) {
      throw err;
    }
  }

  /**
   * Determine if there are still remaining resources to processs.
   * @memberof OrderByEndpointComponent
   * @instance
   * @returns {Boolean} true if there is other elements to process in the OrderByEndpointComponent.
   */
  public hasMoreResults() {
    return this.executionContext.hasMoreResults();
  }
}

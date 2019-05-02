import { IHeaders } from "..";
import { Response } from "../../request/request";
import { AverageAggregator, CountAggregator, MaxAggregator, MinAggregator, SumAggregator } from "../Aggregators";
import { IExecutionContext } from "../IExecutionContext";
import { IEndpointComponent } from "./IEndpointComponent";

/** @hidden */
export class AggregateEndpointComponent implements IEndpointComponent {
  private toArrayTempResources: any[];
  private aggregateValues: any[];
  private aggregateValuesIndex: number;
  private localAggregators: any[];

  /**
   * Represents an endpoint in handling aggregate queries.
   * @constructor AggregateEndpointComponent
   * @param { object } executionContext - Underlying Execution Context
   * @ignore
   */
  constructor(private executionContext: IExecutionContext, aggregateOperators: string[]) {
    // TODO: any
    this.executionContext = executionContext;
    this.localAggregators = [];
    aggregateOperators.forEach((aggregateOperator: string) => {
      switch (aggregateOperator) {
        case "Average":
          this.localAggregators.push(new AverageAggregator());
          break;
        case "Count":
          this.localAggregators.push(new CountAggregator());
          break;
        case "Max":
          this.localAggregators.push(new MaxAggregator());
          break;
        case "Min":
          this.localAggregators.push(new MinAggregator());
          break;
        case "Sum":
          this.localAggregators.push(new SumAggregator());
          break;
      }
    });
  }
  /**
   * Populate the aggregated values
   * @ignore
   */
  private async _getAggregateResult(): Promise<Response<any>> {
    this.toArrayTempResources = [];
    this.aggregateValues = [];
    this.aggregateValuesIndex = -1;

    try {
      const { result: resources, headers } = await this._getQueryResults();

      resources.forEach((resource: any) => {
        // TODO: any
        this.localAggregators.forEach(aggregator => {
          let itemValue;
          // Get the value of the first property if it exists
          if (resource && Object.keys(resource).length > 0) {
            const key = Object.keys(resource)[0];
            itemValue = resource[key];
          }
          aggregator.aggregate(itemValue);
        });
      });

      // Get the aggregated results
      this.localAggregators.forEach(aggregator => {
        this.aggregateValues.push(aggregator.getResult());
      });

      return { result: this.aggregateValues, headers };
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get the results of queries from all partitions
   * @ignore
   */
  public async _getQueryResults(): Promise<Response<any>> {
    try {
      const { result: item, headers } = await this.executionContext.nextItem();
      if (item === undefined) {
        // no more results
        return { result: this.toArrayTempResources, headers };
      }

      this.toArrayTempResources = this.toArrayTempResources.concat(item);
      return this._getQueryResults();
    } catch (err) {
      throw err;
    }
  }

  /**
   * Execute a provided function on the next element in the AggregateEndpointComponent.
   * @memberof AggregateEndpointComponent
   * @instance
   * @param {callback} callback - Function to execute for each element. \
   * the function takes two parameters error, element.
   */
  public async nextItem(): Promise<Response<any>> {
    try {
      let resHeaders: IHeaders;
      let resources: any;
      if (this.aggregateValues === undefined) {
        ({ result: resources, headers: resHeaders } = await this._getAggregateResult());
      }
      const resource =
        this.aggregateValuesIndex < this.aggregateValues.length
          ? this.aggregateValues[++this.aggregateValuesIndex]
          : undefined;

      return { result: resource, headers: resHeaders };
    } catch (err) {
      throw err;
    }
  }

  /**
   * Retrieve the current element on the AggregateEndpointComponent.
   * @memberof AggregateEndpointComponent
   * @instance
   * @param {callback} callback - Function to execute for the current element. \
   * the function takes two parameters error, element.
   */
  public async current(): Promise<Response<any>> {
    if (this.aggregateValues === undefined) {
      const { result: resouces, headers } = await this._getAggregateResult();
      return {
        result: this.aggregateValues[this.aggregateValuesIndex],
        headers
      };
    } else {
      return {
        result: this.aggregateValues[this.aggregateValuesIndex],
        headers: undefined
      };
    }
  }

  /**
   * Determine if there are still remaining resources to processs.
   * @memberof AggregateEndpointComponent
   * @instance
   * @returns {Boolean} true if there is other elements to process in the AggregateEndpointComponent.
   */
  public hasMoreResults() {
    return this.aggregateValues != null && this.aggregateValuesIndex < this.aggregateValues.length - 1;
  }
}

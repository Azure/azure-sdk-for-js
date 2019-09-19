// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Response } from "../../request";
import {
  AverageAggregator,
  CountAggregator,
  MaxAggregator,
  MinAggregator,
  SumAggregator
} from "../Aggregators";
import { ExecutionContext } from "../ExecutionContext";
import { getInitialHeader, mergeHeaders } from "../headerUtils";
import { CosmosHeaders } from "../index";

/** @hidden */
export class AggregateEndpointComponent implements ExecutionContext {
  private toArrayTempResources: any[];
  private aggregateValues: any[];
  private aggregateValuesIndex: number;
  private localAggregators: any[];
  private started: boolean;
  private respHeaders: CosmosHeaders;

  /**
   * Represents an endpoint in handling aggregate queries.
   * @constructor AggregateEndpointComponent
   * @param { object } executionContext - Underlying Execution Context
   * @ignore
   */
  constructor(private executionContext: ExecutionContext, aggregateOperators: string[]) {
    // TODO: any
    this.executionContext = executionContext;
    this.localAggregators = [];
    this.respHeaders = getInitialHeader();
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

    const { result: resources, headers } = await this._getQueryResults();

    resources.forEach((resource: any) => {
      // Newer API versions rewrite the query to return `item2`. It fixes some legacy issues with the original `item` result
      // Aggregatior code should use item2 when available
      const aggregateResult = resource.item2 ? resource.item2 : resource.item;
      this.localAggregators.forEach((aggregator) => {
        aggregator.aggregate(aggregateResult);
      });
    });

    // Get the aggregated results
    this.localAggregators.forEach((aggregator) => {
      this.aggregateValues.push(aggregator.getResult());
    });

    return { result: this.aggregateValues, headers };
  }

  /**
   * Get the results of queries from all partitions
   * @ignore
   */
  public async _getQueryResults(): Promise<Response<any>> {
    this.started = true;
    const { result: item, headers } = await this.executionContext.nextItem();
    if (item === undefined) {
      // no more results
      return {
        result: this.toArrayTempResources,
        headers: this.getAndResetActiveResponseHeaders()
      };
    }

    this.toArrayTempResources = this.toArrayTempResources.concat(item);
    this.mergeWithActiveResponseHeaders(headers);
    return this._getQueryResults();
  }

  private mergeWithActiveResponseHeaders(headers: CosmosHeaders) {
    mergeHeaders(this.respHeaders, headers);
  }

  private getAndResetActiveResponseHeaders() {
    const ret = this.respHeaders;
    this.respHeaders = getInitialHeader();
    return ret;
  }

  /**
   * Execute a provided function on the next element in the AggregateEndpointComponent.
   * @memberof AggregateEndpointComponent
   * @instance
   * @param {callback} callback - Function to execute for each element. \
   * the function takes two parameters error, element.
   */
  public async nextItem(): Promise<Response<any>> {
    let resHeaders: CosmosHeaders;
    if (this.aggregateValues === undefined) {
      ({ headers: resHeaders } = await this._getAggregateResult());
    }
    const resource =
      this.aggregateValuesIndex < this.aggregateValues.length
        ? this.aggregateValues[++this.aggregateValuesIndex]
        : undefined;
    return { result: resource, headers: resHeaders };
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
      const { headers } = await this._getAggregateResult();
      return {
        result: this.aggregateValues[this.aggregateValuesIndex],
        headers
      };
    } else {
      return {
        result: this.aggregateValues[this.aggregateValuesIndex],
        headers: getInitialHeader()
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
    if (!this.started) {
      return true;
    }
    return (
      !this.started &&
      this.aggregateValues != null &&
      this.aggregateValuesIndex < this.aggregateValues.length - 1
    );
  }
}

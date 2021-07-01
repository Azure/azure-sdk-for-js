import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Operations } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import {
  ComputeOperationValue,
  OperationsListOptionalParams,
  OperationsListResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class representing a Operations. */
export class OperationsImpl implements Operations {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class Operations class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Gets a list of compute operations.
   * @param options The options parameters.
   */
  public list(
    options?: OperationsListOptionalParams
  ): PagedAsyncIterableIterator<ComputeOperationValue> {
    const iter = this.listPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(options);
      }
    };
  }

  private async *listPagingPage(
    options?: OperationsListOptionalParams
  ): AsyncIterableIterator<ComputeOperationValue[]> {
    let result = await this._list(options);
    yield result.value || [];
  }

  private async *listPagingAll(
    options?: OperationsListOptionalParams
  ): AsyncIterableIterator<ComputeOperationValue> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Gets a list of compute operations.
   * @param options The options parameters.
   */
  private _list(
    options?: OperationsListOptionalParams
  ): Promise<OperationsListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/providers/Microsoft.Compute/operations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ComputeOperationListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};

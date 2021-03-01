import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import {
  Usage as UsageModel,
  UsageListResponse,
  UsageListNextResponse
} from "../models";

/** Class representing a Usage. */
export class Usage {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class Usage class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Gets, for the specified location, the current compute resource usage information as well as the
   * limits for compute resources under the subscription.
   * @param location The location for which resource usage is queried.
   * @param options The options parameters.
   */
  public list(
    location: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<UsageModel> {
    const iter = this.listPagingAll(location, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(location, options);
      }
    };
  }

  private async *listPagingPage(
    location: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<UsageModel[]> {
    let result = await this._list(location, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(location, continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    location: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<UsageModel> {
    for await (const page of this.listPagingPage(location, options)) {
      yield* page;
    }
  }

  /**
   * Gets, for the specified location, the current compute resource usage information as well as the
   * limits for compute resources under the subscription.
   * @param location The location for which resource usage is queried.
   * @param options The options parameters.
   */
  private _list(
    location: string,
    options?: coreHttp.OperationOptions
  ): Promise<UsageListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<UsageListResponse>;
  }

  /**
   * ListNext
   * @param location The location for which resource usage is queried.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    location: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<UsageListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<UsageListNextResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/usages",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ListUsagesResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ListUsagesResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.location1
  ],
  headerParameters: [Parameters.accept],
  serializer
};

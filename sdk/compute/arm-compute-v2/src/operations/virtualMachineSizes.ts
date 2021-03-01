import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { VirtualMachineSize, VirtualMachineSizesListResponse } from "../models";

/** Class representing a VirtualMachineSizes. */
export class VirtualMachineSizes {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class VirtualMachineSizes class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * This API is deprecated. Use [Resources
   * Skus](https://docs.microsoft.com/en-us/rest/api/compute/resourceskus/list)
   * @param location The location upon which virtual-machine-sizes is queried.
   * @param options The options parameters.
   */
  public list(
    location: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualMachineSize> {
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
  ): AsyncIterableIterator<VirtualMachineSize[]> {
    let result = await this._list(location, options);
    yield result.value || [];
  }

  private async *listPagingAll(
    location: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineSize> {
    for await (const page of this.listPagingPage(location, options)) {
      yield* page;
    }
  }

  /**
   * This API is deprecated. Use [Resources
   * Skus](https://docs.microsoft.com/en-us/rest/api/compute/resourceskus/list)
   * @param location The location upon which virtual-machine-sizes is queried.
   * @param options The options parameters.
   */
  private _list(
    location: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineSizesListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<VirtualMachineSizesListResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/vmSizes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineSizeListResult
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

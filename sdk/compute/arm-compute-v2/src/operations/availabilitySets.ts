import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import {
  AvailabilitySet,
  AvailabilitySetsListBySubscriptionNextOptionalParams,
  AvailabilitySetsListBySubscriptionOptionalParams,
  VirtualMachineSize,
  AvailabilitySetsCreateOrUpdateResponse,
  AvailabilitySetUpdate,
  AvailabilitySetsUpdateResponse,
  AvailabilitySetsGetResponse,
  AvailabilitySetsListBySubscriptionResponse,
  AvailabilitySetsListResponse,
  AvailabilitySetsListAvailableSizesResponse,
  AvailabilitySetsListBySubscriptionNextResponse,
  AvailabilitySetsListNextResponse
} from "../models";

/** Class representing a AvailabilitySets. */
export class AvailabilitySets {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class AvailabilitySets class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Lists all availability sets in a subscription.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: AvailabilitySetsListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<AvailabilitySet> {
    const iter = this.listBySubscriptionPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listBySubscriptionPagingPage(options);
      }
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: AvailabilitySetsListBySubscriptionOptionalParams
  ): AsyncIterableIterator<AvailabilitySet[]> {
    let result = await this._listBySubscription(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listBySubscriptionNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listBySubscriptionPagingAll(
    options?: AvailabilitySetsListBySubscriptionOptionalParams
  ): AsyncIterableIterator<AvailabilitySet> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists all availability sets in a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<AvailabilitySet> {
    const iter = this.listPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(resourceGroupName, options);
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<AvailabilitySet[]> {
    let result = await this._list(resourceGroupName, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<AvailabilitySet> {
    for await (const page of this.listPagingPage(resourceGroupName, options)) {
      yield* page;
    }
  }

  /**
   * Lists all available virtual machine sizes that can be used to create a new virtual machine in an
   * existing availability set.
   * @param resourceGroupName The name of the resource group.
   * @param availabilitySetName The name of the availability set.
   * @param options The options parameters.
   */
  public listAvailableSizes(
    resourceGroupName: string,
    availabilitySetName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualMachineSize> {
    const iter = this.listAvailableSizesPagingAll(
      resourceGroupName,
      availabilitySetName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listAvailableSizesPagingPage(
          resourceGroupName,
          availabilitySetName,
          options
        );
      }
    };
  }

  private async *listAvailableSizesPagingPage(
    resourceGroupName: string,
    availabilitySetName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineSize[]> {
    let result = await this._listAvailableSizes(
      resourceGroupName,
      availabilitySetName,
      options
    );
    yield result.value || [];
  }

  private async *listAvailableSizesPagingAll(
    resourceGroupName: string,
    availabilitySetName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualMachineSize> {
    for await (const page of this.listAvailableSizesPagingPage(
      resourceGroupName,
      availabilitySetName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Create or update an availability set.
   * @param resourceGroupName The name of the resource group.
   * @param availabilitySetName The name of the availability set.
   * @param parameters Parameters supplied to the Create Availability Set operation.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    availabilitySetName: string,
    parameters: AvailabilitySet,
    options?: coreHttp.OperationOptions
  ): Promise<AvailabilitySetsCreateOrUpdateResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      availabilitySetName,
      parameters,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      createOrUpdateOperationSpec
    ) as Promise<AvailabilitySetsCreateOrUpdateResponse>;
  }

  /**
   * Update an availability set.
   * @param resourceGroupName The name of the resource group.
   * @param availabilitySetName The name of the availability set.
   * @param parameters Parameters supplied to the Update Availability Set operation.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    availabilitySetName: string,
    parameters: AvailabilitySetUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<AvailabilitySetsUpdateResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      availabilitySetName,
      parameters,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      updateOperationSpec
    ) as Promise<AvailabilitySetsUpdateResponse>;
  }

  /**
   * Delete an availability set.
   * @param resourceGroupName The name of the resource group.
   * @param availabilitySetName The name of the availability set.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    availabilitySetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      availabilitySetName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Retrieves information about an availability set.
   * @param resourceGroupName The name of the resource group.
   * @param availabilitySetName The name of the availability set.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    availabilitySetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<AvailabilitySetsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      availabilitySetName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<AvailabilitySetsGetResponse>;
  }

  /**
   * Lists all availability sets in a subscription.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: AvailabilitySetsListBySubscriptionOptionalParams
  ): Promise<AvailabilitySetsListBySubscriptionResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listBySubscriptionOperationSpec
    ) as Promise<AvailabilitySetsListBySubscriptionResponse>;
  }

  /**
   * Lists all availability sets in a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<AvailabilitySetsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<AvailabilitySetsListResponse>;
  }

  /**
   * Lists all available virtual machine sizes that can be used to create a new virtual machine in an
   * existing availability set.
   * @param resourceGroupName The name of the resource group.
   * @param availabilitySetName The name of the availability set.
   * @param options The options parameters.
   */
  private _listAvailableSizes(
    resourceGroupName: string,
    availabilitySetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<AvailabilitySetsListAvailableSizesResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      availabilitySetName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listAvailableSizesOperationSpec
    ) as Promise<AvailabilitySetsListAvailableSizesResponse>;
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: AvailabilitySetsListBySubscriptionNextOptionalParams
  ): Promise<AvailabilitySetsListBySubscriptionNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listBySubscriptionNextOperationSpec
    ) as Promise<AvailabilitySetsListBySubscriptionNextResponse>;
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<AvailabilitySetsListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<AvailabilitySetsListNextResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.AvailabilitySet
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.availabilitySetName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.AvailabilitySet
    }
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.availabilitySetName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.availabilitySetName,
    Parameters.subscriptionId
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AvailabilitySet
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.availabilitySetName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listBySubscriptionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/availabilitySets",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AvailabilitySetListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AvailabilitySetListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listAvailableSizesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}/vmSizes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineSizeListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.availabilitySetName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listBySubscriptionNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AvailabilitySetListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AvailabilitySetListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};

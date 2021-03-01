import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import {
  ProximityPlacementGroup,
  ProximityPlacementGroupsCreateOrUpdateResponse,
  ProximityPlacementGroupUpdate,
  ProximityPlacementGroupsUpdateResponse,
  ProximityPlacementGroupsGetOptionalParams,
  ProximityPlacementGroupsGetResponse,
  ProximityPlacementGroupsListBySubscriptionResponse,
  ProximityPlacementGroupsListByResourceGroupResponse,
  ProximityPlacementGroupsListBySubscriptionNextResponse,
  ProximityPlacementGroupsListByResourceGroupNextResponse
} from "../models";

/** Class representing a ProximityPlacementGroups. */
export class ProximityPlacementGroups {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class ProximityPlacementGroups class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Lists all proximity placement groups in a subscription.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<ProximityPlacementGroup> {
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
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<ProximityPlacementGroup[]> {
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
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<ProximityPlacementGroup> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists all proximity placement groups in a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<ProximityPlacementGroup> {
    const iter = this.listByResourceGroupPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByResourceGroupPagingPage(resourceGroupName, options);
      }
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<ProximityPlacementGroup[]> {
    let result = await this._listByResourceGroup(resourceGroupName, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByResourceGroupNext(
        resourceGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<ProximityPlacementGroup> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Create or update a proximity placement group.
   * @param resourceGroupName The name of the resource group.
   * @param proximityPlacementGroupName The name of the proximity placement group.
   * @param parameters Parameters supplied to the Create Proximity Placement Group operation.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    proximityPlacementGroupName: string,
    parameters: ProximityPlacementGroup,
    options?: coreHttp.OperationOptions
  ): Promise<ProximityPlacementGroupsCreateOrUpdateResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      proximityPlacementGroupName,
      parameters,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      createOrUpdateOperationSpec
    ) as Promise<ProximityPlacementGroupsCreateOrUpdateResponse>;
  }

  /**
   * Update a proximity placement group.
   * @param resourceGroupName The name of the resource group.
   * @param proximityPlacementGroupName The name of the proximity placement group.
   * @param parameters Parameters supplied to the Update Proximity Placement Group operation.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    proximityPlacementGroupName: string,
    parameters: ProximityPlacementGroupUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<ProximityPlacementGroupsUpdateResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      proximityPlacementGroupName,
      parameters,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      updateOperationSpec
    ) as Promise<ProximityPlacementGroupsUpdateResponse>;
  }

  /**
   * Delete a proximity placement group.
   * @param resourceGroupName The name of the resource group.
   * @param proximityPlacementGroupName The name of the proximity placement group.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    proximityPlacementGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      proximityPlacementGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Retrieves information about a proximity placement group .
   * @param resourceGroupName The name of the resource group.
   * @param proximityPlacementGroupName The name of the proximity placement group.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    proximityPlacementGroupName: string,
    options?: ProximityPlacementGroupsGetOptionalParams
  ): Promise<ProximityPlacementGroupsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      proximityPlacementGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<ProximityPlacementGroupsGetResponse>;
  }

  /**
   * Lists all proximity placement groups in a subscription.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: coreHttp.OperationOptions
  ): Promise<ProximityPlacementGroupsListBySubscriptionResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listBySubscriptionOperationSpec
    ) as Promise<ProximityPlacementGroupsListBySubscriptionResponse>;
  }

  /**
   * Lists all proximity placement groups in a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ProximityPlacementGroupsListByResourceGroupResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByResourceGroupOperationSpec
    ) as Promise<ProximityPlacementGroupsListByResourceGroupResponse>;
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<ProximityPlacementGroupsListBySubscriptionNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listBySubscriptionNextOperationSpec
    ) as Promise<ProximityPlacementGroupsListBySubscriptionNextResponse>;
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  private _listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<ProximityPlacementGroupsListByResourceGroupNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByResourceGroupNextOperationSpec
    ) as Promise<ProximityPlacementGroupsListByResourceGroupNextResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/{proximityPlacementGroupName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ProximityPlacementGroup
    },
    201: {
      bodyMapper: Mappers.ProximityPlacementGroup
    }
  },
  requestBody: Parameters.parameters2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.proximityPlacementGroupName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/{proximityPlacementGroupName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.ProximityPlacementGroup
    }
  },
  requestBody: Parameters.parameters3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.proximityPlacementGroupName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/{proximityPlacementGroupName}",
  httpMethod: "DELETE",
  responses: { 200: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.proximityPlacementGroupName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/{proximityPlacementGroupName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProximityPlacementGroup
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.includeColocationStatus],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.proximityPlacementGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listBySubscriptionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/proximityPlacementGroups",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProximityPlacementGroupListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProximityPlacementGroupListResult
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
const listBySubscriptionNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProximityPlacementGroupListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProximityPlacementGroupListResult
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

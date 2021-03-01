import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  DiskAccess,
  PrivateEndpointConnection,
  DiskAccessesCreateOrUpdateResponse,
  DiskAccessUpdate,
  DiskAccessesUpdateResponse,
  DiskAccessesGetResponse,
  DiskAccessesListByResourceGroupResponse,
  DiskAccessesListResponse,
  DiskAccessesGetPrivateLinkResourcesResponse,
  DiskAccessesUpdateAPrivateEndpointConnectionResponse,
  DiskAccessesGetAPrivateEndpointConnectionResponse,
  DiskAccessesListPrivateEndpointConnectionsResponse,
  DiskAccessesListByResourceGroupNextResponse,
  DiskAccessesListNextResponse,
  DiskAccessesListPrivateEndpointConnectionsNextResponse
} from "../models";

/** Class representing a DiskAccesses. */
export class DiskAccesses {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class DiskAccesses class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Lists all the disk access resources under a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<DiskAccess> {
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
  ): AsyncIterableIterator<DiskAccess[]> {
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
  ): AsyncIterableIterator<DiskAccess> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists all the disk access resources under a subscription.
   * @param options The options parameters.
   */
  public list(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<DiskAccess> {
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
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<DiskAccess[]> {
    let result = await this._list(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<DiskAccess> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * List information about private endpoint connections under a disk access resource
   * @param resourceGroupName The name of the resource group.
   * @param diskAccessName The name of the disk access resource that is being created. The name can't be
   *                       changed after the disk encryption set is created. Supported characters for the name are a-z, A-Z,
   *                       0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  public listPrivateEndpointConnections(
    resourceGroupName: string,
    diskAccessName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<PrivateEndpointConnection> {
    const iter = this.listPrivateEndpointConnectionsPagingAll(
      resourceGroupName,
      diskAccessName,
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
        return this.listPrivateEndpointConnectionsPagingPage(
          resourceGroupName,
          diskAccessName,
          options
        );
      }
    };
  }

  private async *listPrivateEndpointConnectionsPagingPage(
    resourceGroupName: string,
    diskAccessName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<PrivateEndpointConnection[]> {
    let result = await this._listPrivateEndpointConnections(
      resourceGroupName,
      diskAccessName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listPrivateEndpointConnectionsNext(
        resourceGroupName,
        diskAccessName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPrivateEndpointConnectionsPagingAll(
    resourceGroupName: string,
    diskAccessName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<PrivateEndpointConnection> {
    for await (const page of this.listPrivateEndpointConnectionsPagingPage(
      resourceGroupName,
      diskAccessName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Creates or updates a disk access resource
   * @param resourceGroupName The name of the resource group.
   * @param diskAccessName The name of the disk access resource that is being created. The name can't be
   *                       changed after the disk encryption set is created. Supported characters for the name are a-z, A-Z,
   *                       0-9 and _. The maximum name length is 80 characters.
   * @param diskAccess disk access object supplied in the body of the Put disk access operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    diskAccessName: string,
    diskAccess: DiskAccess,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<DiskAccessesCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskAccessName,
      diskAccess,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        DiskAccessesCreateOrUpdateResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Updates (patches) a disk access resource.
   * @param resourceGroupName The name of the resource group.
   * @param diskAccessName The name of the disk access resource that is being created. The name can't be
   *                       changed after the disk encryption set is created. Supported characters for the name are a-z, A-Z,
   *                       0-9 and _. The maximum name length is 80 characters.
   * @param diskAccess disk access object supplied in the body of the Patch disk access operation.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    diskAccessName: string,
    diskAccess: DiskAccessUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<DiskAccessesUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskAccessName,
      diskAccess,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        DiskAccessesUpdateResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      updateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: updateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets information about a disk access resource.
   * @param resourceGroupName The name of the resource group.
   * @param diskAccessName The name of the disk access resource that is being created. The name can't be
   *                       changed after the disk encryption set is created. Supported characters for the name are a-z, A-Z,
   *                       0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    diskAccessName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DiskAccessesGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskAccessName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<DiskAccessesGetResponse>;
  }

  /**
   * Deletes a disk access resource.
   * @param resourceGroupName The name of the resource group.
   * @param diskAccessName The name of the disk access resource that is being created. The name can't be
   *                       changed after the disk encryption set is created. Supported characters for the name are a-z, A-Z,
   *                       0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    diskAccessName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskAccessName,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      deleteOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Lists all the disk access resources under a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DiskAccessesListByResourceGroupResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByResourceGroupOperationSpec
    ) as Promise<DiskAccessesListByResourceGroupResponse>;
  }

  /**
   * Lists all the disk access resources under a subscription.
   * @param options The options parameters.
   */
  private _list(
    options?: coreHttp.OperationOptions
  ): Promise<DiskAccessesListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<DiskAccessesListResponse>;
  }

  /**
   * Gets the private link resources possible under disk access resource
   * @param resourceGroupName The name of the resource group.
   * @param diskAccessName The name of the disk access resource that is being created. The name can't be
   *                       changed after the disk encryption set is created. Supported characters for the name are a-z, A-Z,
   *                       0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  getPrivateLinkResources(
    resourceGroupName: string,
    diskAccessName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DiskAccessesGetPrivateLinkResourcesResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskAccessName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getPrivateLinkResourcesOperationSpec
    ) as Promise<DiskAccessesGetPrivateLinkResourcesResponse>;
  }

  /**
   * Approve or reject a private endpoint connection under disk access resource, this can't be used to
   * create a new private endpoint connection.
   * @param resourceGroupName The name of the resource group.
   * @param diskAccessName The name of the disk access resource that is being created. The name can't be
   *                       changed after the disk encryption set is created. Supported characters for the name are a-z, A-Z,
   *                       0-9 and _. The maximum name length is 80 characters.
   * @param privateEndpointConnectionName The name of the private endpoint connection
   * @param privateEndpointConnection private endpoint connection object supplied in the body of the Put
   *                                  private endpoint connection operation.
   * @param options The options parameters.
   */
  async updateAPrivateEndpointConnection(
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    privateEndpointConnection: PrivateEndpointConnection,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<DiskAccessesUpdateAPrivateEndpointConnectionResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskAccessName,
      privateEndpointConnectionName,
      privateEndpointConnection,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        DiskAccessesUpdateAPrivateEndpointConnectionResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      updateAPrivateEndpointConnectionOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: updateAPrivateEndpointConnectionOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets information about a private endpoint connection under a disk access resource.
   * @param resourceGroupName The name of the resource group.
   * @param diskAccessName The name of the disk access resource that is being created. The name can't be
   *                       changed after the disk encryption set is created. Supported characters for the name are a-z, A-Z,
   *                       0-9 and _. The maximum name length is 80 characters.
   * @param privateEndpointConnectionName The name of the private endpoint connection
   * @param options The options parameters.
   */
  getAPrivateEndpointConnection(
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DiskAccessesGetAPrivateEndpointConnectionResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskAccessName,
      privateEndpointConnectionName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getAPrivateEndpointConnectionOperationSpec
    ) as Promise<DiskAccessesGetAPrivateEndpointConnectionResponse>;
  }

  /**
   * Deletes a private endpoint connection under a disk access resource.
   * @param resourceGroupName The name of the resource group.
   * @param diskAccessName The name of the disk access resource that is being created. The name can't be
   *                       changed after the disk encryption set is created. Supported characters for the name are a-z, A-Z,
   *                       0-9 and _. The maximum name length is 80 characters.
   * @param privateEndpointConnectionName The name of the private endpoint connection
   * @param options The options parameters.
   */
  async deleteAPrivateEndpointConnection(
    resourceGroupName: string,
    diskAccessName: string,
    privateEndpointConnectionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskAccessName,
      privateEndpointConnectionName,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      deleteAPrivateEndpointConnectionOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteAPrivateEndpointConnectionOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * List information about private endpoint connections under a disk access resource
   * @param resourceGroupName The name of the resource group.
   * @param diskAccessName The name of the disk access resource that is being created. The name can't be
   *                       changed after the disk encryption set is created. Supported characters for the name are a-z, A-Z,
   *                       0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  private _listPrivateEndpointConnections(
    resourceGroupName: string,
    diskAccessName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DiskAccessesListPrivateEndpointConnectionsResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskAccessName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listPrivateEndpointConnectionsOperationSpec
    ) as Promise<DiskAccessesListPrivateEndpointConnectionsResponse>;
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
  ): Promise<DiskAccessesListByResourceGroupNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByResourceGroupNextOperationSpec
    ) as Promise<DiskAccessesListByResourceGroupNextResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<DiskAccessesListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<DiskAccessesListNextResponse>;
  }

  /**
   * ListPrivateEndpointConnectionsNext
   * @param resourceGroupName The name of the resource group.
   * @param diskAccessName The name of the disk access resource that is being created. The name can't be
   *                       changed after the disk encryption set is created. Supported characters for the name are a-z, A-Z,
   *                       0-9 and _. The maximum name length is 80 characters.
   * @param nextLink The nextLink from the previous successful call to the ListPrivateEndpointConnections
   *                 method.
   * @param options The options parameters.
   */
  private _listPrivateEndpointConnectionsNext(
    resourceGroupName: string,
    diskAccessName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<DiskAccessesListPrivateEndpointConnectionsNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskAccessName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listPrivateEndpointConnectionsNextOperationSpec
    ) as Promise<DiskAccessesListPrivateEndpointConnectionsNextResponse>;
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DiskAccess
    },
    201: {
      bodyMapper: Mappers.DiskAccess
    },
    202: {
      bodyMapper: Mappers.DiskAccess
    },
    204: {
      bodyMapper: Mappers.DiskAccess
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.diskAccess,
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.diskAccessName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.DiskAccess
    },
    201: {
      bodyMapper: Mappers.DiskAccess
    },
    202: {
      bodyMapper: Mappers.DiskAccess
    },
    204: {
      bodyMapper: Mappers.DiskAccess
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.diskAccess1,
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.diskAccessName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DiskAccess
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.diskAccessName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.diskAccessName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DiskAccessList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/diskAccesses",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DiskAccessList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const getPrivateLinkResourcesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateLinkResources",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateLinkResourceListResult
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.diskAccessName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateAPrivateEndpointConnectionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnection
    },
    201: {
      bodyMapper: Mappers.PrivateEndpointConnection
    },
    202: {
      bodyMapper: Mappers.PrivateEndpointConnection
    },
    204: {
      bodyMapper: Mappers.PrivateEndpointConnection
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.privateEndpointConnection,
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.diskAccessName,
    Parameters.privateEndpointConnectionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getAPrivateEndpointConnectionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnection
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.diskAccessName,
    Parameters.privateEndpointConnectionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteAPrivateEndpointConnectionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections/{privateEndpointConnectionName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.diskAccessName,
    Parameters.privateEndpointConnectionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listPrivateEndpointConnectionsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskAccesses/{diskAccessName}/privateEndpointConnections",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnectionListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.diskAccessName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DiskAccessList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
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
      bodyMapper: Mappers.DiskAccessList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listPrivateEndpointConnectionsNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateEndpointConnectionListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.diskAccessName
  ],
  headerParameters: [Parameters.accept],
  serializer
};

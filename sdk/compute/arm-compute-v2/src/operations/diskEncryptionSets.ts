import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  DiskEncryptionSet,
  DiskEncryptionSetsCreateOrUpdateResponse,
  DiskEncryptionSetUpdate,
  DiskEncryptionSetsUpdateResponse,
  DiskEncryptionSetsGetResponse,
  DiskEncryptionSetsListByResourceGroupResponse,
  DiskEncryptionSetsListResponse,
  DiskEncryptionSetsListAssociatedResourcesResponse,
  DiskEncryptionSetsListByResourceGroupNextResponse,
  DiskEncryptionSetsListNextResponse,
  DiskEncryptionSetsListAssociatedResourcesNextResponse
} from "../models";

/** Class representing a DiskEncryptionSets. */
export class DiskEncryptionSets {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class DiskEncryptionSets class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Lists all the disk encryption sets under a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<DiskEncryptionSet> {
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
  ): AsyncIterableIterator<DiskEncryptionSet[]> {
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
  ): AsyncIterableIterator<DiskEncryptionSet> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists all the disk encryption sets under a subscription.
   * @param options The options parameters.
   */
  public list(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<DiskEncryptionSet> {
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
  ): AsyncIterableIterator<DiskEncryptionSet[]> {
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
  ): AsyncIterableIterator<DiskEncryptionSet> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists all resources that are encrypted with this disk encryption set.
   * @param resourceGroupName The name of the resource group.
   * @param diskEncryptionSetName The name of the disk encryption set that is being created. The name
   *                              can't be changed after the disk encryption set is created. Supported characters for the name are
   *                              a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  public listAssociatedResources(
    resourceGroupName: string,
    diskEncryptionSetName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<string> {
    const iter = this.listAssociatedResourcesPagingAll(
      resourceGroupName,
      diskEncryptionSetName,
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
        return this.listAssociatedResourcesPagingPage(
          resourceGroupName,
          diskEncryptionSetName,
          options
        );
      }
    };
  }

  private async *listAssociatedResourcesPagingPage(
    resourceGroupName: string,
    diskEncryptionSetName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<string[]> {
    let result = await this._listAssociatedResources(
      resourceGroupName,
      diskEncryptionSetName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listAssociatedResourcesNext(
        resourceGroupName,
        diskEncryptionSetName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listAssociatedResourcesPagingAll(
    resourceGroupName: string,
    diskEncryptionSetName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<string> {
    for await (const page of this.listAssociatedResourcesPagingPage(
      resourceGroupName,
      diskEncryptionSetName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Creates or updates a disk encryption set
   * @param resourceGroupName The name of the resource group.
   * @param diskEncryptionSetName The name of the disk encryption set that is being created. The name
   *                              can't be changed after the disk encryption set is created. Supported characters for the name are
   *                              a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param diskEncryptionSet disk encryption set object supplied in the body of the Put disk encryption
   *                          set operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    diskEncryptionSetName: string,
    diskEncryptionSet: DiskEncryptionSet,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<DiskEncryptionSetsCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskEncryptionSetName,
      diskEncryptionSet,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        DiskEncryptionSetsCreateOrUpdateResponse
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
   * Updates (patches) a disk encryption set.
   * @param resourceGroupName The name of the resource group.
   * @param diskEncryptionSetName The name of the disk encryption set that is being created. The name
   *                              can't be changed after the disk encryption set is created. Supported characters for the name are
   *                              a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param diskEncryptionSet disk encryption set object supplied in the body of the Patch disk
   *                          encryption set operation.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    diskEncryptionSetName: string,
    diskEncryptionSet: DiskEncryptionSetUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<DiskEncryptionSetsUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskEncryptionSetName,
      diskEncryptionSet,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        DiskEncryptionSetsUpdateResponse
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
   * Gets information about a disk encryption set.
   * @param resourceGroupName The name of the resource group.
   * @param diskEncryptionSetName The name of the disk encryption set that is being created. The name
   *                              can't be changed after the disk encryption set is created. Supported characters for the name are
   *                              a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    diskEncryptionSetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DiskEncryptionSetsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskEncryptionSetName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<DiskEncryptionSetsGetResponse>;
  }

  /**
   * Deletes a disk encryption set.
   * @param resourceGroupName The name of the resource group.
   * @param diskEncryptionSetName The name of the disk encryption set that is being created. The name
   *                              can't be changed after the disk encryption set is created. Supported characters for the name are
   *                              a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    diskEncryptionSetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskEncryptionSetName,
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
   * Lists all the disk encryption sets under a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DiskEncryptionSetsListByResourceGroupResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByResourceGroupOperationSpec
    ) as Promise<DiskEncryptionSetsListByResourceGroupResponse>;
  }

  /**
   * Lists all the disk encryption sets under a subscription.
   * @param options The options parameters.
   */
  private _list(
    options?: coreHttp.OperationOptions
  ): Promise<DiskEncryptionSetsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<DiskEncryptionSetsListResponse>;
  }

  /**
   * Lists all resources that are encrypted with this disk encryption set.
   * @param resourceGroupName The name of the resource group.
   * @param diskEncryptionSetName The name of the disk encryption set that is being created. The name
   *                              can't be changed after the disk encryption set is created. Supported characters for the name are
   *                              a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  private _listAssociatedResources(
    resourceGroupName: string,
    diskEncryptionSetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DiskEncryptionSetsListAssociatedResourcesResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskEncryptionSetName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listAssociatedResourcesOperationSpec
    ) as Promise<DiskEncryptionSetsListAssociatedResourcesResponse>;
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
  ): Promise<DiskEncryptionSetsListByResourceGroupNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByResourceGroupNextOperationSpec
    ) as Promise<DiskEncryptionSetsListByResourceGroupNextResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<DiskEncryptionSetsListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<DiskEncryptionSetsListNextResponse>;
  }

  /**
   * ListAssociatedResourcesNext
   * @param resourceGroupName The name of the resource group.
   * @param diskEncryptionSetName The name of the disk encryption set that is being created. The name
   *                              can't be changed after the disk encryption set is created. Supported characters for the name are
   *                              a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param nextLink The nextLink from the previous successful call to the ListAssociatedResources
   *                 method.
   * @param options The options parameters.
   */
  private _listAssociatedResourcesNext(
    resourceGroupName: string,
    diskEncryptionSetName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<DiskEncryptionSetsListAssociatedResourcesNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      diskEncryptionSetName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listAssociatedResourcesNextOperationSpec
    ) as Promise<DiskEncryptionSetsListAssociatedResourcesNextResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DiskEncryptionSet
    },
    201: {
      bodyMapper: Mappers.DiskEncryptionSet
    },
    202: {
      bodyMapper: Mappers.DiskEncryptionSet
    },
    204: {
      bodyMapper: Mappers.DiskEncryptionSet
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.diskEncryptionSet,
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.diskEncryptionSetName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.DiskEncryptionSet
    },
    201: {
      bodyMapper: Mappers.DiskEncryptionSet
    },
    202: {
      bodyMapper: Mappers.DiskEncryptionSet
    },
    204: {
      bodyMapper: Mappers.DiskEncryptionSet
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.diskEncryptionSet1,
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.diskEncryptionSetName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DiskEncryptionSet
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
    Parameters.diskEncryptionSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
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
    Parameters.diskEncryptionSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DiskEncryptionSetList
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
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/diskEncryptionSets",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DiskEncryptionSetList
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
const listAssociatedResourcesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}/associatedResources",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceUriList
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
    Parameters.diskEncryptionSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DiskEncryptionSetList
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
      bodyMapper: Mappers.DiskEncryptionSetList
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
const listAssociatedResourcesNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceUriList
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
    Parameters.diskEncryptionSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};

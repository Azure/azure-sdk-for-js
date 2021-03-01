import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import {
  SshPublicKeyResource,
  SshPublicKeysListBySubscriptionResponse,
  SshPublicKeysListByResourceGroupResponse,
  SshPublicKeysCreateResponse,
  SshPublicKeyUpdateResource,
  SshPublicKeysUpdateResponse,
  SshPublicKeysGetResponse,
  SshPublicKeysGenerateKeyPairResponse,
  SshPublicKeysListBySubscriptionNextResponse,
  SshPublicKeysListByResourceGroupNextResponse
} from "../models";

/** Class representing a SshPublicKeys. */
export class SshPublicKeys {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class SshPublicKeys class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Lists all of the SSH public keys in the subscription. Use the nextLink property in the response to
   * get the next page of SSH public keys.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<SshPublicKeyResource> {
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
  ): AsyncIterableIterator<SshPublicKeyResource[]> {
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
  ): AsyncIterableIterator<SshPublicKeyResource> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists all of the SSH public keys in the specified resource group. Use the nextLink property in the
   * response to get the next page of SSH public keys.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<SshPublicKeyResource> {
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
  ): AsyncIterableIterator<SshPublicKeyResource[]> {
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
  ): AsyncIterableIterator<SshPublicKeyResource> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists all of the SSH public keys in the subscription. Use the nextLink property in the response to
   * get the next page of SSH public keys.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: coreHttp.OperationOptions
  ): Promise<SshPublicKeysListBySubscriptionResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listBySubscriptionOperationSpec
    ) as Promise<SshPublicKeysListBySubscriptionResponse>;
  }

  /**
   * Lists all of the SSH public keys in the specified resource group. Use the nextLink property in the
   * response to get the next page of SSH public keys.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SshPublicKeysListByResourceGroupResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByResourceGroupOperationSpec
    ) as Promise<SshPublicKeysListByResourceGroupResponse>;
  }

  /**
   * Creates a new SSH public key resource.
   * @param resourceGroupName The name of the resource group.
   * @param sshPublicKeyName The name of the SSH public key.
   * @param parameters Parameters supplied to create the SSH public key.
   * @param options The options parameters.
   */
  create(
    resourceGroupName: string,
    sshPublicKeyName: string,
    parameters: SshPublicKeyResource,
    options?: coreHttp.OperationOptions
  ): Promise<SshPublicKeysCreateResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      sshPublicKeyName,
      parameters,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      createOperationSpec
    ) as Promise<SshPublicKeysCreateResponse>;
  }

  /**
   * Updates a new SSH public key resource.
   * @param resourceGroupName The name of the resource group.
   * @param sshPublicKeyName The name of the SSH public key.
   * @param parameters Parameters supplied to update the SSH public key.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    sshPublicKeyName: string,
    parameters: SshPublicKeyUpdateResource,
    options?: coreHttp.OperationOptions
  ): Promise<SshPublicKeysUpdateResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      sshPublicKeyName,
      parameters,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      updateOperationSpec
    ) as Promise<SshPublicKeysUpdateResponse>;
  }

  /**
   * Delete an SSH public key.
   * @param resourceGroupName The name of the resource group.
   * @param sshPublicKeyName The name of the SSH public key.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    sshPublicKeyName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      sshPublicKeyName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Retrieves information about an SSH public key.
   * @param resourceGroupName The name of the resource group.
   * @param sshPublicKeyName The name of the SSH public key.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    sshPublicKeyName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SshPublicKeysGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      sshPublicKeyName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<SshPublicKeysGetResponse>;
  }

  /**
   * Generates and returns a public/private key pair and populates the SSH public key resource with the
   * public key. The length of the key will be 3072 bits. This operation can only be performed once per
   * SSH public key resource.
   * @param resourceGroupName The name of the resource group.
   * @param sshPublicKeyName The name of the SSH public key.
   * @param options The options parameters.
   */
  generateKeyPair(
    resourceGroupName: string,
    sshPublicKeyName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SshPublicKeysGenerateKeyPairResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      sshPublicKeyName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      generateKeyPairOperationSpec
    ) as Promise<SshPublicKeysGenerateKeyPairResponse>;
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<SshPublicKeysListBySubscriptionNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listBySubscriptionNextOperationSpec
    ) as Promise<SshPublicKeysListBySubscriptionNextResponse>;
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
  ): Promise<SshPublicKeysListByResourceGroupNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByResourceGroupNextOperationSpec
    ) as Promise<SshPublicKeysListByResourceGroupNextResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listBySubscriptionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/sshPublicKeys",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SshPublicKeysGroupListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SshPublicKeysGroupListResult
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
const createOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SshPublicKeyResource
    },
    201: {
      bodyMapper: Mappers.SshPublicKeyResource
    }
  },
  requestBody: Parameters.parameters8,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.sshPublicKeyName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.SshPublicKeyResource
    }
  },
  requestBody: Parameters.parameters9,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.sshPublicKeyName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.sshPublicKeyName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SshPublicKeyResource
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.sshPublicKeyName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const generateKeyPairOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{sshPublicKeyName}/generateKeyPair",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SshPublicKeyGenerateKeyPairResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.sshPublicKeyName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listBySubscriptionNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SshPublicKeysGroupListResult
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
      bodyMapper: Mappers.SshPublicKeysGroupListResult
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

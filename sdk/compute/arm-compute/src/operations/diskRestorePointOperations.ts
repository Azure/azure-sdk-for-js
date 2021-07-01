import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DiskRestorePointOperations } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  DiskRestorePoint,
  DiskRestorePointOperationsListByRestorePointNextOptionalParams,
  DiskRestorePointOperationsListByRestorePointOptionalParams,
  DiskRestorePointOperationsGetOptionalParams,
  DiskRestorePointOperationsGetResponse,
  DiskRestorePointOperationsListByRestorePointResponse,
  GrantAccessData,
  DiskRestorePointOperationsGrantAccessOptionalParams,
  DiskRestorePointOperationsGrantAccessResponse,
  DiskRestorePointOperationsRevokeAccessOptionalParams,
  DiskRestorePointOperationsListByRestorePointNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class representing a DiskRestorePointOperations. */
export class DiskRestorePointOperationsImpl
  implements DiskRestorePointOperations {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class DiskRestorePointOperations class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClientContext) {
    this.client = client;
  }

  /**
   * Lists diskRestorePoints under a vmRestorePoint.
   * @param resourceGroupName The name of the resource group.
   * @param restorePointCollectionName The name of the restore point collection that the disk restore
   *                                   point belongs. Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is
   *                                   80 characters.
   * @param vmRestorePointName The name of the vm restore point that the disk disk restore point belongs.
   *                           Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  public listByRestorePoint(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    options?: DiskRestorePointOperationsListByRestorePointOptionalParams
  ): PagedAsyncIterableIterator<DiskRestorePoint> {
    const iter = this.listByRestorePointPagingAll(
      resourceGroupName,
      restorePointCollectionName,
      vmRestorePointName,
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
        return this.listByRestorePointPagingPage(
          resourceGroupName,
          restorePointCollectionName,
          vmRestorePointName,
          options
        );
      }
    };
  }

  private async *listByRestorePointPagingPage(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    options?: DiskRestorePointOperationsListByRestorePointOptionalParams
  ): AsyncIterableIterator<DiskRestorePoint[]> {
    let result = await this._listByRestorePoint(
      resourceGroupName,
      restorePointCollectionName,
      vmRestorePointName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByRestorePointNext(
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByRestorePointPagingAll(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    options?: DiskRestorePointOperationsListByRestorePointOptionalParams
  ): AsyncIterableIterator<DiskRestorePoint> {
    for await (const page of this.listByRestorePointPagingPage(
      resourceGroupName,
      restorePointCollectionName,
      vmRestorePointName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Get disk restorePoint resource
   * @param resourceGroupName The name of the resource group.
   * @param restorePointCollectionName The name of the restore point collection that the disk restore
   *                                   point belongs. Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is
   *                                   80 characters.
   * @param vmRestorePointName The name of the vm restore point that the disk disk restore point belongs.
   *                           Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param diskRestorePointName The name of the disk restore point created. Supported characters for the
   *                             name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    options?: DiskRestorePointOperationsGetOptionalParams
  ): Promise<DiskRestorePointOperationsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        diskRestorePointName,
        options
      },
      getOperationSpec
    );
  }

  /**
   * Lists diskRestorePoints under a vmRestorePoint.
   * @param resourceGroupName The name of the resource group.
   * @param restorePointCollectionName The name of the restore point collection that the disk restore
   *                                   point belongs. Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is
   *                                   80 characters.
   * @param vmRestorePointName The name of the vm restore point that the disk disk restore point belongs.
   *                           Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  private _listByRestorePoint(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    options?: DiskRestorePointOperationsListByRestorePointOptionalParams
  ): Promise<DiskRestorePointOperationsListByRestorePointResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        options
      },
      listByRestorePointOperationSpec
    );
  }

  /**
   * Grants access to a diskRestorePoint.
   * @param resourceGroupName The name of the resource group.
   * @param restorePointCollectionName The name of the restore point collection that the disk restore
   *                                   point belongs. Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is
   *                                   80 characters.
   * @param vmRestorePointName The name of the vm restore point that the disk disk restore point belongs.
   *                           Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param diskRestorePointName The name of the disk restore point created. Supported characters for the
   *                             name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param grantAccessData Access data object supplied in the body of the get disk access operation.
   * @param options The options parameters.
   */
  async beginGrantAccess(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    grantAccessData: GrantAccessData,
    options?: DiskRestorePointOperationsGrantAccessOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<DiskRestorePointOperationsGrantAccessResponse>,
      DiskRestorePointOperationsGrantAccessResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<DiskRestorePointOperationsGrantAccessResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return { flatResponse, rawResponse: currentRawResponse! };
    };

    return new LROPoller(
      { intervalInMs: options?.updateIntervalInMs },
      {
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        diskRestorePointName,
        grantAccessData,
        options
      },
      grantAccessOperationSpec,
      sendOperation,
      "location"
    );
  }

  /**
   * Grants access to a diskRestorePoint.
   * @param resourceGroupName The name of the resource group.
   * @param restorePointCollectionName The name of the restore point collection that the disk restore
   *                                   point belongs. Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is
   *                                   80 characters.
   * @param vmRestorePointName The name of the vm restore point that the disk disk restore point belongs.
   *                           Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param diskRestorePointName The name of the disk restore point created. Supported characters for the
   *                             name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param grantAccessData Access data object supplied in the body of the get disk access operation.
   * @param options The options parameters.
   */
  async beginGrantAccessAndWait(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    grantAccessData: GrantAccessData,
    options?: DiskRestorePointOperationsGrantAccessOptionalParams
  ): Promise<DiskRestorePointOperationsGrantAccessResponse> {
    const poller = await this.beginGrantAccess(
      resourceGroupName,
      restorePointCollectionName,
      vmRestorePointName,
      diskRestorePointName,
      grantAccessData,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Revokes access to a diskRestorePoint.
   * @param resourceGroupName The name of the resource group.
   * @param restorePointCollectionName The name of the restore point collection that the disk restore
   *                                   point belongs. Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is
   *                                   80 characters.
   * @param vmRestorePointName The name of the vm restore point that the disk disk restore point belongs.
   *                           Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param diskRestorePointName The name of the disk restore point created. Supported characters for the
   *                             name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  async beginRevokeAccess(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    options?: DiskRestorePointOperationsRevokeAccessOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return { flatResponse, rawResponse: currentRawResponse! };
    };

    return new LROPoller(
      { intervalInMs: options?.updateIntervalInMs },
      {
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        diskRestorePointName,
        options
      },
      revokeAccessOperationSpec,
      sendOperation,
      "location"
    );
  }

  /**
   * Revokes access to a diskRestorePoint.
   * @param resourceGroupName The name of the resource group.
   * @param restorePointCollectionName The name of the restore point collection that the disk restore
   *                                   point belongs. Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is
   *                                   80 characters.
   * @param vmRestorePointName The name of the vm restore point that the disk disk restore point belongs.
   *                           Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param diskRestorePointName The name of the disk restore point created. Supported characters for the
   *                             name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  async beginRevokeAccessAndWait(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    options?: DiskRestorePointOperationsRevokeAccessOptionalParams
  ): Promise<void> {
    const poller = await this.beginRevokeAccess(
      resourceGroupName,
      restorePointCollectionName,
      vmRestorePointName,
      diskRestorePointName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * ListByRestorePointNext
   * @param resourceGroupName The name of the resource group.
   * @param restorePointCollectionName The name of the restore point collection that the disk restore
   *                                   point belongs. Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is
   *                                   80 characters.
   * @param vmRestorePointName The name of the vm restore point that the disk disk restore point belongs.
   *                           Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param nextLink The nextLink from the previous successful call to the ListByRestorePoint method.
   * @param options The options parameters.
   */
  private _listByRestorePointNext(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    nextLink: string,
    options?: DiskRestorePointOperationsListByRestorePointNextOptionalParams
  ): Promise<DiskRestorePointOperationsListByRestorePointNextResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        restorePointCollectionName,
        vmRestorePointName,
        nextLink,
        options
      },
      listByRestorePointNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DiskRestorePoint
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
    Parameters.restorePointCollectionName,
    Parameters.vmRestorePointName,
    Parameters.diskRestorePointName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByRestorePointOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DiskRestorePointList
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
    Parameters.restorePointCollectionName,
    Parameters.vmRestorePointName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const grantAccessOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}/beginGetAccess",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AccessUri
    },
    201: {
      bodyMapper: Mappers.AccessUri
    },
    202: {
      bodyMapper: Mappers.AccessUri
    },
    204: {
      bodyMapper: Mappers.AccessUri
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.grantAccessData,
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.restorePointCollectionName,
    Parameters.vmRestorePointName,
    Parameters.diskRestorePointName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const revokeAccessOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/{restorePointCollectionName}/restorePoints/{vmRestorePointName}/diskRestorePoints/{diskRestorePointName}/endGetAccess",
  httpMethod: "POST",
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
    Parameters.restorePointCollectionName,
    Parameters.vmRestorePointName,
    Parameters.diskRestorePointName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByRestorePointNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DiskRestorePointList
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
    Parameters.restorePointCollectionName,
    Parameters.vmRestorePointName
  ],
  headerParameters: [Parameters.accept],
  serializer
};

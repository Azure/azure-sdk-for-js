import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
import {
  DiskRestorePoint as DiskRestorePointModel,
  DiskRestorePointGetResponse,
  DiskRestorePointListByRestorePointResponse,
  DiskRestorePointListByRestorePointNextResponse
} from "../models";

/** Class representing a DiskRestorePoint. */
export class DiskRestorePoint {
  private readonly client: ComputeManagementClientContext;

  /**
   * Initialize a new instance of the class DiskRestorePoint class.
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
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<DiskRestorePointModel> {
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
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<DiskRestorePointModel[]> {
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
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<DiskRestorePointModel> {
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
    options?: coreHttp.OperationOptions
  ): Promise<DiskRestorePointGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      restorePointCollectionName,
      vmRestorePointName,
      diskRestorePointName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<DiskRestorePointGetResponse>;
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
    options?: coreHttp.OperationOptions
  ): Promise<DiskRestorePointListByRestorePointResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      restorePointCollectionName,
      vmRestorePointName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByRestorePointOperationSpec
    ) as Promise<DiskRestorePointListByRestorePointResponse>;
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
    options?: coreHttp.OperationOptions
  ): Promise<DiskRestorePointListByRestorePointNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      restorePointCollectionName,
      vmRestorePointName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByRestorePointNextOperationSpec
    ) as Promise<DiskRestorePointListByRestorePointNextResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
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
const listByRestorePointOperationSpec: coreHttp.OperationSpec = {
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
const listByRestorePointNextOperationSpec: coreHttp.OperationSpec = {
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

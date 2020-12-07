import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  DatasetResource,
  DatasetGetDatasetsByWorkspaceResponse,
  DatasetCreateOrUpdateDatasetOptionalParams,
  DatasetCreateOrUpdateDatasetResponse,
  DatasetGetDatasetOptionalParams,
  DatasetGetDatasetResponse,
  ArtifactRenameRequest,
  DatasetGetDatasetsByWorkspaceNextResponse
} from "../models";

/**
 * Class representing a Dataset.
 */
export class Dataset {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class Dataset class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * Lists datasets.
   * @param options The options parameters.
   */
  public listDatasetsByWorkspace(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<DatasetResource> {
    const iter = this.getDatasetsByWorkspacePagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getDatasetsByWorkspacePagingPage(options);
      }
    };
  }

  private async *getDatasetsByWorkspacePagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<DatasetResource[]> {
    let result = await this._getDatasetsByWorkspace(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getDatasetsByWorkspaceNext(
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getDatasetsByWorkspacePagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<DatasetResource> {
    for await (const page of this.getDatasetsByWorkspacePagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists datasets.
   * @param options The options parameters.
   */
  private _getDatasetsByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<DatasetGetDatasetsByWorkspaceResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getDatasetsByWorkspaceOperationSpec
    ) as Promise<DatasetGetDatasetsByWorkspaceResponse>;
  }

  /**
   * Creates or updates a dataset.
   * @param datasetName The dataset name.
   * @param dataset Dataset resource definition.
   * @param options The options parameters.
   */
  async createOrUpdateDataset(
    datasetName: string,
    dataset: DatasetResource,
    options?: DatasetCreateOrUpdateDatasetOptionalParams
  ): Promise<LROPoller<DatasetCreateOrUpdateDatasetResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      datasetName,
      dataset,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        DatasetCreateOrUpdateDatasetResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateDatasetOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateDatasetOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets a dataset.
   * @param datasetName The dataset name.
   * @param options The options parameters.
   */
  getDataset(
    datasetName: string,
    options?: DatasetGetDatasetOptionalParams
  ): Promise<DatasetGetDatasetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      datasetName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getDatasetOperationSpec
    ) as Promise<DatasetGetDatasetResponse>;
  }

  /**
   * Deletes a dataset.
   * @param datasetName The dataset name.
   * @param options The options parameters.
   */
  async deleteDataset(
    datasetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      datasetName,
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
      deleteDatasetOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteDatasetOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Renames a dataset.
   * @param datasetName The dataset name.
   * @param request proposed new name.
   * @param options The options parameters.
   */
  async renameDataset(
    datasetName: string,
    request: ArtifactRenameRequest,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      datasetName,
      request,
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
      renameDatasetOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: renameDatasetOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * GetDatasetsByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the GetDatasetsByWorkspace method.
   * @param options The options parameters.
   */
  private _getDatasetsByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<DatasetGetDatasetsByWorkspaceNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getDatasetsByWorkspaceNextOperationSpec
    ) as Promise<DatasetGetDatasetsByWorkspaceNextResponse>;
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

const getDatasetsByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/datasets",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DatasetListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateDatasetOperationSpec: coreHttp.OperationSpec = {
  path: "/datasets/{datasetName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DatasetResource
    },
    201: {
      bodyMapper: Mappers.DatasetResource
    },
    202: {
      bodyMapper: Mappers.DatasetResource
    },
    204: {
      bodyMapper: Mappers.DatasetResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.dataset,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.datasetName],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.ifMatch
  ],
  mediaType: "json",
  serializer
};
const getDatasetOperationSpec: coreHttp.OperationSpec = {
  path: "/datasets/{datasetName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DatasetResource
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.datasetName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deleteDatasetOperationSpec: coreHttp.OperationSpec = {
  path: "/datasets/{datasetName}",
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
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.datasetName],
  headerParameters: [Parameters.accept],
  serializer
};
const renameDatasetOperationSpec: coreHttp.OperationSpec = {
  path: "/datasets/{datasetName}/rename",
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
  requestBody: Parameters.request,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.datasetName],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getDatasetsByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DatasetListResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};

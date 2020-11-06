import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import {
  DatasetGetDatasetsByWorkspaceResponse,
  DatasetResource,
  DatasetCreateOrUpdateDatasetOptionalParams,
  DatasetCreateOrUpdateDatasetResponse,
  DatasetGetDatasetOptionalParams,
  DatasetGetDatasetResponse,
  DatasetGetDatasetsByWorkspaceNextResponse
} from "../models";

/**
 * Class representing a Dataset.
 */
export class Dataset {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class Dataset class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * Lists datasets.
   * @param options The options parameters.
   */
  getDatasetsByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<DatasetGetDatasetsByWorkspaceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getDatasetsByWorkspaceOperationSpec
    ) as Promise<DatasetGetDatasetsByWorkspaceResponse>;
  }

  /**
   * Creates or updates a dataset.
   * @param datasetName The dataset name.
   * @param dataset Dataset resource definition.
   * @param options The options parameters.
   */
  createOrUpdateDataset(
    datasetName: string,
    dataset: DatasetResource,
    options?: DatasetCreateOrUpdateDatasetOptionalParams
  ): Promise<DatasetCreateOrUpdateDatasetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { datasetName, dataset, options: operationOptions },
      createOrUpdateDatasetOperationSpec
    ) as Promise<DatasetCreateOrUpdateDatasetResponse>;
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
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { datasetName, options: operationOptions },
      getDatasetOperationSpec
    ) as Promise<DatasetGetDatasetResponse>;
  }

  /**
   * Deletes a dataset.
   * @param datasetName The dataset name.
   * @param options The options parameters.
   */
  deleteDataset(
    datasetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { datasetName, options: operationOptions },
      deleteDatasetOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * GetDatasetsByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the GetDatasetsByWorkspace method.
   * @param options The options parameters.
   */
  getDatasetsByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<DatasetGetDatasetsByWorkspaceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      getDatasetsByWorkspaceNextOperationSpec
    ) as Promise<DatasetGetDatasetsByWorkspaceNextResponse>;
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
    202: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.dataset,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.datasetName],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept1,
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

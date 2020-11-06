import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import {
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceResponse,
  SparkJobDefinitionResource,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitionOptionalParams,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse,
  SparkJobDefinitionGetSparkJobDefinitionOptionalParams,
  SparkJobDefinitionGetSparkJobDefinitionResponse,
  SparkJobDefinitionExecuteSparkJobDefinitionResponse,
  SparkJobDefinitionDebugSparkJobDefinitionResponse,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextResponse
} from "../models";

/**
 * Class representing a SparkJobDefinition.
 */
export class SparkJobDefinition {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class SparkJobDefinition class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * Lists spark job definitions.
   * @param options The options parameters.
   */
  getSparkJobDefinitionsByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getSparkJobDefinitionsByWorkspaceOperationSpec
    ) as Promise<SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceResponse>;
  }

  /**
   * Creates or updates a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param sparkJobDefinition Spark Job Definition resource definition.
   * @param options The options parameters.
   */
  createOrUpdateSparkJobDefinition(
    sparkJobDefinitionName: string,
    sparkJobDefinition: SparkJobDefinitionResource,
    options?: SparkJobDefinitionCreateOrUpdateSparkJobDefinitionOptionalParams
  ): Promise<SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sparkJobDefinitionName, sparkJobDefinition, options: operationOptions },
      createOrUpdateSparkJobDefinitionOperationSpec
    ) as Promise<SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse>;
  }

  /**
   * Gets a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  getSparkJobDefinition(
    sparkJobDefinitionName: string,
    options?: SparkJobDefinitionGetSparkJobDefinitionOptionalParams
  ): Promise<SparkJobDefinitionGetSparkJobDefinitionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sparkJobDefinitionName, options: operationOptions },
      getSparkJobDefinitionOperationSpec
    ) as Promise<SparkJobDefinitionGetSparkJobDefinitionResponse>;
  }

  /**
   * Deletes a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  deleteSparkJobDefinition(
    sparkJobDefinitionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sparkJobDefinitionName, options: operationOptions },
      deleteSparkJobDefinitionOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Executes the spark job definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  executeSparkJobDefinition(
    sparkJobDefinitionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SparkJobDefinitionExecuteSparkJobDefinitionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sparkJobDefinitionName, options: operationOptions },
      executeSparkJobDefinitionOperationSpec
    ) as Promise<SparkJobDefinitionExecuteSparkJobDefinitionResponse>;
  }

  /**
   * Debug the spark job definition.
   * @param sparkJobDefinitionAzureResource Spark Job Definition resource definition.
   * @param options The options parameters.
   */
  debugSparkJobDefinition(
    sparkJobDefinitionAzureResource: SparkJobDefinitionResource,
    options?: coreHttp.OperationOptions
  ): Promise<SparkJobDefinitionDebugSparkJobDefinitionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sparkJobDefinitionAzureResource, options: operationOptions },
      debugSparkJobDefinitionOperationSpec
    ) as Promise<SparkJobDefinitionDebugSparkJobDefinitionResponse>;
  }

  /**
   * GetSparkJobDefinitionsByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the
   *                 GetSparkJobDefinitionsByWorkspace method.
   * @param options The options parameters.
   */
  getSparkJobDefinitionsByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      getSparkJobDefinitionsByWorkspaceNextOperationSpec
    ) as Promise<
      SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextResponse
    >;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getSparkJobDefinitionsByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/sparkJobDefinitions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkJobDefinitionsListResponse
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
const createOrUpdateSparkJobDefinitionOperationSpec: coreHttp.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SparkJobDefinitionResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.sparkJobDefinition,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept1,
    Parameters.ifMatch
  ],
  mediaType: "json",
  serializer
};
const getSparkJobDefinitionOperationSpec: coreHttp.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkJobDefinitionResource
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deleteSparkJobDefinitionOperationSpec: coreHttp.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [Parameters.accept],
  serializer
};
const executeSparkJobDefinitionOperationSpec: coreHttp.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}/execute",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SparkBatchJob
    },
    202: {
      bodyMapper: Mappers.SparkBatchJob
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [Parameters.accept],
  serializer
};
const debugSparkJobDefinitionOperationSpec: coreHttp.OperationSpec = {
  path: "/debugSparkJobDefinition",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SparkBatchJob
    },
    202: {
      bodyMapper: Mappers.SparkBatchJob
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.sparkJobDefinitionAzureResource,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const getSparkJobDefinitionsByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkJobDefinitionsListResponse
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

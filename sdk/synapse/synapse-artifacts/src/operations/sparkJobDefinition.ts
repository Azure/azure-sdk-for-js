import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  SparkJobDefinitionResource,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceResponse,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitionOptionalParams,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse,
  SparkJobDefinitionGetSparkJobDefinitionOptionalParams,
  SparkJobDefinitionGetSparkJobDefinitionResponse,
  SparkJobDefinitionExecuteSparkJobDefinitionResponse,
  ArtifactRenameRequest,
  SparkJobDefinitionDebugSparkJobDefinitionResponse,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextResponse
} from "../models";

/**
 * Class representing a SparkJobDefinition.
 */
export class SparkJobDefinition {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class SparkJobDefinition class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * Lists spark job definitions.
   * @param options The options parameters.
   */
  public listSparkJobDefinitionsByWorkspace(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<SparkJobDefinitionResource> {
    const iter = this.getSparkJobDefinitionsByWorkspacePagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getSparkJobDefinitionsByWorkspacePagingPage(options);
      }
    };
  }

  private async *getSparkJobDefinitionsByWorkspacePagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<SparkJobDefinitionResource[]> {
    let result = await this._getSparkJobDefinitionsByWorkspace(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getSparkJobDefinitionsByWorkspaceNext(
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getSparkJobDefinitionsByWorkspacePagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<SparkJobDefinitionResource> {
    for await (const page of this.getSparkJobDefinitionsByWorkspacePagingPage(
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists spark job definitions.
   * @param options The options parameters.
   */
  private _getSparkJobDefinitionsByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
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
    const operationArguments: coreHttp.OperationArguments = {
      sparkJobDefinitionName,
      sparkJobDefinition,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
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
    const operationArguments: coreHttp.OperationArguments = {
      sparkJobDefinitionName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
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
    const operationArguments: coreHttp.OperationArguments = {
      sparkJobDefinitionName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      deleteSparkJobDefinitionOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Executes the spark job definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  async executeSparkJobDefinition(
    sparkJobDefinitionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<SparkJobDefinitionExecuteSparkJobDefinitionResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      sparkJobDefinitionName,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        SparkJobDefinitionExecuteSparkJobDefinitionResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      executeSparkJobDefinitionOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: executeSparkJobDefinitionOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Renames a sparkJobDefinition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param request proposed new name.
   * @param options The options parameters.
   */
  async renameSparkJobDefinition(
    sparkJobDefinitionName: string,
    request: ArtifactRenameRequest,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      sparkJobDefinitionName,
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
      renameSparkJobDefinitionOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: renameSparkJobDefinitionOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Debug the spark job definition.
   * @param sparkJobDefinitionAzureResource Spark Job Definition resource definition.
   * @param options The options parameters.
   */
  async debugSparkJobDefinition(
    sparkJobDefinitionAzureResource: SparkJobDefinitionResource,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<SparkJobDefinitionDebugSparkJobDefinitionResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      sparkJobDefinitionAzureResource,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        SparkJobDefinitionDebugSparkJobDefinitionResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      debugSparkJobDefinitionOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: debugSparkJobDefinitionOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * GetSparkJobDefinitionsByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the
   *                 GetSparkJobDefinitionsByWorkspace method.
   * @param options The options parameters.
   */
  private _getSparkJobDefinitionsByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getSparkJobDefinitionsByWorkspaceNextOperationSpec
    ) as Promise<
      SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextResponse
    >;
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
    Parameters.accept,
    Parameters.contentType,
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
    201: {
      bodyMapper: Mappers.SparkBatchJob
    },
    202: {
      bodyMapper: Mappers.SparkBatchJob
    },
    204: {
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
const renameSparkJobDefinitionOperationSpec: coreHttp.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}/rename",
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
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const debugSparkJobDefinitionOperationSpec: coreHttp.OperationSpec = {
  path: "/debugSparkJobDefinition",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SparkBatchJob
    },
    201: {
      bodyMapper: Mappers.SparkBatchJob
    },
    202: {
      bodyMapper: Mappers.SparkBatchJob
    },
    204: {
      bodyMapper: Mappers.SparkBatchJob
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.sparkJobDefinitionAzureResource,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept, Parameters.contentType],
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

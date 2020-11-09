import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  PipelineGetPipelinesByWorkspaceResponse,
  PipelineResource,
  PipelineCreateOrUpdatePipelineOptionalParams,
  PipelineCreateOrUpdatePipelineResponse,
  PipelineGetPipelineOptionalParams,
  PipelineGetPipelineResponse,
  PipelineCreatePipelineRunOptionalParams,
  PipelineCreatePipelineRunResponse,
  PipelineGetPipelinesByWorkspaceNextResponse
} from "../models";

/**
 * Class representing a Pipeline.
 */
export class Pipeline {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class Pipeline class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * Lists pipelines.
   * @param options The options parameters.
   */
  getPipelinesByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<PipelineGetPipelinesByWorkspaceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getPipelinesByWorkspaceOperationSpec
    ) as Promise<PipelineGetPipelinesByWorkspaceResponse>;
  }

  /**
   * Creates or updates a pipeline.
   * @param pipelineName The pipeline name.
   * @param pipeline Pipeline resource definition.
   * @param options The options parameters.
   */
  async createOrUpdatePipeline(
    pipelineName: string,
    pipeline: PipelineResource,
    options?: PipelineCreateOrUpdatePipelineOptionalParams
  ): Promise<LROPoller<PipelineCreateOrUpdatePipelineResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      pipelineName,
      pipeline,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        PipelineCreateOrUpdatePipelineResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      createOrUpdatePipelineOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createOrUpdatePipelineOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets a pipeline.
   * @param pipelineName The pipeline name.
   * @param options The options parameters.
   */
  getPipeline(
    pipelineName: string,
    options?: PipelineGetPipelineOptionalParams
  ): Promise<PipelineGetPipelineResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { pipelineName, options: operationOptions },
      getPipelineOperationSpec
    ) as Promise<PipelineGetPipelineResponse>;
  }

  /**
   * Deletes a pipeline.
   * @param pipelineName The pipeline name.
   * @param options The options parameters.
   */
  async deletePipeline(
    pipelineName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      pipelineName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      deletePipelineOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: deletePipelineOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Creates a run of a pipeline.
   * @param pipelineName The pipeline name.
   * @param options The options parameters.
   */
  createPipelineRun(
    pipelineName: string,
    options?: PipelineCreatePipelineRunOptionalParams
  ): Promise<PipelineCreatePipelineRunResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { pipelineName, options: operationOptions },
      createPipelineRunOperationSpec
    ) as Promise<PipelineCreatePipelineRunResponse>;
  }

  /**
   * GetPipelinesByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the GetPipelinesByWorkspace
   *                 method.
   * @param options The options parameters.
   */
  getPipelinesByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<PipelineGetPipelinesByWorkspaceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      getPipelinesByWorkspaceNextOperationSpec
    ) as Promise<PipelineGetPipelinesByWorkspaceNextResponse>;
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

const getPipelinesByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/pipelines",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PipelineListResponse
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
const createOrUpdatePipelineOperationSpec: coreHttp.OperationSpec = {
  path: "/pipelines/{pipelineName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.PipelineResource
    },
    201: {
      bodyMapper: Mappers.PipelineResource
    },
    202: {
      bodyMapper: Mappers.PipelineResource
    },
    204: {
      bodyMapper: Mappers.PipelineResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.pipeline,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.pipelineName],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept1,
    Parameters.ifMatch
  ],
  mediaType: "json",
  serializer
};
const getPipelineOperationSpec: coreHttp.OperationSpec = {
  path: "/pipelines/{pipelineName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PipelineResource
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.pipelineName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deletePipelineOperationSpec: coreHttp.OperationSpec = {
  path: "/pipelines/{pipelineName}",
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
  urlParameters: [Parameters.endpoint, Parameters.pipelineName],
  headerParameters: [Parameters.accept],
  serializer
};
const createPipelineRunOperationSpec: coreHttp.OperationSpec = {
  path: "/pipelines/{pipelineName}/createRun",
  httpMethod: "POST",
  responses: {
    202: {
      bodyMapper: Mappers.CreateRunResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [
    Parameters.apiVersion,
    Parameters.referencePipelineRunId,
    Parameters.isRecovery,
    Parameters.startActivityName
  ],
  urlParameters: [Parameters.endpoint, Parameters.pipelineName],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const getPipelinesByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PipelineListResponse
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

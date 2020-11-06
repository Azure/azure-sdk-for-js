import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
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
  createOrUpdatePipeline(
    pipelineName: string,
    pipeline: PipelineResource,
    options?: PipelineCreateOrUpdatePipelineOptionalParams
  ): Promise<PipelineCreateOrUpdatePipelineResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { pipelineName, pipeline, options: operationOptions },
      createOrUpdatePipelineOperationSpec
    ) as Promise<PipelineCreateOrUpdatePipelineResponse>;
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
  deletePipeline(
    pipelineName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { pipelineName, options: operationOptions },
      deletePipelineOperationSpec
    ) as Promise<coreHttp.RestResponse>;
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
    202: {},
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

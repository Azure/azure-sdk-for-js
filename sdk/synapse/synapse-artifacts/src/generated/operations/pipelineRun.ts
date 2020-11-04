import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import {
  RunFilterParameters,
  PipelineRunQueryPipelineRunsByWorkspaceResponse,
  PipelineRunGetPipelineRunResponse,
  PipelineRunQueryActivityRunsResponse,
  PipelineRunCancelPipelineRunOptionalParams
} from "../models";

/**
 * Class representing a PipelineRun.
 */
export class PipelineRun {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class PipelineRun class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * Query pipeline runs in the workspace based on input filter conditions.
   * @param filterParameters Parameters to filter the pipeline run.
   * @param options The options parameters.
   */
  queryPipelineRunsByWorkspace(
    filterParameters: RunFilterParameters,
    options?: coreHttp.OperationOptions
  ): Promise<PipelineRunQueryPipelineRunsByWorkspaceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { filterParameters, options: operationOptions },
      queryPipelineRunsByWorkspaceOperationSpec
    ) as Promise<PipelineRunQueryPipelineRunsByWorkspaceResponse>;
  }

  /**
   * Get a pipeline run by its run ID.
   * @param runId The pipeline run identifier.
   * @param options The options parameters.
   */
  getPipelineRun(
    runId: string,
    options?: coreHttp.OperationOptions
  ): Promise<PipelineRunGetPipelineRunResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { runId, options: operationOptions },
      getPipelineRunOperationSpec
    ) as Promise<PipelineRunGetPipelineRunResponse>;
  }

  /**
   * Query activity runs based on input filter conditions.
   * @param pipelineName The pipeline name.
   * @param runId The pipeline run identifier.
   * @param filterParameters Parameters to filter the activity runs.
   * @param options The options parameters.
   */
  queryActivityRuns(
    pipelineName: string,
    runId: string,
    filterParameters: RunFilterParameters,
    options?: coreHttp.OperationOptions
  ): Promise<PipelineRunQueryActivityRunsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { pipelineName, runId, filterParameters, options: operationOptions },
      queryActivityRunsOperationSpec
    ) as Promise<PipelineRunQueryActivityRunsResponse>;
  }

  /**
   * Cancel a pipeline run by its run ID.
   * @param runId The pipeline run identifier.
   * @param options The options parameters.
   */
  cancelPipelineRun(
    runId: string,
    options?: PipelineRunCancelPipelineRunOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { runId, options: operationOptions },
      cancelPipelineRunOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const queryPipelineRunsByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/queryPipelineRuns",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.PipelineRunsQueryResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.filterParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const getPipelineRunOperationSpec: coreHttp.OperationSpec = {
  path: "/pipelineruns/{runId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PipelineRun
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.runId],
  headerParameters: [Parameters.accept],
  serializer
};
const queryActivityRunsOperationSpec: coreHttp.OperationSpec = {
  path: "/pipelines/{pipelineName}/pipelineruns/{runId}/queryActivityruns",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ActivityRunsQueryResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.filterParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.endpoint,
    Parameters.pipelineName,
    Parameters.runId
  ],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const cancelPipelineRunOperationSpec: coreHttp.OperationSpec = {
  path: "/pipelineruns/{runId}/cancel",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.isRecursive],
  urlParameters: [Parameters.endpoint, Parameters.runId],
  headerParameters: [Parameters.accept],
  serializer
};

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  operationOptionsToRequestOptionsBase,
  OperationOptions,
  RestResponse
} from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AuthenticationClient } from "./AuthenticationClient";
import { LROPoller } from "./generated/lro";
import { createSpan, getCanonicalCode } from "./utils/tracing";
import {
  ListPageSettings,
  PipelineResource,
  PipelineCreateOrUpdatePipelineOptionalParams,
  PipelineCreateOrUpdatePipelineResponse,
  PipelineGetPipelineOptionalParams,
  PipelineGetPipelineResponse,
  PipelineRunCancelPipelineRunOptionalParams,
  RunFilterParameters,
  PipelineRunQueryPipelineRunsByWorkspaceResponse,
  PipelineRunGetPipelineRunResponse
} from "./models";

export class PipelineClient extends AuthenticationClient {
  /**
   * Gets a pipeline.
   * @param pipelineName The pipeline name.
   * @param options The options parameters.
   */

  public async get(
    pipelineName: string,
    options: PipelineGetPipelineOptionalParams = {}
  ): Promise<PipelineGetPipelineResponse> {
    const { span, updatedOptions } = createSpan("Pipeline-Get", options);

    try {
      const response = await this.client.pipeline.getPipeline(
        pipelineName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  private async *listPipelinesPage(
    continuationState: ListPageSettings,
    options: OperationOptions = {}
  ): AsyncIterableIterator<PipelineResource[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.pipeline.getPipelinesByWorkspace(requestOptions);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.pipeline.getPipelinesByWorkspaceNext(
        continuationState.continuationToken,
        requestOptions
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      } else {
        break;
      }
    }
  }

  private async *listPipelinesAll(
    options: OperationOptions = {}
  ): AsyncIterableIterator<PipelineResource> {
    for await (const page of this.listPipelinesPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Lists pipelines.
   * @param options The options parameters.
   */

  public list(options: OperationOptions = {}): PagedAsyncIterableIterator<PipelineResource> {
    const { span, updatedOptions } = createSpan("Pipeline-List", options);
    try {
      const iter = this.listPipelinesAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listPipelinesPage(settings, updatedOptions);
        }
      };
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates or updates a pipeline.
   * @param pipelineName The pipeline name.
   * @param pipeline Pipeline resource definition.
   * @param options The options parameters.
   */

  public async beginUpsert(
    pipelineName: string,
    pipeline: PipelineResource,
    options: PipelineCreateOrUpdatePipelineOptionalParams = {}
  ): Promise<LROPoller<PipelineCreateOrUpdatePipelineResponse>> {
    const { span, updatedOptions } = createSpan("Pipeline-BeginUpsert", options);

    try {
      const response = await this.client.pipeline.createOrUpdatePipeline(
        pipelineName,
        pipeline,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a pipeline.
   * @param pipelineName The pipeline name.
   * @param options The options parameters.
   */

  public async beginDelete(
    pipelineName: string,
    options: OperationOptions = {}
  ): Promise<LROPoller<RestResponse>> {
    const { span, updatedOptions } = createSpan("Pipeline-BeginDelete", options);

    try {
      const response = await this.client.pipeline.deletePipeline(
        pipelineName,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Query pipeline runs in the workspace based on input filter conditions.
   * @param filterParameters Parameters to filter the pipeline run.
   * @param options The options parameters.
   */

  public async queryPipelineRuns(
    filterParameters: RunFilterParameters,
    options: OperationOptions = {}
  ): Promise<PipelineRunQueryPipelineRunsByWorkspaceResponse> {
    const { span, updatedOptions } = createSpan("Pipeline-QueryPipelineRuns", options);

    try {
      const response = await this.client.pipelineRun.queryPipelineRunsByWorkspace(
        filterParameters,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Get a pipeline run by its run ID.
   * @param runId The pipeline run identifier.
   * @param options The options parameters.
   */

  public async getPipelineRun(
    runId: string,
    options: OperationOptions = {}
  ): Promise<PipelineRunGetPipelineRunResponse> {
    const { span, updatedOptions } = createSpan("Pipeline-GetPipelineRun", options);

    try {
      const response = await this.client.pipelineRun.getPipelineRun(
        runId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Query activity runs based on input filter conditions.
   * @param pipelineName The pipeline name.
   * @param runId The pipeline run identifier.
   * @param filterParameters Parameters to filter the activity runs.
   * @param options The options parameters.
   */

  public async queryActivityRuns(
    pipelineName: string,
    runId: string,
    filterParameters: RunFilterParameters,
    options: OperationOptions = {}
  ): Promise<PipelineRunGetPipelineRunResponse> {
    const { span, updatedOptions } = createSpan("Pipeline-QueryActivityRuns", options);

    try {
      const response = await this.client.pipelineRun.queryActivityRuns(
        pipelineName,
        runId,
        filterParameters,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Cancel a pipeline run by its run ID.
   * @param runId The pipeline run identifier.
   * @param options The options parameters.
   */
  public async cancelPipelineRun(
    runId: string,
    options: PipelineRunCancelPipelineRunOptionalParams = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("Pipeline-CancelPipelineRun", options);

    try {
      const response = await this.client.pipelineRun.cancelPipelineRun(
        runId,
        operationOptionsToRequestOptionsBase(updatedOptions)
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

import {
    TokenCredential,
  } from "@azure/core-http";
import { ArtifactsClient } from "./ArtifactsClient";
import { SynapseArtifacts } from './generated';
import { PipelineClientOptions } from "./models"
import {
PipelineCreateOrUpdatePipelineOptionalParams,
PipelineCreateOrUpdatePipelineResponse,
PipelineGetPipelineOptionalParams,
PipelineGetPipelineResponse,
} from "./generated/models";

import { LROPoller } from "./generated/lro";
import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/api";
import * as coreHttp from "@azure/core-http";
import {
    PipelineResource,
} from "./models";

import { ListPageSettings } from "./models";
import { PagedAsyncIterableIterator } from "@azure/core-paging";


export class PipelineClient {
    /**
     * The base URL to the workspace
     */
    public readonly workspaceEndpoint: string;
  
    /**
     * @internal
     * @ignore
     * A reference to the auto-generated synapse accesscontrol HTTP client.
     */
    private readonly client: SynapseArtifacts;
  
    constructor(
      workspaceEndpoint: string,
      credential: TokenCredential,
      pipelineOptions: PipelineClientOptions = {}
    ) {
      this.workspaceEndpoint = workspaceEndpoint;
      this.client = new ArtifactsClient(workspaceEndpoint, credential, pipelineOptions).getArtifactsClient();
    }

    private async *listPipelinesPage(
        continuationState: ListPageSettings,
        options: coreHttp.OperationOptions = {}
      ): AsyncIterableIterator<PipelineResource[]> {
        const requestOptions = operationOptionsToRequestOptionsBase(options);
        if (!continuationState.continuationToken) {
          const currentSetResponse = await this.client.pipeline.getPipelinesByWorkspace(
            requestOptions
          );
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
        options: coreHttp.OperationOptions = {}
      ): AsyncIterableIterator<PipelineResource> {
        for await (const page of this.listPipelinesPage({}, options)) {
          yield* page;
        }
      }
    
      public list(
        options: coreHttp.OperationOptions = {}
      ): PagedAsyncIterableIterator<PipelineResource> {
        const { span, updatedOptions } = createSpan("Synapse-ListDataSets", options);
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
            code: CanonicalCode.UNKNOWN,
            message: e.message
          });
          throw e;
        } finally {
          span.end();
        }
      }

    public async beginUpsert(
        pipelineName: string,
        pipeline: PipelineResource,
        options: PipelineCreateOrUpdatePipelineOptionalParams = {}
      ): Promise<LROPoller<PipelineCreateOrUpdatePipelineResponse>> {
        const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);
    
        try {
          const response = await this.client.pipeline.createOrUpdatePipeline(
            pipelineName,
            pipeline,
            operationOptionsToRequestOptionsBase(updatedOptions)
          );
          return response;
        } catch (e) {
          span.setStatus({
            code: CanonicalCode.UNKNOWN,
            message: e.message
          });
          throw e;
        } finally {
          span.end();
        }
      }
    
      public async beginDelete(
        pipelineName: string,
        options: coreHttp.OperationOptions = {}
      ): Promise<LROPoller<coreHttp.RestResponse>> {
        const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);
    
        try {
          const response = await this.client.pipeline.deletePipeline(
            pipelineName,
            operationOptionsToRequestOptionsBase(updatedOptions)
          );
          return response;
        } catch (e) {
          span.setStatus({
            code: CanonicalCode.UNKNOWN,
            message: e.message
          });
          throw e;
        } finally {
          span.end();
        }
      }
    
      public async get(
        pipelineName: string,
        options: PipelineGetPipelineOptionalParams = {}
      ): Promise<PipelineGetPipelineResponse> {
        const { span, updatedOptions } = createSpan("Synapse-getDataFlow", options);
    
        try {
          const response = await this.client.pipeline.getPipeline(
            pipelineName,
            operationOptionsToRequestOptionsBase(updatedOptions)
          );
          return response;
        } catch (e) {
          span.setStatus({
            code: CanonicalCode.UNKNOWN,
            message: e.message
          });
          throw e;
        } finally {
          span.end();
        }
      }

}
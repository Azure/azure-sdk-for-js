import { ArtifactsClient } from "./ArtifactsClient";
import {
  DataFlowResource,
  DataFlowCreateOrUpdateDataFlowOptionalParams,
  DataFlowCreateOrUpdateDataFlowResponse,
  DataFlowGetDataFlowOptionalParams,
  DataFlowGetDataFlowResponse
} from "./generated/models";

import { LROPoller } from "./generated/lro";
import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { createSpan } from "./tracing";
import { CanonicalCode } from "@opentelemetry/api";
import * as coreHttp from "@azure/core-http";
import { SqlScriptResource } from "./models";

import { ListPageSettings } from "./models";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

export class DataFlowClient extends ArtifactsClient {
  /**
   * The base URL to the workspace
   */
  // public readonly workspaceEndpoint: string;

  // /**
  //  * @internal
  //  * @ignore
  //  * A reference to the auto-generated synapse accesscontrol HTTP client.
  //  */
  // private readonly client: SynapseArtifacts;

  // constructor(
  //   workspaceEndpoint: string,
  //   credential: TokenCredential,
  //   pipelineOptions: DataflowClientOptions = {}
  // ) {
  //   this.workspaceEndpoint = workspaceEndpoint;
  //   this.client = new ArtifactsClient(workspaceEndpoint, credential, pipelineOptions).getArtifactsClient();
  // }

  private async *listDataFlowsPage(
    continuationState: ListPageSettings,
    options: coreHttp.OperationOptions = {}
  ): AsyncIterableIterator<SqlScriptResource[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.sqlScript.getSqlScriptsByWorkspace(
        requestOptions
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.sqlScript.getSqlScriptsByWorkspaceNext(
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

  private async *listDataFlowsAll(
    options: coreHttp.OperationOptions = {}
  ): AsyncIterableIterator<SqlScriptResource> {
    for await (const page of this.listDataFlowsPage({}, options)) {
      yield* page;
    }
  }

  public list(
    options: coreHttp.OperationOptions = {}
  ): PagedAsyncIterableIterator<SqlScriptResource> {
    const { span, updatedOptions } = createSpan("Synapse-ListSqlScripts", options);
    try {
      const iter = this.listDataFlowsAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listDataFlowsPage(settings, updatedOptions);
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
    dataFlowName: string,
    dataFlow: DataFlowResource,
    options: DataFlowCreateOrUpdateDataFlowOptionalParams = {}
  ): Promise<LROPoller<DataFlowCreateOrUpdateDataFlowResponse>> {
    const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);

    try {
      const response = await this.client.dataFlow.createOrUpdateDataFlow(
        dataFlowName,
        dataFlow,
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
    dataFlowName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);

    try {
      const response = await this.client.dataFlow.deleteDataFlow(
        dataFlowName,
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
    dataFlowName: string,
    options: DataFlowGetDataFlowOptionalParams = {}
  ): Promise<DataFlowGetDataFlowResponse> {
    const { span, updatedOptions } = createSpan("Synapse-getDataFlow", options);

    try {
      const response = await this.client.dataFlow.getDataFlow(
        dataFlowName,
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

  //   public async beginCreateDebugSession(
  //     request: CreateDataFlowDebugSessionRequest,
  //     options: coreHttp.OperationOptions = {}
  //   ): Promise<LROPoller<DataFlowDebugSessionCreateDataFlowDebugSessionResponse>> {
  //     const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);

  //     try {
  //       const response = await this.client.dataFlowDebugSession.createDataFlowDebugSession(
  //         request,
  //         operationOptionsToRequestOptionsBase(updatedOptions)
  //       );
  //       return response;
  //     } catch (e) {
  //       span.setStatus({
  //         code: CanonicalCode.UNKNOWN,
  //         message: e.message
  //       });
  //       throw e;
  //     } finally {
  //       span.end();
  //     }
  //   }
  //   private async *listDataFlowDebugSessionsPage(
  //     continuationState: ListPageSettings,
  //     options: coreHttp.OperationOptions = {}
  //   ): AsyncIterableIterator<SqlScriptResource[]> {
  //     const requestOptions = operationOptionsToRequestOptionsBase(options);
  //     if (!continuationState.continuationToken) {
  //       const currentSetResponse = await this.client.dataFlowDebugSession.queryDataFlowDebugSessionsByWorkspace(
  //         requestOptions
  //       );
  //       continuationState.continuationToken = currentSetResponse.nextLink;
  //       if (currentSetResponse.value) {
  //         yield currentSetResponse.value;
  //       }
  //     }

  //     while (continuationState.continuationToken) {
  //       const currentSetResponse = await this.client.dataFlowDebugSession.queryDataFlowDebugSessionsByWorkspaceNext(
  //         continuationState.continuationToken,
  //         requestOptions
  //       );
  //       continuationState.continuationToken = currentSetResponse.nextLink;
  //       if (currentSetResponse.value) {
  //         yield currentSetResponse.value;
  //       } else {
  //         break;
  //       }
  //     }
  //   }

  //   private async *listDataFlowDebugSessionsAll(
  //     options: coreHttp.OperationOptions = {}
  //   ): AsyncIterableIterator<SqlScriptResource> {
  //     for await (const page of this.listDataFlowDebugSessionsPage({}, options)) {
  //       yield* page;
  //     }
  //   }

  //   public listDebugSessions(
  //     options: coreHttp.OperationOptions = {}
  //   ): PagedAsyncIterableIterator<SqlScriptResource> {
  //     const { span, updatedOptions } = createSpan("Synapse-ListSqlScripts", options);
  //     try {
  //       const iter = this.listDataFlowDebugSessionsAll(updatedOptions);
  //       return {
  //         next() {
  //           return iter.next();
  //         },
  //         [Symbol.asyncIterator]() {
  //           return this;
  //         },
  //         byPage: (settings: ListPageSettings = {}) => {
  //           return this.listDataFlowDebugSessionsPage(settings, updatedOptions);
  //         }
  //       };
  //     } catch (e) {
  //       span.setStatus({
  //         code: CanonicalCode.UNKNOWN,
  //         message: e.message
  //       });
  //       throw e;
  //     } finally {
  //       span.end();
  //     }
  //   }
}

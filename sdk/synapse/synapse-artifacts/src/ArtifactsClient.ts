// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint @typescript-eslint/member-ordering: 0 */
/// <reference lib="esnext.asynciterable" />

import {
  TokenCredential,
  createPipelineFromOptions,
  bearerTokenAuthenticationPolicy
} from "@azure/core-http";

import {
  ArtifactsClientOptions,
  TriggerRunQueryTriggerRunsByWorkspaceResponse,
  BigDataPoolsListResponse,
  BigDataPoolsGetResponse,
  IntegrationRuntimesListResponse,
  IntegrationRuntimesGetResponse,
  RunFilterParameters,
  PipelineRunQueryPipelineRunsByWorkspaceResponse,
  PipelineRunGetPipelineRunResponse,
  PipelineRunCancelPipelineRunOptionalParams,
  SqlPoolsListResponse,
  SqlPoolsGetResponse,
  WorkspaceGetResponse,
  SqlScriptResource,
  SqlScriptCreateOrUpdateSqlScriptOptionalParams,
  SqlScriptCreateOrUpdateSqlScriptResponse,
  SqlScriptGetSqlScriptOptionalParams,
  SqlScriptGetSqlScriptResponse
} from "./models";

import { ListPageSettings } from "./models";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { createSpan } from "./tracing";
import { SynapseArtifacts } from "./generated";
import { logger } from "./logger";
import { SDK_VERSION } from "./constants";
import { CanonicalCode } from "@opentelemetry/api";
import * as coreHttp from "@azure/core-http";

export class ArtifactsClient {
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
    pipelineOptions: ArtifactsClientOptions = {}
  ) {
    this.workspaceEndpoint = workspaceEndpoint;

    const libInfo = `azsdk-js-synapse-artifacts/${SDK_VERSION}`;

    const userAgentOptions = pipelineOptions.userAgentOptions;

    pipelineOptions.userAgentOptions = {
      ...pipelineOptions.userAgentOptions,
      userAgentPrefix:
        userAgentOptions && userAgentOptions.userAgentPrefix
          ? `${userAgentOptions.userAgentPrefix} ${libInfo}`
          : libInfo
    };

    const authPolicy = bearerTokenAuthenticationPolicy(
      credential,
      "https://dev.azuresynapse.net/.default"
    );

    const internalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.client = new SynapseArtifacts(credential, workspaceEndpoint, pipeline);
  }

  public async ListBigDataPools(
    options: coreHttp.OperationOptions = {}
  ): Promise<BigDataPoolsListResponse> {
    const { span, updatedOptions } = createSpan("Synapse-ListBigDataPools", options);

    try {
      const response = await this.client.bigDataPools.list(
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

  public async GetBigDataPool(
    bigDataPoolName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<BigDataPoolsGetResponse> {
    const { span, updatedOptions } = createSpan("Synapse-GetBigDataPool", options);

    try {
      const response = await this.client.bigDataPools.get(
        bigDataPoolName,
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

  public async ListIntegrationRuntimes(
    options: coreHttp.OperationOptions = {}
  ): Promise<IntegrationRuntimesListResponse> {
    const { span, updatedOptions } = createSpan("Synapse-ListIntegrationRuntimes", options);

    try {
      const response = await this.client.integrationRuntimes.list(
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

  public async GetIntegrationRuntime(
    bigDataPoolName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<IntegrationRuntimesGetResponse> {
    const { span, updatedOptions } = createSpan("Synapse-GetIntegrationRuntime", options);

    try {
      const response = await this.client.integrationRuntimes.get(
        bigDataPoolName,
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

  public async queryPipelineRunsByWorkspace(
    filterParameters: RunFilterParameters,
    options: coreHttp.OperationOptions = {}
  ): Promise<PipelineRunQueryPipelineRunsByWorkspaceResponse> {
    const { span, updatedOptions } = createSpan("Synapse-QueryPipelineRunsByWorkspace", options);

    try {
      const response = await this.client.pipelineRun.queryPipelineRunsByWorkspace(
        filterParameters,
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

  public async getPipelineRun(
    runId: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<PipelineRunGetPipelineRunResponse> {
    const { span, updatedOptions } = createSpan("Synapse-getPipelineRun", options);

    try {
      const response = await this.client.pipelineRun.getPipelineRun(
        runId,
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

  public async queryActivityRuns(
    pipelineName: string,
    runId: string,
    filterParameters: RunFilterParameters,
    options: coreHttp.OperationOptions = {}
  ): Promise<PipelineRunGetPipelineRunResponse> {
    const { span, updatedOptions } = createSpan("Synapse-queryActivityRuns", options);

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
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async cancelPipelineRun(
    runId: string,
    options: PipelineRunCancelPipelineRunOptionalParams = {}
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan("Synapse-GetPipelineRun", options);

    try {
      const response = await this.client.pipelineRun.cancelPipelineRun(
        runId,
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

  public async ListSqlPools(
    options: coreHttp.OperationOptions = {}
  ): Promise<SqlPoolsListResponse> {
    const { span, updatedOptions } = createSpan("Synapse-ListSqlPools", options);

    try {
      const response = await this.client.sqlPools.list(
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

  public async GetSqlPool(
    sqlPoolName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<SqlPoolsGetResponse> {
    const { span, updatedOptions } = createSpan("Synapse-GetSqlPool", options);

    try {
      const response = await this.client.sqlPools.get(
        sqlPoolName,
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

  public async GetWorkspace(
    options: coreHttp.OperationOptions = {}
  ): Promise<WorkspaceGetResponse> {
    const { span, updatedOptions } = createSpan("Synapse-GetWorkspace", options);

    try {
      const response = await this.client.workspace.get(
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

  private async *listRoleDefinitionsPage(
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

  private async *listSqlScriptsAll(
    options: coreHttp.OperationOptions = {}
  ): AsyncIterableIterator<SqlScriptResource> {
    for await (const page of this.listRoleDefinitionsPage({}, options)) {
      yield* page;
    }
  }

  public listSqlScripts(
    options: coreHttp.OperationOptions = {}
  ): PagedAsyncIterableIterator<SqlScriptResource> {
    const { span, updatedOptions } = createSpan("Synapse-ListSqlScripts", options);
    try {
      const iter = this.listSqlScriptsAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listRoleDefinitionsPage(settings, updatedOptions);
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

  public async createOrUpdateSqlScript(
    sqlScriptName: string,
    sqlScript: SqlScriptResource,
    options: SqlScriptCreateOrUpdateSqlScriptOptionalParams = {}
  ): Promise<SqlScriptCreateOrUpdateSqlScriptResponse> {
    const { span, updatedOptions } = createSpan("Synapse-createOrUpdateSqlScript", options);

    try {
      const response = await this.client.sqlScript.createOrUpdateSqlScript(
        sqlScriptName,
        sqlScript,
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

  public async getSqlScript(
    sqlScriptName: string,
    options: SqlScriptGetSqlScriptOptionalParams = {}
  ): Promise<SqlScriptGetSqlScriptResponse> {
    const { span, updatedOptions } = createSpan("Synapse-getSqlScript", options);

    try {
      const response = await this.client.sqlScript.getSqlScript(
        sqlScriptName,
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

  public async deleteSqlScript(
    sqlScriptName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan("Synapse-deleteSqlScript", options);

    try {
      const response = await this.client.sqlScript.deleteSqlScript(
        sqlScriptName,
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

  public async rerunTriggerInstance(
    triggerName: string,
    runId: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan("Synapse-rerunTriggerInstance", options);

    try {
      const response = await this.client.triggerRun.rerunTriggerInstance(
        triggerName,
        runId,
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

  public async cancelTriggerInstance(
    triggerName: string,
    runId: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan("Synapse-cancelTriggerInstance", options);

    try {
      const response = await this.client.triggerRun.cancelTriggerInstance(
        triggerName,
        runId,
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

  public async queryTriggerRunsByWorkspace(
    filterParameters: RunFilterParameters,
    options: coreHttp.OperationOptions = {}
  ): Promise<TriggerRunQueryTriggerRunsByWorkspaceResponse> {
    const { span, updatedOptions } = createSpan("Synapse-queryTriggerRunsByWorkspace", options);

    try {
      const response = await this.client.triggerRun.queryTriggerRunsByWorkspace(
        filterParameters,
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

import { AuthenticationClient } from "./AuthenticationClient";
import {
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitionOptionalParams,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse,
  SparkJobDefinitionGetSparkJobDefinitionOptionalParams,
  SparkJobDefinitionGetSparkJobDefinitionResponse,
  SparkJobDefinitionExecuteSparkJobDefinitionResponse,
  SparkJobDefinitionDebugSparkJobDefinitionResponse
} from "./generated/models";

import { LROPoller } from "./generated/lro";
import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { createSpan } from "./utils/tracing";
import { CanonicalCode } from "@opentelemetry/api";
import * as coreHttp from "@azure/core-http";
import { SparkJobDefinitionResource } from "./models";

import { ListPageSettings } from "./models";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

export class SparkJobDefinitionClient extends AuthenticationClient {

    public async get(
        sparkJobDefinitionName: string,
        options: SparkJobDefinitionGetSparkJobDefinitionOptionalParams = {}
        ): Promise<SparkJobDefinitionGetSparkJobDefinitionResponse> {
        const { span, updatedOptions } = createSpan("Synapse-getDataFlow", options);

        try {
            const response = await this.client.sparkJobDefinition.getSparkJobDefinition(
            sparkJobDefinitionName,
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

  private async *listSparkJobDefinitionsPage(
    continuationState: ListPageSettings,
    options: coreHttp.OperationOptions = {}
  ): AsyncIterableIterator<SparkJobDefinitionResource[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.sparkJobDefinition.getSparkJobDefinitionsByWorkspace(requestOptions);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.sparkJobDefinition.getSparkJobDefinitionsByWorkspaceNext(
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

  private async *listSparkJobDefinitionsAll(
    options: coreHttp.OperationOptions = {}
  ): AsyncIterableIterator<SparkJobDefinitionResource> {
    for await (const page of this.listSparkJobDefinitionsPage({}, options)) {
      yield* page;
    }
  }

  public list(
    options: coreHttp.OperationOptions = {}
  ): PagedAsyncIterableIterator<SparkJobDefinitionResource> {
    const { span, updatedOptions } = createSpan("Synapse-ListDataSets", options);
    try {
      const iter = this.listSparkJobDefinitionsAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listSparkJobDefinitionsPage(settings, updatedOptions);
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

  public async upsert(
    sparkJobDefinitionName: string,
    sparkJobDefinition: SparkJobDefinitionResource,
    options: SparkJobDefinitionCreateOrUpdateSparkJobDefinitionOptionalParams = {}
  ): Promise<SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse> {
    const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);

    try {
      const response = await this.client.sparkJobDefinition.createOrUpdateSparkJobDefinition(
        sparkJobDefinitionName,
        sparkJobDefinition,
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

  public async delete(
    sparkJobDefinitionName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);

    try {
      const response = await this.client.sparkJobDefinition.deleteSparkJobDefinition(
        sparkJobDefinitionName,
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

  public async beginExecute(
    sparkJobDefinitionName: string,
    options: coreHttp.OperationOptions = {}
  ): Promise<LROPoller<SparkJobDefinitionExecuteSparkJobDefinitionResponse>> {
    const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);

    try {
      const response = await this.client.sparkJobDefinition.executeSparkJobDefinition(
        sparkJobDefinitionName,
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

  public async beginDebug(
    sparkJobDefinitionAzureResource: SparkJobDefinitionResource,
    options: coreHttp.OperationOptions = {}
  ): Promise<LROPoller<SparkJobDefinitionDebugSparkJobDefinitionResponse>> {
    const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);

    try {
      const response = await this.client.sparkJobDefinition.debugSparkJobDefinition(
        sparkJobDefinitionAzureResource,
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

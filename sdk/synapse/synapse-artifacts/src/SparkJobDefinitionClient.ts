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
  SparkJobDefinitionResource,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitionOptionalParams,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse,
  SparkJobDefinitionGetSparkJobDefinitionOptionalParams,
  SparkJobDefinitionGetSparkJobDefinitionResponse,
  SparkJobDefinitionExecuteSparkJobDefinitionResponse,
  SparkJobDefinitionDebugSparkJobDefinitionResponse
} from "./models";

export class SparkJobDefinitionClient extends AuthenticationClient {

  /**
   * Gets a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  public async get(
    sparkJobDefinitionName: string,
    options: SparkJobDefinitionGetSparkJobDefinitionOptionalParams = {}
  ): Promise<SparkJobDefinitionGetSparkJobDefinitionResponse> {
    const { span, updatedOptions } = createSpan("SparkJobDefinition-Get", options);

    try {
      const response = await this.client.sparkJobDefinition.getSparkJobDefinition(
        sparkJobDefinitionName,
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

  private async *listSparkJobDefinitionsPage(
    continuationState: ListPageSettings,
    options: OperationOptions = {}
  ): AsyncIterableIterator<SparkJobDefinitionResource[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.sparkJobDefinition.getSparkJobDefinitionsByWorkspace(
        requestOptions
      );
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
    options: OperationOptions = {}
  ): AsyncIterableIterator<SparkJobDefinitionResource> {
    for await (const page of this.listSparkJobDefinitionsPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Lists spark job definitions.
   * @param options The options parameters.
   */  
  public list(
    options: OperationOptions = {}
  ): PagedAsyncIterableIterator<SparkJobDefinitionResource> {
    const { span, updatedOptions } = createSpan("SparkJobDefinition-List", options);
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
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates or updates a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param sparkJobDefinition Spark Job Definition resource definition.
   * @param options The options parameters.
   */  
  public async upsert(
    sparkJobDefinitionName: string,
    sparkJobDefinition: SparkJobDefinitionResource,
    options: SparkJobDefinitionCreateOrUpdateSparkJobDefinitionOptionalParams = {}
  ): Promise<SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse> {
    const { span, updatedOptions } = createSpan("SparkJobDefinition-Upsert", options);

    try {
      const response = await this.client.sparkJobDefinition.createOrUpdateSparkJobDefinition(
        sparkJobDefinitionName,
        sparkJobDefinition,
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
   * Deletes a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */  
  public async delete(
    sparkJobDefinitionName: string,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("SparkJobDefinition-Delete", options);

    try {
      const response = await this.client.sparkJobDefinition.deleteSparkJobDefinition(
        sparkJobDefinitionName,
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
   * Executes the spark job definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */  
  public async beginExecute(
    sparkJobDefinitionName: string,
    options: OperationOptions = {}
  ): Promise<LROPoller<SparkJobDefinitionExecuteSparkJobDefinitionResponse>> {
    const { span, updatedOptions } = createSpan("SparkJobDefinition-BeginExecute", options);

    try {
      const response = await this.client.sparkJobDefinition.executeSparkJobDefinition(
        sparkJobDefinitionName,
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
   * Debug the spark job definition.
   * @param sparkJobDefinitionAzureResource Spark Job Definition resource definition.
   * @param options The options parameters.
   */  
  public async beginDebug(
    sparkJobDefinitionAzureResource: SparkJobDefinitionResource,
    options: OperationOptions = {}
  ): Promise<LROPoller<SparkJobDefinitionDebugSparkJobDefinitionResponse>> {
    const { span, updatedOptions } = createSpan("SparkJobDefinition-BeginDebug", options);

    try {
      const response = await this.client.sparkJobDefinition.debugSparkJobDefinition(
        sparkJobDefinitionAzureResource,
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

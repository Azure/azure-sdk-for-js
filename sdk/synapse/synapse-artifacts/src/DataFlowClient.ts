// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { AuthenticationClient } from "./AuthenticationClient";
import { LROPoller } from "./generated/lro";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  operationOptionsToRequestOptionsBase,
  OperationOptions,
  RestResponse
} from "@azure/core-http";
import { createSpan, getCanonicalCode } from "./utils/tracing";
import {
  DataFlowResource,
  UpsertDataFlowOptionalParams,
  UpsertDataFlowResponse,
  GetDataFlowOptionalParams,
  GetDataFlowResponse,
  ListPageSettings
} from "./models";

export class DataFlowClient extends AuthenticationClient {
  /**
   * Gets a data flow.
   * @param dataFlowName The data flow name.
   * @param options The options parameters.
   */

  public async get(
    dataFlowName: string,
    options: GetDataFlowOptionalParams = {}
  ): Promise<GetDataFlowResponse> {
    const { span, updatedOptions } = createSpan("DataFlow-Get", options);

    try {
      const response = await this.client.dataFlow.getDataFlow(
        dataFlowName,
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

  private async *listDataFlowsPage(
    continuationState: ListPageSettings,
    options: OperationOptions = {}
  ): AsyncIterableIterator<DataFlowResource[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.dataFlow.getDataFlowsByWorkspace(requestOptions);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.dataFlow.getDataFlowsByWorkspaceNext(
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
    options: OperationOptions = {}
  ): AsyncIterableIterator<DataFlowResource> {
    for await (const page of this.listDataFlowsPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Lists data flows.
   * @param options The options parameters.
   */
  public list(options: OperationOptions = {}): PagedAsyncIterableIterator<DataFlowResource> {
    const { span, updatedOptions } = createSpan("DataFlow-List", options);
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
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates or updates a data flow.
   * @param dataFlowName The data flow name.
   * @param dataFlow Data flow resource definition.
   * @param options The options parameters.
   */

  public async beginUpsert(
    dataFlowName: string,
    dataFlow: DataFlowResource,
    options: UpsertDataFlowOptionalParams = {}
  ): Promise<LROPoller<UpsertDataFlowResponse>> {
    const { span, updatedOptions } = createSpan("DataFlow-BeginUpsert", options);

    try {
      const response = await this.client.dataFlow.createOrUpdateDataFlow(
        dataFlowName,
        dataFlow,
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
   * Deletes a data flow.
   * @param dataFlowName The data flow name.
   * @param options The options parameters.
   */

  public async beginDelete(
    dataFlowName: string,
    options: OperationOptions = {}
  ): Promise<LROPoller<RestResponse>> {
    const { span, updatedOptions } = createSpan("DataFlow-BeginDelete", options);

    try {
      const response = await this.client.dataFlow.deleteDataFlow(
        dataFlowName,
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

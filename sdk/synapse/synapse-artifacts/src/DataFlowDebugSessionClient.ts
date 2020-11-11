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
import { createSpan, getCanonicalCode } from "./utils/tracing";
import { LROPoller } from "./generated/lro";
import {
  ListPageSettings,
  DataFlowDebugSessionInfo,
  CreateDataFlowDebugSessionRequest,
  CreateDataFlowDebugSessionResponse,
  DeleteDataFlowDebugSessionRequest,
  DataFlowDebugCommandRequest,
  AddDataFlowResponse,
  DataFlowDebugPackage,
  DataFlowDebugSessionExecuteCommandResponse
} from "./models";

export class DataFlowDebugSessionClient extends AuthenticationClient {
  /**
   * Creates a data flow debug session.
   * @param request Data flow debug session definition
   * @param options The options parameters.
   */

  public async beginCreate(
    request: CreateDataFlowDebugSessionRequest,
    options: OperationOptions = {}
  ): Promise<LROPoller<CreateDataFlowDebugSessionResponse>> {
    const { span, updatedOptions } = createSpan("DataFlowDebugSession-BeginCreate", options);

    try {
      const response = await this.client.dataFlowDebugSession.createDataFlowDebugSession(
        request,
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

  private async *listDataFlowDebugSessionsPage(
    continuationState: ListPageSettings,
    options: OperationOptions = {}
  ): AsyncIterableIterator<DataFlowDebugSessionInfo[]> {
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.dataFlowDebugSession.queryDataFlowDebugSessionsByWorkspace(
        requestOptions
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.dataFlowDebugSession.queryDataFlowDebugSessionsByWorkspaceNext(
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

  private async *listDataFlowDebugSessionsAll(
    options: OperationOptions = {}
  ): AsyncIterableIterator<DataFlowDebugSessionInfo> {
    for await (const page of this.listDataFlowDebugSessionsPage({}, options)) {
      yield* page;
    }
  }

  /**
   * Query all active data flow debug sessions.
   * @param options The options parameters.
   */

  public list(
    options: OperationOptions = {}
  ): PagedAsyncIterableIterator<DataFlowDebugSessionInfo> {
    const { span, updatedOptions } = createSpan("DataFlowDebugSession-List", options);
    try {
      const iter = this.listDataFlowDebugSessionsAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listDataFlowDebugSessionsPage(settings, updatedOptions);
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
   * Deletes a data flow debug session.
   * @param request Data flow debug session definition for deletion
   * @param options The options parameters.
   */

  public async delete(
    request: DeleteDataFlowDebugSessionRequest,
    options: OperationOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("DataFlowDebugSession-Delete", options);

    try {
      const response = await this.client.dataFlowDebugSession.deleteDataFlowDebugSession(
        request,
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
   * Add a data flow into debug session.
   * @param request Data flow debug session definition with debug content.
   * @param options The options parameters.
   */

  public async addDataFlow(
    request: DataFlowDebugPackage,
    options: OperationOptions = {}
  ): Promise<AddDataFlowResponse> {
    const { span, updatedOptions } = createSpan("DataFlowDebugSession-AddDataFlow", options);

    try {
      const response = await this.client.dataFlowDebugSession.addDataFlow(
        request,
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
   * Execute a data flow debug command.
   * @param request Data flow debug command definition.
   * @param options The options parameters.
   */

  public async beginExecute(
    request: DataFlowDebugCommandRequest,
    options: OperationOptions = {}
  ): Promise<LROPoller<DataFlowDebugSessionExecuteCommandResponse>> {
    const { span, updatedOptions } = createSpan("DataFlowDebugSession-BeginExecute", options);

    try {
      const response = await this.client.dataFlowDebugSession.executeCommand(
        request,
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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import { operationOptionsToRequestOptionsBase, OperationOptions, RestResponse } from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { AuthenticationClient } from "./AuthenticationClient";
import { createSpan,  getCanonicalCode } from "./utils/tracing";
import { LROPoller } from "./generated/lro";
import { 
    ListPageSettings, 
    DataFlowDebugSessionInfo,
    CreateDataFlowDebugSessionRequest,
    DataFlowDebugSessionCreateDataFlowDebugSessionResponse,
    DeleteDataFlowDebugSessionRequest,
    DataFlowDebugCommandRequest,
    DataFlowDebugSessionAddDataFlowResponse,
    DataFlowDebugPackage
} from "./models";

export class DataFlowDebugSessionClient extends AuthenticationClient {
  public async beginCreate(
    request: CreateDataFlowDebugSessionRequest,
    options: OperationOptions = {}
  ): Promise<LROPoller<DataFlowDebugSessionCreateDataFlowDebugSessionResponse>> {
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

  public async addDataFlow(
    request: DataFlowDebugPackage,
    options: OperationOptions = {}
  ): Promise<DataFlowDebugSessionAddDataFlowResponse> {
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

  public async beginExecute(
    request: DataFlowDebugCommandRequest,
    options: OperationOptions = {}
  ): Promise<DataFlowDebugSessionAddDataFlowResponse> {
    const { span, updatedOptions } = createSpan("DataFlowDebugSession-BeginExecute", options);

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
}

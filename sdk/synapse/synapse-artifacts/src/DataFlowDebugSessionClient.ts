import { AuthenticationClient } from "./AuthenticationClient";
import {
  CreateDataFlowDebugSessionRequest,
  DataFlowDebugSessionCreateDataFlowDebugSessionResponse,
  DeleteDataFlowDebugSessionRequest,
  DataFlowDebugCommandRequest,
  DataFlowDebugSessionAddDataFlowResponse,
  DataFlowDebugPackage
} from "./generated/models";

import { LROPoller } from "./generated/lro";
import { operationOptionsToRequestOptionsBase } from "@azure/core-http";
import { createSpan } from "./utils/tracing";
import { CanonicalCode } from "@opentelemetry/api";
import * as coreHttp from "@azure/core-http";

import { ListPageSettings, DataFlowDebugSessionInfo } from "./models";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

export class DataFlowDebugSessionClient extends AuthenticationClient {
  public async beginCreate(
    request: CreateDataFlowDebugSessionRequest,
    options: coreHttp.OperationOptions = {}
  ): Promise<LROPoller<DataFlowDebugSessionCreateDataFlowDebugSessionResponse>> {
    const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);

    try {
      const response = await this.client.dataFlowDebugSession.createDataFlowDebugSession(
        request,
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

  private async *listDataFlowDebugSessionsPage(
    continuationState: ListPageSettings,
    options: coreHttp.OperationOptions = {}
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
    options: coreHttp.OperationOptions = {}
  ): AsyncIterableIterator<DataFlowDebugSessionInfo> {
    for await (const page of this.listDataFlowDebugSessionsPage({}, options)) {
      yield* page;
    }
  }

  public list(
    options: coreHttp.OperationOptions = {}
  ): PagedAsyncIterableIterator<DataFlowDebugSessionInfo> {
    const { span, updatedOptions } = createSpan("Synapse-ListSqlScripts", options);
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
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async delete(
    request: DeleteDataFlowDebugSessionRequest,
    options: coreHttp.OperationOptions = {}
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan("Synapse-getDataFlow", options);

    try {
      const response = await this.client.dataFlowDebugSession.deleteDataFlowDebugSession(
        request,
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

  public async addDataFlow(
    request: DataFlowDebugPackage,
    options: coreHttp.OperationOptions = {}
  ): Promise<DataFlowDebugSessionAddDataFlowResponse> {
    const { span, updatedOptions } = createSpan("Synapse-getDataFlow", options);

    try {
      const response = await this.client.dataFlowDebugSession.addDataFlow(
        request,
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
    request: DataFlowDebugCommandRequest,
    options: coreHttp.OperationOptions = {}
  ): Promise<DataFlowDebugSessionAddDataFlowResponse> {
    const { span, updatedOptions } = createSpan("Synapse-beginCreateOrUpdateDataFlow", options);

    try {
      const response = await this.client.dataFlowDebugSession.addDataFlow(
        request,
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

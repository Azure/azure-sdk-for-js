// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  executeCommand,
  $delete,
  addDataFlow,
  listQueryByFactory,
  create,
} from "../../api/dataFlowDebugSession/operations.js";
import {
  DataFlowDebugSessionExecuteCommandOptionalParams,
  DataFlowDebugSessionDeleteOptionalParams,
  DataFlowDebugSessionAddDataFlowOptionalParams,
  DataFlowDebugSessionListQueryByFactoryOptionalParams,
  DataFlowDebugSessionCreateOptionalParams,
} from "../../api/dataFlowDebugSession/options.js";
import {
  CreateDataFlowDebugSessionRequest,
  CreateDataFlowDebugSessionResponse,
  DataFlowDebugSessionInfo,
  DataFlowDebugPackage,
  AddDataFlowToDebugSessionResponse,
  DeleteDataFlowDebugSessionRequest,
  DataFlowDebugCommandRequest,
  DataFlowDebugCommandResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DataFlowDebugSession operations. */
export interface DataFlowDebugSessionOperations {
  /** Execute a data flow debug command. */
  executeCommand: (
    resourceGroupName: string,
    factoryName: string,
    request: DataFlowDebugCommandRequest,
    options?: DataFlowDebugSessionExecuteCommandOptionalParams,
  ) => PollerLike<OperationState<DataFlowDebugCommandResponse>, DataFlowDebugCommandResponse>;
  /** @deprecated use executeCommand instead */
  beginExecuteCommand: (
    resourceGroupName: string,
    factoryName: string,
    request: DataFlowDebugCommandRequest,
    options?: DataFlowDebugSessionExecuteCommandOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DataFlowDebugCommandResponse>, DataFlowDebugCommandResponse>
  >;
  /** @deprecated use executeCommand instead */
  beginExecuteCommandAndWait: (
    resourceGroupName: string,
    factoryName: string,
    request: DataFlowDebugCommandRequest,
    options?: DataFlowDebugSessionExecuteCommandOptionalParams,
  ) => Promise<DataFlowDebugCommandResponse>;
  /** Deletes a data flow debug session. */
  delete: (
    resourceGroupName: string,
    factoryName: string,
    request: DeleteDataFlowDebugSessionRequest,
    options?: DataFlowDebugSessionDeleteOptionalParams,
  ) => Promise<void>;
  /** Add a data flow into debug session. */
  addDataFlow: (
    resourceGroupName: string,
    factoryName: string,
    request: DataFlowDebugPackage,
    options?: DataFlowDebugSessionAddDataFlowOptionalParams,
  ) => Promise<AddDataFlowToDebugSessionResponse>;
  /** Query all active data flow debug sessions. */
  listQueryByFactory: (
    resourceGroupName: string,
    factoryName: string,
    options?: DataFlowDebugSessionListQueryByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<DataFlowDebugSessionInfo>;
  /** Creates a data flow debug session. */
  create: (
    resourceGroupName: string,
    factoryName: string,
    request: CreateDataFlowDebugSessionRequest,
    options?: DataFlowDebugSessionCreateOptionalParams,
  ) => PollerLike<
    OperationState<CreateDataFlowDebugSessionResponse>,
    CreateDataFlowDebugSessionResponse
  >;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    factoryName: string,
    request: CreateDataFlowDebugSessionRequest,
    options?: DataFlowDebugSessionCreateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<CreateDataFlowDebugSessionResponse>,
      CreateDataFlowDebugSessionResponse
    >
  >;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    factoryName: string,
    request: CreateDataFlowDebugSessionRequest,
    options?: DataFlowDebugSessionCreateOptionalParams,
  ) => Promise<CreateDataFlowDebugSessionResponse>;
}

function _getDataFlowDebugSession(context: DataFactoryManagementContext) {
  return {
    executeCommand: (
      resourceGroupName: string,
      factoryName: string,
      request: DataFlowDebugCommandRequest,
      options?: DataFlowDebugSessionExecuteCommandOptionalParams,
    ) => executeCommand(context, resourceGroupName, factoryName, request, options),
    beginExecuteCommand: async (
      resourceGroupName: string,
      factoryName: string,
      request: DataFlowDebugCommandRequest,
      options?: DataFlowDebugSessionExecuteCommandOptionalParams,
    ) => {
      const poller = executeCommand(context, resourceGroupName, factoryName, request, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginExecuteCommandAndWait: async (
      resourceGroupName: string,
      factoryName: string,
      request: DataFlowDebugCommandRequest,
      options?: DataFlowDebugSessionExecuteCommandOptionalParams,
    ) => {
      return await executeCommand(context, resourceGroupName, factoryName, request, options);
    },
    delete: (
      resourceGroupName: string,
      factoryName: string,
      request: DeleteDataFlowDebugSessionRequest,
      options?: DataFlowDebugSessionDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, factoryName, request, options),
    addDataFlow: (
      resourceGroupName: string,
      factoryName: string,
      request: DataFlowDebugPackage,
      options?: DataFlowDebugSessionAddDataFlowOptionalParams,
    ) => addDataFlow(context, resourceGroupName, factoryName, request, options),
    listQueryByFactory: (
      resourceGroupName: string,
      factoryName: string,
      options?: DataFlowDebugSessionListQueryByFactoryOptionalParams,
    ) => listQueryByFactory(context, resourceGroupName, factoryName, options),
    create: (
      resourceGroupName: string,
      factoryName: string,
      request: CreateDataFlowDebugSessionRequest,
      options?: DataFlowDebugSessionCreateOptionalParams,
    ) => create(context, resourceGroupName, factoryName, request, options),
    beginCreate: async (
      resourceGroupName: string,
      factoryName: string,
      request: CreateDataFlowDebugSessionRequest,
      options?: DataFlowDebugSessionCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, factoryName, request, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      factoryName: string,
      request: CreateDataFlowDebugSessionRequest,
      options?: DataFlowDebugSessionCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, factoryName, request, options);
    },
  };
}

export function _getDataFlowDebugSessionOperations(
  context: DataFactoryManagementContext,
): DataFlowDebugSessionOperations {
  return {
    ..._getDataFlowDebugSession(context),
  };
}

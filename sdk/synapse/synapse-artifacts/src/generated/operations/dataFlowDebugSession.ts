import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  CreateDataFlowDebugSessionRequest,
  DataFlowDebugSessionCreateDataFlowDebugSessionResponse,
  DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceResponse,
  DataFlowDebugPackage,
  DataFlowDebugSessionAddDataFlowResponse,
  DeleteDataFlowDebugSessionRequest,
  DataFlowDebugCommandRequest,
  DataFlowDebugSessionExecuteCommandResponse,
  DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceNextResponse
} from "../models";

/**
 * Class representing a DataFlowDebugSession.
 */
export class DataFlowDebugSession {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class DataFlowDebugSession class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * Creates a data flow debug session.
   * @param request Data flow debug session definition
   * @param options The options parameters.
   */
  async createDataFlowDebugSession(
    request: CreateDataFlowDebugSessionRequest,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<DataFlowDebugSessionCreateDataFlowDebugSessionResponse>
  > {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      request,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        DataFlowDebugSessionCreateDataFlowDebugSessionResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      createDataFlowDebugSessionOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createDataFlowDebugSessionOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Query all active data flow debug sessions.
   * @param options The options parameters.
   */
  queryDataFlowDebugSessionsByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<
    DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceResponse
  > {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      queryDataFlowDebugSessionsByWorkspaceOperationSpec
    ) as Promise<
      DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceResponse
    >;
  }

  /**
   * Add a data flow into debug session.
   * @param request Data flow debug session definition with debug content.
   * @param options The options parameters.
   */
  addDataFlow(
    request: DataFlowDebugPackage,
    options?: coreHttp.OperationOptions
  ): Promise<DataFlowDebugSessionAddDataFlowResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { request, options: operationOptions },
      addDataFlowOperationSpec
    ) as Promise<DataFlowDebugSessionAddDataFlowResponse>;
  }

  /**
   * Deletes a data flow debug session.
   * @param request Data flow debug session definition for deletion
   * @param options The options parameters.
   */
  deleteDataFlowDebugSession(
    request: DeleteDataFlowDebugSessionRequest,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { request, options: operationOptions },
      deleteDataFlowDebugSessionOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Execute a data flow debug command.
   * @param request Data flow debug command definition.
   * @param options The options parameters.
   */
  async executeCommand(
    request: DataFlowDebugCommandRequest,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<DataFlowDebugSessionExecuteCommandResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      request,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        DataFlowDebugSessionExecuteCommandResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      executeCommandOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: executeCommandOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * QueryDataFlowDebugSessionsByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the
   *                 QueryDataFlowDebugSessionsByWorkspace method.
   * @param options The options parameters.
   */
  queryDataFlowDebugSessionsByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<
    DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceNextResponse
  > {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      queryDataFlowDebugSessionsByWorkspaceNextOperationSpec
    ) as Promise<
      DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceNextResponse
    >;
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const createDataFlowDebugSessionOperationSpec: coreHttp.OperationSpec = {
  path: "/createDataFlowDebugSession",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.CreateDataFlowDebugSessionResponse
    },
    201: {
      bodyMapper: Mappers.CreateDataFlowDebugSessionResponse
    },
    202: {
      bodyMapper: Mappers.CreateDataFlowDebugSessionResponse
    },
    204: {
      bodyMapper: Mappers.CreateDataFlowDebugSessionResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.request,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const queryDataFlowDebugSessionsByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/queryDataFlowDebugSessions",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.QueryDataFlowDebugSessionsResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
const addDataFlowOperationSpec: coreHttp.OperationSpec = {
  path: "/addDataFlowToDebugSession",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AddDataFlowToDebugSessionResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.request1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const deleteDataFlowDebugSessionOperationSpec: coreHttp.OperationSpec = {
  path: "/deleteDataFlowDebugSession",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.request2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const executeCommandOperationSpec: coreHttp.OperationSpec = {
  path: "/executeDataFlowDebugCommand",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.DataFlowDebugCommandResponse
    },
    201: {
      bodyMapper: Mappers.DataFlowDebugCommandResponse
    },
    202: {
      bodyMapper: Mappers.DataFlowDebugCommandResponse
    },
    204: {
      bodyMapper: Mappers.DataFlowDebugCommandResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.request3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const queryDataFlowDebugSessionsByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QueryDataFlowDebugSessionsResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};

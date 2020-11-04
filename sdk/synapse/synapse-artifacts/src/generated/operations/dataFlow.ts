import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  DataFlowResource,
  DataFlowCreateOrUpdateDataFlowOptionalParams,
  DataFlowCreateOrUpdateDataFlowResponse,
  DataFlowGetDataFlowOptionalParams,
  DataFlowGetDataFlowResponse,
  DataFlowGetDataFlowsByWorkspaceResponse,
  DataFlowGetDataFlowsByWorkspaceNextResponse
} from "../models";

/**
 * Class representing a DataFlow.
 */
export class DataFlow {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class DataFlow class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * Creates or updates a data flow.
   * @param dataFlowName The data flow name.
   * @param dataFlow Data flow resource definition.
   * @param options The options parameters.
   */
  async createOrUpdateDataFlow(
    dataFlowName: string,
    dataFlow: DataFlowResource,
    options?: DataFlowCreateOrUpdateDataFlowOptionalParams
  ): Promise<LROPoller<DataFlowCreateOrUpdateDataFlowResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      dataFlowName,
      dataFlow,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        DataFlowCreateOrUpdateDataFlowResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      createOrUpdateDataFlowOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createOrUpdateDataFlowOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets a data flow.
   * @param dataFlowName The data flow name.
   * @param options The options parameters.
   */
  getDataFlow(
    dataFlowName: string,
    options?: DataFlowGetDataFlowOptionalParams
  ): Promise<DataFlowGetDataFlowResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { dataFlowName, options: operationOptions },
      getDataFlowOperationSpec
    ) as Promise<DataFlowGetDataFlowResponse>;
  }

  /**
   * Deletes a data flow.
   * @param dataFlowName The data flow name.
   * @param options The options parameters.
   */
  async deleteDataFlow(
    dataFlowName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      dataFlowName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      deleteDataFlowOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: deleteDataFlowOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Lists data flows.
   * @param options The options parameters.
   */
  getDataFlowsByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<DataFlowGetDataFlowsByWorkspaceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getDataFlowsByWorkspaceOperationSpec
    ) as Promise<DataFlowGetDataFlowsByWorkspaceResponse>;
  }

  /**
   * GetDataFlowsByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the GetDataFlowsByWorkspace
   *                 method.
   * @param options The options parameters.
   */
  getDataFlowsByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<DataFlowGetDataFlowsByWorkspaceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      getDataFlowsByWorkspaceNextOperationSpec
    ) as Promise<DataFlowGetDataFlowsByWorkspaceNextResponse>;
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

const createOrUpdateDataFlowOperationSpec: coreHttp.OperationSpec = {
  path: "/dataflows/{dataFlowName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DataFlowResource
    },
    201: {
      bodyMapper: Mappers.DataFlowResource
    },
    202: {
      bodyMapper: Mappers.DataFlowResource
    },
    204: {
      bodyMapper: Mappers.DataFlowResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.dataFlow,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.dataFlowName],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept1,
    Parameters.ifMatch
  ],
  mediaType: "json",
  serializer
};
const getDataFlowOperationSpec: coreHttp.OperationSpec = {
  path: "/dataflows/{dataFlowName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataFlowResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.dataFlowName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deleteDataFlowOperationSpec: coreHttp.OperationSpec = {
  path: "/dataflows/{dataFlowName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.dataFlowName],
  headerParameters: [Parameters.accept],
  serializer
};
const getDataFlowsByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/dataflows",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataFlowListResponse
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
const getDataFlowsByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataFlowListResponse
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

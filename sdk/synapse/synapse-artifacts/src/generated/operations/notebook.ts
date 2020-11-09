import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  NotebookGetNotebooksByWorkspaceResponse,
  NotebookGetNotebookSummaryByWorkSpaceResponse,
  NotebookResource,
  NotebookCreateOrUpdateNotebookOptionalParams,
  NotebookCreateOrUpdateNotebookResponse,
  NotebookGetNotebookOptionalParams,
  NotebookGetNotebookResponse,
  NotebookGetNotebooksByWorkspaceNextResponse,
  NotebookGetNotebookSummaryByWorkSpaceNextResponse
} from "../models";

/**
 * Class representing a Notebook.
 */
export class Notebook {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class Notebook class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * Lists Notebooks.
   * @param options The options parameters.
   */
  getNotebooksByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<NotebookGetNotebooksByWorkspaceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getNotebooksByWorkspaceOperationSpec
    ) as Promise<NotebookGetNotebooksByWorkspaceResponse>;
  }

  /**
   * Lists a summary of Notebooks.
   * @param options The options parameters.
   */
  getNotebookSummaryByWorkSpace(
    options?: coreHttp.OperationOptions
  ): Promise<NotebookGetNotebookSummaryByWorkSpaceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getNotebookSummaryByWorkSpaceOperationSpec
    ) as Promise<NotebookGetNotebookSummaryByWorkSpaceResponse>;
  }

  /**
   * Creates or updates a Note Book.
   * @param notebookName The notebook name.
   * @param notebook Note book resource definition.
   * @param options The options parameters.
   */
  async createOrUpdateNotebook(
    notebookName: string,
    notebook: NotebookResource,
    options?: NotebookCreateOrUpdateNotebookOptionalParams
  ): Promise<LROPoller<NotebookCreateOrUpdateNotebookResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      notebookName,
      notebook,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        NotebookCreateOrUpdateNotebookResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      createOrUpdateNotebookOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createOrUpdateNotebookOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets a Note Book.
   * @param notebookName The notebook name.
   * @param options The options parameters.
   */
  getNotebook(
    notebookName: string,
    options?: NotebookGetNotebookOptionalParams
  ): Promise<NotebookGetNotebookResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { notebookName, options: operationOptions },
      getNotebookOperationSpec
    ) as Promise<NotebookGetNotebookResponse>;
  }

  /**
   * Deletes a Note book.
   * @param notebookName The notebook name.
   * @param options The options parameters.
   */
  async deleteNotebook(
    notebookName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      notebookName,
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
      deleteNotebookOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: deleteNotebookOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * GetNotebooksByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the GetNotebooksByWorkspace
   *                 method.
   * @param options The options parameters.
   */
  getNotebooksByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<NotebookGetNotebooksByWorkspaceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      getNotebooksByWorkspaceNextOperationSpec
    ) as Promise<NotebookGetNotebooksByWorkspaceNextResponse>;
  }

  /**
   * GetNotebookSummaryByWorkSpaceNext
   * @param nextLink The nextLink from the previous successful call to the GetNotebookSummaryByWorkSpace
   *                 method.
   * @param options The options parameters.
   */
  getNotebookSummaryByWorkSpaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<NotebookGetNotebookSummaryByWorkSpaceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      getNotebookSummaryByWorkSpaceNextOperationSpec
    ) as Promise<NotebookGetNotebookSummaryByWorkSpaceNextResponse>;
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

const getNotebooksByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/notebooks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NotebookListResponse
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
const getNotebookSummaryByWorkSpaceOperationSpec: coreHttp.OperationSpec = {
  path: "/notebooks/summary",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NotebookListResponse
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
const createOrUpdateNotebookOperationSpec: coreHttp.OperationSpec = {
  path: "/notebooks/{notebookName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.NotebookResource
    },
    201: {
      bodyMapper: Mappers.NotebookResource
    },
    202: {
      bodyMapper: Mappers.NotebookResource
    },
    204: {
      bodyMapper: Mappers.NotebookResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.notebook,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.notebookName],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept1,
    Parameters.ifMatch
  ],
  mediaType: "json",
  serializer
};
const getNotebookOperationSpec: coreHttp.OperationSpec = {
  path: "/notebooks/{notebookName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NotebookResource
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.notebookName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deleteNotebookOperationSpec: coreHttp.OperationSpec = {
  path: "/notebooks/{notebookName}",
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
  urlParameters: [Parameters.endpoint, Parameters.notebookName],
  headerParameters: [Parameters.accept],
  serializer
};
const getNotebooksByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NotebookListResponse
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
const getNotebookSummaryByWorkSpaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NotebookListResponse
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

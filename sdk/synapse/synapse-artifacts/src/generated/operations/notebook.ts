import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
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
  createOrUpdateNotebook(
    notebookName: string,
    notebook: NotebookResource,
    options?: NotebookCreateOrUpdateNotebookOptionalParams
  ): Promise<NotebookCreateOrUpdateNotebookResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { notebookName, notebook, options: operationOptions },
      createOrUpdateNotebookOperationSpec
    ) as Promise<NotebookCreateOrUpdateNotebookResponse>;
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
  deleteNotebook(
    notebookName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { notebookName, options: operationOptions },
      deleteNotebookOperationSpec
    ) as Promise<coreHttp.RestResponse>;
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
    202: {},
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

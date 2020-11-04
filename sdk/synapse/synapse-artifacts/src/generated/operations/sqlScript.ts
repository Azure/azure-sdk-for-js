import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseArtifacts } from "../synapseArtifacts";
import {
  SqlScriptGetSqlScriptsByWorkspaceResponse,
  SqlScriptResource,
  SqlScriptCreateOrUpdateSqlScriptOptionalParams,
  SqlScriptCreateOrUpdateSqlScriptResponse,
  SqlScriptGetSqlScriptOptionalParams,
  SqlScriptGetSqlScriptResponse,
  SqlScriptGetSqlScriptsByWorkspaceNextResponse
} from "../models";

/**
 * Class representing a SqlScript.
 */
export class SqlScript {
  private readonly client: SynapseArtifacts;

  /**
   * Initialize a new instance of the class SqlScript class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseArtifacts) {
    this.client = client;
  }

  /**
   * Lists sql scripts.
   * @param options The options parameters.
   */
  getSqlScriptsByWorkspace(
    options?: coreHttp.OperationOptions
  ): Promise<SqlScriptGetSqlScriptsByWorkspaceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getSqlScriptsByWorkspaceOperationSpec
    ) as Promise<SqlScriptGetSqlScriptsByWorkspaceResponse>;
  }

  /**
   * Creates or updates a Sql Script.
   * @param sqlScriptName The sql script name.
   * @param sqlScript Sql Script resource definition.
   * @param options The options parameters.
   */
  createOrUpdateSqlScript(
    sqlScriptName: string,
    sqlScript: SqlScriptResource,
    options?: SqlScriptCreateOrUpdateSqlScriptOptionalParams
  ): Promise<SqlScriptCreateOrUpdateSqlScriptResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sqlScriptName, sqlScript, options: operationOptions },
      createOrUpdateSqlScriptOperationSpec
    ) as Promise<SqlScriptCreateOrUpdateSqlScriptResponse>;
  }

  /**
   * Gets a sql script.
   * @param sqlScriptName The sql script name.
   * @param options The options parameters.
   */
  getSqlScript(
    sqlScriptName: string,
    options?: SqlScriptGetSqlScriptOptionalParams
  ): Promise<SqlScriptGetSqlScriptResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sqlScriptName, options: operationOptions },
      getSqlScriptOperationSpec
    ) as Promise<SqlScriptGetSqlScriptResponse>;
  }

  /**
   * Deletes a Sql Script.
   * @param sqlScriptName The sql script name.
   * @param options The options parameters.
   */
  deleteSqlScript(
    sqlScriptName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { sqlScriptName, options: operationOptions },
      deleteSqlScriptOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * GetSqlScriptsByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the GetSqlScriptsByWorkspace
   *                 method.
   * @param options The options parameters.
   */
  getSqlScriptsByWorkspaceNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<SqlScriptGetSqlScriptsByWorkspaceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      getSqlScriptsByWorkspaceNextOperationSpec
    ) as Promise<SqlScriptGetSqlScriptsByWorkspaceNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getSqlScriptsByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path: "/sqlScripts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SqlScriptsListResponse
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
const createOrUpdateSqlScriptOperationSpec: coreHttp.OperationSpec = {
  path: "/sqlScripts/{sqlScriptName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SqlScriptResource
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.sqlScript,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.sqlScriptName],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept1,
    Parameters.ifMatch
  ],
  mediaType: "json",
  serializer
};
const getSqlScriptOperationSpec: coreHttp.OperationSpec = {
  path: "/sqlScripts/{sqlScriptName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SqlScriptResource
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.sqlScriptName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deleteSqlScriptOperationSpec: coreHttp.OperationSpec = {
  path: "/sqlScripts/{sqlScriptName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.sqlScriptName],
  headerParameters: [Parameters.accept],
  serializer
};
const getSqlScriptsByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SqlScriptsListResponse
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

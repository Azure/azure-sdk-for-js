import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseAccessControl } from "../synapseAccessControl";
import {
  RoleDefinitionsListRoleDefinitionsOptionalParams,
  RoleDefinitionsListRoleDefinitionsResponse,
  RoleDefinitionsGetRoleDefinitionByIdResponse,
  RoleDefinitionsListScopesResponse
} from "../models";

/**
 * Class representing a RoleDefinitions.
 */
export class RoleDefinitions {
  private readonly client: SynapseAccessControl;

  /**
   * Initialize a new instance of the class RoleDefinitions class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseAccessControl) {
    this.client = client;
  }

  /**
   * List role definitions.
   * @param options The options parameters.
   */
  listRoleDefinitions(
    options?: RoleDefinitionsListRoleDefinitionsOptionalParams
  ): Promise<RoleDefinitionsListRoleDefinitionsResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listRoleDefinitionsOperationSpec
    ) as Promise<RoleDefinitionsListRoleDefinitionsResponse>;
  }

  /**
   * Get role definition by role definition Id.
   * @param roleDefinitionId Synapse Built-In Role Definition Id.
   * @param options The options parameters.
   */
  getRoleDefinitionById(
    roleDefinitionId: string,
    options?: coreHttp.OperationOptions
  ): Promise<RoleDefinitionsGetRoleDefinitionByIdResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      roleDefinitionId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getRoleDefinitionByIdOperationSpec
    ) as Promise<RoleDefinitionsGetRoleDefinitionByIdResponse>;
  }

  /**
   * List rbac scopes.
   * @param options The options parameters.
   */
  listScopes(
    options?: coreHttp.OperationOptions
  ): Promise<RoleDefinitionsListScopesResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listScopesOperationSpec
    ) as Promise<RoleDefinitionsListScopesResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listRoleDefinitionsOperationSpec: coreHttp.OperationSpec = {
  path: "/roleDefinitions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "SynapseRoleDefinition" }
          }
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.isBuiltIn,
    Parameters.scope1
  ],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
const getRoleDefinitionByIdOperationSpec: coreHttp.OperationSpec = {
  path: "/roleDefinitions/{roleDefinitionId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SynapseRoleDefinition
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.roleDefinitionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listScopesOperationSpec: coreHttp.OperationSpec = {
  path: "/rbacScopes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: { name: "Sequence", element: { type: { name: "String" } } }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};

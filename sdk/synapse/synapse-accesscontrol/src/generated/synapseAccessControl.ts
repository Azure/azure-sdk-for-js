import * as coreHttp from "@azure/core-http";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { SynapseAccessControlContext } from "./synapseAccessControlContext";
import {
  SynapseAccessControlOptionalParams,
  SynapseAccessControlGetRoleDefinitionsResponse,
  SynapseAccessControlGetRoleDefinitionByIdResponse,
  RoleAssignmentOptions,
  SynapseAccessControlCreateRoleAssignmentResponse,
  SynapseAccessControlGetRoleAssignmentsOptionalParams,
  SynapseAccessControlGetRoleAssignmentsResponse,
  SynapseAccessControlGetRoleAssignmentByIdResponse,
  SynapseAccessControlGetCallerRoleAssignmentsResponse,
  SynapseAccessControlGetRoleDefinitionsNextResponse
} from "./models";

export class SynapseAccessControl extends SynapseAccessControlContext {
  /**
   * Initializes a new instance of the SynapseAccessControl class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param endpoint The workspace development endpoint, for example
   *                 https://myworkspace.dev.azuresynapse.net.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    endpoint: string,
    options?: SynapseAccessControlOptionalParams
  ) {
    super(credentials, endpoint, options);
  }

  /**
   * List roles.
   * @param options The options parameters.
   */
  getRoleDefinitions(
    options?: coreHttp.OperationOptions
  ): Promise<SynapseAccessControlGetRoleDefinitionsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      getRoleDefinitionsOperationSpec
    ) as Promise<SynapseAccessControlGetRoleDefinitionsResponse>;
  }

  /**
   * Get role by role Id.
   * @param roleId Synapse Built-In Role Id.
   * @param options The options parameters.
   */
  getRoleDefinitionById(
    roleId: string,
    options?: coreHttp.OperationOptions
  ): Promise<SynapseAccessControlGetRoleDefinitionByIdResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { roleId, options: operationOptions },
      getRoleDefinitionByIdOperationSpec
    ) as Promise<SynapseAccessControlGetRoleDefinitionByIdResponse>;
  }

  /**
   * Create role assignment.
   * @param createRoleAssignmentOptions Details of role id and object id.
   * @param options The options parameters.
   */
  createRoleAssignment(
    createRoleAssignmentOptions: RoleAssignmentOptions,
    options?: coreHttp.OperationOptions
  ): Promise<SynapseAccessControlCreateRoleAssignmentResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { createRoleAssignmentOptions, options: operationOptions },
      createRoleAssignmentOperationSpec
    ) as Promise<SynapseAccessControlCreateRoleAssignmentResponse>;
  }

  /**
   * List role assignments.
   * @param options The options parameters.
   */
  getRoleAssignments(
    options?: SynapseAccessControlGetRoleAssignmentsOptionalParams
  ): Promise<SynapseAccessControlGetRoleAssignmentsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      getRoleAssignmentsOperationSpec
    ) as Promise<SynapseAccessControlGetRoleAssignmentsResponse>;
  }

  /**
   * Get role assignment by role assignment Id.
   * @param roleAssignmentId The ID of the role assignment.
   * @param options The options parameters.
   */
  getRoleAssignmentById(
    roleAssignmentId: string,
    options?: coreHttp.OperationOptions
  ): Promise<SynapseAccessControlGetRoleAssignmentByIdResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { roleAssignmentId, options: operationOptions },
      getRoleAssignmentByIdOperationSpec
    ) as Promise<SynapseAccessControlGetRoleAssignmentByIdResponse>;
  }

  /**
   * Delete role assignment by role assignment Id.
   * @param roleAssignmentId The ID of the role assignment.
   * @param options The options parameters.
   */
  deleteRoleAssignmentById(
    roleAssignmentId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { roleAssignmentId, options: operationOptions },
      deleteRoleAssignmentByIdOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * List role assignments of the caller.
   * @param options The options parameters.
   */
  getCallerRoleAssignments(
    options?: coreHttp.OperationOptions
  ): Promise<SynapseAccessControlGetCallerRoleAssignmentsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      getCallerRoleAssignmentsOperationSpec
    ) as Promise<SynapseAccessControlGetCallerRoleAssignmentsResponse>;
  }

  /**
   * GetRoleDefinitionsNext
   * @param nextLink The nextLink from the previous successful call to the GetRoleDefinitions method.
   * @param options The options parameters.
   */
  getRoleDefinitionsNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<SynapseAccessControlGetRoleDefinitionsNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { nextLink, options: operationOptions },
      getRoleDefinitionsNextOperationSpec
    ) as Promise<SynapseAccessControlGetRoleDefinitionsNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getRoleDefinitionsOperationSpec: coreHttp.OperationSpec = {
  path: "/rbac/roles",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RolesListResponse
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
const getRoleDefinitionByIdOperationSpec: coreHttp.OperationSpec = {
  path: "/rbac/roles/{roleId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SynapseRole
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.roleId],
  headerParameters: [Parameters.accept],
  serializer
};
const createRoleAssignmentOperationSpec: coreHttp.OperationSpec = {
  path: "/rbac/roleAssignments",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.RoleAssignmentDetails
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  requestBody: Parameters.createRoleAssignmentOptions,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const getRoleAssignmentsOperationSpec: coreHttp.OperationSpec = {
  path: "/rbac/roleAssignments",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "RoleAssignmentDetails" }
          }
        }
      },
      headersMapper: Mappers.SynapseAccessControlGetRoleAssignmentsHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.roleId1,
    Parameters.principalId
  ],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept, Parameters.continuationToken],
  serializer
};
const getRoleAssignmentByIdOperationSpec: coreHttp.OperationSpec = {
  path: "/rbac/roleAssignments/{roleAssignmentId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RoleAssignmentDetails
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.roleAssignmentId],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteRoleAssignmentByIdOperationSpec: coreHttp.OperationSpec = {
  path: "/rbac/roleAssignments/{roleAssignmentId}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.roleAssignmentId],
  headerParameters: [Parameters.accept],
  serializer
};
const getCallerRoleAssignmentsOperationSpec: coreHttp.OperationSpec = {
  path: "/rbac/getMyAssignedRoles",
  httpMethod: "POST",
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
const getRoleDefinitionsNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RolesListResponse
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};

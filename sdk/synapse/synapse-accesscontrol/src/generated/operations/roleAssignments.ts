import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SynapseAccessControl } from "../synapseAccessControl";
import {
  RoleAssignmentsListRoleAssignmentsOptionalParams,
  RoleAssignmentsListRoleAssignmentsResponse,
  RoleAssignmentsCreateRoleAssignmentOptionalParams,
  RoleAssignmentsCreateRoleAssignmentResponse,
  RoleAssignmentsGetRoleAssignmentByIdResponse,
  RoleAssignmentsDeleteRoleAssignmentByIdOptionalParams
} from "../models";

/**
 * Class representing a RoleAssignments.
 */
export class RoleAssignments {
  private readonly client: SynapseAccessControl;

  /**
   * Initialize a new instance of the class RoleAssignments class.
   * @param client Reference to the service client
   */
  constructor(client: SynapseAccessControl) {
    this.client = client;
  }

  /**
   * List role assignments.
   * @param options The options parameters.
   */
  listRoleAssignments(
    options?: RoleAssignmentsListRoleAssignmentsOptionalParams
  ): Promise<RoleAssignmentsListRoleAssignmentsResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listRoleAssignmentsOperationSpec
    ) as Promise<RoleAssignmentsListRoleAssignmentsResponse>;
  }

  /**
   * Create role assignment.
   * @param roleAssignmentId The ID of the role assignment.
   * @param roleId Role ID of the Synapse Built-In Role
   * @param principalId Object ID of the AAD principal or security-group
   * @param scope Scope at which the role assignment is created
   * @param options The options parameters.
   */
  createRoleAssignment(
    roleAssignmentId: string,
    roleId: string,
    principalId: string,
    scope: string,
    options?: RoleAssignmentsCreateRoleAssignmentOptionalParams
  ): Promise<RoleAssignmentsCreateRoleAssignmentResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      roleAssignmentId,
      roleId,
      principalId,
      scope,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      createRoleAssignmentOperationSpec
    ) as Promise<RoleAssignmentsCreateRoleAssignmentResponse>;
  }

  /**
   * Get role assignment by role assignment Id.
   * @param roleAssignmentId The ID of the role assignment.
   * @param options The options parameters.
   */
  getRoleAssignmentById(
    roleAssignmentId: string,
    options?: coreHttp.OperationOptions
  ): Promise<RoleAssignmentsGetRoleAssignmentByIdResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      roleAssignmentId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getRoleAssignmentByIdOperationSpec
    ) as Promise<RoleAssignmentsGetRoleAssignmentByIdResponse>;
  }

  /**
   * Delete role assignment by role assignment Id.
   * @param roleAssignmentId The ID of the role assignment.
   * @param options The options parameters.
   */
  deleteRoleAssignmentById(
    roleAssignmentId: string,
    options?: RoleAssignmentsDeleteRoleAssignmentByIdOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      roleAssignmentId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      deleteRoleAssignmentByIdOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listRoleAssignmentsOperationSpec: coreHttp.OperationSpec = {
  path: "/roleAssignments",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RoleAssignmentDetailsList,
      headersMapper: Mappers.RoleAssignmentsListRoleAssignmentsHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.scope1,
    Parameters.roleId,
    Parameters.principalId
  ],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept, Parameters.continuationToken],
  serializer
};
const createRoleAssignmentOperationSpec: coreHttp.OperationSpec = {
  path: "/roleAssignments/{roleAssignmentId}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.RoleAssignmentDetails
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  requestBody: {
    parameterPath: {
      roleId: ["roleId"],
      principalId: ["principalId"],
      scope: ["scope"],
      principalType: ["options", "principalType"]
    },
    mapper: Mappers.RoleAssignmentRequest
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint, Parameters.roleAssignmentId],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const getRoleAssignmentByIdOperationSpec: coreHttp.OperationSpec = {
  path: "/roleAssignments/{roleAssignmentId}",
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
  path: "/roleAssignments/{roleAssignmentId}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.scope1],
  urlParameters: [Parameters.endpoint, Parameters.roleAssignmentId],
  headerParameters: [Parameters.accept],
  serializer
};

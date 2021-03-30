// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as coreHttp from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SpanStatusCode } from "@azure/core-tracing";
import { createSpan } from "./tracing";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { AccessControlClientContext } from "./accessControlClientContext";
import {
  AccessControlClientOptionalParams,
  SynapseRole,
  AccessControlClientGetRoleDefinitionsResponse,
  AccessControlClientGetRoleDefinitionByIdResponse,
  RoleAssignmentOptions,
  AccessControlClientCreateRoleAssignmentResponse,
  AccessControlClientGetRoleAssignmentsOptionalParams,
  AccessControlClientGetRoleAssignmentsResponse,
  AccessControlClientGetRoleAssignmentByIdResponse,
  AccessControlClientGetCallerRoleAssignmentsResponse,
  AccessControlClientGetRoleDefinitionsNextResponse
} from "./models";

export class AccessControlClient extends AccessControlClientContext {
  /**
   * Initializes a new instance of the AccessControlClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param endpoint The workspace development endpoint, for example
   *                 https://myworkspace.dev.azuresynapse.net.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    endpoint: string,
    options?: AccessControlClientOptionalParams
  ) {
    super(credentials, endpoint, options);
  }

  /**
   * List roles.
   * @param options The options parameters.
   */
  public listRoleDefinitions(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<SynapseRole> {
    const iter = this.getRoleDefinitionsPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getRoleDefinitionsPagingPage(options);
      }
    };
  }

  private async *getRoleDefinitionsPagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<SynapseRole[]> {
    let result = await this._getRoleDefinitions(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getRoleDefinitionsNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getRoleDefinitionsPagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<SynapseRole> {
    for await (const page of this.getRoleDefinitionsPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * List roles.
   * @param options The options parameters.
   */
  private async _getRoleDefinitions(
    options?: coreHttp.OperationOptions
  ): Promise<AccessControlClientGetRoleDefinitionsResponse> {
    const { span, updatedOptions } = createSpan("AccessControlClient-_getRoleDefinitions", options);
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.sendOperationRequest(
        operationArguments,
        getRoleDefinitionsOperationSpec
      );
      return result as AccessControlClientGetRoleDefinitionsResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Get role by role Id.
   * @param roleId Synapse Built-In Role Id.
   * @param options The options parameters.
   */
  async getRoleDefinitionById(
    roleId: string,
    options?: coreHttp.OperationOptions
  ): Promise<AccessControlClientGetRoleDefinitionByIdResponse> {
    const { span, updatedOptions } = createSpan(
      "AccessControlClient-getRoleDefinitionById",
      options
    );
    const operationArguments: coreHttp.OperationArguments = {
      roleId,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.sendOperationRequest(
        operationArguments,
        getRoleDefinitionByIdOperationSpec
      );
      return result as AccessControlClientGetRoleDefinitionByIdResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Create role assignment.
   * @param createRoleAssignmentOptions Details of role id and object id.
   * @param options The options parameters.
   */
  async createRoleAssignment(
    createRoleAssignmentOptions: RoleAssignmentOptions,
    options?: coreHttp.OperationOptions
  ): Promise<AccessControlClientCreateRoleAssignmentResponse> {
    const { span, updatedOptions } = createSpan(
      "AccessControlClient-createRoleAssignment",
      options
    );
    const operationArguments: coreHttp.OperationArguments = {
      createRoleAssignmentOptions,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.sendOperationRequest(
        operationArguments,
        createRoleAssignmentOperationSpec
      );
      return result as AccessControlClientCreateRoleAssignmentResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * List role assignments.
   * @param options The options parameters.
   */
  async getRoleAssignments(
    options?: AccessControlClientGetRoleAssignmentsOptionalParams
  ): Promise<AccessControlClientGetRoleAssignmentsResponse> {
    const { span, updatedOptions } = createSpan("AccessControlClient-getRoleAssignments", options);
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.sendOperationRequest(
        operationArguments,
        getRoleAssignmentsOperationSpec
      );
      return result as AccessControlClientGetRoleAssignmentsResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Get role assignment by role assignment Id.
   * @param roleAssignmentId The ID of the role assignment.
   * @param options The options parameters.
   */
  async getRoleAssignmentById(
    roleAssignmentId: string,
    options?: coreHttp.OperationOptions
  ): Promise<AccessControlClientGetRoleAssignmentByIdResponse> {
    const { span, updatedOptions } = createSpan(
      "AccessControlClient-getRoleAssignmentById",
      options
    );
    const operationArguments: coreHttp.OperationArguments = {
      roleAssignmentId,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.sendOperationRequest(
        operationArguments,
        getRoleAssignmentByIdOperationSpec
      );
      return result as AccessControlClientGetRoleAssignmentByIdResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Delete role assignment by role assignment Id.
   * @param roleAssignmentId The ID of the role assignment.
   * @param options The options parameters.
   */
  async deleteRoleAssignmentById(
    roleAssignmentId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan(
      "AccessControlClient-deleteRoleAssignmentById",
      options
    );
    const operationArguments: coreHttp.OperationArguments = {
      roleAssignmentId,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.sendOperationRequest(
        operationArguments,
        deleteRoleAssignmentByIdOperationSpec
      );
      return result as coreHttp.RestResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * List role assignments of the caller.
   * @param options The options parameters.
   */
  async getCallerRoleAssignments(
    options?: coreHttp.OperationOptions
  ): Promise<AccessControlClientGetCallerRoleAssignmentsResponse> {
    const { span, updatedOptions } = createSpan(
      "AccessControlClient-getCallerRoleAssignments",
      options
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.sendOperationRequest(
        operationArguments,
        getCallerRoleAssignmentsOperationSpec
      );
      return result as AccessControlClientGetCallerRoleAssignmentsResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * GetRoleDefinitionsNext
   * @param nextLink The nextLink from the previous successful call to the GetRoleDefinitions method.
   * @param options The options parameters.
   */
  private async _getRoleDefinitionsNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<AccessControlClientGetRoleDefinitionsNextResponse> {
    const { span, updatedOptions } = createSpan(
      "AccessControlClient-_getRoleDefinitionsNext",
      options
    );
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(updatedOptions)
    };
    try {
      const result = await this.sendOperationRequest(
        operationArguments,
        getRoleDefinitionsNextOperationSpec
      );
      return result as AccessControlClientGetRoleDefinitionsNextResponse;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
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
  headerParameters: [Parameters.accept, Parameters.contentType],
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
      headersMapper: Mappers.AccessControlClientGetRoleAssignmentsHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorContract
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.roleId1, Parameters.principalId],
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

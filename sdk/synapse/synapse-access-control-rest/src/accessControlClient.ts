// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetRoleDefinitionsParameters,
  GetRoleDefinitionByIdParameters,
  CreateRoleAssignmentParameters,
  GetRoleAssignmentsParameters,
  GetRoleAssignmentByIdParameters,
  DeleteRoleAssignmentByIdParameters,
  GetCallerRoleAssignmentsParameters
} from "./parameters";
import {
  GetRoleDefinitions200Response,
  GetRoleDefinitionsdefaultResponse,
  GetRoleDefinitionById200Response,
  GetRoleDefinitionByIddefaultResponse,
  CreateRoleAssignment200Response,
  CreateRoleAssignmentdefaultResponse,
  GetRoleAssignments200Response,
  GetRoleAssignmentsdefaultResponse,
  GetRoleAssignmentById200Response,
  GetRoleAssignmentByIddefaultResponse,
  DeleteRoleAssignmentById200Response,
  DeleteRoleAssignmentById204Response,
  DeleteRoleAssignmentByIddefaultResponse,
  GetCallerRoleAssignments200Response,
  GetCallerRoleAssignmentsdefaultResponse
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface GetRoleDefinitions {
  /** List roles. */
  get(
    options?: GetRoleDefinitionsParameters
  ): Promise<GetRoleDefinitions200Response | GetRoleDefinitionsdefaultResponse>;
}

export interface GetRoleDefinitionById {
  /** Get role by role Id. */
  get(
    options?: GetRoleDefinitionByIdParameters
  ): Promise<
    GetRoleDefinitionById200Response | GetRoleDefinitionByIddefaultResponse
  >;
}

export interface CreateRoleAssignment {
  /** Create role assignment. */
  post(
    options: CreateRoleAssignmentParameters
  ): Promise<
    CreateRoleAssignment200Response | CreateRoleAssignmentdefaultResponse
  >;
  /** List role assignments. */
  get(
    options?: GetRoleAssignmentsParameters
  ): Promise<GetRoleAssignments200Response | GetRoleAssignmentsdefaultResponse>;
}

export interface GetRoleAssignmentById {
  /** Get role assignment by role assignment Id. */
  get(
    options?: GetRoleAssignmentByIdParameters
  ): Promise<
    GetRoleAssignmentById200Response | GetRoleAssignmentByIddefaultResponse
  >;
  /** Delete role assignment by role assignment Id. */
  delete(
    options?: DeleteRoleAssignmentByIdParameters
  ): Promise<
    | DeleteRoleAssignmentById200Response
    | DeleteRoleAssignmentById204Response
    | DeleteRoleAssignmentByIddefaultResponse
  >;
}

export interface GetCallerRoleAssignments {
  /** List role assignments of the caller. */
  post(
    options?: GetCallerRoleAssignmentsParameters
  ): Promise<
    | GetCallerRoleAssignments200Response
    | GetCallerRoleAssignmentsdefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/rbac/roles' has methods for the following verbs: get */
  (path: "/rbac/roles"): GetRoleDefinitions;
  /** Resource for '/rbac/roles/\{roleId\}' has methods for the following verbs: get */
  (path: "/rbac/roles/{roleId}", roleId: string): GetRoleDefinitionById;
  /** Resource for '/rbac/roleAssignments' has methods for the following verbs: post, get */
  (path: "/rbac/roleAssignments"): CreateRoleAssignment;
  /** Resource for '/rbac/roleAssignments/\{roleAssignmentId\}' has methods for the following verbs: get, delete */
  (
    path: "/rbac/roleAssignments/{roleAssignmentId}",
    roleAssignmentId: string
  ): GetRoleAssignmentById;
  /** Resource for '/rbac/getMyAssignedRoles' has methods for the following verbs: post */
  (path: "/rbac/getMyAssignedRoles"): GetCallerRoleAssignments;
}

export type AccessControlClientRestClient = Client & {
  path: Routes;
};

export default function AccessControlClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): AccessControlClientRestClient {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2020-02-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://dev.azuresynapse.net/.default"]
    }
  };

  return getClient(
    baseUrl,
    credentials,
    options
  ) as AccessControlClientRestClient;
}

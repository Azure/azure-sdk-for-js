// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import { HttpResponse } from "@azure/core-http";
import * as coreHttp from "@azure/core-http";
export {
  CheckPrincipalAccessRequest,
  SubjectInfo,
  Action,
  SynapseRbacPermission,
  CheckAccessDecision,
  RoleAssignmentDetails,
  SynapseRoleDefinition,
  RoleAssignmentRequest,
  RoleAssignmentDetailsList,
  CheckPrincipalAccessResponse
} from "./generated/models";

/**
 * Options to create accesscontrol client.
 */
// export interface AccesscontrolClientOptions extends PipelineOptions {}

// export interface ListRoleDefinitionOptions extends RoleDefinitionsListRoleDefinitionsOptionalParams {}

export interface ListRoleDefinitionOptions extends coreHttp.OperationOptions {
  /**
   * Is a Synapse Built-In Role or not.
   */
  isBuiltIn?: boolean;
  /**
   * Scope of the Synapse Built-in Role.
   */
  scope?: string;
}

export interface CreateRoleAssignmentOptions extends coreHttp.OperationOptions {
  /**
   * Type of the principal Id: User, Group or ServicePrincipal
   */
  principalType?: string;
}

export interface ListRoleAssignmentsOptions extends coreHttp.OperationOptions {
  /**
   * Scope of the Synapse Built-in Role.
   */
  scope?: string;
  /**
   * Synapse Built-In Role Id.
   */
  roleId?: string;
  /**
   * Object ID of the AAD principal or security-group.
   */
  principalId?: string;
  /**
   * Continuation token.
   */
  continuationToken?: string;
}

export interface DeleteRoleAssignmentByIdOptions extends coreHttp.OperationOptions {
  /**
   * Scope of the Synapse Built-in Role.
   */
  scope?: string;
}

export type GetRoleDefinitionOptions = OperationOptions;

export type ListScopesOptions = OperationOptions;

export type GetRoleAssignmentOptions = OperationOptions;

export type CheckPrincipalAccessOptions = OperationOptions;

/**
 * Represents the repsonse for operations
 */
export interface OperationResponse {
  /**
   * The underlying HTTP response containing both raw and deserialized response data.
   */
  _response: HttpResponse;
}

/**
 * Represents the repsonse for operations
 */
export interface OperationResponse {
  /**
   * The underlying HTTP response containing both raw and deserialized response data.
   */
  _response: HttpResponse;
}

/**
 * Represents the returned response of the operation along with the raw response.
 */
export type WithResponse<T> = T & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: T;
  };
};

/**
 * Attach http response to a model
 */
export const attachHttpResponse = <T>(
  model: T,
  httpResponse: HttpResponse & { bodyAsText: string; parsedBody: any }
): WithResponse<T> => {
  const { parsedBody, bodyAsText, ...r } = httpResponse;
  return Object.defineProperty(model, "_response", {
    value: r
  });
};

/**
 * Optional parameters.
 */
export interface AccesscontrolClientOptions extends coreHttp.PipelineOptions {
  /**
   * Api Version
   */
  apiVersion?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as coreHttp from "@azure/core-http";

/** A list of Synapse roles available. */
export interface RolesListResponse {
  /** List of Synapse roles. */
  value: SynapseRole[];
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
}

/** Synapse role details */
export interface SynapseRole {
  /** Role ID */
  id?: string;
  /** Name of the Synapse role */
  name?: string;
  /** Is a built-in role or not */
  isBuiltIn: boolean;
}

/** Contains details when the response code indicates an error. */
export interface ErrorContract {
  /** The error details. */
  error?: ErrorResponse;
}

export interface ErrorResponse {
  code: string;
  message: string;
  target?: string;
  details?: ErrorDetail[];
}

export interface ErrorDetail {
  code: string;
  message: string;
  target?: string;
}

/** Role Assignment request details */
export interface RoleAssignmentOptions {
  /** Role ID of the Synapse Built-In Role */
  roleId: string;
  /** Object ID of the AAD principal or security-group */
  principalId: string;
}

/** Role Assignment response details */
export interface RoleAssignmentDetails {
  /** Role Assignment ID */
  id?: string;
  /** Role ID of the Synapse Built-In Role */
  roleId?: string;
  /** Object ID of the AAD principal or security-group */
  principalId?: string;
}

/** Defines headers for AccessControlClient_getRoleAssignments operation. */
export interface AccessControlClientGetRoleAssignmentsHeaders {
  /** If the number of role assignments to be listed exceeds the maxResults limit, a continuation token is returned in this response header.  When a continuation token is returned in the response, it must be specified in a subsequent invocation of the list operation to continue listing the role assignments. */
  xMsContinuation?: string;
}

/** Contains response data for the getRoleDefinitions operation. */
export type AccessControlClientGetRoleDefinitionsResponse = RolesListResponse & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: RolesListResponse;
  };
};

/** Contains response data for the getRoleDefinitionById operation. */
export type AccessControlClientGetRoleDefinitionByIdResponse = SynapseRole & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SynapseRole;
  };
};

/** Contains response data for the createRoleAssignment operation. */
export type AccessControlClientCreateRoleAssignmentResponse = RoleAssignmentDetails & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: RoleAssignmentDetails;
  };
};

/** Optional parameters. */
export interface AccessControlClientGetRoleAssignmentsOptionalParams
  extends coreHttp.OperationOptions {
  /** Synapse Built-In Role Id. */
  roleId?: string;
  /** Object ID of the AAD principal or security-group. */
  principalId?: string;
  /** Continuation token. */
  continuationToken?: string;
}

/** Contains response data for the getRoleAssignments operation. */
export type AccessControlClientGetRoleAssignmentsResponse = AccessControlClientGetRoleAssignmentsHeaders &
  RoleAssignmentDetails[] & {
    /** The underlying HTTP response. */
    _response: coreHttp.HttpResponse & {
      /** The response body as text (string format) */
      bodyAsText: string;

      /** The response body as parsed JSON or XML */
      parsedBody: RoleAssignmentDetails[];
      /** The parsed HTTP response headers. */
      parsedHeaders: AccessControlClientGetRoleAssignmentsHeaders;
    };
  };

/** Contains response data for the getRoleAssignmentById operation. */
export type AccessControlClientGetRoleAssignmentByIdResponse = RoleAssignmentDetails & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: RoleAssignmentDetails;
  };
};

/** Contains response data for the getCallerRoleAssignments operation. */
export type AccessControlClientGetCallerRoleAssignmentsResponse = {
  /** The parsed response body. */
  body: string[];

  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: string[];
  };
};

/** Contains response data for the getRoleDefinitionsNext operation. */
export type AccessControlClientGetRoleDefinitionsNextResponse = RolesListResponse & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: RolesListResponse;
  };
};

/** Optional parameters. */
export interface AccessControlClientOptionalParams
  extends coreHttp.ServiceClientOptions {
  /** Api Version */
  apiVersion?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}

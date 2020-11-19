import * as coreHttp from "@azure/core-http";

/**
 * Check access request details
 */
export interface CheckPrincipalAccessRequest {
  /**
   * Subject details
   */
  subject: SubjectInfo;
  /**
   * List of actions.
   */
  actions: Action[];
  /**
   * Scope at which the check access is done.
   */
  scope: string;
}

/**
 * Subject details
 */
export interface SubjectInfo {
  /**
   * Principal Id
   */
  principalId: string;
  /**
   * List of group Ids that the principalId is part of.
   */
  groupIds?: string[];
}

/**
 * Action Info
 */
export interface Action {
  /**
   * Action Id.
   */
  id: string;
  /**
   * Is a data action or not.
   */
  isDataAction: boolean;
}

/**
 * Check access response details
 */
export interface CheckPrincipalAccessResponse {
  /**
   * Check access response details
   */
  accessDecisions?: CheckAccessDecision[];
}

/**
 * Check access response details
 */
export interface CheckAccessDecision {
  /**
   * Access Decision.
   */
  accessDecision?: string;
  /**
   * Action Id.
   */
  actionId?: string;
  /**
   * Role Assignment response details
   */
  roleAssignment?: RoleAssignmentDetails;
}

/**
 * Role Assignment response details
 */
export interface RoleAssignmentDetails {
  /**
   * Role Assignment ID
   */
  id?: string;
  /**
   * Role ID of the Synapse Built-In Role
   */
  roleDefinitionId?: string;
  /**
   * Object ID of the AAD principal or security-group
   */
  principalId?: string;
  /**
   * Scope at the role assignment is created
   */
  scope?: string;
  /**
   * Type of the principal Id: User, Group or ServicePrincipal
   */
  principalType?: string;
}

/**
 * Contains details when the response code indicates an error.
 */
export interface ErrorContract {
  /**
   * The error details.
   */
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

/**
 * Synapse role definition details
 */
export interface SynapseRoleDefinition {
  /**
   * Role Definition ID
   */
  id?: string;
  /**
   * Name of the Synapse role
   */
  name?: string;
  /**
   * Is a built-in role or not
   */
  isBuiltIn?: boolean;
  /**
   * Description for the Synapse role
   */
  description?: string;
  /**
   * Permissions for the Synapse role
   */
  permissions?: SynapseRbacPermission[];
  /**
   * Allowed scopes for the Synapse role
   */
  scopes?: string[];
  /**
   * Availability of the Synapse role
   */
  availabilityStatus?: string;
}

/**
 * Synapse role definition details
 */
export interface SynapseRbacPermission {
  /**
   * List of actions
   */
  actions?: string[];
  /**
   * List of Not actions
   */
  notActions?: string[];
  /**
   * List of data actions
   */
  dataActions?: string[];
  /**
   * List of Not data actions
   */
  notDataActions?: string[];
}

/**
 * Role Assignment response details
 */
export interface RoleAssignmentDetailsList {
  /**
   * Number of role assignments
   */
  count?: number;
  /**
   * A list of role assignments
   */
  value?: RoleAssignmentDetails[];
}

/**
 * Role Assignment request details
 */
export interface RoleAssignmentRequest {
  /**
   * Role ID of the Synapse Built-In Role
   */
  roleId: string;
  /**
   * Object ID of the AAD principal or security-group
   */
  principalId: string;
  /**
   * Scope at which the role assignment is created
   */
  scope: string;
  /**
   * Type of the principal Id: User, Group or ServicePrincipal
   */
  principalType?: string;
}

/**
 * Defines headers for RoleAssignments_listRoleAssignments operation.
 */
export interface RoleAssignmentsListRoleAssignmentsHeaders {
  /**
   * If the number of role assignments to be listed exceeds the maxResults limit, a continuation token is returned in this response header.  When a continuation token is returned in the response, it must be specified in a subsequent invocation of the list operation to continue listing the role assignments.
   */
  xMsContinuation?: string;
}

/**
 * Contains response data for the checkPrincipalAccess operation.
 */
export type SynapseAccessControlCheckPrincipalAccessResponse = CheckPrincipalAccessResponse & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: CheckPrincipalAccessResponse;
  };
};

/**
 * Optional parameters.
 */
export interface RoleDefinitionsListRoleDefinitionsOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Is a Synapse Built-In Role or not.
   */
  isBuiltIn?: boolean;
  /**
   * Scope of the Synapse Built-in Role.
   */
  scope?: string;
}

/**
 * Contains response data for the listRoleDefinitions operation.
 */
export type RoleDefinitionsListRoleDefinitionsResponse = SynapseRoleDefinition[] & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SynapseRoleDefinition[];
  };
};

/**
 * Contains response data for the getRoleDefinitionById operation.
 */
export type RoleDefinitionsGetRoleDefinitionByIdResponse = SynapseRoleDefinition & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SynapseRoleDefinition;
  };
};

/**
 * Contains response data for the listScopes operation.
 */
export type RoleDefinitionsListScopesResponse = {
  /**
   * The parsed response body.
   */
  body: string[];

  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: string[];
  };
};

/**
 * Optional parameters.
 */
export interface RoleAssignmentsListRoleAssignmentsOptionalParams
  extends coreHttp.OperationOptions {
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

/**
 * Contains response data for the listRoleAssignments operation.
 */
export type RoleAssignmentsListRoleAssignmentsResponse = RoleAssignmentsListRoleAssignmentsHeaders &
  RoleAssignmentDetailsList & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: RoleAssignmentDetailsList;
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: RoleAssignmentsListRoleAssignmentsHeaders;
    };
  };

/**
 * Optional parameters.
 */
export interface RoleAssignmentsCreateRoleAssignmentOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Type of the principal Id: User, Group or ServicePrincipal
   */
  principalType?: string;
}

/**
 * Contains response data for the createRoleAssignment operation.
 */
export type RoleAssignmentsCreateRoleAssignmentResponse = RoleAssignmentDetails & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: RoleAssignmentDetails;
  };
};

/**
 * Contains response data for the getRoleAssignmentById operation.
 */
export type RoleAssignmentsGetRoleAssignmentByIdResponse = RoleAssignmentDetails & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: RoleAssignmentDetails;
  };
};

/**
 * Optional parameters.
 */
export interface RoleAssignmentsDeleteRoleAssignmentByIdOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Scope of the Synapse Built-in Role.
   */
  scope?: string;
}

/**
 * Optional parameters.
 */
export interface SynapseAccessControlOptionalParams
  extends coreHttp.ServiceClientOptions {
  /**
   * Api Version
   */
  apiVersion?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  TokenCredential,
  createPipelineFromOptions,
  bearerTokenAuthenticationPolicy
} from "@azure/core-http";

import { SynapseAccessControl } from "./generated";
import { logger } from "./logger";
import { DEFAULT_SYNAPSE_SCOPE, SDK_VERSION } from "./constants";
import { createSpan, getCanonicalCode } from "./tracing";

import {
  SubjectInfo,
  Action,
  CheckPrincipalAccessResponse,
  CheckPrincipalAccessOptions,
  OperationResponse,
  DeleteRoleAssignmentByIdOptions,
  RoleAssignmentDetailsList,
  GetRoleDefinitionOptions,
  ListRoleAssignmentsOptions,
  CreateRoleAssignmentOptions,
  AccesscontrolClientOptions,
  ListRoleDefinitionOptions,
  ListScopesOptions,
  attachHttpResponse,
  WithResponse,
  SynapseRoleDefinition,
  RoleAssignmentDetails,
  GetRoleAssignmentOptions
} from "./models";

export class AccessControlClient {
  /**
   * @internal
   * @ignore
   * A reference to the auto-generated synapse accesscontrol HTTP client.
   */
  private readonly client: SynapseAccessControl;

  /**
   * Creates an instance of AccessControlClient.
   *
   * Example usage:
   * ```ts
   * import { AccessControlClient } from "@azure/synapse-accesscontrol";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * let workspaceEndpoint = `https://<workspacename>.dev.azuresynapse.net`;
   * let credentials = new DefaultAzureCredential();
   *
   * let client = new AccessControlClient(vaultUrl, credentials);
   * ```
   * @param {string} workspaceEndpoint the base URL to the workspace.
   * @param {TokenCredential} credential An object that implements the `TokenCredential` interface used to authenticate requests to the service. Use the @azure/identity package to create a credential that suits your needs.
   * @param {PipelineOptions} [pipelineOptions] Optional. Pipeline options used to configure workspace API requests.
   *                                                         Omit this parameter to use the default pipeline configuration.
   * @memberof AccessControlClient
   */
  constructor(
    workspaceEndpoint: string,
    credential: TokenCredential,
    pipelineOptions: AccesscontrolClientOptions = {
      apiVersion: "2020-08-01-preview"
    }
  ) {
    const libInfo = `azsdk-js-synapse-accesscontrol/${SDK_VERSION}`;

    const userAgentOptions = pipelineOptions.userAgentOptions;

    pipelineOptions.userAgentOptions = {
      ...pipelineOptions.userAgentOptions,
      userAgentPrefix:
        userAgentOptions && userAgentOptions.userAgentPrefix
          ? `${userAgentOptions.userAgentPrefix} ${libInfo}`
          : libInfo
    };

    const authPolicy = bearerTokenAuthenticationPolicy(credential, DEFAULT_SYNAPSE_SCOPE);

    const internalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);

    this.client = new SynapseAccessControl(credential, workspaceEndpoint, pipeline);
  }

  /**
   * Get role by role Id.
   * @param roleId Synapse Built-In Role Id.
   * @param options The options parameters.
   */
  public async getRoleDefinitionById(
    roleId: string,
    options: GetRoleDefinitionOptions = {}
  ): Promise<WithResponse<SynapseRoleDefinition>> {
    const { span, updatedOptions } = createSpan("Synapse-GetRoleDefinition", options);
    try {
      const response = await this.client.roleDefinitions.getRoleDefinitionById(
        roleId,
        updatedOptions
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * List roles.
   * @param options The options parameters.
   */
  public async listRoleDefinitions(
    options: ListRoleDefinitionOptions = {}
  ): Promise<WithResponse<SynapseRoleDefinition[]>> {
    const { span, updatedOptions } = createSpan("Synapse-ListRoleDefinition", options);
    try {
      const response = await this.client.roleDefinitions.listRoleDefinitions(updatedOptions);
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * List rbac scopes.
   * @param options The options parameters.
   */
  public async listScopes(options: ListScopesOptions = {}): Promise<WithResponse<string[]>> {
    const { span, updatedOptions } = createSpan("Synapse-listScopes", options);
    try {
      const response = await this.client.roleDefinitions.listScopes(updatedOptions);
      return attachHttpResponse(response._response.parsedBody, response._response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Create role assignment.
   * @param roleId Synapse Built-In Role Id.
   * @param principalId Object ID of the AAD principal or security-group
   * @param options The options parameters.
   */
  public async createRoleAssignment(
    roleAssignmentId: string,
    roleId: string,
    principalId: string,
    scope: string,
    options: CreateRoleAssignmentOptions = {}
  ): Promise<WithResponse<RoleAssignmentDetails>> {
    const { span, updatedOptions } = createSpan("Synapse-CreateRoleAssignment", options);
    try {
      const response = await this.client.roleAssignments.createRoleAssignment(
        roleAssignmentId,
        roleId,
        principalId,
        scope,
        updatedOptions
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * List role assignments.
   * @param roleId Synapse Built-In Role Id.
   * @param principalId Object ID of the AAD principal or security-group
   * @param options The options parameters.
   */
  public async listRoleAssignments(
    options: ListRoleAssignmentsOptions = {}
  ): Promise<WithResponse<RoleAssignmentDetailsList>> {
    const { span, updatedOptions } = createSpan("Synapse-ListRoleAssignments", options);
    try {
      const response = await this.client.roleAssignments.listRoleAssignments(updatedOptions);
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Get role assignment by role assignment Id.
   * @param roleAssignmentId The ID of the role assignment.
   * @param options The options parameters.
   */
  public async getRoleAssignmentById(
    roleAssignmentId: string,
    options: GetRoleAssignmentOptions = {}
  ): Promise<WithResponse<RoleAssignmentDetails>> {
    const { span, updatedOptions } = createSpan("Synapse-GetRoleAssignmentById", options);

    try {
      const response = await this.client.roleAssignments.getRoleAssignmentById(
        roleAssignmentId,
        updatedOptions
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Delete role assignment by role assignment Id.
   * @param roleAssignmentId The ID of the role assignment.
   * @param options The options parameters.
   */
  public async deleteRoleAssignmentById(
    roleAssignmentId: string,
    options: DeleteRoleAssignmentByIdOptions = {}
  ): Promise<OperationResponse> {
    const { span, updatedOptions } = createSpan("Synapse-DeleteRoleAssignmentById", options);

    try {
      const response = await this.client.roleAssignments.deleteRoleAssignmentById(
        roleAssignmentId,
        updatedOptions
      );
      return response;
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * List role assignments of the caller.
   * @param options The options parameters.
   */
  public async checkPrincipalAccess(
    subject: SubjectInfo,
    actions: Action[],
    scope: string,
    options: CheckPrincipalAccessOptions = {}
  ): Promise<WithResponse<CheckPrincipalAccessResponse>> {
    const { span, updatedOptions } = createSpan("Synapse-GetCallerRoleAssignments", options);

    try {
      const response = await this.client.checkPrincipalAccess(
        subject,
        actions,
        scope,
        updatedOptions
      );
      return response;
      //return attachHttpResponse(response._response.parsedBody, response._response);
    } catch (e) {
      span.setStatus({
        code: getCanonicalCode(e),
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

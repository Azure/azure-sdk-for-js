// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  TokenCredential,
  createPipelineFromOptions,
  bearerTokenAuthenticationPolicy,
  OperationOptions
} from "@azure/core-http";

import { SynapseAccessControl } from "./generated";
import { logger } from "./logger";
import { DEFAULT_SYNAPSE_SCOPE, SDK_VERSION } from "./constants";
import { createSpan, getCanonicalCode } from "./tracing";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

import {
  AccesscontrolClientOptions,
  attachHttpResponse,
  CreateRoleAssignmentOptions,
  DeleteRoleAssignmentOptions,
  GetCallerRoleAssignmentsOptions,
  GetRoleAssignmentOptions,
  GetRoleDefinitionOptions,
  ListPageSettings,
  ListRoleDefinitionOptions,
  OperationResponse,
  RoleAssignmentDetails,
  SynapseRole,
  WithResponse
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
    pipelineOptions: AccesscontrolClientOptions = {}
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
  ): Promise<WithResponse<SynapseRole>> {
    const { span, updatedOptions } = createSpan("Synapse-GetRoleDefinition", options);

    try {
      const response = await this.client.getRoleDefinitionById(roleId, updatedOptions);
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

  private async *listRoleDefinitionsPage(
    continuationState: ListPageSettings,
    options: ListRoleDefinitionOptions = {}
  ): AsyncIterableIterator<SynapseRole[]> {
    const requestOptions = options;
    if (!continuationState.continuationToken) {
      const currentSetResponse = await this.client.getRoleDefinitions(requestOptions);
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      }
    }

    while (continuationState.continuationToken) {
      const currentSetResponse = await this.client.getRoleDefinitionsNext(
        continuationState.continuationToken,
        requestOptions
      );
      continuationState.continuationToken = currentSetResponse.nextLink;
      if (currentSetResponse.value) {
        yield currentSetResponse.value;
      } else {
        break;
      }
    }
  }

  private async *listRoleDefinitionsAll(
    options: ListRoleDefinitionOptions
  ): AsyncIterableIterator<SynapseRole> {
    for await (const page of this.listRoleDefinitionsPage({}, options)) {
      yield* page;
    }
  }

  /**
   * List roles.
   * @param options The options parameters.
   */
  public listRoleDefinitions(
    options: ListRoleDefinitionOptions = {}
  ): PagedAsyncIterableIterator<SynapseRole> {
    const { span, updatedOptions } = createSpan("Synapse-ListRoleDefinition", options);
    try {
      const iter = this.listRoleDefinitionsAll(updatedOptions);
      return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: (settings: ListPageSettings = {}) => {
          return this.listRoleDefinitionsPage(settings, updatedOptions);
        }
      };
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
    roleId: string,
    principalId: string,
    options: CreateRoleAssignmentOptions = {}
  ): Promise<WithResponse<RoleAssignmentDetails>> {
    const { span, updatedOptions } = createSpan("Synapse-CreateRoleAssignment", options);

    try {
      const response = await this.client.createRoleAssignment(
        {
          roleId: roleId,
          principalId: principalId
        },
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
    roleId?: string,
    principalId?: string,
    options: OperationOptions = {}
  ): Promise<WithResponse<RoleAssignmentDetails[]>> {
    const internalOptions = {
      ...options,
      ...{
        roleOptions: {
          roleId: roleId,
          principalId: principalId
        }
      }
    };

    const { span, updatedOptions } = createSpan("Synapse-ListRoleAssignments", internalOptions);

    try {
      const response = await this.client.getRoleAssignments(updatedOptions);
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
      const response = await this.client.getRoleAssignmentById(roleAssignmentId, updatedOptions);
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
    options: DeleteRoleAssignmentOptions = {}
  ): Promise<OperationResponse> {
    const { span, updatedOptions } = createSpan("Synapse-DeleteRoleAssignmentById", options);

    try {
      const response = await this.client.deleteRoleAssignmentById(roleAssignmentId, updatedOptions);
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
  public async getCallerRoleAssignments(
    options: GetCallerRoleAssignmentsOptions = {}
  ): Promise<WithResponse<string[]>> {
    const { span, updatedOptions } = createSpan("Synapse-GetCallerRoleAssignments", options);

    try {
      const response = await this.client.getCallerRoleAssignments(updatedOptions);
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
}

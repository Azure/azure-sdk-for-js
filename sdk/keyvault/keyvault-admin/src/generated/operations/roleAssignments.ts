// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { KeyVaultClient } from "../keyVaultClient";
import {
  RoleAssignmentsDeleteResponse,
  RoleAssignmentCreateParameters,
  RoleAssignmentsCreateResponse,
  RoleAssignmentsGetResponse,
  RoleAssignmentsListForScopeOptionalParams,
  RoleAssignmentsListForScopeResponse,
  RoleAssignmentsListForScopeNextOptionalParams,
  RoleAssignmentsListForScopeNextResponse
} from "../models";

/**
 * Class representing a RoleAssignments.
 */
export class RoleAssignments {
  private readonly client: KeyVaultClient;

  /**
   * Initialize a new instance of the class RoleAssignments class.
   * @param client Reference to the service client
   */
  constructor(client: KeyVaultClient) {
    this.client = client;
  }

  /**
   * Deletes a role assignment.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param scope The scope of the role assignment to delete.
   * @param roleAssignmentName The name of the role assignment to delete.
   * @param options The options parameters.
   */
  delete(
    vaultBaseUrl: string,
    scope: string,
    roleAssignmentName: string,
    options?: coreHttp.OperationOptions
  ): Promise<RoleAssignmentsDeleteResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { vaultBaseUrl, scope, roleAssignmentName, options: operationOptions },
      deleteOperationSpec
    ) as Promise<RoleAssignmentsDeleteResponse>;
  }

  /**
   * Creates a role assignment.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param scope The scope of the role assignment to create.
   * @param roleAssignmentName The name of the role assignment to create. It can be any valid GUID.
   * @param parameters Parameters for the role assignment.
   * @param options The options parameters.
   */
  create(
    vaultBaseUrl: string,
    scope: string,
    roleAssignmentName: string,
    parameters: RoleAssignmentCreateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<RoleAssignmentsCreateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        vaultBaseUrl,
        scope,
        roleAssignmentName,
        parameters,
        options: operationOptions
      },
      createOperationSpec
    ) as Promise<RoleAssignmentsCreateResponse>;
  }

  /**
   * Get the specified role assignment.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param scope The scope of the role assignment.
   * @param roleAssignmentName The name of the role assignment to get.
   * @param options The options parameters.
   */
  get(
    vaultBaseUrl: string,
    scope: string,
    roleAssignmentName: string,
    options?: coreHttp.OperationOptions
  ): Promise<RoleAssignmentsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { vaultBaseUrl, scope, roleAssignmentName, options: operationOptions },
      getOperationSpec
    ) as Promise<RoleAssignmentsGetResponse>;
  }

  /**
   * Gets role assignments for a scope.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param scope The scope of the role assignments.
   * @param options The options parameters.
   */
  listForScope(
    vaultBaseUrl: string,
    scope: string,
    options?: RoleAssignmentsListForScopeOptionalParams
  ): Promise<RoleAssignmentsListForScopeResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { vaultBaseUrl, scope, options: operationOptions },
      listForScopeOperationSpec
    ) as Promise<RoleAssignmentsListForScopeResponse>;
  }

  /**
   * ListForScopeNext
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param scope The scope of the role assignments.
   * @param nextLink The nextLink from the previous successful call to the ListForScope method.
   * @param options The options parameters.
   */
  listForScopeNext(
    vaultBaseUrl: string,
    scope: string,
    nextLink: string,
    options?: RoleAssignmentsListForScopeNextOptionalParams
  ): Promise<RoleAssignmentsListForScopeNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { vaultBaseUrl, scope, nextLink, options: operationOptions },
      listForScopeNextOperationSpec
    ) as Promise<RoleAssignmentsListForScopeNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/{scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      bodyMapper: Mappers.RoleAssignment
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.scope,
    Parameters.roleAssignmentName
  ],
  serializer
};
const createOperationSpec: coreHttp.OperationSpec = {
  path:
    "/{scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}",
  httpMethod: "PUT",
  responses: {
    201: {
      bodyMapper: Mappers.RoleAssignment
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.scope,
    Parameters.roleAssignmentName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/{scope}/providers/Microsoft.Authorization/roleAssignments/{roleAssignmentName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RoleAssignment
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.scope,
    Parameters.roleAssignmentName
  ],
  serializer
};
const listForScopeOperationSpec: coreHttp.OperationSpec = {
  path: "/{scope}/providers/Microsoft.Authorization/roleAssignments",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RoleAssignmentListResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.filter, Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.scope],
  serializer
};
const listForScopeNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RoleAssignmentListResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.filter, Parameters.apiVersion],
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.scope,
    Parameters.nextLink
  ],
  serializer
};

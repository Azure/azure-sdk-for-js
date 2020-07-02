// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { KeyVaultClient } from "../keyVaultClient";
import {
  RoleDefinitionsListOptionalParams,
  RoleDefinitionsListResponse,
  RoleDefinitionsListNextOptionalParams,
  RoleDefinitionsListNextResponse
} from "../models";

/**
 * Class representing a RoleDefinitions.
 */
export class RoleDefinitions {
  private readonly client: KeyVaultClient;

  /**
   * Initialize a new instance of the class RoleDefinitions class.
   * @param client Reference to the service client
   */
  constructor(client: KeyVaultClient) {
    this.client = client;
  }

  /**
   * Get all role definitions that are applicable at scope and above.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param scope The scope of the role definition.
   * @param options The options parameters.
   */
  list(
    vaultBaseUrl: string,
    scope: string,
    options?: RoleDefinitionsListOptionalParams
  ): Promise<RoleDefinitionsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { vaultBaseUrl, scope, options: operationOptions },
      listOperationSpec
    ) as Promise<RoleDefinitionsListResponse>;
  }

  /**
   * ListNext
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param scope The scope of the role definition.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    vaultBaseUrl: string,
    scope: string,
    nextLink: string,
    options?: RoleDefinitionsListNextOptionalParams
  ): Promise<RoleDefinitionsListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { vaultBaseUrl, scope, nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<RoleDefinitionsListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path: "/{scope}/providers/Microsoft.Authorization/roleDefinitions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RoleDefinitionListResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.filter, Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.scope],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RoleDefinitionListResult
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

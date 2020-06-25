// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import * as operations from "./operations";
import * as Parameters from "./models/parameters";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { KeyVaultClientContext } from "./keyVaultClientContext";
import {
  KeyVaultClientOptionalParams,
  KeyVaultClientFullBackupOptionalParams,
  KeyVaultClientFullBackupResponse,
  KeyVaultClientFullBackupStatusResponse,
  KeyVaultClientFullRestoreOperationOptionalParams,
  KeyVaultClientFullRestoreOperationResponse,
  KeyVaultClientFullRestoreStatusResponse,
  KeyVaultClientSelectiveKeyRestoreOperationOptionalParams,
  KeyVaultClientSelectiveKeyRestoreOperationResponse
} from "./models";

class KeyVaultClient extends KeyVaultClientContext {
  /**
   * Initializes a new instance of the KeyVaultClient class.
   * @param options The parameter options
   */
  constructor(options?: KeyVaultClientOptionalParams) {
    super(options);
    this.roleDefinitions = new operations.RoleDefinitions(this);
    this.roleAssignments = new operations.RoleAssignments(this);
  }

  /**
   * Creates a full backup using a user-provided SAS token to an Azure blob storage container.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param options The options parameters.
   */
  fullBackup(
    vaultBaseUrl: string,
    options?: KeyVaultClientFullBackupOptionalParams
  ): Promise<KeyVaultClientFullBackupResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, options: operationOptions },
      fullBackupOperationSpec
    ) as Promise<KeyVaultClientFullBackupResponse>;
  }

  /**
   * Returns the status of full backup operation
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param jobId The id returned as part of the backup request
   * @param options The options parameters.
   */
  fullBackupStatus(
    vaultBaseUrl: string,
    jobId: string,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientFullBackupStatusResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, jobId, options: operationOptions },
      fullBackupStatusOperationSpec
    ) as Promise<KeyVaultClientFullBackupStatusResponse>;
  }

  /**
   * Restores all key materials using the SAS token pointing to a previously stored Azure Blob storage
   * backup folder
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param options The options parameters.
   */
  fullRestoreOperation(
    vaultBaseUrl: string,
    options?: KeyVaultClientFullRestoreOperationOptionalParams
  ): Promise<KeyVaultClientFullRestoreOperationResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, options: operationOptions },
      fullRestoreOperationOperationSpec
    ) as Promise<KeyVaultClientFullRestoreOperationResponse>;
  }

  /**
   * Returns the status of full restore operation
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param jobId The Job Id returned part of the full restore operation
   * @param options The options parameters.
   */
  fullRestoreStatus(
    vaultBaseUrl: string,
    jobId: string,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientFullRestoreStatusResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, jobId, options: operationOptions },
      fullRestoreStatusOperationSpec
    ) as Promise<KeyVaultClientFullRestoreStatusResponse>;
  }

  /**
   * Restores all key versions of a given key using user supplied SAS token pointing to a previously
   * stored Azure Blob storage backup folder
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key to be restored from the user supplied backup
   * @param options The options parameters.
   */
  selectiveKeyRestoreOperation(
    vaultBaseUrl: string,
    keyName: string,
    options?: KeyVaultClientSelectiveKeyRestoreOperationOptionalParams
  ): Promise<KeyVaultClientSelectiveKeyRestoreOperationResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, keyName, options: operationOptions },
      selectiveKeyRestoreOperationOperationSpec
    ) as Promise<KeyVaultClientSelectiveKeyRestoreOperationResponse>;
  }

  roleDefinitions: operations.RoleDefinitions;
  roleAssignments: operations.RoleAssignments;
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const fullBackupOperationSpec: coreHttp.OperationSpec = {
  path: "/backup",
  httpMethod: "POST",
  responses: {
    202: {
      bodyMapper: Mappers.FullBackupOperation,
      headersMapper: Mappers.KeyVaultClientFullBackupHeaders
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.azureStorageBlobContainerUri,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const fullBackupStatusOperationSpec: coreHttp.OperationSpec = {
  path: "/backup/{jobId}/pending",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FullBackupOperation
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.jobId],
  serializer
};
const fullRestoreOperationOperationSpec: coreHttp.OperationSpec = {
  path: "/restore",
  httpMethod: "PUT",
  responses: {
    202: {
      bodyMapper: Mappers.FullRestoreOperation,
      headersMapper: Mappers.KeyVaultClientFullRestoreOperationHeaders
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.restoreBlobDetails,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const fullRestoreStatusOperationSpec: coreHttp.OperationSpec = {
  path: "/restore/{jobId}/pending",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FullRestoreOperation
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.jobId],
  serializer
};
const selectiveKeyRestoreOperationOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{keyName}/restore",
  httpMethod: "PUT",
  responses: {
    202: {
      bodyMapper: Mappers.SelectiveKeyRestoreOperation,
      headersMapper: Mappers.KeyVaultClientSelectiveKeyRestoreOperationHeaders
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.restoreBlobDetails1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.keyName],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};

// Operation Specifications

export {
  KeyVaultClient,
  KeyVaultClientContext,
  Models as KeyVaultModels,
  Mappers as KeyVaultMappers
};
export * from "./operations";

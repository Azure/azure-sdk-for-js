// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  getCredentials,
  pendingUpload,
  create,
  update,
  $delete,
  get,
  list,
  listVersions,
} from "../../../api/beta/models/operations.js";
import type {
  BetaModelsGetCredentialsOptionalParams,
  BetaModelsPendingUploadOptionalParams,
  BetaModelsCreateAsyncOptionalParams,
  BetaModelsUpdateOptionalParams,
  BetaModelsDeleteOptionalParams,
  BetaModelsGetOptionalParams,
  BetaModelsListOptionalParams,
  BetaModelsListVersionsOptionalParams,
} from "../../../api/beta/models/options.js";
import type {
  DatasetCredential,
  ModelVersion,
  UpdateModelVersionRequest,
  ModelPendingUploadRequest,
  ModelPendingUploadResponse,
  ModelCredentialRequest,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a BetaModels operations. */
export interface BetaModelsOperations {
  /** Get credentials for a model version asset. */
  getCredentials: (
    name: string,
    version: string,
    body: ModelCredentialRequest,
    options?: BetaModelsGetCredentialsOptionalParams,
  ) => Promise<DatasetCredential>;
  /** Start or retrieve a pending upload for a model version. */
  pendingUpload: (
    name: string,
    version: string,
    body: ModelPendingUploadRequest,
    options?: BetaModelsPendingUploadOptionalParams,
  ) => Promise<ModelPendingUploadResponse>;
  /** Creates a model version asynchronously with blob content validation. Returns 202 Accepted with a Location header for polling. */
  create: (
    name: string,
    version: string,
    body: ModelVersion,
    options?: BetaModelsCreateAsyncOptionalParams,
  ) => Promise<{
    location?: string;
    operationResult?: string | null;
  }>;
  /** Update an existing ModelVersion with the given version id */
  update: (
    name: string,
    body: UpdateModelVersionRequest,
    version: string,
    options?: BetaModelsUpdateOptionalParams,
  ) => Promise<ModelVersion>;
  /** Delete the specific version of the ModelVersion. The service returns 204 No Content if the ModelVersion was deleted successfully or if the ModelVersion does not exist. */
  delete: (
    name: string,
    version: string,
    options?: BetaModelsDeleteOptionalParams,
  ) => Promise<void>;
  /** Get the specific version of the ModelVersion. The service returns 404 Not Found error if the ModelVersion does not exist. */
  get: (
    name: string,
    version: string,
    options?: BetaModelsGetOptionalParams,
  ) => Promise<ModelVersion>;
  /** List the latest version of each ModelVersion */
  list: (options?: BetaModelsListOptionalParams) => PagedAsyncIterableIterator<ModelVersion>;
  /** List all versions of the given ModelVersion */
  listVersions: (
    name: string,
    options?: BetaModelsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<ModelVersion>;
}

function _getBetaModels(context: AIProjectContext) {
  return {
    getCredentials: (
      name: string,
      version: string,
      body: ModelCredentialRequest,
      options?: BetaModelsGetCredentialsOptionalParams,
    ) => getCredentials(context, name, version, body, options),
    pendingUpload: (
      name: string,
      version: string,
      body: ModelPendingUploadRequest,
      options?: BetaModelsPendingUploadOptionalParams,
    ) => pendingUpload(context, name, version, body, options),
    create: (
      name: string,
      version: string,
      body: ModelVersion,
      options?: BetaModelsCreateAsyncOptionalParams,
    ) => create(context, name, version, body, options),
    update: (
      name: string,
      body: UpdateModelVersionRequest,
      version: string,
      options?: BetaModelsUpdateOptionalParams,
    ) => update(context, name, body, version, options),
    delete: (name: string, version: string, options?: BetaModelsDeleteOptionalParams) =>
      $delete(context, name, version, options),
    get: (name: string, version: string, options?: BetaModelsGetOptionalParams) =>
      get(context, name, version, options),
    list: (options?: BetaModelsListOptionalParams) => list(context, options),
    listVersions: (name: string, options?: BetaModelsListVersionsOptionalParams) =>
      listVersions(context, name, options),
  };
}

export function _getBetaModelsOperations(context: AIProjectContext): BetaModelsOperations {
  return {
    ..._getBetaModels(context),
  };
}

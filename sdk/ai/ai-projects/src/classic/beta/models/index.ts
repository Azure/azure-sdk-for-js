// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  getCredentials,
  pendingUpload,
  createFromSource,
  update,
  $delete,
  get,
  list,
  listVersions,
} from "../../../api/beta/models/operations.js";
import type { BetaModelsCreateFromSourceOptions } from "../../../api/beta/models/options.js";
import type {
  BetaModelsGetCredentialsOptionalParams,
  BetaModelsPendingUploadOptionalParams,
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

export type { BetaModelsCreateFromSourceOptions as BetaModelsCreateOptions };

/** Interface representing a BetaModels operations. */
export interface BetaModelsOperations {
  /** Retrieves temporary credentials for accessing the storage backing the specified model version. */
  getCredentials: (
    name: string,
    version: string,
    credentialRequest: ModelCredentialRequest,
    options?: BetaModelsGetCredentialsOptionalParams,
  ) => Promise<DatasetCredential>;
  /** Initiates a new pending upload or retrieves an existing one for the specified model version. */
  pendingUpload: (
    name: string,
    version: string,
    pendingUploadRequest: ModelPendingUploadRequest,
    options?: BetaModelsPendingUploadOptionalParams,
  ) => Promise<ModelPendingUploadResponse>;
  /** Upload local model files and register a model version. Wraps pendingUpload, file upload, async creation, and polling into a single call. */
  create: (
    name: string,
    version: string,
    source: string,
    options?: BetaModelsCreateFromSourceOptions,
  ) => Promise<ModelVersion>;
  /** Update an existing ModelVersion with the given version id */
  update: (
    name: string,
    modelVersionUpdate: UpdateModelVersionRequest,
    version: string,
    options?: BetaModelsUpdateOptionalParams,
  ) => Promise<ModelVersion>;
  /** Delete the specific version of the ModelVersion. The service returns 200 OK if the ModelVersion was deleted successfully or if the ModelVersion does not exist. */
  delete: (
    name: string,
    version: string,
    options?: BetaModelsDeleteOptionalParams,
  ) => Promise<void>;
  /** Retrieves the specified model version, returning 404 if it does not exist. */
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
      credentialRequest: ModelCredentialRequest,
      options?: BetaModelsGetCredentialsOptionalParams,
    ) => getCredentials(context, name, version, credentialRequest, options),
    pendingUpload: (
      name: string,
      version: string,
      pendingUploadRequest: ModelPendingUploadRequest,
      options?: BetaModelsPendingUploadOptionalParams,
    ) => pendingUpload(context, name, version, pendingUploadRequest, options),
    create: (
      name: string,
      version: string,
      source: string,
      options?: BetaModelsCreateFromSourceOptions,
    ) => createFromSource(context, name, version, source, options),
    update: (
      name: string,
      modelVersionUpdate: UpdateModelVersionRequest,
      version: string,
      options?: BetaModelsUpdateOptionalParams,
    ) => update(context, name, modelVersionUpdate, version, options),
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

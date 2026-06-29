// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  getCredentials,
  pendingUpload,
  pendingCreateVersion,
  update,
  $delete,
  get,
  list,
  listVersions,
} from "../../../api/beta/models/operations.js";
import {
  BetaModelsGetCredentialsOptionalParams,
  BetaModelsPendingUploadOptionalParams,
  BetaModelsPendingCreateVersionOptionalParams,
  BetaModelsUpdateOptionalParams,
  BetaModelsDeleteOptionalParams,
  BetaModelsGetOptionalParams,
  BetaModelsListOptionalParams,
  BetaModelsListVersionsOptionalParams,
} from "../../../api/beta/models/options.js";
import {
  DatasetCredential,
  ModelVersion,
  UpdateModelVersionRequest,
  ModelPendingUploadRequest,
  ModelPendingUploadResponse,
  ModelCredentialRequest,
} from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaModels operations. */
export interface BetaModelsOperations {
  /** Retrieves temporary credentials for accessing the storage backing the specified model version. */
  getCredentials: (
    foundryFeatures: "Models=V1Preview",
    name: string,
    version: string,
    credentialRequest: ModelCredentialRequest,
    options?: BetaModelsGetCredentialsOptionalParams,
  ) => Promise<DatasetCredential>;
  /** Initiates a new pending upload or retrieves an existing one for the specified model version. */
  pendingUpload: (
    foundryFeatures: "Models=V1Preview",
    name: string,
    version: string,
    pendingUploadRequest: ModelPendingUploadRequest,
    options?: BetaModelsPendingUploadOptionalParams,
  ) => Promise<ModelPendingUploadResponse>;
  /** Creates a model version asynchronously with blob content validation. Returns 202 Accepted with a location header for polling the operation status. */
  pendingCreateVersion: (
    foundryFeatures: "Models=V1Preview",
    name: string,
    version: string,
    modelVersion: ModelVersion,
    options?: BetaModelsPendingCreateVersionOptionalParams,
  ) => Promise<{
    location?: string;
    operationResult?: string | null;
  }>;
  /** Update an existing ModelVersion with the given version id */
  update: (
    name: string,
    modelVersionUpdate: UpdateModelVersionRequest,
    version: string,
    foundryFeatures: "Models=V1Preview",
    options?: BetaModelsUpdateOptionalParams,
  ) => Promise<ModelVersion>;
  /** Delete the specific version of the ModelVersion. The service returns 200 OK if the ModelVersion was deleted successfully or if the ModelVersion does not exist. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    name: string,
    foundryFeatures: "Models=V1Preview",
    version: string,
    options?: BetaModelsDeleteOptionalParams,
  ) => Promise<void>;
  /** Retrieves the specified model version, returning 404 if it does not exist. */
  get: (
    name: string,
    foundryFeatures: "Models=V1Preview",
    version: string,
    options?: BetaModelsGetOptionalParams,
  ) => Promise<ModelVersion>;
  /** List the latest version of each ModelVersion */
  list: (
    foundryFeatures: "Models=V1Preview",
    options?: BetaModelsListOptionalParams,
  ) => PagedAsyncIterableIterator<ModelVersion>;
  /** List all versions of the given ModelVersion */
  listVersions: (
    name: string,
    foundryFeatures: "Models=V1Preview",
    options?: BetaModelsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<ModelVersion>;
}

function _getBetaModels(context: AIProjectContext) {
  return {
    getCredentials: (
      foundryFeatures: "Models=V1Preview",
      name: string,
      version: string,
      credentialRequest: ModelCredentialRequest,
      options?: BetaModelsGetCredentialsOptionalParams,
    ) => getCredentials(context, foundryFeatures, name, version, credentialRequest, options),
    pendingUpload: (
      foundryFeatures: "Models=V1Preview",
      name: string,
      version: string,
      pendingUploadRequest: ModelPendingUploadRequest,
      options?: BetaModelsPendingUploadOptionalParams,
    ) => pendingUpload(context, foundryFeatures, name, version, pendingUploadRequest, options),
    pendingCreateVersion: (
      foundryFeatures: "Models=V1Preview",
      name: string,
      version: string,
      modelVersion: ModelVersion,
      options?: BetaModelsPendingCreateVersionOptionalParams,
    ) => pendingCreateVersion(context, foundryFeatures, name, version, modelVersion, options),
    update: (
      name: string,
      modelVersionUpdate: UpdateModelVersionRequest,
      version: string,
      foundryFeatures: "Models=V1Preview",
      options?: BetaModelsUpdateOptionalParams,
    ) => update(context, name, modelVersionUpdate, version, foundryFeatures, options),
    delete: (
      name: string,
      foundryFeatures: "Models=V1Preview",
      version: string,
      options?: BetaModelsDeleteOptionalParams,
    ) => $delete(context, name, foundryFeatures, version, options),
    get: (
      name: string,
      foundryFeatures: "Models=V1Preview",
      version: string,
      options?: BetaModelsGetOptionalParams,
    ) => get(context, name, foundryFeatures, version, options),
    list: (foundryFeatures: "Models=V1Preview", options?: BetaModelsListOptionalParams) =>
      list(context, foundryFeatures, options),
    listVersions: (
      name: string,
      foundryFeatures: "Models=V1Preview",
      options?: BetaModelsListVersionsOptionalParams,
    ) => listVersions(context, name, foundryFeatures, options),
  };
}

export function _getBetaModelsOperations(context: AIProjectContext): BetaModelsOperations {
  return {
    ..._getBetaModels(context),
  };
}

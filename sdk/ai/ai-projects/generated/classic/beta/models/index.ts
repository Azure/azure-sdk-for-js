// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  getCredentials,
  pendingUpload,
  createAsync,
  update,
  $delete,
  get,
  list,
  listVersions,
} from "../../../api/beta/models/operations.js";
import {
  BetaModelsGetCredentialsOptionalParams,
  BetaModelsPendingUploadOptionalParams,
  BetaModelsCreateAsyncOptionalParams,
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
  /** Get credentials for a model version asset. */
  getCredentials: (
    foundryFeatures: "Models=V1Preview",
    name: string,
    version: string,
    body: ModelCredentialRequest,
    options?: BetaModelsGetCredentialsOptionalParams,
  ) => Promise<DatasetCredential>;
  /** Start or retrieve a pending upload for a model version. */
  pendingUpload: (
    foundryFeatures: "Models=V1Preview",
    name: string,
    version: string,
    body: ModelPendingUploadRequest,
    options?: BetaModelsPendingUploadOptionalParams,
  ) => Promise<ModelPendingUploadResponse>;
  /** Creates a model version asynchronously with blob content validation. Returns 202 Accepted with a Location header for polling. */
  createAsync: (
    foundryFeatures: "Models=V1Preview",
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
  /** Get the specific version of the ModelVersion. The service returns 404 Not Found error if the ModelVersion does not exist. */
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
      body: ModelCredentialRequest,
      options?: BetaModelsGetCredentialsOptionalParams,
    ) => getCredentials(context, foundryFeatures, name, version, body, options),
    pendingUpload: (
      foundryFeatures: "Models=V1Preview",
      name: string,
      version: string,
      body: ModelPendingUploadRequest,
      options?: BetaModelsPendingUploadOptionalParams,
    ) => pendingUpload(context, foundryFeatures, name, version, body, options),
    createAsync: (
      foundryFeatures: "Models=V1Preview",
      name: string,
      version: string,
      body: ModelVersion,
      options?: BetaModelsCreateAsyncOptionalParams,
    ) => createAsync(context, foundryFeatures, name, version, body, options),
    update: (
      name: string,
      body: UpdateModelVersionRequest,
      version: string,
      foundryFeatures: "Models=V1Preview",
      options?: BetaModelsUpdateOptionalParams,
    ) => update(context, name, body, version, foundryFeatures, options),
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

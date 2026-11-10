// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import type { PendingUploadRequest, PendingUploadResponse, DatasetCredential, EvaluatorCredentialRequest, EvaluatorDiagnosticUnion } from "../../../models/models.js";
import type { BetaEvaluatorsGetCredentialsOptionalParams, BetaEvaluatorsPendingUploadOptionalParams, BetaEvaluatorsListDiagnosticsOptionalParams } from "../../../api/beta/evaluators/options.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { getCredentials, pendingUpload, listDiagnostics } from "../../../api/beta/evaluators/operations.js";

/** Operations for BetaEvaluatorsOperations. */
export interface BetaEvaluatorsOperations {
/** Retrieves SAS credentials for accessing the storage account associated with the specified evaluator version. */
getCredentials: (name: string, credentialRequest: EvaluatorCredentialRequest, version: string, options?: BetaEvaluatorsGetCredentialsOptionalParams) => Promise<DatasetCredential>;
/** Initiates a new pending upload or retrieves an existing one for the specified evaluator version. */
pendingUpload: (name: string, version: string, pendingUploadRequest: PendingUploadRequest, options?: BetaEvaluatorsPendingUploadOptionalParams) => Promise<PendingUploadResponse>;
/**
   * Returns immutable publication lineage for the specified evaluator.
   *
   * Time, evaluator-version, dimension, and type filters are intersected.
   * Returns recorded changes from completed evaluator version writes.
   * Historical backfill and diagnostic calculation jobs are not included.
   */
listDiagnostics: (name: string, options?: BetaEvaluatorsListDiagnosticsOptionalParams) => PagedAsyncIterableIterator<EvaluatorDiagnosticUnion>;
}

export function _getBetaEvaluatorsOperations(context: AIProjectContext): BetaEvaluatorsOperations {
return {getCredentials: (name: string, credentialRequest: EvaluatorCredentialRequest, version: string, options?: BetaEvaluatorsGetCredentialsOptionalParams) => getCredentials(context, name, credentialRequest, version, options),
pendingUpload: (name: string, version: string, pendingUploadRequest: PendingUploadRequest, options?: BetaEvaluatorsPendingUploadOptionalParams) => pendingUpload(context, name, version, pendingUploadRequest, options),
listDiagnostics: (name: string, options?: BetaEvaluatorsListDiagnosticsOptionalParams) => listDiagnostics(context, name, options)};
}

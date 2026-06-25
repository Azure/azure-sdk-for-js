// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactContext } from "../../api/impactContext.js";
import { getUploadToken } from "../../api/uploadService/operations.js";
import { UploadServiceGetUploadTokenOptionalParams } from "../../api/uploadService/options.js";
import { UploadTokenResult } from "../../models/models.js";

/** Interface representing a UploadService operations. */
export interface UploadServiceOperations {
  /** Only for select HPC customers at this time, who can use this POST endpoint to trigger an action, where the UserRP/AzImpactRP service creates and returns a user-delegate SAS token for the storage account/container unique to the customer (identified by subscription ID). */
  getUploadToken: (
    options?: UploadServiceGetUploadTokenOptionalParams,
  ) => Promise<UploadTokenResult>;
}

function _getUploadService(context: ImpactContext) {
  return {
    getUploadToken: (options?: UploadServiceGetUploadTokenOptionalParams) =>
      getUploadToken(context, options),
  };
}

export function _getUploadServiceOperations(context: ImpactContext): UploadServiceOperations {
  return {
    ..._getUploadService(context),
  };
}

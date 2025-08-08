// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { get } from "../../api/attestationStatuses/operations.js";
import { AttestationStatusesGetOptionalParams } from "../../api/attestationStatuses/options.js";
import { AttestationStatus } from "../../models/models.js";

/** Interface representing a AttestationStatuses operations. */
export interface AttestationStatusesOperations {
  /** Implements AttestationStatus GET method. */
  get: (
    resourceUri: string,
    options?: AttestationStatusesGetOptionalParams,
  ) => Promise<AttestationStatus>;
}

function _getAttestationStatuses(context: AzureStackHCIContext) {
  return {
    get: (resourceUri: string, options?: AttestationStatusesGetOptionalParams) =>
      get(context, resourceUri, options),
  };
}

export function _getAttestationStatusesOperations(
  context: AzureStackHCIContext,
): AttestationStatusesOperations {
  return {
    ..._getAttestationStatuses(context),
  };
}

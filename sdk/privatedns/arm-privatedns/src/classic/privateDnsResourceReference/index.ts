// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateDnsManagementContext } from "../../api/privateDnsManagementContext.js";
import { getByTargetResources } from "../../api/privateDnsResourceReference/operations.js";
import type { PrivateDnsResourceReferenceGetByTargetResourcesOptionalParams } from "../../api/privateDnsResourceReference/options.js";
import type {
  PrivateDnsResourceReferenceRequest,
  PrivateDnsResourceReferenceResult,
} from "../../models/models.js";

/** Interface representing a PrivateDnsResourceReference operations. */
export interface PrivateDnsResourceReferenceOperations {
  /** Returns the private DNS zone records specified by the referencing targetResourceIds. */
  getByTargetResources: (
    parameters: PrivateDnsResourceReferenceRequest,
    options?: PrivateDnsResourceReferenceGetByTargetResourcesOptionalParams,
  ) => Promise<PrivateDnsResourceReferenceResult>;
}

function _getPrivateDnsResourceReference(context: PrivateDnsManagementContext) {
  return {
    getByTargetResources: (
      parameters: PrivateDnsResourceReferenceRequest,
      options?: PrivateDnsResourceReferenceGetByTargetResourcesOptionalParams,
    ) => getByTargetResources(context, parameters, options),
  };
}

export function _getPrivateDnsResourceReferenceOperations(
  context: PrivateDnsManagementContext,
): PrivateDnsResourceReferenceOperations {
  return {
    ..._getPrivateDnsResourceReference(context),
  };
}

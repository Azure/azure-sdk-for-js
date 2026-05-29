// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DnsManagementContext } from "../../api/dnsManagementContext.js";
import { getByTargetResources } from "../../api/dnsResourceReference/operations.js";
import { DnsResourceReferenceGetByTargetResourcesOptionalParams } from "../../api/dnsResourceReference/options.js";
import { DnsResourceReferenceRequest, DnsResourceReferenceResult } from "../../models/models.js";

/** Interface representing a DnsResourceReference operations. */
export interface DnsResourceReferenceOperations {
  /** Returns the DNS records specified by the referencing targetResourceIds. */
  getByTargetResources: (
    parameters: DnsResourceReferenceRequest,
    options?: DnsResourceReferenceGetByTargetResourcesOptionalParams,
  ) => Promise<DnsResourceReferenceResult>;
}

function _getDnsResourceReference(context: DnsManagementContext) {
  return {
    getByTargetResources: (
      parameters: DnsResourceReferenceRequest,
      options?: DnsResourceReferenceGetByTargetResourcesOptionalParams,
    ) => getByTargetResources(context, parameters, options),
  };
}

export function _getDnsResourceReferenceOperations(
  context: DnsManagementContext,
): DnsResourceReferenceOperations {
  return {
    ..._getDnsResourceReference(context),
  };
}

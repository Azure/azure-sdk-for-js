// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkContext } from "../../api/networkContext.js";
import { DnsResourceReferenceRequest, DnsResourceReferenceResult } from "../../models/models.js";
import { DnsResourceReferenceGetByTargetResourcesOptionalParams } from "../../api/dnsResourceReference/options.js";
import { getByTargetResources } from "../../api/dnsResourceReference/operations.js";

/** Interface representing a DnsResourceReference operations. */
export interface DnsResourceReferenceOperations {
  /** Returns the DNS records specified by the referencing targetResourceIds. */
  getByTargetResources: (
    parameters: DnsResourceReferenceRequest,
    options?: DnsResourceReferenceGetByTargetResourcesOptionalParams,
  ) => Promise<DnsResourceReferenceResult>;
}

function _getDnsResourceReference(context: NetworkContext) {
  return {
    getByTargetResources: (
      parameters: DnsResourceReferenceRequest,
      options?: DnsResourceReferenceGetByTargetResourcesOptionalParams,
    ) => getByTargetResources(context, parameters, options),
  };
}

export function _getDnsResourceReferenceOperations(
  context: NetworkContext,
): DnsResourceReferenceOperations {
  return {
    ..._getDnsResourceReference(context),
  };
}

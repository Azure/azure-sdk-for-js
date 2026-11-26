// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext } from "../../api/networkSecurityManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/agentFabrics/operations.js";
import type {
  AgentFabricsListBySubscriptionOptionalParams,
  AgentFabricsListByResourceGroupOptionalParams,
  AgentFabricsDeleteOptionalParams,
  AgentFabricsUpdateOptionalParams,
  AgentFabricsCreateOrUpdateOptionalParams,
  AgentFabricsGetOptionalParams,
} from "../../api/agentFabrics/options.js";
import type {
  AgentFabric,
  AgentFabricTagsUpdate,
} from "../../models/microsoft/networkSecurity/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AgentFabrics operations. */
export interface AgentFabricsOperations {
  /** List AgentFabric resources by subscription ID */
  listBySubscription: (
    options?: AgentFabricsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<AgentFabric>;
  /** List AgentFabric resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: AgentFabricsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<AgentFabric>;
  /** Delete a AgentFabric */
  delete: (
    resourceGroupName: string,
    agentFabricName: string,
    options?: AgentFabricsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a AgentFabric */
  update: (
    resourceGroupName: string,
    agentFabricName: string,
    properties: AgentFabricTagsUpdate,
    options?: AgentFabricsUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentFabric>, AgentFabric>;
  /**
   * Creates or replaces an AgentFabric.
   *
   * Before accepting the request or changing policy-group associations, validate the policy
   * types in every proposed defaultPolicyGroups reference against the fabric's effective
   * inspection configuration. If no connection is configured and any referenced group contains a
   * ContentInspection policy, reject the request with HTTP 409 and error code
   * ContentInspectionCapabilityDisabled, targeting properties.defaultPolicyGroups. No incompatible
   * association change is accepted. This check does not depend on whether policy selectors
   * currently match traffic.
   *
   * Omitting contentInspectionProfile or supplying {} on PUT for an existing fabric preserves its
   * customer-owned connection, legacy regional connection, or absence of connection.
   * Do not persist {} over the stored connection or cancel a pending connection update.
   * New-fabric omission or {} requests no inspection capability and no regional fallback.
   * Existing legacy fabrics without a profile retain their regional Content Safety connection,
   * which satisfies the inspection prerequisite without new probes, management calls, or key
   * retrieval. A connection still being validated is not an absent connection.
   * Error messages must not disclose associated fabric IDs the caller is not authorized to read.
   *
   * If a connection update is in progress for this fabric, reject a PUT requesting a different
   * connection with HTTP 409 Conflict, without changing the connection update already in progress.
   * A retry of the same requested connection is not a conflicting change. This does not prevent
   * later key rotations or endpoint replacements.
   *
   * In API version `2026-10-07-preview` and later, reject definite invalid customer connection input before
   * accepting PUT with HTTP 400 Bad Request. A nonempty profile must contain both endpoint and apiKey.
   * Reject a missing field before connection validation, without retrieving a saved key or comparing
   * with the saved endpoint to permit key omission. Only a truly empty object is a connection no-op;
   * partial objects or objects containing only unrecognized fields must not be treated as empty.
   * Invalid input also includes a null or nonobject profile;
   * a malformed, untrusted, or unsupported endpoint (including a non-HTTPS or unrecognized Azure
   * account host or an unsupported cloud); and explicit null, empty, or wrong-type endpoint or key.
   * An endpoint without a key is invalid even when unchanged; a key without an endpoint is invalid.
   * An omitted profile or {} is not invalid connection input. Its no-op applies only to connection
   * handling; caller authorization, other Fabric fields, policy compatibility, and ordinary
   * pending-operation rules still apply.
   *
   * For service-level connection validation rejection, return ContentInspectionConnectionValidationFailed
   * in the standard error response, targeting properties.contentInspectionProfile or its endpoint
   * or apiKey field when the invalid field is known. Ordinary schema/model validation may retain
   * its standard HTTP 400 errors. The connection code also applies to definitively rejected
   * credentials or a confirmed account/access setting or missing required Content Safety API
   * capability that prevents use of the supplied connection. Interpret upstream 401/403 responses
   * to distinguish credentials from account access, local authentication, or network restrictions;
   * do not report them as authentication/authorization failures of the Fabric caller.
   *
   * Throttling (HTTP 429), service failures (5xx), DNS/TLS failures, timeouts, and inconclusive
   * availability do not establish bad customer input and must not be classified as this HTTP 400
   * rejection. A DNS timeout or an arbitrary upstream 404 does not prove that the account is absent.
   * If a definite validation rejection is discovered after PUT acceptance, report terminal Failed
   * with the corresponding error in the established long-running operation status response;
   * the accepted PUT response does not become HTTP 400. Failed replacement preserves the previously
   * active connection; never validate or operate failed customer input using regional credentials.
   * Error responses must not contain key values or raw upstream response bodies.
   *
   * Example connection rejection response (HTTP 400 Bad Request):
   *
   * ```json
   * {
   *   "error": {
   *     "code": "ContentInspectionConnectionValidationFailed",
   *     "message": "The supplied Content Safety connection could not be validated. Verify the endpoint, API key, and account access settings.",
   *     "target": "properties.contentInspectionProfile"
   *   }
   * }
   * ```
   *
   * Example rejection response (HTTP 409 Conflict):
   *
   * ```json
   * {
   *   "error": {
   *     "code": "ContentInspectionCapabilityDisabled",
   *     "message": "The referenced policy group contains a ContentInspection policy, but this fabric has no configured inspection connection.",
   *     "target": "properties.defaultPolicyGroups"
   *   }
   * }
   * ```
   */
  createOrUpdate: (
    resourceGroupName: string,
    agentFabricName: string,
    resource: AgentFabric,
    options?: AgentFabricsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentFabric>, AgentFabric>;
  /** Get a AgentFabric */
  get: (
    resourceGroupName: string,
    agentFabricName: string,
    options?: AgentFabricsGetOptionalParams,
  ) => Promise<AgentFabric>;
}

function _getAgentFabrics(context: NetworkSecurityManagementContext) {
  return {
    listBySubscription: (options?: AgentFabricsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: AgentFabricsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      agentFabricName: string,
      options?: AgentFabricsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, agentFabricName, options),
    update: (
      resourceGroupName: string,
      agentFabricName: string,
      properties: AgentFabricTagsUpdate,
      options?: AgentFabricsUpdateOptionalParams,
    ) => update(context, resourceGroupName, agentFabricName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      agentFabricName: string,
      resource: AgentFabric,
      options?: AgentFabricsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, agentFabricName, resource, options),
    get: (
      resourceGroupName: string,
      agentFabricName: string,
      options?: AgentFabricsGetOptionalParams,
    ) => get(context, resourceGroupName, agentFabricName, options),
  };
}

export function _getAgentFabricsOperations(
  context: NetworkSecurityManagementContext,
): AgentFabricsOperations {
  return {
    ..._getAgentFabrics(context),
  };
}

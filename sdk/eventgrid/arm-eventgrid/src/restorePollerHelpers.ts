// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementClient } from "./eventGridManagementClient.js";
import {
  _$deleteDeserialize,
  _updateDeserialize,
  _createOrUpdateDeserialize,
} from "./api/namespaceTopicEventSubscriptions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDomainTopicEventSubscriptions,
  _updateDeserialize as _updateDeserializeDomainTopicEventSubscriptions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDomainTopicEventSubscriptions,
} from "./api/domainTopicEventSubscriptions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeTopicSpaces,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeTopicSpaces,
} from "./api/topicSpaces/operations.js";
import {
  _regenerateKeyDeserialize,
  _$deleteDeserialize as _$deleteDeserializeTopics,
  _updateDeserialize as _updateDeserializeTopics,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeTopics,
} from "./api/topics/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeSystemTopics,
  _updateDeserialize as _updateDeserializeSystemTopics,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSystemTopics,
} from "./api/systemTopics/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePrivateEndpointConnections,
  _updateDeserialize as _updateDeserializePrivateEndpointConnections,
} from "./api/privateEndpointConnections/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePermissionBindings,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePermissionBindings,
} from "./api/permissionBindings/operations.js";
import { _reconcileDeserialize } from "./api/networkSecurityPerimeterConfigurations/operations.js";
import { _$deleteDeserialize as _$deleteDeserializePartnerTopics } from "./api/partnerTopics/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePartnerRegistrations,
  _updateDeserialize as _updateDeserializePartnerRegistrations,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePartnerRegistrations,
} from "./api/partnerRegistrations/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePartnerDestinations,
  _updateDeserialize as _updateDeserializePartnerDestinations,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePartnerDestinations,
} from "./api/partnerDestinations/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePartnerConfigurations,
  _updateDeserialize as _updateDeserializePartnerConfigurations,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePartnerConfigurations,
} from "./api/partnerConfigurations/operations.js";
import {
  _regenerateKeyDeserialize as _regenerateKeyDeserializeNamespaceTopics,
  _$deleteDeserialize as _$deleteDeserializeNamespaceTopics,
  _updateDeserialize as _updateDeserializeNamespaceTopics,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNamespaceTopics,
} from "./api/namespaceTopics/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePartnerTopicEventSubscriptions,
  _updateDeserialize as _updateDeserializePartnerTopicEventSubscriptions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePartnerTopicEventSubscriptions,
} from "./api/partnerTopicEventSubscriptions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeSystemTopicEventSubscriptions,
  _updateDeserialize as _updateDeserializeSystemTopicEventSubscriptions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeSystemTopicEventSubscriptions,
} from "./api/systemTopicEventSubscriptions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDomainEventSubscriptions,
  _updateDeserialize as _updateDeserializeDomainEventSubscriptions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDomainEventSubscriptions,
} from "./api/domainEventSubscriptions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeTopicEventSubscriptions,
  _updateDeserialize as _updateDeserializeTopicEventSubscriptions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeTopicEventSubscriptions,
} from "./api/topicEventSubscriptions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeEventSubscriptions,
  _updateDeserialize as _updateDeserializeEventSubscriptions,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeEventSubscriptions,
} from "./api/eventSubscriptions/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDomainTopics,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDomainTopics,
} from "./api/domainTopics/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeDomains,
  _updateDeserialize as _updateDeserializeDomains,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeDomains,
} from "./api/domains/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeClients,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeClients,
} from "./api/clients/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeClientGroups,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeClientGroups,
} from "./api/clientGroups/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializePartnerNamespaces,
  _updateDeserialize as _updateDeserializePartnerNamespaces,
  _createOrUpdateDeserialize as _createOrUpdateDeserializePartnerNamespaces,
} from "./api/partnerNamespaces/operations.js";
import { _$deleteDeserialize as _$deleteDeserializeChannels } from "./api/channels/operations.js";
import {
  _validateCustomDomainOwnershipDeserialize,
  _regenerateKeyDeserialize as _regenerateKeyDeserializeNamespaces,
  _$deleteDeserialize as _$deleteDeserializeNamespaces,
  _updateDeserialize as _updateDeserializeNamespaces,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeNamespaces,
} from "./api/namespaces/operations.js";
import {
  _$deleteDeserialize as _$deleteDeserializeCaCertificates,
  _createOrUpdateDeserialize as _createOrUpdateDeserializeCaCertificates,
} from "./api/caCertificates/operations.js";
import { getLongRunningPoller } from "./static-helpers/pollingHelpers.js";
import type { OperationOptions, PathUncheckedResponse } from "@azure-rest/core-client";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { PollerLike, OperationState, ResourceLocationConfig } from "@azure/core-lro";
import { deserializeState } from "@azure/core-lro";

export interface RestorePollerOptions<
  TResult,
  TResponse extends PathUncheckedResponse = PathUncheckedResponse,
> extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /** Deserialization function for raw response body */
  processResponseBody?: (result: TResponse) => Promise<TResult>;
}

/**
 * Creates a poller from the serialized state of another poller. This can be
 * useful when you want to create pollers on a different host or a poller
 * needs to be constructed after the original one is not in scope.
 */
export function restorePoller<TResponse extends PathUncheckedResponse, TResult>(
  client: EventGridManagementClient,
  serializedState: string,
  sourceOperation: (...args: any[]) => PollerLike<OperationState<TResult>, TResult>,
  options?: RestorePollerOptions<TResult>,
): PollerLike<OperationState<TResult>, TResult> {
  const pollerConfig = deserializeState(serializedState).config;
  const { initialRequestUrl, requestMethod, metadata } = pollerConfig;
  if (!initialRequestUrl || !requestMethod) {
    throw new Error(
      `Invalid serialized state: ${serializedState} for sourceOperation ${sourceOperation?.name}`,
    );
  }
  const resourceLocationConfig = metadata?.["resourceLocationConfig"] as
    | ResourceLocationConfig
    | undefined;
  const { deserializer, expectedStatuses = [] } =
    getDeserializationHelper(initialRequestUrl, requestMethod) ?? {};
  const deserializeHelper = options?.processResponseBody ?? deserializer;
  if (!deserializeHelper) {
    throw new Error(
      `Please ensure the operation is in this client! We can't find its deserializeHelper for ${sourceOperation?.name}.`,
    );
  }
  const apiVersion = getApiVersionFromUrl(initialRequestUrl);
  return getLongRunningPoller(
    (client as any)["_client"] ?? client,
    deserializeHelper as (result: TResponse) => Promise<TResult>,
    expectedStatuses,
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      resourceLocationConfig,
      restoreFrom: serializedState,
      initialRequestUrl,
      apiVersion,
    },
  );
}

interface DeserializationHelper {
  deserializer: (result: PathUncheckedResponse) => Promise<any>;
  expectedStatuses: string[];
}

const deserializeMap: Record<string, DeserializationHelper> = {
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}":
    { deserializer: _$deleteDeserialize, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}":
    { deserializer: _updateDeserialize, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}":
    { deserializer: _createOrUpdateDeserialize, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _$deleteDeserializeDomainTopicEventSubscriptions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _updateDeserializeDomainTopicEventSubscriptions,
      expectedStatuses: ["201", "200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _createOrUpdateDeserializeDomainTopicEventSubscriptions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topicSpaces/{topicSpaceName}":
    { deserializer: _$deleteDeserializeTopicSpaces, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topicSpaces/{topicSpaceName}":
    {
      deserializer: _createOrUpdateDeserializeTopicSpaces,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/regenerateKey":
    { deserializer: _regenerateKeyDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}":
    { deserializer: _$deleteDeserializeTopics, expectedStatuses: ["202", "204", "200"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}":
    { deserializer: _updateDeserializeTopics, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}":
    { deserializer: _createOrUpdateDeserializeTopics, expectedStatuses: ["201", "200", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}":
    { deserializer: _$deleteDeserializeSystemTopics, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}":
    { deserializer: _updateDeserializeSystemTopics, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}":
    {
      deserializer: _createOrUpdateDeserializeSystemTopics,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.EventGrid/{parentType}/{parentName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _$deleteDeserializePrivateEndpointConnections,
      expectedStatuses: ["202", "204", "200"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.EventGrid/{parentType}/{parentName}/privateEndpointConnections/{privateEndpointConnectionName}":
    {
      deserializer: _updateDeserializePrivateEndpointConnections,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/permissionBindings/{permissionBindingName}":
    {
      deserializer: _$deleteDeserializePermissionBindings,
      expectedStatuses: ["200", "202", "204"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/permissionBindings/{permissionBindingName}":
    {
      deserializer: _createOrUpdateDeserializePermissionBindings,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.EventGrid/{resourceType}/{resourceName}/networkSecurityPerimeterConfigurations/{perimeterGuid}.{associationName}/reconcile":
    { deserializer: _reconcileDeserialize, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}":
    { deserializer: _$deleteDeserializePartnerTopics, expectedStatuses: ["200", "202", "204"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerRegistrations/{partnerRegistrationName}":
    {
      deserializer: _$deleteDeserializePartnerRegistrations,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerRegistrations/{partnerRegistrationName}":
    {
      deserializer: _updateDeserializePartnerRegistrations,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerRegistrations/{partnerRegistrationName}":
    {
      deserializer: _createOrUpdateDeserializePartnerRegistrations,
      expectedStatuses: ["200", "202", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerDestinations/{partnerDestinationName}":
    {
      deserializer: _$deleteDeserializePartnerDestinations,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerDestinations/{partnerDestinationName}":
    {
      deserializer: _updateDeserializePartnerDestinations,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerDestinations/{partnerDestinationName}":
    {
      deserializer: _createOrUpdateDeserializePartnerDestinations,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default":
    {
      deserializer: _$deleteDeserializePartnerConfigurations,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default":
    {
      deserializer: _updateDeserializePartnerConfigurations,
      expectedStatuses: ["200", "201", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default":
    {
      deserializer: _createOrUpdateDeserializePartnerConfigurations,
      expectedStatuses: ["200", "201", "202"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}/regenerateKey":
    {
      deserializer: _regenerateKeyDeserializeNamespaceTopics,
      expectedStatuses: ["202", "200", "201"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}":
    { deserializer: _$deleteDeserializeNamespaceTopics, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}":
    { deserializer: _updateDeserializeNamespaceTopics, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/topics/{topicName}":
    {
      deserializer: _createOrUpdateDeserializeNamespaceTopics,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _$deleteDeserializePartnerTopicEventSubscriptions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _updateDeserializePartnerTopicEventSubscriptions,
      expectedStatuses: ["201", "200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _createOrUpdateDeserializePartnerTopicEventSubscriptions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _$deleteDeserializeSystemTopicEventSubscriptions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _updateDeserializeSystemTopicEventSubscriptions,
      expectedStatuses: ["201", "200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _createOrUpdateDeserializeSystemTopicEventSubscriptions,
      expectedStatuses: ["201", "200", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _$deleteDeserializeDomainEventSubscriptions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _updateDeserializeDomainEventSubscriptions,
      expectedStatuses: ["201", "200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _createOrUpdateDeserializeDomainEventSubscriptions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _$deleteDeserializeTopicEventSubscriptions,
      expectedStatuses: ["200", "202", "204"],
    },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _updateDeserializeTopicEventSubscriptions,
      expectedStatuses: ["201", "200", "202"],
    },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/topics/{topicName}/eventSubscriptions/{eventSubscriptionName}":
    {
      deserializer: _createOrUpdateDeserializeTopicEventSubscriptions,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}": {
    deserializer: _$deleteDeserializeEventSubscriptions,
    expectedStatuses: ["200", "202", "204"],
  },
  "PATCH /{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}": {
    deserializer: _updateDeserializeEventSubscriptions,
    expectedStatuses: ["201", "200", "202"],
  },
  "PUT /{scope}/providers/Microsoft.EventGrid/eventSubscriptions/{eventSubscriptionName}": {
    deserializer: _createOrUpdateDeserializeEventSubscriptions,
    expectedStatuses: ["201", "200", "202"],
  },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{domainTopicName}":
    { deserializer: _$deleteDeserializeDomainTopics, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{domainTopicName}":
    {
      deserializer: _createOrUpdateDeserializeDomainTopics,
      expectedStatuses: ["201", "200", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}":
    { deserializer: _$deleteDeserializeDomains, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}":
    { deserializer: _updateDeserializeDomains, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}":
    { deserializer: _createOrUpdateDeserializeDomains, expectedStatuses: ["201", "200", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clients/{clientName}":
    { deserializer: _$deleteDeserializeClients, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clients/{clientName}":
    { deserializer: _createOrUpdateDeserializeClients, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clientGroups/{clientGroupName}":
    { deserializer: _$deleteDeserializeClientGroups, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/clientGroups/{clientGroupName}":
    {
      deserializer: _createOrUpdateDeserializeClientGroups,
      expectedStatuses: ["200", "201", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}":
    { deserializer: _$deleteDeserializePartnerNamespaces, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}":
    { deserializer: _updateDeserializePartnerNamespaces, expectedStatuses: ["200", "201", "202"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}":
    {
      deserializer: _createOrUpdateDeserializePartnerNamespaces,
      expectedStatuses: ["201", "200", "202"],
    },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/channels/{channelName}":
    { deserializer: _$deleteDeserializeChannels, expectedStatuses: ["200", "202", "204"] },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/validateCustomDomainOwnership":
    {
      deserializer: _validateCustomDomainOwnershipDeserialize,
      expectedStatuses: ["202", "200", "201"],
    },
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/regenerateKey":
    { deserializer: _regenerateKeyDeserializeNamespaces, expectedStatuses: ["202", "200", "201"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}":
    { deserializer: _$deleteDeserializeNamespaces, expectedStatuses: ["200", "202", "204"] },
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}":
    { deserializer: _updateDeserializeNamespaces, expectedStatuses: ["200", "202", "201"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}":
    { deserializer: _createOrUpdateDeserializeNamespaces, expectedStatuses: ["200", "201", "202"] },
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/caCertificates/{caCertificateName}":
    { deserializer: _$deleteDeserializeCaCertificates, expectedStatuses: ["200", "202", "204"] },
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/namespaces/{namespaceName}/caCertificates/{caCertificateName}":
    {
      deserializer: _createOrUpdateDeserializeCaCertificates,
      expectedStatuses: ["200", "201", "202"],
    },
};

function getDeserializationHelper(
  urlStr: string,
  method: string,
): DeserializationHelper | undefined {
  const path = new URL(urlStr).pathname;
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: DeserializationHelper | undefined;

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(deserializeMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}

function getApiVersionFromUrl(urlStr: string): string | undefined {
  const url = new URL(urlStr);
  return url.searchParams.get("api-version") ?? undefined;
}

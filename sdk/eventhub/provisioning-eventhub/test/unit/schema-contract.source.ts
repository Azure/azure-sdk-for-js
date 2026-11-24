// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Scenario: schema contract source probes for @azure/provisioning-eventhub.
 * provisioning API: @azure/provisioning-eventhub/types.
 * Source contracts: exact-version Microsoft Learn/Bicep reference.
 * Typecheck command: pnpm run typecheck
 */

import type {
  ApplicationGroupPropertiesInput,
  ArmDisasterRecoveryPropertiesInput,
  AuthorizationRulePropertiesInput,
  CaptureDescriptionInput,
  CaptureIdentityInput,
  ClusterPropertiesInput,
  ClusterSkuInput,
  ConfidentialComputeInput,
  ConnectionStateInput,
  ConsumerGroupPropertiesInput,
  DestinationInput,
  DestinationPropertiesInput,
  EncryptionInput,
  EventhubPropertiesInput,
  GeoDataReplicationPropertiesInput,
  KeyVaultPropertiesInput,
  MessageTimestampDescriptionInput,
  NamespaceReplicaLocationInput,
  NetworkRuleSetPropertiesInput,
  PrivateEndpointInput,
  RetentionDescriptionInput,
  SchemaGroupPropertiesInput,
  SkuInput,
  SubnetInput,
} from "@azure/provisioning-eventhub/types";

// Accepted Bicep contract: Microsoft.EventHub/namespaces/applicationGroups -> ApplicationGroupPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/applicationgroups?pivots=deployment-language-bicep
export const applicationGroupPropertiesNamespacesApplicationgroups5136f04bdd3497e835d3FromBicep: ApplicationGroupPropertiesInput =
  {
    clientAppGroupIdentifier: "string",
    isEnabled: true,
    policies: [],
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces/disasterRecoveryConfigs -> ArmDisasterRecoveryPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/disasterrecoveryconfigs?pivots=deployment-language-bicep
export const armDisasterRecoveryPropertiesNamespacesDisasterrecoveryconfigs849216713a3a142d6e9dFromBicep: ArmDisasterRecoveryPropertiesInput =
  {
    alternateName: "string",
    partnerNamespace: "string",
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces/authorizationRules -> AuthorizationRulePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/authorizationrules?pivots=deployment-language-bicep
export const authorizationRulePropertiesNamespacesAuthorizationrules33adfeb80aa615e24493FromBicep: AuthorizationRulePropertiesInput =
  {
    rights: [],
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces/eventhubs/authorizationRules -> AuthorizationRulePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/eventhubs/authorizationrules?pivots=deployment-language-bicep
export const authorizationRulePropertiesNamespacesEventhubsAuthorizationrulesf9e4d13bc701ccdaa07dFromBicep: AuthorizationRulePropertiesInput =
  {
    rights: [],
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces/eventhubs -> CaptureDescriptionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/eventhubs?pivots=deployment-language-bicep
export const captureDescriptionNamespacesEventhubs651dcc734a7976fb6d20FromBicep: CaptureDescriptionInput =
  {
    enabled: true,
    intervalInSeconds: 0,
    sizeLimitInBytes: 0,
    skipEmptyArchives: true,
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces/eventhubs -> CaptureIdentityInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/eventhubs?pivots=deployment-language-bicep
export const captureIdentityNamespacesEventhubs651dcc734a921a543a14FromBicep: CaptureIdentityInput =
  {
    userAssignedIdentity: "string",
  };

// Accepted Bicep contract: Microsoft.EventHub/clusters -> ClusterPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/clusters?pivots=deployment-language-bicep
export const clusterPropertiesClustersb41cffbd840aca644c35FromBicep: ClusterPropertiesInput = {
  supportsScaling: true,
  zoneRedundant: true,
};

// Accepted Bicep contract: Microsoft.EventHub/clusters -> ClusterSkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/clusters?pivots=deployment-language-bicep
export const clusterSkuClustersb41cffbd84200e4b31f0FromBicep: ClusterSkuInput = {
  capacity: 0,
  name: "Dedicated",
};

// Accepted Bicep contract: Microsoft.EventHub/clusters -> ConfidentialComputeInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/clusters?pivots=deployment-language-bicep
export const confidentialComputeClustersb41cffbd8436532fe8a2FromBicep: ConfidentialComputeInput = {
  mode: "Disabled",
};

// Accepted Bicep contract: Microsoft.EventHub/namespaces -> ConfidentialComputeInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces?pivots=deployment-language-bicep
export const confidentialComputeNamespaces298009570f0f837e8968FromBicep: ConfidentialComputeInput =
  {
    mode: "Disabled",
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces -> ConnectionStateInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces?pivots=deployment-language-bicep
export const connectionStateNamespaces298009570feb6082293eFromBicep: ConnectionStateInput = {
  description: "string",
  status: "Approved",
};

// Accepted Bicep contract: Microsoft.EventHub/namespaces/privateEndpointConnections -> ConnectionStateInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/privateendpointconnections?pivots=deployment-language-bicep
export const connectionStateNamespacesPrivateendpointconnectionse2a5ad74326338ba838dFromBicep: ConnectionStateInput =
  {
    description: "string",
    status: "Approved",
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces/eventhubs/consumergroups -> ConsumerGroupPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/eventhubs/consumergroups?pivots=deployment-language-bicep
export const consumerGroupPropertiesNamespacesEventhubsConsumergroupsbf5a1736a58dda177f0cFromBicep: ConsumerGroupPropertiesInput =
  {
    userMetadata: "string",
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces/eventhubs -> DestinationInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/eventhubs?pivots=deployment-language-bicep
export const destinationNamespacesEventhubs651dcc734a96e9be0976FromBicep: DestinationInput = {
  name: "string",
};

// Accepted Bicep contract: Microsoft.EventHub/namespaces/eventhubs -> DestinationPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/eventhubs?pivots=deployment-language-bicep
export const destinationPropertiesNamespacesEventhubs651dcc734a0e43b6d598FromBicep: DestinationPropertiesInput =
  {
    archiveNameFormat: "string",
    blobContainer: "string",
    dataLakeAccountName: "string",
    dataLakeFolderPath: "string",
    dataLakeSubscriptionId: "string",
    storageAccountResourceId: "string",
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces -> EncryptionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces?pivots=deployment-language-bicep
export const encryptionNamespaces298009570f973956faa6FromBicep: EncryptionInput = {
  keySource: "Microsoft.KeyVault",
  keyVaultProperties: [],
  requireInfrastructureEncryption: true,
};

// Accepted Bicep contract: Microsoft.EventHub/namespaces/eventhubs -> EventhubPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/eventhubs?pivots=deployment-language-bicep
export const eventhubPropertiesNamespacesEventhubs651dcc734a046e451df2FromBicep: EventhubPropertiesInput =
  {
    messageRetentionInDays: 0,
    partitionCount: 0,
    userMetadata: "string",
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces -> GeoDataReplicationPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces?pivots=deployment-language-bicep
export const geoDataReplicationPropertiesNamespaces298009570fcd7c9fd83cFromBicep: GeoDataReplicationPropertiesInput =
  {
    locations: [],
    maxReplicationLagDurationInSeconds: 0,
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces -> KeyVaultPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces?pivots=deployment-language-bicep
export const keyVaultPropertiesNamespaces298009570f1307c5c730FromBicep: KeyVaultPropertiesInput = {
  keyName: "string",
  keyVaultUri: "string",
  keyVersion: "string",
};

// Accepted Bicep contract: Microsoft.EventHub/namespaces/eventhubs -> MessageTimestampDescriptionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/eventhubs?pivots=deployment-language-bicep
export const messageTimestampDescriptionNamespacesEventhubs651dcc734a4d556e09baFromBicep: MessageTimestampDescriptionInput =
  {
    timestampType: "Create",
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces -> NamespaceReplicaLocationInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces?pivots=deployment-language-bicep
export const namespaceReplicaLocationNamespaces298009570f793d96789eFromBicep: NamespaceReplicaLocationInput =
  {
    clusterArmId: "string",
    locationName: "string",
    roleType: "Primary",
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces/networkRuleSets -> NetworkRuleSetPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/networkrulesets?pivots=deployment-language-bicep
export const networkRuleSetPropertiesNamespacesNetworkrulesets369f6d7bad61e8e5a733FromBicep: NetworkRuleSetPropertiesInput =
  {
    defaultAction: "Allow",
    ipRules: [],
    publicNetworkAccess: "Disabled",
    trustedServiceAccessEnabled: true,
    virtualNetworkRules: [],
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces -> PrivateEndpointInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces?pivots=deployment-language-bicep
export const privateEndpointNamespaces298009570fc6d07f4cd1FromBicep: PrivateEndpointInput = {
  id: "string",
};

// Accepted Bicep contract: Microsoft.EventHub/namespaces/privateEndpointConnections -> PrivateEndpointInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/privateendpointconnections?pivots=deployment-language-bicep
export const privateEndpointNamespacesPrivateendpointconnectionse2a5ad74327cdbdce831FromBicep: PrivateEndpointInput =
  {
    id: "string",
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces/eventhubs -> RetentionDescriptionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/eventhubs?pivots=deployment-language-bicep
export const retentionDescriptionNamespacesEventhubs651dcc734a2cf7614cceFromBicep: RetentionDescriptionInput =
  {
    cleanupPolicy: "Compact",
    minCompactionLagTimeInMinutes: 0,
    retentionTimeInHours: 0,
    tombstoneRetentionTimeInHours: 0,
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces/schemagroups -> SchemaGroupPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/schemagroups?pivots=deployment-language-bicep
export const schemaGroupPropertiesNamespacesSchemagroups46c8e4446318f13fbb9aFromBicep: SchemaGroupPropertiesInput =
  {
    schemaCompatibility: "Backward",
    schemaType: "Avro",
  };

// Accepted Bicep contract: Microsoft.EventHub/namespaces -> SkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces?pivots=deployment-language-bicep
export const skuNamespaces298009570fee322ced67FromBicep: SkuInput = {
  capacity: 0,
  name: "Basic",
  tier: "Basic",
};

// Accepted Bicep contract: Microsoft.EventHub/namespaces/networkRuleSets -> SubnetInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.eventhub/2026-01-01/namespaces/networkrulesets?pivots=deployment-language-bicep
export const subnetNamespacesNetworkrulesets369f6d7badb36001acb6FromBicep: SubnetInput = {
  id: "string",
};

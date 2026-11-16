// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Scenario: schema contract source probes for @azure/provisioning-servicebus.
 * provisioning API: @azure/provisioning-servicebus/types.
 * Source contracts: exact-version Microsoft Learn/Bicep reference.
 * Typecheck command: pnpm run typecheck
 */

import type {
  ActionInput,
  ArmDisasterRecoveryPropertiesInput,
  ConfidentialComputeInput,
  ConnectionStateInput,
  CorrelationFilterInput,
  EncryptionInput,
  GeoDataReplicationPropertiesInput,
  KeyVaultPropertiesInput,
  MigrationConfigPropertiesPropertiesInput,
  NamespaceReplicaLocationInput,
  NetworkRuleSetPropertiesInput,
  PrivateEndpointInput,
  SqlFilterInput,
  SubnetInput,
  UserAssignedIdentityPropertiesInput,
} from "@azure/provisioning-servicebus/types";

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces/topics/subscriptions/rules -> ActionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces/topics/subscriptions/rules?pivots=deployment-language-bicep
export const actionNamespacesTopicsSubscriptionsRules5395edf3ff44db5c1968FromBicep: ActionInput = {
  compatibilityLevel: 0,
  requiresPreprocessing: true,
  sqlExpression: "string",
};

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces/disasterRecoveryConfigs -> ArmDisasterRecoveryPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces/disasterrecoveryconfigs?pivots=deployment-language-bicep
export const armDisasterRecoveryPropertiesNamespacesDisasterrecoveryconfigsf6f7d79cc5e674b7484bFromBicep: ArmDisasterRecoveryPropertiesInput =
  {
    alternateName: "string",
    partnerNamespace: "string",
  };

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces -> ConfidentialComputeInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces?pivots=deployment-language-bicep
export const confidentialComputeNamespaces6e60d6c0d941326f0120FromBicep: ConfidentialComputeInput =
  {
    mode: "Disabled",
  };

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces -> ConnectionStateInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces?pivots=deployment-language-bicep
export const connectionStateNamespaces6e60d6c0d996af6b5d08FromBicep: ConnectionStateInput = {
  description: "string",
  status: "Approved",
};

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces/privateEndpointConnections -> ConnectionStateInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces/privateendpointconnections?pivots=deployment-language-bicep
export const connectionStateNamespacesPrivateendpointconnectionse862c85af191ff07f6dbFromBicep: ConnectionStateInput =
  {
    description: "string",
    status: "Approved",
  };

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces/topics/subscriptions/rules -> CorrelationFilterInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces/topics/subscriptions/rules?pivots=deployment-language-bicep
export const correlationFilterNamespacesTopicsSubscriptionsRules5395edf3ff73dba1536dFromBicep: CorrelationFilterInput =
  {
    contentType: "string",
    correlationId: "string",
    label: "string",
    messageId: "string",
    replyTo: "string",
    replyToSessionId: "string",
    requiresPreprocessing: true,
    sessionId: "string",
    to: "string",
  };

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces -> EncryptionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces?pivots=deployment-language-bicep
export const encryptionNamespaces6e60d6c0d9203e8d5e85FromBicep: EncryptionInput = {
  keySource: "Microsoft.KeyVault",
  keyVaultProperties: [],
  requireInfrastructureEncryption: true,
};

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces -> GeoDataReplicationPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces?pivots=deployment-language-bicep
export const geoDataReplicationPropertiesNamespaces6e60d6c0d9997a5c4bd6FromBicep: GeoDataReplicationPropertiesInput =
  {
    locations: [],
    maxReplicationLagDurationInSeconds: 0,
  };

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces -> KeyVaultPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces?pivots=deployment-language-bicep
export const keyVaultPropertiesNamespaces6e60d6c0d92026be5ea7FromBicep: KeyVaultPropertiesInput = {
  keyName: "string",
  keyVaultUri: "string",
  keyVersion: "string",
};

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces/migrationConfigurations -> MigrationConfigPropertiesPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces/migrationconfigurations?pivots=deployment-language-bicep
export const migrationConfigPropertiesPropertiesNamespacesMigrationconfigurations063e7d96b5f40220d9e2FromBicep: MigrationConfigPropertiesPropertiesInput =
  {
    postMigrationName: "string",
    targetNamespace: "string",
  };

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces -> NamespaceReplicaLocationInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces?pivots=deployment-language-bicep
export const namespaceReplicaLocationNamespaces6e60d6c0d954de3b3312FromBicep: NamespaceReplicaLocationInput =
  {
    locationName: "string",
    roleType: "Primary",
  };

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces/networkRuleSets -> NetworkRuleSetPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces/networkrulesets?pivots=deployment-language-bicep
export const networkRuleSetPropertiesNamespacesNetworkrulesetsfd0ec86797340fc9c1c5FromBicep: NetworkRuleSetPropertiesInput =
  {
    defaultAction: "Allow",
    ipRules: [],
    publicNetworkAccess: "Disabled",
    trustedServiceAccessEnabled: true,
    virtualNetworkRules: [],
  };

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces -> PrivateEndpointInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces?pivots=deployment-language-bicep
export const privateEndpointNamespaces6e60d6c0d9dae630e528FromBicep: PrivateEndpointInput = {
  id: "string",
};

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces/privateEndpointConnections -> PrivateEndpointInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces/privateendpointconnections?pivots=deployment-language-bicep
export const privateEndpointNamespacesPrivateendpointconnectionse862c85af138589f6aeeFromBicep: PrivateEndpointInput =
  {
    id: "string",
  };

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces/topics/subscriptions/rules -> SqlFilterInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces/topics/subscriptions/rules?pivots=deployment-language-bicep
export const sqlFilterNamespacesTopicsSubscriptionsRules5395edf3ff13cfdc95c1FromBicep: SqlFilterInput =
  {
    compatibilityLevel: 0,
    requiresPreprocessing: true,
    sqlExpression: "string",
  };

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces/networkRuleSets -> SubnetInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces/networkrulesets?pivots=deployment-language-bicep
export const subnetNamespacesNetworkrulesetsfd0ec8679791be825340FromBicep: SubnetInput = {
  id: "string",
};

// Accepted Bicep contract: Microsoft.ServiceBus/namespaces -> UserAssignedIdentityPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.servicebus/2026-01-01/namespaces?pivots=deployment-language-bicep
export const userAssignedIdentityPropertiesNamespaces6e60d6c0d9c3cb6837d3FromBicep: UserAssignedIdentityPropertiesInput =
  {
    userAssignedIdentity: "string",
  };

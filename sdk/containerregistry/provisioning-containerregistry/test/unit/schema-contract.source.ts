// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Scenario: schema contract source probes for @azure/provisioning-containerregistry.
 * provisioning API: @azure/provisioning-containerregistry root types namespace.
 * Source contracts: exact-version Microsoft Learn/Bicep reference.
 * Typecheck command: pnpm run typecheck
 */

import type {
  AuthCredentialInput,
  AzureAdAuthenticationAsArmPolicyInput,
  CacheRulePropertiesInput,
  CredentialSetPropertiesInput,
  EncryptionPropertyInput,
  ExportPolicyInput,
  GarbageCollectionPropertiesInput,
  IdentityPropertiesInput,
  IpRuleInput,
  KeyVaultPropertiesInput,
  LoggingPropertiesInput,
  NetworkRuleSetInput,
  PoliciesInput,
  PrivateEndpointConnectionPropertiesInput,
  PrivateEndpointInput,
  PrivateLinkServiceConnectionStateInput,
  QuarantinePolicyInput,
  RegistryPropertiesInput,
  ReplicationPropertiesInput,
  RetentionPolicyInput,
  ScopeMapPropertiesInput,
  SkuInput,
  SyncPropertiesInput,
  TokenCredentialsPropertiesInput,
  TokenPropertiesInput,
  TrustPolicyInput,
  WebhookPropertiesInput,
} from "@azure/provisioning-containerregistry/types";

// Matched Bicep-vs-CDK contract cases.

// Bicep baseline: Microsoft.ContainerRegistry/registries.identity (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries?pivots=deployment-language-bicep
// CDK input: IdentityPropertiesInput.{ type, userAssignedIdentities }
export const identityPropertiesWithTypeRegistriesFromBicep: IdentityPropertiesInput = {
  type: "None",
  userAssignedIdentities: {},
};

// Bicep baseline: Microsoft.ContainerRegistry/registries.properties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries?pivots=deployment-language-bicep
// CDK input: RegistryPropertiesInput.{ adminUserEnabled, anonymousPullEnabled, dataEndpointEnabled, encryption, networkRuleBypassAllowedForTasks, networkRuleBypassOptions, networkRuleSet, policies, publicNetworkAccess, roleAssignmentMode, zoneRedundancy }
export const registryPropertiesWithAdminUserEnabledRegistriesFromBicep: RegistryPropertiesInput = {
  adminUserEnabled: true,
  anonymousPullEnabled: true,
  dataEndpointEnabled: true,
  encryption: {},
  networkRuleBypassAllowedForTasks: true,
  networkRuleBypassOptions: "AzureServices",
  networkRuleSet: { defaultAction: "Allow" },
  policies: {},
  publicNetworkAccess: "Disabled",
  roleAssignmentMode: "AbacRepositoryPermissions",
  zoneRedundancy: "Disabled",
};

// Bicep baseline: Microsoft.ContainerRegistry/registries.properties.encryption (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries?pivots=deployment-language-bicep
// CDK input: EncryptionPropertyInput.{ keyVaultProperties, status }
export const encryptionPropertyWithKeyVaultPropertiesRegistriesFromBicep: EncryptionPropertyInput =
  {
    keyVaultProperties: {},
    status: "disabled",
  };

// Bicep baseline: Microsoft.ContainerRegistry/registries.properties.encryption.keyVaultProperties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries?pivots=deployment-language-bicep
// CDK input: KeyVaultPropertiesInput.{ identity, keyIdentifier }
export const keyVaultPropertiesWithIdentityRegistriesFromBicep: KeyVaultPropertiesInput = {
  identity: "__bicep_value__",
  keyIdentifier: "__bicep_value__",
};

// Bicep baseline: Microsoft.ContainerRegistry/registries.properties.networkRuleSet (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries?pivots=deployment-language-bicep
// CDK input: NetworkRuleSetInput.{ defaultAction, ipRules }
export const networkRuleSetWithDefaultActionRegistriesFromBicep: NetworkRuleSetInput = {
  defaultAction: "Allow",
  ipRules: [],
};

// Bicep baseline: Microsoft.ContainerRegistry/registries.properties.networkRuleSet.ipRules[] (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries?pivots=deployment-language-bicep
// CDK input: IpRuleInput.{ action, iPAddressOrRange }
export const iPRuleWithActionRegistriesFromBicep: IpRuleInput = {
  action: "Allow",
  iPAddressOrRange: "__bicep_value__",
};

// Bicep baseline: Microsoft.ContainerRegistry/registries.properties.policies (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries?pivots=deployment-language-bicep
// CDK input: PoliciesInput.{ azureAdAuthenticationAsArmPolicy, exportPolicy, quarantinePolicy, retentionPolicy, trustPolicy }
export const policiesWithAzureADAuthenticationAsArmPolicyRegistriesFromBicep: PoliciesInput = {
  azureAdAuthenticationAsArmPolicy: {},
  exportPolicy: {},
  quarantinePolicy: {},
  retentionPolicy: {},
  trustPolicy: {},
};

// Bicep baseline: Microsoft.ContainerRegistry/registries.properties.policies.azureADAuthenticationAsArmPolicy (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries?pivots=deployment-language-bicep
// CDK input: AzureAdAuthenticationAsArmPolicyInput.status
export const azureADAuthenticationAsArmPolicyWithStatusRegistriesFromBicep: AzureAdAuthenticationAsArmPolicyInput =
  {
    status: "disabled",
  };

// Bicep baseline: Microsoft.ContainerRegistry/registries.properties.policies.exportPolicy (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries?pivots=deployment-language-bicep
// CDK input: ExportPolicyInput.status
export const exportPolicyWithStatusRegistriesFromBicep: ExportPolicyInput = {
  status: "disabled",
};

// Bicep baseline: Microsoft.ContainerRegistry/registries.properties.policies.quarantinePolicy (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries?pivots=deployment-language-bicep
// CDK input: QuarantinePolicyInput.status
export const quarantinePolicyWithStatusRegistriesFromBicep: QuarantinePolicyInput = {
  status: "disabled",
};

// Bicep baseline: Microsoft.ContainerRegistry/registries.properties.policies.retentionPolicy (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries?pivots=deployment-language-bicep
// CDK input: RetentionPolicyInput.{ days, status }
export const retentionPolicyWithDaysRegistriesFromBicep: RetentionPolicyInput = {
  days: 0,
  status: "disabled",
};

// Bicep baseline: Microsoft.ContainerRegistry/registries.properties.policies.trustPolicy (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries?pivots=deployment-language-bicep
// CDK input: TrustPolicyInput.{ status, type }
export const trustPolicyWithStatusRegistriesFromBicep: TrustPolicyInput = {
  status: "disabled",
  type: "Notary",
};

// Bicep baseline: Microsoft.ContainerRegistry/registries.sku (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries?pivots=deployment-language-bicep
// CDK input: SkuInput.name
export const skuWithNameRegistriesFromBicep: SkuInput = {
  name: "Basic",
};

// Bicep baseline: Microsoft.ContainerRegistry/registries/cacheRules.properties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/cacherules?pivots=deployment-language-bicep
// CDK input: CacheRulePropertiesInput.{ credentialSetResourceId, sourceRepository, targetRepository }
export const cacheRulePropertiesWithCredentialSetResourceIdRegistriesCacherulesFromBicep: CacheRulePropertiesInput =
  {
    credentialSetResourceId: "__bicep_value__",
    sourceRepository: "__bicep_value__",
    targetRepository: "__bicep_value__",
  };

// Bicep baseline: Microsoft.ContainerRegistry/registries/connectedRegistries.properties.garbageCollection (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/connectedregistries?pivots=deployment-language-bicep
// CDK input: GarbageCollectionPropertiesInput.{ enabled, schedule }
export const garbageCollectionPropertiesWithEnabledRegistriesConnectedregistriesFromBicep: GarbageCollectionPropertiesInput =
  {
    enabled: true,
    schedule: "__bicep_value__",
  };

// Bicep baseline: Microsoft.ContainerRegistry/registries/connectedRegistries.properties.logging (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/connectedregistries?pivots=deployment-language-bicep
// CDK input: LoggingPropertiesInput.{ auditLogStatus, logLevel }
export const loggingPropertiesWithAuditLogStatusRegistriesConnectedregistriesFromBicep: LoggingPropertiesInput =
  {
    auditLogStatus: "Disabled",
    logLevel: "Debug",
  };

// Bicep baseline: Microsoft.ContainerRegistry/registries/connectedRegistries.properties.parent.syncProperties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/connectedregistries?pivots=deployment-language-bicep
// CDK input: SyncPropertiesInput.{ messageTtl, schedule, syncWindow, tokenId }
export const syncPropertiesWithMessageTtlRegistriesConnectedregistriesFromBicep: SyncPropertiesInput =
  {
    messageTtl: "__bicep_value__",
    schedule: "__bicep_value__",
    syncWindow: "__bicep_value__",
    tokenId: "__bicep_value__",
  };

// Bicep baseline: Microsoft.ContainerRegistry/registries/credentialSets.identity (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/credentialsets?pivots=deployment-language-bicep
// CDK input: IdentityPropertiesInput.{ type, userAssignedIdentities }
export const identityPropertiesWithTypeRegistriesCredentialsetsFromBicep: IdentityPropertiesInput =
  {
    type: "None",
    userAssignedIdentities: {},
  };

// Bicep baseline: Microsoft.ContainerRegistry/registries/credentialSets.properties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/credentialsets?pivots=deployment-language-bicep
// CDK input: CredentialSetPropertiesInput.{ authCredentials, loginServer }
export const credentialSetPropertiesWithAuthCredentialsRegistriesCredentialsetsFromBicep: CredentialSetPropertiesInput =
  {
    authCredentials: [],
    loginServer: "__bicep_value__",
  };

// Bicep baseline: Microsoft.ContainerRegistry/registries/credentialSets.properties.authCredentials[] (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/credentialsets?pivots=deployment-language-bicep
// CDK input: AuthCredentialInput.{ name, passwordSecretIdentifier, usernameSecretIdentifier }
export const authCredentialWithNameRegistriesCredentialsetsFromBicep: AuthCredentialInput = {
  name: "Credential1",
  passwordSecretIdentifier: "__bicep_value__",
  usernameSecretIdentifier: "__bicep_value__",
};

// Bicep baseline: Microsoft.ContainerRegistry/registries/privateEndpointConnections.properties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/privateendpointconnections?pivots=deployment-language-bicep
// CDK input: PrivateEndpointConnectionPropertiesInput.{ privateEndpoint, privateLinkServiceConnectionState }
export const privateEndpointConnectionPropertiesWithPrivateEndpointRegistriesPrivateendpointconnectionsFromBicep: PrivateEndpointConnectionPropertiesInput =
  {
    privateEndpoint: {},
    privateLinkServiceConnectionState: {},
  };

// Bicep baseline: Microsoft.ContainerRegistry/registries/privateEndpointConnections.properties.privateEndpoint (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/privateendpointconnections?pivots=deployment-language-bicep
// CDK input: PrivateEndpointInput.id
export const privateEndpointWithIdRegistriesPrivateendpointconnectionsFromBicep: PrivateEndpointInput =
  {
    id: "__bicep_value__",
  };

// Bicep baseline: Microsoft.ContainerRegistry/registries/privateEndpointConnections.properties.privateLinkServiceConnectionState (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/privateendpointconnections?pivots=deployment-language-bicep
// CDK input: PrivateLinkServiceConnectionStateInput.{ actionsRequired, description, status }
export const privateLinkServiceConnectionStateWithActionsRequiredRegistriesPrivateendpointconnectionsFromBicep: PrivateLinkServiceConnectionStateInput =
  {
    actionsRequired: "None",
    description: "__bicep_value__",
    status: "Approved",
  };

// Bicep baseline: Microsoft.ContainerRegistry/registries/replications.properties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/replications?pivots=deployment-language-bicep
// CDK input: ReplicationPropertiesInput.{ regionEndpointEnabled, zoneRedundancy }
export const replicationPropertiesWithRegionEndpointEnabledRegistriesReplicationsFromBicep: ReplicationPropertiesInput =
  {
    regionEndpointEnabled: true,
    zoneRedundancy: "Disabled",
  };

// Bicep baseline: Microsoft.ContainerRegistry/registries/scopeMaps.properties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/scopemaps?pivots=deployment-language-bicep
// CDK input: ScopeMapPropertiesInput.{ actions, description }
export const scopeMapPropertiesWithActionsRegistriesScopemapsFromBicep: ScopeMapPropertiesInput = {
  actions: [],
  description: "__bicep_value__",
};

// Bicep baseline: Microsoft.ContainerRegistry/registries/tokens.properties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/tokens?pivots=deployment-language-bicep
// CDK input: TokenPropertiesInput.{ credentials, scopeMapId, status }
export const tokenPropertiesWithCredentialsRegistriesTokensFromBicep: TokenPropertiesInput = {
  credentials: {},
  scopeMapId: "__bicep_value__",
  status: "disabled",
};

// Bicep baseline: Microsoft.ContainerRegistry/registries/tokens.properties.credentials (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/tokens?pivots=deployment-language-bicep
// CDK input: TokenCredentialsPropertiesInput.{ certificates, passwords }
export const tokenCredentialsPropertiesWithCertificatesRegistriesTokensFromBicep: TokenCredentialsPropertiesInput =
  {
    certificates: [],
    passwords: [],
  };

// Bicep baseline: Microsoft.ContainerRegistry/registries/webhooks.properties (bicep-cdk-match).
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.containerregistry/2025-11-01/registries/webhooks?pivots=deployment-language-bicep
// CDK input: WebhookPropertiesInput.{ actions, customHeaders, scope, serviceUri, status }
export const webhookPropertiesWithActionsRegistriesWebhooksFromBicep: WebhookPropertiesInput = {
  actions: ["chart_delete"],
  customHeaders: {},
  scope: "__bicep_value__",
  serviceUri: "__bicep_value__",
  status: "disabled",
};

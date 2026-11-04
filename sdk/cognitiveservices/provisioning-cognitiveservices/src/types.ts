// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Expression, ExpressionOrValue } from "@azure/provisioning-core";
import {
  createArrayShape,
  createBooleanShape,
  createDateShape,
  createDeferredShape,
  createDiscriminatedModelShape,
  createEnumShape,
  createFlatModelShape,
  createNumberShape,
  createRecordShape,
  createStringLiteralShape,
  createStringShape,
  createUnionShape,
  type DiscriminatedModelShape,
  type FlatModelShape,
  type InputArray,
  type InputOf,
  type InputRecord,
} from "@azure/provisioning-core/internal";

/**
 * The identity type.
 */
export type ResourceIdentityType =
  "None" | "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned";

/**
 * This connection type covers the AAD auth for any applicable Azure service
 */
export interface AadAuthTypeConnectionProperties {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "AAD".
   */
  authType: "AAD";
  /**
   * Category of the connection
   */
  category?: ConnectionCategory;
  createdByWorkspaceArmId?: string;
  /**
   * Provides the error message if the connection fails
   */
  error?: string;
  expiryTime?: Date;
  /**
   * Group based on connection category
   */
  group?: ConnectionGroup;
  isSharedToAll?: boolean;
  /**
   * Store user metadata for this connection
   */
  metadata?: Record<string, string>;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ManagedPeRequirement;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ManagedPeStatus;
  sharedUserList?: string[];
  /**
   * The connection URL to be used.
   */
  target?: string;
  useWorkspaceManagedIdentity?: boolean;
}

/**
 * Input type for This connection type covers the AAD auth for any applicable Azure service
 */
export interface AadAuthTypeConnectionPropertiesInput extends InputOf<AadAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "AAD".
   */
  authType: "AAD";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for This connection type covers the AAD auth for any applicable Azure service
 */
export interface AadAuthTypeConnectionPropertiesView extends InputOf<AadAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "AAD".
   */
  authType: "AAD";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  readonly createdByWorkspaceArmId?: Expression<string> | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Read-only output: Group based on connection category
   */
  readonly group?: Expression<ConnectionGroup> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export const aadAuthTypeConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  authType: { armPath: ["authType"], value: createStringLiteralShape() },
  category: { armPath: ["category"], value: createUnionShape() },
  createdByWorkspaceArmId: {
    armPath: ["createdByWorkspaceArmId"],
    value: createStringShape(),
    readOnly: true,
  },
  error: { armPath: ["error"], value: createStringShape() },
  expiryTime: {
    armPath: ["expiryTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  group: { armPath: ["group"], value: createUnionShape(), readOnly: true },
  isSharedToAll: { armPath: ["isSharedToAll"], value: createBooleanShape() },
  metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
  peRequirement: { armPath: ["peRequirement"], value: createUnionShape() },
  peStatus: { armPath: ["peStatus"], value: createUnionShape() },
  sharedUserList: { armPath: ["sharedUserList"], value: createArrayShape(createStringShape()) },
  target: { armPath: ["target"], value: createStringShape() },
  useWorkspaceManagedIdentity: {
    armPath: ["useWorkspaceManagedIdentity"],
    value: createBooleanShape(),
  },
});

/**
 * The abuse penalty.
 */
export interface AbusePenalty {
  /**
   * The action of AbusePenalty.
   */
  action?: AbusePenaltyAction;
  /**
   * The datetime of expiration of the AbusePenalty.
   */
  expiration?: Date;
  /**
   * The percentage of rate limit.
   */
  rateLimitPercentage?: number;
}

/**
 * Input type for The abuse penalty.
 */
export interface AbusePenaltyInput extends InputOf<AbusePenalty> {}

/**
 * View type for The abuse penalty.
 */
export interface AbusePenaltyView extends InputOf<AbusePenalty> {
  /**
   * Read-only output: The action of AbusePenalty.
   */
  readonly action?: Expression<AbusePenaltyAction> | undefined;
  /**
   * Read-only output: The datetime of expiration of the AbusePenalty.
   */
  readonly expiration?: Expression<Date> | undefined;
  /**
   * Read-only output: The percentage of rate limit.
   */
  readonly rateLimitPercentage?: Expression<number> | undefined;
}

export const abusePenaltyShape: FlatModelShape = createFlatModelShape({
  action: { armPath: ["action"], value: createUnionShape(), readOnly: true },
  expiration: {
    armPath: ["expiration"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  rateLimitPercentage: {
    armPath: ["rateLimitPercentage"],
    value: createNumberShape(),
    readOnly: true,
  },
});

export interface AccessKeyAuthTypeConnectionProperties {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "AccessKey".
   */
  authType: "AccessKey";
  /**
   * Category of the connection
   */
  category?: ConnectionCategory;
  createdByWorkspaceArmId?: string;
  credentials?: ConnectionAccessKey;
  /**
   * Provides the error message if the connection fails
   */
  error?: string;
  expiryTime?: Date;
  /**
   * Group based on connection category
   */
  group?: ConnectionGroup;
  isSharedToAll?: boolean;
  /**
   * Store user metadata for this connection
   */
  metadata?: Record<string, string>;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ManagedPeRequirement;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ManagedPeStatus;
  sharedUserList?: string[];
  /**
   * The connection URL to be used.
   */
  target?: string;
  useWorkspaceManagedIdentity?: boolean;
}

export interface AccessKeyAuthTypeConnectionPropertiesInput extends InputOf<AccessKeyAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "AccessKey".
   */
  authType: "AccessKey";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  credentials?: ConnectionAccessKeyInput | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export interface AccessKeyAuthTypeConnectionPropertiesView extends InputOf<AccessKeyAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "AccessKey".
   */
  authType: "AccessKey";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  readonly createdByWorkspaceArmId?: Expression<string> | undefined;
  credentials?: ConnectionAccessKeyView | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Read-only output: Group based on connection category
   */
  readonly group?: Expression<ConnectionGroup> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export const accessKeyAuthTypeConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  authType: { armPath: ["authType"], value: createStringLiteralShape() },
  category: { armPath: ["category"], value: createUnionShape() },
  createdByWorkspaceArmId: {
    armPath: ["createdByWorkspaceArmId"],
    value: createStringShape(),
    readOnly: true,
  },
  credentials: {
    armPath: ["credentials"],
    value: createDeferredShape(() => connectionAccessKeyShape),
  },
  error: { armPath: ["error"], value: createStringShape() },
  expiryTime: {
    armPath: ["expiryTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  group: { armPath: ["group"], value: createUnionShape(), readOnly: true },
  isSharedToAll: { armPath: ["isSharedToAll"], value: createBooleanShape() },
  metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
  peRequirement: { armPath: ["peRequirement"], value: createUnionShape() },
  peStatus: { armPath: ["peStatus"], value: createUnionShape() },
  sharedUserList: { armPath: ["sharedUserList"], value: createArrayShape(createStringShape()) },
  target: { armPath: ["target"], value: createStringShape() },
  useWorkspaceManagedIdentity: {
    armPath: ["useWorkspaceManagedIdentity"],
    value: createBooleanShape(),
  },
});

/**
 * This connection type covers the account key connection for Azure storage
 */
export interface AccountKeyAuthTypeConnectionProperties {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "AccountKey".
   */
  authType: "AccountKey";
  /**
   * Category of the connection
   */
  category?: ConnectionCategory;
  createdByWorkspaceArmId?: string;
  /**
   * Account key object for connection credential.
   */
  credentials?: ConnectionAccountKey;
  /**
   * Provides the error message if the connection fails
   */
  error?: string;
  expiryTime?: Date;
  /**
   * Group based on connection category
   */
  group?: ConnectionGroup;
  isSharedToAll?: boolean;
  /**
   * Store user metadata for this connection
   */
  metadata?: Record<string, string>;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ManagedPeRequirement;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ManagedPeStatus;
  sharedUserList?: string[];
  /**
   * The connection URL to be used.
   */
  target?: string;
  useWorkspaceManagedIdentity?: boolean;
}

/**
 * Input type for This connection type covers the account key connection for Azure storage
 */
export interface AccountKeyAuthTypeConnectionPropertiesInput extends InputOf<AccountKeyAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "AccountKey".
   */
  authType: "AccountKey";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  /**
   * Account key object for connection credential.
   */
  credentials?: ConnectionAccountKeyInput | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for This connection type covers the account key connection for Azure storage
 */
export interface AccountKeyAuthTypeConnectionPropertiesView extends InputOf<AccountKeyAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "AccountKey".
   */
  authType: "AccountKey";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  readonly createdByWorkspaceArmId?: Expression<string> | undefined;
  /**
   * Account key object for connection credential.
   */
  credentials?: ConnectionAccountKeyView | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Read-only output: Group based on connection category
   */
  readonly group?: Expression<ConnectionGroup> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export const accountKeyAuthTypeConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  authType: { armPath: ["authType"], value: createStringLiteralShape() },
  category: { armPath: ["category"], value: createUnionShape() },
  createdByWorkspaceArmId: {
    armPath: ["createdByWorkspaceArmId"],
    value: createStringShape(),
    readOnly: true,
  },
  credentials: {
    armPath: ["credentials"],
    value: createDeferredShape(() => connectionAccountKeyShape),
  },
  error: { armPath: ["error"], value: createStringShape() },
  expiryTime: {
    armPath: ["expiryTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  group: { armPath: ["group"], value: createUnionShape(), readOnly: true },
  isSharedToAll: { armPath: ["isSharedToAll"], value: createBooleanShape() },
  metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
  peRequirement: { armPath: ["peRequirement"], value: createUnionShape() },
  peStatus: { armPath: ["peStatus"], value: createUnionShape() },
  sharedUserList: { armPath: ["sharedUserList"], value: createArrayShape(createStringShape()) },
  target: { armPath: ["target"], value: createStringShape() },
  useWorkspaceManagedIdentity: {
    armPath: ["useWorkspaceManagedIdentity"],
    value: createBooleanShape(),
  },
});

/**
 * Properties of Cognitive Services account.
 */
export interface AccountProperties {
  /**
   * The abuse penalty.
   */
  abusePenalty?: AbusePenalty;
  allowedFqdnList?: string[];
  /**
   * Specifies whether this resource support project management as child resources, used as containers for access management, data isolation and cost in AI Foundry.
   */
  allowProjectManagement?: boolean;
  /**
   * The user owned AML account properties.
   */
  amlWorkspace?: UserOwnedAmlWorkspace;
  /**
   * The api properties for special APIs.
   */
  apiProperties?: ApiProperties;
  /**
   * Specifies the projects, by project name, that are associated with this resource.
   */
  associatedProjects?: string[];
  /**
   * The call rate limit Cognitive Services account.
   */
  callRateLimit?: CallRateLimit;
  /**
   * Gets the capabilities of the cognitive services account. Each item indicates the capability of a specific feature. The values are read-only and for reference only.
   */
  capabilities?: SkuCapability[];
  /**
   * The commitment plan associations of Cognitive Services account.
   */
  commitmentPlanAssociations?: CommitmentPlanAssociation[];
  /**
   * Optional subdomain name used for token-based authentication.
   */
  customSubDomainName?: string;
  /**
   * Gets the date of cognitive services account creation.
   */
  dateCreated?: string;
  /**
   * Specifies the project, by project name, that is targeted when data plane endpoints are called without a project parameter.
   */
  defaultProject?: string;
  /**
   * The deletion date, only available for deleted account.
   */
  deletionDate?: string;
  disableLocalAuth?: boolean;
  /**
   * The flag to enable dynamic throttling.
   */
  dynamicThrottlingEnabled?: boolean;
  /**
   * The encryption properties for this resource.
   */
  encryption?: Encryption;
  /**
   * Endpoint of the created account.
   */
  endpoint?: string;
  /**
   * Dictionary of <string>
   */
  endpoints?: Record<string, string>;
  /**
   * The internal identifier (deprecated, do not use this property).
   */
  internalId?: string;
  /**
   * If the resource is migrated from an existing key.
   */
  isMigrated?: boolean;
  /**
   * The multiregion settings of Cognitive Services account.
   */
  locations?: MultiRegionSettings;
  /**
   * Resource migration token.
   */
  migrationToken?: string;
  /**
   * A collection of rules governing the accessibility from specific network locations.
   */
  networkAcls?: NetworkRuleSet;
  networkInjections?: NetworkInjection[];
  /**
   * The private endpoint connection associated with the Cognitive Services account.
   */
  privateEndpointConnections?: CognitiveServicesPrivateEndpointConnection[];
  /**
   * Gets the status of the cognitive services account at the time the operation was called.
   */
  provisioningState?: ProvisioningState;
  /**
   * Whether or not public endpoint access is allowed for this account.
   */
  publicNetworkAccess?: PublicNetworkAccess;
  quotaLimit?: QuotaLimit;
  /**
   * Cognitive Services Rai Monitor Config.
   */
  raiMonitorConfig?: RaiMonitorConfig;
  restore?: boolean;
  restrictOutboundNetworkAccess?: boolean;
  /**
   * The scheduled purge date, only available for deleted account.
   */
  scheduledPurgeDate?: string;
  /**
   * Sku change info of account.
   */
  skuChangeInfo?: SkuChangeInfo;
  /**
   * The flag to disable stored completions.
   */
  storedCompletionsDisabled?: boolean;
  /**
   * The storage accounts for this resource.
   */
  userOwnedStorage?: UserOwnedStorage[];
}

/**
 * Input type for Properties of Cognitive Services account.
 */
export interface AccountPropertiesInput extends InputOf<AccountProperties> {
  allowedFqdnList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies whether this resource support project management as child resources, used as containers for access management, data isolation and cost in AI Foundry.
   */
  allowProjectManagement?: ExpressionOrValue<boolean> | undefined;
  /**
   * The user owned AML account properties.
   */
  amlWorkspace?: UserOwnedAmlWorkspaceInput | undefined;
  /**
   * The api properties for special APIs.
   */
  apiProperties?: ApiPropertiesInput | undefined;
  /**
   * Specifies the projects, by project name, that are associated with this resource.
   */
  associatedProjects?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Optional subdomain name used for token-based authentication.
   */
  customSubDomainName?: ExpressionOrValue<string> | undefined;
  /**
   * Specifies the project, by project name, that is targeted when data plane endpoints are called without a project parameter.
   */
  defaultProject?: ExpressionOrValue<string> | undefined;
  disableLocalAuth?: ExpressionOrValue<boolean> | undefined;
  /**
   * The flag to enable dynamic throttling.
   */
  dynamicThrottlingEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The encryption properties for this resource.
   */
  encryption?: EncryptionInput | undefined;
  /**
   * The multiregion settings of Cognitive Services account.
   */
  locations?: MultiRegionSettingsInput | undefined;
  /**
   * Resource migration token.
   */
  migrationToken?: ExpressionOrValue<string> | undefined;
  /**
   * A collection of rules governing the accessibility from specific network locations.
   */
  networkAcls?: NetworkRuleSetInput | undefined;
  networkInjections?: InputArray<NetworkInjectionInput, NetworkInjection[]> | undefined;
  /**
   * Whether or not public endpoint access is allowed for this account.
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  /**
   * Cognitive Services Rai Monitor Config.
   */
  raiMonitorConfig?: RaiMonitorConfigInput | undefined;
  restore?: ExpressionOrValue<boolean> | undefined;
  restrictOutboundNetworkAccess?: ExpressionOrValue<boolean> | undefined;
  /**
   * The flag to disable stored completions.
   */
  storedCompletionsDisabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The storage accounts for this resource.
   */
  userOwnedStorage?: InputArray<UserOwnedStorageInput, UserOwnedStorage[]> | undefined;
}

/**
 * View type for Properties of Cognitive Services account.
 */
export interface AccountPropertiesView extends InputOf<AccountProperties> {
  /**
   * Read-only output: The abuse penalty.
   */
  readonly abusePenalty?: Expression<AbusePenalty> | undefined;
  allowedFqdnList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Specifies whether this resource support project management as child resources, used as containers for access management, data isolation and cost in AI Foundry.
   */
  allowProjectManagement?: ExpressionOrValue<boolean> | undefined;
  /**
   * The user owned AML account properties.
   */
  amlWorkspace?: UserOwnedAmlWorkspaceView | undefined;
  /**
   * The api properties for special APIs.
   */
  apiProperties?: ApiPropertiesView | undefined;
  /**
   * Specifies the projects, by project name, that are associated with this resource.
   */
  associatedProjects?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Read-only output: The call rate limit Cognitive Services account.
   */
  readonly callRateLimit?: Expression<CallRateLimit> | undefined;
  /**
   * Read-only output: Gets the capabilities of the cognitive services account. Each item indicates the capability of a specific feature. The values are read-only and for reference only.
   */
  readonly capabilities?: Expression<SkuCapability[]> | undefined;
  /**
   * Read-only output: The commitment plan associations of Cognitive Services account.
   */
  readonly commitmentPlanAssociations?: Expression<CommitmentPlanAssociation[]> | undefined;
  /**
   * Optional subdomain name used for token-based authentication.
   */
  customSubDomainName?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Gets the date of cognitive services account creation.
   */
  readonly dateCreated?: Expression<string> | undefined;
  /**
   * Specifies the project, by project name, that is targeted when data plane endpoints are called without a project parameter.
   */
  defaultProject?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The deletion date, only available for deleted account.
   */
  readonly deletionDate?: Expression<string> | undefined;
  disableLocalAuth?: ExpressionOrValue<boolean> | undefined;
  /**
   * The flag to enable dynamic throttling.
   */
  dynamicThrottlingEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The encryption properties for this resource.
   */
  encryption?: EncryptionView | undefined;
  /**
   * Read-only output: Endpoint of the created account.
   */
  readonly endpoint?: Expression<string> | undefined;
  /**
   * Read-only output: Dictionary of <string>
   */
  readonly endpoints?: Expression<Record<string, string>> | undefined;
  /**
   * Read-only output: The internal identifier (deprecated, do not use this property).
   */
  readonly internalId?: Expression<string> | undefined;
  /**
   * Read-only output: If the resource is migrated from an existing key.
   */
  readonly isMigrated?: Expression<boolean> | undefined;
  /**
   * The multiregion settings of Cognitive Services account.
   */
  locations?: MultiRegionSettingsView | undefined;
  /**
   * Resource migration token.
   */
  migrationToken?: ExpressionOrValue<string> | undefined;
  /**
   * A collection of rules governing the accessibility from specific network locations.
   */
  networkAcls?: NetworkRuleSetView | undefined;
  networkInjections?: InputArray<NetworkInjectionView, NetworkInjection[]> | undefined;
  /**
   * Read-only output: The private endpoint connection associated with the Cognitive Services account.
   */
  readonly privateEndpointConnections?:
    Expression<CognitiveServicesPrivateEndpointConnection[]> | undefined;
  /**
   * Read-only output: Gets the status of the cognitive services account at the time the operation was called.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * Whether or not public endpoint access is allowed for this account.
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  readonly quotaLimit?: Expression<QuotaLimit> | undefined;
  /**
   * Cognitive Services Rai Monitor Config.
   */
  raiMonitorConfig?: RaiMonitorConfigView | undefined;
  restore?: ExpressionOrValue<boolean> | undefined;
  restrictOutboundNetworkAccess?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The scheduled purge date, only available for deleted account.
   */
  readonly scheduledPurgeDate?: Expression<string> | undefined;
  /**
   * Read-only output: Sku change info of account.
   */
  readonly skuChangeInfo?: Expression<SkuChangeInfo> | undefined;
  /**
   * The flag to disable stored completions.
   */
  storedCompletionsDisabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The storage accounts for this resource.
   */
  userOwnedStorage?: InputArray<UserOwnedStorageView, UserOwnedStorage[]> | undefined;
}

export const accountPropertiesShape: FlatModelShape = createFlatModelShape({
  abusePenalty: {
    armPath: ["abusePenalty"],
    value: createDeferredShape(() => abusePenaltyShape),
    readOnly: true,
  },
  allowedFqdnList: { armPath: ["allowedFqdnList"], value: createArrayShape(createStringShape()) },
  allowProjectManagement: { armPath: ["allowProjectManagement"], value: createBooleanShape() },
  amlWorkspace: {
    armPath: ["amlWorkspace"],
    value: createDeferredShape(() => userOwnedAmlWorkspaceShape),
  },
  apiProperties: {
    armPath: ["apiProperties"],
    value: createDeferredShape(() => apiPropertiesShape),
  },
  associatedProjects: {
    armPath: ["associatedProjects"],
    value: createArrayShape(createStringShape()),
  },
  callRateLimit: {
    armPath: ["callRateLimit"],
    value: createDeferredShape(() => callRateLimitShape),
    readOnly: true,
  },
  capabilities: {
    armPath: ["capabilities"],
    value: createArrayShape(createDeferredShape(() => skuCapabilityShape)),
    readOnly: true,
  },
  commitmentPlanAssociations: {
    armPath: ["commitmentPlanAssociations"],
    value: createArrayShape(createDeferredShape(() => commitmentPlanAssociationShape)),
    readOnly: true,
  },
  customSubDomainName: { armPath: ["customSubDomainName"], value: createStringShape() },
  dateCreated: { armPath: ["dateCreated"], value: createStringShape(), readOnly: true },
  defaultProject: { armPath: ["defaultProject"], value: createStringShape() },
  deletionDate: { armPath: ["deletionDate"], value: createStringShape(), readOnly: true },
  disableLocalAuth: { armPath: ["disableLocalAuth"], value: createBooleanShape() },
  dynamicThrottlingEnabled: { armPath: ["dynamicThrottlingEnabled"], value: createBooleanShape() },
  encryption: { armPath: ["encryption"], value: createDeferredShape(() => encryptionShape) },
  endpoint: { armPath: ["endpoint"], value: createStringShape(), readOnly: true },
  endpoints: {
    armPath: ["endpoints"],
    value: createRecordShape(createStringShape()),
    readOnly: true,
  },
  internalId: { armPath: ["internalId"], value: createStringShape(), readOnly: true },
  isMigrated: { armPath: ["isMigrated"], value: createBooleanShape(), readOnly: true },
  locations: { armPath: ["locations"], value: createDeferredShape(() => multiRegionSettingsShape) },
  migrationToken: { armPath: ["migrationToken"], value: createStringShape() },
  networkAcls: { armPath: ["networkAcls"], value: createDeferredShape(() => networkRuleSetShape) },
  networkInjections: {
    armPath: ["networkInjections"],
    value: createArrayShape(createDeferredShape(() => networkInjectionShape)),
  },
  privateEndpointConnections: {
    armPath: ["privateEndpointConnections"],
    value: createArrayShape(
      createDeferredShape(() => cognitiveServicesPrivateEndpointConnectionShape),
    ),
    readOnly: true,
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  publicNetworkAccess: { armPath: ["publicNetworkAccess"], value: createUnionShape() },
  quotaLimit: {
    armPath: ["quotaLimit"],
    value: createDeferredShape(() => quotaLimitShape),
    readOnly: true,
  },
  raiMonitorConfig: {
    armPath: ["raiMonitorConfig"],
    value: createDeferredShape(() => raiMonitorConfigShape),
  },
  restore: { armPath: ["restore"], value: createBooleanShape() },
  restrictOutboundNetworkAccess: {
    armPath: ["restrictOutboundNetworkAccess"],
    value: createBooleanShape(),
  },
  scheduledPurgeDate: {
    armPath: ["scheduledPurgeDate"],
    value: createStringShape(),
    readOnly: true,
  },
  skuChangeInfo: {
    armPath: ["skuChangeInfo"],
    value: createDeferredShape(() => skuChangeInfoShape),
    readOnly: true,
  },
  storedCompletionsDisabled: {
    armPath: ["storedCompletionsDisabled"],
    value: createBooleanShape(),
  },
  userOwnedStorage: {
    armPath: ["userOwnedStorage"],
    value: createArrayShape(createDeferredShape(() => userOwnedStorageShape)),
  },
});

/**
 * Type representing an agent deployment as a management construct.
 */
export type AgentDeploymentProperties = ManagedAgentDeployment | HostedAgentDeployment;

/**
 * Input type for Type representing an agent deployment as a management construct.
 */
export type AgentDeploymentPropertiesInput =
  ManagedAgentDeploymentInput | HostedAgentDeploymentInput;

/**
 * View type for Type representing an agent deployment as a management construct.
 */
export type AgentDeploymentPropertiesView = ManagedAgentDeploymentView | HostedAgentDeploymentView;

export const agentDeploymentPropertiesShape: DiscriminatedModelShape =
  createDiscriminatedModelShape("deploymentType", {
    Managed: createDeferredShape(() => managedAgentDeploymentShape),
    Hosted: createDeferredShape(() => hostedAgentDeploymentShape),
  });

/**
 * Resource type representing an agentic application as a management construct.
 */
export interface AgenticApplicationProperties {
  /**
   * The EntraId Agentic Blueprint of the application.
   */
  agentIdentityBlueprint?: AssignedIdentity | null;
  /**
   * The list of agent definitions comprising this application, returned as references to the objects under the parent project; use this to obtain a flat list of all agent-version pairs represented by this application.
   */
  agents?: AgentReferenceProperties[] | null;
  /**
   * Gets or sets the authorization policy associated with this agentic application instance.
   */
  authorizationPolicy?: ApplicationAuthorizationPolicy | null;
  /**
   * The application's dedicated invocation endpoint.
   */
  baseUrl?: string | null;
  /**
   * The (default) agent instance identity of the application.
   */
  defaultInstanceIdentity?: AssignedIdentity | null;
  /**
   * The asset description text.
   */
  description?: string | null;
  /**
   * The display name of the application.
   */
  displayName?: string | null;
  /**
   * Enabledstate of the application.
   */
  isEnabled?: boolean;
  /**
   * Provisioning state of the application.
   */
  provisioningState?: AgenticApplicationProvisioningState;
  /**
   * Tag dictionary. Tags can be added, removed, and updated.
   */
  tags?: Record<string, string> | null;
  /**
   * Gets or sets the traffic routing policy for the application's deployments.
   */
  trafficRoutingPolicy?: ApplicationTrafficRoutingPolicy | null;
}

/**
 * Input type for Resource type representing an agentic application as a management construct.
 */
export interface AgenticApplicationPropertiesInput extends InputOf<AgenticApplicationProperties> {
  /**
   * The EntraId Agentic Blueprint of the application.
   */
  agentIdentityBlueprint?: AssignedIdentityInput | ExpressionOrValue<null> | undefined;
  /**
   * The list of agent definitions comprising this application, returned as references to the objects under the parent project; use this to obtain a flat list of all agent-version pairs represented by this application.
   */
  agents?:
    | InputArray<AgentReferencePropertiesInput, AgentReferenceProperties[]>
    | ExpressionOrValue<null>
    | undefined;
  /**
   * Gets or sets the authorization policy associated with this agentic application instance.
   */
  authorizationPolicy?: ApplicationAuthorizationPolicyInput | ExpressionOrValue<null> | undefined;
  /**
   * The application's dedicated invocation endpoint.
   */
  baseUrl?: ExpressionOrValue<string | null> | undefined;
  /**
   * The (default) agent instance identity of the application.
   */
  defaultInstanceIdentity?: AssignedIdentityInput | ExpressionOrValue<null> | undefined;
  /**
   * The asset description text.
   */
  description?: ExpressionOrValue<string | null> | undefined;
  /**
   * The display name of the application.
   */
  displayName?: ExpressionOrValue<string | null> | undefined;
  /**
   * Tag dictionary. Tags can be added, removed, and updated.
   */
  tags?: ExpressionOrValue<Record<string, string> | null> | undefined;
  /**
   * Gets or sets the traffic routing policy for the application's deployments.
   */
  trafficRoutingPolicy?: ApplicationTrafficRoutingPolicyInput | ExpressionOrValue<null> | undefined;
}

/**
 * View type for Resource type representing an agentic application as a management construct.
 */
export interface AgenticApplicationPropertiesView extends InputOf<AgenticApplicationProperties> {
  /**
   * The EntraId Agentic Blueprint of the application.
   */
  agentIdentityBlueprint?: AssignedIdentityView | ExpressionOrValue<null> | undefined;
  /**
   * The list of agent definitions comprising this application, returned as references to the objects under the parent project; use this to obtain a flat list of all agent-version pairs represented by this application.
   */
  agents?:
    | InputArray<AgentReferencePropertiesView, AgentReferenceProperties[]>
    | ExpressionOrValue<null>
    | undefined;
  /**
   * Gets or sets the authorization policy associated with this agentic application instance.
   */
  authorizationPolicy?: ApplicationAuthorizationPolicyView | ExpressionOrValue<null> | undefined;
  /**
   * The application's dedicated invocation endpoint.
   */
  baseUrl?: ExpressionOrValue<string | null> | undefined;
  /**
   * The (default) agent instance identity of the application.
   */
  defaultInstanceIdentity?: AssignedIdentityView | ExpressionOrValue<null> | undefined;
  /**
   * The asset description text.
   */
  description?: ExpressionOrValue<string | null> | undefined;
  /**
   * The display name of the application.
   */
  displayName?: ExpressionOrValue<string | null> | undefined;
  /**
   * Read-only output: Enabledstate of the application.
   */
  readonly isEnabled?: Expression<boolean> | undefined;
  /**
   * Read-only output: Provisioning state of the application.
   */
  readonly provisioningState?: Expression<AgenticApplicationProvisioningState> | undefined;
  /**
   * Tag dictionary. Tags can be added, removed, and updated.
   */
  tags?: ExpressionOrValue<Record<string, string> | null> | undefined;
  /**
   * Gets or sets the traffic routing policy for the application's deployments.
   */
  trafficRoutingPolicy?: ApplicationTrafficRoutingPolicyView | ExpressionOrValue<null> | undefined;
}

export const agenticApplicationPropertiesShape: FlatModelShape = createFlatModelShape({
  agentIdentityBlueprint: {
    armPath: ["agentIdentityBlueprint"],
    value: createDeferredShape(() => assignedIdentityShape),
  },
  agents: {
    armPath: ["agents"],
    value: createArrayShape(createDeferredShape(() => agentReferencePropertiesShape)),
  },
  authorizationPolicy: {
    armPath: ["authorizationPolicy"],
    value: createDeferredShape(() => applicationAuthorizationPolicyShape),
  },
  baseUrl: { armPath: ["baseUrl"], value: createStringShape() },
  defaultInstanceIdentity: {
    armPath: ["defaultInstanceIdentity"],
    value: createDeferredShape(() => assignedIdentityShape),
  },
  description: { armPath: ["description"], value: createStringShape() },
  displayName: { armPath: ["displayName"], value: createStringShape() },
  isEnabled: { armPath: ["isEnabled"], value: createBooleanShape(), readOnly: true },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
  trafficRoutingPolicy: {
    armPath: ["trafficRoutingPolicy"],
    value: createDeferredShape(() => applicationTrafficRoutingPolicyShape),
  },
});

/**
 * Type modeling the protocol and version used by an agent/exposed by a deployment.
 */
export interface AgentProtocolVersion {
  /**
   * The protocol used by the agent/exposed by a deployment.
   */
  protocol?: AgentProtocol;
  /**
   * The version of the protocol.
   */
  version?: string | null;
}

/**
 * Input type for Type modeling the protocol and version used by an agent/exposed by a deployment.
 */
export interface AgentProtocolVersionInput extends InputOf<AgentProtocolVersion> {
  /**
   * The protocol used by the agent/exposed by a deployment.
   */
  protocol?: ExpressionOrValue<AgentProtocol> | undefined;
  /**
   * The version of the protocol.
   */
  version?: ExpressionOrValue<string | null> | undefined;
}

/**
 * View type for Type modeling the protocol and version used by an agent/exposed by a deployment.
 */
export type AgentProtocolVersionView = AgentProtocolVersionInput;

export const agentProtocolVersionShape: FlatModelShape = createFlatModelShape({
  protocol: { armPath: ["protocol"], value: createUnionShape() },
  version: { armPath: ["version"], value: createStringShape() },
});

/**
 * Type modeling a reference to a version of an agent definition.
 */
export interface AgentReferenceProperties {
  /**
   * Gets the agent's unique identifier within the organization (subscription).
   */
  agentId?: string | null;
  /**
   * Gets the agent's name (unique within the project/app).
   */
  agentName?: string | null;
}

/**
 * Input type for Type modeling a reference to a version of an agent definition.
 */
export interface AgentReferencePropertiesInput extends InputOf<AgentReferenceProperties> {
  /**
   * Gets the agent's unique identifier within the organization (subscription).
   */
  agentId?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets the agent's name (unique within the project/app).
   */
  agentName?: ExpressionOrValue<string | null> | undefined;
}

/**
 * View type for Type modeling a reference to a version of an agent definition.
 */
export type AgentReferencePropertiesView = AgentReferencePropertiesInput;

export const agentReferencePropertiesShape: FlatModelShape = createFlatModelShape({
  agentId: { armPath: ["agentId"], value: createStringShape() },
  agentName: { armPath: ["agentName"], value: createStringShape() },
});

/**
 * This connection type covers the generic ApiKey auth connection categories, for examples:
 * AzureOpenAI:
 * Category:= AzureOpenAI
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {ApiKey} as .ApiKey
 * Target:= {ApiBase}
 *
 * CognitiveService:
 * Category:= CognitiveService
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {SubscriptionKey} as ApiKey
 * Target:= ServiceRegion={serviceRegion}
 *
 * CognitiveSearch:
 * Category:= CognitiveSearch
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {Key} as ApiKey
 * Target:= {Endpoint}
 *
 * Use Metadata property bag for ApiType, ApiVersion, Kind and other metadata fields
 */
export interface ApiKeyAuthConnectionProperties {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "ApiKey".
   */
  authType: "ApiKey";
  /**
   * Category of the connection
   */
  category?: ConnectionCategory;
  createdByWorkspaceArmId?: string;
  /**
   * Api key object for connection credential.
   */
  credentials?: ConnectionApiKey;
  /**
   * Provides the error message if the connection fails
   */
  error?: string;
  expiryTime?: Date;
  /**
   * Group based on connection category
   */
  group?: ConnectionGroup;
  isSharedToAll?: boolean;
  /**
   * Store user metadata for this connection
   */
  metadata?: Record<string, string>;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ManagedPeRequirement;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ManagedPeStatus;
  sharedUserList?: string[];
  /**
   * The connection URL to be used.
   */
  target?: string;
  useWorkspaceManagedIdentity?: boolean;
}

/**
 * Input type for This connection type covers the generic ApiKey auth connection categories, for examples:
 * AzureOpenAI:
 * Category:= AzureOpenAI
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {ApiKey} as .ApiKey
 * Target:= {ApiBase}
 *
 * CognitiveService:
 * Category:= CognitiveService
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {SubscriptionKey} as ApiKey
 * Target:= ServiceRegion={serviceRegion}
 *
 * CognitiveSearch:
 * Category:= CognitiveSearch
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {Key} as ApiKey
 * Target:= {Endpoint}
 *
 * Use Metadata property bag for ApiType, ApiVersion, Kind and other metadata fields
 */
export interface ApiKeyAuthConnectionPropertiesInput extends InputOf<ApiKeyAuthConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "ApiKey".
   */
  authType: "ApiKey";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  /**
   * Api key object for connection credential.
   */
  credentials?: ConnectionApiKeyInput | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for This connection type covers the generic ApiKey auth connection categories, for examples:
 * AzureOpenAI:
 * Category:= AzureOpenAI
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {ApiKey} as .ApiKey
 * Target:= {ApiBase}
 *
 * CognitiveService:
 * Category:= CognitiveService
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {SubscriptionKey} as ApiKey
 * Target:= ServiceRegion={serviceRegion}
 *
 * CognitiveSearch:
 * Category:= CognitiveSearch
 * AuthType:= ApiKey (as type discriminator)
 * Credentials:= {Key} as ApiKey
 * Target:= {Endpoint}
 *
 * Use Metadata property bag for ApiType, ApiVersion, Kind and other metadata fields
 */
export interface ApiKeyAuthConnectionPropertiesView extends InputOf<ApiKeyAuthConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "ApiKey".
   */
  authType: "ApiKey";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  readonly createdByWorkspaceArmId?: Expression<string> | undefined;
  /**
   * Api key object for connection credential.
   */
  credentials?: ConnectionApiKeyView | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Read-only output: Group based on connection category
   */
  readonly group?: Expression<ConnectionGroup> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export const apiKeyAuthConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  authType: { armPath: ["authType"], value: createStringLiteralShape() },
  category: { armPath: ["category"], value: createUnionShape() },
  createdByWorkspaceArmId: {
    armPath: ["createdByWorkspaceArmId"],
    value: createStringShape(),
    readOnly: true,
  },
  credentials: {
    armPath: ["credentials"],
    value: createDeferredShape(() => connectionApiKeyShape),
  },
  error: { armPath: ["error"], value: createStringShape() },
  expiryTime: {
    armPath: ["expiryTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  group: { armPath: ["group"], value: createUnionShape(), readOnly: true },
  isSharedToAll: { armPath: ["isSharedToAll"], value: createBooleanShape() },
  metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
  peRequirement: { armPath: ["peRequirement"], value: createUnionShape() },
  peStatus: { armPath: ["peStatus"], value: createUnionShape() },
  sharedUserList: { armPath: ["sharedUserList"], value: createArrayShape(createStringShape()) },
  target: { armPath: ["target"], value: createStringShape() },
  useWorkspaceManagedIdentity: {
    armPath: ["useWorkspaceManagedIdentity"],
    value: createBooleanShape(),
  },
});

/**
 * The api properties for special APIs.
 */
export interface ApiProperties {
  /**
   * (Metrics Advisor Only) The Azure AD Client Id (Application Id).
   */
  aadClientId?: string;
  /**
   * (Metrics Advisor Only) The Azure AD Tenant Id.
   */
  aadTenantId?: string;
  /**
   * (Personalization Only) The flag to enable statistics of Bing Search.
   */
  eventHubConnectionString?: string;
  /**
   * (QnAMaker Only) The Azure Search endpoint id of QnAMaker.
   */
  qnaAzureSearchEndpointId?: string;
  /**
   * (QnAMaker Only) The Azure Search endpoint key of QnAMaker.
   */
  qnaAzureSearchEndpointKey?: string;
  /**
   * (QnAMaker Only) The runtime endpoint of QnAMaker.
   */
  qnaRuntimeEndpoint?: string;
  /**
   * (Bing Search Only) The flag to enable statistics of Bing Search.
   */
  statisticsEnabled?: boolean;
  /**
   * (Personalization Only) The storage account connection string.
   */
  storageAccountConnectionString?: string;
  /**
   * (Metrics Advisor Only) The super user of Metrics Advisor.
   */
  superUser?: string;
  /**
   * (Metrics Advisor Only) The website name of Metrics Advisor.
   */
  websiteName?: string;
}

/**
 * Input type for The api properties for special APIs.
 */
export interface ApiPropertiesInput extends InputOf<ApiProperties> {
  /**
   * (Metrics Advisor Only) The Azure AD Client Id (Application Id).
   */
  aadClientId?: ExpressionOrValue<string> | undefined;
  /**
   * (Metrics Advisor Only) The Azure AD Tenant Id.
   */
  aadTenantId?: ExpressionOrValue<string> | undefined;
  /**
   * (Personalization Only) The flag to enable statistics of Bing Search.
   */
  eventHubConnectionString?: ExpressionOrValue<string> | undefined;
  /**
   * (QnAMaker Only) The Azure Search endpoint id of QnAMaker.
   */
  qnaAzureSearchEndpointId?: ExpressionOrValue<string> | undefined;
  /**
   * (QnAMaker Only) The Azure Search endpoint key of QnAMaker.
   */
  qnaAzureSearchEndpointKey?: ExpressionOrValue<string> | undefined;
  /**
   * (QnAMaker Only) The runtime endpoint of QnAMaker.
   */
  qnaRuntimeEndpoint?: ExpressionOrValue<string> | undefined;
  /**
   * (Bing Search Only) The flag to enable statistics of Bing Search.
   */
  statisticsEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * (Personalization Only) The storage account connection string.
   */
  storageAccountConnectionString?: ExpressionOrValue<string> | undefined;
  /**
   * (Metrics Advisor Only) The super user of Metrics Advisor.
   */
  superUser?: ExpressionOrValue<string> | undefined;
  /**
   * (Metrics Advisor Only) The website name of Metrics Advisor.
   */
  websiteName?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The api properties for special APIs.
 */
export type ApiPropertiesView = ApiPropertiesInput;

export const apiPropertiesShape: FlatModelShape = createFlatModelShape({
  aadClientId: { armPath: ["aadClientId"], value: createStringShape() },
  aadTenantId: { armPath: ["aadTenantId"], value: createStringShape() },
  eventHubConnectionString: { armPath: ["eventHubConnectionString"], value: createStringShape() },
  qnaAzureSearchEndpointId: { armPath: ["qnaAzureSearchEndpointId"], value: createStringShape() },
  qnaAzureSearchEndpointKey: { armPath: ["qnaAzureSearchEndpointKey"], value: createStringShape() },
  qnaRuntimeEndpoint: { armPath: ["qnaRuntimeEndpoint"], value: createStringShape() },
  statisticsEnabled: { armPath: ["statisticsEnabled"], value: createBooleanShape() },
  storageAccountConnectionString: {
    armPath: ["storageAccountConnectionString"],
    value: createStringShape(),
  },
  superUser: { armPath: ["superUser"], value: createStringShape() },
  websiteName: { armPath: ["websiteName"], value: createStringShape() },
});

/**
 * Represents a policy for authorizing applications based on specified authentication and authorization schemes.
 */
export type ApplicationAuthorizationPolicy =
  | RoleBasedBuiltInAuthorizationPolicy
  | OrganizationSharedBuiltInAuthorizationPolicy
  | ChannelsBuiltInAuthorizationPolicy;

/**
 * Input type for Represents a policy for authorizing applications based on specified authentication and authorization schemes.
 */
export type ApplicationAuthorizationPolicyInput =
  | RoleBasedBuiltInAuthorizationPolicyInput
  | OrganizationSharedBuiltInAuthorizationPolicyInput
  | ChannelsBuiltInAuthorizationPolicyInput;

/**
 * View type for Represents a policy for authorizing applications based on specified authentication and authorization schemes.
 */
export type ApplicationAuthorizationPolicyView =
  | RoleBasedBuiltInAuthorizationPolicyView
  | OrganizationSharedBuiltInAuthorizationPolicyView
  | ChannelsBuiltInAuthorizationPolicyView;

export const applicationAuthorizationPolicyShape: DiscriminatedModelShape =
  createDiscriminatedModelShape("type", {
    Default: createDeferredShape(() => roleBasedBuiltInAuthorizationPolicyShape),
    OrganizationScope: createDeferredShape(() => organizationSharedBuiltInAuthorizationPolicyShape),
    Channels: createDeferredShape(() => channelsBuiltInAuthorizationPolicyShape),
  });

/**
 * Type representing an application traffic policy as a property of an agentic application.
 */
export interface ApplicationTrafficRoutingPolicy {
  /**
   * Methodology used to route traffic to the application's deployments.
   */
  protocol?: TrafficRoutingProtocol;
  /**
   * Gets or sets the collection of traffic routing rules.
   */
  rules?: TrafficRoutingRule[] | null;
}

/**
 * Input type for Type representing an application traffic policy as a property of an agentic application.
 */
export interface ApplicationTrafficRoutingPolicyInput extends InputOf<ApplicationTrafficRoutingPolicy> {
  /**
   * Methodology used to route traffic to the application's deployments.
   */
  protocol?: ExpressionOrValue<TrafficRoutingProtocol> | undefined;
  /**
   * Gets or sets the collection of traffic routing rules.
   */
  rules?:
    InputArray<TrafficRoutingRuleInput, TrafficRoutingRule[]> | ExpressionOrValue<null> | undefined;
}

/**
 * View type for Type representing an application traffic policy as a property of an agentic application.
 */
export type ApplicationTrafficRoutingPolicyView = ApplicationTrafficRoutingPolicyInput;

export const applicationTrafficRoutingPolicyShape: FlatModelShape = createFlatModelShape({
  protocol: { armPath: ["protocol"], value: createUnionShape() },
  rules: {
    armPath: ["rules"],
    value: createArrayShape(createDeferredShape(() => trafficRoutingRuleShape)),
  },
});

/**
 * Type representing an identity assignment
 */
export interface AssignedIdentity {
  /**
   * The client ID of the identity.
   */
  clientId: string;
  /**
   * Specifies the kind of Entra identity described by this object.
   */
  kind: IdentityKind;
  /**
   * The principal ID of the identity.
   */
  principalId: string;
  /**
   * Represents the provisioning state of an identity resource.
   */
  provisioningState?: IdentityProvisioningState;
  /**
   * The subject of this identity assignment.
   */
  subject?: string | null;
  /**
   * The tenant ID of the identity.
   */
  tenantId: string;
  /**
   * Enumeration of identity types, from the perspective of management.
   */
  type: IdentityManagementType;
}

/**
 * Input type for Type representing an identity assignment
 */
export interface AssignedIdentityInput extends InputOf<AssignedIdentity> {
  /**
   * The client ID of the identity.
   */
  clientId: ExpressionOrValue<string>;
  /**
   * Specifies the kind of Entra identity described by this object.
   */
  kind: ExpressionOrValue<IdentityKind>;
  /**
   * The principal ID of the identity.
   */
  principalId: ExpressionOrValue<string>;
  /**
   * The subject of this identity assignment.
   */
  subject?: ExpressionOrValue<string | null> | undefined;
  /**
   * The tenant ID of the identity.
   */
  tenantId: ExpressionOrValue<string>;
  /**
   * Enumeration of identity types, from the perspective of management.
   */
  type: ExpressionOrValue<IdentityManagementType>;
}

/**
 * View type for Type representing an identity assignment
 */
export interface AssignedIdentityView extends InputOf<AssignedIdentity> {
  /**
   * The client ID of the identity.
   */
  clientId: ExpressionOrValue<string>;
  /**
   * Specifies the kind of Entra identity described by this object.
   */
  kind: ExpressionOrValue<IdentityKind>;
  /**
   * The principal ID of the identity.
   */
  principalId: ExpressionOrValue<string>;
  /**
   * Read-only output: Represents the provisioning state of an identity resource.
   */
  readonly provisioningState?: Expression<IdentityProvisioningState> | undefined;
  /**
   * The subject of this identity assignment.
   */
  subject?: ExpressionOrValue<string | null> | undefined;
  /**
   * The tenant ID of the identity.
   */
  tenantId: ExpressionOrValue<string>;
  /**
   * Enumeration of identity types, from the perspective of management.
   */
  type: ExpressionOrValue<IdentityManagementType>;
}

export const assignedIdentityShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape() },
  kind: { armPath: ["kind"], value: createUnionShape() },
  principalId: { armPath: ["principalId"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  subject: { armPath: ["subject"], value: createStringShape() },
  tenantId: { armPath: ["tenantId"], value: createStringShape() },
  type: { armPath: ["type"], value: createUnionShape() },
});

/**
 * The call rate limit Cognitive Services account.
 */
export interface CallRateLimit {
  /**
   * The count value of Call Rate Limit.
   */
  count?: number;
  /**
   * The renewal period in seconds of Call Rate Limit.
   */
  renewalPeriod?: number;
  rules?: ThrottlingRule[];
}

/**
 * Input type for The call rate limit Cognitive Services account.
 */
export interface CallRateLimitInput extends InputOf<CallRateLimit> {}

/**
 * View type for The call rate limit Cognitive Services account.
 */
export interface CallRateLimitView extends InputOf<CallRateLimit> {
  /**
   * Read-only output: The count value of Call Rate Limit.
   */
  readonly count?: Expression<number> | undefined;
  /**
   * Read-only output: The renewal period in seconds of Call Rate Limit.
   */
  readonly renewalPeriod?: Expression<number> | undefined;
  readonly rules?: Expression<ThrottlingRule[]> | undefined;
}

export const callRateLimitShape: FlatModelShape = createFlatModelShape({
  count: { armPath: ["count"], value: createNumberShape(), readOnly: true },
  renewalPeriod: { armPath: ["renewalPeriod"], value: createNumberShape(), readOnly: true },
  rules: {
    armPath: ["rules"],
    value: createArrayShape(createDeferredShape(() => throttlingRuleShape)),
    readOnly: true,
  },
});

export interface CapabilityHostProperties {
  /**
   * List of AI services connections.
   */
  aiServicesConnections?: string[] | null;
  /**
   * Kind of this capability host.
   */
  capabilityHostKind?: CapabilityHostKind;
  /**
   * Customer subnet info to help set up this capability host.
   */
  customerSubnet?: string | null;
  /**
   * The asset description text.
   */
  description?: string | null;
  /**
   * Whether public hosting environment is enabled for the capability host
   */
  enablePublicHostingEnvironment?: boolean;
  /**
   * Provisioning state for the CapabilityHost.
   */
  provisioningState?: CapabilityHostProvisioningState;
  /**
   * List of connection names from those available in the account or project to be used as a storage resource.
   */
  storageConnections?: string[] | null;
  /**
   * Tag dictionary. Tags can be added, removed, and updated.
   */
  tags?: Record<string, string> | null;
  /**
   * List of connection names from those available in the account or project to be used for Thread storage.
   */
  threadStorageConnections?: string[] | null;
  /**
   * List of connection names from those available in the account or project to be used for vector database (e.g. CosmosDB).
   */
  vectorStoreConnections?: string[] | null;
}

export interface CapabilityHostPropertiesInput extends InputOf<CapabilityHostProperties> {
  /**
   * List of AI services connections.
   */
  aiServicesConnections?: ExpressionOrValue<string[] | null> | undefined;
  /**
   * Kind of this capability host.
   */
  capabilityHostKind?: ExpressionOrValue<CapabilityHostKind> | undefined;
  /**
   * Customer subnet info to help set up this capability host.
   */
  customerSubnet?: ExpressionOrValue<string | null> | undefined;
  /**
   * The asset description text.
   */
  description?: ExpressionOrValue<string | null> | undefined;
  /**
   * Whether public hosting environment is enabled for the capability host
   */
  enablePublicHostingEnvironment?: ExpressionOrValue<boolean> | undefined;
  /**
   * List of connection names from those available in the account or project to be used as a storage resource.
   */
  storageConnections?: ExpressionOrValue<string[] | null> | undefined;
  /**
   * Tag dictionary. Tags can be added, removed, and updated.
   */
  tags?: ExpressionOrValue<Record<string, string> | null> | undefined;
  /**
   * List of connection names from those available in the account or project to be used for Thread storage.
   */
  threadStorageConnections?: ExpressionOrValue<string[] | null> | undefined;
  /**
   * List of connection names from those available in the account or project to be used for vector database (e.g. CosmosDB).
   */
  vectorStoreConnections?: ExpressionOrValue<string[] | null> | undefined;
}

export interface CapabilityHostPropertiesView extends InputOf<CapabilityHostProperties> {
  /**
   * List of AI services connections.
   */
  aiServicesConnections?: ExpressionOrValue<string[] | null> | undefined;
  /**
   * Kind of this capability host.
   */
  capabilityHostKind?: ExpressionOrValue<CapabilityHostKind> | undefined;
  /**
   * Customer subnet info to help set up this capability host.
   */
  customerSubnet?: ExpressionOrValue<string | null> | undefined;
  /**
   * The asset description text.
   */
  description?: ExpressionOrValue<string | null> | undefined;
  /**
   * Whether public hosting environment is enabled for the capability host
   */
  enablePublicHostingEnvironment?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: Provisioning state for the CapabilityHost.
   */
  readonly provisioningState?: Expression<CapabilityHostProvisioningState> | undefined;
  /**
   * List of connection names from those available in the account or project to be used as a storage resource.
   */
  storageConnections?: ExpressionOrValue<string[] | null> | undefined;
  /**
   * Tag dictionary. Tags can be added, removed, and updated.
   */
  tags?: ExpressionOrValue<Record<string, string> | null> | undefined;
  /**
   * List of connection names from those available in the account or project to be used for Thread storage.
   */
  threadStorageConnections?: ExpressionOrValue<string[] | null> | undefined;
  /**
   * List of connection names from those available in the account or project to be used for vector database (e.g. CosmosDB).
   */
  vectorStoreConnections?: ExpressionOrValue<string[] | null> | undefined;
}

export const capabilityHostPropertiesShape: FlatModelShape = createFlatModelShape({
  aiServicesConnections: {
    armPath: ["aiServicesConnections"],
    value: createArrayShape(createStringShape()),
  },
  capabilityHostKind: { armPath: ["capabilityHostKind"], value: createUnionShape() },
  customerSubnet: { armPath: ["customerSubnet"], value: createStringShape() },
  description: { armPath: ["description"], value: createStringShape() },
  enablePublicHostingEnvironment: {
    armPath: ["enablePublicHostingEnvironment"],
    value: createBooleanShape(),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  storageConnections: {
    armPath: ["storageConnections"],
    value: createArrayShape(createStringShape()),
  },
  tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
  threadStorageConnections: {
    armPath: ["threadStorageConnections"],
    value: createArrayShape(createStringShape()),
  },
  vectorStoreConnections: {
    armPath: ["vectorStoreConnections"],
    value: createArrayShape(createStringShape()),
  },
});

/**
 * Represents a built-in authorization policy specific to Azure Bot Service/Channels authentication.
 */
export interface ChannelsBuiltInAuthorizationPolicy {
  /**
   * Authorization scheme type.
   *
   * Selects this variant. Must be "Channels".
   */
  type: "Channels";
}

/**
 * Input type for Represents a built-in authorization policy specific to Azure Bot Service/Channels authentication.
 */
export interface ChannelsBuiltInAuthorizationPolicyInput extends InputOf<ChannelsBuiltInAuthorizationPolicy> {
  /**
   * Authorization scheme type.
   *
   * Selects this variant. Must be "Channels".
   */
  type: "Channels";
}

/**
 * View type for Represents a built-in authorization policy specific to Azure Bot Service/Channels authentication.
 */
export type ChannelsBuiltInAuthorizationPolicyView = ChannelsBuiltInAuthorizationPolicyInput;

export const channelsBuiltInAuthorizationPolicyShape: FlatModelShape = createFlatModelShape({
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Outbound Rule for the managed network of a cognitive services account.
 */
export type CognitiveServicesOutboundRule =
  FqdnOutboundRule | PrivateEndpointOutboundRule | ServiceTagOutboundRule;

/**
 * Input type for Outbound Rule for the managed network of a cognitive services account.
 */
export type CognitiveServicesOutboundRuleInput =
  FqdnOutboundRuleInput | PrivateEndpointOutboundRuleInput | ServiceTagOutboundRuleInput;

/**
 * View type for Outbound Rule for the managed network of a cognitive services account.
 */
export type CognitiveServicesOutboundRuleView =
  FqdnOutboundRuleView | PrivateEndpointOutboundRuleView | ServiceTagOutboundRuleView;

export const cognitiveServicesOutboundRuleShape: DiscriminatedModelShape =
  createDiscriminatedModelShape("type", {
    FQDN: createDeferredShape(() => fqdnOutboundRuleShape),
    PrivateEndpoint: createDeferredShape(() => privateEndpointOutboundRuleShape),
    ServiceTag: createDeferredShape(() => serviceTagOutboundRuleShape),
  });

/**
 * The Private Endpoint Connection resource.
 */
export interface CognitiveServicesPrivateEndpointConnection {
  /**
   * Resource Etag.
   */
  etag?: string;
  /**
   * Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  id?: string;
  /**
   * The location of the private endpoint connection
   */
  location?: string;
  /**
   * The name of the private endpoint connection associated with the Cognitive Services Account
   */
  name?: string;
  /**
   * Resource properties.
   */
  properties?: PrivateEndpointConnectionProperties;
  /**
   * Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  systemData?: SystemData;
  /**
   * The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  type?: string;
}

/**
 * Input type for The Private Endpoint Connection resource.
 */
export interface CognitiveServicesPrivateEndpointConnectionInput extends InputOf<CognitiveServicesPrivateEndpointConnection> {
  /**
   * The location of the private endpoint connection
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * View type for The Private Endpoint Connection resource.
 */
export interface CognitiveServicesPrivateEndpointConnectionView extends InputOf<CognitiveServicesPrivateEndpointConnection> {
  /**
   * Read-only output: Resource Etag.
   */
  readonly etag?: Expression<string> | undefined;
  /**
   * Read-only output: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  readonly id?: Expression<string> | undefined;
  /**
   * The location of the private endpoint connection
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The name of the private endpoint connection associated with the Cognitive Services Account
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: PrivateEndpointConnectionPropertiesView | undefined;
  /**
   * Read-only output: Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  readonly systemData?: Expression<SystemData> | undefined;
  /**
   * Read-only output: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  readonly type?: Expression<string> | undefined;
}

export const cognitiveServicesPrivateEndpointConnectionShape: FlatModelShape = createFlatModelShape(
  {
    etag: { armPath: ["etag"], value: createStringShape(), readOnly: true },
    id: { armPath: ["id"], value: createStringShape(), readOnly: true },
    location: { armPath: ["location"], value: createStringShape() },
    name: { armPath: ["name"], value: createStringShape(), readOnly: true },
    properties: {
      armPath: ["properties"],
      value: createDeferredShape(() => privateEndpointConnectionPropertiesShape),
    },
    systemData: {
      armPath: ["systemData"],
      value: createDeferredShape(() => systemDataShape),
      readOnly: true,
    },
    type: { armPath: ["type"], value: createStringShape(), readOnly: true },
  },
);

/**
 * Cognitive Services account commitment period.
 */
export interface CommitmentPeriod {
  /**
   * Commitment period commitment count.
   */
  count?: number;
  /**
   * Commitment period end date.
   */
  endDate?: string;
  /**
   * Cognitive Services account commitment quota.
   */
  quota?: CommitmentQuota;
  /**
   * Commitment period start date.
   */
  startDate?: string;
  /**
   * Commitment period commitment tier.
   */
  tier?: string;
}

/**
 * Input type for Cognitive Services account commitment period.
 */
export interface CommitmentPeriodInput extends InputOf<CommitmentPeriod> {
  /**
   * Commitment period commitment count.
   */
  count?: ExpressionOrValue<number> | undefined;
  /**
   * Commitment period commitment tier.
   */
  tier?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Cognitive Services account commitment period.
 */
export interface CommitmentPeriodView extends InputOf<CommitmentPeriod> {
  /**
   * Commitment period commitment count.
   */
  count?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: Commitment period end date.
   */
  readonly endDate?: Expression<string> | undefined;
  /**
   * Read-only output: Cognitive Services account commitment quota.
   */
  readonly quota?: Expression<CommitmentQuota> | undefined;
  /**
   * Read-only output: Commitment period start date.
   */
  readonly startDate?: Expression<string> | undefined;
  /**
   * Commitment period commitment tier.
   */
  tier?: ExpressionOrValue<string> | undefined;
}

export const commitmentPeriodShape: FlatModelShape = createFlatModelShape({
  count: { armPath: ["count"], value: createNumberShape() },
  endDate: { armPath: ["endDate"], value: createStringShape(), readOnly: true },
  quota: {
    armPath: ["quota"],
    value: createDeferredShape(() => commitmentQuotaShape),
    readOnly: true,
  },
  startDate: { armPath: ["startDate"], value: createStringShape(), readOnly: true },
  tier: { armPath: ["tier"], value: createStringShape() },
});

/**
 * The commitment plan account association properties.
 */
export interface CommitmentPlanAccountAssociationProperties {
  /**
   * The Azure resource id of the account.
   */
  accountId?: string;
}

/**
 * Input type for The commitment plan account association properties.
 */
export interface CommitmentPlanAccountAssociationPropertiesInput extends InputOf<CommitmentPlanAccountAssociationProperties> {
  /**
   * The Azure resource id of the account.
   */
  accountId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The commitment plan account association properties.
 */
export type CommitmentPlanAccountAssociationPropertiesView =
  CommitmentPlanAccountAssociationPropertiesInput;

export const commitmentPlanAccountAssociationPropertiesShape: FlatModelShape = createFlatModelShape(
  {
    accountId: { armPath: ["accountId"], value: createStringShape() },
  },
);

/**
 * The commitment plan association.
 */
export interface CommitmentPlanAssociation {
  /**
   * The Azure resource id of the commitment plan.
   */
  commitmentPlanId?: string;
  /**
   * The location of of the commitment plan.
   */
  commitmentPlanLocation?: string;
}

/**
 * Input type for The commitment plan association.
 */
export interface CommitmentPlanAssociationInput extends InputOf<CommitmentPlanAssociation> {}

/**
 * View type for The commitment plan association.
 */
export interface CommitmentPlanAssociationView extends InputOf<CommitmentPlanAssociation> {
  /**
   * Read-only output: The Azure resource id of the commitment plan.
   */
  readonly commitmentPlanId?: Expression<string> | undefined;
  /**
   * Read-only output: The location of of the commitment plan.
   */
  readonly commitmentPlanLocation?: Expression<string> | undefined;
}

export const commitmentPlanAssociationShape: FlatModelShape = createFlatModelShape({
  commitmentPlanId: { armPath: ["commitmentPlanId"], value: createStringShape(), readOnly: true },
  commitmentPlanLocation: {
    armPath: ["commitmentPlanLocation"],
    value: createStringShape(),
    readOnly: true,
  },
});

/**
 * Properties of Cognitive Services account commitment plan.
 */
export interface CommitmentPlanProperties {
  /**
   * AutoRenew commitment plan.
   */
  autoRenew?: boolean;
  /**
   * Commitment plan guid.
   */
  commitmentPlanGuid?: string;
  /**
   * Cognitive Services account commitment period.
   */
  current?: CommitmentPeriod;
  /**
   * Account hosting model.
   */
  hostingModel?: HostingModel;
  /**
   * Cognitive Services account commitment period.
   */
  last?: CommitmentPeriod;
  /**
   * Cognitive Services account commitment period.
   */
  next?: CommitmentPeriod;
  /**
   * Commitment plan type.
   */
  planType?: string;
  /**
   * The list of ProvisioningIssue.
   */
  provisioningIssues?: string[];
  /**
   * Gets the status of the resource at the time the operation was called.
   */
  provisioningState?: CommitmentPlanProvisioningState;
}

/**
 * Input type for Properties of Cognitive Services account commitment plan.
 */
export interface CommitmentPlanPropertiesInput extends InputOf<CommitmentPlanProperties> {
  /**
   * AutoRenew commitment plan.
   */
  autoRenew?: ExpressionOrValue<boolean> | undefined;
  /**
   * Commitment plan guid.
   */
  commitmentPlanGuid?: ExpressionOrValue<string> | undefined;
  /**
   * Cognitive Services account commitment period.
   */
  current?: CommitmentPeriodInput | undefined;
  /**
   * Account hosting model.
   */
  hostingModel?: ExpressionOrValue<HostingModel> | undefined;
  /**
   * Cognitive Services account commitment period.
   */
  next?: CommitmentPeriodInput | undefined;
  /**
   * Commitment plan type.
   */
  planType?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of Cognitive Services account commitment plan.
 */
export interface CommitmentPlanPropertiesView extends InputOf<CommitmentPlanProperties> {
  /**
   * AutoRenew commitment plan.
   */
  autoRenew?: ExpressionOrValue<boolean> | undefined;
  /**
   * Commitment plan guid.
   */
  commitmentPlanGuid?: ExpressionOrValue<string> | undefined;
  /**
   * Cognitive Services account commitment period.
   */
  current?: CommitmentPeriodView | undefined;
  /**
   * Account hosting model.
   */
  hostingModel?: ExpressionOrValue<HostingModel> | undefined;
  /**
   * Read-only output: Cognitive Services account commitment period.
   */
  readonly last?: Expression<CommitmentPeriod> | undefined;
  /**
   * Cognitive Services account commitment period.
   */
  next?: CommitmentPeriodView | undefined;
  /**
   * Commitment plan type.
   */
  planType?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The list of ProvisioningIssue.
   */
  readonly provisioningIssues?: Expression<string[]> | undefined;
  /**
   * Read-only output: Gets the status of the resource at the time the operation was called.
   */
  readonly provisioningState?: Expression<CommitmentPlanProvisioningState> | undefined;
}

export const commitmentPlanPropertiesShape: FlatModelShape = createFlatModelShape({
  autoRenew: { armPath: ["autoRenew"], value: createBooleanShape() },
  commitmentPlanGuid: { armPath: ["commitmentPlanGuid"], value: createStringShape() },
  current: { armPath: ["current"], value: createDeferredShape(() => commitmentPeriodShape) },
  hostingModel: { armPath: ["hostingModel"], value: createUnionShape() },
  last: {
    armPath: ["last"],
    value: createDeferredShape(() => commitmentPeriodShape),
    readOnly: true,
  },
  next: { armPath: ["next"], value: createDeferredShape(() => commitmentPeriodShape) },
  planType: { armPath: ["planType"], value: createStringShape() },
  provisioningIssues: {
    armPath: ["provisioningIssues"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

/**
 * Cognitive Services account commitment quota.
 */
export interface CommitmentQuota {
  /**
   * Commitment quota quantity.
   */
  quantity?: number;
  /**
   * Commitment quota unit.
   */
  unit?: string;
}

/**
 * Input type for Cognitive Services account commitment quota.
 */
export interface CommitmentQuotaInput extends InputOf<CommitmentQuota> {}

/**
 * View type for Cognitive Services account commitment quota.
 */
export interface CommitmentQuotaView extends InputOf<CommitmentQuota> {
  /**
   * Read-only output: Commitment quota quantity.
   */
  readonly quantity?: Expression<number> | undefined;
  /**
   * Read-only output: Commitment quota unit.
   */
  readonly unit?: Expression<string> | undefined;
}

export const commitmentQuotaShape: FlatModelShape = createFlatModelShape({
  quantity: { armPath: ["quantity"], value: createNumberShape(), readOnly: true },
  unit: { armPath: ["unit"], value: createStringShape(), readOnly: true },
});

export interface ConnectionAccessKey {
  accessKeyId?: string;
  secretAccessKey?: string;
}

export interface ConnectionAccessKeyInput extends InputOf<ConnectionAccessKey> {
  accessKeyId?: ExpressionOrValue<string> | undefined;
  secretAccessKey?: ExpressionOrValue<string> | undefined;
}

export type ConnectionAccessKeyView = ConnectionAccessKeyInput;

export const connectionAccessKeyShape: FlatModelShape = createFlatModelShape({
  accessKeyId: { armPath: ["accessKeyId"], value: createStringShape() },
  secretAccessKey: { armPath: ["secretAccessKey"], value: createStringShape() },
});

/**
 * Account key object for connection credential.
 */
export interface ConnectionAccountKey {
  key?: string;
}

/**
 * Input type for Account key object for connection credential.
 */
export interface ConnectionAccountKeyInput extends InputOf<ConnectionAccountKey> {
  key?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Account key object for connection credential.
 */
export type ConnectionAccountKeyView = ConnectionAccountKeyInput;

export const connectionAccountKeyShape: FlatModelShape = createFlatModelShape({
  key: { armPath: ["key"], value: createStringShape() },
});

/**
 * Api key object for connection credential.
 */
export interface ConnectionApiKey {
  key?: string;
}

/**
 * Input type for Api key object for connection credential.
 */
export interface ConnectionApiKeyInput extends InputOf<ConnectionApiKey> {
  key?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Api key object for connection credential.
 */
export type ConnectionApiKeyView = ConnectionApiKeyInput;

export const connectionApiKeyShape: FlatModelShape = createFlatModelShape({
  key: { armPath: ["key"], value: createStringShape() },
});

export interface ConnectionManagedIdentity {
  clientId?: string;
  resourceId?: string;
}

export interface ConnectionManagedIdentityInput extends InputOf<ConnectionManagedIdentity> {
  clientId?: ExpressionOrValue<string> | undefined;
  resourceId?: ExpressionOrValue<string> | undefined;
}

export type ConnectionManagedIdentityView = ConnectionManagedIdentityInput;

export const connectionManagedIdentityShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape() },
  resourceId: { armPath: ["resourceId"], value: createStringShape() },
});

/**
 * ClientId and ClientSecret are required. Other properties are optional
 * depending on each OAuth2 provider's implementation.
 */
export interface ConnectionOAuth2 {
  /**
   * Required by Concur connection category
   */
  authUrl?: string;
  /**
   * Client id in the format of UUID
   */
  clientId?: string;
  clientSecret?: string;
  /**
   * Required by GoogleAdWords connection category
   */
  developerToken?: string;
  password?: string;
  /**
   * Required by GoogleBigQuery, GoogleAdWords, Hubspot, QuickBooks, Square, Xero, Zoho
   * where user needs to get RefreshToken offline
   */
  refreshToken?: string;
  /**
   * Required by QuickBooks and Xero connection categories
   */
  tenantId?: string;
  /**
   * Concur, ServiceNow auth server AccessToken grant type is 'Password'
   * which requires UsernamePassword
   */
  username?: string;
}

/**
 * Input type for ClientId and ClientSecret are required. Other properties are optional
 * depending on each OAuth2 provider's implementation.
 */
export interface ConnectionOAuth2Input extends InputOf<ConnectionOAuth2> {
  /**
   * Required by Concur connection category
   */
  authUrl?: ExpressionOrValue<string> | undefined;
  /**
   * Client id in the format of UUID
   */
  clientId?: ExpressionOrValue<string> | undefined;
  clientSecret?: ExpressionOrValue<string> | undefined;
  /**
   * Required by GoogleAdWords connection category
   */
  developerToken?: ExpressionOrValue<string> | undefined;
  password?: ExpressionOrValue<string> | undefined;
  /**
   * Required by GoogleBigQuery, GoogleAdWords, Hubspot, QuickBooks, Square, Xero, Zoho
   * where user needs to get RefreshToken offline
   */
  refreshToken?: ExpressionOrValue<string> | undefined;
  /**
   * Required by QuickBooks and Xero connection categories
   */
  tenantId?: ExpressionOrValue<string> | undefined;
  /**
   * Concur, ServiceNow auth server AccessToken grant type is 'Password'
   * which requires UsernamePassword
   */
  username?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for ClientId and ClientSecret are required. Other properties are optional
 * depending on each OAuth2 provider's implementation.
 */
export type ConnectionOAuth2View = ConnectionOAuth2Input;

export const connectionOAuth2Shape: FlatModelShape = createFlatModelShape({
  authUrl: { armPath: ["authUrl"], value: createStringShape() },
  clientId: { armPath: ["clientId"], value: createStringShape() },
  clientSecret: { armPath: ["clientSecret"], value: createStringShape() },
  developerToken: { armPath: ["developerToken"], value: createStringShape() },
  password: { armPath: ["password"], value: createStringShape() },
  refreshToken: { armPath: ["refreshToken"], value: createStringShape() },
  tenantId: { armPath: ["tenantId"], value: createStringShape() },
  username: { armPath: ["username"], value: createStringShape() },
});

export interface ConnectionPersonalAccessToken {
  pat?: string;
}

export interface ConnectionPersonalAccessTokenInput extends InputOf<ConnectionPersonalAccessToken> {
  pat?: ExpressionOrValue<string> | undefined;
}

export type ConnectionPersonalAccessTokenView = ConnectionPersonalAccessTokenInput;

export const connectionPersonalAccessTokenShape: FlatModelShape = createFlatModelShape({
  pat: { armPath: ["pat"], value: createStringShape() },
});

/**
 * Connection property base schema.
 */
export type ConnectionPropertiesV2 =
  | PatAuthTypeConnectionProperties
  | ManagedIdentityAuthTypeConnectionProperties
  | UsernamePasswordAuthTypeConnectionProperties
  | NoneAuthTypeConnectionProperties
  | SasAuthTypeConnectionProperties
  | AccountKeyAuthTypeConnectionProperties
  | ServicePrincipalAuthTypeConnectionProperties
  | AccessKeyAuthTypeConnectionProperties
  | ApiKeyAuthConnectionProperties
  | CustomKeysConnectionProperties
  | OAuth2AuthTypeConnectionProperties
  | AadAuthTypeConnectionProperties;

/**
 * Input type for Connection property base schema.
 */
export type ConnectionPropertiesV2Input =
  | PatAuthTypeConnectionPropertiesInput
  | ManagedIdentityAuthTypeConnectionPropertiesInput
  | UsernamePasswordAuthTypeConnectionPropertiesInput
  | NoneAuthTypeConnectionPropertiesInput
  | SasAuthTypeConnectionPropertiesInput
  | AccountKeyAuthTypeConnectionPropertiesInput
  | ServicePrincipalAuthTypeConnectionPropertiesInput
  | AccessKeyAuthTypeConnectionPropertiesInput
  | ApiKeyAuthConnectionPropertiesInput
  | CustomKeysConnectionPropertiesInput
  | OAuth2AuthTypeConnectionPropertiesInput
  | AadAuthTypeConnectionPropertiesInput;

/**
 * View type for Connection property base schema.
 */
export type ConnectionPropertiesV2View =
  | PatAuthTypeConnectionPropertiesView
  | ManagedIdentityAuthTypeConnectionPropertiesView
  | UsernamePasswordAuthTypeConnectionPropertiesView
  | NoneAuthTypeConnectionPropertiesView
  | SasAuthTypeConnectionPropertiesView
  | AccountKeyAuthTypeConnectionPropertiesView
  | ServicePrincipalAuthTypeConnectionPropertiesView
  | AccessKeyAuthTypeConnectionPropertiesView
  | ApiKeyAuthConnectionPropertiesView
  | CustomKeysConnectionPropertiesView
  | OAuth2AuthTypeConnectionPropertiesView
  | AadAuthTypeConnectionPropertiesView;

export const connectionPropertiesV2Shape: DiscriminatedModelShape = createDiscriminatedModelShape(
  "authType",
  {
    PAT: createDeferredShape(() => patAuthTypeConnectionPropertiesShape),
    ManagedIdentity: createDeferredShape(() => managedIdentityAuthTypeConnectionPropertiesShape),
    UsernamePassword: createDeferredShape(() => usernamePasswordAuthTypeConnectionPropertiesShape),
    None: createDeferredShape(() => noneAuthTypeConnectionPropertiesShape),
    SAS: createDeferredShape(() => sasAuthTypeConnectionPropertiesShape),
    AccountKey: createDeferredShape(() => accountKeyAuthTypeConnectionPropertiesShape),
    ServicePrincipal: createDeferredShape(() => servicePrincipalAuthTypeConnectionPropertiesShape),
    AccessKey: createDeferredShape(() => accessKeyAuthTypeConnectionPropertiesShape),
    ApiKey: createDeferredShape(() => apiKeyAuthConnectionPropertiesShape),
    CustomKeys: createDeferredShape(() => customKeysConnectionPropertiesShape),
    OAuth2: createDeferredShape(() => oAuth2AuthTypeConnectionPropertiesShape),
    AAD: createDeferredShape(() => aadAuthTypeConnectionPropertiesShape),
  },
);

export interface ConnectionServicePrincipal {
  clientId?: string;
  clientSecret?: string;
  tenantId?: string;
}

export interface ConnectionServicePrincipalInput extends InputOf<ConnectionServicePrincipal> {
  clientId?: ExpressionOrValue<string> | undefined;
  clientSecret?: ExpressionOrValue<string> | undefined;
  tenantId?: ExpressionOrValue<string> | undefined;
}

export type ConnectionServicePrincipalView = ConnectionServicePrincipalInput;

export const connectionServicePrincipalShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape() },
  clientSecret: { armPath: ["clientSecret"], value: createStringShape() },
  tenantId: { armPath: ["tenantId"], value: createStringShape() },
});

export interface ConnectionSharedAccessSignature {
  sas?: string;
}

export interface ConnectionSharedAccessSignatureInput extends InputOf<ConnectionSharedAccessSignature> {
  sas?: ExpressionOrValue<string> | undefined;
}

export type ConnectionSharedAccessSignatureView = ConnectionSharedAccessSignatureInput;

export const connectionSharedAccessSignatureShape: FlatModelShape = createFlatModelShape({
  sas: { armPath: ["sas"], value: createStringShape() },
});

export interface ConnectionUsernamePassword {
  password?: string;
  /**
   * Optional, required by connections like SalesForce for extra security in addition to UsernamePassword
   */
  securityToken?: string;
  username?: string;
}

export interface ConnectionUsernamePasswordInput extends InputOf<ConnectionUsernamePassword> {
  password?: ExpressionOrValue<string> | undefined;
  /**
   * Optional, required by connections like SalesForce for extra security in addition to UsernamePassword
   */
  securityToken?: ExpressionOrValue<string> | undefined;
  username?: ExpressionOrValue<string> | undefined;
}

export type ConnectionUsernamePasswordView = ConnectionUsernamePasswordInput;

export const connectionUsernamePasswordShape: FlatModelShape = createFlatModelShape({
  password: { armPath: ["password"], value: createStringShape() },
  securityToken: { armPath: ["securityToken"], value: createStringShape() },
  username: { armPath: ["username"], value: createStringShape() },
});

/**
 * Gets or sets the source to which filter applies.
 */
export interface CustomBlocklistConfig {
  /**
   * If blocking would occur.
   */
  blocking?: boolean;
  /**
   * Name of ContentFilter.
   */
  blocklistName?: string;
  /**
   * Content source to apply the Content Filters.
   */
  source?: RaiPolicyContentSource;
}

/**
 * Input type for Gets or sets the source to which filter applies.
 */
export interface CustomBlocklistConfigInput extends InputOf<CustomBlocklistConfig> {
  /**
   * If blocking would occur.
   */
  blocking?: ExpressionOrValue<boolean> | undefined;
  /**
   * Name of ContentFilter.
   */
  blocklistName?: ExpressionOrValue<string> | undefined;
  /**
   * Content source to apply the Content Filters.
   */
  source?: ExpressionOrValue<RaiPolicyContentSource> | undefined;
}

/**
 * View type for Gets or sets the source to which filter applies.
 */
export type CustomBlocklistConfigView = CustomBlocklistConfigInput;

export const customBlocklistConfigShape: FlatModelShape = createFlatModelShape({
  blocking: { armPath: ["blocking"], value: createBooleanShape() },
  blocklistName: { armPath: ["blocklistName"], value: createStringShape() },
  source: { armPath: ["source"], value: createUnionShape() },
});

/**
 * Custom Keys credential object
 */
export interface CustomKeys {
  /**
   * Dictionary of <string>
   */
  keys?: Record<string, string>;
}

/**
 * Input type for Custom Keys credential object
 */
export interface CustomKeysInput extends InputOf<CustomKeys> {
  /**
   * Dictionary of <string>
   */
  keys?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * View type for Custom Keys credential object
 */
export type CustomKeysView = CustomKeysInput;

export const customKeysShape: FlatModelShape = createFlatModelShape({
  keys: { armPath: ["keys"], value: createRecordShape(createStringShape()) },
});

/**
 * Category:= CustomKeys
 * AuthType:= CustomKeys (as type discriminator)
 * Credentials:= {CustomKeys} as CustomKeys
 * Target:= {any value}
 * Use Metadata property bag for ApiVersion and other metadata fields
 */
export interface CustomKeysConnectionProperties {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "CustomKeys".
   */
  authType: "CustomKeys";
  /**
   * Category of the connection
   */
  category?: ConnectionCategory;
  createdByWorkspaceArmId?: string;
  /**
   * Custom Keys credential object
   */
  credentials?: CustomKeys;
  /**
   * Provides the error message if the connection fails
   */
  error?: string;
  expiryTime?: Date;
  /**
   * Group based on connection category
   */
  group?: ConnectionGroup;
  isSharedToAll?: boolean;
  /**
   * Store user metadata for this connection
   */
  metadata?: Record<string, string>;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ManagedPeRequirement;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ManagedPeStatus;
  sharedUserList?: string[];
  /**
   * The connection URL to be used.
   */
  target?: string;
  useWorkspaceManagedIdentity?: boolean;
}

/**
 * Input type for Category:= CustomKeys
 * AuthType:= CustomKeys (as type discriminator)
 * Credentials:= {CustomKeys} as CustomKeys
 * Target:= {any value}
 * Use Metadata property bag for ApiVersion and other metadata fields
 */
export interface CustomKeysConnectionPropertiesInput extends InputOf<CustomKeysConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "CustomKeys".
   */
  authType: "CustomKeys";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  /**
   * Custom Keys credential object
   */
  credentials?: CustomKeysInput | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Category:= CustomKeys
 * AuthType:= CustomKeys (as type discriminator)
 * Credentials:= {CustomKeys} as CustomKeys
 * Target:= {any value}
 * Use Metadata property bag for ApiVersion and other metadata fields
 */
export interface CustomKeysConnectionPropertiesView extends InputOf<CustomKeysConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "CustomKeys".
   */
  authType: "CustomKeys";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  readonly createdByWorkspaceArmId?: Expression<string> | undefined;
  /**
   * Custom Keys credential object
   */
  credentials?: CustomKeysView | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Read-only output: Group based on connection category
   */
  readonly group?: Expression<ConnectionGroup> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export const customKeysConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  authType: { armPath: ["authType"], value: createStringLiteralShape() },
  category: { armPath: ["category"], value: createUnionShape() },
  createdByWorkspaceArmId: {
    armPath: ["createdByWorkspaceArmId"],
    value: createStringShape(),
    readOnly: true,
  },
  credentials: { armPath: ["credentials"], value: createDeferredShape(() => customKeysShape) },
  error: { armPath: ["error"], value: createStringShape() },
  expiryTime: {
    armPath: ["expiryTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  group: { armPath: ["group"], value: createUnionShape(), readOnly: true },
  isSharedToAll: { armPath: ["isSharedToAll"], value: createBooleanShape() },
  metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
  peRequirement: { armPath: ["peRequirement"], value: createUnionShape() },
  peStatus: { armPath: ["peStatus"], value: createUnionShape() },
  sharedUserList: { armPath: ["sharedUserList"], value: createArrayShape(createStringShape()) },
  target: { armPath: ["target"], value: createStringShape() },
  useWorkspaceManagedIdentity: {
    armPath: ["useWorkspaceManagedIdentity"],
    value: createBooleanShape(),
  },
});

/**
 * The Defender for AI resource properties.
 */
export interface DefenderForAiSettingProperties {
  /**
   * Defender for AI state on the AI resource.
   */
  state?: DefenderForAiSettingState;
}

/**
 * Input type for The Defender for AI resource properties.
 */
export interface DefenderForAiSettingPropertiesInput extends InputOf<DefenderForAiSettingProperties> {
  /**
   * Defender for AI state on the AI resource.
   */
  state?: ExpressionOrValue<DefenderForAiSettingState> | undefined;
}

/**
 * View type for The Defender for AI resource properties.
 */
export type DefenderForAiSettingPropertiesView = DefenderForAiSettingPropertiesInput;

export const defenderForAiSettingPropertiesShape: FlatModelShape = createFlatModelShape({
  state: { armPath: ["state"], value: createUnionShape() },
});

/**
 * Internal use only.
 */
export interface DeploymentCapacitySettings {
  /**
   * The designated capacity.
   */
  designatedCapacity?: number;
  /**
   * The priority of this capacity setting.
   */
  priority?: number;
}

/**
 * Input type for Internal use only.
 */
export interface DeploymentCapacitySettingsInput extends InputOf<DeploymentCapacitySettings> {
  /**
   * The designated capacity.
   */
  designatedCapacity?: ExpressionOrValue<number> | undefined;
  /**
   * The priority of this capacity setting.
   */
  priority?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Internal use only.
 */
export type DeploymentCapacitySettingsView = DeploymentCapacitySettingsInput;

export const deploymentCapacitySettingsShape: FlatModelShape = createFlatModelShape({
  designatedCapacity: { armPath: ["designatedCapacity"], value: createNumberShape() },
  priority: { armPath: ["priority"], value: createNumberShape() },
});

/**
 * Properties of Cognitive Services account deployment model.
 */
export interface DeploymentModel {
  /**
   * The call rate limit Cognitive Services account.
   */
  callRateLimit?: CallRateLimit;
  /**
   * Deployment model format.
   */
  format?: string;
  /**
   * Deployment model name.
   */
  name?: string;
  /**
   * Deployment model publisher.
   */
  publisher?: string;
  /**
   * Optional. Deployment model source ARM resource ID.
   */
  source?: string;
  /**
   * Optional. Source of the model, another Microsoft.CognitiveServices accounts ARM resource ID.
   */
  sourceAccount?: string;
  /**
   * Optional. Deployment model version. If version is not specified, a default version will be assigned. The default version is different for different models and might change when there is new version available for a model. Default version for a model could be found from list models API.
   */
  version?: string;
}

/**
 * Input type for Properties of Cognitive Services account deployment model.
 */
export interface DeploymentModelInput extends InputOf<DeploymentModel> {
  /**
   * Deployment model format.
   */
  format?: ExpressionOrValue<string> | undefined;
  /**
   * Deployment model name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Deployment model publisher.
   */
  publisher?: ExpressionOrValue<string> | undefined;
  /**
   * Optional. Deployment model source ARM resource ID.
   */
  source?: ExpressionOrValue<string> | undefined;
  /**
   * Optional. Source of the model, another Microsoft.CognitiveServices accounts ARM resource ID.
   */
  sourceAccount?: ExpressionOrValue<string> | undefined;
  /**
   * Optional. Deployment model version. If version is not specified, a default version will be assigned. The default version is different for different models and might change when there is new version available for a model. Default version for a model could be found from list models API.
   */
  version?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of Cognitive Services account deployment model.
 */
export interface DeploymentModelView extends InputOf<DeploymentModel> {
  /**
   * Read-only output: The call rate limit Cognitive Services account.
   */
  readonly callRateLimit?: Expression<CallRateLimit> | undefined;
  /**
   * Deployment model format.
   */
  format?: ExpressionOrValue<string> | undefined;
  /**
   * Deployment model name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Deployment model publisher.
   */
  publisher?: ExpressionOrValue<string> | undefined;
  /**
   * Optional. Deployment model source ARM resource ID.
   */
  source?: ExpressionOrValue<string> | undefined;
  /**
   * Optional. Source of the model, another Microsoft.CognitiveServices accounts ARM resource ID.
   */
  sourceAccount?: ExpressionOrValue<string> | undefined;
  /**
   * Optional. Deployment model version. If version is not specified, a default version will be assigned. The default version is different for different models and might change when there is new version available for a model. Default version for a model could be found from list models API.
   */
  version?: ExpressionOrValue<string> | undefined;
}

export const deploymentModelShape: FlatModelShape = createFlatModelShape({
  callRateLimit: {
    armPath: ["callRateLimit"],
    value: createDeferredShape(() => callRateLimitShape),
    readOnly: true,
  },
  format: { armPath: ["format"], value: createStringShape() },
  name: { armPath: ["name"], value: createStringShape() },
  publisher: { armPath: ["publisher"], value: createStringShape() },
  source: { armPath: ["source"], value: createStringShape() },
  sourceAccount: { armPath: ["sourceAccount"], value: createStringShape() },
  version: { armPath: ["version"], value: createStringShape() },
});

/**
 * Properties of Cognitive Services account deployment.
 */
export interface DeploymentProperties {
  /**
   * The call rate limit Cognitive Services account.
   */
  callRateLimit?: CallRateLimit;
  /**
   * The capabilities.
   */
  capabilities?: Record<string, string>;
  /**
   * Internal use only.
   */
  capacitySettings?: DeploymentCapacitySettings;
  /**
   * The current capacity.
   */
  currentCapacity?: number;
  /**
   * The state of the deployment. Controls whether the deployment is accepting inference requests. Use 'Running' for active deployments that process requests, or 'Paused' to temporarily stop inference while preserving the deployment configuration.
   */
  deploymentState?: DeploymentState | null;
  /**
   * If the dynamic throttling is enabled.
   */
  dynamicThrottlingEnabled?: boolean;
  /**
   * Properties of Cognitive Services account deployment model.
   */
  model?: DeploymentModel;
  /**
   * The name of parent deployment.
   */
  parentDeploymentName?: string;
  /**
   * Gets the status of the resource at the time the operation was called.
   */
  provisioningState?: DeploymentProvisioningState;
  /**
   * The name of RAI policy.
   */
  raiPolicyName?: string;
  rateLimits?: ThrottlingRule[];
  /**
   * Routing configuration for the model-router deployment. This property is only applicable when the deployed model is 'model-router' version 2025-11-18 or later. Allows you to select the models subset for routing and the routing mode (balanced, quality, cost) for routing across all supported models or the model subset.
   */
  routing?: DeploymentRouting;
  /**
   * Properties of Cognitive Services account deployment model. (Deprecated, please use Deployment.sku instead.)
   */
  scaleSettings?: DeploymentScaleSettings;
  /**
   * The service tier for the deployment. Determines the pricing and performance level for request processing. Use 'Default' for standard pricing or 'Priority' for higher-priority processing with premium pricing. Note: Pause operations are only supported on Standard, DataZoneStandard, and GlobalStandard SKUs.
   */
  serviceTier?: ServiceTier | null;
  /**
   * Specifies the deployment name that should serve requests when the request would have otherwise been throttled due to reaching current deployment throughput limit.
   */
  spilloverDeploymentName?: string;
  /**
   * Deployment model version upgrade option.
   */
  versionUpgradeOption?: DeploymentModelVersionUpgradeOption;
}

/**
 * Input type for Properties of Cognitive Services account deployment.
 */
export interface DeploymentPropertiesInput extends InputOf<DeploymentProperties> {
  /**
   * Internal use only.
   */
  capacitySettings?: DeploymentCapacitySettingsInput | undefined;
  /**
   * The current capacity.
   */
  currentCapacity?: ExpressionOrValue<number> | undefined;
  /**
   * The state of the deployment. Controls whether the deployment is accepting inference requests. Use 'Running' for active deployments that process requests, or 'Paused' to temporarily stop inference while preserving the deployment configuration.
   */
  deploymentState?: ExpressionOrValue<DeploymentState | null> | undefined;
  /**
   * Properties of Cognitive Services account deployment model.
   */
  model?: DeploymentModelInput | undefined;
  /**
   * The name of parent deployment.
   */
  parentDeploymentName?: ExpressionOrValue<string> | undefined;
  /**
   * The name of RAI policy.
   */
  raiPolicyName?: ExpressionOrValue<string> | undefined;
  /**
   * Routing configuration for the model-router deployment. This property is only applicable when the deployed model is 'model-router' version 2025-11-18 or later. Allows you to select the models subset for routing and the routing mode (balanced, quality, cost) for routing across all supported models or the model subset.
   */
  routing?: DeploymentRoutingInput | undefined;
  /**
   * Properties of Cognitive Services account deployment model. (Deprecated, please use Deployment.sku instead.)
   */
  scaleSettings?: DeploymentScaleSettingsInput | undefined;
  /**
   * The service tier for the deployment. Determines the pricing and performance level for request processing. Use 'Default' for standard pricing or 'Priority' for higher-priority processing with premium pricing. Note: Pause operations are only supported on Standard, DataZoneStandard, and GlobalStandard SKUs.
   */
  serviceTier?: ExpressionOrValue<ServiceTier | null> | undefined;
  /**
   * Specifies the deployment name that should serve requests when the request would have otherwise been throttled due to reaching current deployment throughput limit.
   */
  spilloverDeploymentName?: ExpressionOrValue<string> | undefined;
  /**
   * Deployment model version upgrade option.
   */
  versionUpgradeOption?: ExpressionOrValue<DeploymentModelVersionUpgradeOption> | undefined;
}

/**
 * View type for Properties of Cognitive Services account deployment.
 */
export interface DeploymentPropertiesView extends InputOf<DeploymentProperties> {
  /**
   * Read-only output: The call rate limit Cognitive Services account.
   */
  readonly callRateLimit?: Expression<CallRateLimit> | undefined;
  /**
   * Read-only output: The capabilities.
   */
  readonly capabilities?: Expression<Record<string, string>> | undefined;
  /**
   * Internal use only.
   */
  capacitySettings?: DeploymentCapacitySettingsView | undefined;
  /**
   * The current capacity.
   */
  currentCapacity?: ExpressionOrValue<number> | undefined;
  /**
   * The state of the deployment. Controls whether the deployment is accepting inference requests. Use 'Running' for active deployments that process requests, or 'Paused' to temporarily stop inference while preserving the deployment configuration.
   */
  deploymentState?: ExpressionOrValue<DeploymentState | null> | undefined;
  /**
   * Read-only output: If the dynamic throttling is enabled.
   */
  readonly dynamicThrottlingEnabled?: Expression<boolean> | undefined;
  /**
   * Properties of Cognitive Services account deployment model.
   */
  model?: DeploymentModelView | undefined;
  /**
   * The name of parent deployment.
   */
  parentDeploymentName?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Gets the status of the resource at the time the operation was called.
   */
  readonly provisioningState?: Expression<DeploymentProvisioningState> | undefined;
  /**
   * The name of RAI policy.
   */
  raiPolicyName?: ExpressionOrValue<string> | undefined;
  readonly rateLimits?: Expression<ThrottlingRule[]> | undefined;
  /**
   * Routing configuration for the model-router deployment. This property is only applicable when the deployed model is 'model-router' version 2025-11-18 or later. Allows you to select the models subset for routing and the routing mode (balanced, quality, cost) for routing across all supported models or the model subset.
   */
  routing?: DeploymentRoutingView | undefined;
  /**
   * Properties of Cognitive Services account deployment model. (Deprecated, please use Deployment.sku instead.)
   */
  scaleSettings?: DeploymentScaleSettingsView | undefined;
  /**
   * The service tier for the deployment. Determines the pricing and performance level for request processing. Use 'Default' for standard pricing or 'Priority' for higher-priority processing with premium pricing. Note: Pause operations are only supported on Standard, DataZoneStandard, and GlobalStandard SKUs.
   */
  serviceTier?: ExpressionOrValue<ServiceTier | null> | undefined;
  /**
   * Specifies the deployment name that should serve requests when the request would have otherwise been throttled due to reaching current deployment throughput limit.
   */
  spilloverDeploymentName?: ExpressionOrValue<string> | undefined;
  /**
   * Deployment model version upgrade option.
   */
  versionUpgradeOption?: ExpressionOrValue<DeploymentModelVersionUpgradeOption> | undefined;
}

export const deploymentPropertiesShape: FlatModelShape = createFlatModelShape({
  callRateLimit: {
    armPath: ["callRateLimit"],
    value: createDeferredShape(() => callRateLimitShape),
    readOnly: true,
  },
  capabilities: {
    armPath: ["capabilities"],
    value: createRecordShape(createStringShape()),
    readOnly: true,
  },
  capacitySettings: {
    armPath: ["capacitySettings"],
    value: createDeferredShape(() => deploymentCapacitySettingsShape),
  },
  currentCapacity: { armPath: ["currentCapacity"], value: createNumberShape() },
  deploymentState: { armPath: ["deploymentState"], value: createUnionShape() },
  dynamicThrottlingEnabled: {
    armPath: ["dynamicThrottlingEnabled"],
    value: createBooleanShape(),
    readOnly: true,
  },
  model: { armPath: ["model"], value: createDeferredShape(() => deploymentModelShape) },
  parentDeploymentName: { armPath: ["parentDeploymentName"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  raiPolicyName: { armPath: ["raiPolicyName"], value: createStringShape() },
  rateLimits: {
    armPath: ["rateLimits"],
    value: createArrayShape(createDeferredShape(() => throttlingRuleShape)),
    readOnly: true,
  },
  routing: { armPath: ["routing"], value: createDeferredShape(() => deploymentRoutingShape) },
  scaleSettings: {
    armPath: ["scaleSettings"],
    value: createDeferredShape(() => deploymentScaleSettingsShape),
  },
  serviceTier: { armPath: ["serviceTier"], value: createUnionShape() },
  spilloverDeploymentName: { armPath: ["spilloverDeploymentName"], value: createStringShape() },
  versionUpgradeOption: { armPath: ["versionUpgradeOption"], value: createUnionShape() },
});

/**
 * Routing configuration for the model-router deployment. Specifies how requests are routed across multiple models.
 */
export interface DeploymentRouting {
  /**
   * The model-router routing mode that determines how requests are distributed across models.
   */
  mode?: RoutingMode;
  /**
   * Optional. The list of model-router supported models that the model router can use to route requests across. If not specified, the model router will route to all available models specified in the model-router version.
   */
  models?: DeploymentModel[];
}

/**
 * Input type for Routing configuration for the model-router deployment. Specifies how requests are routed across multiple models.
 */
export interface DeploymentRoutingInput extends InputOf<DeploymentRouting> {
  /**
   * The model-router routing mode that determines how requests are distributed across models.
   */
  mode?: ExpressionOrValue<RoutingMode> | undefined;
  /**
   * Optional. The list of model-router supported models that the model router can use to route requests across. If not specified, the model router will route to all available models specified in the model-router version.
   */
  models?: InputArray<DeploymentModelInput, DeploymentModel[]> | undefined;
}

/**
 * View type for Routing configuration for the model-router deployment. Specifies how requests are routed across multiple models.
 */
export interface DeploymentRoutingView extends InputOf<DeploymentRouting> {
  /**
   * The model-router routing mode that determines how requests are distributed across models.
   */
  mode?: ExpressionOrValue<RoutingMode> | undefined;
  /**
   * Optional. The list of model-router supported models that the model router can use to route requests across. If not specified, the model router will route to all available models specified in the model-router version.
   */
  models?: InputArray<DeploymentModelView, DeploymentModel[]> | undefined;
}

export const deploymentRoutingShape: FlatModelShape = createFlatModelShape({
  mode: { armPath: ["mode"], value: createUnionShape() },
  models: {
    armPath: ["models"],
    value: createArrayShape(createDeferredShape(() => deploymentModelShape)),
  },
});

/**
 * Properties of Cognitive Services account deployment model. (Deprecated, please use Deployment.sku instead.)
 */
export interface DeploymentScaleSettings {
  /**
   * Deployment active capacity. This value might be different from `capacity` if customer recently updated `capacity`.
   */
  activeCapacity?: number;
  /**
   * Deployment capacity.
   */
  capacity?: number;
  /**
   * Deployment scale type.
   */
  scaleType?: DeploymentScaleType;
}

/**
 * Input type for Properties of Cognitive Services account deployment model. (Deprecated, please use Deployment.sku instead.)
 */
export interface DeploymentScaleSettingsInput extends InputOf<DeploymentScaleSettings> {
  /**
   * Deployment capacity.
   */
  capacity?: ExpressionOrValue<number> | undefined;
  /**
   * Deployment scale type.
   */
  scaleType?: ExpressionOrValue<DeploymentScaleType> | undefined;
}

/**
 * View type for Properties of Cognitive Services account deployment model. (Deprecated, please use Deployment.sku instead.)
 */
export interface DeploymentScaleSettingsView extends InputOf<DeploymentScaleSettings> {
  /**
   * Read-only output: Deployment active capacity. This value might be different from `capacity` if customer recently updated `capacity`.
   */
  readonly activeCapacity?: Expression<number> | undefined;
  /**
   * Deployment capacity.
   */
  capacity?: ExpressionOrValue<number> | undefined;
  /**
   * Deployment scale type.
   */
  scaleType?: ExpressionOrValue<DeploymentScaleType> | undefined;
}

export const deploymentScaleSettingsShape: FlatModelShape = createFlatModelShape({
  activeCapacity: { armPath: ["activeCapacity"], value: createNumberShape(), readOnly: true },
  capacity: { armPath: ["capacity"], value: createNumberShape() },
  scaleType: { armPath: ["scaleType"], value: createUnionShape() },
});

/**
 * Properties to configure Encryption
 */
export interface Encryption {
  /**
   * Enumerates the possible value of keySource for Encryption
   */
  keySource?: KeySource;
  /**
   * Properties of KeyVault
   */
  keyVaultProperties?: KeyVaultProperties;
}

/**
 * Input type for Properties to configure Encryption
 */
export interface EncryptionInput extends InputOf<Encryption> {
  /**
   * Enumerates the possible value of keySource for Encryption
   */
  keySource?: ExpressionOrValue<KeySource> | undefined;
  /**
   * Properties of KeyVault
   */
  keyVaultProperties?: KeyVaultPropertiesInput | undefined;
}

/**
 * View type for Properties to configure Encryption
 */
export type EncryptionView = EncryptionInput;

export const encryptionShape: FlatModelShape = createFlatModelShape({
  keySource: { armPath: ["keySource"], value: createUnionShape() },
  keyVaultProperties: {
    armPath: ["keyVaultProperties"],
    value: createDeferredShape(() => keyVaultPropertiesShape),
  },
});

/**
 * Properties to EncryptionScope
 */
export interface EncryptionScopeProperties {
  /**
   * Enumerates the possible value of keySource for Encryption
   */
  keySource?: KeySource;
  /**
   * Properties of KeyVault
   */
  keyVaultProperties?: KeyVaultProperties;
  /**
   * Gets the status of the resource at the time the operation was called.
   */
  provisioningState?: EncryptionScopeProvisioningState;
  /**
   * The encryptionScope state.
   */
  state?: EncryptionScopeState;
}

/**
 * Input type for Properties to EncryptionScope
 */
export interface EncryptionScopePropertiesInput extends InputOf<EncryptionScopeProperties> {
  /**
   * Enumerates the possible value of keySource for Encryption
   */
  keySource?: ExpressionOrValue<KeySource> | undefined;
  /**
   * Properties of KeyVault
   */
  keyVaultProperties?: KeyVaultPropertiesInput | undefined;
  /**
   * The encryptionScope state.
   */
  state?: ExpressionOrValue<EncryptionScopeState> | undefined;
}

/**
 * View type for Properties to EncryptionScope
 */
export interface EncryptionScopePropertiesView extends InputOf<EncryptionScopeProperties> {
  /**
   * Enumerates the possible value of keySource for Encryption
   */
  keySource?: ExpressionOrValue<KeySource> | undefined;
  /**
   * Properties of KeyVault
   */
  keyVaultProperties?: KeyVaultPropertiesView | undefined;
  /**
   * Read-only output: Gets the status of the resource at the time the operation was called.
   */
  readonly provisioningState?: Expression<EncryptionScopeProvisioningState> | undefined;
  /**
   * The encryptionScope state.
   */
  state?: ExpressionOrValue<EncryptionScopeState> | undefined;
}

export const encryptionScopePropertiesShape: FlatModelShape = createFlatModelShape({
  keySource: { armPath: ["keySource"], value: createUnionShape() },
  keyVaultProperties: {
    armPath: ["keyVaultProperties"],
    value: createDeferredShape(() => keyVaultPropertiesShape),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  state: { armPath: ["state"], value: createUnionShape() },
});

/**
 * FQDN Outbound Rule for the managed network of a cognitive services account.
 */
export interface FqdnOutboundRule {
  /**
   * Category of a managed network Outbound Rule of a cognitive services account.
   */
  category?: RuleCategory;
  destination?: string;
  /**
   * Error information about an outbound rule of a cognitive services account if RuleStatus is failed.
   */
  errorInformation?: string;
  parentRuleNames?: string[];
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   */
  status?: RuleStatus;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   *
   * Selects this variant. Must be "FQDN".
   */
  type: "FQDN";
}

/**
 * Input type for FQDN Outbound Rule for the managed network of a cognitive services account.
 */
export interface FqdnOutboundRuleInput extends InputOf<FqdnOutboundRule> {
  /**
   * Category of a managed network Outbound Rule of a cognitive services account.
   */
  category?: ExpressionOrValue<RuleCategory> | undefined;
  destination?: ExpressionOrValue<string> | undefined;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   */
  status?: ExpressionOrValue<RuleStatus> | undefined;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   *
   * Selects this variant. Must be "FQDN".
   */
  type: "FQDN";
}

/**
 * View type for FQDN Outbound Rule for the managed network of a cognitive services account.
 */
export interface FqdnOutboundRuleView extends InputOf<FqdnOutboundRule> {
  /**
   * Category of a managed network Outbound Rule of a cognitive services account.
   */
  category?: ExpressionOrValue<RuleCategory> | undefined;
  destination?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Error information about an outbound rule of a cognitive services account if RuleStatus is failed.
   */
  readonly errorInformation?: Expression<string> | undefined;
  readonly parentRuleNames?: Expression<string[]> | undefined;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   */
  status?: ExpressionOrValue<RuleStatus> | undefined;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   *
   * Selects this variant. Must be "FQDN".
   */
  type: "FQDN";
}

export const fqdnOutboundRuleShape: FlatModelShape = createFlatModelShape({
  category: { armPath: ["category"], value: createUnionShape() },
  destination: { armPath: ["destination"], value: createStringShape() },
  errorInformation: { armPath: ["errorInformation"], value: createStringShape(), readOnly: true },
  parentRuleNames: {
    armPath: ["parentRuleNames"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  status: { armPath: ["status"], value: createUnionShape() },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Represents a hosted agent deployment where the underlying infrastructure is owned by the platform.
 */
export interface HostedAgentDeployment {
  /**
   * Returns a flat list of agent:version deployed in this deployment.
   */
  agents?: VersionedAgentReference[] | null;
  /**
   * Gets or sets the unique identifier of the deployment.
   */
  deploymentId?: string | null;
  /**
   * Gets or sets the type of deployment for the agent.
   *
   * Selects this variant. Must be "Hosted".
   */
  deploymentType: "Hosted";
  /**
   * The asset description text.
   */
  description?: string | null;
  /**
   * Gets or sets the display name of the deployment.
   */
  displayName?: string | null;
  /**
   * Gets or sets the maximum number of replicas for this hosted deployment.
   */
  maxReplicas?: number;
  /**
   * Gets or sets the minimum number of replicas for this hosted deployment.
   */
  minReplicas?: number;
  /**
   * Gets or sets the supported protocol types and versions exposed by this deployment.
   */
  protocols?: AgentProtocolVersion[] | null;
  /**
   * Gets or sets the provisioning state of the agent deployment.
   */
  provisioningState?: AgentDeploymentProvisioningState;
  /**
   * Gets or sets the current operational state of the deployment (and, intrinsically, of the comprising agents).
   */
  state?: AgentDeploymentState | null;
  /**
   * Tag dictionary. Tags can be added, removed, and updated.
   */
  tags?: Record<string, string> | null;
}

/**
 * Input type for Represents a hosted agent deployment where the underlying infrastructure is owned by the platform.
 */
export interface HostedAgentDeploymentInput extends InputOf<HostedAgentDeployment> {
  /**
   * Returns a flat list of agent:version deployed in this deployment.
   */
  agents?:
    | InputArray<VersionedAgentReferenceInput, VersionedAgentReference[]>
    | ExpressionOrValue<null>
    | undefined;
  /**
   * Gets or sets the unique identifier of the deployment.
   */
  deploymentId?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets or sets the type of deployment for the agent.
   *
   * Selects this variant. Must be "Hosted".
   */
  deploymentType: "Hosted";
  /**
   * The asset description text.
   */
  description?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets or sets the display name of the deployment.
   */
  displayName?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets or sets the maximum number of replicas for this hosted deployment.
   */
  maxReplicas?: ExpressionOrValue<number> | undefined;
  /**
   * Gets or sets the minimum number of replicas for this hosted deployment.
   */
  minReplicas?: ExpressionOrValue<number> | undefined;
  /**
   * Gets or sets the supported protocol types and versions exposed by this deployment.
   */
  protocols?:
    | InputArray<AgentProtocolVersionInput, AgentProtocolVersion[]>
    | ExpressionOrValue<null>
    | undefined;
  /**
   * Gets or sets the current operational state of the deployment (and, intrinsically, of the comprising agents).
   */
  state?: ExpressionOrValue<AgentDeploymentState | null> | undefined;
  /**
   * Tag dictionary. Tags can be added, removed, and updated.
   */
  tags?: ExpressionOrValue<Record<string, string> | null> | undefined;
}

/**
 * View type for Represents a hosted agent deployment where the underlying infrastructure is owned by the platform.
 */
export interface HostedAgentDeploymentView extends InputOf<HostedAgentDeployment> {
  /**
   * Returns a flat list of agent:version deployed in this deployment.
   */
  agents?:
    | InputArray<VersionedAgentReferenceView, VersionedAgentReference[]>
    | ExpressionOrValue<null>
    | undefined;
  /**
   * Gets or sets the unique identifier of the deployment.
   */
  deploymentId?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets or sets the type of deployment for the agent.
   *
   * Selects this variant. Must be "Hosted".
   */
  deploymentType: "Hosted";
  /**
   * The asset description text.
   */
  description?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets or sets the display name of the deployment.
   */
  displayName?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets or sets the maximum number of replicas for this hosted deployment.
   */
  maxReplicas?: ExpressionOrValue<number> | undefined;
  /**
   * Gets or sets the minimum number of replicas for this hosted deployment.
   */
  minReplicas?: ExpressionOrValue<number> | undefined;
  /**
   * Gets or sets the supported protocol types and versions exposed by this deployment.
   */
  protocols?:
    | InputArray<AgentProtocolVersionView, AgentProtocolVersion[]>
    | ExpressionOrValue<null>
    | undefined;
  /**
   * Read-only output: Gets or sets the provisioning state of the agent deployment.
   */
  readonly provisioningState?: Expression<AgentDeploymentProvisioningState> | undefined;
  /**
   * Gets or sets the current operational state of the deployment (and, intrinsically, of the comprising agents).
   */
  state?: ExpressionOrValue<AgentDeploymentState | null> | undefined;
  /**
   * Tag dictionary. Tags can be added, removed, and updated.
   */
  tags?: ExpressionOrValue<Record<string, string> | null> | undefined;
}

export const hostedAgentDeploymentShape: FlatModelShape = createFlatModelShape({
  agents: {
    armPath: ["agents"],
    value: createArrayShape(createDeferredShape(() => versionedAgentReferenceShape)),
  },
  deploymentId: { armPath: ["deploymentId"], value: createStringShape() },
  deploymentType: { armPath: ["deploymentType"], value: createStringLiteralShape() },
  description: { armPath: ["description"], value: createStringShape() },
  displayName: { armPath: ["displayName"], value: createStringShape() },
  maxReplicas: { armPath: ["maxReplicas"], value: createNumberShape() },
  minReplicas: { armPath: ["minReplicas"], value: createNumberShape() },
  protocols: {
    armPath: ["protocols"],
    value: createArrayShape(createDeferredShape(() => agentProtocolVersionShape)),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  state: { armPath: ["state"], value: createUnionShape() },
  tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
});

/**
 * Identity for the resource.
 */
export interface Identity {
  /**
   * The principal ID of resource identity.
   */
  principalId?: string;
  /**
   * The tenant ID of resource.
   */
  tenantId?: string;
  /**
   * The identity type.
   */
  type?: ResourceIdentityType;
  /**
   * The list of user assigned identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}
   */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

/**
 * Input type for Identity for the resource.
 */
export interface IdentityInput extends InputOf<Identity> {
  /**
   * The identity type.
   */
  type?: ExpressionOrValue<ResourceIdentityType> | undefined;
  /**
   * The list of user assigned identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}
   */
  userAssignedIdentities?:
    InputRecord<UserAssignedIdentityInput, Record<string, UserAssignedIdentity>> | undefined;
}

/**
 * View type for Identity for the resource.
 */
export interface IdentityView extends InputOf<Identity> {
  /**
   * Read-only output: The principal ID of resource identity.
   */
  readonly principalId?: Expression<string> | undefined;
  /**
   * Read-only output: The tenant ID of resource.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * The identity type.
   */
  type?: ExpressionOrValue<ResourceIdentityType> | undefined;
  /**
   * The list of user assigned identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}
   */
  userAssignedIdentities?:
    InputRecord<UserAssignedIdentityView, Record<string, UserAssignedIdentity>> | undefined;
}

export const identityShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createEnumShape() },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    value: createRecordShape(createDeferredShape(() => userAssignedIdentityShape)),
  },
});

/**
 * A rule governing the accessibility from a specific ip address or ip range.
 */
export interface IpRule {
  /**
   * An IPv4 address range in CIDR notation, such as '124.56.78.91' (simple IP address) or '124.56.78.0/24' (all addresses that start with 124.56.78).
   */
  value: string;
}

/**
 * Input type for A rule governing the accessibility from a specific ip address or ip range.
 */
export interface IpRuleInput extends InputOf<IpRule> {
  /**
   * An IPv4 address range in CIDR notation, such as '124.56.78.91' (simple IP address) or '124.56.78.0/24' (all addresses that start with 124.56.78).
   */
  value: ExpressionOrValue<string>;
}

/**
 * View type for A rule governing the accessibility from a specific ip address or ip range.
 */
export type IpRuleView = IpRuleInput;

export const ipRuleShape: FlatModelShape = createFlatModelShape({
  value: { armPath: ["value"], value: createStringShape() },
});

/**
 * Properties to configure keyVault Properties
 */
export interface KeyVaultProperties {
  identityClientId?: string;
  /**
   * Name of the Key from KeyVault
   */
  keyName?: string;
  /**
   * Uri of KeyVault
   */
  keyVaultUri?: string;
  /**
   * Version of the Key from KeyVault
   */
  keyVersion?: string;
}

/**
 * Input type for Properties to configure keyVault Properties
 */
export interface KeyVaultPropertiesInput extends InputOf<KeyVaultProperties> {
  identityClientId?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the Key from KeyVault
   */
  keyName?: ExpressionOrValue<string> | undefined;
  /**
   * Uri of KeyVault
   */
  keyVaultUri?: ExpressionOrValue<string> | undefined;
  /**
   * Version of the Key from KeyVault
   */
  keyVersion?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties to configure keyVault Properties
 */
export type KeyVaultPropertiesView = KeyVaultPropertiesInput;

export const keyVaultPropertiesShape: FlatModelShape = createFlatModelShape({
  identityClientId: { armPath: ["identityClientId"], value: createStringShape() },
  keyName: { armPath: ["keyName"], value: createStringShape() },
  keyVaultUri: { armPath: ["keyVaultUri"], value: createStringShape() },
  keyVersion: { armPath: ["keyVersion"], value: createStringShape() },
});

/**
 * Represents a managed agent deployment where the underlying infrastructure is managed by the platform in the deployer's subscription.
 */
export interface ManagedAgentDeployment {
  /**
   * Returns a flat list of agent:version deployed in this deployment.
   */
  agents?: VersionedAgentReference[] | null;
  /**
   * Gets or sets the unique identifier of the deployment.
   */
  deploymentId?: string | null;
  /**
   * Gets or sets the type of deployment for the agent.
   *
   * Selects this variant. Must be "Managed".
   */
  deploymentType: "Managed";
  /**
   * The asset description text.
   */
  description?: string | null;
  /**
   * Gets or sets the display name of the deployment.
   */
  displayName?: string | null;
  /**
   * Gets or sets the supported protocol types and versions exposed by this deployment.
   */
  protocols?: AgentProtocolVersion[] | null;
  /**
   * Gets or sets the provisioning state of the agent deployment.
   */
  provisioningState?: AgentDeploymentProvisioningState;
  /**
   * Gets or sets the current operational state of the deployment (and, intrinsically, of the comprising agents).
   */
  state?: AgentDeploymentState | null;
  /**
   * Tag dictionary. Tags can be added, removed, and updated.
   */
  tags?: Record<string, string> | null;
}

/**
 * Input type for Represents a managed agent deployment where the underlying infrastructure is managed by the platform in the deployer's subscription.
 */
export interface ManagedAgentDeploymentInput extends InputOf<ManagedAgentDeployment> {
  /**
   * Returns a flat list of agent:version deployed in this deployment.
   */
  agents?:
    | InputArray<VersionedAgentReferenceInput, VersionedAgentReference[]>
    | ExpressionOrValue<null>
    | undefined;
  /**
   * Gets or sets the unique identifier of the deployment.
   */
  deploymentId?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets or sets the type of deployment for the agent.
   *
   * Selects this variant. Must be "Managed".
   */
  deploymentType: "Managed";
  /**
   * The asset description text.
   */
  description?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets or sets the display name of the deployment.
   */
  displayName?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets or sets the supported protocol types and versions exposed by this deployment.
   */
  protocols?:
    | InputArray<AgentProtocolVersionInput, AgentProtocolVersion[]>
    | ExpressionOrValue<null>
    | undefined;
  /**
   * Gets or sets the current operational state of the deployment (and, intrinsically, of the comprising agents).
   */
  state?: ExpressionOrValue<AgentDeploymentState | null> | undefined;
  /**
   * Tag dictionary. Tags can be added, removed, and updated.
   */
  tags?: ExpressionOrValue<Record<string, string> | null> | undefined;
}

/**
 * View type for Represents a managed agent deployment where the underlying infrastructure is managed by the platform in the deployer's subscription.
 */
export interface ManagedAgentDeploymentView extends InputOf<ManagedAgentDeployment> {
  /**
   * Returns a flat list of agent:version deployed in this deployment.
   */
  agents?:
    | InputArray<VersionedAgentReferenceView, VersionedAgentReference[]>
    | ExpressionOrValue<null>
    | undefined;
  /**
   * Gets or sets the unique identifier of the deployment.
   */
  deploymentId?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets or sets the type of deployment for the agent.
   *
   * Selects this variant. Must be "Managed".
   */
  deploymentType: "Managed";
  /**
   * The asset description text.
   */
  description?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets or sets the display name of the deployment.
   */
  displayName?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets or sets the supported protocol types and versions exposed by this deployment.
   */
  protocols?:
    | InputArray<AgentProtocolVersionView, AgentProtocolVersion[]>
    | ExpressionOrValue<null>
    | undefined;
  /**
   * Read-only output: Gets or sets the provisioning state of the agent deployment.
   */
  readonly provisioningState?: Expression<AgentDeploymentProvisioningState> | undefined;
  /**
   * Gets or sets the current operational state of the deployment (and, intrinsically, of the comprising agents).
   */
  state?: ExpressionOrValue<AgentDeploymentState | null> | undefined;
  /**
   * Tag dictionary. Tags can be added, removed, and updated.
   */
  tags?: ExpressionOrValue<Record<string, string> | null> | undefined;
}

export const managedAgentDeploymentShape: FlatModelShape = createFlatModelShape({
  agents: {
    armPath: ["agents"],
    value: createArrayShape(createDeferredShape(() => versionedAgentReferenceShape)),
  },
  deploymentId: { armPath: ["deploymentId"], value: createStringShape() },
  deploymentType: { armPath: ["deploymentType"], value: createStringLiteralShape() },
  description: { armPath: ["description"], value: createStringShape() },
  displayName: { armPath: ["displayName"], value: createStringShape() },
  protocols: {
    armPath: ["protocols"],
    value: createArrayShape(createDeferredShape(() => agentProtocolVersionShape)),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  state: { armPath: ["state"], value: createUnionShape() },
  tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
});

export interface ManagedIdentityAuthTypeConnectionProperties {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "ManagedIdentity".
   */
  authType: "ManagedIdentity";
  /**
   * Category of the connection
   */
  category?: ConnectionCategory;
  createdByWorkspaceArmId?: string;
  credentials?: ConnectionManagedIdentity;
  /**
   * Provides the error message if the connection fails
   */
  error?: string;
  expiryTime?: Date;
  /**
   * Group based on connection category
   */
  group?: ConnectionGroup;
  isSharedToAll?: boolean;
  /**
   * Store user metadata for this connection
   */
  metadata?: Record<string, string>;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ManagedPeRequirement;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ManagedPeStatus;
  sharedUserList?: string[];
  /**
   * The connection URL to be used.
   */
  target?: string;
  useWorkspaceManagedIdentity?: boolean;
}

export interface ManagedIdentityAuthTypeConnectionPropertiesInput extends InputOf<ManagedIdentityAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "ManagedIdentity".
   */
  authType: "ManagedIdentity";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  credentials?: ConnectionManagedIdentityInput | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export interface ManagedIdentityAuthTypeConnectionPropertiesView extends InputOf<ManagedIdentityAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "ManagedIdentity".
   */
  authType: "ManagedIdentity";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  readonly createdByWorkspaceArmId?: Expression<string> | undefined;
  credentials?: ConnectionManagedIdentityView | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Read-only output: Group based on connection category
   */
  readonly group?: Expression<ConnectionGroup> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export const managedIdentityAuthTypeConnectionPropertiesShape: FlatModelShape =
  createFlatModelShape({
    authType: { armPath: ["authType"], value: createStringLiteralShape() },
    category: { armPath: ["category"], value: createUnionShape() },
    createdByWorkspaceArmId: {
      armPath: ["createdByWorkspaceArmId"],
      value: createStringShape(),
      readOnly: true,
    },
    credentials: {
      armPath: ["credentials"],
      value: createDeferredShape(() => connectionManagedIdentityShape),
    },
    error: { armPath: ["error"], value: createStringShape() },
    expiryTime: {
      armPath: ["expiryTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
    },
    group: { armPath: ["group"], value: createUnionShape(), readOnly: true },
    isSharedToAll: { armPath: ["isSharedToAll"], value: createBooleanShape() },
    metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
    peRequirement: { armPath: ["peRequirement"], value: createUnionShape() },
    peStatus: { armPath: ["peStatus"], value: createUnionShape() },
    sharedUserList: { armPath: ["sharedUserList"], value: createArrayShape(createStringShape()) },
    target: { armPath: ["target"], value: createStringShape() },
    useWorkspaceManagedIdentity: {
      armPath: ["useWorkspaceManagedIdentity"],
      value: createBooleanShape(),
    },
  });

/**
 * Status of the Provisioning for the managed network of a cognitive services account.
 */
export interface ManagedNetworkProvisionStatus {
  /**
   * Status for the managed network of a cognitive services account.
   */
  status?: ManagedNetworkStatus;
}

/**
 * Input type for Status of the Provisioning for the managed network of a cognitive services account.
 */
export interface ManagedNetworkProvisionStatusInput extends InputOf<ManagedNetworkProvisionStatus> {
  /**
   * Status for the managed network of a cognitive services account.
   */
  status?: ExpressionOrValue<ManagedNetworkStatus> | undefined;
}

/**
 * View type for Status of the Provisioning for the managed network of a cognitive services account.
 */
export type ManagedNetworkProvisionStatusView = ManagedNetworkProvisionStatusInput;

export const managedNetworkProvisionStatusShape: FlatModelShape = createFlatModelShape({
  status: { armPath: ["status"], value: createUnionShape() },
});

export interface ManagedNetworkSettingsEx {
  changeableIsolationModes?: IsolationMode[];
  /**
   * Public IP address assigned to the Azure Firewall.
   */
  firewallPublicIpAddress?: string | null;
  /**
   * Firewall Sku used for FQDN Rules
   */
  firewallSku?: FirewallSku;
  /**
   * Isolation mode for the managed network of a cognitive services account.
   */
  isolationMode?: IsolationMode;
  /**
   * The Kind of the managed network. Users can switch from V1 to V2 for granular access controls, but cannot switch back to V1 once V2 is enabled.
   */
  managedNetworkKind?: ManagedNetworkKind;
  networkId?: string;
  /**
   * Dictionary of <OutboundRule>
   */
  outboundRules?: Record<string, CognitiveServicesOutboundRule> | null;
  /**
   * The provisioning state of the managed network settings.
   */
  provisioningState?: ManagedNetworkProvisioningState;
  /**
   * Status of the Provisioning for the managed network of a cognitive services account.
   */
  status?: ManagedNetworkProvisionStatus;
}

export interface ManagedNetworkSettingsExInput extends InputOf<ManagedNetworkSettingsEx> {
  /**
   * Firewall Sku used for FQDN Rules
   */
  firewallSku?: ExpressionOrValue<FirewallSku> | undefined;
  /**
   * Isolation mode for the managed network of a cognitive services account.
   */
  isolationMode?: ExpressionOrValue<IsolationMode> | undefined;
  /**
   * The Kind of the managed network. Users can switch from V1 to V2 for granular access controls, but cannot switch back to V1 once V2 is enabled.
   */
  managedNetworkKind?: ExpressionOrValue<ManagedNetworkKind> | undefined;
  /**
   * Dictionary of <OutboundRule>
   */
  outboundRules?:
    | InputRecord<CognitiveServicesOutboundRuleInput, Record<string, CognitiveServicesOutboundRule>>
    | ExpressionOrValue<null>
    | undefined;
  /**
   * Status of the Provisioning for the managed network of a cognitive services account.
   */
  status?: ManagedNetworkProvisionStatusInput | undefined;
}

export interface ManagedNetworkSettingsExView extends InputOf<ManagedNetworkSettingsEx> {
  readonly changeableIsolationModes?: Expression<IsolationMode[]> | undefined;
  /**
   * Read-only output: Public IP address assigned to the Azure Firewall.
   */
  readonly firewallPublicIpAddress?: Expression<string | null> | undefined;
  /**
   * Firewall Sku used for FQDN Rules
   */
  firewallSku?: ExpressionOrValue<FirewallSku> | undefined;
  /**
   * Isolation mode for the managed network of a cognitive services account.
   */
  isolationMode?: ExpressionOrValue<IsolationMode> | undefined;
  /**
   * The Kind of the managed network. Users can switch from V1 to V2 for granular access controls, but cannot switch back to V1 once V2 is enabled.
   */
  managedNetworkKind?: ExpressionOrValue<ManagedNetworkKind> | undefined;
  readonly networkId?: Expression<string> | undefined;
  /**
   * Dictionary of <OutboundRule>
   */
  outboundRules?:
    | InputRecord<CognitiveServicesOutboundRuleView, Record<string, CognitiveServicesOutboundRule>>
    | ExpressionOrValue<null>
    | undefined;
  /**
   * Read-only output: The provisioning state of the managed network settings.
   */
  readonly provisioningState?: Expression<ManagedNetworkProvisioningState> | undefined;
  /**
   * Status of the Provisioning for the managed network of a cognitive services account.
   */
  status?: ManagedNetworkProvisionStatusView | undefined;
}

export const managedNetworkSettingsExShape: FlatModelShape = createFlatModelShape({
  changeableIsolationModes: {
    armPath: ["changeableIsolationModes"],
    value: createArrayShape(createUnionShape()),
    readOnly: true,
  },
  firewallPublicIpAddress: {
    armPath: ["firewallPublicIpAddress"],
    value: createStringShape(),
    readOnly: true,
  },
  firewallSku: { armPath: ["firewallSku"], value: createUnionShape() },
  isolationMode: { armPath: ["isolationMode"], value: createUnionShape() },
  managedNetworkKind: { armPath: ["managedNetworkKind"], value: createUnionShape() },
  networkId: { armPath: ["networkId"], value: createStringShape(), readOnly: true },
  outboundRules: {
    armPath: ["outboundRules"],
    value: createRecordShape(createDeferredShape(() => cognitiveServicesOutboundRuleShape)),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  status: {
    armPath: ["status"],
    value: createDeferredShape(() => managedNetworkProvisionStatusShape),
  },
});

/**
 * The properties of the managed network settings of a cognitive services account.
 */
export interface ManagedNetworkSettingsProperties {
  /**
   * Managed Network settings for a cognitive services account.
   */
  managedNetwork?: ManagedNetworkSettingsEx;
  /**
   * The current deployment state of the managed network resource. The provisioningState is to indicate states for resource provisioning.
   */
  provisioningState?: ManagedNetworkProvisioningState;
}

/**
 * Input type for The properties of the managed network settings of a cognitive services account.
 */
export interface ManagedNetworkSettingsPropertiesInput extends InputOf<ManagedNetworkSettingsProperties> {
  /**
   * Managed Network settings for a cognitive services account.
   */
  managedNetwork?: ManagedNetworkSettingsExInput | undefined;
}

/**
 * View type for The properties of the managed network settings of a cognitive services account.
 */
export interface ManagedNetworkSettingsPropertiesView extends InputOf<ManagedNetworkSettingsProperties> {
  /**
   * Managed Network settings for a cognitive services account.
   */
  managedNetwork?: ManagedNetworkSettingsExView | undefined;
  /**
   * Read-only output: The current deployment state of the managed network resource. The provisioningState is to indicate states for resource provisioning.
   */
  readonly provisioningState?: Expression<ManagedNetworkProvisioningState> | undefined;
}

export const managedNetworkSettingsPropertiesShape: FlatModelShape = createFlatModelShape({
  managedNetwork: {
    armPath: ["managedNetwork"],
    value: createDeferredShape(() => managedNetworkSettingsExShape),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

/**
 * The multiregion settings Cognitive Services account.
 */
export interface MultiRegionSettings {
  regions?: RegionSetting[];
  /**
   * Multiregion routing methods.
   */
  routingMethod?: RoutingMethods;
}

/**
 * Input type for The multiregion settings Cognitive Services account.
 */
export interface MultiRegionSettingsInput extends InputOf<MultiRegionSettings> {
  regions?: InputArray<RegionSettingInput, RegionSetting[]> | undefined;
  /**
   * Multiregion routing methods.
   */
  routingMethod?: ExpressionOrValue<RoutingMethods> | undefined;
}

/**
 * View type for The multiregion settings Cognitive Services account.
 */
export type MultiRegionSettingsView = MultiRegionSettingsInput;

export const multiRegionSettingsShape: FlatModelShape = createFlatModelShape({
  regions: {
    armPath: ["regions"],
    value: createArrayShape(createDeferredShape(() => regionSettingShape)),
  },
  routingMethod: { armPath: ["routingMethod"], value: createUnionShape() },
});

/**
 * Specifies in AI Foundry where virtual network injection occurs to secure scenarios like Agents entirely within the user's private network, eliminating public internet exposure while maintaining control over network configurations and resources.
 */
export interface NetworkInjection {
  /**
   * Specifies what features in AI Foundry network injection applies to. Currently only supports 'agent' for agent scenarios. 'none' means no network injection.
   */
  scenario?: ScenarioType;
  /**
   * Specify the subnet for which your Agent Client is injected into.
   */
  subnetArmId?: string;
  /**
   * Boolean to enable Microsoft Managed Network for subnet delegation
   */
  useMicrosoftManagedNetwork?: boolean;
}

/**
 * Input type for Specifies in AI Foundry where virtual network injection occurs to secure scenarios like Agents entirely within the user's private network, eliminating public internet exposure while maintaining control over network configurations and resources.
 */
export interface NetworkInjectionInput extends InputOf<NetworkInjection> {
  /**
   * Specifies what features in AI Foundry network injection applies to. Currently only supports 'agent' for agent scenarios. 'none' means no network injection.
   */
  scenario?: ExpressionOrValue<ScenarioType> | undefined;
  /**
   * Specify the subnet for which your Agent Client is injected into.
   */
  subnetArmId?: ExpressionOrValue<string> | undefined;
  /**
   * Boolean to enable Microsoft Managed Network for subnet delegation
   */
  useMicrosoftManagedNetwork?: ExpressionOrValue<boolean> | undefined;
}

/**
 * View type for Specifies in AI Foundry where virtual network injection occurs to secure scenarios like Agents entirely within the user's private network, eliminating public internet exposure while maintaining control over network configurations and resources.
 */
export type NetworkInjectionView = NetworkInjectionInput;

export const networkInjectionShape: FlatModelShape = createFlatModelShape({
  scenario: { armPath: ["scenario"], value: createUnionShape() },
  subnetArmId: { armPath: ["subnetArmId"], value: createStringShape() },
  useMicrosoftManagedNetwork: {
    armPath: ["useMicrosoftManagedNetwork"],
    value: createBooleanShape(),
  },
});

/**
 * A set of rules governing the network accessibility.
 */
export interface NetworkRuleSet {
  /**
   * Setting for trusted services.
   */
  bypass?: ByPassSelection;
  /**
   * The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated.
   */
  defaultAction?: NetworkRuleAction;
  /**
   * The list of IP address rules.
   */
  ipRules?: IpRule[];
  /**
   * The list of virtual network rules.
   */
  virtualNetworkRules?: VirtualNetworkRule[];
}

/**
 * Input type for A set of rules governing the network accessibility.
 */
export interface NetworkRuleSetInput extends InputOf<NetworkRuleSet> {
  /**
   * Setting for trusted services.
   */
  bypass?: ExpressionOrValue<ByPassSelection> | undefined;
  /**
   * The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated.
   */
  defaultAction?: ExpressionOrValue<NetworkRuleAction> | undefined;
  /**
   * The list of IP address rules.
   */
  ipRules?: InputArray<IpRuleInput, IpRule[]> | undefined;
  /**
   * The list of virtual network rules.
   */
  virtualNetworkRules?: InputArray<VirtualNetworkRuleInput, VirtualNetworkRule[]> | undefined;
}

/**
 * View type for A set of rules governing the network accessibility.
 */
export type NetworkRuleSetView = NetworkRuleSetInput;

export const networkRuleSetShape: FlatModelShape = createFlatModelShape({
  bypass: { armPath: ["bypass"], value: createUnionShape() },
  defaultAction: { armPath: ["defaultAction"], value: createUnionShape() },
  ipRules: {
    armPath: ["ipRules"],
    value: createArrayShape(createDeferredShape(() => ipRuleShape)),
  },
  virtualNetworkRules: {
    armPath: ["virtualNetworkRules"],
    value: createArrayShape(createDeferredShape(() => virtualNetworkRuleShape)),
  },
});

/**
 * Information about a linked Network Security Perimeter
 */
export interface NetworkSecurityPerimeter {
  /**
   * Fully qualified identifier of the resource
   */
  id?: string;
  /**
   * Location of the resource
   */
  location?: string;
  /**
   * Guid of the resource
   */
  perimeterGuid?: string;
}

/**
 * Input type for Information about a linked Network Security Perimeter
 */
export interface NetworkSecurityPerimeterInput extends InputOf<NetworkSecurityPerimeter> {}

/**
 * View type for Information about a linked Network Security Perimeter
 */
export interface NetworkSecurityPerimeterView extends InputOf<NetworkSecurityPerimeter> {
  /**
   * Read-only output: Fully qualified identifier of the resource
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: Location of the resource
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: Guid of the resource
   */
  readonly perimeterGuid?: Expression<string> | undefined;
}

export const networkSecurityPerimeterShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  location: { armPath: ["location"], value: createStringShape(), readOnly: true },
  perimeterGuid: { armPath: ["perimeterGuid"], value: createStringShape(), readOnly: true },
});

/**
 * Network Security Perimeter Access Rule
 */
export interface NetworkSecurityPerimeterAccessRule {
  /**
   * Network Security Perimeter Access Rule Name
   */
  name?: string;
  /**
   * Properties of Network Security Perimeter Access Rule
   */
  properties?: NetworkSecurityPerimeterAccessRuleProperties;
}

/**
 * Input type for Network Security Perimeter Access Rule
 */
export interface NetworkSecurityPerimeterAccessRuleInput extends InputOf<NetworkSecurityPerimeterAccessRule> {}

/**
 * View type for Network Security Perimeter Access Rule
 */
export interface NetworkSecurityPerimeterAccessRuleView extends InputOf<NetworkSecurityPerimeterAccessRule> {
  /**
   * Read-only output: Network Security Perimeter Access Rule Name
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: Properties of Network Security Perimeter Access Rule
   */
  readonly properties?: Expression<NetworkSecurityPerimeterAccessRuleProperties> | undefined;
}

export const networkSecurityPerimeterAccessRuleShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => networkSecurityPerimeterAccessRulePropertiesShape),
    readOnly: true,
  },
});

/**
 * The Properties of Network Security Perimeter Rule
 */
export interface NetworkSecurityPerimeterAccessRuleProperties {
  /**
   * Address prefixes for inbound rules
   */
  addressPrefixes?: string[];
  /**
   * Direction of Access Rule
   */
  direction?: NspAccessRuleDirection;
  /**
   * Fully qualified domain name for outbound rules
   */
  fullyQualifiedDomainNames?: string[];
  /**
   * NetworkSecurityPerimeters for inbound rules
   */
  networkSecurityPerimeters?: NetworkSecurityPerimeter[];
  /**
   * Subscriptions for inbound rules
   */
  subscriptions?: NetworkSecurityPerimeterAccessRulePropertiesSubscriptionsItem[];
}

/**
 * Input type for The Properties of Network Security Perimeter Rule
 */
export interface NetworkSecurityPerimeterAccessRulePropertiesInput extends InputOf<NetworkSecurityPerimeterAccessRuleProperties> {}

/**
 * View type for The Properties of Network Security Perimeter Rule
 */
export interface NetworkSecurityPerimeterAccessRulePropertiesView extends InputOf<NetworkSecurityPerimeterAccessRuleProperties> {
  /**
   * Read-only output: Address prefixes for inbound rules
   */
  readonly addressPrefixes?: Expression<string[]> | undefined;
  /**
   * Read-only output: Direction of Access Rule
   */
  readonly direction?: Expression<NspAccessRuleDirection> | undefined;
  /**
   * Read-only output: Fully qualified domain name for outbound rules
   */
  readonly fullyQualifiedDomainNames?: Expression<string[]> | undefined;
  /**
   * Read-only output: NetworkSecurityPerimeters for inbound rules
   */
  readonly networkSecurityPerimeters?: Expression<NetworkSecurityPerimeter[]> | undefined;
  /**
   * Read-only output: Subscriptions for inbound rules
   */
  readonly subscriptions?:
    Expression<NetworkSecurityPerimeterAccessRulePropertiesSubscriptionsItem[]> | undefined;
}

export const networkSecurityPerimeterAccessRulePropertiesShape: FlatModelShape =
  createFlatModelShape({
    addressPrefixes: {
      armPath: ["addressPrefixes"],
      value: createArrayShape(createStringShape()),
      readOnly: true,
    },
    direction: { armPath: ["direction"], value: createUnionShape(), readOnly: true },
    fullyQualifiedDomainNames: {
      armPath: ["fullyQualifiedDomainNames"],
      value: createArrayShape(createStringShape()),
      readOnly: true,
    },
    networkSecurityPerimeters: {
      armPath: ["networkSecurityPerimeters"],
      value: createArrayShape(createDeferredShape(() => networkSecurityPerimeterShape)),
      readOnly: true,
    },
    subscriptions: {
      armPath: ["subscriptions"],
      value: createArrayShape(
        createDeferredShape(
          () => networkSecurityPerimeterAccessRulePropertiesSubscriptionsItemShape,
        ),
      ),
      readOnly: true,
    },
  });

/**
 * Subscription for inbound rule
 */
export interface NetworkSecurityPerimeterAccessRulePropertiesSubscriptionsItem {
  /**
   * Fully qualified identifier of subscription
   */
  id?: string;
}

/**
 * Input type for Subscription for inbound rule
 */
export interface NetworkSecurityPerimeterAccessRulePropertiesSubscriptionsItemInput extends InputOf<NetworkSecurityPerimeterAccessRulePropertiesSubscriptionsItem> {}

/**
 * View type for Subscription for inbound rule
 */
export interface NetworkSecurityPerimeterAccessRulePropertiesSubscriptionsItemView extends InputOf<NetworkSecurityPerimeterAccessRulePropertiesSubscriptionsItem> {
  /**
   * Read-only output: Fully qualified identifier of subscription
   */
  readonly id?: Expression<string> | undefined;
}

export const networkSecurityPerimeterAccessRulePropertiesSubscriptionsItemShape: FlatModelShape =
  createFlatModelShape({
    id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  });

/**
 * Network Security Perimeter Configuration Association Information
 */
export interface NetworkSecurityPerimeterConfigurationAssociationInfo {
  /**
   * Access Mode of the resource association
   */
  accessMode?: string;
  /**
   * Name of the resource association
   */
  name?: string;
}

/**
 * Input type for Network Security Perimeter Configuration Association Information
 */
export interface NetworkSecurityPerimeterConfigurationAssociationInfoInput extends InputOf<NetworkSecurityPerimeterConfigurationAssociationInfo> {}

/**
 * View type for Network Security Perimeter Configuration Association Information
 */
export interface NetworkSecurityPerimeterConfigurationAssociationInfoView extends InputOf<NetworkSecurityPerimeterConfigurationAssociationInfo> {
  /**
   * Read-only output: Access Mode of the resource association
   */
  readonly accessMode?: Expression<string> | undefined;
  /**
   * Read-only output: Name of the resource association
   */
  readonly name?: Expression<string> | undefined;
}

export const networkSecurityPerimeterConfigurationAssociationInfoShape: FlatModelShape =
  createFlatModelShape({
    accessMode: { armPath: ["accessMode"], value: createStringShape(), readOnly: true },
    name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  });

/**
 * The properties of an NSP Configuration.
 */
export interface NetworkSecurityPerimeterConfigurationProperties {
  /**
   * Information about a linked Network Security Perimeter
   */
  networkSecurityPerimeter?: NetworkSecurityPerimeter;
  /**
   * Network Security Perimeter Profile Information
   */
  profile?: NetworkSecurityPerimeterProfileInfo;
  /**
   * List of Provisioning Issues
   */
  provisioningIssues?: ProvisioningIssue[];
  /**
   * Provisioning state of NetworkSecurityPerimeter configuration
   */
  provisioningState?: string;
  /**
   * Network Security Perimeter Configuration Association Information
   */
  resourceAssociation?: NetworkSecurityPerimeterConfigurationAssociationInfo;
}

/**
 * Input type for The properties of an NSP Configuration.
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesInput extends InputOf<NetworkSecurityPerimeterConfigurationProperties> {}

/**
 * View type for The properties of an NSP Configuration.
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesView extends InputOf<NetworkSecurityPerimeterConfigurationProperties> {
  /**
   * Read-only output: Information about a linked Network Security Perimeter
   */
  readonly networkSecurityPerimeter?: Expression<NetworkSecurityPerimeter> | undefined;
  /**
   * Read-only output: Network Security Perimeter Profile Information
   */
  readonly profile?: Expression<NetworkSecurityPerimeterProfileInfo> | undefined;
  /**
   * Read-only output: List of Provisioning Issues
   */
  readonly provisioningIssues?: Expression<ProvisioningIssue[]> | undefined;
  /**
   * Read-only output: Provisioning state of NetworkSecurityPerimeter configuration
   */
  readonly provisioningState?: Expression<string> | undefined;
  /**
   * Read-only output: Network Security Perimeter Configuration Association Information
   */
  readonly resourceAssociation?:
    Expression<NetworkSecurityPerimeterConfigurationAssociationInfo> | undefined;
}

export const networkSecurityPerimeterConfigurationPropertiesShape: FlatModelShape =
  createFlatModelShape({
    networkSecurityPerimeter: {
      armPath: ["networkSecurityPerimeter"],
      value: createDeferredShape(() => networkSecurityPerimeterShape),
      readOnly: true,
    },
    profile: {
      armPath: ["profile"],
      value: createDeferredShape(() => networkSecurityPerimeterProfileInfoShape),
      readOnly: true,
    },
    provisioningIssues: {
      armPath: ["provisioningIssues"],
      value: createArrayShape(createDeferredShape(() => provisioningIssueShape)),
      readOnly: true,
    },
    provisioningState: {
      armPath: ["provisioningState"],
      value: createStringShape(),
      readOnly: true,
    },
    resourceAssociation: {
      armPath: ["resourceAssociation"],
      value: createDeferredShape(() => networkSecurityPerimeterConfigurationAssociationInfoShape),
      readOnly: true,
    },
  });

/**
 * Network Security Perimeter Profile Information
 */
export interface NetworkSecurityPerimeterProfileInfo {
  accessRules?: NetworkSecurityPerimeterAccessRule[];
  /**
   * Access rules version of the resource profile
   */
  accessRulesVersion?: number;
  /**
   * Current diagnostic settings version
   */
  diagnosticSettingsVersion?: number;
  /**
   * List of enabled log categories
   */
  enabledLogCategories?: string[];
  /**
   * Name of the resource profile
   */
  name?: string;
}

/**
 * Input type for Network Security Perimeter Profile Information
 */
export interface NetworkSecurityPerimeterProfileInfoInput extends InputOf<NetworkSecurityPerimeterProfileInfo> {}

/**
 * View type for Network Security Perimeter Profile Information
 */
export interface NetworkSecurityPerimeterProfileInfoView extends InputOf<NetworkSecurityPerimeterProfileInfo> {
  readonly accessRules?: Expression<NetworkSecurityPerimeterAccessRule[]> | undefined;
  /**
   * Read-only output: Access rules version of the resource profile
   */
  readonly accessRulesVersion?: Expression<number> | undefined;
  /**
   * Read-only output: Current diagnostic settings version
   */
  readonly diagnosticSettingsVersion?: Expression<number> | undefined;
  /**
   * Read-only output: List of enabled log categories
   */
  readonly enabledLogCategories?: Expression<string[]> | undefined;
  /**
   * Read-only output: Name of the resource profile
   */
  readonly name?: Expression<string> | undefined;
}

export const networkSecurityPerimeterProfileInfoShape: FlatModelShape = createFlatModelShape({
  accessRules: {
    armPath: ["accessRules"],
    value: createArrayShape(createDeferredShape(() => networkSecurityPerimeterAccessRuleShape)),
    readOnly: true,
  },
  accessRulesVersion: {
    armPath: ["accessRulesVersion"],
    value: createNumberShape(),
    readOnly: true,
  },
  diagnosticSettingsVersion: {
    armPath: ["diagnosticSettingsVersion"],
    value: createNumberShape(),
    readOnly: true,
  },
  enabledLogCategories: {
    armPath: ["enabledLogCategories"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
});

export interface NoneAuthTypeConnectionProperties {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "None".
   */
  authType: "None";
  /**
   * Category of the connection
   */
  category?: ConnectionCategory;
  createdByWorkspaceArmId?: string;
  /**
   * Provides the error message if the connection fails
   */
  error?: string;
  expiryTime?: Date;
  /**
   * Group based on connection category
   */
  group?: ConnectionGroup;
  isSharedToAll?: boolean;
  /**
   * Store user metadata for this connection
   */
  metadata?: Record<string, string>;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ManagedPeRequirement;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ManagedPeStatus;
  sharedUserList?: string[];
  /**
   * The connection URL to be used.
   */
  target?: string;
  useWorkspaceManagedIdentity?: boolean;
}

export interface NoneAuthTypeConnectionPropertiesInput extends InputOf<NoneAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "None".
   */
  authType: "None";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export interface NoneAuthTypeConnectionPropertiesView extends InputOf<NoneAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "None".
   */
  authType: "None";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  readonly createdByWorkspaceArmId?: Expression<string> | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Read-only output: Group based on connection category
   */
  readonly group?: Expression<ConnectionGroup> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export const noneAuthTypeConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  authType: { armPath: ["authType"], value: createStringLiteralShape() },
  category: { armPath: ["category"], value: createUnionShape() },
  createdByWorkspaceArmId: {
    armPath: ["createdByWorkspaceArmId"],
    value: createStringShape(),
    readOnly: true,
  },
  error: { armPath: ["error"], value: createStringShape() },
  expiryTime: {
    armPath: ["expiryTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  group: { armPath: ["group"], value: createUnionShape(), readOnly: true },
  isSharedToAll: { armPath: ["isSharedToAll"], value: createBooleanShape() },
  metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
  peRequirement: { armPath: ["peRequirement"], value: createUnionShape() },
  peStatus: { armPath: ["peStatus"], value: createUnionShape() },
  sharedUserList: { armPath: ["sharedUserList"], value: createArrayShape(createStringShape()) },
  target: { armPath: ["target"], value: createStringShape() },
  useWorkspaceManagedIdentity: {
    armPath: ["useWorkspaceManagedIdentity"],
    value: createBooleanShape(),
  },
});

export interface OAuth2AuthTypeConnectionProperties {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "OAuth2".
   */
  authType: "OAuth2";
  /**
   * Category of the connection
   */
  category?: ConnectionCategory;
  createdByWorkspaceArmId?: string;
  /**
   * ClientId and ClientSecret are required. Other properties are optional
   * depending on each OAuth2 provider's implementation.
   */
  credentials?: ConnectionOAuth2;
  /**
   * Provides the error message if the connection fails
   */
  error?: string;
  expiryTime?: Date;
  /**
   * Group based on connection category
   */
  group?: ConnectionGroup;
  isSharedToAll?: boolean;
  /**
   * Store user metadata for this connection
   */
  metadata?: Record<string, string>;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ManagedPeRequirement;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ManagedPeStatus;
  sharedUserList?: string[];
  /**
   * The connection URL to be used.
   */
  target?: string;
  useWorkspaceManagedIdentity?: boolean;
}

export interface OAuth2AuthTypeConnectionPropertiesInput extends InputOf<OAuth2AuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "OAuth2".
   */
  authType: "OAuth2";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  /**
   * ClientId and ClientSecret are required. Other properties are optional
   * depending on each OAuth2 provider's implementation.
   */
  credentials?: ConnectionOAuth2Input | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export interface OAuth2AuthTypeConnectionPropertiesView extends InputOf<OAuth2AuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "OAuth2".
   */
  authType: "OAuth2";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  readonly createdByWorkspaceArmId?: Expression<string> | undefined;
  /**
   * ClientId and ClientSecret are required. Other properties are optional
   * depending on each OAuth2 provider's implementation.
   */
  credentials?: ConnectionOAuth2View | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Read-only output: Group based on connection category
   */
  readonly group?: Expression<ConnectionGroup> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export const oAuth2AuthTypeConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  authType: { armPath: ["authType"], value: createStringLiteralShape() },
  category: { armPath: ["category"], value: createUnionShape() },
  createdByWorkspaceArmId: {
    armPath: ["createdByWorkspaceArmId"],
    value: createStringShape(),
    readOnly: true,
  },
  credentials: {
    armPath: ["credentials"],
    value: createDeferredShape(() => connectionOAuth2Shape),
  },
  error: { armPath: ["error"], value: createStringShape() },
  expiryTime: {
    armPath: ["expiryTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  group: { armPath: ["group"], value: createUnionShape(), readOnly: true },
  isSharedToAll: { armPath: ["isSharedToAll"], value: createBooleanShape() },
  metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
  peRequirement: { armPath: ["peRequirement"], value: createUnionShape() },
  peStatus: { armPath: ["peStatus"], value: createUnionShape() },
  sharedUserList: { armPath: ["sharedUserList"], value: createArrayShape(createStringShape()) },
  target: { armPath: ["target"], value: createStringShape() },
  useWorkspaceManagedIdentity: {
    armPath: ["useWorkspaceManagedIdentity"],
    value: createBooleanShape(),
  },
});

/**
 * Built-in authorization policy scoped to organization/tenant.
 */
export interface OrganizationSharedBuiltInAuthorizationPolicy {
  /**
   * Authorization scheme type.
   *
   * Selects this variant. Must be "OrganizationScope".
   */
  type: "OrganizationScope";
}

/**
 * Input type for Built-in authorization policy scoped to organization/tenant.
 */
export interface OrganizationSharedBuiltInAuthorizationPolicyInput extends InputOf<OrganizationSharedBuiltInAuthorizationPolicy> {
  /**
   * Authorization scheme type.
   *
   * Selects this variant. Must be "OrganizationScope".
   */
  type: "OrganizationScope";
}

/**
 * View type for Built-in authorization policy scoped to organization/tenant.
 */
export type OrganizationSharedBuiltInAuthorizationPolicyView =
  OrganizationSharedBuiltInAuthorizationPolicyInput;

export const organizationSharedBuiltInAuthorizationPolicyShape: FlatModelShape =
  createFlatModelShape({
    type: { armPath: ["type"], value: createStringLiteralShape() },
  });

export interface PatAuthTypeConnectionProperties {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "PAT".
   */
  authType: "PAT";
  /**
   * Category of the connection
   */
  category?: ConnectionCategory;
  createdByWorkspaceArmId?: string;
  credentials?: ConnectionPersonalAccessToken;
  /**
   * Provides the error message if the connection fails
   */
  error?: string;
  expiryTime?: Date;
  /**
   * Group based on connection category
   */
  group?: ConnectionGroup;
  isSharedToAll?: boolean;
  /**
   * Store user metadata for this connection
   */
  metadata?: Record<string, string>;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ManagedPeRequirement;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ManagedPeStatus;
  sharedUserList?: string[];
  /**
   * The connection URL to be used.
   */
  target?: string;
  useWorkspaceManagedIdentity?: boolean;
}

export interface PatAuthTypeConnectionPropertiesInput extends InputOf<PatAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "PAT".
   */
  authType: "PAT";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  credentials?: ConnectionPersonalAccessTokenInput | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export interface PatAuthTypeConnectionPropertiesView extends InputOf<PatAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "PAT".
   */
  authType: "PAT";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  readonly createdByWorkspaceArmId?: Expression<string> | undefined;
  credentials?: ConnectionPersonalAccessTokenView | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Read-only output: Group based on connection category
   */
  readonly group?: Expression<ConnectionGroup> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export const patAuthTypeConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  authType: { armPath: ["authType"], value: createStringLiteralShape() },
  category: { armPath: ["category"], value: createUnionShape() },
  createdByWorkspaceArmId: {
    armPath: ["createdByWorkspaceArmId"],
    value: createStringShape(),
    readOnly: true,
  },
  credentials: {
    armPath: ["credentials"],
    value: createDeferredShape(() => connectionPersonalAccessTokenShape),
  },
  error: { armPath: ["error"], value: createStringShape() },
  expiryTime: {
    armPath: ["expiryTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  group: { armPath: ["group"], value: createUnionShape(), readOnly: true },
  isSharedToAll: { armPath: ["isSharedToAll"], value: createBooleanShape() },
  metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
  peRequirement: { armPath: ["peRequirement"], value: createUnionShape() },
  peStatus: { armPath: ["peStatus"], value: createUnionShape() },
  sharedUserList: { armPath: ["sharedUserList"], value: createArrayShape(createStringShape()) },
  target: { armPath: ["target"], value: createStringShape() },
  useWorkspaceManagedIdentity: {
    armPath: ["useWorkspaceManagedIdentity"],
    value: createBooleanShape(),
  },
});

/**
 * The private endpoint resource.
 */
export interface PrivateEndpoint {
  /**
   * The resource identifier of the private endpoint
   */
  id?: string;
}

/**
 * Input type for The private endpoint resource.
 */
export interface PrivateEndpointInput extends InputOf<PrivateEndpoint> {}

/**
 * View type for The private endpoint resource.
 */
export interface PrivateEndpointView extends InputOf<PrivateEndpoint> {
  /**
   * Read-only output: The resource identifier of the private endpoint
   */
  readonly id?: Expression<string> | undefined;
}

export const privateEndpointShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
});

/**
 * Properties of the PrivateEndpointConnectProperties.
 */
export interface PrivateEndpointConnectionProperties {
  /**
   * The private link resource group ids.
   */
  groupIds?: string[];
  /**
   * The resource of private end point.
   */
  privateEndpoint?: PrivateEndpoint;
  /**
   * A collection of information about the state of the connection between service consumer and provider.
   */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /**
   * The provisioning state of the private endpoint connection resource.
   */
  provisioningState?: PrivateEndpointConnectionProvisioningState;
}

/**
 * Input type for Properties of the PrivateEndpointConnectProperties.
 */
export interface PrivateEndpointConnectionPropertiesInput extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * The private link resource group ids.
   */
  groupIds?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The resource of private end point.
   */
  privateEndpoint?: PrivateEndpointInput | undefined;
  /**
   * A collection of information about the state of the connection between service consumer and provider.
   */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionStateInput;
}

/**
 * View type for Properties of the PrivateEndpointConnectProperties.
 */
export interface PrivateEndpointConnectionPropertiesView extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * The private link resource group ids.
   */
  groupIds?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The resource of private end point.
   */
  privateEndpoint?: PrivateEndpointView | undefined;
  /**
   * A collection of information about the state of the connection between service consumer and provider.
   */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionStateView;
  /**
   * Read-only output: The provisioning state of the private endpoint connection resource.
   */
  readonly provisioningState?: Expression<PrivateEndpointConnectionProvisioningState> | undefined;
}

export const privateEndpointConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  groupIds: { armPath: ["groupIds"], value: createArrayShape(createStringShape()) },
  privateEndpoint: {
    armPath: ["privateEndpoint"],
    value: createDeferredShape(() => privateEndpointShape),
  },
  privateLinkServiceConnectionState: {
    armPath: ["privateLinkServiceConnectionState"],
    value: createDeferredShape(() => privateLinkServiceConnectionStateShape),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

/**
 * Private Endpoint outbound rule for the managed network of a cognitive services account.
 */
export interface PrivateEndpointOutboundRule {
  /**
   * Category of a managed network Outbound Rule of a cognitive services account.
   */
  category?: RuleCategory;
  /**
   * Private Endpoint destination.
   */
  destination?: PrivateEndpointOutboundRuleDestination;
  /**
   * Error information about an outbound rule of a cognitive services account if RuleStatus is failed.
   */
  errorInformation?: string;
  /**
   * List of FQDNs associated with the private endpoint outbound rule.
   */
  fqdns?: string[];
  parentRuleNames?: string[];
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   */
  status?: RuleStatus;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   *
   * Selects this variant. Must be "PrivateEndpoint".
   */
  type: "PrivateEndpoint";
}

/**
 * Input type for Private Endpoint outbound rule for the managed network of a cognitive services account.
 */
export interface PrivateEndpointOutboundRuleInput extends InputOf<PrivateEndpointOutboundRule> {
  /**
   * Category of a managed network Outbound Rule of a cognitive services account.
   */
  category?: ExpressionOrValue<RuleCategory> | undefined;
  /**
   * Private Endpoint destination.
   */
  destination?: PrivateEndpointOutboundRuleDestinationInput | undefined;
  /**
   * List of FQDNs associated with the private endpoint outbound rule.
   */
  fqdns?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   */
  status?: ExpressionOrValue<RuleStatus> | undefined;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   *
   * Selects this variant. Must be "PrivateEndpoint".
   */
  type: "PrivateEndpoint";
}

/**
 * View type for Private Endpoint outbound rule for the managed network of a cognitive services account.
 */
export interface PrivateEndpointOutboundRuleView extends InputOf<PrivateEndpointOutboundRule> {
  /**
   * Category of a managed network Outbound Rule of a cognitive services account.
   */
  category?: ExpressionOrValue<RuleCategory> | undefined;
  /**
   * Private Endpoint destination.
   */
  destination?: PrivateEndpointOutboundRuleDestinationView | undefined;
  /**
   * Read-only output: Error information about an outbound rule of a cognitive services account if RuleStatus is failed.
   */
  readonly errorInformation?: Expression<string> | undefined;
  /**
   * List of FQDNs associated with the private endpoint outbound rule.
   */
  fqdns?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  readonly parentRuleNames?: Expression<string[]> | undefined;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   */
  status?: ExpressionOrValue<RuleStatus> | undefined;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   *
   * Selects this variant. Must be "PrivateEndpoint".
   */
  type: "PrivateEndpoint";
}

export const privateEndpointOutboundRuleShape: FlatModelShape = createFlatModelShape({
  category: { armPath: ["category"], value: createUnionShape() },
  destination: {
    armPath: ["destination"],
    value: createDeferredShape(() => privateEndpointOutboundRuleDestinationShape),
  },
  errorInformation: { armPath: ["errorInformation"], value: createStringShape(), readOnly: true },
  fqdns: { armPath: ["fqdns"], value: createArrayShape(createStringShape()) },
  parentRuleNames: {
    armPath: ["parentRuleNames"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  status: { armPath: ["status"], value: createUnionShape() },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Private Endpoint destination for an outbound rule.
 */
export interface PrivateEndpointOutboundRuleDestination {
  /**
   * The Azure resource ID of the target private endpoint service.
   */
  serviceResourceId?: string;
  /**
   * The subresource of the target service to connect to.
   */
  subresourceTarget?: string;
}

/**
 * Input type for Private Endpoint destination for an outbound rule.
 */
export interface PrivateEndpointOutboundRuleDestinationInput extends InputOf<PrivateEndpointOutboundRuleDestination> {
  /**
   * The Azure resource ID of the target private endpoint service.
   */
  serviceResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * The subresource of the target service to connect to.
   */
  subresourceTarget?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Private Endpoint destination for an outbound rule.
 */
export type PrivateEndpointOutboundRuleDestinationView =
  PrivateEndpointOutboundRuleDestinationInput;

export const privateEndpointOutboundRuleDestinationShape: FlatModelShape = createFlatModelShape({
  serviceResourceId: { armPath: ["serviceResourceId"], value: createStringShape() },
  subresourceTarget: { armPath: ["subresourceTarget"], value: createStringShape() },
});

/**
 * A collection of information about the state of the connection between service consumer and provider.
 */
export interface PrivateLinkServiceConnectionState {
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionsRequired?: string;
  /**
   * The reason for approval/rejection of the connection.
   */
  description?: string;
  /**
   * Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service.
   */
  status?: PrivateEndpointServiceConnectionStatus;
}

/**
 * Input type for A collection of information about the state of the connection between service consumer and provider.
 */
export interface PrivateLinkServiceConnectionStateInput extends InputOf<PrivateLinkServiceConnectionState> {
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionsRequired?: ExpressionOrValue<string> | undefined;
  /**
   * The reason for approval/rejection of the connection.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service.
   */
  status?: ExpressionOrValue<PrivateEndpointServiceConnectionStatus> | undefined;
}

/**
 * View type for A collection of information about the state of the connection between service consumer and provider.
 */
export type PrivateLinkServiceConnectionStateView = PrivateLinkServiceConnectionStateInput;

export const privateLinkServiceConnectionStateShape: FlatModelShape = createFlatModelShape({
  actionsRequired: { armPath: ["actionsRequired"], value: createStringShape() },
  description: { armPath: ["description"], value: createStringShape() },
  status: { armPath: ["status"], value: createUnionShape() },
});

export interface ProjectCapabilityHostProperties {
  /**
   * List of AI services connections.
   */
  aiServicesConnections?: string[] | null;
  /**
   * Provisioning state for the CapabilityHost.
   */
  provisioningState?: CapabilityHostProvisioningState;
  /**
   * List of connection names from those available in the account or project to be used as a storage resource.
   */
  storageConnections?: string[] | null;
  /**
   * List of connection names from those available in the account or project to be used for Thread storage.
   */
  threadStorageConnections?: string[] | null;
  /**
   * List of connection names from those available in the account or project to be used for vector database (e.g. CosmosDB).
   */
  vectorStoreConnections?: string[] | null;
}

export interface ProjectCapabilityHostPropertiesInput extends InputOf<ProjectCapabilityHostProperties> {
  /**
   * List of AI services connections.
   */
  aiServicesConnections?: ExpressionOrValue<string[] | null> | undefined;
  /**
   * List of connection names from those available in the account or project to be used as a storage resource.
   */
  storageConnections?: ExpressionOrValue<string[] | null> | undefined;
  /**
   * List of connection names from those available in the account or project to be used for Thread storage.
   */
  threadStorageConnections?: ExpressionOrValue<string[] | null> | undefined;
  /**
   * List of connection names from those available in the account or project to be used for vector database (e.g. CosmosDB).
   */
  vectorStoreConnections?: ExpressionOrValue<string[] | null> | undefined;
}

export interface ProjectCapabilityHostPropertiesView extends InputOf<ProjectCapabilityHostProperties> {
  /**
   * List of AI services connections.
   */
  aiServicesConnections?: ExpressionOrValue<string[] | null> | undefined;
  /**
   * Read-only output: Provisioning state for the CapabilityHost.
   */
  readonly provisioningState?: Expression<CapabilityHostProvisioningState> | undefined;
  /**
   * List of connection names from those available in the account or project to be used as a storage resource.
   */
  storageConnections?: ExpressionOrValue<string[] | null> | undefined;
  /**
   * List of connection names from those available in the account or project to be used for Thread storage.
   */
  threadStorageConnections?: ExpressionOrValue<string[] | null> | undefined;
  /**
   * List of connection names from those available in the account or project to be used for vector database (e.g. CosmosDB).
   */
  vectorStoreConnections?: ExpressionOrValue<string[] | null> | undefined;
}

export const projectCapabilityHostPropertiesShape: FlatModelShape = createFlatModelShape({
  aiServicesConnections: {
    armPath: ["aiServicesConnections"],
    value: createArrayShape(createStringShape()),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  storageConnections: {
    armPath: ["storageConnections"],
    value: createArrayShape(createStringShape()),
  },
  threadStorageConnections: {
    armPath: ["threadStorageConnections"],
    value: createArrayShape(createStringShape()),
  },
  vectorStoreConnections: {
    armPath: ["vectorStoreConnections"],
    value: createArrayShape(createStringShape()),
  },
});

/**
 * Properties of Cognitive Services Project'.
 */
export interface ProjectProperties {
  /**
   * The description of the Cognitive Services Project.
   */
  description?: string;
  /**
   * The display name of the Cognitive Services Project.
   */
  displayName?: string;
  /**
   * The list of endpoint for this Cognitive Services Project.
   */
  endpoints?: Record<string, string>;
  /**
   * Indicates whether the project is the default project for the account.
   */
  isDefault?: boolean;
  /**
   * Gets the status of the cognitive services project at the time the operation was called.
   */
  provisioningState?: ProvisioningState;
}

/**
 * Input type for Properties of Cognitive Services Project'.
 */
export interface ProjectPropertiesInput extends InputOf<ProjectProperties> {
  /**
   * The description of the Cognitive Services Project.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * The display name of the Cognitive Services Project.
   */
  displayName?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Properties of Cognitive Services Project'.
 */
export interface ProjectPropertiesView extends InputOf<ProjectProperties> {
  /**
   * The description of the Cognitive Services Project.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * The display name of the Cognitive Services Project.
   */
  displayName?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The list of endpoint for this Cognitive Services Project.
   */
  readonly endpoints?: Expression<Record<string, string>> | undefined;
  /**
   * Read-only output: Indicates whether the project is the default project for the account.
   */
  readonly isDefault?: Expression<boolean> | undefined;
  /**
   * Read-only output: Gets the status of the cognitive services project at the time the operation was called.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
}

export const projectPropertiesShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape() },
  displayName: { armPath: ["displayName"], value: createStringShape() },
  endpoints: {
    armPath: ["endpoints"],
    value: createRecordShape(createStringShape()),
    readOnly: true,
  },
  isDefault: { armPath: ["isDefault"], value: createBooleanShape(), readOnly: true },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

export interface ProvisioningIssue {
  /**
   * Name of the NSP provisioning issue
   */
  name?: string;
  /**
   * Properties of Provisioning Issue
   */
  properties?: ProvisioningIssueProperties;
}

export interface ProvisioningIssueInput extends InputOf<ProvisioningIssue> {}

export interface ProvisioningIssueView extends InputOf<ProvisioningIssue> {
  /**
   * Read-only output: Name of the NSP provisioning issue
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: Properties of Provisioning Issue
   */
  readonly properties?: Expression<ProvisioningIssueProperties> | undefined;
}

export const provisioningIssueShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => provisioningIssuePropertiesShape),
    readOnly: true,
  },
});

/**
 * Properties of Provisioning Issue
 */
export interface ProvisioningIssueProperties {
  /**
   * Description of the issue
   */
  description?: string;
  /**
   * Type of Issue
   */
  issueType?: string;
  /**
   * Severity of the issue
   */
  severity?: string;
  /**
   * Optional array, suggested access rules
   */
  suggestedAccessRules?: NetworkSecurityPerimeterAccessRule[];
  /**
   * IDs of resources that can be associated to the same perimeter to remediate the issue.
   */
  suggestedResourceIds?: string[];
}

/**
 * Input type for Properties of Provisioning Issue
 */
export interface ProvisioningIssuePropertiesInput extends InputOf<ProvisioningIssueProperties> {}

/**
 * View type for Properties of Provisioning Issue
 */
export interface ProvisioningIssuePropertiesView extends InputOf<ProvisioningIssueProperties> {
  /**
   * Read-only output: Description of the issue
   */
  readonly description?: Expression<string> | undefined;
  /**
   * Read-only output: Type of Issue
   */
  readonly issueType?: Expression<string> | undefined;
  /**
   * Read-only output: Severity of the issue
   */
  readonly severity?: Expression<string> | undefined;
  /**
   * Read-only output: Optional array, suggested access rules
   */
  readonly suggestedAccessRules?: Expression<NetworkSecurityPerimeterAccessRule[]> | undefined;
  /**
   * Read-only output: IDs of resources that can be associated to the same perimeter to remediate the issue.
   */
  readonly suggestedResourceIds?: Expression<string[]> | undefined;
}

export const provisioningIssuePropertiesShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape(), readOnly: true },
  issueType: { armPath: ["issueType"], value: createStringShape(), readOnly: true },
  severity: { armPath: ["severity"], value: createStringShape(), readOnly: true },
  suggestedAccessRules: {
    armPath: ["suggestedAccessRules"],
    value: createArrayShape(createDeferredShape(() => networkSecurityPerimeterAccessRuleShape)),
    readOnly: true,
  },
  suggestedResourceIds: {
    armPath: ["suggestedResourceIds"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
});

export interface QuotaLimit {
  count?: number;
  renewalPeriod?: number;
  rules?: ThrottlingRule[];
}

export interface QuotaLimitInput extends InputOf<QuotaLimit> {}

export interface QuotaLimitView extends InputOf<QuotaLimit> {
  readonly count?: Expression<number> | undefined;
  readonly renewalPeriod?: Expression<number> | undefined;
  readonly rules?: Expression<ThrottlingRule[]> | undefined;
}

export const quotaLimitShape: FlatModelShape = createFlatModelShape({
  count: { armPath: ["count"], value: createNumberShape(), readOnly: true },
  renewalPeriod: { armPath: ["renewalPeriod"], value: createNumberShape(), readOnly: true },
  rules: {
    armPath: ["rules"],
    value: createArrayShape(createDeferredShape(() => throttlingRuleShape)),
    readOnly: true,
  },
});

/**
 * Properties of Quota Tier resource'.
 */
export interface QuotaTierProperties {
  /**
   * The date on which the current tier was assigned to the subscription (UTC).
   */
  assignmentDate?: Date;
  /**
   * Name of the current quota tier for the subscription.
   */
  currentTierName?: string;
  /**
   * Information about the quota tier upgrade eligibility for the subscription.
   */
  tierUpgradeEligibilityInfo?: QuotaTierUpgradeEligibilityInfo | null;
  /**
   * Gets the tier upgrade policy for the subscription.
   */
  tierUpgradePolicy?: TierUpgradePolicy;
}

/**
 * Input type for Properties of Quota Tier resource'.
 */
export interface QuotaTierPropertiesInput extends InputOf<QuotaTierProperties> {
  /**
   * Gets the tier upgrade policy for the subscription.
   */
  tierUpgradePolicy?: ExpressionOrValue<TierUpgradePolicy> | undefined;
}

/**
 * View type for Properties of Quota Tier resource'.
 */
export interface QuotaTierPropertiesView extends InputOf<QuotaTierProperties> {
  /**
   * Read-only output: The date on which the current tier was assigned to the subscription (UTC).
   */
  readonly assignmentDate?: Expression<Date> | undefined;
  /**
   * Read-only output: Name of the current quota tier for the subscription.
   */
  readonly currentTierName?: Expression<string> | undefined;
  /**
   * Read-only output: Information about the quota tier upgrade eligibility for the subscription.
   */
  readonly tierUpgradeEligibilityInfo?:
    Expression<QuotaTierUpgradeEligibilityInfo | null> | undefined;
  /**
   * Gets the tier upgrade policy for the subscription.
   */
  tierUpgradePolicy?: ExpressionOrValue<TierUpgradePolicy> | undefined;
}

export const quotaTierPropertiesShape: FlatModelShape = createFlatModelShape({
  assignmentDate: {
    armPath: ["assignmentDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  currentTierName: { armPath: ["currentTierName"], value: createStringShape(), readOnly: true },
  tierUpgradeEligibilityInfo: {
    armPath: ["tierUpgradeEligibilityInfo"],
    value: createDeferredShape(() => quotaTierUpgradeEligibilityInfoShape),
    readOnly: true,
  },
  tierUpgradePolicy: { armPath: ["tierUpgradePolicy"], value: createUnionShape() },
});

/**
 * Information about the quota tier upgrade eligibility for the subscription.
 */
export interface QuotaTierUpgradeEligibilityInfo {
  /**
   * Name of the next quota tier for the subscription.
   */
  nextTierName?: string | null;
  /**
   * The date after which the current tier will be upgraded to the next tier if the TierUpgradePolicy is "OnceUpgradeIsAvailable" (UTC).
   */
  upgradeApplicableDate?: Date | null;
  /**
   * Specifies whether an upgrade to the next quota tier is available.
   */
  upgradeAvailabilityStatus?: UpgradeAvailabilityStatus;
  /**
   * Reason in case the subscription is not eligible for upgrade to the next tier.
   */
  upgradeUnavailabilityReason?: string | null;
}

/**
 * Input type for Information about the quota tier upgrade eligibility for the subscription.
 */
export interface QuotaTierUpgradeEligibilityInfoInput extends InputOf<QuotaTierUpgradeEligibilityInfo> {}

/**
 * View type for Information about the quota tier upgrade eligibility for the subscription.
 */
export interface QuotaTierUpgradeEligibilityInfoView extends InputOf<QuotaTierUpgradeEligibilityInfo> {
  /**
   * Read-only output: Name of the next quota tier for the subscription.
   */
  readonly nextTierName?: Expression<string | null> | undefined;
  /**
   * Read-only output: The date after which the current tier will be upgraded to the next tier if the TierUpgradePolicy is "OnceUpgradeIsAvailable" (UTC).
   */
  readonly upgradeApplicableDate?: Expression<Date | null> | undefined;
  /**
   * Read-only output: Specifies whether an upgrade to the next quota tier is available.
   */
  readonly upgradeAvailabilityStatus?: Expression<UpgradeAvailabilityStatus> | undefined;
  /**
   * Read-only output: Reason in case the subscription is not eligible for upgrade to the next tier.
   */
  readonly upgradeUnavailabilityReason?: Expression<string | null> | undefined;
}

export const quotaTierUpgradeEligibilityInfoShape: FlatModelShape = createFlatModelShape({
  nextTierName: { armPath: ["nextTierName"], value: createStringShape(), readOnly: true },
  upgradeApplicableDate: {
    armPath: ["upgradeApplicableDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  upgradeAvailabilityStatus: {
    armPath: ["upgradeAvailabilityStatus"],
    value: createUnionShape(),
    readOnly: true,
  },
  upgradeUnavailabilityReason: {
    armPath: ["upgradeUnavailabilityReason"],
    value: createStringShape(),
    readOnly: true,
  },
});

/**
 * RAI Custom Blocklist Item properties.
 */
export interface RaiBlocklistItemProperties {
  /**
   * If the pattern is a regex pattern.
   */
  isRegex?: boolean;
  /**
   * Pattern to match against.
   */
  pattern?: string;
}

/**
 * Input type for RAI Custom Blocklist Item properties.
 */
export interface RaiBlocklistItemPropertiesInput extends InputOf<RaiBlocklistItemProperties> {
  /**
   * If the pattern is a regex pattern.
   */
  isRegex?: ExpressionOrValue<boolean> | undefined;
  /**
   * Pattern to match against.
   */
  pattern?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for RAI Custom Blocklist Item properties.
 */
export type RaiBlocklistItemPropertiesView = RaiBlocklistItemPropertiesInput;

export const raiBlocklistItemPropertiesShape: FlatModelShape = createFlatModelShape({
  isRegex: { armPath: ["isRegex"], value: createBooleanShape() },
  pattern: { armPath: ["pattern"], value: createStringShape() },
});

/**
 * RAI Custom Blocklist properties.
 */
export interface RaiBlocklistProperties {
  /**
   * Description of the block list.
   */
  description?: string;
}

/**
 * Input type for RAI Custom Blocklist properties.
 */
export interface RaiBlocklistPropertiesInput extends InputOf<RaiBlocklistProperties> {
  /**
   * Description of the block list.
   */
  description?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for RAI Custom Blocklist properties.
 */
export type RaiBlocklistPropertiesView = RaiBlocklistPropertiesInput;

export const raiBlocklistPropertiesShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape() },
});

/**
 * Azure OpenAI Content Filter Properties.
 */
export interface RaiContentFilterProperties {
  /**
   * If the Content Filter has multi severity levels(Low, Medium, or High).
   */
  isMultiLevelFilter?: boolean;
  /**
   * Name of Content Filter.
   */
  name?: string;
  /**
   * Content source to apply the Content Filters.
   */
  source?: RaiPolicyContentSource;
}

/**
 * Input type for Azure OpenAI Content Filter Properties.
 */
export interface RaiContentFilterPropertiesInput extends InputOf<RaiContentFilterProperties> {}

/**
 * View type for Azure OpenAI Content Filter Properties.
 */
export interface RaiContentFilterPropertiesView extends InputOf<RaiContentFilterProperties> {
  /**
   * Read-only output: If the Content Filter has multi severity levels(Low, Medium, or High).
   */
  readonly isMultiLevelFilter?: Expression<boolean> | undefined;
  /**
   * Read-only output: Name of Content Filter.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: Content source to apply the Content Filters.
   */
  readonly source?: Expression<RaiPolicyContentSource> | undefined;
}

export const raiContentFilterPropertiesShape: FlatModelShape = createFlatModelShape({
  isMultiLevelFilter: {
    armPath: ["isMultiLevelFilter"],
    value: createBooleanShape(),
    readOnly: true,
  },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  source: { armPath: ["source"], value: createUnionShape(), readOnly: true },
});

/**
 * RAI External SafetyProvider schema properties.
 */
export interface RaiExternalSafetyProviderSchemaProperties {
  /**
   * Creation time of the safety provider.
   */
  createdAt?: Date;
  /**
   * The Key Vault URI that contains the api key for safety provider urls.
   */
  keyVaultUri?: string;
  /**
   * Last modified time of the safety provider.
   */
  lastModifiedAt?: Date;
  /**
   * The managed identity to access the Key Vault.
   */
  managedIdentity?: string;
  /**
   * Safety provider mode sync/async.
   */
  mode?: string;
  /**
   * The unique identifier of the safety provider.
   */
  providerId?: string;
  /**
   * Name of the safety provider.
   */
  providerName?: string;
  /**
   * The name of the secret in Key Vault that contains the api key to access the webhook.
   */
  secretName?: string;
  /**
   * Webhook URL for the safety provider.
   */
  url?: string;
}

/**
 * Input type for RAI External SafetyProvider schema properties.
 */
export interface RaiExternalSafetyProviderSchemaPropertiesInput extends InputOf<RaiExternalSafetyProviderSchemaProperties> {
  /**
   * The Key Vault URI that contains the api key for safety provider urls.
   */
  keyVaultUri?: ExpressionOrValue<string> | undefined;
  /**
   * The managed identity to access the Key Vault.
   */
  managedIdentity?: ExpressionOrValue<string> | undefined;
  /**
   * Safety provider mode sync/async.
   */
  mode?: ExpressionOrValue<string> | undefined;
  /**
   * The unique identifier of the safety provider.
   */
  providerId?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the safety provider.
   */
  providerName?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the secret in Key Vault that contains the api key to access the webhook.
   */
  secretName?: ExpressionOrValue<string> | undefined;
  /**
   * Webhook URL for the safety provider.
   */
  url?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for RAI External SafetyProvider schema properties.
 */
export interface RaiExternalSafetyProviderSchemaPropertiesView extends InputOf<RaiExternalSafetyProviderSchemaProperties> {
  /**
   * Read-only output: Creation time of the safety provider.
   */
  readonly createdAt?: Expression<Date> | undefined;
  /**
   * The Key Vault URI that contains the api key for safety provider urls.
   */
  keyVaultUri?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Last modified time of the safety provider.
   */
  readonly lastModifiedAt?: Expression<Date> | undefined;
  /**
   * The managed identity to access the Key Vault.
   */
  managedIdentity?: ExpressionOrValue<string> | undefined;
  /**
   * Safety provider mode sync/async.
   */
  mode?: ExpressionOrValue<string> | undefined;
  /**
   * The unique identifier of the safety provider.
   */
  providerId?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the safety provider.
   */
  providerName?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the secret in Key Vault that contains the api key to access the webhook.
   */
  secretName?: ExpressionOrValue<string> | undefined;
  /**
   * Webhook URL for the safety provider.
   */
  url?: ExpressionOrValue<string> | undefined;
}

export const raiExternalSafetyProviderSchemaPropertiesShape: FlatModelShape = createFlatModelShape({
  createdAt: {
    armPath: ["createdAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  keyVaultUri: { armPath: ["keyVaultUri"], value: createStringShape() },
  lastModifiedAt: {
    armPath: ["lastModifiedAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  managedIdentity: { armPath: ["managedIdentity"], value: createStringShape() },
  mode: { armPath: ["mode"], value: createStringShape() },
  providerId: { armPath: ["providerId"], value: createStringShape() },
  providerName: { armPath: ["providerName"], value: createStringShape() },
  secretName: { armPath: ["secretName"], value: createStringShape() },
  url: { armPath: ["url"], value: createStringShape() },
});

/**
 * Cognitive Services Rai Monitor Config.
 */
export interface RaiMonitorConfig {
  /**
   * The storage resource Id.
   */
  adxStorageResourceId?: string;
  /**
   * The identity client Id to access the storage.
   */
  identityClientId?: string;
}

/**
 * Input type for Cognitive Services Rai Monitor Config.
 */
export interface RaiMonitorConfigInput extends InputOf<RaiMonitorConfig> {
  /**
   * The storage resource Id.
   */
  adxStorageResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * The identity client Id to access the storage.
   */
  identityClientId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Cognitive Services Rai Monitor Config.
 */
export type RaiMonitorConfigView = RaiMonitorConfigInput;

export const raiMonitorConfigShape: FlatModelShape = createFlatModelShape({
  adxStorageResourceId: { armPath: ["adxStorageResourceId"], value: createStringShape() },
  identityClientId: { armPath: ["identityClientId"], value: createStringShape() },
});

/**
 * Azure OpenAI Content Filter.
 */
export interface RaiPolicyContentFilter {
  /**
   * The action types to apply to the content filters
   */
  action?: RaiActionType;
  /**
   * If blocking would occur.
   */
  blocking?: boolean;
  /**
   * If the ContentFilter is enabled.
   */
  enabled?: boolean;
  /**
   * Name of ContentFilter.
   */
  name?: string;
  /**
   * Level at which content is filtered.
   */
  severityThreshold?: ContentLevel;
  /**
   * Content source to apply the Content Filters.
   */
  source?: RaiPolicyContentSource;
}

/**
 * Input type for Azure OpenAI Content Filter.
 */
export interface RaiPolicyContentFilterInput extends InputOf<RaiPolicyContentFilter> {
  /**
   * The action types to apply to the content filters
   */
  action?: ExpressionOrValue<RaiActionType> | undefined;
  /**
   * If blocking would occur.
   */
  blocking?: ExpressionOrValue<boolean> | undefined;
  /**
   * If the ContentFilter is enabled.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Name of ContentFilter.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Level at which content is filtered.
   */
  severityThreshold?: ExpressionOrValue<ContentLevel> | undefined;
  /**
   * Content source to apply the Content Filters.
   */
  source?: ExpressionOrValue<RaiPolicyContentSource> | undefined;
}

/**
 * View type for Azure OpenAI Content Filter.
 */
export type RaiPolicyContentFilterView = RaiPolicyContentFilterInput;

export const raiPolicyContentFilterShape: FlatModelShape = createFlatModelShape({
  action: { armPath: ["action"], value: createUnionShape() },
  blocking: { armPath: ["blocking"], value: createBooleanShape() },
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  name: { armPath: ["name"], value: createStringShape() },
  severityThreshold: { armPath: ["severityThreshold"], value: createUnionShape() },
  source: { armPath: ["source"], value: createUnionShape() },
});

/**
 * Azure OpenAI Content Filters properties.
 */
export interface RaiPolicyProperties {
  /**
   * Name of Rai policy.
   */
  basePolicyName?: string;
  /**
   * The list of Content Filters.
   */
  contentFilters?: RaiPolicyContentFilter[];
  /**
   * The list of custom Blocklist.
   */
  customBlocklists?: CustomBlocklistConfig[];
  /**
   * Rai policy mode. The enum value mapping is as below: Default = 0, Deferred=1, Blocking=2, Asynchronous_filter =3. Please use 'Asynchronous_filter' after 2025-06-01. It is the same as 'Deferred' in previous version.
   */
  mode?: RaiPolicyMode;
  /**
   * The list of Safety Providers.
   */
  safetyProviders?: SafetyProviderConfig[];
  /**
   * Content Filters policy type.
   */
  type?: RaiPolicyType;
}

/**
 * Input type for Azure OpenAI Content Filters properties.
 */
export interface RaiPolicyPropertiesInput extends InputOf<RaiPolicyProperties> {
  /**
   * Name of Rai policy.
   */
  basePolicyName?: ExpressionOrValue<string> | undefined;
  /**
   * The list of Content Filters.
   */
  contentFilters?: InputArray<RaiPolicyContentFilterInput, RaiPolicyContentFilter[]> | undefined;
  /**
   * The list of custom Blocklist.
   */
  customBlocklists?: InputArray<CustomBlocklistConfigInput, CustomBlocklistConfig[]> | undefined;
  /**
   * Rai policy mode. The enum value mapping is as below: Default = 0, Deferred=1, Blocking=2, Asynchronous_filter =3. Please use 'Asynchronous_filter' after 2025-06-01. It is the same as 'Deferred' in previous version.
   */
  mode?: ExpressionOrValue<RaiPolicyMode> | undefined;
  /**
   * The list of Safety Providers.
   */
  safetyProviders?: InputArray<SafetyProviderConfigInput, SafetyProviderConfig[]> | undefined;
}

/**
 * View type for Azure OpenAI Content Filters properties.
 */
export interface RaiPolicyPropertiesView extends InputOf<RaiPolicyProperties> {
  /**
   * Name of Rai policy.
   */
  basePolicyName?: ExpressionOrValue<string> | undefined;
  /**
   * The list of Content Filters.
   */
  contentFilters?: InputArray<RaiPolicyContentFilterView, RaiPolicyContentFilter[]> | undefined;
  /**
   * The list of custom Blocklist.
   */
  customBlocklists?: InputArray<CustomBlocklistConfigView, CustomBlocklistConfig[]> | undefined;
  /**
   * Rai policy mode. The enum value mapping is as below: Default = 0, Deferred=1, Blocking=2, Asynchronous_filter =3. Please use 'Asynchronous_filter' after 2025-06-01. It is the same as 'Deferred' in previous version.
   */
  mode?: ExpressionOrValue<RaiPolicyMode> | undefined;
  /**
   * The list of Safety Providers.
   */
  safetyProviders?: InputArray<SafetyProviderConfigView, SafetyProviderConfig[]> | undefined;
  /**
   * Read-only output: Content Filters policy type.
   */
  readonly type?: Expression<RaiPolicyType> | undefined;
}

export const raiPolicyPropertiesShape: FlatModelShape = createFlatModelShape({
  basePolicyName: { armPath: ["basePolicyName"], value: createStringShape() },
  contentFilters: {
    armPath: ["contentFilters"],
    value: createArrayShape(createDeferredShape(() => raiPolicyContentFilterShape)),
  },
  customBlocklists: {
    armPath: ["customBlocklists"],
    value: createArrayShape(createDeferredShape(() => customBlocklistConfigShape)),
  },
  mode: { armPath: ["mode"], value: createUnionShape() },
  safetyProviders: {
    armPath: ["safetyProviders"],
    value: createArrayShape(createDeferredShape(() => safetyProviderConfigShape)),
  },
  type: { armPath: ["type"], value: createUnionShape(), readOnly: true },
});

/**
 * RAI Tool Label properties.
 */
export interface RaiToolLabelProperties {
  /**
   * Account-level tool label definition.
   */
  accountScope?: RaiToolLabelPropertiesAccountScope;
  /**
   * List of project-level tool label definitions.
   */
  projectScopes?: RaiToolLabelPropertiesProjectScopesItem[];
  /**
   * The unique tool connection name, e.g., 'Web_Search'.
   */
  toolConnectionName: string;
}

/**
 * Input type for RAI Tool Label properties.
 */
export interface RaiToolLabelPropertiesInput extends InputOf<RaiToolLabelProperties> {
  /**
   * Account-level tool label definition.
   */
  accountScope?: RaiToolLabelPropertiesAccountScopeInput | undefined;
  /**
   * List of project-level tool label definitions.
   */
  projectScopes?:
    | InputArray<
        RaiToolLabelPropertiesProjectScopesItemInput,
        RaiToolLabelPropertiesProjectScopesItem[]
      >
    | undefined;
  /**
   * The unique tool connection name, e.g., 'Web_Search'.
   */
  toolConnectionName: ExpressionOrValue<string>;
}

/**
 * View type for RAI Tool Label properties.
 */
export type RaiToolLabelPropertiesView = RaiToolLabelPropertiesInput;

export const raiToolLabelPropertiesShape: FlatModelShape = createFlatModelShape({
  accountScope: {
    armPath: ["accountScope"],
    value: createDeferredShape(() => raiToolLabelPropertiesAccountScopeShape),
  },
  projectScopes: {
    armPath: ["projectScopes"],
    value: createArrayShape(
      createDeferredShape(() => raiToolLabelPropertiesProjectScopesItemShape),
    ),
  },
  toolConnectionName: { armPath: ["toolConnectionName"], value: createStringShape() },
});

/**
 * Account-level tool label definition.
 */
export interface RaiToolLabelPropertiesAccountScope {
  /**
   * Dictionary of label key-value pairs for the account scope.
   */
  labelValues?: Record<string, string>;
}

/**
 * Input type for Account-level tool label definition.
 */
export interface RaiToolLabelPropertiesAccountScopeInput extends InputOf<RaiToolLabelPropertiesAccountScope> {
  /**
   * Dictionary of label key-value pairs for the account scope.
   */
  labelValues?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * View type for Account-level tool label definition.
 */
export type RaiToolLabelPropertiesAccountScopeView = RaiToolLabelPropertiesAccountScopeInput;

export const raiToolLabelPropertiesAccountScopeShape: FlatModelShape = createFlatModelShape({
  labelValues: { armPath: ["labelValues"], value: createRecordShape(createStringShape()) },
});

export interface RaiToolLabelPropertiesProjectScopesItem {
  /**
   * Dictionary of label key-value pairs for the project scope.
   */
  labelValues: Record<string, string>;
  /**
   * Project name to which this scope applies.
   */
  project: string;
}

export interface RaiToolLabelPropertiesProjectScopesItemInput extends InputOf<RaiToolLabelPropertiesProjectScopesItem> {
  /**
   * Dictionary of label key-value pairs for the project scope.
   */
  labelValues: InputRecord<ExpressionOrValue<string>, Record<string, string>>;
  /**
   * Project name to which this scope applies.
   */
  project: ExpressionOrValue<string>;
}

export type RaiToolLabelPropertiesProjectScopesItemView =
  RaiToolLabelPropertiesProjectScopesItemInput;

export const raiToolLabelPropertiesProjectScopesItemShape: FlatModelShape = createFlatModelShape({
  labelValues: { armPath: ["labelValues"], value: createRecordShape(createStringShape()) },
  project: { armPath: ["project"], value: createStringShape() },
});

/**
 * RAI Custom Topic properties.
 */
export interface RaiTopicProperties {
  /**
   * Creation time of the custom topic.
   */
  createdAt?: Date;
  /**
   * Description of the custom topic.
   */
  description?: string;
  /**
   * Failed reason if the status is Failed.
   */
  failedReason?: string;
  /**
   * Last modified time of the custom topic.
   */
  lastModifiedAt?: Date;
  /**
   * Sample blob url for the custom topic.
   */
  sampleBlobUrl?: string;
  /**
   * Status of the custom topic.
   */
  status?: string;
  /**
   * The unique identifier of the custom topic.
   */
  topicId?: string;
  /**
   * The name of the custom topic.
   */
  topicName?: string;
}

/**
 * Input type for RAI Custom Topic properties.
 */
export interface RaiTopicPropertiesInput extends InputOf<RaiTopicProperties> {
  /**
   * Creation time of the custom topic.
   */
  createdAt?: ExpressionOrValue<Date> | undefined;
  /**
   * Description of the custom topic.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Failed reason if the status is Failed.
   */
  failedReason?: ExpressionOrValue<string> | undefined;
  /**
   * Last modified time of the custom topic.
   */
  lastModifiedAt?: ExpressionOrValue<Date> | undefined;
  /**
   * Sample blob url for the custom topic.
   */
  sampleBlobUrl?: ExpressionOrValue<string> | undefined;
  /**
   * Status of the custom topic.
   */
  status?: ExpressionOrValue<string> | undefined;
  /**
   * The unique identifier of the custom topic.
   */
  topicId?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the custom topic.
   */
  topicName?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for RAI Custom Topic properties.
 */
export type RaiTopicPropertiesView = RaiTopicPropertiesInput;

export const raiTopicPropertiesShape: FlatModelShape = createFlatModelShape({
  createdAt: {
    armPath: ["createdAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  description: { armPath: ["description"], value: createStringShape() },
  failedReason: { armPath: ["failedReason"], value: createStringShape() },
  lastModifiedAt: {
    armPath: ["lastModifiedAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  sampleBlobUrl: { armPath: ["sampleBlobUrl"], value: createStringShape() },
  status: { armPath: ["status"], value: createStringShape() },
  topicId: { armPath: ["topicId"], value: createStringShape() },
  topicName: { armPath: ["topicName"], value: createStringShape() },
});

/**
 * The call rate limit Cognitive Services account.
 */
export interface RegionSetting {
  /**
   * Maps the region to the regional custom subdomain.
   */
  customsubdomain?: string;
  /**
   * Name of the region.
   */
  name?: string;
  /**
   * A value for priority or weighted routing methods.
   */
  value?: number;
}

/**
 * Input type for The call rate limit Cognitive Services account.
 */
export interface RegionSettingInput extends InputOf<RegionSetting> {
  /**
   * Maps the region to the regional custom subdomain.
   */
  customsubdomain?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the region.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * A value for priority or weighted routing methods.
   */
  value?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for The call rate limit Cognitive Services account.
 */
export type RegionSettingView = RegionSettingInput;

export const regionSettingShape: FlatModelShape = createFlatModelShape({
  customsubdomain: { armPath: ["customsubdomain"], value: createStringShape() },
  name: { armPath: ["name"], value: createStringShape() },
  value: { armPath: ["value"], value: createNumberShape() },
});

export interface RequestMatchPattern {
  method?: string;
  path?: string;
}

export interface RequestMatchPatternInput extends InputOf<RequestMatchPattern> {}

export interface RequestMatchPatternView extends InputOf<RequestMatchPattern> {
  readonly method?: Expression<string> | undefined;
  readonly path?: Expression<string> | undefined;
}

export const requestMatchPatternShape: FlatModelShape = createFlatModelShape({
  method: { armPath: ["method"], value: createStringShape(), readOnly: true },
  path: { armPath: ["path"], value: createStringShape(), readOnly: true },
});

/**
 * Built-in role-based authorization policy.
 */
export interface RoleBasedBuiltInAuthorizationPolicy {
  /**
   * Authorization scheme type.
   *
   * Selects this variant. Must be "Default".
   */
  type: "Default";
}

/**
 * Input type for Built-in role-based authorization policy.
 */
export interface RoleBasedBuiltInAuthorizationPolicyInput extends InputOf<RoleBasedBuiltInAuthorizationPolicy> {
  /**
   * Authorization scheme type.
   *
   * Selects this variant. Must be "Default".
   */
  type: "Default";
}

/**
 * View type for Built-in role-based authorization policy.
 */
export type RoleBasedBuiltInAuthorizationPolicyView = RoleBasedBuiltInAuthorizationPolicyInput;

export const roleBasedBuiltInAuthorizationPolicyShape: FlatModelShape = createFlatModelShape({
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Gets or sets the source to which safety providers applies.
 */
export interface SafetyProviderConfig {
  /**
   * If blocking would occur.
   */
  blocking?: boolean;
  /**
   * Name of RAI Safety Provider.
   */
  safetyProviderName?: string;
  /**
   * Content source to apply the Content Filters.
   */
  source?: RaiPolicyContentSource;
}

/**
 * Input type for Gets or sets the source to which safety providers applies.
 */
export interface SafetyProviderConfigInput extends InputOf<SafetyProviderConfig> {
  /**
   * If blocking would occur.
   */
  blocking?: ExpressionOrValue<boolean> | undefined;
  /**
   * Name of RAI Safety Provider.
   */
  safetyProviderName?: ExpressionOrValue<string> | undefined;
  /**
   * Content source to apply the Content Filters.
   */
  source?: ExpressionOrValue<RaiPolicyContentSource> | undefined;
}

/**
 * View type for Gets or sets the source to which safety providers applies.
 */
export type SafetyProviderConfigView = SafetyProviderConfigInput;

export const safetyProviderConfigShape: FlatModelShape = createFlatModelShape({
  blocking: { armPath: ["blocking"], value: createBooleanShape() },
  safetyProviderName: { armPath: ["safetyProviderName"], value: createStringShape() },
  source: { armPath: ["source"], value: createUnionShape() },
});

export interface SasAuthTypeConnectionProperties {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "SAS".
   */
  authType: "SAS";
  /**
   * Category of the connection
   */
  category?: ConnectionCategory;
  createdByWorkspaceArmId?: string;
  credentials?: ConnectionSharedAccessSignature;
  /**
   * Provides the error message if the connection fails
   */
  error?: string;
  expiryTime?: Date;
  /**
   * Group based on connection category
   */
  group?: ConnectionGroup;
  isSharedToAll?: boolean;
  /**
   * Store user metadata for this connection
   */
  metadata?: Record<string, string>;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ManagedPeRequirement;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ManagedPeStatus;
  sharedUserList?: string[];
  /**
   * The connection URL to be used.
   */
  target?: string;
  useWorkspaceManagedIdentity?: boolean;
}

export interface SasAuthTypeConnectionPropertiesInput extends InputOf<SasAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "SAS".
   */
  authType: "SAS";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  credentials?: ConnectionSharedAccessSignatureInput | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export interface SasAuthTypeConnectionPropertiesView extends InputOf<SasAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "SAS".
   */
  authType: "SAS";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  readonly createdByWorkspaceArmId?: Expression<string> | undefined;
  credentials?: ConnectionSharedAccessSignatureView | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Read-only output: Group based on connection category
   */
  readonly group?: Expression<ConnectionGroup> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export const sasAuthTypeConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  authType: { armPath: ["authType"], value: createStringLiteralShape() },
  category: { armPath: ["category"], value: createUnionShape() },
  createdByWorkspaceArmId: {
    armPath: ["createdByWorkspaceArmId"],
    value: createStringShape(),
    readOnly: true,
  },
  credentials: {
    armPath: ["credentials"],
    value: createDeferredShape(() => connectionSharedAccessSignatureShape),
  },
  error: { armPath: ["error"], value: createStringShape() },
  expiryTime: {
    armPath: ["expiryTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  group: { armPath: ["group"], value: createUnionShape(), readOnly: true },
  isSharedToAll: { armPath: ["isSharedToAll"], value: createBooleanShape() },
  metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
  peRequirement: { armPath: ["peRequirement"], value: createUnionShape() },
  peStatus: { armPath: ["peStatus"], value: createUnionShape() },
  sharedUserList: { armPath: ["sharedUserList"], value: createArrayShape(createStringShape()) },
  target: { armPath: ["target"], value: createStringShape() },
  useWorkspaceManagedIdentity: {
    armPath: ["useWorkspaceManagedIdentity"],
    value: createBooleanShape(),
  },
});

export interface ServicePrincipalAuthTypeConnectionProperties {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "ServicePrincipal".
   */
  authType: "ServicePrincipal";
  /**
   * Category of the connection
   */
  category?: ConnectionCategory;
  createdByWorkspaceArmId?: string;
  credentials?: ConnectionServicePrincipal;
  /**
   * Provides the error message if the connection fails
   */
  error?: string;
  expiryTime?: Date;
  /**
   * Group based on connection category
   */
  group?: ConnectionGroup;
  isSharedToAll?: boolean;
  /**
   * Store user metadata for this connection
   */
  metadata?: Record<string, string>;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ManagedPeRequirement;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ManagedPeStatus;
  sharedUserList?: string[];
  /**
   * The connection URL to be used.
   */
  target?: string;
  useWorkspaceManagedIdentity?: boolean;
}

export interface ServicePrincipalAuthTypeConnectionPropertiesInput extends InputOf<ServicePrincipalAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "ServicePrincipal".
   */
  authType: "ServicePrincipal";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  credentials?: ConnectionServicePrincipalInput | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export interface ServicePrincipalAuthTypeConnectionPropertiesView extends InputOf<ServicePrincipalAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "ServicePrincipal".
   */
  authType: "ServicePrincipal";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  readonly createdByWorkspaceArmId?: Expression<string> | undefined;
  credentials?: ConnectionServicePrincipalView | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Read-only output: Group based on connection category
   */
  readonly group?: Expression<ConnectionGroup> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export const servicePrincipalAuthTypeConnectionPropertiesShape: FlatModelShape =
  createFlatModelShape({
    authType: { armPath: ["authType"], value: createStringLiteralShape() },
    category: { armPath: ["category"], value: createUnionShape() },
    createdByWorkspaceArmId: {
      armPath: ["createdByWorkspaceArmId"],
      value: createStringShape(),
      readOnly: true,
    },
    credentials: {
      armPath: ["credentials"],
      value: createDeferredShape(() => connectionServicePrincipalShape),
    },
    error: { armPath: ["error"], value: createStringShape() },
    expiryTime: {
      armPath: ["expiryTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
    },
    group: { armPath: ["group"], value: createUnionShape(), readOnly: true },
    isSharedToAll: { armPath: ["isSharedToAll"], value: createBooleanShape() },
    metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
    peRequirement: { armPath: ["peRequirement"], value: createUnionShape() },
    peStatus: { armPath: ["peStatus"], value: createUnionShape() },
    sharedUserList: { armPath: ["sharedUserList"], value: createArrayShape(createStringShape()) },
    target: { armPath: ["target"], value: createStringShape() },
    useWorkspaceManagedIdentity: {
      armPath: ["useWorkspaceManagedIdentity"],
      value: createBooleanShape(),
    },
  });

/**
 * Service Tag outbound rule for the managed network of a cognitive services account.
 */
export interface ServiceTagOutboundRule {
  /**
   * Category of a managed network Outbound Rule of a cognitive services account.
   */
  category?: RuleCategory;
  /**
   * Service Tag destination.
   */
  destination?: ServiceTagOutboundRuleDestination;
  /**
   * Error information about an outbound rule of a cognitive services account if RuleStatus is failed.
   */
  errorInformation?: string;
  parentRuleNames?: string[];
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   */
  status?: RuleStatus;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   *
   * Selects this variant. Must be "ServiceTag".
   */
  type: "ServiceTag";
}

/**
 * Input type for Service Tag outbound rule for the managed network of a cognitive services account.
 */
export interface ServiceTagOutboundRuleInput extends InputOf<ServiceTagOutboundRule> {
  /**
   * Category of a managed network Outbound Rule of a cognitive services account.
   */
  category?: ExpressionOrValue<RuleCategory> | undefined;
  /**
   * Service Tag destination.
   */
  destination?: ServiceTagOutboundRuleDestinationInput | undefined;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   */
  status?: ExpressionOrValue<RuleStatus> | undefined;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   *
   * Selects this variant. Must be "ServiceTag".
   */
  type: "ServiceTag";
}

/**
 * View type for Service Tag outbound rule for the managed network of a cognitive services account.
 */
export interface ServiceTagOutboundRuleView extends InputOf<ServiceTagOutboundRule> {
  /**
   * Category of a managed network Outbound Rule of a cognitive services account.
   */
  category?: ExpressionOrValue<RuleCategory> | undefined;
  /**
   * Service Tag destination.
   */
  destination?: ServiceTagOutboundRuleDestinationView | undefined;
  /**
   * Read-only output: Error information about an outbound rule of a cognitive services account if RuleStatus is failed.
   */
  readonly errorInformation?: Expression<string> | undefined;
  readonly parentRuleNames?: Expression<string[]> | undefined;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   */
  status?: ExpressionOrValue<RuleStatus> | undefined;
  /**
   * Type of a managed network Outbound Rule of a cognitive services account.
   *
   * Selects this variant. Must be "ServiceTag".
   */
  type: "ServiceTag";
}

export const serviceTagOutboundRuleShape: FlatModelShape = createFlatModelShape({
  category: { armPath: ["category"], value: createUnionShape() },
  destination: {
    armPath: ["destination"],
    value: createDeferredShape(() => serviceTagOutboundRuleDestinationShape),
  },
  errorInformation: { armPath: ["errorInformation"], value: createStringShape(), readOnly: true },
  parentRuleNames: {
    armPath: ["parentRuleNames"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  status: { armPath: ["status"], value: createUnionShape() },
  type: { armPath: ["type"], value: createStringLiteralShape() },
});

/**
 * Service Tag destination for an outbound rule.
 */
export interface ServiceTagOutboundRuleDestination {
  /**
   * The action for the service tag outbound rule.
   */
  action?: RuleAction;
  /**
   * Optional address prefixes. If provided, the serviceTag property will be ignored.
   */
  addressPrefixes?: string[];
  /**
   * Destination port ranges.
   */
  portRanges?: string;
  /**
   * Network protocol used by the service tag rule.
   */
  protocol?: string;
  /**
   * Name of the Azure service tag to target.
   */
  serviceTag?: string;
}

/**
 * Input type for Service Tag destination for an outbound rule.
 */
export interface ServiceTagOutboundRuleDestinationInput extends InputOf<ServiceTagOutboundRuleDestination> {
  /**
   * The action for the service tag outbound rule.
   */
  action?: ExpressionOrValue<RuleAction> | undefined;
  /**
   * Optional address prefixes. If provided, the serviceTag property will be ignored.
   */
  addressPrefixes?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Destination port ranges.
   */
  portRanges?: ExpressionOrValue<string> | undefined;
  /**
   * Network protocol used by the service tag rule.
   */
  protocol?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the Azure service tag to target.
   */
  serviceTag?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Service Tag destination for an outbound rule.
 */
export type ServiceTagOutboundRuleDestinationView = ServiceTagOutboundRuleDestinationInput;

export const serviceTagOutboundRuleDestinationShape: FlatModelShape = createFlatModelShape({
  action: { armPath: ["action"], value: createUnionShape() },
  addressPrefixes: { armPath: ["addressPrefixes"], value: createArrayShape(createStringShape()) },
  portRanges: { armPath: ["portRanges"], value: createStringShape() },
  protocol: { armPath: ["protocol"], value: createStringShape() },
  serviceTag: { armPath: ["serviceTag"], value: createStringShape() },
});

/**
 * The resource model definition representing SKU
 */
export interface Sku {
  /**
   * If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted.
   */
  capacity?: number;
  /**
   * If the service has different generations of hardware, for the same SKU, then that can be captured here.
   */
  family?: string;
  /**
   * The name of the SKU. Ex - P3. It is typically a letter+number code
   */
  name: string;
  /**
   * The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code.
   */
  size?: string;
  /**
   * This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT.
   */
  tier?: SkuTier;
}

/**
 * Input type for The resource model definition representing SKU
 */
export interface SkuInput extends InputOf<Sku> {
  /**
   * If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted.
   */
  capacity?: ExpressionOrValue<number> | undefined;
  /**
   * If the service has different generations of hardware, for the same SKU, then that can be captured here.
   */
  family?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the SKU. Ex - P3. It is typically a letter+number code
   */
  name: ExpressionOrValue<string>;
  /**
   * The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code.
   */
  size?: ExpressionOrValue<string> | undefined;
  /**
   * This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT.
   */
  tier?: ExpressionOrValue<SkuTier> | undefined;
}

/**
 * View type for The resource model definition representing SKU
 */
export type SkuView = SkuInput;

export const skuShape: FlatModelShape = createFlatModelShape({
  capacity: { armPath: ["capacity"], value: createNumberShape() },
  family: { armPath: ["family"], value: createStringShape() },
  name: { armPath: ["name"], value: createStringShape() },
  size: { armPath: ["size"], value: createStringShape() },
  tier: { armPath: ["tier"], value: createUnionShape() },
});

/**
 * SkuCapability indicates the capability of a certain feature.
 */
export interface SkuCapability {
  /**
   * The name of the SkuCapability.
   */
  name?: string;
  /**
   * The value of the SkuCapability.
   */
  value?: string;
}

/**
 * Input type for SkuCapability indicates the capability of a certain feature.
 */
export interface SkuCapabilityInput extends InputOf<SkuCapability> {}

/**
 * View type for SkuCapability indicates the capability of a certain feature.
 */
export interface SkuCapabilityView extends InputOf<SkuCapability> {
  /**
   * Read-only output: The name of the SkuCapability.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: The value of the SkuCapability.
   */
  readonly value?: Expression<string> | undefined;
}

export const skuCapabilityShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  value: { armPath: ["value"], value: createStringShape(), readOnly: true },
});

/**
 * Sku change info of account.
 */
export interface SkuChangeInfo {
  /**
   * Gets the count of downgrades.
   */
  countOfDowngrades?: number;
  /**
   * Gets the count of upgrades after downgrades.
   */
  countOfUpgradesAfterDowngrades?: number;
  /**
   * Gets the last change date.
   */
  lastChangeDate?: string;
}

/**
 * Input type for Sku change info of account.
 */
export interface SkuChangeInfoInput extends InputOf<SkuChangeInfo> {}

/**
 * View type for Sku change info of account.
 */
export interface SkuChangeInfoView extends InputOf<SkuChangeInfo> {
  /**
   * Read-only output: Gets the count of downgrades.
   */
  readonly countOfDowngrades?: Expression<number> | undefined;
  /**
   * Read-only output: Gets the count of upgrades after downgrades.
   */
  readonly countOfUpgradesAfterDowngrades?: Expression<number> | undefined;
  /**
   * Read-only output: Gets the last change date.
   */
  readonly lastChangeDate?: Expression<string> | undefined;
}

export const skuChangeInfoShape: FlatModelShape = createFlatModelShape({
  countOfDowngrades: { armPath: ["countOfDowngrades"], value: createNumberShape(), readOnly: true },
  countOfUpgradesAfterDowngrades: {
    armPath: ["countOfUpgradesAfterDowngrades"],
    value: createNumberShape(),
    readOnly: true,
  },
  lastChangeDate: { armPath: ["lastChangeDate"], value: createStringShape(), readOnly: true },
});

/**
 * Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemData {
  /**
   * The timestamp of resource creation (UTC).
   */
  createdAt?: Date;
  /**
   * The identity that created the resource.
   */
  createdBy?: string;
  /**
   * The type of identity that created the resource.
   */
  createdByType?: CreatedByType;
  /**
   * The timestamp of resource last modification (UTC)
   */
  lastModifiedAt?: Date;
  /**
   * The identity that last modified the resource.
   */
  lastModifiedBy?: string;
  /**
   * The type of identity that last modified the resource.
   */
  lastModifiedByType?: CreatedByType;
}

/**
 * Input type for Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemDataInput extends InputOf<SystemData> {}

/**
 * View type for Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemDataView extends InputOf<SystemData> {
  /**
   * Read-only output: The timestamp of resource creation (UTC).
   */
  readonly createdAt?: Expression<Date> | undefined;
  /**
   * Read-only output: The identity that created the resource.
   */
  readonly createdBy?: Expression<string> | undefined;
  /**
   * Read-only output: The type of identity that created the resource.
   */
  readonly createdByType?: Expression<CreatedByType> | undefined;
  /**
   * Read-only output: The timestamp of resource last modification (UTC)
   */
  readonly lastModifiedAt?: Expression<Date> | undefined;
  /**
   * Read-only output: The identity that last modified the resource.
   */
  readonly lastModifiedBy?: Expression<string> | undefined;
  /**
   * Read-only output: The type of identity that last modified the resource.
   */
  readonly lastModifiedByType?: Expression<CreatedByType> | undefined;
}

export const systemDataShape: FlatModelShape = createFlatModelShape({
  createdAt: {
    armPath: ["createdAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  createdBy: { armPath: ["createdBy"], value: createStringShape(), readOnly: true },
  createdByType: { armPath: ["createdByType"], value: createUnionShape(), readOnly: true },
  lastModifiedAt: {
    armPath: ["lastModifiedAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  lastModifiedBy: { armPath: ["lastModifiedBy"], value: createStringShape(), readOnly: true },
  lastModifiedByType: {
    armPath: ["lastModifiedByType"],
    value: createUnionShape(),
    readOnly: true,
  },
});

export interface ThrottlingRule {
  count?: number;
  dynamicThrottlingEnabled?: boolean;
  key?: string;
  matchPatterns?: RequestMatchPattern[];
  minCount?: number;
  renewalPeriod?: number;
}

export interface ThrottlingRuleInput extends InputOf<ThrottlingRule> {}

export interface ThrottlingRuleView extends InputOf<ThrottlingRule> {
  readonly count?: Expression<number> | undefined;
  readonly dynamicThrottlingEnabled?: Expression<boolean> | undefined;
  readonly key?: Expression<string> | undefined;
  readonly matchPatterns?: Expression<RequestMatchPattern[]> | undefined;
  readonly minCount?: Expression<number> | undefined;
  readonly renewalPeriod?: Expression<number> | undefined;
}

export const throttlingRuleShape: FlatModelShape = createFlatModelShape({
  count: { armPath: ["count"], value: createNumberShape(), readOnly: true },
  dynamicThrottlingEnabled: {
    armPath: ["dynamicThrottlingEnabled"],
    value: createBooleanShape(),
    readOnly: true,
  },
  key: { armPath: ["key"], value: createStringShape(), readOnly: true },
  matchPatterns: {
    armPath: ["matchPatterns"],
    value: createArrayShape(createDeferredShape(() => requestMatchPatternShape)),
    readOnly: true,
  },
  minCount: { armPath: ["minCount"], value: createNumberShape(), readOnly: true },
  renewalPeriod: { armPath: ["renewalPeriod"], value: createNumberShape(), readOnly: true },
});

/**
 * Represents a rule for routing traffic to a specific deployment.
 */
export interface TrafficRoutingRule {
  /**
   * The unique identifier of the deployment to which traffic is routed by this rule.
   */
  deploymentId?: string | null;
  /**
   * A user-provided description for this traffic routing rule.
   */
  description?: string | null;
  /**
   * The identifier of this traffic routing rule.
   */
  ruleId?: string | null;
  /**
   * Gets or sets the percentage of traffic allocated to this instance.
   */
  trafficPercentage?: number;
}

/**
 * Input type for Represents a rule for routing traffic to a specific deployment.
 */
export interface TrafficRoutingRuleInput extends InputOf<TrafficRoutingRule> {
  /**
   * The unique identifier of the deployment to which traffic is routed by this rule.
   */
  deploymentId?: ExpressionOrValue<string | null> | undefined;
  /**
   * A user-provided description for this traffic routing rule.
   */
  description?: ExpressionOrValue<string | null> | undefined;
  /**
   * The identifier of this traffic routing rule.
   */
  ruleId?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets or sets the percentage of traffic allocated to this instance.
   */
  trafficPercentage?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Represents a rule for routing traffic to a specific deployment.
 */
export type TrafficRoutingRuleView = TrafficRoutingRuleInput;

export const trafficRoutingRuleShape: FlatModelShape = createFlatModelShape({
  deploymentId: { armPath: ["deploymentId"], value: createStringShape() },
  description: { armPath: ["description"], value: createStringShape() },
  ruleId: { armPath: ["ruleId"], value: createStringShape() },
  trafficPercentage: { armPath: ["trafficPercentage"], value: createNumberShape() },
});

/**
 * User-assigned managed identity.
 */
export interface UserAssignedIdentity {
  /**
   * Client App Id associated with this identity.
   */
  clientId?: string;
  /**
   * Azure Active Directory principal ID associated with this Identity.
   */
  principalId?: string;
}

/**
 * Input type for User-assigned managed identity.
 */
export interface UserAssignedIdentityInput extends InputOf<UserAssignedIdentity> {}

/**
 * View type for User-assigned managed identity.
 */
export interface UserAssignedIdentityView extends InputOf<UserAssignedIdentity> {
  /**
   * Read-only output: Client App Id associated with this identity.
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: Azure Active Directory principal ID associated with this Identity.
   */
  readonly principalId?: Expression<string> | undefined;
}

export const userAssignedIdentityShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape(), readOnly: true },
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
});

export interface UsernamePasswordAuthTypeConnectionProperties {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "UsernamePassword".
   */
  authType: "UsernamePassword";
  /**
   * Category of the connection
   */
  category?: ConnectionCategory;
  createdByWorkspaceArmId?: string;
  credentials?: ConnectionUsernamePassword;
  /**
   * Provides the error message if the connection fails
   */
  error?: string;
  expiryTime?: Date;
  /**
   * Group based on connection category
   */
  group?: ConnectionGroup;
  isSharedToAll?: boolean;
  /**
   * Store user metadata for this connection
   */
  metadata?: Record<string, string>;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ManagedPeRequirement;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ManagedPeStatus;
  sharedUserList?: string[];
  /**
   * The connection URL to be used.
   */
  target?: string;
  useWorkspaceManagedIdentity?: boolean;
}

export interface UsernamePasswordAuthTypeConnectionPropertiesInput extends InputOf<UsernamePasswordAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "UsernamePassword".
   */
  authType: "UsernamePassword";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  credentials?: ConnectionUsernamePasswordInput | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export interface UsernamePasswordAuthTypeConnectionPropertiesView extends InputOf<UsernamePasswordAuthTypeConnectionProperties> {
  /**
   * Authentication type of the connection target
   *
   * Selects this variant. Must be "UsernamePassword".
   */
  authType: "UsernamePassword";
  /**
   * Category of the connection
   */
  category?: ExpressionOrValue<ConnectionCategory> | undefined;
  readonly createdByWorkspaceArmId?: Expression<string> | undefined;
  credentials?: ConnectionUsernamePasswordView | undefined;
  /**
   * Provides the error message if the connection fails
   */
  error?: ExpressionOrValue<string> | undefined;
  expiryTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Read-only output: Group based on connection category
   */
  readonly group?: Expression<ConnectionGroup> | undefined;
  isSharedToAll?: ExpressionOrValue<boolean> | undefined;
  /**
   * Store user metadata for this connection
   */
  metadata?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
  /**
   * Specifies how private endpoints are used with this connection: 'Required', 'NotRequired', or 'NotApplicable'.
   */
  peRequirement?: ExpressionOrValue<ManagedPeRequirement> | undefined;
  /**
   * Specifies the status of private endpoints for this connection: 'Inactive', 'Active', or 'NotApplicable'.
   */
  peStatus?: ExpressionOrValue<ManagedPeStatus> | undefined;
  sharedUserList?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The connection URL to be used.
   */
  target?: ExpressionOrValue<string> | undefined;
  useWorkspaceManagedIdentity?: ExpressionOrValue<boolean> | undefined;
}

export const usernamePasswordAuthTypeConnectionPropertiesShape: FlatModelShape =
  createFlatModelShape({
    authType: { armPath: ["authType"], value: createStringLiteralShape() },
    category: { armPath: ["category"], value: createUnionShape() },
    createdByWorkspaceArmId: {
      armPath: ["createdByWorkspaceArmId"],
      value: createStringShape(),
      readOnly: true,
    },
    credentials: {
      armPath: ["credentials"],
      value: createDeferredShape(() => connectionUsernamePasswordShape),
    },
    error: { armPath: ["error"], value: createStringShape() },
    expiryTime: {
      armPath: ["expiryTime"],
      value: createDateShape({
        kind: "date-time-text",
        source: "utcDateTime",
        format: "rfc3339",
        clientMode: "client",
        wire: { kind: "string" },
      }),
    },
    group: { armPath: ["group"], value: createUnionShape(), readOnly: true },
    isSharedToAll: { armPath: ["isSharedToAll"], value: createBooleanShape() },
    metadata: { armPath: ["metadata"], value: createRecordShape(createStringShape()) },
    peRequirement: { armPath: ["peRequirement"], value: createUnionShape() },
    peStatus: { armPath: ["peStatus"], value: createUnionShape() },
    sharedUserList: { armPath: ["sharedUserList"], value: createArrayShape(createStringShape()) },
    target: { armPath: ["target"], value: createStringShape() },
    useWorkspaceManagedIdentity: {
      armPath: ["useWorkspaceManagedIdentity"],
      value: createBooleanShape(),
    },
  });

/**
 * The user owned AML account for Cognitive Services account.
 */
export interface UserOwnedAmlWorkspace {
  /**
   * Identity Client id of a AML account resource.
   */
  identityClientId?: string;
  /**
   * Full resource id of a AML account resource.
   */
  resourceId?: string;
}

/**
 * Input type for The user owned AML account for Cognitive Services account.
 */
export interface UserOwnedAmlWorkspaceInput extends InputOf<UserOwnedAmlWorkspace> {
  /**
   * Identity Client id of a AML account resource.
   */
  identityClientId?: ExpressionOrValue<string> | undefined;
  /**
   * Full resource id of a AML account resource.
   */
  resourceId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The user owned AML account for Cognitive Services account.
 */
export type UserOwnedAmlWorkspaceView = UserOwnedAmlWorkspaceInput;

export const userOwnedAmlWorkspaceShape: FlatModelShape = createFlatModelShape({
  identityClientId: { armPath: ["identityClientId"], value: createStringShape() },
  resourceId: { armPath: ["resourceId"], value: createStringShape() },
});

/**
 * The user owned storage for Cognitive Services account.
 */
export interface UserOwnedStorage {
  identityClientId?: string;
  /**
   * Full resource id of a Microsoft.Storage resource.
   */
  resourceId?: string;
}

/**
 * Input type for The user owned storage for Cognitive Services account.
 */
export interface UserOwnedStorageInput extends InputOf<UserOwnedStorage> {
  identityClientId?: ExpressionOrValue<string> | undefined;
  /**
   * Full resource id of a Microsoft.Storage resource.
   */
  resourceId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The user owned storage for Cognitive Services account.
 */
export type UserOwnedStorageView = UserOwnedStorageInput;

export const userOwnedStorageShape: FlatModelShape = createFlatModelShape({
  identityClientId: { armPath: ["identityClientId"], value: createStringShape() },
  resourceId: { armPath: ["resourceId"], value: createStringShape() },
});

/**
 * Type modeling a reference to a version of an agent definition.
 */
export interface VersionedAgentReference {
  /**
   * Gets the agent's unique identifier within the organization (subscription).
   */
  agentId?: string | null;
  /**
   * Gets the agent's name (unique within the project/app).
   */
  agentName?: string | null;
  /**
   * Gets the agent's version (unique for each agent lineage).
   */
  agentVersion?: string | null;
}

/**
 * Input type for Type modeling a reference to a version of an agent definition.
 */
export interface VersionedAgentReferenceInput extends InputOf<VersionedAgentReference> {
  /**
   * Gets the agent's unique identifier within the organization (subscription).
   */
  agentId?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets the agent's name (unique within the project/app).
   */
  agentName?: ExpressionOrValue<string | null> | undefined;
  /**
   * Gets the agent's version (unique for each agent lineage).
   */
  agentVersion?: ExpressionOrValue<string | null> | undefined;
}

/**
 * View type for Type modeling a reference to a version of an agent definition.
 */
export type VersionedAgentReferenceView = VersionedAgentReferenceInput;

export const versionedAgentReferenceShape: FlatModelShape = createFlatModelShape({
  agentId: { armPath: ["agentId"], value: createStringShape() },
  agentName: { armPath: ["agentName"], value: createStringShape() },
  agentVersion: { armPath: ["agentVersion"], value: createStringShape() },
});

/**
 * A rule governing the accessibility from a specific virtual network.
 */
export interface VirtualNetworkRule {
  /**
   * Full resource id of a vnet subnet, such as '/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1'.
   */
  id: string;
  /**
   * Ignore missing vnet service endpoint or not.
   */
  ignoreMissingVnetServiceEndpoint?: boolean;
  /**
   * Gets the state of virtual network rule.
   */
  state?: string;
}

/**
 * Input type for A rule governing the accessibility from a specific virtual network.
 */
export interface VirtualNetworkRuleInput extends InputOf<VirtualNetworkRule> {
  /**
   * Full resource id of a vnet subnet, such as '/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/test-vnet/subnets/subnet1'.
   */
  id: ExpressionOrValue<string>;
  /**
   * Ignore missing vnet service endpoint or not.
   */
  ignoreMissingVnetServiceEndpoint?: ExpressionOrValue<boolean> | undefined;
  /**
   * Gets the state of virtual network rule.
   */
  state?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for A rule governing the accessibility from a specific virtual network.
 */
export type VirtualNetworkRuleView = VirtualNetworkRuleInput;

export const virtualNetworkRuleShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape() },
  ignoreMissingVnetServiceEndpoint: {
    armPath: ["ignoreMissingVnetServiceEndpoint"],
    value: createBooleanShape(),
  },
  state: { armPath: ["state"], value: createStringShape() },
});

/**
 * The action of AbusePenalty.
 *
 * Known values:
 *
 * - `"Throttle"`
 *
 * - `"Block"`
 */
export type AbusePenaltyAction = string;

/**
 * Provisioning state of an agentic deployment, as an Azure resource.
 *
 * Known values:
 *
 * - `"Succeeded"`: The deployment was successfully completed.
 *
 * - `"Failed"`: The deployment failed.
 *
 * - `"Canceled"`: The deployment was canceled.
 *
 * - `"Creating"`: The deployment is being created.
 *
 * - `"Updating"`: The deployment is being updated.
 *
 * - `"Deleting"`: The deployment is being deleted.
 */
export type AgentDeploymentProvisioningState = string;

/**
 * Current operational state of the agentic functionality represented by this deployment.
 *
 * Known values:
 *
 * - `"Starting"`: The deployment is starting.
 *
 * - `"Running"`: The deployment started/is operational.
 *
 * - `"Stopping"`: The deployment is being stopped.
 *
 * - `"Stopped"`: The deployment was stopped.
 *
 * - `"Failed"`: The deployment failed.
 *
 * - `"Deleting"`: The deployment is being deleted.
 *
 * - `"Deleted"`: The deployment was deleted.
 *
 * - `"Updating"`: The deployment is being updated.
 */
export type AgentDeploymentState = string;

/**
 * Provisioning state of an agentic application.
 *
 * Known values:
 *
 * - `"Succeeded"`: The application was successfully provisioned.
 *
 * - `"Failed"`: The application provisioning failed.
 *
 * - `"Canceled"`: The application provisioning was canceled.
 *
 * - `"Creating"`: The application is being created.
 *
 * - `"Updating"`: The application is being updated.
 *
 * - `"Deleting"`: The application is being deleted.
 */
export type AgenticApplicationProvisioningState = string;

/**
 * Protocol used by the agent/exposed by a deployment.
 *
 * Known values:
 *
 * - `"Agent"`: Agent protocol (aka Active)
 *
 * - `"A2A"`: Agent2Agent standard
 *
 * - `"Responses"`: OpenAI-compatible
 */
export type AgentProtocol = string;

/**
 * Setting for trusted services.
 *
 * Known values:
 *
 * - `"None"`
 *
 * - `"AzureServices"`
 */
export type ByPassSelection = string;

/**
 * Known values:
 *
 * - `"Agents"`
 */
export type CapabilityHostKind = string;

/**
 * Provisioning state of capability host.
 *
 * Known values:
 *
 * - `"Succeeded"`
 *
 * - `"Failed"`
 *
 * - `"Canceled"`
 *
 * - `"Creating"`
 *
 * - `"Updating"`
 *
 * - `"Deleting"`
 */
export type CapabilityHostProvisioningState = string;

/**
 * Gets the status of the resource at the time the operation was called.
 *
 * Known values:
 *
 * - `"Accepted"`
 *
 * - `"Creating"`
 *
 * - `"Deleting"`
 *
 * - `"Moving"`
 *
 * - `"Failed"`
 *
 * - `"Succeeded"`
 *
 * - `"Canceled"`
 */
export type CommitmentPlanProvisioningState = string;

/**
 * Category of the connection
 *
 * Known values:
 *
 * - `"PythonFeed"`
 *
 * - `"ContainerRegistry"`
 *
 * - `"Git"`
 *
 * - `"S3"`
 *
 * - `"Snowflake"`
 *
 * - `"AzureKeyVault"`
 *
 * - `"AzureSqlDb"`
 *
 * - `"AzureSynapseAnalytics"`
 *
 * - `"AzureMySqlDb"`
 *
 * - `"AzurePostgresDb"`
 *
 * - `"ADLSGen2"`
 *
 * - `"AzureContainerAppEnvironment"`
 *
 * - `"Redis"`
 *
 * - `"ApiKey"`
 *
 * - `"AzureOpenAI"`
 *
 * - `"AIServices"`
 *
 * - `"CognitiveSearch"`
 *
 * - `"CognitiveService"`
 *
 * - `"CustomKeys"`
 *
 * - `"AzureBlob"`
 *
 * - `"AzureStorageAccount"`
 *
 * - `"AzureOneLake"`
 *
 * - `"CosmosDb"`
 *
 * - `"CosmosDbMongoDbApi"`
 *
 * - `"AzureDataExplorer"`
 *
 * - `"AzureMariaDb"`
 *
 * - `"AzureDatabricksDeltaLake"`
 *
 * - `"AzureSqlMi"`
 *
 * - `"AzureTableStorage"`
 *
 * - `"AmazonRdsForOracle"`
 *
 * - `"AmazonRdsForSqlServer"`
 *
 * - `"AmazonRedshift"`
 *
 * - `"Db2"`
 *
 * - `"Drill"`
 *
 * - `"GoogleBigQuery"`
 *
 * - `"Greenplum"`
 *
 * - `"Hbase"`
 *
 * - `"Hive"`
 *
 * - `"Impala"`
 *
 * - `"Informix"`
 *
 * - `"MariaDb"`
 *
 * - `"MicrosoftAccess"`
 *
 * - `"MySql"`
 *
 * - `"Netezza"`
 *
 * - `"Oracle"`
 *
 * - `"Phoenix"`
 *
 * - `"PostgreSql"`
 *
 * - `"Presto"`
 *
 * - `"SapOpenHub"`
 *
 * - `"SapBw"`
 *
 * - `"SapHana"`
 *
 * - `"SapTable"`
 *
 * - `"Spark"`
 *
 * - `"SqlServer"`
 *
 * - `"Sybase"`
 *
 * - `"Teradata"`
 *
 * - `"Vertica"`
 *
 * - `"Pinecone"`
 *
 * - `"Databricks"`
 *
 * - `"Cassandra"`
 *
 * - `"Couchbase"`
 *
 * - `"MongoDbV2"`
 *
 * - `"MongoDbAtlas"`
 *
 * - `"AmazonS3Compatible"`
 *
 * - `"FileServer"`
 *
 * - `"FtpServer"`
 *
 * - `"GoogleCloudStorage"`
 *
 * - `"Hdfs"`
 *
 * - `"OracleCloudStorage"`
 *
 * - `"Sftp"`
 *
 * - `"GenericHttp"`
 *
 * - `"ODataRest"`
 *
 * - `"Odbc"`
 *
 * - `"GenericRest"`
 *
 * - `"RemoteTool"`
 *
 * - `"AmazonMws"`
 *
 * - `"Concur"`
 *
 * - `"Dynamics"`
 *
 * - `"DynamicsAx"`
 *
 * - `"DynamicsCrm"`
 *
 * - `"GoogleAdWords"`
 *
 * - `"Hubspot"`
 *
 * - `"Jira"`
 *
 * - `"Magento"`
 *
 * - `"Marketo"`
 *
 * - `"Office365"`
 *
 * - `"Eloqua"`
 *
 * - `"Responsys"`
 *
 * - `"OracleServiceCloud"`
 *
 * - `"PayPal"`
 *
 * - `"QuickBooks"`
 *
 * - `"Salesforce"`
 *
 * - `"SalesforceServiceCloud"`
 *
 * - `"SalesforceMarketingCloud"`
 *
 * - `"SapCloudForCustomer"`
 *
 * - `"SapEcc"`
 *
 * - `"ServiceNow"`
 *
 * - `"SharePointOnlineList"`
 *
 * - `"Shopify"`
 *
 * - `"Square"`
 *
 * - `"WebTable"`
 *
 * - `"Xero"`
 *
 * - `"Zoho"`
 *
 * - `"GenericContainerRegistry"`
 *
 * - `"Elasticsearch"`
 *
 * - `"AppInsights"`
 *
 * - `"AppConfig"`
 *
 * - `"OpenAI"`
 *
 * - `"Serp"`
 *
 * - `"BingLLMSearch"`
 *
 * - `"Serverless"`
 *
 * - `"ManagedOnlineEndpoint"`
 *
 * - `"ApiManagement"`
 *
 * - `"ModelGateway"`
 *
 * - `"GroundingWithBingSearch"`
 *
 * - `"GroundingWithCustomSearch"`
 *
 * - `"Sharepoint"`
 *
 * - `"MicrosoftFabric"`
 *
 * - `"PowerPlatformEnvironment"`
 *
 * - `"RemoteA2A"`
 */
export type ConnectionCategory = string;

/**
 * Group based on connection category
 *
 * Known values:
 *
 * - `"Azure"`
 *
 * - `"AzureAI"`
 *
 * - `"Database"`
 *
 * - `"NoSQL"`
 *
 * - `"File"`
 *
 * - `"GenericProtocol"`
 *
 * - `"ServicesAndApps"`
 */
export type ConnectionGroup = string;

/**
 * Level at which content is filtered.
 *
 * Known values:
 *
 * - `"Low"`
 *
 * - `"Medium"`
 *
 * - `"High"`
 */
export type ContentLevel = string;

/**
 * The kind of entity that created the resource.
 *
 * Known values:
 *
 * - `"User"`: The entity was created by a user.
 *
 * - `"Application"`: The entity was created by an application.
 *
 * - `"ManagedIdentity"`: The entity was created by a managed identity.
 *
 * - `"Key"`: The entity was created by a key.
 */
export type CreatedByType = string;

/**
 * Defender for AI state on the AI resource.
 *
 * Known values:
 *
 * - `"Disabled"`
 *
 * - `"Enabled"`
 */
export type DefenderForAiSettingState = string;

/**
 * Deployment model version upgrade option.
 *
 * Known values:
 *
 * - `"OnceNewDefaultVersionAvailable"`
 *
 * - `"OnceCurrentVersionExpired"`
 *
 * - `"NoAutoUpgrade"`
 */
export type DeploymentModelVersionUpgradeOption = string;

/**
 * Gets the status of the resource at the time the operation was called.
 *
 * Known values:
 *
 * - `"Accepted"`
 *
 * - `"Creating"`
 *
 * - `"Deleting"`
 *
 * - `"Moving"`
 *
 * - `"Failed"`
 *
 * - `"Succeeded"`
 *
 * - `"Disabled"`
 *
 * - `"Canceled"`
 */
export type DeploymentProvisioningState = string;

/**
 * Deployment scale type.
 *
 * Known values:
 *
 * - `"Standard"`
 *
 * - `"Manual"`
 */
export type DeploymentScaleType = string;

/**
 * The state of the deployment. Controls whether the deployment is accepting inference requests. Use 'Running' for active deployments that process requests, or 'Paused' to temporarily stop inference while preserving the deployment configuration.
 *
 * Known values:
 *
 * - `"Running"`: The deployment is running and accepting inference requests.
 *
 * - `"Paused"`: The deployment is paused and not accepting inference requests.
 */
export type DeploymentState = string;

/**
 * Gets the status of the resource at the time the operation was called.
 *
 * Known values:
 *
 * - `"Accepted"`
 *
 * - `"Creating"`
 *
 * - `"Deleting"`
 *
 * - `"Moving"`
 *
 * - `"Failed"`
 *
 * - `"Succeeded"`
 *
 * - `"Canceled"`
 */
export type EncryptionScopeProvisioningState = string;

/**
 * The encryptionScope state.
 *
 * Known values:
 *
 * - `"Disabled"`
 *
 * - `"Enabled"`
 */
export type EncryptionScopeState = string;

/**
 * Firewall Sku used for FQDN Rules
 *
 * Known values:
 *
 * - `"Standard"`
 *
 * - `"Basic"`
 */
export type FirewallSku = string;

/**
 * Account hosting model.
 *
 * Known values:
 *
 * - `"Web"`
 *
 * - `"ConnectedContainer"`
 *
 * - `"DisconnectedContainer"`
 *
 * - `"ProvisionedWeb"`
 */
export type HostingModel = string;

/**
 * Specifies the kind of Entra identity described by this object.
 *
 * Known values:
 *
 * - `"AgentBlueprint"`: Represents a class identity, used for agentic applications.
 *
 * - `"AgentInstance"`: Represents an instance identity.
 *
 * - `"AgenticUser"`: Represents an agentic instance identity with user-like traits.
 *
 * - `"Managed"`: Represents a classic managed identity.
 *
 * - `"None"`: No identity.
 */
export type IdentityKind = string;

/**
 * Enumeration of identity types, from the perspective of management.
 *
 * Known values:
 *
 * - `"System"`: Platform-managed identity.
 *
 * - `"User"`: User-managed identity.
 *
 * - `"None"`: No identity.
 */
export type IdentityManagementType = string;

/**
 * Represents the provisioning state of an identity resource.
 *
 * Known values:
 *
 * - `"Creating"`: Identity is being created.
 *
 * - `"Updating"`: Identity is being updated.
 *
 * - `"Succeeded"`: Identity has been successfully provisioned.
 *
 * - `"Failed"`: Identity provisioning has failed.
 *
 * - `"Canceled"`: Identity provisioning has been canceled.
 *
 * - `"Deleting"`: Identity is being deleted.
 */
export type IdentityProvisioningState = string;

/**
 * Isolation mode for the managed network of a cognitive services account.
 *
 * Known values:
 *
 * - `"Disabled"`
 *
 * - `"AllowInternetOutbound"`
 *
 * - `"AllowOnlyApprovedOutbound"`
 */
export type IsolationMode = string;

/**
 * Enumerates the possible value of keySource for Encryption
 *
 * Known values:
 *
 * - `"Microsoft.CognitiveServices"`
 *
 * - `"Microsoft.KeyVault"`
 */
export type KeySource = string;

/**
 * The Kind of the managed network. Users can switch from V1 to V2 for granular access controls, but cannot switch back to V1 once V2 is enabled.
 *
 * Known values:
 *
 * - `"V1"`
 *
 * - `"V2"`
 */
export type ManagedNetworkKind = string;

/**
 * Known values:
 *
 * - `"Deferred"`
 *
 * - `"Updating"`
 *
 * - `"Succeeded"`
 *
 * - `"Failed"`
 *
 * - `"Deleting"`
 *
 * - `"Deleted"`
 */
export type ManagedNetworkProvisioningState = string;

/**
 * Status for the managed network of a cognitive services account.
 *
 * Known values:
 *
 * - `"Inactive"`
 *
 * - `"Active"`
 */
export type ManagedNetworkStatus = string;

/**
 * Known values:
 *
 * - `"Required"`
 *
 * - `"NotRequired"`
 *
 * - `"NotApplicable"`
 */
export type ManagedPeRequirement = string;

/**
 * Known values:
 *
 * - `"Inactive"`
 *
 * - `"Active"`
 *
 * - `"NotApplicable"`
 */
export type ManagedPeStatus = string;

/**
 * The default action when no rule from ipRules and from virtualNetworkRules match. This is only used after the bypass property has been evaluated.
 *
 * Known values:
 *
 * - `"Allow"`
 *
 * - `"Deny"`
 */
export type NetworkRuleAction = string;

/**
 * Direction of Access Rule
 *
 * Known values:
 *
 * - `"Inbound"`
 *
 * - `"Outbound"`
 */
export type NspAccessRuleDirection = string;

/**
 * The current provisioning state.
 *
 * Known values:
 *
 * - `"Succeeded"`: Connection has been provisioned
 *
 * - `"Creating"`: Connection is being created
 *
 * - `"Deleting"`: Connection is being deleted
 *
 * - `"Failed"`: Connection provisioning has failed
 */
export type PrivateEndpointConnectionProvisioningState = string;

/**
 * The private endpoint connection status.
 *
 * Known values:
 *
 * - `"Pending"`: Connection waiting for approval or rejection
 *
 * - `"Approved"`: Connection approved
 *
 * - `"Rejected"`: Connection Rejected
 */
export type PrivateEndpointServiceConnectionStatus = string;

/**
 * Gets the status of the cognitive services account at the time the operation was called.
 *
 * Known values:
 *
 * - `"Accepted"`
 *
 * - `"Creating"`
 *
 * - `"Deleting"`
 *
 * - `"Moving"`
 *
 * - `"Failed"`
 *
 * - `"Succeeded"`
 *
 * - `"Canceled"`
 *
 * - `"ResolvingDNS"`
 */
export type ProvisioningState = string;

/**
 * Whether or not public endpoint access is allowed for this account.
 *
 * Known values:
 *
 * - `"Enabled"`
 *
 * - `"Disabled"`
 */
export type PublicNetworkAccess = string;

/**
 * The action types to apply to the content filters
 *
 * Known values:
 *
 * - `"None"`
 *
 * - `"BLOCKING"`
 *
 * - `"ANNOTATING"`
 *
 * - `"HITL"`
 *
 * - `"RETRY"`
 */
export type RaiActionType = string;

/**
 * Content source to apply the Content Filters.
 *
 * Known values:
 *
 * - `"Prompt"`
 *
 * - `"Completion"`
 *
 * - `"PreToolCall"`
 *
 * - `"PostToolCall"`
 *
 * - `"PreRun"`
 *
 * - `"PostRun"`
 */
export type RaiPolicyContentSource = string;

/**
 * Rai policy mode. The enum value mapping is as below: Default = 0, Deferred=1, Blocking=2, Asynchronous_filter =3. Please use 'Asynchronous_filter' after 2025-06-01. It is the same as 'Deferred' in previous version.
 *
 * Known values:
 *
 * - `"Default"`
 *
 * - `"Deferred"`
 *
 * - `"Blocking"`
 *
 * - `"Asynchronous_filter"`
 */
export type RaiPolicyMode = string;

/**
 * Content Filters policy type.
 *
 * Known values:
 *
 * - `"UserManaged"`
 *
 * - `"SystemManaged"`
 */
export type RaiPolicyType = string;

/**
 * Multiregion routing methods.
 *
 * Known values:
 *
 * - `"Priority"`
 *
 * - `"Weighted"`
 *
 * - `"Performance"`
 */
export type RoutingMethods = string;

/**
 * The model-router routing mode that determines how requests are distributed across models.
 *
 * Known values:
 *
 * - `"cost"`: Route requests to minimize cost while meeting performance requirements.
 *
 * - `"balanced"`: Balance cost and quality when routing requests across models.
 *
 * - `"quality"`: Route requests to maximize quality regardless of cost.
 */
export type RoutingMode = string;

/**
 * The action enum for a managed network outbound rule.
 *
 * Known values:
 *
 * - `"Allow"`
 *
 * - `"Deny"`
 */
export type RuleAction = string;

/**
 * Category of a managed network Outbound Rule of a cognitive services account.
 *
 * Known values:
 *
 * - `"Required"`
 *
 * - `"Recommended"`
 *
 * - `"UserDefined"`
 *
 * - `"Dependency"`
 */
export type RuleCategory = string;

/**
 * Type of a managed network Outbound Rule of a cognitive services account.
 *
 * Known values:
 *
 * - `"Inactive"`
 *
 * - `"Active"`
 *
 * - `"Provisioning"`
 *
 * - `"Deleting"`
 *
 * - `"Failed"`
 */
export type RuleStatus = string;

/**
 * Specifies what features in AI Foundry network injection applies to. Currently only supports 'agent' for agent scenarios. 'none' means no network injection.
 *
 * Known values:
 *
 * - `"none"`
 *
 * - `"agent"`
 */
export type ScenarioType = string;

/**
 * The service tier for the deployment. Determines the pricing and performance level for request processing. Use 'Default' for standard pricing or 'Priority' for higher-priority processing with premium pricing. Note: Pause operations are only supported on Standard, DataZoneStandard, and GlobalStandard SKUs.
 *
 * Known values:
 *
 * - `"Default"`: Default service tier meaning the request will be processed with the standard pricing and performance for the selected model.
 *
 * - `"Priority"`: Priority service tier meaning the request will be processed with higher pricing and performance for the selected model.
 */
export type ServiceTier = string;

/**
 * This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT.
 *
 * Known values:
 *
 * - `"Free"`
 *
 * - `"Basic"`
 *
 * - `"Standard"`
 *
 * - `"Premium"`
 *
 * - `"Enterprise"`
 */
export type SkuTier = string;

/**
 * Gets the tier upgrade policy for the subscription.
 *
 * Known values:
 *
 * - `"OnceUpgradeIsAvailable"`
 *
 * - `"NoAutoUpgrade"`
 */
export type TierUpgradePolicy = string;

/**
 * Traffic routing protocol, used to distribute an application's inbound traffic to its deployments.
 *
 * Known values:
 *
 * - `"FixedRatio"`: Percentage based routing
 */
export type TrafficRoutingProtocol = string;

/**
 * Specifies whether an upgrade to the next quota tier is available.
 *
 * Known values:
 *
 * - `"Available"`
 *
 * - `"NotAvailable"`
 */
export type UpgradeAvailabilityStatus = string;

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Expression, ExpressionOrValue } from "@azure/provisioning-core";
import {
  createAnyShape,
  createArrayShape,
  createBooleanShape,
  createDateShape,
  createDeferredShape,
  createEnumShape,
  createFlatModelShape,
  createNumberShape,
  createRecordShape,
  createStringShape,
  createUnionShape,
  type FlatModelShape,
  type InputArray,
  type InputOf,
  type InputRecord,
} from "@azure/provisioning-core/internal";

/**
 * Describes what response the data plane API of a search service would send for requests that failed authentication.
 */
export type AadAuthFailureMode = "http403" | "http401WithBearerChallenge";

/**
 * Applicable only for the standard3 SKU. You can set this property to enable up to 3 high density partitions that allow up to 1000 indexes, which is much higher than the maximum indexes allowed for any other SKU. For the standard3 SKU, the value is either 'Default' or 'HighDensity'. For all other SKUs, this value must be 'Default'.
 */
export type HostingMode = "Default" | "HighDensity";

/**
 * Status of the the private link service connection. Valid values are Pending, Approved, Rejected, or Disconnected.
 */
export type PrivateLinkServiceConnectionStatus =
  "Pending" | "Approved" | "Rejected" | "Disconnected";

/**
 * The state of the last provisioning operation performed on the search service. Provisioning is an intermediate state that occurs while service capacity is being established. After capacity is set up, provisioningState changes to either 'Succeeded' or 'Failed'. Client applications can poll provisioning status (the recommended polling interval is from 30 seconds to one minute) by using the Get Search Service operation to see when an operation is completed. If you are using the free service, this value tends to come back as 'Succeeded' directly in the call to Create search service. This is because the free service uses capacity that is already set up.
 */
export type ProvisioningState = "succeeded" | "provisioning" | "failed";

/**
 * Returns the status of search service compliance with respect to non-CMK-encrypted objects. If a service has more than one unencrypted object, and enforcement is enabled, the service is marked as noncompliant.
 */
export type SearchEncryptionComplianceStatus = "Compliant" | "NonCompliant";

/**
 * Describes how a search service should enforce compliance if it finds objects that aren't encrypted with the customer-managed key.
 */
export type SearchEncryptionWithCmk = "Disabled" | "Enabled" | "Unspecified";

/**
 * The status of the search service. Possible values include: 'running': The search service is running and no provisioning operations are underway. 'provisioning': The search service is being provisioned or scaled up or down. 'deleting': The search service is being deleted. 'degraded': The search service is degraded. This can occur when the underlying search units are not healthy. The search service is most likely operational, but performance might be slow and some requests might be dropped. 'disabled': The search service is disabled. In this state, the service will reject all API requests. 'error': The search service is in an error state. 'stopped': The search service is in a subscription that's disabled. If your service is in the degraded, disabled, or error states, it means the Azure AI Search team is actively investigating the underlying issue. Dedicated services in these states are still chargeable based on the number of search units provisioned.
 */
export type SearchServiceStatus =
  "running" | "provisioning" | "deleting" | "degraded" | "disabled" | "error" | "stopped";

/**
 * Access rule in a network security perimeter configuration profile
 */
export interface AccessRule {
  /**
   * Name of the access rule
   */
  name?: string;
  /**
   * Properties of the access rule
   */
  properties?: AccessRuleProperties;
}

/**
 * Input type for Access rule in a network security perimeter configuration profile
 */
export interface AccessRuleInput extends InputOf<AccessRule> {}

/**
 * View type for Access rule in a network security perimeter configuration profile
 */
export interface AccessRuleView extends InputOf<AccessRule> {
  /**
   * Read-only output: Name of the access rule
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: Properties of the access rule
   */
  readonly properties?: Expression<AccessRuleProperties> | undefined;
}

export const accessRuleShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => accessRulePropertiesShape),
    readOnly: true,
  },
});

/**
 * Properties of Access Rule
 */
export interface AccessRuleProperties {
  /**
   * Address prefixes in the CIDR format for inbound rules
   */
  addressPrefixes?: string[];
  /**
   * Direction of the access rule
   */
  direction?: AccessRuleDirection;
  /**
   * Email addresses for outbound rules
   */
  emailAddresses?: string[];
  /**
   * Fully qualified domain names (FQDN) for outbound rules
   */
  fullyQualifiedDomainNames?: string[];
  /**
   * Network security perimeters for inbound rules
   */
  networkSecurityPerimeters?: NetworkSecurityPerimeter[];
  /**
   * Phone numbers for outbound rules
   */
  phoneNumbers?: string[];
  /**
   * Subscriptions for inbound rules
   */
  subscriptions?: Subscriptions[];
}

/**
 * Input type for Properties of Access Rule
 */
export interface AccessRulePropertiesInput extends InputOf<AccessRuleProperties> {}

/**
 * View type for Properties of Access Rule
 */
export interface AccessRulePropertiesView extends InputOf<AccessRuleProperties> {
  /**
   * Read-only output: Address prefixes in the CIDR format for inbound rules
   */
  readonly addressPrefixes?: Expression<string[]> | undefined;
  /**
   * Read-only output: Direction of the access rule
   */
  readonly direction?: Expression<AccessRuleDirection> | undefined;
  /**
   * Read-only output: Email addresses for outbound rules
   */
  readonly emailAddresses?: Expression<string[]> | undefined;
  /**
   * Read-only output: Fully qualified domain names (FQDN) for outbound rules
   */
  readonly fullyQualifiedDomainNames?: Expression<string[]> | undefined;
  /**
   * Read-only output: Network security perimeters for inbound rules
   */
  readonly networkSecurityPerimeters?: Expression<NetworkSecurityPerimeter[]> | undefined;
  /**
   * Read-only output: Phone numbers for outbound rules
   */
  readonly phoneNumbers?: Expression<string[]> | undefined;
  /**
   * Read-only output: Subscriptions for inbound rules
   */
  readonly subscriptions?: Expression<Subscriptions[]> | undefined;
}

export const accessRulePropertiesShape: FlatModelShape = createFlatModelShape({
  addressPrefixes: {
    armPath: ["addressPrefixes"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  direction: { armPath: ["direction"], value: createUnionShape(), readOnly: true },
  emailAddresses: {
    armPath: ["emailAddresses"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
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
  phoneNumbers: {
    armPath: ["phoneNumbers"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  subscriptions: {
    armPath: ["subscriptions"],
    value: createArrayShape(createDeferredShape(() => subscriptionsShape)),
    readOnly: true,
  },
});

/**
 * Indicates that either the API key or an access token from a Microsoft Entra ID tenant can be used for authentication.
 */
export interface DataPlaneAadOrApiKeyAuthOption {
  /**
   * Describes what response the data plane API of a search service would send for requests that failed authentication.
   */
  aadAuthFailureMode?: AadAuthFailureMode;
}

/**
 * Input type for Indicates that either the API key or an access token from a Microsoft Entra ID tenant can be used for authentication.
 */
export interface DataPlaneAadOrApiKeyAuthOptionInput extends InputOf<DataPlaneAadOrApiKeyAuthOption> {
  /**
   * Describes what response the data plane API of a search service would send for requests that failed authentication.
   */
  aadAuthFailureMode?: ExpressionOrValue<AadAuthFailureMode> | undefined;
}

/**
 * View type for Indicates that either the API key or an access token from a Microsoft Entra ID tenant can be used for authentication.
 */
export type DataPlaneAadOrApiKeyAuthOptionView = DataPlaneAadOrApiKeyAuthOptionInput;

export const dataPlaneAadOrApiKeyAuthOptionShape: FlatModelShape = createFlatModelShape({
  aadAuthFailureMode: { armPath: ["aadAuthFailureMode"], value: createEnumShape() },
});

/**
 * Defines the options for how the search service authenticates a data plane request. This cannot be set if 'disableLocalAuth' is set to true.
 */
export interface DataPlaneAuthOptions {
  /**
   * Indicates that either the API key or an access token from a Microsoft Entra ID tenant can be used for authentication.
   */
  aadOrApiKey?: DataPlaneAadOrApiKeyAuthOption;
  /**
   * Indicates that only the API key can be used for authentication.
   */
  apiKeyOnly?: any;
}

/**
 * Input type for Defines the options for how the search service authenticates a data plane request. This cannot be set if 'disableLocalAuth' is set to true.
 */
export interface DataPlaneAuthOptionsInput extends InputOf<DataPlaneAuthOptions> {
  /**
   * Indicates that either the API key or an access token from a Microsoft Entra ID tenant can be used for authentication.
   */
  aadOrApiKey?: DataPlaneAadOrApiKeyAuthOptionInput | undefined;
  /**
   * Indicates that only the API key can be used for authentication.
   */
  apiKeyOnly?: any | undefined;
}

/**
 * View type for Defines the options for how the search service authenticates a data plane request. This cannot be set if 'disableLocalAuth' is set to true.
 */
export type DataPlaneAuthOptionsView = DataPlaneAuthOptionsInput;

export const dataPlaneAuthOptionsShape: FlatModelShape = createFlatModelShape({
  aadOrApiKey: {
    armPath: ["aadOrApiKey"],
    value: createDeferredShape(() => dataPlaneAadOrApiKeyAuthOptionShape),
  },
  apiKeyOnly: { armPath: ["apiKeyOnly"], value: createAnyShape() },
});

/**
 * Describes a policy that determines how resources within the search service are to be encrypted with customer managed keys.
 */
export interface EncryptionWithCmk {
  /**
   * Returns the status of search service compliance with respect to non-CMK-encrypted objects. If a service has more than one unencrypted object, and enforcement is enabled, the service is marked as noncompliant.
   */
  encryptionComplianceStatus?: SearchEncryptionComplianceStatus;
  /**
   * Describes how a search service should enforce compliance if it finds objects that aren't encrypted with the customer-managed key.
   */
  enforcement?: SearchEncryptionWithCmk;
}

/**
 * Input type for Describes a policy that determines how resources within the search service are to be encrypted with customer managed keys.
 */
export interface EncryptionWithCmkInput extends InputOf<EncryptionWithCmk> {
  /**
   * Describes how a search service should enforce compliance if it finds objects that aren't encrypted with the customer-managed key.
   */
  enforcement?: ExpressionOrValue<SearchEncryptionWithCmk> | undefined;
}

/**
 * View type for Describes a policy that determines how resources within the search service are to be encrypted with customer managed keys.
 */
export interface EncryptionWithCmkView extends InputOf<EncryptionWithCmk> {
  /**
   * Read-only output: Returns the status of search service compliance with respect to non-CMK-encrypted objects. If a service has more than one unencrypted object, and enforcement is enabled, the service is marked as noncompliant.
   */
  readonly encryptionComplianceStatus?: Expression<SearchEncryptionComplianceStatus> | undefined;
  /**
   * Describes how a search service should enforce compliance if it finds objects that aren't encrypted with the customer-managed key.
   */
  enforcement?: ExpressionOrValue<SearchEncryptionWithCmk> | undefined;
}

export const encryptionWithCmkShape: FlatModelShape = createFlatModelShape({
  encryptionComplianceStatus: {
    armPath: ["encryptionComplianceStatus"],
    value: createEnumShape(),
    readOnly: true,
  },
  enforcement: { armPath: ["enforcement"], value: createEnumShape() },
});

/**
 * Details about the search service identity. A null value indicates that the search service has no identity assigned.
 */
export interface Identity {
  /**
   * The principal ID of the system-assigned identity of the search service.
   */
  principalId?: string;
  /**
   * The tenant ID of the system-assigned identity of the search service.
   */
  tenantId?: string;
  /**
   * The type of identity used for the resource. The type 'SystemAssigned, UserAssigned' includes both an identity created by the system and a set of user assigned identities. The type 'None' will remove all identities from the service.
   */
  type: IdentityType;
  /**
   * The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource IDs in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

/**
 * Input type for Details about the search service identity. A null value indicates that the search service has no identity assigned.
 */
export interface IdentityInput extends InputOf<Identity> {
  /**
   * The type of identity used for the resource. The type 'SystemAssigned, UserAssigned' includes both an identity created by the system and a set of user assigned identities. The type 'None' will remove all identities from the service.
   */
  type: ExpressionOrValue<IdentityType>;
  /**
   * The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource IDs in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?:
    InputRecord<UserAssignedIdentityInput, Record<string, UserAssignedIdentity>> | undefined;
}

/**
 * View type for Details about the search service identity. A null value indicates that the search service has no identity assigned.
 */
export interface IdentityView extends InputOf<Identity> {
  /**
   * Read-only output: The principal ID of the system-assigned identity of the search service.
   */
  readonly principalId?: Expression<string> | undefined;
  /**
   * Read-only output: The tenant ID of the system-assigned identity of the search service.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * The type of identity used for the resource. The type 'SystemAssigned, UserAssigned' includes both an identity created by the system and a set of user assigned identities. The type 'None' will remove all identities from the service.
   */
  type: ExpressionOrValue<IdentityType>;
  /**
   * The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource IDs in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?:
    InputRecord<UserAssignedIdentityView, Record<string, UserAssignedIdentity>> | undefined;
}

export const identityShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createUnionShape() },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    value: createRecordShape(createDeferredShape(() => userAssignedIdentityShape)),
  },
});

/**
 * The IP restriction rule of the Azure AI Search service.
 */
export interface IpRule {
  /**
   * Value corresponding to a single IPv4 address (eg., 123.1.2.3) or an IP range in CIDR format (eg., 123.1.2.3/24) to be allowed.
   */
  value?: string;
}

/**
 * Input type for The IP restriction rule of the Azure AI Search service.
 */
export interface IpRuleInput extends InputOf<IpRule> {
  /**
   * Value corresponding to a single IPv4 address (eg., 123.1.2.3) or an IP range in CIDR format (eg., 123.1.2.3/24) to be allowed.
   */
  value?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The IP restriction rule of the Azure AI Search service.
 */
export type IpRuleView = IpRuleInput;

export const ipRuleShape: FlatModelShape = createFlatModelShape({
  value: { armPath: ["value"], value: createStringShape() },
});

/**
 * Network specific rules that determine how the Azure AI Search service may be reached.
 */
export interface NetworkRuleSet {
  /**
   * Possible origins of inbound traffic that can bypass the rules defined in the 'ipRules' section.
   */
  bypass?: SearchBypass;
  /**
   * A list of IP restriction rules that defines the inbound network(s) with allowing access to the search service endpoint. At the meantime, all other public IP networks are blocked by the firewall. These restriction rules are applied only when the 'publicNetworkAccess' of the search service is 'enabled'; otherwise, traffic over public interface is not allowed even with any public IP rules, and private endpoint connections would be the exclusive access method.
   */
  ipRules?: IpRule[];
}

/**
 * Input type for Network specific rules that determine how the Azure AI Search service may be reached.
 */
export interface NetworkRuleSetInput extends InputOf<NetworkRuleSet> {
  /**
   * Possible origins of inbound traffic that can bypass the rules defined in the 'ipRules' section.
   */
  bypass?: ExpressionOrValue<SearchBypass> | undefined;
  /**
   * A list of IP restriction rules that defines the inbound network(s) with allowing access to the search service endpoint. At the meantime, all other public IP networks are blocked by the firewall. These restriction rules are applied only when the 'publicNetworkAccess' of the search service is 'enabled'; otherwise, traffic over public interface is not allowed even with any public IP rules, and private endpoint connections would be the exclusive access method.
   */
  ipRules?: InputArray<IpRuleInput, IpRule[]> | undefined;
}

/**
 * View type for Network specific rules that determine how the Azure AI Search service may be reached.
 */
export type NetworkRuleSetView = NetworkRuleSetInput;

export const networkRuleSetShape: FlatModelShape = createFlatModelShape({
  bypass: { armPath: ["bypass"], value: createUnionShape() },
  ipRules: {
    armPath: ["ipRules"],
    value: createArrayShape(createDeferredShape(() => ipRuleShape)),
  },
});

/**
 * Information about a network security perimeter (NSP)
 */
export interface NetworkSecurityPerimeter {
  /**
   * Fully qualified Azure resource ID of the NSP resource
   */
  id?: string;
  /**
   * Location of the network security perimeter
   */
  location?: string;
  /**
   * Universal unique ID (UUID) of the network security perimeter
   */
  perimeterGuid?: string;
}

/**
 * Input type for Information about a network security perimeter (NSP)
 */
export interface NetworkSecurityPerimeterInput extends InputOf<NetworkSecurityPerimeter> {}

/**
 * View type for Information about a network security perimeter (NSP)
 */
export interface NetworkSecurityPerimeterView extends InputOf<NetworkSecurityPerimeter> {
  /**
   * Read-only output: Fully qualified Azure resource ID of the NSP resource
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: Location of the network security perimeter
   */
  readonly location?: Expression<string> | undefined;
  /**
   * Read-only output: Universal unique ID (UUID) of the network security perimeter
   */
  readonly perimeterGuid?: Expression<string> | undefined;
}

export const networkSecurityPerimeterShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  location: { armPath: ["location"], value: createStringShape(), readOnly: true },
  perimeterGuid: { armPath: ["perimeterGuid"], value: createStringShape(), readOnly: true },
});

/**
 * Network security configuration properties.
 */
export interface NetworkSecurityPerimeterConfigurationProperties {
  /**
   * Information about the network security perimeter (NSP)
   */
  networkSecurityPerimeter?: NetworkSecurityPerimeter;
  /**
   * Network security perimeter configuration profile
   */
  profile?: NetworkSecurityProfile;
  /**
   * List of provisioning issues, if any
   */
  provisioningIssues?: ProvisioningIssue[];
  /**
   * Provisioning state of the network security perimeter configuration
   */
  provisioningState?: NetworkSecurityPerimeterConfigurationProvisioningState;
  /**
   * Information about the resource association
   */
  resourceAssociation?: ResourceAssociation;
}

/**
 * Input type for Network security configuration properties.
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesInput extends InputOf<NetworkSecurityPerimeterConfigurationProperties> {}

/**
 * View type for Network security configuration properties.
 */
export interface NetworkSecurityPerimeterConfigurationPropertiesView extends InputOf<NetworkSecurityPerimeterConfigurationProperties> {
  /**
   * Read-only output: Information about the network security perimeter (NSP)
   */
  readonly networkSecurityPerimeter?: Expression<NetworkSecurityPerimeter> | undefined;
  /**
   * Read-only output: Network security perimeter configuration profile
   */
  readonly profile?: Expression<NetworkSecurityProfile> | undefined;
  /**
   * Read-only output: List of provisioning issues, if any
   */
  readonly provisioningIssues?: Expression<ProvisioningIssue[]> | undefined;
  /**
   * Read-only output: Provisioning state of the network security perimeter configuration
   */
  readonly provisioningState?:
    Expression<NetworkSecurityPerimeterConfigurationProvisioningState> | undefined;
  /**
   * Read-only output: Information about the resource association
   */
  readonly resourceAssociation?: Expression<ResourceAssociation> | undefined;
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
      value: createDeferredShape(() => networkSecurityProfileShape),
      readOnly: true,
    },
    provisioningIssues: {
      armPath: ["provisioningIssues"],
      value: createArrayShape(createDeferredShape(() => provisioningIssueShape)),
      readOnly: true,
    },
    provisioningState: {
      armPath: ["provisioningState"],
      value: createUnionShape(),
      readOnly: true,
    },
    resourceAssociation: {
      armPath: ["resourceAssociation"],
      value: createDeferredShape(() => resourceAssociationShape),
      readOnly: true,
    },
  });

/**
 * Network security perimeter configuration profile
 */
export interface NetworkSecurityProfile {
  /**
   * List of Access Rules
   */
  accessRules?: AccessRule[];
  /**
   * Current access rules version
   */
  accessRulesVersion?: number;
  /**
   * Current diagnostic settings version
   */
  diagnosticSettingsVersion?: number;
  /**
   * List of log categories that are enabled
   */
  enabledLogCategories?: string[];
  /**
   * Name of the profile
   */
  name?: string;
}

/**
 * Input type for Network security perimeter configuration profile
 */
export interface NetworkSecurityProfileInput extends InputOf<NetworkSecurityProfile> {}

/**
 * View type for Network security perimeter configuration profile
 */
export interface NetworkSecurityProfileView extends InputOf<NetworkSecurityProfile> {
  /**
   * Read-only output: List of Access Rules
   */
  readonly accessRules?: Expression<AccessRule[]> | undefined;
  /**
   * Read-only output: Current access rules version
   */
  readonly accessRulesVersion?: Expression<number> | undefined;
  /**
   * Read-only output: Current diagnostic settings version
   */
  readonly diagnosticSettingsVersion?: Expression<number> | undefined;
  /**
   * Read-only output: List of log categories that are enabled
   */
  readonly enabledLogCategories?: Expression<string[]> | undefined;
  /**
   * Read-only output: Name of the profile
   */
  readonly name?: Expression<string> | undefined;
}

export const networkSecurityProfileShape: FlatModelShape = createFlatModelShape({
  accessRules: {
    armPath: ["accessRules"],
    value: createArrayShape(createDeferredShape(() => accessRuleShape)),
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

/**
 * Describes the properties of an existing private endpoint connection to the search service.
 */
export interface PrivateEndpointConnectionProperties {
  /**
   * The group ID of the Azure resource for which the private link service is for.
   */
  groupId?: string;
  /**
   * The private endpoint resource from Microsoft.Network provider.
   */
  privateEndpoint?: PrivateEndpointConnectionPropertiesPrivateEndpoint;
  /**
   * Describes the current state of an existing Azure Private Link service connection to the private endpoint.
   */
  privateLinkServiceConnectionState?: PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionState;
  /**
   * The provisioning state of the private link service connection. Valid values are Updating, Deleting, Failed, Succeeded, Incomplete, or Canceled.
   */
  provisioningState?: PrivateLinkServiceConnectionProvisioningState;
}

/**
 * Input type for Describes the properties of an existing private endpoint connection to the search service.
 */
export interface PrivateEndpointConnectionPropertiesInput extends InputOf<PrivateEndpointConnectionProperties> {
  /**
   * The group ID of the Azure resource for which the private link service is for.
   */
  groupId?: ExpressionOrValue<string> | undefined;
  /**
   * The private endpoint resource from Microsoft.Network provider.
   */
  privateEndpoint?: PrivateEndpointConnectionPropertiesPrivateEndpointInput | undefined;
  /**
   * Describes the current state of an existing Azure Private Link service connection to the private endpoint.
   */
  privateLinkServiceConnectionState?:
    PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionStateInput | undefined;
  /**
   * The provisioning state of the private link service connection. Valid values are Updating, Deleting, Failed, Succeeded, Incomplete, or Canceled.
   */
  provisioningState?: ExpressionOrValue<PrivateLinkServiceConnectionProvisioningState> | undefined;
}

/**
 * View type for Describes the properties of an existing private endpoint connection to the search service.
 */
export type PrivateEndpointConnectionPropertiesView = PrivateEndpointConnectionPropertiesInput;

export const privateEndpointConnectionPropertiesShape: FlatModelShape = createFlatModelShape({
  groupId: { armPath: ["groupId"], value: createStringShape() },
  privateEndpoint: {
    armPath: ["privateEndpoint"],
    value: createDeferredShape(() => privateEndpointConnectionPropertiesPrivateEndpointShape),
  },
  privateLinkServiceConnectionState: {
    armPath: ["privateLinkServiceConnectionState"],
    value: createDeferredShape(
      () => privateEndpointConnectionPropertiesPrivateLinkServiceConnectionStateShape,
    ),
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape() },
});

/**
 * The private endpoint resource from Microsoft.Network provider.
 */
export interface PrivateEndpointConnectionPropertiesPrivateEndpoint {
  /**
   * The resource ID of the private endpoint resource from Microsoft.Network provider.
   */
  id?: string;
}

/**
 * Input type for The private endpoint resource from Microsoft.Network provider.
 */
export interface PrivateEndpointConnectionPropertiesPrivateEndpointInput extends InputOf<PrivateEndpointConnectionPropertiesPrivateEndpoint> {
  /**
   * The resource ID of the private endpoint resource from Microsoft.Network provider.
   */
  id?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The private endpoint resource from Microsoft.Network provider.
 */
export type PrivateEndpointConnectionPropertiesPrivateEndpointView =
  PrivateEndpointConnectionPropertiesPrivateEndpointInput;

export const privateEndpointConnectionPropertiesPrivateEndpointShape: FlatModelShape =
  createFlatModelShape({
    id: { armPath: ["id"], value: createStringShape() },
  });

/**
 * Describes the current state of an existing Azure Private Link service connection to the private endpoint.
 */
export interface PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionState {
  /**
   * A description of any extra actions that may be required.
   */
  actionsRequired?: string;
  /**
   * The description for the private link service connection state.
   */
  description?: string;
  /**
   * Status of the the private link service connection. Valid values are Pending, Approved, Rejected, or Disconnected.
   */
  status?: PrivateLinkServiceConnectionStatus;
}

/**
 * Input type for Describes the current state of an existing Azure Private Link service connection to the private endpoint.
 */
export interface PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionStateInput extends InputOf<PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionState> {
  /**
   * A description of any extra actions that may be required.
   */
  actionsRequired?: ExpressionOrValue<string> | undefined;
  /**
   * The description for the private link service connection state.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Status of the the private link service connection. Valid values are Pending, Approved, Rejected, or Disconnected.
   */
  status?: ExpressionOrValue<PrivateLinkServiceConnectionStatus> | undefined;
}

/**
 * View type for Describes the current state of an existing Azure Private Link service connection to the private endpoint.
 */
export type PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionStateView =
  PrivateEndpointConnectionPropertiesPrivateLinkServiceConnectionStateInput;

export const privateEndpointConnectionPropertiesPrivateLinkServiceConnectionStateShape: FlatModelShape =
  createFlatModelShape({
    actionsRequired: { armPath: ["actionsRequired"], value: createStringShape() },
    description: { armPath: ["description"], value: createStringShape() },
    status: { armPath: ["status"], value: createEnumShape() },
  });

/**
 * Describes a provisioning issue for a network security perimeter configuration
 */
export interface ProvisioningIssue {
  /**
   * Name of the issue
   */
  name?: string;
  /**
   * Details of the provisioning issue
   */
  properties?: ProvisioningIssueProperties;
}

/**
 * Input type for Describes a provisioning issue for a network security perimeter configuration
 */
export interface ProvisioningIssueInput extends InputOf<ProvisioningIssue> {}

/**
 * View type for Describes a provisioning issue for a network security perimeter configuration
 */
export interface ProvisioningIssueView extends InputOf<ProvisioningIssue> {
  /**
   * Read-only output: Name of the issue
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Read-only output: Details of the provisioning issue
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
 * Details of a provisioning issue for a network security perimeter (NSP) configuration. Resource providers should generate separate provisioning issue elements for each separate issue detected, and include a meaningful and distinctive description, as well as any appropriate suggestedResourceIds and suggestedAccessRules
 */
export interface ProvisioningIssueProperties {
  /**
   * Description of the issue
   */
  description?: string;
  /**
   * Type of issue
   */
  issueType?: IssueType;
  /**
   * Severity of the issue.
   */
  severity?: Severity;
  /**
   * Access rules that can be added to the network security profile (NSP) to remediate the issue.
   */
  suggestedAccessRules?: AccessRule[];
  /**
   * Fully qualified resource IDs of suggested resources that can be associated to the network security perimeter (NSP) to remediate the issue.
   */
  suggestedResourceIds?: string[];
}

/**
 * Input type for Details of a provisioning issue for a network security perimeter (NSP) configuration. Resource providers should generate separate provisioning issue elements for each separate issue detected, and include a meaningful and distinctive description, as well as any appropriate suggestedResourceIds and suggestedAccessRules
 */
export interface ProvisioningIssuePropertiesInput extends InputOf<ProvisioningIssueProperties> {}

/**
 * View type for Details of a provisioning issue for a network security perimeter (NSP) configuration. Resource providers should generate separate provisioning issue elements for each separate issue detected, and include a meaningful and distinctive description, as well as any appropriate suggestedResourceIds and suggestedAccessRules
 */
export interface ProvisioningIssuePropertiesView extends InputOf<ProvisioningIssueProperties> {
  /**
   * Read-only output: Description of the issue
   */
  readonly description?: Expression<string> | undefined;
  /**
   * Read-only output: Type of issue
   */
  readonly issueType?: Expression<IssueType> | undefined;
  /**
   * Read-only output: Severity of the issue.
   */
  readonly severity?: Expression<Severity> | undefined;
  /**
   * Read-only output: Access rules that can be added to the network security profile (NSP) to remediate the issue.
   */
  readonly suggestedAccessRules?: Expression<AccessRule[]> | undefined;
  /**
   * Read-only output: Fully qualified resource IDs of suggested resources that can be associated to the network security perimeter (NSP) to remediate the issue.
   */
  readonly suggestedResourceIds?: Expression<string[]> | undefined;
}

export const provisioningIssuePropertiesShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape(), readOnly: true },
  issueType: { armPath: ["issueType"], value: createUnionShape(), readOnly: true },
  severity: { armPath: ["severity"], value: createUnionShape(), readOnly: true },
  suggestedAccessRules: {
    armPath: ["suggestedAccessRules"],
    value: createArrayShape(createDeferredShape(() => accessRuleShape)),
    readOnly: true,
  },
  suggestedResourceIds: {
    armPath: ["suggestedResourceIds"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
});

/**
 * Information about resource association
 */
export interface ResourceAssociation {
  /**
   * Access mode of the resource association
   */
  accessMode?: ResourceAssociationAccessMode;
  /**
   * Name of the resource association
   */
  name?: string;
}

/**
 * Input type for Information about resource association
 */
export interface ResourceAssociationInput extends InputOf<ResourceAssociation> {}

/**
 * View type for Information about resource association
 */
export interface ResourceAssociationView extends InputOf<ResourceAssociation> {
  /**
   * Read-only output: Access mode of the resource association
   */
  readonly accessMode?: Expression<ResourceAssociationAccessMode> | undefined;
  /**
   * Read-only output: Name of the resource association
   */
  readonly name?: Expression<string> | undefined;
}

export const resourceAssociationShape: FlatModelShape = createFlatModelShape({
  accessMode: { armPath: ["accessMode"], value: createUnionShape(), readOnly: true },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
});

/**
 * Describes an existing private endpoint connection to the Azure AI Search service.
 */
export interface SearchPrivateEndpointConnection {
  /**
   * Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  id?: string;
  /**
   * The name of the private endpoint connection to the Azure AI Search service with the specified resource group.
   */
  name?: string;
  /**
   * Describes the properties of an existing private endpoint connection to the Azure AI Search service.
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
 * Input type for Describes an existing private endpoint connection to the Azure AI Search service.
 */
export interface SearchPrivateEndpointConnectionInput extends InputOf<SearchPrivateEndpointConnection> {
  /**
   * Describes the properties of an existing private endpoint connection to the Azure AI Search service.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * View type for Describes an existing private endpoint connection to the Azure AI Search service.
 */
export interface SearchPrivateEndpointConnectionView extends InputOf<SearchPrivateEndpointConnection> {
  /**
   * Read-only output: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: The name of the private endpoint connection to the Azure AI Search service with the specified resource group.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Describes the properties of an existing private endpoint connection to the Azure AI Search service.
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

export const searchPrivateEndpointConnectionShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
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
});

/**
 * Properties of the search service.
 */
export interface SearchServiceProperties {
  /**
   * Defines the options for how the data plane API of a search service authenticates requests. This cannot be set if 'disableLocalAuth' is set to true.
   */
  authOptions?: DataPlaneAuthOptions;
  /**
   * Configure this property to support the search service using either the Default Compute or Azure Confidential Compute.
   */
  computeType?: ComputeType;
  /**
   * A list of data exfiltration scenarios that are explicitly disallowed for the search service. Currently, the only supported value is 'All' to disable all possible data export scenarios with more fine grained controls planned for the future.
   */
  dataExfiltrationProtections?: SearchDataExfiltrationProtection[];
  /**
   * When set to true, calls to the search service will not be permitted to utilize API keys for authentication. This cannot be set to true if 'dataPlaneAuthOptions' are defined.
   */
  disableLocalAuth?: boolean | null;
  /**
   * Specifies any policy regarding encryption of resources (such as indexes) using customer manager keys within a search service.
   */
  encryptionWithCmk?: EncryptionWithCmk;
  /**
   * The endpoint of the Azure AI Search service.
   */
  endpoint?: string;
  /**
   * A system generated property representing the service's etag that can be for optimistic concurrency control during updates.
   */
  eTag?: string;
  /**
   * Applicable only for the standard3 SKU. You can set this property to enable up to 3 high density partitions that allow up to 1000 indexes, which is much higher than the maximum indexes allowed for any other SKU. For the standard3 SKU, the value is either 'Default' or 'HighDensity'. For all other SKUs, this value must be 'Default'.
   */
  hostingMode?: HostingMode;
  /**
   * Network specific rules that determine how the Azure AI Search service may be reached.
   */
  networkRuleSet?: NetworkRuleSet;
  /**
   * The number of partitions in the dedicated search service; if specified, it can be 1, 2, 3, 4, 6, or 12. Values greater than 1 are only valid for standard SKUs. For 'standard3' services with hostingMode set to 'highDensity', the allowed values are between 1 and 3.
   */
  partitionCount?: number;
  /**
   * The list of private endpoint connections to the Azure AI Search service.
   */
  privateEndpointConnections?: SearchPrivateEndpointConnection[];
  /**
   * The state of the last provisioning operation performed on the search service. Provisioning is an intermediate state that occurs while service capacity is being established. After capacity is set up, provisioningState changes to either 'Succeeded' or 'Failed'. Client applications can poll provisioning status (the recommended polling interval is from 30 seconds to one minute) by using the Get Search Service operation to see when an operation is completed. If you are using the free service, this value tends to come back as 'Succeeded' directly in the call to Create search service. This is because the free service uses capacity that is already set up.
   */
  provisioningState?: ProvisioningState;
  /**
   * This value can be set to 'Enabled' to avoid breaking changes on existing customer resources and templates. If set to 'Disabled', traffic over public interface is not allowed, and private endpoint connections would be the exclusive access method.
   */
  publicNetworkAccess?: PublicNetworkAccess;
  /**
   * The number of replicas in the dedicated search service. If specified, it must be a value between 1 and 12 inclusive for standard SKUs or between 1 and 3 inclusive for basic SKU.
   */
  replicaCount?: number;
  /**
   * Specifies the availability and billing plan for semantic search on the Azure AI Search service. This configuration is only available for certain pricing tiers in certain regions.
   */
  semanticSearch?: SearchSemanticSearch | null;
  /**
   * The date and time the search service was last upgraded. This field will be null until the service gets upgraded for the first time.
   */
  serviceUpgradedAt?: Date;
  /**
   * The list of shared private link resources managed by the Azure AI Search service.
   */
  sharedPrivateLinkResources?: SearchSharedPrivateLinkResource[];
  /**
   * The status of the search service. Possible values include: 'running': The search service is running and no provisioning operations are underway. 'provisioning': The search service is being provisioned or scaled up or down. 'deleting': The search service is being deleted. 'degraded': The search service is degraded. This can occur when the underlying search units are not healthy. The search service is most likely operational, but performance might be slow and some requests might be dropped. 'disabled': The search service is disabled. In this state, the service will reject all API requests. 'error': The search service is in an error state. 'stopped': The search service is in a subscription that's disabled. If your service is in the degraded, disabled, or error states, it means the Azure AI Search team is actively investigating the underlying issue. Dedicated services in these states are still chargeable based on the number of search units provisioned.
   */
  status?: SearchServiceStatus;
  /**
   * The details of the search service status.
   */
  statusDetails?: string;
  /**
   * Indicates if the search service has an upgrade available.
   */
  upgradeAvailable?: UpgradeAvailable;
}

/**
 * Input type for Properties of the search service.
 */
export interface SearchServicePropertiesInput extends InputOf<SearchServiceProperties> {
  /**
   * Defines the options for how the data plane API of a search service authenticates requests. This cannot be set if 'disableLocalAuth' is set to true.
   */
  authOptions?: DataPlaneAuthOptionsInput | undefined;
  /**
   * Configure this property to support the search service using either the Default Compute or Azure Confidential Compute.
   */
  computeType?: ExpressionOrValue<ComputeType> | undefined;
  /**
   * A list of data exfiltration scenarios that are explicitly disallowed for the search service. Currently, the only supported value is 'All' to disable all possible data export scenarios with more fine grained controls planned for the future.
   */
  dataExfiltrationProtections?:
    | InputArray<
        ExpressionOrValue<SearchDataExfiltrationProtection>,
        SearchDataExfiltrationProtection[]
      >
    | undefined;
  /**
   * When set to true, calls to the search service will not be permitted to utilize API keys for authentication. This cannot be set to true if 'dataPlaneAuthOptions' are defined.
   */
  disableLocalAuth?: ExpressionOrValue<boolean | null> | undefined;
  /**
   * Specifies any policy regarding encryption of resources (such as indexes) using customer manager keys within a search service.
   */
  encryptionWithCmk?: EncryptionWithCmkInput | undefined;
  /**
   * The endpoint of the Azure AI Search service.
   */
  endpoint?: ExpressionOrValue<string> | undefined;
  /**
   * Applicable only for the standard3 SKU. You can set this property to enable up to 3 high density partitions that allow up to 1000 indexes, which is much higher than the maximum indexes allowed for any other SKU. For the standard3 SKU, the value is either 'Default' or 'HighDensity'. For all other SKUs, this value must be 'Default'.
   */
  hostingMode?: ExpressionOrValue<HostingMode> | undefined;
  /**
   * Network specific rules that determine how the Azure AI Search service may be reached.
   */
  networkRuleSet?: NetworkRuleSetInput | undefined;
  /**
   * The number of partitions in the dedicated search service; if specified, it can be 1, 2, 3, 4, 6, or 12. Values greater than 1 are only valid for standard SKUs. For 'standard3' services with hostingMode set to 'highDensity', the allowed values are between 1 and 3.
   */
  partitionCount?: ExpressionOrValue<number> | undefined;
  /**
   * This value can be set to 'Enabled' to avoid breaking changes on existing customer resources and templates. If set to 'Disabled', traffic over public interface is not allowed, and private endpoint connections would be the exclusive access method.
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  /**
   * The number of replicas in the dedicated search service. If specified, it must be a value between 1 and 12 inclusive for standard SKUs or between 1 and 3 inclusive for basic SKU.
   */
  replicaCount?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the availability and billing plan for semantic search on the Azure AI Search service. This configuration is only available for certain pricing tiers in certain regions.
   */
  semanticSearch?: ExpressionOrValue<SearchSemanticSearch | null> | undefined;
  /**
   * Indicates if the search service has an upgrade available.
   */
  upgradeAvailable?: ExpressionOrValue<UpgradeAvailable> | undefined;
}

/**
 * View type for Properties of the search service.
 */
export interface SearchServicePropertiesView extends InputOf<SearchServiceProperties> {
  /**
   * Defines the options for how the data plane API of a search service authenticates requests. This cannot be set if 'disableLocalAuth' is set to true.
   */
  authOptions?: DataPlaneAuthOptionsView | undefined;
  /**
   * Configure this property to support the search service using either the Default Compute or Azure Confidential Compute.
   */
  computeType?: ExpressionOrValue<ComputeType> | undefined;
  /**
   * A list of data exfiltration scenarios that are explicitly disallowed for the search service. Currently, the only supported value is 'All' to disable all possible data export scenarios with more fine grained controls planned for the future.
   */
  dataExfiltrationProtections?:
    | InputArray<
        ExpressionOrValue<SearchDataExfiltrationProtection>,
        SearchDataExfiltrationProtection[]
      >
    | undefined;
  /**
   * When set to true, calls to the search service will not be permitted to utilize API keys for authentication. This cannot be set to true if 'dataPlaneAuthOptions' are defined.
   */
  disableLocalAuth?: ExpressionOrValue<boolean | null> | undefined;
  /**
   * Specifies any policy regarding encryption of resources (such as indexes) using customer manager keys within a search service.
   */
  encryptionWithCmk?: EncryptionWithCmkView | undefined;
  /**
   * The endpoint of the Azure AI Search service.
   */
  endpoint?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: A system generated property representing the service's etag that can be for optimistic concurrency control during updates.
   */
  readonly eTag?: Expression<string> | undefined;
  /**
   * Applicable only for the standard3 SKU. You can set this property to enable up to 3 high density partitions that allow up to 1000 indexes, which is much higher than the maximum indexes allowed for any other SKU. For the standard3 SKU, the value is either 'Default' or 'HighDensity'. For all other SKUs, this value must be 'Default'.
   */
  hostingMode?: ExpressionOrValue<HostingMode> | undefined;
  /**
   * Network specific rules that determine how the Azure AI Search service may be reached.
   */
  networkRuleSet?: NetworkRuleSetView | undefined;
  /**
   * The number of partitions in the dedicated search service; if specified, it can be 1, 2, 3, 4, 6, or 12. Values greater than 1 are only valid for standard SKUs. For 'standard3' services with hostingMode set to 'highDensity', the allowed values are between 1 and 3.
   */
  partitionCount?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: The list of private endpoint connections to the Azure AI Search service.
   */
  readonly privateEndpointConnections?: Expression<SearchPrivateEndpointConnection[]> | undefined;
  /**
   * Read-only output: The state of the last provisioning operation performed on the search service. Provisioning is an intermediate state that occurs while service capacity is being established. After capacity is set up, provisioningState changes to either 'Succeeded' or 'Failed'. Client applications can poll provisioning status (the recommended polling interval is from 30 seconds to one minute) by using the Get Search Service operation to see when an operation is completed. If you are using the free service, this value tends to come back as 'Succeeded' directly in the call to Create search service. This is because the free service uses capacity that is already set up.
   */
  readonly provisioningState?: Expression<ProvisioningState> | undefined;
  /**
   * This value can be set to 'Enabled' to avoid breaking changes on existing customer resources and templates. If set to 'Disabled', traffic over public interface is not allowed, and private endpoint connections would be the exclusive access method.
   */
  publicNetworkAccess?: ExpressionOrValue<PublicNetworkAccess> | undefined;
  /**
   * The number of replicas in the dedicated search service. If specified, it must be a value between 1 and 12 inclusive for standard SKUs or between 1 and 3 inclusive for basic SKU.
   */
  replicaCount?: ExpressionOrValue<number> | undefined;
  /**
   * Specifies the availability and billing plan for semantic search on the Azure AI Search service. This configuration is only available for certain pricing tiers in certain regions.
   */
  semanticSearch?: ExpressionOrValue<SearchSemanticSearch | null> | undefined;
  /**
   * Read-only output: The date and time the search service was last upgraded. This field will be null until the service gets upgraded for the first time.
   */
  readonly serviceUpgradedAt?: Expression<Date> | undefined;
  /**
   * Read-only output: The list of shared private link resources managed by the Azure AI Search service.
   */
  readonly sharedPrivateLinkResources?: Expression<SearchSharedPrivateLinkResource[]> | undefined;
  /**
   * Read-only output: The status of the search service. Possible values include: 'running': The search service is running and no provisioning operations are underway. 'provisioning': The search service is being provisioned or scaled up or down. 'deleting': The search service is being deleted. 'degraded': The search service is degraded. This can occur when the underlying search units are not healthy. The search service is most likely operational, but performance might be slow and some requests might be dropped. 'disabled': The search service is disabled. In this state, the service will reject all API requests. 'error': The search service is in an error state. 'stopped': The search service is in a subscription that's disabled. If your service is in the degraded, disabled, or error states, it means the Azure AI Search team is actively investigating the underlying issue. Dedicated services in these states are still chargeable based on the number of search units provisioned.
   */
  readonly status?: Expression<SearchServiceStatus> | undefined;
  /**
   * Read-only output: The details of the search service status.
   */
  readonly statusDetails?: Expression<string> | undefined;
  /**
   * Indicates if the search service has an upgrade available.
   */
  upgradeAvailable?: ExpressionOrValue<UpgradeAvailable> | undefined;
}

export const searchServicePropertiesShape: FlatModelShape = createFlatModelShape({
  authOptions: {
    armPath: ["authOptions"],
    value: createDeferredShape(() => dataPlaneAuthOptionsShape),
  },
  computeType: { armPath: ["computeType"], value: createUnionShape() },
  dataExfiltrationProtections: {
    armPath: ["dataExfiltrationProtections"],
    value: createArrayShape(createUnionShape()),
  },
  disableLocalAuth: { armPath: ["disableLocalAuth"], value: createBooleanShape() },
  encryptionWithCmk: {
    armPath: ["encryptionWithCmk"],
    value: createDeferredShape(() => encryptionWithCmkShape),
  },
  endpoint: { armPath: ["endpoint"], value: createStringShape() },
  eTag: { armPath: ["eTag"], value: createStringShape(), readOnly: true },
  hostingMode: { armPath: ["hostingMode"], value: createEnumShape() },
  networkRuleSet: {
    armPath: ["networkRuleSet"],
    value: createDeferredShape(() => networkRuleSetShape),
  },
  partitionCount: { armPath: ["partitionCount"], value: createNumberShape() },
  privateEndpointConnections: {
    armPath: ["privateEndpointConnections"],
    value: createArrayShape(createDeferredShape(() => searchPrivateEndpointConnectionShape)),
    readOnly: true,
  },
  provisioningState: { armPath: ["provisioningState"], value: createEnumShape(), readOnly: true },
  publicNetworkAccess: { armPath: ["publicNetworkAccess"], value: createUnionShape() },
  replicaCount: { armPath: ["replicaCount"], value: createNumberShape() },
  semanticSearch: { armPath: ["semanticSearch"], value: createUnionShape() },
  serviceUpgradedAt: {
    armPath: ["serviceUpgradedAt"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  sharedPrivateLinkResources: {
    armPath: ["sharedPrivateLinkResources"],
    value: createArrayShape(createDeferredShape(() => searchSharedPrivateLinkResourceShape)),
    readOnly: true,
  },
  status: { armPath: ["status"], value: createEnumShape(), readOnly: true },
  statusDetails: { armPath: ["statusDetails"], value: createStringShape(), readOnly: true },
  upgradeAvailable: { armPath: ["upgradeAvailable"], value: createUnionShape() },
});

/**
 * Describes a shared private link resource managed by the Azure AI Search service.
 */
export interface SearchSharedPrivateLinkResource {
  /**
   * Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  id?: string;
  /**
   * The name of the shared private link resource managed by the Azure AI Search service within the specified resource group.
   */
  name?: string;
  /**
   * Describes the properties of a shared private link resource managed by the Azure AI Search service.
   */
  properties?: SharedPrivateLinkResourceProperties;
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
 * Input type for Describes a shared private link resource managed by the Azure AI Search service.
 */
export interface SearchSharedPrivateLinkResourceInput extends InputOf<SearchSharedPrivateLinkResource> {
  /**
   * Describes the properties of a shared private link resource managed by the Azure AI Search service.
   */
  properties?: SharedPrivateLinkResourcePropertiesInput | undefined;
}

/**
 * View type for Describes a shared private link resource managed by the Azure AI Search service.
 */
export interface SearchSharedPrivateLinkResourceView extends InputOf<SearchSharedPrivateLinkResource> {
  /**
   * Read-only output: Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Read-only output: The name of the shared private link resource managed by the Azure AI Search service within the specified resource group.
   */
  readonly name?: Expression<string> | undefined;
  /**
   * Describes the properties of a shared private link resource managed by the Azure AI Search service.
   */
  properties?: SharedPrivateLinkResourcePropertiesView | undefined;
  /**
   * Read-only output: Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  readonly systemData?: Expression<SystemData> | undefined;
  /**
   * Read-only output: The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  readonly type?: Expression<string> | undefined;
}

export const searchSharedPrivateLinkResourceShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  name: { armPath: ["name"], value: createStringShape(), readOnly: true },
  properties: {
    armPath: ["properties"],
    value: createDeferredShape(() => sharedPrivateLinkResourcePropertiesShape),
  },
  systemData: {
    armPath: ["systemData"],
    value: createDeferredShape(() => systemDataShape),
    readOnly: true,
  },
  type: { armPath: ["type"], value: createStringShape(), readOnly: true },
});

/**
 * Describes the properties of an existing shared private link resource managed by the Azure AI Search service.
 */
export interface SharedPrivateLinkResourceProperties {
  /**
   * The group ID from the provider of resource the shared private link resource is for.
   */
  groupId?: string;
  /**
   * The resource ID of the resource the shared private link resource is for.
   */
  privateLinkResourceId?: string;
  /**
   * The provisioning state of the shared private link resource. Valid values are Updating, Deleting, Failed, Succeeded or Incomplete.
   */
  provisioningState?: SharedPrivateLinkResourceProvisioningState;
  /**
   * The message for requesting approval of the shared private link resource.
   */
  requestMessage?: string;
  /**
   * Optional. Can be used to specify the Azure Resource Manager location of the resource for which a shared private link is being created. This is only required for those resources whose DNS configuration are regional (such as Azure Kubernetes Service).
   */
  resourceRegion?: string;
  /**
   * Status of the shared private link resource. Valid values are Pending, Approved, Rejected or Disconnected.
   */
  status?: SharedPrivateLinkResourceStatus;
}

/**
 * Input type for Describes the properties of an existing shared private link resource managed by the Azure AI Search service.
 */
export interface SharedPrivateLinkResourcePropertiesInput extends InputOf<SharedPrivateLinkResourceProperties> {
  /**
   * The group ID from the provider of resource the shared private link resource is for.
   */
  groupId?: ExpressionOrValue<string> | undefined;
  /**
   * The resource ID of the resource the shared private link resource is for.
   */
  privateLinkResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * The provisioning state of the shared private link resource. Valid values are Updating, Deleting, Failed, Succeeded or Incomplete.
   */
  provisioningState?: ExpressionOrValue<SharedPrivateLinkResourceProvisioningState> | undefined;
  /**
   * The message for requesting approval of the shared private link resource.
   */
  requestMessage?: ExpressionOrValue<string> | undefined;
  /**
   * Optional. Can be used to specify the Azure Resource Manager location of the resource for which a shared private link is being created. This is only required for those resources whose DNS configuration are regional (such as Azure Kubernetes Service).
   */
  resourceRegion?: ExpressionOrValue<string> | undefined;
  /**
   * Status of the shared private link resource. Valid values are Pending, Approved, Rejected or Disconnected.
   */
  status?: ExpressionOrValue<SharedPrivateLinkResourceStatus> | undefined;
}

/**
 * View type for Describes the properties of an existing shared private link resource managed by the Azure AI Search service.
 */
export type SharedPrivateLinkResourcePropertiesView = SharedPrivateLinkResourcePropertiesInput;

export const sharedPrivateLinkResourcePropertiesShape: FlatModelShape = createFlatModelShape({
  groupId: { armPath: ["groupId"], value: createStringShape() },
  privateLinkResourceId: { armPath: ["privateLinkResourceId"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape() },
  requestMessage: { armPath: ["requestMessage"], value: createStringShape() },
  resourceRegion: { armPath: ["resourceRegion"], value: createStringShape() },
  status: { armPath: ["status"], value: createUnionShape() },
});

/**
 * Defines the SKU of a search service, which determines billing rate and capacity limits.
 */
export interface Sku {
  /**
   * The SKU of the search service. Valid values include: 'free': Shared service. 'basic': Dedicated service with up to 3 replicas. 'standard': Dedicated service with up to 12 partitions and 12 replicas. 'standard2': Similar to standard, but with more capacity per search unit. 'standard3': The largest Standard offering with up to 12 partitions and 12 replicas (or up to 3 partitions with more indexes if you also set the hostingMode property to 'highDensity'). 'storage_optimized_l1': Supports 1TB per partition, up to 12 partitions. 'storage_optimized_l2': Supports 2TB per partition, up to 12 partitions. 'serverless': Serverless tier with auto-scaling capabilities.
   */
  name?: SkuName;
}

/**
 * Input type for Defines the SKU of a search service, which determines billing rate and capacity limits.
 */
export interface SkuInput extends InputOf<Sku> {
  /**
   * The SKU of the search service. Valid values include: 'free': Shared service. 'basic': Dedicated service with up to 3 replicas. 'standard': Dedicated service with up to 12 partitions and 12 replicas. 'standard2': Similar to standard, but with more capacity per search unit. 'standard3': The largest Standard offering with up to 12 partitions and 12 replicas (or up to 3 partitions with more indexes if you also set the hostingMode property to 'highDensity'). 'storage_optimized_l1': Supports 1TB per partition, up to 12 partitions. 'storage_optimized_l2': Supports 2TB per partition, up to 12 partitions. 'serverless': Serverless tier with auto-scaling capabilities.
   */
  name?: ExpressionOrValue<SkuName> | undefined;
}

/**
 * View type for Defines the SKU of a search service, which determines billing rate and capacity limits.
 */
export type SkuView = SkuInput;

export const skuShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createUnionShape() },
});

export interface Subscriptions {
  /**
   * The fully qualified Azure resource ID of the subscription e.g. ('/subscriptions/00000000-0000-0000-0000-000000000000')
   */
  id?: string;
}

export interface SubscriptionsInput extends InputOf<Subscriptions> {}

export interface SubscriptionsView extends InputOf<Subscriptions> {
  /**
   * Read-only output: The fully qualified Azure resource ID of the subscription e.g. ('/subscriptions/00000000-0000-0000-0000-000000000000')
   */
  readonly id?: Expression<string> | undefined;
}

export const subscriptionsShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
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

/**
 * User assigned identity properties
 */
export interface UserAssignedIdentity {
  /**
   * The client ID of the assigned identity.
   */
  clientId?: string;
  /**
   * The principal ID of the assigned identity.
   */
  principalId?: string;
}

/**
 * Input type for User assigned identity properties
 */
export interface UserAssignedIdentityInput extends InputOf<UserAssignedIdentity> {}

/**
 * View type for User assigned identity properties
 */
export interface UserAssignedIdentityView extends InputOf<UserAssignedIdentity> {
  /**
   * Read-only output: The client ID of the assigned identity.
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: The principal ID of the assigned identity.
   */
  readonly principalId?: Expression<string> | undefined;
}

export const userAssignedIdentityShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape(), readOnly: true },
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
});

/**
 * Direction of Access Rule
 *
 * Known values:
 *
 * - `"Inbound"`: Applies to inbound network traffic to the secured resources.
 *
 * - `"Outbound"`: Applies to outbound network traffic from the secured resources
 */
export type AccessRuleDirection = string;

/**
 * Configure this property to support the search service using either the Default Compute or Azure Confidential Compute.
 *
 * Known values:
 *
 * - `"Default"`: Create the service with the Default Compute.
 *
 * - `"Confidential"`: Create the dedicated service with Azure Confidential Compute.
 */
export type ComputeType = string;

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
 * The type of identity used for the resource. The type 'SystemAssigned, UserAssigned' includes both an identity created by the system and a set of user assigned identities. The type 'None' will remove all identities from the service.
 *
 * Known values:
 *
 * - `"None"`: Indicates that any identity associated with the search service needs to be removed.
 *
 * - `"SystemAssigned"`: Indicates that system-assigned identity for the search service will be enabled.
 *
 * - `"UserAssigned"`: Indicates that one or more user assigned identities will be assigned to the search service.
 *
 * - `"SystemAssigned, UserAssigned"`: Indicates that system-assigned identity for the search service will be enabled along with the assignment of one or more user assigned identities.
 */
export type IdentityType = string;

/**
 * Type of issue
 *
 * Known values:
 *
 * - `"Unknown"`: Unknown issue type
 *
 * - `"ConfigurationPropagationFailure"`: An error occurred while applying the network security perimeter (NSP) configuration.
 *
 * - `"MissingPerimeterConfiguration"`: A network connectivity issue is happening on the resource which could be addressed either by adding new resources to the network security perimeter (NSP) or by modifying access rules.
 *
 * - `"MissingIdentityConfiguration"`: An managed identity hasn't been associated with the resource. The resource will still be able to validate inbound traffic from the network security perimeter (NSP) or matching inbound access rules, but it won't be able to perform outbound access as a member of the NSP.
 */
export type IssueType = string;

/**
 * Provisioning state of a network security perimeter configuration that is being created or updated.
 *
 * Known values:
 *
 * - `"Succeeded"`: The configuration was provisioned successfully.
 *
 * - `"Creating"`: The configuration is being created.
 *
 * - `"Updating"`: The configuration is being updated.
 *
 * - `"Deleting"`: The configuration is being deleted.
 *
 * - `"Accepted"`: The configuration request was accepted and provisioning has not started yet.
 *
 * - `"Failed"`: The configuration failed to provision.
 *
 * - `"Canceled"`: The configuration provisioning was canceled.
 */
export type NetworkSecurityPerimeterConfigurationProvisioningState = string;

/**
 * The provisioning state of the private link service connection. Valid values are Updating, Deleting, Failed, Succeeded, Incomplete, or Canceled.
 *
 * Known values:
 *
 * - `"Updating"`: The private link service connection is in the process of being created along with other resources for it to be fully functional.
 *
 * - `"Deleting"`: The private link service connection is in the process of being deleted.
 *
 * - `"Failed"`: The private link service connection has failed to be provisioned or deleted.
 *
 * - `"Succeeded"`: The private link service connection has finished provisioning and is ready for approval.
 *
 * - `"Incomplete"`: Provisioning request for the private link service connection resource has been accepted but the process of creation has not commenced yet.
 *
 * - `"Canceled"`: Provisioning request for the private link service connection resource has been canceled.
 */
export type PrivateLinkServiceConnectionProvisioningState = string;

/**
 * This value can be set to 'Enabled' to avoid breaking changes on existing customer resources and templates. If set to 'Disabled', traffic over public interface is not allowed, and private endpoint connections would be the exclusive access method.
 *
 * Known values:
 *
 * - `"Enabled"`: The search service is accessible from traffic originating from the public internet.
 *
 * - `"Disabled"`: The search service is not accessible from traffic originating from the public internet. Access is only permitted over approved private endpoint connections.
 *
 * - `"SecuredByPerimeter"`: The network security perimeter configuration rules allow or disallow public network access to the resource. Requires an associated network security perimeter.
 */
export type PublicNetworkAccess = string;

/**
 * Access mode of the resource association
 *
 * Known values:
 *
 * - `"Enforced"`: Enforced access mode - traffic to the resource that failed access checks is blocked
 *
 * - `"Learning"`: Learning access mode - traffic to the resource is enabled for analysis but not blocked
 *
 * - `"Audit"`: Audit access mode - traffic to the resource that fails access checks is logged but not blocked
 */
export type ResourceAssociationAccessMode = string;

/**
 * Possible origins of inbound traffic that can bypass the rules defined in the 'ipRules' section.
 *
 * Known values:
 *
 * - `"None"`: Indicates that no origin can bypass the rules defined in the 'ipRules' section. This is the default.
 *
 * - `"AzureServices"`: Indicates that requests originating from Azure trusted services can bypass the rules defined in the 'ipRules' section.
 */
export type SearchBypass = string;

/**
 * A specific data exfiltration scenario that is disabled for the service.
 *
 * Known values:
 *
 * - `"BlockAll"`: Indicates that all data exfiltration scenarios are disabled.
 */
export type SearchDataExfiltrationProtection = string;

/**
 * Specifies the availability and billing plan for semantic search on the Azure AI Search service. This configuration is only available for certain pricing tiers in certain regions.
 *
 * Known values:
 *
 * - `"disabled"`: Indicates that semantic reranker is disabled for the search service.
 *
 * - `"free"`: Enables semantic reranker on a search service and indicates that it is to be used within the limits of the free plan. The free plan would cap the volume of semantic ranking requests and is offered at no extra charge. This is the default for newly provisioned search services. This is the default.
 *
 * - `"standard"`: Enables semantic reranker on a search service as a billable feature after the free quota is exhausted, with higher throughput and volume of semantically reranked queries.
 */
export type SearchSemanticSearch = string;

/**
 * Severity of the issue.
 *
 * Known values:
 *
 * - `"Warning"`: The issue is a warning and does not prevent the configuration from being applied.
 *
 * - `"Error"`: The issue is an error and prevents the configuration from being applied.
 */
export type Severity = string;

/**
 * The provisioning state of the shared private link resource. Valid values are Updating, Deleting, Failed, Succeeded or Incomplete.
 *
 * Known values:
 *
 * - `"Updating"`: The shared private link resource is in the process of being created along with other resources for it to be fully functional.
 *
 * - `"Deleting"`: The shared private link resource is in the process of being deleted.
 *
 * - `"Failed"`: The shared private link resource has failed to be provisioned or deleted.
 *
 * - `"Succeeded"`: The shared private link resource has finished provisioning and is ready for approval.
 *
 * - `"Incomplete"`: Provisioning request for the shared private link resource has been accepted but the process of creation has not commenced yet.
 */
export type SharedPrivateLinkResourceProvisioningState = string;

/**
 * Status of the shared private link resource. Valid values are Pending, Approved, Rejected or Disconnected.
 *
 * Known values:
 *
 * - `"Pending"`: The shared private link resource has been created and is pending approval.
 *
 * - `"Approved"`: The shared private link resource is approved and is ready for use.
 *
 * - `"Rejected"`: The shared private link resource has been rejected and cannot be used.
 *
 * - `"Disconnected"`: The shared private link resource has been removed from the service.
 */
export type SharedPrivateLinkResourceStatus = string;

/**
 * The SKU of the search service. Valid values include: 'free': Shared service. 'basic': Dedicated service with up to 3 replicas. 'standard': Dedicated service with up to 12 partitions and 12 replicas. 'standard2': Similar to standard, but with more capacity per search unit. 'standard3': The largest Standard offering with up to 12 partitions and 12 replicas (or up to 3 partitions with more indexes if you also set the hostingMode property to 'highDensity'). 'storage_optimized_l1': Supports 1TB per partition, up to 12 partitions. 'storage_optimized_l2': Supports 2TB per partition, up to 12 partitions. 'serverless': Serverless tier with auto-scaling capabilities.
 *
 * Known values:
 *
 * - `"free"`: Free tier, with no SLA guarantees and a subset of the features offered on billable tiers.
 *
 * - `"basic"`: Billable tier for a dedicated service having up to 3 replicas.
 *
 * - `"standard"`: Billable tier for a dedicated service having up to 12 partitions and 12 replicas.
 *
 * - `"standard2"`: Similar to 'standard', but with more capacity per search unit.
 *
 * - `"standard3"`: The largest Standard offering with up to 12 partitions and 12 replicas (or up to 3 partitions with more indexes if you also set the hostingMode property to 'highDensity').
 *
 * - `"storage_optimized_l1"`: Billable tier for a dedicated service that supports 1TB per partition, up to 12 partitions.
 *
 * - `"storage_optimized_l2"`: Billable tier for a dedicated service that supports 2TB per partition, up to 12 partitions.
 */
export type SkuName = string;

/**
 * Indicates if the dedicated search service has an upgrade available.
 *
 * Known values:
 *
 * - `"notAvailable"`: An upgrade is currently not available for the dedicated service.
 *
 * - `"available"`: There is an upgrade available for the dedicated service.
 */
export type UpgradeAvailable = string;

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
 * Linked storage accounts type.
 */
export type DataSourceType = "CustomLogs" | "AzureWatson" | "Query" | "Ingestion" | "Alerts";

/**
 * Type of managed service identity.
 */
export type IdentityType = "SystemAssigned" | "UserAssigned" | "None";

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
 * The list of Log Analytics workspaces associated with the cluster.
 */
export interface AssociatedWorkspace {
  /**
   * The time of workspace association.
   */
  associateDate?: Date;
  /**
   * Associated workspace arm resource id, in the form of: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}.
   */
  resourceId?: string;
  /**
   * Associated workspace immutable id.
   */
  workspaceId?: string;
  /**
   * Associated workspace resource name.
   */
  workspaceName?: string;
}

/**
 * Input type for The list of Log Analytics workspaces associated with the cluster.
 */
export interface AssociatedWorkspaceInput extends InputOf<AssociatedWorkspace> {}

/**
 * View type for The list of Log Analytics workspaces associated with the cluster.
 */
export interface AssociatedWorkspaceView extends InputOf<AssociatedWorkspace> {
  /**
   * Read-only output: The time of workspace association.
   */
  readonly associateDate?: Expression<Date> | undefined;
  /**
   * Read-only output: Associated workspace arm resource id, in the form of: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}.
   */
  readonly resourceId?: Expression<string> | undefined;
  /**
   * Read-only output: Associated workspace immutable id.
   */
  readonly workspaceId?: Expression<string> | undefined;
  /**
   * Read-only output: Associated workspace resource name.
   */
  readonly workspaceName?: Expression<string> | undefined;
}

export const associatedWorkspaceShape: FlatModelShape = createFlatModelShape({
  associateDate: {
    armPath: ["associateDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  resourceId: { armPath: ["resourceId"], value: createStringShape(), readOnly: true },
  workspaceId: { armPath: ["workspaceId"], value: createStringShape(), readOnly: true },
  workspaceName: { armPath: ["workspaceName"], value: createStringShape(), readOnly: true },
});

/**
 * The Capacity Reservation properties.
 */
export interface CapacityReservationProperties {
  /**
   * The last time Sku was updated.
   */
  lastSkuUpdate?: Date;
  /**
   * Minimum CapacityReservation value in Gigabytes.
   */
  minCapacity?: number;
}

/**
 * Input type for The Capacity Reservation properties.
 */
export interface CapacityReservationPropertiesInput extends InputOf<CapacityReservationProperties> {}

/**
 * View type for The Capacity Reservation properties.
 */
export interface CapacityReservationPropertiesView extends InputOf<CapacityReservationProperties> {
  /**
   * Read-only output: The last time Sku was updated.
   */
  readonly lastSkuUpdate?: Expression<Date> | undefined;
  /**
   * Read-only output: Minimum CapacityReservation value in Gigabytes.
   */
  readonly minCapacity?: Expression<number> | undefined;
}

export const capacityReservationPropertiesShape: FlatModelShape = createFlatModelShape({
  lastSkuUpdate: {
    armPath: ["lastSkuUpdate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  minCapacity: { armPath: ["minCapacity"], value: createNumberShape(), readOnly: true },
});

/**
 * Cluster properties.
 */
export interface ClusterProperties {
  /**
   * The list of Log Analytics workspaces associated with the cluster
   */
  associatedWorkspaces?: AssociatedWorkspace[];
  /**
   * The cluster's billing type.
   */
  billingType?: BillingType;
  /**
   * Additional properties for capacity reservation
   */
  capacityReservationProperties?: CapacityReservationProperties;
  /**
   * The ID associated with the cluster.
   */
  clusterId?: string;
  /**
   * The cluster creation time
   */
  createdDate?: Date;
  /**
   * Sets whether the cluster will support availability zones. This can be set as true only in regions where Azure Data Explorer support Availability Zones. This Property can not be modified after cluster creation. Default value is 'true' if region supports Availability Zones.
   */
  isAvailabilityZonesEnabled?: boolean;
  /**
   * Configures whether cluster will use double encryption. This Property can not be modified after cluster creation. Default value is 'true'
   */
  isDoubleEncryptionEnabled?: boolean;
  /**
   * The associated key properties.
   */
  keyVaultProperties?: KeyVaultProperties;
  /**
   * The last time the cluster was updated.
   */
  lastModifiedDate?: Date;
  /**
   * The provisioning state of the cluster.
   */
  provisioningState?: ClusterEntityStatus;
  /**
   * Cluster's replication properties.
   */
  replication?: ClusterReplicationProperties;
}

/**
 * Input type for Cluster properties.
 */
export interface ClusterPropertiesInput extends InputOf<ClusterProperties> {
  /**
   * The list of Log Analytics workspaces associated with the cluster
   */
  associatedWorkspaces?: InputArray<AssociatedWorkspaceInput, AssociatedWorkspace[]> | undefined;
  /**
   * The cluster's billing type.
   */
  billingType?: ExpressionOrValue<BillingType> | undefined;
  /**
   * Additional properties for capacity reservation
   */
  capacityReservationProperties?: CapacityReservationPropertiesInput | undefined;
  /**
   * Sets whether the cluster will support availability zones. This can be set as true only in regions where Azure Data Explorer support Availability Zones. This Property can not be modified after cluster creation. Default value is 'true' if region supports Availability Zones.
   */
  isAvailabilityZonesEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Configures whether cluster will use double encryption. This Property can not be modified after cluster creation. Default value is 'true'
   */
  isDoubleEncryptionEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The associated key properties.
   */
  keyVaultProperties?: KeyVaultPropertiesInput | undefined;
  /**
   * Cluster's replication properties.
   */
  replication?: ClusterReplicationPropertiesInput | undefined;
}

/**
 * View type for Cluster properties.
 */
export interface ClusterPropertiesView extends InputOf<ClusterProperties> {
  /**
   * The list of Log Analytics workspaces associated with the cluster
   */
  associatedWorkspaces?: InputArray<AssociatedWorkspaceView, AssociatedWorkspace[]> | undefined;
  /**
   * The cluster's billing type.
   */
  billingType?: ExpressionOrValue<BillingType> | undefined;
  /**
   * Additional properties for capacity reservation
   */
  capacityReservationProperties?: CapacityReservationPropertiesView | undefined;
  /**
   * Read-only output: The ID associated with the cluster.
   */
  readonly clusterId?: Expression<string> | undefined;
  /**
   * Read-only output: The cluster creation time
   */
  readonly createdDate?: Expression<Date> | undefined;
  /**
   * Sets whether the cluster will support availability zones. This can be set as true only in regions where Azure Data Explorer support Availability Zones. This Property can not be modified after cluster creation. Default value is 'true' if region supports Availability Zones.
   */
  isAvailabilityZonesEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Configures whether cluster will use double encryption. This Property can not be modified after cluster creation. Default value is 'true'
   */
  isDoubleEncryptionEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The associated key properties.
   */
  keyVaultProperties?: KeyVaultPropertiesView | undefined;
  /**
   * Read-only output: The last time the cluster was updated.
   */
  readonly lastModifiedDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The provisioning state of the cluster.
   */
  readonly provisioningState?: Expression<ClusterEntityStatus> | undefined;
  /**
   * Cluster's replication properties.
   */
  replication?: ClusterReplicationPropertiesView | undefined;
}

export const clusterPropertiesShape: FlatModelShape = createFlatModelShape({
  associatedWorkspaces: {
    armPath: ["associatedWorkspaces"],
    value: createArrayShape(createDeferredShape(() => associatedWorkspaceShape)),
  },
  billingType: { armPath: ["billingType"], value: createUnionShape() },
  capacityReservationProperties: {
    armPath: ["capacityReservationProperties"],
    value: createDeferredShape(() => capacityReservationPropertiesShape),
  },
  clusterId: { armPath: ["clusterId"], value: createStringShape(), readOnly: true },
  createdDate: {
    armPath: ["createdDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  isAvailabilityZonesEnabled: {
    armPath: ["isAvailabilityZonesEnabled"],
    value: createBooleanShape(),
  },
  isDoubleEncryptionEnabled: {
    armPath: ["isDoubleEncryptionEnabled"],
    value: createBooleanShape(),
  },
  keyVaultProperties: {
    armPath: ["keyVaultProperties"],
    value: createDeferredShape(() => keyVaultPropertiesShape),
  },
  lastModifiedDate: {
    armPath: ["lastModifiedDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  replication: {
    armPath: ["replication"],
    value: createDeferredShape(() => clusterReplicationPropertiesShape),
  },
});

/**
 * Cluster replication properties.
 */
export interface ClusterReplicationProperties {
  /**
   * The cluster's replication creation time
   */
  createdDate?: Date;
  /**
   * Specifies whether the replication is enabled or not. When true the cluster is replicate to the specified location.
   */
  enabled?: boolean;
  /**
   * Should enable AvailabilityZones for the given replicated cluster
   */
  isAvailabilityZonesEnabled?: boolean;
  /**
   * The last time the cluster's replication was updated.
   */
  lastModifiedDate?: Date;
  /**
   * The secondary location of the replication. If replication is being enabled, enabled must be provided.
   */
  location?: string;
  /**
   * The provisioning state of the cluster replication.
   */
  provisioningState?: ClusterReplicationState;
}

/**
 * Input type for Cluster replication properties.
 */
export interface ClusterReplicationPropertiesInput extends InputOf<ClusterReplicationProperties> {
  /**
   * Specifies whether the replication is enabled or not. When true the cluster is replicate to the specified location.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Should enable AvailabilityZones for the given replicated cluster
   */
  isAvailabilityZonesEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The secondary location of the replication. If replication is being enabled, enabled must be provided.
   */
  location?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Cluster replication properties.
 */
export interface ClusterReplicationPropertiesView extends InputOf<ClusterReplicationProperties> {
  /**
   * Read-only output: The cluster's replication creation time
   */
  readonly createdDate?: Expression<Date> | undefined;
  /**
   * Specifies whether the replication is enabled or not. When true the cluster is replicate to the specified location.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Should enable AvailabilityZones for the given replicated cluster
   */
  isAvailabilityZonesEnabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The last time the cluster's replication was updated.
   */
  readonly lastModifiedDate?: Expression<Date> | undefined;
  /**
   * The secondary location of the replication. If replication is being enabled, enabled must be provided.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The provisioning state of the cluster replication.
   */
  readonly provisioningState?: Expression<ClusterReplicationState> | undefined;
}

export const clusterReplicationPropertiesShape: FlatModelShape = createFlatModelShape({
  createdDate: {
    armPath: ["createdDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  isAvailabilityZonesEnabled: {
    armPath: ["isAvailabilityZonesEnabled"],
    value: createBooleanShape(),
  },
  lastModifiedDate: {
    armPath: ["lastModifiedDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  location: { armPath: ["location"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

/**
 * The cluster sku definition.
 */
export interface ClusterSku {
  /**
   * The capacity reservation level in Gigabytes for this cluster.
   */
  capacity?: number | null;
  /**
   * The SKU (tier) of a cluster.
   */
  name?: ClusterSkuNameEnum;
}

/**
 * Input type for The cluster sku definition.
 */
export interface ClusterSkuInput extends InputOf<ClusterSku> {
  /**
   * The capacity reservation level in Gigabytes for this cluster.
   */
  capacity?: ExpressionOrValue<number | null> | undefined;
  /**
   * The SKU (tier) of a cluster.
   */
  name?: ExpressionOrValue<ClusterSkuNameEnum> | undefined;
}

/**
 * View type for The cluster sku definition.
 */
export type ClusterSkuView = ClusterSkuInput;

export const clusterSkuShape: FlatModelShape = createFlatModelShape({
  capacity: { armPath: ["capacity"], value: createNumberShape() },
  name: { armPath: ["name"], value: createUnionShape() },
});

/**
 * Table column.
 */
export interface Column {
  /**
   * Column data type logical hint.
   */
  dataTypeHint?: ColumnDataTypeHintEnum;
  /**
   * Column description.
   */
  description?: string;
  /**
   * Column display name. Can be set at creation time; after creation, updates must either match column name or set to null/empty. If not provided, defaults to column name.
   */
  displayName?: string;
  /**
   * Is displayed by default.
   */
  isDefaultDisplay?: boolean;
  /**
   * Is column hidden.
   */
  isHidden?: boolean;
  /**
   * Column name.
   */
  name?: string;
  /**
   * Column data type.
   */
  type?: ColumnTypeEnum;
}

/**
 * Input type for Table column.
 */
export interface ColumnInput extends InputOf<Column> {
  /**
   * Column data type logical hint.
   */
  dataTypeHint?: ExpressionOrValue<ColumnDataTypeHintEnum> | undefined;
  /**
   * Column description.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Column display name. Can be set at creation time; after creation, updates must either match column name or set to null/empty. If not provided, defaults to column name.
   */
  displayName?: ExpressionOrValue<string> | undefined;
  /**
   * Column name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Column data type.
   */
  type?: ExpressionOrValue<ColumnTypeEnum> | undefined;
}

/**
 * View type for Table column.
 */
export interface ColumnView extends InputOf<Column> {
  /**
   * Column data type logical hint.
   */
  dataTypeHint?: ExpressionOrValue<ColumnDataTypeHintEnum> | undefined;
  /**
   * Column description.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Column display name. Can be set at creation time; after creation, updates must either match column name or set to null/empty. If not provided, defaults to column name.
   */
  displayName?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Is displayed by default.
   */
  readonly isDefaultDisplay?: Expression<boolean> | undefined;
  /**
   * Read-only output: Is column hidden.
   */
  readonly isHidden?: Expression<boolean> | undefined;
  /**
   * Column name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Column data type.
   */
  type?: ExpressionOrValue<ColumnTypeEnum> | undefined;
}

export const columnShape: FlatModelShape = createFlatModelShape({
  dataTypeHint: { armPath: ["dataTypeHint"], value: createUnionShape() },
  description: { armPath: ["description"], value: createStringShape() },
  displayName: { armPath: ["displayName"], value: createStringShape() },
  isDefaultDisplay: { armPath: ["isDefaultDisplay"], value: createBooleanShape(), readOnly: true },
  isHidden: { armPath: ["isHidden"], value: createBooleanShape(), readOnly: true },
  name: { armPath: ["name"], value: createStringShape() },
  type: { armPath: ["type"], value: createUnionShape() },
});

/**
 * Data Export properties.
 */
export interface DataExportProperties {
  /**
   * The latest data export rule modification time.
   */
  createdDate?: string;
  /**
   * The data export rule ID.
   */
  dataExportId?: string;
  /**
   * destination properties.
   */
  destination?: Destination;
  /**
   * Active when enabled.
   */
  enable?: boolean;
  /**
   * Date and time when the export was last modified.
   */
  lastModifiedDate?: string;
  /**
   * An array of tables to export, for example: [“Heartbeat, SecurityEvent”].
   */
  tableNames: string[];
}

/**
 * Input type for Data Export properties.
 */
export interface DataExportPropertiesInput extends InputOf<DataExportProperties> {
  /**
   * The latest data export rule modification time.
   */
  createdDate?: ExpressionOrValue<string> | undefined;
  /**
   * The data export rule ID.
   */
  dataExportId?: ExpressionOrValue<string> | undefined;
  /**
   * destination properties.
   */
  destination?: DestinationInput | undefined;
  /**
   * Active when enabled.
   */
  enable?: ExpressionOrValue<boolean> | undefined;
  /**
   * Date and time when the export was last modified.
   */
  lastModifiedDate?: ExpressionOrValue<string> | undefined;
  /**
   * An array of tables to export, for example: [“Heartbeat, SecurityEvent”].
   */
  tableNames: InputArray<ExpressionOrValue<string>, string[]>;
}

/**
 * View type for Data Export properties.
 */
export interface DataExportPropertiesView extends InputOf<DataExportProperties> {
  /**
   * The latest data export rule modification time.
   */
  createdDate?: ExpressionOrValue<string> | undefined;
  /**
   * The data export rule ID.
   */
  dataExportId?: ExpressionOrValue<string> | undefined;
  /**
   * destination properties.
   */
  destination?: DestinationView | undefined;
  /**
   * Active when enabled.
   */
  enable?: ExpressionOrValue<boolean> | undefined;
  /**
   * Date and time when the export was last modified.
   */
  lastModifiedDate?: ExpressionOrValue<string> | undefined;
  /**
   * An array of tables to export, for example: [“Heartbeat, SecurityEvent”].
   */
  tableNames: InputArray<ExpressionOrValue<string>, string[]>;
}

export const dataExportPropertiesShape: FlatModelShape = createFlatModelShape({
  createdDate: { armPath: ["createdDate"], value: createStringShape() },
  dataExportId: { armPath: ["dataExportId"], value: createStringShape() },
  destination: { armPath: ["destination"], value: createDeferredShape(() => destinationShape) },
  enable: { armPath: ["enable"], value: createBooleanShape() },
  lastModifiedDate: { armPath: ["lastModifiedDate"], value: createStringShape() },
  tableNames: { armPath: ["tableNames"], value: createArrayShape(createStringShape()) },
});

/**
 * Destination properties.
 */
export interface Destination {
  /**
   * destination meta data.
   */
  metaData?: DestinationMetaData;
  /**
   * The destination resource ID. This can be copied from the Properties entry of the destination resource in Azure.
   */
  resourceId: string;
  /**
   * The type of the destination resource
   */
  type?: Type;
}

/**
 * Input type for Destination properties.
 */
export interface DestinationInput extends InputOf<Destination> {
  /**
   * destination meta data.
   */
  metaData?: DestinationMetaDataInput | undefined;
  /**
   * The destination resource ID. This can be copied from the Properties entry of the destination resource in Azure.
   */
  resourceId: ExpressionOrValue<string>;
}

/**
 * View type for Destination properties.
 */
export interface DestinationView extends InputOf<Destination> {
  /**
   * destination meta data.
   */
  metaData?: DestinationMetaDataView | undefined;
  /**
   * The destination resource ID. This can be copied from the Properties entry of the destination resource in Azure.
   */
  resourceId: ExpressionOrValue<string>;
  /**
   * Read-only output: The type of the destination resource
   */
  readonly type?: Expression<Type> | undefined;
}

export const destinationShape: FlatModelShape = createFlatModelShape({
  metaData: { armPath: ["metaData"], value: createDeferredShape(() => destinationMetaDataShape) },
  resourceId: { armPath: ["resourceId"], value: createStringShape() },
  type: { armPath: ["type"], value: createUnionShape(), readOnly: true },
});

/**
 * Destination meta data.
 */
export interface DestinationMetaData {
  /**
   * Optional. Allows to define an Event Hub name. Not applicable when destination is Storage Account.
   */
  eventHubName?: string;
}

/**
 * Input type for Destination meta data.
 */
export interface DestinationMetaDataInput extends InputOf<DestinationMetaData> {
  /**
   * Optional. Allows to define an Event Hub name. Not applicable when destination is Storage Account.
   */
  eventHubName?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Destination meta data.
 */
export type DestinationMetaDataView = DestinationMetaDataInput;

export const destinationMetaDataShape: FlatModelShape = createFlatModelShape({
  eventHubName: { armPath: ["eventHubName"], value: createStringShape() },
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
   * Type of managed service identity.
   */
  type: IdentityType;
  /**
   * The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?: Record<string, UserIdentityProperties>;
}

/**
 * Input type for Identity for the resource.
 */
export interface IdentityInput extends InputOf<Identity> {
  /**
   * Type of managed service identity.
   */
  type: ExpressionOrValue<IdentityType>;
  /**
   * The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?:
    InputRecord<UserIdentityPropertiesInput, Record<string, UserIdentityProperties>> | undefined;
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
   * Type of managed service identity.
   */
  type: ExpressionOrValue<IdentityType>;
  /**
   * The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?:
    InputRecord<UserIdentityPropertiesView, Record<string, UserIdentityProperties>> | undefined;
}

export const identityShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createEnumShape() },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    value: createRecordShape(createDeferredShape(() => userIdentityPropertiesShape)),
  },
});

/**
 * The key vault properties.
 */
export interface KeyVaultProperties {
  /**
   * The name of the key associated with the Log Analytics cluster.
   */
  keyName?: string;
  /**
   * Selected key minimum required size.
   */
  keyRsaSize?: number;
  /**
   * The Key Vault uri which holds they key associated with the Log Analytics cluster.
   */
  keyVaultUri?: string;
  /**
   * The version of the key associated with the Log Analytics cluster.
   */
  keyVersion?: string;
}

/**
 * Input type for The key vault properties.
 */
export interface KeyVaultPropertiesInput extends InputOf<KeyVaultProperties> {
  /**
   * The name of the key associated with the Log Analytics cluster.
   */
  keyName?: ExpressionOrValue<string> | undefined;
  /**
   * Selected key minimum required size.
   */
  keyRsaSize?: ExpressionOrValue<number> | undefined;
  /**
   * The Key Vault uri which holds they key associated with the Log Analytics cluster.
   */
  keyVaultUri?: ExpressionOrValue<string> | undefined;
  /**
   * The version of the key associated with the Log Analytics cluster.
   */
  keyVersion?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for The key vault properties.
 */
export type KeyVaultPropertiesView = KeyVaultPropertiesInput;

export const keyVaultPropertiesShape: FlatModelShape = createFlatModelShape({
  keyName: { armPath: ["keyName"], value: createStringShape() },
  keyRsaSize: { armPath: ["keyRsaSize"], value: createNumberShape() },
  keyVaultUri: { armPath: ["keyVaultUri"], value: createStringShape() },
  keyVersion: { armPath: ["keyVersion"], value: createStringShape() },
});

/**
 * Linked service properties.
 */
export interface LinkedServiceProperties {
  /**
   * The provisioning state of the linked service.
   */
  provisioningState?: LinkedServiceEntityStatus;
  /**
   * The resource id of the resource that will be linked to the workspace. This should be used for linking resources which require read access
   */
  resourceId?: string;
  /**
   * The resource id of the resource that will be linked to the workspace. This should be used for linking resources which require write access
   */
  writeAccessResourceId?: string;
}

/**
 * Input type for Linked service properties.
 */
export interface LinkedServicePropertiesInput extends InputOf<LinkedServiceProperties> {
  /**
   * The provisioning state of the linked service.
   */
  provisioningState?: ExpressionOrValue<LinkedServiceEntityStatus> | undefined;
  /**
   * The resource id of the resource that will be linked to the workspace. This should be used for linking resources which require read access
   */
  resourceId?: ExpressionOrValue<string> | undefined;
  /**
   * The resource id of the resource that will be linked to the workspace. This should be used for linking resources which require write access
   */
  writeAccessResourceId?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Linked service properties.
 */
export type LinkedServicePropertiesView = LinkedServicePropertiesInput;

export const linkedServicePropertiesShape: FlatModelShape = createFlatModelShape({
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape() },
  resourceId: { armPath: ["resourceId"], value: createStringShape() },
  writeAccessResourceId: { armPath: ["writeAccessResourceId"], value: createStringShape() },
});

/**
 * Linked storage accounts properties.
 */
export interface LinkedStorageAccountsProperties {
  /**
   * Linked storage accounts type.
   */
  dataSourceType?: DataSourceType;
  /**
   * Linked storage accounts resources ids.
   */
  storageAccountIds?: string[];
}

/**
 * Input type for Linked storage accounts properties.
 */
export interface LinkedStorageAccountsPropertiesInput extends InputOf<LinkedStorageAccountsProperties> {
  /**
   * Linked storage accounts resources ids.
   */
  storageAccountIds?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * View type for Linked storage accounts properties.
 */
export interface LinkedStorageAccountsPropertiesView extends InputOf<LinkedStorageAccountsProperties> {
  /**
   * Read-only output: Linked storage accounts type.
   */
  readonly dataSourceType?: Expression<DataSourceType> | undefined;
  /**
   * Linked storage accounts resources ids.
   */
  storageAccountIds?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

export const linkedStorageAccountsPropertiesShape: FlatModelShape = createFlatModelShape({
  dataSourceType: { armPath: ["dataSourceType"], value: createEnumShape(), readOnly: true },
  storageAccountIds: {
    armPath: ["storageAccountIds"],
    value: createArrayShape(createStringShape()),
  },
});

/**
 * Properties that define a Log Analytics QueryPack resource.
 */
export interface LogAnalyticsQueryPackProperties {
  /**
   * Current state of this QueryPack: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Succeeded, Deploying, Canceled, and Failed.
   */
  provisioningState?: string;
  /**
   * The unique ID of your application. This field cannot be changed.
   */
  queryPackId?: string;
  /**
   * Creation Date for the Log Analytics QueryPack, in ISO 8601 format.
   */
  timeCreated?: Date;
  /**
   * Last modified date of the Log Analytics QueryPack, in ISO 8601 format.
   */
  timeModified?: Date;
}

/**
 * Input type for Properties that define a Log Analytics QueryPack resource.
 */
export interface LogAnalyticsQueryPackPropertiesInput extends InputOf<LogAnalyticsQueryPackProperties> {}

/**
 * View type for Properties that define a Log Analytics QueryPack resource.
 */
export interface LogAnalyticsQueryPackPropertiesView extends InputOf<LogAnalyticsQueryPackProperties> {
  /**
   * Read-only output: Current state of this QueryPack: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Succeeded, Deploying, Canceled, and Failed.
   */
  readonly provisioningState?: Expression<string> | undefined;
  /**
   * Read-only output: The unique ID of your application. This field cannot be changed.
   */
  readonly queryPackId?: Expression<string> | undefined;
  /**
   * Read-only output: Creation Date for the Log Analytics QueryPack, in ISO 8601 format.
   */
  readonly timeCreated?: Expression<Date> | undefined;
  /**
   * Read-only output: Last modified date of the Log Analytics QueryPack, in ISO 8601 format.
   */
  readonly timeModified?: Expression<Date> | undefined;
}

export const logAnalyticsQueryPackPropertiesShape: FlatModelShape = createFlatModelShape({
  provisioningState: { armPath: ["provisioningState"], value: createStringShape(), readOnly: true },
  queryPackId: { armPath: ["queryPackId"], value: createStringShape(), readOnly: true },
  timeCreated: {
    armPath: ["timeCreated"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  timeModified: {
    armPath: ["timeModified"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
});

/**
 * Properties that define an Log Analytics QueryPack-Query resource.
 */
export interface LogAnalyticsQueryPackQueryProperties {
  /**
   * Object Id of user creating the query.
   */
  author?: string;
  /**
   * Body of the query.
   */
  body: string;
  /**
   * Description of the query.
   */
  description?: string;
  /**
   * Unique display name for your query within the Query Pack.
   */
  displayName: string;
  /**
   * The unique ID of your application. This field cannot be changed.
   */
  id?: string;
  /**
   * Additional properties that can be set for the query.
   */
  properties?: any;
  /**
   * The related metadata items for the function.
   */
  related?: LogAnalyticsQueryPackQueryPropertiesRelated;
  /**
   * Tags associated with the query.
   */
  tags?: Record<string, string[]>;
  /**
   * Creation Date for the Log Analytics Query, in ISO 8601 format.
   */
  timeCreated?: Date;
  /**
   * Last modified date of the Log Analytics Query, in ISO 8601 format.
   */
  timeModified?: Date;
}

/**
 * Input type for Properties that define an Log Analytics QueryPack-Query resource.
 */
export interface LogAnalyticsQueryPackQueryPropertiesInput extends InputOf<LogAnalyticsQueryPackQueryProperties> {
  /**
   * Body of the query.
   */
  body: ExpressionOrValue<string>;
  /**
   * Description of the query.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Unique display name for your query within the Query Pack.
   */
  displayName: ExpressionOrValue<string>;
  /**
   * Additional properties that can be set for the query.
   */
  properties?: any | undefined;
  /**
   * The related metadata items for the function.
   */
  related?: LogAnalyticsQueryPackQueryPropertiesRelatedInput | undefined;
  /**
   * Tags associated with the query.
   */
  tags?:
    | InputRecord<InputArray<ExpressionOrValue<string>, string[]>, Record<string, string[]>>
    | undefined;
}

/**
 * View type for Properties that define an Log Analytics QueryPack-Query resource.
 */
export interface LogAnalyticsQueryPackQueryPropertiesView extends InputOf<LogAnalyticsQueryPackQueryProperties> {
  /**
   * Read-only output: Object Id of user creating the query.
   */
  readonly author?: Expression<string> | undefined;
  /**
   * Body of the query.
   */
  body: ExpressionOrValue<string>;
  /**
   * Description of the query.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Unique display name for your query within the Query Pack.
   */
  displayName: ExpressionOrValue<string>;
  /**
   * Read-only output: The unique ID of your application. This field cannot be changed.
   */
  readonly id?: Expression<string> | undefined;
  /**
   * Additional properties that can be set for the query.
   */
  properties?: any | undefined;
  /**
   * The related metadata items for the function.
   */
  related?: LogAnalyticsQueryPackQueryPropertiesRelatedView | undefined;
  /**
   * Tags associated with the query.
   */
  tags?:
    | InputRecord<InputArray<ExpressionOrValue<string>, string[]>, Record<string, string[]>>
    | undefined;
  /**
   * Read-only output: Creation Date for the Log Analytics Query, in ISO 8601 format.
   */
  readonly timeCreated?: Expression<Date> | undefined;
  /**
   * Read-only output: Last modified date of the Log Analytics Query, in ISO 8601 format.
   */
  readonly timeModified?: Expression<Date> | undefined;
}

export const logAnalyticsQueryPackQueryPropertiesShape: FlatModelShape = createFlatModelShape({
  author: { armPath: ["author"], value: createStringShape(), readOnly: true },
  body: { armPath: ["body"], value: createStringShape() },
  description: { armPath: ["description"], value: createStringShape() },
  displayName: { armPath: ["displayName"], value: createStringShape() },
  id: { armPath: ["id"], value: createStringShape(), readOnly: true },
  properties: { armPath: ["properties"], value: createAnyShape() },
  related: {
    armPath: ["related"],
    value: createDeferredShape(() => logAnalyticsQueryPackQueryPropertiesRelatedShape),
  },
  tags: { armPath: ["tags"], value: createRecordShape(createArrayShape(createStringShape())) },
  timeCreated: {
    armPath: ["timeCreated"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  timeModified: {
    armPath: ["timeModified"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
});

/**
 * The related metadata items for the function.
 */
export interface LogAnalyticsQueryPackQueryPropertiesRelated {
  /**
   * The related categories for the function.
   */
  categories?: string[];
  /**
   * The related resource types for the function.
   */
  resourceTypes?: string[];
  /**
   * The related Log Analytics solutions for the function.
   */
  solutions?: string[];
}

/**
 * Input type for The related metadata items for the function.
 */
export interface LogAnalyticsQueryPackQueryPropertiesRelatedInput extends InputOf<LogAnalyticsQueryPackQueryPropertiesRelated> {
  /**
   * The related categories for the function.
   */
  categories?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The related resource types for the function.
   */
  resourceTypes?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The related Log Analytics solutions for the function.
   */
  solutions?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * View type for The related metadata items for the function.
 */
export type LogAnalyticsQueryPackQueryPropertiesRelatedView =
  LogAnalyticsQueryPackQueryPropertiesRelatedInput;

export const logAnalyticsQueryPackQueryPropertiesRelatedShape: FlatModelShape =
  createFlatModelShape({
    categories: { armPath: ["categories"], value: createArrayShape(createStringShape()) },
    resourceTypes: { armPath: ["resourceTypes"], value: createArrayShape(createStringShape()) },
    solutions: { armPath: ["solutions"], value: createArrayShape(createStringShape()) },
  });

/**
 * Managed service identity (system assigned and/or user assigned identities)
 */
export interface ManagedServiceIdentity {
  /**
   * The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  principalId?: string;
  /**
   * The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  tenantId?: string;
  /**
   * The type of managed identity assigned to this resource.
   */
  type: ManagedServiceIdentityType;
  /**
   * The identities assigned to this resource by the user.
   */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

/**
 * Input type for Managed service identity (system assigned and/or user assigned identities)
 */
export interface ManagedServiceIdentityInput extends InputOf<ManagedServiceIdentity> {
  /**
   * The type of managed identity assigned to this resource.
   */
  type: ExpressionOrValue<ManagedServiceIdentityType>;
  /**
   * The identities assigned to this resource by the user.
   */
  userAssignedIdentities?:
    | InputRecord<
        UserAssignedIdentityInput | ExpressionOrValue<null>,
        Record<string, UserAssignedIdentity | null>
      >
    | undefined;
}

/**
 * View type for Managed service identity (system assigned and/or user assigned identities)
 */
export interface ManagedServiceIdentityView extends InputOf<ManagedServiceIdentity> {
  /**
   * Read-only output: The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  readonly principalId?: Expression<string> | undefined;
  /**
   * Read-only output: The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * The type of managed identity assigned to this resource.
   */
  type: ExpressionOrValue<ManagedServiceIdentityType>;
  /**
   * The identities assigned to this resource by the user.
   */
  userAssignedIdentities?:
    | InputRecord<
        UserAssignedIdentityView | ExpressionOrValue<null>,
        Record<string, UserAssignedIdentity | null>
      >
    | undefined;
}

export const managedServiceIdentityShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createUnionShape() },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    value: createRecordShape(createDeferredShape(() => userAssignedIdentityShape)),
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
 * The private link scope resource reference.
 */
export interface PrivateLinkScopedResource {
  /**
   * The full resource Id of the private link scope resource.
   */
  resourceId?: string;
  /**
   * The private link scope unique Identifier.
   */
  scopeId?: string;
}

/**
 * Input type for The private link scope resource reference.
 */
export interface PrivateLinkScopedResourceInput extends InputOf<PrivateLinkScopedResource> {}

/**
 * View type for The private link scope resource reference.
 */
export interface PrivateLinkScopedResourceView extends InputOf<PrivateLinkScopedResource> {
  /**
   * Read-only output: The full resource Id of the private link scope resource.
   */
  readonly resourceId?: Expression<string> | undefined;
  /**
   * Read-only output: The private link scope unique Identifier.
   */
  readonly scopeId?: Expression<string> | undefined;
}

export const privateLinkScopedResourceShape: FlatModelShape = createFlatModelShape({
  resourceId: { armPath: ["resourceId"], value: createStringShape(), readOnly: true },
  scopeId: { armPath: ["scopeId"], value: createStringShape(), readOnly: true },
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
 * Restore parameters.
 */
export interface RestoredLogs {
  /**
   * Search results table async operation id.
   */
  azureAsyncOperationId?: string;
  /**
   * The timestamp to end the restore by (UTC).
   */
  endRestoreTime?: Date;
  /**
   * The table to restore data from.
   */
  sourceTable?: string;
  /**
   * The timestamp to start the restore from (UTC).
   */
  startRestoreTime?: Date;
}

/**
 * Input type for Restore parameters.
 */
export interface RestoredLogsInput extends InputOf<RestoredLogs> {
  /**
   * The timestamp to end the restore by (UTC).
   */
  endRestoreTime?: ExpressionOrValue<Date> | undefined;
  /**
   * The table to restore data from.
   */
  sourceTable?: ExpressionOrValue<string> | undefined;
  /**
   * The timestamp to start the restore from (UTC).
   */
  startRestoreTime?: ExpressionOrValue<Date> | undefined;
}

/**
 * View type for Restore parameters.
 */
export interface RestoredLogsView extends InputOf<RestoredLogs> {
  /**
   * Read-only output: Search results table async operation id.
   */
  readonly azureAsyncOperationId?: Expression<string> | undefined;
  /**
   * The timestamp to end the restore by (UTC).
   */
  endRestoreTime?: ExpressionOrValue<Date> | undefined;
  /**
   * The table to restore data from.
   */
  sourceTable?: ExpressionOrValue<string> | undefined;
  /**
   * The timestamp to start the restore from (UTC).
   */
  startRestoreTime?: ExpressionOrValue<Date> | undefined;
}

export const restoredLogsShape: FlatModelShape = createFlatModelShape({
  azureAsyncOperationId: {
    armPath: ["azureAsyncOperationId"],
    value: createStringShape(),
    readOnly: true,
  },
  endRestoreTime: {
    armPath: ["endRestoreTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  sourceTable: { armPath: ["sourceTable"], value: createStringShape() },
  startRestoreTime: {
    armPath: ["startRestoreTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
});

/**
 * Search job execution statistics.
 */
export interface ResultStatistics {
  /**
   * The number of rows that were returned by the search job.
   */
  ingestedRecords?: number;
  /**
   * Search job completion percentage.
   */
  progress?: number;
  /**
   * Search job: Amount of scanned data.
   */
  scannedGb?: number;
}

/**
 * Input type for Search job execution statistics.
 */
export interface ResultStatisticsInput extends InputOf<ResultStatistics> {}

/**
 * View type for Search job execution statistics.
 */
export interface ResultStatisticsView extends InputOf<ResultStatistics> {
  /**
   * Read-only output: The number of rows that were returned by the search job.
   */
  readonly ingestedRecords?: Expression<number> | undefined;
  /**
   * Read-only output: Search job completion percentage.
   */
  readonly progress?: Expression<number> | undefined;
  /**
   * Read-only output: Search job: Amount of scanned data.
   */
  readonly scannedGb?: Expression<number> | undefined;
}

export const resultStatisticsShape: FlatModelShape = createFlatModelShape({
  ingestedRecords: { armPath: ["ingestedRecords"], value: createNumberShape(), readOnly: true },
  progress: { armPath: ["progress"], value: createNumberShape(), readOnly: true },
  scannedGb: { armPath: ["scannedGb"], value: createNumberShape(), readOnly: true },
});

/**
 * Rule definition parameters.
 */
export interface RuleDefinition {
  /**
   * The minimum delay in seconds before bin processing.
   */
  binDelay?: number;
  /**
   * Scheduled window in minutes. Allowed values: 20, 30, 60, 120, 180, 360, 720, 1440.
   */
  binSize?: number;
  /**
   * The start time (UTC) when Summary rule execution starts.
   */
  binStartTime?: Date;
  /**
   * The destination table used for the Summary rule results.
   */
  destinationTable?: string;
  /**
   * Summary rule query.
   */
  query?: string;
  /**
   * The time cursor used in Summary rules bins processing, e.g. TimeGenerated.
   */
  timeSelector?: TimeSelectorEnum;
}

/**
 * Input type for Rule definition parameters.
 */
export interface RuleDefinitionInput extends InputOf<RuleDefinition> {
  /**
   * The minimum delay in seconds before bin processing.
   */
  binDelay?: ExpressionOrValue<number> | undefined;
  /**
   * Scheduled window in minutes. Allowed values: 20, 30, 60, 120, 180, 360, 720, 1440.
   */
  binSize?: ExpressionOrValue<number> | undefined;
  /**
   * The start time (UTC) when Summary rule execution starts.
   */
  binStartTime?: ExpressionOrValue<Date> | undefined;
  /**
   * The destination table used for the Summary rule results.
   */
  destinationTable?: ExpressionOrValue<string> | undefined;
  /**
   * Summary rule query.
   */
  query?: ExpressionOrValue<string> | undefined;
  /**
   * The time cursor used in Summary rules bins processing, e.g. TimeGenerated.
   */
  timeSelector?: ExpressionOrValue<TimeSelectorEnum> | undefined;
}

/**
 * View type for Rule definition parameters.
 */
export type RuleDefinitionView = RuleDefinitionInput;

export const ruleDefinitionShape: FlatModelShape = createFlatModelShape({
  binDelay: { armPath: ["binDelay"], value: createNumberShape() },
  binSize: { armPath: ["binSize"], value: createNumberShape() },
  binStartTime: {
    armPath: ["binStartTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  destinationTable: { armPath: ["destinationTable"], value: createStringShape() },
  query: { armPath: ["query"], value: createStringShape() },
  timeSelector: { armPath: ["timeSelector"], value: createUnionShape() },
});

/**
 * Value object for saved search results.
 */
export interface SavedSearchProperties {
  /**
   * The category of the saved search. This helps the user to find a saved search faster.
   */
  category: string;
  /**
   * Saved search display name.
   */
  displayName: string;
  /**
   * The function alias if query serves as a function.
   */
  functionAlias?: string;
  /**
   * The optional function parameters if query serves as a function. Value should be in the following format: 'param-name1:type1 = default_value1, param-name2:type2 = default_value2'. For more examples and proper syntax please refer to https://docs.microsoft.com/en-us/azure/kusto/query/functions/user-defined-functions.
   */
  functionParameters?: string;
  /**
   * The query expression for the saved search.
   */
  query: string;
  /**
   * The tags attached to the saved search.
   */
  tags?: Tag[];
  /**
   * The version number of the query language. The current version is 2 and is the default.
   */
  version?: number;
}

/**
 * Input type for Value object for saved search results.
 */
export interface SavedSearchPropertiesInput extends InputOf<SavedSearchProperties> {
  /**
   * The category of the saved search. This helps the user to find a saved search faster.
   */
  category: ExpressionOrValue<string>;
  /**
   * Saved search display name.
   */
  displayName: ExpressionOrValue<string>;
  /**
   * The function alias if query serves as a function.
   */
  functionAlias?: ExpressionOrValue<string> | undefined;
  /**
   * The optional function parameters if query serves as a function. Value should be in the following format: 'param-name1:type1 = default_value1, param-name2:type2 = default_value2'. For more examples and proper syntax please refer to https://docs.microsoft.com/en-us/azure/kusto/query/functions/user-defined-functions.
   */
  functionParameters?: ExpressionOrValue<string> | undefined;
  /**
   * The query expression for the saved search.
   */
  query: ExpressionOrValue<string>;
  /**
   * The tags attached to the saved search.
   */
  tags?: InputArray<TagInput, Tag[]> | undefined;
  /**
   * The version number of the query language. The current version is 2 and is the default.
   */
  version?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Value object for saved search results.
 */
export type SavedSearchPropertiesView = SavedSearchPropertiesInput;

export const savedSearchPropertiesShape: FlatModelShape = createFlatModelShape({
  category: { armPath: ["category"], value: createStringShape() },
  displayName: { armPath: ["displayName"], value: createStringShape() },
  functionAlias: { armPath: ["functionAlias"], value: createStringShape() },
  functionParameters: { armPath: ["functionParameters"], value: createStringShape() },
  query: { armPath: ["query"], value: createStringShape() },
  tags: { armPath: ["tags"], value: createArrayShape(createDeferredShape(() => tagShape)) },
  version: { armPath: ["version"], value: createNumberShape() },
});

/**
 * Table's schema.
 */
export interface Schema {
  /**
   * Table category.
   */
  categories?: string[];
  /**
   * A list of table custom columns.
   */
  columns?: Column[];
  /**
   * Table description.
   */
  description?: string;
  /**
   * Table display name.
   */
  displayName?: string;
  /**
   * Table labels.
   */
  labels?: string[];
  /**
   * Table name.
   */
  name?: string;
  /**
   * List of solutions the table is affiliated with
   */
  solutions?: string[];
  /**
   * Table's creator.
   */
  source?: SourceEnum;
  /**
   * A list of table standard columns.
   */
  standardColumns?: Column[];
  /**
   * The subtype describes what APIs can be used to interact with the table, and what features are available against it.
   */
  tableSubType?: TableSubTypeEnum;
  /**
   * Table's creator.
   */
  tableType?: TableTypeEnum;
}

/**
 * Input type for Table's schema.
 */
export interface SchemaInput extends InputOf<Schema> {
  /**
   * A list of table custom columns.
   */
  columns?: InputArray<ColumnInput, Column[]> | undefined;
  /**
   * Table description.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Table display name.
   */
  displayName?: ExpressionOrValue<string> | undefined;
  /**
   * Table name.
   */
  name?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Table's schema.
 */
export interface SchemaView extends InputOf<Schema> {
  /**
   * Read-only output: Table category.
   */
  readonly categories?: Expression<string[]> | undefined;
  /**
   * A list of table custom columns.
   */
  columns?: InputArray<ColumnView, Column[]> | undefined;
  /**
   * Table description.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * Table display name.
   */
  displayName?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Table labels.
   */
  readonly labels?: Expression<string[]> | undefined;
  /**
   * Table name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: List of solutions the table is affiliated with
   */
  readonly solutions?: Expression<string[]> | undefined;
  /**
   * Read-only output: Table's creator.
   */
  readonly source?: Expression<SourceEnum> | undefined;
  /**
   * Read-only output: A list of table standard columns.
   */
  readonly standardColumns?: Expression<Column[]> | undefined;
  /**
   * Read-only output: The subtype describes what APIs can be used to interact with the table, and what features are available against it.
   */
  readonly tableSubType?: Expression<TableSubTypeEnum> | undefined;
  /**
   * Read-only output: Table's creator.
   */
  readonly tableType?: Expression<TableTypeEnum> | undefined;
}

export const schemaShape: FlatModelShape = createFlatModelShape({
  categories: {
    armPath: ["categories"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  columns: {
    armPath: ["columns"],
    value: createArrayShape(createDeferredShape(() => columnShape)),
  },
  description: { armPath: ["description"], value: createStringShape() },
  displayName: { armPath: ["displayName"], value: createStringShape() },
  labels: { armPath: ["labels"], value: createArrayShape(createStringShape()), readOnly: true },
  name: { armPath: ["name"], value: createStringShape() },
  solutions: {
    armPath: ["solutions"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  source: { armPath: ["source"], value: createUnionShape(), readOnly: true },
  standardColumns: {
    armPath: ["standardColumns"],
    value: createArrayShape(createDeferredShape(() => columnShape)),
    readOnly: true,
  },
  tableSubType: { armPath: ["tableSubType"], value: createUnionShape(), readOnly: true },
  tableType: { armPath: ["tableType"], value: createUnionShape(), readOnly: true },
});

/**
 * Parameters of the search job that initiated this table.
 */
export interface SearchResults {
  /**
   * Search results table async operation id.
   */
  azureAsyncOperationId?: string;
  /**
   * Search job Description.
   */
  description?: string;
  /**
   * The timestamp to end the search by (UTC)
   */
  endSearchTime?: Date;
  /**
   * Limit the search job to return up to specified number of rows.
   */
  limit?: number;
  /**
   * Search job query.
   */
  query?: string;
  /**
   * The table used in the search job.
   */
  sourceTable?: string;
  /**
   * The timestamp to start the search from (UTC)
   */
  startSearchTime?: Date;
}

/**
 * Input type for Parameters of the search job that initiated this table.
 */
export interface SearchResultsInput extends InputOf<SearchResults> {
  /**
   * Search job Description.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * The timestamp to end the search by (UTC)
   */
  endSearchTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Limit the search job to return up to specified number of rows.
   */
  limit?: ExpressionOrValue<number> | undefined;
  /**
   * Search job query.
   */
  query?: ExpressionOrValue<string> | undefined;
  /**
   * The timestamp to start the search from (UTC)
   */
  startSearchTime?: ExpressionOrValue<Date> | undefined;
}

/**
 * View type for Parameters of the search job that initiated this table.
 */
export interface SearchResultsView extends InputOf<SearchResults> {
  /**
   * Read-only output: Search results table async operation id.
   */
  readonly azureAsyncOperationId?: Expression<string> | undefined;
  /**
   * Search job Description.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * The timestamp to end the search by (UTC)
   */
  endSearchTime?: ExpressionOrValue<Date> | undefined;
  /**
   * Limit the search job to return up to specified number of rows.
   */
  limit?: ExpressionOrValue<number> | undefined;
  /**
   * Search job query.
   */
  query?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The table used in the search job.
   */
  readonly sourceTable?: Expression<string> | undefined;
  /**
   * The timestamp to start the search from (UTC)
   */
  startSearchTime?: ExpressionOrValue<Date> | undefined;
}

export const searchResultsShape: FlatModelShape = createFlatModelShape({
  azureAsyncOperationId: {
    armPath: ["azureAsyncOperationId"],
    value: createStringShape(),
    readOnly: true,
  },
  description: { armPath: ["description"], value: createStringShape() },
  endSearchTime: {
    armPath: ["endSearchTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
  limit: { armPath: ["limit"], value: createNumberShape() },
  query: { armPath: ["query"], value: createStringShape() },
  sourceTable: { armPath: ["sourceTable"], value: createStringShape(), readOnly: true },
  startSearchTime: {
    armPath: ["startSearchTime"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
  },
});

/**
 * Describes a storage account connection.
 */
export interface StorageAccount {
  /**
   * The Azure Resource Manager ID of the storage account resource.
   */
  id: string;
  /**
   * The storage account key.
   */
  key: string;
}

/**
 * Input type for Describes a storage account connection.
 */
export interface StorageAccountInput extends InputOf<StorageAccount> {
  /**
   * The Azure Resource Manager ID of the storage account resource.
   */
  id: ExpressionOrValue<string>;
  /**
   * The storage account key.
   */
  key: ExpressionOrValue<string>;
}

/**
 * View type for Describes a storage account connection.
 */
export type StorageAccountView = StorageAccountInput;

export const storageAccountShape: FlatModelShape = createFlatModelShape({
  id: { armPath: ["id"], value: createStringShape() },
  key: { armPath: ["key"], value: createStringShape() },
});

/**
 * Storage insight properties.
 */
export interface StorageInsightProperties {
  /**
   * The names of the blob containers that the workspace should read
   */
  containers?: string[];
  /**
   * The status of the storage insight
   */
  status?: StorageInsightStatus;
  /**
   * The storage account connection details
   */
  storageAccount: StorageAccount;
  /**
   * The names of the Azure tables that the workspace should read
   */
  tables?: string[];
}

/**
 * Input type for Storage insight properties.
 */
export interface StorageInsightPropertiesInput extends InputOf<StorageInsightProperties> {
  /**
   * The names of the blob containers that the workspace should read
   */
  containers?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * The storage account connection details
   */
  storageAccount: StorageAccountInput;
  /**
   * The names of the Azure tables that the workspace should read
   */
  tables?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

/**
 * View type for Storage insight properties.
 */
export interface StorageInsightPropertiesView extends InputOf<StorageInsightProperties> {
  /**
   * The names of the blob containers that the workspace should read
   */
  containers?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
  /**
   * Read-only output: The status of the storage insight
   */
  readonly status?: Expression<StorageInsightStatus> | undefined;
  /**
   * The storage account connection details
   */
  storageAccount: StorageAccountView;
  /**
   * The names of the Azure tables that the workspace should read
   */
  tables?: InputArray<ExpressionOrValue<string>, string[]> | undefined;
}

export const storageInsightPropertiesShape: FlatModelShape = createFlatModelShape({
  containers: { armPath: ["containers"], value: createArrayShape(createStringShape()) },
  status: {
    armPath: ["status"],
    value: createDeferredShape(() => storageInsightStatusShape),
    readOnly: true,
  },
  storageAccount: {
    armPath: ["storageAccount"],
    value: createDeferredShape(() => storageAccountShape),
  },
  tables: { armPath: ["tables"], value: createArrayShape(createStringShape()) },
});

/**
 * The status of the storage insight.
 */
export interface StorageInsightStatus {
  /**
   * Description of the state of the storage insight.
   */
  description?: string;
  /**
   * The state of the storage insight connection to the workspace
   */
  state?: StorageInsightState;
}

/**
 * Input type for The status of the storage insight.
 */
export interface StorageInsightStatusInput extends InputOf<StorageInsightStatus> {}

/**
 * View type for The status of the storage insight.
 */
export interface StorageInsightStatusView extends InputOf<StorageInsightStatus> {
  /**
   * Read-only output: Description of the state of the storage insight.
   */
  readonly description?: Expression<string> | undefined;
  /**
   * Read-only output: The state of the storage insight connection to the workspace
   */
  readonly state?: Expression<StorageInsightState> | undefined;
}

export const storageInsightStatusShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape(), readOnly: true },
  state: { armPath: ["state"], value: createUnionShape(), readOnly: true },
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
 * Identity for the summary logs resource.
 */
export interface SummaryLogsIdentity {
  /**
   * The principal ID of resource identity.
   */
  principalId?: string;
  /**
   * The tenant ID of resource.
   */
  tenantId?: string;
  /**
   * Type of managed service identity.
   */
  type: SummaryLogsIdentityType;
  /**
   * The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?: Record<string, SummaryLogsUserIdentityProperties>;
}

/**
 * Input type for Identity for the summary logs resource.
 */
export interface SummaryLogsIdentityInput extends InputOf<SummaryLogsIdentity> {
  /**
   * Type of managed service identity.
   */
  type: ExpressionOrValue<SummaryLogsIdentityType>;
  /**
   * The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?:
    | InputRecord<
        SummaryLogsUserIdentityPropertiesInput,
        Record<string, SummaryLogsUserIdentityProperties>
      >
    | undefined;
}

/**
 * View type for Identity for the summary logs resource.
 */
export interface SummaryLogsIdentityView extends InputOf<SummaryLogsIdentity> {
  /**
   * Read-only output: The principal ID of resource identity.
   */
  readonly principalId?: Expression<string> | undefined;
  /**
   * Read-only output: The tenant ID of resource.
   */
  readonly tenantId?: Expression<string> | undefined;
  /**
   * Type of managed service identity.
   */
  type: ExpressionOrValue<SummaryLogsIdentityType>;
  /**
   * The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?:
    | InputRecord<
        SummaryLogsUserIdentityPropertiesView,
        Record<string, SummaryLogsUserIdentityProperties>
      >
    | undefined;
}

export const summaryLogsIdentityShape: FlatModelShape = createFlatModelShape({
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
  tenantId: { armPath: ["tenantId"], value: createStringShape(), readOnly: true },
  type: { armPath: ["type"], value: createUnionShape() },
  userAssignedIdentities: {
    armPath: ["userAssignedIdentities"],
    value: createRecordShape(createDeferredShape(() => summaryLogsUserIdentityPropertiesShape)),
  },
});

/**
 * Summary rule properties.
 */
export interface SummaryLogsProperties {
  /**
   * The description of the Summary rule.
   */
  description?: string;
  /**
   * The display name of the Summary rule.
   */
  displayName?: string;
  /**
   * Indicates if Summary rule is active. If not, Summary rule execution stops.
   */
  isActive?: boolean;
  /**
   * Summary rule is in provisioning state. If set to 'updating' or 'deleting', indicates a resource lock due to an ongoing operation, preventing any update to the Summary rule until the operation is complete.
   */
  provisioningState?: ProvisioningStateEnum;
  /**
   * Rule definition parameters.
   */
  ruleDefinition?: RuleDefinition;
  /**
   * SummaryRules rule type: User.
   */
  ruleType?: RuleTypeEnum;
  /**
   * Indicates the reason for rule deactivation.
   */
  statusCode?: StatusCodeEnum;
}

/**
 * Input type for Summary rule properties.
 */
export interface SummaryLogsPropertiesInput extends InputOf<SummaryLogsProperties> {
  /**
   * The description of the Summary rule.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * The display name of the Summary rule.
   */
  displayName?: ExpressionOrValue<string> | undefined;
  /**
   * Rule definition parameters.
   */
  ruleDefinition?: RuleDefinitionInput | undefined;
  /**
   * SummaryRules rule type: User.
   */
  ruleType?: ExpressionOrValue<RuleTypeEnum> | undefined;
}

/**
 * View type for Summary rule properties.
 */
export interface SummaryLogsPropertiesView extends InputOf<SummaryLogsProperties> {
  /**
   * The description of the Summary rule.
   */
  description?: ExpressionOrValue<string> | undefined;
  /**
   * The display name of the Summary rule.
   */
  displayName?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: Indicates if Summary rule is active. If not, Summary rule execution stops.
   */
  readonly isActive?: Expression<boolean> | undefined;
  /**
   * Read-only output: Summary rule is in provisioning state. If set to 'updating' or 'deleting', indicates a resource lock due to an ongoing operation, preventing any update to the Summary rule until the operation is complete.
   */
  readonly provisioningState?: Expression<ProvisioningStateEnum> | undefined;
  /**
   * Rule definition parameters.
   */
  ruleDefinition?: RuleDefinitionView | undefined;
  /**
   * SummaryRules rule type: User.
   */
  ruleType?: ExpressionOrValue<RuleTypeEnum> | undefined;
  /**
   * Read-only output: Indicates the reason for rule deactivation.
   */
  readonly statusCode?: Expression<StatusCodeEnum> | undefined;
}

export const summaryLogsPropertiesShape: FlatModelShape = createFlatModelShape({
  description: { armPath: ["description"], value: createStringShape() },
  displayName: { armPath: ["displayName"], value: createStringShape() },
  isActive: { armPath: ["isActive"], value: createBooleanShape(), readOnly: true },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  ruleDefinition: {
    armPath: ["ruleDefinition"],
    value: createDeferredShape(() => ruleDefinitionShape),
  },
  ruleType: { armPath: ["ruleType"], value: createUnionShape() },
  statusCode: { armPath: ["statusCode"], value: createUnionShape(), readOnly: true },
});

/**
 * User assigned identity properties.
 */
export interface SummaryLogsUserIdentityProperties {
  /**
   * The client id of user assigned identity.
   */
  clientId?: string;
  /**
   * The principal id of user assigned identity.
   */
  principalId?: string;
}

/**
 * Input type for User assigned identity properties.
 */
export interface SummaryLogsUserIdentityPropertiesInput extends InputOf<SummaryLogsUserIdentityProperties> {}

/**
 * View type for User assigned identity properties.
 */
export interface SummaryLogsUserIdentityPropertiesView extends InputOf<SummaryLogsUserIdentityProperties> {
  /**
   * Read-only output: The client id of user assigned identity.
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: The principal id of user assigned identity.
   */
  readonly principalId?: Expression<string> | undefined;
}

export const summaryLogsUserIdentityPropertiesShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape(), readOnly: true },
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
});

/**
 * Table properties.
 */
export interface TableProperties {
  /**
   * The tables long-term retention in days. Calculated as (totalRetentionInDays-retentionInDays).
   */
  archiveRetentionInDays?: number;
  /**
   * The timestamp that table plan was last modified (UTC).
   */
  lastPlanModifiedDate?: string;
  /**
   * Instruct the system how to handle and charge the logs ingested to this table.
   */
  plan?: TablePlanEnum;
  /**
   * The protection level of the table. Determines the default data access isolation behavior.
   */
  protectionLevel?: TableProtectionLevelEnum;
  /**
   * Table's current provisioning state. If set to 'updating', indicates a resource lock due to ongoing operation, forbidding any update to the table until the ongoing operation is concluded.
   */
  provisioningState?: OperationalInsightsTableProvisioningState;
  /**
   * Parameters of the restore operation that initiated this table.
   */
  restoredLogs?: RestoredLogs;
  /**
   * Search job execution statistics.
   */
  resultStatistics?: ResultStatistics;
  /**
   * In Analytics table: the tables analytics retention in days, between 4 and 730. Setting this property to -1 will default to the workspace retention. In Basic and Auxiliary table: read only property.
   */
  retentionInDays?: number;
  /**
   * True - Value originates from workspace retention in days, False - Customer specific.
   */
  retentionInDaysAsDefault?: boolean;
  /**
   * Table schema.
   */
  schema?: Schema;
  /**
   * Parameters of the search job that initiated this table.
   */
  searchResults?: SearchResults;
  /**
   * The table total retention in days, between 4 and 4383. Setting this property to -1 will default to retentionInDays.
   */
  totalRetentionInDays?: number;
  /**
   * True - Value originates from retention in days, False - Customer specific.
   */
  totalRetentionInDaysAsDefault?: boolean;
}

/**
 * Input type for Table properties.
 */
export interface TablePropertiesInput extends InputOf<TableProperties> {
  /**
   * Instruct the system how to handle and charge the logs ingested to this table.
   */
  plan?: ExpressionOrValue<TablePlanEnum> | undefined;
  /**
   * The protection level of the table. Determines the default data access isolation behavior.
   */
  protectionLevel?: ExpressionOrValue<TableProtectionLevelEnum> | undefined;
  /**
   * Parameters of the restore operation that initiated this table.
   */
  restoredLogs?: RestoredLogsInput | undefined;
  /**
   * In Analytics table: the tables analytics retention in days, between 4 and 730. Setting this property to -1 will default to the workspace retention. In Basic and Auxiliary table: read only property.
   */
  retentionInDays?: ExpressionOrValue<number> | undefined;
  /**
   * Table schema.
   */
  schema?: SchemaInput | undefined;
  /**
   * Parameters of the search job that initiated this table.
   */
  searchResults?: SearchResultsInput | undefined;
  /**
   * The table total retention in days, between 4 and 4383. Setting this property to -1 will default to retentionInDays.
   */
  totalRetentionInDays?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for Table properties.
 */
export interface TablePropertiesView extends InputOf<TableProperties> {
  /**
   * Read-only output: The tables long-term retention in days. Calculated as (totalRetentionInDays-retentionInDays).
   */
  readonly archiveRetentionInDays?: Expression<number> | undefined;
  /**
   * Read-only output: The timestamp that table plan was last modified (UTC).
   */
  readonly lastPlanModifiedDate?: Expression<string> | undefined;
  /**
   * Instruct the system how to handle and charge the logs ingested to this table.
   */
  plan?: ExpressionOrValue<TablePlanEnum> | undefined;
  /**
   * The protection level of the table. Determines the default data access isolation behavior.
   */
  protectionLevel?: ExpressionOrValue<TableProtectionLevelEnum> | undefined;
  /**
   * Read-only output: Table's current provisioning state. If set to 'updating', indicates a resource lock due to ongoing operation, forbidding any update to the table until the ongoing operation is concluded.
   */
  readonly provisioningState?: Expression<OperationalInsightsTableProvisioningState> | undefined;
  /**
   * Parameters of the restore operation that initiated this table.
   */
  restoredLogs?: RestoredLogsView | undefined;
  /**
   * Read-only output: Search job execution statistics.
   */
  readonly resultStatistics?: Expression<ResultStatistics> | undefined;
  /**
   * In Analytics table: the tables analytics retention in days, between 4 and 730. Setting this property to -1 will default to the workspace retention. In Basic and Auxiliary table: read only property.
   */
  retentionInDays?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: True - Value originates from workspace retention in days, False - Customer specific.
   */
  readonly retentionInDaysAsDefault?: Expression<boolean> | undefined;
  /**
   * Table schema.
   */
  schema?: SchemaView | undefined;
  /**
   * Parameters of the search job that initiated this table.
   */
  searchResults?: SearchResultsView | undefined;
  /**
   * The table total retention in days, between 4 and 4383. Setting this property to -1 will default to retentionInDays.
   */
  totalRetentionInDays?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: True - Value originates from retention in days, False - Customer specific.
   */
  readonly totalRetentionInDaysAsDefault?: Expression<boolean> | undefined;
}

export const tablePropertiesShape: FlatModelShape = createFlatModelShape({
  archiveRetentionInDays: {
    armPath: ["archiveRetentionInDays"],
    value: createNumberShape(),
    readOnly: true,
  },
  lastPlanModifiedDate: {
    armPath: ["lastPlanModifiedDate"],
    value: createStringShape(),
    readOnly: true,
  },
  plan: { armPath: ["plan"], value: createUnionShape() },
  protectionLevel: { armPath: ["protectionLevel"], value: createUnionShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  restoredLogs: { armPath: ["restoredLogs"], value: createDeferredShape(() => restoredLogsShape) },
  resultStatistics: {
    armPath: ["resultStatistics"],
    value: createDeferredShape(() => resultStatisticsShape),
    readOnly: true,
  },
  retentionInDays: { armPath: ["retentionInDays"], value: createNumberShape() },
  retentionInDaysAsDefault: {
    armPath: ["retentionInDaysAsDefault"],
    value: createBooleanShape(),
    readOnly: true,
  },
  schema: { armPath: ["schema"], value: createDeferredShape(() => schemaShape) },
  searchResults: {
    armPath: ["searchResults"],
    value: createDeferredShape(() => searchResultsShape),
  },
  totalRetentionInDays: { armPath: ["totalRetentionInDays"], value: createNumberShape() },
  totalRetentionInDaysAsDefault: {
    armPath: ["totalRetentionInDaysAsDefault"],
    value: createBooleanShape(),
    readOnly: true,
  },
});

/**
 * A tag of a saved search.
 */
export interface Tag {
  /**
   * The tag name.
   */
  name: string;
  /**
   * The tag value.
   */
  value: string;
}

/**
 * Input type for A tag of a saved search.
 */
export interface TagInput extends InputOf<Tag> {
  /**
   * The tag name.
   */
  name: ExpressionOrValue<string>;
  /**
   * The tag value.
   */
  value: ExpressionOrValue<string>;
}

/**
 * View type for A tag of a saved search.
 */
export type TagView = TagInput;

export const tagShape: FlatModelShape = createFlatModelShape({
  name: { armPath: ["name"], value: createStringShape() },
  value: { armPath: ["value"], value: createStringShape() },
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
 * User assigned identity properties.
 */
export interface UserIdentityProperties {
  /**
   * The client id of user assigned identity.
   */
  clientId?: string;
  /**
   * The principal id of user assigned identity.
   */
  principalId?: string;
}

/**
 * Input type for User assigned identity properties.
 */
export interface UserIdentityPropertiesInput extends InputOf<UserIdentityProperties> {}

/**
 * View type for User assigned identity properties.
 */
export interface UserIdentityPropertiesView extends InputOf<UserIdentityProperties> {
  /**
   * Read-only output: The client id of user assigned identity.
   */
  readonly clientId?: Expression<string> | undefined;
  /**
   * Read-only output: The principal id of user assigned identity.
   */
  readonly principalId?: Expression<string> | undefined;
}

export const userIdentityPropertiesShape: FlatModelShape = createFlatModelShape({
  clientId: { armPath: ["clientId"], value: createStringShape(), readOnly: true },
  principalId: { armPath: ["principalId"], value: createStringShape(), readOnly: true },
});

/**
 * The daily volume cap for ingestion.
 */
export interface WorkspaceCapping {
  /**
   * The workspace daily quota for ingestion.
   */
  dailyQuotaGb?: number;
  /**
   * The status of data ingestion for this workspace.
   */
  dataIngestionStatus?: DataIngestionStatus;
  /**
   * The time when the quota will be rest.
   */
  quotaNextResetTime?: string;
}

/**
 * Input type for The daily volume cap for ingestion.
 */
export interface WorkspaceCappingInput extends InputOf<WorkspaceCapping> {
  /**
   * The workspace daily quota for ingestion.
   */
  dailyQuotaGb?: ExpressionOrValue<number> | undefined;
}

/**
 * View type for The daily volume cap for ingestion.
 */
export interface WorkspaceCappingView extends InputOf<WorkspaceCapping> {
  /**
   * The workspace daily quota for ingestion.
   */
  dailyQuotaGb?: ExpressionOrValue<number> | undefined;
  /**
   * Read-only output: The status of data ingestion for this workspace.
   */
  readonly dataIngestionStatus?: Expression<DataIngestionStatus> | undefined;
  /**
   * Read-only output: The time when the quota will be rest.
   */
  readonly quotaNextResetTime?: Expression<string> | undefined;
}

export const workspaceCappingShape: FlatModelShape = createFlatModelShape({
  dailyQuotaGb: { armPath: ["dailyQuotaGb"], value: createNumberShape() },
  dataIngestionStatus: {
    armPath: ["dataIngestionStatus"],
    value: createUnionShape(),
    readOnly: true,
  },
  quotaNextResetTime: {
    armPath: ["quotaNextResetTime"],
    value: createStringShape(),
    readOnly: true,
  },
});

/**
 * The failover state of the replication.
 */
export interface WorkspaceFailoverProperties {
  /**
   * The last time when the failover state was updated.
   */
  lastModifiedDate?: Date;
  /**
   * The failover state of the replication.
   */
  state?: WorkspaceFailoverState;
}

/**
 * Input type for The failover state of the replication.
 */
export interface WorkspaceFailoverPropertiesInput extends InputOf<WorkspaceFailoverProperties> {}

/**
 * View type for The failover state of the replication.
 */
export interface WorkspaceFailoverPropertiesView extends InputOf<WorkspaceFailoverProperties> {
  /**
   * Read-only output: The last time when the failover state was updated.
   */
  readonly lastModifiedDate?: Expression<Date> | undefined;
  /**
   * Read-only output: The failover state of the replication.
   */
  readonly state?: Expression<WorkspaceFailoverState> | undefined;
}

export const workspaceFailoverPropertiesShape: FlatModelShape = createFlatModelShape({
  lastModifiedDate: {
    armPath: ["lastModifiedDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  state: { armPath: ["state"], value: createUnionShape(), readOnly: true },
});

/**
 * Workspace features.
 */
export interface WorkspaceFeatures {
  /**
   * List of associations for the workspace. Indicates if the workspace is associated with any of the following experiences: MDC, Sentinel, SentinelGraph, etc.
   */
  associations?: string[];
  /**
   * Dedicated LA cluster resourceId that is linked to the workspaces.
   */
  clusterResourceId?: string | null;
  /**
   * Enable Data authorization mode for the workspace.
   */
  dataAuthorizationMode?: boolean | null;
  /**
   * Disable Non-AAD based Auth.
   */
  disableLocalAuth?: boolean | null;
  /**
   * Flag that indicate if data should be exported.
   */
  enableDataExport?: boolean | null;
  /**
   * Flag that indicate which permission to use - resource or workspace or both.
   */
  enableLogAccessUsingOnlyResourcePermissions?: boolean | null;
  /**
   * Flag that describes if we want to remove the data after 30 days.
   */
  immediatePurgeDataOn30Days?: boolean | null;
  /**
   * An indication if the specify workspace is limited to sentinel's unified billing model only.
   */
  unifiedSentinelBillingOnly?: boolean | null;
}

/**
 * Input type for Workspace features.
 */
export interface WorkspaceFeaturesInput extends InputOf<WorkspaceFeatures> {
  /**
   * Dedicated LA cluster resourceId that is linked to the workspaces.
   */
  clusterResourceId?: ExpressionOrValue<string | null> | undefined;
  /**
   * Enable Data authorization mode for the workspace.
   */
  dataAuthorizationMode?: ExpressionOrValue<boolean | null> | undefined;
  /**
   * Disable Non-AAD based Auth.
   */
  disableLocalAuth?: ExpressionOrValue<boolean | null> | undefined;
  /**
   * Flag that indicate if data should be exported.
   */
  enableDataExport?: ExpressionOrValue<boolean | null> | undefined;
  /**
   * Flag that indicate which permission to use - resource or workspace or both.
   */
  enableLogAccessUsingOnlyResourcePermissions?: ExpressionOrValue<boolean | null> | undefined;
  /**
   * Flag that describes if we want to remove the data after 30 days.
   */
  immediatePurgeDataOn30Days?: ExpressionOrValue<boolean | null> | undefined;
}

/**
 * View type for Workspace features.
 */
export interface WorkspaceFeaturesView extends InputOf<WorkspaceFeatures> {
  /**
   * Read-only output: List of associations for the workspace. Indicates if the workspace is associated with any of the following experiences: MDC, Sentinel, SentinelGraph, etc.
   */
  readonly associations?: Expression<string[]> | undefined;
  /**
   * Dedicated LA cluster resourceId that is linked to the workspaces.
   */
  clusterResourceId?: ExpressionOrValue<string | null> | undefined;
  /**
   * Enable Data authorization mode for the workspace.
   */
  dataAuthorizationMode?: ExpressionOrValue<boolean | null> | undefined;
  /**
   * Disable Non-AAD based Auth.
   */
  disableLocalAuth?: ExpressionOrValue<boolean | null> | undefined;
  /**
   * Flag that indicate if data should be exported.
   */
  enableDataExport?: ExpressionOrValue<boolean | null> | undefined;
  /**
   * Flag that indicate which permission to use - resource or workspace or both.
   */
  enableLogAccessUsingOnlyResourcePermissions?: ExpressionOrValue<boolean | null> | undefined;
  /**
   * Flag that describes if we want to remove the data after 30 days.
   */
  immediatePurgeDataOn30Days?: ExpressionOrValue<boolean | null> | undefined;
  /**
   * Read-only output: An indication if the specify workspace is limited to sentinel's unified billing model only.
   */
  readonly unifiedSentinelBillingOnly?: Expression<boolean | null> | undefined;
}

export const workspaceFeaturesShape: FlatModelShape = createFlatModelShape({
  associations: {
    armPath: ["associations"],
    value: createArrayShape(createStringShape()),
    readOnly: true,
  },
  clusterResourceId: { armPath: ["clusterResourceId"], value: createStringShape() },
  dataAuthorizationMode: { armPath: ["dataAuthorizationMode"], value: createBooleanShape() },
  disableLocalAuth: { armPath: ["disableLocalAuth"], value: createBooleanShape() },
  enableDataExport: { armPath: ["enableDataExport"], value: createBooleanShape() },
  enableLogAccessUsingOnlyResourcePermissions: {
    armPath: ["enableLogAccessUsingOnlyResourcePermissions"],
    value: createBooleanShape(),
  },
  immediatePurgeDataOn30Days: {
    armPath: ["immediatePurgeDataOn30Days"],
    value: createBooleanShape(),
  },
  unifiedSentinelBillingOnly: {
    armPath: ["unifiedSentinelBillingOnly"],
    value: createBooleanShape(),
    readOnly: true,
  },
});

/**
 * Workspace properties.
 */
export interface WorkspaceProperties {
  /**
   * Workspace creation date.
   */
  createdDate?: Date;
  /**
   * This is a read-only property. Represents the ID associated with the workspace.
   */
  customerId?: string;
  /**
   * The resource ID of the default Data Collection Rule to use for this workspace. Expected format is - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules/{dcrName}.
   */
  defaultDataCollectionRuleResourceId?: string;
  /**
   * workspace failover properties.
   */
  failover?: WorkspaceFailoverProperties;
  /**
   * Workspace features.
   */
  features?: WorkspaceFeatures;
  /**
   * Indicates whether customer managed storage is mandatory for query management.
   */
  forceCmkForQuery?: boolean;
  /**
   * Workspace modification date.
   */
  modifiedDate?: Date;
  /**
   * List of linked private link scope resources.
   */
  privateLinkScopedResources?: PrivateLinkScopedResource[];
  /**
   * The provisioning state of the workspace.
   */
  provisioningState?: WorkspaceEntityStatus;
  /**
   * The network access type for accessing Log Analytics ingestion.
   */
  publicNetworkAccessForIngestion?: PublicNetworkAccessType;
  /**
   * The network access type for accessing Log Analytics query.
   */
  publicNetworkAccessForQuery?: PublicNetworkAccessType;
  /**
   * workspace replication properties.
   */
  replication?: WorkspaceReplicationProperties;
  /**
   * The workspace data retention in days. Allowed values are per pricing plan. See pricing tiers documentation for details.
   */
  retentionInDays?: number | null;
  /**
   * The SKU of the workspace.
   */
  sku?: WorkspaceSku;
  /**
   * The daily volume cap for ingestion.
   */
  workspaceCapping?: WorkspaceCapping;
}

/**
 * Input type for Workspace properties.
 */
export interface WorkspacePropertiesInput extends InputOf<WorkspaceProperties> {
  /**
   * The resource ID of the default Data Collection Rule to use for this workspace. Expected format is - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules/{dcrName}.
   */
  defaultDataCollectionRuleResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * workspace failover properties.
   */
  failover?: WorkspaceFailoverPropertiesInput | undefined;
  /**
   * Workspace features.
   */
  features?: WorkspaceFeaturesInput | undefined;
  /**
   * Indicates whether customer managed storage is mandatory for query management.
   */
  forceCmkForQuery?: ExpressionOrValue<boolean> | undefined;
  /**
   * The network access type for accessing Log Analytics ingestion.
   */
  publicNetworkAccessForIngestion?: ExpressionOrValue<PublicNetworkAccessType> | undefined;
  /**
   * The network access type for accessing Log Analytics query.
   */
  publicNetworkAccessForQuery?: ExpressionOrValue<PublicNetworkAccessType> | undefined;
  /**
   * workspace replication properties.
   */
  replication?: WorkspaceReplicationPropertiesInput | undefined;
  /**
   * The workspace data retention in days. Allowed values are per pricing plan. See pricing tiers documentation for details.
   */
  retentionInDays?: ExpressionOrValue<number | null> | undefined;
  /**
   * The SKU of the workspace.
   */
  sku?: WorkspaceSkuInput | undefined;
  /**
   * The daily volume cap for ingestion.
   */
  workspaceCapping?: WorkspaceCappingInput | undefined;
}

/**
 * View type for Workspace properties.
 */
export interface WorkspacePropertiesView extends InputOf<WorkspaceProperties> {
  /**
   * Read-only output: Workspace creation date.
   */
  readonly createdDate?: Expression<Date> | undefined;
  /**
   * Read-only output: This is a read-only property. Represents the ID associated with the workspace.
   */
  readonly customerId?: Expression<string> | undefined;
  /**
   * The resource ID of the default Data Collection Rule to use for this workspace. Expected format is - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules/{dcrName}.
   */
  defaultDataCollectionRuleResourceId?: ExpressionOrValue<string> | undefined;
  /**
   * workspace failover properties.
   */
  failover?: WorkspaceFailoverPropertiesView | undefined;
  /**
   * Workspace features.
   */
  features?: WorkspaceFeaturesView | undefined;
  /**
   * Indicates whether customer managed storage is mandatory for query management.
   */
  forceCmkForQuery?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: Workspace modification date.
   */
  readonly modifiedDate?: Expression<Date> | undefined;
  /**
   * Read-only output: List of linked private link scope resources.
   */
  readonly privateLinkScopedResources?: Expression<PrivateLinkScopedResource[]> | undefined;
  /**
   * Read-only output: The provisioning state of the workspace.
   */
  readonly provisioningState?: Expression<WorkspaceEntityStatus> | undefined;
  /**
   * The network access type for accessing Log Analytics ingestion.
   */
  publicNetworkAccessForIngestion?: ExpressionOrValue<PublicNetworkAccessType> | undefined;
  /**
   * The network access type for accessing Log Analytics query.
   */
  publicNetworkAccessForQuery?: ExpressionOrValue<PublicNetworkAccessType> | undefined;
  /**
   * workspace replication properties.
   */
  replication?: WorkspaceReplicationPropertiesView | undefined;
  /**
   * The workspace data retention in days. Allowed values are per pricing plan. See pricing tiers documentation for details.
   */
  retentionInDays?: ExpressionOrValue<number | null> | undefined;
  /**
   * The SKU of the workspace.
   */
  sku?: WorkspaceSkuView | undefined;
  /**
   * The daily volume cap for ingestion.
   */
  workspaceCapping?: WorkspaceCappingView | undefined;
}

export const workspacePropertiesShape: FlatModelShape = createFlatModelShape({
  createdDate: {
    armPath: ["createdDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  customerId: { armPath: ["customerId"], value: createStringShape(), readOnly: true },
  defaultDataCollectionRuleResourceId: {
    armPath: ["defaultDataCollectionRuleResourceId"],
    value: createStringShape(),
  },
  failover: {
    armPath: ["failover"],
    value: createDeferredShape(() => workspaceFailoverPropertiesShape),
  },
  features: { armPath: ["features"], value: createDeferredShape(() => workspaceFeaturesShape) },
  forceCmkForQuery: { armPath: ["forceCmkForQuery"], value: createBooleanShape() },
  modifiedDate: {
    armPath: ["modifiedDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  privateLinkScopedResources: {
    armPath: ["privateLinkScopedResources"],
    value: createArrayShape(createDeferredShape(() => privateLinkScopedResourceShape)),
    readOnly: true,
  },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
  publicNetworkAccessForIngestion: {
    armPath: ["publicNetworkAccessForIngestion"],
    value: createUnionShape(),
  },
  publicNetworkAccessForQuery: {
    armPath: ["publicNetworkAccessForQuery"],
    value: createUnionShape(),
  },
  replication: {
    armPath: ["replication"],
    value: createDeferredShape(() => workspaceReplicationPropertiesShape),
  },
  retentionInDays: { armPath: ["retentionInDays"], value: createNumberShape() },
  sku: { armPath: ["sku"], value: createDeferredShape(() => workspaceSkuShape) },
  workspaceCapping: {
    armPath: ["workspaceCapping"],
    value: createDeferredShape(() => workspaceCappingShape),
  },
});

/**
 * Workspace replication properties.
 */
export interface WorkspaceReplicationProperties {
  /**
   * The last time when the replication was enabled.
   */
  createdDate?: Date;
  /**
   * Specifies whether the replication is enabled or not. When true, workspace configuration and data is replicated to the specified location. If replication is been enabled, location must be provided.
   */
  enabled?: boolean;
  /**
   * The last time when the replication was updated.
   */
  lastModifiedDate?: Date;
  /**
   * The location of the replication.
   */
  location?: string;
  /**
   * The provisioning state of the replication.
   */
  provisioningState?: WorkspaceReplicationState;
}

/**
 * Input type for Workspace replication properties.
 */
export interface WorkspaceReplicationPropertiesInput extends InputOf<WorkspaceReplicationProperties> {
  /**
   * Specifies whether the replication is enabled or not. When true, workspace configuration and data is replicated to the specified location. If replication is been enabled, location must be provided.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * The location of the replication.
   */
  location?: ExpressionOrValue<string> | undefined;
}

/**
 * View type for Workspace replication properties.
 */
export interface WorkspaceReplicationPropertiesView extends InputOf<WorkspaceReplicationProperties> {
  /**
   * Read-only output: The last time when the replication was enabled.
   */
  readonly createdDate?: Expression<Date> | undefined;
  /**
   * Specifies whether the replication is enabled or not. When true, workspace configuration and data is replicated to the specified location. If replication is been enabled, location must be provided.
   */
  enabled?: ExpressionOrValue<boolean> | undefined;
  /**
   * Read-only output: The last time when the replication was updated.
   */
  readonly lastModifiedDate?: Expression<Date> | undefined;
  /**
   * The location of the replication.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Read-only output: The provisioning state of the replication.
   */
  readonly provisioningState?: Expression<WorkspaceReplicationState> | undefined;
}

export const workspaceReplicationPropertiesShape: FlatModelShape = createFlatModelShape({
  createdDate: {
    armPath: ["createdDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  enabled: { armPath: ["enabled"], value: createBooleanShape() },
  lastModifiedDate: {
    armPath: ["lastModifiedDate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  location: { armPath: ["location"], value: createStringShape() },
  provisioningState: { armPath: ["provisioningState"], value: createUnionShape(), readOnly: true },
});

/**
 * The SKU (tier) of a workspace.
 */
export interface WorkspaceSku {
  /**
   * The capacity reservation level in GB for this workspace, when CapacityReservation sku is selected.
   */
  capacityReservationLevel?: number | null;
  /**
   * The last time when the sku was updated.
   */
  lastSkuUpdate?: Date;
  /**
   * The name of the SKU.
   */
  name: WorkspaceSkuNameEnum;
}

/**
 * Input type for The SKU (tier) of a workspace.
 */
export interface WorkspaceSkuInput extends InputOf<WorkspaceSku> {
  /**
   * The capacity reservation level in GB for this workspace, when CapacityReservation sku is selected.
   */
  capacityReservationLevel?: ExpressionOrValue<number | null> | undefined;
  /**
   * The name of the SKU.
   */
  name: ExpressionOrValue<WorkspaceSkuNameEnum>;
}

/**
 * View type for The SKU (tier) of a workspace.
 */
export interface WorkspaceSkuView extends InputOf<WorkspaceSku> {
  /**
   * The capacity reservation level in GB for this workspace, when CapacityReservation sku is selected.
   */
  capacityReservationLevel?: ExpressionOrValue<number | null> | undefined;
  /**
   * Read-only output: The last time when the sku was updated.
   */
  readonly lastSkuUpdate?: Expression<Date> | undefined;
  /**
   * The name of the SKU.
   */
  name: ExpressionOrValue<WorkspaceSkuNameEnum>;
}

export const workspaceSkuShape: FlatModelShape = createFlatModelShape({
  capacityReservationLevel: { armPath: ["capacityReservationLevel"], value: createNumberShape() },
  lastSkuUpdate: {
    armPath: ["lastSkuUpdate"],
    value: createDateShape({
      kind: "date-time-text",
      source: "utcDateTime",
      format: "rfc3339",
      clientMode: "client",
      wire: { kind: "string" },
    }),
    readOnly: true,
  },
  name: { armPath: ["name"], value: createUnionShape() },
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
 * Configures whether billing will be only on the cluster or each workspace will be billed by its proportional use. This does not change the overall billing, only how it will be distributed. Default value is 'Cluster'
 *
 * Known values:
 *
 * - `"Cluster"`: Cluster
 *
 * - `"Workspaces"`: Workspaces
 */
export type BillingType = string;

/**
 * The provisioning state of the cluster.
 *
 * Known values:
 *
 * - `"Creating"`: Creating
 *
 * - `"Succeeded"`: Succeeded
 *
 * - `"Failed"`: Failed
 *
 * - `"Canceled"`: Canceled
 *
 * - `"Deleting"`: Deleting
 *
 * - `"ProvisioningAccount"`: ProvisioningAccount
 *
 * - `"Updating"`: Updating
 */
export type ClusterEntityStatus = string;

/**
 * The provisioning state of the cluster replication.
 *
 * Known values:
 *
 * - `"Succeeded"`: Succeeded
 *
 * - `"EnableRequested"`: EnableRequested
 *
 * - `"Enabling"`: Enabling
 *
 * - `"DisableRequested"`: DisableRequested
 *
 * - `"Disabling"`: Disabling
 *
 * - `"RollbackRequested"`: RollbackRequested
 *
 * - `"RollingBack"`: RollingBack
 *
 * - `"Failed"`: Failed
 *
 * - `"Canceled"`: Canceled
 */
export type ClusterReplicationState = string;

/**
 * The SKU (tier) of a cluster.
 *
 * Known values:
 *
 * - `"CapacityReservation"`: CapacityReservation
 */
export type ClusterSkuNameEnum = string;

/**
 * Column data type logical hint.
 *
 * Known values:
 *
 * - `"uri"`: A string that matches the pattern of a URI, for example, scheme://username:password@host:1234/this/is/a/path?k1=v1&k2=v2#fragment
 *
 * - `"guid"`: A standard 128-bit GUID following the standard shape, xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 *
 * - `"armPath"`: An Azure Resource Model (ARM) path: /subscriptions/{...}/resourceGroups/{...}/providers/Microsoft.{...}/{...}/{...}/{...}...
 *
 * - `"ip"`: A standard V4/V6 ip address following the standard shape, x.x.x.x/y:y:y:y:y:y:y:y
 *
 * - `"vector16"`: A vector of single-precision floating-point values used for semantic / similarity search.
 */
export type ColumnDataTypeHintEnum = string;

/**
 * Column data type.
 *
 * Known values:
 *
 * - `"string"`: string
 *
 * - `"int"`: int
 *
 * - `"long"`: long
 *
 * - `"real"`: real
 *
 * - `"boolean"`: boolean
 *
 * - `"dateTime"`: dateTime
 *
 * - `"guid"`: guid
 *
 * - `"dynamic"`: dynamic
 */
export type ColumnTypeEnum = string;

/**
 * The status of data ingestion for this workspace.
 *
 * Known values:
 *
 * - `"RespectQuota"`: Ingestion enabled following daily cap quota reset, or subscription enablement.
 *
 * - `"ForceOn"`: Ingestion started following service setting change.
 *
 * - `"ForceOff"`: Ingestion stopped following service setting change.
 *
 * - `"OverQuota"`: Reached daily cap quota, ingestion stopped.
 *
 * - `"SubscriptionSuspended"`: Ingestion stopped following suspended subscription.
 *
 * - `"ApproachingQuota"`: 80% of daily cap quota reached.
 */
export type DataIngestionStatus = string;

/**
 * The kind of the DataSource.
 *
 * Known values:
 *
 * - `"WindowsEvent"`: WindowsEvent
 *
 * - `"WindowsPerformanceCounter"`: WindowsPerformanceCounter
 *
 * - `"IISLogs"`: IISLogs
 *
 * - `"LinuxSyslog"`: LinuxSyslog
 *
 * - `"LinuxSyslogCollection"`: LinuxSyslogCollection
 *
 * - `"LinuxPerformanceObject"`: LinuxPerformanceObject
 *
 * - `"LinuxPerformanceCollection"`: LinuxPerformanceCollection
 *
 * - `"CustomLog"`: CustomLog
 *
 * - `"CustomLogCollection"`: CustomLogCollection
 *
 * - `"AzureAuditLog"`: AzureAuditLog
 *
 * - `"AzureActivityLog"`: AzureActivityLog
 *
 * - `"GenericDataSource"`: GenericDataSource
 *
 * - `"ChangeTrackingCustomPath"`: ChangeTrackingCustomPath
 *
 * - `"ChangeTrackingPath"`: ChangeTrackingPath
 *
 * - `"ChangeTrackingServices"`: ChangeTrackingServices
 *
 * - `"ChangeTrackingDataTypeConfiguration"`: ChangeTrackingDataTypeConfiguration
 *
 * - `"ChangeTrackingDefaultRegistry"`: ChangeTrackingDefaultRegistry
 *
 * - `"ChangeTrackingRegistry"`: ChangeTrackingRegistry
 *
 * - `"ChangeTrackingLinuxPath"`: ChangeTrackingLinuxPath
 *
 * - `"LinuxChangeTrackingPath"`: LinuxChangeTrackingPath
 *
 * - `"ChangeTrackingContentLocation"`: ChangeTrackingContentLocation
 *
 * - `"WindowsTelemetry"`: WindowsTelemetry
 *
 * - `"Office365"`: Office365
 *
 * - `"SecurityWindowsBaselineConfiguration"`: SecurityWindowsBaselineConfiguration
 *
 * - `"SecurityCenterSecurityWindowsBaselineConfiguration"`: SecurityCenterSecurityWindowsBaselineConfiguration
 *
 * - `"SecurityEventCollectionConfiguration"`: SecurityEventCollectionConfiguration
 *
 * - `"SecurityInsightsSecurityEventCollectionConfiguration"`: SecurityInsightsSecurityEventCollectionConfiguration
 *
 * - `"ImportComputerGroup"`: ImportComputerGroup
 *
 * - `"NetworkMonitoring"`: NetworkMonitoring
 *
 * - `"Itsm"`: Itsm
 *
 * - `"DnsAnalytics"`: DnsAnalytics
 *
 * - `"ApplicationInsights"`: ApplicationInsights
 *
 * - `"SqlDataClassification"`: SqlDataClassification
 */
export type DataSourceKind = string;

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
 * The provisioning state of the linked service.
 *
 * Known values:
 *
 * - `"Succeeded"`: Succeeded
 *
 * - `"Deleting"`: Deleting
 *
 * - `"ProvisioningAccount"`: ProvisioningAccount
 *
 * - `"Updating"`: Updating
 */
export type LinkedServiceEntityStatus = string;

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed).
 *
 * Known values:
 *
 * - `"None"`: No managed identity.
 *
 * - `"SystemAssigned"`: System assigned managed identity.
 *
 * - `"UserAssigned"`: User assigned managed identity.
 *
 * - `"SystemAssigned,UserAssigned"`: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

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
 * Table's current provisioning state. If set to 'updating', indicates a resource lock due to ongoing operation, forbidding any update to the table until the ongoing operation is concluded.
 *
 * Known values:
 *
 * - `"Updating"`: Table schema is still being built and updated, table is currently locked for any changes till the procedure is done.
 *
 * - `"InProgress"`: Table schema is stable and without changes, table data is being updated.
 *
 * - `"Succeeded"`: Table state is stable and without changes, table is unlocked and open for new updates.
 *
 * - `"Deleting"`: Table state is deleting.
 */
export type OperationalInsightsTableProvisioningState = string;

/**
 * Table's current provisioning state. If set to 'updating', indicates a resource lock due to ongoing operation, forbidding any update to the table until the ongoing operation is concluded.
 *
 * Known values:
 *
 * - `"Updating"`: Table schema is still being built and updated, table is currently locked for any changes till the procedure is done.
 *
 * - `"Succeeded"`: Table state is stable and without changes, table is unlocked and open for new updates.
 *
 * - `"Deleting"`: Table state is deleting.
 *
 * - `"Failed"`: Table state is failed.
 *
 * - `"Canceled"`: Table state is canceled.
 */
export type ProvisioningStateEnum = string;

/**
 * The network access type for operating on the Log Analytics Workspace. By default it is Enabled
 *
 * Known values:
 *
 * - `"Enabled"`: Enables connectivity to Log Analytics through public DNS.
 *
 * - `"Disabled"`: Disables public connectivity to Log Analytics through public DNS.
 *
 * - `"SecuredByPerimeter"`: Resource is only accessible from private networks and access approved by network security perimeter associated to this resource.
 */
export type PublicNetworkAccessType = string;

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
 * SummaryRules rule type: User.
 *
 * Known values:
 *
 * - `"User"`: User defined summary rule. This is the definition for rules created and defined by users.
 */
export type RuleTypeEnum = string;

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
 * Table's creator.
 *
 * Known values:
 *
 * - `"microsoft"`: Tables provisioned by the system, as collected via Diagnostic Settings, the Agents, or any other standard data collection means.
 *
 * - `"customer"`: Tables created by the owner of the Workspace, and only found in this Workspace.
 */
export type SourceEnum = string;

/**
 * Indicates the reason for rule deactivation.
 *
 * Known values:
 *
 * - `"UserAction"`: Summary rule stop originated from a user action (Stop was called).
 *
 * - `"DataPlaneError"`: Summary rule stop was caused due to data plane related error.
 */
export type StatusCodeEnum = string;

/**
 * The state of the storage insight connection to the workspace
 *
 * Known values:
 *
 * - `"OK"`: OK
 *
 * - `"ERROR"`: ERROR
 */
export type StorageInsightState = string;

/**
 * Type of managed service identity.
 *
 * Known values:
 *
 * - `"None"`: The default identity type. summary logs do not have a managed identity.
 *
 * - `"UserAssigned"`: summary logs is associated with a user assigned managed identity. User assigned identities are created as separate Azure resources and can be shared across multiple summary logs.
 */
export type SummaryLogsIdentityType = string;

/**
 * Instruct the system how to handle and charge the logs ingested to this table.
 *
 * Known values:
 *
 * - `"Basic"`: Medium-touch logs needed for troubleshooting and incident response.
 *
 * - `"Analytics"`: High-value logs used for continuous monitoring, real-time detection, and performance analytics.
 *
 * - `"Auxiliary"`: Low-touch logs, such as verbose logs, and data required for auditing and compliance.
 */
export type TablePlanEnum = string;

/**
 * The protection level of the table. Determines the default data access isolation behavior.
 *
 * Known values:
 *
 * - `"General"`: The default protection level. Table data is accessible through standard permissions.
 *
 * - `"Protected"`: Table data is isolated by default. Accessing or exporting data requires explicit, scoped authorization.
 */
export type TableProtectionLevelEnum = string;

/**
 * The subtype describes what APIs can be used to interact with the table, and what features are available against it.
 *
 * Known values:
 *
 * - `"Any"`: The default subtype with which built-in tables are created.
 *
 * - `"Classic"`: Indicates a table created through the Data Collector API or with the custom logs feature of the MMA agent, or any table against which Custom Fields were created.
 *
 * - `"DataCollectionRuleBased"`: A table eligible to have data sent into it via any of the means supported by Data Collection Rules: the Data Collection Endpoint API, ingestion-time transformations, or any other mechanism provided by Data Collection Rules
 */
export type TableSubTypeEnum = string;

/**
 * Table's creator.
 *
 * Known values:
 *
 * - `"Microsoft"`: Standard data collected by Azure Monitor.
 *
 * - `"CustomLog"`: Custom log table.
 *
 * - `"RestoredLogs"`: Restored data.
 *
 * - `"SearchResults"`: Data collected by a search job.
 */
export type TableTypeEnum = string;

/**
 * The time cursor used in Summary rules bins processing, e.g. TimeGenerated.
 *
 * Known values:
 *
 * - `"TimeGenerated"`: TimeGenerated.
 */
export type TimeSelectorEnum = string;

/**
 * The type of the destination resource
 *
 * Known values:
 *
 * - `"StorageAccount"`: StorageAccount
 *
 * - `"EventHub"`: EventHub
 */
export type Type = string;

/**
 * The provisioning state of the workspace.
 *
 * Known values:
 *
 * - `"Creating"`: Creating
 *
 * - `"Succeeded"`: Succeeded
 *
 * - `"Failed"`: Failed
 *
 * - `"Canceled"`: Canceled
 *
 * - `"Deleting"`: Deleting
 *
 * - `"ProvisioningAccount"`: ProvisioningAccount
 *
 * - `"Updating"`: Updating
 */
export type WorkspaceEntityStatus = string;

/**
 * The failover state of the replication.
 *
 * Known values:
 *
 * - `"Inactive"`: Inactive
 *
 * - `"Activating"`: Activating
 *
 * - `"Active"`: Active
 *
 * - `"Deactivating"`: Deactivating
 *
 * - `"Failed"`: Failed
 */
export type WorkspaceFailoverState = string;

/**
 * The provisioning state of the replication.
 *
 * Known values:
 *
 * - `"Succeeded"`: Succeeded
 *
 * - `"EnableRequested"`: EnableRequested
 *
 * - `"Enabling"`: Enabling
 *
 * - `"DisableRequested"`: DisableRequested
 *
 * - `"Disabling"`: Disabling
 *
 * - `"RollbackRequested"`: RollbackRequested
 *
 * - `"RollingBack"`: RollingBack
 *
 * - `"Failed"`: Failed
 *
 * - `"Canceled"`: Canceled
 */
export type WorkspaceReplicationState = string;

/**
 * The name of the SKU.
 *
 * Known values:
 *
 * - `"Free"`: Free
 *
 * - `"Standard"`: Standard
 *
 * - `"Premium"`: Premium
 *
 * - `"PerNode"`: PerNode
 *
 * - `"PerGB2018"`: PerGB2018
 *
 * - `"Standalone"`: Standalone
 *
 * - `"CapacityReservation"`: CapacityReservation
 *
 * - `"LACluster"`: LACluster
 */
export type WorkspaceSkuNameEnum = string;

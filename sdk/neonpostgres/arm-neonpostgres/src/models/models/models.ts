// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceProvisioningState } from "../models.js";

/** Properties specific to Project */
export interface ProjectProperties {
  /** Unique identifier for the entity */
  readonly entityId?: string;
  /** Name of the resource */
  entityName?: string;
  /** Timestamp indicating when the entity was created */
  readonly createdAt?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Additional attributes for the entity */
  attributes?: Attributes[];
  /** Region where the project is created */
  regionId?: string;
  /** Data Storage bytes per hour for the project */
  storage?: number;
  /** Postgres version for the project */
  pgVersion?: number;
  /** The retention period for project history in seconds. */
  historyRetention?: number;
  /** Default endpoint settings for the project. */
  defaultEndpointSettings?: DefaultEndpointSettings;
  /** The Branch properties of the project. This is optional */
  branch?: BranchProperties;
  /** Roles associated with the project */
  roles?: NeonRoleProperties[];
  /** Neon Databases associated with the project */
  databases?: NeonDatabaseProperties[];
  /** Endpoints associated with the project */
  endpoints?: EndpointProperties[];
}

export function projectPropertiesSerializer(item: ProjectProperties): any {
  return {
    entityName: item["entityName"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArraySerializer(item["attributes"]),
    regionId: item["regionId"],
    storage: item["storage"],
    pgVersion: item["pgVersion"],
    historyRetention: item["historyRetention"],
    defaultEndpointSettings: !item["defaultEndpointSettings"]
      ? item["defaultEndpointSettings"]
      : defaultEndpointSettingsSerializer(item["defaultEndpointSettings"]),
    branch: !item["branch"] ? item["branch"] : branchPropertiesSerializer(item["branch"]),
    roles: !item["roles"] ? item["roles"] : neonRolePropertiesArraySerializer(item["roles"]),
    databases: !item["databases"]
      ? item["databases"]
      : neonDatabasePropertiesArraySerializer(item["databases"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointPropertiesArraySerializer(item["endpoints"]),
  };
}

export function projectPropertiesDeserializer(item: any): ProjectProperties {
  return {
    entityId: item["entityId"],
    entityName: item["entityName"],
    createdAt: item["createdAt"],
    provisioningState: item["provisioningState"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArrayDeserializer(item["attributes"]),
    regionId: item["regionId"],
    storage: item["storage"],
    pgVersion: item["pgVersion"],
    historyRetention: item["historyRetention"],
    defaultEndpointSettings: !item["defaultEndpointSettings"]
      ? item["defaultEndpointSettings"]
      : defaultEndpointSettingsDeserializer(item["defaultEndpointSettings"]),
    branch: !item["branch"] ? item["branch"] : branchPropertiesDeserializer(item["branch"]),
    roles: !item["roles"] ? item["roles"] : neonRolePropertiesArrayDeserializer(item["roles"]),
    databases: !item["databases"]
      ? item["databases"]
      : neonDatabasePropertiesArrayDeserializer(item["databases"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointPropertiesArrayDeserializer(item["endpoints"]),
  };
}

export function attributesArraySerializer(result: Array<Attributes>): any[] {
  return result.map((item) => {
    return attributesSerializer(item);
  });
}

export function attributesArrayDeserializer(result: Array<Attributes>): any[] {
  return result.map((item) => {
    return attributesDeserializer(item);
  });
}

/** Additional attributes specific to Neon Resources */
export interface Attributes {
  /** Name of the attribute */
  name: string;
  /** Value of the attribute */
  value: string;
}

export function attributesSerializer(item: Attributes): any {
  return { name: item["name"], value: item["value"] };
}

export function attributesDeserializer(item: any): Attributes {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Default Endpoint Settings for the project. */
export interface DefaultEndpointSettings {
  /** Minimum compute units for autoscaling. */
  autoscalingLimitMinCu: number;
  /** Maximum compute units for autoscaling. */
  autoscalingLimitMaxCu: number;
}

export function defaultEndpointSettingsSerializer(item: DefaultEndpointSettings): any {
  return {
    autoscalingLimitMinCu: item["autoscalingLimitMinCu"],
    autoscalingLimitMaxCu: item["autoscalingLimitMaxCu"],
  };
}

export function defaultEndpointSettingsDeserializer(item: any): DefaultEndpointSettings {
  return {
    autoscalingLimitMinCu: item["autoscalingLimitMinCu"],
    autoscalingLimitMaxCu: item["autoscalingLimitMaxCu"],
  };
}

/** Properties specific to Branch */
export interface BranchProperties {
  /** Unique identifier for the entity */
  readonly entityId?: string;
  /** Name of the resource */
  entityName?: string;
  /** Timestamp indicating when the entity was created */
  readonly createdAt?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Additional attributes for the entity */
  attributes?: Attributes[];
  /** The ID of the project this branch belongs to */
  projectId?: string;
  /** The ID of the parent branch */
  parentId?: string;
  /** Role name associated with the branch */
  roleName?: string;
  /** Database name associated with the branch */
  databaseName?: string;
  /** Roles associated with the branch */
  roles?: NeonRoleProperties[];
  /** Neon Databases associated with the branch */
  databases?: NeonDatabaseProperties[];
  /** Endpoints associated with the branch */
  endpoints?: EndpointProperties[];
}

export function branchPropertiesSerializer(item: BranchProperties): any {
  return {
    entityName: item["entityName"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArraySerializer(item["attributes"]),
    projectId: item["projectId"],
    parentId: item["parentId"],
    roleName: item["roleName"],
    databaseName: item["databaseName"],
    roles: !item["roles"] ? item["roles"] : neonRolePropertiesArraySerializer(item["roles"]),
    databases: !item["databases"]
      ? item["databases"]
      : neonDatabasePropertiesArraySerializer(item["databases"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointPropertiesArraySerializer(item["endpoints"]),
  };
}

export function branchPropertiesDeserializer(item: any): BranchProperties {
  return {
    entityId: item["entityId"],
    entityName: item["entityName"],
    createdAt: item["createdAt"],
    provisioningState: item["provisioningState"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArrayDeserializer(item["attributes"]),
    projectId: item["projectId"],
    parentId: item["parentId"],
    roleName: item["roleName"],
    databaseName: item["databaseName"],
    roles: !item["roles"] ? item["roles"] : neonRolePropertiesArrayDeserializer(item["roles"]),
    databases: !item["databases"]
      ? item["databases"]
      : neonDatabasePropertiesArrayDeserializer(item["databases"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointPropertiesArrayDeserializer(item["endpoints"]),
  };
}

export function neonRolePropertiesArraySerializer(result: Array<NeonRoleProperties>): any[] {
  return result.map((item) => {
    return neonRolePropertiesSerializer(item);
  });
}

export function neonRolePropertiesArrayDeserializer(result: Array<NeonRoleProperties>): any[] {
  return result.map((item) => {
    return neonRolePropertiesDeserializer(item);
  });
}

/** Properties specific to Roles */
export interface NeonRoleProperties {
  /** Unique identifier for the entity */
  readonly entityId?: string;
  /** Name of the resource */
  entityName?: string;
  /** Timestamp indicating when the entity was created */
  readonly createdAt?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Additional attributes for the entity */
  attributes?: Attributes[];
  /** The ID of the branch this role belongs to */
  branchId?: string;
  /** Permissions assigned to the role */
  permissions?: string[];
  /** Indicates whether the role has superuser privileges */
  isSuperUser?: boolean;
}

export function neonRolePropertiesSerializer(item: NeonRoleProperties): any {
  return {
    entityName: item["entityName"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArraySerializer(item["attributes"]),
    branchId: item["branchId"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : item["permissions"].map((p: any) => {
          return p;
        }),
    isSuperUser: item["isSuperUser"],
  };
}

export function neonRolePropertiesDeserializer(item: any): NeonRoleProperties {
  return {
    entityId: item["entityId"],
    entityName: item["entityName"],
    createdAt: item["createdAt"],
    provisioningState: item["provisioningState"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArrayDeserializer(item["attributes"]),
    branchId: item["branchId"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : item["permissions"].map((p: any) => {
          return p;
        }),
    isSuperUser: item["isSuperUser"],
  };
}

export function neonDatabasePropertiesArraySerializer(
  result: Array<NeonDatabaseProperties>,
): any[] {
  return result.map((item) => {
    return neonDatabasePropertiesSerializer(item);
  });
}

export function neonDatabasePropertiesArrayDeserializer(
  result: Array<NeonDatabaseProperties>,
): any[] {
  return result.map((item) => {
    return neonDatabasePropertiesDeserializer(item);
  });
}

/** Properties specific to Databases */
export interface NeonDatabaseProperties {
  /** Unique identifier for the entity */
  readonly entityId?: string;
  /** Name of the resource */
  entityName?: string;
  /** Timestamp indicating when the entity was created */
  readonly createdAt?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Additional attributes for the entity */
  attributes?: Attributes[];
  /** The ID of the branch this database belongs to */
  branchId?: string;
  /** The name of the role that owns the database */
  ownerName?: string;
}

export function neonDatabasePropertiesSerializer(item: NeonDatabaseProperties): any {
  return {
    entityName: item["entityName"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArraySerializer(item["attributes"]),
    branchId: item["branchId"],
    ownerName: item["ownerName"],
  };
}

export function neonDatabasePropertiesDeserializer(item: any): NeonDatabaseProperties {
  return {
    entityId: item["entityId"],
    entityName: item["entityName"],
    createdAt: item["createdAt"],
    provisioningState: item["provisioningState"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArrayDeserializer(item["attributes"]),
    branchId: item["branchId"],
    ownerName: item["ownerName"],
  };
}

export function endpointPropertiesArraySerializer(result: Array<EndpointProperties>): any[] {
  return result.map((item) => {
    return endpointPropertiesSerializer(item);
  });
}

export function endpointPropertiesArrayDeserializer(result: Array<EndpointProperties>): any[] {
  return result.map((item) => {
    return endpointPropertiesDeserializer(item);
  });
}

/** Properties specific to Endpoints */
export interface EndpointProperties {
  /** Unique identifier for the entity */
  readonly entityId?: string;
  /** Name of the resource */
  entityName?: string;
  /** Timestamp indicating when the entity was created */
  readonly createdAt?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Additional attributes for the entity */
  attributes?: Attributes[];
  /** The ID of the project this endpoint belongs to */
  projectId?: string;
  /** The ID of the branch this endpoint belongs to */
  branchId?: string;
  /** The type of the endpoint */
  endpointType?: EndpointType;
}

export function endpointPropertiesSerializer(item: EndpointProperties): any {
  return {
    entityName: item["entityName"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArraySerializer(item["attributes"]),
    projectId: item["projectId"],
    branchId: item["branchId"],
    endpointType: item["endpointType"],
  };
}

export function endpointPropertiesDeserializer(item: any): EndpointProperties {
  return {
    entityId: item["entityId"],
    entityName: item["entityName"],
    createdAt: item["createdAt"],
    provisioningState: item["provisioningState"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArrayDeserializer(item["attributes"]),
    projectId: item["projectId"],
    branchId: item["branchId"],
    endpointType: item["endpointType"],
  };
}

/** The compute endpoint type. Either read_write or read_only. */
export enum KnownEndpointType {
  /** ReadOnly compute endpoint type */
  ReadOnly = "read_only",
  /** ReadWrite compute endpoint type */
  ReadWrite = "read_write",
}

/**
 * The compute endpoint type. Either read_write or read_only. \
 * {@link KnownEndpointType} can be used interchangeably with EndpointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **read_only**: ReadOnly compute endpoint type \
 * **read_write**: ReadWrite compute endpoint type
 */
export type EndpointType = string;

/** PostgreSQL Version model */
export interface PgVersion {
  /** The major PostgreSQL version number */
  version?: number;
}

export function pgVersionSerializer(item: PgVersion): any {
  return { version: item["version"] };
}

export function pgVersionDeserializer(item: any): PgVersion {
  return {
    version: item["version"],
  };
}

/** Response model for PostgreSQL versions */
export interface PgVersionsResult {
  /** List of PostgreSQL versions */
  versions: PgVersion[];
}

export function pgVersionsResultDeserializer(item: any): PgVersionsResult {
  return {
    versions: pgVersionArrayDeserializer(item["versions"]),
  };
}

export function pgVersionArraySerializer(result: Array<PgVersion>): any[] {
  return result.map((item) => {
    return pgVersionSerializer(item);
  });
}

export function pgVersionArrayDeserializer(result: Array<PgVersion>): any[] {
  return result.map((item) => {
    return pgVersionDeserializer(item);
  });
}

/** Connection uri parameters for the associated database */
export interface ConnectionUriProperties {
  /** Project Id associated with this connection */
  projectId?: string;
  /** Branch Id associated with this connection */
  branchId?: string;
  /** Database name associated with this connection */
  databaseName?: string;
  /** The role name used for authentication */
  roleName?: string;
  /** the endpoint Id with this connection */
  endpointId?: string;
  /** Indicates if the connection is pooled */
  isPooled?: boolean;
  /** connection uri returned for the database */
  readonly connectionStringUri?: string;
}

export function connectionUriPropertiesSerializer(item: ConnectionUriProperties): any {
  return {
    projectId: item["projectId"],
    branchId: item["branchId"],
    databaseName: item["databaseName"],
    roleName: item["roleName"],
    endpointId: item["endpointId"],
    isPooled: item["isPooled"],
  };
}

export function connectionUriPropertiesDeserializer(item: any): ConnectionUriProperties {
  return {
    projectId: item["projectId"],
    branchId: item["branchId"],
    databaseName: item["databaseName"],
    roleName: item["roleName"],
    endpointId: item["endpointId"],
    isPooled: item["isPooled"],
    connectionStringUri: item["connectionStringUri"],
  };
}

/** Properties specific to Compute */
export interface ComputeProperties {
  /** Unique identifier for the entity */
  readonly entityId?: string;
  /** Name of the resource */
  entityName?: string;
  /** Timestamp indicating when the entity was created */
  readonly createdAt?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
  /** Additional attributes for the entity */
  attributes?: Attributes[];
  /** Region where the compute instance is located */
  region?: string;
  /** Number of allocated CPU cores */
  cpuCores?: number;
  /** Memory allocated in GB */
  memory?: number;
  /** Current status of the compute instance */
  status?: string;
}

export function computePropertiesSerializer(item: ComputeProperties): any {
  return {
    entityName: item["entityName"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArraySerializer(item["attributes"]),
    region: item["region"],
    cpuCores: item["cpuCores"],
    memory: item["memory"],
    status: item["status"],
  };
}

export function computePropertiesDeserializer(item: any): ComputeProperties {
  return {
    entityId: item["entityId"],
    entityName: item["entityName"],
    createdAt: item["createdAt"],
    provisioningState: item["provisioningState"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : attributesArrayDeserializer(item["attributes"]),
    region: item["region"],
    cpuCores: item["cpuCores"],
    memory: item["memory"],
    status: item["status"],
  };
}

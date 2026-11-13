// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  type ExistingResourceProps,
  type Expression,
  type ExpressionOrValue,
  type ProvisioningComponent,
  Resource,
  type ResourceOptions,
} from "@azure/provisioning-core";
import {
  createDeferredShape,
  createFlatModelShape,
  createRecordShape,
  createStringLiteralShape,
  createStringShape,
  createUnionShape,
  type InputRecord,
  type ResourceNamingRules,
  type ResourceProps,
  type SingletonExistingResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type CassandraKeyspaceGetPropertiesInput,
  cassandraKeyspaceGetPropertiesShape,
  type CassandraKeyspaceGetPropertiesView,
  type CassandraRoleAssignmentResourcePropertiesInput,
  cassandraRoleAssignmentResourcePropertiesShape,
  type CassandraRoleAssignmentResourcePropertiesView,
  type CassandraRoleDefinitionResourcePropertiesInput,
  cassandraRoleDefinitionResourcePropertiesShape,
  type CassandraRoleDefinitionResourcePropertiesView,
  type CassandraTableGetPropertiesInput,
  cassandraTableGetPropertiesShape,
  type CassandraTableGetPropertiesView,
  type ClientEncryptionKeyGetPropertiesInput,
  clientEncryptionKeyGetPropertiesShape,
  type ClientEncryptionKeyGetPropertiesView,
  type DatabaseAccountGetPropertiesInput,
  databaseAccountGetPropertiesShape,
  type DatabaseAccountGetPropertiesView,
  type DatabaseAccountKind,
  type GremlinDatabaseGetPropertiesInput,
  gremlinDatabaseGetPropertiesShape,
  type GremlinDatabaseGetPropertiesView,
  type GremlinGraphGetPropertiesInput,
  gremlinGraphGetPropertiesShape,
  type GremlinGraphGetPropertiesView,
  type GremlinRoleAssignmentResourcePropertiesInput,
  gremlinRoleAssignmentResourcePropertiesShape,
  type GremlinRoleAssignmentResourcePropertiesView,
  type GremlinRoleDefinitionResourcePropertiesInput,
  gremlinRoleDefinitionResourcePropertiesShape,
  type GremlinRoleDefinitionResourcePropertiesView,
  type ManagedServiceIdentityInput,
  managedServiceIdentityShape,
  type ManagedServiceIdentityView,
  type MongoDbCollectionGetPropertiesInput,
  mongoDbCollectionGetPropertiesShape,
  type MongoDbCollectionGetPropertiesView,
  type MongoDbDatabaseGetPropertiesInput,
  mongoDbDatabaseGetPropertiesShape,
  type MongoDbDatabaseGetPropertiesView,
  type MongoMiRoleAssignmentResourcePropertiesInput,
  mongoMiRoleAssignmentResourcePropertiesShape,
  type MongoMiRoleAssignmentResourcePropertiesView,
  type MongoMiRoleDefinitionResourcePropertiesInput,
  mongoMiRoleDefinitionResourcePropertiesShape,
  type MongoMiRoleDefinitionResourcePropertiesView,
  type MongoRoleDefinitionResourceInput,
  mongoRoleDefinitionResourceShape,
  type MongoRoleDefinitionResourceView,
  type MongoUserDefinitionResourceInput,
  mongoUserDefinitionResourceShape,
  type MongoUserDefinitionResourceView,
  type NotebookWorkspaceName,
  type NotebookWorkspaceProperties,
  notebookWorkspacePropertiesShape,
  type PrivateEndpointConnectionPropertiesInput,
  privateEndpointConnectionPropertiesShape,
  type PrivateEndpointConnectionPropertiesView,
  type PrivateLinkResourceProperties,
  privateLinkResourcePropertiesShape,
  type ServiceResourcePropertiesInput,
  serviceResourcePropertiesShape,
  type ServiceResourcePropertiesView,
  type SqlContainerGetPropertiesInput,
  sqlContainerGetPropertiesShape,
  type SqlContainerGetPropertiesView,
  type SqlDatabaseGetPropertiesInput,
  sqlDatabaseGetPropertiesShape,
  type SqlDatabaseGetPropertiesView,
  type SqlRoleAssignmentResourceInput,
  sqlRoleAssignmentResourceShape,
  type SqlRoleAssignmentResourceView,
  type SqlRoleDefinitionResourceInput,
  sqlRoleDefinitionResourceShape,
  type SqlRoleDefinitionResourceView,
  type SqlStoredProcedureGetPropertiesInput,
  sqlStoredProcedureGetPropertiesShape,
  type SqlStoredProcedureGetPropertiesView,
  type SqlTriggerGetPropertiesInput,
  sqlTriggerGetPropertiesShape,
  type SqlTriggerGetPropertiesView,
  type SqlUserDefinedFunctionGetPropertiesInput,
  sqlUserDefinedFunctionGetPropertiesShape,
  type SqlUserDefinedFunctionGetPropertiesView,
  type TableGetPropertiesInput,
  tableGetPropertiesShape,
  type TableGetPropertiesView,
  type TableRoleAssignmentResourcePropertiesInput,
  tableRoleAssignmentResourcePropertiesShape,
  type TableRoleAssignmentResourcePropertiesView,
  type TableRoleDefinitionResourcePropertiesInput,
  tableRoleDefinitionResourcePropertiesShape,
  type TableRoleDefinitionResourcePropertiesView,
  type ThroughputSettingsGetPropertiesInput,
  throughputSettingsGetPropertiesShape,
  type ThroughputSettingsGetPropertiesView,
} from "./types.js";

const API_VERSION = "2026-03-15";

export interface DatabaseAccountProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * Indicates the type of database account. This can only be set at database account creation.
   */
  kind?: ExpressionOrValue<DatabaseAccountKind> | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Cosmos DB database account name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update Azure Cosmos DB database accounts.
   */
  properties: DatabaseAccountGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface CassandraKeyspaceProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Cosmos DB keyspace name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update Azure Cosmos DB Cassandra keyspace.
   */
  properties: CassandraKeyspaceGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface CassandraKeyspaceTableProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Cosmos DB table name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update Azure Cosmos DB Cassandra table.
   */
  properties: CassandraTableGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface CassandraTableThroughputSettingProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  properties: ThroughputSettingsGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An Azure Cosmos DB resource throughput.
 */
export class CassandraTableThroughputSetting extends Resource<"Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables/throughputSettings"> {
  static resourceType =
    "Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables/throughputSettings" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => throughputSettingsGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (CassandraTableThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables/throughputSettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CassandraTableThroughputSetting.resourceType,
      apiVersion: CassandraTableThroughputSetting.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: CassandraKeyspaceTable,
    props:
      | (CassandraTableThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CassandraTableThroughputSetting.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  get properties(): ThroughputSettingsGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ThroughputSettingsGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

/**
 * An Azure Cosmos DB Cassandra table.
 */
export class CassandraKeyspaceTable extends Resource<"Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "t",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => cassandraTableGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (CassandraKeyspaceTableProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/tables"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CassandraKeyspaceTable.resourceType,
      apiVersion: CassandraKeyspaceTable.apiVersion,
    };
  }

  constructor(
    context: CassandraKeyspace,
    props:
      | (CassandraKeyspaceTableProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CassandraKeyspaceTable.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Cosmos DB table name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update Azure Cosmos DB Cassandra table.
   */
  get properties(): CassandraTableGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: CassandraTableGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface CassandraKeyspaceThroughputSettingProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  properties: ThroughputSettingsGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An Azure Cosmos DB resource throughput.
 */
export class CassandraKeyspaceThroughputSetting extends Resource<"Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/throughputSettings"> {
  static resourceType =
    "Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/throughputSettings" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => throughputSettingsGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (CassandraKeyspaceThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces/throughputSettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CassandraKeyspaceThroughputSetting.resourceType,
      apiVersion: CassandraKeyspaceThroughputSetting.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: CassandraKeyspace,
    props:
      | (CassandraKeyspaceThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CassandraKeyspaceThroughputSetting.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  get properties(): ThroughputSettingsGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ThroughputSettingsGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

/**
 * An Azure Cosmos DB Cassandra keyspace.
 */
export class CassandraKeyspace extends Resource<"Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ck",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => cassandraKeyspaceGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (CassandraKeyspaceProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/cassandraKeyspaces"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CassandraKeyspace.resourceType,
      apiVersion: CassandraKeyspace.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props:
      | (CassandraKeyspaceProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CassandraKeyspace.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Cosmos DB keyspace name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update Azure Cosmos DB Cassandra keyspace.
   */
  get properties(): CassandraKeyspaceGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: CassandraKeyspaceGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface CassandraRoleAssignmentProps {
  /**
   * The GUID for the Role Assignment.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update an Azure Cosmos DB Cassandra Role Assignment.
   */
  properties?: CassandraRoleAssignmentResourcePropertiesInput | undefined;
}

/**
 * Parameters to create and update an Azure Cosmos DB Cassandra Role Assignment.
 */
export class CassandraRoleAssignment extends Resource<"Microsoft.DocumentDB/databaseAccounts/cassandraRoleAssignments"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/cassandraRoleAssignments" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "cra",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => cassandraRoleAssignmentResourcePropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (CassandraRoleAssignmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/cassandraRoleAssignments"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CassandraRoleAssignment.resourceType,
      apiVersion: CassandraRoleAssignment.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?:
      | (CassandraRoleAssignmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CassandraRoleAssignment.buildResourceProps(props), options);
  }

  /**
   * The GUID for the Role Assignment.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update an Azure Cosmos DB Cassandra Role Assignment.
   */
  get properties(): CassandraRoleAssignmentResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: CassandraRoleAssignmentResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface CassandraRoleDefinitionProps {
  /**
   * The GUID for the Role Definition.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update an Azure Cosmos DB Cassandra Role Definition.
   */
  properties?: CassandraRoleDefinitionResourcePropertiesInput | undefined;
}

/**
 * Parameters to create and update an Azure Cosmos DB Cassandra Role Definition.
 */
export class CassandraRoleDefinition extends Resource<"Microsoft.DocumentDB/databaseAccounts/cassandraRoleDefinitions"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/cassandraRoleDefinitions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "crd",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => cassandraRoleDefinitionResourcePropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (CassandraRoleDefinitionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/cassandraRoleDefinitions"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CassandraRoleDefinition.resourceType,
      apiVersion: CassandraRoleDefinition.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?:
      | (CassandraRoleDefinitionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CassandraRoleDefinition.buildResourceProps(props), options);
  }

  /**
   * The GUID for the Role Definition.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update an Azure Cosmos DB Cassandra Role Definition.
   */
  get properties(): CassandraRoleDefinitionResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: CassandraRoleDefinitionResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface GremlinDatabaseProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Cosmos DB database name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update Azure Cosmos DB Gremlin database.
   */
  properties: GremlinDatabaseGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface GraphProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Cosmos DB graph name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update Azure Cosmos DB Gremlin graph.
   */
  properties: GremlinGraphGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface GremlinGraphThroughputSettingProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  properties: ThroughputSettingsGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An Azure Cosmos DB resource throughput.
 */
export class GremlinGraphThroughputSetting extends Resource<"Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs/throughputSettings"> {
  static resourceType =
    "Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs/throughputSettings" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => throughputSettingsGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (GremlinGraphThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs/throughputSettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: GremlinGraphThroughputSetting.resourceType,
      apiVersion: GremlinGraphThroughputSetting.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: Graph,
    props:
      | (GremlinGraphThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, GremlinGraphThroughputSetting.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  get properties(): ThroughputSettingsGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ThroughputSettingsGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

/**
 * An Azure Cosmos DB Gremlin graph.
 */
export class Graph extends Resource<"Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "g",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => gremlinGraphGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (GraphProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/graphs"> &
    Record<string, unknown> {
    return {
      ...props,
      type: Graph.resourceType,
      apiVersion: Graph.apiVersion,
    };
  }

  constructor(
    context: GremlinDatabase,
    props: (GraphProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Graph.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Cosmos DB graph name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update Azure Cosmos DB Gremlin graph.
   */
  get properties(): GremlinGraphGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: GremlinGraphGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface GremlinDatabaseThroughputSettingProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  properties: ThroughputSettingsGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An Azure Cosmos DB resource throughput.
 */
export class GremlinDatabaseThroughputSetting extends Resource<"Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/throughputSettings"> {
  static resourceType =
    "Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/throughputSettings" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => throughputSettingsGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (GremlinDatabaseThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/gremlinDatabases/throughputSettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: GremlinDatabaseThroughputSetting.resourceType,
      apiVersion: GremlinDatabaseThroughputSetting.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: GremlinDatabase,
    props:
      | (GremlinDatabaseThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, GremlinDatabaseThroughputSetting.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  get properties(): ThroughputSettingsGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ThroughputSettingsGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

/**
 * An Azure Cosmos DB Gremlin database.
 */
export class GremlinDatabase extends Resource<"Microsoft.DocumentDB/databaseAccounts/gremlinDatabases"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/gremlinDatabases" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "gd",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => gremlinDatabaseGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (GremlinDatabaseProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/gremlinDatabases"> &
    Record<string, unknown> {
    return {
      ...props,
      type: GremlinDatabase.resourceType,
      apiVersion: GremlinDatabase.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props:
      (GremlinDatabaseProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, GremlinDatabase.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Cosmos DB database name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update Azure Cosmos DB Gremlin database.
   */
  get properties(): GremlinDatabaseGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: GremlinDatabaseGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface GremlinRoleAssignmentProps {
  /**
   * The GUID for the Role Assignment.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update an Azure Cosmos DB Gremlin Role Assignment.
   */
  properties?: GremlinRoleAssignmentResourcePropertiesInput | undefined;
}

/**
 * Parameters to create and update an Azure Cosmos DB Gremlin Role Assignment.
 */
export class GremlinRoleAssignment extends Resource<"Microsoft.DocumentDB/databaseAccounts/gremlinRoleAssignments"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/gremlinRoleAssignments" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "gra",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => gremlinRoleAssignmentResourcePropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (GremlinRoleAssignmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/gremlinRoleAssignments"> &
    Record<string, unknown> {
    return {
      ...props,
      type: GremlinRoleAssignment.resourceType,
      apiVersion: GremlinRoleAssignment.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?:
      | (GremlinRoleAssignmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, GremlinRoleAssignment.buildResourceProps(props), options);
  }

  /**
   * The GUID for the Role Assignment.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update an Azure Cosmos DB Gremlin Role Assignment.
   */
  get properties(): GremlinRoleAssignmentResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: GremlinRoleAssignmentResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface GremlinRoleDefinitionProps {
  /**
   * The GUID for the Role Definition.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update an Azure Cosmos DB Gremlin Role Definition.
   */
  properties?: GremlinRoleDefinitionResourcePropertiesInput | undefined;
}

/**
 * Parameters to create and update an Azure Cosmos DB Gremlin Role Definition.
 */
export class GremlinRoleDefinition extends Resource<"Microsoft.DocumentDB/databaseAccounts/gremlinRoleDefinitions"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/gremlinRoleDefinitions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "grd",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => gremlinRoleDefinitionResourcePropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (GremlinRoleDefinitionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/gremlinRoleDefinitions"> &
    Record<string, unknown> {
    return {
      ...props,
      type: GremlinRoleDefinition.resourceType,
      apiVersion: GremlinRoleDefinition.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?:
      | (GremlinRoleDefinitionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, GremlinRoleDefinition.buildResourceProps(props), options);
  }

  /**
   * The GUID for the Role Definition.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update an Azure Cosmos DB Gremlin Role Definition.
   */
  get properties(): GremlinRoleDefinitionResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: GremlinRoleDefinitionResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface MongoDbDatabaseProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Cosmos DB database name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update Azure Cosmos DB MongoDB database.
   */
  properties: MongoDbDatabaseGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface CollectionProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Cosmos DB collection name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update Azure Cosmos DB MongoDB collection.
   */
  properties: MongoDbCollectionGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface MongoDbCollectionThroughputSettingProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  properties: ThroughputSettingsGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An Azure Cosmos DB resource throughput.
 */
export class MongoDbCollectionThroughputSetting extends Resource<"Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections/throughputSettings"> {
  static resourceType =
    "Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections/throughputSettings" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => throughputSettingsGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (MongoDbCollectionThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections/throughputSettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: MongoDbCollectionThroughputSetting.resourceType,
      apiVersion: MongoDbCollectionThroughputSetting.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: Collection,
    props:
      | (MongoDbCollectionThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, MongoDbCollectionThroughputSetting.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  get properties(): ThroughputSettingsGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ThroughputSettingsGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

/**
 * An Azure Cosmos DB MongoDB collection.
 */
export class Collection extends Resource<"Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections"> {
  static resourceType =
    "Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "c",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => mongoDbCollectionGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (CollectionProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/collections"> &
    Record<string, unknown> {
    return {
      ...props,
      type: Collection.resourceType,
      apiVersion: Collection.apiVersion,
    };
  }

  constructor(
    context: MongoDbDatabase,
    props: (CollectionProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Collection.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Cosmos DB collection name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update Azure Cosmos DB MongoDB collection.
   */
  get properties(): MongoDbCollectionGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: MongoDbCollectionGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface MongoDbDatabaseThroughputSettingProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  properties: ThroughputSettingsGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An Azure Cosmos DB resource throughput.
 */
export class MongoDbDatabaseThroughputSetting extends Resource<"Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/throughputSettings"> {
  static resourceType =
    "Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/throughputSettings" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => throughputSettingsGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (MongoDbDatabaseThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/mongodbDatabases/throughputSettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: MongoDbDatabaseThroughputSetting.resourceType,
      apiVersion: MongoDbDatabaseThroughputSetting.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: MongoDbDatabase,
    props:
      | (MongoDbDatabaseThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, MongoDbDatabaseThroughputSetting.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  get properties(): ThroughputSettingsGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ThroughputSettingsGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

/**
 * An Azure Cosmos DB MongoDB database.
 */
export class MongoDbDatabase extends Resource<"Microsoft.DocumentDB/databaseAccounts/mongodbDatabases"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/mongodbDatabases" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "md",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => mongoDbDatabaseGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (MongoDbDatabaseProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/mongodbDatabases"> &
    Record<string, unknown> {
    return {
      ...props,
      type: MongoDbDatabase.resourceType,
      apiVersion: MongoDbDatabase.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props:
      (MongoDbDatabaseProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, MongoDbDatabase.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Cosmos DB database name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update Azure Cosmos DB MongoDB database.
   */
  get properties(): MongoDbDatabaseGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: MongoDbDatabaseGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface MongoRoleDefinitionGetResultsProps {
  /**
   * The ID for the Role Definition {dbName.roleName}.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update an Azure Cosmos DB Mongo Role Definition.
   */
  properties?: MongoRoleDefinitionResourceInput | undefined;
}

/**
 * An Azure Cosmos DB Mongo Role Definition.
 */
export class MongoRoleDefinitionGetResults extends Resource<"Microsoft.DocumentDB/databaseAccounts/mongodbRoleDefinitions"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/mongodbRoleDefinitions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "mrd",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => mongoRoleDefinitionResourceShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (MongoRoleDefinitionGetResultsProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/mongodbRoleDefinitions"> &
    Record<string, unknown> {
    return {
      ...props,
      type: MongoRoleDefinitionGetResults.resourceType,
      apiVersion: MongoRoleDefinitionGetResults.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?:
      | (MongoRoleDefinitionGetResultsProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, MongoRoleDefinitionGetResults.buildResourceProps(props), options);
  }

  /**
   * The ID for the Role Definition {dbName.roleName}.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update an Azure Cosmos DB Mongo Role Definition.
   */
  get properties(): MongoRoleDefinitionResourceView {
    return this.expr("properties") as any;
  }
  set properties(value: MongoRoleDefinitionResourceInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface MongoUserDefinitionGetResultsProps {
  /**
   * The ID for the User Definition {dbName.userName}.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update an Azure Cosmos DB Mongo User Definition.
   */
  properties?: MongoUserDefinitionResourceInput | undefined;
}

/**
 * An Azure Cosmos DB User Definition
 */
export class MongoUserDefinitionGetResults extends Resource<"Microsoft.DocumentDB/databaseAccounts/mongodbUserDefinitions"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/mongodbUserDefinitions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "mud",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => mongoUserDefinitionResourceShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (MongoUserDefinitionGetResultsProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/mongodbUserDefinitions"> &
    Record<string, unknown> {
    return {
      ...props,
      type: MongoUserDefinitionGetResults.resourceType,
      apiVersion: MongoUserDefinitionGetResults.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?:
      | (MongoUserDefinitionGetResultsProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, MongoUserDefinitionGetResults.buildResourceProps(props), options);
  }

  /**
   * The ID for the User Definition {dbName.userName}.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update an Azure Cosmos DB Mongo User Definition.
   */
  get properties(): MongoUserDefinitionResourceView {
    return this.expr("properties") as any;
  }
  set properties(value: MongoUserDefinitionResourceInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface MongoMiRoleAssignmentProps {
  /**
   * The GUID for the Role Assignment.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update an Azure Cosmos DB MongoMI Role Assignment.
   */
  properties?: MongoMiRoleAssignmentResourcePropertiesInput | undefined;
}

/**
 * Parameters to create and update an Azure Cosmos DB MongoMI Role Assignment.
 */
export class MongoMiRoleAssignment extends Resource<"Microsoft.DocumentDB/databaseAccounts/mongoMIRoleAssignments"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/mongoMIRoleAssignments" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "mma",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => mongoMiRoleAssignmentResourcePropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (MongoMiRoleAssignmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/mongoMIRoleAssignments"> &
    Record<string, unknown> {
    return {
      ...props,
      type: MongoMiRoleAssignment.resourceType,
      apiVersion: MongoMiRoleAssignment.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?:
      | (MongoMiRoleAssignmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, MongoMiRoleAssignment.buildResourceProps(props), options);
  }

  /**
   * The GUID for the Role Assignment.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update an Azure Cosmos DB MongoMI Role Assignment.
   */
  get properties(): MongoMiRoleAssignmentResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: MongoMiRoleAssignmentResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface MongoMiRoleDefinitionProps {
  /**
   * The GUID for the Role Definition.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update an Azure Cosmos DB MongoMI Role Definition.
   */
  properties?: MongoMiRoleDefinitionResourcePropertiesInput | undefined;
}

/**
 * Parameters to create and update an Azure Cosmos DB MongoMI Role Definition.
 */
export class MongoMiRoleDefinition extends Resource<"Microsoft.DocumentDB/databaseAccounts/mongoMIRoleDefinitions"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/mongoMIRoleDefinitions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "mmd",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => mongoMiRoleDefinitionResourcePropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (MongoMiRoleDefinitionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/mongoMIRoleDefinitions"> &
    Record<string, unknown> {
    return {
      ...props,
      type: MongoMiRoleDefinition.resourceType,
      apiVersion: MongoMiRoleDefinition.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?:
      | (MongoMiRoleDefinitionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, MongoMiRoleDefinition.buildResourceProps(props), options);
  }

  /**
   * The GUID for the Role Definition.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update an Azure Cosmos DB MongoMI Role Definition.
   */
  get properties(): MongoMiRoleDefinitionResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: MongoMiRoleDefinitionResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface NotebookWorkspaceProps {
  /**
   * The name of the notebook workspace resource.
   */
  name?: ExpressionOrValue<NotebookWorkspaceName> | undefined;
}

/**
 * A notebook workspace resource
 */
export class NotebookWorkspace extends Resource<"Microsoft.DocumentDB/databaseAccounts/notebookWorkspaces"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/notebookWorkspaces" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "nw",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createUnionShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => notebookWorkspacePropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (NotebookWorkspaceProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/notebookWorkspaces"> &
    Record<string, unknown> {
    return {
      ...props,
      type: NotebookWorkspace.resourceType,
      apiVersion: NotebookWorkspace.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?:
      | (NotebookWorkspaceProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, NotebookWorkspace.buildResourceProps(props), options);
  }

  /**
   * The name of the notebook workspace resource.
   */
  get name(): Expression<NotebookWorkspaceName> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<NotebookWorkspaceName>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<NotebookWorkspaceProperties> {
    return this.expr("properties") as any;
  }
}

export interface PrivateEndpointConnectionProps {
  /**
   * The name of the private endpoint connection.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Resource properties.
   */
  properties?: PrivateEndpointConnectionPropertiesInput | undefined;
}

/**
 * A private endpoint connection
 */
export class PrivateEndpointConnection extends Resource<"Microsoft.DocumentDB/databaseAccounts/privateEndpointConnections"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/privateEndpointConnections" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "pec",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => privateEndpointConnectionPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (PrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/privateEndpointConnections"> &
    Record<string, unknown> {
    return {
      ...props,
      type: PrivateEndpointConnection.resourceType,
      apiVersion: PrivateEndpointConnection.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?:
      | (PrivateEndpointConnectionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, PrivateEndpointConnection.buildResourceProps(props), options);
  }

  /**
   * The name of the private endpoint connection.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): PrivateEndpointConnectionPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: PrivateEndpointConnectionPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * A private link resource
 */
export class PrivateLinkResource extends Resource<"Microsoft.DocumentDB/databaseAccounts/privateLinkResources"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/privateLinkResources" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "plr",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => privateLinkResourcePropertiesShape),
          readOnly: true,
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: ExistingResourceProps & { existing: true },
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/privateLinkResources"> &
    Record<string, unknown> {
    return {
      ...props,
      type: PrivateLinkResource.resourceType,
      apiVersion: PrivateLinkResource.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, PrivateLinkResource.buildResourceProps(props), options);
  }

  /**
   * The name of the private link resource.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Resource properties.
   */
  get properties(): Expression<PrivateLinkResourceProperties> {
    return this.expr("properties") as any;
  }
}

export interface ServiceProps {
  /**
   * Cosmos DB service name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties in ServiceResourceCreateUpdateParameters.
   */
  properties?: ServiceResourcePropertiesInput | undefined;
}

/**
 * Properties for the database account.
 */
export class Service extends Resource<"Microsoft.DocumentDB/databaseAccounts/services"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/services" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "s",
    minLength: 3,
    maxLength: 50,
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => serviceResourcePropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (ServiceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/services"> & Record<string, unknown> {
    return {
      ...props,
      type: Service.resourceType,
      apiVersion: Service.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?: (ServiceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Service.buildResourceProps(props), options);
  }

  /**
   * Cosmos DB service name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties in ServiceResourceCreateUpdateParameters.
   */
  get properties(): ServiceResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ServiceResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface SqlDatabaseProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Cosmos DB database name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update Azure Cosmos DB SQL database.
   */
  properties: SqlDatabaseGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface ClientEncryptionKeyProps {
  /**
   * Cosmos DB ClientEncryptionKey name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update ClientEncryptionKey.
   */
  properties: ClientEncryptionKeyGetPropertiesInput;
}

/**
 * Client Encryption Key.
 */
export class ClientEncryptionKey extends Resource<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases/clientEncryptionKeys"> {
  static resourceType =
    "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/clientEncryptionKeys" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "cek",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => clientEncryptionKeyGetPropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (ClientEncryptionKeyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases/clientEncryptionKeys"> &
    Record<string, unknown> {
    return {
      ...props,
      type: ClientEncryptionKey.resourceType,
      apiVersion: ClientEncryptionKey.apiVersion,
    };
  }

  constructor(
    context: SqlDatabase,
    props:
      | (ClientEncryptionKeyProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, ClientEncryptionKey.buildResourceProps(props), options);
  }

  /**
   * Cosmos DB ClientEncryptionKey name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update ClientEncryptionKey.
   */
  get properties(): ClientEncryptionKeyGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ClientEncryptionKeyGetPropertiesInput) {
    this.setProperty("properties", value);
  }
}

export interface ContainerProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Cosmos DB container name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update Azure Cosmos DB container.
   */
  properties: SqlContainerGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface StoredProcedureProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Cosmos DB storedProcedure name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update Azure Cosmos DB storedProcedure.
   */
  properties: SqlStoredProcedureGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An Azure Cosmos DB storedProcedure.
 */
export class StoredProcedure extends Resource<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/storedProcedures"> {
  static resourceType =
    "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/storedProcedures" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sp",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sqlStoredProcedureGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (StoredProcedureProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/storedProcedures"> &
    Record<string, unknown> {
    return {
      ...props,
      type: StoredProcedure.resourceType,
      apiVersion: StoredProcedure.apiVersion,
    };
  }

  constructor(
    context: Container,
    props:
      (StoredProcedureProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, StoredProcedure.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Cosmos DB storedProcedure name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update Azure Cosmos DB storedProcedure.
   */
  get properties(): SqlStoredProcedureGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SqlStoredProcedureGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface CosmosDbSqlContainerThroughputSettingProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  properties: ThroughputSettingsGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An Azure Cosmos DB resource throughput.
 */
export class CosmosDbSqlContainerThroughputSetting extends Resource<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/throughputSettings"> {
  static resourceType =
    "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/throughputSettings" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => throughputSettingsGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (CosmosDbSqlContainerThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/throughputSettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CosmosDbSqlContainerThroughputSetting.resourceType,
      apiVersion: CosmosDbSqlContainerThroughputSetting.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: Container,
    props:
      | (CosmosDbSqlContainerThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CosmosDbSqlContainerThroughputSetting.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  get properties(): ThroughputSettingsGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ThroughputSettingsGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface TriggerProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Cosmos DB trigger name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update Azure Cosmos DB trigger.
   */
  properties: SqlTriggerGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An Azure Cosmos DB trigger.
 */
export class Trigger extends Resource<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/triggers"> {
  static resourceType =
    "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/triggers" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "t",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sqlTriggerGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (TriggerProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/triggers"> &
    Record<string, unknown> {
    return {
      ...props,
      type: Trigger.resourceType,
      apiVersion: Trigger.apiVersion,
    };
  }

  constructor(
    context: Container,
    props: (TriggerProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Trigger.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Cosmos DB trigger name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update Azure Cosmos DB trigger.
   */
  get properties(): SqlTriggerGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SqlTriggerGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface UserDefinedFunctionProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Cosmos DB userDefinedFunction name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update Azure Cosmos DB userDefinedFunction.
   */
  properties: SqlUserDefinedFunctionGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An Azure Cosmos DB userDefinedFunction.
 */
export class UserDefinedFunction extends Resource<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/userDefinedFunctions"> {
  static resourceType =
    "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/userDefinedFunctions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "udf",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sqlUserDefinedFunctionGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (UserDefinedFunctionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers/userDefinedFunctions"> &
    Record<string, unknown> {
    return {
      ...props,
      type: UserDefinedFunction.resourceType,
      apiVersion: UserDefinedFunction.apiVersion,
    };
  }

  constructor(
    context: Container,
    props:
      | (UserDefinedFunctionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, UserDefinedFunction.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Cosmos DB userDefinedFunction name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update Azure Cosmos DB userDefinedFunction.
   */
  get properties(): SqlUserDefinedFunctionGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SqlUserDefinedFunctionGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

/**
 * An Azure Cosmos DB container.
 */
export class Container extends Resource<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "c",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sqlContainerGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?: (ContainerProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers"> &
    Record<string, unknown> {
    return {
      ...props,
      type: Container.resourceType,
      apiVersion: Container.apiVersion,
    };
  }

  constructor(
    context: SqlDatabase,
    props: (ContainerProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Container.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Cosmos DB container name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update Azure Cosmos DB container.
   */
  get properties(): SqlContainerGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SqlContainerGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface CosmosDbSqlDatabaseThroughputSettingProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  properties: ThroughputSettingsGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An Azure Cosmos DB resource throughput.
 */
export class CosmosDbSqlDatabaseThroughputSetting extends Resource<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases/throughputSettings"> {
  static resourceType =
    "Microsoft.DocumentDB/databaseAccounts/sqlDatabases/throughputSettings" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => throughputSettingsGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (CosmosDbSqlDatabaseThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases/throughputSettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CosmosDbSqlDatabaseThroughputSetting.resourceType,
      apiVersion: CosmosDbSqlDatabaseThroughputSetting.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: SqlDatabase,
    props:
      | (CosmosDbSqlDatabaseThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CosmosDbSqlDatabaseThroughputSetting.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  get properties(): ThroughputSettingsGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ThroughputSettingsGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

/**
 * An Azure Cosmos DB SQL database.
 */
export class SqlDatabase extends Resource<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/sqlDatabases" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sd",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sqlDatabaseGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (SqlDatabaseProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/sqlDatabases"> & Record<string, unknown> {
    return {
      ...props,
      type: SqlDatabase.resourceType,
      apiVersion: SqlDatabase.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props: (SqlDatabaseProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SqlDatabase.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Cosmos DB database name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update Azure Cosmos DB SQL database.
   */
  get properties(): SqlDatabaseGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SqlDatabaseGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface SqlRoleAssignmentProps {
  /**
   * The GUID for the Role Assignment.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update an Azure Cosmos DB SQL Role Assignment.
   */
  properties?: SqlRoleAssignmentResourceInput | undefined;
}

/**
 * An Azure Cosmos DB Role Assignment
 */
export class SqlRoleAssignment extends Resource<"Microsoft.DocumentDB/databaseAccounts/sqlRoleAssignments"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/sqlRoleAssignments" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sra",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sqlRoleAssignmentResourceShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (SqlRoleAssignmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/sqlRoleAssignments"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlRoleAssignment.resourceType,
      apiVersion: SqlRoleAssignment.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?:
      | (SqlRoleAssignmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SqlRoleAssignment.buildResourceProps(props), options);
  }

  /**
   * The GUID for the Role Assignment.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update an Azure Cosmos DB SQL Role Assignment.
   */
  get properties(): SqlRoleAssignmentResourceView {
    return this.expr("properties") as any;
  }
  set properties(value: SqlRoleAssignmentResourceInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface SqlRoleDefinitionProps {
  /**
   * The GUID for the Role Definition.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update an Azure Cosmos DB SQL Role Definition.
   */
  properties?: SqlRoleDefinitionResourceInput | undefined;
}

/**
 * An Azure Cosmos DB SQL Role Definition.
 */
export class SqlRoleDefinition extends Resource<"Microsoft.DocumentDB/databaseAccounts/sqlRoleDefinitions"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/sqlRoleDefinitions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "srd",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => sqlRoleDefinitionResourceShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (SqlRoleDefinitionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/sqlRoleDefinitions"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SqlRoleDefinition.resourceType,
      apiVersion: SqlRoleDefinition.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?:
      | (SqlRoleDefinitionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SqlRoleDefinition.buildResourceProps(props), options);
  }

  /**
   * The GUID for the Role Definition.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update an Azure Cosmos DB SQL Role Definition.
   */
  get properties(): SqlRoleDefinitionResourceView {
    return this.expr("properties") as any;
  }
  set properties(value: SqlRoleDefinitionResourceInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface TableRoleAssignmentProps {
  /**
   * The GUID for the Role Assignment.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update an Azure Cosmos DB Table Role Assignment.
   */
  properties?: TableRoleAssignmentResourcePropertiesInput | undefined;
}

/**
 * Parameters to create and update an Azure Cosmos DB Table Role Assignment.
 */
export class TableRoleAssignment extends Resource<"Microsoft.DocumentDB/databaseAccounts/tableRoleAssignments"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/tableRoleAssignments" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "tra",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => tableRoleAssignmentResourcePropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (TableRoleAssignmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/tableRoleAssignments"> &
    Record<string, unknown> {
    return {
      ...props,
      type: TableRoleAssignment.resourceType,
      apiVersion: TableRoleAssignment.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?:
      | (TableRoleAssignmentProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, TableRoleAssignment.buildResourceProps(props), options);
  }

  /**
   * The GUID for the Role Assignment.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update an Azure Cosmos DB Table Role Assignment.
   */
  get properties(): TableRoleAssignmentResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: TableRoleAssignmentResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface TableRoleDefinitionProps {
  /**
   * The GUID for the Role Definition.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update an Azure Cosmos DB Table Role Definition.
   */
  properties?: TableRoleDefinitionResourcePropertiesInput | undefined;
}

/**
 * Parameters to create and update an Azure Cosmos DB Table Role Definition.
 */
export class TableRoleDefinition extends Resource<"Microsoft.DocumentDB/databaseAccounts/tableRoleDefinitions"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/tableRoleDefinitions" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "trd",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => tableRoleDefinitionResourcePropertiesShape),
        },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (TableRoleDefinitionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/tableRoleDefinitions"> &
    Record<string, unknown> {
    return {
      ...props,
      type: TableRoleDefinition.resourceType,
      apiVersion: TableRoleDefinition.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props?:
      | (TableRoleDefinitionProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, TableRoleDefinition.buildResourceProps(props), options);
  }

  /**
   * The GUID for the Role Definition.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update an Azure Cosmos DB Table Role Definition.
   */
  get properties(): TableRoleDefinitionResourcePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: TableRoleDefinitionResourcePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface DatabaseAccountTableProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Cosmos DB table name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to create and update Azure Cosmos DB Table.
   */
  properties: TableGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface CosmosTableThroughputSettingProps {
  /**
   * Identity for the resource.
   */
  identity?: ManagedServiceIdentityInput | undefined;
  /**
   * The location of the resource group to which the resource belongs.
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  properties: ThroughputSettingsGetPropertiesInput;
  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater than 128 characters and value no greater than 256 characters. For example, the default experience for a template type is set with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table", "Graph", "DocumentDB", and "MongoDB".
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * An Azure Cosmos DB resource throughput.
 */
export class CosmosTableThroughputSetting extends Resource<"Microsoft.DocumentDB/databaseAccounts/tables/throughputSettings"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/tables/throughputSettings" as const;
  static apiVersion = API_VERSION;

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringLiteralShape(), readOnly: true },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => throughputSettingsGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata and the fixed singleton `name`. Shared by ordinary construction and internal
   * resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (CosmosTableThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/tables/throughputSettings"> &
    Record<string, unknown> {
    return {
      ...props,
      type: CosmosTableThroughputSetting.resourceType,
      apiVersion: CosmosTableThroughputSetting.apiVersion,
      name: "default",
    };
  }

  constructor(
    context: DatabaseAccountTable,
    props:
      | (CosmosTableThroughputSettingProps & { existing?: false })
      | (SingletonExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, CosmosTableThroughputSetting.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  get name(): Expression<"default"> {
    return this.expr("name");
  }

  /**
   * Properties to update Azure Cosmos DB resource throughput.
   */
  get properties(): ThroughputSettingsGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: ThroughputSettingsGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

/**
 * An Azure Cosmos DB Table.
 */
export class DatabaseAccountTable extends Resource<"Microsoft.DocumentDB/databaseAccounts/tables"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts/tables" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "t",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => tableGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      | (DatabaseAccountTableProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts/tables"> & Record<string, unknown> {
    return {
      ...props,
      type: DatabaseAccountTable.resourceType,
      apiVersion: DatabaseAccountTable.apiVersion,
    };
  }

  constructor(
    context: DatabaseAccount,
    props:
      | (DatabaseAccountTableProps & { existing?: false })
      | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, DatabaseAccountTable.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Cosmos DB table name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update Azure Cosmos DB Table.
   */
  get properties(): TableGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: TableGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

/**
 * An Azure Cosmos DB database account.
 */
export class DatabaseAccount extends Resource<"Microsoft.DocumentDB/databaseAccounts"> {
  static resourceType = "Microsoft.DocumentDB/databaseAccounts" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "da",
    minLength: 3,
    maxLength: 50,
    pattern: {
      regex: "^[a-z0-9]+(-[a-z0-9]+)*",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => managedServiceIdentityShape),
        },
        kind: { armPath: ["kind"], value: createUnionShape() },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => databaseAccountGetPropertiesShape),
        },
        tags: { armPath: ["tags"], value: createRecordShape(createStringShape()) },
      }),
    );
    this.register();
  }

  /**
   * Assemble the base `Resource` constructor payload. Preserve supplied properties while applying
   * resource metadata. Shared by ordinary construction and internal resource reconstruction.
   *
   * @param props - Resource properties to normalize for the base constructor.
   */
  protected static buildResourceProps(
    props?:
      (DatabaseAccountProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.DocumentDB/databaseAccounts"> & Record<string, unknown> {
    return {
      ...props,
      type: DatabaseAccount.resourceType,
      apiVersion: DatabaseAccount.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props:
      (DatabaseAccountProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, DatabaseAccount.buildResourceProps(props), options);
  }

  /**
   * Identity for the resource.
   */
  get identity(): ManagedServiceIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: ManagedServiceIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * Indicates the type of database account. This can only be set at database account creation.
   */
  get kind(): Expression<DatabaseAccountKind> {
    return this.expr("kind");
  }
  set kind(value: ExpressionOrValue<DatabaseAccountKind> | undefined) {
    this.setProperty("kind", value);
  }

  /**
   * The location of the resource group to which the resource belongs.
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("location", value);
  }

  /**
   * Cosmos DB database account name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Properties to create and update Azure Cosmos DB database accounts.
   */
  get properties(): DatabaseAccountGetPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DatabaseAccountGetPropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Tags are a list of key-value pairs that describe the resource. These tags can be used in
   * viewing and grouping this resource (across resource groups). A maximum of 15 tags can be
   * provided for a resource. Each tag must have a key no greater than 128 characters and value no
   * greater than 256 characters. For example, the default experience for a template type is set
   * with "defaultExperience": "Cassandra". Current "defaultExperience" values also include "Table",
   * "Graph", "DocumentDB", and "MongoDB".
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

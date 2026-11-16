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
  createAnyShape,
  createDeferredShape,
  createEnumShape,
  createFlatModelShape,
  createRecordShape,
  createStringShape,
  createUnionShape,
  type InputRecord,
  type ResourceNamingRules,
  type ResourceProps,
} from "@azure/provisioning-core/internal";
import {
  type DataExportPropertiesInput,
  dataExportPropertiesShape,
  type DataExportPropertiesView,
  type DataSourceKind,
  type DataSourceType,
  type IdentityInput,
  identityShape,
  type IdentityView,
  type LinkedServicePropertiesInput,
  linkedServicePropertiesShape,
  type LinkedServicePropertiesView,
  type LinkedStorageAccountsPropertiesInput,
  linkedStorageAccountsPropertiesShape,
  type LinkedStorageAccountsPropertiesView,
  type NetworkSecurityPerimeterConfigurationProperties,
  networkSecurityPerimeterConfigurationPropertiesShape,
  type SavedSearchPropertiesInput,
  savedSearchPropertiesShape,
  type SavedSearchPropertiesView,
  type StorageInsightPropertiesInput,
  storageInsightPropertiesShape,
  type StorageInsightPropertiesView,
  type SummaryLogsIdentityInput,
  summaryLogsIdentityShape,
  type SummaryLogsIdentityView,
  type SummaryLogsPropertiesInput,
  summaryLogsPropertiesShape,
  type SummaryLogsPropertiesView,
  type TablePropertiesInput,
  tablePropertiesShape,
  type TablePropertiesView,
  type WorkspacePropertiesInput,
  workspacePropertiesShape,
  type WorkspacePropertiesView,
} from "./types.js";

const API_VERSION = "2026-03-01";

export interface WorkspaceProps {
  /**
   * The etag of the workspace.
   */
  etag?: ExpressionOrValue<string> | undefined;
  /**
   * The identity of the resource.
   */
  identity?: IdentityInput | undefined;
  /**
   * The geo-location where the resource lives
   */
  location?: ExpressionOrValue<string> | undefined;
  /**
   * The name of the workspace.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Workspace properties.
   */
  properties?: WorkspacePropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

export interface DataExportProps {
  /**
   * The data export rule name.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * data export properties.
   */
  properties?: DataExportPropertiesInput | undefined;
}

/**
 * The top level data export resource container.
 */
export class DataExport extends Resource<"Microsoft.OperationalInsights/workspaces/dataExports"> {
  static resourceType = "Microsoft.OperationalInsights/workspaces/dataExports" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "de",
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
          value: createDeferredShape(() => dataExportPropertiesShape),
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
    props?: (DataExportProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.OperationalInsights/workspaces/dataExports"> &
    Record<string, unknown> {
    return {
      ...props,
      type: DataExport.resourceType,
      apiVersion: DataExport.apiVersion,
    };
  }

  constructor(
    context: Workspace,
    props?: (DataExportProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, DataExport.buildResourceProps(props), options);
  }

  /**
   * The data export rule name.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * data export properties.
   */
  get properties(): DataExportPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: DataExportPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface DataSourceProps {
  /**
   * The ETag of the data source.
   */
  etag?: ExpressionOrValue<string> | undefined;
  /**
   * The kind of the DataSource.
   */
  kind: ExpressionOrValue<DataSourceKind>;
  /**
   * Name of the datasource
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The data source properties in raw json format, each kind of data source have it's own schema.
   */
  properties: any;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * Datasources under OMS Workspace.
 */
export class DataSource extends Resource<"Microsoft.OperationalInsights/workspaces/dataSources"> {
  static resourceType = "Microsoft.OperationalInsights/workspaces/dataSources" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ds",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape() },
        kind: { armPath: ["kind"], value: createUnionShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: { armPath: ["properties"], value: createAnyShape() },
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
    props?: (DataSourceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.OperationalInsights/workspaces/dataSources"> &
    Record<string, unknown> {
    return {
      ...props,
      type: DataSource.resourceType,
      apiVersion: DataSource.apiVersion,
    };
  }

  constructor(
    context: Workspace,
    props: (DataSourceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, DataSource.buildResourceProps(props), options);
  }

  /**
   * The ETag of the data source.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }
  set etag(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("etag", value);
  }

  /**
   * The kind of the DataSource.
   */
  get kind(): Expression<DataSourceKind> {
    return this.expr("kind");
  }
  set kind(value: ExpressionOrValue<DataSourceKind>) {
    this.setProperty("kind", value);
  }

  /**
   * Name of the datasource
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The data source properties in raw json format, each kind of data source have it's own schema.
   */
  get properties(): Expression<any> {
    return this.expr("properties");
  }
  set properties(value: any) {
    this.setProperty("properties", value);
  }

  /**
   * Resource tags.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface LinkedServiceProps {
  /**
   * Name of the linked service.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the linked service.
   */
  properties: LinkedServicePropertiesInput;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * The top level Linked service resource container.
 */
export class LinkedService extends Resource<"Microsoft.OperationalInsights/workspaces/linkedServices"> {
  static resourceType = "Microsoft.OperationalInsights/workspaces/linkedServices" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ls",
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
          value: createDeferredShape(() => linkedServicePropertiesShape),
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
      (LinkedServiceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.OperationalInsights/workspaces/linkedServices"> &
    Record<string, unknown> {
    return {
      ...props,
      type: LinkedService.resourceType,
      apiVersion: LinkedService.apiVersion,
    };
  }

  constructor(
    context: Workspace,
    props:
      (LinkedServiceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, LinkedService.buildResourceProps(props), options);
  }

  /**
   * Name of the linked service.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the linked service.
   */
  get properties(): LinkedServicePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: LinkedServicePropertiesInput) {
    this.setProperty("properties", value);
  }

  /**
   * Resource tags.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface LinkedStorageAccountProps {
  /**
   * Linked storage accounts type.
   */
  name: ExpressionOrValue<DataSourceType>;
  /**
   * Linked storage accounts properties.
   */
  properties: LinkedStorageAccountsPropertiesInput;
}

/**
 * Linked storage accounts top level resource container.
 */
export class LinkedStorageAccount extends Resource<"Microsoft.OperationalInsights/workspaces/linkedStorageAccounts"> {
  static resourceType = "Microsoft.OperationalInsights/workspaces/linkedStorageAccounts" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "lsa",
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createEnumShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => linkedStorageAccountsPropertiesShape),
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
      | (LinkedStorageAccountProps & { existing?: false })
      | (ExistingResourceProps<DataSourceType> & { existing: true }),
  ): ResourceProps<"Microsoft.OperationalInsights/workspaces/linkedStorageAccounts"> &
    Record<string, unknown> {
    return {
      ...props,
      type: LinkedStorageAccount.resourceType,
      apiVersion: LinkedStorageAccount.apiVersion,
    };
  }

  constructor(
    context: Workspace,
    props:
      | (LinkedStorageAccountProps & { existing?: false })
      | (ExistingResourceProps<DataSourceType> & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, LinkedStorageAccount.buildResourceProps(props), options);
  }

  /**
   * Linked storage accounts type.
   */
  get name(): Expression<DataSourceType> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<DataSourceType>) {
    this.setProperty("name", value);
  }

  /**
   * Linked storage accounts properties.
   */
  get properties(): LinkedStorageAccountsPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: LinkedStorageAccountsPropertiesInput) {
    this.setProperty("properties", value);
  }
}

/**
 * Network security perimeter (NSP) configuration resource
 */
export class NetworkSecurityPerimeterConfiguration extends Resource<"Microsoft.OperationalInsights/workspaces/networkSecurityPerimeterConfigurations"> {
  static resourceType =
    "Microsoft.OperationalInsights/workspaces/networkSecurityPerimeterConfigurations" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "nspc",
    minLength: 1,
    maxLength: 512,
    pattern: {
      regex: "^.*$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => networkSecurityPerimeterConfigurationPropertiesShape),
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
  ): ResourceProps<"Microsoft.OperationalInsights/workspaces/networkSecurityPerimeterConfigurations"> &
    Record<string, unknown> {
    return {
      ...props,
      type: NetworkSecurityPerimeterConfiguration.resourceType,
      apiVersion: NetworkSecurityPerimeterConfiguration.apiVersion,
    };
  }

  constructor(
    context: Workspace,
    props: ExistingResourceProps & { existing: true },
    options?: ResourceOptions,
  ) {
    super(context, NetworkSecurityPerimeterConfiguration.buildResourceProps(props), options);
  }

  /**
   * The name of the resource
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Network security configuration properties.
   */
  get properties(): Expression<NetworkSecurityPerimeterConfigurationProperties> {
    return this.expr("properties") as any;
  }
}

export interface SavedSearchProps {
  /**
   * The ETag of the saved search. To override an existing saved search, use "*" or specify the current Etag
   */
  etag?: ExpressionOrValue<string> | undefined;
  /**
   * The id of the saved search.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * The properties of the saved search.
   */
  properties: SavedSearchPropertiesInput;
}

/**
 * Value object for saved search results.
 */
export class SavedSearch extends Resource<"Microsoft.OperationalInsights/workspaces/savedSearches"> {
  static resourceType = "Microsoft.OperationalInsights/workspaces/savedSearches" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "ss",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => savedSearchPropertiesShape),
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
      (SavedSearchProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.OperationalInsights/workspaces/savedSearches"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SavedSearch.resourceType,
      apiVersion: SavedSearch.apiVersion,
    };
  }

  constructor(
    context: Workspace,
    props: (SavedSearchProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SavedSearch.buildResourceProps(props), options);
  }

  /**
   * The ETag of the saved search. To override an existing saved search, use "*" or specify the
   * current Etag
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }
  set etag(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("etag", value);
  }

  /**
   * The id of the saved search.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * The properties of the saved search.
   */
  get properties(): SavedSearchPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SavedSearchPropertiesInput) {
    this.setProperty("properties", value);
  }
}

export interface StorageInsightProps {
  /**
   * The ETag of the storage insight.
   */
  eTag?: ExpressionOrValue<string> | undefined;
  /**
   * Name of the storageInsightsConfigs resource
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Storage insight properties.
   */
  properties?: StorageInsightPropertiesInput | undefined;
  /**
   * Resource tags.
   */
  tags?: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined;
}

/**
 * The top level storage insight resource container.
 */
export class StorageInsight extends Resource<"Microsoft.OperationalInsights/workspaces/storageInsightConfigs"> {
  static resourceType = "Microsoft.OperationalInsights/workspaces/storageInsightConfigs" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sic",
    pattern: {
      regex: "",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        eTag: { armPath: ["eTag"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => storageInsightPropertiesShape),
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
      (StorageInsightProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.OperationalInsights/workspaces/storageInsightConfigs"> &
    Record<string, unknown> {
    return {
      ...props,
      type: StorageInsight.resourceType,
      apiVersion: StorageInsight.apiVersion,
    };
  }

  constructor(
    context: Workspace,
    props?:
      (StorageInsightProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, StorageInsight.buildResourceProps(props), options);
  }

  /**
   * The ETag of the storage insight.
   */
  get eTag(): Expression<string> {
    return this.expr("eTag");
  }
  set eTag(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("eTag", value);
  }

  /**
   * Name of the storageInsightsConfigs resource
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Storage insight properties.
   */
  get properties(): StorageInsightPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: StorageInsightPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Resource tags.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

export interface SummaryLogProps {
  /**
   * The managed identity of the summary logs resource. Only user-assigned identity is supported.
   */
  identity?: SummaryLogsIdentityInput | undefined;
  /**
   * The name of the summary logs. Must not contain '/'.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Summary rule properties.
   */
  properties?: SummaryLogsPropertiesInput | undefined;
}

/**
 * Workspace data summary rules definition.
 */
export class SummaryLog extends Resource<"Microsoft.OperationalInsights/workspaces/summaryLogs"> {
  static resourceType = "Microsoft.OperationalInsights/workspaces/summaryLogs" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "sl",
    pattern: {
      regex: "[^/]+",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        identity: {
          armPath: ["identity"],
          value: createDeferredShape(() => summaryLogsIdentityShape),
        },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => summaryLogsPropertiesShape),
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
    props?: (SummaryLogProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.OperationalInsights/workspaces/summaryLogs"> &
    Record<string, unknown> {
    return {
      ...props,
      type: SummaryLog.resourceType,
      apiVersion: SummaryLog.apiVersion,
    };
  }

  constructor(
    context: Workspace,
    props?: (SummaryLogProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, SummaryLog.buildResourceProps(props), options);
  }

  /**
   * The managed identity of the summary logs resource. Only user-assigned identity is supported.
   */
  get identity(): SummaryLogsIdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: SummaryLogsIdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The name of the summary logs. Must not contain '/'.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Summary rule properties.
   */
  get properties(): SummaryLogsPropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: SummaryLogsPropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

export interface TableProps {
  /**
   * The name of the table.
   */
  name?: ExpressionOrValue<string> | undefined;
  /**
   * Table's properties.
   */
  properties?: TablePropertiesInput | undefined;
}

/**
 * Workspace data table definition.
 */
export class Table extends Resource<"Microsoft.OperationalInsights/workspaces/tables"> {
  static resourceType = "Microsoft.OperationalInsights/workspaces/tables" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "t",
    minLength: 4,
    maxLength: 63,
    pattern: {
      regex: "^[A-Za-z0-9-_]+$",
    },
    scope: "parent",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => tablePropertiesShape),
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
    props?: (TableProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.OperationalInsights/workspaces/tables"> & Record<string, unknown> {
    return {
      ...props,
      type: Table.resourceType,
      apiVersion: Table.apiVersion,
    };
  }

  constructor(
    context: Workspace,
    props?: (TableProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Table.buildResourceProps(props), options);
  }

  /**
   * The name of the table.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Table's properties.
   */
  get properties(): TablePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: TablePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }
}

/**
 * The top level Workspace resource container.
 */
export class Workspace extends Resource<"Microsoft.OperationalInsights/workspaces"> {
  static resourceType = "Microsoft.OperationalInsights/workspaces" as const;
  static apiVersion = API_VERSION;
  protected static namingRules: ResourceNamingRules = {
    abbreviation: "log",
    minLength: 4,
    maxLength: 63,
    pattern: {
      regex: "^[A-Za-z0-9][A-Za-z0-9-]+[A-Za-z0-9]$",
    },
    scope: "global",
  };

  static {
    this.registerShape(
      createFlatModelShape({
        etag: { armPath: ["etag"], value: createStringShape() },
        identity: { armPath: ["identity"], value: createDeferredShape(() => identityShape) },
        location: { armPath: ["location"], value: createStringShape() },
        name: { armPath: ["name"], value: createStringShape() },
        properties: {
          armPath: ["properties"],
          value: createDeferredShape(() => workspacePropertiesShape),
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
    props?: (WorkspaceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
  ): ResourceProps<"Microsoft.OperationalInsights/workspaces"> & Record<string, unknown> {
    return {
      ...props,
      type: Workspace.resourceType,
      apiVersion: Workspace.apiVersion,
    };
  }

  constructor(
    context: ProvisioningComponent,
    props?: (WorkspaceProps & { existing?: false }) | (ExistingResourceProps & { existing: true }),
    options?: ResourceOptions,
  ) {
    super(context, Workspace.buildResourceProps(props), options);
  }

  /**
   * The etag of the workspace.
   */
  get etag(): Expression<string> {
    return this.expr("etag");
  }
  set etag(value: ExpressionOrValue<string> | undefined) {
    this.setProperty("etag", value);
  }

  /**
   * The identity of the resource.
   */
  get identity(): IdentityView {
    return this.expr("identity") as any;
  }
  set identity(value: IdentityInput | undefined) {
    this.setProperty("identity", value);
  }

  /**
   * The geo-location where the resource lives
   */
  get location(): Expression<string> {
    return this.expr("location");
  }
  set location(value: ExpressionOrValue<string>) {
    this.setProperty("location", value);
  }

  /**
   * The name of the workspace.
   */
  get name(): Expression<string> {
    return this.expr("name");
  }
  set name(value: ExpressionOrValue<string>) {
    this.setProperty("name", value);
  }

  /**
   * Workspace properties.
   */
  get properties(): WorkspacePropertiesView {
    return this.expr("properties") as any;
  }
  set properties(value: WorkspacePropertiesInput | undefined) {
    this.setProperty("properties", value);
  }

  /**
   * Resource tags.
   */
  get tags(): InputRecord<ExpressionOrValue<string>, Record<string, string>> {
    return this.expr("tags");
  }
  set tags(value: InputRecord<ExpressionOrValue<string>, Record<string, string>> | undefined) {
    this.setProperty("tags", value);
  }
}

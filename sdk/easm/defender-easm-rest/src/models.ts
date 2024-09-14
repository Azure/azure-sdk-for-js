// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A request body used to update an asset. */
export interface AssetUpdateData {
  /**
   * The state to update the asset to.
   *
   * Possible values: "candidate", "confirmed", "dismissed", "candidateInvestigate", "associatedPartner", "associatedThirdparty"
   */
  state?: AssetUpdateState;
  /** A string which can be used to identify the asset in external systems. */
  externalId?: string;
  /** Any Labels to update the asset with. */
  labels?: Record<string, boolean>;
  /**
   * A list of asset types to cascade the updates to.
   *
   * Possible values: "as", "contact", "domain", "host", "ipAddress", "ipBlock", "page", "sslCert"
   */
  transfers?: AssetUpdateTransfers;
}

export interface LogAnalyticsDataConnectionProperties extends DataConnectionProperties {
  /** log analytics api key */
  apiKey?: string;
  /** log analytics workspace id */
  workspaceId?: string;
}

/** The properties required to establish connection to a particular service */
export interface DataConnectionProperties {}

export interface AzureDataExplorerDataConnectionProperties extends DataConnectionProperties {
  /** The azure data explorer cluster name */
  clusterName?: string;
  /** The azure data explorer region */
  region?: string;
  /** The azure data explorer database name */
  databaseName?: string;
}

export interface DataConnectionDataParent {
  /** The name of data connection */
  name?: string;
  /**
   * The type of data the data connection will transfer.
   *
   * Possible values: "assets", "attackSurfaceInsights"
   */
  content?: DataConnectionContent;
  /**
   * The rate at which the data connection will receive updates.
   *
   * Possible values: "daily", "weekly", "monthly"
   */
  frequency?: DataConnectionFrequency;
  /** The day to update the data connection on. (1-7 for weekly, 1-31 for monthly) */
  frequencyOffset?: number;
  kind: string;
}

export interface LogAnalyticsDataConnectionData extends DataConnectionDataParent {
  /** The kind of DataConnectionData */
  kind: "logAnalytics";
  /** properties */
  properties: LogAnalyticsDataConnectionProperties;
}

export interface AzureDataExplorerDataConnectionData extends DataConnectionDataParent {
  /** The kind of DataConnectionData */
  kind: "azureDataExplorer";
  /** properties */
  properties: AzureDataExplorerDataConnectionProperties;
}

/** Source entity used to drive discovery. */
export interface DiscoSource {
  /**
   * The kind of disco source.
   *
   * Possible values: "as", "attribute", "contact", "domain", "host", "ipBlock"
   */
  kind?: DiscoSourceKind;
  /** The name for the disco source. */
  name?: string;
}

/** A request body used to create a discovery group. */
export interface DiscoGroupData {
  /** The name for a disco group. */
  name?: string;
  /** The description for a disco group. */
  description?: string;
  /** The tier for the disco group which will affect the algorithm used for the disco runs in this group. */
  tier?: string;
  /** The frequency at which the disco group is supposed to be rerun in milliseconds. */
  frequencyMilliseconds?: number;
  /** The list of seeds used for the disco group runs. */
  seeds?: Array<DiscoSource>;
  /** The list of names used for the disco group runs. */
  names?: string[];
  /** The list of excludes used for the disco group runs, aka assets to exclude from the discovery algorithm. */
  excludes?: Array<DiscoSource>;
  /** The unique identifier for the disco template used for the disco group creation. */
  templateId?: string;
}

/** A request body used to retrieve an asset report snapshot. */
export interface ReportAssetSnapshotRequest {
  /** The metric to retrieve a snapshot for. */
  metric?: string;
  /** The name of the label to retrieve a snapshot for. */
  labelName?: string;
  /** The number of assets per page. */
  size?: number;
  /** The page to retrieve. */
  page?: number;
}

/** A request body used to retrieve summary asset information. One and only one collection of summary identifiers must be provided: filters, metrics, or metricCategories. */
export interface ReportAssetSummaryRequest {
  /** Categories to retrieve risk reporting data for. */
  metricCategories?: string[];
  /** Metrics to retrieve risk reporting data for. */
  metrics?: string[];
  /** Query filters to apply to the asset summary. */
  filters?: string[];
  /** A parameter to group the assets by (first level facet field), only used when the chosen summary identifier is filters. */
  groupBy?: string;
  /** A parameter to segment the assets by (second level facet field), only used when the chosen summary identifier is filters. */
  segmentBy?: string;
  /** Currently unused. */
  labelName?: string;
}

/** A request body used to create a saved filter. */
export interface SavedFilterData {
  /** An expression on the resource type that selects the resources to be returned. */
  filter: string;
  /** A human readable description of the saved filter. */
  description: string;
}

export type DataConnectionData =
  | DataConnectionDataParent
  | LogAnalyticsDataConnectionData
  | AzureDataExplorerDataConnectionData;
/** Alias for AssetUpdateState */
export type AssetUpdateState = string;
/** Alias for AssetUpdateTransfers */
export type AssetUpdateTransfers = string;
/** Alias for DataConnectionContent */
export type DataConnectionContent = string;
/** Alias for DataConnectionFrequency */
export type DataConnectionFrequency = string;
/** Alias for DiscoSourceKind */
export type DiscoSourceKind = string;

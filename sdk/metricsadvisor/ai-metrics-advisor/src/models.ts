// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  SuppressCondition,
  SmartDetectionCondition,
  EmailHookParameter,
  WebhookHookParameter,
  TopNGroupScope,
  Severity,
  SeverityCondition,
  AlertSnoozeCondition as MetricAnomalyAlertSnoozeCondition,
  IngestionStatusType,
  EntityStatus as DataFeedDetailStatus,
} from "./generated/models";
import { FullOperationResponse } from "@azure/core-client";
export {
  Severity,
  SeverityCondition,
  MetricAnomalyAlertSnoozeCondition,
  SmartDetectionCondition,
  TopNGroupScope,
  SuppressCondition,
  EmailHookParameter,
  WebhookHookParameter,
  DataFeedDetailStatus,
};

// not used directly here but needed by public API surface.
export {
  AnomalyValue,
  DataFeedIngestionProgress,
  IngestionStatusType,
  DataSourceType,
  SeverityFilterCondition,
  SnoozeScope,
  AnomalyDetectorDirection,
  FeedbackType,
  FeedbackQueryTimeMode,
} from "./generated/models";

/**
 * Represents a metric of an ingested data feed
 */
export interface DataFeedMetric {
  /**
   * metric id
   */
  readonly id?: string;
  /**
   * metric name
   */
  name: string;
  /**
   * metric display name
   */
  displayName?: string;
  /**
   * metric description
   */
  description?: string;
}

/**
 * Represents a dimension of an ingested data feed
 */
export interface DataFeedDimension {
  /**
   * dimension name
   */
  name: string;
  /**
   * dimension display name
   */
  displayName?: string;
}

/**
 * Specifies metrics, dimensions, and timestamp columns of a data feed.
 */
export interface DataFeedSchema {
  /**
   * measure list
   */
  metrics: DataFeedMetric[];
  /**
   * dimension list
   */
  dimensions?: DataFeedDimension[];
  /**
   * user-defined timestamp column. if timestampColumn is null, start time of every time slice will be used as default value.
   */
  timestampColumn?: string;
}

/**
 * Specifies ingestion settings for a data feed.
 */
export interface DataFeedIngestionSettings {
  /**
   * ingestion start time
   */
  ingestionStartTime: Date;
  /**
   * the time that the beginning of data ingestion task will delay for every data slice according to this offset.
   */
  ingestionStartOffsetInSeconds?: number;
  /**
   * the max concurrency of data ingestion queries against user data source. 0 means no limitation.
   */
  dataSourceRequestConcurrency?: number;
  /**
   * the min retry interval for failed data ingestion tasks.
   */
  ingestionRetryDelayInSeconds?: number;
  /**
   * stop retry data ingestion after the data slice first schedule time in seconds.
   */
  stopRetryAfterInSeconds?: number;
}

/**
 * Defines values for DataFeedAutoRollupMethod.
 */
export type DataFeedAutoRollupMethod = "None" | "Sum" | "Max" | "Min" | "Avg" | "Count";

/**
 * Specifies the rollup settings for a data feed.
 */
export type DataFeedRollupSettings =
  | {
      rollupType: "NoRollup";
    }
  | {
      rollupType: "AlreadyRollup";
      /**
       * the identification value for the row of calculated all-up value.
       */
      rollupIdentificationValue?: string;
    }
  | {
      rollupType: "AutoRollup";
      /**
       * roll up columns
       */
      autoRollupGroupByColumnNames?: string[];
      /**
       * roll up method
       */
      rollupMethod?: DataFeedAutoRollupMethod;
      /**
       * the identification value for the row of calculated all-up value.
       */
      rollupIdentificationValue?: string;
    };

/**
 * Specifies how missing data points are filled.
 */
export type DataFeedMissingDataPointFillSettings =
  | {
      fillType: "SmartFilling" | "PreviousValue" | "NoFilling";
    }
  | {
      fillType: "CustomValue";
      /**
       * the value of fill missing point for anomaly detection
       */
      customFillValue: number;
    };

/**
 * Access mode of the data feed
 */
export type DataFeedAccessMode = "Private" | "Public";

/**
 * Granularity type of a data feed.
 */
export type DataFeedGranularity =
  | {
      granularityType: "Yearly" | "Monthly" | "Weekly" | "Daily" | "Hourly" | "PerMinute";
    }
  | {
      granularityType: "Custom";
      customGranularityValue: number;
    };
/**
 * The flattened response to a REST call.
 * Contains the underlying HttpOperationResponse as well as
 * the merged properties of the parsedBody, parsedHeaders, etc.
 */
export interface RestResponse {
  /**
   * The underlying HTTP response containing both raw and deserialized response data.
   */
  _response: FullOperationResponse;

  [key: string]: any;
}

/** DataFeed Status */
export type DataFeedStatus = "Paused" | "Active";

/**
 * Represents a Metrics Advisor data feed.
 */
export type MetricsAdvisorDataFeed = {
  /**
   * Unique id of the data feed.
   */
  id: string;
  /**
   * Name of the data feed.
   */
  name: string;
  /**
   * Time when the data feed is created
   */
  createdOn: Date;
  /**
   * Status of the data feed.
   */
  status: DataFeedStatus;
  /**
   * Indicates whether the current user is an administrator of the data feed.
   */
  isAdmin: boolean;
  /**
   * data feed creator
   */
  creator: string;
  /**
   * Source of the data feed.
   */
  source: DataFeedSource;
  /**
   * Schema of the data in the data feed, including names of metrics, dimensions, and timestamp columns.
   */
  schema: DataFeedSchema;
  /**
   * Map of metric names to metric ids for quick lookup
   */
  metricIds: Record<string, string>;
  /**
   * Granularity of the data feed.
   */
  granularity: DataFeedGranularity;
  /**
   * Ingestion settings for the data feed.
   */
  ingestionSettings: DataFeedIngestionSettings;
  /**
   * data feed description
   */
  description?: string;

  /**
   * settings on data rollup
   */
  rollupSettings?: DataFeedRollupSettings;

  /**
   * settings to control how missing data points are filled
   */
  missingDataPointFillSettings?: DataFeedMissingDataPointFillSettings;

  /**
   * access mode of the data feed
   */
  accessMode?: DataFeedAccessMode;

  /**
   * The administrators of this {@link MetricsAdvisorDataFeed }.
   * Administrators have total control over a data feed, being allowed to update, delete, or pause them.
   * Each element in this list represents a user with administrator access, but the value of each `string` element
   * depends on the type of authentication to be used by this administrator when communicating with the service.
   * If {@link MetricsAdvisorKeyCredential } authentication will be used, the `string` must be the user's email address.
   * If AAD authentication will be used instead, the `string` must uniquely identify the user's principal.
   * For instance, for a `ClientSecretCredential`, the `string` must be the client ID.
   */
  admins?: string[];

  /**
   * The viewers of this {@link MetricsAdvisorDataFeed }.
   * Viewers have read-only access to a data feed. Each element in this list represents a user with viewer access,
   * but the value of each `string` element depends on the type of authentication to be used by this viewer when communicating with the service.
   * If {@link MetricsAdvisorKeyCredential } authentication will be used, the `string` must be the user's email address.
   * If AAD authentication will be used instead, the `string` must uniquely identify the user's principal.
   * For instance, for a `ClientSecretCredential`, the `string` must be the client ID.
   */
  viewers?: string[];

  /**
   * action link template for alert
   */
  actionLinkTemplate?: string;
};

/**
 * Represents an Azure Application Insights data source.
 * User is required to specify azureCloud, applicationId and apiKey for Create.
 * apiKey being a secret is not returned by service.
 */
export type AzureApplicationInsightsDataFeedSource = {
  dataSourceType: "AzureApplicationInsights";
  /** The Azure cloud that this Azure Application Insights in.*/
  azureCloud: string;
  /** The application id of this Azure Application Insights.*/
  applicationId: string;
  /** The API Key that can access this Azure Application Insights. Required by user for Create. Not returned by service */
  apiKey?: string;
  /** The statement to query this Azure Application Insights */
  query: string;
  /** Authentication Type */
  authenticationType: "Basic";
};

/**
 * Represents an Azure Blob Storage data source.
 * User is required to specify connectionString for Create.
 * connectionString being a secret is not returned by service.
 */
export type AzureBlobDataFeedSource = {
  dataSourceType: "AzureBlob";
  /** Azure Blob connection string. Required by user for Create. Not returned by service  */
  connectionString?: string;
  /** Container */
  container: string;
  /** Blob Template */
  blobTemplate: string;
  /** Authentication Type */
  authenticationType: "Basic" | "ManagedIdentity";
};

/**
 * Represents an Azure CosmosDB data source.
 * User is required to specify connectionString for Create.
 * connectionString being a secret is not returned by service.
 */
export type AzureCosmosDbDataFeedSource = {
  dataSourceType: "AzureCosmosDB";
  /** The connection string of this Azure CosmosDB. Required by user for Create. Not returned by service */
  connectionString?: string;
  /** The statement to query this collection */
  sqlQuery: string;
  /** A database name in this Azure CosmosDB */
  database: string;
  /** A collection id in this database */
  collectionId: string;
  /** Authentication Type */
  authenticationType: "Basic";
};

/**
 * Represents Service Principal Authentication Type for Azure Data Explorer Source
 */
export interface AzureDataExplorerAuthServicePrincipal {
  /** Authentication Type */
  authenticationType: "ServicePrincipal";
  /** dataSource credential id  */
  credentialId: string;
}

/**
 * Represents Service Principal in KV Authentication Type for Azure Data Explorer Source
 */
export interface AzureDataExplorerAuthServicePrincipalInKeyVault {
  /** Authentication Type */
  authenticationType: "ServicePrincipalInKV";
  /** dataSource credential id  */
  credentialId: string;
}

/**
 * Represents Basic Authentication Type for Azure Data Explorer Source
 */
export interface AzureDataExplorerAuthBasic {
  /** Basic Authentication Type */
  authenticationType: "Basic";
}

/**
 * Represents Managed Identity Authentication Type for Azure Data Explorer Source
 */
export interface AzureDataExplorerAuthManagedIdentity {
  /** Managed Identity Authentication Type */
  authenticationType: "ManagedIdentity";
}

/**
 * Represents Authentication Type Union for Azure Data Explorer Source
 */
export type AzureDataExplorerAuthTypes =
  | AzureDataExplorerAuthBasic
  | AzureDataExplorerAuthManagedIdentity
  | AzureDataExplorerAuthServicePrincipal
  | AzureDataExplorerAuthServicePrincipalInKeyVault;
/**
 * Represents an Azure Data Explorer data source.
 * User is required to specify connectionString for Create.
 * connectionString being a secret is not returned by service.
 */
export type AzureDataExplorerDataFeedSource = {
  /** Azure Data Explorer Data Source */
  dataSourceType: "AzureDataExplorer";
  /** Database connection string. Required by user for Create. Not returned by service */
  connectionString?: string;
  /** Query script */
  query: string;
} & AzureDataExplorerAuthTypes;

/**
 * Represents Basic Authentication Type for Azure DataLake Storage Gen2 Source
 * User is required to specify accountKey for Create with Basic type.
 * accountKey being a secret is not returned by service.
 */
export type DataLakeStorageGen2AuthBasic = {
  /** Authentication */
  authenticationType: "Basic";
  /** Account key. Required by user for Create. Not returned by service */
  accountKey?: string;
};

/**
 * Represents Managed Identity Authentication Type for Azure DataLake Storage Gen2 Source
 */
export type DataLakeStorageGen2AuthManagedIdentity = {
  /** Authentication */
  authenticationType: "ManagedIdentity";
};

/**
 * Represents Service Principal Authentication Type for Azure DataLake Storage Gen2 Source
 */
export type DataLakeStorageGen2AuthServicePrincipal = {
  /** Authentication */
  authenticationType: "ServicePrincipal";
  /** Credential entity id */
  credentialId: string;
};

/**
 * Represents Service Principal in KV Authentication Type for Azure DataLake Storage Gen2 Source
 */
export type DataLakeStorageGen2AuthServicePrincipalInKeyVault = {
  /** Authentication */
  authenticationType: "ServicePrincipalInKV";
  /** Credential entity id */
  credentialId: string;
};

/**
 * Represents Shared Key in KV Authentication Type for Azure DataLake Storage Gen2 Source
 */
export type DataLakeStorageGen2AuthSharedKey = {
  /** Authentication */
  authenticationType: "DataLakeGen2SharedKey";
  /** Credential entity id */
  credentialId: string;
};

/**
 * Represents Authentication Type Union for Azure DataLake Storage Gen2 Source
 */
export type AzureDataLakeStorageGen2AuthTypes =
  | DataLakeStorageGen2AuthBasic
  | DataLakeStorageGen2AuthManagedIdentity
  | DataLakeStorageGen2AuthServicePrincipal
  | DataLakeStorageGen2AuthServicePrincipalInKeyVault
  | DataLakeStorageGen2AuthSharedKey;

/**
 * Represents an Azure DataLake Storage Gen2 data source.
 */
export type AzureDataLakeStorageGen2DataFeedSource = {
  /** Azure DataLake Storage Gen2 data source type */
  dataSourceType: "AzureDataLakeStorageGen2";
  /** Account name */
  accountName: string;
  /** File system name (Container) */
  fileSystemName: string;
  /** Directory template */
  directoryTemplate: string;
  /** File template */
  fileTemplate: string;
} & AzureDataLakeStorageGen2AuthTypes;

/**
 * Represents an Azure Table data source.
 * User is required to specify connectionString for Create.
 * connectionString being a secret is not returned by service.
 */
export type AzureTableDataFeedSource = {
  /** Azure Table data Source type */
  dataSourceType: "AzureTable";
  /** Azure Table connection string. Required by user for Create. Not returned by service */
  connectionString?: string;
  /** Table name */
  table: string;
  /** Query script */
  query: string;
  /** Authentication type */
  authenticationType: "Basic";
};

/**
 * Represents Basic Authentication Type for Azure Log Analytics Source.
 * User is required to specify clientSecret for Create with Basic type.
 * clientSecret being a secret will not be returned by the service.
 */
export type LogAnalyticsAuthBasic = {
  /** Authentication */
  authenticationType: "Basic";
  /** The tenant id of service principal that have access to this Log Analytics */
  tenantId: string;
  /** The client id of service principal that have access to this Log Analytics. */
  clientId: string;
  /** The client secret of service principal that have access to this Log Analytics. Required by user for Create. Not returned by service*/
  clientSecret?: string;
};

/**
 * Represents Service Principal Authentication Type for Azure Log Analytics Source
 */
export type LogAnalyticsAuthServicePrincipal = {
  /** Authentication */
  authenticationType: "ServicePrincipal";
  /** credential id */
  credentialId: string;
};

/**
 * Represents Service Principal Authentication In KeyVault Type for Azure Log Analytics Source
 */
export type LogAnalyticsAuthServicePrincipalInKeyVault = {
  /** Authentication */
  authenticationType: "ServicePrincipalInKV";
  /** credential id */
  credentialId: string;
};

/**
 * Represents Authentication Type Union for Azure Log Analytics data source
 */
export type AzureLogAnalyticsAuthTypes =
  | LogAnalyticsAuthBasic
  | LogAnalyticsAuthServicePrincipal
  | LogAnalyticsAuthServicePrincipalInKeyVault;

/**
 * Represents an Azure Log Analytics data source.
 */
export type AzureLogAnalyticsDataFeedSource = {
  dataSourceType: "AzureLogAnalytics";
  /** The workspace id of this Log Analytics */
  workspaceId: string;
  /** The KQL (Kusto Query Language) query to fetch data from this Log Analytics */
  query: string;
} & AzureLogAnalyticsAuthTypes;

/**
 * Represents an Azure Event Hubs data source.
 * User is required to specify connectionString for Create.
 * connectionString being a secret is not returned by service.
 */
export type AzureEventHubsDataFeedSource = {
  /** Azure Event Hubs data source type */
  dataSourceType: "AzureEventHubs";
  /** The connection string of this Azure Event Hubs. Required by user for Create. Not returned by service */
  connectionString?: string;
  /** The consumer group to be used in this data feed */
  consumerGroup: string;
  /** Authentication type */
  authenticationType: "Basic";
};

/**
 * Represents an InfluxDB data source.
 * User is required to specify password for Create.
 * password being a secret is not returned by service.
 */
export type InfluxDbDataFeedSource = {
  /** InfluxDB data source type */
  dataSourceType: "InfluxDB";
  /** InfluxDB connection string */
  connectionString: string;
  /** Database name */
  database: string;
  /** Database access user */
  userName: string;
  /** Database access password. Required by user for Create. Not returned by service */
  password?: string;
  /** Query script */
  query: string;
  /** Authentication type */
  authenticationType: "Basic";
};

/**
 * Represents a MySQL data source.
 * User is required to specify connectionString for Create.
 * connectionString being a secret is not returned by service.
 */
export type MySqlDataFeedSource = {
  /** MySql data source */
  dataSourceType: "MySql";
  /** Database connection string. Required by user for Create. Not returned by service */
  connectionString?: string;
  /** Query script */
  query: string;
  /** Authentication type */
  authenticationType: "Basic";
};

/**
 * Represents a PostgreSQL data source.
 * User is required to specify connectionString for Create.
 * connectionString being a secret is not returned by service.
 */
export type PostgreSqlDataFeedSource = {
  /** PostgreSQL data source */
  dataSourceType: "PostgreSql";
  /** Database connection string. Required by user for Create. Not returned by service */
  connectionString?: string;
  /** Query script */
  query: string;
  /** Authentication type */
  authenticationType: "Basic";
};

/**
 * Represents a MongoDB data source.
 * User is required to specify connectionString for Create.
 * connectionString being a secret is not returned by service.
 */
export type MongoDbDataFeedSource = {
  /** MongoDB data source */
  dataSourceType: "MongoDB";
  /** MongoDB connection string. Required by user for Create. Not returned by service */
  connectionString?: string;
  /** Database name */
  database: string;
  /** Query script */
  command: string;
  /** Authentication type */
  authenticationType: "Basic";
};

/**
 * Represents an Unknown data source.
 */
export type UnknownDataFeedSource = {
  /** Unknown data source */
  dataSourceType: "Unknown";
  /** data source parameter for unknown datafeed */
  dataSourceParameter: unknown;
  /** authentication type */
  authenticationType: "Basic";
};

/**
 * Represents Basic Authentication for Sql Server datafeed source
 */
export interface SqlServerAuthBasic {
  /** Basic Authentication Type */
  authenticationType: "Basic";
  /** Connection string for Sql Server datafeed authentication */
  connectionString: string;
}

/**
 * Represents Managed Identity Authentication for Sql Server datafeed source
 */
export interface SqlServerAuthManagedIdentity {
  /** Managed Identity Authentication Type */
  authenticationType: "ManagedIdentity";
  /** Connection string for Sql Server datafeed authentication */
  connectionString: string;
}

/**
 * Represents Azure SQL Connection String Authentication for Sql Server datafeed source
 */
export interface SqlServerAuthConnectionString {
  /** Azure SQL Connection String Authentication */
  authenticationType: "AzureSQLConnectionString";
  /** DataSource Credential Id for Sql Server datafeed authentication */
  credentialId: string;
}

/**
 * Represents Service Principal in Keyvault Authentication for Sql Server datafeed source
 */
export interface SqlServerAuthServicePrincipalInKeyVault {
  /** Service Principal in Keyvault Authentication */
  authenticationType: "ServicePrincipalInKV";
  /** DataSource Credential Id for Sql Server datafeed authentication */
  credentialId: string;
  /** Connection string for Sql Server datafeed authentication */
  connectionString: string;
}

/**
 * Represents Service Principal Authentication for Sql Server datafeed source
 */
export interface SqlServerAuthServicePrincipal {
  /** Service Principal Authentication */
  authenticationType: "ServicePrincipal";
  /** DataSource Credential Id for Sql Server datafeed authentication */
  credentialId: string;
  /** Connection string for Sql Server datafeed authentication */
  connectionString: string;
}

/**
 * Represents Authentication Type Union for Sql Server datafeed source
 */
export type SqlServerAuthTypes =
  | SqlServerAuthBasic
  | SqlServerAuthManagedIdentity
  | SqlServerAuthConnectionString
  | SqlServerAuthServicePrincipal
  | SqlServerAuthServicePrincipalInKeyVault;

/**
 * Represents a SQL Server data source.
 */
export type SqlServerDataFeedSource = {
  /** SQL Server data source */
  dataSourceType: "SqlServer";
  /** Query for Sql Server datafeed source */
  query: string;
} & SqlServerAuthTypes;

/**
 * A union type of all supported data sources.
 */
export type DataFeedSource =
  | AzureApplicationInsightsDataFeedSource
  | AzureBlobDataFeedSource
  | AzureCosmosDbDataFeedSource
  | AzureDataExplorerDataFeedSource
  | AzureDataLakeStorageGen2DataFeedSource
  | AzureTableDataFeedSource
  | InfluxDbDataFeedSource
  | MySqlDataFeedSource
  | PostgreSqlDataFeedSource
  | SqlServerDataFeedSource
  | MongoDbDataFeedSource
  | AzureLogAnalyticsDataFeedSource
  | AzureEventHubsDataFeedSource
  | UnknownDataFeedSource;

/**
 * Represents the input type to the Update Data Feed operation.
 */
export type DataFeedPatch = {
  /**
   * Name of the data feed
   */
  name?: string;
  /**
   * Source of the data feed.
   */
  source: DataFeedSourcePatch;
  /**
   * Schema of the data in the data feed, including names of metrics, dimensions, and timestamp columns.
   */
  schema?: {
    /**
     * user-defined timestamp column. if timestampColumn is null, start time of every time slice will be used as default value.
     */
    timestampColumn?: string;
  };
  /**
   * Ingestion settings for the data feed.
   */
  ingestionSettings?: DataFeedIngestionSettings;
  /**
   * data feed description
   */
  description?: string;

  /**
   * settings on data rollup
   */
  rollupSettings?: DataFeedRollupSettings;

  /**
   * settings to control how missing data points are filled
   */
  missingDataPointFillSettings?: DataFeedMissingDataPointFillSettings;

  /**
   * access mode of the data feed
   */
  accessMode?: DataFeedAccessMode;

  /**
   * The administrators of this {@link MetricsAdvisorDataFeed }.
   * Administrators have total control over a data feed, being allowed to update, delete, or pause them.
   * Each element in this list represents a user with administrator access, but the value of each `string` element
   * depends on the type of authentication to be used by this administrator when communicating with the service.
   * If {@link MetricsAdvisorKeyCredential } authentication will be used, the `string` must be the user's email address.
   * If AAD authentication will be used instead, the `string` must uniquely identify the user's principal.
   * For instance, for a `ClientSecretCredential`, the `string` must be the client ID.
   */
  admins?: string[];

  /**
   * The viewers of this {@link MetricsAdvisorDataFeed }.
   * Viewers have read-only access to a data feed. Each element in this list represents a user with viewer access,
   * but the value of each `string` element depends on the type of authentication to be used by this viewer when communicating with the service.
   * If {@link MetricsAdvisorKeyCredential } authentication will be used, the `string` must be the user's email address.
   * If AAD authentication will be used instead, the `string` must uniquely identify the user's principal.
   * For instance, for a `ClientSecretCredential`, the `string` must be the client ID.
   */
  viewers?: string[];

  /**
   * action link template for alert
   */
  actionLinkTemplate?: string;
  /**
   * Status of the data feed.
   */
  status?: DataFeedDetailStatus;
};

/**
 * A alias type of supported data sources to pass to Update Data Feed operation.
 */
export type DataFeedSourcePatch = Partial<DataFeedSource> & {
  /** dataSource type for patch */
  dataSourceType: DataFeedSource["dataSourceType"];
};

/**
 * The logical operator to apply across multiple {@link MetricAlertConfiguration}
 */
export type MetricAnomalyAlertConfigurationsOperator = "AND" | "OR" | "XOR";

/**
 * The logical operator to apply across anomaly detection conditions.
 */
export type DetectionConditionOperator = "AND" | "OR";

/**
 * Represents properties common to anomaly detection conditions.
 */
export interface DetectionConditionsCommon {
  /**
   * Condition operator
   */
  conditionOperator?: DetectionConditionOperator;
  /**
   * Specifies the condition for Smart Detection
   */
  smartDetectionCondition?: SmartDetectionCondition;
  /**
   * Specifies a hard threshold range used to detect anomalies when metric values fall outside of the range.
   */
  hardThresholdCondition?: HardThresholdConditionUnion;
  /**
   * Specifies the condition for Change Threshold
   */
  changeThresholdCondition?: ChangeThresholdConditionUnion;
}

/**
 * Represents patch type for properties common to anomaly detection conditions.
 */
export interface DetectionConditionsCommonPatch {
  /**
   * Condition operator
   */
  conditionOperator?: DetectionConditionOperator;
  /**
   * Specifies the condition for Smart Detection
   */
  smartDetectionCondition?: Partial<SmartDetectionCondition>;
  /**
   * Specifies a hard threshold range used to detect anomalies when metric values fall outside of the range.
   */
  hardThresholdCondition?: Partial<HardThresholdConditionUnion>;
  /**
   * Specifies the condition for Change Threshold
   */
  changeThresholdCondition?: Partial<ChangeThresholdConditionUnion>;
}
/**
 * String key-value pairs that consist of dimension names and dimension values.
 *
 * For a metric with two dimensions: city and category, Examples include
 *
 *   `{ { city: "Tokyo", category: "Handmade" } }` - identifies one time series
 *   `{ { city: "Karachi" } }`                     - identifies all time series with city === "Karachi"
 */
export type DimensionKey = Record<string, string>;

/**
 * Detection condition for all time series of a metric.
 */
export type MetricDetectionCondition = DetectionConditionsCommon;

/**
 * Detection condition patch type for all time series of a metric.
 */
export type MetricDetectionConditionPatch = DetectionConditionsCommonPatch;
/**
 * Detection condition for a series group.
 */
export type MetricSeriesGroupDetectionCondition = DetectionConditionsCommon & {
  /**
   * identifies the group of time series
   */
  groupKey: DimensionKey;
};

/**
 * Detection condition for a specific time series.
 */
export type MetricSingleSeriesDetectionCondition = DetectionConditionsCommon & {
  /**
   * identifies the time series
   */
  seriesKey: DimensionKey;
};

/**
 * Represents the hard threshold detection condition.
 */
export type HardThresholdConditionUnion =
  | {
      /**
       * lower bound
       *
       * should be specified when anomalyDetectorDirection is Both or Down
       */
      lowerBound: number;
      anomalyDetectorDirection: "Down";
      suppressCondition: SuppressCondition;
    }
  | {
      /**
       * upper bound
       *
       * should be specified when anomalyDetectorDirection is Both or Up
       */
      upperBound: number;
      /**
       * detection direction
       */
      anomalyDetectorDirection: "Up";
      suppressCondition: SuppressCondition;
    }
  | {
      lowerBound: number;
      upperBound: number;
      /**
       * detection direction
       */
      anomalyDetectorDirection: "Both";
      /**
       * suppress condition
       */
      suppressCondition: SuppressCondition;
    };

/**
 * Represents the Change threshold detection condition.
 */
export type ChangeThresholdConditionUnion =
  | {
      changePercentage: number;
      shiftPoint: number;
      withinRange: true;
      anomalyDetectorDirection: "Both";
      suppressCondition: SuppressCondition;
    }
  | {
      /**
       * change percentage, value range : [0, +∞)
       */
      changePercentage: number;
      /**
       * shift point, value range : [1, +∞)
       */
      shiftPoint: number;
      /**
       * if the withinRange = true, detected data is abnormal when the value falls in the range, in this case anomalyDetectorDirection must be Both
       * if the withinRange = false, detected data is abnormal when the value falls out of the range
       */
      withinRange: false;
      /**
       * detection direction
       */
      anomalyDetectorDirection: "Up" | "Down" | "Both";

      /**
       * suppress condition
       */
      suppressCondition: SuppressCondition;
    };

/**
 * A union type of all metric feedback types.
 */
export type MetricFeedbackUnion =
  | MetricAnomalyFeedback
  | MetricChangePointFeedback
  | MetricCommentFeedback
  | MetricPeriodFeedback;

/**
 * Represents properties common to all metric feedback types.
 */
export interface MetricFeedbackCommon {
  /**
   * feedback unique id
   */
  readonly id?: string;
  /**
   * feedback created time
   */
  readonly createdOn?: Date;
  /**
   * user who gives this feedback
   */
  readonly userPrincipal?: string;
  /**
   * metric unique id
   */
  metricId: string;
  /**
   * The dimension key of the time series to which this feedback is made.
   */
  dimensionKey: DimensionKey;
}

/**
 * Represents feedback of whether data points within the time range should be considered anomalies or not.
 */
export type MetricAnomalyFeedback = {
  /**
   * Feedback type.
   */
  feedbackType: "Anomaly";
  /**
   * the start timestamp of feedback timerange
   */
  startTime: Date;
  /**
   * the end timestamp of feedback timerange, when equals to startTime means only one timestamp
   */
  endTime: Date;
  /**
   * feedback value
   */
  value: "AutoDetect" | "Anomaly" | "NotAnomaly";

  /**
   * The anomaly detection configuration id.
   *
   * May be available when retrieving feedback from the Metrics Advisor service.
   */
  readonly anomalyDetectionConfigurationId?: string;
  /**
   * The snapshot of the anomaly detection configuration when feedback was created.
   *
   * May be vailable when retrieving feedback from the Metrics Advisor service.
   */
  readonly anomalyDetectionConfigurationSnapshot?: AnomalyDetectionConfiguration;
} & MetricFeedbackCommon;

/**
 * Represents feedback of whether data points within the time range should be considered change point or not.
 */
export type MetricChangePointFeedback = {
  /**
   * Feedback type.
   */
  feedbackType: "ChangePoint";
  /**
   * the start timestamp of feedback timerange
   */
  startTime: Date;
  /**
   * value for ChangePointValue
   */
  value: "AutoDetect" | "ChangePoint" | "NotChangePoint";
} & MetricFeedbackCommon;

/**
 * Represents comment feedback.
 */
export type MetricCommentFeedback = {
  /**
   * Feedback type.
   */
  feedbackType: "Comment";
  /**
   * the start timestamp of feedback timerange
   */
  startTime?: Date;
  /**
   * the end timestamp of feedback timerange, when equals to startTime means only one timestamp
   */
  endTime?: Date;
  /**
   * the comment string
   */
  comment: string;
} & MetricFeedbackCommon;

/**
 * Represents feedback regarding period.
 */
export type MetricPeriodFeedback = {
  /**
   * Feedback type.
   */
  feedbackType: "Period";
  /**
   * the type of setting period
   */
  periodType: "AutoDetect" | "AssignValue";
  /**
   * the number of intervals a period contains, when no period set to 0
   */
  periodValue: number;
} & MetricFeedbackCommon;

/**
 * Represents properties common to hooks.
 */
export interface NotificationHook {
  /**
   * Hook unique id
   */
  readonly id?: string;
  /**
   * hook unique name
   */
  name: string;
  /**
   * hook description
   */
  description?: string;
  /**
   * hook external link
   */
  externalLink?: string;
  /**
   * The administrators of this {@link NotificationHook }.
   * Administrators have total control over a NotificationHook, being allowed to update or delete.
   * Each element in this list represents a user with administrator access, but the value of each `string` element
   * depends on the type of authentication to be used by this administrator when communicating with the service.
   * If {@link MetricsAdvisorKeyCredential } authentication will be used, the `string` must be the user's email address.
   * If AAD authentication will be used instead, the `string` must uniquely identify the user's principal.
   * For instance, for a `ClientSecretCredential`, the `string` must be the client ID.
   */
  admins?: string[];
}

/**
 * Represents Email hook
 */
export type EmailNotificationHook = {
  hookType: "Email";
  /** Parameters for email notification hook */
  hookParameter: EmailHookParameter;
} & NotificationHook;

/**
 * Represents Webhook hook
 */
export type WebNotificationHook = {
  hookType: "Webhook";
  /** Parameters for web notification hook */
  hookParameter: WebhookHookParameter;
} & NotificationHook;

/**
 * A union type of all supported hooks
 */
export type NotificationHookUnion = EmailNotificationHook | WebNotificationHook;

/**
 * Represents properties common to the patch input to the Update Hook operation.
 */
export type NotificationHookPatch = {
  /**
   * new hook name
   */
  hookName?: string;
  /**
   * new hook description
   */
  description?: string;
  /**
   * new hook external link
   */
  externalLink?: string;
  /**
   * The administrators of this {@link NotificationHook }.
   * Administrators have total control over a NotificationHook, being allowed to update or delete.
   * Each element in this list represents a user with administrator access, but the value of each `string` element
   * depends on the type of authentication to be used by this administrator when communicating with the service.
   * If {@link MetricsAdvisorKeyCredential } authentication will be used, the `string` must be the user's email address.
   * If AAD authentication will be used instead, the `string` must uniquely identify the user's principal.
   * For instance, for a `ClientSecretCredential`, the `string` must be the client ID.
   */
  admins?: string[];
};

/**
 * Represents Email hook specific patch input to the Update Hook operation.
 */
export type EmailNotificationHookPatch = {
  hookType: "Email";
  /** Parameters for email notification hook patch */
  hookParameter?: Partial<EmailHookParameter>;
} & NotificationHookPatch;

/**
 * Represents Webhook specific patch input to the Update Hook operation.
 */
export type WebNotificationHookPatch = {
  hookType: "Webhook";
  /** Parameters for web notification hook patch */
  hookParameter?: Partial<WebhookHookParameter>;
} & NotificationHookPatch;

/**
 * Severity of an anomaly or incident.
 */
export type AnomalySeverity = "Low" | "Medium" | "High";

/**
 * Status of an anomaly or incident.
 */
export type AnomalyStatus = "Active" | "Resolved";

/**
 * Represents an incident reported by Metrics Advisor service.
 */
export interface AnomalyIncident {
  /**
   * incident id
   */
  id: string;
  /**
   * identifies the time series or time series group
   */
  rootDimensionKey: DimensionKey;
  /**
   * data feed unique id
   *
   * only return for alerting incident result
   */
  readonly dataFeedId?: string;
  /**
   * metric unique id
   *
   * only return for alerting incident result
   */
  metricId?: string;
  /**
   * anomaly detection configuration unique id
   */
  detectionConfigurationId: string;
  /**
   * incident start time
   */
  startTime?: Date;
  /**
   * incident last time
   */
  lastOccurredTime: Date;

  /**
   * incident status
   */
  status?: AnomalyStatus;

  /**
   * severity of the incident
   */
  severity: AnomalySeverity;

  /**
   * value of the root node
   */
  readonly valueOfRootNode?: number;

  /**
   * expected value of the root node given by smart detector
   */
  readonly expectedValueOfRootNode?: number;
}

/**
 * Represents an anomaly point detected by Metrics Advisor service.
 */
export interface DataPointAnomaly {
  /**
   * data feed unique id
   *
   * only return for alerting anomaly result
   */
  readonly dataFeedId?: string;
  /**
   * metric unique id
   *
   * only return for alerting anomaly result
   */
  metricId?: string;
  /**
   * anomaly detection configuration unique id
   */
  detectionConfigurationId: string;
  /**
   * anomaly time
   */
  timestamp: number;
  /**
   * created time
   *
   * only return for alerting result
   */
  createdOn?: Date;
  /**
   * modified time
   *
   * only return for alerting result
   */
  modifiedOn?: Date;
  /**
   * dimension specified for series
   */
  seriesKey: DimensionKey;
  /**
   * anomaly severity
   */
  severity: AnomalySeverity;
  /**
   * anomaly status
   *
   * only return for alerting anomaly result
   */
  status?: AnomalyStatus;
  /**
   * value of the anomaly
   */
  readonly value?: number;
  /**
   * expected value of the anomaly given by smart detector
   */
  readonly expectedValue?: number;
}

/**
 * Represents an alert reported by Metrics Advisor service.
 */
export interface AnomalyAlert {
  /**
   * alert id
   */
  id: string;
  /**
   * id of the alert configuration that triggered this alert
   */
  alertConfigId: string;
  /**
   * anomaly time
   */
  timestamp?: number; // TODO: why optional?
  /**
   * created time
   */
  createdOn?: Date; // TODO: why optional?
  /**
   * modified time
   */
  modifiedOn?: Date; // TODO: why optional?
}

/**
 * Mode to use when querying alerts by time.
 */
export type AlertQueryTimeMode = "AnomalyTime" | "CreatedTime" | "ModifiedTime";

/**
 * Defines the anomaly alert scope.
 */
export type MetricAnomalyAlertScope =
  | {
      /**
       * Anomaly scope
       */
      scopeType: "All";
    }
  | {
      scopeType: "Dimension";
      /**
       * dimension scope
       */
      seriesGroupInScope: DimensionKey;
    }
  | {
      scopeType: "TopN";
      /**
       * Top N scope
       */
      topNAnomalyScope: TopNGroupScope;
    };

/**
 * Defines the Boundary Conditions for the Metric
 */
export type MetricBoundaryCondition =
  | {
      /**
       * value filter direction
       */
      direction: "Down";
      /**
       * lower bound
       */
      lower: number;
      /**
       * the other metric unique id used for value filter
       */
      metricId?: string;
      /**
       * trigger alert when the corresponding point is missing in the other metric
       *
       * should be specified only when using other metric to filter
       */
      triggerForMissing?: boolean;
      /**
       * data used to implement value filter
       */
      type?: "Value" | "Mean";
    }
  | {
      /**
       * value filter direction
       */
      direction: "Up";
      /**
       * upper bound
       */
      upper: number;
      /**
       * the other metric unique id used for value filter
       */
      metricId?: string;
      /**
       * trigger alert when the corresponding point is missing in the other metric
       *
       * should be specified only when using other metric to filter
       */
      triggerForMissing?: boolean;
      /**
       * data used to implement value filter
       */
      type?: "Value" | "Mean";
    }
  | {
      /**
       * lower bound
       */
      lower: number;
      /**
       * upper bound
       */
      upper: number;
      /**
       * value filter direction
       */
      direction: "Both";
      /**
       * the other metric unique id used for value filter
       */
      metricId?: string;
      /**
       * trigger alert when the corresponding point is missing in the other metric
       *
       * should be specified only when using other metric to filter
       */
      triggerForMissing?: boolean;
      /**
       * data used to implement value filter
       */
      type?: "Value" | "Mean";
    };

/**
 * Defines conditions to decide whether the detected anomalies should be
 * included in an alert or not.
 */
export interface MetricAnomalyAlertConditions {
  /**
   * severity condition to trigger alert
   */
  severityCondition?: SeverityCondition;
  /**
   * boundary condition to trigger alert
   */
  metricBoundaryCondition?: MetricBoundaryCondition;
}

/**
 * Defines alerting settings for anomalies detected by a detection
 * configuration.
 */
export interface MetricAlertConfiguration {
  /**
   * Anomaly detection configuration unique id
   */
  detectionConfigurationId: string;

  /**
   * when set to true, report alert if there are no anomalies detected by this detection configuration.
   * when set to false or not specified (default), report alert if anomalies are detected by this detection configuration.
   */
  negationOperation?: boolean;
  /**
   * the alert scope
   */
  alertScope: MetricAnomalyAlertScope;
  /**
   * condition to snooze alert
   */
  snoozeCondition?: MetricAnomalyAlertSnoozeCondition;
  /**
   * conditions to trigger alerts
   */
  alertConditions?: MetricAnomalyAlertConditions;
}

/**
 * Represents an anomaly alert configuration.
 */
export interface AnomalyAlertConfiguration {
  /**
   * anomaly alerting configuration unique id
   */
  id: string;
  /**
   * anomaly alerting configuration name
   */
  name: string;
  /**
   * anomaly alerting configuration description
   */
  description?: string;
  /**
   * logical operator to apply across metric alert configurations in {@link metricAlertConfigurations}
   *
   */
  crossMetricsOperator?: MetricAnomalyAlertConfigurationsOperator;
  /**
   * unique hook ids
   */
  hookIds: string[];
  /**
   * Anomaly alerting configurations
   */
  metricAlertConfigurations: MetricAlertConfiguration[];
  /**
   * dimensions used to split alert
   */
  dimensionsToSplitAlert?: string[];
}

/**
 * Represents a metric anomaly detection configuration.
 */
export interface AnomalyDetectionConfiguration {
  /**
   * anomaly detection configuration unique id
   */
  id: string;
  /**
   * anomaly detection configuration name
   */
  name: string;
  /**
   * anomaly detection configuration description
   */
  description?: string;
  /**
   * metric unique id
   */
  metricId: string;
  /**
   * detection condition for all time series of a metric
   */
  wholeSeriesDetectionCondition: MetricDetectionCondition;
  /**
   * detection conditions for series group. This overrides the whole series detection condition.
   */
  seriesGroupDetectionConditions?: MetricSeriesGroupDetectionCondition[];
  /**
   * detection conditions for specific series.  This overrides both the whole series and the series group detection conditions.
   */
  seriesDetectionConditions?: MetricSingleSeriesDetectionCondition[];
}

/**
 * Represents patch type for metric anomaly detection configuration.
 */
export interface AnomalyDetectionConfigurationPatch {
  /**
   * anomaly detection configuration name
   */
  name?: string;
  /**
   * anomaly detection configuration description
   */
  description?: string;

  /**
   * detection condition for all time series of a metric
   */
  wholeSeriesDetectionCondition?: MetricDetectionConditionPatch;
  /**
   * detection conditions for series group. This overrides the whole series detection condition.
   */
  seriesGroupDetectionConditions?: MetricSeriesGroupDetectionCondition[];
  /**
   * detection conditions for specific series.  This overrides both the whole series and the series group detection conditions.
   */
  seriesDetectionConditions?: MetricSingleSeriesDetectionCondition[];
}
/**
 * Represents the root cause of an incident.
 */
export interface IncidentRootCause {
  /**
   * identifies the contributing time series.
   */
  seriesKey: DimensionKey;
  /**
   * drilling down path from query anomaly to root cause
   */
  path: string[];
  /**
   * score
   */
  score: number;
  /**
   * root cause description
   */
  description: string;
}

/**
 * Defines a metric time series
 */
export interface MetricSeriesDefinition {
  /**
   * unique metric id
   */
  metricId: string;
  /**
   * identifies a time series
   */
  seriesKey: Record<string, string>;
}

/**
 * Represents a segment of a metric time series.
 */
export interface MetricSeriesData {
  /**
   * metric series definition
   */
  definition: MetricSeriesDefinition;
  /**
   * timestamp list
   */
  timestamps?: Date[];
  /**
   * value list
   */
  values?: number[];
}

/**
 * Represents a segment of metric time series data enriched by the Metrics Advisor service.
 */
export interface MetricEnrichedSeriesData {
  /**
   * identifies the time series.
   */
  seriesKey: DimensionKey;
  /**
   * timestamp list
   */
  timestamps?: Date[];
  /**
   * value list
   */
  values?: number[];
  /**
   * list of booleans incidating whether a data point is anomaly or not
   */
  isAnomaly?: boolean[];
  /**
   * list of expected values
   */
  expectedValues?: number[];
  /**
   * list of lower bounds
   */
  lowerBounds?: number[];
  /**
   * list of upper bounds
   */
  upperBounds?: number[];
  /**
   * list of period values
   */
  periods?: number[];
}

// Response types

/**
 * Contains response data for the getMetricEnrichedSeriesData operation.
 */
export interface GetMetricEnrichedSeriesDataResponse extends Array<MetricEnrichedSeriesData> {}

/**
 * Contains response data for the getIncidentRootCause operation.
 */
export type GetIncidentRootCauseResponse = {
  rootCauses: IncidentRootCause[];
};

/**
 * Contains response data for the listAlertsForAlertConfiguration operation.
 */
export interface AlertsPageResponse extends Array<AnomalyAlert> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}

/**
 * Contains response data for the listAnomalies operation.
 */
export interface AnomaliesPageResponse extends Array<DataPointAnomaly> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}

/**
 * Contains response data for the listDimensionValues operation.
 */
export interface DimensionValuesPageResponse extends Array<string> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}

/**
 * Contains response data for the listIncidents operation.
 */
export interface IncidentsPageResponse extends Array<AnomalyIncident> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}

/**
 * Contains response data for the listMetricSeries operation.
 */
export interface MetricSeriesPageResponse extends Array<MetricSeriesDefinition> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}

/**
 * Represents Enrichment Status
 */
export interface EnrichmentStatus {
  /**
   * data slice timestamp.
   */
  readonly timestamp?: number;
  /**
   * latest enrichment status for this data slice.
   */
  readonly status?: string;
  /**
   * the trimmed message describes details of the enrichment status.
   */
  readonly message?: string;
}

/**
 * Contains response data for the listMetricEnrichmentStatus operation.
 */
export interface MetricEnrichmentStatusPageResponse extends Array<EnrichmentStatus> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}

/**
 * Contains response data for the listDataFeeds operation.
 */
export interface DataFeedsPageResponse extends Array<MetricsAdvisorDataFeed> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}

/**
 * Contains response data for the getMetricSeriesData operation.
 */
export interface GetMetricSeriesDataResponse extends Array<MetricSeriesData> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}

export interface IngestionStatus {
  /**
   * data slice timestamp.
   */
  readonly timestamp?: number;
  /**
   * latest ingestion task status for this data slice.
   */
  readonly status?: IngestionStatusType;
  /**
   * the trimmed message of last ingestion job.
   */
  readonly message?: string;
}
/**
 * Contains response data for the ListDataFeedIngestionStatus operation.
 */
export interface IngestionStatusPageResponse extends Array<IngestionStatus> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}

/**
 * Contains response data for the listMetricFeedbacks operation.
 */
export interface MetricFeedbackPageResponse extends Array<MetricFeedbackUnion> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}

/**
 * Contains response data for the listAlertConfigs operation.
 */
export interface AlertConfigurationsPageResponse extends Array<AnomalyAlertConfiguration> {}
/**
 * Contains response data for the listAnomalyDetectionConfigurations operation.
 */
export interface DetectionConfigurationsPageResponse extends Array<AnomalyDetectionConfiguration> {}

/**
 * Contains response data for the listHooks operation.
 */
export interface HooksPageResponse extends Array<NotificationHookUnion> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}

/**
 * Contains response data for the getDataFeedIngestionProgress operation.
 */
export type GetIngestionProgressResponse = {
  /**
   * the timestamp of lastest success ingestion job.
   * null indicates not available
   */
  readonly latestSuccessTimestamp?: number;
  /**
   * the timestamp of lastest ingestion job with status update.
   * null indicates not available
   */
  readonly latestActiveTimestamp?: number;
};

/**
 * Data Source Credential
 */
export interface DataSourceCredentialEntity {
  /**
   * Unique id of data source credential
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /** Name of data source credential */
  name: string;
  /** Description of data source credential */
  description?: string;
}

/**
 * SqlServer Data Source Credential
 * User is required to specify connectionString for Create.
 * connectionString being a secret is not returned by service.
 */
export interface DataSourceSqlConnectionString extends DataSourceCredentialEntity {
  /** Azure Sql Connection String credential */
  type: "AzureSQLConnectionString";
  /** The connection string for SqlServer Data Source Credential. Required by user for Create. Not returned by service. */
  connectionString?: string;
}

/**
 * DataLake Gen2 Shared Key DataSource Credential
 * User is required to specify accountKey for Create.
 * accountKey being a secret is not returned by service.
 */
export interface DataSourceDataLakeGen2SharedKey extends DataSourceCredentialEntity {
  /** DataLakeGen2 Shared Key DataSource credential */
  type: "DataLakeGen2SharedKey";
  /** The account key of the DataLake Gen2 Shared Key DataSource Credential. Required by user for Create. Not returned by service. */
  accountKey?: string;
}

/**
 * Service Principal DataSource Credential
 * User is required to specify clientSecret for Create.
 * clientSecret being a secret is not returned by service.
 */
export interface DataSourceServicePrincipal extends DataSourceCredentialEntity {
  /** Service Principal DataSource Credential */
  type: "ServicePrincipal";
  /** The client id of the service principal. */
  clientId: string;
  /** The client secret of the service principal. Required by user for Create. Not returned by service. */
  clientSecret?: string;
  /** The tenant id of the service principal. */
  tenantId: string;
}

/**
 * Service Principal in KeyVault DataSource Credential
 * User is required to specify keyVaultClientSecret for Create.
 * keyVaultClientSecret being a secret is not returned by service.
 */
export interface DataSourceServicePrincipalInKeyVault extends DataSourceCredentialEntity {
  /** Service Principal in KeyVault DataSource Credential */
  type: "ServicePrincipalInKV";
  /** The Key Vault endpoint that storing the service principal. */
  keyVaultEndpoint: string;
  /** The Client Id to access the Key Vault. */
  keyVaultClientId: string;
  /** The Client Secret to access the Key Vault. Required by user for Create. Not returned by service. */
  keyVaultClientSecret?: string;
  /** The secret name of the service principal's client Id in the Key Vault. */
  servicePrincipalIdNameInKV: string;
  /** The secret name of the service principal's client secret in the Key Vault. */
  servicePrincipalSecretNameInKV: string;
  /** The tenant id of your service principal. */
  tenantId: string;
}

/**
 * Data Source Credential Entity Union Type
 */
export type DataSourceCredentialEntityUnion =
  | DataSourceSqlConnectionString
  | DataSourceDataLakeGen2SharedKey
  | DataSourceServicePrincipal
  | DataSourceServicePrincipalInKeyVault;

/**
 * SqlServer Data Source Credential Patch
 */
export interface DataSourceSqlServerConnectionStringPatch {
  /** Azure Sql Connection String credential */
  type: "AzureSQLConnectionString";
  /** Name of data source credential */
  name?: string;
  /** Description of data source credential */
  description?: string;
  /** The connection string for SqlServer Data Source Credential */
  connectionString?: string;
}

/**
 * DataLake Gen2 Shared Key DataSource Credential Patch
 */
export interface DataSourceDataLakeGen2SharedKeyPatch {
  /** DataLakeGen2 Shared Key DataSource credential */
  type: "DataLakeGen2SharedKey";
  /** Name of data source credential */
  name?: string;
  /** Description of data source credential */
  description?: string;
  /** The account key of the DataLake Gen2 Shared Key DataSource Credential  */
  accountKey?: string;
}

/**
 *  Service Principal DataSource Credential Patch
 */
export interface DataSourceServicePrincipalPatch {
  /** Service Principal DataSource Credential */
  type: "ServicePrincipal";
  /** Name of data source credential */
  name?: string;
  /** Description of data source credential */
  description?: string;
  /** The client id of the service principal. */
  clientId?: string;
  /** The client secret of the service principal. */
  clientSecret?: string;
  /** The tenant id of the service principal. */
  tenantId?: string;
}

/**
 *  Service Principal in KeyVault DataSource Credential Patch
 */
export interface DataSourceServicePrincipalInKeyVaultPatch {
  /** Service Principal in KeyVault DataSource Credential */
  type: "ServicePrincipalInKV";
  /** Name of data source credential */
  name?: string;
  /** Description of data source credential */
  description?: string;
  /** The Key Vault endpoint that storing the service principal. */
  keyVaultEndpoint?: string;
  /** The Client Id to access the Key Vault. */
  keyVaultClientId?: string;
  /** The Client Secret to access the Key Vault. */
  keyVaultClientSecret?: string;
  /** The secret name of the service principal's client Id in the Key Vault. */
  servicePrincipalIdNameInKV?: string;
  /** The secret name of the service principal's client secret in the Key Vault. */
  servicePrincipalSecretNameInKV?: string;
  /** The tenant id of your service principal. */
  tenantId?: string;
}

/**
 * DataSource credential patch types
 */
export type DataSourceCredentialPatch =
  | DataSourceSqlServerConnectionStringPatch
  | DataSourceDataLakeGen2SharedKeyPatch
  | DataSourceServicePrincipalPatch
  | DataSourceServicePrincipalInKeyVaultPatch;

/**
 * Contains response data for the listCredentials operation.
 */
export interface CredentialsPageResponse extends Array<DataSourceCredentialEntityUnion> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
}

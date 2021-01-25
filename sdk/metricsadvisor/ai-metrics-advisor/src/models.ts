// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";

import {
  SqlSourceParameter,
  SuppressCondition,
  SmartDetectionCondition,
  AzureApplicationInsightsParameter,
  AzureBlobParameter,
  AzureCosmosDBParameter,
  AzureDataLakeStorageGen2Parameter,
  AzureTableParameter,
  ElasticsearchParameter,
  HttpRequestParameter,
  InfluxDBParameter,
  MongoDBParameter,
  EmailHookParameter,
  WebhookHookParameter,
  TopNGroupScope,
  KnownSeverity,
  Severity,
  SeverityCondition,
  AlertSnoozeCondition,
  DataFeedDetailStatus,
  KnownDataFeedDetailStatus,
  IngestionStatusType
} from "./generated/models";

export {
  KnownSeverity,
  Severity,
  SeverityCondition,
  AlertSnoozeCondition,
  SmartDetectionCondition,
  TopNGroupScope,
  AzureApplicationInsightsParameter,
  AzureBlobParameter,
  AzureCosmosDBParameter,
  SqlSourceParameter,
  AzureDataLakeStorageGen2Parameter,
  AzureTableParameter,
  ElasticsearchParameter,
  HttpRequestParameter,
  InfluxDBParameter,
  MongoDBParameter,
  SuppressCondition,
  EmailHookParameter,
  WebhookHookParameter,
  DataFeedDetailStatus,
  KnownDataFeedDetailStatus
};

// not used directly here but needed by public API surface.
export {
  AnomalyValue,
  KnownAnomalyValue,
  DataFeedIngestionProgress,
  IngestionStatusType,
  KnownIngestionStatusType,
  DataSourceType,
  KnownDataSourceType,
  SeverityFilterCondition,
  SnoozeScope,
  KnownSnoozeScope,
  AnomalyDetectorDirection,
  KnownAnomalyDetectorDirection,
  FeedbackType,
  KnownFeedbackType,
  FeedbackQueryTimeMode,
  KnownFeedbackQueryTimeMode
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
 * Defines values for DataFeedRollupMethod.
 */
export type DataFeedRollupMethod = "None" | "Sum" | "Max" | "Min" | "Avg" | "Count" | string;

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
      rollupMethod?: DataFeedRollupMethod;
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
      fillType: "SmartFilling" | "PreviousValue" | "NoFilling" | string;
      customFillValue?: number;
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
export type DataFeedAccessMode = "Private" | "Public" | string;

/**
 * Various optional configurations for a data feed.
 */
export interface DataFeedOptions {
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
   * email addresses of data feed administrators
   */
  adminEmails?: string[];

  /**
   * email addresses of data feed viewers
   */
  viewerEmails?: string[];

  /**
   * action link template for alert
   */
  actionLinkTemplate?: string;
}

/**
 * Granularity type of a data feed.
 */
export type DataFeedGranularity =
  | {
      granularityType:
        | "Yearly"
        | "Monthly"
        | "Weekly"
        | "Daily"
        | "Hourly"
        | "PerMinute"
        | "PerSecond"
        | string;
      customGranularityValue?: number;
    }
  | {
      granularityType: "Custom";
      customGranularityValue: number;
    };

export type DataFeedStatus = "Paused" | "Active" | string;

/**
 * Represents newly created Metrics Advisor data feed.
 */
export type CreatedDataFeed = {
  /**
   * Unique id of the data feed.
   */
  id: string;
};

/**
 * Represents a Metrics Advisor data feed.
 */
export type DataFeed = {
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
   * Granularity of the data feed.
   */
  granularity: DataFeedGranularity;
  /**
   * Ingestion settings for the data feed.
   */
  ingestionSettings: DataFeedIngestionSettings;
} & DataFeedOptions;

/**
 * Represents an Azure Application Insights data source.
 */
export type AzureApplicationInsightsDataFeedSource = {
  dataSourceType: "AzureApplicationInsights";
  dataSourceParameter: AzureApplicationInsightsParameter;
};

/**
 * Represents an Azure Blob Storage data source.
 */
export type AzureBlobDataFeedSource = {
  dataSourceType: "AzureBlob";
  dataSourceParameter: AzureBlobParameter;
};

/**
 * Represents an Azure CosmosDB data source.
 */
export type AzureCosmosDBDataFeedSource = {
  dataSourceType: "AzureCosmosDB";
  dataSourceParameter: AzureCosmosDBParameter;
};

/**
 * Represents an Azure Data Explorer data source.
 */
export type AzureDataExplorerDataFeedSource = {
  dataSourceType: "AzureDataExplorer";
  dataSourceParameter: SqlSourceParameter;
};

/**
 * Represents an Azure DataLake Storage Gen2 data source.
 */
export type AzureDataLakeStorageGen2DataFeedSource = {
  dataSourceType: "AzureDataLakeStorageGen2";
  dataSourceParameter: AzureDataLakeStorageGen2Parameter;
};

/**
 * Represents an Elasticsearch data source.
 */
export type ElasticsearchDataFeedSource = {
  dataSourceType: "Elasticsearch";
  dataSourceParameter: ElasticsearchParameter;
};

/**
 * Represents an Azure Table data source.
 */
export type AzureTableDataFeedSource = {
  dataSourceType: "AzureTable";
  dataSourceParameter: AzureTableParameter;
};

/**
 * Represents an Http Request data source.
 */
export type HttpRequestDataFeedSource = {
  dataSourceType: "HttpRequest";
  dataSourceParameter: HttpRequestParameter;
};

/**
 * Represents an InfluxDB data source.
 */
export type InfluxDBDataFeedSource = {
  dataSourceType: "InfluxDB";
  dataSourceParameter: InfluxDBParameter;
};

/**
 * Represents a MySQL data source.
 */
export type MySqlDataFeedSource = {
  dataSourceType: "MySql";
  dataSourceParameter: SqlSourceParameter;
};

/**
 * Represents a PostgreSQL data source.
 */
export type PostgreSqlDataFeedSource = {
  dataSourceType: "PostgreSql";
  dataSourceParameter: SqlSourceParameter;
};

/**
 * Represents a MongoDB data source.
 */
export type MongoDBDataFeedSource = {
  dataSourceType: "MongoDB";
  dataSourceParameter: MongoDBParameter;
};

/**
 * Represents an Unknown data source.
 */
export type UnknownDataFeedSource = {
  dataSourceType: "Unknown";
  dataSourceParameter: unknown;
};

/**
 * Represents a SQL Server data source.
 */
export type SQLServerDataFeedSource = {
  dataSourceType: "SqlServer";
  dataSourceParameter: SqlSourceParameter;
};

/**
 * A union type of all supported data sources.
 */
export type DataFeedSource =
  | AzureApplicationInsightsDataFeedSource
  | AzureBlobDataFeedSource
  | AzureCosmosDBDataFeedSource
  | AzureDataExplorerDataFeedSource
  | AzureDataLakeStorageGen2DataFeedSource
  | AzureTableDataFeedSource
  | ElasticsearchDataFeedSource
  | HttpRequestDataFeedSource
  | InfluxDBDataFeedSource
  | MySqlDataFeedSource
  | PostgreSqlDataFeedSource
  | SQLServerDataFeedSource
  | MongoDBDataFeedSource
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
} & DataFeedOptions & {
    /**
     * Status of the data feed.
     */
    status?: DataFeedDetailStatus;
  };

/**
 * A alias type of supported data sources to pass to Update Data Feed operation.
 *
 * When not changing the data source type, the dataSourceParameter is not required.
 * When changing to a different data source type, both dataSourceType and dataSourceParameter are required.
 */
export type DataFeedSourcePatch = Omit<DataFeedSource, "dataSourceParameter"> &
  { [P in "dataSourceParameter"]?: DataFeedSource[P] };

/**
 * The logical operator to apply across multiple {@link MetricAlertConfiguration}
 */
export type MetricAnomalyAlertConfigurationsOperator = "AND" | "OR" | "XOR" | string;

/**
 * The logical operator to apply across anomaly detection conditions.
 */
export type DetectionConditionsOperator = "AND" | "OR" | string;

/**
 * Represents properties common to anomaly detection conditions.
 */
export interface DetectionConditionsCommon {
  /**
   * Condition operator
   */
  conditionOperator?: DetectionConditionsOperator;
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
 * Detection condition for a series group.
 */
export type MetricSeriesGroupDetectionCondition = DetectionConditionsCommon & {
  /**
   * identifies the group of time series
   */
  group: DimensionKey;
};

/**
 * Detection condition for a specific time series.
 */
export type MetricSingleSeriesDetectionCondition = DetectionConditionsCommon & {
  /**
   * identifies the time series
   */
  series: DimensionKey;
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
 * Represents newly created Metric Feedback
 */
export type CreateMetricFeedback = {
  /**
   * feedback unique id
   */
  id: string;
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
  value: "AutoDetect" | "Anomaly" | "NotAnomaly" | string;

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
  value: "AutoDetect" | "ChangePoint" | "NotChangePoint" | string;
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
  periodType: "AutoDetect" | "AssignValue" | string;
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
   * email addresses of hook administrators
   */
  readonly adminEmails?: string[];
}

/**
 * Represents Email hook
 */
export type EmailNotificationHook = {
  hookType: "Email";
  hookParameter: EmailHookParameter;
} & NotificationHook;

/**
 * Represents Webhook hook
 */
export type WebNotificationHook = {
  hookType: "Webhook";
  hookParameter: WebhookHookParameter;
} & NotificationHook;

/**
 * A union type of all supported hooks
 */
export type NotificationHookUnion = EmailNotificationHook | WebNotificationHook;

/**
 * A union type of all supported created hooks
 */
export type CreatedNotificationHook = {
  /**
   * Hook unique id
   */
  id: string;
};

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
};

/**
 * Represents Email hook specific patch input to the Update Hook operation.
 */
export type EmailNotificationHookPatch = {
  hookType: "Email";
  hookParameter?: EmailHookParameter;
} & NotificationHookPatch;

/**
 * Represents Webhook specific patch input to the Update Hook operation.
 */
export type WebNotificationHookPatch = {
  hookType: "Webhook";
  hookParameter?: WebhookHookParameter;
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
}

/**
 * Represents an anomaly point detected by Metrics Advisor service.
 */
export interface DataPointAnomaly {
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
      dimensionAnomalyScope: DimensionKey;
    }
  | {
      scopeType: "TopN";
      /**
       * Top N scope
       */
      topNAnomalyScope: TopNGroupScope;
    };

/**
 * Defines the
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
    };

export interface MetricAlertConditions {
  /**
   * severity condition to trigger alert
   */
  severityCondition?: SeverityCondition;
  /**
   * boundary condition to trigger alert
   */
  metricBoundaryCondition?: MetricBoundaryCondition;
}

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
  snoozeCondition?: AlertSnoozeCondition;
  /**
   * conditions to trigger alerts
   */
  alertConditions?: MetricAlertConditions;
}

/**
 * Represents created anomaly alert configuration.
 */
export interface CreatedAnomalyAlertConfiguration {
  /**
   * anomaly alerting configuration unique id
   */
  id: string;
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
 * Represents newly created metric anomaly detection configuration.
 */
export type CreatedAnomalyDetectionConfiguration = {
  /**
   * Anomaly detection configuration unique id
   */
  id: string;
};

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
  dimension: Record<string, string>;
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
  series: DimensionKey;
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
 * Contains response data for the getDataFeed operation.
 */
export type GetDataFeedResponse = DataFeed & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};
/**
 * Contains response data for the createDataFeed operation.
 */
export type CreateDataFeedResponse = CreatedDataFeed & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: any;
  };
};

/**
 * Contains response data for the createAnomalyDetectionConfiguration operation.
 */
export type CreateAnomalyDetectionConfigurationResponse = CreatedAnomalyDetectionConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as parsed JSON or XML
     */
    parsedHeaders: any;
  };
};
/**
 * Contains response data for the getAnomalyDetectionConfiguration operation.
 */
export type GetAnomalyDetectionConfigurationResponse = AnomalyDetectionConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the createAnomalyAlertConfiguration operation.
 */
export type CreateAnomalyAlertConfigurationResponse = CreatedAnomalyAlertConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as parsed JSON or XML
     */
    parsedHeaders: any;
  };
};

/**
 * Contains response data for the getAnomalyAlertConfiguration operation.
 */
export type GetAnomalyAlertConfigurationResponse = AnomalyAlertConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the createHook operation.
 */
export type CreateHookResponse = CreatedNotificationHook & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as parsed JSON or XML
     */
    parsedHeaders: any;
  };
};

/**
 * Contains response data for the getHook operation.
 */
export type GetHookResponse = NotificationHookUnion & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the getMetricEnrichedSeriesData operation.
 */
export interface GetMetricEnrichedSeriesDataResponse extends Array<MetricEnrichedSeriesData> {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
}

/**
 * Contains response data for the getIncidentRootCause operation.
 */
export type GetIncidentRootCauseResponse = {
  rootCauses: IncidentRootCause[];
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the createFeedback operation.
 */
export type CreateFeedbackResponse = CreateMetricFeedback & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as parsed JSON or XML
     */
    parsedHeaders: any;
  };
};

/**
 * Contains response data for the getFeedback operation.
 */
export type GetFeedbackResponse = MetricFeedbackUnion & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listAlertsForAlertConfiguration operation.
 */
export interface AlertsPageResponse extends Array<AnomalyAlert> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
}

/**
 * Contains response data for the listAnomalies operation.
 */
export interface AnomaliesPageResponse extends Array<DataPointAnomaly> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
}

/**
 * Contains response data for the listDimensionValues operation.
 */
export interface DimensionValuesPageResponse extends Array<string> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
}

/**
 * Contains response data for the listIncidents operation.
 */
export interface IncidentsPageResponse extends Array<AnomalyIncident> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
}

/**
 * Contains response data for the listMetricSeries operation.
 */
export interface MetricSeriesPageResponse extends Array<MetricSeriesDefinition> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
}

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
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
}

/**
 * Contains response data for the listDataFeeds operation.
 */
export interface DataFeedsPageResponse extends Array<DataFeed> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
}

/**
 * Contains response data for the getMetricSeriesData operation.
 */
export interface GetMetricSeriesDataResponse extends Array<MetricSeriesData> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
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
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
}

/**
 * Contains response data for the listMetricFeedbacks operation.
 */
export interface MetricFeedbackPageResponse extends Array<MetricFeedbackUnion> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
}

/**
 * Contains response data for the listAlertConfigs operation.
 */
export interface AlertConfigurationsPageResponse extends Array<AnomalyAlertConfiguration> {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
}
/**
 * Contains response data for the listAnomalyDetectionConfigurations operation.
 */
export interface DetectionConfigurationsPageResponse extends Array<AnomalyDetectionConfiguration> {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
}

/**
 * Contains response data for the listHooks operation.
 */
export interface HooksPageResponse extends Array<NotificationHookUnion> {
  /**
   * Continuation token to pass to `byPage()` to resume listing of more results if available.
   */
  continuationToken?: string;
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
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
} & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

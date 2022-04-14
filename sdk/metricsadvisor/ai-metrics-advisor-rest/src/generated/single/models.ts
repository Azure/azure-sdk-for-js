// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface AnomalyAlertingConfiguration {
  /**
   * anomaly alerting configuration unique id
   *
   * Value may contain a UUID
   */
  anomalyAlertingConfigurationId?: string;
  /** anomaly alerting configuration name */
  name: string;
  /** anomaly alerting configuration description */
  description?: string;
  /**
   * cross metrics operator
   *
   * should be specified when setting up multiple metric alerting configurations
   */
  crossMetricsOperator?: "AND" | "OR" | "XOR";
  /** dimensions used to split alert */
  splitAlertByDimensions?: Array<string>;
  /** hook unique ids */
  hookIds: Array<string>;
  /** Anomaly alerting configurations */
  metricAlertingConfigurations: Array<MetricAlertingConfiguration>;
}

export interface MetricAlertingConfiguration {
  /**
   * Anomaly detection configuration unique id
   *
   * Value may contain a UUID
   */
  anomalyDetectionConfigurationId: string;
  /** Anomaly scope */
  anomalyScopeType: "All" | "Dimension" | "TopN";
  /** Negation operation */
  negationOperation?: boolean;
  dimensionAnomalyScope?: DimensionGroupIdentity;
  /** Group Scope for Top N values */
  topNAnomalyScope?: TopNGroupScope;
  /** Alert Severity Condition */
  severityFilter?: SeverityCondition;
  /** Represents Conditions to snooze Alerts */
  snoozeFilter?: AlertSnoozeCondition;
  valueFilter?: ValueCondition;
}

export interface DimensionGroupIdentity {
  /** dimension specified for series group */
  dimension: Record<string, string>;
}

export interface TopNGroupScope {
  /** top N, value range : [1, +∞) */
  top: number;
  /** point count used to look back, value range : [1, +∞) */
  period: number;
  /**
   * min count should be in top N, value range : [1, +∞)
   *
   * should be less than or equal to period
   */
  minTopCount: number;
}

export interface SeverityCondition {
  /** min alert severity */
  minAlertSeverity: "Low" | "Medium" | "High";
  /** max alert severity */
  maxAlertSeverity: "Low" | "Medium" | "High";
}

export interface AlertSnoozeCondition {
  /** snooze point count, value range : [0, +∞) */
  autoSnooze: number;
  /** snooze scope */
  snoozeScope: "Metric" | "Series";
  /** only snooze for successive anomalies */
  onlyForSuccessive: boolean;
}

export interface ValueCondition {
  /**
   * lower bound
   *
   * should be specified when direction is Both or Down
   */
  lower?: number;
  /**
   * upper bound
   *
   * should be specified when direction is Both or Up
   */
  upper?: number;
  /** value filter direction */
  direction: "Both" | "Down" | "Up";
  /** data used to implement value filter */
  type?: "Value" | "Mean";
  /**
   * the other metric unique id used for value filter
   *
   * Value may contain a UUID
   */
  metricId?: string;
  /**
   * trigger alert when the corresponding point is missing in the other metric
   *
   * should be specified only when using other metric to filter
   */
  triggerForMissing?: boolean;
}

export interface AnomalyAlertingConfigurationPatch {
  /** Anomaly alerting configuration name */
  name?: string;
  /** anomaly alerting configuration description */
  description?: string;
  /** cross metrics operator */
  crossMetricsOperator?: "AND" | "OR" | "XOR";
  /** dimensions used to split alert */
  splitAlertByDimensions?: Array<string>;
  /** hook unique ids */
  hookIds?: Array<string>;
  /** Anomaly alerting configurations */
  metricAlertingConfigurations?: Array<MetricAlertingConfiguration>;
}

export interface AlertingResultQuery {
  /** start time */
  startTime: Date | string;
  /** end time */
  endTime: Date | string;
  /** time mode */
  timeMode: "AnomalyTime" | "CreatedTime" | "ModifiedTime";
}

export interface SeriesIdentity {
  /** dimension specified for series */
  dimension: Record<string, string>;
}

export interface AnomalyDetectionConfiguration {
  /**
   * anomaly detection configuration unique id
   *
   * Value may contain a UUID
   */
  anomalyDetectionConfigurationId?: string;
  /** anomaly detection configuration name */
  name: string;
  /** anomaly detection configuration description */
  description?: string;
  /**
   * metric unique id
   *
   * Value may contain a UUID
   */
  metricId: string;
  wholeMetricConfiguration: WholeMetricConfiguration;
  /** detection configuration for series group */
  dimensionGroupOverrideConfigurations?: Array<DimensionGroupConfiguration>;
  /** detection configuration for specific series */
  seriesOverrideConfigurations?: Array<SeriesConfiguration>;
}

export interface WholeMetricConfiguration {
  /**
   * condition operator
   *
   * should be specified when combining multiple detection conditions
   */
  conditionOperator?: "AND" | "OR";
  /** Represents Smart Condition */
  smartDetectionCondition?: SmartDetectionCondition;
  hardThresholdCondition?: HardThresholdCondition;
  changeThresholdCondition?: ChangeThresholdCondition;
}

export interface SmartDetectionCondition {
  /** sensitivity, value range : (0, 100] */
  sensitivity: number;
  /** detection direction */
  anomalyDetectorDirection: "Both" | "Down" | "Up";
  /** Represents Suppress Condition */
  suppressCondition: SuppressCondition;
}

export interface SuppressCondition {
  /** min point number, value range : [1, +∞) */
  minNumber: number;
  /** min point ratio, value range : (0, 100] */
  minRatio: number;
}

export interface HardThresholdCondition {
  /**
   * lower bound
   *
   * should be specified when anomalyDetectorDirection is Both or Down
   */
  lowerBound?: number;
  /**
   * upper bound
   *
   * should be specified when anomalyDetectorDirection is Both or Up
   */
  upperBound?: number;
  /** detection direction */
  anomalyDetectorDirection: "Both" | "Down" | "Up";
  /** Represents Suppress Condition */
  suppressCondition: SuppressCondition;
}

export interface ChangeThresholdCondition {
  /** change percentage, value range : [0, +∞) */
  changePercentage: number;
  /** shift point, value range : [1, +∞) */
  shiftPoint: number;
  /**
   * if the withinRange = true, detected data is abnormal when the value falls in the range, in this case anomalyDetectorDirection must be Both
   * if the withinRange = false, detected data is abnormal when the value falls out of the range
   */
  withinRange: boolean;
  /** detection direction */
  anomalyDetectorDirection: "Both" | "Down" | "Up";
  /** Represents Suppress Condition */
  suppressCondition: SuppressCondition;
}

export interface DimensionGroupConfiguration {
  group: DimensionGroupIdentity;
  /**
   * condition operator
   *
   * should be specified when combining multiple detection conditions
   */
  conditionOperator?: "AND" | "OR";
  /** Represents Smart Condition */
  smartDetectionCondition?: SmartDetectionCondition;
  hardThresholdCondition?: HardThresholdCondition;
  changeThresholdCondition?: ChangeThresholdCondition;
}

export interface SeriesConfiguration {
  series: SeriesIdentity;
  /**
   * condition operator
   *
   * should be specified when combining multiple detection conditions
   */
  conditionOperator?: "AND" | "OR";
  /** Represents Smart Condition */
  smartDetectionCondition?: SmartDetectionCondition;
  hardThresholdCondition?: HardThresholdCondition;
  changeThresholdCondition?: ChangeThresholdCondition;
}

export interface AnomalyDetectionConfigurationPatch {
  /** anomaly detection configuration name */
  name?: string;
  /** anomaly detection configuration description */
  description?: string;
  wholeMetricConfiguration?: WholeMetricConfigurationPatch;
  /** detection configuration for series group */
  dimensionGroupOverrideConfigurations?: Array<DimensionGroupConfiguration>;
  /** detection configuration for specific series */
  seriesOverrideConfigurations?: Array<SeriesConfiguration>;
}

export interface WholeMetricConfigurationPatch {
  /**
   * condition operator
   *
   * should be specified when combining multiple detection conditions
   */
  conditionOperator?: "AND" | "OR";
  smartDetectionCondition?: SmartDetectionConditionPatch;
  hardThresholdCondition?: HardThresholdConditionPatch;
  changeThresholdCondition?: ChangeThresholdConditionPatch;
}

export interface SmartDetectionConditionPatch {
  /** sensitivity, value range : (0, 100] */
  sensitivity?: number;
  /** detection direction */
  anomalyDetectorDirection?: "Both" | "Down" | "Up";
  suppressCondition?: SuppressConditionPatch;
}

export interface SuppressConditionPatch {
  /** min point number, value range : [1, +∞) */
  minNumber?: number;
  /** min point ratio, value range : (0, 100] */
  minRatio?: number;
}

export interface HardThresholdConditionPatch {
  /**
   * lower bound
   *
   * should be specified when anomalyDetectorDirection is Both or Down
   */
  lowerBound?: number;
  /**
   * upper bound
   *
   * should be specified when anomalyDetectorDirection is Both or Up
   */
  upperBound?: number;
  /** detection direction */
  anomalyDetectorDirection?: "Both" | "Down" | "Up";
  suppressCondition?: SuppressConditionPatch;
}

export interface ChangeThresholdConditionPatch {
  /** change percentage, value range : [0, +∞) */
  changePercentage?: number;
  /** shift point, value range : [1, +∞) */
  shiftPoint?: number;
  /**
   * if the withinRange = true, detected data is abnormal when the value falls in the range, in this case anomalyDetectorDirection must be Both
   * if the withinRange = false, detected data is abnormal when the value falls out of the range
   */
  withinRange?: boolean;
  /** detection direction */
  anomalyDetectorDirection?: "Both" | "Down" | "Up";
  suppressCondition?: SuppressConditionPatch;
}

export interface DetectionSeriesQuery {
  /** This is inclusive. The maximum number of data points (series number * time range) is 10000. */
  startTime: Date | string;
  /** This is exclusive. The maximum number of data points (series number * time range) is 10000. */
  endTime: Date | string;
  /** The series to be queried. The identity must be able to define one single time series instead of a group of time series. The maximum number of series is 100. */
  series: Array<SeriesIdentity>;
}

export interface DetectionAnomalyResultQuery {
  /** start time */
  startTime: Date | string;
  /** end time */
  endTime: Date | string;
  filter?: DetectionAnomalyFilterCondition;
}

export interface DetectionAnomalyFilterCondition {
  /** dimension filter */
  dimensionFilter?: Array<DimensionGroupIdentity>;
  /** Represents Conditions to filter severity */
  severityFilter?: SeverityFilterCondition;
}

export interface SeverityFilterCondition {
  /** min severity */
  min: "Low" | "Medium" | "High";
  /** max severity */
  max: "Low" | "Medium" | "High";
}

export interface AnomalyDimensionQuery {
  /** start time */
  startTime: Date | string;
  /** end time */
  endTime: Date | string;
  /** dimension to query */
  dimensionName: string;
  dimensionFilter?: DimensionGroupIdentity;
}

export interface DetectionIncidentResultQuery {
  /** start time */
  startTime: Date | string;
  /** end time */
  endTime: Date | string;
  filter?: DetectionIncidentFilterCondition;
}

export interface DetectionIncidentFilterCondition {
  /** dimension filter */
  dimensionFilter?: Array<DimensionGroupIdentity>;
}

export interface DataSourceCredentialBase {
  /**
   * Unique id of data source credential
   *
   * Value may contain a UUID
   */
  dataSourceCredentialId?: string;
  /** Name of data source credential */
  dataSourceCredentialName: string;
  /** Description of data source credential */
  dataSourceCredentialDescription?: string;
  dataSourceCredentialType:
    | "AzureSQLConnectionString"
    | "DataLakeGen2SharedKey"
    | "ServicePrincipal"
    | "ServicePrincipalInKV";
}

export interface DataSourceCredentialPatchBase {
  /** Name of data source credential */
  dataSourceCredentialName?: string;
  /** Description of data source credential */
  dataSourceCredentialDescription?: string;
  dataSourceCredentialType:
    | "AzureSQLConnectionString"
    | "DataLakeGen2SharedKey"
    | "ServicePrincipal"
    | "ServicePrincipalInKV";
}

export interface DataFeedDetailBase {
  /**
   * data feed unique id
   *
   * Value may contain a UUID
   */
  dataFeedId?: string;
  /** data feed name */
  dataFeedName: string;
  /** data feed description */
  dataFeedDescription?: string;
  /** granularity of the time series */
  granularityName:
    | "Yearly"
    | "Monthly"
    | "Weekly"
    | "Daily"
    | "Hourly"
    | "Minutely"
    | "Custom";
  /** if granularity is custom,it is required. */
  granularityAmount?: number;
  /** measure list */
  metrics: Array<Metric>;
  /** dimension list */
  dimension?: Array<Dimension>;
  /** user-defined timestamp column. if timestampColumn is null, start time of every time slice will be used as default value. */
  timestampColumn?: string;
  /** ingestion start time */
  dataStartFrom: Date | string;
  /** the time that the beginning of data ingestion task will delay for every data slice according to this offset. */
  startOffsetInSeconds?: number;
  /** the max concurrency of data ingestion queries against user data source. 0 means no limitation. */
  maxConcurrency?: number;
  /** the min retry interval for failed data ingestion tasks. */
  minRetryIntervalInSeconds?: number;
  /** stop retry data ingestion after the data slice first schedule time in seconds. */
  stopRetryAfterInSeconds?: number;
  /** mark if the data feed need rollup */
  needRollup?: "NoRollup" | "NeedRollup" | "AlreadyRollup";
  /** roll up method */
  rollUpMethod?: "None" | "Sum" | "Max" | "Min" | "Avg" | "Count";
  /** roll up columns */
  rollUpColumns?: Array<string>;
  /** the identification value for the row of calculated all-up value. */
  allUpIdentification?: string;
  /** the type of fill missing point for anomaly detection */
  fillMissingPointType?:
    | "SmartFilling"
    | "PreviousValue"
    | "CustomValue"
    | "NoFilling";
  /** the value of fill missing point for anomaly detection */
  fillMissingPointValue?: number;
  /** data feed access mode, default is Private */
  viewMode?: "Private" | "Public";
  /** data feed administrator */
  admins?: Array<string>;
  /** data feed viewer */
  viewers?: Array<string>;
  /** the query user is one of data feed administrator or not */
  isAdmin?: boolean;
  /** data feed creator */
  creator?: string;
  /** data feed status */
  status?: "Active" | "Paused";
  /** data feed created time */
  createdTime?: Date | string;
  /** action link for alert */
  actionLinkTemplate?: string;
  /** authentication type for corresponding data source */
  authenticationType?:
    | "Basic"
    | "ManagedIdentity"
    | "AzureSQLConnectionString"
    | "DataLakeGen2SharedKey"
    | "ServicePrincipal"
    | "ServicePrincipalInKV";
  /** The credential entity id */
  credentialId?: string;
  dataSourceType:
    | "AzureApplicationInsights"
    | "AzureBlob"
    | "AzureCosmosDB"
    | "AzureDataExplorer"
    | "AzureDataLakeStorageGen2"
    | "AzureEventHubs"
    | "AzureLogAnalytics"
    | "AzureTable"
    | "InfluxDB"
    | "MySql"
    | "PostgreSql"
    | "SqlServer"
    | "MongoDB";
}

export interface Metric {
  /**
   * metric id
   *
   * Value may contain a UUID
   */
  metricId?: string;
  /** metric name */
  metricName: string;
  /** metric display name */
  metricDisplayName?: string;
  /** metric description */
  metricDescription?: string;
}

export interface Dimension {
  /** dimension name */
  dimensionName: string;
  /** dimension display name */
  dimensionDisplayName?: string;
}

export interface DataFeedDetailPatchBase {
  /** data feed name */
  dataFeedName?: string;
  /** data feed description */
  dataFeedDescription?: string;
  /** user-defined timestamp column. if timestampColumn is null, start time of every time slice will be used as default value. */
  timestampColumn?: string;
  /** ingestion start time */
  dataStartFrom?: Date | string;
  /** the time that the beginning of data ingestion task will delay for every data slice according to this offset. */
  startOffsetInSeconds?: number;
  /** the max concurrency of data ingestion queries against user data source. 0 means no limitation. */
  maxConcurrency?: number;
  /** the min retry interval for failed data ingestion tasks. */
  minRetryIntervalInSeconds?: number;
  /** stop retry data ingestion after the data slice first schedule time in seconds. */
  stopRetryAfterInSeconds?: number;
  /** mark if the data feed need rollup */
  needRollup?: "NoRollup" | "NeedRollup" | "AlreadyRollup";
  /** roll up method */
  rollUpMethod?: "None" | "Sum" | "Max" | "Min" | "Avg" | "Count";
  /** roll up columns */
  rollUpColumns?: Array<string>;
  /** the identification value for the row of calculated all-up value. */
  allUpIdentification?: string;
  /** the type of fill missing point for anomaly detection */
  fillMissingPointType?:
    | "SmartFilling"
    | "PreviousValue"
    | "CustomValue"
    | "NoFilling";
  /** the value of fill missing point for anomaly detection */
  fillMissingPointValue?: number;
  /** data feed access mode, default is Private */
  viewMode?: "Private" | "Public";
  /** data feed administrator */
  admins?: Array<string>;
  /** data feed viewer */
  viewers?: Array<string>;
  /** data feed status */
  status?: "Active" | "Paused";
  /** action link for alert */
  actionLinkTemplate?: string;
  /** authentication type for corresponding data source */
  authenticationType?:
    | "Basic"
    | "ManagedIdentity"
    | "AzureSQLConnectionString"
    | "DataLakeGen2SharedKey"
    | "ServicePrincipal"
    | "ServicePrincipalInKV";
  /** The credential entity id */
  credentialId?: string;
  dataSourceType:
    | "AzureApplicationInsights"
    | "AzureBlob"
    | "AzureCosmosDB"
    | "AzureDataExplorer"
    | "AzureDataLakeStorageGen2"
    | "AzureEventHubs"
    | "AzureLogAnalytics"
    | "AzureTable"
    | "InfluxDB"
    | "MySql"
    | "PostgreSql"
    | "SqlServer"
    | "MongoDB";
}

export interface MetricFeedbackBase {
  /**
   * feedback unique id
   *
   * Value may contain a UUID
   */
  feedbackId?: string;
  /** feedback created time */
  createdTime?: Date | string;
  /** user who gives this feedback */
  userPrincipal?: string;
  /**
   * metric unique id
   *
   * Value may contain a UUID
   */
  metricId: string;
  dimensionFilter: FeedbackDimensionFilter;
  feedbackType: "Anomaly" | "ChangePoint" | "Comment" | "Period";
}

export interface FeedbackDimensionFilter {
  /** metric dimension filter */
  dimension: Record<string, string>;
}

export interface MetricFeedbackFilter {
  /**
   * filter feedbacks by metric id
   *
   * Value may contain a UUID
   */
  metricId: string;
  dimensionFilter?: FeedbackDimensionFilter;
  /** filter feedbacks by type */
  feedbackType?: "Anomaly" | "ChangePoint" | "Period" | "Comment";
  /** start time filter under chosen time mode */
  startTime?: Date | string;
  /** end time filter under chosen time mode */
  endTime?: Date | string;
  /** time mode to filter feedback */
  timeMode?: "MetricTimestamp" | "FeedbackCreatedTime";
}

export interface HookInfoBase {
  /**
   * Hook unique id
   *
   * Value may contain a UUID
   */
  hookId?: string;
  /** hook unique name */
  hookName: string;
  /** hook description */
  description?: string;
  /** hook external link */
  externalLink?: string;
  /** hook administrators */
  admins?: Array<string>;
  hookType: "Email" | "Webhook";
}

export interface HookInfoPatchBase {
  /** hook unique name */
  hookName?: string;
  /** hook description */
  description?: string;
  /** hook external link */
  externalLink?: string;
  /** hook administrators */
  admins?: Array<string>;
  hookType: "Email" | "Webhook";
}

export interface IngestionStatusQueryOptions {
  /** the start point of time range to query data ingestion status. */
  startTime: Date | string;
  /** the end point of time range to query data ingestion status. */
  endTime: Date | string;
}

export interface IngestionProgressResetOptions {
  /** the start point of time range to reset data ingestion status. */
  startTime: Date | string;
  /** the end point of time range to reset data ingestion status. */
  endTime: Date | string;
}

export interface MetricDataQueryOptions {
  /** start time of query a time series data, and format should be yyyy-MM-ddThh:mm:ssZ. The maximum number of data points (series number * time range) is 10000. */
  startTime: Date | string;
  /** start time of query a time series data, and format should be yyyy-MM-ddThh:mm:ssZ. The maximum number of data points (series number * time range) is 10000. */
  endTime: Date | string;
  /** query specific series. The maximum number of series is 100. */
  series: Array<Record<string, string>>;
}

export interface MetricSeriesQueryOptions {
  /** query series ingested after this time, the format should be yyyy-MM-ddTHH:mm:ssZ */
  activeSince: Date | string;
  /** filter specific dimension name and values */
  dimensionFilter?: Record<string, Array<string>>;
}

export interface MetricDimensionQueryOptions {
  /** dimension name */
  dimensionName: string;
  /** dimension value to be filtered */
  dimensionValueFilter?: string;
}

export interface EnrichmentStatusQueryOption {
  /** the start point of time range to query anomaly detection status. */
  startTime: Date | string;
  /** the end point of time range to query anomaly detection status. */
  endTime: Date | string;
}

export interface AzureSQLConnectionStringParam {
  /** The connection string to access the Azure SQL. */
  connectionString?: string;
}

export interface AzureSQLConnectionStringCredential
  extends DataSourceCredentialBase {
  parameters: AzureSQLConnectionStringParam;
  dataSourceCredentialType: "AzureSQLConnectionString";
}

export interface DataLakeGen2SharedKeyParam {
  /** The account key to access the Azure Data Lake Storage Gen2. */
  accountKey?: string;
}

export interface DataLakeGen2SharedKeyCredential
  extends DataSourceCredentialBase {
  parameters: DataLakeGen2SharedKeyParam;
  dataSourceCredentialType: "DataLakeGen2SharedKey";
}

export interface ServicePrincipalParam {
  /** The client id of the service principal. */
  clientId: string;
  /** The client secret of the service principal. */
  clientSecret?: string;
  /** The tenant id of the service principal. */
  tenantId: string;
}

export interface ServicePrincipalCredential extends DataSourceCredentialBase {
  parameters: ServicePrincipalParam;
  dataSourceCredentialType: "ServicePrincipal";
}

export interface ServicePrincipalInKVParam {
  /** The Key Vault endpoint that storing the service principal. */
  keyVaultEndpoint: string;
  /** The Client Id to access the Key Vault. */
  keyVaultClientId: string;
  /** The Client Secret to access the Key Vault. */
  keyVaultClientSecret?: string;
  /** The secret name of the service principal's client Id in the Key Vault. */
  servicePrincipalIdNameInKV: string;
  /** The secret name of the service principal's client secret in the Key Vault. */
  servicePrincipalSecretNameInKV: string;
  /** The tenant id of your service principal. */
  tenantId: string;
}

export interface ServicePrincipalInKVCredential
  extends DataSourceCredentialBase {
  parameters: ServicePrincipalInKVParam;
  dataSourceCredentialType: "ServicePrincipalInKV";
}

export interface AzureSQLConnectionStringParamPatch {
  /** The connection string to access the Azure SQL. */
  connectionString?: string;
}

export interface AzureSQLConnectionStringCredentialPatch
  extends DataSourceCredentialPatchBase {
  parameters?: AzureSQLConnectionStringParamPatch;
  dataSourceCredentialType: "AzureSQLConnectionString";
}

export interface DataLakeGen2SharedKeyParamPatch {
  /** The account key to access the Azure Data Lake Storage Gen2. */
  accountKey?: string;
}

export interface DataLakeGen2SharedKeyCredentialPatch
  extends DataSourceCredentialPatchBase {
  parameters?: DataLakeGen2SharedKeyParamPatch;
  dataSourceCredentialType: "DataLakeGen2SharedKey";
}

export interface ServicePrincipalParamPatch {
  /** The client id of the service principal. */
  clientId?: string;
  /** The client secret of the service principal. */
  clientSecret?: string;
  /** The tenant id of the service principal. */
  tenantId?: string;
}

export interface ServicePrincipalCredentialPatch
  extends DataSourceCredentialPatchBase {
  parameters?: ServicePrincipalParamPatch;
  dataSourceCredentialType: "ServicePrincipal";
}

export interface ServicePrincipalInKVParamPatch {
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

export interface ServicePrincipalInKVCredentialPatch
  extends DataSourceCredentialPatchBase {
  parameters?: ServicePrincipalInKVParamPatch;
  dataSourceCredentialType: "ServicePrincipalInKV";
}

export interface AzureApplicationInsightsParameter {
  /** The Azure cloud that this Azure Application Insights in */
  azureCloud?: string;
  /** The application id of this Azure Application Insights */
  applicationId?: string;
  /** The API Key that can access this Azure Application Insights */
  apiKey?: string;
  /** The statement to query this Azure Application Insights */
  query: string;
}

export interface AzureApplicationInsightsDataFeed extends DataFeedDetailBase {
  dataSourceParameter: AzureApplicationInsightsParameter;
  dataSourceType: "AzureApplicationInsights";
}

export interface AzureBlobParameter {
  /** The connection string of this Azure Blob */
  connectionString?: string;
  /** The container name in this Azure Blob */
  container: string;
  /** The path template in this container */
  blobTemplate: string;
}

export interface AzureBlobDataFeed extends DataFeedDetailBase {
  dataSourceParameter: AzureBlobParameter;
  dataSourceType: "AzureBlob";
}

export interface AzureCosmosDBParameter {
  /** The connection string of this Azure CosmosDB */
  connectionString?: string;
  /** The statement to query this collection */
  sqlQuery: string;
  /** A database name in this Azure CosmosDB */
  database: string;
  /** A collection id in this database */
  collectionId: string;
}

export interface AzureCosmosDBDataFeed extends DataFeedDetailBase {
  dataSourceParameter: AzureCosmosDBParameter;
  dataSourceType: "AzureCosmosDB";
}

export interface SqlSourceParameter {
  /** The connection string of this database */
  connectionString?: string;
  /** The script to query this database */
  query: string;
}

export interface AzureDataExplorerDataFeed extends DataFeedDetailBase {
  dataSourceParameter: SqlSourceParameter;
  dataSourceType: "AzureDataExplorer";
}

export interface AzureDataLakeStorageGen2Parameter {
  /** The account name of this Azure Data Lake */
  accountName?: string;
  /** The account key that can access this Azure Data Lake */
  accountKey?: string;
  /** The file system (container) name in this Azure Data Lake */
  fileSystemName: string;
  /** The directory template under this file system */
  directoryTemplate: string;
  /** The file template */
  fileTemplate: string;
}

export interface AzureDataLakeStorageGen2DataFeed extends DataFeedDetailBase {
  dataSourceParameter: AzureDataLakeStorageGen2Parameter;
  dataSourceType: "AzureDataLakeStorageGen2";
}

export interface AzureEventHubsParameter {
  /** The connection string of this Azure Event Hubs */
  connectionString?: string;
  /** The consumer group to be used in this data feed */
  consumerGroup: string;
}

export interface AzureEventHubsDataFeed extends DataFeedDetailBase {
  dataSourceParameter: AzureEventHubsParameter;
  dataSourceType: "AzureEventHubs";
}

export interface AzureLogAnalyticsParameter {
  /** The tenant id of service principal that have access to this Log Analytics */
  tenantId?: string;
  /** The client id of service principal that have access to this Log Analytics */
  clientId?: string;
  /** The client secret of service principal that have access to this Log Analytics */
  clientSecret?: string;
  /** The workspace id of this Log Analytics */
  workspaceId: string;
  /** The KQL (Kusto Query Language) query to fetch data from this Log Analytics */
  query: string;
}

export interface AzureLogAnalyticsDataFeed extends DataFeedDetailBase {
  dataSourceParameter: AzureLogAnalyticsParameter;
  dataSourceType: "AzureLogAnalytics";
}

export interface AzureTableParameter {
  /** The connection string of this Azure Table */
  connectionString?: string;
  /** A table name in this Azure Table */
  table: string;
  /** The statement to query this table. Please find syntax and details from Azure Table documents. */
  query: string;
}

export interface AzureTableDataFeed extends DataFeedDetailBase {
  dataSourceParameter: AzureTableParameter;
  dataSourceType: "AzureTable";
}

export interface InfluxDBParameter {
  /** The connection string of this InfluxDB */
  connectionString?: string;
  /** A database name */
  database?: string;
  /** The user name of the account that can access this database */
  userName?: string;
  /** The password of the account that can access this database */
  password?: string;
  /** The script to query this database */
  query: string;
}

export interface InfluxDBDataFeed extends DataFeedDetailBase {
  dataSourceParameter: InfluxDBParameter;
  dataSourceType: "InfluxDB";
}

export interface MySqlDataFeed extends DataFeedDetailBase {
  dataSourceParameter: SqlSourceParameter;
  dataSourceType: "MySql";
}

export interface PostgreSqlDataFeed extends DataFeedDetailBase {
  dataSourceParameter: SqlSourceParameter;
  dataSourceType: "PostgreSql";
}

export interface SQLServerDataFeed extends DataFeedDetailBase {
  dataSourceParameter: SqlSourceParameter;
  dataSourceType: "SqlServer";
}

export interface MongoDBParameter {
  /** The connection string of this MongoDB */
  connectionString?: string;
  /** A database name in this MongoDB */
  database?: string;
  /** The script to query this database */
  command: string;
}

export interface MongoDBDataFeed extends DataFeedDetailBase {
  dataSourceParameter: MongoDBParameter;
  dataSourceType: "MongoDB";
}

export interface AzureApplicationInsightsParameterPatch {
  /** The Azure cloud that this Azure Application Insights in */
  azureCloud?: string;
  /** The application id of this Azure Application Insights */
  applicationId?: string;
  /** The API Key that can access this Azure Application Insights */
  apiKey?: string;
  /** The statement to query this Azure Application Insights */
  query?: string;
}

export interface AzureApplicationInsightsDataFeedPatch
  extends DataFeedDetailPatchBase {
  dataSourceParameter?: AzureApplicationInsightsParameterPatch;
  dataSourceType: "AzureApplicationInsights";
}

export interface AzureBlobParameterPatch {
  /** The connection string of this Azure Blob */
  connectionString?: string;
  /** The container name in this Azure Blob */
  container?: string;
  /** The path template in this container */
  blobTemplate?: string;
}

export interface AzureBlobDataFeedPatch extends DataFeedDetailPatchBase {
  dataSourceParameter?: AzureBlobParameterPatch;
  dataSourceType: "AzureBlob";
}

export interface AzureCosmosDBParameterPatch {
  /** The connection string of this Azure CosmosDB */
  connectionString?: string;
  /** The statement to query this collection */
  sqlQuery?: string;
  /** A database name in this Azure CosmosDB */
  database?: string;
  /** A collection id in this database */
  collectionId?: string;
}

export interface AzureCosmosDBDataFeedPatch extends DataFeedDetailPatchBase {
  dataSourceParameter?: AzureCosmosDBParameterPatch;
  dataSourceType: "AzureCosmosDB";
}

export interface SQLSourceParameterPatch {
  /** The connection string of this database */
  connectionString?: string;
  /** The script to query this database */
  query?: string;
}

export interface AzureDataExplorerDataFeedPatch
  extends DataFeedDetailPatchBase {
  dataSourceParameter?: SQLSourceParameterPatch;
  dataSourceType: "AzureDataExplorer";
}

export interface AzureDataLakeStorageGen2ParameterPatch {
  /** The account name of this Azure Data Lake */
  accountName?: string;
  /** The account key that can access this Azure Data Lake */
  accountKey?: string;
  /** The file system (container) name in this Azure Data Lake */
  fileSystemName?: string;
  /** The directory template under this file system */
  directoryTemplate?: string;
  /** The file template */
  fileTemplate?: string;
}

export interface AzureDataLakeStorageGen2DataFeedPatch
  extends DataFeedDetailPatchBase {
  dataSourceParameter?: AzureDataLakeStorageGen2ParameterPatch;
  dataSourceType: "AzureDataLakeStorageGen2";
}

export interface AzureEventHubsParameterPatch {
  /** The connection string of this Azure Event Hubs */
  connectionString?: string;
  /** The consumer group to be used in this data feed */
  consumerGroup?: string;
}

export interface AzureEventHubsDataFeedPatch extends DataFeedDetailPatchBase {
  dataSourceParameter?: AzureEventHubsParameterPatch;
  dataSourceType: "AzureEventHubs";
}

export interface AzureLogAnalyticsParameterPatch {
  /** The tenant id of service principal that have access to this Log Analytics */
  tenantId?: string;
  /** The client id of service principal that have access to this Log Analytics */
  clientId?: string;
  /** The client secret of service principal that have access to this Log Analytics */
  clientSecret?: string;
  /** The workspace id of this Log Analytics */
  workspaceId?: string;
  /** The KQL (Kusto Query Language) query to fetch data from this Log Analytics */
  query?: string;
}

export interface AzureLogAnalyticsDataFeedPatch
  extends DataFeedDetailPatchBase {
  dataSourceParameter?: AzureLogAnalyticsParameterPatch;
  dataSourceType: "AzureLogAnalytics";
}

export interface AzureTableParameterPatch {
  /** The connection string of this Azure Table */
  connectionString?: string;
  /** A table name in this Azure Table */
  table?: string;
  /** The statement to query this table. Please find syntax and details from Azure Table documents. */
  query?: string;
}

export interface AzureTableDataFeedPatch extends DataFeedDetailPatchBase {
  dataSourceParameter?: AzureTableParameterPatch;
  dataSourceType: "AzureTable";
}

export interface InfluxDBParameterPatch {
  /** The connection string of this InfluxDB */
  connectionString?: string;
  /** A database name */
  database?: string;
  /** The user name of the account that can access this database */
  userName?: string;
  /** The password of the account that can access this database */
  password?: string;
  /** The script to query this database */
  query?: string;
}

export interface InfluxDBDataFeedPatch extends DataFeedDetailPatchBase {
  dataSourceParameter?: InfluxDBParameterPatch;
  dataSourceType: "InfluxDB";
}

export interface MySqlDataFeedPatch extends DataFeedDetailPatchBase {
  dataSourceParameter?: SQLSourceParameterPatch;
  dataSourceType: "MySql";
}

export interface PostgreSqlDataFeedPatch extends DataFeedDetailPatchBase {
  dataSourceParameter?: SQLSourceParameterPatch;
  dataSourceType: "PostgreSql";
}

export interface SQLServerDataFeedPatch extends DataFeedDetailPatchBase {
  dataSourceParameter?: SQLSourceParameterPatch;
  dataSourceType: "SqlServer";
}

export interface MongoDBParameterPatch {
  /** The connection string of this MongoDB */
  connectionString?: string;
  /** A database name in this MongoDB */
  database?: string;
  /** The script to query this database */
  command?: string;
}

export interface MongoDBDataFeedPatch extends DataFeedDetailPatchBase {
  dataSourceParameter?: MongoDBParameterPatch;
  dataSourceType: "MongoDB";
}

export interface AnomalyFeedbackValue {
  anomalyValue: "AutoDetect" | "Anomaly" | "NotAnomaly";
}

export interface AnomalyFeedback extends MetricFeedbackBase {
  /** the start timestamp of feedback time range */
  startTime: Date | string;
  /** the end timestamp of feedback time range, when equals to startTime means only one timestamp */
  endTime: Date | string;
  value: AnomalyFeedbackValue;
  /**
   * the corresponding anomaly detection configuration of this feedback
   *
   * Value may contain a UUID
   */
  anomalyDetectionConfigurationId?: string;
  anomalyDetectionConfigurationSnapshot?: AnomalyDetectionConfiguration;
  feedbackType: "Anomaly";
}

export interface ChangePointFeedbackValue {
  changePointValue: "AutoDetect" | "ChangePoint" | "NotChangePoint";
}

export interface ChangePointFeedback extends MetricFeedbackBase {
  /** the start timestamp of feedback time range */
  startTime: Date | string;
  /** the end timestamp of feedback time range, when equals to startTime means only one timestamp */
  endTime: Date | string;
  value: ChangePointFeedbackValue;
  feedbackType: "ChangePoint";
}

export interface CommentFeedbackValue {
  /** the comment string */
  commentValue: string;
}

export interface CommentFeedback extends MetricFeedbackBase {
  /** the start timestamp of feedback time range */
  startTime?: Date | string;
  /** the end timestamp of feedback time range, when equals to startTime means only one timestamp */
  endTime?: Date | string;
  value: CommentFeedbackValue;
  feedbackType: "Comment";
}

export interface PeriodFeedbackValue {
  /** the type of setting period */
  periodType: "AutoDetect" | "AssignValue";
  /** the number of intervals a period contains, when no period set to 0 */
  periodValue: number;
}

export interface PeriodFeedback extends MetricFeedbackBase {
  value: PeriodFeedbackValue;
  feedbackType: "Period";
}

export interface EmailHookParameter {
  /** Email TO: list. */
  toList: Array<string>;
}

export interface EmailHookInfo extends HookInfoBase {
  /** Parameters for Email Hook */
  hookParameter: EmailHookParameter;
  hookType: "Email";
}

export interface WebhookHookParameter {
  /** API address, will be called when alert is triggered, only support POST method via SSL */
  endpoint: string;
  /** (Deprecated) The username, if using basic authentication */
  username?: string;
  /** (Deprecated) The password, if using basic authentication */
  password?: string;
  /** custom headers in api call */
  headers?: Record<string, string>;
  /** The certificate key/URL, if using client certificate, please read documents for more informations. */
  certificateKey?: string;
  /** The certificate password, if using client certificate, please read documents for more informations. */
  certificatePassword?: string;
}

export interface WebhookHookInfo extends HookInfoBase {
  hookParameter: WebhookHookParameter;
  hookType: "Webhook";
}

export interface EmailHookParameterPatch {
  /** Email TO: list. */
  toList?: Array<string>;
}

export interface EmailHookInfoPatch extends HookInfoPatchBase {
  hookParameter?: EmailHookParameterPatch;
  hookType: "Email";
}

export interface WebhookHookParameterPatch {
  /** API address, will be called when alert is triggered, only support POST method via SSL */
  endpoint?: string;
  /** (Deprecated) The username, if using basic authentication */
  username?: string;
  /** (Deprecated) The password, if using basic authentication */
  password?: string;
  /** custom headers in api call */
  headers?: Record<string, string>;
  /** The certificate key, if using client certificate */
  certificateKey?: string;
  /** The certificate password, if using client certificate */
  certificatePassword?: string;
}

export interface WebhookHookInfoPatch extends HookInfoPatchBase {
  hookParameter?: WebhookHookParameterPatch;
  hookType: "Webhook";
}

export type DataSourceCredential =
  | AzureSQLConnectionStringCredential
  | DataLakeGen2SharedKeyCredential
  | ServicePrincipalCredential
  | ServicePrincipalInKVCredential;
export type DataSourceCredentialPatch =
  | AzureSQLConnectionStringCredentialPatch
  | DataLakeGen2SharedKeyCredentialPatch
  | ServicePrincipalCredentialPatch
  | ServicePrincipalInKVCredentialPatch;
export type DataFeedDetail =
  | AzureApplicationInsightsDataFeed
  | AzureBlobDataFeed
  | AzureCosmosDBDataFeed
  | AzureDataExplorerDataFeed
  | AzureDataLakeStorageGen2DataFeed
  | AzureEventHubsDataFeed
  | AzureLogAnalyticsDataFeed
  | AzureTableDataFeed
  | InfluxDBDataFeed
  | MySqlDataFeed
  | PostgreSqlDataFeed
  | SQLServerDataFeed
  | MongoDBDataFeed;
export type DataFeedDetailPatch =
  | AzureApplicationInsightsDataFeedPatch
  | AzureBlobDataFeedPatch
  | AzureCosmosDBDataFeedPatch
  | AzureDataExplorerDataFeedPatch
  | AzureDataLakeStorageGen2DataFeedPatch
  | AzureEventHubsDataFeedPatch
  | AzureLogAnalyticsDataFeedPatch
  | AzureTableDataFeedPatch
  | InfluxDBDataFeedPatch
  | MySqlDataFeedPatch
  | PostgreSqlDataFeedPatch
  | SQLServerDataFeedPatch
  | MongoDBDataFeedPatch;
export type MetricFeedback =
  | AnomalyFeedback
  | ChangePointFeedback
  | CommentFeedback
  | PeriodFeedback;
export type HookInfo = EmailHookInfo | WebhookHookInfo;
export type HookInfoPatch = EmailHookInfoPatch | WebhookHookInfoPatch;

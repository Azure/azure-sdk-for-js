// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface UsageStatsOutput {
  /** The timestamp of the stats */
  timestamp?: string;
  /** The active series count */
  activeSeriesCount?: number;
  /** All series count under non deleted data feed */
  allSeriesCount?: number;
  /** The metrics count under non deleted data feed */
  metricsCount?: number;
  /** The count of non deleted data feed */
  dataFeedCount?: number;
}

export interface ErrorCodeOutput {
  message?: string;
  code?: string;
}

export interface AnomalyAlertingConfigurationOutput {
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
  metricAlertingConfigurations: Array<MetricAlertingConfigurationOutput>;
}

export interface MetricAlertingConfigurationOutput {
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
  dimensionAnomalyScope?: DimensionGroupIdentityOutput;
  topNAnomalyScope?: TopNGroupScopeOutput;
  severityFilter?: SeverityConditionOutput;
  snoozeFilter?: AlertSnoozeConditionOutput;
  valueFilter?: ValueConditionOutput;
}

export interface DimensionGroupIdentityOutput {
  /** dimension specified for series group */
  dimension: Record<string, string>;
}

export interface TopNGroupScopeOutput {
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

export interface SeverityConditionOutput {
  /** min alert severity */
  minAlertSeverity: "Low" | "Medium" | "High";
  /** max alert severity */
  maxAlertSeverity: "Low" | "Medium" | "High";
}

export interface AlertSnoozeConditionOutput {
  /** snooze point count, value range : [0, +∞) */
  autoSnooze: number;
  /** snooze scope */
  snoozeScope: "Metric" | "Series";
  /** only snooze for successive anomalies */
  onlyForSuccessive: boolean;
}

export interface ValueConditionOutput {
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

export interface AlertResultListOutput {
  "@nextLink"?: string;
  value: Array<AlertResultOutput>;
}

export interface AlertResultOutput {
  /** alert id */
  alertId?: string;
  /** anomaly time */
  timestamp?: string;
  /** created time */
  createdTime?: string;
  /** modified time */
  modifiedTime?: string;
}

export interface AnomalyResultListOutput {
  "@nextLink"?: string;
  value: Array<AnomalyResultOutput>;
}

export interface AnomalyResultOutput {
  /**
   * data feed unique id
   *
   * only return for alerting anomaly result
   *
   * Value may contain a UUID
   */
  dataFeedId?: string;
  /**
   * metric unique id
   *
   * only return for alerting anomaly result
   *
   * Value may contain a UUID
   */
  metricId?: string;
  /**
   * anomaly detection configuration unique id
   *
   * only return for alerting anomaly result
   *
   * Value may contain a UUID
   */
  anomalyDetectionConfigurationId?: string;
  /** anomaly time */
  timestamp: string;
  /**
   * created time
   *
   * only return for alerting result
   */
  createdTime?: string;
  /**
   * modified time
   *
   * only return for alerting result
   */
  modifiedTime?: string;
  /** dimension specified for series */
  dimension: Record<string, string>;
  property: AnomalyPropertyOutput;
}

export interface AnomalyPropertyOutput {
  /** anomaly severity */
  anomalySeverity: "Low" | "Medium" | "High";
  /**
   * anomaly status
   *
   * only return for alerting anomaly result
   */
  anomalyStatus?: "Active" | "Resolved";
  /** value of the anomaly */
  value?: number;
  /** expected value of the anomaly given by smart detector */
  expectedValue?: number;
}

export interface IncidentResultListOutput {
  "@nextLink"?: string;
  value: Array<IncidentResultOutput>;
}

export interface IncidentResultOutput {
  /**
   * data feed unique id
   *
   * only return for alerting anomaly result
   *
   * Value may contain a UUID
   */
  dataFeedId?: string;
  /**
   * metric unique id
   *
   * only return for alerting incident result
   *
   * Value may contain a UUID
   */
  metricId?: string;
  /**
   * anomaly detection configuration unique id
   *
   * only return for alerting incident result
   *
   * Value may contain a UUID
   */
  anomalyDetectionConfigurationId?: string;
  /** incident id */
  incidentId: string;
  /** incident start time */
  startTime: string;
  /** incident last time */
  lastTime: string;
  rootNode: SeriesIdentityOutput;
  property: IncidentPropertyOutput;
}

export interface SeriesIdentityOutput {
  /** dimension specified for series */
  dimension: Record<string, string>;
}

export interface IncidentPropertyOutput {
  /** max severity of latest anomalies in the incident */
  maxSeverity: "Low" | "Medium" | "High";
  /**
   * incident status
   *
   * only return for alerting incident result
   */
  incidentStatus?: "Active" | "Resolved";
  /** value of the root node */
  valueOfRootNode?: number;
  /** expected value of the root node given by smart detector */
  expectedValueOfRootNode?: number;
}

export interface AnomalyDetectionConfigurationOutput {
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
  wholeMetricConfiguration: WholeMetricConfigurationOutput;
  /** detection configuration for series group */
  dimensionGroupOverrideConfigurations?: Array<
    DimensionGroupConfigurationOutput
  >;
  /** detection configuration for specific series */
  seriesOverrideConfigurations?: Array<SeriesConfigurationOutput>;
}

export interface WholeMetricConfigurationOutput {
  /**
   * condition operator
   *
   * should be specified when combining multiple detection conditions
   */
  conditionOperator?: "AND" | "OR";
  smartDetectionCondition?: SmartDetectionConditionOutput;
  hardThresholdCondition?: HardThresholdConditionOutput;
  changeThresholdCondition?: ChangeThresholdConditionOutput;
}

export interface SmartDetectionConditionOutput {
  /** sensitivity, value range : (0, 100] */
  sensitivity: number;
  /** detection direction */
  anomalyDetectorDirection: "Both" | "Down" | "Up";
  suppressCondition: SuppressConditionOutput;
}

export interface SuppressConditionOutput {
  /** min point number, value range : [1, +∞) */
  minNumber: number;
  /** min point ratio, value range : (0, 100] */
  minRatio: number;
}

export interface HardThresholdConditionOutput {
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
  suppressCondition: SuppressConditionOutput;
}

export interface ChangeThresholdConditionOutput {
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
  suppressCondition: SuppressConditionOutput;
}

export interface DimensionGroupConfigurationOutput {
  group: DimensionGroupIdentityOutput;
  /**
   * condition operator
   *
   * should be specified when combining multiple detection conditions
   */
  conditionOperator?: "AND" | "OR";
  smartDetectionCondition?: SmartDetectionConditionOutput;
  hardThresholdCondition?: HardThresholdConditionOutput;
  changeThresholdCondition?: ChangeThresholdConditionOutput;
}

export interface SeriesConfigurationOutput {
  series: SeriesIdentityOutput;
  /**
   * condition operator
   *
   * should be specified when combining multiple detection conditions
   */
  conditionOperator?: "AND" | "OR";
  smartDetectionCondition?: SmartDetectionConditionOutput;
  hardThresholdCondition?: HardThresholdConditionOutput;
  changeThresholdCondition?: ChangeThresholdConditionOutput;
}

export interface AnomalyAlertingConfigurationListOutput {
  value?: Array<AnomalyAlertingConfigurationOutput>;
  "@nextLink"?: string;
}

export interface SeriesResultListOutput {
  value: Array<SeriesResultOutput>;
}

export interface SeriesResultOutput {
  series: SeriesIdentityOutput;
  /** timestamps of the series */
  timestampList: Array<string>;
  /** values of the series */
  valueList: Array<number>;
  /** whether points of the series are anomalies */
  isAnomalyList: Array<boolean>;
  /** period calculated on each point of the series */
  periodList: Array<number>;
  /** expected values of the series given by smart detector */
  expectedValueList: Array<number>;
  /** lower boundary list of the series given by smart detector */
  lowerBoundaryList: Array<number>;
  /** upper boundary list of the series given by smart detector */
  upperBoundaryList: Array<number>;
}

export interface AnomalyDimensionListOutput {
  "@nextLink"?: string;
  value: Array<string>;
}

export interface RootCauseListOutput {
  value: Array<RootCauseOutput>;
}

export interface RootCauseOutput {
  rootCause: DimensionGroupIdentityOutput;
  /** drilling down path from query anomaly to root cause */
  path: Array<string>;
  /** score of the root cause */
  score: number;
  /** description of the root cause */
  description: string;
}

export interface DataSourceCredentialOutputBase {
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

export interface DataSourceCredentialListOutput {
  "@nextLink"?: string;
  value?: Array<DataSourceCredentialOutput>;
}

export interface DataFeedListOutput {
  "@nextLink"?: string;
  value?: Array<DataFeedDetailOutput>;
}

export interface DataFeedDetailOutputBase {
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
  metrics: Array<MetricOutput>;
  /** dimension list */
  dimension?: Array<DimensionOutput>;
  /** user-defined timestamp column. if timestampColumn is null, start time of every time slice will be used as default value. */
  timestampColumn?: string;
  /** ingestion start time */
  dataStartFrom: string;
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
  createdTime?: string;
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

export interface MetricOutput {
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

export interface DimensionOutput {
  /** dimension name */
  dimensionName: string;
  /** dimension display name */
  dimensionDisplayName?: string;
}

export interface MetricFeedbackOutputBase {
  /**
   * feedback unique id
   *
   * Value may contain a UUID
   */
  feedbackId?: string;
  /** feedback created time */
  createdTime?: string;
  /** user who gives this feedback */
  userPrincipal?: string;
  /**
   * metric unique id
   *
   * Value may contain a UUID
   */
  metricId: string;
  dimensionFilter: FeedbackDimensionFilterOutput;
  feedbackType: "Anomaly" | "ChangePoint" | "Comment" | "Period";
}

export interface FeedbackDimensionFilterOutput {
  /** metric dimension filter */
  dimension: Record<string, string>;
}

export interface MetricFeedbackListOutput {
  "@nextLink"?: string;
  value?: Array<MetricFeedbackOutput>;
}

export interface HookListOutput {
  "@nextLink"?: string;
  value?: Array<HookInfoOutput>;
}

export interface HookInfoOutputBase {
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

export interface IngestionStatusListOutput {
  "@nextLink"?: string;
  value?: Array<IngestionStatusOutput>;
}

export interface IngestionStatusOutput {
  /** data slice timestamp. */
  timestamp?: string;
  /** latest ingestion task status for this data slice. */
  status?:
    | "NotStarted"
    | "Scheduled"
    | "Running"
    | "Succeeded"
    | "Failed"
    | "NoData"
    | "Error"
    | "Paused";
  /** the trimmed message of last ingestion job. */
  message?: string;
}

export interface DataFeedIngestionProgressOutput {
  /**
   * the timestamp of latest success ingestion job.
   * null indicates not available
   */
  latestSuccessTimestamp?: string;
  /**
   * the timestamp of latest ingestion job with status update.
   * null indicates not available
   */
  latestActiveTimestamp?: string;
}

export interface MetricDataListOutput {
  value?: Array<MetricDataItemOutput>;
}

export interface MetricDataItemOutput {
  id?: MetricSeriesItemOutput;
  /** timestamps of the data related to this time series */
  timestampList?: Array<string>;
  /** values of the data related to this time series */
  valueList?: Array<number>;
}

export interface MetricSeriesItemOutput {
  /**
   * metric unique id
   *
   * Value may contain a UUID
   */
  metricId?: string;
  /** dimension name and value pair */
  dimension?: Record<string, string>;
}

export interface MetricSeriesListOutput {
  "@nextLink"?: string;
  value?: Array<MetricSeriesItemOutput>;
}

export interface MetricDimensionListOutput {
  "@nextLink"?: string;
  value?: Array<string>;
}

export interface AnomalyDetectionConfigurationListOutput {
  value?: Array<AnomalyDetectionConfigurationOutput>;
  "@nextLink"?: string;
}

export interface EnrichmentStatusListOutput {
  "@nextLink"?: string;
  value?: Array<EnrichmentStatusOutput>;
}

export interface EnrichmentStatusOutput {
  /** data slice timestamp. */
  timestamp?: string;
  /** latest enrichment status for this data slice. */
  status?: string;
  /** the trimmed message describes details of the enrichment status. */
  message?: string;
}

export interface AzureSQLConnectionStringParamOutput {
  /** The connection string to access the Azure SQL. */
  connectionString?: string;
}

export interface AzureSQLConnectionStringCredentialOutput
  extends DataSourceCredentialOutputBase {
  parameters: AzureSQLConnectionStringParamOutput;
  dataSourceCredentialType: "AzureSQLConnectionString";
}

export interface DataLakeGen2SharedKeyParamOutput {
  /** The account key to access the Azure Data Lake Storage Gen2. */
  accountKey?: string;
}

export interface DataLakeGen2SharedKeyCredentialOutput
  extends DataSourceCredentialOutputBase {
  parameters: DataLakeGen2SharedKeyParamOutput;
  dataSourceCredentialType: "DataLakeGen2SharedKey";
}

export interface ServicePrincipalParamOutput {
  /** The client id of the service principal. */
  clientId: string;
  /** The client secret of the service principal. */
  clientSecret?: string;
  /** The tenant id of the service principal. */
  tenantId: string;
}

export interface ServicePrincipalCredentialOutput
  extends DataSourceCredentialOutputBase {
  parameters: ServicePrincipalParamOutput;
  dataSourceCredentialType: "ServicePrincipal";
}

export interface ServicePrincipalInKVParamOutput {
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

export interface ServicePrincipalInKVCredentialOutput
  extends DataSourceCredentialOutputBase {
  parameters: ServicePrincipalInKVParamOutput;
  dataSourceCredentialType: "ServicePrincipalInKV";
}

export interface AzureApplicationInsightsParameterOutput {
  /** The Azure cloud that this Azure Application Insights in */
  azureCloud?: string;
  /** The application id of this Azure Application Insights */
  applicationId?: string;
  /** The API Key that can access this Azure Application Insights */
  apiKey?: string;
  /** The statement to query this Azure Application Insights */
  query: string;
}

export interface AzureApplicationInsightsDataFeedOutput
  extends DataFeedDetailOutputBase {
  dataSourceParameter: AzureApplicationInsightsParameterOutput;
  dataSourceType: "AzureApplicationInsights";
}

export interface AzureBlobParameterOutput {
  /** The connection string of this Azure Blob */
  connectionString?: string;
  /** The container name in this Azure Blob */
  container: string;
  /** The path template in this container */
  blobTemplate: string;
}

export interface AzureBlobDataFeedOutput extends DataFeedDetailOutputBase {
  dataSourceParameter: AzureBlobParameterOutput;
  dataSourceType: "AzureBlob";
}

export interface AzureCosmosDBParameterOutput {
  /** The connection string of this Azure CosmosDB */
  connectionString?: string;
  /** The statement to query this collection */
  sqlQuery: string;
  /** A database name in this Azure CosmosDB */
  database: string;
  /** A collection id in this database */
  collectionId: string;
}

export interface AzureCosmosDBDataFeedOutput extends DataFeedDetailOutputBase {
  dataSourceParameter: AzureCosmosDBParameterOutput;
  dataSourceType: "AzureCosmosDB";
}

export interface SqlSourceParameterOutput {
  /** The connection string of this database */
  connectionString?: string;
  /** The script to query this database */
  query: string;
}

export interface AzureDataExplorerDataFeedOutput
  extends DataFeedDetailOutputBase {
  dataSourceParameter: SqlSourceParameterOutput;
  dataSourceType: "AzureDataExplorer";
}

export interface AzureDataLakeStorageGen2ParameterOutput {
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

export interface AzureDataLakeStorageGen2DataFeedOutput
  extends DataFeedDetailOutputBase {
  dataSourceParameter: AzureDataLakeStorageGen2ParameterOutput;
  dataSourceType: "AzureDataLakeStorageGen2";
}

export interface AzureEventHubsParameterOutput {
  /** The connection string of this Azure Event Hubs */
  connectionString?: string;
  /** The consumer group to be used in this data feed */
  consumerGroup: string;
}

export interface AzureEventHubsDataFeedOutput extends DataFeedDetailOutputBase {
  dataSourceParameter: AzureEventHubsParameterOutput;
  dataSourceType: "AzureEventHubs";
}

export interface AzureLogAnalyticsParameterOutput {
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

export interface AzureLogAnalyticsDataFeedOutput
  extends DataFeedDetailOutputBase {
  dataSourceParameter: AzureLogAnalyticsParameterOutput;
  dataSourceType: "AzureLogAnalytics";
}

export interface AzureTableParameterOutput {
  /** The connection string of this Azure Table */
  connectionString?: string;
  /** A table name in this Azure Table */
  table: string;
  /** The statement to query this table. Please find syntax and details from Azure Table documents. */
  query: string;
}

export interface AzureTableDataFeedOutput extends DataFeedDetailOutputBase {
  dataSourceParameter: AzureTableParameterOutput;
  dataSourceType: "AzureTable";
}

export interface InfluxDBParameterOutput {
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

export interface InfluxDBDataFeedOutput extends DataFeedDetailOutputBase {
  dataSourceParameter: InfluxDBParameterOutput;
  dataSourceType: "InfluxDB";
}

export interface MySqlDataFeedOutput extends DataFeedDetailOutputBase {
  dataSourceParameter: SqlSourceParameterOutput;
  dataSourceType: "MySql";
}

export interface PostgreSqlDataFeedOutput extends DataFeedDetailOutputBase {
  dataSourceParameter: SqlSourceParameterOutput;
  dataSourceType: "PostgreSql";
}

export interface SQLServerDataFeedOutput extends DataFeedDetailOutputBase {
  dataSourceParameter: SqlSourceParameterOutput;
  dataSourceType: "SqlServer";
}

export interface MongoDBParameterOutput {
  /** The connection string of this MongoDB */
  connectionString?: string;
  /** A database name in this MongoDB */
  database?: string;
  /** The script to query this database */
  command: string;
}

export interface MongoDBDataFeedOutput extends DataFeedDetailOutputBase {
  dataSourceParameter: MongoDBParameterOutput;
  dataSourceType: "MongoDB";
}

export interface AnomalyFeedbackValueOutput {
  anomalyValue: "AutoDetect" | "Anomaly" | "NotAnomaly";
}

export interface AnomalyFeedbackOutput extends MetricFeedbackOutputBase {
  /** the start timestamp of feedback time range */
  startTime: string;
  /** the end timestamp of feedback time range, when equals to startTime means only one timestamp */
  endTime: string;
  value: AnomalyFeedbackValueOutput;
  /**
   * the corresponding anomaly detection configuration of this feedback
   *
   * Value may contain a UUID
   */
  anomalyDetectionConfigurationId?: string;
  anomalyDetectionConfigurationSnapshot?: AnomalyDetectionConfigurationOutput;
  feedbackType: "Anomaly";
}

export interface ChangePointFeedbackValueOutput {
  changePointValue: "AutoDetect" | "ChangePoint" | "NotChangePoint";
}

export interface ChangePointFeedbackOutput extends MetricFeedbackOutputBase {
  /** the start timestamp of feedback time range */
  startTime: string;
  /** the end timestamp of feedback time range, when equals to startTime means only one timestamp */
  endTime: string;
  value: ChangePointFeedbackValueOutput;
  feedbackType: "ChangePoint";
}

export interface CommentFeedbackValueOutput {
  /** the comment string */
  commentValue: string;
}

export interface CommentFeedbackOutput extends MetricFeedbackOutputBase {
  /** the start timestamp of feedback time range */
  startTime?: string;
  /** the end timestamp of feedback time range, when equals to startTime means only one timestamp */
  endTime?: string;
  value: CommentFeedbackValueOutput;
  feedbackType: "Comment";
}

export interface PeriodFeedbackValueOutput {
  /** the type of setting period */
  periodType: "AutoDetect" | "AssignValue";
  /** the number of intervals a period contains, when no period set to 0 */
  periodValue: number;
}

export interface PeriodFeedbackOutput extends MetricFeedbackOutputBase {
  value: PeriodFeedbackValueOutput;
  feedbackType: "Period";
}

export interface EmailHookParameterOutput {
  /** Email TO: list. */
  toList: Array<string>;
}

export interface EmailHookInfoOutput extends HookInfoOutputBase {
  hookParameter: EmailHookParameterOutput;
  hookType: "Email";
}

export interface WebhookHookParameterOutput {
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

export interface WebhookHookInfoOutput extends HookInfoOutputBase {
  hookParameter: WebhookHookParameterOutput;
  hookType: "Webhook";
}

export type DataSourceCredentialOutput =
  | AzureSQLConnectionStringCredentialOutput
  | DataLakeGen2SharedKeyCredentialOutput
  | ServicePrincipalCredentialOutput
  | ServicePrincipalInKVCredentialOutput;
export type DataFeedDetailOutput =
  | AzureApplicationInsightsDataFeedOutput
  | AzureBlobDataFeedOutput
  | AzureCosmosDBDataFeedOutput
  | AzureDataExplorerDataFeedOutput
  | AzureDataLakeStorageGen2DataFeedOutput
  | AzureEventHubsDataFeedOutput
  | AzureLogAnalyticsDataFeedOutput
  | AzureTableDataFeedOutput
  | InfluxDBDataFeedOutput
  | MySqlDataFeedOutput
  | PostgreSqlDataFeedOutput
  | SQLServerDataFeedOutput
  | MongoDBDataFeedOutput;
export type MetricFeedbackOutput =
  | AnomalyFeedbackOutput
  | ChangePointFeedbackOutput
  | CommentFeedbackOutput
  | PeriodFeedbackOutput;
export type HookInfoOutput = EmailHookInfoOutput | WebhookHookInfoOutput;

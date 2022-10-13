// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface AppComponentsMapOutput {
  /** Azure Load Testing resource Id */
  resourceId?: string;
  /** [Required, if testRunId is not given] Load test unique identifier */
  testId?: string;
  /** [Required if testId is not given] Load test run unique identifier */
  testRunId?: string;
  /** AppComponent name */
  name?: string;
  /** AppComponents Map { resource id (Fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}) : resource object } */
  value: Record<string, AppComponentOutput>;
}

export interface AppComponentOutput {
  /** Fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName} */
  resourceId: string;
  /** Azure resource name */
  resourceName: string;
  /** Azure resource type */
  resourceType: string;
  /** Azure resource display name */
  displayName?: string;
  /** Resource group name of the Azure resource */
  resourceGroup?: string;
  /** Subscription Id of the Azure resource */
  subscriptionId?: string;
  /** Kind of Azure resource type */
  kind?: string;
}

export interface ErrorResponseBodyOutput {
  /** Error from a REST request. */
  error?: ErrorModelOutput;
}

export interface ErrorModelOutput {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** The error target. */
  target?: string;
  /** Additional details and inner errors. */
  details?: Array<ErrorModelOutput>;
}

export interface ServerMetricsModelOutput {
  /** Server metrics config name. */
  name?: string;
  /** [Required, if testRunId is not given] Load test unique identifier */
  testId?: string;
  /** [Required, if testId is not given] Load test run unique identifier */
  testRunId?: string;
  /** Metrics map {metric id : metrics object} (Refer : https://docs.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition for metric id). */
  metrics?: Record<string, ResourceMetricModelOutput>;
}

export interface ResourceMetricModelOutput {
  /** Unique identifier for metric. */
  id?: string;
  /** Azure resource Id. */
  resourceId: string;
  /** Metric name space. */
  metricnamespace: string;
  /** Metric description. */
  displayDescription?: string;
  /** Metric name object. */
  name: ServerMetricNameOutput;
  /** Metric aggregation. */
  aggregation: string;
  /** Metric unit. */
  unit?: string;
  /** Azure resource type. */
  resourceType: string;
}

export interface ServerMetricNameOutput {
  /** Metric name value. */
  value: string;
  /** Metric localized name. */
  localizedValue: string;
}

export interface DefaultServerMetricsConfigListModelOutput {
  /** Default metrics map {resourceType : list of metrics config} (Refer for metrics structure: https://docs.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition) */
  defaultMetrics?: Record<string, Array<DefaultServerMetricsConfigModelOutput>>;
}

export interface DefaultServerMetricsConfigModelOutput {
  metricnamespace?: string;
  aggregation?: string;
  name?: LocalizedNameOutput;
  unit?: string;
  displayDescription?: string;
}

export interface LocalizedNameOutput {
  value?: string;
  localizedValue?: string;
}

export interface SupportedResourceTypeOutput {
  value?: Array<string>;
}

export interface TestModelOutput {
  /** Unique test name as identifier. */
  testId?: string;
  /** The test description. */
  description?: string;
  /** Display name of a test. */
  displayName?: string;
  /** Fully qualified resource Id e.g /subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}. */
  resourceId?: string;
  /** The load test configuration. */
  loadTestConfig?: LoadTestConfigOutput;
  /** Pass fail criteria for a test. */
  passFailCriteria?: PassFailCriteriaOutput;
  /** The created DateTime(ISO 8601 literal format) of the test model. */
  createdDateTime?: string;
  /** The user that created the test model. */
  createdBy?: string;
  /** The last Modified DateTime(ISO 8601 literal format) of the test model. */
  lastModifiedDateTime?: string;
  /** The user that last modified the test model. */
  lastModifiedBy?: string;
  /** The input artifacts for the test. */
  inputArtifacts?: InputTestArtifactsOutput;
  /** Secrets can be stored in an Azure Key Vault or any other secret store. If the secret is stored in an Azure Key Vault, the value should be the secret identifier and the type should be AKV_SECRET_URI. If the secret is stored elsewhere, the secret value should be provided directly and the type should be SECRET_VALUE. */
  secrets?: Record<string, SecretMetadataOutput>;
  /** Environment variables which are defined as a set of <name,value> pairs. */
  environmentVariables?: Record<string, string>;
  /** Subnet ID on which the load test instances should run. */
  subnetId?: string;
  /** Type of the managed identity referencing the Key vault. */
  keyvaultReferenceIdentityType?: string;
  /** Resource Id of the managed identity referencing the Key vault. */
  keyvaultReferenceIdentityId?: string;
}

export interface LoadTestConfigOutput {
  /** The number of engine instances to execute load test. Supported values are in range of 1-45. Required for creating a new test. */
  engineInstances?: number;
  /** Whether all the input CSV files should be split evenly across all engines. */
  splitAllCSVs?: boolean;
}

export interface PassFailCriteriaOutput {
  /** Map of id and pass fail metrics { id  : pass fail metrics }. */
  passFailMetrics?: Record<string, PassFailMetricOutput>;
}

export interface PassFailMetricOutput {
  /** The client metric on which the criteria should be applied. Allowed values - ‘response_time_ms’ , ‘latency’, ‘error’, ‘requests’, ‘requests_per_sec’. */
  clientmetric?: string;
  /** The aggregation function to be applied on the client metric. Allowed functions - ‘percentage’ - for error metric ,‘avg’, ‘p50’, ‘p90’, ‘p95’, ‘p99’, ‘min’, ‘max’ - for response_time_ms and latency metric, ‘avg’ - for requests_per_sec, ‘count’ - for requests. */
  aggregate?: string;
  /** The comparison operator. Supported types ‘>’ */
  condition?: string;
  /** Request name for which the Pass fail criteria has to be applied. */
  requestName?: string;
  /** The value to compare with the client metric. Allowed values - ‘error : [0.0 , 100.0] unit- % ’, response_time_ms and latency : any integer value unit- ms. */
  value?: number;
  /** Either ‘stop’ or ‘continue’ after the threshold is met. Default is ‘continue’. */
  action?: string;
  /** The actual value of the client metric for the test run. */
  actualValue?: number;
  /** Outcome of the test run. possible outcome - ‘passed’ , ‘failed’ , ‘undetermined’. */
  result?: string;
}

export interface InputTestArtifactsOutput {
  /** FileUrl Model. */
  configUrl?: FileUrlOutput;
  /** FileUrl Model. */
  testScriptUrl?: FileUrlOutput;
  /** FileUrl Model. */
  userPropUrl?: FileUrlOutput;
  /** FileUrl Model. */
  inputArtifactsZipFileurl?: FileUrlOutput;
  /** The input artifacts file { name : url } map for the test run. */
  additionalUrls?: Array<FileUrlOutput>;
}

export interface FileUrlOutput {
  /** File URL. */
  url?: string;
  /** File unique identifier. */
  fileId?: string;
  /** Name of the file. */
  filename?: string;
  /** Integer representation of the file type (0 = JMX_FILE, 1 = USER_PROPERTIES, 2 = ADDITIONAL_ARTIFACTS) */
  fileType?: "0" | "1" | "2";
  /** Expiry time of the file */
  expireTime?: string;
  /** Validation status of the file */
  validationStatus?: string;
}

export interface SecretMetadataOutput {
  /** The value of the secret, of type AKV_SECRET_URI or SECRET_VALUE */
  value?: string;
  /** Type of secret. eg. AKV_SECRET_URI/SECRET_VALUE */
  type?: string;
}

export interface TestModelResourceListOutput {
  /** List of Resources */
  value: Array<TestModelOutput>;
  /** Link for the next list of resources in case of paginated results, if applicable */
  nextLink?: string;
}

export interface FileUrlListOutput {
  /** List of file URLs. */
  value: Array<FileUrlOutput>;
  /** Link for the next list of file URLs, if applicable */
  nextLink?: string;
}

export interface TestRunModelOutput {
  /** Unique test run name as identifier. */
  testRunId?: string;
  /** Display name of a test run. */
  displayName?: string;
  /** Associated test Id. */
  testId?: string;
  /** Load test resource Id. */
  resourceId?: string;
  /** The test run description. */
  description?: string;
  /** The test run status. */
  status?: string;
  /** The test run start DateTime(ISO 8601 literal format). */
  startDateTime?: string;
  /** The test run end DateTime(ISO 8601 literal format). */
  endDateTime?: string;
  /** The load test configuration. */
  loadTestConfig?: LoadTestConfigOutput;
  /** Test result for pass/Fail criteria used during the test run. possible outcome - ‘Passed’ , ‘Failed’ , ‘Not Applicable’. */
  testResult?: string;
  /** Pass fail criteria for a test. */
  passFailCriteria?: PassFailCriteriaOutput;
  testArtifacts?: TestArtifactsOutput;
  /** Test run initiated time */
  executedDateTime?: string;
  /** Number of virtual users, for which test has been run. */
  vusers?: number;
  /** Test run statistics */
  testRunStatistics?: Record<string, TestRunStatisticsModelOutput>;
  /** The created DateTime(ISO 8601 literal format) of the test run. */
  createdDateTime?: string;
  /** The user that created the test run. */
  createdBy?: string;
  /** The last updated  DateTime(ISO 8601 literal format) of the test run. */
  lastModifiedDateTime?: string;
  /** The user that updated the test run. */
  lastModifiedBy?: string;
  /** Portal url. */
  portalUrl?: string;
  /** Secrets can be stored in an Azure Key Vault or any other secret store. If the secret is stored in an Azure Key Vault, the value should be the secret identifier and the type should be AKV_SECRET_URI. If the secret is stored elsewhere, the secret value should be provided directly and the type should be SECRET_VALUE. */
  secrets?: Record<string, SecretMetadataOutput>;
  /** Environment variables which are defined as a set of <name,value> pairs. */
  environmentVariables?: Record<string, string>;
  /** Test run duration in milliseconds. */
  duration?: number;
  /** Subnet ID on which the load test instances should run. */
  subnetId?: string;
}

export interface TestArtifactsOutput {
  /** The input artifacts for the test. */
  inputArtifacts: InputTestArtifactsOutput;
  /** The output artifacts for the test run. */
  outputArtifacts?: OutputTestArtifactsOutput;
}

export interface OutputTestArtifactsOutput {
  /** FileUrl Model. */
  resultUrl?: FileUrlOutput;
  /** FileUrl Model. */
  logsUrl?: FileUrlOutput;
}

export interface TestRunStatisticsModelOutput {
  /** Transaction name. */
  transaction?: string;
  /** Sampler count. */
  sampleCount?: number;
  /** Error count. */
  errorCount?: number;
  /** Error percentage. */
  errorPct?: number;
  /** Mean response time. */
  meanResTime?: number;
  /** Median response time. */
  medianResTime?: number;
  /** Max response time. */
  maxResTime?: number;
  /** Minimum response time. */
  minResTime?: number;
  /** 90 percentile response time. */
  pct1ResTime?: number;
  /** 95 percentile response time. */
  pct2ResTime?: number;
  /** 99 percentile response time. */
  pct3ResTime?: number;
  /** Throughput. */
  throughput?: number;
  /** Received network bytes. */
  receivedKBytesPerSec?: number;
  /** Sent network bytes. */
  sentKBytesPerSec?: number;
}

export interface TestRunModelResourceListOutput {
  /** List of Resources */
  value: Array<TestRunModelOutput>;
  /** Link for the next list of resources in case of paginated results, if applicable */
  nextLink?: string;
}

export interface ClientMetricsResultsOutput {
  /** Test run name for which client metrics results is required. */
  testRunId?: string;
  timeSeries?: SeriesOutput;
}

export interface SeriesOutput {
  /** Active users time series data. */
  activeUsers?: Record<string, Array<TimeSeriesOutput>>;
  /** Response time, time series data. */
  responseTime?: Record<string, Array<TimeSeriesOutput>>;
  /** Throughput time series data. */
  throughput?: Record<string, Array<TimeSeriesOutput>>;
  /** Errors time series data. */
  errors?: Record<string, Array<TimeSeriesOutput>>;
}

export interface TimeSeriesOutput {
  /** Timestamp(ISO 8601 literal format). */
  timestamp?: string;
  /** Value at timestamp. */
  value?: number;
}

export interface ClientMetricsFiltersOutput {
  /** Test run name for which client metrics filters is required. */
  testRunId?: string;
  filters?: FiltersOutput;
  timeRange?: TimeRangeOutput;
}

export interface FiltersOutput {
  /** List of request sampler for the test run, for which client metrics can be filtered. */
  requestSamplerValues?: Array<string>;
  /** List of errors occurred for the test run, for which client metrics can be filtered. */
  errorFiltersValues?: Array<string>;
}

export interface TimeRangeOutput {
  /** start DateTime(ISO 8601 literal format) for the requested client metrics filter. */
  startTime?: string;
  /** end DateTime(ISO 8601 literal format) for the requested client metrics filter. */
  endTime?: string;
}

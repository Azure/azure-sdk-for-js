// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface AppComponentsMap {
  /** Azure Load Testing resource Id */
  resourceId?: string;
  /** [Required, if testRunId is not given] Load test unique identifier */
  testId?: string;
  /** [Required if testId is not given] Load test run unique identifier */
  testRunId?: string;
  /** AppComponent name */
  name?: string;
  /** AppComponents Map { resource id (Fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}) : resource object } */
  value: Record<string, AppComponent>;
}

export interface AppComponent {
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

export interface ServerMetricsModel {
  /** Server metrics config name. */
  name?: string;
  /** [Required, if testRunId is not given] Load test unique identifier */
  testId?: string;
  /** [Required, if testId is not given] Load test run unique identifier */
  testRunId?: string;
  /** Metrics map {metric id : metrics object} (Refer : https://docs.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition for metric id). */
  metrics?: Record<string, ResourceMetricModel>;
}

export interface ResourceMetricModel {
  /** Unique identifier for metric. */
  id?: string;
  /** Azure resource Id. */
  resourceId: string;
  /** Metric name space. */
  metricnamespace: string;
  /** Metric description. */
  displayDescription?: string;
  /** Metric name object. */
  name: ServerMetricName;
  /** Metric aggregation. */
  aggregation: string;
  /** Metric unit. */
  unit?: string;
  /** Azure resource type. */
  resourceType: string;
}

export interface ServerMetricName {
  /** Metric name value. */
  value: string;
  /** Metric localized name. */
  localizedValue: string;
}

export interface TestModel {
  /** Unique test name as identifier. */
  testId?: string;
  /** The test description. */
  description?: string;
  /** Display name of a test. */
  displayName?: string;
  /** Fully qualified resource Id e.g /subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}. */
  resourceId?: string;
  /** The load test configuration. */
  loadTestConfig?: LoadTestConfig;
  /** Pass fail criteria for a test. */
  passFailCriteria?: PassFailCriteria;
  /** The created DateTime(ISO 8601 literal format) of the test model. */
  createdDateTime?: Date | string;
  /** The user that created the test model. */
  createdBy?: string;
  /** The last Modified DateTime(ISO 8601 literal format) of the test model. */
  lastModifiedDateTime?: Date | string;
  /** The user that last modified the test model. */
  lastModifiedBy?: string;
  /** The input artifacts for the test. */
  inputArtifacts?: InputTestArtifacts;
  /** Secrets can be stored in an Azure Key Vault or any other secret store. If the secret is stored in an Azure Key Vault, the value should be the secret identifier and the type should be AKV_SECRET_URI. If the secret is stored elsewhere, the secret value should be provided directly and the type should be SECRET_VALUE. */
  secrets?: Record<string, SecretMetadata>;
  /** Environment variables which are defined as a set of <name,value> pairs. */
  environmentVariables?: Record<string, string>;
  /** Subnet ID on which the load test instances should run. */
  subnetId?: string;
  /** Type of the managed identity referencing the Key vault. */
  keyvaultReferenceIdentityType?: string;
  /** Resource Id of the managed identity referencing the Key vault. */
  keyvaultReferenceIdentityId?: string;
}

export interface LoadTestConfig {
  /** The number of engine instances to execute load test. Supported values are in range of 1-45. Required for creating a new test. */
  engineInstances?: number;
  /** Whether all the input CSV files should be split evenly across all engines. */
  splitAllCSVs?: boolean;
}

export interface PassFailCriteria {
  /** Map of id and pass fail metrics { id  : pass fail metrics }. */
  passFailMetrics?: Record<string, PassFailMetric>;
}

export interface PassFailMetric {
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

export interface InputTestArtifacts {
  /** FileUrl Model. */
  configUrl?: FileUrl;
  /** FileUrl Model. */
  testScriptUrl?: FileUrl;
  /** FileUrl Model. */
  userPropUrl?: FileUrl;
  /** FileUrl Model. */
  inputArtifactsZipFileurl?: FileUrl;
  /** The input artifacts file { name : url } map for the test run. */
  additionalUrls?: Array<FileUrl>;
}

export interface FileUrl {
  /** File URL. */
  url?: string;
  /** File unique identifier. */
  fileId?: string;
  /** Name of the file. */
  filename?: string;
  /** Integer representation of the file type (0 = JMX_FILE, 1 = USER_PROPERTIES, 2 = ADDITIONAL_ARTIFACTS) */
  fileType?: "0" | "1" | "2";
  /** Expiry time of the file */
  expireTime?: Date | string;
  /** Validation status of the file */
  validationStatus?: string;
}

export interface SecretMetadata {
  /** The value of the secret, of type AKV_SECRET_URI or SECRET_VALUE */
  value?: string;
  /** Type of secret. eg. AKV_SECRET_URI/SECRET_VALUE */
  type?: string;
}

export interface TestRunModel {
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
  startDateTime?: Date | string;
  /** The test run end DateTime(ISO 8601 literal format). */
  endDateTime?: Date | string;
  /** The load test configuration. */
  loadTestConfig?: LoadTestConfig;
  /** Test result for pass/Fail criteria used during the test run. possible outcome - ‘Passed’ , ‘Failed’ , ‘Not Applicable’. */
  testResult?: string;
  /** Pass fail criteria for a test. */
  passFailCriteria?: PassFailCriteria;
  testArtifacts?: TestArtifacts;
  /** Test run initiated time */
  executedDateTime?: Date | string;
  /** Number of virtual users, for which test has been run. */
  vusers?: number;
  /** Test run statistics */
  testRunStatistics?: Record<string, TestRunStatisticsModel>;
  /** The created DateTime(ISO 8601 literal format) of the test run. */
  createdDateTime?: Date | string;
  /** The user that created the test run. */
  createdBy?: string;
  /** The last updated  DateTime(ISO 8601 literal format) of the test run. */
  lastModifiedDateTime?: Date | string;
  /** The user that updated the test run. */
  lastModifiedBy?: string;
  /** Portal url. */
  portalUrl?: string;
  /** Secrets can be stored in an Azure Key Vault or any other secret store. If the secret is stored in an Azure Key Vault, the value should be the secret identifier and the type should be AKV_SECRET_URI. If the secret is stored elsewhere, the secret value should be provided directly and the type should be SECRET_VALUE. */
  secrets?: Record<string, SecretMetadata>;
  /** Environment variables which are defined as a set of <name,value> pairs. */
  environmentVariables?: Record<string, string>;
  /** Test run duration in milliseconds. */
  duration?: number;
  /** Subnet ID on which the load test instances should run. */
  subnetId?: string;
}

export interface TestArtifacts {
  /** The input artifacts for the test. */
  inputArtifacts: InputTestArtifacts;
  /** The output artifacts for the test run. */
  outputArtifacts?: OutputTestArtifacts;
}

export interface OutputTestArtifacts {
  /** FileUrl Model. */
  resultUrl?: FileUrl;
  /** FileUrl Model. */
  logsUrl?: FileUrl;
}

export interface TestRunStatisticsModel {
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

export interface ClientMetricsRequestModel {
  /** List of request samplers, maximum supported samplers for queries are 20. In case of empty, it will return metrics for maximum 20 samplers */
  requestSamplers?: Array<string>;
  /** List of errors, maximum supported errors for queries are 20. In case of empty, by default will return metrics for maximum 20 errors */
  errors?: Array<string>;
  /** List of percentiles values for response time, supported values 50,90,99,95. Default value is 50th percentile. */
  percentiles?: Array<string>;
  /** For test duration less than 10 minutes group by time interval can be any one of 5s,10s,1m,5m.\n\nFor test duration greater than 10 minutes, group by time interval can be any one of 1m,5m,1h. Default value is 1m. */
  groupByInterval?: string;
  /** Start time */
  startTime: Date | string;
  /** End time */
  endTime: Date | string;
}

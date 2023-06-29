// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Load test model */
export interface TestOutput {
  /** Pass fail criteria for a test. */
  passFailCriteria?: PassFailCriteriaOutput;
  /** Secrets can be stored in an Azure Key Vault or any other secret store. If the secret is stored in an Azure Key Vault, the value should be the secret identifier and the type should be AKV_SECRET_URI. If the secret is stored elsewhere, the secret value should be provided directly and the type should be SECRET_VALUE. */
  secrets?: Record<string, SecretOutput>;
  /** Certificates metadata */
  certificate?: CertificateMetadataOutput;
  /** Environment variables which are defined as a set of <name,value> pairs. */
  environmentVariables?: Record<string, string>;
  /** The load test configuration. */
  loadTestConfiguration?: LoadTestConfigurationOutput;
  /** The input artifacts for the test. */
  inputArtifacts?: TestInputArtifactsOutput;
  /** Unique test name as identifier. */
  testId?: string;
  /** The test description. */
  description?: string;
  /** Display name of a test. */
  displayName?: string;
  /** Subnet ID on which the load test instances should run. */
  subnetId?: string;
  /** Type of the managed identity referencing the Key vault. */
  keyvaultReferenceIdentityType?: string;
  /** Resource Id of the managed identity referencing the Key vault. */
  keyvaultReferenceIdentityId?: string;
  /** The creation datetime(ISO 8601 literal format). */
  createdDateTime?: string;
  /** The user that created. */
  createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  lastModifiedDateTime?: string;
  /** The user that last modified. */
  lastModifiedBy?: string;
}

/** Pass fail criteria for a test. */
export interface PassFailCriteriaOutput {
  /** Map of id and pass fail metrics { id  : pass fail metrics }. */
  passFailMetrics?: Record<string, PassFailMetricOutput>;
}

/** Pass fail metric */
export interface PassFailMetricOutput {
  /** The client metric on which the criteria should be applied. */
  clientMetric?: "response_time_ms" | "latency" | "error" | "requests" | "requests_per_sec";
  /** The aggregation function to be applied on the client metric. Allowed functions - ‘percentage’ - for error metric , ‘avg’, ‘p50’, ‘p90’, ‘p95’, ‘p99’, ‘min’, ‘max’ - for response_time_ms and latency metric, ‘avg’ - for requests_per_sec, ‘count’ - for requests */
  aggregate?: "count" | "percentage" | "avg" | "p50" | "p90" | "p95" | "p99" | "min" | "max";
  /** The comparison operator. Supported types ‘>’, ‘<’ */
  condition?: string;
  /** Request name for which the Pass fail criteria has to be applied */
  requestName?: string;
  /** The value to compare with the client metric. Allowed values - ‘error : [0.0 , 100.0] unit- % ’, response_time_ms and latency : any integer value unit- ms. */
  value?: number;
  /** Action taken after the threshold is met. Default is ‘continue’. */
  action?: "stop" | "continue";
  /** The actual value of the client metric for the test run. */
  actualValue?: number;
  /** Outcome of the test run. */
  result?: "passed" | "undetermined" | "failed";
}

/** Secret */
export interface SecretOutput {
  /** The value of the secret for the respective type */
  value?: string;
  /** Type of secret */
  type?: "AKV_SECRET_URI" | "SECRET_VALUE";
}

/** Certificates metadata */
export interface CertificateMetadataOutput {
  /** The value of the certificate for respective type */
  value?: string;
  /** Type of certificate */
  type?: "AKV_CERT_URI";
  /** Name of the certificate. */
  name?: string;
}

/** The load test configuration. */
export interface LoadTestConfigurationOutput {
  /** The number of engine instances to execute load test. Supported values are in range of 1-45. Required for creating a new test. */
  engineInstances?: number;
  /** If false, Azure Load Testing copies and processes your input files unmodified across all test engine instances. If true, Azure Load Testing splits the CSV input data evenly across all engine instances. If you provide multiple CSV files, each file will be split evenly. */
  splitAllCSVs?: boolean;
  /** If true, optionalLoadTestConfig is required and JMX script for the load test is not required to upload. */
  quickStartTest?: boolean;
  /** Optional load test config */
  optionalLoadTestConfig?: OptionalLoadTestConfigOutput;
}

/** Optional load test config */
export interface OptionalLoadTestConfigOutput {
  /** Test URL. Provide the complete HTTP URL. For example, http://contoso-app.azurewebsites.net/login */
  endpointUrl?: string;
  /** No of concurrent virtual users */
  virtualUsers?: number;
  /** Ramp up time */
  rampUpTime?: number;
  /** Test run duration */
  duration?: number;
}

/** The input artifacts for the test. */
export interface TestInputArtifactsOutput {
  /** File info */
  configFileInfo?: FileInfoOutput;
  /** File info */
  testScriptFileInfo?: FileInfoOutput;
  /** File info */
  userPropFileInfo?: FileInfoOutput;
  /** File info */
  inputArtifactsZipFileInfo?: FileInfoOutput;
  /** Additional supported files for the test run */
  additionalFileInfo?: Array<FileInfoOutput>;
}

/** File info */
export interface FileInfoOutput {
  /** File URL. */
  url?: string;
  /** Name of the file. */
  fileName?: string;
  /** File type */
  fileType?: "JMX_FILE" | "USER_PROPERTIES" | "ADDITIONAL_ARTIFACTS";
  /** Expiry time of the file (ISO 8601 literal format) */
  expireDateTime?: string;
  /** Validation status of the file */
  validationStatus?:
    | "NOT_VALIDATED"
    | "VALIDATION_SUCCESS"
    | "VALIDATION_FAILURE"
    | "VALIDATION_INITIATED"
    | "VALIDATION_NOT_REQUIRED";
  /** Validation failure error details */
  validationFailureDetails?: string;
}

/** The definition of an error object. */
export interface ErrorResponseBodyOutput {
  /** Error from a REST request. */
  error: ErrorModelOutput;
}

/** Error from a REST request. */
export interface ErrorModelOutput {
  /** The error code. */
  code: string;
  /** The error message. */
  message: string;
  /** The error target. */
  target?: string;
  /** Additional details and inner errors. */
  details?: Array<ErrorModelOutput>;
}

/** Collection of tests */
export interface TestsListOutput {
  /** List of tests */
  value: Array<TestOutput>;
  /** Link for the next list of tests in case of paginated results, if applicable */
  nextLink?: string;
}

/** Collection of files. */
export interface FileInfoListOutput {
  /** List of file info. */
  value: Array<FileInfoOutput>;
  /** Link for the next list of file URLs, if applicable */
  nextLink?: string;
}

/** Test app component */
export interface TestAppComponentsOutput {
  /** Azure resource collection { resource id (fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}) : resource object } */
  components: Record<string, AppComponentOutput>;
  /** Test identifier */
  testId?: string;
  /** The creation datetime(ISO 8601 literal format). */
  createdDateTime?: string;
  /** The user that created. */
  createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  lastModifiedDateTime?: string;
  /** The user that last modified. */
  lastModifiedBy?: string;
}

/** An Azure resource object (Refer azure generic resource model : https://docs.microsoft.com/en-us/rest/api/resources/resources/get-by-id#genericresource) */
export interface AppComponentOutput {
  /** fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName} */
  resourceId?: string;
  /** Azure resource name, required while creating the app component. */
  resourceName?: string;
  /** Azure resource type, required while creating the app component. */
  resourceType?: string;
  /** Azure resource display name */
  displayName?: string;
  /** Resource group name of the Azure resource */
  resourceGroup?: string;
  /** Subscription Id of the Azure resource */
  subscriptionId?: string;
  /** Kind of Azure resource type */
  kind?: string;
}

/** Test server metrics configuration */
export interface TestServerMetricConfigOutput {
  /** Test identifier */
  testId?: string;
  /** Azure resource metrics collection {metric id : metrics object} (Refer : https://docs.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition for metric id). */
  metrics?: Record<string, ResourceMetricOutput>;
  /** The creation datetime(ISO 8601 literal format). */
  createdDateTime?: string;
  /** The user that created. */
  createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  lastModifiedDateTime?: string;
  /** The user that last modified. */
  lastModifiedBy?: string;
}

/** Associated metric definition for particular metrics of the azure resource ( Refer : https://docs.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition). */
export interface ResourceMetricOutput {
  /** Unique name for metric. */
  id?: string;
  /** Azure resource id. */
  resourceId: string;
  /** Metric name space. */
  metricNamespace: string;
  /** Metric description. */
  displayDescription?: string;
  /** The invariant value of metric name */
  name: string;
  /** Metric aggregation. */
  aggregation: string;
  /** Metric unit. */
  unit?: string;
  /** Azure resource type. */
  resourceType: string;
}

/** Load test run model */
export interface TestRunOutput {
  /** Pass fail criteria for a test. */
  passFailCriteria?: PassFailCriteriaOutput;
  /** Secrets can be stored in an Azure Key Vault or any other secret store. If the secret is stored in an Azure Key Vault, the value should be the secret identifier and the type should be AKV_SECRET_URI. If the secret is stored elsewhere, the secret value should be provided directly and the type should be SECRET_VALUE. */
  secrets?: Record<string, SecretOutput>;
  /** Certificates metadata */
  certificate?: CertificateMetadataOutput;
  /** Environment variables which are defined as a set of <name,value> pairs. */
  environmentVariables?: Record<string, string>;
  /** Error details if there is any failure in load test run */
  errorDetails?: Array<ErrorDetailsOutput>;
  /** Test run statistics. */
  testRunStatistics?: Record<string, TestRunStatisticsOutput>;
  /** The load test configuration. */
  loadTestConfiguration?: LoadTestConfigurationOutput;
  /** Collection of test run artifacts */
  testArtifacts?: TestRunArtifactsOutput;
  /** Test result for pass/Fail criteria used during the test run. */
  testResult?: "PASSED" | "NOT_APPLICABLE" | "FAILED";
  /** Number of virtual users, for which test has been run. */
  virtualUsers?: number;
  /** Unique test run name as identifier */
  testRunId?: string;
  /** Display name of a testRun. */
  displayName?: string;
  /** Associated test Id. */
  testId?: string;
  /** The test run description. */
  description?: string;
  /** The test run status. */
  status?:
    | "ACCEPTED"
    | "NOTSTARTED"
    | "PROVISIONING"
    | "PROVISIONED"
    | "CONFIGURING"
    | "CONFIGURED"
    | "EXECUTING"
    | "EXECUTED"
    | "DEPROVISIONING"
    | "DEPROVISIONED"
    | "DONE"
    | "CANCELLING"
    | "CANCELLED"
    | "FAILED"
    | "VALIDATION_SUCCESS"
    | "VALIDATION_FAILURE";
  /** The test run start DateTime(ISO 8601 literal format). */
  startDateTime?: string;
  /** The test run end DateTime(ISO 8601 literal format). */
  endDateTime?: string;
  /** Test run initiated time. */
  executedDateTime?: string;
  /** Portal url. */
  portalUrl?: string;
  /** Test run duration in milliseconds. */
  duration?: number;
  /** Subnet ID on which the load test instances should run. */
  subnetId?: string;
  /** The creation datetime(ISO 8601 literal format). */
  createdDateTime?: string;
  /** The user that created. */
  createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  lastModifiedDateTime?: string;
  /** The user that last modified. */
  lastModifiedBy?: string;
}

/** Error details if there is any failure in load test run */
export interface ErrorDetailsOutput {
  /** Error details in case test run was not successfully run. */
  message?: string;
}

/** Test run statistics. */
export interface TestRunStatisticsOutput {
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
  /** Send network bytes. */
  sentKBytesPerSec?: number;
}

/** Collection of test run artifacts */
export interface TestRunArtifactsOutput {
  /** The input artifacts for the test run. */
  inputArtifacts?: TestRunInputArtifactsOutput;
  /** The output artifacts for the test run. */
  outputArtifacts?: TestRunOutputArtifactsOutput;
}

/** The input artifacts for the test run. */
export interface TestRunInputArtifactsOutput {
  /** File info */
  configFileInfo?: FileInfoOutput;
  /** File info */
  testScriptFileInfo?: FileInfoOutput;
  /** File info */
  userPropFileInfo?: FileInfoOutput;
  /** File info */
  inputArtifactsZipFileInfo?: FileInfoOutput;
  /** Additional supported files for the test run */
  additionalFileInfo?: Array<FileInfoOutput>;
}

/** The output artifacts for the test run. */
export interface TestRunOutputArtifactsOutput {
  /** File info */
  resultFileInfo?: FileInfoOutput;
  /** File info */
  logsFileInfo?: FileInfoOutput;
}

/** Collection of test runs */
export interface TestRunsListOutput {
  /** List of test runs */
  value: Array<TestRunOutput>;
  /** Link for the next list of test runs in case of paginated results, if applicable */
  nextLink?: string;
}

/** Represents collection of metric namespaces. */
export interface MetricNamespaceCollectionOutput {
  /** The values for the metric namespaces. */
  value: Array<MetricNamespaceOutput>;
}

/** Metric namespace class specifies the metadata for a metric namespace. */
export interface MetricNamespaceOutput {
  /** The namespace description. */
  description?: string;
  /** The metric namespace name. */
  name?: string;
}

/** Represents collection of metric definitions. */
export interface MetricDefinitionCollectionOutput {
  /** the values for the metric definitions. */
  value: Array<MetricDefinitionOutput>;
}

/** Metric definition */
export interface MetricDefinitionOutput {
  /** List of dimensions */
  dimensions?: Array<NameAndDescOutput>;
  /** The metric description */
  description?: string;
  /** The metric name */
  name?: string;
  /** The namespace the metric belongs to. */
  namespace?: string;
  /** The primary aggregation type value defining how to use the values for display. */
  primaryAggregationType?:
    | "Average"
    | "Count"
    | "None"
    | "Total"
    | "Percentile90"
    | "Percentile95"
    | "Percentile99";
  /** The collection of what all aggregation types are supported. */
  supportedAggregationTypes?: Array<string>;
  /** The unit of the metric. */
  unit?:
    | "NotSpecified"
    | "Percent"
    | "Count"
    | "Seconds"
    | "Milliseconds"
    | "Bytes"
    | "BytesPerSecond"
    | "CountPerSecond";
  /** Metric availability specifies the time grain (aggregation interval or frequency). */
  metricAvailabilities?: Array<MetricAvailabilityOutput>;
}

/** The name and description */
export interface NameAndDescOutput {
  /** The description */
  description?: string;
  /** The name */
  name?: string;
}

/** Metric availability specifies the time grain (aggregation interval or frequency) */
export interface MetricAvailabilityOutput {
  /** The time grain specifies the aggregation interval for the metric. Expressed as a duration 'PT1M', 'PT1H', etc. */
  timeGrain?: "PT5S" | "PT10S" | "PT1M" | "PT5M" | "PT1H";
}

/** The response to a metrics query. */
export interface MetricsOutput {
  /** Timeseries data for metric query. */
  timeseries?: Array<TimeSeriesElementOutput>;
  /** Link for the next set of timeseries in case of paginated results, if applicable */
  nextLink?: string;
}

/** The time series returned when a data query is performed. */
export interface TimeSeriesElementOutput {
  /** An array of data points representing the metric values. */
  data?: Array<MetricValueOutput>;
  /** The dimension values */
  dimensionValues?: Array<DimensionValueOutput>;
}

/** Represents a metric value. */
export interface MetricValueOutput {
  /** The timestamp for the metric value in ISO 8601 format. */
  timestamp?: string;
  /** The metric value. */
  value?: number;
}

/** Represents a metric dimension value. */
export interface DimensionValueOutput {
  /** The name of the dimension. */
  name?: string;
  /** The value of the dimension. */
  value?: string;
}

/** Metrics dimension values. */
export interface DimensionValueListOutput {
  /** The dimension values */
  value?: Array<string>;
  /** Link for the next set of values in case of paginated results, if applicable */
  nextLink?: string;
}

/** Test run app component */
export interface TestRunAppComponentsOutput {
  /** Azure resource collection { resource id (fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}) : resource object } */
  components: Record<string, AppComponentOutput>;
  /** Test run identifier */
  testRunId?: string;
  /** The creation datetime(ISO 8601 literal format). */
  createdDateTime?: string;
  /** The user that created. */
  createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  lastModifiedDateTime?: string;
  /** The user that last modified. */
  lastModifiedBy?: string;
}

/** Test run server metrics configuration */
export interface TestRunServerMetricConfigOutput {
  /** Test run identifier */
  testRunId?: string;
  /** Azure resource metrics collection {metric id : metrics object} (Refer : https://docs.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition for metric id). */
  metrics?: Record<string, ResourceMetricOutput>;
  /** The creation datetime(ISO 8601 literal format). */
  createdDateTime?: string;
  /** The user that created. */
  createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  lastModifiedDateTime?: string;
  /** The user that last modified. */
  lastModifiedBy?: string;
}

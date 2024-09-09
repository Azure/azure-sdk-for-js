// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Load test model */
export interface Test {
  /** Pass fail criteria for a test. */
  passFailCriteria?: PassFailCriteria;
  /** Secrets can be stored in an Azure Key Vault or any other secret store. If the secret is stored in an Azure Key Vault, the value should be the secret identifier and the type should be AKV_SECRET_URI. If the secret is stored elsewhere, the secret value should be provided directly and the type should be SECRET_VALUE. */
  secrets?: Record<string, Secret>;
  /** Certificates metadata */
  certificate?: CertificateMetadata;
  /** Environment variables which are defined as a set of <name,value> pairs. */
  environmentVariables?: Record<string, string>;
  /** The load test configuration. */
  loadTestConfiguration?: LoadTestConfiguration;
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
}

/** Pass fail criteria for a test. */
export interface PassFailCriteria {
  /** Map of id and pass fail metrics { id  : pass fail metrics }. */
  passFailMetrics?: Record<string, PassFailMetric>;
}

/** Pass fail metric */
export interface PassFailMetric {
  /** The client metric on which the criteria should be applied. */
  clientMetric?:
    | "response_time_ms"
    | "latency"
    | "error"
    | "requests"
    | "requests_per_sec";
  /** The aggregation function to be applied on the client metric. Allowed functions - ‘percentage’ - for error metric , ‘avg’, ‘p50’, ‘p90’, ‘p95’, ‘p99’, ‘min’, ‘max’ - for response_time_ms and latency metric, ‘avg’ - for requests_per_sec, ‘count’ - for requests */
  aggregate?:
    | "count"
    | "percentage"
    | "avg"
    | "p50"
    | "p90"
    | "p95"
    | "p99"
    | "min"
    | "max";
  /** The comparison operator. Supported types ‘>’, ‘<’ */
  condition?: string;
  /** Request name for which the Pass fail criteria has to be applied */
  requestName?: string;
  /** The value to compare with the client metric. Allowed values - ‘error : [0.0 , 100.0] unit- % ’, response_time_ms and latency : any integer value unit- ms. */
  value?: number;
  /** Action taken after the threshold is met. Default is ‘continue’. */
  action?: "continue" | "stop";
}

/** Secret */
export interface Secret {
  /** The value of the secret for the respective type */
  value?: string;
  /** Type of secret */
  type?: "AKV_SECRET_URI" | "SECRET_VALUE";
}

/** Certificates metadata */
export interface CertificateMetadata {
  /** The value of the certificate for respective type */
  value?: string;
  /** Type of certificate */
  type?: "AKV_CERT_URI";
  /** Name of the certificate. */
  name?: string;
}

/** The load test configuration. */
export interface LoadTestConfiguration {
  /** The number of engine instances to execute load test. Supported values are in range of 1-45. Required for creating a new test. */
  engineInstances?: number;
  /** If false, Azure Load Testing copies and processes your input files unmodified across all test engine instances. If true, Azure Load Testing splits the CSV input data evenly across all engine instances. If you provide multiple CSV files, each file will be split evenly. */
  splitAllCSVs?: boolean;
  /** If true, optionalLoadTestConfig is required and JMX script for the load test is not required to upload. */
  quickStartTest?: boolean;
  /** Optional load test config */
  optionalLoadTestConfig?: OptionalLoadTestConfig;
}

/** Optional load test config */
export interface OptionalLoadTestConfig {
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
export interface TestInputArtifacts {
  /** File info */
  configFileInfo?: FileInfo;
  /** File info */
  testScriptFileInfo?: FileInfo;
  /** File info */
  userPropFileInfo?: FileInfo;
  /** File info */
  inputArtifactsZipFileInfo?: FileInfo;
}

/** File info */
export interface FileInfo {
  /** File URL. */
  url?: string;
  /** Name of the file. */
  fileName?: string;
  /** File type */
  fileType?: "JMX_FILE" | "USER_PROPERTIES" | "ADDITIONAL_ARTIFACTS";
  /** Expiry time of the file (ISO 8601 literal format) */
  expireDateTime?: Date | string;
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

/** Test app component */
export interface TestAppComponents {
  /** Azure resource collection { resource id (fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}) : resource object } */
  components: Record<string, AppComponent>;
}

/** An Azure resource object (Refer azure generic resource model : https://docs.microsoft.com/en-us/rest/api/resources/resources/get-by-id#genericresource) */
export interface AppComponent {
  /** Azure resource name, required while creating the app component. */
  resourceName?: string;
  /** Azure resource type, required while creating the app component. */
  resourceType?: string;
  /** Azure resource display name */
  displayName?: string;
  /** Kind of Azure resource type */
  kind?: string;
}

/** Test server metrics configuration */
export interface TestServerMetricConfig {
  /** Azure resource metrics collection {metric id : metrics object} (Refer : https://docs.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition for metric id). */
  metrics?: Record<string, ResourceMetric>;
}

/** Associated metric definition for particular metrics of the azure resource ( Refer : https://docs.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition). */
export interface ResourceMetric {
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
export interface TestRun {
  /** Pass fail criteria for a test. */
  passFailCriteria?: PassFailCriteria;
  /** Secrets can be stored in an Azure Key Vault or any other secret store. If the secret is stored in an Azure Key Vault, the value should be the secret identifier and the type should be AKV_SECRET_URI. If the secret is stored elsewhere, the secret value should be provided directly and the type should be SECRET_VALUE. */
  secrets?: Record<string, Secret>;
  /** Certificates metadata */
  certificate?: CertificateMetadata;
  /** Environment variables which are defined as a set of <name,value> pairs. */
  environmentVariables?: Record<string, string>;
  /** The load test configuration. */
  loadTestConfiguration?: LoadTestConfiguration;
  /** Display name of a testRun. */
  displayName?: string;
  /** Associated test Id. */
  testId?: string;
  /** The test run description. */
  description?: string;
}

/** Error details if there is any failure in load test run */
export interface ErrorDetails {}

/** Test run statistics. */
export interface TestRunStatistics {}

/** Collection of test run artifacts */
export interface TestRunArtifacts {
  /** The output artifacts for the test run. */
  outputArtifacts?: TestRunOutputArtifacts;
}

/** The input artifacts for the test run. */
export interface TestRunInputArtifacts {
  /** File info */
  configFileInfo?: FileInfo;
  /** File info */
  testScriptFileInfo?: FileInfo;
  /** File info */
  userPropFileInfo?: FileInfo;
  /** File info */
  inputArtifactsZipFileInfo?: FileInfo;
}

/** The output artifacts for the test run. */
export interface TestRunOutputArtifacts {
  /** File info */
  resultFileInfo?: FileInfo;
  /** File info */
  logsFileInfo?: FileInfo;
}

/** Filters to fetch the set of metric */
export interface MetricRequestPayload {
  /** Get metrics for specific dimension values. Example: Metric contains dimension like SamplerName, Error. To retrieve all the time series data where SamplerName is equals to HTTPRequest1 or HTTPRequest2, the DimensionFilter value will be {"SamplerName", ["HTTPRequest1", "HTTPRequest2"} */
  filters?: Array<DimensionFilter>;
}

/** Dimension name and values to filter */
export interface DimensionFilter {
  /** The dimension name */
  name?: string;
  /** The dimension values. Maximum values can be 20. */
  values?: Array<string>;
}

/** Test run app component */
export interface TestRunAppComponents {
  /** Azure resource collection { resource id (fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}) : resource object } */
  components: Record<string, AppComponent>;
}

/** Test run server metrics configuration */
export interface TestRunServerMetricConfig {
  /** Azure resource metrics collection {metric id : metrics object} (Refer : https://docs.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition for metric id). */
  metrics?: Record<string, ResourceMetric>;
}

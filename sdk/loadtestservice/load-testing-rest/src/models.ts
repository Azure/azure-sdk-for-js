// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  /** The input artifacts for the test. */
  inputArtifacts?: TestInputArtifacts;
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
  createdDateTime?: Date | string;
  /** The user that created. */
  createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  lastModifiedDateTime?: Date | string;
  /** The user that last modified. */
  lastModifiedBy?: string;
}

export interface PassFailCriteria {
  /** Map of id and pass fail metrics { id  : pass fail metrics }. */
  passFailMetrics?: Record<string, PassFailMetric>;
}

export interface PassFailMetric {
  /** The client metric on which the criteria should be applied. */
  clientmetric?: "response_time_ms" | "latency" | "error" | "requests" | "requests_per_sec";
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

export interface Secret {
  /** The value of the secret for the respective type */
  value?: string;
  /** Type of secret */
  type?: "AKV_SECRET_URI" | "SECRET_VALUE";
}

export interface CertificateMetadata {
  /** The value of the certificate for respective type */
  value?: string;
  /** Type of certificate */
  type?: "AKV_CERT_URI";
  /** Name of the certificate. */
  name?: string;
}

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

export interface OptionalLoadTestConfig {
  /** Test URL. Provide the complete HTTP URL. For example, http://contoso-app.azurewebsites.net/login */
  endpointUrl?: string;
  /** No of concurrent virtual users */
  vusers?: number;
  /** Ramp up time */
  rampUpTime?: number;
  /** Test run duration */
  duration?: number;
}

export interface TestInputArtifacts {
  /** File info */
  configFileInfo?: FileInfo;
  /** File info */
  testScriptFileInfo?: FileInfo;
  /** File info */
  userPropFileInfo?: FileInfo;
  /** File info */
  inputArtifactsZipFileInfo?: FileInfo;
  /** Additional supported files for the test run */
  additionalFileInfo?: Array<FileInfo>;
}

export interface FileInfo {
  /** File URL. */
  url?: string;
  /** Unique name for test file. */
  fileId?: string;
  /** Name of the file. */
  filename?: string;
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
}

export interface TestAppComponents {
  /** Test identifier */
  testId?: string;
  /** Azure resource collection { resource id (fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}) : resource object } */
  components: Record<string, AppComponent>;
  /** The creation datetime(ISO 8601 literal format). */
  createdDateTime?: Date | string;
  /** The user that created. */
  createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  lastModifiedDateTime?: Date | string;
  /** The user that last modified. */
  lastModifiedBy?: string;
}

export interface AppComponent {
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

export interface TestServerMetricConfig {
  /** Test identifier */
  testId?: string;
  /** Azure resource metrics collection {metric id : metrics object} (Refer : https://docs.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition for metric id). */
  metrics?: Record<string, ResourceMetric>;
  /** The creation datetime(ISO 8601 literal format). */
  createdDateTime?: Date | string;
  /** The user that created. */
  createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  lastModifiedDateTime?: Date | string;
  /** The user that last modified. */
  lastModifiedBy?: string;
}

export interface ResourceMetric {
  /** Unique name for metric. */
  id?: string;
  /** Azure resource id. */
  resourceId: string;
  /** Metric name space. */
  metricNamespace: string;
  /** Metric description. */
  displayDescription?: string;
  /** The localizable string class. */
  name: LocalizableString;
  /** Metric aggregation. */
  aggregation: string;
  /** Metric unit. */
  unit?: string;
  /** Azure resource type. */
  resourceType: string;
}

export interface LocalizableString {
  /** The locale specific value. */
  localizedValue?: string;
  /** The invariant value. */
  value?: string;
}

export interface TestRun {
  /** Pass fail criteria for a test. */
  passFailCriteria?: PassFailCriteria;
  /** Secrets can be stored in an Azure Key Vault or any other secret store. If the secret is stored in an Azure Key Vault, the value should be the secret identifier and the type should be AKV_SECRET_URI. If the secret is stored elsewhere, the secret value should be provided directly and the type should be SECRET_VALUE. */
  secrets?: Record<string, Secret>;
  /** Certificates metadata */
  certificate?: CertificateMetadata;
  /** Environment variables which are defined as a set of <name,value> pairs. */
  environmentVariables?: Record<string, string>;
  /** Error details if there is any failure in load test run */
  errorDetails?: Array<ErrorDetails>;
  /** Test run statistics. */
  testRunStatistics?: Record<string, TestRunStatistics>;
  /** The load test configuration. */
  loadTestConfiguration?: LoadTestConfiguration;
  /** Collection of test run artifacts */
  testArtifacts?: TestRunArtifacts;
  /** Test result for pass/Fail criteria used during the test run. */
  testResult?: "PASSED" | "NOT_APPLICABLE" | "FAILED";
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
  startDateTime?: Date | string;
  /** The test run end DateTime(ISO 8601 literal format). */
  endDateTime?: Date | string;
  /** Test run initiated time. */
  executedDateTime?: Date | string;
  /** Number of virtual users, for which test has been run. */
  vusers?: number;
  /** Portal url. */
  portalUrl?: string;
  /** Test run duration in milliseconds. */
  duration?: number;
  /** Subnet ID on which the load test instances should run. */
  subnetId?: string;
  /** The creation datetime(ISO 8601 literal format). */
  createdDateTime?: Date | string;
  /** The user that created. */
  createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  lastModifiedDateTime?: Date | string;
  /** The user that last modified. */
  lastModifiedBy?: string;
}

export interface ErrorDetails {
  /** Error details in case test run was not successfully run. */
  message?: string;
}

export interface TestRunStatistics {
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

export interface TestRunArtifacts {
  /** The input artifacts for the test run. */
  inputArtifacts?: TestRunInputArtifacts;
  /** The output artifacts for the test run. */
  outputArtifacts?: TestRunOutputArtifacts;
}

export interface TestRunInputArtifacts {
  /** File info */
  configFileInfo?: FileInfo;
  /** File info */
  testScriptFileInfo?: FileInfo;
  /** File info */
  userPropFileInfo?: FileInfo;
  /** File info */
  inputArtifactsZipFileInfo?: FileInfo;
  /** Additional supported files for the test run */
  additionalFileInfo?: Array<FileInfo>;
}

export interface TestRunOutputArtifacts {
  /** File info */
  resultUrl?: FileInfo;
  /** File info */
  logsUrl?: FileInfo;
}

export interface MetricRequestPayload {
  /** The MetadataFilter is used to reduce the set of metric data returned. Example: Metric contains metadata like SamplerName, Error. To retrieve all the time series data where SamplerName is equals to HTTPRequest1 or HTTPRequest2, the MetadataFilter value will be {"SamplerName", ["HTTPRequest1", "HTTPRequest2"} */
  filters?: Array<MetadataFilter>;
}

export interface MetadataFilter {
  /** The invariant metadata name */
  name?: string;
  /** The metadata values. Maximum values can be 20. */
  values?: Array<string>;
}

export interface TestRunAppComponents {
  /** Test run identifier */
  testRunId?: string;
  /** Azure resource collection { resource id (fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}) : resource object } */
  components: Record<string, AppComponent>;
  /** The creation datetime(ISO 8601 literal format). */
  createdDateTime?: Date | string;
  /** The user that created. */
  createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  lastModifiedDateTime?: Date | string;
  /** The user that last modified. */
  lastModifiedBy?: string;
}

export interface TestRunServerMetricConfig {
  /** Test run identifier */
  testRunId?: string;
  /** Azure resource metrics collection {metric id : metrics object} (Refer : https://docs.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition for metric id). */
  metrics?: Record<string, ResourceMetric>;
  /** The creation datetime(ISO 8601 literal format). */
  createdDateTime?: Date | string;
  /** The user that created. */
  createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  lastModifiedDateTime?: Date | string;
  /** The user that last modified. */
  lastModifiedBy?: string;
}

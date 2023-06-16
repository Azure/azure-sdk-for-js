// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";

/** Load test model */
export interface TestOutput {
  /** Pass fail criteria for a test. */
  passFailCriteria?: PassFailCriteriaOutput;
  /**
   * Secrets can be stored in an Azure Key Vault or any other secret store. If the
   * secret is stored in an Azure Key Vault, the value should be the secret
   * identifier and the type should be AKV_SECRET_URI. If the secret is stored
   * elsewhere, the secret value should be provided directly and the type should be
   * SECRET_VALUE.
   */
  secrets?: Record<string, SecretOutput>;
  /** Certificates metadata */
  certificate?: CertificateMetadataOutput;
  /** Environment variables which are defined as a set of <name,value> pairs. */
  environmentVariables?: Record<string, string>;
  /** The load test configuration. */
  loadTestConfiguration?: LoadTestConfigurationOutput;
  /** The input artifacts for the test. */
  readonly inputArtifacts?: TestInputArtifactsOutput;
  /** Unique test name as identifier. */
  readonly testId?: string;
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
  readonly createdDateTime?: string;
  /** The user that created. */
  readonly createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  readonly lastModifiedDateTime?: string;
  /** The user that last modified. */
  readonly lastModifiedBy?: string;
}

/** Pass fail criteria for a test. */
export interface PassFailCriteriaOutput {
  /** Map of id and pass fail metrics { id  : pass fail metrics }. */
  passFailMetrics?: Record<string, PassFailMetricOutput>;
}

/** Pass fail metric */
export interface PassFailMetricOutput {
  /**
   * The client metric on which the criteria should be applied.
   *
   * Possible values: response_time_ms, latency, error, requests, requests_per_sec
   */
  clientMetric?: string;
  /**
   * The aggregation function to be applied on the client metric. Allowed functions
   * - ‘percentage’ - for error metric , ‘avg’, ‘p50’, ‘p90’, ‘p95’, ‘p99’, ‘min’,
   * ‘max’ - for response_time_ms and latency metric, ‘avg’ - for requests_per_sec,
   * ‘count’ - for requests
   *
   * Possible values: count, percentage, avg, p50, p90, p95, p99, min, max
   */
  aggregate?: string;
  /** The comparison operator. Supported types ‘>’, ‘<’ */
  condition?: string;
  /** Request name for which the Pass fail criteria has to be applied */
  requestName?: string;
  /**
   * The value to compare with the client metric. Allowed values - ‘error : [0.0 ,
   * 100.0] unit- % ’, response_time_ms and latency : any integer value unit- ms.
   */
  value?: number;
  /**
   * Action taken after the threshold is met. Default is ‘continue’.
   *
   * Possible values: continue, stop
   */
  action?: string;
  /** The actual value of the client metric for the test run. */
  readonly actualValue?: number;
  /**
   * Outcome of the test run.
   *
   * Possible values: passed, undetermined, failed
   */
  readonly result?: string;
}

/** Secret */
export interface SecretOutput {
  /** The value of the secret for the respective type */
  value?: string;
  /**
   * Type of secret
   *
   * Possible values: AKV_SECRET_URI, SECRET_VALUE
   */
  type?: string;
}

/** Certificates metadata */
export interface CertificateMetadataOutput {
  /** The value of the certificate for respective type */
  value?: string;
  /**
   * Type of certificate
   *
   * Possible values: AKV_CERT_URI
   */
  type?: string;
  /** Name of the certificate. */
  name?: string;
}

/** The load test configuration. */
export interface LoadTestConfigurationOutput {
  /**
   * The number of engine instances to execute load test. Supported values are in
   * range of 1-45. Required for creating a new test.
   */
  engineInstances?: number;
  /**
   * If false, Azure Load Testing copies and processes your input files unmodified
   * across all test engine instances. If true, Azure Load Testing splits the CSV
   * input data evenly across all engine instances. If you provide multiple CSV
   * files, each file will be split evenly.
   */
  splitAllCSVs?: boolean;
  /**
   * If true, optionalLoadTestConfig is required and JMX script for the load test is
   * not required to upload.
   */
  quickStartTest?: boolean;
  /** Optional load test config */
  optionalLoadTestConfig?: OptionalLoadTestConfigOutput;
}

/** Optional load test config */
export interface OptionalLoadTestConfigOutput {
  /**
   * Test URL. Provide the complete HTTP URL. For example,
   * http://contoso-app.azurewebsites.net/login
   */
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
  readonly additionalFileInfo?: Array<FileInfoOutput>;
}

/** File info */
export interface FileInfoOutput {
  /** File URL. */
  url?: string;
  /** Name of the file. */
  fileName?: string;
  /**
   * File type
   *
   * Possible values: JMX_FILE, USER_PROPERTIES, ADDITIONAL_ARTIFACTS
   */
  fileType?: string;
  /** Expiry time of the file (ISO 8601 literal format) */
  expireDateTime?: string;
  /**
   * Validation status of the file
   *
   * Possible values: NOT_VALIDATED, VALIDATION_SUCCESS, VALIDATION_FAILURE, VALIDATION_INITIATED, VALIDATION_NOT_REQUIRED
   */
  validationStatus?: string;
  /** Validation failure error details */
  validationFailureDetails?: string;
}

/** Test app component */
export interface TestAppComponentsOutput {
  /**
   * Azure resource collection { resource id (fully qualified resource Id e.g
   * subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName})
   * : resource object }
   */
  components: Record<string, AppComponentOutput>;
  /** Test identifier */
  readonly testId?: string;
  /** The creation datetime(ISO 8601 literal format). */
  readonly createdDateTime?: string;
  /** The user that created. */
  readonly createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  readonly lastModifiedDateTime?: string;
  /** The user that last modified. */
  readonly lastModifiedBy?: string;
}

/**
 * An Azure resource object (Refer azure generic resource model :
 * https://docs.microsoft.com/en-us/rest/api/resources/resources/get-by-id#genericresource)
 */
export interface AppComponentOutput {
  /**
   * fully qualified resource Id e.g
   * subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName}
   */
  readonly resourceId?: string;
  /** Azure resource name, required while creating the app component. */
  resourceName?: string;
  /** Azure resource type, required while creating the app component. */
  resourceType?: string;
  /** Azure resource display name */
  displayName?: string;
  /** Resource group name of the Azure resource */
  readonly resourceGroup?: string;
  /** Subscription Id of the Azure resource */
  readonly subscriptionId?: string;
  /** Kind of Azure resource type */
  kind?: string;
}

/** Test server metrics configuration */
export interface TestServerMetricConfigOutput {
  /** Test identifier */
  readonly testId?: string;
  /**
   * Azure resource metrics collection {metric id : metrics object} (Refer :
   * https://docs.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition
   * for metric id).
   */
  metrics?: Record<string, ResourceMetricOutput>;
  /** The creation datetime(ISO 8601 literal format). */
  readonly createdDateTime?: string;
  /** The user that created. */
  readonly createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  readonly lastModifiedDateTime?: string;
  /** The user that last modified. */
  readonly lastModifiedBy?: string;
}

/**
 * Associated metric definition for particular metrics of the azure resource (
 * Refer :
 * https://docs.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition).
 */
export interface ResourceMetricOutput {
  /** Unique name for metric. */
  readonly id?: string;
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
export interface TestRunOutput {}

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
  /**
   * The primary aggregation type value defining how to use the values for display.
   *
   * Possible values: Average, Count, None, Total, Percentile90, Percentile95, Percentile99
   */
  primaryAggregationType?: string;
  /** The collection of what all aggregation types are supported. */
  supportedAggregationTypes?: string[];
  /**
   * The unit of the metric.
   *
   * Possible values: NotSpecified, Percent, Count, Seconds, Milliseconds, Bytes, BytesPerSecond, CountPerSecond
   */
  unit?: string;
  /**
   * Metric availability specifies the time grain (aggregation interval or
   * frequency).
   */
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
  /**
   * The time grain specifies the aggregation interval for the metric. Expressed as
   * a duration 'PT1M', 'PT1H', etc.
   *
   * Possible values: PT5S, PT10S, PT1M, PT5M, PT1H
   */
  timeGrain?: string;
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

export interface DimensionValueListOutput {
  value: Record<string, any>;
}

/** Test run app component */
export interface TestRunAppComponentsOutput {
  /**
   * Azure resource collection { resource id (fully qualified resource Id e.g
   * subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName})
   * : resource object }
   */
  components: Record<string, AppComponentOutput>;
  /** Test run identifier */
  readonly testRunId?: string;
  /** The creation datetime(ISO 8601 literal format). */
  readonly createdDateTime?: string;
  /** The user that created. */
  readonly createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  readonly lastModifiedDateTime?: string;
  /** The user that last modified. */
  readonly lastModifiedBy?: string;
}

/** Test run server metrics configuration */
export interface TestRunServerMetricConfigOutput {
  /** Test run identifier */
  readonly testRunId?: string;
  /**
   * Azure resource metrics collection {metric id : metrics object} (Refer :
   * https://docs.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition
   * for metric id).
   */
  metrics?: Record<string, ResourceMetricOutput>;
  /** The creation datetime(ISO 8601 literal format). */
  readonly createdDateTime?: string;
  /** The user that created. */
  readonly createdBy?: string;
  /** The last Modified datetime(ISO 8601 literal format). */
  readonly lastModifiedDateTime?: string;
  /** The user that last modified. */
  readonly lastModifiedBy?: string;
}

/** Collection of tests */
export type PagedTestOutput = Paged<TestOutput>;
/** Collection of files. */
export type PagedFileInfoOutput = Paged<FileInfoOutput>;
/** Collection of test runs */
export type PagedTestRunOutput = Paged<TestRunOutput>;
/** The response to a metrics query. */
export type PagedTimeSeriesElementOutput = Paged<TimeSeriesElementOutput>;
/** Paged collection of DimensionValueList items */
export type DimensionValueListListOutput = Paged<DimensionValueListOutput>;

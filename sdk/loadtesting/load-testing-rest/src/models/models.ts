// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ErrorModel } from "@azure-rest/core-client";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Load test model. */
export interface Test {
  /** Pass fail criteria for a test. */
  passFailCriteria?: PassFailCriteria;
  /** Auto stop criteria for a test. This will automatically stop a load test if the error percentage is high for a certain time window. */
  autoStopCriteria?: AutoStopCriteria;
  /**
   * Secrets can be stored in an Azure Key Vault or any other secret store. If the
   * secret is stored in an Azure Key Vault, the value should be the secret
   * identifier and the type should be AKV_SECRET_URI. If the secret is stored
   * elsewhere, the secret value should be provided directly and the type should be
   * SECRET_VALUE.
   */
  secrets?: Record<string, Secret>;
  /** Certificates metadata. */
  certificate?: CertificateMetadata;
  /** Environment variables which are defined as a set of <name,value> pairs. */
  environmentVariables?: Record<string, string>;
  /** The load test configuration. */
  loadTestConfiguration?: LoadTestConfiguration;
  /** Id of the test run to be marked as baseline to view trends of client-side metrics from recent test runs */
  baselineTestRunId?: string;
  /** The input artifacts for the test. */
  readonly inputArtifacts?: TestInputArtifacts;
  /** Unique test identifier for the load test, must contain only lower-case alphabetic, numeric, underscore or hyphen characters. */
  readonly testId: string;
  /** The test description. */
  description?: string;
  /** Display name of a test. */
  displayName?: string;
  /** Subnet ID on which the load test instances should run. */
  subnetId?: string;
  /** Kind of test. */
  kind?: TestKind;
  /** Inject load test engines without deploying public IP for outbound access */
  publicIPDisabled?: boolean;
  /** Type of the managed identity referencing the Key vault. */
  keyvaultReferenceIdentityType?: string;
  /** Resource Id of the managed identity referencing the Key vault. */
  keyvaultReferenceIdentityId?: string;
  /** Type of the managed identity referencing the metrics. */
  metricsReferenceIdentityType?: ManagedIdentityType;
  /** Resource Id of the managed identity referencing the metrics. */
  metricsReferenceIdentityId?: string;
  /** Type of the managed identity built in load test engines */
  engineBuiltInIdentityType?: ManagedIdentityType;
  /** Resource Ids of the managed identity built in to load test engines. Required if engineBuiltInIdentityType is UserAssigned. */
  engineBuiltInIdentityIds?: string[];
  /** Estimated virtual user hours for the test. */
  readonly estimatedVirtualUserHours?: number;
  /** Preferences for the test. */
  preferences?: TestPreferences;
  /** The creation datetime(RFC 3339 literal format). */
  readonly createdDateTime?: Date;
  /** The user that created. */
  readonly createdBy?: string;
  /** The last Modified datetime(RFC 3339 literal format). */
  readonly lastModifiedDateTime?: Date;
  /** The user that last modified. */
  readonly lastModifiedBy?: string;
}

export function testSerializer(item: Test): any {
  return {
    passFailCriteria: !item["passFailCriteria"]
      ? item["passFailCriteria"]
      : passFailCriteriaSerializer(item["passFailCriteria"]),
    autoStopCriteria: !item["autoStopCriteria"]
      ? item["autoStopCriteria"]
      : autoStopCriteriaSerializer(item["autoStopCriteria"]),
    secrets: !item["secrets"] ? item["secrets"] : secretRecordSerializer(item["secrets"]),
    certificate: !item["certificate"]
      ? item["certificate"]
      : certificateMetadataSerializer(item["certificate"]),
    environmentVariables: item["environmentVariables"],
    loadTestConfiguration: !item["loadTestConfiguration"]
      ? item["loadTestConfiguration"]
      : loadTestConfigurationSerializer(item["loadTestConfiguration"]),
    baselineTestRunId: item["baselineTestRunId"],
    description: item["description"],
    displayName: item["displayName"],
    subnetId: item["subnetId"],
    kind: item["kind"],
    publicIPDisabled: item["publicIPDisabled"],
    keyvaultReferenceIdentityType: item["keyvaultReferenceIdentityType"],
    keyvaultReferenceIdentityId: item["keyvaultReferenceIdentityId"],
    metricsReferenceIdentityType: item["metricsReferenceIdentityType"],
    metricsReferenceIdentityId: item["metricsReferenceIdentityId"],
    engineBuiltInIdentityType: item["engineBuiltInIdentityType"],
    engineBuiltInIdentityIds: !item["engineBuiltInIdentityIds"]
      ? item["engineBuiltInIdentityIds"]
      : item["engineBuiltInIdentityIds"].map((p: any) => {
          return p;
        }),
    preferences: !item["preferences"]
      ? item["preferences"]
      : testPreferencesSerializer(item["preferences"]),
  };
}

export function testDeserializer(item: any): Test {
  return {
    passFailCriteria: !item["passFailCriteria"]
      ? item["passFailCriteria"]
      : passFailCriteriaDeserializer(item["passFailCriteria"]),
    autoStopCriteria: !item["autoStopCriteria"]
      ? item["autoStopCriteria"]
      : autoStopCriteriaDeserializer(item["autoStopCriteria"]),
    secrets: !item["secrets"] ? item["secrets"] : secretRecordDeserializer(item["secrets"]),
    certificate: !item["certificate"]
      ? item["certificate"]
      : certificateMetadataDeserializer(item["certificate"]),
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : Object.fromEntries(
          Object.entries(item["environmentVariables"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    loadTestConfiguration: !item["loadTestConfiguration"]
      ? item["loadTestConfiguration"]
      : loadTestConfigurationDeserializer(item["loadTestConfiguration"]),
    baselineTestRunId: item["baselineTestRunId"],
    inputArtifacts: !item["inputArtifacts"]
      ? item["inputArtifacts"]
      : testInputArtifactsDeserializer(item["inputArtifacts"]),
    testId: item["testId"],
    description: item["description"],
    displayName: item["displayName"],
    subnetId: item["subnetId"],
    kind: item["kind"],
    publicIPDisabled: item["publicIPDisabled"],
    keyvaultReferenceIdentityType: item["keyvaultReferenceIdentityType"],
    keyvaultReferenceIdentityId: item["keyvaultReferenceIdentityId"],
    metricsReferenceIdentityType: item["metricsReferenceIdentityType"],
    metricsReferenceIdentityId: item["metricsReferenceIdentityId"],
    engineBuiltInIdentityType: item["engineBuiltInIdentityType"],
    engineBuiltInIdentityIds: !item["engineBuiltInIdentityIds"]
      ? item["engineBuiltInIdentityIds"]
      : item["engineBuiltInIdentityIds"].map((p: any) => {
          return p;
        }),
    estimatedVirtualUserHours: item["estimatedVirtualUserHours"],
    preferences: !item["preferences"]
      ? item["preferences"]
      : testPreferencesDeserializer(item["preferences"]),
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    createdBy: item["createdBy"],
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    lastModifiedBy: item["lastModifiedBy"],
  };
}

/** Pass fail criteria for a test. */
export interface PassFailCriteria {
  /** Map of id and pass fail metrics { id  : pass fail metrics }. */
  passFailMetrics?: Record<string, PassFailMetric>;
  /** Map of id and pass fail server metrics { id  : pass fail metrics }. */
  passFailServerMetrics?: Record<string, PassFailServerMetric>;
}

export function passFailCriteriaSerializer(item: PassFailCriteria): any {
  return {
    passFailMetrics: !item["passFailMetrics"]
      ? item["passFailMetrics"]
      : passFailMetricRecordSerializer(item["passFailMetrics"]),
    passFailServerMetrics: !item["passFailServerMetrics"]
      ? item["passFailServerMetrics"]
      : passFailServerMetricRecordSerializer(item["passFailServerMetrics"]),
  };
}

export function passFailCriteriaDeserializer(item: any): PassFailCriteria {
  return {
    passFailMetrics: !item["passFailMetrics"]
      ? item["passFailMetrics"]
      : passFailMetricRecordDeserializer(item["passFailMetrics"]),
    passFailServerMetrics: !item["passFailServerMetrics"]
      ? item["passFailServerMetrics"]
      : passFailServerMetricRecordDeserializer(item["passFailServerMetrics"]),
  };
}

export function passFailMetricRecordSerializer(
  item: Record<string, PassFailMetric>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : passFailMetricSerializer(item[key]);
  });
  return result;
}

export function passFailMetricRecordDeserializer(
  item: Record<string, any>,
): Record<string, PassFailMetric> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : passFailMetricDeserializer(item[key]);
  });
  return result;
}

/** Pass fail metric */
export interface PassFailMetric {
  /** The client metric on which the criteria should be applied. */
  clientMetric?: PFMetrics;
  /**
   * The aggregation function to be applied on the client metric. Allowed functions
   * - ‘percentage’ - for error metric , ‘avg’, percentiles like ‘p50’, ‘p90’, & so on, ‘min’,
   * ‘max’ - for response_time_ms and latency metric, ‘avg’ - for requests_per_sec,
   * ‘count’ - for requests
   */
  aggregate?: PassFailAggregationFunction;
  /** The comparison operator. Supported types ‘>’, ‘<’ */
  condition?: string;
  /** Request name for which the Pass fail criteria has to be applied */
  requestName?: string;
  /**
   * The value to compare with the client metric. Allowed values - ‘error : [0.0 ,
   * 100.0] unit- % ’, response_time_ms and latency : any integer value unit- ms.
   */
  value?: number;
  /** Action taken after the threshold is met. Default is ‘continue’. */
  action?: PassFailAction;
  /** The actual value of the client metric for the test run. */
  readonly actualValue?: number;
  /** Outcome of the test run. */
  readonly result?: PassFailResult;
}

export function passFailMetricSerializer(item: PassFailMetric): any {
  return {
    clientMetric: item["clientMetric"],
    aggregate: item["aggregate"],
    condition: item["condition"],
    requestName: item["requestName"],
    value: item["value"],
    action: item["action"],
  };
}

export function passFailMetricDeserializer(item: any): PassFailMetric {
  return {
    clientMetric: item["clientMetric"],
    aggregate: item["aggregate"],
    condition: item["condition"],
    requestName: item["requestName"],
    value: item["value"],
    action: item["action"],
    actualValue: item["actualValue"],
    result: item["result"],
  };
}

/** Metrics for pass/fail criteria. */
export type PFMetrics = "response_time_ms" | "latency" | "error" | "requests" | "requests_per_sec";
/** Aggregation functions for pass/fail criteria. */
export type PassFailAggregationFunction =
  | "count"
  | "percentage"
  | "avg"
  | "p50"
  | "p75"
  | "p90"
  | "p95"
  | "p96"
  | "p97"
  | "p98"
  | "p99"
  | "p99.9"
  | "p99.99"
  | "min"
  | "max";
/** Action to take on failure of pass/fail criteria. */
export type PassFailAction = "continue" | "stop";
/** Pass/fail criteria result. */
export type PassFailResult = "passed" | "undetermined" | "failed";

export function passFailServerMetricRecordSerializer(
  item: Record<string, PassFailServerMetric>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : passFailServerMetricSerializer(item[key]);
  });
  return result;
}

export function passFailServerMetricRecordDeserializer(
  item: Record<string, any>,
): Record<string, PassFailServerMetric> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : passFailServerMetricDeserializer(item[key]);
  });
  return result;
}

/** Pass fail server metric */
export interface PassFailServerMetric {
  /** The resource id of the resource emitting the metric. */
  resourceId: string;
  /** The server metric namespace. */
  metricNamespace: string;
  /** The server metric name. */
  metricName: string;
  /** Aggregation Type */
  aggregation: string;
  /** The comparison operator. Supported types ‘>’, ‘<’ */
  condition: string;
  /** The value to compare with the server metric. */
  value: number;
  /** Action taken after the threshold is met. Default is ‘continue’. */
  action?: PassFailAction;
  /** The actual value of the server metric */
  readonly actualValue?: number;
  /** Outcome of the test run. */
  readonly result?: PassFailResult;
}

export function passFailServerMetricSerializer(item: PassFailServerMetric): any {
  return {
    resourceId: item["resourceId"],
    metricNamespace: item["metricNamespace"],
    metricName: item["metricName"],
    aggregation: item["aggregation"],
    condition: item["condition"],
    value: item["value"],
    action: item["action"],
  };
}

export function passFailServerMetricDeserializer(item: any): PassFailServerMetric {
  return {
    resourceId: item["resourceId"],
    metricNamespace: item["metricNamespace"],
    metricName: item["metricName"],
    aggregation: item["aggregation"],
    condition: item["condition"],
    value: item["value"],
    action: item["action"],
    actualValue: item["actualValue"],
    result: item["result"],
  };
}

/** Auto stop criteria for a test. This will automatically stop a load test if the error percentage is high for a certain time window. */
export interface AutoStopCriteria {
  /** Whether auto-stop should be disabled. The default value is false. */
  autoStopDisabled?: boolean;
  /** Threshold percentage of errors on which test run should be automatically stopped. Allowed values are in range of 0.0-100.0 */
  errorRate?: number;
  /** Time window during which the error percentage should be evaluated in seconds. */
  errorRateTimeWindowInSeconds?: number;
  /** Maximum number of virtual users per load testing engine, at which the test run should be automatically stopped. */
  maximumVirtualUsersPerEngine?: number;
}

export function autoStopCriteriaSerializer(item: AutoStopCriteria): any {
  return {
    autoStopDisabled: item["autoStopDisabled"],
    errorRate: item["errorRate"],
    errorRateTimeWindowInSeconds: item["errorRateTimeWindowInSeconds"],
    maximumVirtualUsersPerEngine: item["maximumVirtualUsersPerEngine"],
  };
}

export function autoStopCriteriaDeserializer(item: any): AutoStopCriteria {
  return {
    autoStopDisabled: item["autoStopDisabled"],
    errorRate: item["errorRate"],
    errorRateTimeWindowInSeconds: item["errorRateTimeWindowInSeconds"],
    maximumVirtualUsersPerEngine: item["maximumVirtualUsersPerEngine"],
  };
}

export function secretRecordSerializer(item: Record<string, Secret>): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : secretSerializer(item[key]);
  });
  return result;
}

export function secretRecordDeserializer(item: Record<string, any>): Record<string, Secret> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : secretDeserializer(item[key]);
  });
  return result;
}

/** Secret */
export interface Secret {
  /** The value of the secret for the respective type */
  value?: string;
  /** Type of secret */
  type?: SecretType;
}

export function secretSerializer(item: Secret): any {
  return { value: item["value"], type: item["type"] };
}

export function secretDeserializer(item: any): Secret {
  return {
    value: item["value"],
    type: item["type"],
  };
}

/** Types of secrets supported. */
export type SecretType = "AKV_SECRET_URI" | "SECRET_VALUE";

/** Certificates metadata */
export interface CertificateMetadata {
  /** The value of the certificate for respective type */
  value?: string;
  /** Type of certificate */
  type?: CertificateType;
  /** Name of the certificate. */
  name?: string;
}

export function certificateMetadataSerializer(item: CertificateMetadata): any {
  return { value: item["value"], type: item["type"], name: item["name"] };
}

export function certificateMetadataDeserializer(item: any): CertificateMetadata {
  return {
    value: item["value"],
    type: item["type"],
    name: item["name"],
  };
}

/** Types of certificates supported. */
export type CertificateType = "AKV_CERT_URI";

/** Configurations for the load test. */
export interface LoadTestConfiguration {
  /** The number of engine instances to execute load test. Supported values are in range of 1-400. Required for creating a new test. */
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
  /** Configuration for quick load test */
  optionalLoadTestConfig?: OptionalLoadTestConfiguration;
  /** Region distribution configuration for the load test. */
  regionalLoadTestConfig?: RegionalConfiguration[];
}

export function loadTestConfigurationSerializer(item: LoadTestConfiguration): any {
  return {
    engineInstances: item["engineInstances"],
    splitAllCSVs: item["splitAllCSVs"],
    quickStartTest: item["quickStartTest"],
    optionalLoadTestConfig: !item["optionalLoadTestConfig"]
      ? item["optionalLoadTestConfig"]
      : optionalLoadTestConfigurationSerializer(item["optionalLoadTestConfig"]),
    regionalLoadTestConfig: !item["regionalLoadTestConfig"]
      ? item["regionalLoadTestConfig"]
      : regionalConfigurationArraySerializer(item["regionalLoadTestConfig"]),
  };
}

export function loadTestConfigurationDeserializer(item: any): LoadTestConfiguration {
  return {
    engineInstances: item["engineInstances"],
    splitAllCSVs: item["splitAllCSVs"],
    quickStartTest: item["quickStartTest"],
    optionalLoadTestConfig: !item["optionalLoadTestConfig"]
      ? item["optionalLoadTestConfig"]
      : optionalLoadTestConfigurationDeserializer(item["optionalLoadTestConfig"]),
    regionalLoadTestConfig: !item["regionalLoadTestConfig"]
      ? item["regionalLoadTestConfig"]
      : regionalConfigurationArrayDeserializer(item["regionalLoadTestConfig"]),
  };
}

/** Configuration for quick load test */
export interface OptionalLoadTestConfiguration {
  /** Test URL. Provide the complete HTTP URL. For example, https://contoso-app.azurewebsites.net/login */
  endpointUrl?: string;
  /** Target throughput (requests per second). This may not be necessarily achieved. The actual throughput will be lower if the application is not capable of handling it. */
  requestsPerSecond?: number;
  /** Maximum response time in milliseconds of the API/endpoint. */
  maxResponseTimeInMs?: number;
  /** No of concurrent virtual users. */
  virtualUsers?: number;
  /** Ramp up time in seconds. */
  rampUpTime?: number;
  /** Test run duration in seconds. */
  duration?: number;
}

export function optionalLoadTestConfigurationSerializer(item: OptionalLoadTestConfiguration): any {
  return {
    endpointUrl: item["endpointUrl"],
    requestsPerSecond: item["requestsPerSecond"],
    maxResponseTimeInMs: item["maxResponseTimeInMs"],
    virtualUsers: item["virtualUsers"],
    rampUpTime: item["rampUpTime"],
    duration: item["duration"],
  };
}

export function optionalLoadTestConfigurationDeserializer(
  item: any,
): OptionalLoadTestConfiguration {
  return {
    endpointUrl: item["endpointUrl"],
    requestsPerSecond: item["requestsPerSecond"],
    maxResponseTimeInMs: item["maxResponseTimeInMs"],
    virtualUsers: item["virtualUsers"],
    rampUpTime: item["rampUpTime"],
    duration: item["duration"],
  };
}

export function regionalConfigurationArraySerializer(result: Array<RegionalConfiguration>): any[] {
  return result.map((item) => {
    return regionalConfigurationSerializer(item);
  });
}

export function regionalConfigurationArrayDeserializer(
  result: Array<RegionalConfiguration>,
): any[] {
  return result.map((item) => {
    return regionalConfigurationDeserializer(item);
  });
}

/** Region distribution configuration for the load test. */
export interface RegionalConfiguration {
  /**   The number of engine instances to execute load test in specified region. Supported values are in range of 1-400. */
  engineInstances: number;
  /**
   * Azure region name.
   * The region name should of format accepted by ARM, and should be a region supported by Azure Load Testing. For example, East US should be passed as "eastus".
   * The region name must match one of the strings in the "Name" column returned from running the "az account list-locations -o table" Azure CLI command.
   */
  region: string;
}

export function regionalConfigurationSerializer(item: RegionalConfiguration): any {
  return { engineInstances: item["engineInstances"], region: item["region"] };
}

export function regionalConfigurationDeserializer(item: any): RegionalConfiguration {
  return {
    engineInstances: item["engineInstances"],
    region: item["region"],
  };
}

/** The input artifacts for the test. */
export interface TestInputArtifacts {
  /** The load test YAML file that contains the the test configuration */
  configFileInfo?: TestFileInfo;
  /** The test script file for the test run */
  testScriptFileInfo?: TestFileInfo;
  /** The user properties file */
  userPropFileInfo?: TestFileInfo;
  /** The zip file with all input artifacts */
  inputArtifactsZipFileInfo?: TestFileInfo;
  /** The config json file for url based test */
  urlTestConfigFileInfo?: TestFileInfo;
  /** Additional supported files for the test run */
  readonly additionalFileInfo?: TestFileInfo[];
}

export function testInputArtifactsDeserializer(item: any): TestInputArtifacts {
  return {
    configFileInfo: !item["configFileInfo"]
      ? item["configFileInfo"]
      : testFileInfoDeserializer(item["configFileInfo"]),
    testScriptFileInfo: !item["testScriptFileInfo"]
      ? item["testScriptFileInfo"]
      : testFileInfoDeserializer(item["testScriptFileInfo"]),
    userPropFileInfo: !item["userPropFileInfo"]
      ? item["userPropFileInfo"]
      : testFileInfoDeserializer(item["userPropFileInfo"]),
    inputArtifactsZipFileInfo: !item["inputArtifactsZipFileInfo"]
      ? item["inputArtifactsZipFileInfo"]
      : testFileInfoDeserializer(item["inputArtifactsZipFileInfo"]),
    urlTestConfigFileInfo: !item["urlTestConfigFileInfo"]
      ? item["urlTestConfigFileInfo"]
      : testFileInfoDeserializer(item["urlTestConfigFileInfo"]),
    additionalFileInfo: !item["additionalFileInfo"]
      ? item["additionalFileInfo"]
      : testFileInfoArrayDeserializer(item["additionalFileInfo"]),
  };
}

/** Test file info. */
export interface TestFileInfo {
  /** Name of the file. */
  fileName: string;
  /** File URL. */
  readonly url?: string;
  /** File type */
  readonly fileType?: FileType;
  /** Expiry time of the file (RFC 3339 literal format) */
  readonly expireDateTime?: Date;
  /** Validation status of the file */
  readonly validationStatus?: FileValidationStatus;
  /** Validation failure error details */
  readonly validationFailureDetails?: string;
}

export function testFileInfoDeserializer(item: any): TestFileInfo {
  return {
    fileName: item["fileName"],
    url: item["url"],
    fileType: item["fileType"],
    expireDateTime: !item["expireDateTime"]
      ? item["expireDateTime"]
      : new Date(item["expireDateTime"]),
    validationStatus: item["validationStatus"],
    validationFailureDetails: item["validationFailureDetails"],
  };
}

/** Types of file supported. */
export type FileType =
  | "JMX_FILE"
  | "USER_PROPERTIES"
  | "ADDITIONAL_ARTIFACTS"
  | "ZIPPED_ARTIFACTS"
  | "URL_TEST_CONFIG"
  | "TEST_SCRIPT"
  | "BROWSER_RECORDING"
  | "TEST_PLAN_RECOMMENDATIONS";
/** File status. */
export type FileValidationStatus =
  | "NOT_VALIDATED"
  | "VALIDATION_SUCCESS"
  | "VALIDATION_FAILURE"
  | "VALIDATION_INITIATED"
  | "VALIDATION_NOT_REQUIRED";

export function testFileInfoArrayDeserializer(result: Array<TestFileInfo>): any[] {
  return result.map((item) => {
    return testFileInfoDeserializer(item);
  });
}

/** Test kind */
export type TestKind = "URL" | "JMX" | "Locust";
/** Managed identity type. */
export type ManagedIdentityType = "SystemAssigned" | "UserAssigned";

/** Preferences for the test. */
export interface TestPreferences {
  /** Enable or disable AI based insights on Test Run Errors. */
  enableAIErrorInsights?: boolean;
}

export function testPreferencesSerializer(item: TestPreferences): any {
  return { enableAIErrorInsights: item["enableAIErrorInsights"] };
}

export function testPreferencesDeserializer(item: any): TestPreferences {
  return {
    enableAIErrorInsights: item["enableAIErrorInsights"],
  };
}

/** Test app components */
export interface TestAppComponents {
  /**
   * Azure resource collection { resource id (fully qualified resource Id e.g
   * subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName})
   * : resource object }
   */
  components: Record<string, AppComponent>;
  /** Test identifier */
  readonly testId?: string;
  /** The creation datetime(RFC 3339 literal format). */
  readonly createdDateTime?: Date;
  /** The user that created. */
  readonly createdBy?: string;
  /** The last Modified datetime(RFC 3339 literal format). */
  readonly lastModifiedDateTime?: Date;
  /** The user that last modified. */
  readonly lastModifiedBy?: string;
}

export function testAppComponentsSerializer(item: TestAppComponents): any {
  return { components: appComponentRecordSerializer(item["components"]) };
}

export function testAppComponentsDeserializer(item: any): TestAppComponents {
  return {
    components: appComponentRecordDeserializer(item["components"]),
    testId: item["testId"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    createdBy: item["createdBy"],
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    lastModifiedBy: item["lastModifiedBy"],
  };
}

export function appComponentRecordSerializer(
  item: Record<string, AppComponent>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : appComponentSerializer(item[key]);
  });
  return result;
}

export function appComponentRecordDeserializer(
  item: Record<string, any>,
): Record<string, AppComponent> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : appComponentDeserializer(item[key]);
  });
  return result;
}

/** An Azure resource object (Refer azure generic resource model :https://learn.microsoft.com/en-us/rest/api/resources/resources/get-by-id#genericresource) */
export interface AppComponent {
  /** fully qualified resource Id e.g subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName} */
  readonly resourceId: string;
  /** Azure resource name, required while creating the app component. */
  resourceName: string;
  /** Azure resource type, required while creating the app component. */
  resourceType: string;
  /** Azure resource display name */
  displayName?: string;
  /** Resource group name of the Azure resource */
  readonly resourceGroup?: string;
  /** Subscription Id of the Azure resource */
  readonly subscriptionId?: string;
  /** Kind of Azure resource type */
  kind?: string;
}

export function appComponentSerializer(item: AppComponent): any {
  return {
    resourceName: item["resourceName"],
    resourceType: item["resourceType"],
    displayName: item["displayName"],
    kind: item["kind"],
  };
}

export function appComponentDeserializer(item: any): AppComponent {
  return {
    resourceId: item["resourceId"],
    resourceName: item["resourceName"],
    resourceType: item["resourceType"],
    displayName: item["displayName"],
    resourceGroup: item["resourceGroup"],
    subscriptionId: item["subscriptionId"],
    kind: item["kind"],
  };
}

/** Test server metrics configuration */
export interface TestServerMetricsConfiguration {
  /** Test identifier */
  readonly testId?: string;
  /**
   * Azure resource metrics collection {metric id : metrics object} (Refer :
   * https://learn.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition
   * for metric id).
   */
  metrics: Record<string, ResourceMetric>;
  /** The creation datetime(RFC 3339 literal format). */
  readonly createdDateTime?: Date;
  /** The user that created. */
  readonly createdBy?: string;
  /** The last Modified datetime(RFC 3339 literal format). */
  readonly lastModifiedDateTime?: Date;
  /** The user that last modified. */
  readonly lastModifiedBy?: string;
}

export function testServerMetricsConfigurationSerializer(
  item: TestServerMetricsConfiguration,
): any {
  return { metrics: resourceMetricRecordSerializer(item["metrics"]) };
}

export function testServerMetricsConfigurationDeserializer(
  item: any,
): TestServerMetricsConfiguration {
  return {
    testId: item["testId"],
    metrics: resourceMetricRecordDeserializer(item["metrics"]),
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    createdBy: item["createdBy"],
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    lastModifiedBy: item["lastModifiedBy"],
  };
}

export function resourceMetricRecordSerializer(
  item: Record<string, ResourceMetric>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : resourceMetricSerializer(item[key]);
  });
  return result;
}

export function resourceMetricRecordDeserializer(
  item: Record<string, any>,
): Record<string, ResourceMetric> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : resourceMetricDeserializer(item[key]);
  });
  return result;
}

/**
 * Associated metric definition for particular metrics of the azure resource (
 * Refer :
 * https://learn.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition).
 */
export interface ResourceMetric {
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

export function resourceMetricSerializer(item: ResourceMetric): any {
  return {
    resourceId: item["resourceId"],
    metricNamespace: item["metricNamespace"],
    displayDescription: item["displayDescription"],
    name: item["name"],
    aggregation: item["aggregation"],
    unit: item["unit"],
    resourceType: item["resourceType"],
  };
}

export function resourceMetricDeserializer(item: any): ResourceMetric {
  return {
    id: item["id"],
    resourceId: item["resourceId"],
    metricNamespace: item["metricNamespace"],
    displayDescription: item["displayDescription"],
    name: item["name"],
    aggregation: item["aggregation"],
    unit: item["unit"],
    resourceType: item["resourceType"],
  };
}

/** Paged collection of TestFileInfo items */
export interface _PagedTestFileInfo {
  /** The TestFileInfo items on this page */
  value: TestFileInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedTestFileInfoDeserializer(item: any): _PagedTestFileInfo {
  return {
    value: testFileInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Paged collection of Test items */
export interface _PagedTest {
  /** The Test items on this page */
  value: Test[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedTestDeserializer(item: any): _PagedTest {
  return {
    value: testArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function testArraySerializer(result: Array<Test>): any[] {
  return result.map((item) => {
    return testSerializer(item);
  });
}

export function testArrayDeserializer(result: Array<Test>): any[] {
  return result.map((item) => {
    return testDeserializer(item);
  });
}

/** Trigger model. */
export interface Trigger {
  /** The unique identifier of the trigger. */
  readonly triggerId: string;
  /** The name of the trigger. */
  displayName: string;
  /** The description of the trigger. */
  description?: string;
  /** The type of the trigger. */
  /** The discriminator possible values: ScheduleTestsTrigger */
  kind: TriggerType;
  /** The current state of the trigger. */
  state?: TriggerState;
  /** Details of current state of the trigger. */
  readonly stateDetails?: StateDetails;
  /** The creation datetime(RFC 3339 literal format). */
  readonly createdDateTime?: Date;
  /** The user that created. */
  readonly createdBy?: string;
  /** The last Modified datetime(RFC 3339 literal format). */
  readonly lastModifiedDateTime?: Date;
  /** The user that last modified. */
  readonly lastModifiedBy?: string;
}

export function triggerSerializer(item: Trigger): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    kind: item["kind"],
    state: item["state"],
  };
}

export function triggerDeserializer(item: any): Trigger {
  return {
    triggerId: item["triggerId"],
    displayName: item["displayName"],
    description: item["description"],
    kind: item["kind"],
    state: item["state"],
    stateDetails: !item["stateDetails"]
      ? item["stateDetails"]
      : stateDetailsDeserializer(item["stateDetails"]),
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    createdBy: item["createdBy"],
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    lastModifiedBy: item["lastModifiedBy"],
  };
}

/** Alias for TriggerUnion */
export type TriggerUnion = ScheduleTestsTrigger | Trigger;

export function triggerUnionSerializer(item: TriggerUnion): any {
  switch (item.kind) {
    case "ScheduleTestsTrigger":
      return scheduleTestsTriggerSerializer(item as ScheduleTestsTrigger);

    default:
      return triggerSerializer(item);
  }
}

export function triggerUnionDeserializer(item: any): TriggerUnion {
  switch (item["kind"]) {
    case "ScheduleTestsTrigger":
      return scheduleTestsTriggerDeserializer(item as ScheduleTestsTrigger);

    default:
      return triggerDeserializer(item);
  }
}

/** Type of a trigger. */
export type TriggerType = "ScheduleTestsTrigger";
/** Current state of a trigger. */
export type TriggerState = "Active" | "Paused" | "Completed" | "Disabled";

/** State details of the trigger. */
export interface StateDetails {
  /** The error message if the trigger is in disabled state. */
  message?: string;
}

export function stateDetailsDeserializer(item: any): StateDetails {
  return {
    message: item["message"],
  };
}

/** ScheduleTestsTrigger model. */
export interface ScheduleTestsTrigger extends Trigger {
  /** The type of the trigger is ScheduleTestsTrigger. */
  kind: "ScheduleTestsTrigger";
  /** The test id of test to be triggered by this schedule trigger. Currently only one test is supported for a trigger. */
  testIds: string[];
  /** Start date time of the trigger in UTC timezone. (RFC 3339 literal format) */
  startDateTime?: Date;
  /** The current recurrence status of the trigger, including remaining occurrences and next scheduled execution times. */
  readonly recurrenceStatus?: RecurrenceStatus;
  /** Recurrence details of the trigger. Null if schedule is not recurring. */
  recurrence?: RecurrenceUnion;
}

export function scheduleTestsTriggerSerializer(item: ScheduleTestsTrigger): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    kind: item["kind"],
    state: item["state"],
    testIds: item["testIds"].map((p: any) => {
      return p;
    }),
    startDateTime: !item["startDateTime"]
      ? item["startDateTime"]
      : item["startDateTime"].toISOString(),
    recurrence: !item["recurrence"]
      ? item["recurrence"]
      : recurrenceUnionSerializer(item["recurrence"]),
  };
}

export function scheduleTestsTriggerDeserializer(item: any): ScheduleTestsTrigger {
  return {
    triggerId: item["triggerId"],
    displayName: item["displayName"],
    description: item["description"],
    kind: item["kind"],
    state: item["state"],
    stateDetails: !item["stateDetails"]
      ? item["stateDetails"]
      : stateDetailsDeserializer(item["stateDetails"]),
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    createdBy: item["createdBy"],
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    lastModifiedBy: item["lastModifiedBy"],
    testIds: item["testIds"].map((p: any) => {
      return p;
    }),
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    recurrenceStatus: !item["recurrenceStatus"]
      ? item["recurrenceStatus"]
      : recurrenceStatusDeserializer(item["recurrenceStatus"]),
    recurrence: !item["recurrence"]
      ? item["recurrence"]
      : recurrenceUnionDeserializer(item["recurrence"]),
  };
}

/** Actual state of the recurrence for the trigger. */
export interface RecurrenceStatus {
  /** The number of occurrences remaining for the trigger. Null if recurrence end has end date instead of number of occurrences. */
  remainingOccurrences?: number;
  /** The next three execution times of the trigger. (RFC 3339 literal format) */
  nextScheduledDateTimes?: Date[];
}

export function recurrenceStatusDeserializer(item: any): RecurrenceStatus {
  return {
    remainingOccurrences: item["remainingOccurrences"],
    nextScheduledDateTimes: !item["nextScheduledDateTimes"]
      ? item["nextScheduledDateTimes"]
      : item["nextScheduledDateTimes"].map((p: any) => {
          return new Date(p);
        }),
  };
}

/** Recurrence model. */
export interface Recurrence {
  /** Frequency of the recurrence. */
  /** The discriminator possible values: Daily, Hourly, MonthlyByDays, MonthlyByDates, Cron, Weekly */
  frequency: Frequency;
  /** Recurrence end model. You can specify the end either by providing a numberOfOccurrences (which will end the recurrence after the specified number of occurrences) or by providing an endDateTime (which will end the recurrence after the specified date). If neither value is provided, the recurrence will continue until it is manually ended. However, if both values are provided, an error will be thrown. */
  recurrenceEnd?: RecurrenceEnd;
}

export function recurrenceSerializer(item: Recurrence): any {
  return {
    frequency: item["frequency"],
    recurrenceEnd: !item["recurrenceEnd"]
      ? item["recurrenceEnd"]
      : recurrenceEndSerializer(item["recurrenceEnd"]),
  };
}

export function recurrenceDeserializer(item: any): Recurrence {
  return {
    frequency: item["frequency"],
    recurrenceEnd: !item["recurrenceEnd"]
      ? item["recurrenceEnd"]
      : recurrenceEndDeserializer(item["recurrenceEnd"]),
  };
}

/** Alias for RecurrenceUnion */
export type RecurrenceUnion =
  | DailyRecurrence
  | HourlyRecurrence
  | MonthlyRecurrenceByWeekDays
  | MonthlyRecurrenceByDates
  | RecurrenceWithCron
  | WeeklyRecurrence
  | Recurrence;

export function recurrenceUnionSerializer(item: RecurrenceUnion): any {
  switch (item.frequency) {
    case "Daily":
      return dailyRecurrenceSerializer(item as DailyRecurrence);

    case "Hourly":
      return hourlyRecurrenceSerializer(item as HourlyRecurrence);

    case "MonthlyByDays":
      return monthlyRecurrenceByWeekDaysSerializer(item as MonthlyRecurrenceByWeekDays);

    case "MonthlyByDates":
      return monthlyRecurrenceByDatesSerializer(item as MonthlyRecurrenceByDates);

    case "Cron":
      return recurrenceWithCronSerializer(item as RecurrenceWithCron);

    case "Weekly":
      return weeklyRecurrenceSerializer(item as WeeklyRecurrence);

    default:
      return recurrenceSerializer(item);
  }
}

export function recurrenceUnionDeserializer(item: any): RecurrenceUnion {
  switch (item["frequency"]) {
    case "Daily":
      return dailyRecurrenceDeserializer(item as DailyRecurrence);

    case "Hourly":
      return hourlyRecurrenceDeserializer(item as HourlyRecurrence);

    case "MonthlyByDays":
      return monthlyRecurrenceByWeekDaysDeserializer(item as MonthlyRecurrenceByWeekDays);

    case "MonthlyByDates":
      return monthlyRecurrenceByDatesDeserializer(item as MonthlyRecurrenceByDates);

    case "Cron":
      return recurrenceWithCronDeserializer(item as RecurrenceWithCron);

    case "Weekly":
      return weeklyRecurrenceDeserializer(item as WeeklyRecurrence);

    default:
      return recurrenceDeserializer(item);
  }
}

/** Frequency of recurrence for a trigger. */
export type Frequency = "Cron" | "Hourly" | "Daily" | "Weekly" | "MonthlyByDays" | "MonthlyByDates";

/** Recurrence end model. Either provide numberOfOccurrences if you want recurrence to end after a specified number of occurrences or provide endDate if you want recurrence to end after a specified end date. If both values are provided, a validation error will be thrown indicating that only one field should be provided. If neither value is provided, the recurrence will end when manually ended. */
export interface RecurrenceEnd {
  /** Number of occurrences after which the recurrence will end. */
  numberOfOccurrences?: number;
  /** The date after which the recurrence will end. (RFC 3339 literal format) */
  endDateTime?: Date;
}

export function recurrenceEndSerializer(item: RecurrenceEnd): any {
  return {
    numberOfOccurrences: item["numberOfOccurrences"],
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : item["endDateTime"].toISOString(),
  };
}

export function recurrenceEndDeserializer(item: any): RecurrenceEnd {
  return {
    numberOfOccurrences: item["numberOfOccurrences"],
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
  };
}

/** Recurrence model when frequency is set as Daily. */
export interface DailyRecurrence extends Recurrence {
  /** Frequency of the day recurrence. */
  frequency: "Daily";
  /** The interval at which the recurrence should repeat. It signifies the number of days between each recurrence. */
  interval: number;
}

export function dailyRecurrenceSerializer(item: DailyRecurrence): any {
  return {
    frequency: item["frequency"],
    recurrenceEnd: !item["recurrenceEnd"]
      ? item["recurrenceEnd"]
      : recurrenceEndSerializer(item["recurrenceEnd"]),
    interval: item["interval"],
  };
}

export function dailyRecurrenceDeserializer(item: any): DailyRecurrence {
  return {
    frequency: item["frequency"],
    recurrenceEnd: !item["recurrenceEnd"]
      ? item["recurrenceEnd"]
      : recurrenceEndDeserializer(item["recurrenceEnd"]),
    interval: item["interval"],
  };
}

/** Recurrence model when frequency is set as Hourly. */
export interface HourlyRecurrence extends Recurrence {
  /** Frequency of the hour recurrence. */
  frequency: "Hourly";
  /** The interval at which the recurrence should repeat. It signifies the number of hours between each recurrence. */
  interval: number;
}

export function hourlyRecurrenceSerializer(item: HourlyRecurrence): any {
  return {
    frequency: item["frequency"],
    recurrenceEnd: !item["recurrenceEnd"]
      ? item["recurrenceEnd"]
      : recurrenceEndSerializer(item["recurrenceEnd"]),
    interval: item["interval"],
  };
}

export function hourlyRecurrenceDeserializer(item: any): HourlyRecurrence {
  return {
    frequency: item["frequency"],
    recurrenceEnd: !item["recurrenceEnd"]
      ? item["recurrenceEnd"]
      : recurrenceEndDeserializer(item["recurrenceEnd"]),
    interval: item["interval"],
  };
}

/** Recurrence model when frequency is set as MonthlyByDays . */
export interface MonthlyRecurrenceByWeekDays extends Recurrence {
  /** Frequency of the month recurrence. */
  frequency: "MonthlyByDays";
  /** Specific days of the week when the recurrence should repeat. */
  weekDaysInMonth?: WeekDays[];
  /** Index of the week in a month at which the recurrence should repeat. For example, if the index is '2', weekDay is 'Monday', interval is 3 and frequency is 'Month', the recurrence will run every second Monday of the month and repeat every 3 months. Value of index can be 1 to 5. */
  index: number;
  /** The interval at which the recurrence should repeat. It signifies the number of months between each recurrence. */
  interval: number;
}

export function monthlyRecurrenceByWeekDaysSerializer(item: MonthlyRecurrenceByWeekDays): any {
  return {
    frequency: item["frequency"],
    recurrenceEnd: !item["recurrenceEnd"]
      ? item["recurrenceEnd"]
      : recurrenceEndSerializer(item["recurrenceEnd"]),
    weekDaysInMonth: !item["weekDaysInMonth"]
      ? item["weekDaysInMonth"]
      : item["weekDaysInMonth"].map((p: any) => {
          return p;
        }),
    index: item["index"],
    interval: item["interval"],
  };
}

export function monthlyRecurrenceByWeekDaysDeserializer(item: any): MonthlyRecurrenceByWeekDays {
  return {
    frequency: item["frequency"],
    recurrenceEnd: !item["recurrenceEnd"]
      ? item["recurrenceEnd"]
      : recurrenceEndDeserializer(item["recurrenceEnd"]),
    weekDaysInMonth: !item["weekDaysInMonth"]
      ? item["weekDaysInMonth"]
      : item["weekDaysInMonth"].map((p: any) => {
          return p;
        }),
    index: item["index"],
    interval: item["interval"],
  };
}

/** Defines the days of the week. */
export type WeekDays =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

/** Recurrence model when frequency is set as MonthlyByDates. */
export interface MonthlyRecurrenceByDates extends Recurrence {
  /** Frequency of the month recurrence. */
  frequency: "MonthlyByDates";
  /** Recurrence set to repeat on the specified dates of the month. Value of dates can be 1 to 31 and -1. -1 represents the last day of the month. */
  datesInMonth?: number[];
  /** The interval at which the recurrence should repeat. It signifies the number of months between each recurrence. */
  interval?: number;
}

export function monthlyRecurrenceByDatesSerializer(item: MonthlyRecurrenceByDates): any {
  return {
    frequency: item["frequency"],
    recurrenceEnd: !item["recurrenceEnd"]
      ? item["recurrenceEnd"]
      : recurrenceEndSerializer(item["recurrenceEnd"]),
    datesInMonth: !item["datesInMonth"]
      ? item["datesInMonth"]
      : item["datesInMonth"].map((p: any) => {
          return p;
        }),
    interval: item["interval"],
  };
}

export function monthlyRecurrenceByDatesDeserializer(item: any): MonthlyRecurrenceByDates {
  return {
    frequency: item["frequency"],
    recurrenceEnd: !item["recurrenceEnd"]
      ? item["recurrenceEnd"]
      : recurrenceEndDeserializer(item["recurrenceEnd"]),
    datesInMonth: !item["datesInMonth"]
      ? item["datesInMonth"]
      : item["datesInMonth"].map((p: any) => {
          return p;
        }),
    interval: item["interval"],
  };
}

/** Recurrence is set based on cron expression. */
export interface RecurrenceWithCron extends Recurrence {
  /** Specify frequency using a cron expression. */
  frequency: "Cron";
  /** Cron expression for the recurrence. */
  cronExpression: string;
}

export function recurrenceWithCronSerializer(item: RecurrenceWithCron): any {
  return {
    frequency: item["frequency"],
    recurrenceEnd: !item["recurrenceEnd"]
      ? item["recurrenceEnd"]
      : recurrenceEndSerializer(item["recurrenceEnd"]),
    cronExpression: item["cronExpression"],
  };
}

export function recurrenceWithCronDeserializer(item: any): RecurrenceWithCron {
  return {
    frequency: item["frequency"],
    recurrenceEnd: !item["recurrenceEnd"]
      ? item["recurrenceEnd"]
      : recurrenceEndDeserializer(item["recurrenceEnd"]),
    cronExpression: item["cronExpression"],
  };
}

/** Recurrence model when frequency is set as weekly. */
export interface WeeklyRecurrence extends Recurrence {
  /** Frequency of the week recurrence. */
  frequency: "Weekly";
  /** Recurrence set to repeat on the specified days of the week. */
  daysOfWeek?: WeekDays[];
  /** The interval at which the recurrence should repeat. It signifies the number of weeks between each recurrence. */
  interval?: number;
}

export function weeklyRecurrenceSerializer(item: WeeklyRecurrence): any {
  return {
    frequency: item["frequency"],
    recurrenceEnd: !item["recurrenceEnd"]
      ? item["recurrenceEnd"]
      : recurrenceEndSerializer(item["recurrenceEnd"]),
    daysOfWeek: !item["daysOfWeek"]
      ? item["daysOfWeek"]
      : item["daysOfWeek"].map((p: any) => {
          return p;
        }),
    interval: item["interval"],
  };
}

export function weeklyRecurrenceDeserializer(item: any): WeeklyRecurrence {
  return {
    frequency: item["frequency"],
    recurrenceEnd: !item["recurrenceEnd"]
      ? item["recurrenceEnd"]
      : recurrenceEndDeserializer(item["recurrenceEnd"]),
    daysOfWeek: !item["daysOfWeek"]
      ? item["daysOfWeek"]
      : item["daysOfWeek"].map((p: any) => {
          return p;
        }),
    interval: item["interval"],
  };
}

/** Paged collection of Trigger items */
export interface _PagedTrigger {
  /** The Trigger items on this page */
  value: TriggerUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedTriggerDeserializer(item: any): _PagedTrigger {
  return {
    value: triggerUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function triggerUnionArraySerializer(result: Array<TriggerUnion>): any[] {
  return result.map((item) => {
    return triggerUnionSerializer(item);
  });
}

export function triggerUnionArrayDeserializer(result: Array<TriggerUnion>): any[] {
  return result.map((item) => {
    return triggerUnionDeserializer(item);
  });
}

/** Notification rule model. */
export interface NotificationRule {
  /** The unique identifier of the notification rule. */
  readonly notificationRuleId: string;
  /** The name of the notification rule. */
  displayName: string;
  /** The action groups to notify. */
  actionGroupIds: string[];
  /** The scope of the notification rule. */
  /** The discriminator possible values: Tests */
  scope: NotificationScopeType;
  /** The creation datetime(RFC 3339 literal format). */
  readonly createdDateTime?: Date;
  /** The user that created. */
  readonly createdBy?: string;
  /** The last Modified datetime(RFC 3339 literal format). */
  readonly lastModifiedDateTime?: Date;
  /** The user that last modified. */
  readonly lastModifiedBy?: string;
}

export function notificationRuleSerializer(item: NotificationRule): any {
  return {
    displayName: item["displayName"],
    actionGroupIds: item["actionGroupIds"].map((p: any) => {
      return p;
    }),
    scope: item["scope"],
  };
}

export function notificationRuleDeserializer(item: any): NotificationRule {
  return {
    notificationRuleId: item["notificationRuleId"],
    displayName: item["displayName"],
    actionGroupIds: item["actionGroupIds"].map((p: any) => {
      return p;
    }),
    scope: item["scope"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    createdBy: item["createdBy"],
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    lastModifiedBy: item["lastModifiedBy"],
  };
}

/** Alias for NotificationRuleUnion */
export type NotificationRuleUnion = TestsNotificationRule | NotificationRule;

export function notificationRuleUnionSerializer(item: NotificationRuleUnion): any {
  switch (item.scope) {
    case "Tests":
      return testsNotificationRuleSerializer(item as TestsNotificationRule);

    default:
      return notificationRuleSerializer(item);
  }
}

export function notificationRuleUnionDeserializer(item: any): NotificationRuleUnion {
  switch (item["scope"]) {
    case "Tests":
      return testsNotificationRuleDeserializer(item as TestsNotificationRule);

    default:
      return notificationRuleDeserializer(item);
  }
}

/** Scope type of a notification rule. */
export type NotificationScopeType = "Tests";

/** Tests Notification rule model. */
export interface TestsNotificationRule extends NotificationRule {
  /** Scope of type Tests. */
  scope: "Tests";
  /** The test ids to include. If not provided, notification will be sent for all testIds. */
  testIds?: string[];
  /**
   * The event to receive notifications for along with filtering conditions.
   * Key is a user-assigned identifier for the event filter.
   */
  eventFilters: Record<string, TestsNotificationEventFilterUnion>;
}

export function testsNotificationRuleSerializer(item: TestsNotificationRule): any {
  return {
    displayName: item["displayName"],
    actionGroupIds: item["actionGroupIds"].map((p: any) => {
      return p;
    }),
    scope: item["scope"],
    testIds: !item["testIds"]
      ? item["testIds"]
      : item["testIds"].map((p: any) => {
          return p;
        }),
    eventFilters: testsNotificationEventFilterUnionRecordSerializer(item["eventFilters"]),
  };
}

export function testsNotificationRuleDeserializer(item: any): TestsNotificationRule {
  return {
    notificationRuleId: item["notificationRuleId"],
    displayName: item["displayName"],
    actionGroupIds: item["actionGroupIds"].map((p: any) => {
      return p;
    }),
    scope: item["scope"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    createdBy: item["createdBy"],
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    lastModifiedBy: item["lastModifiedBy"],
    testIds: !item["testIds"]
      ? item["testIds"]
      : item["testIds"].map((p: any) => {
          return p;
        }),
    eventFilters: testsNotificationEventFilterUnionRecordDeserializer(item["eventFilters"]),
  };
}

export function testsNotificationEventFilterUnionRecordSerializer(
  item: Record<string, TestsNotificationEventFilter>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : testsNotificationEventFilterUnionSerializer(item[key]);
  });
  return result;
}

export function testsNotificationEventFilterUnionRecordDeserializer(
  item: Record<string, any>,
): Record<string, TestsNotificationEventFilter> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : testsNotificationEventFilterUnionDeserializer(item[key]);
  });
  return result;
}

/** The notification event filter for Tests scope. */
export interface TestsNotificationEventFilter {
  /** The event type */
  /** The discriminator possible values: TestRunEnded, TestRunStarted, TriggerCompleted, TriggerDisabled */
  kind: NotificationEventType;
}

export function testsNotificationEventFilterSerializer(item: TestsNotificationEventFilter): any {
  return { kind: item["kind"] };
}

export function testsNotificationEventFilterDeserializer(item: any): TestsNotificationEventFilter {
  return {
    kind: item["kind"],
  };
}

/** Alias for TestsNotificationEventFilterUnion */
export type TestsNotificationEventFilterUnion =
  | TestRunEndedNotificationEventFilter
  | TestRunStartedNotificationEventFilter
  | TriggerCompletedNotificationEventFilter
  | TriggerDisabledNotificationEventFilter
  | TestsNotificationEventFilter;

export function testsNotificationEventFilterUnionSerializer(
  item: TestsNotificationEventFilterUnion,
): any {
  switch (item.kind) {
    case "TestRunEnded":
      return testRunEndedNotificationEventFilterSerializer(
        item as TestRunEndedNotificationEventFilter,
      );

    case "TestRunStarted":
      return testRunStartedNotificationEventFilterSerializer(
        item as TestRunStartedNotificationEventFilter,
      );

    case "TriggerCompleted":
      return triggerCompletedNotificationEventFilterSerializer(
        item as TriggerCompletedNotificationEventFilter,
      );

    case "TriggerDisabled":
      return triggerDisabledNotificationEventFilterSerializer(
        item as TriggerDisabledNotificationEventFilter,
      );

    default:
      return testsNotificationEventFilterSerializer(item);
  }
}

export function testsNotificationEventFilterUnionDeserializer(
  item: any,
): TestsNotificationEventFilterUnion {
  switch (item["kind"]) {
    case "TestRunEnded":
      return testRunEndedNotificationEventFilterDeserializer(
        item as TestRunEndedNotificationEventFilter,
      );

    case "TestRunStarted":
      return testRunStartedNotificationEventFilterDeserializer(
        item as TestRunStartedNotificationEventFilter,
      );

    case "TriggerCompleted":
      return triggerCompletedNotificationEventFilterDeserializer(
        item as TriggerCompletedNotificationEventFilter,
      );

    case "TriggerDisabled":
      return triggerDisabledNotificationEventFilterDeserializer(
        item as TriggerDisabledNotificationEventFilter,
      );

    default:
      return testsNotificationEventFilterDeserializer(item);
  }
}

/** Notification event type. */
export type NotificationEventType =
  | "TestRunEnded"
  | "TestRunStarted"
  | "TriggerCompleted"
  | "TriggerDisabled";

/** The notification event filter when the event type is TestRunEnded and scope is Tests. */
export interface TestRunEndedNotificationEventFilter extends TestsNotificationEventFilter {
  /** Event type for test run ended event. */
  kind: "TestRunEnded";
  /** Event filtering condition. */
  condition?: TestRunEndedEventCondition;
}

export function testRunEndedNotificationEventFilterSerializer(
  item: TestRunEndedNotificationEventFilter,
): any {
  return {
    kind: item["kind"],
    condition: !item["condition"]
      ? item["condition"]
      : testRunEndedEventConditionSerializer(item["condition"]),
  };
}

export function testRunEndedNotificationEventFilterDeserializer(
  item: any,
): TestRunEndedNotificationEventFilter {
  return {
    kind: item["kind"],
    condition: !item["condition"]
      ? item["condition"]
      : testRunEndedEventConditionDeserializer(item["condition"]),
  };
}

/** TestRunEnded Event condition. */
export interface TestRunEndedEventCondition {
  /** The test run statuses to send notification for. */
  testRunStatuses?: TestRunStatus[];
  /** The test run results to send notification for. */
  testRunResults?: PassFailTestResult[];
}

export function testRunEndedEventConditionSerializer(item: TestRunEndedEventCondition): any {
  return {
    testRunStatuses: !item["testRunStatuses"]
      ? item["testRunStatuses"]
      : item["testRunStatuses"].map((p: any) => {
          return p;
        }),
    testRunResults: !item["testRunResults"]
      ? item["testRunResults"]
      : item["testRunResults"].map((p: any) => {
          return p;
        }),
  };
}

export function testRunEndedEventConditionDeserializer(item: any): TestRunEndedEventCondition {
  return {
    testRunStatuses: !item["testRunStatuses"]
      ? item["testRunStatuses"]
      : item["testRunStatuses"].map((p: any) => {
          return p;
        }),
    testRunResults: !item["testRunResults"]
      ? item["testRunResults"]
      : item["testRunResults"].map((p: any) => {
          return p;
        }),
  };
}

/** Test run status. */
export type TestRunStatus =
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
/** Test result based on pass/fail criteria. */
export type PassFailTestResult = "PASSED" | "NOT_APPLICABLE" | "FAILED";

/** The notification event filter when the event type is TestRunStarted and scope is Tests. */
export interface TestRunStartedNotificationEventFilter extends TestsNotificationEventFilter {
  /** Event type for test run started event. */
  kind: "TestRunStarted";
}

export function testRunStartedNotificationEventFilterSerializer(
  item: TestRunStartedNotificationEventFilter,
): any {
  return { kind: item["kind"] };
}

export function testRunStartedNotificationEventFilterDeserializer(
  item: any,
): TestRunStartedNotificationEventFilter {
  return {
    kind: item["kind"],
  };
}

/** The notification event filter when the event type is TriggerCompleted. */
export interface TriggerCompletedNotificationEventFilter extends TestsNotificationEventFilter {
  /** Event type for trigger ended event. */
  kind: "TriggerCompleted";
}

export function triggerCompletedNotificationEventFilterSerializer(
  item: TriggerCompletedNotificationEventFilter,
): any {
  return { kind: item["kind"] };
}

export function triggerCompletedNotificationEventFilterDeserializer(
  item: any,
): TriggerCompletedNotificationEventFilter {
  return {
    kind: item["kind"],
  };
}

/** The notification event filter when the event type is TriggerDisabled. */
export interface TriggerDisabledNotificationEventFilter extends TestsNotificationEventFilter {
  /** Event type for trigger disabled event. */
  kind: "TriggerDisabled";
}

export function triggerDisabledNotificationEventFilterSerializer(
  item: TriggerDisabledNotificationEventFilter,
): any {
  return { kind: item["kind"] };
}

export function triggerDisabledNotificationEventFilterDeserializer(
  item: any,
): TriggerDisabledNotificationEventFilter {
  return {
    kind: item["kind"],
  };
}

/** Paged collection of NotificationRule items */
export interface _PagedNotificationRule {
  /** The NotificationRule items on this page */
  value: NotificationRuleUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedNotificationRuleDeserializer(item: any): _PagedNotificationRule {
  return {
    value: notificationRuleUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function notificationRuleUnionArraySerializer(result: Array<NotificationRuleUnion>): any[] {
  return result.map((item) => {
    return notificationRuleUnionSerializer(item);
  });
}

export function notificationRuleUnionArrayDeserializer(
  result: Array<NotificationRuleUnion>,
): any[] {
  return result.map((item) => {
    return notificationRuleUnionDeserializer(item);
  });
}

/** Enum describing allowed operation states. */
export type OperationState = "NotStarted" | "Running" | "Succeeded" | "Failed" | "Canceled";

/** Status of a long running operation. */
export interface OperationStatus {
  /** The unique ID of the operation. */
  readonly id: string;
  /** The state of the operation. */
  status: OperationState;
  /** The kind of the operation. */
  kind: OperationKind;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
}

export function operationStatusDeserializer(item: any): OperationStatus {
  return {
    id: item["id"],
    status: item["status"],
    kind: item["kind"],
    error: !item["error"] ? item["error"] : item["error"],
  };
}

/** Kind of the long running operation. */
export type OperationKind = "CloneTest" | "GenerateTestRunInsights" | "TestPlanRecommendations";

/** Load test run model */
export interface TestRun {
  /** Unique test run identifier for the load test run, must contain only lower-case alphabetic, numeric, underscore or hyphen characters. */
  readonly testRunId: string;
  /** Pass fail criteria for a test. */
  passFailCriteria?: PassFailCriteria;
  /** Auto stop criteria for a test. This will automatically stop a load test if the error percentage is high for a certain time window. */
  autoStopCriteria?: AutoStopCriteria;
  /**
   * Secrets can be stored in an Azure Key Vault or any other secret store. If the
   * secret is stored in an Azure Key Vault, the value should be the secret
   * identifier and the type should be AKV_SECRET_URI. If the secret is stored
   * elsewhere, the secret value should be provided directly and the type should be
   * SECRET_VALUE.
   */
  secrets?: Record<string, Secret>;
  /** Certificates metadata */
  certificate?: CertificateMetadata;
  /** Environment variables which are defined as a set of <name,value> pairs. */
  environmentVariables?: Record<string, string>;
  /** Error details if there is any failure in load test run */
  readonly errorDetails?: ErrorDetails[];
  /**
   * Test run statistics. Key is the sampler name and value is the set of statistics for performance metrics like response time, throughput, etc. from the load test run.
   * The sampler name is the same as the name mentioned in the test script.
   * Sampler name "Total" represents the aggregated statistics of all the samplers.
   */
  readonly testRunStatistics?: Record<string, TestRunStatistics>;
  /**
   * Regional statistics. Key is the Azure region name and value is the test run statistics.
   * The region name should of format accepted by ARM, and should be a region supported by Azure Load Testing. For example, East US should be passed as "eastus".
   * The region name must match one of the strings in the "Name" column returned from running the "az account list-locations -o table" Azure CLI command.
   */
  readonly regionalStatistics?: Record<string, TestRunStatistics>;
  /** The load test configuration. */
  readonly loadTestConfiguration?: LoadTestConfiguration;
  /** Collection of test run artifacts */
  readonly testArtifacts?: TestRunArtifacts;
  /** Test result for pass/Fail criteria used during the test run. */
  readonly testResult?: PassFailTestResult;
  /** Number of virtual users, for which test has been run. */
  readonly virtualUsers?: number;
  /** Display name of a testRun. */
  displayName?: string;
  /** Associated test Id. */
  testId?: string;
  /** The test run description. */
  description?: string;
  /** The test run status. */
  readonly status?: TestRunStatus;
  /** The test run start DateTime(RFC 3339 literal format). */
  readonly startDateTime?: Date;
  /** The test run end DateTime(RFC 3339 literal format). */
  readonly endDateTime?: Date;
  /** Test run initiated time. This is legacy, new developments should use createdDateTime. */
  readonly executedDateTime?: Date;
  /** Portal url. */
  readonly portalUrl?: string;
  /** Test run duration in milliseconds. */
  readonly duration?: number;
  /** Virtual user hours consumed by the test run. */
  readonly virtualUserHours?: number;
  /** Subnet ID on which the load test instances should run. */
  readonly subnetId?: string;
  /** Type of test. */
  readonly kind?: TestKind;
  /** Request data collection level for test run */
  requestDataLevel?: RequestDataLevel;
  /** Enable or disable debug level logging. True if debug logs are enabled for the test run. False otherwise */
  debugLogsEnabled?: boolean;
  /** Inject load test engines without deploying public IP for outbound access */
  readonly publicIPDisabled?: boolean;
  /** The type of the entity that created the test run. (E.x. User, ScheduleTrigger, etc). */
  createdByType?: CreatedByType;
  /** The URI pointing to the entity that created the test run. */
  readonly createdByUri?: string;
  /** Estimated virtual user hours for the test run. */
  readonly estimatedVirtualUserHours?: number;
  /** The test run execution start DateTime(RFC 3339 literal format). */
  readonly executionStartDateTime?: Date;
  /** The test run execution end DateTime(RFC 3339 literal format). */
  readonly executionEndDateTime?: Date;
  /** The creation datetime(RFC 3339 literal format). */
  readonly createdDateTime?: Date;
  /** The user that created. */
  readonly createdBy?: string;
  /** The last Modified datetime(RFC 3339 literal format). */
  readonly lastModifiedDateTime?: Date;
  /** The user that last modified. */
  readonly lastModifiedBy?: string;
}

export function testRunSerializer(item: TestRun): any {
  return {
    passFailCriteria: !item["passFailCriteria"]
      ? item["passFailCriteria"]
      : passFailCriteriaSerializer(item["passFailCriteria"]),
    autoStopCriteria: !item["autoStopCriteria"]
      ? item["autoStopCriteria"]
      : autoStopCriteriaSerializer(item["autoStopCriteria"]),
    secrets: !item["secrets"] ? item["secrets"] : secretRecordSerializer(item["secrets"]),
    certificate: !item["certificate"]
      ? item["certificate"]
      : certificateMetadataSerializer(item["certificate"]),
    environmentVariables: item["environmentVariables"],
    displayName: item["displayName"],
    testId: item["testId"],
    description: item["description"],
    requestDataLevel: item["requestDataLevel"],
    debugLogsEnabled: item["debugLogsEnabled"],
    createdByType: item["createdByType"],
  };
}

export function testRunDeserializer(item: any): TestRun {
  return {
    testRunId: item["testRunId"],
    passFailCriteria: !item["passFailCriteria"]
      ? item["passFailCriteria"]
      : passFailCriteriaDeserializer(item["passFailCriteria"]),
    autoStopCriteria: !item["autoStopCriteria"]
      ? item["autoStopCriteria"]
      : autoStopCriteriaDeserializer(item["autoStopCriteria"]),
    secrets: !item["secrets"] ? item["secrets"] : secretRecordDeserializer(item["secrets"]),
    certificate: !item["certificate"]
      ? item["certificate"]
      : certificateMetadataDeserializer(item["certificate"]),
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : Object.fromEntries(
          Object.entries(item["environmentVariables"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailsArrayDeserializer(item["errorDetails"]),
    testRunStatistics: !item["testRunStatistics"]
      ? item["testRunStatistics"]
      : testRunStatisticsRecordDeserializer(item["testRunStatistics"]),
    regionalStatistics: !item["regionalStatistics"]
      ? item["regionalStatistics"]
      : testRunStatisticsRecordDeserializer(item["regionalStatistics"]),
    loadTestConfiguration: !item["loadTestConfiguration"]
      ? item["loadTestConfiguration"]
      : loadTestConfigurationDeserializer(item["loadTestConfiguration"]),
    testArtifacts: !item["testArtifacts"]
      ? item["testArtifacts"]
      : testRunArtifactsDeserializer(item["testArtifacts"]),
    testResult: item["testResult"],
    virtualUsers: item["virtualUsers"],
    displayName: item["displayName"],
    testId: item["testId"],
    description: item["description"],
    status: item["status"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    executedDateTime: !item["executedDateTime"]
      ? item["executedDateTime"]
      : new Date(item["executedDateTime"]),
    portalUrl: item["portalUrl"],
    duration: item["duration"],
    virtualUserHours: item["virtualUserHours"],
    subnetId: item["subnetId"],
    kind: item["kind"],
    requestDataLevel: item["requestDataLevel"],
    debugLogsEnabled: item["debugLogsEnabled"],
    publicIPDisabled: item["publicIPDisabled"],
    createdByType: item["createdByType"],
    createdByUri: item["createdByUri"],
    estimatedVirtualUserHours: item["estimatedVirtualUserHours"],
    executionStartDateTime: !item["executionStartDateTime"]
      ? item["executionStartDateTime"]
      : new Date(item["executionStartDateTime"]),
    executionEndDateTime: !item["executionEndDateTime"]
      ? item["executionEndDateTime"]
      : new Date(item["executionEndDateTime"]),
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    createdBy: item["createdBy"],
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    lastModifiedBy: item["lastModifiedBy"],
  };
}

export function errorDetailsArrayDeserializer(result: Array<ErrorDetails>): any[] {
  return result.map((item) => {
    return errorDetailsDeserializer(item);
  });
}

/** Error details if there is any failure in load test run */
export interface ErrorDetails {
  /** Error code if there is any failure in load test run. */
  readonly code?: string;
  /** Error details in case test run was not successfully run. */
  readonly message?: string;
  /** A dictionary for storing additional error information for better context. Each key is a property name (e.g., "Description", "Resolution", "Category", "Region"), and its value is an array of strings with relevant details. */
  readonly properties?: Record<string, string[]>;
}

export function errorDetailsDeserializer(item: any): ErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
  };
}

export function testRunStatisticsRecordDeserializer(
  item: Record<string, any>,
): Record<string, TestRunStatistics> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : testRunStatisticsDeserializer(item[key]);
  });
  return result;
}

/** Test run statistics. */
export interface TestRunStatistics {
  /** Transaction name. */
  readonly transaction?: string;
  /** Sampler count. */
  readonly sampleCount?: number;
  /** Error count. */
  readonly errorCount?: number;
  /** Error percentage. */
  readonly errorPct?: number;
  /** Mean response time. */
  readonly meanResTime?: number;
  /** Median response time. */
  readonly medianResTime?: number;
  /** Max response time. */
  readonly maxResTime?: number;
  /** Minimum response time. */
  readonly minResTime?: number;
  /** 90 percentile response time. */
  readonly pct1ResTime?: number;
  /** 95 percentile response time. */
  readonly pct2ResTime?: number;
  /** 99 percentile response time. */
  readonly pct3ResTime?: number;
  /** 75 percentile response time. */
  readonly pct75ResTime?: number;
  /** 96 percentile response time. */
  readonly pct96ResTime?: number;
  /** 97 percentile response time. */
  readonly pct97ResTime?: number;
  /** 98 percentile response time. */
  readonly pct98ResTime?: number;
  /** 99.9 percentile response time. */
  readonly pct999ResTime?: number;
  /** 99.99 percentile response time. */
  readonly pct9999ResTime?: number;
  /** Throughput. */
  readonly throughput?: number;
  /** Received network bytes. */
  readonly receivedKBytesPerSec?: number;
  /** Send network bytes. */
  readonly sentKBytesPerSec?: number;
}

export function testRunStatisticsDeserializer(item: any): TestRunStatistics {
  return {
    transaction: item["transaction"],
    sampleCount: item["sampleCount"],
    errorCount: item["errorCount"],
    errorPct: item["errorPct"],
    meanResTime: item["meanResTime"],
    medianResTime: item["medianResTime"],
    maxResTime: item["maxResTime"],
    minResTime: item["minResTime"],
    pct1ResTime: item["pct1ResTime"],
    pct2ResTime: item["pct2ResTime"],
    pct3ResTime: item["pct3ResTime"],
    pct75ResTime: item["pct75ResTime"],
    pct96ResTime: item["pct96ResTime"],
    pct97ResTime: item["pct97ResTime"],
    pct98ResTime: item["pct98ResTime"],
    pct999ResTime: item["pct999ResTime"],
    pct9999ResTime: item["pct9999ResTime"],
    throughput: item["throughput"],
    receivedKBytesPerSec: item["receivedKBytesPerSec"],
    sentKBytesPerSec: item["sentKBytesPerSec"],
  };
}

/** Collection of test run artifacts */
export interface TestRunArtifacts {
  /** The input artifacts for the test run. */
  readonly inputArtifacts?: TestRunInputArtifacts;
  /** The output artifacts for the test run. */
  outputArtifacts?: TestRunOutputArtifacts;
}

export function testRunArtifactsDeserializer(item: any): TestRunArtifacts {
  return {
    inputArtifacts: !item["inputArtifacts"]
      ? item["inputArtifacts"]
      : testRunInputArtifactsDeserializer(item["inputArtifacts"]),
    outputArtifacts: !item["outputArtifacts"]
      ? item["outputArtifacts"]
      : testRunOutputArtifactsDeserializer(item["outputArtifacts"]),
  };
}

/** The input artifacts for the test run. */
export interface TestRunInputArtifacts {
  /** The load test YAML file that contains the the test configuration */
  configFileInfo?: TestRunFileInfo;
  /** The test script file for the test run */
  testScriptFileInfo?: TestRunFileInfo;
  /** The user properties file */
  userPropFileInfo?: TestRunFileInfo;
  /** The zip file for all input artifacts */
  inputArtifactsZipFileInfo?: TestRunFileInfo;
  /** The config json file for url based test */
  urlTestConfigFileInfo?: TestRunFileInfo;
  /** Additional supported files for the test run */
  readonly additionalFileInfo?: TestRunFileInfo[];
}

export function testRunInputArtifactsDeserializer(item: any): TestRunInputArtifacts {
  return {
    configFileInfo: !item["configFileInfo"]
      ? item["configFileInfo"]
      : testRunFileInfoDeserializer(item["configFileInfo"]),
    testScriptFileInfo: !item["testScriptFileInfo"]
      ? item["testScriptFileInfo"]
      : testRunFileInfoDeserializer(item["testScriptFileInfo"]),
    userPropFileInfo: !item["userPropFileInfo"]
      ? item["userPropFileInfo"]
      : testRunFileInfoDeserializer(item["userPropFileInfo"]),
    inputArtifactsZipFileInfo: !item["inputArtifactsZipFileInfo"]
      ? item["inputArtifactsZipFileInfo"]
      : testRunFileInfoDeserializer(item["inputArtifactsZipFileInfo"]),
    urlTestConfigFileInfo: !item["urlTestConfigFileInfo"]
      ? item["urlTestConfigFileInfo"]
      : testRunFileInfoDeserializer(item["urlTestConfigFileInfo"]),
    additionalFileInfo: !item["additionalFileInfo"]
      ? item["additionalFileInfo"]
      : testRunFileInfoArrayDeserializer(item["additionalFileInfo"]),
  };
}

/** Test run file info. */
export interface TestRunFileInfo {
  /** Name of the file. */
  fileName: string;
  /** File URL. */
  readonly url?: string;
  /** File type */
  readonly fileType?: FileType;
  /** Expiry time of the file (RFC 3339 literal format) */
  readonly expireDateTime?: Date;
  /** Validation status of the file */
  readonly validationStatus?: FileValidationStatus;
  /** Validation failure error details */
  readonly validationFailureDetails?: string;
}

export function testRunFileInfoDeserializer(item: any): TestRunFileInfo {
  return {
    fileName: item["fileName"],
    url: item["url"],
    fileType: item["fileType"],
    expireDateTime: !item["expireDateTime"]
      ? item["expireDateTime"]
      : new Date(item["expireDateTime"]),
    validationStatus: item["validationStatus"],
    validationFailureDetails: item["validationFailureDetails"],
  };
}

export function testRunFileInfoArrayDeserializer(result: Array<TestRunFileInfo>): any[] {
  return result.map((item) => {
    return testRunFileInfoDeserializer(item);
  });
}

/** The output artifacts for the test run. */
export interface TestRunOutputArtifacts {
  /** The test run results file */
  resultFileInfo?: TestRunFileInfo;
  /** The test run report with metrics */
  logsFileInfo?: TestRunFileInfo;
  /** The container for test run artifacts. */
  artifactsContainerInfo?: ArtifactsContainerInfo;
  /** The report file for the test run. */
  reportFileInfo?: TestRunFileInfo;
}

export function testRunOutputArtifactsDeserializer(item: any): TestRunOutputArtifacts {
  return {
    resultFileInfo: !item["resultFileInfo"]
      ? item["resultFileInfo"]
      : testRunFileInfoDeserializer(item["resultFileInfo"]),
    logsFileInfo: !item["logsFileInfo"]
      ? item["logsFileInfo"]
      : testRunFileInfoDeserializer(item["logsFileInfo"]),
    artifactsContainerInfo: !item["artifactsContainerInfo"]
      ? item["artifactsContainerInfo"]
      : artifactsContainerInfoDeserializer(item["artifactsContainerInfo"]),
    reportFileInfo: !item["reportFileInfo"]
      ? item["reportFileInfo"]
      : testRunFileInfoDeserializer(item["reportFileInfo"]),
  };
}

/** Artifacts container info. */
export interface ArtifactsContainerInfo {
  /** This is a SAS URI to an Azure Storage Container that contains the test run artifacts. */
  url?: string;
  /** Expiry time of the container (RFC 3339 literal format) */
  expireDateTime?: Date;
}

export function artifactsContainerInfoDeserializer(item: any): ArtifactsContainerInfo {
  return {
    url: item["url"],
    expireDateTime: !item["expireDateTime"]
      ? item["expireDateTime"]
      : new Date(item["expireDateTime"]),
  };
}

/** Request data collection level for test run */
export type RequestDataLevel = "NONE" | "ERRORS";
/** The type of the entity that created the test run. (E.x. User, ScheduleTrigger, etc). */
export type CreatedByType = "User" | "ScheduledTrigger" | "AzurePipelines" | "GitHubWorkflows";

/** Test run app component */
export interface TestRunAppComponents {
  /**
   * Azure resource collection { resource id (fully qualified resource Id e.g
   * subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName})
   * : resource object }
   */
  components: Record<string, AppComponent>;
  /** Test run identifier */
  readonly testRunId?: string;
  /** The creation datetime(RFC 3339 literal format). */
  readonly createdDateTime?: Date;
  /** The user that created. */
  readonly createdBy?: string;
  /** The last Modified datetime(RFC 3339 literal format). */
  readonly lastModifiedDateTime?: Date;
  /** The user that last modified. */
  readonly lastModifiedBy?: string;
}

export function testRunAppComponentsSerializer(item: TestRunAppComponents): any {
  return { components: appComponentRecordSerializer(item["components"]) };
}

export function testRunAppComponentsDeserializer(item: any): TestRunAppComponents {
  return {
    components: appComponentRecordDeserializer(item["components"]),
    testRunId: item["testRunId"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    createdBy: item["createdBy"],
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    lastModifiedBy: item["lastModifiedBy"],
  };
}

/** Test run server metrics configuration */
export interface TestRunServerMetricsConfiguration {
  /** Test run identifier */
  readonly testRunId?: string;
  /**
   * Azure resource metrics collection {metric id : metrics object} (Refer :
   * https://learn.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition
   * for metric id).
   */
  metrics?: Record<string, ResourceMetric>;
  /** The creation datetime(RFC 3339 literal format). */
  readonly createdDateTime?: Date;
  /** The user that created. */
  readonly createdBy?: string;
  /** The last Modified datetime(RFC 3339 literal format). */
  readonly lastModifiedDateTime?: Date;
  /** The user that last modified. */
  readonly lastModifiedBy?: string;
}

export function testRunServerMetricsConfigurationSerializer(
  item: TestRunServerMetricsConfiguration,
): any {
  return {
    metrics: !item["metrics"] ? item["metrics"] : resourceMetricRecordSerializer(item["metrics"]),
  };
}

export function testRunServerMetricsConfigurationDeserializer(
  item: any,
): TestRunServerMetricsConfiguration {
  return {
    testRunId: item["testRunId"],
    metrics: !item["metrics"] ? item["metrics"] : resourceMetricRecordDeserializer(item["metrics"]),
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    createdBy: item["createdBy"],
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    lastModifiedBy: item["lastModifiedBy"],
  };
}

/** Metrics dimension values. */
export interface _DimensionValueList {
  /** The dimension name */
  readonly name?: string;
  /** The dimension value */
  value?: string[];
  /** Link for the next set of values in case of paginated results, if applicable. */
  nextLink?: string;
}

export function _dimensionValueListDeserializer(item: any): _DimensionValueList {
  return {
    name: item["name"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
    nextLink: item["nextLink"],
  };
}

/** Represents collection of metric definitions. */
export interface MetricDefinitionCollection {
  /** the values for the metric definitions. */
  value: MetricDefinition[];
}

export function metricDefinitionCollectionDeserializer(item: any): MetricDefinitionCollection {
  return {
    value: metricDefinitionArrayDeserializer(item["value"]),
  };
}

export function metricDefinitionArrayDeserializer(result: Array<MetricDefinition>): any[] {
  return result.map((item) => {
    return metricDefinitionDeserializer(item);
  });
}

/** Metric definition */
export interface MetricDefinition {
  /** List of dimensions */
  dimensions?: NameAndDescription[];
  /** The metric description */
  description?: string;
  /** The metric name */
  name?: string;
  /** The namespace the metric belongs to. */
  namespace?: string;
  /** The primary aggregation type value defining how to use the values for display. */
  primaryAggregationType?: Aggregation;
  /** The collection of what all aggregation types are supported. */
  supportedAggregationTypes?: string[];
  /** The unit of the metric. */
  unit?: MetricUnit;
  /**
   * Metric availability specifies the time grain (aggregation interval or
   * frequency).
   */
  metricAvailabilities?: MetricAvailability[];
}

export function metricDefinitionDeserializer(item: any): MetricDefinition {
  return {
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : nameAndDescriptionArrayDeserializer(item["dimensions"]),
    description: item["description"],
    name: item["name"],
    namespace: item["namespace"],
    primaryAggregationType: item["primaryAggregationType"],
    supportedAggregationTypes: !item["supportedAggregationTypes"]
      ? item["supportedAggregationTypes"]
      : item["supportedAggregationTypes"].map((p: any) => {
          return p;
        }),
    unit: item["unit"],
    metricAvailabilities: !item["metricAvailabilities"]
      ? item["metricAvailabilities"]
      : metricAvailabilityArrayDeserializer(item["metricAvailabilities"]),
  };
}

export function nameAndDescriptionArrayDeserializer(result: Array<NameAndDescription>): any[] {
  return result.map((item) => {
    return nameAndDescriptionDeserializer(item);
  });
}

/** The name and description */
export interface NameAndDescription {
  /** The description */
  description?: string;
  /** The name */
  name?: string;
}

export function nameAndDescriptionDeserializer(item: any): NameAndDescription {
  return {
    description: item["description"],
    name: item["name"],
  };
}

/** Aggregation type. */
export type Aggregation =
  | "Average"
  | "Count"
  | "None"
  | "Total"
  | "Percentile75"
  | "Percentile90"
  | "Percentile95"
  | "Percentile96"
  | "Percentile97"
  | "Percentile98"
  | "Percentile99"
  | "Percentile999"
  | "Percentile9999";
/** Metric unit. */
export type MetricUnit =
  | "NotSpecified"
  | "Percent"
  | "Count"
  | "Seconds"
  | "Milliseconds"
  | "Bytes"
  | "BytesPerSecond"
  | "CountPerSecond";

export function metricAvailabilityArrayDeserializer(result: Array<MetricAvailability>): any[] {
  return result.map((item) => {
    return metricAvailabilityDeserializer(item);
  });
}

/** Metric availability specifies the time grain (aggregation interval or frequency) */
export interface MetricAvailability {
  /**
   * The time grain specifies the aggregation interval for the metric. Expressed as
   * a duration 'PT1M', 'PT1H', etc.
   */
  timeGrain?: TimeGrain;
}

export function metricAvailabilityDeserializer(item: any): MetricAvailability {
  return {
    timeGrain: item["timeGrain"],
  };
}

/** Time Grain */
export type TimeGrain = "PT5S" | "PT10S" | "PT1M" | "PT5M" | "PT1H";

/** Represents collection of metric namespaces. */
export interface MetricNamespaceCollection {
  /** The values for the metric namespaces. */
  value: MetricNamespace[];
}

export function metricNamespaceCollectionDeserializer(item: any): MetricNamespaceCollection {
  return {
    value: metricNamespaceArrayDeserializer(item["value"]),
  };
}

export function metricNamespaceArrayDeserializer(result: Array<MetricNamespace>): any[] {
  return result.map((item) => {
    return metricNamespaceDeserializer(item);
  });
}

/** Metric namespace class specifies the metadata for a metric namespace. */
export interface MetricNamespace {
  /** The namespace description. */
  description?: string;
  /** The metric namespace name. */
  name?: string;
}

export function metricNamespaceDeserializer(item: any): MetricNamespace {
  return {
    description: item["description"],
    name: item["name"],
  };
}

/** Filters to fetch the set of metric. */
export interface MetricRequestPayload {
  /**
   * Get metrics for specific dimension values. Example: Metric contains dimension
   * like SamplerName, Error. To retrieve all the time series data where SamplerName
   * is equals to HTTPRequest1 or HTTPRequest2, the DimensionFilter value will be
   * {"SamplerName", ["HTTPRequest1", "HTTPRequest2"}
   */
  filters?: DimensionFilter[];
}

export function metricRequestPayloadSerializer(item: MetricRequestPayload): any {
  return {
    filters: !item["filters"] ? item["filters"] : dimensionFilterArraySerializer(item["filters"]),
  };
}

export function dimensionFilterArraySerializer(result: Array<DimensionFilter>): any[] {
  return result.map((item) => {
    return dimensionFilterSerializer(item);
  });
}

/** Dimension name and values to filter */
export interface DimensionFilter {
  /** The dimension name */
  name?: string;
  /** The dimension values. Maximum values can be 20. */
  values?: string[];
}

export function dimensionFilterSerializer(item: DimensionFilter): any {
  return {
    name: item["name"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** The response to a metrics query. */
export interface _Metrics {
  /** The TimeSeriesElement items on this page */
  value: TimeSeriesElement[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _metricsDeserializer(item: any): _Metrics {
  return {
    value: timeSeriesElementArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function timeSeriesElementArrayDeserializer(result: Array<TimeSeriesElement>): any[] {
  return result.map((item) => {
    return timeSeriesElementDeserializer(item);
  });
}

/** The time series returned when a data query is performed. */
export interface TimeSeriesElement {
  /** An array of data points representing the metric values. */
  data?: MetricValue[];
  /** The dimension values */
  dimensionValues?: DimensionValue[];
}

export function timeSeriesElementDeserializer(item: any): TimeSeriesElement {
  return {
    data: !item["data"] ? item["data"] : metricValueArrayDeserializer(item["data"]),
    dimensionValues: !item["dimensionValues"]
      ? item["dimensionValues"]
      : dimensionValueArrayDeserializer(item["dimensionValues"]),
  };
}

export function metricValueArrayDeserializer(result: Array<MetricValue>): any[] {
  return result.map((item) => {
    return metricValueDeserializer(item);
  });
}

/** Represents a metric value. */
export interface MetricValue {
  /** The timestamp for the metric value in RFC 3339 format. */
  timestamp?: Date;
  /** The metric value. */
  value?: number;
}

export function metricValueDeserializer(item: any): MetricValue {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    value: item["value"],
  };
}

export function dimensionValueArrayDeserializer(result: Array<DimensionValue>): any[] {
  return result.map((item) => {
    return dimensionValueDeserializer(item);
  });
}

/** Represents a metric dimension value. */
export interface DimensionValue {
  /** The name of the dimension. */
  name?: string;
  /** The value of the dimension. */
  value?: string;
}

export function dimensionValueDeserializer(item: any): DimensionValue {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Paged collection of TestRun items */
export interface _PagedTestRun {
  /** The TestRun items on this page */
  value: TestRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedTestRunDeserializer(item: any): _PagedTestRun {
  return {
    value: testRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function testRunArraySerializer(result: Array<TestRun>): any[] {
  return result.map((item) => {
    return testRunSerializer(item);
  });
}

export function testRunArrayDeserializer(result: Array<TestRun>): any[] {
  return result.map((item) => {
    return testRunDeserializer(item);
  });
}

/** Represents insights for the test run. */
export interface TestRunInsights {
  /** The columns of the insights. */
  readonly columns?: TestRunInsightColumn[];
  /** The rows of the insights. */
  rows?: Record<string, Record<string, string>>;
  /** The version of the insights. */
  readonly version?: number;
  /** The status of the insights. */
  readonly status?: OperationState;
}

export function testRunInsightsSerializer(item: TestRunInsights): any {
  return { rows: item["rows"] };
}

export function testRunInsightsDeserializer(item: any): TestRunInsights {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : testRunInsightColumnArrayDeserializer(item["columns"]),
    rows: !item["rows"]
      ? item["rows"]
      : Object.fromEntries(
          Object.entries(item["rows"]).map(([k, p]: [string, any]) => [
            k,
            Object.fromEntries(Object.entries(p).map(([k1, p1]: [string, any]) => [k1, p1])),
          ]),
        ),
    version: item["version"],
    status: item["status"],
  };
}

export function testRunInsightColumnArrayDeserializer(result: Array<TestRunInsightColumn>): any[] {
  return result.map((item) => {
    return testRunInsightColumnDeserializer(item);
  });
}

/** Represents a column of the test run insight */
export interface TestRunInsightColumn {
  /** Name of the column. */
  name: string;
  /** The data type of the column. */
  dataType: string;
}

export function testRunInsightColumnDeserializer(item: any): TestRunInsightColumn {
  return {
    name: item["name"],
    dataType: item["dataType"],
  };
}

/** Azure Load Testing API versions. */
export enum KnownAPIVersions {
  /** The 2022-11-01 version of the Azure Load Testing API. */
  V20221101 = "2022-11-01",
  /** The 2023-04-01-preview version of the Azure Load Testing API. */
  V20230401Preview = "2023-04-01-preview",
  /** The 2024-03-01-preview version of the Azure Load Testing API. */
  V20240301Preview = "2024-03-01-preview",
  /** The 2024-05-01-preview version of the Azure Load Testing API. */
  V20240501Preview = "2024-05-01-preview",
  /** The 2024-07-01-preview version of the Azure Load Testing API. */
  V20240701Preview = "2024-07-01-preview",
  /** The 2024-12-01-preview version of the Azure Load Testing API. */
  V20241201Preview = "2024-12-01-preview",
  /** The 2025-03-01-preview version of the Azure Load Testing API. */
  V20250301Preview = "2025-03-01-preview",
  /** The 2025-11-01-preview version of the Azure Load Testing API. */
  V20251101Preview = "2025-11-01-preview",
}

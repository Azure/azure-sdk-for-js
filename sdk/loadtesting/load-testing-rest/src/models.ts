// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
  /** The test description. */
  description?: string;
  /** Display name of a test. */
  displayName?: string;
  /** Subnet ID on which the load test instances should run. */
  subnetId?: string;
  /**
   * Kind of test.
   *
   * Possible values: "URL", "JMX", "Locust"
   */
  kind?: TestKind;
  /** Inject load test engines without deploying public IP for outbound access */
  publicIPDisabled?: boolean;
  /** Type of the managed identity referencing the Key vault. */
  keyvaultReferenceIdentityType?: string;
  /** Resource Id of the managed identity referencing the Key vault. */
  keyvaultReferenceIdentityId?: string;
  /**
   * Type of the managed identity referencing the metrics.
   *
   * Possible values: "SystemAssigned", "UserAssigned"
   */
  metricsReferenceIdentityType?: ManagedIdentityType;
  /** Resource Id of the managed identity referencing the metrics. */
  metricsReferenceIdentityId?: string;
  /**
   * Type of the managed identity built in load test engines
   *
   * Possible values: "SystemAssigned", "UserAssigned"
   */
  engineBuiltInIdentityType?: ManagedIdentityType;
  /** Resource Ids of the managed identity built in to load test engines. Required if engineBuiltInIdentityType is UserAssigned. */
  engineBuiltInIdentityIds?: string[];
}

/** Pass fail criteria for a test. */
export interface PassFailCriteria {
  /** Map of id and pass fail metrics { id  : pass fail metrics }. */
  passFailMetrics?: Record<string, PassFailMetric>;
  /** Map of id and pass fail server metrics { id  : pass fail metrics }. */
  passFailServerMetrics?: Record<string, PassFailServerMetric>;
}

/** Pass fail metric */
export interface PassFailMetric {
  /**
   * The client metric on which the criteria should be applied.
   *
   * Possible values: "response_time_ms", "latency", "error", "requests", "requests_per_sec"
   */
  clientMetric?: PFMetrics;
  /**
   * The aggregation function to be applied on the client metric. Allowed functions
   * - ‘percentage’ - for error metric , ‘avg’, percentiles like ‘p50’, ‘p90’, & so on, ‘min’,
   * ‘max’ - for response_time_ms and latency metric, ‘avg’ - for requests_per_sec,
   * ‘count’ - for requests
   *
   * Possible values: "count", "percentage", "avg", "p50", "p75", "p90", "p95", "p96", "p97", "p98", "p99", "p99.9", "p99.99", "min", "max"
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
  /**
   * Action taken after the threshold is met. Default is ‘continue’.
   *
   * Possible values: "continue", "stop"
   */
  action?: PassFailAction;
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
  /**
   * Action taken after the threshold is met. Default is ‘continue’.
   *
   * Possible values: "continue", "stop"
   */
  action?: PassFailAction;
}

/** Auto stop criteria for a test. This will automatically stop a load test if the error percentage is high for a certain time window. */
export interface AutoStopCriteria {
  /** Whether auto-stop should be disabled. The default value is false. */
  autoStopDisabled?: boolean;
  /** Threshold percentage of errors on which test run should be automatically stopped. Allowed values are in range of 0.0-100.0 */
  errorRate?: number;
  /** Time window during which the error percentage should be evaluated in seconds. */
  errorRateTimeWindowInSeconds?: number;
}

/** Secret */
export interface Secret {
  /** The value of the secret for the respective type */
  value?: string;
  /**
   * Type of secret
   *
   * Possible values: "AKV_SECRET_URI", "SECRET_VALUE"
   */
  type?: SecretType;
}

/** Certificates metadata */
export interface CertificateMetadata {
  /** The value of the certificate for respective type */
  value?: string;
  /**
   * Type of certificate
   *
   * Possible values: "AKV_CERT_URI"
   */
  type?: CertificateType;
  /** Name of the certificate. */
  name?: string;
}

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
  regionalLoadTestConfig?: Array<RegionalConfiguration>;
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
}

/** Test file info. */
export interface TestFileInfo {
  /** Name of the file. */
  fileName: string;
}

/** Test app components */
export interface TestAppComponents {
  /**
   * Azure resource collection { resource id (fully qualified resource Id e.g
   * subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName})
   * : resource object }
   */
  components: Record<string, AppComponent>;
}

/** An Azure resource object (Refer azure generic resource model :https://learn.microsoft.com/en-us/rest/api/resources/resources/get-by-id#genericresource) */
export interface AppComponent {
  /** Azure resource name, required while creating the app component. */
  resourceName: string;
  /** Azure resource type, required while creating the app component. */
  resourceType: string;
  /** Azure resource display name */
  displayName?: string;
  /** Kind of Azure resource type */
  kind?: string;
}

/** Test server metrics configuration */
export interface TestServerMetricsConfiguration {
  /**
   * Azure resource metrics collection {metric id : metrics object} (Refer :
   * https://learn.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition
   * for metric id).
   */
  metrics: Record<string, ResourceMetric>;
}

/**
 * Associated metric definition for particular metrics of the azure resource (
 * Refer :
 * https://learn.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition).
 */
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

/** The Test Profile Model. A Test Profile resource enables you to set up a test profile which contains various configurations for a supported resource type and a load test to execute on that resource. */
export interface TestProfile {
  /** Display name of the test profile. */
  displayName?: string;
  /** Description for the test profile. */
  description?: string;
  /** Associated test ID for the test profile. This property is required for creating a Test Profile and it's not allowed to be updated. */
  testId?: string;
  /** Target resource ID on which the test profile is created. This property is required for creating a Test Profile and it's not allowed to be updated. */
  targetResourceId?: string;
  /** Configurations of the target resource on which testing would be done. */
  targetResourceConfigurations?: TargetResourceConfigurations;
}

/** Configurations of a target resource. This varies with the kind of resource. */
export interface TargetResourceConfigurationsParent {
  kind: ResourceKind;
}

/** Configurations for a Function App using Flex Consumption Plan. */
export interface FunctionFlexConsumptionTargetResourceConfigurations
  extends TargetResourceConfigurationsParent {
  /**
   * The kind value to use when providing configuration.
   * This should typically be not changed from its value.
   */
  kind: "FunctionsFlexConsumption";
  /** A map of configurations for a Function app using Flex Consumption Plan. */
  configurations?: Record<string, FunctionFlexConsumptionResourceConfiguration>;
}

/** Resource configuration instance for a Flex Consumption based Azure Function App. */
export interface FunctionFlexConsumptionResourceConfiguration {
  /** Memory size of the instance. Supported values are 2048, 4096. */
  instanceMemoryMB: number;
  /** HTTP Concurrency for the function app. */
  httpConcurrency?: number;
}

/** Load test run model */
export interface TestRun {
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
  /** Display name of a testRun. */
  displayName?: string;
  /** Associated test Id. */
  testId?: string;
  /** The test run description. */
  description?: string;
  /**
   * Request data collection level for test run
   *
   * Possible values: "NONE", "ERRORS"
   */
  requestDataLevel?: RequestDataLevel;
  /** Enable or disable debug level logging. True if debug logs are enabled for the test run. False otherwise */
  debugLogsEnabled?: boolean;
  /**
   * The type of the entity that created the test run. (E.x. User, ScheduleTrigger, etc).
   *
   * Possible values: "User", "ScheduledTrigger"
   */
  createdByType?: CreatedByType;
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
}

/** Test run file info. */
export interface TestRunFileInfo {
  /** Name of the file. */
  fileName: string;
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

/** Artifacts container info. */
export interface ArtifactsContainerInfo {
  /** This is a SAS URI to an Azure Storage Container that contains the test run artifacts. */
  url?: string;
  /** Expiry time of the container (RFC 3339 literal format) */
  expireDateTime?: Date | string;
}

/** Filters to fetch the set of metric. */
export interface MetricRequestPayload {
  /**
   * Get metrics for specific dimension values. Example: Metric contains dimension
   * like SamplerName, Error. To retrieve all the time series data where SamplerName
   * is equals to HTTPRequest1 or HTTPRequest2, the DimensionFilter value will be
   * {"SamplerName", ["HTTPRequest1", "HTTPRequest2"}
   */
  filters?: Array<DimensionFilter>;
}

/** Dimension name and values to filter */
export interface DimensionFilter {
  /** The dimension name */
  name?: string;
  /** The dimension values. Maximum values can be 20. */
  values?: string[];
}

/** Test run app component */
export interface TestRunAppComponents {
  /**
   * Azure resource collection { resource id (fully qualified resource Id e.g
   * subscriptions/{subId}/resourceGroups/{rg}/providers/Microsoft.LoadTestService/loadtests/{resName})
   * : resource object }
   */
  components: Record<string, AppComponent>;
}

/** Test run server metrics configuration */
export interface TestRunServerMetricsConfiguration {
  /**
   * Azure resource metrics collection {metric id : metrics object} (Refer :
   * https://learn.microsoft.com/en-us/rest/api/monitor/metric-definitions/list#metricdefinition
   * for metric id).
   */
  metrics?: Record<string, ResourceMetric>;
}

/** The Test Profile Run Model. Test Profile Run resource enables you to instantiate an already created test profile and run load tests to get recommendations on the optimal configuration for the target resource. */
export interface TestProfileRun {
  /** Display name for the test profile run. */
  displayName?: string;
  /** The test profile run description */
  description?: string;
  /** Associated test profile ID for the test profile run. This is required to create a test profile run and can't be updated. */
  testProfileId?: string;
}

/** Details of a particular test run for a test profile run. */
export interface TestRunDetail {
  /**
   * Status of the test run.
   *
   * Possible values: "ACCEPTED", "NOTSTARTED", "PROVISIONING", "PROVISIONED", "CONFIGURING", "CONFIGURED", "EXECUTING", "EXECUTED", "DEPROVISIONING", "DEPROVISIONED", "DONE", "CANCELLING", "CANCELLED", "FAILED", "VALIDATION_SUCCESS", "VALIDATION_FAILURE"
   */
  status: TestRunStatus;
  /** ID of the configuration on which the test ran. */
  configurationId: string;
  /** Key value pair of extra properties associated with the test run. */
  properties: Record<string, string>;
}

/** A recommendation object that provides a list of configuration that optimizes its category. */
export interface TestProfileRunRecommendation {
  /**
   * Category of the recommendation.
   *
   * Possible values: "ThroughputOptimized", "CostOptimized"
   */
  category: RecommendationCategory;
  /** List of configurations IDs for which the recommendation is applicable. These are a subset of the provided target resource configurations. */
  configurations?: string[];
}

/** Trigger model. */
export interface TriggerParent {
  /** The name of the trigger. */
  displayName: string;
  /** The description of the trigger. */
  description?: string;
  /**
   * The current state of the trigger.
   *
   * Possible values: "Active", "Paused", "Completed", "Disabled"
   */
  state?: TriggerState;
  kind: TriggerType;
}

/** State details of the trigger. */
export interface StateDetails {
  /** The error message if the trigger is in disabled state. */
  message?: string;
}

/** ScheduleTestsTrigger model. */
export interface ScheduleTestsTrigger extends TriggerParent {
  /** The type of the trigger is ScheduleTestsTrigger. */
  kind: "ScheduleTestsTrigger";
  /** The test id of test to be triggered by this schedule trigger. Currently only one test is supported for a trigger. */
  testIds: string[];
  /** Start date time of the trigger in UTC timezone. (RFC 3339 literal format) */
  startDateTime?: Date | string;
  /** Recurrence details of the trigger. Null if schedule is not recurring. */
  recurrence?: Recurrence;
}

/** Actual state of the recurrence for the trigger. */
export interface RecurrenceStatus {
  /** The number of occurrences remaining for the trigger. Null if recurrence end has end date instead of number of occurrences. */
  remainingOccurrences?: number;
  /** The next three execution times of the trigger. (RFC 3339 literal format) */
  nextScheduledDateTimes?: Date[] | string[];
}

/** Recurrence model. */
export interface RecurrenceParent {
  /** Recurrence end model. You can specify the end either by providing a numberOfOccurrences (which will end the recurrence after the specified number of occurrences) or by providing an endDateTime (which will end the recurrence after the specified date). If neither value is provided, the recurrence will continue until it is manually ended. However, if both values are provided, an error will be thrown. */
  recurrenceEnd?: RecurrenceEnd;
  frequency: Frequency;
}

/** Recurrence end model. Either provide numberOfOccurrences if you want recurrence to end after a specified number of occurrences or provide endDate if you want recurrence to end after a specified end date. If both values are provided, a validation error will be thrown indicating that only one field should be provided. If neither value is provided, the recurrence will end when manually ended. */
export interface RecurrenceEnd {
  /** Number of occurrences after which the recurrence will end. */
  numberOfOccurrences?: number;
  /** The date after which the recurrence will end. (RFC 3339 literal format) */
  endDateTime?: Date | string;
}

/** Recurrence model when frequency is set as Daily. */
export interface DailyRecurrence extends RecurrenceParent {
  /** Frequency of the day recurrence. */
  frequency: "Daily";
  /** The interval at which the recurrence should repeat. It signifies the number of days between each recurrence. */
  interval: number;
}

/** Recurrence model when frequency is set as Hourly. */
export interface HourlyRecurrence extends RecurrenceParent {
  /** Frequency of the hour recurrence. */
  frequency: "Hourly";
  /** The interval at which the recurrence should repeat. It signifies the number of hours between each recurrence. */
  interval: number;
}

/** Recurrence model when frequency is set as MonthlyByDays . */
export interface MonthlyRecurrenceByWeekDays extends RecurrenceParent {
  /** Frequency of the month recurrence. */
  frequency: "MonthlyByDays";
  /** Specific days of the week when the recurrence should repeat. */
  weekDaysInMonth?: WeekDays[];
  /** Index of the week in a month at which the recurrence should repeat. For example, if the index is '2', weekDay is 'Monday', interval is 3 and frequency is 'Month', the recurrence will run every second Monday of the month and repeat every 3 months. Value of index can be 1 to 5. */
  index: number;
  /** The interval at which the recurrence should repeat. It signifies the number of months between each recurrence. */
  interval: number;
}

/** Recurrence model when frequency is set as MonthlyByDates. */
export interface MonthlyRecurrenceByDates extends RecurrenceParent {
  /** Frequency of the month recurrence. */
  frequency: "MonthlyByDates";
  /** Recurrence set to repeat on the specified dates of the month. Value of dates can be 1 to 31 and -1. -1 represents the last day of the month. */
  datesInMonth?: number[];
  /** The interval at which the recurrence should repeat. It signifies the number of months between each recurrence. */
  interval?: number;
}

/** Recurrence is set based on cron expression. */
export interface RecurrenceWithCron extends RecurrenceParent {
  /** Specify frequency using a cron expression. */
  frequency: "Cron";
  /** Cron expression for the recurrence. */
  cronExpression: string;
}

/** Recurrence model when frequency is set as weekly. */
export interface WeeklyRecurrence extends RecurrenceParent {
  /** Frequency of the week recurrence. */
  frequency: "Weekly";
  /** Recurrence set to repeat on the specified days of the week. */
  daysOfWeek?: WeekDays[];
  /** The interval at which the recurrence should repeat. It signifies the number of weeks between each recurrence. */
  interval?: number;
}

/** Notification rule model. */
export interface NotificationRuleParent {
  /** The name of the notification rule. */
  displayName: string;
  /** The action groups to notify. */
  actionGroupIds: string[];
  scope: NotificationScopeType;
}

/** Tests Notification rule model. */
export interface TestsNotificationRule extends NotificationRuleParent {
  /** Scope of type Tests. */
  scope: "Tests";
  /** The test ids to include. If not provided, notification will be sent for all testIds. */
  testIds?: string[];
  /**
   * The event to receive notifications for along with filtering conditions.
   * Key is a user-assigned identifier for the event filter.
   */
  eventFilters: Record<string, TestsNotificationEventFilter>;
}

/** The notification event filter for Tests scope. */
export interface TestsNotificationEventFilterParent {
  kind: NotificationEventType;
}

/** The notification event filter when the event type is TestRunEnded and scope is Tests. */
export interface TestRunEndedNotificationEventFilter
  extends TestsNotificationEventFilterParent {
  /** Event type for test run ended event. */
  kind: "TestRunEnded";
  /** Event filtering condition. */
  condition?: TestRunEndedEventCondition;
}

/** TestRunEnded Event condition. */
export interface TestRunEndedEventCondition {
  /** The test run statuses to send notification for. */
  testRunStatuses?: TestRunStatus[];
  /** The test run results to send notification for. */
  testRunResults?: PassFailTestResult[];
}

/** The notification event filter when the event type is TestRunStarted and scope is Tests. */
export interface TestRunStartedNotificationEventFilter
  extends TestsNotificationEventFilterParent {
  /** Event type for test run started event. */
  kind: "TestRunStarted";
}

/** The notification event filter when the event type is TriggerCompleted. */
export interface TriggerCompletedNotificationEventFilter
  extends TestsNotificationEventFilterParent {
  /** Event type for trigger ended event. */
  kind: "TriggerCompleted";
}

/** The notification event filter when the event type is TriggerDisabled. */
export interface TriggerDisabledNotificationEventFilter
  extends TestsNotificationEventFilterParent {
  /** Event type for trigger disabled event. */
  kind: "TriggerDisabled";
}

/** Configurations of a target resource. This varies with the kind of resource. */
export type TargetResourceConfigurations =
  | TargetResourceConfigurationsParent
  | FunctionFlexConsumptionTargetResourceConfigurations;
/** Trigger model. */
export type Trigger = TriggerParent | ScheduleTestsTrigger;
/** Recurrence model. */
export type Recurrence =
  | RecurrenceParent
  | DailyRecurrence
  | HourlyRecurrence
  | MonthlyRecurrenceByWeekDays
  | MonthlyRecurrenceByDates
  | RecurrenceWithCron
  | WeeklyRecurrence;
/** Notification rule model. */
export type NotificationRule = NotificationRuleParent | TestsNotificationRule;
/** The notification event filter for Tests scope. */
export type TestsNotificationEventFilter =
  | TestsNotificationEventFilterParent
  | TestRunEndedNotificationEventFilter
  | TestRunStartedNotificationEventFilter
  | TriggerCompletedNotificationEventFilter
  | TriggerDisabledNotificationEventFilter;
/** Alias for PFMetrics */
export type PFMetrics = string;
/** Alias for PassFailAggregationFunction */
export type PassFailAggregationFunction = string;
/** Alias for PassFailAction */
export type PassFailAction = string;
/** Alias for PassFailResult */
export type PassFailResult = string;
/** Alias for SecretType */
export type SecretType = string;
/** Alias for CertificateType */
export type CertificateType = string;
/** Alias for FileType */
export type FileType = string;
/** Alias for FileValidationStatus */
export type FileValidationStatus = string;
/** Alias for TestKind */
export type TestKind = string;
/** Alias for ManagedIdentityType */
export type ManagedIdentityType = string;
/** Alias for ResourceKind */
export type ResourceKind = string;
/** Alias for PassFailTestResult */
export type PassFailTestResult = string;
/** Alias for TestRunStatus */
export type TestRunStatus = string;
/** Alias for RequestDataLevel */
export type RequestDataLevel = string;
/** Alias for CreatedByType */
export type CreatedByType = string;
/** Alias for TimeGrain */
export type TimeGrain = string;
/** Alias for TestProfileRunStatus */
export type TestProfileRunStatus = string;
/** Alias for RecommendationCategory */
export type RecommendationCategory = string;
/** Alias for TriggerType */
export type TriggerType = string;
/** Alias for TriggerState */
export type TriggerState = string;
/** Alias for Frequency */
export type Frequency = string;
/** Alias for WeekDays */
export type WeekDays = string;
/** Alias for NotificationScopeType */
export type NotificationScopeType = string;
/** Alias for NotificationEventType */
export type NotificationEventType = string;

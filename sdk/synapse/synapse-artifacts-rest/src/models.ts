// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface LinkedServiceListResponse {
  /** List of linked services. */
  value: Array<LinkedServiceResource>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
}

export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  id?: string;
  /** The name of the resource */
  name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  type?: string;
}

export type AzureEntityResource = AzureEntityResourceBase & Resource;

export interface AzureEntityResourceBase {
  /** Resource Etag. */
  etag?: string;
}

export type SubResource = SubResourceBase & AzureEntityResource;

export interface SubResourceBase {}

export type LinkedServiceResource = LinkedServiceResourceBase & SubResource;

export interface LinkedServiceResourceBase {
  /** Properties of linked service. */
  properties: LinkedService;
}

export type LinkedService = LinkedServiceBase & LinkedServiceDictionary;

export interface LinkedServiceBase {
  /** Type of linked service. */
  type: string;
  /** The integration runtime reference. */
  connectVia?: IntegrationRuntimeReference;
  /** Linked service description. */
  description?: string;
  /** Parameters for linked service. */
  parameters?: Record<string, ParameterSpecification>;
  /** List of tags that can be used for describing the linked service. */
  annotations?: Array<Record<string, unknown>>;
}

export interface IntegrationRuntimeReference {
  /** Type of integration runtime. */
  type: "IntegrationRuntimeReference";
  /** Reference integration runtime name. */
  referenceName: string;
  /** Arguments for integration runtime. */
  parameters?: Record<string, Record<string, unknown>>;
}

export interface ParameterSpecification {
  /** Parameter type. */
  type:
    | "Object"
    | "String"
    | "Int"
    | "Float"
    | "Bool"
    | "Array"
    | "SecureString";
  /** Default value of parameter. */
  defaultValue?: Record<string, unknown>;
}

export interface CloudError {
  /** Error data */
  error: CloudErrorBody;
}

export interface CloudErrorBody {
  /** Error code. */
  code: string;
  /** Error message. */
  message: string;
  /** Property name/path in request associated with error. */
  target?: string;
  /** Array with additional error details. */
  details?: Array<CloudError>;
}

export interface ArtifactRenameRequest {
  /** New name of the artifact. */
  newName?: string;
}

export interface DatasetListResponse {
  /** List of datasets. */
  value: Array<DatasetResource>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
}

export type DatasetResource = DatasetResourceBase & SubResource;

export interface DatasetResourceBase {
  /** Dataset properties. */
  properties: Dataset;
}

export type Dataset = DatasetBase & DatasetDictionary;

export interface DatasetBase {
  /** Type of dataset. */
  type: string;
  /** Dataset description. */
  description?: string;
  /** Columns that define the structure of the dataset. Type: array (or Expression with resultType array), itemType: DatasetDataElement. */
  structure?: Record<string, unknown>;
  /** Columns that define the physical type schema of the dataset. Type: array (or Expression with resultType array), itemType: DatasetSchemaDataElement. */
  schema?: Record<string, unknown>;
  /** Linked service reference. */
  linkedServiceName: LinkedServiceReference;
  /** Parameters for dataset. */
  parameters?: Record<string, ParameterSpecification>;
  /** List of tags that can be used for describing the Dataset. */
  annotations?: Array<Record<string, unknown>>;
  /** The folder that this Dataset is in. If not specified, Dataset will appear at the root level. */
  folder?: DatasetFolder;
}

export interface LinkedServiceReference {
  /** Linked service reference type. */
  type: "LinkedServiceReference";
  /** Reference LinkedService name. */
  referenceName: string;
  /** Arguments for LinkedService. */
  parameters?: Record<string, Record<string, unknown>>;
}

export interface DatasetFolder {
  /** The name of the folder that this Dataset is in. */
  name?: string;
}

export interface PipelineListResponse {
  /** List of pipelines. */
  value: Array<PipelineResource>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
}

export type PipelineResource = PipelineResourceBase &
  SubResource &
  PipelineResourceDictionary;

export interface PipelineResourceBase {
  /** Properties of the pipeline. */
  properties: Pipeline;
}

export interface Pipeline {
  /** The description of the pipeline. */
  description?: string;
  /** List of activities in pipeline. */
  activities?: Array<Activity>;
  /** List of parameters for pipeline. */
  parameters?: Record<string, ParameterSpecification>;
  /** List of variables for pipeline. */
  variables?: Record<string, VariableSpecification>;
  /** The max number of concurrent runs for the pipeline. */
  concurrency?: number;
  /** List of tags that can be used for describing the Pipeline. */
  annotations?: Array<Record<string, unknown>>;
  /** Dimensions emitted by Pipeline. */
  runDimensions?: Record<string, Record<string, unknown>>;
  /** The folder that this Pipeline is in. If not specified, Pipeline will appear at the root level. */
  folder?: PipelineFolder;
}

export type Activity = ActivityBase & ActivityDictionary;

export interface ActivityBase {
  /** Activity name. */
  name: string;
  /** Type of activity. */
  type: string;
  /** Activity description. */
  description?: string;
  /** Activity depends on condition. */
  dependsOn?: Array<ActivityDependency>;
  /** Activity user properties. */
  userProperties?: Array<UserProperty>;
}

export type ActivityDependency = ActivityDependencyBase &
  ActivityDependencyDictionary;

export interface ActivityDependencyBase {
  /** Activity name. */
  activity: string;
  /** Match-Condition for the dependency. */
  dependencyConditions: Array<"Succeeded" | "Failed" | "Skipped" | "Completed">;
}

export interface UserProperty {
  /** User property name. */
  name: string;
  /** User property value. Type: string (or Expression with resultType string). */
  value: Record<string, unknown>;
}

export interface VariableSpecification {
  /** Variable type. */
  type: "String" | "Bool" | "Boolean" | "Array";
  /** Default value of variable. */
  defaultValue?: Record<string, unknown>;
}

export interface PipelineFolder {
  /** The name of the folder that this Pipeline is in. */
  name?: string;
}

export interface CreateRunResponse {
  /** Identifier of a run. */
  runId: string;
}

export interface RunFilterParameters {
  /** The continuation token for getting the next page of results. Null for first page. */
  continuationToken?: string;
  /** The time at or after which the run event was updated in 'ISO 8601' format. */
  lastUpdatedAfter: Date;
  /** The time at or before which the run event was updated in 'ISO 8601' format. */
  lastUpdatedBefore: Date;
  /** List of filters. */
  filters?: Array<RunQueryFilter>;
  /** List of OrderBy option. */
  orderBy?: Array<RunQueryOrderBy>;
}

export interface RunQueryFilter {
  /** Parameter name to be used for filter. The allowed operands to query pipeline runs are PipelineName, RunStart, RunEnd and Status; to query activity runs are ActivityName, ActivityRunStart, ActivityRunEnd, ActivityType and Status, and to query trigger runs are TriggerName, TriggerRunTimestamp and Status. */
  operand:
    | "PipelineName"
    | "Status"
    | "RunStart"
    | "RunEnd"
    | "ActivityName"
    | "ActivityRunStart"
    | "ActivityRunEnd"
    | "ActivityType"
    | "TriggerName"
    | "TriggerRunTimestamp"
    | "RunGroupId"
    | "LatestOnly";
  /** Operator to be used for filter. */
  operator: "Equals" | "NotEquals" | "In" | "NotIn";
  /** List of filter values. */
  values: Array<string>;
}

export interface RunQueryOrderBy {
  /** Parameter name to be used for order by. The allowed parameters to order by for pipeline runs are PipelineName, RunStart, RunEnd and Status; for activity runs are ActivityName, ActivityRunStart, ActivityRunEnd and Status; for trigger runs are TriggerName, TriggerRunTimestamp and Status. */
  orderBy:
    | "RunStart"
    | "RunEnd"
    | "PipelineName"
    | "Status"
    | "ActivityName"
    | "ActivityRunStart"
    | "ActivityRunEnd"
    | "TriggerName"
    | "TriggerRunTimestamp";
  /** Sorting order of the parameter. */
  order: "ASC" | "DESC";
}

export interface PipelineRunsQueryResponse {
  /** List of pipeline runs. */
  value: Array<PipelineRun>;
  /** The continuation token for getting the next page of results, if any remaining results exist, null otherwise. */
  continuationToken?: string;
}

export type PipelineRun = PipelineRunBase & PipelineRunDictionary;

export interface PipelineRunBase {
  /** Identifier of a run. */
  runId?: string;
  /** Identifier that correlates all the recovery runs of a pipeline run. */
  runGroupId?: string;
  /** Indicates if the recovered pipeline run is the latest in its group. */
  isLatest?: boolean;
  /** The pipeline name. */
  pipelineName?: string;
  /** The full or partial list of parameter name, value pair used in the pipeline run. */
  parameters?: Record<string, string>;
  /** Entity that started the pipeline run. */
  invokedBy?: PipelineRunInvokedBy;
  /** The last updated timestamp for the pipeline run event in ISO8601 format. */
  lastUpdated?: Date;
  /** The start time of a pipeline run in ISO8601 format. */
  runStart?: Date;
  /** The end time of a pipeline run in ISO8601 format. */
  runEnd?: Date;
  /** The duration of a pipeline run. */
  durationInMs?: number;
  /** The status of a pipeline run. */
  status?: string;
  /** The message from a pipeline run. */
  message?: string;
}

export interface PipelineRunInvokedBy {
  /** Name of the entity that started the pipeline run. */
  name?: string;
  /** The ID of the entity that started the run. */
  id?: string;
  /** The type of the entity that started the run. */
  invokedByType?: string;
}

export interface ActivityRunsQueryResponse {
  /** List of activity runs. */
  value: Array<ActivityRun>;
  /** The continuation token for getting the next page of results, if any remaining results exist, null otherwise. */
  continuationToken?: string;
}

export type ActivityRun = ActivityRunBase & ActivityRunDictionary;

export interface ActivityRunBase {
  /** The name of the pipeline. */
  pipelineName?: string;
  /** The id of the pipeline run. */
  pipelineRunId?: string;
  /** The name of the activity. */
  activityName?: string;
  /** The type of the activity. */
  activityType?: string;
  /** The id of the activity run. */
  activityRunId?: string;
  /** The name of the compute linked service. */
  linkedServiceName?: string;
  /** The status of the activity run. */
  status?: string;
  /** The start time of the activity run in 'ISO 8601' format. */
  activityRunStart?: Date;
  /** The end time of the activity run in 'ISO 8601' format. */
  activityRunEnd?: Date;
  /** The duration of the activity run. */
  durationInMs?: number;
  /** The input for the activity. */
  input?: Record<string, unknown>;
  /** The output for the activity. */
  output?: Record<string, unknown>;
  /** The error if any from the activity run. */
  error?: Record<string, unknown>;
}

export interface TriggerListResponse {
  /** List of triggers. */
  value: Array<TriggerResource>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
}

export type TriggerResource = TriggerResourceBase & SubResource;

export interface TriggerResourceBase {
  /** Properties of the trigger. */
  properties: Trigger;
}

export type Trigger = TriggerBase & TriggerDictionary;

export interface TriggerBase {
  /** Trigger type. */
  type: string;
  /** Trigger description. */
  description?: string;
  /** Indicates if trigger is running or not. Updated when Start/Stop APIs are called on the Trigger. */
  runtimeState?: "Started" | "Stopped" | "Disabled";
  /** List of tags that can be used for describing the trigger. */
  annotations?: Array<Record<string, unknown>>;
}

export interface TriggerSubscriptionOperationStatus {
  /** Trigger name. */
  triggerName?: string;
  /** Event Subscription Status. */
  status?:
    | "Enabled"
    | "Provisioning"
    | "Deprovisioning"
    | "Disabled"
    | "Unknown";
}

export interface TriggerRunsQueryResponse {
  /** List of trigger runs. */
  value: Array<TriggerRun>;
  /** The continuation token for getting the next page of results, if any remaining results exist, null otherwise. */
  continuationToken?: string;
}

export type TriggerRun = TriggerRunBase & TriggerRunDictionary;

export interface TriggerRunBase {
  /** Trigger run id. */
  triggerRunId?: string;
  /** Trigger name. */
  triggerName?: string;
  /** Trigger type. */
  triggerType?: string;
  /** Trigger run start time. */
  triggerRunTimestamp?: Date;
  /** Trigger run status. */
  status?: "Succeeded" | "Failed" | "Inprogress";
  /** Trigger error message. */
  message?: string;
  /** List of property name and value related to trigger run. Name, value pair depends on type of trigger. */
  properties?: Record<string, string>;
  /** List of pipeline name and run Id triggered by the trigger run. */
  triggeredPipelines?: Record<string, string>;
}

export type DataFlowResource = DataFlowResourceBase & SubResource;

export interface DataFlowResourceBase {
  /** Data flow properties. */
  properties: DataFlow;
}

export interface DataFlow {
  /** Type of data flow. */
  type: string;
  /** The description of the data flow. */
  description?: string;
  /** List of tags that can be used for describing the data flow. */
  annotations?: Array<Record<string, unknown>>;
  /** The folder that this data flow is in. If not specified, Data flow will appear at the root level. */
  folder?: DataFlowFolder;
}

export interface DataFlowFolder {
  /** The name of the folder that this data flow is in. */
  name?: string;
}

export interface DataFlowListResponse {
  /** List of data flows. */
  value: Array<DataFlowResource>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
}

export interface CreateDataFlowDebugSessionRequest {
  /** The name of the data flow. */
  dataFlowName?: string;
  /** The ID of existing Databricks cluster. */
  existingClusterId?: string;
  /** Timeout setting for Databricks cluster. */
  clusterTimeout?: number;
  /** The name of new Databricks cluster. */
  newClusterName?: string;
  /** The type of new Databricks cluster. */
  newClusterNodeType?: string;
  /** Data bricks linked service. */
  dataBricksLinkedService?: LinkedServiceResource;
}

export interface CreateDataFlowDebugSessionResponse {
  /** The ID of data flow debug session. */
  sessionId?: string;
}

export interface QueryDataFlowDebugSessionsResponse {
  /** Array with all active debug sessions. */
  value?: Array<DataFlowDebugSessionInfo>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
}

export type DataFlowDebugSessionInfo = DataFlowDebugSessionInfoBase &
  DataFlowDebugSessionInfoDictionary;

export interface DataFlowDebugSessionInfoBase {
  /** The name of the data flow. */
  dataFlowName?: string;
  /** Compute type of the cluster. */
  computeType?: string;
  /** Core count of the cluster. */
  coreCount?: number;
  /** Node count of the cluster. (deprecated property) */
  nodeCount?: number;
  /** Attached integration runtime name of data flow debug session. */
  integrationRuntimeName?: string;
  /** The ID of data flow debug session. */
  sessionId?: string;
  /** Start time of data flow debug session. */
  startTime?: string;
  /** Compute type of the cluster. */
  timeToLiveInMinutes?: number;
  /** Last activity time of data flow debug session. */
  lastActivityTime?: string;
}

export type DataFlowDebugPackage = DataFlowDebugPackageBase &
  DataFlowDebugPackageDictionary;

export interface DataFlowDebugPackageBase {
  /** The ID of data flow debug session. */
  sessionId?: string;
  /** Data flow instance. */
  dataFlow?: DataFlowDebugResource;
  /** List of datasets. */
  datasets?: Array<DatasetDebugResource>;
  /** List of linked services. */
  linkedServices?: Array<LinkedServiceDebugResource>;
  /** Staging info for debug session. */
  staging?: DataFlowStagingInfo;
  /** Data flow debug settings. */
  debugSettings?: DataFlowDebugPackageDebugSettings;
}

export interface SubResourceDebugResource {
  /** The resource name. */
  name?: string;
}

export type DataFlowDebugResource = DataFlowDebugResourceBase &
  SubResourceDebugResource;

export interface DataFlowDebugResourceBase {
  /** Data flow properties. */
  properties: DataFlow;
}

export type DatasetDebugResource = DatasetDebugResourceBase &
  SubResourceDebugResource;

export interface DatasetDebugResourceBase {
  /** Dataset properties. */
  properties: Dataset;
}

export type LinkedServiceDebugResource = LinkedServiceDebugResourceBase &
  SubResourceDebugResource;

export interface LinkedServiceDebugResourceBase {
  /** Properties of linked service. */
  properties: LinkedService;
}

export interface DataFlowStagingInfo {
  /** Staging linked service reference. */
  linkedService?: LinkedServiceReference;
  /** Folder path for staging blob. */
  folderPath?: string;
}

export interface DataFlowDebugPackageDebugSettings {
  /** Source setting for data flow debug. */
  sourceSettings?: Array<DataFlowSourceSetting>;
  /** Data flow parameters. */
  parameters?: Record<string, Record<string, unknown>>;
  /** Parameters for dataset. */
  datasetParameters?: Record<string, unknown>;
}

export type DataFlowSourceSetting = DataFlowSourceSettingBase &
  DataFlowSourceSettingDictionary;

export interface DataFlowSourceSettingBase {
  /** The data flow source name. */
  sourceName?: string;
  /** Defines the row limit of data flow source in debug. */
  rowLimit?: number;
}

export interface AddDataFlowToDebugSessionResponse {
  /** The ID of data flow debug job version. */
  jobVersion?: string;
}

export interface DeleteDataFlowDebugSessionRequest {
  /** The ID of data flow debug session. */
  sessionId?: string;
  /** The data flow which contains the debug session. */
  dataFlowName?: string;
}

export interface DataFlowDebugCommandRequest {
  /** The ID of data flow debug session. */
  sessionId: string;
  /** The data flow which contains the debug session. */
  dataFlowName?: string;
  /** The command name. */
  commandName?: string;
  /** The command payload object. */
  commandPayload: Record<string, unknown>;
}

export interface DataFlowDebugCommandResponse {
  /** The run status of data preview, statistics or expression preview. */
  status?: string;
  /** The result data of data preview, statistics or expression preview. */
  data?: string;
}

export interface SqlScriptsListResponse {
  /** List of sql scripts. */
  value: Array<SqlScriptResource>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
}

export interface SqlScriptResource {
  /** Fully qualified resource Id for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  id?: string;
  /** The name of the resource */
  name: string;
  /** The type of the resource. Ex- Microsoft.Compute/virtualMachines or Microsoft.Storage/storageAccounts. */
  type?: string;
  /** Resource Etag. */
  etag?: string;
  /** Properties of sql script. */
  properties: SqlScript;
}

export type SqlScript = SqlScriptBase & SqlScriptDictionary;

export interface SqlScriptBase {
  /** The description of the SQL script. */
  description?: string;
  /** The type of the SQL script. */
  type?: "SqlQuery";
  /** The content of the SQL script. */
  content: SqlScriptContent;
}

export type SqlScriptContent = SqlScriptContentBase &
  SqlScriptContentDictionary;

export interface SqlScriptContentBase {
  /** SQL query to execute. */
  query: string;
  /** The connection used to execute the SQL script. */
  currentConnection: SqlConnection;
  /** The metadata of the SQL script. */
  metadata?: SqlScriptMetadata;
}

export type SqlConnection = SqlConnectionBase & SqlConnectionDictionary;

export interface SqlConnectionBase {
  /** The type of the connection. */
  type: "SqlOnDemand" | "SqlPool";
  /** The identifier of the connection. */
  name: string;
}

export type SqlScriptMetadata = SqlScriptMetadataBase &
  SqlScriptMetadataDictionary;

export interface SqlScriptMetadataBase {
  /** The language of the SQL script. */
  language?: string;
}

export interface SparkJobDefinitionsListResponse {
  /** List of spark job definitions. */
  value: Array<SparkJobDefinitionResource>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
}

export type SparkJobDefinitionResource = SparkJobDefinitionResourceBase &
  SubResource;

export interface SparkJobDefinitionResourceBase {
  /** Properties of spark job definition. */
  properties: SparkJobDefinition;
}

export type SparkJobDefinition = SparkJobDefinitionBase &
  SparkJobDefinitionDictionary;

export interface SparkJobDefinitionBase {
  /** The description of the Spark job definition. */
  description?: string;
  /** Big data pool reference. */
  targetBigDataPool: BigDataPoolReference;
  /** The required Spark version of the application. */
  requiredSparkVersion?: string;
  /** The language of the Spark application. */
  language?: string;
  /** The properties of the Spark job. */
  jobProperties: SparkJobProperties;
}

export interface BigDataPoolReference {
  /** Big data pool reference type. */
  type: "BigDataPoolReference";
  /** Reference big data pool name. */
  referenceName: string;
}

export type SparkJobProperties = SparkJobPropertiesBase &
  SparkJobPropertiesDictionary;

export interface SparkJobPropertiesBase {
  /** The name of the job. */
  name?: string;
  /** File containing the application to execute. */
  file: string;
  /** Main class for Java/Scala application. */
  className?: string;
  /** Spark configuration properties. */
  conf?: Record<string, unknown>;
  /** Command line arguments for the application. */
  args?: Array<string>;
  /** Jars to be used in this job. */
  jars?: Array<string>;
  /** files to be used in this job. */
  files?: Array<string>;
  /** Archives to be used in this job. */
  archives?: Array<string>;
  /** Amount of memory to use for the driver process. */
  driverMemory: string;
  /** Number of cores to use for the driver. */
  driverCores: number;
  /** Amount of memory to use per executor process. */
  executorMemory: string;
  /** Number of cores to use for each executor. */
  executorCores: number;
  /** Number of executors to launch for this job. */
  numExecutors: number;
}

export interface SparkBatchJob {
  livyInfo?: SparkBatchJobState;
  /** The batch name. */
  name?: string;
  /** The workspace name. */
  workspaceName?: string;
  /** The Spark pool name. */
  sparkPoolName?: string;
  /** The submitter name. */
  submitterName?: string;
  /** The submitter identifier. */
  submitterId?: string;
  /** The artifact identifier. */
  artifactId?: string;
  /** The job type. */
  jobType?: "SparkBatch" | "SparkSession";
  /** The Spark batch job result. */
  result?: "Uncertain" | "Succeeded" | "Failed" | "Cancelled";
  /** The scheduler information. */
  scheduler?: SparkScheduler;
  /** The plugin information. */
  plugin?: SparkServicePlugin;
  /** The error information. */
  errors?: Array<SparkServiceError>;
  /** The tags. */
  tags?: Record<string, string>;
  /** The session Id. */
  id: number;
  /** The application id of this session */
  appId?: string;
  /** The detailed application info. */
  appInfo?: Record<string, string>;
  /** The batch state */
  state?: string;
  /** The log lines. */
  logLines?: Array<string>;
}

export interface SparkBatchJobState {
  /** the time that at which "not_started" livy state was first seen. */
  notStartedAt?: Date;
  /** the time that at which "starting" livy state was first seen. */
  startingAt?: Date;
  /** the time that at which "running" livy state was first seen. */
  runningAt?: Date;
  /** time that at which "dead" livy state was first seen. */
  deadAt?: Date;
  /** the time that at which "success" livy state was first seen. */
  successAt?: Date;
  /** the time that at which "killed" livy state was first seen. */
  terminatedAt?: Date;
  /** the time that at which "recovering" livy state was first seen. */
  recoveringAt?: Date;
  /** the Spark job state. */
  currentState?: string;
  jobCreationRequest?: SparkRequest;
}

export interface SparkRequest {
  name?: string;
  file?: string;
  className?: string;
  arguments?: Array<string>;
  jars?: Array<string>;
  pythonFiles?: Array<string>;
  files?: Array<string>;
  archives?: Array<string>;
  /** Dictionary of <string> */
  configuration?: Record<string, string>;
  driverMemory?: string;
  driverCores?: number;
  executorMemory?: string;
  executorCores?: number;
  executorCount?: number;
}

export interface SparkScheduler {
  submittedAt?: Date;
  scheduledAt?: Date;
  endedAt?: Date;
  cancellationRequestedAt?: Date;
  currentState?: "Queued" | "Scheduled" | "Ended";
}

export interface SparkServicePlugin {
  preparationStartedAt?: Date;
  resourceAcquisitionStartedAt?: Date;
  submissionStartedAt?: Date;
  monitoringStartedAt?: Date;
  cleanupStartedAt?: Date;
  currentState?:
    | "Preparation"
    | "ResourceAcquisition"
    | "Queued"
    | "Submission"
    | "Monitoring"
    | "Cleanup"
    | "Ended";
}

export interface SparkServiceError {
  message?: string;
  errorCode?: string;
  source?: "System" | "User" | "Unknown" | "Dependency";
}

export interface NotebookListResponse {
  /** List of Notebooks. */
  value: Array<NotebookResource>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
}

export interface NotebookResource {
  /** Fully qualified resource Id for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  id?: string;
  /** The name of the resource */
  name: string;
  /** The type of the resource. Ex- Microsoft.Compute/virtualMachines or Microsoft.Storage/storageAccounts. */
  type?: string;
  /** Resource Etag. */
  etag?: string;
  /** Properties of Notebook. */
  properties: Notebook;
}

export type Notebook = NotebookBase & NotebookDictionary;

export interface NotebookBase {
  /** The description of the notebook. */
  description?: string;
  /** Big data pool reference. */
  bigDataPool?: BigDataPoolReference;
  /** Session properties. */
  sessionProperties?: NotebookSessionProperties;
  /** Notebook root-level metadata. */
  metadata: NotebookMetadata;
  /** Notebook format (major number). Incremented between backwards incompatible changes to the notebook format. */
  nbformat: number;
  /** Notebook format (minor number). Incremented for backward compatible changes to the notebook format. */
  nbformatMinor: number;
  /** Array of cells of the current notebook. */
  cells: Array<NotebookCell>;
}

export interface NotebookSessionProperties {
  /** Amount of memory to use for the driver process. */
  driverMemory: string;
  /** Number of cores to use for the driver. */
  driverCores: number;
  /** Amount of memory to use per executor process. */
  executorMemory: string;
  /** Number of cores to use for each executor. */
  executorCores: number;
  /** Number of executors to launch for this session. */
  numExecutors: number;
}

export type NotebookMetadata = NotebookMetadataBase &
  NotebookMetadataDictionary;

export interface NotebookMetadataBase {
  /** Kernel information. */
  kernelspec?: NotebookKernelSpec;
  /** Language info. */
  languageInfo?: NotebookLanguageInfo;
}

export type NotebookKernelSpec = NotebookKernelSpecBase &
  NotebookKernelSpecDictionary;

export interface NotebookKernelSpecBase {
  /** Name of the kernel specification. */
  name: string;
  /** Name to display in UI. */
  displayName: string;
}

export type NotebookLanguageInfo = NotebookLanguageInfoBase &
  NotebookLanguageInfoDictionary;

export interface NotebookLanguageInfoBase {
  /** The programming language which this kernel runs. */
  name: string;
  /** The codemirror mode to use for code in this language. */
  codemirrorMode?: string;
}

export type NotebookCell = NotebookCellBase & NotebookCellDictionary;

export interface NotebookCellBase {
  /** String identifying the type of cell. */
  cellType: string;
  /** Cell-level metadata. */
  metadata: Record<string, unknown>;
  /** Contents of the cell, represented as an array of lines. */
  source: Array<string>;
  /** Attachments associated with the cell. */
  attachments?: Record<string, unknown>;
  /** Cell-level output items. */
  outputs?: Array<NotebookCellOutputItem>;
}

export interface NotebookCellOutputItem {
  /** For output_type=stream, determines the name of stream (stdout / stderr). */
  name?: string;
  /** Execution sequence number. */
  executionCount?: number;
  /** Execution, display, or stream outputs. */
  outputType: "execute_result" | "display_data" | "stream" | "error";
  /** For output_type=stream, the stream's text output, represented as a string or an array of strings. */
  text?: any;
  /** Output data. Use MIME type as key, and content as value. */
  data?: Record<string, unknown>;
  /** Metadata for the output item. */
  metadata?: Record<string, unknown>;
}

export type TrackedResource = TrackedResourceBase & Resource;

export interface TrackedResourceBase {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export type Workspace = WorkspaceBase & TrackedResource;

export interface WorkspaceBase {
  /** Workspace resource properties */
  properties?: WorkspaceProperties;
  /** Identity of the workspace */
  identity?: ManagedIdentity;
}

export interface WorkspaceProperties {
  /** Workspace default data lake storage account details */
  defaultDataLakeStorage?: DataLakeStorageAccountDetails;
  /** SQL administrator login password */
  sqlAdministratorLoginPassword?: string;
  /** Workspace managed resource group. The resource group name uniquely identifies the resource group within the user subscriptionId. The resource group name must be no longer than 90 characters long, and must be alphanumeric characters (Char.IsLetterOrDigit()) and '-', '_', '(', ')' and'.'. Note that the name cannot end with '.' */
  managedResourceGroupName?: string;
  /** Resource provisioning state */
  provisioningState?: string;
  /** Login for workspace SQL active directory administrator */
  sqlAdministratorLogin?: string;
  /** Virtual Network profile */
  virtualNetworkProfile?: VirtualNetworkProfile;
  /** Connectivity endpoints */
  connectivityEndpoints?: Record<string, string>;
  /** Setting this to 'default' will ensure that all compute for this workspace is in a virtual network managed on behalf of the user. */
  managedVirtualNetwork?: string;
  /** Private endpoint connections to the workspace */
  privateEndpointConnections?: Array<PrivateEndpointConnection>;
  /** The encryption details of the workspace */
  encryption?: EncryptionDetails;
  /** The workspace unique identifier */
  workspaceUID?: string;
  /** Workspace level configs and feature flags */
  extraProperties?: Record<string, Record<string, unknown>>;
  /** Managed Virtual Network Settings */
  managedVirtualNetworkSettings?: ManagedVirtualNetworkSettings;
  /** Git integration settings */
  workspaceRepositoryConfiguration?: WorkspaceRepositoryConfiguration;
  /** Purview Configuration */
  purviewConfiguration?: PurviewConfiguration;
  /** The ADLA resource ID. */
  adlaResourceId?: string;
}

export interface DataLakeStorageAccountDetails {
  /** Account URL */
  accountUrl?: string;
  /** Filesystem name */
  filesystem?: string;
}

export interface VirtualNetworkProfile {
  /** Subnet ID used for computes in workspace */
  computeSubnetId?: string;
}

export type ProxyResource = ProxyResourceBase & Resource;

export interface ProxyResourceBase {}

export type PrivateEndpointConnection = PrivateEndpointConnectionBase &
  ProxyResource;

export interface PrivateEndpointConnectionBase {
  /** Private endpoint connection properties. */
  properties?: PrivateEndpointConnectionProperties;
}

export interface PrivateEndpointConnectionProperties {
  /** The private endpoint which the connection belongs to. */
  privateEndpoint?: PrivateEndpoint;
  /** Connection state of the private endpoint connection. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** Provisioning state of the private endpoint connection. */
  provisioningState?: string;
}

export interface PrivateEndpoint {
  /** Resource id of the private endpoint. */
  id?: string;
}

export interface PrivateLinkServiceConnectionState {
  /** The private link service connection status. */
  status?: string;
  /** The private link service connection description. */
  description?: string;
  /** The actions required for private link service connection. */
  actionsRequired?: string;
}

export interface EncryptionDetails {
  /** Double Encryption enabled */
  doubleEncryptionEnabled?: boolean;
  /** Customer Managed Key Details */
  cmk?: CustomerManagedKeyDetails;
}

export interface CustomerManagedKeyDetails {
  /** The customer managed key status on the workspace */
  status?: string;
  /** The key object of the workspace */
  key?: WorkspaceKeyDetails;
}

export interface WorkspaceKeyDetails {
  /** Workspace Key sub-resource name */
  name?: string;
  /** Workspace Key sub-resource key vault url */
  keyVaultUrl?: string;
}

export interface ManagedVirtualNetworkSettings {
  /** Prevent Data Exfiltration */
  preventDataExfiltration?: boolean;
  /** Linked Access Check On Target Resource */
  linkedAccessCheckOnTargetResource?: boolean;
  /** Allowed Aad Tenant Ids For Linking */
  allowedAadTenantIdsForLinking?: Array<string>;
}

export interface WorkspaceRepositoryConfiguration {
  /** Type of workspace repositoryID configuration. Example WorkspaceVSTSConfiguration, WorkspaceGitHubConfiguration */
  type?: string;
  /** GitHub Enterprise host name. For example: https://github.mydomain.com */
  hostName?: string;
  /** Account name */
  accountName?: string;
  /** VSTS project name */
  projectName?: string;
  /** Repository name */
  repositoryName?: string;
  /** Collaboration branch */
  collaborationBranch?: string;
  /** Root folder to use in the repository */
  rootFolder?: string;
  /** The last commit ID */
  lastCommitId?: string;
  /** The VSTS tenant ID */
  tenantId?: string;
}

export interface PurviewConfiguration {
  /** Purview Resource ID */
  purviewResourceId?: string;
}

export interface ManagedIdentity {
  /** The principal ID of the workspace managed identity */
  principalId?: string;
  /** The tenant ID of the workspace managed identity */
  tenantId?: string;
  /** The type of managed identity for the workspace */
  type?: "None" | "SystemAssigned";
}

export interface ErrorContract {
  /** The error details. */
  error?: ErrorResponse;
}

export interface ErrorResponse {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** The error target. */
  target?: string;
  /** The error details. */
  details?: Array<ErrorResponse>;
  /** The error additional info. */
  additionalInfo?: Array<ErrorAdditionalInfo>;
}

export interface ErrorAdditionalInfo {
  /** The additional info type. */
  type?: string;
  /** The additional info. */
  info?: Record<string, unknown>;
}

export interface SqlPoolInfoListResult {
  /** Link to the next page of results */
  nextLink?: string;
  /** List of SQL pools */
  value?: Array<SqlPool>;
}

export type SqlPool = SqlPoolBase & TrackedResource;

export interface SqlPoolBase {
  /** SQL pool SKU */
  sku?: Sku;
  /** SQL pool properties */
  properties?: SqlPoolResourceProperties;
}

export interface Sku {
  /** The service tier */
  tier?: string;
  /** The SKU name */
  name?: string;
  /** If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted. */
  capacity?: number;
}

export interface SqlPoolResourceProperties {
  /** Maximum size in bytes */
  maxSizeBytes?: number;
  /** Collation mode */
  collation?: string;
  /** Source database to create from */
  sourceDatabaseId?: string;
  /** Backup database to restore from */
  recoverableDatabaseId?: string;
  /** Resource state */
  provisioningState?: string;
  /** Resource status */
  status?: string;
  /** Snapshot time to restore */
  restorePointInTime?: string;
  /** What is this? */
  createMode?: string;
  /** Date the SQL pool was created */
  creationDate?: Date;
}

export interface BigDataPoolResourceInfoListResult {
  /** Link to the next page of results */
  nextLink?: string;
  /** List of Big Data pools */
  value?: Array<BigDataPoolResourceInfo>;
}

export type BigDataPoolResourceInfo = BigDataPoolResourceInfoBase &
  TrackedResource;

export interface BigDataPoolResourceInfoBase {
  /** Big Data pool properties */
  properties?: BigDataPoolResourceProperties;
}

export interface BigDataPoolResourceProperties {
  /** The state of the Big Data pool. */
  provisioningState?: string;
  /** Auto-scaling properties */
  autoScale?: AutoScaleProperties;
  /** The time when the Big Data pool was created. */
  creationDate?: Date;
  /** Auto-pausing properties */
  autoPause?: AutoPauseProperties;
  /** Whether compute isolation is required or not. */
  isComputeIsolationEnabled?: boolean;
  /** Whether session level packages enabled. */
  sessionLevelPackagesEnabled?: boolean;
  /** The cache size */
  cacheSize?: number;
  /** Dynamic Executor Allocation */
  dynamicExecutorAllocation?: DynamicExecutorAllocation;
  /** The Spark events folder */
  sparkEventsFolder?: string;
  /** The number of nodes in the Big Data pool. */
  nodeCount?: number;
  /** Library version requirements */
  libraryRequirements?: LibraryRequirements;
  /** List of custom libraries/packages associated with the spark pool. */
  customLibraries?: Array<LibraryInfo>;
  /** Spark configuration file to specify additional properties */
  sparkConfigProperties?: LibraryRequirements;
  /** The Apache Spark version. */
  sparkVersion?: string;
  /** The default folder where Spark logs will be written. */
  defaultSparkLogFolder?: string;
  /** The level of compute power that each node in the Big Data pool has. */
  nodeSize?:
    | "None"
    | "Small"
    | "Medium"
    | "Large"
    | "XLarge"
    | "XXLarge"
    | "XXXLarge";
  /** The kind of nodes that the Big Data pool provides. */
  nodeSizeFamily?: "None" | "MemoryOptimized";
  /** The time when the Big Data pool was updated successfully. */
  lastSucceededTimestamp?: Date;
}

export interface AutoScaleProperties {
  /** The minimum number of nodes the Big Data pool can support. */
  minNodeCount?: number;
  /** Whether automatic scaling is enabled for the Big Data pool. */
  enabled?: boolean;
  /** The maximum number of nodes the Big Data pool can support. */
  maxNodeCount?: number;
}

export interface AutoPauseProperties {
  /** Number of minutes of idle time before the Big Data pool is automatically paused. */
  delayInMinutes?: number;
  /** Whether auto-pausing is enabled for the Big Data pool. */
  enabled?: boolean;
}

export interface DynamicExecutorAllocation {
  /** Indicates whether Dynamic Executor Allocation is enabled or not. */
  enabled?: boolean;
}

export interface LibraryRequirements {
  /** The last update time of the library requirements file. */
  time?: Date;
  /** The library requirements. */
  content?: string;
  /** The filename of the library requirements file. */
  filename?: string;
}

export interface LibraryInfo {
  /** Name of the library. */
  name?: string;
  /** Storage blob path of library. */
  path?: string;
  /** Storage blob container name. */
  containerName?: string;
  /** The last update time of the library. */
  uploadedTimestamp?: Date;
  /** Type of the library. */
  type?: string;
  /** Provisioning status of the library/package. */
  provisioningStatus?: string;
  /** Creator Id of the library/package. */
  creatorId?: string;
}

export interface IntegrationRuntimeListResponse {
  /** List of integration runtimes. */
  value: Array<IntegrationRuntimeResource>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
}

export type IntegrationRuntimeResource = IntegrationRuntimeResourceBase &
  SubResource;

export interface IntegrationRuntimeResourceBase {
  /** Integration runtime properties. */
  properties: IntegrationRuntime;
}

export type IntegrationRuntime = IntegrationRuntimeBase &
  IntegrationRuntimeDictionary;

export interface IntegrationRuntimeBase {
  /** Type of integration runtime. */
  type: "Managed" | "SelfHosted";
  /** Integration runtime description. */
  description?: string;
}

export interface LibraryListResponse {
  /** List of Library. */
  value: Array<LibraryResource>;
  /** The link to the next page of results, if any remaining results exist. */
  nextLink?: string;
}

export type LibraryResource = LibraryResourceBase & SubResource;

export interface LibraryResourceBase {
  /** Library/package properties. */
  properties: LibraryResourceProperties;
}

export interface LibraryResourceProperties {
  /** Name of the library/package. */
  name?: string;
  /** Location of library/package in storage account. */
  path?: string;
  /** Container name of the library/package. */
  containerName?: string;
  /** The last update time of the library/package. */
  uploadedTimestamp?: string;
  /** Type of the library/package. */
  type?: string;
  /** Provisioning status of the library/package. */
  provisioningStatus?: string;
  /** Creator Id of the library/package. */
  creatorId?: string;
}

export interface LibraryResourceInfo {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  id?: string;
  /** record Id of the library/package. */
  recordId?: number;
  /** Provisioning status of the library/package. */
  state?: string;
  /** The creation time of the library/package. */
  created?: string;
  /** The last updated time of the library/package. */
  changed?: string;
  /** The type of the resource. E.g. LibraryArtifact */
  type?: string;
  /** Name of the library/package. */
  name?: string;
  /** Operation Id of the operation performed on library/package. */
  operationId?: string;
  /** artifact Id of the library/package. */
  artifactId?: string;
}

export interface OperationResult {
  /** Operation status */
  status?: string;
  /** Error data */
  error?: CloudErrorBody;
}

export interface GitHubAccessTokenRequest {
  /** The GitHub Client Id. */
  gitHubClientId: string;
  /** The GitHub Access code. */
  gitHubAccessCode: string;
  /** The GitHub access token base URL. */
  gitHubAccessTokenBaseUrl: string;
}

export interface GitHubAccessTokenResponse {
  gitHubAccessToken?: string;
}

export interface Expression {
  /** Expression type. */
  type: "Expression";
  /** Expression value. */
  value: string;
}

export interface SecretBase {
  /** Type of the secret. */
  type: string;
}

export type SecureString = SecureStringBase & SecretBase;

export interface SecureStringBase {
  /** Value of secure string. */
  value: string;
}

export type AzureKeyVaultSecretReference = AzureKeyVaultSecretReferenceBase &
  SecretBase;

export interface AzureKeyVaultSecretReferenceBase {
  /** The Azure Key Vault linked service reference. */
  store: LinkedServiceReference;
  /** The name of the secret in Azure Key Vault. Type: string (or Expression with resultType string). */
  secretName: Record<string, unknown>;
  /** The version of the secret in Azure Key Vault. The default value is the latest version of the secret. Type: string (or Expression with resultType string). */
  secretVersion?: Record<string, unknown>;
}

export interface StartDataFlowDebugSessionRequest {
  /** The ID of data flow debug session. */
  sessionId?: string;
  /** Data flow instance. */
  dataFlow?: DataFlowResource;
  /** List of datasets. */
  datasets?: Array<DatasetResource>;
  /** List of linked services. */
  linkedServices?: Array<LinkedServiceResource>;
  /** Staging info for debug session. */
  staging?: Record<string, unknown>;
  /** Data flow debug settings. */
  debugSettings?: Record<string, unknown>;
  /** The type of new Databricks cluster. */
  incrementalDebug?: boolean;
}

export interface StartDataFlowDebugSessionResponse {
  /** The ID of data flow debug job version. */
  jobVersion?: string;
}

export interface DataFlowDebugPreviewDataRequest {
  /** The ID of data flow debug session. */
  sessionId?: string;
  /** The data flow which contains the debug session. */
  dataFlowName?: string;
  /** The output stream name. */
  streamName?: string;
  /** The row limit for preview request. */
  rowLimits?: number;
}

export interface DataFlowDebugStatisticsRequest {
  /** The ID of data flow debug session. */
  sessionId?: string;
  /** The data flow which contains the debug session. */
  dataFlowName?: string;
  /** The output stream name. */
  streamName?: string;
  /** List of column names. */
  columns?: Array<string>;
}

export interface EvaluateDataFlowExpressionRequest {
  /** The ID of data flow debug session. */
  sessionId?: string;
  /** The data flow which contains the debug session. */
  dataFlowName?: string;
  /** The output stream name. */
  streamName?: string;
  /** The row limit for preview request. */
  rowLimits?: number;
  /** The expression for preview. */
  expression?: string;
}

export interface DataFlowDebugQueryResponse {
  /** The run ID of data flow debug session. */
  runId?: string;
}

export interface DataFlowDebugResultResponse {
  /** The run status of data preview, statistics or expression preview. */
  status?: string;
  /** The result data of data preview, statistics or expression preview. */
  data?: string;
}

export interface TriggerDependencyProvisioningStatus {
  /** Trigger name. */
  triggerName: string;
  /** Provisioning status. */
  provisioningStatus: string;
}

export interface PipelineReference {
  /** Pipeline reference type. */
  type: "PipelineReference";
  /** Reference pipeline name. */
  referenceName: string;
  /** Reference name. */
  name?: string;
}

export interface TriggerPipelineReference {
  /** Pipeline reference. */
  pipelineReference?: PipelineReference;
  /** Pipeline parameters. */
  parameters?: Record<string, Record<string, unknown>>;
}

export interface WorkspaceUpdateParameters {
  /** The resource tags. */
  tags?: Record<string, string>;
  /** Managed service identity of the workspace. */
  identity?: WorkspaceIdentity;
}

export interface WorkspaceIdentity {
  /** The identity type. Currently the only supported type is 'SystemAssigned'. */
  type: "SystemAssigned";
  /** The principal id of the identity. */
  principalId?: string;
  /** The client tenant id of the identity. */
  tenantId?: string;
}

export interface DatasetReference {
  /** Dataset reference type. */
  type: "DatasetReference";
  /** Reference dataset name. */
  referenceName: string;
  /** Arguments for dataset. */
  parameters?: Record<string, Record<string, unknown>>;
}

export type DataFlowReference = DataFlowReferenceBase &
  DataFlowReferenceDictionary;

export interface DataFlowReferenceBase {
  /** Data flow reference type. */
  type: "DataFlowReference";
  /** Reference data flow name. */
  referenceName: string;
  /** Reference data flow parameters from dataset. */
  datasetParameters?: Record<string, unknown>;
}

export interface RerunTumblingWindowTriggerActionParameters {
  /** The start time for the time period for which restatement is initiated. Only UTC time is currently supported. */
  startTime: Date;
  /** The end time for the time period for which restatement is initiated. Only UTC time is currently supported. */
  endTime: Date;
  /** The max number of parallel time windows (ready for execution) for which a rerun is triggered. */
  maxConcurrency: number;
}

export interface RerunTriggerListResponse {
  /** List of rerun triggers. */
  value: Array<RerunTriggerResource>;
  /** The continuation token for getting the next page of results, if any remaining results exist, null otherwise. */
  nextLink?: string;
}

export type RerunTriggerResource = RerunTriggerResourceBase & SubResource;

export interface RerunTriggerResourceBase {
  /** Properties of the rerun trigger. */
  properties: RerunTumblingWindowTrigger;
}

export type RerunTumblingWindowTrigger = RerunTumblingWindowTriggerBase &
  Trigger;

export interface RerunTumblingWindowTriggerBase {
  /** Rerun Trigger properties. */
  typeProperties: RerunTumblingWindowTriggerTypeProperties;
}

export interface RerunTumblingWindowTriggerTypeProperties {
  /** The parent trigger reference. */
  parentTrigger: Record<string, unknown>;
  /** The start time for the time period for which restatement is initiated. Only UTC time is currently supported. */
  requestedStartTime: Date;
  /** The end time for the time period for which restatement is initiated. Only UTC time is currently supported. */
  requestedEndTime: Date;
  /** The max number of parallel time windows (ready for execution) for which a rerun is triggered. */
  rerunConcurrency: number;
}

export interface GetSsisObjectMetadataRequest {
  /** Metadata path. */
  metadataPath?: string;
}

export interface SsisObjectMetadataStatusResponse {
  /** The status of the operation. */
  status?: string;
  /** The operation name. */
  name?: string;
  /** The operation properties. */
  properties?: string;
  /** The operation error message. */
  error?: string;
}

export interface ExposureControlRequest {
  /** The feature name. */
  featureName?: string;
  /** The feature type. */
  featureType?: string;
}

export interface ExposureControlResponse {
  /** The feature name. */
  featureName?: string;
  /** The feature value. */
  value?: string;
}

export interface SynapseNotebookReference {
  /** Synapse notebook reference type. */
  type: "NotebookReference";
  /** Reference notebook name. */
  referenceName: string;
}

export interface SynapseSparkJobReference {
  /** Synapse spark job reference type. */
  type: "SparkJobDefinitionReference";
  /** Reference spark job name. */
  referenceName: string;
}

export interface SqlPoolReference {
  /** SQL pool reference type. */
  type: "SqlPoolReference";
  /** Reference SQL pool name. */
  referenceName: string;
}

export type MappingDataFlow = MappingDataFlowBase & DataFlow;

export interface MappingDataFlowBase {
  /** Mapping data flow type properties. */
  typeProperties?: MappingDataFlowTypeProperties;
}

export interface MappingDataFlowTypeProperties {
  /** List of sources in data flow. */
  sources?: Array<DataFlowSource>;
  /** List of sinks in data flow. */
  sinks?: Array<DataFlowSink>;
  /** List of transformations in data flow. */
  transformations?: Array<Transformation>;
  /** DataFlow script. */
  script?: string;
}

export interface Transformation {
  /** Transformation name. */
  name: string;
  /** Transformation description. */
  description?: string;
}

export type DataFlowSource = DataFlowSourceBase & Transformation;

export interface DataFlowSourceBase {
  /** Dataset reference. */
  dataset?: DatasetReference;
  /** Linked service reference. */
  linkedService?: LinkedServiceReference;
  /** Schema linked service reference. */
  schemaLinkedService?: LinkedServiceReference;
}

export type DataFlowSink = DataFlowSinkBase & Transformation;

export interface DataFlowSinkBase {
  /** Dataset reference. */
  dataset?: DatasetReference;
  /** Linked service reference. */
  linkedService?: LinkedServiceReference;
  /** Schema linked service reference. */
  schemaLinkedService?: LinkedServiceReference;
}

export type DatasetLocation = DatasetLocationBase & DatasetLocationDictionary;

export interface DatasetLocationBase {
  /** Type of dataset storage location. */
  type: string;
  /** Specify the folder path of dataset. Type: string (or Expression with resultType string) */
  folderPath?: Record<string, unknown>;
  /** Specify the file name of dataset. Type: string (or Expression with resultType string). */
  fileName?: Record<string, unknown>;
}

export type AzureBlobStorageLocation = AzureBlobStorageLocationBase &
  DatasetLocation;

export interface AzureBlobStorageLocationBase {
  /** Specify the container of azure blob. Type: string (or Expression with resultType string). */
  container?: Record<string, unknown>;
}

export type AzureBlobFSLocation = AzureBlobFSLocationBase & DatasetLocation;

export interface AzureBlobFSLocationBase {
  /** Specify the fileSystem of azure blobFS. Type: string (or Expression with resultType string). */
  fileSystem?: Record<string, unknown>;
}

export type AzureDataLakeStoreLocation = AzureDataLakeStoreLocationBase &
  DatasetLocation;

export interface AzureDataLakeStoreLocationBase {}

export type AmazonS3Location = AmazonS3LocationBase & DatasetLocation;

export interface AmazonS3LocationBase {
  /** Specify the bucketName of amazon S3. Type: string (or Expression with resultType string) */
  bucketName?: Record<string, unknown>;
  /** Specify the version of amazon S3. Type: string (or Expression with resultType string). */
  version?: Record<string, unknown>;
}

export type FileServerLocation = FileServerLocationBase & DatasetLocation;

export interface FileServerLocationBase {}

export type AzureFileStorageLocation = AzureFileStorageLocationBase &
  DatasetLocation;

export interface AzureFileStorageLocationBase {}

export type GoogleCloudStorageLocation = GoogleCloudStorageLocationBase &
  DatasetLocation;

export interface GoogleCloudStorageLocationBase {
  /** Specify the bucketName of Google Cloud Storage. Type: string (or Expression with resultType string) */
  bucketName?: Record<string, unknown>;
  /** Specify the version of Google Cloud Storage. Type: string (or Expression with resultType string). */
  version?: Record<string, unknown>;
}

export type FtpServerLocation = FtpServerLocationBase & DatasetLocation;

export interface FtpServerLocationBase {}

export type SftpLocation = SftpLocationBase & DatasetLocation;

export interface SftpLocationBase {}

export type HttpServerLocation = HttpServerLocationBase & DatasetLocation;

export interface HttpServerLocationBase {
  /** Specify the relativeUrl of http server. Type: string (or Expression with resultType string) */
  relativeUrl?: Record<string, unknown>;
}

export type HdfsLocation = HdfsLocationBase & DatasetLocation;

export interface HdfsLocationBase {}

export interface DatasetDataElement {
  /** Name of the column. Type: string (or Expression with resultType string). */
  name?: Record<string, unknown>;
  /** Type of the column. Type: string (or Expression with resultType string). */
  type?: Record<string, unknown>;
}

export type DatasetSchemaDataElement = DatasetSchemaDataElementBase &
  DatasetSchemaDataElementDictionary;

export interface DatasetSchemaDataElementBase {
  /** Name of the schema column. Type: string (or Expression with resultType string). */
  name?: Record<string, unknown>;
  /** Type of the schema column. Type: string (or Expression with resultType string). */
  type?: Record<string, unknown>;
}

export type DatasetStorageFormat = DatasetStorageFormatBase &
  DatasetStorageFormatDictionary;

export interface DatasetStorageFormatBase {
  /** Type of dataset storage format. */
  type: string;
  /** Serializer. Type: string (or Expression with resultType string). */
  serializer?: Record<string, unknown>;
  /** Deserializer. Type: string (or Expression with resultType string). */
  deserializer?: Record<string, unknown>;
}

export type TextFormat = TextFormatBase & DatasetStorageFormat;

export interface TextFormatBase {
  /** The column delimiter. Type: string (or Expression with resultType string). */
  columnDelimiter?: Record<string, unknown>;
  /** The row delimiter. Type: string (or Expression with resultType string). */
  rowDelimiter?: Record<string, unknown>;
  /** The escape character. Type: string (or Expression with resultType string). */
  escapeChar?: Record<string, unknown>;
  /** The quote character. Type: string (or Expression with resultType string). */
  quoteChar?: Record<string, unknown>;
  /** The null value string. Type: string (or Expression with resultType string). */
  nullValue?: Record<string, unknown>;
  /** The code page name of the preferred encoding. If miss, the default value is ΓÇ£utf-8ΓÇ¥, unless BOM denotes another Unicode encoding. Refer to the ΓÇ£NameΓÇ¥ column of the table in the following link to set supported values: https://msdn.microsoft.com/library/system.text.encoding.aspx. Type: string (or Expression with resultType string). */
  encodingName?: Record<string, unknown>;
  /** Treat empty column values in the text file as null. The default value is true. Type: boolean (or Expression with resultType boolean). */
  treatEmptyAsNull?: Record<string, unknown>;
  /** The number of lines/rows to be skipped when parsing text files. The default value is 0. Type: integer (or Expression with resultType integer). */
  skipLineCount?: Record<string, unknown>;
  /** When used as input, treat the first row of data as headers. When used as output,write the headers into the output as the first row of data. The default value is false. Type: boolean (or Expression with resultType boolean). */
  firstRowAsHeader?: Record<string, unknown>;
}

export type JsonFormat = JsonFormatBase & DatasetStorageFormat;

export interface JsonFormatBase {
  /** File pattern of JSON. To be more specific, the way of separating a collection of JSON objects. The default value is 'setOfObjects'. It is case-sensitive. */
  filePattern?: "setOfObjects" | "arrayOfObjects";
  /** The character used to separate nesting levels. Default value is '.' (dot). Type: string (or Expression with resultType string). */
  nestingSeparator?: Record<string, unknown>;
  /** The code page name of the preferred encoding. If not provided, the default value is 'utf-8', unless the byte order mark (BOM) denotes another Unicode encoding. The full list of supported values can be found in the 'Name' column of the table of encodings in the following reference: https://go.microsoft.com/fwlink/?linkid=861078. Type: string (or Expression with resultType string). */
  encodingName?: Record<string, unknown>;
  /** The JSONPath of the JSON array element to be flattened. Example: "$.ArrayPath". Type: string (or Expression with resultType string). */
  jsonNodeReference?: Record<string, unknown>;
  /** The JSONPath definition for each column mapping with a customized column name to extract data from JSON file. For fields under root object, start with "$"; for fields inside the array chosen by jsonNodeReference property, start from the array element. Example: {"Column1": "$.Column1Path", "Column2": "Column2PathInArray"}. Type: object (or Expression with resultType object). */
  jsonPathDefinition?: Record<string, unknown>;
}

export type AvroFormat = AvroFormatBase & DatasetStorageFormat;

export interface AvroFormatBase {}

export type OrcFormat = OrcFormatBase & DatasetStorageFormat;

export interface OrcFormatBase {}

export type ParquetFormat = ParquetFormatBase & DatasetStorageFormat;

export interface ParquetFormatBase {}

export type DatasetCompression = DatasetCompressionBase &
  DatasetCompressionDictionary;

export interface DatasetCompressionBase {
  /** Type of dataset compression. */
  type: string;
}

export type DatasetBZip2Compression = DatasetBZip2CompressionBase &
  DatasetCompression;

export interface DatasetBZip2CompressionBase {}

export type DatasetGZipCompression = DatasetGZipCompressionBase &
  DatasetCompression;

export interface DatasetGZipCompressionBase {
  /** The GZip compression level. */
  level?: Record<string, unknown>;
}

export type DatasetDeflateCompression = DatasetDeflateCompressionBase &
  DatasetCompression;

export interface DatasetDeflateCompressionBase {
  /** The Deflate compression level. */
  level?: Record<string, unknown>;
}

export type DatasetZipDeflateCompression = DatasetZipDeflateCompressionBase &
  DatasetCompression;

export interface DatasetZipDeflateCompressionBase {
  /** The ZipDeflate compression level. */
  level?: Record<string, unknown>;
}

export type DatasetTarCompression = DatasetTarCompressionBase &
  DatasetCompression;

export interface DatasetTarCompressionBase {}

export type DatasetTarGZipCompression = DatasetTarGZipCompressionBase &
  DatasetCompression;

export interface DatasetTarGZipCompressionBase {
  /** The TarGZip compression level. */
  level?: Record<string, unknown>;
}

export type AmazonS3Dataset = AmazonS3DatasetBase & Dataset;

export interface AmazonS3DatasetBase {
  /** Amazon S3 dataset properties. */
  typeProperties: AmazonS3DatasetTypeProperties;
}

export interface AmazonS3DatasetTypeProperties {
  /** The name of the Amazon S3 bucket. Type: string (or Expression with resultType string). */
  bucketName: Record<string, unknown>;
  /** The key of the Amazon S3 object. Type: string (or Expression with resultType string). */
  key?: Record<string, unknown>;
  /** The prefix filter for the S3 object name. Type: string (or Expression with resultType string). */
  prefix?: Record<string, unknown>;
  /** The version for the S3 object. Type: string (or Expression with resultType string). */
  version?: Record<string, unknown>;
  /** The start of S3 object's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeStart?: Record<string, unknown>;
  /** The end of S3 object's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeEnd?: Record<string, unknown>;
  /** The format of files. */
  format?: DatasetStorageFormat;
  /** The data compression method used for the Amazon S3 object. */
  compression?: DatasetCompression;
}

export type AvroDataset = AvroDatasetBase & Dataset;

export interface AvroDatasetBase {
  /** Avro dataset properties. */
  typeProperties?: AvroDatasetTypeProperties;
}

export interface AvroDatasetTypeProperties {
  /** The location of the avro storage. */
  location: DatasetLocation;
  /** A string from AvroCompressionCodecEnum or an expression */
  avroCompressionCodec?: Record<string, unknown>;
  avroCompressionLevel?: number;
}

export type ExcelDataset = ExcelDatasetBase & Dataset;

export interface ExcelDatasetBase {
  /** Excel dataset properties. */
  typeProperties?: ExcelDatasetTypeProperties;
}

export interface ExcelDatasetTypeProperties {
  /** The location of the excel storage. */
  location: DatasetLocation;
  /** The sheet of excel file. Type: string (or Expression with resultType string). */
  sheetName: Record<string, unknown>;
  /** The partial data of one sheet. Type: string (or Expression with resultType string). */
  range?: Record<string, unknown>;
  /** When used as input, treat the first row of data as headers. When used as output,write the headers into the output as the first row of data. The default value is false. Type: boolean (or Expression with resultType boolean). */
  firstRowAsHeader?: Record<string, unknown>;
  /** The data compression method used for the json dataset. */
  compression?: DatasetCompression;
  /** The null value string. Type: string (or Expression with resultType string). */
  nullValue?: Record<string, unknown>;
}

export type ParquetDataset = ParquetDatasetBase & Dataset;

export interface ParquetDatasetBase {
  /** Parquet dataset properties. */
  typeProperties?: ParquetDatasetTypeProperties;
}

export interface ParquetDatasetTypeProperties {
  /** The location of the parquet storage. */
  location: DatasetLocation;
  /** A string from ParquetCompressionCodecEnum or an expression */
  compressionCodec?: Record<string, unknown>;
}

export type DelimitedTextDataset = DelimitedTextDatasetBase & Dataset;

export interface DelimitedTextDatasetBase {
  /** Delimited text dataset properties. */
  typeProperties?: DelimitedTextDatasetTypeProperties;
}

export interface DelimitedTextDatasetTypeProperties {
  /** The location of the delimited text storage. */
  location: DatasetLocation;
  /** The column delimiter. Type: string (or Expression with resultType string). */
  columnDelimiter?: Record<string, unknown>;
  /** The row delimiter. Type: string (or Expression with resultType string). */
  rowDelimiter?: Record<string, unknown>;
  /** The code page name of the preferred encoding. If miss, the default value is UTF-8, unless BOM denotes another Unicode encoding. Refer to the name column of the table in the following link to set supported values: https://msdn.microsoft.com/library/system.text.encoding.aspx. Type: string (or Expression with resultType string). */
  encodingName?: Record<string, unknown>;
  compressionCodec?:
    | "bzip2"
    | "gzip"
    | "deflate"
    | "zipDeflate"
    | "snappy"
    | "lz4"
    | "tar"
    | "tarGZip";
  /** The data compression method used for DelimitedText. */
  compressionLevel?: Record<string, unknown>;
  /** The quote character. Type: string (or Expression with resultType string). */
  quoteChar?: Record<string, unknown>;
  /** The escape character. Type: string (or Expression with resultType string). */
  escapeChar?: Record<string, unknown>;
  /** When used as input, treat the first row of data as headers. When used as output,write the headers into the output as the first row of data. The default value is false. Type: boolean (or Expression with resultType boolean). */
  firstRowAsHeader?: Record<string, unknown>;
  /** The null value string. Type: string (or Expression with resultType string). */
  nullValue?: Record<string, unknown>;
}

export type JsonDataset = JsonDatasetBase & Dataset;

export interface JsonDatasetBase {
  /** Json dataset properties. */
  typeProperties?: JsonDatasetTypeProperties;
}

export interface JsonDatasetTypeProperties {
  /** The location of the json data storage. */
  location: DatasetLocation;
  /** The code page name of the preferred encoding. If not specified, the default value is UTF-8, unless BOM denotes another Unicode encoding. Refer to the name column of the table in the following link to set supported values: https://msdn.microsoft.com/library/system.text.encoding.aspx. Type: string (or Expression with resultType string). */
  encodingName?: Record<string, unknown>;
  /** The data compression method used for the json dataset. */
  compression?: DatasetCompression;
}

export type XmlDataset = XmlDatasetBase & Dataset;

export interface XmlDatasetBase {
  /** Xml dataset properties. */
  typeProperties?: XmlDatasetTypeProperties;
}

export interface XmlDatasetTypeProperties {
  /** The location of the json data storage. */
  location: DatasetLocation;
  /** The code page name of the preferred encoding. If not specified, the default value is UTF-8, unless BOM denotes another Unicode encoding. Refer to the name column of the table in the following link to set supported values: https://msdn.microsoft.com/library/system.text.encoding.aspx. Type: string (or Expression with resultType string). */
  encodingName?: Record<string, unknown>;
  /** The null value string. Type: string (or Expression with resultType string). */
  nullValue?: Record<string, unknown>;
  /** The data compression method used for the json dataset. */
  compression?: DatasetCompression;
}

export type OrcDataset = OrcDatasetBase & Dataset;

export interface OrcDatasetBase {
  /** ORC dataset properties. */
  typeProperties?: OrcDatasetTypeProperties;
}

export interface OrcDatasetTypeProperties {
  /** The location of the ORC data storage. */
  location: DatasetLocation;
  orcCompressionCodec?: "none" | "zlib" | "snappy" | "lzo";
}

export type BinaryDataset = BinaryDatasetBase & Dataset;

export interface BinaryDatasetBase {
  /** Binary dataset properties. */
  typeProperties?: BinaryDatasetTypeProperties;
}

export interface BinaryDatasetTypeProperties {
  /** The location of the Binary storage. */
  location: DatasetLocation;
  /** The data compression method used for the binary dataset. */
  compression?: DatasetCompression;
}

export type AzureBlobDataset = AzureBlobDatasetBase & Dataset;

export interface AzureBlobDatasetBase {
  /** Azure Blob dataset properties. */
  typeProperties?: AzureBlobDatasetTypeProperties;
}

export interface AzureBlobDatasetTypeProperties {
  /** The path of the Azure Blob storage. Type: string (or Expression with resultType string). */
  folderPath?: Record<string, unknown>;
  /** The root of blob path. Type: string (or Expression with resultType string). */
  tableRootLocation?: Record<string, unknown>;
  /** The name of the Azure Blob. Type: string (or Expression with resultType string). */
  fileName?: Record<string, unknown>;
  /** The start of Azure Blob's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeStart?: Record<string, unknown>;
  /** The end of Azure Blob's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeEnd?: Record<string, unknown>;
  /** The format of the Azure Blob storage. */
  format?: DatasetStorageFormat;
  /** The data compression method used for the blob storage. */
  compression?: DatasetCompression;
}

export type AzureTableDataset = AzureTableDatasetBase & Dataset;

export interface AzureTableDatasetBase {
  /** Azure Table dataset properties. */
  typeProperties: AzureTableDatasetTypeProperties;
}

export interface AzureTableDatasetTypeProperties {
  /** The table name of the Azure Table storage. Type: string (or Expression with resultType string). */
  tableName: Record<string, unknown>;
}

export type AzureSqlTableDataset = AzureSqlTableDatasetBase & Dataset;

export interface AzureSqlTableDatasetBase {
  /** Azure SQL dataset properties. */
  typeProperties?: AzureSqlTableDatasetTypeProperties;
}

export interface AzureSqlTableDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The schema name of the Azure SQL database. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
  /** The table name of the Azure SQL database. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
}

export type AzureSqlMITableDataset = AzureSqlMITableDatasetBase & Dataset;

export interface AzureSqlMITableDatasetBase {
  /** Azure SQL Managed Instance dataset properties. */
  typeProperties?: AzureSqlMITableDatasetTypeProperties;
}

export interface AzureSqlMITableDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The schema name of the Azure SQL Managed Instance. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
  /** The table name of the Azure SQL Managed Instance dataset. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
}

export type AzureSqlDWTableDataset = AzureSqlDWTableDatasetBase & Dataset;

export interface AzureSqlDWTableDatasetBase {
  /** Azure SQL Data Warehouse dataset properties. */
  typeProperties?: AzureSqlDWTableDatasetTypeProperties;
}

export interface AzureSqlDWTableDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The schema name of the Azure SQL Data Warehouse. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
  /** The table name of the Azure SQL Data Warehouse. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
}

export type CassandraTableDataset = CassandraTableDatasetBase & Dataset;

export interface CassandraTableDatasetBase {
  /** Cassandra dataset properties. */
  typeProperties?: CassandraTableDatasetTypeProperties;
}

export interface CassandraTableDatasetTypeProperties {
  /** The table name of the Cassandra database. Type: string (or Expression with resultType string). */
  tableName?: Record<string, unknown>;
  /** The keyspace of the Cassandra database. Type: string (or Expression with resultType string). */
  keyspace?: Record<string, unknown>;
}

export type CustomDataset = CustomDatasetBase & Dataset;

export interface CustomDatasetBase {
  /** Custom dataset properties. */
  typeProperties?: Record<string, unknown>;
}

export type CosmosDbSqlApiCollectionDataset = CosmosDbSqlApiCollectionDatasetBase &
  Dataset;

export interface CosmosDbSqlApiCollectionDatasetBase {
  /** CosmosDB (SQL API) Collection dataset properties. */
  typeProperties: CosmosDbSqlApiCollectionDatasetTypeProperties;
}

export interface CosmosDbSqlApiCollectionDatasetTypeProperties {
  /** CosmosDB (SQL API) collection name. Type: string (or Expression with resultType string). */
  collectionName: Record<string, unknown>;
}

export type DocumentDbCollectionDataset = DocumentDbCollectionDatasetBase &
  Dataset;

export interface DocumentDbCollectionDatasetBase {
  /** DocumentDB Collection dataset properties. */
  typeProperties: DocumentDbCollectionDatasetTypeProperties;
}

export interface DocumentDbCollectionDatasetTypeProperties {
  /** Document Database collection name. Type: string (or Expression with resultType string). */
  collectionName: Record<string, unknown>;
}

export type DynamicsEntityDataset = DynamicsEntityDatasetBase & Dataset;

export interface DynamicsEntityDatasetBase {
  /** Dynamics entity dataset properties. */
  typeProperties?: DynamicsEntityDatasetTypeProperties;
}

export interface DynamicsEntityDatasetTypeProperties {
  /** The logical name of the entity. Type: string (or Expression with resultType string). */
  entityName?: Record<string, unknown>;
}

export type DynamicsCrmEntityDataset = DynamicsCrmEntityDatasetBase & Dataset;

export interface DynamicsCrmEntityDatasetBase {
  /** Dynamics CRM entity dataset properties. */
  typeProperties?: DynamicsCrmEntityDatasetTypeProperties;
}

export interface DynamicsCrmEntityDatasetTypeProperties {
  /** The logical name of the entity. Type: string (or Expression with resultType string). */
  entityName?: Record<string, unknown>;
}

export type CommonDataServiceForAppsEntityDataset = CommonDataServiceForAppsEntityDatasetBase &
  Dataset;

export interface CommonDataServiceForAppsEntityDatasetBase {
  /** Common Data Service for Apps entity dataset properties. */
  typeProperties?: CommonDataServiceForAppsEntityDatasetTypeProperties;
}

export interface CommonDataServiceForAppsEntityDatasetTypeProperties {
  /** The logical name of the entity. Type: string (or Expression with resultType string). */
  entityName?: Record<string, unknown>;
}

export type AzureDataLakeStoreDataset = AzureDataLakeStoreDatasetBase & Dataset;

export interface AzureDataLakeStoreDatasetBase {
  /** Azure Data Lake Store dataset properties. */
  typeProperties?: AzureDataLakeStoreDatasetTypeProperties;
}

export interface AzureDataLakeStoreDatasetTypeProperties {
  /** Path to the folder in the Azure Data Lake Store. Type: string (or Expression with resultType string). */
  folderPath?: Record<string, unknown>;
  /** The name of the file in the Azure Data Lake Store. Type: string (or Expression with resultType string). */
  fileName?: Record<string, unknown>;
  /** The format of the Data Lake Store. */
  format?: DatasetStorageFormat;
  /** The data compression method used for the item(s) in the Azure Data Lake Store. */
  compression?: DatasetCompression;
}

export type AzureBlobFSDataset = AzureBlobFSDatasetBase & Dataset;

export interface AzureBlobFSDatasetBase {
  /** Azure Data Lake Storage Gen2 dataset properties. */
  typeProperties?: AzureBlobFSDatasetTypeProperties;
}

export interface AzureBlobFSDatasetTypeProperties {
  /** The path of the Azure Data Lake Storage Gen2 storage. Type: string (or Expression with resultType string). */
  folderPath?: Record<string, unknown>;
  /** The name of the Azure Data Lake Storage Gen2. Type: string (or Expression with resultType string). */
  fileName?: Record<string, unknown>;
  /** The format of the Azure Data Lake Storage Gen2 storage. */
  format?: DatasetStorageFormat;
  /** The data compression method used for the blob storage. */
  compression?: DatasetCompression;
}

export type Office365Dataset = Office365DatasetBase & Dataset;

export interface Office365DatasetBase {
  /** Office365 dataset properties. */
  typeProperties: Office365DatasetTypeProperties;
}

export interface Office365DatasetTypeProperties {
  /** Name of the dataset to extract from Office 365. Type: string (or Expression with resultType string). */
  tableName: Record<string, unknown>;
  /** A predicate expression that can be used to filter the specific rows to extract from Office 365. Type: string (or Expression with resultType string). */
  predicate?: Record<string, unknown>;
}

export type FileShareDataset = FileShareDatasetBase & Dataset;

export interface FileShareDatasetBase {
  /** On-premises file system dataset properties. */
  typeProperties?: FileShareDatasetTypeProperties;
}

export interface FileShareDatasetTypeProperties {
  /** The path of the on-premises file system. Type: string (or Expression with resultType string). */
  folderPath?: Record<string, unknown>;
  /** The name of the on-premises file system. Type: string (or Expression with resultType string). */
  fileName?: Record<string, unknown>;
  /** The start of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeStart?: Record<string, unknown>;
  /** The end of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeEnd?: Record<string, unknown>;
  /** The format of the files. */
  format?: DatasetStorageFormat;
  /** Specify a filter to be used to select a subset of files in the folderPath rather than all files. Type: string (or Expression with resultType string). */
  fileFilter?: Record<string, unknown>;
  /** The data compression method used for the file system. */
  compression?: DatasetCompression;
}

export type MongoDbCollectionDataset = MongoDbCollectionDatasetBase & Dataset;

export interface MongoDbCollectionDatasetBase {
  /** MongoDB database dataset properties. */
  typeProperties: MongoDbCollectionDatasetTypeProperties;
}

export interface MongoDbCollectionDatasetTypeProperties {
  /** The table name of the MongoDB database. Type: string (or Expression with resultType string). */
  collectionName: Record<string, unknown>;
}

export type MongoDbAtlasCollectionDataset = MongoDbAtlasCollectionDatasetBase &
  Dataset;

export interface MongoDbAtlasCollectionDatasetBase {
  /** MongoDB Atlas database dataset properties. */
  typeProperties: MongoDbAtlasCollectionDatasetTypeProperties;
}

export interface MongoDbAtlasCollectionDatasetTypeProperties {
  /** The collection name of the MongoDB Atlas database. Type: string (or Expression with resultType string). */
  collection: Record<string, unknown>;
}

export type MongoDbV2CollectionDataset = MongoDbV2CollectionDatasetBase &
  Dataset;

export interface MongoDbV2CollectionDatasetBase {
  /** MongoDB database dataset properties. */
  typeProperties: MongoDbV2CollectionDatasetTypeProperties;
}

export interface MongoDbV2CollectionDatasetTypeProperties {
  /** The collection name of the MongoDB database. Type: string (or Expression with resultType string). */
  collection: Record<string, unknown>;
}

export type CosmosDbMongoDbApiCollectionDataset = CosmosDbMongoDbApiCollectionDatasetBase &
  Dataset;

export interface CosmosDbMongoDbApiCollectionDatasetBase {
  /** CosmosDB (MongoDB API) database dataset properties. */
  typeProperties: CosmosDbMongoDbApiCollectionDatasetTypeProperties;
}

export interface CosmosDbMongoDbApiCollectionDatasetTypeProperties {
  /** The collection name of the CosmosDB (MongoDB API) database. Type: string (or Expression with resultType string). */
  collection: Record<string, unknown>;
}

export type ODataResourceDataset = ODataResourceDatasetBase & Dataset;

export interface ODataResourceDatasetBase {
  /** OData dataset properties. */
  typeProperties?: ODataResourceDatasetTypeProperties;
}

export interface ODataResourceDatasetTypeProperties {
  /** The OData resource path. Type: string (or Expression with resultType string). */
  path?: Record<string, unknown>;
}

export type OracleTableDataset = OracleTableDatasetBase & Dataset;

export interface OracleTableDatasetBase {
  /** On-premises Oracle dataset properties. */
  typeProperties?: OracleTableDatasetTypeProperties;
}

export interface OracleTableDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The schema name of the on-premises Oracle database. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
  /** The table name of the on-premises Oracle database. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
}

export type TeradataTableDataset = TeradataTableDatasetBase & Dataset;

export interface TeradataTableDatasetBase {
  /** Teradata dataset properties. */
  typeProperties?: TeradataTableDatasetTypeProperties;
}

export interface TeradataTableDatasetTypeProperties {
  /** The database name of Teradata. Type: string (or Expression with resultType string). */
  database?: Record<string, unknown>;
  /** The table name of Teradata. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
}

export type AzureMySqlTableDataset = AzureMySqlTableDatasetBase & Dataset;

export interface AzureMySqlTableDatasetBase {
  /** Azure MySQL database dataset properties. */
  typeProperties: AzureMySqlTableDatasetTypeProperties;
}

export interface AzureMySqlTableDatasetTypeProperties {
  /** The Azure MySQL database table name. Type: string (or Expression with resultType string). */
  tableName?: Record<string, unknown>;
  /** The name of Azure MySQL database table. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
}

export type AmazonRedshiftTableDataset = AmazonRedshiftTableDatasetBase &
  Dataset;

export interface AmazonRedshiftTableDatasetBase {
  /** Amazon Redshift table dataset properties. */
  typeProperties?: AmazonRedshiftTableDatasetTypeProperties;
}

export interface AmazonRedshiftTableDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The Amazon Redshift table name. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
  /** The Amazon Redshift schema name. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
}

export type Db2TableDataset = Db2TableDatasetBase & Dataset;

export interface Db2TableDatasetBase {
  /** Db2 table dataset properties. */
  typeProperties?: Db2TableDatasetTypeProperties;
}

export interface Db2TableDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The Db2 schema name. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
  /** The Db2 table name. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
}

export type RelationalTableDataset = RelationalTableDatasetBase & Dataset;

export interface RelationalTableDatasetBase {
  /** Relational table dataset properties. */
  typeProperties?: RelationalTableDatasetTypeProperties;
}

export interface RelationalTableDatasetTypeProperties {
  /** The relational table name. Type: string (or Expression with resultType string). */
  tableName?: Record<string, unknown>;
}

export type InformixTableDataset = InformixTableDatasetBase & Dataset;

export interface InformixTableDatasetBase {
  /** Informix table dataset properties. */
  typeProperties?: InformixTableDatasetTypeProperties;
}

export interface InformixTableDatasetTypeProperties {
  /** The Informix table name. Type: string (or Expression with resultType string). */
  tableName?: Record<string, unknown>;
}

export type OdbcTableDataset = OdbcTableDatasetBase & Dataset;

export interface OdbcTableDatasetBase {
  /** ODBC table dataset properties. */
  typeProperties?: OdbcTableDatasetTypeProperties;
}

export interface OdbcTableDatasetTypeProperties {
  /** The ODBC table name. Type: string (or Expression with resultType string). */
  tableName?: Record<string, unknown>;
}

export type MySqlTableDataset = MySqlTableDatasetBase & Dataset;

export interface MySqlTableDatasetBase {
  /** MySQL table dataset properties. */
  typeProperties?: MySqlTableDatasetTypeProperties;
}

export interface MySqlTableDatasetTypeProperties {
  /** The MySQL table name. Type: string (or Expression with resultType string). */
  tableName?: Record<string, unknown>;
}

export type PostgreSqlTableDataset = PostgreSqlTableDatasetBase & Dataset;

export interface PostgreSqlTableDatasetBase {
  /** PostgreSQL table dataset properties. */
  typeProperties?: PostgreSqlTableDatasetTypeProperties;
}

export interface PostgreSqlTableDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The PostgreSQL table name. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
  /** The PostgreSQL schema name. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
}

export type MicrosoftAccessTableDataset = MicrosoftAccessTableDatasetBase &
  Dataset;

export interface MicrosoftAccessTableDatasetBase {
  /** Microsoft Access table dataset properties. */
  typeProperties?: MicrosoftAccessTableDatasetTypeProperties;
}

export interface MicrosoftAccessTableDatasetTypeProperties {
  /** The Microsoft Access table name. Type: string (or Expression with resultType string). */
  tableName?: Record<string, unknown>;
}

export type SalesforceObjectDataset = SalesforceObjectDatasetBase & Dataset;

export interface SalesforceObjectDatasetBase {
  /** Salesforce object dataset properties. */
  typeProperties?: SalesforceObjectDatasetTypeProperties;
}

export interface SalesforceObjectDatasetTypeProperties {
  /** The Salesforce object API name. Type: string (or Expression with resultType string). */
  objectApiName?: Record<string, unknown>;
}

export type SalesforceServiceCloudObjectDataset = SalesforceServiceCloudObjectDatasetBase &
  Dataset;

export interface SalesforceServiceCloudObjectDatasetBase {
  /** Salesforce Service Cloud object dataset properties. */
  typeProperties?: SalesforceServiceCloudObjectDatasetTypeProperties;
}

export interface SalesforceServiceCloudObjectDatasetTypeProperties {
  /** The Salesforce Service Cloud object API name. Type: string (or Expression with resultType string). */
  objectApiName?: Record<string, unknown>;
}

export type SybaseTableDataset = SybaseTableDatasetBase & Dataset;

export interface SybaseTableDatasetBase {
  /** Sybase table dataset properties. */
  typeProperties?: SybaseTableDatasetTypeProperties;
}

export interface SybaseTableDatasetTypeProperties {
  /** The Sybase table name. Type: string (or Expression with resultType string). */
  tableName?: Record<string, unknown>;
}

export type SapBwCubeDataset = SapBwCubeDatasetBase & Dataset;

export interface SapBwCubeDatasetBase {}

export type SapCloudForCustomerResourceDataset = SapCloudForCustomerResourceDatasetBase &
  Dataset;

export interface SapCloudForCustomerResourceDatasetBase {
  /** SAP Cloud For Customer OData resource dataset properties. */
  typeProperties: SapCloudForCustomerResourceDatasetTypeProperties;
}

export interface SapCloudForCustomerResourceDatasetTypeProperties {
  /** The path of the SAP Cloud for Customer OData entity. Type: string (or Expression with resultType string). */
  path: Record<string, unknown>;
}

export type SapEccResourceDataset = SapEccResourceDatasetBase & Dataset;

export interface SapEccResourceDatasetBase {
  /** SAP ECC OData resource dataset properties. */
  typeProperties: SapEccResourceDatasetTypeProperties;
}

export interface SapEccResourceDatasetTypeProperties {
  /** The path of the SAP ECC OData entity. Type: string (or Expression with resultType string). */
  path: Record<string, unknown>;
}

export type SapHanaTableDataset = SapHanaTableDatasetBase & Dataset;

export interface SapHanaTableDatasetBase {
  /** SAP HANA Table properties. */
  typeProperties?: SapHanaTableDatasetTypeProperties;
}

export interface SapHanaTableDatasetTypeProperties {
  /** The schema name of SAP HANA. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
  /** The table name of SAP HANA. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
}

export type SapOpenHubTableDataset = SapOpenHubTableDatasetBase & Dataset;

export interface SapOpenHubTableDatasetBase {
  /** Sap Business Warehouse Open Hub Destination Table properties. */
  typeProperties: SapOpenHubTableDatasetTypeProperties;
}

export interface SapOpenHubTableDatasetTypeProperties {
  /** The name of the Open Hub Destination with destination type as Database Table. Type: string (or Expression with resultType string). */
  openHubDestinationName: Record<string, unknown>;
  /** Whether to exclude the records of the last request. The default value is true. Type: boolean (or Expression with resultType boolean). */
  excludeLastRequest?: Record<string, unknown>;
  /** The ID of request for delta loading. Once it is set, only data with requestId larger than the value of this property will be retrieved. The default value is 0. Type: integer (or Expression with resultType integer ). */
  baseRequestId?: Record<string, unknown>;
}

export type SqlServerTableDataset = SqlServerTableDatasetBase & Dataset;

export interface SqlServerTableDatasetBase {
  /** On-premises SQL Server dataset properties. */
  typeProperties?: SqlServerTableDatasetTypeProperties;
}

export interface SqlServerTableDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The schema name of the SQL Server dataset. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
  /** The table name of the SQL Server dataset. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
}

export type RestResourceDataset = RestResourceDatasetBase & Dataset;

export interface RestResourceDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: RestResourceDatasetTypeProperties;
}

export interface RestResourceDatasetTypeProperties {
  /** The relative URL to the resource that the RESTful API provides. Type: string (or Expression with resultType string). */
  relativeUrl?: Record<string, unknown>;
  /** The HTTP method used to call the RESTful API. The default is GET. Type: string (or Expression with resultType string). */
  requestMethod?: Record<string, unknown>;
  /** The HTTP request body to the RESTful API if requestMethod is POST. Type: string (or Expression with resultType string). */
  requestBody?: Record<string, unknown>;
  /** The additional HTTP headers in the request to the RESTful API. Type: string (or Expression with resultType string). */
  additionalHeaders?: Record<string, unknown>;
  /** The pagination rules to compose next page requests. Type: string (or Expression with resultType string). */
  paginationRules?: Record<string, unknown>;
}

export type SapTableResourceDataset = SapTableResourceDatasetBase & Dataset;

export interface SapTableResourceDatasetBase {
  /** SAP Table Resource properties. */
  typeProperties: SapTableResourceDatasetTypeProperties;
}

export interface SapTableResourceDatasetTypeProperties {
  /** The name of the SAP Table. Type: string (or Expression with resultType string). */
  tableName: Record<string, unknown>;
}

export type WebTableDataset = WebTableDatasetBase & Dataset;

export interface WebTableDatasetBase {
  /** Web table dataset properties. */
  typeProperties: WebTableDatasetTypeProperties;
}

export interface WebTableDatasetTypeProperties {
  /** The zero-based index of the table in the web page. Type: integer (or Expression with resultType integer), minimum: 0. */
  index: Record<string, unknown>;
  /** The relative URL to the web page from the linked service URL. Type: string (or Expression with resultType string). */
  path?: Record<string, unknown>;
}

export type AzureSearchIndexDataset = AzureSearchIndexDatasetBase & Dataset;

export interface AzureSearchIndexDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties: AzureSearchIndexDatasetTypeProperties;
}

export interface AzureSearchIndexDatasetTypeProperties {
  /** The name of the Azure Search Index. Type: string (or Expression with resultType string). */
  indexName: Record<string, unknown>;
}

export type HttpDataset = HttpDatasetBase & Dataset;

export interface HttpDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: HttpDatasetTypeProperties;
}

export interface HttpDatasetTypeProperties {
  /** The relative URL based on the URL in the HttpLinkedService refers to an HTTP file Type: string (or Expression with resultType string). */
  relativeUrl?: Record<string, unknown>;
  /** The HTTP method for the HTTP request. Type: string (or Expression with resultType string). */
  requestMethod?: Record<string, unknown>;
  /** The body for the HTTP request. Type: string (or Expression with resultType string). */
  requestBody?: Record<string, unknown>;
  /**
   * The headers for the HTTP Request. e.g. request-header-name-1:request-header-value-1
   * ...
   * request-header-name-n:request-header-value-n Type: string (or Expression with resultType string).
   */
  additionalHeaders?: Record<string, unknown>;
  /** The format of files. */
  format?: DatasetStorageFormat;
  /** The data compression method used on files. */
  compression?: DatasetCompression;
}

export interface GenericDatasetTypeProperties {
  /** The table name. Type: string (or Expression with resultType string). */
  tableName?: Record<string, unknown>;
}

export type AmazonMWSObjectDataset = AmazonMWSObjectDatasetBase & Dataset;

export interface AmazonMWSObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type AzurePostgreSqlTableDataset = AzurePostgreSqlTableDatasetBase &
  Dataset;

export interface AzurePostgreSqlTableDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: AzurePostgreSqlTableDatasetTypeProperties;
}

export interface AzurePostgreSqlTableDatasetTypeProperties {
  /** The table name of the Azure PostgreSQL database which includes both schema and table. Type: string (or Expression with resultType string). */
  tableName?: Record<string, unknown>;
  /** The table name of the Azure PostgreSQL database. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
  /** The schema name of the Azure PostgreSQL database. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
}

export type ConcurObjectDataset = ConcurObjectDatasetBase & Dataset;

export interface ConcurObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type CouchbaseTableDataset = CouchbaseTableDatasetBase & Dataset;

export interface CouchbaseTableDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type DrillTableDataset = DrillTableDatasetBase & Dataset;

export interface DrillTableDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: DrillDatasetTypeProperties;
}

export interface DrillDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The table name of the Drill. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
  /** The schema name of the Drill. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
}

export type EloquaObjectDataset = EloquaObjectDatasetBase & Dataset;

export interface EloquaObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type GoogleBigQueryObjectDataset = GoogleBigQueryObjectDatasetBase &
  Dataset;

export interface GoogleBigQueryObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GoogleBigQueryDatasetTypeProperties;
}

export interface GoogleBigQueryDatasetTypeProperties {
  /** This property will be retired. Please consider using database + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The table name of the Google BigQuery. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
  /** The database name of the Google BigQuery. Type: string (or Expression with resultType string). */
  dataset?: Record<string, unknown>;
}

export type GreenplumTableDataset = GreenplumTableDatasetBase & Dataset;

export interface GreenplumTableDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GreenplumDatasetTypeProperties;
}

export interface GreenplumDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The table name of Greenplum. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
  /** The schema name of Greenplum. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
}

export type HBaseObjectDataset = HBaseObjectDatasetBase & Dataset;

export interface HBaseObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type HiveObjectDataset = HiveObjectDatasetBase & Dataset;

export interface HiveObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: HiveDatasetTypeProperties;
}

export interface HiveDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The table name of the Hive. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
  /** The schema name of the Hive. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
}

export type HubspotObjectDataset = HubspotObjectDatasetBase & Dataset;

export interface HubspotObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type ImpalaObjectDataset = ImpalaObjectDatasetBase & Dataset;

export interface ImpalaObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: ImpalaDatasetTypeProperties;
}

export interface ImpalaDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The table name of the Impala. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
  /** The schema name of the Impala. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
}

export type JiraObjectDataset = JiraObjectDatasetBase & Dataset;

export interface JiraObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type MagentoObjectDataset = MagentoObjectDatasetBase & Dataset;

export interface MagentoObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type MariaDBTableDataset = MariaDBTableDatasetBase & Dataset;

export interface MariaDBTableDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type AzureMariaDBTableDataset = AzureMariaDBTableDatasetBase & Dataset;

export interface AzureMariaDBTableDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type MarketoObjectDataset = MarketoObjectDatasetBase & Dataset;

export interface MarketoObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type PaypalObjectDataset = PaypalObjectDatasetBase & Dataset;

export interface PaypalObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type PhoenixObjectDataset = PhoenixObjectDatasetBase & Dataset;

export interface PhoenixObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: PhoenixDatasetTypeProperties;
}

export interface PhoenixDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The table name of the Phoenix. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
  /** The schema name of the Phoenix. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
}

export type PrestoObjectDataset = PrestoObjectDatasetBase & Dataset;

export interface PrestoObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: PrestoDatasetTypeProperties;
}

export interface PrestoDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The table name of the Presto. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
  /** The schema name of the Presto. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
}

export type QuickBooksObjectDataset = QuickBooksObjectDatasetBase & Dataset;

export interface QuickBooksObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type ServiceNowObjectDataset = ServiceNowObjectDatasetBase & Dataset;

export interface ServiceNowObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type ShopifyObjectDataset = ShopifyObjectDatasetBase & Dataset;

export interface ShopifyObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type SparkObjectDataset = SparkObjectDatasetBase & Dataset;

export interface SparkObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: SparkDatasetTypeProperties;
}

export interface SparkDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The table name of the Spark. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
  /** The schema name of the Spark. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
}

export type SquareObjectDataset = SquareObjectDatasetBase & Dataset;

export interface SquareObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type XeroObjectDataset = XeroObjectDatasetBase & Dataset;

export interface XeroObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type ZohoObjectDataset = ZohoObjectDatasetBase & Dataset;

export interface ZohoObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type NetezzaTableDataset = NetezzaTableDatasetBase & Dataset;

export interface NetezzaTableDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: NetezzaTableDatasetTypeProperties;
}

export interface NetezzaTableDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The table name of the Netezza. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
  /** The schema name of the Netezza. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
}

export type VerticaTableDataset = VerticaTableDatasetBase & Dataset;

export interface VerticaTableDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: VerticaDatasetTypeProperties;
}

export interface VerticaDatasetTypeProperties {
  /** This property will be retired. Please consider using schema + table properties instead. */
  tableName?: Record<string, unknown>;
  /** The table name of the Vertica. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
  /** The schema name of the Vertica. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
}

export type SalesforceMarketingCloudObjectDataset = SalesforceMarketingCloudObjectDatasetBase &
  Dataset;

export interface SalesforceMarketingCloudObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type ResponsysObjectDataset = ResponsysObjectDatasetBase & Dataset;

export interface ResponsysObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type DynamicsAXResourceDataset = DynamicsAXResourceDatasetBase & Dataset;

export interface DynamicsAXResourceDatasetBase {
  /** Dynamics AX OData resource dataset properties. */
  typeProperties: DynamicsAXResourceDatasetTypeProperties;
}

export interface DynamicsAXResourceDatasetTypeProperties {
  /** The path of the Dynamics AX OData entity. Type: string (or Expression with resultType string). */
  path: Record<string, unknown>;
}

export type OracleServiceCloudObjectDataset = OracleServiceCloudObjectDatasetBase &
  Dataset;

export interface OracleServiceCloudObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type AzureDataExplorerTableDataset = AzureDataExplorerTableDatasetBase &
  Dataset;

export interface AzureDataExplorerTableDatasetBase {
  /** Azure Data Explorer (Kusto) dataset properties. */
  typeProperties: AzureDataExplorerDatasetTypeProperties;
}

export interface AzureDataExplorerDatasetTypeProperties {
  /** The table name of the Azure Data Explorer database. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
}

export type GoogleAdWordsObjectDataset = GoogleAdWordsObjectDatasetBase &
  Dataset;

export interface GoogleAdWordsObjectDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: GenericDatasetTypeProperties;
}

export type SnowflakeDataset = SnowflakeDatasetBase & Dataset;

export interface SnowflakeDatasetBase {
  /** Snowflake dataset properties. */
  typeProperties: SnowflakeDatasetTypeProperties;
}

export interface SnowflakeDatasetTypeProperties {
  /** The schema name of the Snowflake database. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
  /** The table name of the Snowflake database. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
}

export type SharePointOnlineListResourceDataset = SharePointOnlineListResourceDatasetBase &
  Dataset;

export interface SharePointOnlineListResourceDatasetBase {
  /** Sharepoint online list dataset properties. */
  typeProperties?: SharePointOnlineListDatasetTypeProperties;
}

export interface SharePointOnlineListDatasetTypeProperties {
  /** The name of the SharePoint Online list. Type: string (or Expression with resultType string). */
  listName?: Record<string, unknown>;
}

export type AzureDatabricksDeltaLakeDataset = AzureDatabricksDeltaLakeDatasetBase &
  Dataset;

export interface AzureDatabricksDeltaLakeDatasetBase {
  /** Properties specific to this dataset type. */
  typeProperties?: AzureDatabricksDeltaLakeDatasetTypeProperties;
}

export interface AzureDatabricksDeltaLakeDatasetTypeProperties {
  /** The name of delta table. Type: string (or Expression with resultType string). */
  table?: Record<string, unknown>;
  /** The database name of delta table. Type: string (or Expression with resultType string). */
  database?: Record<string, unknown>;
}

export type AzureStorageLinkedService = AzureStorageLinkedServiceBase &
  LinkedService;

export interface AzureStorageLinkedServiceBase {
  /** Azure Storage linked service properties. */
  typeProperties: AzureStorageLinkedServiceTypeProperties;
}

export interface AzureStorageLinkedServiceTypeProperties {
  /** The connection string. It is mutually exclusive with sasUri property. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** The Azure key vault secret reference of accountKey in connection string. */
  accountKey?: AzureKeyVaultSecretReference;
  /** SAS URI of the Azure Storage resource. It is mutually exclusive with connectionString property. Type: string, SecureString or AzureKeyVaultSecretReference. */
  sasUri?: Record<string, unknown>;
  /** The Azure key vault secret reference of sasToken in sas uri. */
  sasToken?: AzureKeyVaultSecretReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: string;
}

export type AzureBlobStorageLinkedService = AzureBlobStorageLinkedServiceBase &
  LinkedService;

export interface AzureBlobStorageLinkedServiceBase {
  /** Azure Blob Storage linked service properties. */
  typeProperties: AzureBlobStorageLinkedServiceTypeProperties;
}

export interface AzureBlobStorageLinkedServiceTypeProperties {
  /** The connection string. It is mutually exclusive with sasUri, serviceEndpoint property. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** The Azure key vault secret reference of accountKey in connection string. */
  accountKey?: AzureKeyVaultSecretReference;
  /** SAS URI of the Azure Blob Storage resource. It is mutually exclusive with connectionString, serviceEndpoint property. Type: string, SecureString or AzureKeyVaultSecretReference. */
  sasUri?: Record<string, unknown>;
  /** The Azure key vault secret reference of sasToken in sas uri. */
  sasToken?: AzureKeyVaultSecretReference;
  /** Blob service endpoint of the Azure Blob Storage resource. It is mutually exclusive with connectionString, sasUri property. */
  serviceEndpoint?: string;
  /** The ID of the service principal used to authenticate against Azure SQL Data Warehouse. Type: string (or Expression with resultType string). */
  servicePrincipalId?: Record<string, unknown>;
  /** The key of the service principal used to authenticate against Azure SQL Data Warehouse. */
  servicePrincipalKey?: SecretBase;
  /** The name or ID of the tenant to which the service principal belongs. Type: string (or Expression with resultType string). */
  tenant?: Record<string, unknown>;
  /** Indicates the azure cloud type of the service principle auth. Allowed values are AzurePublic, AzureChina, AzureUsGovernment, AzureGermany. Default value is the data factory regions’ cloud type. Type: string (or Expression with resultType string). */
  azureCloudType?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: string;
}

export type AzureTableStorageLinkedService = AzureTableStorageLinkedServiceBase &
  LinkedService;

export interface AzureTableStorageLinkedServiceBase {
  /** Azure Table Storage linked service properties. */
  typeProperties: AzureStorageLinkedServiceTypeProperties;
}

export type AzureSqlDWLinkedService = AzureSqlDWLinkedServiceBase &
  LinkedService;

export interface AzureSqlDWLinkedServiceBase {
  /** Azure SQL Data Warehouse linked service properties. */
  typeProperties: AzureSqlDWLinkedServiceTypeProperties;
}

export interface AzureSqlDWLinkedServiceTypeProperties {
  /** The connection string. Type: string, SecureString or AzureKeyVaultSecretReference. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  password?: AzureKeyVaultSecretReference;
  /** The ID of the service principal used to authenticate against Azure SQL Data Warehouse. Type: string (or Expression with resultType string). */
  servicePrincipalId?: Record<string, unknown>;
  /** The key of the service principal used to authenticate against Azure SQL Data Warehouse. */
  servicePrincipalKey?: SecretBase;
  /** The name or ID of the tenant to which the service principal belongs. Type: string (or Expression with resultType string). */
  tenant?: Record<string, unknown>;
  /** Indicates the azure cloud type of the service principle auth. Allowed values are AzurePublic, AzureChina, AzureUsGovernment, AzureGermany. Default value is the data factory regions’ cloud type. Type: string (or Expression with resultType string). */
  azureCloudType?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type SqlServerLinkedService = SqlServerLinkedServiceBase & LinkedService;

export interface SqlServerLinkedServiceBase {
  /** SQL Server linked service properties. */
  typeProperties: SqlServerLinkedServiceTypeProperties;
}

export interface SqlServerLinkedServiceTypeProperties {
  /** The connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString: Record<string, unknown>;
  /** The on-premises Windows authentication user name. Type: string (or Expression with resultType string). */
  userName?: Record<string, unknown>;
  /** The on-premises Windows authentication password. */
  password?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AzureSqlDatabaseLinkedService = AzureSqlDatabaseLinkedServiceBase &
  LinkedService;

export interface AzureSqlDatabaseLinkedServiceBase {
  /** Azure SQL Database linked service properties. */
  typeProperties: AzureSqlDatabaseLinkedServiceTypeProperties;
}

export interface AzureSqlDatabaseLinkedServiceTypeProperties {
  /** The connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  password?: AzureKeyVaultSecretReference;
  /** The ID of the service principal used to authenticate against Azure SQL Database. Type: string (or Expression with resultType string). */
  servicePrincipalId?: Record<string, unknown>;
  /** The key of the service principal used to authenticate against Azure SQL Database. */
  servicePrincipalKey?: SecretBase;
  /** The name or ID of the tenant to which the service principal belongs. Type: string (or Expression with resultType string). */
  tenant?: Record<string, unknown>;
  /** Indicates the azure cloud type of the service principle auth. Allowed values are AzurePublic, AzureChina, AzureUsGovernment, AzureGermany. Default value is the data factory regions’ cloud type. Type: string (or Expression with resultType string). */
  azureCloudType?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AzureSqlMILinkedService = AzureSqlMILinkedServiceBase &
  LinkedService;

export interface AzureSqlMILinkedServiceBase {
  /** Azure SQL Managed Instance linked service properties. */
  typeProperties: AzureSqlMILinkedServiceTypeProperties;
}

export interface AzureSqlMILinkedServiceTypeProperties {
  /** The connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  password?: AzureKeyVaultSecretReference;
  /** The ID of the service principal used to authenticate against Azure SQL Managed Instance. Type: string (or Expression with resultType string). */
  servicePrincipalId?: Record<string, unknown>;
  /** The key of the service principal used to authenticate against Azure SQL Managed Instance. */
  servicePrincipalKey?: SecretBase;
  /** The name or ID of the tenant to which the service principal belongs. Type: string (or Expression with resultType string). */
  tenant?: Record<string, unknown>;
  /** Indicates the azure cloud type of the service principle auth. Allowed values are AzurePublic, AzureChina, AzureUsGovernment, AzureGermany. Default value is the data factory regions’ cloud type. Type: string (or Expression with resultType string). */
  azureCloudType?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AzureBatchLinkedService = AzureBatchLinkedServiceBase &
  LinkedService;

export interface AzureBatchLinkedServiceBase {
  /** Azure Batch linked service properties. */
  typeProperties: AzureBatchLinkedServiceTypeProperties;
}

export interface AzureBatchLinkedServiceTypeProperties {
  /** The Azure Batch account name. Type: string (or Expression with resultType string). */
  accountName: Record<string, unknown>;
  /** The Azure Batch account access key. */
  accessKey?: SecretBase;
  /** The Azure Batch URI. Type: string (or Expression with resultType string). */
  batchUri: Record<string, unknown>;
  /** The Azure Batch pool name. Type: string (or Expression with resultType string). */
  poolName: Record<string, unknown>;
  /** The Azure Storage linked service reference. */
  linkedServiceName: LinkedServiceReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AzureKeyVaultLinkedService = AzureKeyVaultLinkedServiceBase &
  LinkedService;

export interface AzureKeyVaultLinkedServiceBase {
  /** Azure Key Vault linked service properties. */
  typeProperties: AzureKeyVaultLinkedServiceTypeProperties;
}

export interface AzureKeyVaultLinkedServiceTypeProperties {
  /** The base URL of the Azure Key Vault. e.g. https://myakv.vault.azure.net Type: string (or Expression with resultType string). */
  baseUrl: Record<string, unknown>;
}

export type CosmosDbLinkedService = CosmosDbLinkedServiceBase & LinkedService;

export interface CosmosDbLinkedServiceBase {
  /** CosmosDB linked service properties. */
  typeProperties: CosmosDbLinkedServiceTypeProperties;
}

export interface CosmosDbLinkedServiceTypeProperties {
  /** The connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** The endpoint of the Azure CosmosDB account. Type: string (or Expression with resultType string) */
  accountEndpoint?: Record<string, unknown>;
  /** The name of the database. Type: string (or Expression with resultType string) */
  database?: Record<string, unknown>;
  /** The account key of the Azure CosmosDB account. Type: SecureString or AzureKeyVaultSecretReference. */
  accountKey?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type DynamicsLinkedService = DynamicsLinkedServiceBase & LinkedService;

export interface DynamicsLinkedServiceBase {
  /** Dynamics linked service properties. */
  typeProperties: DynamicsLinkedServiceTypeProperties;
}

export interface DynamicsLinkedServiceTypeProperties {
  /** The deployment type of the Dynamics instance. 'Online' for Dynamics Online and 'OnPremisesWithIfd' for Dynamics on-premises with Ifd. Type: string (or Expression with resultType string). */
  deploymentType: "Online" | "OnPremisesWithIfd";
  /** The host name of the on-premises Dynamics server. The property is required for on-prem and not allowed for online. Type: string (or Expression with resultType string). */
  hostName?: Record<string, unknown>;
  /** The port of on-premises Dynamics server. The property is required for on-prem and not allowed for online. Default is 443. Type: integer (or Expression with resultType integer), minimum: 0. */
  port?: Record<string, unknown>;
  /** The URL to the Microsoft Dynamics server. The property is required for on-line and not allowed for on-prem. Type: string (or Expression with resultType string). */
  serviceUri?: Record<string, unknown>;
  /** The organization name of the Dynamics instance. The property is required for on-prem and required for online when there are more than one Dynamics instances associated with the user. Type: string (or Expression with resultType string). */
  organizationName?: Record<string, unknown>;
  /** The authentication type to connect to Dynamics server. 'Office365' for online scenario, 'Ifd' for on-premises with Ifd scenario, 'AADServicePrincipal' for Server-To-Server authentication in online scenario. Type: string (or Expression with resultType string). */
  authenticationType: "Office365" | "Ifd" | "AADServicePrincipal";
  /** User name to access the Dynamics instance. Type: string (or Expression with resultType string). */
  username?: Record<string, unknown>;
  /** Password to access the Dynamics instance. */
  password?: SecretBase;
  /** The client ID of the application in Azure Active Directory used for Server-To-Server authentication. Type: string (or Expression with resultType string). */
  servicePrincipalId?: Record<string, unknown>;
  /** The service principal credential type to use in Server-To-Server authentication. 'ServicePrincipalKey' for key/secret, 'ServicePrincipalCert' for certificate. Type: string (or Expression with resultType string). */
  servicePrincipalCredentialType?:
    | "ServicePrincipalKey"
    | "ServicePrincipalCert";
  /** The credential of the service principal object in Azure Active Directory. If servicePrincipalCredentialType is 'ServicePrincipalKey', servicePrincipalCredential can be SecureString or AzureKeyVaultSecretReference. If servicePrincipalCredentialType is 'ServicePrincipalCert', servicePrincipalCredential can only be AzureKeyVaultSecretReference. */
  servicePrincipalCredential?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type DynamicsCrmLinkedService = DynamicsCrmLinkedServiceBase &
  LinkedService;

export interface DynamicsCrmLinkedServiceBase {
  /** Dynamics CRM linked service properties. */
  typeProperties: DynamicsCrmLinkedServiceTypeProperties;
}

export interface DynamicsCrmLinkedServiceTypeProperties {
  /** The deployment type of the Dynamics CRM instance. 'Online' for Dynamics CRM Online and 'OnPremisesWithIfd' for Dynamics CRM on-premises with Ifd. Type: string (or Expression with resultType string). */
  deploymentType: "Online" | "OnPremisesWithIfd";
  /** The host name of the on-premises Dynamics CRM server. The property is required for on-prem and not allowed for online. Type: string (or Expression with resultType string). */
  hostName?: Record<string, unknown>;
  /** The port of on-premises Dynamics CRM server. The property is required for on-prem and not allowed for online. Default is 443. Type: integer (or Expression with resultType integer), minimum: 0. */
  port?: Record<string, unknown>;
  /** The URL to the Microsoft Dynamics CRM server. The property is required for on-line and not allowed for on-prem. Type: string (or Expression with resultType string). */
  serviceUri?: Record<string, unknown>;
  /** The organization name of the Dynamics CRM instance. The property is required for on-prem and required for online when there are more than one Dynamics CRM instances associated with the user. Type: string (or Expression with resultType string). */
  organizationName?: Record<string, unknown>;
  /** The authentication type to connect to Dynamics CRM server. 'Office365' for online scenario, 'Ifd' for on-premises with Ifd scenario, 'AADServicePrincipal' for Server-To-Server authentication in online scenario. Type: string (or Expression with resultType string). */
  authenticationType: "Office365" | "Ifd" | "AADServicePrincipal";
  /** User name to access the Dynamics CRM instance. Type: string (or Expression with resultType string). */
  username?: Record<string, unknown>;
  /** Password to access the Dynamics CRM instance. */
  password?: SecretBase;
  /** The client ID of the application in Azure Active Directory used for Server-To-Server authentication. Type: string (or Expression with resultType string). */
  servicePrincipalId?: Record<string, unknown>;
  /** A string from ServicePrincipalCredentialEnum or an expression */
  servicePrincipalCredentialType?: Record<string, unknown>;
  /** The credential of the service principal object in Azure Active Directory. If servicePrincipalCredentialType is 'ServicePrincipalKey', servicePrincipalCredential can be SecureString or AzureKeyVaultSecretReference. If servicePrincipalCredentialType is 'ServicePrincipalCert', servicePrincipalCredential can only be AzureKeyVaultSecretReference. */
  servicePrincipalCredential?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type CommonDataServiceForAppsLinkedService = CommonDataServiceForAppsLinkedServiceBase &
  LinkedService;

export interface CommonDataServiceForAppsLinkedServiceBase {
  /** Common Data Service for Apps linked service properties. */
  typeProperties: CommonDataServiceForAppsLinkedServiceTypeProperties;
}

export interface CommonDataServiceForAppsLinkedServiceTypeProperties {
  /** The deployment type of the Common Data Service for Apps instance. 'Online' for Common Data Service for Apps Online and 'OnPremisesWithIfd' for Common Data Service for Apps on-premises with Ifd. Type: string (or Expression with resultType string). */
  deploymentType: "Online" | "OnPremisesWithIfd";
  /** The host name of the on-premises Common Data Service for Apps server. The property is required for on-prem and not allowed for online. Type: string (or Expression with resultType string). */
  hostName?: Record<string, unknown>;
  /** The port of on-premises Common Data Service for Apps server. The property is required for on-prem and not allowed for online. Default is 443. Type: integer (or Expression with resultType integer), minimum: 0. */
  port?: Record<string, unknown>;
  /** The URL to the Microsoft Common Data Service for Apps server. The property is required for on-line and not allowed for on-prem. Type: string (or Expression with resultType string). */
  serviceUri?: Record<string, unknown>;
  /** The organization name of the Common Data Service for Apps instance. The property is required for on-prem and required for online when there are more than one Common Data Service for Apps instances associated with the user. Type: string (or Expression with resultType string). */
  organizationName?: Record<string, unknown>;
  /** The authentication type to connect to Common Data Service for Apps server. 'Office365' for online scenario, 'Ifd' for on-premises with Ifd scenario. 'AADServicePrincipal' for Server-To-Server authentication in online scenario. Type: string (or Expression with resultType string). */
  authenticationType: "Office365" | "Ifd" | "AADServicePrincipal";
  /** User name to access the Common Data Service for Apps instance. Type: string (or Expression with resultType string). */
  username?: Record<string, unknown>;
  /** Password to access the Common Data Service for Apps instance. */
  password?: SecretBase;
  /** The client ID of the application in Azure Active Directory used for Server-To-Server authentication. Type: string (or Expression with resultType string). */
  servicePrincipalId?: Record<string, unknown>;
  /** A string from ServicePrincipalCredentialEnum or an expression */
  servicePrincipalCredentialType?: Record<string, unknown>;
  /** The credential of the service principal object in Azure Active Directory. If servicePrincipalCredentialType is 'ServicePrincipalKey', servicePrincipalCredential can be SecureString or AzureKeyVaultSecretReference. If servicePrincipalCredentialType is 'ServicePrincipalCert', servicePrincipalCredential can only be AzureKeyVaultSecretReference. */
  servicePrincipalCredential?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type HDInsightLinkedService = HDInsightLinkedServiceBase & LinkedService;

export interface HDInsightLinkedServiceBase {
  /** HDInsight linked service properties. */
  typeProperties: HDInsightLinkedServiceTypeProperties;
}

export interface HDInsightLinkedServiceTypeProperties {
  /** HDInsight cluster URI. Type: string (or Expression with resultType string). */
  clusterUri: Record<string, unknown>;
  /** HDInsight cluster user name. Type: string (or Expression with resultType string). */
  userName?: Record<string, unknown>;
  /** HDInsight cluster password. */
  password?: SecretBase;
  /** The Azure Storage linked service reference. */
  linkedServiceName?: LinkedServiceReference;
  /** A reference to the Azure SQL linked service that points to the HCatalog database. */
  hcatalogLinkedServiceName?: LinkedServiceReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
  /** Specify if the HDInsight is created with ESP (Enterprise Security Package). Type: Boolean. */
  isEspEnabled?: Record<string, unknown>;
  /** Specify the FileSystem if the main storage for the HDInsight is ADLS Gen2. Type: string (or Expression with resultType string). */
  fileSystem?: Record<string, unknown>;
}

export type FileServerLinkedService = FileServerLinkedServiceBase &
  LinkedService;

export interface FileServerLinkedServiceBase {
  /** File system linked service properties. */
  typeProperties: FileServerLinkedServiceTypeProperties;
}

export interface FileServerLinkedServiceTypeProperties {
  /** Host name of the server. Type: string (or Expression with resultType string). */
  host: Record<string, unknown>;
  /** User ID to logon the server. Type: string (or Expression with resultType string). */
  userId?: Record<string, unknown>;
  /** Password to logon the server. */
  password?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AzureFileStorageLinkedService = AzureFileStorageLinkedServiceBase &
  LinkedService;

export interface AzureFileStorageLinkedServiceBase {
  /** Azure File Storage linked service properties. */
  typeProperties: AzureFileStorageLinkedServiceTypeProperties;
}

export interface AzureFileStorageLinkedServiceTypeProperties {
  /** Host name of the server. Type: string (or Expression with resultType string). */
  host: Record<string, unknown>;
  /** User ID to logon the server. Type: string (or Expression with resultType string). */
  userId?: Record<string, unknown>;
  /** Password to logon the server. */
  password?: SecretBase;
  /** The connection string. It is mutually exclusive with sasUri property. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** The Azure key vault secret reference of accountKey in connection string. */
  accountKey?: AzureKeyVaultSecretReference;
  /** SAS URI of the Azure File resource. It is mutually exclusive with connectionString property. Type: string, SecureString or AzureKeyVaultSecretReference. */
  sasUri?: Record<string, unknown>;
  /** The Azure key vault secret reference of sasToken in sas uri. */
  sasToken?: AzureKeyVaultSecretReference;
  /** The azure file share name. It is required when auth with accountKey/sasToken. Type: string (or Expression with resultType string). */
  fileShare?: Record<string, unknown>;
  /** The azure file share snapshot version. Type: string (or Expression with resultType string). */
  snapshot?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type GoogleCloudStorageLinkedService = GoogleCloudStorageLinkedServiceBase &
  LinkedService;

export interface GoogleCloudStorageLinkedServiceBase {
  /** Google Cloud Storage linked service properties. */
  typeProperties: GoogleCloudStorageLinkedServiceTypeProperties;
}

export interface GoogleCloudStorageLinkedServiceTypeProperties {
  /** The access key identifier of the Google Cloud Storage Identity and Access Management (IAM) user. Type: string (or Expression with resultType string). */
  accessKeyId?: Record<string, unknown>;
  /** The secret access key of the Google Cloud Storage Identity and Access Management (IAM) user. */
  secretAccessKey?: SecretBase;
  /** This value specifies the endpoint to access with the Google Cloud Storage Connector. This is an optional property; change it only if you want to try a different service endpoint or want to switch between https and http. Type: string (or Expression with resultType string). */
  serviceUrl?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type OracleLinkedService = OracleLinkedServiceBase & LinkedService;

export interface OracleLinkedServiceBase {
  /** Oracle database linked service properties. */
  typeProperties: OracleLinkedServiceTypeProperties;
}

export interface OracleLinkedServiceTypeProperties {
  /** The connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  password?: AzureKeyVaultSecretReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AzureMySqlLinkedService = AzureMySqlLinkedServiceBase &
  LinkedService;

export interface AzureMySqlLinkedServiceBase {
  /** Azure MySQL database linked service properties. */
  typeProperties: AzureMySqlLinkedServiceTypeProperties;
}

export interface AzureMySqlLinkedServiceTypeProperties {
  /** The connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  password?: AzureKeyVaultSecretReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type MySqlLinkedService = MySqlLinkedServiceBase & LinkedService;

export interface MySqlLinkedServiceBase {
  /** MySQL linked service properties. */
  typeProperties: MySqlLinkedServiceTypeProperties;
}

export interface MySqlLinkedServiceTypeProperties {
  /** The connection string. */
  connectionString: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  password?: AzureKeyVaultSecretReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type PostgreSqlLinkedService = PostgreSqlLinkedServiceBase &
  LinkedService;

export interface PostgreSqlLinkedServiceBase {
  /** PostgreSQL linked service properties. */
  typeProperties: PostgreSqlLinkedServiceTypeProperties;
}

export interface PostgreSqlLinkedServiceTypeProperties {
  /** The connection string. */
  connectionString: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  password?: AzureKeyVaultSecretReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type SybaseLinkedService = SybaseLinkedServiceBase & LinkedService;

export interface SybaseLinkedServiceBase {
  /** Sybase linked service properties. */
  typeProperties: SybaseLinkedServiceTypeProperties;
}

export interface SybaseLinkedServiceTypeProperties {
  /** Server name for connection. Type: string (or Expression with resultType string). */
  server: Record<string, unknown>;
  /** Database name for connection. Type: string (or Expression with resultType string). */
  database: Record<string, unknown>;
  /** Schema name for connection. Type: string (or Expression with resultType string). */
  schema?: Record<string, unknown>;
  /** AuthenticationType to be used for connection. */
  authenticationType?: "Basic" | "Windows";
  /** Username for authentication. Type: string (or Expression with resultType string). */
  username?: Record<string, unknown>;
  /** Password for authentication. */
  password?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type Db2LinkedService = Db2LinkedServiceBase & LinkedService;

export interface Db2LinkedServiceBase {
  /** DB2 linked service properties. */
  typeProperties: Db2LinkedServiceTypeProperties;
}

export interface Db2LinkedServiceTypeProperties {
  /** The connection string. It is mutually exclusive with server, database, authenticationType, userName, packageCollection and certificateCommonName property. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** Server name for connection. It is mutually exclusive with connectionString property. Type: string (or Expression with resultType string). */
  server: Record<string, unknown>;
  /** Database name for connection. It is mutually exclusive with connectionString property. Type: string (or Expression with resultType string). */
  database: Record<string, unknown>;
  /** AuthenticationType to be used for connection. It is mutually exclusive with connectionString property. */
  authenticationType?: "Basic";
  /** Username for authentication. It is mutually exclusive with connectionString property. Type: string (or Expression with resultType string). */
  username?: Record<string, unknown>;
  /** Password for authentication. */
  password?: SecretBase;
  /** Under where packages are created when querying database. It is mutually exclusive with connectionString property. Type: string (or Expression with resultType string). */
  packageCollection?: Record<string, unknown>;
  /** Certificate Common Name when TLS is enabled. It is mutually exclusive with connectionString property. Type: string (or Expression with resultType string). */
  certificateCommonName?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. It is mutually exclusive with connectionString property. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type TeradataLinkedService = TeradataLinkedServiceBase & LinkedService;

export interface TeradataLinkedServiceBase {
  /** Teradata linked service properties. */
  typeProperties: TeradataLinkedServiceTypeProperties;
}

export interface TeradataLinkedServiceTypeProperties {
  /** Teradata ODBC connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** Server name for connection. Type: string (or Expression with resultType string). */
  server?: Record<string, unknown>;
  /** AuthenticationType to be used for connection. */
  authenticationType?: "Basic" | "Windows";
  /** Username for authentication. Type: string (or Expression with resultType string). */
  username?: Record<string, unknown>;
  /** Password for authentication. */
  password?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AzureMLLinkedService = AzureMLLinkedServiceBase & LinkedService;

export interface AzureMLLinkedServiceBase {
  /** Azure ML Studio Web Service linked service properties. */
  typeProperties: AzureMLLinkedServiceTypeProperties;
}

export interface AzureMLLinkedServiceTypeProperties {
  /** The Batch Execution REST URL for an Azure ML Studio Web Service endpoint. Type: string (or Expression with resultType string). */
  mlEndpoint: Record<string, unknown>;
  /** The API key for accessing the Azure ML model endpoint. */
  apiKey: SecretBase;
  /** The Update Resource REST URL for an Azure ML Studio Web Service endpoint. Type: string (or Expression with resultType string). */
  updateResourceEndpoint?: Record<string, unknown>;
  /** The ID of the service principal used to authenticate against the ARM-based updateResourceEndpoint of an Azure ML Studio web service. Type: string (or Expression with resultType string). */
  servicePrincipalId?: Record<string, unknown>;
  /** The key of the service principal used to authenticate against the ARM-based updateResourceEndpoint of an Azure ML Studio web service. */
  servicePrincipalKey?: SecretBase;
  /** The name or ID of the tenant to which the service principal belongs. Type: string (or Expression with resultType string). */
  tenant?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AzureMLServiceLinkedService = AzureMLServiceLinkedServiceBase &
  LinkedService;

export interface AzureMLServiceLinkedServiceBase {
  /** Azure ML Service linked service properties. */
  typeProperties: AzureMLServiceLinkedServiceTypeProperties;
}

export interface AzureMLServiceLinkedServiceTypeProperties {
  /** Azure ML Service workspace subscription ID. Type: string (or Expression with resultType string). */
  subscriptionId: Record<string, unknown>;
  /** Azure ML Service workspace resource group name. Type: string (or Expression with resultType string). */
  resourceGroupName: Record<string, unknown>;
  /** Azure ML Service workspace name. Type: string (or Expression with resultType string). */
  mlWorkspaceName: Record<string, unknown>;
  /** The ID of the service principal used to authenticate against the endpoint of a published Azure ML Service pipeline. Type: string (or Expression with resultType string). */
  servicePrincipalId?: Record<string, unknown>;
  /** The key of the service principal used to authenticate against the endpoint of a published Azure ML Service pipeline. */
  servicePrincipalKey?: SecretBase;
  /** The name or ID of the tenant to which the service principal belongs. Type: string (or Expression with resultType string). */
  tenant?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type OdbcLinkedService = OdbcLinkedServiceBase & LinkedService;

export interface OdbcLinkedServiceBase {
  /** ODBC linked service properties. */
  typeProperties: OdbcLinkedServiceTypeProperties;
}

export interface OdbcLinkedServiceTypeProperties {
  /** The non-access credential portion of the connection string as well as an optional encrypted credential. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString: Record<string, unknown>;
  /** Type of authentication used to connect to the ODBC data store. Possible values are: Anonymous and Basic. Type: string (or Expression with resultType string). */
  authenticationType?: Record<string, unknown>;
  /** The access credential portion of the connection string specified in driver-specific property-value format. */
  credential?: SecretBase;
  /** User name for Basic authentication. Type: string (or Expression with resultType string). */
  userName?: Record<string, unknown>;
  /** Password for Basic authentication. */
  password?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type InformixLinkedService = InformixLinkedServiceBase & LinkedService;

export interface InformixLinkedServiceBase {
  /** Informix linked service properties. */
  typeProperties: InformixLinkedServiceTypeProperties;
}

export interface InformixLinkedServiceTypeProperties {
  /** The non-access credential portion of the connection string as well as an optional encrypted credential. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString: Record<string, unknown>;
  /** Type of authentication used to connect to the Informix as ODBC data store. Possible values are: Anonymous and Basic. Type: string (or Expression with resultType string). */
  authenticationType?: Record<string, unknown>;
  /** The access credential portion of the connection string specified in driver-specific property-value format. */
  credential?: SecretBase;
  /** User name for Basic authentication. Type: string (or Expression with resultType string). */
  userName?: Record<string, unknown>;
  /** Password for Basic authentication. */
  password?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type MicrosoftAccessLinkedService = MicrosoftAccessLinkedServiceBase &
  LinkedService;

export interface MicrosoftAccessLinkedServiceBase {
  /** Microsoft Access linked service properties. */
  typeProperties: MicrosoftAccessLinkedServiceTypeProperties;
}

export interface MicrosoftAccessLinkedServiceTypeProperties {
  /** The non-access credential portion of the connection string as well as an optional encrypted credential. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString: Record<string, unknown>;
  /** Type of authentication used to connect to the Microsoft Access as ODBC data store. Possible values are: Anonymous and Basic. Type: string (or Expression with resultType string). */
  authenticationType?: Record<string, unknown>;
  /** The access credential portion of the connection string specified in driver-specific property-value format. */
  credential?: SecretBase;
  /** User name for Basic authentication. Type: string (or Expression with resultType string). */
  userName?: Record<string, unknown>;
  /** Password for Basic authentication. */
  password?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type HdfsLinkedService = HdfsLinkedServiceBase & LinkedService;

export interface HdfsLinkedServiceBase {
  /** HDFS linked service properties. */
  typeProperties: HdfsLinkedServiceTypeProperties;
}

export interface HdfsLinkedServiceTypeProperties {
  /** The URL of the HDFS service endpoint, e.g. http://myhostname:50070/webhdfs/v1 . Type: string (or Expression with resultType string). */
  url: Record<string, unknown>;
  /** Type of authentication used to connect to the HDFS. Possible values are: Anonymous and Windows. Type: string (or Expression with resultType string). */
  authenticationType?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
  /** User name for Windows authentication. Type: string (or Expression with resultType string). */
  userName?: Record<string, unknown>;
  /** Password for Windows authentication. */
  password?: SecretBase;
}

export type ODataLinkedService = ODataLinkedServiceBase & LinkedService;

export interface ODataLinkedServiceBase {
  /** OData linked service properties. */
  typeProperties: ODataLinkedServiceTypeProperties;
}

export interface ODataLinkedServiceTypeProperties {
  /** The URL of the OData service endpoint. Type: string (or Expression with resultType string). */
  url: Record<string, unknown>;
  /** Type of authentication used to connect to the OData service. */
  authenticationType?:
    | "Basic"
    | "Anonymous"
    | "Windows"
    | "AadServicePrincipal"
    | "ManagedServiceIdentity";
  /** User name of the OData service. Type: string (or Expression with resultType string). */
  userName?: Record<string, unknown>;
  /** Password of the OData service. */
  password?: SecretBase;
  /** Specify the tenant information (domain name or tenant ID) under which your application resides. Type: string (or Expression with resultType string). */
  tenant?: Record<string, unknown>;
  /** Specify the application id of your application registered in Azure Active Directory. Type: string (or Expression with resultType string). */
  servicePrincipalId?: Record<string, unknown>;
  /** Indicates the azure cloud type of the service principle auth. Allowed values are AzurePublic, AzureChina, AzureUsGovernment, AzureGermany. Default value is the data factory regions’ cloud type. Type: string (or Expression with resultType string). */
  azureCloudType?: Record<string, unknown>;
  /** Specify the resource you are requesting authorization to use Directory. Type: string (or Expression with resultType string). */
  aadResourceId?: Record<string, unknown>;
  /** Specify the credential type (key or cert) is used for service principal. */
  aadServicePrincipalCredentialType?:
    | "ServicePrincipalKey"
    | "ServicePrincipalCert";
  /** Specify the secret of your application registered in Azure Active Directory. Type: string (or Expression with resultType string). */
  servicePrincipalKey?: SecretBase;
  /** Specify the base64 encoded certificate of your application registered in Azure Active Directory. Type: string (or Expression with resultType string). */
  servicePrincipalEmbeddedCert?: SecretBase;
  /** Specify the password of your certificate if your certificate has a password and you are using AadServicePrincipal authentication. Type: string (or Expression with resultType string). */
  servicePrincipalEmbeddedCertPassword?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type WebLinkedService = WebLinkedServiceBase & LinkedService;

export interface WebLinkedServiceBase {
  /** Web linked service properties. */
  typeProperties: WebLinkedServiceTypeProperties;
}

export interface WebLinkedServiceTypeProperties {
  /** The URL of the web service endpoint, e.g. http://www.microsoft.com . Type: string (or Expression with resultType string). */
  url: Record<string, unknown>;
  /** Type of authentication used to connect to the web table source. */
  authenticationType: "Basic" | "Anonymous" | "ClientCertificate";
}

export type WebAnonymousAuthentication = WebAnonymousAuthenticationBase &
  WebLinkedServiceTypeProperties;

export interface WebAnonymousAuthenticationBase {}

export type WebBasicAuthentication = WebBasicAuthenticationBase &
  WebLinkedServiceTypeProperties;

export interface WebBasicAuthenticationBase {
  /** User name for Basic authentication. Type: string (or Expression with resultType string). */
  username: Record<string, unknown>;
  /** The password for Basic authentication. */
  password: SecretBase;
}

export type WebClientCertificateAuthentication = WebClientCertificateAuthenticationBase &
  WebLinkedServiceTypeProperties;

export interface WebClientCertificateAuthenticationBase {
  /** Base64-encoded contents of a PFX file. */
  pfx: SecretBase;
  /** Password for the PFX file. */
  password: SecretBase;
}

export type CassandraLinkedService = CassandraLinkedServiceBase & LinkedService;

export interface CassandraLinkedServiceBase {
  /** Cassandra linked service properties. */
  typeProperties: CassandraLinkedServiceTypeProperties;
}

export interface CassandraLinkedServiceTypeProperties {
  /** Host name for connection. Type: string (or Expression with resultType string). */
  host: Record<string, unknown>;
  /** AuthenticationType to be used for connection. Type: string (or Expression with resultType string). */
  authenticationType?: Record<string, unknown>;
  /** The port for the connection. Type: integer (or Expression with resultType integer). */
  port?: Record<string, unknown>;
  /** Username for authentication. Type: string (or Expression with resultType string). */
  username?: Record<string, unknown>;
  /** Password for authentication. */
  password?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type MongoDbLinkedService = MongoDbLinkedServiceBase & LinkedService;

export interface MongoDbLinkedServiceBase {
  /** MongoDB linked service properties. */
  typeProperties: MongoDbLinkedServiceTypeProperties;
}

export interface MongoDbLinkedServiceTypeProperties {
  /** The IP address or server name of the MongoDB server. Type: string (or Expression with resultType string). */
  server: Record<string, unknown>;
  /** The authentication type to be used to connect to the MongoDB database. */
  authenticationType?: "Basic" | "Anonymous";
  /** The name of the MongoDB database that you want to access. Type: string (or Expression with resultType string). */
  databaseName: Record<string, unknown>;
  /** Username for authentication. Type: string (or Expression with resultType string). */
  username?: Record<string, unknown>;
  /** Password for authentication. */
  password?: SecretBase;
  /** Database to verify the username and password. Type: string (or Expression with resultType string). */
  authSource?: Record<string, unknown>;
  /** The TCP port number that the MongoDB server uses to listen for client connections. The default value is 27017. Type: integer (or Expression with resultType integer), minimum: 0. */
  port?: Record<string, unknown>;
  /** Specifies whether the connections to the server are encrypted using SSL. The default value is false. Type: boolean (or Expression with resultType boolean). */
  enableSsl?: Record<string, unknown>;
  /** Specifies whether to allow self-signed certificates from the server. The default value is false. Type: boolean (or Expression with resultType boolean). */
  allowSelfSignedServerCert?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type MongoDbAtlasLinkedService = MongoDbAtlasLinkedServiceBase &
  LinkedService;

export interface MongoDbAtlasLinkedServiceBase {
  /** MongoDB Atlas linked service properties. */
  typeProperties: MongoDbAtlasLinkedServiceTypeProperties;
}

export interface MongoDbAtlasLinkedServiceTypeProperties {
  /** The MongoDB Atlas connection string. Type: string, SecureString or AzureKeyVaultSecretReference. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString: Record<string, unknown>;
  /** The name of the MongoDB Atlas database that you want to access. Type: string (or Expression with resultType string). */
  database: Record<string, unknown>;
}

export type MongoDbV2LinkedService = MongoDbV2LinkedServiceBase & LinkedService;

export interface MongoDbV2LinkedServiceBase {
  /** MongoDB linked service properties. */
  typeProperties: MongoDbV2LinkedServiceTypeProperties;
}

export interface MongoDbV2LinkedServiceTypeProperties {
  /** The MongoDB connection string. Type: string, SecureString or AzureKeyVaultSecretReference. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString: Record<string, unknown>;
  /** The name of the MongoDB database that you want to access. Type: string (or Expression with resultType string). */
  database: Record<string, unknown>;
}

export type CosmosDbMongoDbApiLinkedService = CosmosDbMongoDbApiLinkedServiceBase &
  LinkedService;

export interface CosmosDbMongoDbApiLinkedServiceBase {
  /** CosmosDB (MongoDB API) linked service properties. */
  typeProperties: CosmosDbMongoDbApiLinkedServiceTypeProperties;
}

export interface CosmosDbMongoDbApiLinkedServiceTypeProperties {
  /** The CosmosDB (MongoDB API) connection string. Type: string, SecureString or AzureKeyVaultSecretReference. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString: Record<string, unknown>;
  /** The name of the CosmosDB (MongoDB API) database that you want to access. Type: string (or Expression with resultType string). */
  database: Record<string, unknown>;
}

export type AzureDataLakeStoreLinkedService = AzureDataLakeStoreLinkedServiceBase &
  LinkedService;

export interface AzureDataLakeStoreLinkedServiceBase {
  /** Azure Data Lake Store linked service properties. */
  typeProperties: AzureDataLakeStoreLinkedServiceTypeProperties;
}

export interface AzureDataLakeStoreLinkedServiceTypeProperties {
  /** Data Lake Store service URI. Type: string (or Expression with resultType string). */
  dataLakeStoreUri: Record<string, unknown>;
  /** The ID of the application used to authenticate against the Azure Data Lake Store account. Type: string (or Expression with resultType string). */
  servicePrincipalId?: Record<string, unknown>;
  /** The Key of the application used to authenticate against the Azure Data Lake Store account. */
  servicePrincipalKey?: SecretBase;
  /** The name or ID of the tenant to which the service principal belongs. Type: string (or Expression with resultType string). */
  tenant?: Record<string, unknown>;
  /** Indicates the azure cloud type of the service principle auth. Allowed values are AzurePublic, AzureChina, AzureUsGovernment, AzureGermany. Default value is the data factory regions’ cloud type. Type: string (or Expression with resultType string). */
  azureCloudType?: Record<string, unknown>;
  /** Data Lake Store account name. Type: string (or Expression with resultType string). */
  accountName?: Record<string, unknown>;
  /** Data Lake Store account subscription ID (if different from Data Factory account). Type: string (or Expression with resultType string). */
  subscriptionId?: Record<string, unknown>;
  /** Data Lake Store account resource group name (if different from Data Factory account). Type: string (or Expression with resultType string). */
  resourceGroupName?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AzureBlobFSLinkedService = AzureBlobFSLinkedServiceBase &
  LinkedService;

export interface AzureBlobFSLinkedServiceBase {
  /** Azure Data Lake Storage Gen2 linked service properties. */
  typeProperties: AzureBlobFSLinkedServiceTypeProperties;
}

export interface AzureBlobFSLinkedServiceTypeProperties {
  /** Endpoint for the Azure Data Lake Storage Gen2 service. Type: string (or Expression with resultType string). */
  url: Record<string, unknown>;
  /** Account key for the Azure Data Lake Storage Gen2 service. Type: string (or Expression with resultType string). */
  accountKey?: Record<string, unknown>;
  /** The ID of the application used to authenticate against the Azure Data Lake Storage Gen2 account. Type: string (or Expression with resultType string). */
  servicePrincipalId?: Record<string, unknown>;
  /** The Key of the application used to authenticate against the Azure Data Lake Storage Gen2 account. */
  servicePrincipalKey?: SecretBase;
  /** The name or ID of the tenant to which the service principal belongs. Type: string (or Expression with resultType string). */
  tenant?: Record<string, unknown>;
  /** Indicates the azure cloud type of the service principle auth. Allowed values are AzurePublic, AzureChina, AzureUsGovernment, AzureGermany. Default value is the data factory regions’ cloud type. Type: string (or Expression with resultType string). */
  azureCloudType?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type Office365LinkedService = Office365LinkedServiceBase & LinkedService;

export interface Office365LinkedServiceBase {
  /** Office365 linked service properties. */
  typeProperties: Office365LinkedServiceTypeProperties;
}

export interface Office365LinkedServiceTypeProperties {
  /** Azure tenant ID to which the Office 365 account belongs. Type: string (or Expression with resultType string). */
  office365TenantId: Record<string, unknown>;
  /** Specify the tenant information under which your Azure AD web application resides. Type: string (or Expression with resultType string). */
  servicePrincipalTenantId: Record<string, unknown>;
  /** Specify the application's client ID. Type: string (or Expression with resultType string). */
  servicePrincipalId: Record<string, unknown>;
  /** Specify the application's key. */
  servicePrincipalKey: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type SalesforceLinkedService = SalesforceLinkedServiceBase &
  LinkedService;

export interface SalesforceLinkedServiceBase {
  /** Salesforce linked service properties. */
  typeProperties: SalesforceLinkedServiceTypeProperties;
}

export interface SalesforceLinkedServiceTypeProperties {
  /** The URL of Salesforce instance. Default is 'https://login.salesforce.com'. To copy data from sandbox, specify 'https://test.salesforce.com'. To copy data from custom domain, specify, for example, 'https://[domain].my.salesforce.com'. Type: string (or Expression with resultType string). */
  environmentUrl?: Record<string, unknown>;
  /** The username for Basic authentication of the Salesforce instance. Type: string (or Expression with resultType string). */
  username?: Record<string, unknown>;
  /** The password for Basic authentication of the Salesforce instance. */
  password?: SecretBase;
  /** The security token is optional to remotely access Salesforce instance. */
  securityToken?: SecretBase;
  /** The Salesforce API version used in ADF. Type: string (or Expression with resultType string). */
  apiVersion?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type SalesforceServiceCloudLinkedService = SalesforceServiceCloudLinkedServiceBase &
  LinkedService;

export interface SalesforceServiceCloudLinkedServiceBase {
  /** Salesforce Service Cloud linked service properties. */
  typeProperties: SalesforceServiceCloudLinkedServiceTypeProperties;
}

export interface SalesforceServiceCloudLinkedServiceTypeProperties {
  /** The URL of Salesforce Service Cloud instance. Default is 'https://login.salesforce.com'. To copy data from sandbox, specify 'https://test.salesforce.com'. To copy data from custom domain, specify, for example, 'https://[domain].my.salesforce.com'. Type: string (or Expression with resultType string). */
  environmentUrl?: Record<string, unknown>;
  /** The username for Basic authentication of the Salesforce instance. Type: string (or Expression with resultType string). */
  username?: Record<string, unknown>;
  /** The password for Basic authentication of the Salesforce instance. */
  password?: SecretBase;
  /** The security token is optional to remotely access Salesforce instance. */
  securityToken?: SecretBase;
  /** The Salesforce API version used in ADF. Type: string (or Expression with resultType string). */
  apiVersion?: Record<string, unknown>;
  /** Extended properties appended to the connection string. Type: string (or Expression with resultType string). */
  extendedProperties?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type SapCloudForCustomerLinkedService = SapCloudForCustomerLinkedServiceBase &
  LinkedService;

export interface SapCloudForCustomerLinkedServiceBase {
  /** SAP Cloud for Customer linked service properties. */
  typeProperties: SapCloudForCustomerLinkedServiceTypeProperties;
}

export interface SapCloudForCustomerLinkedServiceTypeProperties {
  /** The URL of SAP Cloud for Customer OData API. For example, '[https://[tenantname].crm.ondemand.com/sap/c4c/odata/v1]'. Type: string (or Expression with resultType string). */
  url: Record<string, unknown>;
  /** The username for Basic authentication. Type: string (or Expression with resultType string). */
  username?: Record<string, unknown>;
  /** The password for Basic authentication. */
  password?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Either encryptedCredential or username/password must be provided. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type SapEccLinkedService = SapEccLinkedServiceBase & LinkedService;

export interface SapEccLinkedServiceBase {
  /** SAP ECC linked service properties. */
  typeProperties: SapEccLinkedServiceTypeProperties;
}

export interface SapEccLinkedServiceTypeProperties {
  /** The URL of SAP ECC OData API. For example, '[https://hostname:port/sap/opu/odata/sap/servicename/]'. Type: string (or Expression with resultType string). */
  url: string;
  /** The username for Basic authentication. Type: string (or Expression with resultType string). */
  username?: string;
  /** The password for Basic authentication. */
  password?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Either encryptedCredential or username/password must be provided. Type: string (or Expression with resultType string). */
  encryptedCredential?: string;
}

export type SapOpenHubLinkedService = SapOpenHubLinkedServiceBase &
  LinkedService;

export interface SapOpenHubLinkedServiceBase {
  /** Properties specific to SAP Business Warehouse Open Hub Destination linked service type. */
  typeProperties: SapOpenHubLinkedServiceTypeProperties;
}

export interface SapOpenHubLinkedServiceTypeProperties {
  /** Host name of the SAP BW instance where the open hub destination is located. Type: string (or Expression with resultType string). */
  server: Record<string, unknown>;
  /** System number of the BW system where the open hub destination is located. (Usually a two-digit decimal number represented as a string.) Type: string (or Expression with resultType string). */
  systemNumber: Record<string, unknown>;
  /** Client ID of the client on the BW system where the open hub destination is located. (Usually a three-digit decimal number represented as a string) Type: string (or Expression with resultType string). */
  clientId: Record<string, unknown>;
  /** Language of the BW system where the open hub destination is located. The default value is EN. Type: string (or Expression with resultType string). */
  language?: Record<string, unknown>;
  /** SystemID of the SAP system where the table is located. Type: string (or Expression with resultType string). */
  systemId?: Record<string, unknown>;
  /** Username to access the SAP BW server where the open hub destination is located. Type: string (or Expression with resultType string). */
  userName?: Record<string, unknown>;
  /** Password to access the SAP BW server where the open hub destination is located. */
  password?: SecretBase;
  /** The hostname of the SAP Message Server. Type: string (or Expression with resultType string). */
  messageServer?: Record<string, unknown>;
  /** The service name or port number of the Message Server. Type: string (or Expression with resultType string). */
  messageServerService?: Record<string, unknown>;
  /** The Logon Group for the SAP System. Type: string (or Expression with resultType string). */
  logonGroup?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type RestServiceLinkedService = RestServiceLinkedServiceBase &
  LinkedService;

export interface RestServiceLinkedServiceBase {
  /** Rest Service linked service properties. */
  typeProperties: RestServiceLinkedServiceTypeProperties;
}

export interface RestServiceLinkedServiceTypeProperties {
  /** The base URL of the REST service. */
  url: Record<string, unknown>;
  /** Whether to validate server side SSL certificate when connecting to the endpoint.The default value is true. Type: boolean (or Expression with resultType boolean). */
  enableServerCertificateValidation?: Record<string, unknown>;
  /** Type of authentication used to connect to the REST service. */
  authenticationType:
    | "Anonymous"
    | "Basic"
    | "AadServicePrincipal"
    | "ManagedServiceIdentity";
  /** The user name used in Basic authentication type. */
  userName?: Record<string, unknown>;
  /** The password used in Basic authentication type. */
  password?: SecretBase;
  /** The application's client ID used in AadServicePrincipal authentication type. */
  servicePrincipalId?: Record<string, unknown>;
  /** The application's key used in AadServicePrincipal authentication type. */
  servicePrincipalKey?: SecretBase;
  /** The tenant information (domain name or tenant ID) used in AadServicePrincipal authentication type under which your application resides. */
  tenant?: Record<string, unknown>;
  /** Indicates the azure cloud type of the service principle auth. Allowed values are AzurePublic, AzureChina, AzureUsGovernment, AzureGermany. Default value is the data factory regions’ cloud type. Type: string (or Expression with resultType string). */
  azureCloudType?: Record<string, unknown>;
  /** The resource you are requesting authorization to use. */
  aadResourceId?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AmazonS3LinkedService = AmazonS3LinkedServiceBase & LinkedService;

export interface AmazonS3LinkedServiceBase {
  /** Amazon S3 linked service properties. */
  typeProperties: AmazonS3LinkedServiceTypeProperties;
}

export interface AmazonS3LinkedServiceTypeProperties {
  /** The authentication type of S3. Allowed value: AccessKey (default) or TemporarySecurityCredentials. Type: string (or Expression with resultType string). */
  authenticationType?: Record<string, unknown>;
  /** The access key identifier of the Amazon S3 Identity and Access Management (IAM) user. Type: string (or Expression with resultType string). */
  accessKeyId?: Record<string, unknown>;
  /** The secret access key of the Amazon S3 Identity and Access Management (IAM) user. */
  secretAccessKey?: SecretBase;
  /** This value specifies the endpoint to access with the S3 Connector. This is an optional property; change it only if you want to try a different service endpoint or want to switch between https and http. Type: string (or Expression with resultType string). */
  serviceUrl?: Record<string, unknown>;
  /** The session token for the S3 temporary security credential. */
  sessionToken?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AmazonRedshiftLinkedService = AmazonRedshiftLinkedServiceBase &
  LinkedService;

export interface AmazonRedshiftLinkedServiceBase {
  /** Amazon Redshift linked service properties. */
  typeProperties: AmazonRedshiftLinkedServiceTypeProperties;
}

export interface AmazonRedshiftLinkedServiceTypeProperties {
  /** The name of the Amazon Redshift server. Type: string (or Expression with resultType string). */
  server: Record<string, unknown>;
  /** The username of the Amazon Redshift source. Type: string (or Expression with resultType string). */
  username?: Record<string, unknown>;
  /** The password of the Amazon Redshift source. */
  password?: SecretBase;
  /** The database name of the Amazon Redshift source. Type: string (or Expression with resultType string). */
  database: Record<string, unknown>;
  /** The TCP port number that the Amazon Redshift server uses to listen for client connections. The default value is 5439. Type: integer (or Expression with resultType integer). */
  port?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type CustomDataSourceLinkedService = CustomDataSourceLinkedServiceBase &
  LinkedService;

export interface CustomDataSourceLinkedServiceBase {
  /** Custom linked service properties. */
  typeProperties: Record<string, unknown>;
}

export type AzureSearchLinkedService = AzureSearchLinkedServiceBase &
  LinkedService;

export interface AzureSearchLinkedServiceBase {
  /** Windows Azure Search Service linked service properties. */
  typeProperties: AzureSearchLinkedServiceTypeProperties;
}

export interface AzureSearchLinkedServiceTypeProperties {
  /** URL for Azure Search service. Type: string (or Expression with resultType string). */
  url: Record<string, unknown>;
  /** Admin Key for Azure Search service */
  key?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type HttpLinkedService = HttpLinkedServiceBase & LinkedService;

export interface HttpLinkedServiceBase {
  /** Properties specific to this linked service type. */
  typeProperties: HttpLinkedServiceTypeProperties;
}

export interface HttpLinkedServiceTypeProperties {
  /** The base URL of the HTTP endpoint, e.g. http://www.microsoft.com. Type: string (or Expression with resultType string). */
  url: Record<string, unknown>;
  /** The authentication type to be used to connect to the HTTP server. */
  authenticationType?:
    | "Basic"
    | "Anonymous"
    | "Digest"
    | "Windows"
    | "ClientCertificate";
  /** User name for Basic, Digest, or Windows authentication. Type: string (or Expression with resultType string). */
  userName?: Record<string, unknown>;
  /** Password for Basic, Digest, Windows, or ClientCertificate with EmbeddedCertData authentication. */
  password?: SecretBase;
  /** Base64 encoded certificate data for ClientCertificate authentication. For on-premises copy with ClientCertificate authentication, either CertThumbprint or EmbeddedCertData/Password should be specified. Type: string (or Expression with resultType string). */
  embeddedCertData?: Record<string, unknown>;
  /** Thumbprint of certificate for ClientCertificate authentication. Only valid for on-premises copy. For on-premises copy with ClientCertificate authentication, either CertThumbprint or EmbeddedCertData/Password should be specified. Type: string (or Expression with resultType string). */
  certThumbprint?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
  /** If true, validate the HTTPS server SSL certificate. Default value is true. Type: boolean (or Expression with resultType boolean). */
  enableServerCertificateValidation?: Record<string, unknown>;
}

export type FtpServerLinkedService = FtpServerLinkedServiceBase & LinkedService;

export interface FtpServerLinkedServiceBase {
  /** Properties specific to this linked service type. */
  typeProperties: FtpServerLinkedServiceTypeProperties;
}

export interface FtpServerLinkedServiceTypeProperties {
  /** Host name of the FTP server. Type: string (or Expression with resultType string). */
  host: Record<string, unknown>;
  /** The TCP port number that the FTP server uses to listen for client connections. Default value is 21. Type: integer (or Expression with resultType integer), minimum: 0. */
  port?: Record<string, unknown>;
  /** The authentication type to be used to connect to the FTP server. */
  authenticationType?: "Basic" | "Anonymous";
  /** Username to logon the FTP server. Type: string (or Expression with resultType string). */
  userName?: Record<string, unknown>;
  /** Password to logon the FTP server. */
  password?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
  /** If true, connect to the FTP server over SSL/TLS channel. Default value is true. Type: boolean (or Expression with resultType boolean). */
  enableSsl?: Record<string, unknown>;
  /** If true, validate the FTP server SSL certificate when connect over SSL/TLS channel. Default value is true. Type: boolean (or Expression with resultType boolean). */
  enableServerCertificateValidation?: Record<string, unknown>;
}

export type SftpServerLinkedService = SftpServerLinkedServiceBase &
  LinkedService;

export interface SftpServerLinkedServiceBase {
  /** Properties specific to this linked service type. */
  typeProperties: SftpServerLinkedServiceTypeProperties;
}

export interface SftpServerLinkedServiceTypeProperties {
  /** The SFTP server host name. Type: string (or Expression with resultType string). */
  host: Record<string, unknown>;
  /** The TCP port number that the SFTP server uses to listen for client connections. Default value is 22. Type: integer (or Expression with resultType integer), minimum: 0. */
  port?: Record<string, unknown>;
  /** The authentication type to be used to connect to the FTP server. */
  authenticationType?: "Basic" | "SshPublicKey";
  /** The username used to log on to the SFTP server. Type: string (or Expression with resultType string). */
  userName?: Record<string, unknown>;
  /** Password to logon the SFTP server for Basic authentication. */
  password?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
  /** The SSH private key file path for SshPublicKey authentication. Only valid for on-premises copy. For on-premises copy with SshPublicKey authentication, either PrivateKeyPath or PrivateKeyContent should be specified. SSH private key should be OpenSSH format. Type: string (or Expression with resultType string). */
  privateKeyPath?: Record<string, unknown>;
  /** Base64 encoded SSH private key content for SshPublicKey authentication. For on-premises copy with SshPublicKey authentication, either PrivateKeyPath or PrivateKeyContent should be specified. SSH private key should be OpenSSH format. */
  privateKeyContent?: SecretBase;
  /** The password to decrypt the SSH private key if the SSH private key is encrypted. */
  passPhrase?: SecretBase;
  /** If true, skip the SSH host key validation. Default value is false. Type: boolean (or Expression with resultType boolean). */
  skipHostKeyValidation?: Record<string, unknown>;
  /** The host key finger-print of the SFTP server. When SkipHostKeyValidation is false, HostKeyFingerprint should be specified. Type: string (or Expression with resultType string). */
  hostKeyFingerprint?: Record<string, unknown>;
}

export type SapBWLinkedService = SapBWLinkedServiceBase & LinkedService;

export interface SapBWLinkedServiceBase {
  /** Properties specific to this linked service type. */
  typeProperties: SapBWLinkedServiceTypeProperties;
}

export interface SapBWLinkedServiceTypeProperties {
  /** Host name of the SAP BW instance. Type: string (or Expression with resultType string). */
  server: Record<string, unknown>;
  /** System number of the BW system. (Usually a two-digit decimal number represented as a string.) Type: string (or Expression with resultType string). */
  systemNumber: Record<string, unknown>;
  /** Client ID of the client on the BW system. (Usually a three-digit decimal number represented as a string) Type: string (or Expression with resultType string). */
  clientId: Record<string, unknown>;
  /** Username to access the SAP BW server. Type: string (or Expression with resultType string). */
  userName?: Record<string, unknown>;
  /** Password to access the SAP BW server. */
  password?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type SapHanaLinkedService = SapHanaLinkedServiceBase & LinkedService;

export interface SapHanaLinkedServiceBase {
  /** Properties specific to this linked service type. */
  typeProperties: SapHanaLinkedServiceProperties;
}

export interface SapHanaLinkedServiceProperties {
  /** SAP HANA ODBC connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** Host name of the SAP HANA server. Type: string (or Expression with resultType string). */
  server: Record<string, unknown>;
  /** The authentication type to be used to connect to the SAP HANA server. */
  authenticationType?: "Basic" | "Windows";
  /** Username to access the SAP HANA server. Type: string (or Expression with resultType string). */
  userName?: Record<string, unknown>;
  /** Password to access the SAP HANA server. */
  password?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AmazonMWSLinkedService = AmazonMWSLinkedServiceBase & LinkedService;

export interface AmazonMWSLinkedServiceBase {
  /** Amazon Marketplace Web Service linked service properties. */
  typeProperties: AmazonMWSLinkedServiceTypeProperties;
}

export interface AmazonMWSLinkedServiceTypeProperties {
  /** The endpoint of the Amazon MWS server, (i.e. mws.amazonservices.com) */
  endpoint: Record<string, unknown>;
  /** The Amazon Marketplace ID you want to retrieve data from. To retrieve data from multiple Marketplace IDs, separate them with a comma (,). (i.e. A2EUQ1WTGCTBG2) */
  marketplaceID: Record<string, unknown>;
  /** The Amazon seller ID. */
  sellerID: Record<string, unknown>;
  /** The Amazon MWS authentication token. */
  mwsAuthToken?: SecretBase;
  /** The access key id used to access data. */
  accessKeyId: Record<string, unknown>;
  /** The secret key used to access data. */
  secretKey?: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AzurePostgreSqlLinkedService = AzurePostgreSqlLinkedServiceBase &
  LinkedService;

export interface AzurePostgreSqlLinkedServiceBase {
  /** Azure PostgreSQL linked service properties. */
  typeProperties: AzurePostgreSqlLinkedServiceTypeProperties;
}

export interface AzurePostgreSqlLinkedServiceTypeProperties {
  /** An ODBC connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  password?: AzureKeyVaultSecretReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type ConcurLinkedService = ConcurLinkedServiceBase & LinkedService;

export interface ConcurLinkedServiceBase {
  /** Concur Service linked service properties. */
  typeProperties: ConcurLinkedServiceTypeProperties;
}

export interface ConcurLinkedServiceTypeProperties {
  /** Properties used to connect to Concur. It is mutually exclusive with any other properties in the linked service. Type: object. */
  connectionProperties?: Record<string, unknown>;
  /** Application client_id supplied by Concur App Management. */
  clientId: Record<string, unknown>;
  /** The user name that you use to access Concur Service. */
  username: Record<string, unknown>;
  /** The password corresponding to the user name that you provided in the username field. */
  password?: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type CouchbaseLinkedService = CouchbaseLinkedServiceBase & LinkedService;

export interface CouchbaseLinkedServiceBase {
  /** Couchbase server linked service properties. */
  typeProperties: CouchbaseLinkedServiceTypeProperties;
}

export interface CouchbaseLinkedServiceTypeProperties {
  /** An ODBC connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** The Azure key vault secret reference of credString in connection string. */
  credString?: AzureKeyVaultSecretReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type DrillLinkedService = DrillLinkedServiceBase & LinkedService;

export interface DrillLinkedServiceBase {
  /** Drill server linked service properties. */
  typeProperties: DrillLinkedServiceTypeProperties;
}

export interface DrillLinkedServiceTypeProperties {
  /** An ODBC connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  pwd?: AzureKeyVaultSecretReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type EloquaLinkedService = EloquaLinkedServiceBase & LinkedService;

export interface EloquaLinkedServiceBase {
  /** Eloqua server linked service properties. */
  typeProperties: EloquaLinkedServiceTypeProperties;
}

export interface EloquaLinkedServiceTypeProperties {
  /** The endpoint of the Eloqua server. (i.e. eloqua.example.com) */
  endpoint: Record<string, unknown>;
  /** The site name and user name of your Eloqua account in the form: sitename/username. (i.e. Eloqua/Alice) */
  username: Record<string, unknown>;
  /** The password corresponding to the user name. */
  password?: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type GoogleBigQueryLinkedService = GoogleBigQueryLinkedServiceBase &
  LinkedService;

export interface GoogleBigQueryLinkedServiceBase {
  /** Google BigQuery service linked service properties. */
  typeProperties: GoogleBigQueryLinkedServiceTypeProperties;
}

export interface GoogleBigQueryLinkedServiceTypeProperties {
  /** The default BigQuery project to query against. */
  project: Record<string, unknown>;
  /** A comma-separated list of public BigQuery projects to access. */
  additionalProjects?: Record<string, unknown>;
  /** Whether to request access to Google Drive. Allowing Google Drive access enables support for federated tables that combine BigQuery data with data from Google Drive. The default value is false. */
  requestGoogleDriveScope?: Record<string, unknown>;
  /** The OAuth 2.0 authentication mechanism used for authentication. ServiceAuthentication can only be used on self-hosted IR. */
  authenticationType: "ServiceAuthentication" | "UserAuthentication";
  /** The refresh token obtained from Google for authorizing access to BigQuery for UserAuthentication. */
  refreshToken?: SecretBase;
  /** The client id of the google application used to acquire the refresh token. Type: string (or Expression with resultType string). */
  clientId?: Record<string, unknown>;
  /** The client secret of the google application used to acquire the refresh token. */
  clientSecret?: SecretBase;
  /** The service account email ID that is used for ServiceAuthentication and can only be used on self-hosted IR. */
  email?: Record<string, unknown>;
  /** The full path to the .p12 key file that is used to authenticate the service account email address and can only be used on self-hosted IR. */
  keyFilePath?: Record<string, unknown>;
  /** The full path of the .pem file containing trusted CA certificates for verifying the server when connecting over SSL. This property can only be set when using SSL on self-hosted IR. The default value is the cacerts.pem file installed with the IR. */
  trustedCertPath?: Record<string, unknown>;
  /** Specifies whether to use a CA certificate from the system trust store or from a specified PEM file. The default value is false. */
  useSystemTrustStore?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type GreenplumLinkedService = GreenplumLinkedServiceBase & LinkedService;

export interface GreenplumLinkedServiceBase {
  /** Greenplum Database linked service properties. */
  typeProperties: GreenplumLinkedServiceTypeProperties;
}

export interface GreenplumLinkedServiceTypeProperties {
  /** An ODBC connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  pwd?: AzureKeyVaultSecretReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type HBaseLinkedService = HBaseLinkedServiceBase & LinkedService;

export interface HBaseLinkedServiceBase {
  /** HBase server linked service properties. */
  typeProperties: HBaseLinkedServiceTypeProperties;
}

export interface HBaseLinkedServiceTypeProperties {
  /** The IP address or host name of the HBase server. (i.e. 192.168.222.160) */
  host: Record<string, unknown>;
  /** The TCP port that the HBase instance uses to listen for client connections. The default value is 9090. */
  port?: Record<string, unknown>;
  /** The partial URL corresponding to the HBase server. (i.e. /gateway/sandbox/hbase/version) */
  httpPath?: Record<string, unknown>;
  /** The authentication mechanism to use to connect to the HBase server. */
  authenticationType: "Anonymous" | "Basic";
  /** The user name used to connect to the HBase instance. */
  username?: Record<string, unknown>;
  /** The password corresponding to the user name. */
  password?: SecretBase;
  /** Specifies whether the connections to the server are encrypted using SSL. The default value is false. */
  enableSsl?: Record<string, unknown>;
  /** The full path of the .pem file containing trusted CA certificates for verifying the server when connecting over SSL. This property can only be set when using SSL on self-hosted IR. The default value is the cacerts.pem file installed with the IR. */
  trustedCertPath?: Record<string, unknown>;
  /** Specifies whether to require a CA-issued SSL certificate name to match the host name of the server when connecting over SSL. The default value is false. */
  allowHostNameCNMismatch?: Record<string, unknown>;
  /** Specifies whether to allow self-signed certificates from the server. The default value is false. */
  allowSelfSignedServerCert?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type HiveLinkedService = HiveLinkedServiceBase & LinkedService;

export interface HiveLinkedServiceBase {
  /** Hive Server linked service properties. */
  typeProperties: HiveLinkedServiceTypeProperties;
}

export interface HiveLinkedServiceTypeProperties {
  /** IP address or host name of the Hive server, separated by ';' for multiple hosts (only when serviceDiscoveryMode is enable). */
  host: Record<string, unknown>;
  /** The TCP port that the Hive server uses to listen for client connections. */
  port?: Record<string, unknown>;
  /** The type of Hive server. */
  serverType?: "HiveServer1" | "HiveServer2" | "HiveThriftServer";
  /** The transport protocol to use in the Thrift layer. */
  thriftTransportProtocol?: "Binary" | "SASL" | "HTTP ";
  /** The authentication method used to access the Hive server. */
  authenticationType:
    | "Anonymous"
    | "Username"
    | "UsernameAndPassword"
    | "WindowsAzureHDInsightService";
  /** true to indicate using the ZooKeeper service, false not. */
  serviceDiscoveryMode?: Record<string, unknown>;
  /** The namespace on ZooKeeper under which Hive Server 2 nodes are added. */
  zooKeeperNameSpace?: Record<string, unknown>;
  /** Specifies whether the driver uses native HiveQL queries,or converts them into an equivalent form in HiveQL. */
  useNativeQuery?: Record<string, unknown>;
  /** The user name that you use to access Hive Server. */
  username?: Record<string, unknown>;
  /** The password corresponding to the user name that you provided in the Username field */
  password?: SecretBase;
  /** The partial URL corresponding to the Hive server. */
  httpPath?: Record<string, unknown>;
  /** Specifies whether the connections to the server are encrypted using SSL. The default value is false. */
  enableSsl?: Record<string, unknown>;
  /** The full path of the .pem file containing trusted CA certificates for verifying the server when connecting over SSL. This property can only be set when using SSL on self-hosted IR. The default value is the cacerts.pem file installed with the IR. */
  trustedCertPath?: Record<string, unknown>;
  /** Specifies whether to use a CA certificate from the system trust store or from a specified PEM file. The default value is false. */
  useSystemTrustStore?: Record<string, unknown>;
  /** Specifies whether to require a CA-issued SSL certificate name to match the host name of the server when connecting over SSL. The default value is false. */
  allowHostNameCNMismatch?: Record<string, unknown>;
  /** Specifies whether to allow self-signed certificates from the server. The default value is false. */
  allowSelfSignedServerCert?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type HubspotLinkedService = HubspotLinkedServiceBase & LinkedService;

export interface HubspotLinkedServiceBase {
  /** Hubspot Service linked service properties. */
  typeProperties: HubspotLinkedServiceTypeProperties;
}

export interface HubspotLinkedServiceTypeProperties {
  /** The client ID associated with your Hubspot application. */
  clientId: Record<string, unknown>;
  /** The client secret associated with your Hubspot application. */
  clientSecret?: SecretBase;
  /** The access token obtained when initially authenticating your OAuth integration. */
  accessToken?: SecretBase;
  /** The refresh token obtained when initially authenticating your OAuth integration. */
  refreshToken?: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type ImpalaLinkedService = ImpalaLinkedServiceBase & LinkedService;

export interface ImpalaLinkedServiceBase {
  /** Impala server linked service properties. */
  typeProperties: ImpalaLinkedServiceTypeProperties;
}

export interface ImpalaLinkedServiceTypeProperties {
  /** The IP address or host name of the Impala server. (i.e. 192.168.222.160) */
  host: Record<string, unknown>;
  /** The TCP port that the Impala server uses to listen for client connections. The default value is 21050. */
  port?: Record<string, unknown>;
  /** The authentication type to use. */
  authenticationType: "Anonymous" | "SASLUsername" | "UsernameAndPassword";
  /** The user name used to access the Impala server. The default value is anonymous when using SASLUsername. */
  username?: Record<string, unknown>;
  /** The password corresponding to the user name when using UsernameAndPassword. */
  password?: SecretBase;
  /** Specifies whether the connections to the server are encrypted using SSL. The default value is false. */
  enableSsl?: Record<string, unknown>;
  /** The full path of the .pem file containing trusted CA certificates for verifying the server when connecting over SSL. This property can only be set when using SSL on self-hosted IR. The default value is the cacerts.pem file installed with the IR. */
  trustedCertPath?: Record<string, unknown>;
  /** Specifies whether to use a CA certificate from the system trust store or from a specified PEM file. The default value is false. */
  useSystemTrustStore?: Record<string, unknown>;
  /** Specifies whether to require a CA-issued SSL certificate name to match the host name of the server when connecting over SSL. The default value is false. */
  allowHostNameCNMismatch?: Record<string, unknown>;
  /** Specifies whether to allow self-signed certificates from the server. The default value is false. */
  allowSelfSignedServerCert?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type JiraLinkedService = JiraLinkedServiceBase & LinkedService;

export interface JiraLinkedServiceBase {
  /** Jira Service linked service properties. */
  typeProperties: JiraLinkedServiceTypeProperties;
}

export interface JiraLinkedServiceTypeProperties {
  /** The IP address or host name of the Jira service. (e.g. jira.example.com) */
  host: Record<string, unknown>;
  /** The TCP port that the Jira server uses to listen for client connections. The default value is 443 if connecting through HTTPS, or 8080 if connecting through HTTP. */
  port?: Record<string, unknown>;
  /** The user name that you use to access Jira Service. */
  username: Record<string, unknown>;
  /** The password corresponding to the user name that you provided in the username field. */
  password?: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type MagentoLinkedService = MagentoLinkedServiceBase & LinkedService;

export interface MagentoLinkedServiceBase {
  /** Magento server linked service properties. */
  typeProperties: MagentoLinkedServiceTypeProperties;
}

export interface MagentoLinkedServiceTypeProperties {
  /** The URL of the Magento instance. (i.e. 192.168.222.110/magento3) */
  host: Record<string, unknown>;
  /** The access token from Magento. */
  accessToken?: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type MariaDBLinkedService = MariaDBLinkedServiceBase & LinkedService;

export interface MariaDBLinkedServiceBase {
  /** MariaDB server linked service properties. */
  typeProperties: MariaDBLinkedServiceTypeProperties;
}

export interface MariaDBLinkedServiceTypeProperties {
  /** An ODBC connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  pwd?: AzureKeyVaultSecretReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AzureMariaDBLinkedService = AzureMariaDBLinkedServiceBase &
  LinkedService;

export interface AzureMariaDBLinkedServiceBase {
  /** Azure Database for MariaDB linked service properties. */
  typeProperties: AzureMariaDBLinkedServiceTypeProperties;
}

export interface AzureMariaDBLinkedServiceTypeProperties {
  /** An ODBC connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  pwd?: AzureKeyVaultSecretReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type MarketoLinkedService = MarketoLinkedServiceBase & LinkedService;

export interface MarketoLinkedServiceBase {
  /** Marketo server linked service properties. */
  typeProperties: MarketoLinkedServiceTypeProperties;
}

export interface MarketoLinkedServiceTypeProperties {
  /** The endpoint of the Marketo server. (i.e. 123-ABC-321.mktorest.com) */
  endpoint: Record<string, unknown>;
  /** The client Id of your Marketo service. */
  clientId: Record<string, unknown>;
  /** The client secret of your Marketo service. */
  clientSecret?: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type PaypalLinkedService = PaypalLinkedServiceBase & LinkedService;

export interface PaypalLinkedServiceBase {
  /** Paypal Service linked service properties. */
  typeProperties: PaypalLinkedServiceTypeProperties;
}

export interface PaypalLinkedServiceTypeProperties {
  /** The URL of the PayPal instance. (i.e. api.sandbox.paypal.com) */
  host: Record<string, unknown>;
  /** The client ID associated with your PayPal application. */
  clientId: Record<string, unknown>;
  /** The client secret associated with your PayPal application. */
  clientSecret?: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type PhoenixLinkedService = PhoenixLinkedServiceBase & LinkedService;

export interface PhoenixLinkedServiceBase {
  /** Phoenix server linked service properties. */
  typeProperties: PhoenixLinkedServiceTypeProperties;
}

export interface PhoenixLinkedServiceTypeProperties {
  /** The IP address or host name of the Phoenix server. (i.e. 192.168.222.160) */
  host: Record<string, unknown>;
  /** The TCP port that the Phoenix server uses to listen for client connections. The default value is 8765. */
  port?: Record<string, unknown>;
  /** The partial URL corresponding to the Phoenix server. (i.e. /gateway/sandbox/phoenix/version). The default value is hbasephoenix if using WindowsAzureHDInsightService. */
  httpPath?: Record<string, unknown>;
  /** The authentication mechanism used to connect to the Phoenix server. */
  authenticationType:
    | "Anonymous"
    | "UsernameAndPassword"
    | "WindowsAzureHDInsightService";
  /** The user name used to connect to the Phoenix server. */
  username?: Record<string, unknown>;
  /** The password corresponding to the user name. */
  password?: SecretBase;
  /** Specifies whether the connections to the server are encrypted using SSL. The default value is false. */
  enableSsl?: Record<string, unknown>;
  /** The full path of the .pem file containing trusted CA certificates for verifying the server when connecting over SSL. This property can only be set when using SSL on self-hosted IR. The default value is the cacerts.pem file installed with the IR. */
  trustedCertPath?: Record<string, unknown>;
  /** Specifies whether to use a CA certificate from the system trust store or from a specified PEM file. The default value is false. */
  useSystemTrustStore?: Record<string, unknown>;
  /** Specifies whether to require a CA-issued SSL certificate name to match the host name of the server when connecting over SSL. The default value is false. */
  allowHostNameCNMismatch?: Record<string, unknown>;
  /** Specifies whether to allow self-signed certificates from the server. The default value is false. */
  allowSelfSignedServerCert?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type PrestoLinkedService = PrestoLinkedServiceBase & LinkedService;

export interface PrestoLinkedServiceBase {
  /** Presto server linked service properties. */
  typeProperties: PrestoLinkedServiceTypeProperties;
}

export interface PrestoLinkedServiceTypeProperties {
  /** The IP address or host name of the Presto server. (i.e. 192.168.222.160) */
  host: Record<string, unknown>;
  /** The version of the Presto server. (i.e. 0.148-t) */
  serverVersion: Record<string, unknown>;
  /** The catalog context for all request against the server. */
  catalog: Record<string, unknown>;
  /** The TCP port that the Presto server uses to listen for client connections. The default value is 8080. */
  port?: Record<string, unknown>;
  /** The authentication mechanism used to connect to the Presto server. */
  authenticationType: "Anonymous" | "LDAP";
  /** The user name used to connect to the Presto server. */
  username?: Record<string, unknown>;
  /** The password corresponding to the user name. */
  password?: SecretBase;
  /** Specifies whether the connections to the server are encrypted using SSL. The default value is false. */
  enableSsl?: Record<string, unknown>;
  /** The full path of the .pem file containing trusted CA certificates for verifying the server when connecting over SSL. This property can only be set when using SSL on self-hosted IR. The default value is the cacerts.pem file installed with the IR. */
  trustedCertPath?: Record<string, unknown>;
  /** Specifies whether to use a CA certificate from the system trust store or from a specified PEM file. The default value is false. */
  useSystemTrustStore?: Record<string, unknown>;
  /** Specifies whether to require a CA-issued SSL certificate name to match the host name of the server when connecting over SSL. The default value is false. */
  allowHostNameCNMismatch?: Record<string, unknown>;
  /** Specifies whether to allow self-signed certificates from the server. The default value is false. */
  allowSelfSignedServerCert?: Record<string, unknown>;
  /** The local time zone used by the connection. Valid values for this option are specified in the IANA Time Zone Database. The default value is the system time zone. */
  timeZoneID?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type QuickBooksLinkedService = QuickBooksLinkedServiceBase &
  LinkedService;

export interface QuickBooksLinkedServiceBase {
  /** QuickBooks server linked service properties. */
  typeProperties: QuickBooksLinkedServiceTypeProperties;
}

export interface QuickBooksLinkedServiceTypeProperties {
  /** Properties used to connect to QuickBooks. It is mutually exclusive with any other properties in the linked service. Type: object. */
  connectionProperties?: Record<string, unknown>;
  /** The endpoint of the QuickBooks server. (i.e. quickbooks.api.intuit.com) */
  endpoint: Record<string, unknown>;
  /** The company ID of the QuickBooks company to authorize. */
  companyId: Record<string, unknown>;
  /** The consumer key for OAuth 1.0 authentication. */
  consumerKey: Record<string, unknown>;
  /** The consumer secret for OAuth 1.0 authentication. */
  consumerSecret: SecretBase;
  /** The access token for OAuth 1.0 authentication. */
  accessToken: SecretBase;
  /** The access token secret for OAuth 1.0 authentication. */
  accessTokenSecret: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type ServiceNowLinkedService = ServiceNowLinkedServiceBase &
  LinkedService;

export interface ServiceNowLinkedServiceBase {
  /** ServiceNow server linked service properties. */
  typeProperties: ServiceNowLinkedServiceTypeProperties;
}

export interface ServiceNowLinkedServiceTypeProperties {
  /** The endpoint of the ServiceNow server. (i.e. <instance>.service-now.com) */
  endpoint: Record<string, unknown>;
  /** The authentication type to use. */
  authenticationType: "Basic" | "OAuth2";
  /** The user name used to connect to the ServiceNow server for Basic and OAuth2 authentication. */
  username?: Record<string, unknown>;
  /** The password corresponding to the user name for Basic and OAuth2 authentication. */
  password?: SecretBase;
  /** The client id for OAuth2 authentication. */
  clientId?: Record<string, unknown>;
  /** The client secret for OAuth2 authentication. */
  clientSecret?: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type ShopifyLinkedService = ShopifyLinkedServiceBase & LinkedService;

export interface ShopifyLinkedServiceBase {
  /** Shopify Service linked service properties. */
  typeProperties: ShopifyLinkedServiceTypeProperties;
}

export interface ShopifyLinkedServiceTypeProperties {
  /** The endpoint of the Shopify server. (i.e. mystore.myshopify.com) */
  host: Record<string, unknown>;
  /** The API access token that can be used to access Shopify’s data. The token won't expire if it is offline mode. */
  accessToken?: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type SparkLinkedService = SparkLinkedServiceBase & LinkedService;

export interface SparkLinkedServiceBase {
  /** Spark Server linked service properties. */
  typeProperties: SparkLinkedServiceTypeProperties;
}

export interface SparkLinkedServiceTypeProperties {
  /** IP address or host name of the Spark server */
  host: Record<string, unknown>;
  /** The TCP port that the Spark server uses to listen for client connections. */
  port: Record<string, unknown>;
  /** The type of Spark server. */
  serverType?: "SharkServer" | "SharkServer2" | "SparkThriftServer";
  /** The transport protocol to use in the Thrift layer. */
  thriftTransportProtocol?: "Binary" | "SASL" | "HTTP ";
  /** The authentication method used to access the Spark server. */
  authenticationType:
    | "Anonymous"
    | "Username"
    | "UsernameAndPassword"
    | "WindowsAzureHDInsightService";
  /** The user name that you use to access Spark Server. */
  username?: Record<string, unknown>;
  /** The password corresponding to the user name that you provided in the Username field */
  password?: SecretBase;
  /** The partial URL corresponding to the Spark server. */
  httpPath?: Record<string, unknown>;
  /** Specifies whether the connections to the server are encrypted using SSL. The default value is false. */
  enableSsl?: Record<string, unknown>;
  /** The full path of the .pem file containing trusted CA certificates for verifying the server when connecting over SSL. This property can only be set when using SSL on self-hosted IR. The default value is the cacerts.pem file installed with the IR. */
  trustedCertPath?: Record<string, unknown>;
  /** Specifies whether to use a CA certificate from the system trust store or from a specified PEM file. The default value is false. */
  useSystemTrustStore?: Record<string, unknown>;
  /** Specifies whether to require a CA-issued SSL certificate name to match the host name of the server when connecting over SSL. The default value is false. */
  allowHostNameCNMismatch?: Record<string, unknown>;
  /** Specifies whether to allow self-signed certificates from the server. The default value is false. */
  allowSelfSignedServerCert?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type SquareLinkedService = SquareLinkedServiceBase & LinkedService;

export interface SquareLinkedServiceBase {
  /** Square Service linked service properties. */
  typeProperties: SquareLinkedServiceTypeProperties;
}

export interface SquareLinkedServiceTypeProperties {
  /** Properties used to connect to Square. It is mutually exclusive with any other properties in the linked service. Type: object. */
  connectionProperties?: Record<string, unknown>;
  /** The URL of the Square instance. (i.e. mystore.mysquare.com) */
  host: Record<string, unknown>;
  /** The client ID associated with your Square application. */
  clientId: Record<string, unknown>;
  /** The client secret associated with your Square application. */
  clientSecret?: SecretBase;
  /** The redirect URL assigned in the Square application dashboard. (i.e. http://localhost:2500) */
  redirectUri: Record<string, unknown>;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type XeroLinkedService = XeroLinkedServiceBase & LinkedService;

export interface XeroLinkedServiceBase {
  /** Xero Service linked service properties. */
  typeProperties: XeroLinkedServiceTypeProperties;
}

export interface XeroLinkedServiceTypeProperties {
  /** Properties used to connect to Xero. It is mutually exclusive with any other properties in the linked service. Type: object. */
  connectionProperties?: Record<string, unknown>;
  /** The endpoint of the Xero server. (i.e. api.xero.com) */
  host: Record<string, unknown>;
  /** The consumer key associated with the Xero application. */
  consumerKey?: SecretBase;
  /**
   * The private key from the .pem file that was generated for your Xero private application. You must include all the text from the .pem file, including the Unix line endings(
   * ).
   */
  privateKey?: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type ZohoLinkedService = ZohoLinkedServiceBase & LinkedService;

export interface ZohoLinkedServiceBase {
  /** Zoho server linked service properties. */
  typeProperties: ZohoLinkedServiceTypeProperties;
}

export interface ZohoLinkedServiceTypeProperties {
  /** Properties used to connect to Zoho. It is mutually exclusive with any other properties in the linked service. Type: object. */
  connectionProperties?: Record<string, unknown>;
  /** The endpoint of the Zoho server. (i.e. crm.zoho.com/crm/private) */
  endpoint: Record<string, unknown>;
  /** The access token for Zoho authentication. */
  accessToken?: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type VerticaLinkedService = VerticaLinkedServiceBase & LinkedService;

export interface VerticaLinkedServiceBase {
  /** Vertica linked service properties. */
  typeProperties: VerticaLinkedServiceTypeProperties;
}

export interface VerticaLinkedServiceTypeProperties {
  /** An ODBC connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  pwd?: AzureKeyVaultSecretReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type NetezzaLinkedService = NetezzaLinkedServiceBase & LinkedService;

export interface NetezzaLinkedServiceBase {
  /** Netezza linked service properties. */
  typeProperties: NetezzaLinkedServiceTypeProperties;
}

export interface NetezzaLinkedServiceTypeProperties {
  /** An ODBC connection string. Type: string, SecureString or AzureKeyVaultSecretReference. */
  connectionString?: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  pwd?: AzureKeyVaultSecretReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type SalesforceMarketingCloudLinkedService = SalesforceMarketingCloudLinkedServiceBase &
  LinkedService;

export interface SalesforceMarketingCloudLinkedServiceBase {
  /** Salesforce Marketing Cloud linked service properties. */
  typeProperties: SalesforceMarketingCloudLinkedServiceTypeProperties;
}

export interface SalesforceMarketingCloudLinkedServiceTypeProperties {
  /** Properties used to connect to Salesforce Marketing Cloud. It is mutually exclusive with any other properties in the linked service. Type: object. */
  connectionProperties?: Record<string, unknown>;
  /** The client ID associated with the Salesforce Marketing Cloud application. Type: string (or Expression with resultType string). */
  clientId: Record<string, unknown>;
  /** The client secret associated with the Salesforce Marketing Cloud application. Type: string (or Expression with resultType string). */
  clientSecret?: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. Type: boolean (or Expression with resultType boolean). */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. Type: boolean (or Expression with resultType boolean). */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. Type: boolean (or Expression with resultType boolean). */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type HDInsightOnDemandLinkedService = HDInsightOnDemandLinkedServiceBase &
  LinkedService;

export interface HDInsightOnDemandLinkedServiceBase {
  /** HDInsight ondemand linked service properties. */
  typeProperties: HDInsightOnDemandLinkedServiceTypeProperties;
}

export interface HDInsightOnDemandLinkedServiceTypeProperties {
  /** Number of worker/data nodes in the cluster. Suggestion value: 4. Type: string (or Expression with resultType string). */
  clusterSize: Record<string, unknown>;
  /** The allowed idle time for the on-demand HDInsight cluster. Specifies how long the on-demand HDInsight cluster stays alive after completion of an activity run if there are no other active jobs in the cluster. The minimum value is 5 mins. Type: string (or Expression with resultType string). */
  timeToLive: Record<string, unknown>;
  /** Version of the HDInsight cluster.  Type: string (or Expression with resultType string). */
  version: Record<string, unknown>;
  /** Azure Storage linked service to be used by the on-demand cluster for storing and processing data. */
  linkedServiceName: LinkedServiceReference;
  /** The customer’s subscription to host the cluster. Type: string (or Expression with resultType string). */
  hostSubscriptionId: Record<string, unknown>;
  /** The service principal id for the hostSubscriptionId. Type: string (or Expression with resultType string). */
  servicePrincipalId?: Record<string, unknown>;
  /** The key for the service principal id. */
  servicePrincipalKey?: SecretBase;
  /** The Tenant id/name to which the service principal belongs. Type: string (or Expression with resultType string). */
  tenant: Record<string, unknown>;
  /** The resource group where the cluster belongs. Type: string (or Expression with resultType string). */
  clusterResourceGroup: Record<string, unknown>;
  /** The prefix of cluster name, postfix will be distinct with timestamp. Type: string (or Expression with resultType string). */
  clusterNamePrefix?: Record<string, unknown>;
  /** The username to access the cluster. Type: string (or Expression with resultType string). */
  clusterUserName?: Record<string, unknown>;
  /** The password to access the cluster. */
  clusterPassword?: SecretBase;
  /** The username to SSH remotely connect to cluster’s node (for Linux). Type: string (or Expression with resultType string). */
  clusterSshUserName?: Record<string, unknown>;
  /** The password to SSH remotely connect cluster’s node (for Linux). */
  clusterSshPassword?: SecretBase;
  /** Specifies additional storage accounts for the HDInsight linked service so that the Data Factory service can register them on your behalf. */
  additionalLinkedServiceNames?: Array<LinkedServiceReference>;
  /** The name of Azure SQL linked service that point to the HCatalog database. The on-demand HDInsight cluster is created by using the Azure SQL database as the metastore. */
  hcatalogLinkedServiceName?: LinkedServiceReference;
  /** The cluster type. Type: string (or Expression with resultType string). */
  clusterType?: Record<string, unknown>;
  /** The version of spark if the cluster type is 'spark'. Type: string (or Expression with resultType string). */
  sparkVersion?: Record<string, unknown>;
  /** Specifies the core configuration parameters (as in core-site.xml) for the HDInsight cluster to be created. */
  coreConfiguration?: Record<string, unknown>;
  /** Specifies the HBase configuration parameters (hbase-site.xml) for the HDInsight cluster. */
  hBaseConfiguration?: Record<string, unknown>;
  /** Specifies the HDFS configuration parameters (hdfs-site.xml) for the HDInsight cluster. */
  hdfsConfiguration?: Record<string, unknown>;
  /** Specifies the hive configuration parameters (hive-site.xml) for the HDInsight cluster. */
  hiveConfiguration?: Record<string, unknown>;
  /** Specifies the MapReduce configuration parameters (mapred-site.xml) for the HDInsight cluster. */
  mapReduceConfiguration?: Record<string, unknown>;
  /** Specifies the Oozie configuration parameters (oozie-site.xml) for the HDInsight cluster. */
  oozieConfiguration?: Record<string, unknown>;
  /** Specifies the Storm configuration parameters (storm-site.xml) for the HDInsight cluster. */
  stormConfiguration?: Record<string, unknown>;
  /** Specifies the Yarn configuration parameters (yarn-site.xml) for the HDInsight cluster. */
  yarnConfiguration?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
  /** Specifies the size of the head node for the HDInsight cluster. */
  headNodeSize?: Record<string, unknown>;
  /** Specifies the size of the data node for the HDInsight cluster. */
  dataNodeSize?: Record<string, unknown>;
  /** Specifies the size of the Zoo Keeper node for the HDInsight cluster. */
  zookeeperNodeSize?: Record<string, unknown>;
  /** Custom script actions to run on HDI ondemand cluster once it's up. Please refer to https://docs.microsoft.com/en-us/azure/hdinsight/hdinsight-hadoop-customize-cluster-linux?toc=%2Fen-us%2Fazure%2Fhdinsight%2Fr-server%2FTOC.json&bc=%2Fen-us%2Fazure%2Fbread%2Ftoc.json#understanding-script-actions. */
  scriptActions?: Array<ScriptAction>;
  /** The ARM resource ID for the vNet to which the cluster should be joined after creation. Type: string (or Expression with resultType string). */
  virtualNetworkId?: Record<string, unknown>;
  /** The ARM resource ID for the subnet in the vNet. If virtualNetworkId was specified, then this property is required. Type: string (or Expression with resultType string). */
  subnetName?: Record<string, unknown>;
}

export interface ScriptAction {
  /** The user provided name of the script action. */
  name: string;
  /** The URI for the script action. */
  uri: string;
  /** The node types on which the script action should be executed. */
  roles: "Headnode" | "Workernode" | "Zookeeper";
  /** The parameters for the script action. */
  parameters?: string;
}

export type AzureDataLakeAnalyticsLinkedService = AzureDataLakeAnalyticsLinkedServiceBase &
  LinkedService;

export interface AzureDataLakeAnalyticsLinkedServiceBase {
  /** Azure Data Lake Analytics linked service properties. */
  typeProperties: AzureDataLakeAnalyticsLinkedServiceTypeProperties;
}

export interface AzureDataLakeAnalyticsLinkedServiceTypeProperties {
  /** The Azure Data Lake Analytics account name. Type: string (or Expression with resultType string). */
  accountName: Record<string, unknown>;
  /** The ID of the application used to authenticate against the Azure Data Lake Analytics account. Type: string (or Expression with resultType string). */
  servicePrincipalId?: Record<string, unknown>;
  /** The Key of the application used to authenticate against the Azure Data Lake Analytics account. */
  servicePrincipalKey?: SecretBase;
  /** The name or ID of the tenant to which the service principal belongs. Type: string (or Expression with resultType string). */
  tenant: Record<string, unknown>;
  /** Data Lake Analytics account subscription ID (if different from Data Factory account). Type: string (or Expression with resultType string). */
  subscriptionId?: Record<string, unknown>;
  /** Data Lake Analytics account resource group name (if different from Data Factory account). Type: string (or Expression with resultType string). */
  resourceGroupName?: Record<string, unknown>;
  /** Azure Data Lake Analytics URI Type: string (or Expression with resultType string). */
  dataLakeAnalyticsUri?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AzureDatabricksLinkedService = AzureDatabricksLinkedServiceBase &
  LinkedService;

export interface AzureDatabricksLinkedServiceBase {
  /** Azure Databricks linked service properties. */
  typeProperties: AzureDatabricksLinkedServiceTypeProperties;
}

export interface AzureDatabricksLinkedServiceTypeProperties {
  /** <REGION>.azuredatabricks.net, domain name of your Databricks deployment. Type: string (or Expression with resultType string). */
  domain: Record<string, unknown>;
  /** Access token for databricks REST API. Refer to https://docs.azuredatabricks.net/api/latest/authentication.html. Type: string (or Expression with resultType string). */
  accessToken?: SecretBase;
  /** Required to specify MSI, if using Workspace resource id for databricks REST API. Type: string (or Expression with resultType string). */
  authentication?: Record<string, unknown>;
  /** Workspace resource id for databricks REST API. Type: string (or Expression with resultType string). */
  workspaceResourceId?: Record<string, unknown>;
  /** The id of an existing interactive cluster that will be used for all runs of this activity. Type: string (or Expression with resultType string). */
  existingClusterId?: Record<string, unknown>;
  /** The id of an existing instance pool that will be used for all runs of this activity. Type: string (or Expression with resultType string). */
  instancePoolId?: Record<string, unknown>;
  /** If not using an existing interactive cluster, this specifies the Spark version of a new job cluster or instance pool nodes created for each run of this activity. Required if instancePoolId is specified. Type: string (or Expression with resultType string). */
  newClusterVersion?: Record<string, unknown>;
  /** If not using an existing interactive cluster, this specifies the number of worker nodes to use for the new job cluster or instance pool. For new job clusters, this a string-formatted Int32, like '1' means numOfWorker is 1 or '1:10' means auto-scale from 1 (min) to 10 (max). For instance pools, this is a string-formatted Int32, and can only specify a fixed number of worker nodes, such as '2'. Required if newClusterVersion is specified. Type: string (or Expression with resultType string). */
  newClusterNumOfWorker?: Record<string, unknown>;
  /** The node type of the new job cluster. This property is required if newClusterVersion is specified and instancePoolId is not specified. If instancePoolId is specified, this property is ignored. Type: string (or Expression with resultType string). */
  newClusterNodeType?: Record<string, unknown>;
  /** A set of optional, user-specified Spark configuration key-value pairs. */
  newClusterSparkConf?: Record<string, Record<string, unknown>>;
  /** A set of optional, user-specified Spark environment variables key-value pairs. */
  newClusterSparkEnvVars?: Record<string, Record<string, unknown>>;
  /** Additional tags for cluster resources. This property is ignored in instance pool configurations. */
  newClusterCustomTags?: Record<string, Record<string, unknown>>;
  /** Specify a location to deliver Spark driver, worker, and event logs. Type: string (or Expression with resultType string). */
  newClusterLogDestination?: Record<string, unknown>;
  /** The driver node type for the new job cluster. This property is ignored in instance pool configurations. Type: string (or Expression with resultType string). */
  newClusterDriverNodeType?: Record<string, unknown>;
  /** User-defined initialization scripts for the new cluster. Type: array of strings (or Expression with resultType array of strings). */
  newClusterInitScripts?: Record<string, unknown>;
  /** Enable the elastic disk on the new cluster. This property is now ignored, and takes the default elastic disk behavior in Databricks (elastic disks are always enabled). Type: boolean (or Expression with resultType boolean). */
  newClusterEnableElasticDisk?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
  /** The policy id for limiting the ability to configure clusters based on a user defined set of rules. Type: string (or Expression with resultType string). */
  policyId?: Record<string, unknown>;
}

export type AzureDatabricksDeltaLakeLinkedService = AzureDatabricksDeltaLakeLinkedServiceBase &
  LinkedService;

export interface AzureDatabricksDeltaLakeLinkedServiceBase {
  /** Azure Databricks Delta Lake linked service properties. */
  typeProperties: AzureDatabricksDetltaLakeLinkedServiceTypeProperties;
}

export interface AzureDatabricksDetltaLakeLinkedServiceTypeProperties {
  /** <REGION>.azuredatabricks.net, domain name of your Databricks deployment. Type: string (or Expression with resultType string). */
  domain: Record<string, unknown>;
  /** Access token for databricks REST API. Refer to https://docs.azuredatabricks.net/api/latest/authentication.html. Type: string, SecureString or AzureKeyVaultSecretReference. */
  accessToken: SecretBase;
  /** The id of an existing interactive cluster that will be used for all runs of this job. Type: string (or Expression with resultType string). */
  clusterId?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type ResponsysLinkedService = ResponsysLinkedServiceBase & LinkedService;

export interface ResponsysLinkedServiceBase {
  /** Responsys linked service properties. */
  typeProperties: ResponsysLinkedServiceTypeProperties;
}

export interface ResponsysLinkedServiceTypeProperties {
  /** The endpoint of the Responsys server. */
  endpoint: Record<string, unknown>;
  /** The client ID associated with the Responsys application. Type: string (or Expression with resultType string). */
  clientId: Record<string, unknown>;
  /** The client secret associated with the Responsys application. Type: string (or Expression with resultType string). */
  clientSecret?: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. Type: boolean (or Expression with resultType boolean). */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. Type: boolean (or Expression with resultType boolean). */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. Type: boolean (or Expression with resultType boolean). */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type DynamicsAXLinkedService = DynamicsAXLinkedServiceBase &
  LinkedService;

export interface DynamicsAXLinkedServiceBase {
  /** Dynamics AX linked service properties. */
  typeProperties: DynamicsAXLinkedServiceTypeProperties;
}

export interface DynamicsAXLinkedServiceTypeProperties {
  /** The Dynamics AX (or Dynamics 365 Finance and Operations) instance OData endpoint. */
  url: Record<string, unknown>;
  /** Specify the application's client ID. Type: string (or Expression with resultType string). */
  servicePrincipalId: Record<string, unknown>;
  /** Specify the application's key. Mark this field as a SecureString to store it securely in Data Factory, or reference a secret stored in Azure Key Vault. Type: string (or Expression with resultType string). */
  servicePrincipalKey: SecretBase;
  /** Specify the tenant information (domain name or tenant ID) under which your application resides. Retrieve it by hovering the mouse in the top-right corner of the Azure portal. Type: string (or Expression with resultType string). */
  tenant: Record<string, unknown>;
  /** Specify the resource you are requesting authorization. Type: string (or Expression with resultType string). */
  aadResourceId: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type OracleServiceCloudLinkedService = OracleServiceCloudLinkedServiceBase &
  LinkedService;

export interface OracleServiceCloudLinkedServiceBase {
  /** Oracle Service Cloud linked service properties. */
  typeProperties: OracleServiceCloudLinkedServiceTypeProperties;
}

export interface OracleServiceCloudLinkedServiceTypeProperties {
  /** The URL of the Oracle Service Cloud instance. */
  host: Record<string, unknown>;
  /** The user name that you use to access Oracle Service Cloud server. */
  username: Record<string, unknown>;
  /** The password corresponding to the user name that you provided in the username key. */
  password: SecretBase;
  /** Specifies whether the data source endpoints are encrypted using HTTPS. The default value is true. Type: boolean (or Expression with resultType boolean). */
  useEncryptedEndpoints?: Record<string, unknown>;
  /** Specifies whether to require the host name in the server's certificate to match the host name of the server when connecting over SSL. The default value is true. Type: boolean (or Expression with resultType boolean). */
  useHostVerification?: Record<string, unknown>;
  /** Specifies whether to verify the identity of the server when connecting over SSL. The default value is true. Type: boolean (or Expression with resultType boolean). */
  usePeerVerification?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type GoogleAdWordsLinkedService = GoogleAdWordsLinkedServiceBase &
  LinkedService;

export interface GoogleAdWordsLinkedServiceBase {
  /** Google AdWords service linked service properties. */
  typeProperties: GoogleAdWordsLinkedServiceTypeProperties;
}

export interface GoogleAdWordsLinkedServiceTypeProperties {
  /** The Client customer ID of the AdWords account that you want to fetch report data for. */
  clientCustomerID: Record<string, unknown>;
  /** The developer token associated with the manager account that you use to grant access to the AdWords API. */
  developerToken: SecretBase;
  /** The OAuth 2.0 authentication mechanism used for authentication. ServiceAuthentication can only be used on self-hosted IR. */
  authenticationType: "ServiceAuthentication" | "UserAuthentication";
  /** The refresh token obtained from Google for authorizing access to AdWords for UserAuthentication. */
  refreshToken?: SecretBase;
  /** The client id of the google application used to acquire the refresh token. Type: string (or Expression with resultType string). */
  clientId?: Record<string, unknown>;
  /** The client secret of the google application used to acquire the refresh token. */
  clientSecret?: SecretBase;
  /** The service account email ID that is used for ServiceAuthentication and can only be used on self-hosted IR. */
  email?: Record<string, unknown>;
  /** The full path to the .p12 key file that is used to authenticate the service account email address and can only be used on self-hosted IR. */
  keyFilePath?: Record<string, unknown>;
  /** The full path of the .pem file containing trusted CA certificates for verifying the server when connecting over SSL. This property can only be set when using SSL on self-hosted IR. The default value is the cacerts.pem file installed with the IR. */
  trustedCertPath?: Record<string, unknown>;
  /** Specifies whether to use a CA certificate from the system trust store or from a specified PEM file. The default value is false. */
  useSystemTrustStore?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type SapTableLinkedService = SapTableLinkedServiceBase & LinkedService;

export interface SapTableLinkedServiceBase {
  /** Properties specific to this linked service type. */
  typeProperties: SapTableLinkedServiceTypeProperties;
}

export interface SapTableLinkedServiceTypeProperties {
  /** Host name of the SAP instance where the table is located. Type: string (or Expression with resultType string). */
  server?: Record<string, unknown>;
  /** System number of the SAP system where the table is located. (Usually a two-digit decimal number represented as a string.) Type: string (or Expression with resultType string). */
  systemNumber?: Record<string, unknown>;
  /** Client ID of the client on the SAP system where the table is located. (Usually a three-digit decimal number represented as a string) Type: string (or Expression with resultType string). */
  clientId?: Record<string, unknown>;
  /** Language of the SAP system where the table is located. The default value is EN. Type: string (or Expression with resultType string). */
  language?: Record<string, unknown>;
  /** SystemID of the SAP system where the table is located. Type: string (or Expression with resultType string). */
  systemId?: Record<string, unknown>;
  /** Username to access the SAP server where the table is located. Type: string (or Expression with resultType string). */
  userName?: Record<string, unknown>;
  /** Password to access the SAP server where the table is located. */
  password?: SecretBase;
  /** The hostname of the SAP Message Server. Type: string (or Expression with resultType string). */
  messageServer?: Record<string, unknown>;
  /** The service name or port number of the Message Server. Type: string (or Expression with resultType string). */
  messageServerService?: Record<string, unknown>;
  /** SNC activation indicator to access the SAP server where the table is located. Must be either 0 (off) or 1 (on). Type: string (or Expression with resultType string). */
  sncMode?: Record<string, unknown>;
  /** Initiator's SNC name to access the SAP server where the table is located. Type: string (or Expression with resultType string). */
  sncMyName?: Record<string, unknown>;
  /** Communication partner's SNC name to access the SAP server where the table is located. Type: string (or Expression with resultType string). */
  sncPartnerName?: Record<string, unknown>;
  /** External security product's library to access the SAP server where the table is located. Type: string (or Expression with resultType string). */
  sncLibraryPath?: Record<string, unknown>;
  /** SNC Quality of Protection. Allowed value include: 1, 2, 3, 8, 9. Type: string (or Expression with resultType string). */
  sncQop?: Record<string, unknown>;
  /** The Logon Group for the SAP System. Type: string (or Expression with resultType string). */
  logonGroup?: Record<string, unknown>;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type AzureDataExplorerLinkedService = AzureDataExplorerLinkedServiceBase &
  LinkedService;

export interface AzureDataExplorerLinkedServiceBase {
  /** Azure Data Explorer (Kusto) linked service properties. */
  typeProperties: AzureDataExplorerLinkedServiceTypeProperties;
}

export interface AzureDataExplorerLinkedServiceTypeProperties {
  /** The endpoint of Azure Data Explorer (the engine's endpoint). URL will be in the format https://<clusterName>.<regionName>.kusto.windows.net. Type: string (or Expression with resultType string) */
  endpoint: Record<string, unknown>;
  /** The ID of the service principal used to authenticate against Azure Data Explorer. Type: string (or Expression with resultType string). */
  servicePrincipalId: Record<string, unknown>;
  /** The key of the service principal used to authenticate against Kusto. */
  servicePrincipalKey: SecretBase;
  /** Database name for connection. Type: string (or Expression with resultType string). */
  database: Record<string, unknown>;
  /** The name or ID of the tenant to which the service principal belongs. Type: string (or Expression with resultType string). */
  tenant: Record<string, unknown>;
}

export type AzureFunctionLinkedService = AzureFunctionLinkedServiceBase &
  LinkedService;

export interface AzureFunctionLinkedServiceBase {
  /** Azure Function linked service properties. */
  typeProperties: AzureFunctionLinkedServiceTypeProperties;
}

export interface AzureFunctionLinkedServiceTypeProperties {
  /** The endpoint of the Azure Function App. URL will be in the format https://<accountName>.azurewebsites.net. */
  functionAppUrl: Record<string, unknown>;
  /** Function or Host key for Azure Function App. */
  functionKey?: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type SnowflakeLinkedService = SnowflakeLinkedServiceBase & LinkedService;

export interface SnowflakeLinkedServiceBase {
  /** Snowflake linked service properties. */
  typeProperties: SnowflakeLinkedServiceTypeProperties;
}

export interface SnowflakeLinkedServiceTypeProperties {
  /** The connection string of snowflake. Type: string, SecureString. */
  connectionString: Record<string, unknown>;
  /** The Azure key vault secret reference of password in connection string. */
  password?: AzureKeyVaultSecretReference;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type SharePointOnlineListLinkedService = SharePointOnlineListLinkedServiceBase &
  LinkedService;

export interface SharePointOnlineListLinkedServiceBase {
  /** SharePoint Online List linked service properties. */
  typeProperties: SharePointOnlineListLinkedServiceTypeProperties;
}

export interface SharePointOnlineListLinkedServiceTypeProperties {
  /** The URL of the SharePoint Online site. For example, https://contoso.sharepoint.com/sites/siteName. Type: string (or Expression with resultType string). */
  siteUrl: Record<string, unknown>;
  /** The tenant ID under which your application resides. You can find it from Azure portal Active Directory overview page. Type: string (or Expression with resultType string). */
  tenantId: Record<string, unknown>;
  /** The application (client) ID of your application registered in Azure Active Directory. Make sure to grant SharePoint site permission to this application. Type: string (or Expression with resultType string). */
  servicePrincipalId: Record<string, unknown>;
  /** The client secret of your application registered in Azure Active Directory. Type: string (or Expression with resultType string). */
  servicePrincipalKey: SecretBase;
  /** The encrypted credential used for authentication. Credentials are encrypted using the integration runtime credential manager. Type: string (or Expression with resultType string). */
  encryptedCredential?: Record<string, unknown>;
}

export type ControlActivity = ControlActivityBase & Activity;

export interface ControlActivityBase {}

export type ExecutionActivity = ExecutionActivityBase & Activity;

export interface ExecutionActivityBase {
  /** Linked service reference. */
  linkedServiceName?: LinkedServiceReference;
  /** Activity policy. */
  policy?: ActivityPolicy;
}

export type ActivityPolicy = ActivityPolicyBase & ActivityPolicyDictionary;

export interface ActivityPolicyBase {
  /** Specifies the timeout for the activity to run. The default timeout is 7 days. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  timeout?: Record<string, unknown>;
  /** Maximum ordinary retry attempts. Default is 0. Type: integer (or Expression with resultType integer), minimum: 0. */
  retry?: Record<string, unknown>;
  /** Interval between each retry attempt (in seconds). The default is 30 sec. */
  retryIntervalInSeconds?: number;
  /** When set to true, Input from activity is considered as secure and will not be logged to monitoring. */
  secureInput?: boolean;
  /** When set to true, Output from activity is considered as secure and will not be logged to monitoring. */
  secureOutput?: boolean;
}

export type StoreReadSettings = StoreReadSettingsBase &
  StoreReadSettingsDictionary;

export interface StoreReadSettingsBase {
  /** The read setting type. */
  type: string;
  /** The maximum concurrent connection count for the source data store. Type: integer (or Expression with resultType integer). */
  maxConcurrentConnections?: Record<string, unknown>;
}

export type AzureBlobStorageReadSettings = AzureBlobStorageReadSettingsBase &
  StoreReadSettings;

export interface AzureBlobStorageReadSettingsBase {
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
  /** Azure blob wildcardFolderPath. Type: string (or Expression with resultType string). */
  wildcardFolderPath?: Record<string, unknown>;
  /** Azure blob wildcardFileName. Type: string (or Expression with resultType string). */
  wildcardFileName?: Record<string, unknown>;
  /** The prefix filter for the Azure Blob name. Type: string (or Expression with resultType string). */
  prefix?: Record<string, unknown>;
  /** Point to a text file that lists each file (relative path to the path configured in the dataset) that you want to copy. Type: string (or Expression with resultType string). */
  fileListPath?: Record<string, unknown>;
  /** Indicates whether to enable partition discovery. */
  enablePartitionDiscovery?: boolean;
  /** Specify the root path where partition discovery starts from. Type: string (or Expression with resultType string). */
  partitionRootPath?: Record<string, unknown>;
  /** Indicates whether the source files need to be deleted after copy completion. Default is false. Type: boolean (or Expression with resultType boolean). */
  deleteFilesAfterCompletion?: Record<string, unknown>;
  /** The start of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeStart?: Record<string, unknown>;
  /** The end of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeEnd?: Record<string, unknown>;
}

export type AzureBlobFSReadSettings = AzureBlobFSReadSettingsBase &
  StoreReadSettings;

export interface AzureBlobFSReadSettingsBase {
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
  /** Azure blobFS wildcardFolderPath. Type: string (or Expression with resultType string). */
  wildcardFolderPath?: Record<string, unknown>;
  /** Azure blobFS wildcardFileName. Type: string (or Expression with resultType string). */
  wildcardFileName?: Record<string, unknown>;
  /** Point to a text file that lists each file (relative path to the path configured in the dataset) that you want to copy. Type: string (or Expression with resultType string). */
  fileListPath?: Record<string, unknown>;
  /** Indicates whether to enable partition discovery. */
  enablePartitionDiscovery?: boolean;
  /** Specify the root path where partition discovery starts from. Type: string (or Expression with resultType string). */
  partitionRootPath?: Record<string, unknown>;
  /** Indicates whether the source files need to be deleted after copy completion. Default is false. Type: boolean (or Expression with resultType boolean). */
  deleteFilesAfterCompletion?: Record<string, unknown>;
  /** The start of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeStart?: Record<string, unknown>;
  /** The end of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeEnd?: Record<string, unknown>;
}

export type AzureDataLakeStoreReadSettings = AzureDataLakeStoreReadSettingsBase &
  StoreReadSettings;

export interface AzureDataLakeStoreReadSettingsBase {
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
  /** ADLS wildcardFolderPath. Type: string (or Expression with resultType string). */
  wildcardFolderPath?: Record<string, unknown>;
  /** ADLS wildcardFileName. Type: string (or Expression with resultType string). */
  wildcardFileName?: Record<string, unknown>;
  /** Point to a text file that lists each file (relative path to the path configured in the dataset) that you want to copy. Type: string (or Expression with resultType string). */
  fileListPath?: Record<string, unknown>;
  /** Lists files after the value (exclusive) based on file/folder names’ lexicographical order. Applies under the folderPath in data set, and filter files/sub-folders under the folderPath. Type: string (or Expression with resultType string). */
  listAfter?: Record<string, unknown>;
  /** Lists files before the value (inclusive) based on file/folder names’ lexicographical order. Applies under the folderPath in data set, and filter files/sub-folders under the folderPath. Type: string (or Expression with resultType string). */
  listBefore?: Record<string, unknown>;
  /** Indicates whether to enable partition discovery. */
  enablePartitionDiscovery?: boolean;
  /** Specify the root path where partition discovery starts from. Type: string (or Expression with resultType string). */
  partitionRootPath?: Record<string, unknown>;
  /** Indicates whether the source files need to be deleted after copy completion. Default is false. Type: boolean (or Expression with resultType boolean). */
  deleteFilesAfterCompletion?: Record<string, unknown>;
  /** The start of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeStart?: Record<string, unknown>;
  /** The end of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeEnd?: Record<string, unknown>;
}

export type AmazonS3ReadSettings = AmazonS3ReadSettingsBase & StoreReadSettings;

export interface AmazonS3ReadSettingsBase {
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
  /** AmazonS3 wildcardFolderPath. Type: string (or Expression with resultType string). */
  wildcardFolderPath?: Record<string, unknown>;
  /** AmazonS3 wildcardFileName. Type: string (or Expression with resultType string). */
  wildcardFileName?: Record<string, unknown>;
  /** The prefix filter for the S3 object name. Type: string (or Expression with resultType string). */
  prefix?: Record<string, unknown>;
  /** Point to a text file that lists each file (relative path to the path configured in the dataset) that you want to copy. Type: string (or Expression with resultType string). */
  fileListPath?: Record<string, unknown>;
  /** Indicates whether to enable partition discovery. */
  enablePartitionDiscovery?: boolean;
  /** Specify the root path where partition discovery starts from. Type: string (or Expression with resultType string). */
  partitionRootPath?: Record<string, unknown>;
  /** Indicates whether the source files need to be deleted after copy completion. Default is false. Type: boolean (or Expression with resultType boolean). */
  deleteFilesAfterCompletion?: Record<string, unknown>;
  /** The start of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeStart?: Record<string, unknown>;
  /** The end of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeEnd?: Record<string, unknown>;
}

export type FileServerReadSettings = FileServerReadSettingsBase &
  StoreReadSettings;

export interface FileServerReadSettingsBase {
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
  /** FileServer wildcardFolderPath. Type: string (or Expression with resultType string). */
  wildcardFolderPath?: Record<string, unknown>;
  /** FileServer wildcardFileName. Type: string (or Expression with resultType string). */
  wildcardFileName?: Record<string, unknown>;
  /** Point to a text file that lists each file (relative path to the path configured in the dataset) that you want to copy. Type: string (or Expression with resultType string). */
  fileListPath?: Record<string, unknown>;
  /** Indicates whether to enable partition discovery. */
  enablePartitionDiscovery?: boolean;
  /** Specify the root path where partition discovery starts from. Type: string (or Expression with resultType string). */
  partitionRootPath?: Record<string, unknown>;
  /** Indicates whether the source files need to be deleted after copy completion. Default is false. Type: boolean (or Expression with resultType boolean). */
  deleteFilesAfterCompletion?: Record<string, unknown>;
  /** The start of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeStart?: Record<string, unknown>;
  /** The end of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeEnd?: Record<string, unknown>;
  /** Specify a filter to be used to select a subset of files in the folderPath rather than all files. Type: string (or Expression with resultType string). */
  fileFilter?: Record<string, unknown>;
}

export type AzureFileStorageReadSettings = AzureFileStorageReadSettingsBase &
  StoreReadSettings;

export interface AzureFileStorageReadSettingsBase {
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
  /** Azure File Storage wildcardFolderPath. Type: string (or Expression with resultType string). */
  wildcardFolderPath?: Record<string, unknown>;
  /** Azure File Storage wildcardFileName. Type: string (or Expression with resultType string). */
  wildcardFileName?: Record<string, unknown>;
  /** The prefix filter for the Azure File name starting from root path. Type: string (or Expression with resultType string). */
  prefix?: Record<string, unknown>;
  /** Point to a text file that lists each file (relative path to the path configured in the dataset) that you want to copy. Type: string (or Expression with resultType string). */
  fileListPath?: Record<string, unknown>;
  /** Indicates whether to enable partition discovery. */
  enablePartitionDiscovery?: boolean;
  /** Specify the root path where partition discovery starts from. Type: string (or Expression with resultType string). */
  partitionRootPath?: Record<string, unknown>;
  /** Indicates whether the source files need to be deleted after copy completion. Default is false. Type: boolean (or Expression with resultType boolean). */
  deleteFilesAfterCompletion?: Record<string, unknown>;
  /** The start of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeStart?: Record<string, unknown>;
  /** The end of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeEnd?: Record<string, unknown>;
}

export type StoreWriteSettings = StoreWriteSettingsBase &
  StoreWriteSettingsDictionary;

export interface StoreWriteSettingsBase {
  /** The write setting type. */
  type: string;
  /** The maximum concurrent connection count for the source data store. Type: integer (or Expression with resultType integer). */
  maxConcurrentConnections?: Record<string, unknown>;
  /** The type of copy behavior for copy sink. */
  copyBehavior?: Record<string, unknown>;
}

export type SftpWriteSettings = SftpWriteSettingsBase & StoreWriteSettings;

export interface SftpWriteSettingsBase {
  /** Specifies the timeout for writing each chunk to SFTP server. Default value: 01:00:00 (one hour). Type: string (or Expression with resultType string). */
  operationTimeout?: Record<string, unknown>;
  /** Upload to temporary file(s) and rename. Disable this option if your SFTP server doesn't support rename operation. Type: boolean (or Expression with resultType boolean). */
  useTempFileRename?: Record<string, unknown>;
}

export type GoogleCloudStorageReadSettings = GoogleCloudStorageReadSettingsBase &
  StoreReadSettings;

export interface GoogleCloudStorageReadSettingsBase {
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
  /** Google Cloud Storage wildcardFolderPath. Type: string (or Expression with resultType string). */
  wildcardFolderPath?: Record<string, unknown>;
  /** Google Cloud Storage wildcardFileName. Type: string (or Expression with resultType string). */
  wildcardFileName?: Record<string, unknown>;
  /** The prefix filter for the Google Cloud Storage object name. Type: string (or Expression with resultType string). */
  prefix?: Record<string, unknown>;
  /** Point to a text file that lists each file (relative path to the path configured in the dataset) that you want to copy. Type: string (or Expression with resultType string). */
  fileListPath?: Record<string, unknown>;
  /** Indicates whether to enable partition discovery. */
  enablePartitionDiscovery?: boolean;
  /** Specify the root path where partition discovery starts from. Type: string (or Expression with resultType string). */
  partitionRootPath?: Record<string, unknown>;
  /** Indicates whether the source files need to be deleted after copy completion. Default is false. Type: boolean (or Expression with resultType boolean). */
  deleteFilesAfterCompletion?: Record<string, unknown>;
  /** The start of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeStart?: Record<string, unknown>;
  /** The end of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeEnd?: Record<string, unknown>;
}

export type FtpReadSettings = FtpReadSettingsBase & StoreReadSettings;

export interface FtpReadSettingsBase {
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
  /** Ftp wildcardFolderPath. Type: string (or Expression with resultType string). */
  wildcardFolderPath?: Record<string, unknown>;
  /** Ftp wildcardFileName. Type: string (or Expression with resultType string). */
  wildcardFileName?: Record<string, unknown>;
  /** Indicates whether to enable partition discovery. */
  enablePartitionDiscovery?: boolean;
  /** Specify the root path where partition discovery starts from. Type: string (or Expression with resultType string). */
  partitionRootPath?: Record<string, unknown>;
  /** Indicates whether the source files need to be deleted after copy completion. Default is false. Type: boolean (or Expression with resultType boolean). */
  deleteFilesAfterCompletion?: Record<string, unknown>;
  /** Point to a text file that lists each file (relative path to the path configured in the dataset) that you want to copy. Type: string (or Expression with resultType string). */
  fileListPath?: Record<string, unknown>;
  /** Specify whether to use binary transfer mode for FTP stores. */
  useBinaryTransfer?: boolean;
}

export type SftpReadSettings = SftpReadSettingsBase & StoreReadSettings;

export interface SftpReadSettingsBase {
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
  /** Sftp wildcardFolderPath. Type: string (or Expression with resultType string). */
  wildcardFolderPath?: Record<string, unknown>;
  /** Sftp wildcardFileName. Type: string (or Expression with resultType string). */
  wildcardFileName?: Record<string, unknown>;
  /** Indicates whether to enable partition discovery. */
  enablePartitionDiscovery?: boolean;
  /** Specify the root path where partition discovery starts from. Type: string (or Expression with resultType string). */
  partitionRootPath?: Record<string, unknown>;
  /** Point to a text file that lists each file (relative path to the path configured in the dataset) that you want to copy. Type: string (or Expression with resultType string). */
  fileListPath?: Record<string, unknown>;
  /** Indicates whether the source files need to be deleted after copy completion. Default is false. Type: boolean (or Expression with resultType boolean). */
  deleteFilesAfterCompletion?: Record<string, unknown>;
  /** The start of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeStart?: Record<string, unknown>;
  /** The end of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeEnd?: Record<string, unknown>;
}

export type HttpReadSettings = HttpReadSettingsBase & StoreReadSettings;

export interface HttpReadSettingsBase {
  /** The HTTP method used to call the RESTful API. The default is GET. Type: string (or Expression with resultType string). */
  requestMethod?: Record<string, unknown>;
  /** The HTTP request body to the RESTful API if requestMethod is POST. Type: string (or Expression with resultType string). */
  requestBody?: Record<string, unknown>;
  /** The additional HTTP headers in the request to the RESTful API. Type: string (or Expression with resultType string). */
  additionalHeaders?: Record<string, unknown>;
  /** Specifies the timeout for a HTTP client to get HTTP response from HTTP server. */
  requestTimeout?: Record<string, unknown>;
  /** Indicates whether to enable partition discovery. */
  enablePartitionDiscovery?: boolean;
  /** Specify the root path where partition discovery starts from. Type: string (or Expression with resultType string). */
  partitionRootPath?: Record<string, unknown>;
}

export type HdfsReadSettings = HdfsReadSettingsBase & StoreReadSettings;

export interface HdfsReadSettingsBase {
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
  /** HDFS wildcardFolderPath. Type: string (or Expression with resultType string). */
  wildcardFolderPath?: Record<string, unknown>;
  /** HDFS wildcardFileName. Type: string (or Expression with resultType string). */
  wildcardFileName?: Record<string, unknown>;
  /** Point to a text file that lists each file (relative path to the path configured in the dataset) that you want to copy. Type: string (or Expression with resultType string). */
  fileListPath?: Record<string, unknown>;
  /** Indicates whether to enable partition discovery. */
  enablePartitionDiscovery?: boolean;
  /** Specify the root path where partition discovery starts from. Type: string (or Expression with resultType string). */
  partitionRootPath?: Record<string, unknown>;
  /** The start of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeStart?: Record<string, unknown>;
  /** The end of file's modified datetime. Type: string (or Expression with resultType string). */
  modifiedDatetimeEnd?: Record<string, unknown>;
  /** Specifies Distcp-related settings. */
  distcpSettings?: DistcpSettings;
  /** Indicates whether the source files need to be deleted after copy completion. Default is false. Type: boolean (or Expression with resultType boolean). */
  deleteFilesAfterCompletion?: Record<string, unknown>;
}

export interface DistcpSettings {
  /** Specifies the Yarn ResourceManager endpoint. Type: string (or Expression with resultType string). */
  resourceManagerEndpoint: Record<string, unknown>;
  /** Specifies an existing folder path which will be used to store temp Distcp command script. The script file is generated by ADF and will be removed after Copy job finished. Type: string (or Expression with resultType string). */
  tempScriptPath: Record<string, unknown>;
  /** Specifies the Distcp options. Type: string (or Expression with resultType string). */
  distcpOptions?: Record<string, unknown>;
}

export type AzureBlobStorageWriteSettings = AzureBlobStorageWriteSettingsBase &
  StoreWriteSettings;

export interface AzureBlobStorageWriteSettingsBase {
  /** Indicates the block size(MB) when writing data to blob. Type: integer (or Expression with resultType integer). */
  blockSizeInMB?: Record<string, unknown>;
}

export type AzureBlobFSWriteSettings = AzureBlobFSWriteSettingsBase &
  StoreWriteSettings;

export interface AzureBlobFSWriteSettingsBase {
  /** Indicates the block size(MB) when writing data to blob. Type: integer (or Expression with resultType integer). */
  blockSizeInMB?: Record<string, unknown>;
}

export type AzureDataLakeStoreWriteSettings = AzureDataLakeStoreWriteSettingsBase &
  StoreWriteSettings;

export interface AzureDataLakeStoreWriteSettingsBase {
  /** Specifies the expiry time of the written files. The time is applied to the UTC time zone in the format of "2018-12-01T05:00:00Z". Default value is NULL. Type: integer (or Expression with resultType integer). */
  expiryDateTime?: Record<string, unknown>;
}

export type FileServerWriteSettings = FileServerWriteSettingsBase &
  StoreWriteSettings;

export interface FileServerWriteSettingsBase {}

export type AzureFileStorageWriteSettings = AzureFileStorageWriteSettingsBase &
  StoreWriteSettings;

export interface AzureFileStorageWriteSettingsBase {}

export type FormatReadSettings = FormatReadSettingsBase &
  FormatReadSettingsDictionary;

export interface FormatReadSettingsBase {
  /** The read setting type. */
  type: string;
}

export type CompressionReadSettings = CompressionReadSettingsBase &
  CompressionReadSettingsDictionary;

export interface CompressionReadSettingsBase {
  /** The Compression setting type. */
  type: string;
}

export type ZipDeflateReadSettings = ZipDeflateReadSettingsBase &
  CompressionReadSettings;

export interface ZipDeflateReadSettingsBase {
  /** Preserve the zip file name as folder path. Type: boolean (or Expression with resultType boolean). */
  preserveZipFileNameAsFolder?: Record<string, unknown>;
}

export type TarReadSettings = TarReadSettingsBase & CompressionReadSettings;

export interface TarReadSettingsBase {
  /** Preserve the compression file name as folder path. Type: boolean (or Expression with resultType boolean). */
  preserveCompressionFileNameAsFolder?: Record<string, unknown>;
}

export type TarGZipReadSettings = TarGZipReadSettingsBase &
  CompressionReadSettings;

export interface TarGZipReadSettingsBase {
  /** Preserve the compression file name as folder path. Type: boolean (or Expression with resultType boolean). */
  preserveCompressionFileNameAsFolder?: Record<string, unknown>;
}

export type DelimitedTextReadSettings = DelimitedTextReadSettingsBase &
  FormatReadSettings;

export interface DelimitedTextReadSettingsBase {
  /** Indicates the number of non-empty rows to skip when reading data from input files. Type: integer (or Expression with resultType integer). */
  skipLineCount?: Record<string, unknown>;
  /** Compression settings. */
  compressionProperties?: CompressionReadSettings;
}

export type JsonReadSettings = JsonReadSettingsBase & FormatReadSettings;

export interface JsonReadSettingsBase {
  /** Compression settings. */
  compressionProperties?: CompressionReadSettings;
}

export type XmlReadSettings = XmlReadSettingsBase & FormatReadSettings;

export interface XmlReadSettingsBase {
  /** Compression settings. */
  compressionProperties?: CompressionReadSettings;
  /** Indicates what validation method is used when reading the xml files. Allowed values: 'none', 'xsd', or 'dtd'. Type: string (or Expression with resultType string). */
  validationMode?: Record<string, unknown>;
  /** Indicates whether type detection is enabled when reading the xml files. Type: boolean (or Expression with resultType boolean). */
  detectDataType?: Record<string, unknown>;
  /** Indicates whether namespace is enabled when reading the xml files. Type: boolean (or Expression with resultType boolean). */
  namespaces?: Record<string, unknown>;
  /** Namespace uri to prefix mappings to override the prefixes in column names when namespace is enabled, if no prefix is defined for a namespace uri, the prefix of xml element/attribute name in the xml data file will be used. Example: "{"http://www.example.com/xml":"prefix"}" Type: object (or Expression with resultType object). */
  namespacePrefixes?: Record<string, unknown>;
}

export type BinaryReadSettings = BinaryReadSettingsBase & FormatReadSettings;

export interface BinaryReadSettingsBase {
  /** Compression settings. */
  compressionProperties?: CompressionReadSettings;
}

export type FormatWriteSettings = FormatWriteSettingsBase &
  FormatWriteSettingsDictionary;

export interface FormatWriteSettingsBase {
  /** The write setting type. */
  type: string;
}

export type AvroWriteSettings = AvroWriteSettingsBase & FormatWriteSettings;

export interface AvroWriteSettingsBase {
  /** Top level record name in write result, which is required in AVRO spec. */
  recordName?: string;
  /** Record namespace in the write result. */
  recordNamespace?: string;
  /** Limit the written file's row count to be smaller than or equal to the specified count. Type: integer (or Expression with resultType integer). */
  maxRowsPerFile?: Record<string, unknown>;
  /** Specifies the file name pattern <fileNamePrefix>_<fileIndex>.<fileExtension> when copy from non-file based store without partitionOptions. Type: string (or Expression with resultType string). */
  fileNamePrefix?: Record<string, unknown>;
}

export type OrcWriteSettings = OrcWriteSettingsBase & FormatWriteSettings;

export interface OrcWriteSettingsBase {
  /** Limit the written file's row count to be smaller than or equal to the specified count. Type: integer (or Expression with resultType integer). */
  maxRowsPerFile?: Record<string, unknown>;
  /** Specifies the file name pattern <fileNamePrefix>_<fileIndex>.<fileExtension> when copy from non-file based store without partitionOptions. Type: string (or Expression with resultType string). */
  fileNamePrefix?: Record<string, unknown>;
}

export type ParquetWriteSettings = ParquetWriteSettingsBase &
  FormatWriteSettings;

export interface ParquetWriteSettingsBase {
  /** Limit the written file's row count to be smaller than or equal to the specified count. Type: integer (or Expression with resultType integer). */
  maxRowsPerFile?: Record<string, unknown>;
  /** Specifies the file name pattern <fileNamePrefix>_<fileIndex>.<fileExtension> when copy from non-file based store without partitionOptions. Type: string (or Expression with resultType string). */
  fileNamePrefix?: Record<string, unknown>;
}

export type DelimitedTextWriteSettings = DelimitedTextWriteSettingsBase &
  FormatWriteSettings;

export interface DelimitedTextWriteSettingsBase {
  /** Indicates whether string values should always be enclosed with quotes. Type: boolean (or Expression with resultType boolean). */
  quoteAllText?: Record<string, unknown>;
  /** The file extension used to create the files. Type: string (or Expression with resultType string). */
  fileExtension: Record<string, unknown>;
  /** Limit the written file's row count to be smaller than or equal to the specified count. Type: integer (or Expression with resultType integer). */
  maxRowsPerFile?: Record<string, unknown>;
  /** Specifies the file name pattern <fileNamePrefix>_<fileIndex>.<fileExtension> when copy from non-file based store without partitionOptions. Type: string (or Expression with resultType string). */
  fileNamePrefix?: Record<string, unknown>;
}

export type JsonWriteSettings = JsonWriteSettingsBase & FormatWriteSettings;

export interface JsonWriteSettingsBase {
  /** File pattern of JSON. This setting controls the way a collection of JSON objects will be treated. The default value is 'setOfObjects'. It is case-sensitive. */
  filePattern?: "setOfObjects" | "arrayOfObjects";
}

export type CopySource = CopySourceBase & CopySourceDictionary;

export interface CopySourceBase {
  /** Copy source type. */
  type: string;
  /** Source retry count. Type: integer (or Expression with resultType integer). */
  sourceRetryCount?: Record<string, unknown>;
  /** Source retry wait. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  sourceRetryWait?: Record<string, unknown>;
  /** The maximum concurrent connection count for the source data store. Type: integer (or Expression with resultType integer). */
  maxConcurrentConnections?: Record<string, unknown>;
}

export type AvroSource = AvroSourceBase & CopySource;

export interface AvroSourceBase {
  /** Avro store settings. */
  storeSettings?: StoreReadSettings;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export interface AdditionalColumns {
  /** Additional column name. Type: string (or Expression with resultType string). */
  name?: Record<string, unknown>;
  /** Additional column value. Type: string (or Expression with resultType string). */
  value?: Record<string, unknown>;
}

export type ExcelSource = ExcelSourceBase & CopySource;

export interface ExcelSourceBase {
  /** Excel store settings. */
  storeSettings?: StoreReadSettings;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type ParquetSource = ParquetSourceBase & CopySource;

export interface ParquetSourceBase {
  /** Parquet store settings. */
  storeSettings?: StoreReadSettings;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type DelimitedTextSource = DelimitedTextSourceBase & CopySource;

export interface DelimitedTextSourceBase {
  /** DelimitedText store settings. */
  storeSettings?: StoreReadSettings;
  /** DelimitedText format settings. */
  formatSettings?: DelimitedTextReadSettings;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type JsonSource = JsonSourceBase & CopySource;

export interface JsonSourceBase {
  /** Json store settings. */
  storeSettings?: StoreReadSettings;
  /** Json format settings. */
  formatSettings?: JsonReadSettings;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type XmlSource = XmlSourceBase & CopySource;

export interface XmlSourceBase {
  /** Xml store settings. */
  storeSettings?: StoreReadSettings;
  /** Xml format settings. */
  formatSettings?: XmlReadSettings;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type OrcSource = OrcSourceBase & CopySource;

export interface OrcSourceBase {
  /** ORC store settings. */
  storeSettings?: StoreReadSettings;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type CopySink = CopySinkBase & CopySinkDictionary;

export interface CopySinkBase {
  /** Copy sink type. */
  type: string;
  /** Write batch size. Type: integer (or Expression with resultType integer), minimum: 0. */
  writeBatchSize?: Record<string, unknown>;
  /** Write batch timeout. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  writeBatchTimeout?: Record<string, unknown>;
  /** Sink retry count. Type: integer (or Expression with resultType integer). */
  sinkRetryCount?: Record<string, unknown>;
  /** Sink retry wait. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  sinkRetryWait?: Record<string, unknown>;
  /** The maximum concurrent connection count for the sink data store. Type: integer (or Expression with resultType integer). */
  maxConcurrentConnections?: Record<string, unknown>;
}

export type DelimitedTextSink = DelimitedTextSinkBase & CopySink;

export interface DelimitedTextSinkBase {
  /** DelimitedText store settings. */
  storeSettings?: StoreWriteSettings;
  /** DelimitedText format settings. */
  formatSettings?: DelimitedTextWriteSettings;
}

export type JsonSink = JsonSinkBase & CopySink;

export interface JsonSinkBase {
  /** Json store settings. */
  storeSettings?: StoreWriteSettings;
  /** Json format settings. */
  formatSettings?: JsonWriteSettings;
}

export type OrcSink = OrcSinkBase & CopySink;

export interface OrcSinkBase {
  /** ORC store settings. */
  storeSettings?: StoreWriteSettings;
  /** ORC format settings. */
  formatSettings?: OrcWriteSettings;
}

export type CopyActivity = CopyActivityBase & ExecutionActivity;

export interface CopyActivityBase {
  /** Copy activity properties. */
  typeProperties: CopyActivityTypeProperties;
  /** List of inputs for the activity. */
  inputs?: Array<DatasetReference>;
  /** List of outputs for the activity. */
  outputs?: Array<DatasetReference>;
}

export interface CopyActivityTypeProperties {
  /** Copy activity source. */
  source: CopySource;
  /** Copy activity sink. */
  sink: CopySink;
  /** Copy activity translator. If not specified, tabular translator is used. */
  translator?: Record<string, unknown>;
  /** Specifies whether to copy data via an interim staging. Default value is false. Type: boolean (or Expression with resultType boolean). */
  enableStaging?: Record<string, unknown>;
  /** Specifies interim staging settings when EnableStaging is true. */
  stagingSettings?: StagingSettings;
  /** Maximum number of concurrent sessions opened on the source or sink to avoid overloading the data store. Type: integer (or Expression with resultType integer), minimum: 0. */
  parallelCopies?: Record<string, unknown>;
  /** Maximum number of data integration units that can be used to perform this data movement. Type: integer (or Expression with resultType integer), minimum: 0. */
  dataIntegrationUnits?: Record<string, unknown>;
  /** Whether to skip incompatible row. Default value is false. Type: boolean (or Expression with resultType boolean). */
  enableSkipIncompatibleRow?: Record<string, unknown>;
  /** Redirect incompatible row settings when EnableSkipIncompatibleRow is true. */
  redirectIncompatibleRowSettings?: RedirectIncompatibleRowSettings;
  /** (Deprecated. Please use LogSettings) Log storage settings customer need to provide when enabling session log. */
  logStorageSettings?: LogStorageSettings;
  /** Log settings customer needs provide when enabling log. */
  logSettings?: LogSettings;
  /** Preserve Rules. */
  preserveRules?: Array<Record<string, unknown>>;
  /** Preserve rules. */
  preserve?: Array<Record<string, unknown>>;
  /** Whether to enable Data Consistency validation. Type: boolean (or Expression with resultType boolean). */
  validateDataConsistency?: Record<string, unknown>;
  /** Specify the fault tolerance for data consistency. */
  skipErrorFile?: SkipErrorFile;
}

export type StagingSettings = StagingSettingsBase & StagingSettingsDictionary;

export interface StagingSettingsBase {
  /** Staging linked service reference. */
  linkedServiceName: LinkedServiceReference;
  /** The path to storage for storing the interim data. Type: string (or Expression with resultType string). */
  path?: Record<string, unknown>;
  /** Specifies whether to use compression when copying data via an interim staging. Default value is false. Type: boolean (or Expression with resultType boolean). */
  enableCompression?: Record<string, unknown>;
}

export type RedirectIncompatibleRowSettings = RedirectIncompatibleRowSettingsBase &
  RedirectIncompatibleRowSettingsDictionary;

export interface RedirectIncompatibleRowSettingsBase {
  /** Name of the Azure Storage, Storage SAS, or Azure Data Lake Store linked service used for redirecting incompatible row. Must be specified if redirectIncompatibleRowSettings is specified. Type: string (or Expression with resultType string). */
  linkedServiceName: Record<string, unknown>;
  /** The path for storing the redirect incompatible row data. Type: string (or Expression with resultType string). */
  path?: Record<string, unknown>;
}

export type LogStorageSettings = LogStorageSettingsBase &
  LogStorageSettingsDictionary;

export interface LogStorageSettingsBase {
  /** Log storage linked service reference. */
  linkedServiceName: LinkedServiceReference;
  /** The path to storage for storing detailed logs of activity execution. Type: string (or Expression with resultType string). */
  path?: Record<string, unknown>;
  /** Gets or sets the log level, support: Info, Warning. Type: string (or Expression with resultType string). */
  logLevel?: Record<string, unknown>;
  /** Specifies whether to enable reliable logging. Type: boolean (or Expression with resultType boolean). */
  enableReliableLogging?: Record<string, unknown>;
}

export interface LogSettings {
  /** Specifies whether to enable copy activity log. Type: boolean (or Expression with resultType boolean). */
  enableCopyActivityLog?: Record<string, unknown>;
  /** Specifies settings for copy activity log. */
  copyActivityLogSettings?: CopyActivityLogSettings;
  /** Log location settings customer needs to provide when enabling log. */
  logLocationSettings: LogLocationSettings;
}

export interface CopyActivityLogSettings {
  /** Gets or sets the log level, support: Info, Warning. Type: string (or Expression with resultType string). */
  logLevel?: Record<string, unknown>;
  /** Specifies whether to enable reliable logging. Type: boolean (or Expression with resultType boolean). */
  enableReliableLogging?: Record<string, unknown>;
}

export interface LogLocationSettings {
  /** Log storage linked service reference. */
  linkedServiceName: LinkedServiceReference;
  /** The path to storage for storing detailed logs of activity execution. Type: string (or Expression with resultType string). */
  path?: Record<string, unknown>;
}

export interface SkipErrorFile {
  /** Skip if file is deleted by other client during copy. Default is true. Type: boolean (or Expression with resultType boolean). */
  fileMissing?: Record<string, unknown>;
  /** Skip if source/sink file changed by other concurrent write. Default is false. Type: boolean (or Expression with resultType boolean). */
  dataInconsistency?: Record<string, unknown>;
}

export type BinarySource = BinarySourceBase & CopySource;

export interface BinarySourceBase {
  /** Binary store settings. */
  storeSettings?: StoreReadSettings;
  /** Binary format settings. */
  formatSettings?: BinaryReadSettings;
}

export type TabularSource = TabularSourceBase & CopySource;

export interface TabularSourceBase {
  /** Query timeout. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  queryTimeout?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type AzureTableSource = AzureTableSourceBase & TabularSource;

export interface AzureTableSourceBase {
  /** Azure Table source query. Type: string (or Expression with resultType string). */
  azureTableSourceQuery?: Record<string, unknown>;
  /** Azure Table source ignore table not found. Type: boolean (or Expression with resultType boolean). */
  azureTableSourceIgnoreTableNotFound?: Record<string, unknown>;
}

export type BlobSource = BlobSourceBase & CopySource;

export interface BlobSourceBase {
  /** Treat empty as null. Type: boolean (or Expression with resultType boolean). */
  treatEmptyAsNull?: Record<string, unknown>;
  /** Number of header lines to skip from each blob. Type: integer (or Expression with resultType integer). */
  skipHeaderLineCount?: Record<string, unknown>;
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
}

export type DocumentDbCollectionSource = DocumentDbCollectionSourceBase &
  CopySource;

export interface DocumentDbCollectionSourceBase {
  /** Documents query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** Nested properties separator. Type: string (or Expression with resultType string). */
  nestingSeparator?: Record<string, unknown>;
  /** Query timeout. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  queryTimeout?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type CosmosDbSqlApiSource = CosmosDbSqlApiSourceBase & CopySource;

export interface CosmosDbSqlApiSourceBase {
  /** SQL API query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** Page size of the result. Type: integer (or Expression with resultType integer). */
  pageSize?: Record<string, unknown>;
  /** Preferred regions. Type: array of strings (or Expression with resultType array of strings). */
  preferredRegions?: Record<string, unknown>;
  /** Whether detect primitive values as datetime values. Type: boolean (or Expression with resultType boolean). */
  detectDatetime?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type DynamicsSource = DynamicsSourceBase & CopySource;

export interface DynamicsSourceBase {
  /** FetchXML is a proprietary query language that is used in Microsoft Dynamics (online & on-premises). Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type DynamicsCrmSource = DynamicsCrmSourceBase & CopySource;

export interface DynamicsCrmSourceBase {
  /** FetchXML is a proprietary query language that is used in Microsoft Dynamics CRM (online & on-premises). Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type CommonDataServiceForAppsSource = CommonDataServiceForAppsSourceBase &
  CopySource;

export interface CommonDataServiceForAppsSourceBase {
  /** FetchXML is a proprietary query language that is used in Microsoft Common Data Service for Apps (online & on-premises). Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type RelationalSource = RelationalSourceBase & CopySource;

export interface RelationalSourceBase {
  /** Database query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type InformixSource = InformixSourceBase & TabularSource;

export interface InformixSourceBase {
  /** Database query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type MicrosoftAccessSource = MicrosoftAccessSourceBase & CopySource;

export interface MicrosoftAccessSourceBase {
  /** Database query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type Db2Source = Db2SourceBase & TabularSource;

export interface Db2SourceBase {
  /** Database query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type OdbcSource = OdbcSourceBase & TabularSource;

export interface OdbcSourceBase {
  /** Database query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type MySqlSource = MySqlSourceBase & TabularSource;

export interface MySqlSourceBase {
  /** Database query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type PostgreSqlSource = PostgreSqlSourceBase & TabularSource;

export interface PostgreSqlSourceBase {
  /** Database query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type SybaseSource = SybaseSourceBase & TabularSource;

export interface SybaseSourceBase {
  /** Database query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type SapBwSource = SapBwSourceBase & TabularSource;

export interface SapBwSourceBase {
  /** MDX query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type ODataSource = ODataSourceBase & CopySource;

export interface ODataSourceBase {
  /** OData query. For example, "$top=1". Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** The timeout (TimeSpan) to get an HTTP response. It is the timeout to get a response, not the timeout to read response data. Default value: 00:05:00. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  httpRequestTimeout?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type SalesforceSource = SalesforceSourceBase & TabularSource;

export interface SalesforceSourceBase {
  /** Database query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** The read behavior for the operation. Default is Query. */
  readBehavior?: "Query" | "QueryAll";
}

export type SalesforceServiceCloudSource = SalesforceServiceCloudSourceBase &
  CopySource;

export interface SalesforceServiceCloudSourceBase {
  /** Database query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** The read behavior for the operation. Default is Query. */
  readBehavior?: "Query" | "QueryAll";
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type SapCloudForCustomerSource = SapCloudForCustomerSourceBase &
  TabularSource;

export interface SapCloudForCustomerSourceBase {
  /** SAP Cloud for Customer OData query. For example, "$top=1". Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** The timeout (TimeSpan) to get an HTTP response. It is the timeout to get a response, not the timeout to read response data. Default value: 00:05:00. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  httpRequestTimeout?: Record<string, unknown>;
}

export type SapEccSource = SapEccSourceBase & TabularSource;

export interface SapEccSourceBase {
  /** SAP ECC OData query. For example, "$top=1". Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** The timeout (TimeSpan) to get an HTTP response. It is the timeout to get a response, not the timeout to read response data. Default value: 00:05:00. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  httpRequestTimeout?: Record<string, unknown>;
}

export type SapHanaSource = SapHanaSourceBase & TabularSource;

export interface SapHanaSourceBase {
  /** SAP HANA Sql query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** The packet size of data read from SAP HANA. Type: integer(or Expression with resultType integer). */
  packetSize?: Record<string, unknown>;
  /** The partition mechanism that will be used for SAP HANA read in parallel. */
  partitionOption?:
    | "None"
    | "PhysicalPartitionsOfTable"
    | "SapHanaDynamicRange";
  /** The settings that will be leveraged for SAP HANA source partitioning. */
  partitionSettings?: SapHanaPartitionSettings;
}

export interface SapHanaPartitionSettings {
  /** The name of the column that will be used for proceeding range partitioning. Type: string (or Expression with resultType string). */
  partitionColumnName?: Record<string, unknown>;
}

export type SapOpenHubSource = SapOpenHubSourceBase & TabularSource;

export interface SapOpenHubSourceBase {
  /** Whether to exclude the records of the last request. The default value is true. Type: boolean (or Expression with resultType boolean). */
  excludeLastRequest?: Record<string, unknown>;
  /** The ID of request for delta loading. Once it is set, only data with requestId larger than the value of this property will be retrieved. The default value is 0. Type: integer (or Expression with resultType integer ). */
  baseRequestId?: Record<string, unknown>;
  /** Specifies the custom RFC function module that will be used to read data from SAP Table. Type: string (or Expression with resultType string). */
  customRfcReadTableFunctionModule?: Record<string, unknown>;
  /** The single character that will be used as delimiter passed to SAP RFC as well as splitting the output data retrieved. Type: string (or Expression with resultType string). */
  sapDataColumnDelimiter?: Record<string, unknown>;
}

export type SapTableSource = SapTableSourceBase & TabularSource;

export interface SapTableSourceBase {
  /** The number of rows to be retrieved. Type: integer(or Expression with resultType integer). */
  rowCount?: Record<string, unknown>;
  /** The number of rows that will be skipped. Type: integer (or Expression with resultType integer). */
  rowSkips?: Record<string, unknown>;
  /** The fields of the SAP table that will be retrieved. For example, column0, column1. Type: string (or Expression with resultType string). */
  rfcTableFields?: Record<string, unknown>;
  /** The options for the filtering of the SAP Table. For example, COLUMN0 EQ SOME VALUE. Type: string (or Expression with resultType string). */
  rfcTableOptions?: Record<string, unknown>;
  /** Specifies the maximum number of rows that will be retrieved at a time when retrieving data from SAP Table. Type: integer (or Expression with resultType integer). */
  batchSize?: Record<string, unknown>;
  /** Specifies the custom RFC function module that will be used to read data from SAP Table. Type: string (or Expression with resultType string). */
  customRfcReadTableFunctionModule?: Record<string, unknown>;
  /** The single character that will be used as delimiter passed to SAP RFC as well as splitting the output data retrieved. Type: string (or Expression with resultType string). */
  sapDataColumnDelimiter?: Record<string, unknown>;
  /** The partition mechanism that will be used for SAP table read in parallel. */
  partitionOption?:
    | "None"
    | "PartitionOnInt"
    | "PartitionOnCalendarYear"
    | "PartitionOnCalendarMonth"
    | "PartitionOnCalendarDate"
    | "PartitionOnTime";
  /** The settings that will be leveraged for SAP table source partitioning. */
  partitionSettings?: SapTablePartitionSettings;
}

export interface SapTablePartitionSettings {
  /** The name of the column that will be used for proceeding range partitioning. Type: string (or Expression with resultType string). */
  partitionColumnName?: Record<string, unknown>;
  /** The maximum value of column specified in partitionColumnName that will be used for proceeding range partitioning. Type: string (or Expression with resultType string). */
  partitionUpperBound?: Record<string, unknown>;
  /** The minimum value of column specified in partitionColumnName that will be used for proceeding range partitioning. Type: string (or Expression with resultType string). */
  partitionLowerBound?: Record<string, unknown>;
  /** The maximum value of partitions the table will be split into. Type: integer (or Expression with resultType string). */
  maxPartitionsNumber?: Record<string, unknown>;
}

export type RestSink = RestSinkBase & CopySink;

export interface RestSinkBase {
  /** The HTTP method used to call the RESTful API. The default is POST. Type: string (or Expression with resultType string). */
  requestMethod?: Record<string, unknown>;
  /** The additional HTTP headers in the request to the RESTful API. Type: string (or Expression with resultType string). */
  additionalHeaders?: Record<string, unknown>;
  /** The timeout (TimeSpan) to get an HTTP response. It is the timeout to get a response, not the timeout to read response data. Default value: 00:01:40. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  httpRequestTimeout?: Record<string, unknown>;
  /** The time to await before sending next request, in milliseconds */
  requestInterval?: Record<string, unknown>;
  /** Http Compression Type to Send data in compressed format with Optimal Compression Level, Default is None. And The Only Supported option is Gzip. */
  httpCompressionType?: Record<string, unknown>;
}

export type RestSource = RestSourceBase & CopySource;

export interface RestSourceBase {
  /** The HTTP method used to call the RESTful API. The default is GET. Type: string (or Expression with resultType string). */
  requestMethod?: Record<string, unknown>;
  /** The HTTP request body to the RESTful API if requestMethod is POST. Type: string (or Expression with resultType string). */
  requestBody?: Record<string, unknown>;
  /** The additional HTTP headers in the request to the RESTful API. Type: string (or Expression with resultType string). */
  additionalHeaders?: Record<string, unknown>;
  /** The pagination rules to compose next page requests. Type: string (or Expression with resultType string). */
  paginationRules?: Record<string, unknown>;
  /** The timeout (TimeSpan) to get an HTTP response. It is the timeout to get a response, not the timeout to read response data. Default value: 00:01:40. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  httpRequestTimeout?: Record<string, unknown>;
  /** The time to await before sending next page request. */
  requestInterval?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type SqlSource = SqlSourceBase & TabularSource;

export interface SqlSourceBase {
  /** SQL reader query. Type: string (or Expression with resultType string). */
  sqlReaderQuery?: Record<string, unknown>;
  /** Name of the stored procedure for a SQL Database source. This cannot be used at the same time as SqlReaderQuery. Type: string (or Expression with resultType string). */
  sqlReaderStoredProcedureName?: Record<string, unknown>;
  /** Value and type setting for stored procedure parameters. Example: "{Parameter1: {value: "1", type: "int"}}". */
  storedProcedureParameters?: Record<string, StoredProcedureParameter>;
  /** Specifies the transaction locking behavior for the SQL source. Allowed values: ReadCommitted/ReadUncommitted/RepeatableRead/Serializable/Snapshot. The default value is ReadCommitted. Type: string (or Expression with resultType string). */
  isolationLevel?: Record<string, unknown>;
  /** The partition mechanism that will be used for Sql read in parallel. Possible values include: "None", "PhysicalPartitionsOfTable", "DynamicRange". */
  partitionOption?: Record<string, unknown>;
  /** The settings that will be leveraged for Sql source partitioning. */
  partitionSettings?: SqlPartitionSettings;
}

export interface StoredProcedureParameter {
  /** Stored procedure parameter value. Type: string (or Expression with resultType string). */
  value?: Record<string, unknown>;
  /** Stored procedure parameter type. */
  type?: "String" | "Int" | "Int64" | "Decimal" | "Guid" | "Boolean" | "Date";
}

export interface SqlPartitionSettings {
  /** The name of the column in integer or datetime type that will be used for proceeding partitioning. If not specified, the primary key of the table is auto-detected and used as the partition column. Type: string (or Expression with resultType string). */
  partitionColumnName?: Record<string, unknown>;
  /** The maximum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result will be partitioned and copied. Type: string (or Expression with resultType string). */
  partitionUpperBound?: Record<string, unknown>;
  /** The minimum value of the partition column for partition range splitting. This value is used to decide the partition stride, not for filtering the rows in table. All rows in the table or query result will be partitioned and copied. Type: string (or Expression with resultType string). */
  partitionLowerBound?: Record<string, unknown>;
}

export type SqlServerSource = SqlServerSourceBase & TabularSource;

export interface SqlServerSourceBase {
  /** SQL reader query. Type: string (or Expression with resultType string). */
  sqlReaderQuery?: Record<string, unknown>;
  /** Name of the stored procedure for a SQL Database source. This cannot be used at the same time as SqlReaderQuery. Type: string (or Expression with resultType string). */
  sqlReaderStoredProcedureName?: Record<string, unknown>;
  /** Value and type setting for stored procedure parameters. Example: "{Parameter1: {value: "1", type: "int"}}". */
  storedProcedureParameters?: Record<string, StoredProcedureParameter>;
  /** Which additional types to produce. */
  produceAdditionalTypes?: Record<string, unknown>;
  /** The partition mechanism that will be used for Sql read in parallel. Possible values include: "None", "PhysicalPartitionsOfTable", "DynamicRange". */
  partitionOption?: Record<string, unknown>;
  /** The settings that will be leveraged for Sql source partitioning. */
  partitionSettings?: SqlPartitionSettings;
}

export type AzureSqlSource = AzureSqlSourceBase & TabularSource;

export interface AzureSqlSourceBase {
  /** SQL reader query. Type: string (or Expression with resultType string). */
  sqlReaderQuery?: Record<string, unknown>;
  /** Name of the stored procedure for a SQL Database source. This cannot be used at the same time as SqlReaderQuery. Type: string (or Expression with resultType string). */
  sqlReaderStoredProcedureName?: Record<string, unknown>;
  /** Value and type setting for stored procedure parameters. Example: "{Parameter1: {value: "1", type: "int"}}". */
  storedProcedureParameters?: Record<string, StoredProcedureParameter>;
  /** Which additional types to produce. */
  produceAdditionalTypes?: Record<string, unknown>;
  /** The partition mechanism that will be used for Sql read in parallel. Possible values include: "None", "PhysicalPartitionsOfTable", "DynamicRange". */
  partitionOption?: Record<string, unknown>;
  /** The settings that will be leveraged for Sql source partitioning. */
  partitionSettings?: SqlPartitionSettings;
}

export type SqlMISource = SqlMISourceBase & TabularSource;

export interface SqlMISourceBase {
  /** SQL reader query. Type: string (or Expression with resultType string). */
  sqlReaderQuery?: Record<string, unknown>;
  /** Name of the stored procedure for a Azure SQL Managed Instance source. This cannot be used at the same time as SqlReaderQuery. Type: string (or Expression with resultType string). */
  sqlReaderStoredProcedureName?: Record<string, unknown>;
  /** Value and type setting for stored procedure parameters. Example: "{Parameter1: {value: "1", type: "int"}}". */
  storedProcedureParameters?: Record<string, StoredProcedureParameter>;
  /** Which additional types to produce. */
  produceAdditionalTypes?: Record<string, unknown>;
  /** The partition mechanism that will be used for Sql read in parallel. Possible values include: "None", "PhysicalPartitionsOfTable", "DynamicRange". */
  partitionOption?: Record<string, unknown>;
  /** The settings that will be leveraged for Sql source partitioning. */
  partitionSettings?: SqlPartitionSettings;
}

export type SqlDWSource = SqlDWSourceBase & TabularSource;

export interface SqlDWSourceBase {
  /** SQL Data Warehouse reader query. Type: string (or Expression with resultType string). */
  sqlReaderQuery?: Record<string, unknown>;
  /** Name of the stored procedure for a SQL Data Warehouse source. This cannot be used at the same time as SqlReaderQuery. Type: string (or Expression with resultType string). */
  sqlReaderStoredProcedureName?: Record<string, unknown>;
  /** Value and type setting for stored procedure parameters. Example: "{Parameter1: {value: "1", type: "int"}}". Type: object (or Expression with resultType object), itemType: StoredProcedureParameter. */
  storedProcedureParameters?: Record<string, unknown>;
  /** The partition mechanism that will be used for Sql read in parallel. Possible values include: "None", "PhysicalPartitionsOfTable", "DynamicRange". */
  partitionOption?: Record<string, unknown>;
  /** The settings that will be leveraged for Sql source partitioning. */
  partitionSettings?: SqlPartitionSettings;
}

export type FileSystemSource = FileSystemSourceBase & CopySource;

export interface FileSystemSourceBase {
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type HdfsSource = HdfsSourceBase & CopySource;

export interface HdfsSourceBase {
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
  /** Specifies Distcp-related settings. */
  distcpSettings?: DistcpSettings;
}

export type AzureMySqlSource = AzureMySqlSourceBase & TabularSource;

export interface AzureMySqlSourceBase {
  /** Database query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type AzureDataExplorerSource = AzureDataExplorerSourceBase & CopySource;

export interface AzureDataExplorerSourceBase {
  /** Database query. Should be a Kusto Query Language (KQL) query. Type: string (or Expression with resultType string). */
  query: Record<string, unknown>;
  /** The name of the Boolean option that controls whether truncation is applied to result-sets that go beyond a certain row-count limit. */
  noTruncation?: Record<string, unknown>;
  /** Query timeout. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])).. */
  queryTimeout?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type OracleSource = OracleSourceBase & CopySource;

export interface OracleSourceBase {
  /** Oracle reader query. Type: string (or Expression with resultType string). */
  oracleReaderQuery?: Record<string, unknown>;
  /** Query timeout. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  queryTimeout?: Record<string, unknown>;
  /** The partition mechanism that will be used for Oracle read in parallel. */
  partitionOption?: "None" | "PhysicalPartitionsOfTable" | "DynamicRange";
  /** The settings that will be leveraged for Oracle source partitioning. */
  partitionSettings?: OraclePartitionSettings;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export interface OraclePartitionSettings {
  /** Names of the physical partitions of Oracle table. */
  partitionNames?: Record<string, unknown>;
  /** The name of the column in integer type that will be used for proceeding range partitioning. Type: string (or Expression with resultType string). */
  partitionColumnName?: Record<string, unknown>;
  /** The maximum value of column specified in partitionColumnName that will be used for proceeding range partitioning. Type: string (or Expression with resultType string). */
  partitionUpperBound?: Record<string, unknown>;
  /** The minimum value of column specified in partitionColumnName that will be used for proceeding range partitioning. Type: string (or Expression with resultType string). */
  partitionLowerBound?: Record<string, unknown>;
}

export type TeradataSource = TeradataSourceBase & TabularSource;

export interface TeradataSourceBase {
  /** Teradata query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** The partition mechanism that will be used for teradata read in parallel. */
  partitionOption?: "None" | "Hash" | "DynamicRange";
  /** The settings that will be leveraged for teradata source partitioning. */
  partitionSettings?: TeradataPartitionSettings;
}

export interface TeradataPartitionSettings {
  /** The name of the column that will be used for proceeding range or hash partitioning. Type: string (or Expression with resultType string). */
  partitionColumnName?: Record<string, unknown>;
  /** The maximum value of column specified in partitionColumnName that will be used for proceeding range partitioning. Type: string (or Expression with resultType string). */
  partitionUpperBound?: Record<string, unknown>;
  /** The minimum value of column specified in partitionColumnName that will be used for proceeding range partitioning. Type: string (or Expression with resultType string). */
  partitionLowerBound?: Record<string, unknown>;
}

export type WebSource = WebSourceBase & CopySource;

export interface WebSourceBase {
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type CassandraSource = CassandraSourceBase & TabularSource;

export interface CassandraSourceBase {
  /** Database query. Should be a SQL-92 query expression or Cassandra Query Language (CQL) command. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** The consistency level specifies how many Cassandra servers must respond to a read request before returning data to the client application. Cassandra checks the specified number of Cassandra servers for data to satisfy the read request. Must be one of cassandraSourceReadConsistencyLevels. The default value is 'ONE'. It is case-insensitive. */
  consistencyLevel?:
    | "ALL"
    | "EACH_QUORUM"
    | "QUORUM"
    | "LOCAL_QUORUM"
    | "ONE"
    | "TWO"
    | "THREE"
    | "LOCAL_ONE"
    | "SERIAL"
    | "LOCAL_SERIAL";
}

export type MongoDbSource = MongoDbSourceBase & CopySource;

export interface MongoDbSourceBase {
  /** Database query. Should be a SQL-92 query expression. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type MongoDbAtlasSource = MongoDbAtlasSourceBase & CopySource;

export interface MongoDbAtlasSourceBase {
  /** Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}). Type: string (or Expression with resultType string). */
  filter?: Record<string, unknown>;
  /** Cursor methods for Mongodb query */
  cursorMethods?: MongoDbCursorMethodsProperties;
  /** Specifies the number of documents to return in each batch of the response from MongoDB Atlas instance. In most cases, modifying the batch size will not affect the user or the application. This property's main purpose is to avoid hit the limitation of response size. Type: integer (or Expression with resultType integer). */
  batchSize?: Record<string, unknown>;
  /** Query timeout. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  queryTimeout?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type MongoDbCursorMethodsProperties = MongoDbCursorMethodsPropertiesBase &
  MongoDbCursorMethodsPropertiesDictionary;

export interface MongoDbCursorMethodsPropertiesBase {
  /** Specifies the fields to return in the documents that match the query filter. To return all fields in the matching documents, omit this parameter. Type: string (or Expression with resultType string). */
  project?: Record<string, unknown>;
  /** Specifies the order in which the query returns matching documents. Type: string (or Expression with resultType string). Type: string (or Expression with resultType string). */
  sort?: Record<string, unknown>;
  /** Specifies the how many documents skipped and where MongoDB begins returning results. This approach may be useful in implementing paginated results. Type: integer (or Expression with resultType integer). */
  skip?: Record<string, unknown>;
  /** Specifies the maximum number of documents the server returns. limit() is analogous to the LIMIT statement in a SQL database. Type: integer (or Expression with resultType integer). */
  limit?: Record<string, unknown>;
}

export type MongoDbV2Source = MongoDbV2SourceBase & CopySource;

export interface MongoDbV2SourceBase {
  /** Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}). Type: string (or Expression with resultType string). */
  filter?: Record<string, unknown>;
  /** Cursor methods for Mongodb query */
  cursorMethods?: MongoDbCursorMethodsProperties;
  /** Specifies the number of documents to return in each batch of the response from MongoDB instance. In most cases, modifying the batch size will not affect the user or the application. This property's main purpose is to avoid hit the limitation of response size. Type: integer (or Expression with resultType integer). */
  batchSize?: Record<string, unknown>;
  /** Query timeout. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  queryTimeout?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type CosmosDbMongoDbApiSource = CosmosDbMongoDbApiSourceBase &
  CopySource;

export interface CosmosDbMongoDbApiSourceBase {
  /** Specifies selection filter using query operators. To return all documents in a collection, omit this parameter or pass an empty document ({}). Type: string (or Expression with resultType string). */
  filter?: Record<string, unknown>;
  /** Cursor methods for Mongodb query. */
  cursorMethods?: MongoDbCursorMethodsProperties;
  /** Specifies the number of documents to return in each batch of the response from MongoDB instance. In most cases, modifying the batch size will not affect the user or the application. This property's main purpose is to avoid hit the limitation of response size. Type: integer (or Expression with resultType integer). */
  batchSize?: Record<string, unknown>;
  /** Query timeout. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  queryTimeout?: Record<string, unknown>;
  /** Specifies the additional columns to be added to source data. Type: array of objects (or Expression with resultType array of objects). */
  additionalColumns?: Array<AdditionalColumns>;
}

export type Office365Source = Office365SourceBase & CopySource;

export interface Office365SourceBase {
  /** The groups containing all the users. Type: array of strings (or Expression with resultType array of strings). */
  allowedGroups?: Record<string, unknown>;
  /** The user scope uri. Type: string (or Expression with resultType string). */
  userScopeFilterUri?: Record<string, unknown>;
  /** The Column to apply the <paramref name="StartTime"/> and <paramref name="EndTime"/>. Type: string (or Expression with resultType string). */
  dateFilterColumn?: Record<string, unknown>;
  /** Start time of the requested range for this dataset. Type: string (or Expression with resultType string). */
  startTime?: Record<string, unknown>;
  /** End time of the requested range for this dataset. Type: string (or Expression with resultType string). */
  endTime?: Record<string, unknown>;
  /** The columns to be read out from the Office 365 table. Type: array of objects (or Expression with resultType array of objects). Example: [ { "name": "Id" }, { "name": "CreatedDateTime" } ] */
  outputColumns?: Record<string, unknown>;
}

export type AzureDataLakeStoreSource = AzureDataLakeStoreSourceBase &
  CopySource;

export interface AzureDataLakeStoreSourceBase {
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
}

export type AzureBlobFSSource = AzureBlobFSSourceBase & CopySource;

export interface AzureBlobFSSourceBase {
  /** Treat empty as null. Type: boolean (or Expression with resultType boolean). */
  treatEmptyAsNull?: Record<string, unknown>;
  /** Number of header lines to skip from each blob. Type: integer (or Expression with resultType integer). */
  skipHeaderLineCount?: Record<string, unknown>;
  /** If true, files under the folder path will be read recursively. Default is true. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
}

export type HttpSource = HttpSourceBase & CopySource;

export interface HttpSourceBase {
  /** Specifies the timeout for a HTTP client to get HTTP response from HTTP server. The default value is equivalent to System.Net.HttpWebRequest.Timeout. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  httpRequestTimeout?: Record<string, unknown>;
}

export type AmazonMWSSource = AmazonMWSSourceBase & TabularSource;

export interface AmazonMWSSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type AzurePostgreSqlSource = AzurePostgreSqlSourceBase & TabularSource;

export interface AzurePostgreSqlSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type AzurePostgreSqlSink = AzurePostgreSqlSinkBase & CopySink;

export interface AzurePostgreSqlSinkBase {
  /** A query to execute before starting the copy. Type: string (or Expression with resultType string). */
  preCopyScript?: Record<string, unknown>;
}

export type AzureMySqlSink = AzureMySqlSinkBase & CopySink;

export interface AzureMySqlSinkBase {
  /** A query to execute before starting the copy. Type: string (or Expression with resultType string). */
  preCopyScript?: Record<string, unknown>;
}

export type ConcurSource = ConcurSourceBase & TabularSource;

export interface ConcurSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type CouchbaseSource = CouchbaseSourceBase & TabularSource;

export interface CouchbaseSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type DrillSource = DrillSourceBase & TabularSource;

export interface DrillSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type EloquaSource = EloquaSourceBase & TabularSource;

export interface EloquaSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type GoogleBigQuerySource = GoogleBigQuerySourceBase & TabularSource;

export interface GoogleBigQuerySourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type GreenplumSource = GreenplumSourceBase & TabularSource;

export interface GreenplumSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type HBaseSource = HBaseSourceBase & TabularSource;

export interface HBaseSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type HiveSource = HiveSourceBase & TabularSource;

export interface HiveSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type HubspotSource = HubspotSourceBase & TabularSource;

export interface HubspotSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type ImpalaSource = ImpalaSourceBase & TabularSource;

export interface ImpalaSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type JiraSource = JiraSourceBase & TabularSource;

export interface JiraSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type MagentoSource = MagentoSourceBase & TabularSource;

export interface MagentoSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type MariaDBSource = MariaDBSourceBase & TabularSource;

export interface MariaDBSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type AzureMariaDBSource = AzureMariaDBSourceBase & TabularSource;

export interface AzureMariaDBSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type MarketoSource = MarketoSourceBase & TabularSource;

export interface MarketoSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type PaypalSource = PaypalSourceBase & TabularSource;

export interface PaypalSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type PhoenixSource = PhoenixSourceBase & TabularSource;

export interface PhoenixSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type PrestoSource = PrestoSourceBase & TabularSource;

export interface PrestoSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type QuickBooksSource = QuickBooksSourceBase & TabularSource;

export interface QuickBooksSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type ServiceNowSource = ServiceNowSourceBase & TabularSource;

export interface ServiceNowSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type ShopifySource = ShopifySourceBase & TabularSource;

export interface ShopifySourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type SparkSource = SparkSourceBase & TabularSource;

export interface SparkSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type SquareSource = SquareSourceBase & TabularSource;

export interface SquareSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type XeroSource = XeroSourceBase & TabularSource;

export interface XeroSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type ZohoSource = ZohoSourceBase & TabularSource;

export interface ZohoSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type NetezzaSource = NetezzaSourceBase & TabularSource;

export interface NetezzaSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** The partition mechanism that will be used for Netezza read in parallel. */
  partitionOption?: "None" | "DataSlice" | "DynamicRange";
  /** The settings that will be leveraged for Netezza source partitioning. */
  partitionSettings?: NetezzaPartitionSettings;
}

export interface NetezzaPartitionSettings {
  /** The name of the column in integer type that will be used for proceeding range partitioning. Type: string (or Expression with resultType string). */
  partitionColumnName?: Record<string, unknown>;
  /** The maximum value of column specified in partitionColumnName that will be used for proceeding range partitioning. Type: string (or Expression with resultType string). */
  partitionUpperBound?: Record<string, unknown>;
  /** The minimum value of column specified in partitionColumnName that will be used for proceeding range partitioning. Type: string (or Expression with resultType string). */
  partitionLowerBound?: Record<string, unknown>;
}

export type VerticaSource = VerticaSourceBase & TabularSource;

export interface VerticaSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type SalesforceMarketingCloudSource = SalesforceMarketingCloudSourceBase &
  TabularSource;

export interface SalesforceMarketingCloudSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type ResponsysSource = ResponsysSourceBase & TabularSource;

export interface ResponsysSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type DynamicsAXSource = DynamicsAXSourceBase & TabularSource;

export interface DynamicsAXSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** The timeout (TimeSpan) to get an HTTP response. It is the timeout to get a response, not the timeout to read response data. Default value: 00:05:00. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  httpRequestTimeout?: Record<string, unknown>;
}

export type OracleServiceCloudSource = OracleServiceCloudSourceBase &
  TabularSource;

export interface OracleServiceCloudSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type GoogleAdWordsSource = GoogleAdWordsSourceBase & TabularSource;

export interface GoogleAdWordsSourceBase {
  /** A query to retrieve data from source. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
}

export type AmazonRedshiftSource = AmazonRedshiftSourceBase & TabularSource;

export interface AmazonRedshiftSourceBase {
  /** Database query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** The Amazon S3 settings needed for the interim Amazon S3 when copying from Amazon Redshift with unload. With this, data from Amazon Redshift source will be unloaded into S3 first and then copied into the targeted sink from the interim S3. */
  redshiftUnloadSettings?: RedshiftUnloadSettings;
}

export interface RedshiftUnloadSettings {
  /** The name of the Amazon S3 linked service which will be used for the unload operation when copying from the Amazon Redshift source. */
  s3LinkedServiceName: LinkedServiceReference;
  /** The bucket of the interim Amazon S3 which will be used to store the unloaded data from Amazon Redshift source. The bucket must be in the same region as the Amazon Redshift source. Type: string (or Expression with resultType string). */
  bucketName: Record<string, unknown>;
}

export type SnowflakeSource = SnowflakeSourceBase & CopySource;

export interface SnowflakeSourceBase {
  /** Snowflake Sql query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** Snowflake export settings. */
  exportSettings?: SnowflakeExportCopyCommand;
}

export type ExportSettings = ExportSettingsBase & ExportSettingsDictionary;

export interface ExportSettingsBase {
  /** The export setting type. */
  type: string;
}

export type SnowflakeExportCopyCommand = SnowflakeExportCopyCommandBase &
  ExportSettings;

export interface SnowflakeExportCopyCommandBase {
  /** Additional copy options directly passed to snowflake Copy Command. Type: key value pairs (value should be string type) (or Expression with resultType object). Example: "additionalCopyOptions": { "DATE_FORMAT": "MM/DD/YYYY", "TIME_FORMAT": "'HH24:MI:SS.FF'" } */
  additionalCopyOptions?: Record<string, Record<string, unknown>>;
  /** Additional format options directly passed to snowflake Copy Command. Type: key value pairs (value should be string type) (or Expression with resultType object). Example: "additionalFormatOptions": { "OVERWRITE": "TRUE", "MAX_FILE_SIZE": "'FALSE'" } */
  additionalFormatOptions?: Record<string, Record<string, unknown>>;
}

export type AzureDatabricksDeltaLakeSource = AzureDatabricksDeltaLakeSourceBase &
  CopySource;

export interface AzureDatabricksDeltaLakeSourceBase {
  /** Azure Databricks Delta Lake Sql query. Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** Azure Databricks Delta Lake export settings. */
  exportSettings?: AzureDatabricksDeltaLakeExportCommand;
}

export type AzureDatabricksDeltaLakeExportCommand = AzureDatabricksDeltaLakeExportCommandBase &
  ExportSettings;

export interface AzureDatabricksDeltaLakeExportCommandBase {
  /** Specify the date format for the csv in Azure Databricks Delta Lake Copy. Type: string (or Expression with resultType string). */
  dateFormat?: Record<string, unknown>;
  /** Specify the timestamp format for the csv in Azure Databricks Delta Lake Copy. Type: string (or Expression with resultType string). */
  timestampFormat?: Record<string, unknown>;
}

export type AzureDatabricksDeltaLakeSink = AzureDatabricksDeltaLakeSinkBase &
  CopySink;

export interface AzureDatabricksDeltaLakeSinkBase {
  /** SQL pre-copy script. Type: string (or Expression with resultType string). */
  preCopyScript?: Record<string, unknown>;
  /** Azure Databricks Delta Lake import settings. */
  importSettings?: AzureDatabricksDeltaLakeImportCommand;
}

export type ImportSettings = ImportSettingsBase & ImportSettingsDictionary;

export interface ImportSettingsBase {
  /** The import setting type. */
  type: string;
}

export type AzureDatabricksDeltaLakeImportCommand = AzureDatabricksDeltaLakeImportCommandBase &
  ImportSettings;

export interface AzureDatabricksDeltaLakeImportCommandBase {
  /** Specify the date format for csv in Azure Databricks Delta Lake Copy. Type: string (or Expression with resultType string). */
  dateFormat?: Record<string, unknown>;
  /** Specify the timestamp format for csv in Azure Databricks Delta Lake Copy. Type: string (or Expression with resultType string). */
  timestampFormat?: Record<string, unknown>;
}

export type SapCloudForCustomerSink = SapCloudForCustomerSinkBase & CopySink;

export interface SapCloudForCustomerSinkBase {
  /** The write behavior for the operation. Default is 'Insert'. */
  writeBehavior?: "Insert" | "Update";
  /** The timeout (TimeSpan) to get an HTTP response. It is the timeout to get a response, not the timeout to read response data. Default value: 00:05:00. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  httpRequestTimeout?: Record<string, unknown>;
}

export type AzureQueueSink = AzureQueueSinkBase & CopySink;

export interface AzureQueueSinkBase {}

export type AzureTableSink = AzureTableSinkBase & CopySink;

export interface AzureTableSinkBase {
  /** Azure Table default partition key value. Type: string (or Expression with resultType string). */
  azureTableDefaultPartitionKeyValue?: Record<string, unknown>;
  /** Azure Table partition key name. Type: string (or Expression with resultType string). */
  azureTablePartitionKeyName?: Record<string, unknown>;
  /** Azure Table row key name. Type: string (or Expression with resultType string). */
  azureTableRowKeyName?: Record<string, unknown>;
  /** Azure Table insert type. Type: string (or Expression with resultType string). */
  azureTableInsertType?: Record<string, unknown>;
}

export type AvroSink = AvroSinkBase & CopySink;

export interface AvroSinkBase {
  /** Avro store settings. */
  storeSettings?: StoreWriteSettings;
  /** Avro format settings. */
  formatSettings?: AvroWriteSettings;
}

export type ParquetSink = ParquetSinkBase & CopySink;

export interface ParquetSinkBase {
  /** Parquet store settings. */
  storeSettings?: StoreWriteSettings;
  /** Parquet format settings. */
  formatSettings?: ParquetWriteSettings;
}

export type BinarySink = BinarySinkBase & CopySink;

export interface BinarySinkBase {
  /** Binary store settings. */
  storeSettings?: StoreWriteSettings;
}

export type BlobSink = BlobSinkBase & CopySink;

export interface BlobSinkBase {
  /** Blob writer overwrite files. Type: boolean (or Expression with resultType boolean). */
  blobWriterOverwriteFiles?: Record<string, unknown>;
  /** Blob writer date time format. Type: string (or Expression with resultType string). */
  blobWriterDateTimeFormat?: Record<string, unknown>;
  /** Blob writer add header. Type: boolean (or Expression with resultType boolean). */
  blobWriterAddHeader?: Record<string, unknown>;
  /** The type of copy behavior for copy sink. */
  copyBehavior?: Record<string, unknown>;
}

export type FileSystemSink = FileSystemSinkBase & CopySink;

export interface FileSystemSinkBase {
  /** The type of copy behavior for copy sink. */
  copyBehavior?: Record<string, unknown>;
}

export type DocumentDbCollectionSink = DocumentDbCollectionSinkBase & CopySink;

export interface DocumentDbCollectionSinkBase {
  /** Nested properties separator. Default is . (dot). Type: string (or Expression with resultType string). */
  nestingSeparator?: Record<string, unknown>;
  /** Describes how to write data to Azure Cosmos DB. Type: string (or Expression with resultType string). Allowed values: insert and upsert. */
  writeBehavior?: Record<string, unknown>;
}

export type CosmosDbSqlApiSink = CosmosDbSqlApiSinkBase & CopySink;

export interface CosmosDbSqlApiSinkBase {
  /** Describes how to write data to Azure Cosmos DB. Type: string (or Expression with resultType string). Allowed values: insert and upsert. */
  writeBehavior?: Record<string, unknown>;
}

export type SqlSink = SqlSinkBase & CopySink;

export interface SqlSinkBase {
  /** SQL writer stored procedure name. Type: string (or Expression with resultType string). */
  sqlWriterStoredProcedureName?: Record<string, unknown>;
  /** SQL writer table type. Type: string (or Expression with resultType string). */
  sqlWriterTableType?: Record<string, unknown>;
  /** SQL pre-copy script. Type: string (or Expression with resultType string). */
  preCopyScript?: Record<string, unknown>;
  /** SQL stored procedure parameters. */
  storedProcedureParameters?: Record<string, StoredProcedureParameter>;
  /** The stored procedure parameter name of the table type. Type: string (or Expression with resultType string). */
  storedProcedureTableTypeParameterName?: Record<string, unknown>;
  /** The option to handle sink table, such as autoCreate. For now only 'autoCreate' value is supported. Type: string (or Expression with resultType string). */
  tableOption?: Record<string, unknown>;
}

export type SqlServerSink = SqlServerSinkBase & CopySink;

export interface SqlServerSinkBase {
  /** SQL writer stored procedure name. Type: string (or Expression with resultType string). */
  sqlWriterStoredProcedureName?: Record<string, unknown>;
  /** SQL writer table type. Type: string (or Expression with resultType string). */
  sqlWriterTableType?: Record<string, unknown>;
  /** SQL pre-copy script. Type: string (or Expression with resultType string). */
  preCopyScript?: Record<string, unknown>;
  /** SQL stored procedure parameters. */
  storedProcedureParameters?: Record<string, StoredProcedureParameter>;
  /** The stored procedure parameter name of the table type. Type: string (or Expression with resultType string). */
  storedProcedureTableTypeParameterName?: Record<string, unknown>;
  /** The option to handle sink table, such as autoCreate. For now only 'autoCreate' value is supported. Type: string (or Expression with resultType string). */
  tableOption?: Record<string, unknown>;
}

export type AzureSqlSink = AzureSqlSinkBase & CopySink;

export interface AzureSqlSinkBase {
  /** SQL writer stored procedure name. Type: string (or Expression with resultType string). */
  sqlWriterStoredProcedureName?: Record<string, unknown>;
  /** SQL writer table type. Type: string (or Expression with resultType string). */
  sqlWriterTableType?: Record<string, unknown>;
  /** SQL pre-copy script. Type: string (or Expression with resultType string). */
  preCopyScript?: Record<string, unknown>;
  /** SQL stored procedure parameters. */
  storedProcedureParameters?: Record<string, StoredProcedureParameter>;
  /** The stored procedure parameter name of the table type. Type: string (or Expression with resultType string). */
  storedProcedureTableTypeParameterName?: Record<string, unknown>;
  /** The option to handle sink table, such as autoCreate. For now only 'autoCreate' value is supported. Type: string (or Expression with resultType string). */
  tableOption?: Record<string, unknown>;
}

export type SqlMISink = SqlMISinkBase & CopySink;

export interface SqlMISinkBase {
  /** SQL writer stored procedure name. Type: string (or Expression with resultType string). */
  sqlWriterStoredProcedureName?: Record<string, unknown>;
  /** SQL writer table type. Type: string (or Expression with resultType string). */
  sqlWriterTableType?: Record<string, unknown>;
  /** SQL pre-copy script. Type: string (or Expression with resultType string). */
  preCopyScript?: Record<string, unknown>;
  /** SQL stored procedure parameters. */
  storedProcedureParameters?: Record<string, StoredProcedureParameter>;
  /** The stored procedure parameter name of the table type. Type: string (or Expression with resultType string). */
  storedProcedureTableTypeParameterName?: Record<string, unknown>;
  /** The option to handle sink table, such as autoCreate. For now only 'autoCreate' value is supported. Type: string (or Expression with resultType string). */
  tableOption?: Record<string, unknown>;
}

export type SqlDWSink = SqlDWSinkBase & CopySink;

export interface SqlDWSinkBase {
  /** SQL pre-copy script. Type: string (or Expression with resultType string). */
  preCopyScript?: Record<string, unknown>;
  /** Indicates to use PolyBase to copy data into SQL Data Warehouse when applicable. Type: boolean (or Expression with resultType boolean). */
  allowPolyBase?: Record<string, unknown>;
  /** Specifies PolyBase-related settings when allowPolyBase is true. */
  polyBaseSettings?: PolybaseSettings;
  /** Indicates to use Copy Command to copy data into SQL Data Warehouse. Type: boolean (or Expression with resultType boolean). */
  allowCopyCommand?: Record<string, unknown>;
  /** Specifies Copy Command related settings when allowCopyCommand is true. */
  copyCommandSettings?: DWCopyCommandSettings;
  /** The option to handle sink table, such as autoCreate. For now only 'autoCreate' value is supported. Type: string (or Expression with resultType string). */
  tableOption?: Record<string, unknown>;
}

export type PolybaseSettings = PolybaseSettingsBase &
  PolybaseSettingsDictionary;

export interface PolybaseSettingsBase {
  /** Reject type. */
  rejectType?: "value" | "percentage";
  /** Specifies the value or the percentage of rows that can be rejected before the query fails. Type: number (or Expression with resultType number), minimum: 0. */
  rejectValue?: Record<string, unknown>;
  /** Determines the number of rows to attempt to retrieve before the PolyBase recalculates the percentage of rejected rows. Type: integer (or Expression with resultType integer), minimum: 0. */
  rejectSampleValue?: Record<string, unknown>;
  /** Specifies how to handle missing values in delimited text files when PolyBase retrieves data from the text file. Type: boolean (or Expression with resultType boolean). */
  useTypeDefault?: Record<string, unknown>;
}

export interface DWCopyCommandSettings {
  /** Specifies the default values for each target column in SQL DW. The default values in the property overwrite the DEFAULT constraint set in the DB, and identity column cannot have a default value. Type: array of objects (or Expression with resultType array of objects). */
  defaultValues?: Array<DWCopyCommandDefaultValue>;
  /** Additional options directly passed to SQL DW in Copy Command. Type: key value pairs (value should be string type) (or Expression with resultType object). Example: "additionalOptions": { "MAXERRORS": "1000", "DATEFORMAT": "'ymd'" } */
  additionalOptions?: Record<string, string>;
}

export interface DWCopyCommandDefaultValue {
  /** Column name. Type: object (or Expression with resultType string). */
  columnName?: Record<string, unknown>;
  /** The default value of the column. Type: object (or Expression with resultType string). */
  defaultValue?: Record<string, unknown>;
}

export type SnowflakeSink = SnowflakeSinkBase & CopySink;

export interface SnowflakeSinkBase {
  /** SQL pre-copy script. Type: string (or Expression with resultType string). */
  preCopyScript?: Record<string, unknown>;
  /** Snowflake import settings. */
  importSettings?: SnowflakeImportCopyCommand;
}

export type SnowflakeImportCopyCommand = SnowflakeImportCopyCommandBase &
  ImportSettings;

export interface SnowflakeImportCopyCommandBase {
  /** Additional copy options directly passed to snowflake Copy Command. Type: key value pairs (value should be string type) (or Expression with resultType object). Example: "additionalCopyOptions": { "DATE_FORMAT": "MM/DD/YYYY", "TIME_FORMAT": "'HH24:MI:SS.FF'" } */
  additionalCopyOptions?: Record<string, Record<string, unknown>>;
  /** Additional format options directly passed to snowflake Copy Command. Type: key value pairs (value should be string type) (or Expression with resultType object). Example: "additionalFormatOptions": { "FORCE": "TRUE", "LOAD_UNCERTAIN_FILES": "'FALSE'" } */
  additionalFormatOptions?: Record<string, Record<string, unknown>>;
}

export type OracleSink = OracleSinkBase & CopySink;

export interface OracleSinkBase {
  /** SQL pre-copy script. Type: string (or Expression with resultType string). */
  preCopyScript?: Record<string, unknown>;
}

export type AzureDataLakeStoreSink = AzureDataLakeStoreSinkBase & CopySink;

export interface AzureDataLakeStoreSinkBase {
  /** The type of copy behavior for copy sink. */
  copyBehavior?: Record<string, unknown>;
  /** Single File Parallel. */
  enableAdlsSingleFileParallel?: Record<string, unknown>;
}

export type AzureBlobFSSink = AzureBlobFSSinkBase & CopySink;

export interface AzureBlobFSSinkBase {
  /** The type of copy behavior for copy sink. */
  copyBehavior?: Record<string, unknown>;
}

export type AzureSearchIndexSink = AzureSearchIndexSinkBase & CopySink;

export interface AzureSearchIndexSinkBase {
  /** Specify the write behavior when upserting documents into Azure Search Index. */
  writeBehavior?: "Merge" | "Upload";
}

export type OdbcSink = OdbcSinkBase & CopySink;

export interface OdbcSinkBase {
  /** A query to execute before starting the copy. Type: string (or Expression with resultType string). */
  preCopyScript?: Record<string, unknown>;
}

export type InformixSink = InformixSinkBase & CopySink;

export interface InformixSinkBase {
  /** A query to execute before starting the copy. Type: string (or Expression with resultType string). */
  preCopyScript?: Record<string, unknown>;
}

export type MicrosoftAccessSink = MicrosoftAccessSinkBase & CopySink;

export interface MicrosoftAccessSinkBase {
  /** A query to execute before starting the copy. Type: string (or Expression with resultType string). */
  preCopyScript?: Record<string, unknown>;
}

export type DynamicsSink = DynamicsSinkBase & CopySink;

export interface DynamicsSinkBase {
  /** The write behavior for the operation. */
  writeBehavior: "Upsert";
  /** The flag indicating whether ignore null values from input dataset (except key fields) during write operation. Default is false. Type: boolean (or Expression with resultType boolean). */
  ignoreNullValues?: Record<string, unknown>;
  /** The logical name of the alternate key which will be used when upserting records. Type: string (or Expression with resultType string). */
  alternateKeyName?: Record<string, unknown>;
}

export type DynamicsCrmSink = DynamicsCrmSinkBase & CopySink;

export interface DynamicsCrmSinkBase {
  /** The write behavior for the operation. */
  writeBehavior: "Upsert";
  /** The flag indicating whether to ignore null values from input dataset (except key fields) during write operation. Default is false. Type: boolean (or Expression with resultType boolean). */
  ignoreNullValues?: Record<string, unknown>;
  /** The logical name of the alternate key which will be used when upserting records. Type: string (or Expression with resultType string). */
  alternateKeyName?: Record<string, unknown>;
}

export type CommonDataServiceForAppsSink = CommonDataServiceForAppsSinkBase &
  CopySink;

export interface CommonDataServiceForAppsSinkBase {
  /** The write behavior for the operation. */
  writeBehavior: "Upsert";
  /** The flag indicating whether to ignore null values from input dataset (except key fields) during write operation. Default is false. Type: boolean (or Expression with resultType boolean). */
  ignoreNullValues?: Record<string, unknown>;
  /** The logical name of the alternate key which will be used when upserting records. Type: string (or Expression with resultType string). */
  alternateKeyName?: Record<string, unknown>;
}

export type AzureDataExplorerSink = AzureDataExplorerSinkBase & CopySink;

export interface AzureDataExplorerSinkBase {
  /** A name of a pre-created csv mapping that was defined on the target Kusto table. Type: string. */
  ingestionMappingName?: Record<string, unknown>;
  /** An explicit column mapping description provided in a json format. Type: string. */
  ingestionMappingAsJson?: Record<string, unknown>;
  /** If set to true, any aggregation will be skipped. Default is false. Type: boolean. */
  flushImmediately?: Record<string, unknown>;
}

export type SalesforceSink = SalesforceSinkBase & CopySink;

export interface SalesforceSinkBase {
  /** The write behavior for the operation. Default is Insert. */
  writeBehavior?: "Insert" | "Upsert";
  /** The name of the external ID field for upsert operation. Default value is 'Id' column. Type: string (or Expression with resultType string). */
  externalIdFieldName?: Record<string, unknown>;
  /** The flag indicating whether or not to ignore null values from input dataset (except key fields) during write operation. Default value is false. If set it to true, it means ADF will leave the data in the destination object unchanged when doing upsert/update operation and insert defined default value when doing insert operation, versus ADF will update the data in the destination object to NULL when doing upsert/update operation and insert NULL value when doing insert operation. Type: boolean (or Expression with resultType boolean). */
  ignoreNullValues?: Record<string, unknown>;
}

export type SalesforceServiceCloudSink = SalesforceServiceCloudSinkBase &
  CopySink;

export interface SalesforceServiceCloudSinkBase {
  /** The write behavior for the operation. Default is Insert. */
  writeBehavior?: "Insert" | "Upsert";
  /** The name of the external ID field for upsert operation. Default value is 'Id' column. Type: string (or Expression with resultType string). */
  externalIdFieldName?: Record<string, unknown>;
  /** The flag indicating whether or not to ignore null values from input dataset (except key fields) during write operation. Default value is false. If set it to true, it means ADF will leave the data in the destination object unchanged when doing upsert/update operation and insert defined default value when doing insert operation, versus ADF will update the data in the destination object to NULL when doing upsert/update operation and insert NULL value when doing insert operation. Type: boolean (or Expression with resultType boolean). */
  ignoreNullValues?: Record<string, unknown>;
}

export type CosmosDbMongoDbApiSink = CosmosDbMongoDbApiSinkBase & CopySink;

export interface CosmosDbMongoDbApiSinkBase {
  /** Specifies whether the document with same key to be overwritten (upsert) rather than throw exception (insert). The default value is "insert". Type: string (or Expression with resultType string). Type: string (or Expression with resultType string). */
  writeBehavior?: Record<string, unknown>;
}

export type CopyTranslator = CopyTranslatorBase & CopyTranslatorDictionary;

export interface CopyTranslatorBase {
  /** Copy translator type. */
  type: string;
}

export type TabularTranslator = TabularTranslatorBase & CopyTranslator;

export interface TabularTranslatorBase {
  /** Column mappings. Example: "UserId: MyUserId, Group: MyGroup, Name: MyName" Type: string (or Expression with resultType string). This property will be retired. Please use mappings property. */
  columnMappings?: Record<string, unknown>;
  /** The schema mapping to map between tabular data and hierarchical data. Example: {"Column1": "$.Column1", "Column2": "$.Column2.Property1", "Column3": "$.Column2.Property2"}. Type: object (or Expression with resultType object). This property will be retired. Please use mappings property. */
  schemaMapping?: Record<string, unknown>;
  /** The JSON Path of the Nested Array that is going to do cross-apply. Type: object (or Expression with resultType object). */
  collectionReference?: Record<string, unknown>;
  /** Whether to map complex (array and object) values to simple strings in json format. Type: boolean (or Expression with resultType boolean). */
  mapComplexValuesToString?: Record<string, unknown>;
  /** Column mappings with logical types. Tabular->tabular example: [{"source":{"name":"CustomerName","type":"String"},"sink":{"name":"ClientName","type":"String"}},{"source":{"name":"CustomerAddress","type":"String"},"sink":{"name":"ClientAddress","type":"String"}}].  Hierarchical->tabular example: [{"source":{"path":"$.CustomerName","type":"String"},"sink":{"name":"ClientName","type":"String"}},{"source":{"path":"$.CustomerAddress","type":"String"},"sink":{"name":"ClientAddress","type":"String"}}]. Type: object (or Expression with resultType object). */
  mappings?: Record<string, unknown>;
  /** Whether to enable the advanced type conversion feature in the Copy activity. Type: boolean (or Expression with resultType boolean). */
  typeConversion?: Record<string, unknown>;
  /** Type conversion settings */
  typeConversionSettings?: TypeConversionSettings;
}

export interface TypeConversionSettings {
  /** Whether to allow data truncation when converting the data. Type: boolean (or Expression with resultType boolean). */
  allowDataTruncation?: Record<string, unknown>;
  /** Whether to treat boolean values as numbers. Type: boolean (or Expression with resultType boolean). */
  treatBooleanAsNumber?: Record<string, unknown>;
  /** The format for DateTime values. Type: string (or Expression with resultType string). */
  dateTimeFormat?: Record<string, unknown>;
  /** The format for DateTimeOffset values. Type: string (or Expression with resultType string). */
  dateTimeOffsetFormat?: Record<string, unknown>;
  /** The format for TimeSpan values. Type: string (or Expression with resultType string). */
  timeSpanFormat?: Record<string, unknown>;
  /** The culture used to convert data from/to string. Type: string (or Expression with resultType string). */
  culture?: Record<string, unknown>;
}

export type HDInsightHiveActivity = HDInsightHiveActivityBase &
  ExecutionActivity;

export interface HDInsightHiveActivityBase {
  /** HDInsight Hive activity properties. */
  typeProperties: HDInsightHiveActivityTypeProperties;
}

export interface HDInsightHiveActivityTypeProperties {
  /** Storage linked service references. */
  storageLinkedServices?: Array<LinkedServiceReference>;
  /** User specified arguments to HDInsightActivity. */
  arguments?: Array<Record<string, unknown>>;
  /** Debug info option. */
  getDebugInfo?: "None" | "Always" | "Failure";
  /** Script path. Type: string (or Expression with resultType string). */
  scriptPath?: Record<string, unknown>;
  /** Script linked service reference. */
  scriptLinkedService?: LinkedServiceReference;
  /** Allows user to specify defines for Hive job request. */
  defines?: Record<string, Record<string, unknown>>;
  /** User specified arguments under hivevar namespace. */
  variables?: Array<Record<string, unknown>>;
  /** Query timeout value (in minutes).  Effective when the HDInsight cluster is with ESP (Enterprise Security Package) */
  queryTimeout?: number;
}

export type HDInsightPigActivity = HDInsightPigActivityBase & ExecutionActivity;

export interface HDInsightPigActivityBase {
  /** HDInsight Pig activity properties. */
  typeProperties: HDInsightPigActivityTypeProperties;
}

export interface HDInsightPigActivityTypeProperties {
  /** Storage linked service references. */
  storageLinkedServices?: Array<LinkedServiceReference>;
  /** User specified arguments to HDInsightActivity. Type: array (or Expression with resultType array). */
  arguments?: Record<string, unknown>;
  /** Debug info option. */
  getDebugInfo?: "None" | "Always" | "Failure";
  /** Script path. Type: string (or Expression with resultType string). */
  scriptPath?: Record<string, unknown>;
  /** Script linked service reference. */
  scriptLinkedService?: LinkedServiceReference;
  /** Allows user to specify defines for Pig job request. */
  defines?: Record<string, Record<string, unknown>>;
}

export type HDInsightMapReduceActivity = HDInsightMapReduceActivityBase &
  ExecutionActivity;

export interface HDInsightMapReduceActivityBase {
  /** HDInsight MapReduce activity properties. */
  typeProperties: HDInsightMapReduceActivityTypeProperties;
}

export interface HDInsightMapReduceActivityTypeProperties {
  /** Storage linked service references. */
  storageLinkedServices?: Array<LinkedServiceReference>;
  /** User specified arguments to HDInsightActivity. */
  arguments?: Array<Record<string, unknown>>;
  /** Debug info option. */
  getDebugInfo?: "None" | "Always" | "Failure";
  /** Class name. Type: string (or Expression with resultType string). */
  className: Record<string, unknown>;
  /** Jar path. Type: string (or Expression with resultType string). */
  jarFilePath: Record<string, unknown>;
  /** Jar linked service reference. */
  jarLinkedService?: LinkedServiceReference;
  /** Jar libs. */
  jarLibs?: Array<Record<string, unknown>>;
  /** Allows user to specify defines for the MapReduce job request. */
  defines?: Record<string, Record<string, unknown>>;
}

export type HDInsightStreamingActivity = HDInsightStreamingActivityBase &
  ExecutionActivity;

export interface HDInsightStreamingActivityBase {
  /** HDInsight streaming activity properties. */
  typeProperties: HDInsightStreamingActivityTypeProperties;
}

export interface HDInsightStreamingActivityTypeProperties {
  /** Storage linked service references. */
  storageLinkedServices?: Array<LinkedServiceReference>;
  /** User specified arguments to HDInsightActivity. */
  arguments?: Array<Record<string, unknown>>;
  /** Debug info option. */
  getDebugInfo?: "None" | "Always" | "Failure";
  /** Mapper executable name. Type: string (or Expression with resultType string). */
  mapper: Record<string, unknown>;
  /** Reducer executable name. Type: string (or Expression with resultType string). */
  reducer: Record<string, unknown>;
  /** Input blob path. Type: string (or Expression with resultType string). */
  input: Record<string, unknown>;
  /** Output blob path. Type: string (or Expression with resultType string). */
  output: Record<string, unknown>;
  /** Paths to streaming job files. Can be directories. */
  filePaths: Array<Record<string, unknown>>;
  /** Linked service reference where the files are located. */
  fileLinkedService?: LinkedServiceReference;
  /** Combiner executable name. Type: string (or Expression with resultType string). */
  combiner?: Record<string, unknown>;
  /** Command line environment values. */
  commandEnvironment?: Array<Record<string, unknown>>;
  /** Allows user to specify defines for streaming job request. */
  defines?: Record<string, Record<string, unknown>>;
}

export type HDInsightSparkActivity = HDInsightSparkActivityBase &
  ExecutionActivity;

export interface HDInsightSparkActivityBase {
  /** HDInsight spark activity properties. */
  typeProperties: HDInsightSparkActivityTypeProperties;
}

export interface HDInsightSparkActivityTypeProperties {
  /** The root path in 'sparkJobLinkedService' for all the job’s files. Type: string (or Expression with resultType string). */
  rootPath: Record<string, unknown>;
  /** The relative path to the root folder of the code/package to be executed. Type: string (or Expression with resultType string). */
  entryFilePath: Record<string, unknown>;
  /** The user-specified arguments to HDInsightSparkActivity. */
  arguments?: Array<Record<string, unknown>>;
  /** Debug info option. */
  getDebugInfo?: "None" | "Always" | "Failure";
  /** The storage linked service for uploading the entry file and dependencies, and for receiving logs. */
  sparkJobLinkedService?: LinkedServiceReference;
  /** The application's Java/Spark main class. */
  className?: string;
  /** The user to impersonate that will execute the job. Type: string (or Expression with resultType string). */
  proxyUser?: Record<string, unknown>;
  /** Spark configuration property. */
  sparkConfig?: Record<string, Record<string, unknown>>;
}

export type ExecuteSsisPackageActivity = ExecuteSsisPackageActivityBase &
  ExecutionActivity;

export interface ExecuteSsisPackageActivityBase {
  /** Execute SSIS package activity properties. */
  typeProperties: ExecuteSsisPackageActivityTypeProperties;
}

export interface ExecuteSsisPackageActivityTypeProperties {
  /** SSIS package location. */
  packageLocation: SsisPackageLocation;
  /** Specifies the runtime to execute SSIS package. The value should be "x86" or "x64". Type: string (or Expression with resultType string). */
  runtime?: Record<string, unknown>;
  /** The logging level of SSIS package execution. Type: string (or Expression with resultType string). */
  loggingLevel?: Record<string, unknown>;
  /** The environment path to execute the SSIS package. Type: string (or Expression with resultType string). */
  environmentPath?: Record<string, unknown>;
  /** The package execution credential. */
  executionCredential?: SsisExecutionCredential;
  /** The integration runtime reference. */
  connectVia: IntegrationRuntimeReference;
  /** The project level parameters to execute the SSIS package. */
  projectParameters?: Record<string, SsisExecutionParameter>;
  /** The package level parameters to execute the SSIS package. */
  packageParameters?: Record<string, SsisExecutionParameter>;
  /** The project level connection managers to execute the SSIS package. */
  projectConnectionManagers?: Record<
    string,
    Record<string, SsisExecutionParameter>
  >;
  /** The package level connection managers to execute the SSIS package. */
  packageConnectionManagers?: Record<
    string,
    Record<string, SsisExecutionParameter>
  >;
  /** The property overrides to execute the SSIS package. */
  propertyOverrides?: Record<string, SsisPropertyOverride>;
  /** SSIS package execution log location. */
  logLocation?: SsisLogLocation;
}

export interface SsisPackageLocation {
  /** The SSIS package path. Type: string (or Expression with resultType string). */
  packagePath?: Record<string, unknown>;
  /** The type of SSIS package location. */
  type?: "SSISDB" | "File" | "InlinePackage" | "PackageStore";
  /** SSIS package location properties. */
  typeProperties?: SsisPackageLocationTypeProperties;
}

export interface SsisPackageLocationTypeProperties {
  /** Password of the package. */
  packagePassword?: SecretBase;
  /** The package access credential. */
  accessCredential?: SsisAccessCredential;
  /** The configuration file of the package execution. Type: string (or Expression with resultType string). */
  configurationPath?: Record<string, unknown>;
  /** The configuration file access credential. */
  configurationAccessCredential?: SsisAccessCredential;
  /** The package name. */
  packageName?: string;
  /** The embedded package content. Type: string (or Expression with resultType string). */
  packageContent?: Record<string, unknown>;
  /** The embedded package last modified date. */
  packageLastModifiedDate?: string;
  /** The embedded child package list. */
  childPackages?: Array<SsisChildPackage>;
}

export interface SsisAccessCredential {
  /** Domain for windows authentication. */
  domain: Record<string, unknown>;
  /** UseName for windows authentication. */
  userName: Record<string, unknown>;
  /** Password for windows authentication. */
  password: SecretBase;
}

export interface SsisChildPackage {
  /** Path for embedded child package. Type: string (or Expression with resultType string). */
  packagePath: Record<string, unknown>;
  /** Name for embedded child package. */
  packageName?: string;
  /** Content for embedded child package. Type: string (or Expression with resultType string). */
  packageContent: Record<string, unknown>;
  /** Last modified date for embedded child package. */
  packageLastModifiedDate?: string;
}

export interface SsisExecutionCredential {
  /** Domain for windows authentication. */
  domain: Record<string, unknown>;
  /** UseName for windows authentication. */
  userName: Record<string, unknown>;
  /** Password for windows authentication. */
  password: SecureString;
}

export interface SsisExecutionParameter {
  /** SSIS package execution parameter value. Type: string (or Expression with resultType string). */
  value: Record<string, unknown>;
}

export interface SsisPropertyOverride {
  /** SSIS package property override value. Type: string (or Expression with resultType string). */
  value: Record<string, unknown>;
  /** Whether SSIS package property override value is sensitive data. Value will be encrypted in SSISDB if it is true */
  isSensitive?: boolean;
}

export interface SsisLogLocation {
  /** The SSIS package execution log path. Type: string (or Expression with resultType string). */
  logPath: Record<string, unknown>;
  /** The type of SSIS log location. */
  type: "File";
  /** SSIS package execution log location properties. */
  typeProperties: SsisLogLocationTypeProperties;
}

export interface SsisLogLocationTypeProperties {
  /** The package execution log access credential. */
  accessCredential?: SsisAccessCredential;
  /** Specifies the interval to refresh log. The default interval is 5 minutes. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  logRefreshInterval?: Record<string, unknown>;
}

export type CustomActivity = CustomActivityBase & ExecutionActivity;

export interface CustomActivityBase {
  /** Custom activity properties. */
  typeProperties: CustomActivityTypeProperties;
}

export interface CustomActivityTypeProperties {
  /** Command for custom activity Type: string (or Expression with resultType string). */
  command: Record<string, unknown>;
  /** Resource linked service reference. */
  resourceLinkedService?: LinkedServiceReference;
  /** Folder path for resource files Type: string (or Expression with resultType string). */
  folderPath?: Record<string, unknown>;
  /** Reference objects */
  referenceObjects?: CustomActivityReferenceObject;
  /** User defined property bag. There is no restriction on the keys or values that can be used. The user specified custom activity has the full responsibility to consume and interpret the content defined. */
  extendedProperties?: Record<string, Record<string, unknown>>;
  /** The retention time for the files submitted for custom activity. Type: double (or Expression with resultType double). */
  retentionTimeInDays?: Record<string, unknown>;
  /** Elevation level and scope for the user, default is nonadmin task. Type: string (or Expression with resultType double). */
  autoUserSpecification?: Record<string, unknown>;
}

export interface CustomActivityReferenceObject {
  /** Linked service references. */
  linkedServices?: Array<LinkedServiceReference>;
  /** Dataset references. */
  datasets?: Array<DatasetReference>;
}

export type SqlServerStoredProcedureActivity = SqlServerStoredProcedureActivityBase &
  ExecutionActivity;

export interface SqlServerStoredProcedureActivityBase {
  /** SQL stored procedure activity properties. */
  typeProperties: SqlServerStoredProcedureActivityTypeProperties;
}

export interface SqlServerStoredProcedureActivityTypeProperties {
  /** Stored procedure name. Type: string (or Expression with resultType string). */
  storedProcedureName: Record<string, unknown>;
  /** Value and type setting for stored procedure parameters. Example: "{Parameter1: {value: "1", type: "int"}}". */
  storedProcedureParameters?: Record<string, StoredProcedureParameter>;
}

export type ExecutePipelineActivity = ExecutePipelineActivityBase &
  ControlActivity;

export interface ExecutePipelineActivityBase {
  /** Execute pipeline activity properties. */
  typeProperties: ExecutePipelineActivityTypeProperties;
}

export interface ExecutePipelineActivityTypeProperties {
  /** Pipeline reference. */
  pipeline: PipelineReference;
  /** Pipeline parameters. */
  parameters?: Record<string, Record<string, unknown>>;
  /** Defines whether activity execution will wait for the dependent pipeline execution to finish. Default is false. */
  waitOnCompletion?: boolean;
}

export type DeleteActivity = DeleteActivityBase & ExecutionActivity;

export interface DeleteActivityBase {
  /** Delete activity properties. */
  typeProperties: DeleteActivityTypeProperties;
}

export interface DeleteActivityTypeProperties {
  /** If true, files or sub-folders under current folder path will be deleted recursively. Default is false. Type: boolean (or Expression with resultType boolean). */
  recursive?: Record<string, unknown>;
  /** The max concurrent connections to connect data source at the same time. */
  maxConcurrentConnections?: number;
  /** Whether to record detailed logs of delete-activity execution. Default value is false. Type: boolean (or Expression with resultType boolean). */
  enableLogging?: Record<string, unknown>;
  /** Log storage settings customer need to provide when enableLogging is true. */
  logStorageSettings?: LogStorageSettings;
  /** Delete activity dataset reference. */
  dataset: DatasetReference;
  /** Delete activity store settings. */
  storeSettings?: StoreReadSettings;
}

export type AzureDataExplorerCommandActivity = AzureDataExplorerCommandActivityBase &
  ExecutionActivity;

export interface AzureDataExplorerCommandActivityBase {
  /** Azure Data Explorer command activity properties. */
  typeProperties: AzureDataExplorerCommandActivityTypeProperties;
}

export interface AzureDataExplorerCommandActivityTypeProperties {
  /** A control command, according to the Azure Data Explorer command syntax. Type: string (or Expression with resultType string). */
  command: Record<string, unknown>;
  /** Control command timeout. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9]))..) */
  commandTimeout?: Record<string, unknown>;
}

export type LookupActivity = LookupActivityBase & ExecutionActivity;

export interface LookupActivityBase {
  /** Lookup activity properties. */
  typeProperties: LookupActivityTypeProperties;
}

export interface LookupActivityTypeProperties {
  /** Dataset-specific source properties, same as copy activity source. */
  source: CopySource;
  /** Lookup activity dataset reference. */
  dataset: DatasetReference;
  /** Whether to return first row or all rows. Default value is true. Type: boolean (or Expression with resultType boolean). */
  firstRowOnly?: Record<string, unknown>;
}

export type WebActivity = WebActivityBase & ExecutionActivity;

export interface WebActivityBase {
  /** Web activity properties. */
  typeProperties: WebActivityTypeProperties;
}

export interface WebActivityTypeProperties {
  /** Rest API method for target endpoint. */
  method: "GET" | "POST" | "PUT" | "DELETE";
  /** Web activity target endpoint and path. Type: string (or Expression with resultType string). */
  url: Record<string, unknown>;
  /** Represents the headers that will be sent to the request. For example, to set the language and type on a request: "headers" : { "Accept-Language": "en-us", "Content-Type": "application/json" }. Type: string (or Expression with resultType string). */
  headers?: Record<string, unknown>;
  /** Represents the payload that will be sent to the endpoint. Required for POST/PUT method, not allowed for GET method Type: string (or Expression with resultType string). */
  body?: Record<string, unknown>;
  /** Authentication method used for calling the endpoint. */
  authentication?: WebActivityAuthentication;
  /** List of datasets passed to web endpoint. */
  datasets?: Array<DatasetReference>;
  /** List of linked services passed to web endpoint. */
  linkedServices?: Array<LinkedServiceReference>;
  /** The integration runtime reference. */
  connectVia?: IntegrationRuntimeReference;
}

export interface WebActivityAuthentication {
  /** Web activity authentication (Basic/ClientCertificate/MSI) */
  type: string;
  /** Base64-encoded contents of a PFX file. */
  pfx?: SecretBase;
  /** Web activity authentication user name for basic authentication. */
  username?: string;
  /** Password for the PFX file or basic authentication. */
  password?: SecretBase;
  /** Resource for which Azure Auth token will be requested when using MSI Authentication. */
  resource?: string;
}

export type GetMetadataActivity = GetMetadataActivityBase & ExecutionActivity;

export interface GetMetadataActivityBase {
  /** GetMetadata activity properties. */
  typeProperties: GetMetadataActivityTypeProperties;
}

export interface GetMetadataActivityTypeProperties {
  /** GetMetadata activity dataset reference. */
  dataset: DatasetReference;
  /** Fields of metadata to get from dataset. */
  fieldList?: Array<Record<string, unknown>>;
  /** GetMetadata activity store settings. */
  storeSettings?: StoreReadSettings;
  /** GetMetadata activity format settings. */
  formatSettings?: FormatReadSettings;
}

export type IfConditionActivity = IfConditionActivityBase & ControlActivity;

export interface IfConditionActivityBase {
  /** IfCondition activity properties. */
  typeProperties: IfConditionActivityTypeProperties;
}

export interface IfConditionActivityTypeProperties {
  /** An expression that would evaluate to Boolean. This is used to determine the block of activities (ifTrueActivities or ifFalseActivities) that will be executed. */
  expression: Expression;
  /** List of activities to execute if expression is evaluated to true. This is an optional property and if not provided, the activity will exit without any action. */
  ifTrueActivities?: Array<Activity>;
  /** List of activities to execute if expression is evaluated to false. This is an optional property and if not provided, the activity will exit without any action. */
  ifFalseActivities?: Array<Activity>;
}

export type SwitchActivity = SwitchActivityBase & ControlActivity;

export interface SwitchActivityBase {
  /** Switch activity properties. */
  typeProperties: SwitchActivityTypeProperties;
}

export interface SwitchActivityTypeProperties {
  /** An expression that would evaluate to a string or integer. This is used to determine the block of activities in cases that will be executed. */
  on: Expression;
  /** List of cases that correspond to expected values of the 'on' property. This is an optional property and if not provided, the activity will execute activities provided in defaultActivities. */
  cases?: Array<SwitchCase>;
  /** List of activities to execute if no case condition is satisfied. This is an optional property and if not provided, the activity will exit without any action. */
  defaultActivities?: Array<Activity>;
}

export interface SwitchCase {
  /** Expected value that satisfies the expression result of the 'on' property. */
  value?: string;
  /** List of activities to execute for satisfied case condition. */
  activities?: Array<Activity>;
}

export type ForEachActivity = ForEachActivityBase & ControlActivity;

export interface ForEachActivityBase {
  /** ForEach activity properties. */
  typeProperties: ForEachActivityTypeProperties;
}

export interface ForEachActivityTypeProperties {
  /** Should the loop be executed in sequence or in parallel (max 50) */
  isSequential?: boolean;
  /** Batch count to be used for controlling the number of parallel execution (when isSequential is set to false). */
  batchCount?: number;
  /** Collection to iterate. */
  items: Expression;
  /** List of activities to execute . */
  activities: Array<Activity>;
}

export type AzureMLBatchExecutionActivity = AzureMLBatchExecutionActivityBase &
  ExecutionActivity;

export interface AzureMLBatchExecutionActivityBase {
  /** Azure ML Batch Execution activity properties. */
  typeProperties: AzureMLBatchExecutionActivityTypeProperties;
}

export interface AzureMLBatchExecutionActivityTypeProperties {
  /** Key,Value pairs to be passed to the Azure ML Batch Execution Service endpoint. Keys must match the names of web service parameters defined in the published Azure ML web service. Values will be passed in the GlobalParameters property of the Azure ML batch execution request. */
  globalParameters?: Record<string, Record<string, unknown>>;
  /** Key,Value pairs, mapping the names of Azure ML endpoint's Web Service Outputs to AzureMLWebServiceFile objects specifying the output Blob locations. This information will be passed in the WebServiceOutputs property of the Azure ML batch execution request. */
  webServiceOutputs?: Record<string, AzureMLWebServiceFile>;
  /** Key,Value pairs, mapping the names of Azure ML endpoint's Web Service Inputs to AzureMLWebServiceFile objects specifying the input Blob locations.. This information will be passed in the WebServiceInputs property of the Azure ML batch execution request. */
  webServiceInputs?: Record<string, AzureMLWebServiceFile>;
}

export interface AzureMLWebServiceFile {
  /** The relative file path, including container name, in the Azure Blob Storage specified by the LinkedService. Type: string (or Expression with resultType string). */
  filePath: Record<string, unknown>;
  /** Reference to an Azure Storage LinkedService, where Azure ML WebService Input/Output file located. */
  linkedServiceName: LinkedServiceReference;
}

export type AzureMLUpdateResourceActivity = AzureMLUpdateResourceActivityBase &
  ExecutionActivity;

export interface AzureMLUpdateResourceActivityBase {
  /** Azure ML Update Resource management activity properties. */
  typeProperties: AzureMLUpdateResourceActivityTypeProperties;
}

export interface AzureMLUpdateResourceActivityTypeProperties {
  /** Name of the Trained Model module in the Web Service experiment to be updated. Type: string (or Expression with resultType string). */
  trainedModelName: Record<string, unknown>;
  /** Name of Azure Storage linked service holding the .ilearner file that will be uploaded by the update operation. */
  trainedModelLinkedServiceName: LinkedServiceReference;
  /** The relative file path in trainedModelLinkedService to represent the .ilearner file that will be uploaded by the update operation.  Type: string (or Expression with resultType string). */
  trainedModelFilePath: Record<string, unknown>;
}

export type AzureMLExecutePipelineActivity = AzureMLExecutePipelineActivityBase &
  ExecutionActivity;

export interface AzureMLExecutePipelineActivityBase {
  /** Azure ML Execute Pipeline activity properties. */
  typeProperties: AzureMLExecutePipelineActivityTypeProperties;
}

export interface AzureMLExecutePipelineActivityTypeProperties {
  /** ID of the published Azure ML pipeline. Type: string (or Expression with resultType string). */
  mlPipelineId: Record<string, unknown>;
  /** Run history experiment name of the pipeline run. This information will be passed in the ExperimentName property of the published pipeline execution request. Type: string (or Expression with resultType string). */
  experimentName?: Record<string, unknown>;
  /** Key,Value pairs to be passed to the published Azure ML pipeline endpoint. Keys must match the names of pipeline parameters defined in the published pipeline. Values will be passed in the ParameterAssignments property of the published pipeline execution request. Type: object with key value pairs (or Expression with resultType object). */
  mlPipelineParameters?: Record<string, unknown>;
  /** The parent Azure ML Service pipeline run id. This information will be passed in the ParentRunId property of the published pipeline execution request. Type: string (or Expression with resultType string). */
  mlParentRunId?: Record<string, unknown>;
  /** Whether to continue execution of other steps in the PipelineRun if a step fails. This information will be passed in the continueOnStepFailure property of the published pipeline execution request. Type: boolean (or Expression with resultType boolean). */
  continueOnStepFailure?: Record<string, unknown>;
}

export type DataLakeAnalyticsUsqlActivity = DataLakeAnalyticsUsqlActivityBase &
  ExecutionActivity;

export interface DataLakeAnalyticsUsqlActivityBase {
  /** Data Lake Analytics U-SQL activity properties. */
  typeProperties: DataLakeAnalyticsUsqlActivityTypeProperties;
}

export interface DataLakeAnalyticsUsqlActivityTypeProperties {
  /** Case-sensitive path to folder that contains the U-SQL script. Type: string (or Expression with resultType string). */
  scriptPath: Record<string, unknown>;
  /** Script linked service reference. */
  scriptLinkedService: LinkedServiceReference;
  /** The maximum number of nodes simultaneously used to run the job. Default value is 1. Type: integer (or Expression with resultType integer), minimum: 1. */
  degreeOfParallelism?: Record<string, unknown>;
  /** Determines which jobs out of all that are queued should be selected to run first. The lower the number, the higher the priority. Default value is 1000. Type: integer (or Expression with resultType integer), minimum: 1. */
  priority?: Record<string, unknown>;
  /** Parameters for U-SQL job request. */
  parameters?: Record<string, Record<string, unknown>>;
  /** Runtime version of the U-SQL engine to use. Type: string (or Expression with resultType string). */
  runtimeVersion?: Record<string, unknown>;
  /** Compilation mode of U-SQL. Must be one of these values : Semantic, Full and SingleBox. Type: string (or Expression with resultType string). */
  compilationMode?: Record<string, unknown>;
}

export type WaitActivity = WaitActivityBase & ControlActivity;

export interface WaitActivityBase {
  /** Wait activity properties. */
  typeProperties: WaitActivityTypeProperties;
}

export interface WaitActivityTypeProperties {
  /** Duration in seconds. */
  waitTimeInSeconds: Record<string, unknown>;
}

export type UntilActivity = UntilActivityBase & ControlActivity;

export interface UntilActivityBase {
  /** Until activity properties. */
  typeProperties: UntilActivityTypeProperties;
}

export interface UntilActivityTypeProperties {
  /** An expression that would evaluate to Boolean. The loop will continue until this expression evaluates to true */
  expression: Expression;
  /** Specifies the timeout for the activity to run. If there is no value specified, it takes the value of TimeSpan.FromDays(7) which is 1 week as default. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  timeout?: Record<string, unknown>;
  /** List of activities to execute. */
  activities: Array<Activity>;
}

export type ValidationActivity = ValidationActivityBase & ControlActivity;

export interface ValidationActivityBase {
  /** Validation activity properties. */
  typeProperties: ValidationActivityTypeProperties;
}

export interface ValidationActivityTypeProperties {
  /** Specifies the timeout for the activity to run. If there is no value specified, it takes the value of TimeSpan.FromDays(7) which is 1 week as default. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  timeout?: Record<string, unknown>;
  /** A delay in seconds between validation attempts. If no value is specified, 10 seconds will be used as the default. Type: integer (or Expression with resultType integer). */
  sleep?: Record<string, unknown>;
  /** Can be used if dataset points to a file. The file must be greater than or equal in size to the value specified. Type: integer (or Expression with resultType integer). */
  minimumSize?: Record<string, unknown>;
  /** Can be used if dataset points to a folder. If set to true, the folder must have at least one file. If set to false, the folder must be empty. Type: boolean (or Expression with resultType boolean). */
  childItems?: Record<string, unknown>;
  /** Validation activity dataset reference. */
  dataset: DatasetReference;
}

export type FilterActivity = FilterActivityBase & ControlActivity;

export interface FilterActivityBase {
  /** Filter activity properties. */
  typeProperties: FilterActivityTypeProperties;
}

export interface FilterActivityTypeProperties {
  /** Input array on which filter should be applied. */
  items: Expression;
  /** Condition to be used for filtering the input. */
  condition: Expression;
}

export type DatabricksNotebookActivity = DatabricksNotebookActivityBase &
  ExecutionActivity;

export interface DatabricksNotebookActivityBase {
  /** Databricks Notebook activity properties. */
  typeProperties: DatabricksNotebookActivityTypeProperties;
}

export interface DatabricksNotebookActivityTypeProperties {
  /** The absolute path of the notebook to be run in the Databricks Workspace. This path must begin with a slash. Type: string (or Expression with resultType string). */
  notebookPath: Record<string, unknown>;
  /** Base parameters to be used for each run of this job.If the notebook takes a parameter that is not specified, the default value from the notebook will be used. */
  baseParameters?: Record<string, Record<string, unknown>>;
  /** A list of libraries to be installed on the cluster that will execute the job. */
  libraries?: Array<Record<string, Record<string, unknown>>>;
}

export type DatabricksSparkJarActivity = DatabricksSparkJarActivityBase &
  ExecutionActivity;

export interface DatabricksSparkJarActivityBase {
  /** Databricks SparkJar activity properties. */
  typeProperties: DatabricksSparkJarActivityTypeProperties;
}

export interface DatabricksSparkJarActivityTypeProperties {
  /** The full name of the class containing the main method to be executed. This class must be contained in a JAR provided as a library. Type: string (or Expression with resultType string). */
  mainClassName: Record<string, unknown>;
  /** Parameters that will be passed to the main method. */
  parameters?: Array<Record<string, unknown>>;
  /** A list of libraries to be installed on the cluster that will execute the job. */
  libraries?: Array<Record<string, Record<string, unknown>>>;
}

export type DatabricksSparkPythonActivity = DatabricksSparkPythonActivityBase &
  ExecutionActivity;

export interface DatabricksSparkPythonActivityBase {
  /** Databricks SparkPython activity properties. */
  typeProperties: DatabricksSparkPythonActivityTypeProperties;
}

export interface DatabricksSparkPythonActivityTypeProperties {
  /** The URI of the Python file to be executed. DBFS paths are supported. Type: string (or Expression with resultType string). */
  pythonFile: Record<string, unknown>;
  /** Command line parameters that will be passed to the Python file. */
  parameters?: Array<Record<string, unknown>>;
  /** A list of libraries to be installed on the cluster that will execute the job. */
  libraries?: Array<Record<string, Record<string, unknown>>>;
}

export type SetVariableActivity = SetVariableActivityBase & ControlActivity;

export interface SetVariableActivityBase {
  /** Set Variable activity properties. */
  typeProperties: SetVariableActivityTypeProperties;
}

export interface SetVariableActivityTypeProperties {
  /** Name of the variable whose value needs to be set. */
  variableName?: string;
  /** Value to be set. Could be a static value or Expression */
  value?: Record<string, unknown>;
}

export type AppendVariableActivity = AppendVariableActivityBase &
  ControlActivity;

export interface AppendVariableActivityBase {
  /** Append Variable activity properties. */
  typeProperties: AppendVariableActivityTypeProperties;
}

export interface AppendVariableActivityTypeProperties {
  /** Name of the variable whose value needs to be appended to. */
  variableName?: string;
  /** Value to be appended. Could be a static value or Expression */
  value?: Record<string, unknown>;
}

export type AzureFunctionActivity = AzureFunctionActivityBase &
  ExecutionActivity;

export interface AzureFunctionActivityBase {
  /** Azure Function activity properties. */
  typeProperties: AzureFunctionActivityTypeProperties;
}

export interface AzureFunctionActivityTypeProperties {
  /** Rest API method for target endpoint. */
  method: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD" | "TRACE";
  /** Name of the Function that the Azure Function Activity will call. Type: string (or Expression with resultType string) */
  functionName: Record<string, unknown>;
  /** Represents the headers that will be sent to the request. For example, to set the language and type on a request: "headers" : { "Accept-Language": "en-us", "Content-Type": "application/json" }. Type: string (or Expression with resultType string). */
  headers?: Record<string, unknown>;
  /** Represents the payload that will be sent to the endpoint. Required for POST/PUT method, not allowed for GET method Type: string (or Expression with resultType string). */
  body?: Record<string, unknown>;
}

export type WebHookActivity = WebHookActivityBase & ControlActivity;

export interface WebHookActivityBase {
  /** WebHook activity properties. */
  typeProperties: WebHookActivityTypeProperties;
}

export interface WebHookActivityTypeProperties {
  /** Rest API method for target endpoint. */
  method: "POST";
  /** WebHook activity target endpoint and path. Type: string (or Expression with resultType string). */
  url: Record<string, unknown>;
  /** The timeout within which the webhook should be called back. If there is no value specified, it defaults to 10 minutes. Type: string. Pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  timeout?: string;
  /** Represents the headers that will be sent to the request. For example, to set the language and type on a request: "headers" : { "Accept-Language": "en-us", "Content-Type": "application/json" }. Type: string (or Expression with resultType string). */
  headers?: Record<string, unknown>;
  /** Represents the payload that will be sent to the endpoint. Required for POST/PUT method, not allowed for GET method Type: string (or Expression with resultType string). */
  body?: Record<string, unknown>;
  /** Authentication method used for calling the endpoint. */
  authentication?: WebActivityAuthentication;
  /** When set to true, statusCode, output and error in callback request body will be consumed by activity. The activity can be marked as failed by setting statusCode >= 400 in callback request. Default is false. Type: boolean (or Expression with resultType boolean). */
  reportStatusOnCallBack?: Record<string, unknown>;
}

export type ExecuteDataFlowActivity = ExecuteDataFlowActivityBase &
  ExecutionActivity;

export interface ExecuteDataFlowActivityBase {
  /** Execute data flow activity properties. */
  typeProperties: ExecuteDataFlowActivityTypeProperties;
}

export interface ExecuteDataFlowActivityTypeProperties {
  /** Data flow reference. */
  dataflow: DataFlowReference;
  /** Staging info for execute data flow activity. */
  staging?: DataFlowStagingInfo;
  /** The integration runtime reference. */
  integrationRuntime?: IntegrationRuntimeReference;
  /** Compute properties for data flow activity. */
  compute?: ExecuteDataFlowActivityTypePropertiesCompute;
  /** Trace level setting used for data flow monitoring output. Supported values are: 'coarse', 'fine', and 'none'. Type: string (or Expression with resultType string) */
  traceLevel?: Record<string, unknown>;
  /** Continue on error setting used for data flow execution. Enables processing to continue if a sink fails. Type: boolean (or Expression with resultType boolean) */
  continueOnError?: Record<string, unknown>;
  /** Concurrent run setting used for data flow execution. Allows sinks with the same save order to be processed concurrently. Type: boolean (or Expression with resultType boolean) */
  runConcurrently?: Record<string, unknown>;
}

export interface ExecuteDataFlowActivityTypePropertiesCompute {
  /** Compute type of the cluster which will execute data flow job. */
  computeType?: "General" | "MemoryOptimized" | "ComputeOptimized";
  /** Core count of the cluster which will execute data flow job. Supported values are: 8, 16, 32, 48, 80, 144 and 272. */
  coreCount?: number;
}

export type SharePointOnlineListSource = SharePointOnlineListSourceBase &
  CopySource;

export interface SharePointOnlineListSourceBase {
  /** The OData query to filter the data in SharePoint Online list. For example, "$top=1". Type: string (or Expression with resultType string). */
  query?: Record<string, unknown>;
  /** The wait time to get a response from SharePoint Online. Default value is 5 minutes (00:05:00). Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  httpRequestTimeout?: Record<string, unknown>;
}

export type SynapseNotebookActivity = SynapseNotebookActivityBase &
  ExecutionActivity;

export interface SynapseNotebookActivityBase {
  /** Execute Synapse notebook activity properties. */
  typeProperties: SynapseNotebookActivityTypeProperties;
}

export interface SynapseNotebookActivityTypeProperties {
  /** Synapse notebook reference. */
  notebook: SynapseNotebookReference;
  /** Notebook parameters. */
  parameters?: Record<string, Record<string, unknown>>;
}

export type SynapseSparkJobDefinitionActivity = SynapseSparkJobDefinitionActivityBase &
  ExecutionActivity;

export interface SynapseSparkJobDefinitionActivityBase {
  /** Execute spark job activity properties. */
  typeProperties: SynapseSparkJobActivityTypeProperties;
}

export interface SynapseSparkJobActivityTypeProperties {
  /** Synapse spark job reference. */
  sparkJob: SynapseSparkJobReference;
}

export type SqlPoolStoredProcedureActivity = SqlPoolStoredProcedureActivityBase &
  Activity;

export interface SqlPoolStoredProcedureActivityBase {
  /** SQL pool stored procedure reference. */
  sqlPool: SqlPoolReference;
  /** Execute SQL pool stored procedure activity properties. */
  typeProperties: SqlPoolStoredProcedureActivityTypeProperties;
}

export interface SqlPoolStoredProcedureActivityTypeProperties {
  /** Stored procedure name. Type: string (or Expression with resultType string). */
  storedProcedureName: Record<string, unknown>;
  /** Value and type setting for stored procedure parameters. Example: "{Parameter1: {value: "1", type: "int"}}". */
  storedProcedureParameters?: Record<string, StoredProcedureParameter>;
}

export type MultiplePipelineTrigger = MultiplePipelineTriggerBase & Trigger;

export interface MultiplePipelineTriggerBase {
  /** Pipelines that need to be started. */
  pipelines?: Array<TriggerPipelineReference>;
}

export type ScheduleTrigger = ScheduleTriggerBase & MultiplePipelineTrigger;

export interface ScheduleTriggerBase {
  /** Schedule Trigger properties. */
  typeProperties: ScheduleTriggerTypeProperties;
}

export interface ScheduleTriggerTypeProperties {
  /** Recurrence schedule configuration. */
  recurrence: ScheduleTriggerRecurrence;
}

export type ScheduleTriggerRecurrence = ScheduleTriggerRecurrenceBase &
  ScheduleTriggerRecurrenceDictionary;

export interface ScheduleTriggerRecurrenceBase {
  /** The frequency. */
  frequency?:
    | "NotSpecified"
    | "Minute"
    | "Hour"
    | "Day"
    | "Week"
    | "Month"
    | "Year";
  /** The interval. */
  interval?: number;
  /** The start time. */
  startTime?: Date;
  /** The end time. */
  endTime?: Date;
  /** The time zone. */
  timeZone?: string;
  /** The recurrence schedule. */
  schedule?: RecurrenceSchedule;
}

export type RecurrenceSchedule = RecurrenceScheduleBase &
  RecurrenceScheduleDictionary;

export interface RecurrenceScheduleBase {
  /** The minutes. */
  minutes?: Array<number>;
  /** The hours. */
  hours?: Array<number>;
  /** The days of the week. */
  weekDays?: Array<
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
  >;
  /** The month days. */
  monthDays?: Array<number>;
  /** The monthly occurrences. */
  monthlyOccurrences?: Array<RecurrenceScheduleOccurrence>;
}

export type RecurrenceScheduleOccurrence = RecurrenceScheduleOccurrenceBase &
  RecurrenceScheduleOccurrenceDictionary;

export interface RecurrenceScheduleOccurrenceBase {
  /** The day of the week. */
  day?:
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday";
  /** The occurrence. */
  occurrence?: number;
}

export type BlobTrigger = BlobTriggerBase & MultiplePipelineTrigger;

export interface BlobTriggerBase {
  /** Blob Trigger properties. */
  typeProperties: BlobTriggerTypeProperties;
}

export interface BlobTriggerTypeProperties {
  /** The path of the container/folder that will trigger the pipeline. */
  folderPath: string;
  /** The max number of parallel files to handle when it is triggered. */
  maxConcurrency: number;
  /** The Azure Storage linked service reference. */
  linkedService: LinkedServiceReference;
}

export type BlobEventsTrigger = BlobEventsTriggerBase & MultiplePipelineTrigger;

export interface BlobEventsTriggerBase {
  /** Blob Events Trigger properties. */
  typeProperties: BlobEventsTriggerTypeProperties;
}

export interface BlobEventsTriggerTypeProperties {
  /** The blob path must begin with the pattern provided for trigger to fire. For example, '/records/blobs/december/' will only fire the trigger for blobs in the december folder under the records container. At least one of these must be provided: blobPathBeginsWith, blobPathEndsWith. */
  blobPathBeginsWith?: string;
  /** The blob path must end with the pattern provided for trigger to fire. For example, 'december/boxes.csv' will only fire the trigger for blobs named boxes in a december folder. At least one of these must be provided: blobPathBeginsWith, blobPathEndsWith. */
  blobPathEndsWith?: string;
  /** If set to true, blobs with zero bytes will be ignored. */
  ignoreEmptyBlobs?: boolean;
  /** The type of events that cause this trigger to fire. */
  events: Array<
    "Microsoft.Storage.BlobCreated" | "Microsoft.Storage.BlobDeleted"
  >;
  /** The ARM resource ID of the Storage Account. */
  scope: string;
}

export type CustomEventsTrigger = CustomEventsTriggerBase &
  MultiplePipelineTrigger;

export interface CustomEventsTriggerBase {
  /** Custom Events Trigger properties. */
  typeProperties: CustomEventsTriggerTypeProperties;
}

export interface CustomEventsTriggerTypeProperties {
  /** The event subject must begin with the pattern provided for trigger to fire. At least one of these must be provided: subjectBeginsWith, subjectEndsWith. */
  subjectBeginsWith?: string;
  /** The event subject must end with the pattern provided for trigger to fire. At least one of these must be provided: subjectBeginsWith, subjectEndsWith. */
  subjectEndsWith?: string;
  /** The list of event types that cause this trigger to fire. */
  events: Array<Record<string, unknown>>;
  /** The ARM resource ID of the Azure Event Grid Topic. */
  scope: string;
}

export type TumblingWindowTrigger = TumblingWindowTriggerBase & Trigger;

export interface TumblingWindowTriggerBase {
  /** Pipeline for which runs are created when an event is fired for trigger window that is ready. */
  pipeline: TriggerPipelineReference;
  /** Tumbling Window Trigger properties. */
  typeProperties: TumblingWindowTriggerTypeProperties;
}

export interface TumblingWindowTriggerTypeProperties {
  /** The frequency of the time windows. */
  frequency: "Minute" | "Hour" | "Month";
  /** The interval of the time windows. The minimum interval allowed is 15 Minutes. */
  interval: number;
  /** The start time for the time period for the trigger during which events are fired for windows that are ready. Only UTC time is currently supported. */
  startTime: Date;
  /** The end time for the time period for the trigger during which events are fired for windows that are ready. Only UTC time is currently supported. */
  endTime?: Date;
  /** Specifies how long the trigger waits past due time before triggering new run. It doesn't alter window start and end time. The default is 0. Type: string (or Expression with resultType string), pattern: ((\d+)\.)?(\d\d):(60|([0-5][0-9])):(60|([0-5][0-9])). */
  delay?: Record<string, unknown>;
  /** The max number of parallel time windows (ready for execution) for which a new run is triggered. */
  maxConcurrency: number;
  /** Retry policy that will be applied for failed pipeline runs. */
  retryPolicy?: RetryPolicy;
  /** Triggers that this trigger depends on. Only tumbling window triggers are supported. */
  dependsOn?: Array<DependencyReference>;
}

export interface RetryPolicy {
  /** Maximum ordinary retry attempts. Default is 0. Type: integer (or Expression with resultType integer), minimum: 0. */
  count?: Record<string, unknown>;
  /** Interval between retries in seconds. Default is 30. */
  intervalInSeconds?: number;
}

export interface DependencyReference {
  /** The type of dependency reference. */
  type: string;
}

export interface TriggerReference {
  /** Trigger reference type. */
  type: "TriggerReference";
  /** Reference trigger name. */
  referenceName: string;
}

export type TriggerDependencyReference = TriggerDependencyReferenceBase &
  DependencyReference;

export interface TriggerDependencyReferenceBase {
  /** Referenced trigger. */
  referenceTrigger: TriggerReference;
}

export type TumblingWindowTriggerDependencyReference = TumblingWindowTriggerDependencyReferenceBase &
  TriggerDependencyReference;

export interface TumblingWindowTriggerDependencyReferenceBase {
  /** Timespan applied to the start time of a tumbling window when evaluating dependency. */
  offset?: string;
  /** The size of the window when evaluating the dependency. If undefined the frequency of the tumbling window will be used. */
  size?: string;
}

export type SelfDependencyTumblingWindowTriggerReference = SelfDependencyTumblingWindowTriggerReferenceBase &
  DependencyReference;

export interface SelfDependencyTumblingWindowTriggerReferenceBase {
  /** Timespan applied to the start time of a tumbling window when evaluating dependency. */
  offset: string;
  /** The size of the window when evaluating the dependency. If undefined the frequency of the tumbling window will be used. */
  size?: string;
}

export type ChainingTrigger = ChainingTriggerBase & Trigger;

export interface ChainingTriggerBase {
  /** Pipeline for which runs are created when all upstream pipelines complete successfully. */
  pipeline: TriggerPipelineReference;
  /** Chaining Trigger properties. */
  typeProperties: ChainingTriggerTypeProperties;
}

export interface ChainingTriggerTypeProperties {
  /** Upstream Pipelines. */
  dependsOn: Array<PipelineReference>;
  /** Run Dimension property that needs to be emitted by upstream pipelines. */
  runDimension: string;
}

export type ManagedIntegrationRuntime = ManagedIntegrationRuntimeBase &
  IntegrationRuntime;

export interface ManagedIntegrationRuntimeBase {
  /** Integration runtime state, only valid for managed dedicated integration runtime. */
  state?:
    | "Initial"
    | "Stopped"
    | "Started"
    | "Starting"
    | "Stopping"
    | "NeedRegistration"
    | "Online"
    | "Limited"
    | "Offline"
    | "AccessDenied";
  /** Managed integration runtime properties. */
  typeProperties: ManagedIntegrationRuntimeTypeProperties;
  /** Managed Virtual Network reference. */
  managedVirtualNetwork?: ManagedVirtualNetworkReference;
}

export interface ManagedIntegrationRuntimeTypeProperties {
  /** The compute resource for managed integration runtime. */
  computeProperties?: IntegrationRuntimeComputeProperties;
  /** SSIS properties for managed integration runtime. */
  ssisProperties?: IntegrationRuntimeSsisProperties;
}

export type IntegrationRuntimeComputeProperties = IntegrationRuntimeComputePropertiesBase &
  IntegrationRuntimeComputePropertiesDictionary;

export interface IntegrationRuntimeComputePropertiesBase {
  /** The location for managed integration runtime. The supported regions could be found on https://docs.microsoft.com/en-us/azure/data-factory/data-factory-data-movement-activities */
  location?: string;
  /** The node size requirement to managed integration runtime. */
  nodeSize?: string;
  /** The required number of nodes for managed integration runtime. */
  numberOfNodes?: number;
  /** Maximum parallel executions count per node for managed integration runtime. */
  maxParallelExecutionsPerNode?: number;
  /** Data flow properties for managed integration runtime. */
  dataFlowProperties?: IntegrationRuntimeDataFlowProperties;
  /** VNet properties for managed integration runtime. */
  vNetProperties?: IntegrationRuntimeVNetProperties;
}

export type IntegrationRuntimeDataFlowProperties = IntegrationRuntimeDataFlowPropertiesBase &
  IntegrationRuntimeDataFlowPropertiesDictionary;

export interface IntegrationRuntimeDataFlowPropertiesBase {
  /** Compute type of the cluster which will execute data flow job. */
  computeType?: "General" | "MemoryOptimized" | "ComputeOptimized";
  /** Core count of the cluster which will execute data flow job. Supported values are: 8, 16, 32, 48, 80, 144 and 272. */
  coreCount?: number;
  /** Time to live (in minutes) setting of the cluster which will execute data flow job. */
  timeToLive?: number;
}

export type IntegrationRuntimeVNetProperties = IntegrationRuntimeVNetPropertiesBase &
  IntegrationRuntimeVNetPropertiesDictionary;

export interface IntegrationRuntimeVNetPropertiesBase {
  /** The ID of the VNet that this integration runtime will join. */
  vNetId?: string;
  /** The name of the subnet this integration runtime will join. */
  subnet?: string;
  /** Resource IDs of the public IP addresses that this integration runtime will use. */
  publicIPs?: Array<string>;
}

export type IntegrationRuntimeSsisProperties = IntegrationRuntimeSsisPropertiesBase &
  IntegrationRuntimeSsisPropertiesDictionary;

export interface IntegrationRuntimeSsisPropertiesBase {
  /** Catalog information for managed dedicated integration runtime. */
  catalogInfo?: IntegrationRuntimeSsisCatalogInfo;
  /** License type for bringing your own license scenario. */
  licenseType?: "BasePrice" | "LicenseIncluded";
  /** Custom setup script properties for a managed dedicated integration runtime. */
  customSetupScriptProperties?: IntegrationRuntimeCustomSetupScriptProperties;
  /** Data proxy properties for a managed dedicated integration runtime. */
  dataProxyProperties?: IntegrationRuntimeDataProxyProperties;
  /** The edition for the SSIS Integration Runtime */
  edition?: "Standard" | "Enterprise";
  /** Custom setup without script properties for a SSIS integration runtime. */
  expressCustomSetupProperties?: Array<CustomSetupBase>;
}

export type IntegrationRuntimeSsisCatalogInfo = IntegrationRuntimeSsisCatalogInfoBase &
  IntegrationRuntimeSsisCatalogInfoDictionary;

export interface IntegrationRuntimeSsisCatalogInfoBase {
  /** The catalog database server URL. */
  catalogServerEndpoint?: string;
  /** The administrator user name of catalog database. */
  catalogAdminUserName?: string;
  /** The password of the administrator user account of the catalog database. */
  catalogAdminPassword?: SecureString;
  /** The pricing tier for the catalog database. The valid values could be found in https://azure.microsoft.com/en-us/pricing/details/sql-database/ */
  catalogPricingTier?: "Basic" | "Standard" | "Premium" | "PremiumRS";
}

export interface IntegrationRuntimeCustomSetupScriptProperties {
  /** The URI of the Azure blob container that contains the custom setup script. */
  blobContainerUri?: string;
  /** The SAS token of the Azure blob container. */
  sasToken?: SecureString;
}

export interface IntegrationRuntimeDataProxyProperties {
  /** The self-hosted integration runtime reference. */
  connectVia?: EntityReference;
  /** The staging linked service reference. */
  stagingLinkedService?: EntityReference;
  /** The path to contain the staged data in the Blob storage. */
  path?: string;
}

export interface EntityReference {
  /** The type of this referenced entity. */
  type?: "IntegrationRuntimeReference" | "LinkedServiceReference";
  /** The name of this referenced entity. */
  referenceName?: string;
}

export interface CustomSetupBase {
  /** The type of custom setup. */
  type: string;
}

export interface ManagedVirtualNetworkReference {
  /** Managed Virtual Network reference type. */
  type: "ManagedVirtualNetworkReference";
  /** Reference ManagedVirtualNetwork name. */
  referenceName: string;
}

export type SelfHostedIntegrationRuntime = SelfHostedIntegrationRuntimeBase &
  IntegrationRuntime;

export interface SelfHostedIntegrationRuntimeBase {
  /** When this property is not null, means this is a linked integration runtime. The property is used to access original integration runtime. */
  typeProperties?: SelfHostedIntegrationRuntimeTypeProperties;
}

export interface SelfHostedIntegrationRuntimeTypeProperties {
  /** Linked integration runtime type from data factory */
  linkedInfo?: LinkedIntegrationRuntimeType;
}

export interface LinkedIntegrationRuntimeType {
  /** The authorization type for integration runtime sharing. */
  authorizationType: string;
}

export type LinkedIntegrationRuntimeKeyAuthorization = LinkedIntegrationRuntimeKeyAuthorizationBase &
  LinkedIntegrationRuntimeType;

export interface LinkedIntegrationRuntimeKeyAuthorizationBase {
  /** The key used for authorization. */
  key: SecureString;
}

export type LinkedIntegrationRuntimeRbacAuthorization = LinkedIntegrationRuntimeRbacAuthorizationBase &
  LinkedIntegrationRuntimeType;

export interface LinkedIntegrationRuntimeRbacAuthorizationBase {
  /** The resource identifier of the integration runtime to be shared. */
  resourceId: string;
}

export type IntegrationRuntimeReferenceType = "IntegrationRuntimeReference";
export type ParameterType =
  | "Object"
  | "String"
  | "Int"
  | "Float"
  | "Bool"
  | "Array"
  | "SecureString";
export type Type = "LinkedServiceReference";
export type DependencyCondition =
  | "Succeeded"
  | "Failed"
  | "Skipped"
  | "Completed";
export type VariableType = "String" | "Bool" | "Boolean" | "Array";
export type RunQueryFilterOperand =
  | "PipelineName"
  | "Status"
  | "RunStart"
  | "RunEnd"
  | "ActivityName"
  | "ActivityRunStart"
  | "ActivityRunEnd"
  | "ActivityType"
  | "TriggerName"
  | "TriggerRunTimestamp"
  | "RunGroupId"
  | "LatestOnly";
export type RunQueryFilterOperator = "Equals" | "NotEquals" | "In" | "NotIn";
export type RunQueryOrderByField =
  | "RunStart"
  | "RunEnd"
  | "PipelineName"
  | "Status"
  | "ActivityName"
  | "ActivityRunStart"
  | "ActivityRunEnd"
  | "TriggerName"
  | "TriggerRunTimestamp";
export type RunQueryOrder = "ASC" | "DESC";
export type TriggerRuntimeState = "Started" | "Stopped" | "Disabled";
export type EventSubscriptionStatus =
  | "Enabled"
  | "Provisioning"
  | "Deprovisioning"
  | "Disabled"
  | "Unknown";
export type TriggerRunStatus = "Succeeded" | "Failed" | "Inprogress";
export type SqlScriptType = "SqlQuery";
export type SqlConnectionType = "SqlOnDemand" | "SqlPool";
export type BigDataPoolReferenceType = "BigDataPoolReference";
export type SparkJobType = "SparkBatch" | "SparkSession";
export type SparkBatchJobResultType =
  | "Uncertain"
  | "Succeeded"
  | "Failed"
  | "Cancelled";
export type SchedulerCurrentState = "Queued" | "Scheduled" | "Ended";
export type PluginCurrentState =
  | "Preparation"
  | "ResourceAcquisition"
  | "Queued"
  | "Submission"
  | "Monitoring"
  | "Cleanup"
  | "Ended";
export type SparkErrorSource = "System" | "User" | "Unknown" | "Dependency";
export type CellOutputType =
  | "execute_result"
  | "display_data"
  | "stream"
  | "error";
export type NodeSize =
  | "None"
  | "Small"
  | "Medium"
  | "Large"
  | "XLarge"
  | "XXLarge"
  | "XXXLarge";
export type NodeSizeFamily = "None" | "MemoryOptimized";
export type IntegrationRuntimeType = "Managed" | "SelfHosted";
export type ExpressionType = "Expression";
export type PipelineReferenceType = "PipelineReference";
export type DatasetReferenceType = "DatasetReference";
export type DataFlowReferenceType = "DataFlowReference";
export type NotebookReferenceType = "NotebookReference";
export type SparkJobReferenceType = "SparkJobDefinitionReference";
export type SqlPoolReferenceType = "SqlPoolReference";
export type JsonFormatFilePattern = "setOfObjects" | "arrayOfObjects";
export type CompressionCodec =
  | "bzip2"
  | "gzip"
  | "deflate"
  | "zipDeflate"
  | "snappy"
  | "lz4"
  | "tar"
  | "tarGZip";
export type OrcCompressionCodec = "none" | "zlib" | "snappy" | "lzo";
export type DynamicsDeploymentType = "Online" | "OnPremisesWithIfd";
export type DynamicsAuthenticationType =
  | "Office365"
  | "Ifd"
  | "AADServicePrincipal";
export type DynamicsServicePrincipalCredentialType =
  | "ServicePrincipalKey"
  | "ServicePrincipalCert";
export type SybaseAuthenticationType = "Basic" | "Windows";
export type Db2AuthenticationType = "Basic";
export type TeradataAuthenticationType = "Basic" | "Windows";
export type ODataAuthenticationType =
  | "Basic"
  | "Anonymous"
  | "Windows"
  | "AadServicePrincipal"
  | "ManagedServiceIdentity";
export type ODataAadServicePrincipalCredentialType =
  | "ServicePrincipalKey"
  | "ServicePrincipalCert";
export type WebAuthenticationType = "Basic" | "Anonymous" | "ClientCertificate";
export type MongoDbAuthenticationType = "Basic" | "Anonymous";
export type RestServiceAuthenticationType =
  | "Anonymous"
  | "Basic"
  | "AadServicePrincipal"
  | "ManagedServiceIdentity";
export type HttpAuthenticationType =
  | "Basic"
  | "Anonymous"
  | "Digest"
  | "Windows"
  | "ClientCertificate";
export type FtpAuthenticationType = "Basic" | "Anonymous";
export type SftpAuthenticationType = "Basic" | "SshPublicKey";
export type SapHanaAuthenticationType = "Basic" | "Windows";
export type GoogleBigQueryAuthenticationType =
  | "ServiceAuthentication"
  | "UserAuthentication";
export type HBaseAuthenticationType = "Anonymous" | "Basic";
export type HiveServerType = "HiveServer1" | "HiveServer2" | "HiveThriftServer";
export type HiveThriftTransportProtocol = "Binary" | "SASL" | "HTTP ";
export type HiveAuthenticationType =
  | "Anonymous"
  | "Username"
  | "UsernameAndPassword"
  | "WindowsAzureHDInsightService";
export type ImpalaAuthenticationType =
  | "Anonymous"
  | "SASLUsername"
  | "UsernameAndPassword";
export type PhoenixAuthenticationType =
  | "Anonymous"
  | "UsernameAndPassword"
  | "WindowsAzureHDInsightService";
export type PrestoAuthenticationType = "Anonymous" | "LDAP";
export type ServiceNowAuthenticationType = "Basic" | "OAuth2";
export type SparkServerType =
  | "SharkServer"
  | "SharkServer2"
  | "SparkThriftServer";
export type SparkThriftTransportProtocol = "Binary" | "SASL" | "HTTP ";
export type SparkAuthenticationType =
  | "Anonymous"
  | "Username"
  | "UsernameAndPassword"
  | "WindowsAzureHDInsightService";
export type HdiNodeTypes = "Headnode" | "Workernode" | "Zookeeper";
export type GoogleAdWordsAuthenticationType =
  | "ServiceAuthentication"
  | "UserAuthentication";
export type JsonWriteFilePattern = "setOfObjects" | "arrayOfObjects";
export type SalesforceSourceReadBehavior = "Query" | "QueryAll";
export type SapHanaPartitionOption =
  | "None"
  | "PhysicalPartitionsOfTable"
  | "SapHanaDynamicRange";
export type SapTablePartitionOption =
  | "None"
  | "PartitionOnInt"
  | "PartitionOnCalendarYear"
  | "PartitionOnCalendarMonth"
  | "PartitionOnCalendarDate"
  | "PartitionOnTime";
export type StoredProcedureParameterType =
  | "String"
  | "Int"
  | "Int64"
  | "Decimal"
  | "Guid"
  | "Boolean"
  | "Date";
export type OraclePartitionOption =
  | "None"
  | "PhysicalPartitionsOfTable"
  | "DynamicRange";
export type TeradataPartitionOption = "None" | "Hash" | "DynamicRange";
export type CassandraSourceReadConsistencyLevels =
  | "ALL"
  | "EACH_QUORUM"
  | "QUORUM"
  | "LOCAL_QUORUM"
  | "ONE"
  | "TWO"
  | "THREE"
  | "LOCAL_ONE"
  | "SERIAL"
  | "LOCAL_SERIAL";
export type NetezzaPartitionOption = "None" | "DataSlice" | "DynamicRange";
export type SapCloudForCustomerSinkWriteBehavior = "Insert" | "Update";
export type PolybaseSettingsRejectType = "value" | "percentage";
export type AzureSearchIndexWriteBehaviorType = "Merge" | "Upload";
export type DynamicsSinkWriteBehavior = "Upsert";
export type SalesforceSinkWriteBehavior = "Insert" | "Upsert";
export type HDInsightActivityDebugInfoOption = "None" | "Always" | "Failure";
export type SsisPackageLocationType =
  | "SSISDB"
  | "File"
  | "InlinePackage"
  | "PackageStore";
export type SsisLogLocationType = "File";
export type WebActivityMethod = "GET" | "POST" | "PUT" | "DELETE";
export type AzureFunctionActivityMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "OPTIONS"
  | "HEAD"
  | "TRACE";
export type WebHookActivityMethod = "POST";
export type DataFlowComputeType =
  | "General"
  | "MemoryOptimized"
  | "ComputeOptimized";
export type RecurrenceFrequency =
  | "NotSpecified"
  | "Minute"
  | "Hour"
  | "Day"
  | "Week"
  | "Month"
  | "Year";
export type BlobEventType =
  | "Microsoft.Storage.BlobCreated"
  | "Microsoft.Storage.BlobDeleted";
export type TumblingWindowFrequency = "Minute" | "Hour" | "Month";
export type TriggerReferenceType = "TriggerReference";
export type IntegrationRuntimeState =
  | "Initial"
  | "Stopped"
  | "Started"
  | "Starting"
  | "Stopping"
  | "NeedRegistration"
  | "Online"
  | "Limited"
  | "Offline"
  | "AccessDenied";
export type IntegrationRuntimeSsisCatalogPricingTier =
  | "Basic"
  | "Standard"
  | "Premium"
  | "PremiumRS";
export type IntegrationRuntimeLicenseType = "BasePrice" | "LicenseIncluded";
export type IntegrationRuntimeEntityReferenceType =
  | "IntegrationRuntimeReference"
  | "LinkedServiceReference";
export type IntegrationRuntimeEdition = "Standard" | "Enterprise";
export type DatasetCompressionLevel = "Optimal" | "Fastest";
export type AvroCompressionCodec =
  | "none"
  | "deflate"
  | "snappy"
  | "xz"
  | "bzip2";
export type ParquetCompressionCodecEnum = "none" | "gzip" | "snappy" | "lzo";
export type CopyBehaviorType =
  | "PreserveHierarchy"
  | "FlattenHierarchy"
  | "MergeFiles";
export type SqlPartitionOption =
  | "None"
  | "PhysicalPartitionsOfTable"
  | "DynamicRange";
export type ResourceIdentityType = "None" | "SystemAssigned";
export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";
export type LinkedServiceDictionary = Record<string, unknown>;
export type ParameterValueSpecificationDictionary = Record<string, unknown>;
export type ParameterDefinitionSpecificationDictionary = Record<
  string,
  ParameterSpecification
>;
export type DatasetDictionary = Record<string, unknown>;
export type PipelineResourceDictionary = Record<string, unknown>;
export type ActivityDictionary = Record<string, unknown>;
export type ActivityDependencyDictionary = Record<string, unknown>;
export type VariableDefinitionSpecificationDictionary = Record<
  string,
  VariableSpecification
>;
export type PipelineRunDimensionsDictionary = Record<string, unknown>;
export type PipelineRunDictionary = Record<string, unknown>;
export type PipelineRunParametersDictionary = Record<string, string>;
export type ActivityRunDictionary = Record<string, unknown>;
export type TriggerDictionary = Record<string, unknown>;
export type TriggerRunDictionary = Record<string, unknown>;
export type TriggerRunPropertiesDictionary = Record<string, string>;
export type TriggerRunTriggeredPipelinesDictionary = Record<string, string>;
export type DataFlowDebugSessionInfoDictionary = Record<string, unknown>;
export type DataFlowDebugPackageDictionary = Record<string, unknown>;
export type DataFlowSourceSettingDictionary = Record<string, unknown>;
export type SqlScriptDictionary = Record<string, unknown>;
export type SqlScriptContentDictionary = Record<string, unknown>;
export type SqlConnectionDictionary = Record<string, unknown>;
export type SqlScriptMetadataDictionary = Record<string, unknown>;
export type SparkJobDefinitionDictionary = Record<string, unknown>;
export type SparkJobPropertiesDictionary = Record<string, unknown>;
export type SparkRequestConfDictionary = Record<string, string>;
export type SparkBatchJobTagsDictionary = Record<string, string>;
export type SparkBatchJobAppInfoDictionary = Record<string, string>;
export type NotebookDictionary = Record<string, unknown>;
export type NotebookMetadataDictionary = Record<string, unknown>;
export type NotebookKernelSpecDictionary = Record<string, unknown>;
export type NotebookLanguageInfoDictionary = Record<string, unknown>;
export type NotebookCellDictionary = Record<string, unknown>;
export type TrackedResourceTagsDictionary = Record<string, string>;
export type WorkspacePropertiesConnectivityEndpointsDictionary = Record<
  string,
  string
>;
export type WorkspacePropertiesExtraPropertiesDictionary = Record<
  string,
  unknown
>;
export type IntegrationRuntimeDictionary = Record<string, unknown>;
export type WorkspaceUpdateParametersTagsDictionary = Record<string, string>;
export type DataFlowReferenceDictionary = Record<string, unknown>;
export type DatasetLocationDictionary = Record<string, unknown>;
export type DatasetSchemaDataElementDictionary = Record<string, unknown>;
export type DatasetStorageFormatDictionary = Record<string, unknown>;
export type DatasetCompressionDictionary = Record<string, unknown>;
export type AzureDatabricksLinkedServiceTypePropertiesNewClusterSparkConfDictionary = Record<
  string,
  unknown
>;
export type AzureDatabricksLinkedServiceTypePropertiesNewClusterSparkEnvVarsDictionary = Record<
  string,
  unknown
>;
export type AzureDatabricksLinkedServiceTypePropertiesNewClusterCustomTagsDictionary = Record<
  string,
  unknown
>;
export type ActivityPolicyDictionary = Record<string, unknown>;
export type StoreReadSettingsDictionary = Record<string, unknown>;
export type StoreWriteSettingsDictionary = Record<string, unknown>;
export type FormatReadSettingsDictionary = Record<string, unknown>;
export type CompressionReadSettingsDictionary = Record<string, unknown>;
export type FormatWriteSettingsDictionary = Record<string, unknown>;
export type CopySourceDictionary = Record<string, unknown>;
export type CopySinkDictionary = Record<string, unknown>;
export type StagingSettingsDictionary = Record<string, unknown>;
export type RedirectIncompatibleRowSettingsDictionary = Record<string, unknown>;
export type LogStorageSettingsDictionary = Record<string, unknown>;
export type SqlSourceStoredProcedureParametersDictionary = Record<
  string,
  StoredProcedureParameter
>;
export type SqlServerSourceStoredProcedureParametersDictionary = Record<
  string,
  StoredProcedureParameter
>;
export type AzureSqlSourceStoredProcedureParametersDictionary = Record<
  string,
  StoredProcedureParameter
>;
export type SqlMISourceStoredProcedureParametersDictionary = Record<
  string,
  StoredProcedureParameter
>;
export type MongoDbCursorMethodsPropertiesDictionary = Record<string, unknown>;
export type ExportSettingsDictionary = Record<string, unknown>;
export type SnowflakeExportCopyCommandAdditionalCopyOptionsDictionary = Record<
  string,
  unknown
>;
export type SnowflakeExportCopyCommandAdditionalFormatOptionsDictionary = Record<
  string,
  unknown
>;
export type ImportSettingsDictionary = Record<string, unknown>;
export type SqlSinkStoredProcedureParametersDictionary = Record<
  string,
  StoredProcedureParameter
>;
export type SqlServerSinkStoredProcedureParametersDictionary = Record<
  string,
  StoredProcedureParameter
>;
export type AzureSqlSinkStoredProcedureParametersDictionary = Record<
  string,
  StoredProcedureParameter
>;
export type SqlMISinkStoredProcedureParametersDictionary = Record<
  string,
  StoredProcedureParameter
>;
export type PolybaseSettingsDictionary = Record<string, unknown>;
export type DWCopyCommandSettingsAdditionalOptionsDictionary = Record<
  string,
  string
>;
export type SnowflakeImportCopyCommandAdditionalCopyOptionsDictionary = Record<
  string,
  unknown
>;
export type SnowflakeImportCopyCommandAdditionalFormatOptionsDictionary = Record<
  string,
  unknown
>;
export type CopyTranslatorDictionary = Record<string, unknown>;
export type HDInsightHiveActivityTypePropertiesDefinesDictionary = Record<
  string,
  unknown
>;
export type HDInsightPigActivityTypePropertiesDefinesDictionary = Record<
  string,
  unknown
>;
export type HDInsightMapReduceActivityTypePropertiesDefinesDictionary = Record<
  string,
  unknown
>;
export type HDInsightStreamingActivityTypePropertiesDefinesDictionary = Record<
  string,
  unknown
>;
export type HDInsightSparkActivityTypePropertiesSparkConfigDictionary = Record<
  string,
  unknown
>;
export type ExecuteSsisPackageActivityTypePropertiesProjectParametersDictionary = Record<
  string,
  SsisExecutionParameter
>;
export type ExecuteSsisPackageActivityTypePropertiesPackageParametersDictionary = Record<
  string,
  SsisExecutionParameter
>;
export type SsisConnectionManagerDictionary = Record<
  string,
  SsisExecutionParameter
>;
export type ExecuteSsisPackageActivityTypePropertiesProjectConnectionManagersDictionary = Record<
  string,
  SsisConnectionManagerDictionary
>;
export type ExecuteSsisPackageActivityTypePropertiesPackageConnectionManagersDictionary = Record<
  string,
  SsisConnectionManagerDictionary
>;
export type ExecuteSsisPackageActivityTypePropertiesPropertyOverridesDictionary = Record<
  string,
  SsisPropertyOverride
>;
export type CustomActivityTypePropertiesExtendedPropertiesDictionary = Record<
  string,
  unknown
>;
export type SqlServerStoredProcedureActivityTypePropertiesStoredProcedureParametersDictionary = Record<
  string,
  StoredProcedureParameter
>;
export type AzureMLBatchExecutionActivityTypePropertiesGlobalParametersDictionary = Record<
  string,
  unknown
>;
export type AzureMLBatchExecutionActivityTypePropertiesWebServiceOutputsDictionary = Record<
  string,
  AzureMLWebServiceFile
>;
export type AzureMLBatchExecutionActivityTypePropertiesWebServiceInputsDictionary = Record<
  string,
  AzureMLWebServiceFile
>;
export type AzureMLPipelineParametersDictionary = Record<string, unknown>;
export type DataLakeAnalyticsUsqlActivityTypePropertiesParametersDictionary = Record<
  string,
  unknown
>;
export type DatabricksNotebookActivityTypePropertiesBaseParametersDictionary = Record<
  string,
  unknown
>;
export type DatabricksNotebookActivityTypePropertiesLibrariesItemDictionary = Record<
  string,
  unknown
>;
export type DatabricksSparkJarActivityTypePropertiesLibrariesItemDictionary = Record<
  string,
  unknown
>;
export type DatabricksSparkPythonActivityTypePropertiesLibrariesItemDictionary = Record<
  string,
  unknown
>;
export type SqlPoolStoredProcedureActivityTypePropertiesStoredProcedureParametersDictionary = Record<
  string,
  StoredProcedureParameter
>;
export type ScheduleTriggerRecurrenceDictionary = Record<string, unknown>;
export type RecurrenceScheduleDictionary = Record<string, unknown>;
export type RecurrenceScheduleOccurrenceDictionary = Record<string, unknown>;
export type IntegrationRuntimeComputePropertiesDictionary = Record<
  string,
  unknown
>;
export type IntegrationRuntimeDataFlowPropertiesDictionary = Record<
  string,
  unknown
>;
export type IntegrationRuntimeVNetPropertiesDictionary = Record<
  string,
  unknown
>;
export type IntegrationRuntimeSsisPropertiesDictionary = Record<
  string,
  unknown
>;
export type IntegrationRuntimeSsisCatalogInfoDictionary = Record<
  string,
  unknown
>;

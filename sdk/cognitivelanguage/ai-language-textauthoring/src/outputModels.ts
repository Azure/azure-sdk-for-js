// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Represents a list of retrieved projects' metadata. */
export interface ProjectsMetadataOutput {
  /** The list of projects. */
  value: Array<ProjectMetadataOutput>;
  /** The next page link. */
  nextLink: string;
}

/** Represents the metadata of a project. */
export interface ProjectMetadataOutput {
  /** Represents the project creation datetime. */
  createdDateTime: string;
  /** Represents the project last modification datetime. */
  lastModifiedDateTime: string;
  /** Represents the project last training datetime. */
  lastTrainedDateTime?: string;
  /** Represents the project last deployment datetime. */
  lastDeployedDateTime?: string;
  /** The project kind. */
  projectKind:
    | "CustomSingleLabelClassification"
    | "CustomMultiLabelClassification"
    | "CustomEntityRecognition"
    | "CustomAbstractiveSummarization";
  /** The storage container name. */
  storageInputContainerName: string;
  /** The project settings. */
  settings?: ProjectSettingsOutput;
  /** The new project name. */
  projectName: string;
  /** Whether the project would be used for multiple languages or not. */
  multilingual?: boolean;
  /** The project description. */
  description?: string;
  /** The project language. This is BCP-47 representation of a language. For example, use "en" for English, "en-gb" for English (UK), "es" for Spanish etc. */
  language: string;
}

/** Represents the settings used to define the project behavior. */
export interface ProjectSettingsOutput {
  /** The threshold of the class with the highest confidence, at which the prediction will automatically be changed to "None". The value of the threshold should be between 0 and 1 inclusive. */
  confidenceThreshold?: number;
}

/** Error response. */
export interface ErrorResponseOutput {
  /** The error object. */
  error: ErrorModelOutput;
}

/** The error object. */
export interface ErrorModelOutput extends Record<string, unknown> {
  /** One of a server-defined set of error codes. */
  code:
    | "InvalidRequest"
    | "InvalidArgument"
    | "Unauthorized"
    | "Forbidden"
    | "NotFound"
    | "ProjectNotFound"
    | "OperationNotFound"
    | "AzureCognitiveSearchNotFound"
    | "AzureCognitiveSearchIndexNotFound"
    | "TooManyRequests"
    | "AzureCognitiveSearchThrottling"
    | "AzureCognitiveSearchIndexLimitReached"
    | "InternalServerError"
    | "ServiceUnavailable"
    | "Timeout"
    | "QuotaExceeded"
    | "Conflict"
    | "Warning";
  /** A human-readable representation of the error. */
  message: string;
  /** The target of the error. */
  target?: string;
  /** An array of details about specific errors that led to this reported error. */
  details?: Array<ErrorModelOutput>;
  /** An object containing more specific information than the current object about the error. */
  innererror?: InnerErrorModelOutput;
}

/** An object containing more specific information about the error. As per Microsoft One API guidelines - https://github.com/Microsoft/api-guidelines/blob/vNext/Guidelines.md#7102-error-condition-responses. */
export interface InnerErrorModelOutput {
  /** One of a server-defined set of error codes. */
  code:
    | "InvalidRequest"
    | "InvalidParameterValue"
    | "KnowledgeBaseNotFound"
    | "AzureCognitiveSearchNotFound"
    | "AzureCognitiveSearchThrottling"
    | "ExtractionFailure"
    | "InvalidRequestBodyFormat"
    | "EmptyRequest"
    | "MissingInputDocuments"
    | "InvalidDocument"
    | "ModelVersionIncorrect"
    | "InvalidDocumentBatch"
    | "UnsupportedLanguageCode"
    | "InvalidCountryHint";
  /** Error message. */
  message: string;
  /** Error details. */
  details?: Record<string, string>;
  /** Error target. */
  target?: string;
  /** An object containing more specific information than the current object about the error. */
  innererror?: InnerErrorModelOutput;
}

/** Represents the options used running the evaluation. */
export interface EvaluationOptionsOutput {
  /** Represents the evaluation kind. By default, the evaluation kind is set to percentage. */
  kind?: "percentage" | "manual";
  /** Represents the training dataset split percentage. Only needed in case the evaluation kind is percentage. */
  trainingSplitPercentage?: number;
  /** Represents the testing dataset split percentage. Only needed in case the evaluation kind is percentage. */
  testingSplitPercentage?: number;
}

/** Represents a list of retrieved deployments. */
export interface ProjectDeploymentsOutput {
  /** The list of retrieved deployments. */
  value: Array<ProjectDeploymentOutput>;
  /** The next page link. */
  nextLink: string;
}

/** Represents a project deployment. */
export interface ProjectDeploymentOutput {
  /** Represents deployment name. */
  deploymentName: string;
  /** Represents deployment modelId. */
  modelId: string;
  /** Represents deployment last trained time. */
  lastTrainedDateTime: string;
  /** Represents deployment last deployed time. */
  lastDeployedDateTime: string;
  /** Represents deployment expiration date in the runtime. */
  deploymentExpirationDate: string;
  /** Represents model training config version. */
  modelTrainingConfigVersion: string;
  /** Represents the metadata of the assigned Azure resources. */
  assignedResources?: Array<DeploymentResourceOutput>;
}

/** Represents an Azure resource assigned to a deployment. */
export interface DeploymentResourceOutput {
  /** Represents the Azure resource Id. */
  resourceId: string;
  /** Represents the resource region. */
  region: string;
}

/** Represents the state of a deployment job. */
export interface DeploymentJobStateOutput extends JobStateOutput {}

/** Represents a job's state. */
export interface JobStateOutput {
  /** The job ID. */
  jobId: string;
  /** The creation date time of the job. */
  createdDateTime: string;
  /** The last date time the job was updated. */
  lastUpdatedDateTime: string;
  /** The expiration date time of the job. */
  expirationDateTime?: string;
  /** The job status. */
  status:
    | "notStarted"
    | "running"
    | "succeeded"
    | "failed"
    | "cancelled"
    | "cancelling"
    | "partiallyCompleted";
  /** The warnings that were encountered while executing the job. */
  warnings?: Array<WarningOutput>;
  /** The errors encountered while executing the job. */
  errors?: Array<ErrorModelOutput>;
}

/** Represents a warning that was encountered while executing the request. */
export interface WarningOutput {
  /** The warning code. */
  code: string;
  /** The warning message. */
  message: string;
}

/** Represents the state of an export job. */
export interface ExportProjectJobStateOutput extends JobStateOutput {
  /** The URL to use in order to download the exported project. */
  resultUrl?: string;
}

/** Represents the state of an import job. */
export interface ImportProjectJobStateOutput extends JobStateOutput {}

/** Represents a list of retrieved trained models. */
export interface ProjectTrainedModelsOutput {
  /** The list of retrieved jobs. */
  value: Array<ProjectTrainedModelOutput>;
  /** The next page link. */
  nextLink: string;
}

/** Represents a trained model. */
export interface ProjectTrainedModelOutput {
  /** The trained model label. */
  label: string;
  /** The model ID. */
  modelId: string;
  /** The last trained date time of the model. */
  lastTrainedDateTime: string;
  /** The duration of the model's last training request in seconds. */
  lastTrainingDurationInSeconds: number;
  /** The model expiration date. */
  modelExpirationDate: string;
  /** The model training config version. */
  modelTrainingConfigVersion: string;
  /** The flag to indicate if the trained model has a snapshot ready. */
  hasSnapshot?: boolean;
}

/** Represents a list of results for an evaluation operation. */
export interface EvaluationResultsOutput {
  /** THe list of documents evaluation results. */
  value: Array<DocumentEvaluationResultOutput>;
  /** The next page link. */
  nextLink: string;
}

/** Represents the evaluation result of a document. */
export interface DocumentEvaluationResultOutputParent {
  /** Represents the document path. */
  location: string;
  /** Represents the document language. This is BCP-47 representation of a language. For example, use "en" for English, "en-gb" for English (UK), "es" for Spanish etc. */
  language: string;
  projectKind:
    | "DocumentEvaluationResult"
    | "CustomEntityRecognition"
    | "CustomMultiLabelClassification"
    | "CustomSingleLabelClassification";
}

/** Represents the summary for an evaluation operation. */
export interface EvaluationSummaryOutputParent {
  /** Represents the options used running the evaluation. */
  evaluationOptions: EvaluationOptionsOutput;
  projectKind:
    | "EvaluationSummary"
    | "CustomEntityRecognition"
    | "CustomMultiLabelClassification"
    | "CustomSingleLabelClassification";
}

/** Represents the state of loading a snapshot job. */
export interface LoadSnapshotJobStateOutput extends JobStateOutput {}

/** Represents the assigned deployment resources. */
export interface AssignedDeploymentResourcesOutput {
  /** The list of assigned deployment resources. */
  value: Array<AssignedDeploymentResourceOutput>;
  /** The next page link. */
  nextLink: string;
}

/** Represents the assigned deployment resource. */
export interface AssignedDeploymentResourceOutput {
  /** The resource ID. */
  azureResourceId: string;
  /** The resource region. */
  region: string;
}

/** Represents the state of a deployment resources job. */
export interface DeploymentResourcesJobStateOutput extends JobStateOutput {}

/** Represents a list of retrieved training jobs. */
export interface TrainingJobsOutput {
  /** The list of jobs. */
  value: Array<TrainingJobStateOutput>;
  /** The next page link. */
  nextLink: string;
}

/** Represents the state of a training job. */
export interface TrainingJobStateOutput extends JobStateOutput {
  /** Represents training tasks detailed result. */
  result: TrainingJobResultOutput;
}

/** Represents the output of a training job. */
export interface TrainingJobResultOutput {
  /** Represents trained model label. */
  modelLabel: string;
  /** Represents training config version. */
  trainingConfigVersion: string;
  /** Represents model train status. */
  trainingStatus: SubTrainingJobStateOutput;
  /** Represents model evaluation status. */
  evaluationStatus?: SubTrainingJobStateOutput;
  /** Represents the estimate end date time for training and evaluation. */
  estimatedEndDateTime?: string;
}

/** Represents the detailed state of a training sub-operation. */
export interface SubTrainingJobStateOutput {
  /** Represents progress percentage. */
  percentComplete: number;
  /** Represents the start date time. */
  startDateTime?: string;
  /** Represents the end date time. */
  endDateTime?: string;
  /** Represents the status of the sub-operation. */
  status:
    | "notStarted"
    | "running"
    | "succeeded"
    | "failed"
    | "cancelled"
    | "cancelling"
    | "partiallyCompleted";
}

/** Represents the state of a project deletion job. */
export interface ProjectDeletionJobStateOutput extends JobStateOutput {}

/** Represents the metadata for deployments assigned to a resource. */
export interface AssignedResourceDeploymentsMetadataOutput {
  /** The list of retrieved assigned project deployments. */
  value: Array<AssignedProjectDeploymentsMetadataOutput>;
  /** The next page link. */
  nextLink: string;
}

/** Represents the metadata for assigned deployments for a project. */
export interface AssignedProjectDeploymentsMetadataOutput {
  /** Represents the project name. */
  projectName: string;
  /** Represents the resource region. */
  deploymentsMetadata: Array<AssignedProjectDeploymentMetadataOutput>;
}

/** Represents the metadata for an assigned deployment */
export interface AssignedProjectDeploymentMetadataOutput {
  /** Represents the deployment name. */
  deploymentName: string;
  /** Represents deployment last deployed time. */
  lastDeployedDateTime: string;
  /** Represents deployment expiration date in the runtime. */
  deploymentExpirationDate: string;
}

/** Represents a list of retrieved languages. */
export interface SupportedLanguagesOutput {
  /** The list of the languages. */
  value: Array<SupportedLanguageOutput>;
  /** The next page link. */
  nextLink: string;
}

/** Represents a supported language. */
export interface SupportedLanguageOutput {
  /** The language name. */
  languageName: string;
  /** The language code. This is BCP-47 representation of a language. For example, "en" for English, "en-gb" for English (UK), "es" for Spanish etc. */
  languageCode: string;
}

/** Represents a list of training config versions. */
export interface TrainingConfigVersionsOutput {
  /** The list of the training config versions. */
  value: Array<TrainingConfigVersionOutput>;
  /** The next page link. */
  nextLink: string;
}

/** Represents a training config version. */
export interface TrainingConfigVersionOutput {
  /** Represents the version of the config. */
  trainingConfigVersion: string;
  /** Represents the training config version expiration date. */
  modelExpirationDate: string;
}

/** Represents a cell in a confusion matrix. */
export interface ConfusionMatrixCellOutput {
  /** Represents normalized value in percentages. */
  normalizedValue: number;
  /** Represents raw value. */
  rawValue: number;
}

/** Represents the document evaluation result for a custom entity recognition project. */
export interface CustomEntityRecognitionDocumentEvaluationResultOutput
  extends DocumentEvaluationResultOutputParent {
  /** Represents the evaluation prediction for entity recognition. */
  customEntityRecognitionResult: DocumentEntityRecognitionEvaluationResultOutput;
  projectKind: "CustomEntityRecognition";
}

/** Represents the entity recognition evaluation result for a document. */
export interface DocumentEntityRecognitionEvaluationResultOutput {
  /** Represents the document labelled entities. */
  entities: Array<DocumentEntityRegionEvaluationResultOutput>;
}

/** Represents the evaluation comparison between the expected and predicted entities of a document region. */
export interface DocumentEntityRegionEvaluationResultOutput {
  /** Represents the region's expected entity labels. */
  expectedEntities: Array<DocumentEntityLabelEvaluationResultOutput>;
  /** Represents the region's predicted entity labels. */
  predictedEntities: Array<DocumentEntityLabelEvaluationResultOutput>;
  /** Represents the region offset. */
  regionOffset: number;
  /** Represents the region length. */
  regionLength: number;
}

/** Represents an evaluation result entity label. */
export interface DocumentEntityLabelEvaluationResultOutput {
  /** Represents the entity category. */
  category: string;
  /** Represents the entity offset index relative to the original text. */
  offset: number;
  /** Represents the entity length. */
  length: number;
}

/** Represents the evaluation summary for a custom entity recognition project. */
export interface CustomEntityRecognitionEvaluationSummaryOutput
  extends EvaluationSummaryOutputParent {
  /** Contains the data related to extraction evaluation. */
  customEntityRecognitionEvaluation: EntityRecognitionEvaluationSummaryOutput;
  projectKind: "CustomEntityRecognition";
}

/** Represents the evaluation summary for a custom entity recognition project. */
export interface EntityRecognitionEvaluationSummaryOutput {
  /** Represents the confusion matrix between two entities (the two entities can be the same). The matrix is between the entity that was labelled and the entity that was predicted. */
  confusionMatrix: Record<string, Record<string, ConfusionMatrixCellOutput>>;
  /** Represents the entities evaluation */
  entities: Record<string, EntityEvaluationSummaryOutput>;
  /** Represents the micro F1 */
  microF1: number;
  /** Represents the micro precision */
  microPrecision: number;
  /** Represents the micro recall */
  microRecall: number;
  /** Represents the macro F1 */
  macroF1: number;
  /** Represents the macro precision */
  macroPrecision: number;
  /** Represents the macro recall */
  macroRecall: number;
}

/** Represents the evaluation summary for an entity. */
export interface EntityEvaluationSummaryOutput {
  /** Represents the model precision */
  f1: number;
  /** Represents the model recall */
  precision: number;
  /** Represents the model F1 score */
  recall: number;
  /** Represents the count of true positive */
  truePositiveCount: number;
  /** Represents the count of true negative */
  trueNegativeCount: number;
  /** Represents the count of false positive */
  falsePositiveCount: number;
  /** Represents the count of false negative */
  falseNegativeCount: number;
}

/** Represents the document evaluation result for a custom multi-label classification project. */
export interface CustomMultiLabelClassificationDocumentEvaluationResultOutput
  extends DocumentEvaluationResultOutputParent {
  /** Represents the evaluation prediction for multi label classification. */
  customMultiLabelClassificationResult: DocumentMultiLabelClassificationEvaluationResultOutput;
  projectKind: "CustomMultiLabelClassification";
}

/** Represents the comparison between the expected and predicted classes that are result from the evaluation operation. */
export interface DocumentMultiLabelClassificationEvaluationResultOutput {
  /** Represents the document's expected classes. */
  expectedClasses: Array<string>;
  /** Represents the document's predicted classes. */
  predictedClasses: Array<string>;
}

/** Represents the evaluation summary for a custom multi-label classification project. */
export interface CustomMultiLabelClassificationEvaluationSummaryOutput
  extends EvaluationSummaryOutputParent {
  /** Contains the data related to multi label classification evaluation. */
  customMultiLabelClassificationEvaluation: MultiLabelClassificationEvaluationSummaryOutput;
  projectKind: "CustomMultiLabelClassification";
}

/** Represents the evaluation summary for a multi-label classification project. */
export interface MultiLabelClassificationEvaluationSummaryOutput {
  /** Represents the classes evaluation */
  classes: Record<string, MultiLabelClassEvaluationSummaryOutput>;
  /** Represents the micro F1 */
  microF1: number;
  /** Represents the micro precision */
  microPrecision: number;
  /** Represents the micro recall */
  microRecall: number;
  /** Represents the macro F1 */
  macroF1: number;
  /** Represents the macro precision */
  macroPrecision: number;
  /** Represents the macro recall */
  macroRecall: number;
}

/** Represents the evaluation summary of a class in a multi-label classification project. */
export interface MultiLabelClassEvaluationSummaryOutput {
  /** Represents the model precision */
  f1: number;
  /** Represents the model recall */
  precision: number;
  /** Represents the model F1 score */
  recall: number;
  /** Represents the count of true positive */
  truePositiveCount: number;
  /** Represents the count of true negative */
  trueNegativeCount: number;
  /** Represents the count of false positive */
  falsePositiveCount: number;
  /** Represents the count of false negative */
  falseNegativeCount: number;
}

/** Represents the document evaluation result for a custom single-label classification project. */
export interface CustomSingleLabelClassificationDocumentEvaluationResultOutput
  extends DocumentEvaluationResultOutputParent {
  /** Represents the evaluation prediction for single label classification. */
  customSingleLabelClassificationResult: DocumentSingleLabelClassificationEvaluationResultOutput;
  projectKind: "CustomSingleLabelClassification";
}

/** Represents the comparison between the expected and predicted class that result from an evaluation operation. */
export interface DocumentSingleLabelClassificationEvaluationResultOutput {
  /** Represents the document's expected class. */
  expectedClass: string;
  /** Represents the document's predicted class. */
  predictedClass: string;
}

/** Represents the evaluation summary for a custom single-label classification project. */
export interface CustomSingleLabelClassificationEvaluationSummaryOutput
  extends EvaluationSummaryOutputParent {
  /** Contains the data related to single label classification evaluation. */
  customSingleLabelClassificationEvaluation: SingleLabelClassificationEvaluationSummaryOutput;
  projectKind: "CustomSingleLabelClassification";
}

/** Represents the evaluation summary for a custom single-label classification project. */
export interface SingleLabelClassificationEvaluationSummaryOutput {
  /** Represents the confusion matrix between two classes (the two classes can be the same). The matrix is between the class that was labelled and the class that was predicted. */
  confusionMatrix: Record<string, Record<string, ConfusionMatrixCellOutput>>;
  /** Represents the classes evaluation */
  classes: Record<string, SingleLabelClassEvaluationSummaryOutput>;
  /** Represents the micro F1 */
  microF1: number;
  /** Represents the micro precision */
  microPrecision: number;
  /** Represents the micro recall */
  microRecall: number;
  /** Represents the macro F1 */
  macroF1: number;
  /** Represents the macro precision */
  macroPrecision: number;
  /** Represents the macro recall */
  macroRecall: number;
}

/** Represents the evaluation summary for a class in a single-label classification project. */
export interface SingleLabelClassEvaluationSummaryOutput {
  /** Represents the model precision */
  f1: number;
  /** Represents the model recall */
  precision: number;
  /** Represents the model F1 score */
  recall: number;
  /** Represents the count of true positive */
  truePositiveCount: number;
  /** Represents the count of true negative */
  trueNegativeCount: number;
  /** Represents the count of false positive */
  falsePositiveCount: number;
  /** Represents the count of false negative */
  falseNegativeCount: number;
}

/** Represents the evaluation result of a document. */
export type DocumentEvaluationResultOutput =
  | CustomEntityRecognitionDocumentEvaluationResultOutput
  | CustomMultiLabelClassificationDocumentEvaluationResultOutput
  | CustomSingleLabelClassificationDocumentEvaluationResultOutput;
/** Represents the summary for an evaluation operation. */
export type EvaluationSummaryOutput =
  | CustomEntityRecognitionEvaluationSummaryOutput
  | CustomMultiLabelClassificationEvaluationSummaryOutput
  | CustomSingleLabelClassificationEvaluationSummaryOutput;

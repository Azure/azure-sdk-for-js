// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Represents the settings used to define the project behavior. */
export interface ProjectSettings {
  /** The threshold of the class with the highest confidence, at which the prediction will automatically be changed to "None". The value of the threshold should be between 0 and 1 inclusive. */
  confidenceThreshold?: number;
}

/** Represents the options used to create or update a project. */
export interface CreateProjectOptions {
  /** The project kind. */
  projectKind:
    | "CustomSingleLabelClassification"
    | "CustomMultiLabelClassification"
    | "CustomEntityRecognition"
    | "CustomAbstractiveSummarization";
  /** The storage container name. */
  storageInputContainerName: string;
  /** The project settings. */
  settings?: ProjectSettings;
  /** The new project name. */
  projectName: string;
  /** Whether the project would be used for multiple languages or not. */
  multilingual?: boolean;
  /** The project description. */
  description?: string;
  /** The project language. This is BCP-47 representation of a language. For example, use "en" for English, "en-gb" for English (UK), "es" for Spanish etc. */
  language: string;
}

/** Represents an exported project. */
export interface ExportedProject {
  /** The version of the exported file. */
  projectFileVersion: string;
  /** Specifies the method used to interpret string offsets. For additional information see https://aka.ms/text-analytics-offsets. */
  stringIndexType: "Utf16CodeUnit";
  /** Represents the project metadata. */
  metadata: CreateProjectOptions;
  /** Represents the project assets. */
  assets?: ExportedProjectAssets;
}

/** Represents the assets of an exported project. */
export interface ExportedProjectAssetsParent {
  projectKind:
    | "ExportedProjectAssets"
    | "CustomAbstractiveSummarization"
    | "CustomEntityRecognition"
    | "CustomMultiLabelClassification"
    | "CustomSingleLabelClassification";
}

/** Represents the options for starting a new training job. */
export interface TrainingJobOptions {
  /** Represents the output model label. */
  modelLabel: string;
  /** Represents training config version. */
  trainingConfigVersion: string;
  /** Represents the evaluation options. By default, the evaluation kind is percentage, with training split percentage as 80, and testing split percentage as 20. */
  evaluationOptions?: EvaluationOptions;
}

/** Represents the options used running the evaluation. */
export interface EvaluationOptions {
  /** Represents the evaluation kind. By default, the evaluation kind is set to percentage. */
  kind?: "percentage" | "manual";
  /** Represents the training dataset split percentage. Only needed in case the evaluation kind is percentage. */
  trainingSplitPercentage?: number;
  /** Represents the testing dataset split percentage. Only needed in case the evaluation kind is percentage. */
  testingSplitPercentage?: number;
}

/** Represents the options for swapping two deployments together. */
export interface SwapDeploymentsOptions {
  /** Represents the first deployment name. */
  firstDeploymentName: string;
  /** Represents the second deployment name. */
  secondDeploymentName: string;
}

/** Represents the options for creating or updating a project deployment. */
export interface CreateDeploymentOptions {
  /** Represents the trained model label. */
  trainedModelLabel: string;
  /**
   * Represents the resource IDs to be assigned to the deployment.
   *             If provided, the deployment will be rolled out to the resources provided here as well as the original resource in which the project is created.
   */
  assignedResourceIds?: Array<string>;
}

/** Represents the options for deleting a project deployment. */
export interface DeleteDeploymentOptions {
  /**
   * Represents the resource IDs to delete the deployment from.
   *             If not provided, the deployment will be rolled out from all the resources it is deployed to.
   *             If provided, it will delete the deployment only from the specified assigned resources, and leave it for the rest.
   */
  assignedResourceIds?: Array<string>;
}

/** Represents the options for assigning Azure resources to a project. */
export interface AssignDeploymentResourcesOptions {
  /** Represents the metadata for the resources to be assigned. */
  resourcesMetadata: Array<ResourceMetadata>;
}

/** Represents metadata for the Azure resource.. */
export interface ResourceMetadata {
  /** Represents the Azure resource ID. */
  azureResourceId: string;
  /** Represents the Azure resource custom domain. */
  customDomain: string;
  /** Represents the Azure resource region. */
  region: string;
}

/** Represents the options to unassign Azure resources from a project. */
export interface UnassignDeploymentResourcesOptions {
  /** Represents the assigned resource IDs to be unassigned. */
  assignedResourceIds: Array<string>;
}

/** Represents a class of an exported project. */
export interface ExportedClass {
  /** The class category. */
  category?: string;
}

/** Represents an exported document for a custom abstractive summarization project. */
export interface ExportedCustomAbstractiveSummarizationDocument {
  /** Represents the summary file location in the blob store container associated with the project. */
  summaryLocation: string;
  /** The location of the document in the storage. */
  location?: string;
  /** Represents the document language. This is BCP-47 representation of a language. For example, use "en" for English, "en-gb" for English (UK), "es" for Spanish etc. */
  language?: string;
  /** The dataset for this document. Allowed values are 'Train' and 'Test'. */
  dataset?: string;
}

/** Represents the exported assets for an abstractive summarization project. */
export interface ExportedCustomAbstractiveSummarizationProjectAssets
  extends ExportedProjectAssetsParent {
  /** The list of documents belonging to this project. */
  documents?: Array<ExportedCustomAbstractiveSummarizationDocument>;
  projectKind: "CustomAbstractiveSummarization";
}

/** Represents an exported document for a custom entity recognition project. */
export interface ExportedCustomEntityRecognitionDocument {
  /** The list of entity labels belonging to the document. */
  entities?: Array<ExportedDocumentRegion>;
  /** The location of the document in the storage. */
  location?: string;
  /** Represents the document language. This is BCP-47 representation of a language. For example, use "en" for English, "en-gb" for English (UK), "es" for Spanish etc. */
  language?: string;
  /** The dataset for this document. Allowed values are 'Train' and 'Test'. */
  dataset?: string;
}

/** Represents a region in a document for entity labeling. */
export interface ExportedDocumentRegion {
  /** Start position for the region. */
  regionOffset?: number;
  /** Length for the region text. */
  regionLength?: number;
  /** The list of entity labels belonging to this region. */
  labels?: Array<ExportedDocumentEntityLabel>;
}

/** Represents an entity label for a document. */
export interface ExportedDocumentEntityLabel {
  /** The entity category. */
  category?: string;
  /** Start position for the entity text. */
  offset?: number;
  /** Length for the entity text. */
  length?: number;
}

/** Represents the exported assets for a entity recognition project. */
export interface ExportedCustomEntityRecognitionProjectAssets extends ExportedProjectAssetsParent {
  /** The list of entities belonging to the project. */
  entities?: Array<ExportedEntity>;
  /** The list of documents belonging to the project. */
  documents?: Array<ExportedCustomEntityRecognitionDocument>;
  projectKind: "CustomEntityRecognition";
}

/** Represents an entity in an exported project. */
export interface ExportedEntity {
  /** The entity category. */
  category?: string;
}

/** Represents an exported document of a custom multi-label classification project. */
export interface ExportedCustomMultiLabelClassificationDocument {
  /** The document classes. */
  classes?: Array<ExportedDocumentClass>;
  /** The location of the document in the storage. */
  location?: string;
  /** Represents the document language. This is BCP-47 representation of a language. For example, use "en" for English, "en-gb" for English (UK), "es" for Spanish etc. */
  language?: string;
  /** The dataset for this document. Allowed values are 'Train' and 'Test'. */
  dataset?: string;
}

/** Represents a classification label for a document. */
export interface ExportedDocumentClass {
  category?: string;
}

/** Represents the exported assets for a custom multi-label classification project. */
export interface ExportedCustomMultiLabelClassificationProjectAssets
  extends ExportedProjectAssetsParent {
  /** The list of classes in the project. */
  classes?: Array<ExportedClass>;
  /** The list of documents in the project. */
  documents?: Array<ExportedCustomMultiLabelClassificationDocument>;
  projectKind: "CustomMultiLabelClassification";
}

/** Represents an exported document for a custom single-label classification project. */
export interface ExportedCustomSingleLabelClassificationDocument {
  /** The class of the documents. */
  class?: ExportedDocumentClass;
  /** The location of the document in the storage. */
  location?: string;
  /** Represents the document language. This is BCP-47 representation of a language. For example, use "en" for English, "en-gb" for English (UK), "es" for Spanish etc. */
  language?: string;
  /** The dataset for this document. Allowed values are 'Train' and 'Test'. */
  dataset?: string;
}

/** Represents the exported assets for a single-label classification project. */
export interface ExportedCustomSingleLabelClassificationProjectAssets
  extends ExportedProjectAssetsParent {
  /** The list of classes belonging to this project. */
  classes?: Array<ExportedClass>;
  /** The list of documents belonging to this project. */
  documents?: Array<ExportedCustomSingleLabelClassificationDocument>;
  projectKind: "CustomSingleLabelClassification";
}

/** Represents the assets of an exported project. */
export type ExportedProjectAssets =
  | ExportedCustomAbstractiveSummarizationProjectAssets
  | ExportedCustomEntityRecognitionProjectAssets
  | ExportedCustomMultiLabelClassificationProjectAssets
  | ExportedCustomSingleLabelClassificationProjectAssets;

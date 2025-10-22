// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Analyzer that extracts content and fields from multimodal documents. */
export interface ContentAnalyzer {
  /** A description of the analyzer. */
  description?: string;
  /** Tags associated with the analyzer. */
  tags?: Record<string, string>;
  /** The analyzer to incrementally train from. */
  baseAnalyzerId?: string;
  /** Analyzer configuration settings. */
  config?: ContentAnalyzerConfig;
  /** The schema of fields to extracted. */
  fieldSchema?: FieldSchema;
  /** The data source containing training data for the analyzer. */
  trainingData?: DataSource;
  /**
   * The location where the data may be processed.
   *
   * Possible values: "geography", "dataZone", "global"
   */
  processingLocation?: ProcessingLocation;
  /**
   * The analysis mode: standard, pro.  Default is standard.
   *
   * Possible values: "standard", "pro"
   */
  mode?: AnalysisMode;
  /** Additional knowledge sources used to enhance the analyzer. */
  knowledgeSources?: Array<KnowledgeSource>;
}

/** Configuration settings for an analyzer. */
export interface ContentAnalyzerConfig {
  /** Return all content details. */
  returnDetails?: boolean;
  /** List of locale hints for speech transcription. */
  locales?: string[];
  /** Enable face detection. */
  enableFace?: boolean;
  /** Specify the person directory used for identifying detected faces. */
  personDirectoryId?: string;
  /** Enable optical character recognition (OCR). */
  enableOcr?: boolean;
  /** Enable layout analysis. */
  enableLayout?: boolean;
  /**
   * Representation format of tables in analyze result markdown.
   *
   * Possible values: "html"
   */
  tableFormat?: TableFormat;
  /** Enable mathematical formula detection. */
  enableFormula?: boolean;
  /** Disable the default blurring of faces for privacy while processing the content. */
  disableFaceBlurring?: boolean;
  /** Disable content filtering that detects and prevents the output of harmful content. */
  disableContentFiltering?: boolean;
  /** Return grounding source and confidence for extracted fields. */
  estimateFieldSourceAndConfidence?: boolean;
  /**
   * Segmentation mode used to split audio/visual content.
   *
   * Possible values: "noSegmentation", "auto", "custom"
   */
  segmentationMode?: SegmentationMode;
  /** Segmentation definition for use with custom segmentation mode. */
  segmentationDefinition?: string;
}

/** Schema of fields to be extracted from documents. */
export interface FieldSchema {
  /** The name of the field schema. */
  name?: string;
  /** A description of the field schema. */
  description?: string;
  /** The fields defined in the schema. */
  fields: Record<string, ContentFieldDefinition>;
  /** Additional definitions referenced by the fields in the schema. */
  definitions?: Record<string, ContentFieldDefinition>;
}

/** Definition of the field using a JSON Schema like syntax. */
export interface ContentFieldDefinition {
  /**
   * Generation method.
   *
   * Possible values: "generate", "extract", "classify"
   */
  method?: GenerationMethod;
  /**
   * Semantic data type of the field value.
   *
   * Possible values: "string", "date", "time", "number", "integer", "boolean", "array", "object"
   */
  type?: ContentFieldType;
  /** Field description. */
  description?: string;
  /** Field type schema of each array element, if type is array. */
  items?: ContentFieldDefinition;
  /** Named sub-fields, if type is object. */
  properties?: Record<string, ContentFieldDefinition>;
  /** Examples of field values. */
  examples?: string[];
  /** Enumeration of possible field values. */
  enum?: string[];
  /** Descriptions for each enumeration value. */
  enumDescriptions?: Record<string, string>;
  /** Reference to another field definition. */
  $ref?: string;
}

/** Data source specifying a set of documents. */
export interface DataSourceParent {
  kind: DataSourceKind;
}

/** Blob storage data source. */
export interface BlobDataSource extends DataSourceParent {
  /** Indicates that the data source is a blob. */
  kind: "blob";
  /** The URL of the blob container. */
  containerUrl: string;
  /** An optional prefix to filter blobs within the container. */
  prefix?: string;
  /** An optional path to a file listing specific blobs to include. */
  fileListPath?: string;
}

/** Knowledge source. */
export interface KnowledgeSourceParent {
  kind: KnowledgeSourceKind;
}

/** File knowledge source. */
export interface ReferenceKnowledgeSource extends KnowledgeSourceParent {
  /** Indicates that the knowledge source is a reference knowledge source. */
  kind: "reference";
  /** The URL of the blob container. */
  containerUrl: string;
  /** An optional prefix to filter blobs within the container. */
  prefix?: string;
  /** Path to a file listing specific blobs to include. */
  fileListPath: string;
}

/** Analyze operation request. */
export interface AnalyzeRequest {
  /** The URL of the primary input to analyze.  Only one of url or data should be specified. */
  url?: string;
  /** Base64-encoded binary content of the primary input to analyze.  Only one of url or data should be specified. */
  data?: string;
  /** Additional inputs to analyze.  Only supported in analyzers with mode=pro. */
  inputs?: Array<AnalyzeInput>;
}

/** Additional input to analyze. */
export interface AnalyzeInput {
  /** The URL of the input to analyze.  Only one of url or data should be specified. */
  url: string;
  /** Base64-encoded binary content of the input to analyze.  Only one of url or data should be specified. */
  data?: string;
  /** Name of the input. */
  name?: string;
}

/** Directory of people and their faces. */
export interface PersonDirectory {
  /** A description of the person directory. */
  description?: string;
  /** Tags associated with the person directory. */
  tags?: Record<string, string>;
}

/** Person in a person directory. */
export interface PersonDirectoryPerson {
  /** Tags associated with the person. */
  tags?: Record<string, string>;
  /** List of faces associated with the person. */
  faceIds?: string[];
}

/** Add face parameters. */
export interface AddFaceParameters {
  /** Source of the face. */
  faceSource: FaceSource;
  /** Person identifier with which to associate the face. */
  personId?: string;
  /**
   * Face quality threshold below which the face will not be added. Default is medium.
   *
   * Possible values: "low", "medium", "high"
   */
  qualityThreshold?: QualityForRecognition;
}

/** Input face source with an optional target bounding box.  If not specified, the largest face will be used. */
export interface FaceSource {
  /** Image URL.  Only one of url or data should be specified. */
  url?: string;
  /** Base64-encoded image data.  Only one of url or data should be specified. */
  data?: string;
  /** User provided identifier for the source image. */
  imageReferenceId?: string;
  /** Bounding box specifying the region of interest. */
  targetBoundingBox?: BoundingBox;
}

/** Bounding box in an image. */
export interface BoundingBox {
  /** Left coordinate of the bounding box. */
  left: number;
  /** Top coordinate of the bounding box. */
  top: number;
  /** Width of the bounding box. */
  width: number;
  /** Height of the bounding box. */
  height: number;
}

/** Face in a person directory. */
export interface PersonDirectoryFace {
  /** Person associated with the face, if any. */
  personId?: string;
}

/** Identify person parameters. */
export interface IdentifyPersonParameters {
  /** Source of the face. */
  faceSource: FaceSource;
  /** Maximum number of person candidates to return (up to 10). */
  maxPersonCandidates?: number;
}

/** Find similar faces parameters. */
export interface FindSimilarFacesParameters {
  /** Source of the face. */
  faceSource?: FaceSource;
  /** Maximum number of similar faces to return (up to 1000). */
  maxSimilarFaces?: number;
}

/** Verify person parameters. */
export interface VerifyPersonParameters {
  /** Source of the face. */
  faceSource: FaceSource;
}

/** Detect faces parameters. */
export interface DetectFacesParameters {
  /** Image URL.  Only one of url or data should be specified. */
  url?: string;
  /** Base64-encoded image data.  Only one of url or data should be specified. */
  data?: string;
  /** Maximum number of faces to return (up to 100). */
  maxDetectedFaces?: number;
}

/** Compare faces parameters. */
export interface CompareFacesParameters {
  /** First face to compare. */
  faceSource1: FaceSource;
  /** Second face to compare. */
  faceSource2: FaceSource;
}

/** Classifier that classifies content into categories with optional splitting. */
export interface ContentClassifier {
  /** A description of the classifier. */
  description?: string;
  /** Tags associated with the classifier. */
  tags?: Record<string, string>;
  /** The categories to classify against. */
  categories: Record<string, ClassifierCategoryDefinition>;
  /**
   * Mode used to split input into content objects.
   *
   * Possible values: "noSplit", "perPage", "auto"
   */
  splitMode?: ClassifierSplitMode;
  /**
   * The location where the data may be processed.
   *
   * Possible values: "geography", "dataZone", "global"
   */
  processingLocation?: ProcessingLocation;
}

/** A classifier category. */
export interface ClassifierCategoryDefinition {
  /** The description of the category. */
  description?: string;
  /** Optional analyzer used to process the content. */
  analyzerId?: string;
}

/** Classify operation request. */
export interface ClassifyRequest {
  /** The URL of the document to classify. */
  url?: string;
}

/** Data source specifying a set of documents. */
export type DataSource = DataSourceParent | BlobDataSource;
/** Knowledge source. */
export type KnowledgeSource = KnowledgeSourceParent | ReferenceKnowledgeSource;
/** Alias for ResourceStatus */
export type ResourceStatus = string;
/** Alias for TableFormat */
export type TableFormat = string;
/** Alias for SegmentationMode */
export type SegmentationMode = string;
/** Alias for GenerationMethod */
export type GenerationMethod = string;
/** Alias for ContentFieldType */
export type ContentFieldType = string;
/** Alias for DataSourceKind */
export type DataSourceKind = string;
/** Alias for ProcessingLocation */
export type ProcessingLocation = string;
/** Alias for AnalysisMode */
export type AnalysisMode = string;
/** Alias for KnowledgeSourceKind */
export type KnowledgeSourceKind = string;
/** Alias for StringEncoding */
export type StringEncoding = string;
/** Alias for QualityForRecognition */
export type QualityForRecognition = string;
/** Alias for ClassifierSplitMode */
export type ClassifierSplitMode = string;

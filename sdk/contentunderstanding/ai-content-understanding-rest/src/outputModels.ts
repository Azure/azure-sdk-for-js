// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ErrorModel } from "@azure-rest/core-client";

/** Provides status details for long running operations. */
export interface ResourceOperationStatusContentAnalyzerContentAnalyzerErrorOutput {
  /** The unique ID of the operation. */
  id: string;
  /**
   * The status of the operation
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: ContentAnalyzerOutput;
}

/** Analyzer that extracts content and fields from multimodal documents. */
export interface ContentAnalyzerOutput {
  /** The unique identifier of the analyzer. */
  readonly analyzerId: string;
  /** A description of the analyzer. */
  description?: string;
  /** Tags associated with the analyzer. */
  tags?: Record<string, string>;
  /**
   * The status of the analyzer.
   *
   * Possible values: "creating", "ready", "deleting", "failed"
   */
  readonly status: ResourceStatusOutput;
  /** The date and time when the analyzer was created. */
  readonly createdAt: string;
  /** The date and time when the analyzer was last modified. */
  readonly lastModifiedAt: string;
  /** Warnings encountered while creating the analyzer. */
  readonly warnings?: Array<ErrorModel>;
  /** The analyzer to incrementally train from. */
  baseAnalyzerId?: string;
  /** Analyzer configuration settings. */
  config?: ContentAnalyzerConfigOutput;
  /** The schema of fields to extracted. */
  fieldSchema?: FieldSchemaOutput;
  /** The data source containing training data for the analyzer. */
  trainingData?: DataSourceOutput;
  /**
   * The location where the data may be processed.
   *
   * Possible values: "geography", "dataZone", "global"
   */
  processingLocation?: ProcessingLocationOutput;
  /**
   * The analysis mode: standard, pro.  Default is standard.
   *
   * Possible values: "standard", "pro"
   */
  mode?: AnalysisModeOutput;
  /** Additional knowledge sources used to enhance the analyzer. */
  knowledgeSources?: Array<KnowledgeSourceOutput>;
}

/** Configuration settings for an analyzer. */
export interface ContentAnalyzerConfigOutput {
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
  tableFormat?: TableFormatOutput;
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
  segmentationMode?: SegmentationModeOutput;
  /** Segmentation definition for use with custom segmentation mode. */
  segmentationDefinition?: string;
}

/** Schema of fields to be extracted from documents. */
export interface FieldSchemaOutput {
  /** The name of the field schema. */
  name?: string;
  /** A description of the field schema. */
  description?: string;
  /** The fields defined in the schema. */
  fields: Record<string, ContentFieldDefinitionOutput>;
  /** Additional definitions referenced by the fields in the schema. */
  definitions?: Record<string, ContentFieldDefinitionOutput>;
}

/** Definition of the field using a JSON Schema like syntax. */
export interface ContentFieldDefinitionOutput {
  /**
   * Generation method.
   *
   * Possible values: "generate", "extract", "classify"
   */
  method?: GenerationMethodOutput;
  /**
   * Semantic data type of the field value.
   *
   * Possible values: "string", "date", "time", "number", "integer", "boolean", "array", "object"
   */
  type?: ContentFieldTypeOutput;
  /** Field description. */
  description?: string;
  /** Field type schema of each array element, if type is array. */
  items?: ContentFieldDefinitionOutput;
  /** Named sub-fields, if type is object. */
  properties?: Record<string, ContentFieldDefinitionOutput>;
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
export interface DataSourceOutputParent {
  kind: DataSourceKindOutput;
}

/** Blob storage data source. */
export interface BlobDataSourceOutput extends DataSourceOutputParent {
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
export interface KnowledgeSourceOutputParent {
  kind: KnowledgeSourceKindOutput;
}

/** File knowledge source. */
export interface ReferenceKnowledgeSourceOutput
  extends KnowledgeSourceOutputParent {
  /** Indicates that the knowledge source is a reference knowledge source. */
  kind: "reference";
  /** The URL of the blob container. */
  containerUrl: string;
  /** An optional prefix to filter blobs within the container. */
  prefix?: string;
  /** Path to a file listing specific blobs to include. */
  fileListPath: string;
}

/** Paged collection of ContentAnalyzer items */
export interface PagedContentAnalyzerOutput {
  /** The ContentAnalyzer items on this page */
  value: Array<ContentAnalyzerOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Provides status details for long running operations. */
export interface ResourceOperationStatusContentAnalyzerAnalyzeResultErrorOutput {
  /** The unique ID of the operation. */
  id: string;
  /**
   * The status of the operation
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: AnalyzeResultOutput;
}

/** Analyze operation result. */
export interface AnalyzeResultOutput {
  /** The unique identifier of the analyzer. */
  analyzerId?: string;
  /** The version of the API used to analyze the document. */
  apiVersion?: string;
  /** The date and time when the result was created. */
  createdAt?: string;
  /** Warnings encountered while analyzing the document. */
  warnings?: Array<ErrorModel>;
  /**
   * The string encoding used for content spans.
   *
   * Possible values: "codePoint", "utf16", "utf8"
   */
  stringEncoding?: StringEncodingOutput;
  /** The extracted content. */
  contents: Array<MediaContentOutput>;
}

/** Media content base class. */
export interface MediaContentOutputParent {
  /** Detected MIME type of the content.  Ex. application/pdf, image/jpeg, etc. */
  mimeType?: string;
  /** Classified content category. */
  category?: string;
  /** The path of the content in the input. */
  path?: string;
  /** Markdown representation of the content. */
  markdown?: string;
  /** Extracted fields from the content. */
  fields?: Record<string, ContentFieldOutput>;
  kind: MediaContentKindOutput;
}

/** Field extracted from the content. */
export interface ContentFieldOutputParent {
  /** Span(s) associated with the field value in the markdown content. */
  spans?: Array<ContentSpanOutput>;
  /** Confidence of predicting the field value. */
  confidence?: number;
  /** Encoded source that identifies the position of the field value in the content. */
  source?: string;
  type: ContentFieldTypeOutput;
}

/** Position of the element in markdown, specified as a character offset and length. */
export interface ContentSpanOutput {
  /** Starting position (0-indexed) of the element in markdown, specified in characters. */
  offset: number;
  /** Length of the element in markdown, specified in characters. */
  length: number;
}

/** String field extracted from the content. */
export interface StringFieldOutput extends ContentFieldOutputParent {
  /** Semantic data type of the field value. */
  type: "string";
  /** String field value. */
  valueString?: string;
}

/** Date field extracted from the content. */
export interface DateFieldOutput extends ContentFieldOutputParent {
  /** Semantic data type of the field value. */
  type: "date";
  /** Date field value, in ISO 8601 (YYYY-MM-DD) format. */
  valueDate?: string;
}

/** Time field extracted from the content. */
export interface TimeFieldOutput extends ContentFieldOutputParent {
  /** Semantic data type of the field value. */
  type: "time";
  /** Time field value, in ISO 8601 (hh:mm:ss) format. */
  valueTime?: string;
}

/** Number field extracted from the content. */
export interface NumberFieldOutput extends ContentFieldOutputParent {
  /** Semantic data type of the field value. */
  type: "number";
  /** Number field value. */
  valueNumber?: number;
}

/** Integer field extracted from the content. */
export interface IntegerFieldOutput extends ContentFieldOutputParent {
  /** Semantic data type of the field value. */
  type: "integer";
  /** Integer field value. */
  valueInteger?: number;
}

/** Boolean field extracted from the content. */
export interface BooleanFieldOutput extends ContentFieldOutputParent {
  /** Semantic data type of the field value. */
  type: "boolean";
  /** Boolean field value. */
  valueBoolean?: boolean;
}

/** Array field extracted from the content. */
export interface ArrayFieldOutput extends ContentFieldOutputParent {
  /** Semantic data type of the field value. */
  type: "array";
  /** Array field value. */
  valueArray?: Array<ContentFieldOutput>;
}

/** Object field extracted from the content. */
export interface ObjectFieldOutput extends ContentFieldOutputParent {
  /** Semantic data type of the field value. */
  type: "object";
  /** Object field value. */
  valueObject?: Record<string, ContentFieldOutput>;
}

/** Document content.  Ex. text/plain, application/pdf, image/jpeg. */
export interface DocumentContentOutput extends MediaContentOutputParent {
  /** Content kind. */
  kind: "document";
  /** Start page number (1-indexed) of the content. */
  startPageNumber: number;
  /** End page number (1-indexed) of the content. */
  endPageNumber: number;
  /**
   * Length unit used by the width, height, and source properties.
   * For images/tiff, the default unit is pixel.  For PDF, the default unit is inch.
   *
   * Possible values: "pixel", "inch"
   */
  unit?: LengthUnitOutput;
  /** List of pages in the document. */
  pages?: Array<DocumentPageOutput>;
  /** List of paragraphs in the document.  Only if enableOcr and returnDetails are true. */
  paragraphs?: Array<DocumentParagraphOutput>;
  /** List of sections in the document.  Only if enableLayout and returnDetails are true. */
  sections?: Array<DocumentSectionOutput>;
  /** List of tables in the document.  Only if enableLayout and returnDetails are true. */
  tables?: Array<DocumentTableOutput>;
  /** List of figures in the document.  Only if enableLayout and returnDetails are true. */
  figures?: Array<DocumentFigureOutput>;
  /** List of detected persons in the document.  Only if enableFace and returnDetails are true. */
  persons?: Array<DetectedPersonOutput>;
}

/** Content from a document page. */
export interface DocumentPageOutput {
  /** Page number (1-based). */
  pageNumber: number;
  /** Width of the page. */
  width?: number;
  /** Height of the page. */
  height?: number;
  /** Span(s) associated with the page in the markdown content. */
  spans?: Array<ContentSpanOutput>;
  /**
   * The general orientation of the content in clockwise direction,
   * measured in degrees between (-180, 180].
   * Only if enableOcr is true.
   */
  angle?: number;
  /** List of words in the page.  Only if enableOcr and returnDetails are true. */
  words?: Array<DocumentWordOutput>;
  /** List of lines in the page.  Only if enableOcr and returnDetails are true. */
  lines?: Array<DocumentLineOutput>;
  /** List of barcodes in the page.  Only if enableBarcode and returnDetails are true. */
  barcodes?: Array<DocumentBarcodeOutput>;
  /** List of mathematical formulas in the page.  Only if enableFormula and returnDetails are true. */
  formulas?: Array<DocumentFormulaOutput>;
}

/**
 * Word in a document, consisting of a contiguous sequence of characters.
 * For non-space delimited languages, such as Chinese, Japanese, and Korean,
 * each character is represented as its own word.
 */
export interface DocumentWordOutput {
  /** Word text. */
  content: string;
  /** Encoded source that identifies the position of the word in the content. */
  source?: string;
  /** Span of the word in the markdown content. */
  span?: ContentSpanOutput;
  /** Confidence of predicting the word. */
  confidence?: number;
}

/** Line in a document, consisting of an contiguous sequence of words. */
export interface DocumentLineOutput {
  /** Line text. */
  content: string;
  /** Encoded source that identifies the position of the line in the content. */
  source?: string;
  /** Span of the line in the markdown content. */
  span?: ContentSpanOutput;
}

/** Barcode in a document. */
export interface DocumentBarcodeOutput {
  /**
   * Barcode kind.
   *
   * Possible values: "QRCode", "PDF417", "UPCA", "UPCE", "Code39", "Code128", "EAN8", "EAN13", "DataBar", "Code93", "Codabar", "DataBarExpanded", "ITF", "MicroQRCode", "Aztec", "DataMatrix", "MaxiCode"
   */
  kind: DocumentBarcodeKindOutput;
  /** Barcode value. */
  value: string;
  /** Encoded source that identifies the position of the barcode in the content. */
  source?: string;
  /** Span of the barcode in the markdown content. */
  span?: ContentSpanOutput;
  /** Confidence of predicting the barcode. */
  confidence?: number;
}

/** Mathematical formula in a document. */
export interface DocumentFormulaOutput {
  /**
   * Formula kind.
   *
   * Possible values: "inline", "display"
   */
  kind: DocumentFormulaKindOutput;
  /** LaTex expression describing the formula. */
  value: string;
  /** Encoded source that identifies the position of the formula in the content. */
  source?: string;
  /** Span of the formula in the markdown content. */
  span?: ContentSpanOutput;
  /** Confidence of predicting the formula. */
  confidence?: number;
}

/**
 * Paragraph in a document, generally consisting of an contiguous sequence of lines
 * with common alignment and spacing.
 */
export interface DocumentParagraphOutput {
  /**
   * Semantic role of the paragraph.
   *
   * Possible values: "pageHeader", "pageFooter", "pageNumber", "title", "sectionHeading", "footnote", "formulaBlock"
   */
  role?: ParagraphRoleOutput;
  /** Paragraph text. */
  content: string;
  /** Encoded source that identifies the position of the paragraph in the content. */
  source?: string;
  /** Span of the paragraph in the markdown content. */
  span?: ContentSpanOutput;
}

/** Section in a document. */
export interface DocumentSectionOutput {
  /** Span of the section in the markdown content. */
  span?: ContentSpanOutput;
  /** Child elements of the section. */
  elements?: string[];
}

/** Table in a document, consisting table cells arranged in a rectangular layout. */
export interface DocumentTableOutput {
  /** Number of rows in the table. */
  rowCount: number;
  /** Number of columns in the table. */
  columnCount: number;
  /** Cells contained within the table. */
  cells: Array<DocumentTableCellOutput>;
  /** Encoded source that identifies the position of the table in the content. */
  source?: string;
  /** Span of the table in the markdown content. */
  span?: ContentSpanOutput;
  /** Table caption. */
  caption?: DocumentCaptionOutput;
  /** List of table footnotes. */
  footnotes?: Array<DocumentFootnoteOutput>;
}

/** Table cell in a document table. */
export interface DocumentTableCellOutput {
  /**
   * Table cell kind.
   *
   * Possible values: "content", "rowHeader", "columnHeader", "stubHead", "description"
   */
  kind?: DocumentTableCellKindOutput;
  /** Row index of the cell. */
  rowIndex: number;
  /** Column index of the cell. */
  columnIndex: number;
  /** Number of rows spanned by this cell. */
  rowSpan?: number;
  /** Number of columns spanned by this cell. */
  columnSpan?: number;
  /** Content of the table cell. */
  content: string;
  /** Encoded source that identifies the position of the table cell in the content. */
  source?: string;
  /** Span of the table cell in the markdown content. */
  span?: ContentSpanOutput;
  /** Child elements of the table cell. */
  elements?: string[];
}

/** Caption of a table or figure. */
export interface DocumentCaptionOutput {
  /** Content of the caption. */
  content: string;
  /** Encoded source that identifies the position of the caption in the content. */
  source?: string;
  /** Span of the caption in the markdown content. */
  span?: ContentSpanOutput;
  /** Child elements of the caption. */
  elements?: string[];
}

/** Footnote of a table or figure. */
export interface DocumentFootnoteOutput {
  /** Content of the footnote. */
  content: string;
  /** Encoded source that identifies the position of the footnote in the content. */
  source?: string;
  /** Span of the footnote in the markdown content. */
  span?: ContentSpanOutput;
  /** Child elements of the footnote. */
  elements?: string[];
}

/** Figure in a document. */
export interface DocumentFigureOutput {
  /** Figure identifier. */
  id: string;
  /** Encoded source that identifies the position of the figure in the content. */
  source?: string;
  /** Span of the figure in the markdown content. */
  span?: ContentSpanOutput;
  /** Child elements of the figure, excluding any caption or footnotes. */
  elements?: string[];
  /** Figure caption. */
  caption?: DocumentCaptionOutput;
  /** List of figure footnotes. */
  footnotes?: Array<DocumentFootnoteOutput>;
}

/** Detected person. */
export interface DetectedPersonOutput {
  /** Person identifier in the optional person directory if found.  Otherwise, each unknown person is assigned a unique `Person-{Number}`. */
  personId?: string;
  /** Confidence of the person identification, if a person directory is provided. */
  confidence?: number;
  /** Encoded source that identifies the position of the person in the input content. */
  source?: string;
}

/** Audio visual content.  Ex. audio/wav, video/mp4. */
export interface AudioVisualContentOutput extends MediaContentOutputParent {
  /** Content kind. */
  kind: "audioVisual";
  /** Start time of the content in milliseconds. */
  startTimeMs: number;
  /** End time of the content in milliseconds. */
  endTimeMs: number;
  /** Width of each video frame in pixels, if applicable. */
  width?: number;
  /** Height of each video frame in pixels, if applicable. */
  height?: number;
  /** List of camera shot changes in the video, represented by its timestamp in milliseconds.  Only if returnDetails is true. */
  cameraShotTimesMs?: number[];
  /** List of key frames in the video, represented by its timestamp in milliseconds.  Only if returnDetails is true. */
  keyFrameTimesMs?: number[];
  /** List of transcript phrases.  Only if returnDetails is true. */
  transcriptPhrases?: Array<TranscriptPhraseOutput>;
  /** List of detected persons in the video.  Only if enableFace and returnDetails are true. */
  persons?: Array<DetectedPersonOutput>;
  /** List of audio visual segments.  Only if enableSegmentation and returnDetails are true. */
  segments?: Array<AudioVisualSegmentOutput>;
}

/** Transcript phrase. */
export interface TranscriptPhraseOutput {
  /** Speaker index or name. */
  speaker?: string;
  /** Start time of the phrase in milliseconds. */
  startTimeMs: number;
  /** End time of the phrase in milliseconds. */
  endTimeMs: number;
  /** Detected locale of the phrase.  Ex. en-US. */
  locale?: string;
  /** Transcript text. */
  text: string;
  /** Confidence of predicting the phrase. */
  confidence?: number;
  /** Span of the phrase in the markdown content. */
  span?: ContentSpanOutput;
  /** List of words in the phrase. */
  words: Array<TranscriptWordOutput>;
}

/** Transcript word. */
export interface TranscriptWordOutput {
  /** Start time of the word in milliseconds. */
  startTimeMs: number;
  /** End time of the word in milliseconds. */
  endTimeMs: number;
  /** Transcript text. */
  text: string;
  /** Span of the word in the markdown content. */
  span?: ContentSpanOutput;
}

/** Audio visual segment, such as a scene, chapter, etc. */
export interface AudioVisualSegmentOutput {
  /** Segment ID. */
  segmentId: string;
  /** Start time of the segment in milliseconds. */
  startTimeMs: number;
  /** End time of the segment in milliseconds. */
  endTimeMs: number;
  /** Short description of the segment. */
  description: string;
  /** Span of the segment in the markdown content. */
  span?: ContentSpanOutput;
}

/** Provides status details for long running operations. */
export interface OperationStatusAnalyzeResultErrorOutput {
  /** The unique ID of the operation. */
  id: string;
  /**
   * The status of the operation
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: AnalyzeResultOutput;
}

/** Directory of people and their faces. */
export interface PersonDirectoryOutput {
  /** The unique identifier of the person directory. */
  readonly personDirectoryId: string;
  /** A description of the person directory. */
  description?: string;
  /** Tags associated with the person directory. */
  tags?: Record<string, string>;
  /** The date and time when the person directory was created. */
  readonly createdAt: string;
  /** The date and time when the person directory was last modified. */
  readonly lastModifiedAt: string;
  /** Number of people in the person directory. */
  readonly personCount: number;
  /** Number of faces in the person directory. */
  readonly faceCount: number;
}

/** Paged collection of PersonDirectory items */
export interface PagedPersonDirectoryOutput {
  /** The PersonDirectory items on this page */
  value: Array<PersonDirectoryOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Person in a person directory. */
export interface PersonDirectoryPersonOutput {
  /** The unique identifier of the person. */
  readonly personId: string;
  /** Tags associated with the person. */
  tags?: Record<string, string>;
  /** List of faces associated with the person. */
  faceIds?: string[];
}

/** Paged collection of PersonDirectoryPerson items */
export interface PagedPersonDirectoryPersonOutput {
  /** The PersonDirectoryPerson items on this page */
  value: Array<PersonDirectoryPersonOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Bounding box in an image. */
export interface BoundingBoxOutput {
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
export interface PersonDirectoryFaceOutput {
  /** The unique identifier of the face. */
  readonly faceId: string;
  /** Person associated with the face, if any. */
  personId?: string;
  /** User provided identifier for the source image. */
  readonly imageReferenceId?: string;
  /** Bounding box of the face in the source image. */
  readonly boundingBox?: BoundingBoxOutput;
}

/** Paged collection of PersonDirectoryFace items */
export interface PagedPersonDirectoryFaceOutput {
  /** The PersonDirectoryFace items on this page */
  value: Array<PersonDirectoryFaceOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Identify person response. */
export interface IdentifyPersonResultOutput {
  /** Details of the detected face. */
  detectedFace: DetectedBoundingBoxOutput;
  /** List of person candidates matching the input face. */
  personCandidates: Array<PersonCandidateOutput>;
}

/** Detected bounding box of an object. */
export interface DetectedBoundingBoxOutput {
  /** Bounding box of the detected face. */
  boundingBox?: BoundingBoxOutput;
}

/** Identified person candidate. */
export interface PersonCandidateOutput {
  /** The unique identifier of the person. */
  personId: string;
  /** Tags associated with the person. */
  tags?: Record<string, string>;
  /** Confidence score of the person matching the input face. */
  confidence: number;
}

/** Find similar faces response. */
export interface FindSimilarFacesResultOutput {
  /** Details of the detected face. */
  detectedFace: DetectedBoundingBoxOutput;
  /** List of similar faces. */
  similarFaces: Array<SimilarFaceOutput>;
}

/** Similar face found in the person directory. */
export interface SimilarFaceOutput {
  /** The unique identifier of the face. */
  readonly faceId: string;
  /** Person associated with the face, if any. */
  personId?: string;
  /** User provided identifier for the source image. */
  readonly imageReferenceId?: string;
  /** Bounding box of the face in the source image. */
  readonly boundingBox?: BoundingBoxOutput;
  /** Confidence that this face matches the input face. */
  confidence: number;
}

/** Verify person response. */
export interface VerifyPersonResultOutput {
  /** Details of the detected face. */
  detectedFace: DetectedBoundingBoxOutput;
  /** Confidence score of the person verification. */
  confidence: number;
}

/** Detect faces response. */
export interface DetectFacesResultOutput {
  /** List of detected faces. */
  detectedFaces: Array<DetectedBoundingBoxOutput>;
}

/** Compare faces response. */
export interface CompareFacesResultOutput {
  /** Details of the first detected face. */
  detectedFace1: DetectedBoundingBoxOutput;
  /** Details of the second detected face. */
  detectedFace2: DetectedBoundingBoxOutput;
  /** Confidence score of the face comparison. */
  confidence: number;
}

/** Provides status details for long running operations. */
export interface ResourceOperationStatusContentClassifierContentClassifierErrorOutput {
  /** The unique ID of the operation. */
  id: string;
  /**
   * The status of the operation
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: ContentClassifierOutput;
}

/** Classifier that classifies content into categories with optional splitting. */
export interface ContentClassifierOutput {
  /** The unique identifier of the classifier. */
  readonly classifierId: string;
  /** A description of the classifier. */
  description?: string;
  /** Tags associated with the classifier. */
  tags?: Record<string, string>;
  /**
   * The status of the classifier.
   *
   * Possible values: "creating", "ready", "deleting", "failed"
   */
  readonly status: ResourceStatusOutput;
  /** The date and time when the classifier was created. */
  readonly createdAt: string;
  /** The date and time when the classifier was last modified. */
  readonly lastModifiedAt: string;
  /** Warnings encountered while creating the classifier. */
  readonly warnings?: Array<ErrorModel>;
  /** The categories to classify against. */
  categories: Record<string, ClassifierCategoryDefinitionOutput>;
  /**
   * Mode used to split input into content objects.
   *
   * Possible values: "noSplit", "perPage", "auto"
   */
  splitMode?: ClassifierSplitModeOutput;
  /**
   * The location where the data may be processed.
   *
   * Possible values: "geography", "dataZone", "global"
   */
  processingLocation?: ProcessingLocationOutput;
}

/** A classifier category. */
export interface ClassifierCategoryDefinitionOutput {
  /** The description of the category. */
  description?: string;
  /** Optional analyzer used to process the content. */
  analyzerId?: string;
}

/** Paged collection of ContentClassifier items */
export interface PagedContentClassifierOutput {
  /** The ContentClassifier items on this page */
  value: Array<ContentClassifierOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Provides status details for long running operations. */
export interface ResourceOperationStatusContentClassifierClassifyResultErrorOutput {
  /** The unique ID of the operation. */
  id: string;
  /**
   * The status of the operation
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: ClassifyResultOutput;
}

/** Classify operation result. */
export interface ClassifyResultOutput {
  /** The unique identifier of the classifier. */
  classifierId?: string;
  /** The version of the API used to classify the document. */
  apiVersion?: string;
  /** The date and time when the result was created. */
  createdAt?: string;
  /** Warnings encountered while classifying the document. */
  warnings?: Array<ErrorModel>;
  /**
   * The string encoding used for content spans.
   *
   * Possible values: "codePoint", "utf16", "utf8"
   */
  stringEncoding?: StringEncodingOutput;
  /** The classified content. */
  contents: Array<MediaContentOutput>;
}

/** Provides status details for long running operations. */
export interface OperationStatusClassifyResultErrorOutput {
  /** The unique ID of the operation. */
  id: string;
  /**
   * The status of the operation
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: ClassifyResultOutput;
}

/** Data source specifying a set of documents. */
export type DataSourceOutput = DataSourceOutputParent | BlobDataSourceOutput;
/** Knowledge source. */
export type KnowledgeSourceOutput =
  | KnowledgeSourceOutputParent
  | ReferenceKnowledgeSourceOutput;
/** Media content base class. */
export type MediaContentOutput =
  | MediaContentOutputParent
  | DocumentContentOutput
  | AudioVisualContentOutput;
/** Field extracted from the content. */
export type ContentFieldOutput =
  | ContentFieldOutputParent
  | StringFieldOutput
  | DateFieldOutput
  | TimeFieldOutput
  | NumberFieldOutput
  | IntegerFieldOutput
  | BooleanFieldOutput
  | ArrayFieldOutput
  | ObjectFieldOutput;
/** Alias for OperationStateOutput */
export type OperationStateOutput = string;
/** Alias for ResourceStatusOutput */
export type ResourceStatusOutput = string;
/** Alias for TableFormatOutput */
export type TableFormatOutput = string;
/** Alias for SegmentationModeOutput */
export type SegmentationModeOutput = string;
/** Alias for GenerationMethodOutput */
export type GenerationMethodOutput = string;
/** Alias for ContentFieldTypeOutput */
export type ContentFieldTypeOutput = string;
/** Alias for DataSourceKindOutput */
export type DataSourceKindOutput = string;
/** Alias for ProcessingLocationOutput */
export type ProcessingLocationOutput = string;
/** Alias for AnalysisModeOutput */
export type AnalysisModeOutput = string;
/** Alias for KnowledgeSourceKindOutput */
export type KnowledgeSourceKindOutput = string;
/** Alias for StringEncodingOutput */
export type StringEncodingOutput = string;
/** Alias for MediaContentKindOutput */
export type MediaContentKindOutput = string;
/** Alias for LengthUnitOutput */
export type LengthUnitOutput = string;
/** Alias for DocumentBarcodeKindOutput */
export type DocumentBarcodeKindOutput = string;
/** Alias for DocumentFormulaKindOutput */
export type DocumentFormulaKindOutput = string;
/** Alias for ParagraphRoleOutput */
export type ParagraphRoleOutput = string;
/** Alias for DocumentTableCellKindOutput */
export type DocumentTableCellKindOutput = string;
/** Alias for ClassifierSplitModeOutput */
export type ClassifierSplitModeOutput = string;

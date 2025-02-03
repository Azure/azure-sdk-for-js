// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Paged collection of DocumentIntelligenceOperationDetails items */
export interface PagedDocumentIntelligenceOperationDetailsOutput {
  /** The DocumentIntelligenceOperationDetails items on this page */
  value: Array<DocumentIntelligenceOperationDetailsOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Operation info. */
export interface DocumentIntelligenceOperationDetailsOutputParent {
  /** Operation ID */
  operationId: string;
  /**
   * Operation status.  notStarted, running, completed, or failed
   *
   * Possible values: "notStarted", "running", "failed", "succeeded", "canceled", "skipped"
   */
  status: DocumentIntelligenceOperationStatusOutput;
  /** Operation progress (0-100). */
  percentCompleted?: number;
  /** Date and time (UTC) when the operation was created. */
  createdDateTime: string;
  /** Date and time (UTC) when the status was last updated. */
  lastUpdatedDateTime: string;
  /** URL of the resource targeted by this operation. */
  resourceLocation: string;
  /** API version used to create this operation. */
  apiVersion?: string;
  /** List of key-value tag attributes associated with the document model. */
  tags?: Record<string, string>;
  /** Encountered error. */
  error?: DocumentIntelligenceErrorOutput;
  kind: OperationKindOutput;
}

/** The error object. */
export interface DocumentIntelligenceErrorOutput {
  /** One of a server-defined set of error codes. */
  code: string;
  /** A human-readable representation of the error. */
  message: string;
  /** The target of the error. */
  target?: string;
  /** An array of details about specific errors that led to this reported error. */
  details?: Array<DocumentIntelligenceErrorOutput>;
  /** An object containing more specific information than the current object about the error. */
  innererror?: DocumentIntelligenceInnerErrorOutput;
}

/** An object containing more specific information about the error. */
export interface DocumentIntelligenceInnerErrorOutput {
  /** One of a server-defined set of error codes. */
  code?: string;
  /** A human-readable representation of the error. */
  message?: string;
  /** Inner error. */
  innererror?: DocumentIntelligenceInnerErrorOutput;
}

/** Get Operation response object. */
export interface DocumentModelBuildOperationDetailsOutput
  extends DocumentIntelligenceOperationDetailsOutputParent {
  /** Operation result upon success. */
  result?: DocumentModelDetailsOutput;
  /** Type of operation. */
  kind: "documentModelBuild";
}

/** Document model info. */
export interface DocumentModelDetailsOutput {
  /** Unique document model name. */
  modelId: string;
  /** Document model description. */
  description?: string;
  /** Date and time (UTC) when the document model was created. */
  readonly createdDateTime: string;
  /** Date and time (UTC) when the document model will expire. */
  readonly expirationDateTime?: string;
  /** Date and time (UTC) when the document model was last modified. */
  readonly modifiedDateTime?: string;
  /** API version used to create this document model. */
  readonly apiVersion?: string;
  /** List of key-value tag attributes associated with the document model. */
  tags?: Record<string, string>;
  /**
   * Custom document model build mode.
   *
   * Possible values: "template", "neural"
   */
  readonly buildMode?: DocumentBuildModeOutput;
  /**
   * Azure Blob Storage location containing the training data.  Either
   * azureBlobSource or azureBlobFileListSource must be specified.
   */
  readonly azureBlobSource?: AzureBlobContentSourceOutput;
  /**
   * Azure Blob Storage file list specifying the training data.  Either
   * azureBlobSource or azureBlobFileListSource must be specified.
   */
  readonly azureBlobFileListSource?: AzureBlobFileListContentSourceOutput;
  /** For composed models, the custom classifier to split and classify the input file. */
  classifierId?: string;
  /**
   * For composed models, the file splitting behavior.
   *
   * Possible values: "auto", "none", "perPage"
   */
  split?: SplitModeOutput;
  /** Supported document types. */
  readonly docTypes?: Record<string, DocumentTypeDetailsOutput>;
  /** List of warnings encountered while building the model. */
  readonly warnings?: Array<DocumentIntelligenceWarningOutput>;
  /** Number of V100-equivalent GPU hours consumed for model training. */
  readonly trainingHours?: number;
}

/** Azure Blob Storage content. */
export interface AzureBlobContentSourceOutput {
  /** Azure Blob Storage container URL. */
  containerUrl: string;
  /** Blob name prefix. */
  prefix?: string;
}

/** File list in Azure Blob Storage. */
export interface AzureBlobFileListContentSourceOutput {
  /** Azure Blob Storage container URL. */
  containerUrl: string;
  /** Path to a JSONL file within the container specifying a subset of documents. */
  fileList: string;
}

/** Document type info. */
export interface DocumentTypeDetailsOutput {
  /** Document model description. */
  description?: string;
  /**
   * Custom document model build mode.
   *
   * Possible values: "template", "neural"
   */
  buildMode?: DocumentBuildModeOutput;
  /** Description of the document semantic schema using a JSON Schema style syntax. */
  fieldSchema?: Record<string, DocumentFieldSchemaOutput>;
  /** Estimated confidence for each field. */
  fieldConfidence?: Record<string, number>;
  /** Document model to use for analyzing documents with specified type. */
  modelId?: string;
  /** Only perform analysis if docType confidence is above threshold. */
  confidenceThreshold?: number;
  /** List of optional analysis features. */
  features?: DocumentAnalysisFeatureOutput[];
  /** List of additional fields to extract.  Ex. "NumberOfGuests,StoreNumber" */
  queryFields?: string[];
  /** Maximum number of documents of specified type to analyze.  Default=all. */
  maxDocumentsToAnalyze?: number;
}

/** Description of the field semantic schema using a JSON Schema style syntax. */
export interface DocumentFieldSchemaOutput {
  /**
   * Semantic data type of the field value.
   *
   * Possible values: "string", "date", "time", "phoneNumber", "number", "integer", "selectionMark", "countryRegion", "signature", "array", "object", "currency", "address", "boolean", "selectionGroup"
   */
  type: DocumentFieldTypeOutput;
  /** Field description. */
  description?: string;
  /** Example field content. */
  example?: string;
  /** Field type schema of each array element. */
  items?: DocumentFieldSchemaOutput;
  /** Named sub-fields of the object field. */
  properties?: Record<string, DocumentFieldSchemaOutput>;
}

/** The error object. */
export interface DocumentIntelligenceWarningOutput {
  /** One of a server-defined set of warning codes. */
  code: string;
  /** A human-readable representation of the warning. */
  message: string;
  /** The target of the error. */
  target?: string;
}

/** Get Operation response object. */
export interface DocumentModelComposeOperationDetailsOutput
  extends DocumentIntelligenceOperationDetailsOutputParent {
  /** Operation result upon success. */
  result?: DocumentModelDetailsOutput;
  /** Type of operation. */
  kind: "documentModelCompose";
}

/** Get Operation response object. */
export interface DocumentModelCopyToOperationDetailsOutput
  extends DocumentIntelligenceOperationDetailsOutputParent {
  /** Operation result upon success. */
  result?: DocumentModelDetailsOutput;
  /** Type of operation. */
  kind: "documentModelCopyTo";
}

/** Get Operation response object. */
export interface DocumentClassifierCopyToOperationDetailsOutput
  extends DocumentIntelligenceOperationDetailsOutputParent {
  /** Operation result upon success. */
  result?: DocumentClassifierDetailsOutput;
  /** Type of operation. */
  kind: "documentClassifierCopyTo";
}

/** Document classifier info. */
export interface DocumentClassifierDetailsOutput {
  /** Unique document classifier name. */
  classifierId: string;
  /** Document classifier description. */
  description?: string;
  /** Date and time (UTC) when the document classifier was created. */
  createdDateTime: string;
  /** Date and time (UTC) when the document classifier will expire. */
  expirationDateTime?: string;
  /** Date and time (UTC) when the document model was last modified. */
  readonly modifiedDateTime?: string;
  /** API version used to create this document classifier. */
  apiVersion: string;
  /** Base classifierId on top of which the classifier was trained. */
  baseClassifierId?: string;
  /** List of document types to classify against. */
  docTypes: Record<string, ClassifierDocumentTypeDetailsOutput>;
  /** List of warnings encountered while building the classifier. */
  warnings?: Array<DocumentIntelligenceWarningOutput>;
}

/** Classifier document type info. */
export interface ClassifierDocumentTypeDetailsOutput {
  /**
   * Type of training data source.
   *
   * Possible values: "url", "base64", "azureBlob", "azureBlobFileList"
   */
  sourceKind?: ContentSourceKindOutput;
  /**
   * Azure Blob Storage location containing the training data for a classifier
   * document type.  Either azureBlobSource or azureBlobFileListSource must be
   * specified.
   */
  azureBlobSource?: AzureBlobContentSourceOutput;
  /**
   * Azure Blob Storage file list specifying the training data for a classifier
   * document type.  Either azureBlobSource or azureBlobFileListSource must be
   * specified.
   */
  azureBlobFileListSource?: AzureBlobFileListContentSourceOutput;
}

/** Get Operation response object. */
export interface DocumentClassifierBuildOperationDetailsOutput
  extends DocumentIntelligenceOperationDetailsOutputParent {
  /** Operation result upon success. */
  result?: DocumentClassifierDetailsOutput;
  /** Type of operation. */
  kind: "documentClassifierBuild";
}

/** Error response object. */
export interface DocumentIntelligenceErrorResponseOutput {
  /** Error info. */
  error: DocumentIntelligenceErrorOutput;
}

/** General information regarding the current resource. */
export interface DocumentIntelligenceResourceDetailsOutput {
  /** Details regarding custom document models. */
  customDocumentModels: CustomDocumentModelsDetailsOutput;
}

/** Details regarding custom document models. */
export interface CustomDocumentModelsDetailsOutput {
  /** Number of custom document models in the current resource. */
  count: number;
  /** Maximum number of custom document models supported in the current resource. */
  limit: number;
}

/** Status and result of the analyze operation. */
export interface AnalyzeOperationOutput {
  /**
   * Operation status.  notStarted, running, succeeded, or failed
   *
   * Possible values: "notStarted", "running", "failed", "succeeded", "canceled", "skipped"
   */
  status: DocumentIntelligenceOperationStatusOutput;
  /** Date and time (UTC) when the analyze operation was submitted. */
  createdDateTime: string;
  /** Date and time (UTC) when the status was last updated. */
  lastUpdatedDateTime: string;
  /** Encountered error during document analysis. */
  error?: DocumentIntelligenceErrorOutput;
  /** Document analysis result. */
  analyzeResult?: AnalyzeResultOutput;
}

/** Document analysis result. */
export interface AnalyzeResultOutput {
  /** API version used to produce this result. */
  apiVersion: string;
  /** Document model ID used to produce this result. */
  modelId: string;
  /**
   * Method used to compute string offset and length.
   *
   * Possible values: "textElements", "unicodeCodePoint", "utf16CodeUnit"
   */
  stringIndexType: StringIndexTypeOutput;
  /**
   * Format of the analyze result top-level content.
   *
   * Possible values: "text", "markdown"
   */
  contentFormat?: DocumentContentFormatOutput;
  /**
   * Concatenate string representation of all textual and visual elements in reading
   * order.
   */
  content: string;
  /** Analyzed pages. */
  pages: Array<DocumentPageOutput>;
  /** Extracted paragraphs. */
  paragraphs?: Array<DocumentParagraphOutput>;
  /** Extracted tables. */
  tables?: Array<DocumentTableOutput>;
  /** Extracted figures. */
  figures?: Array<DocumentFigureOutput>;
  /** Extracted sections. */
  sections?: Array<DocumentSectionOutput>;
  /** Extracted key-value pairs. */
  keyValuePairs?: Array<DocumentKeyValuePairOutput>;
  /** Extracted font styles. */
  styles?: Array<DocumentStyleOutput>;
  /** Detected languages. */
  languages?: Array<DocumentLanguageOutput>;
  /** Extracted documents. */
  documents?: Array<AnalyzedDocumentOutput>;
  /** List of warnings encountered. */
  warnings?: Array<DocumentIntelligenceWarningOutput>;
}

/** Content and layout elements extracted from a page from the input. */
export interface DocumentPageOutput {
  /** 1-based page number in the input document. */
  pageNumber: number;
  /**
   * The general orientation of the content in clockwise direction, measured in
   * degrees between (-180, 180].
   */
  angle?: number;
  /** The width of the image/PDF in pixels/inches, respectively. */
  width?: number;
  /** The height of the image/PDF in pixels/inches, respectively. */
  height?: number;
  /**
   * The unit used by the width, height, and polygon properties. For images, the
   * unit is "pixel". For PDF, the unit is "inch".
   *
   * Possible values: "pixel", "inch"
   */
  unit?: LengthUnitOutput;
  /** Location of the page in the reading order concatenated content. */
  spans: Array<DocumentSpanOutput>;
  /** Extracted words from the page. */
  words?: Array<DocumentWordOutput>;
  /** Extracted selection marks from the page. */
  selectionMarks?: Array<DocumentSelectionMarkOutput>;
  /**
   * Extracted lines from the page, potentially containing both textual and visual
   * elements.
   */
  lines?: Array<DocumentLineOutput>;
  /** Extracted barcodes from the page. */
  barcodes?: Array<DocumentBarcodeOutput>;
  /** Extracted formulas from the page. */
  formulas?: Array<DocumentFormulaOutput>;
}

/**
 * Contiguous region of the concatenated content property, specified as an offset
 * and length.
 */
export interface DocumentSpanOutput {
  /** Zero-based index of the content represented by the span. */
  offset: number;
  /** Number of characters in the content represented by the span. */
  length: number;
}

/**
 * A word object consisting of a contiguous sequence of characters.  For non-space
 * delimited languages, such as Chinese, Japanese, and Korean, each character is
 * represented as its own word.
 */
export interface DocumentWordOutput {
  /** Text content of the word. */
  content: string;
  /**
   * Bounding polygon of the word, with coordinates specified relative to the
   * top-left of the page. The numbers represent the x, y values of the polygon
   * vertices, clockwise from the left (-180 degrees inclusive) relative to the
   * element orientation.
   */
  polygon?: number[];
  /** Location of the word in the reading order concatenated content. */
  span: DocumentSpanOutput;
  /** Confidence of correctly extracting the word. */
  confidence: number;
}

/**
 * A selection mark object representing check boxes, radio buttons, and other
 * elements indicating a selection.
 */
export interface DocumentSelectionMarkOutput {
  /**
   * State of the selection mark.
   *
   * Possible values: "selected", "unselected"
   */
  state: DocumentSelectionMarkStateOutput;
  /**
   * Bounding polygon of the selection mark, with coordinates specified relative
   * to the top-left of the page. The numbers represent the x, y values of the
   * polygon vertices, clockwise from the left (-180 degrees inclusive) relative
   * to the element orientation.
   */
  polygon?: number[];
  /** Location of the selection mark in the reading order concatenated content. */
  span: DocumentSpanOutput;
  /** Confidence of correctly extracting the selection mark. */
  confidence: number;
}

/**
 * A content line object consisting of an adjacent sequence of content elements,
 * such as words and selection marks.
 */
export interface DocumentLineOutput {
  /** Concatenated content of the contained elements in reading order. */
  content: string;
  /**
   * Bounding polygon of the line, with coordinates specified relative to the
   * top-left of the page. The numbers represent the x, y values of the polygon
   * vertices, clockwise from the left (-180 degrees inclusive) relative to the
   * element orientation.
   */
  polygon?: number[];
  /** Location of the line in the reading order concatenated content. */
  spans: Array<DocumentSpanOutput>;
}

/** A barcode object. */
export interface DocumentBarcodeOutput {
  /**
   * Barcode kind.
   *
   * Possible values: "QRCode", "PDF417", "UPCA", "UPCE", "Code39", "Code128", "EAN8", "EAN13", "DataBar", "Code93", "Codabar", "DataBarExpanded", "ITF", "MicroQRCode", "Aztec", "DataMatrix", "MaxiCode"
   */
  kind: DocumentBarcodeKindOutput;
  /** Barcode value. */
  value: string;
  /**
   * Bounding polygon of the barcode, with coordinates specified relative to the
   * top-left of the page. The numbers represent the x, y values of the polygon
   * vertices, clockwise from the left (-180 degrees inclusive) relative to the
   * element orientation.
   */
  polygon?: number[];
  /** Location of the barcode in the reading order concatenated content. */
  span: DocumentSpanOutput;
  /** Confidence of correctly extracting the barcode. */
  confidence: number;
}

/** A formula object. */
export interface DocumentFormulaOutput {
  /**
   * Formula kind.
   *
   * Possible values: "inline", "display"
   */
  kind: DocumentFormulaKindOutput;
  /** LaTex expression describing the formula. */
  value: string;
  /**
   * Bounding polygon of the formula, with coordinates specified relative to the
   * top-left of the page. The numbers represent the x, y values of the polygon
   * vertices, clockwise from the left (-180 degrees inclusive) relative to the
   * element orientation.
   */
  polygon?: number[];
  /** Location of the formula in the reading order concatenated content. */
  span: DocumentSpanOutput;
  /** Confidence of correctly extracting the formula. */
  confidence: number;
}

/**
 * A paragraph object consisting with contiguous lines generally with common
 * alignment and spacing.
 */
export interface DocumentParagraphOutput {
  /**
   * Semantic role of the paragraph.
   *
   * Possible values: "pageHeader", "pageFooter", "pageNumber", "title", "sectionHeading", "footnote", "formulaBlock"
   */
  role?: ParagraphRoleOutput;
  /** Concatenated content of the paragraph in reading order. */
  content: string;
  /** Bounding regions covering the paragraph. */
  boundingRegions?: Array<BoundingRegionOutput>;
  /** Location of the paragraph in the reading order concatenated content. */
  spans: Array<DocumentSpanOutput>;
}

/** Bounding polygon on a specific page of the input. */
export interface BoundingRegionOutput {
  /** 1-based page number of page containing the bounding region. */
  pageNumber: number;
  /**
   * Bounding polygon on the page, or the entire page if not specified.
   * Coordinates specified relative to the top-left of the page. The numbers
   * represent the x, y values of the polygon vertices, clockwise from the left
   * (-180 degrees inclusive) relative to the element orientation.
   */
  polygon: number[];
}

/** A table object consisting table cells arranged in a rectangular layout. */
export interface DocumentTableOutput {
  /** Number of rows in the table. */
  rowCount: number;
  /** Number of columns in the table. */
  columnCount: number;
  /** Cells contained within the table. */
  cells: Array<DocumentTableCellOutput>;
  /** Bounding regions covering the table. */
  boundingRegions?: Array<BoundingRegionOutput>;
  /** Location of the table in the reading order concatenated content. */
  spans: Array<DocumentSpanOutput>;
  /** Caption associated with the table. */
  caption?: DocumentCaptionOutput;
  /** List of footnotes associated with the table. */
  footnotes?: Array<DocumentFootnoteOutput>;
}

/** An object representing the location and content of a table cell. */
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
  /** Concatenated content of the table cell in reading order. */
  content: string;
  /** Bounding regions covering the table cell. */
  boundingRegions?: Array<BoundingRegionOutput>;
  /** Location of the table cell in the reading order concatenated content. */
  spans: Array<DocumentSpanOutput>;
  /** Child elements of the table cell. */
  elements?: string[];
}

/** A caption object describing a table or figure. */
export interface DocumentCaptionOutput {
  /** Content of the caption. */
  content: string;
  /** Bounding regions covering the caption. */
  boundingRegions?: Array<BoundingRegionOutput>;
  /** Location of the caption in the reading order concatenated content. */
  spans: Array<DocumentSpanOutput>;
  /** Child elements of the caption. */
  elements?: string[];
}

/** A footnote object describing a table or figure. */
export interface DocumentFootnoteOutput {
  /** Content of the footnote. */
  content: string;
  /** Bounding regions covering the footnote. */
  boundingRegions?: Array<BoundingRegionOutput>;
  /** Location of the footnote in the reading order concatenated content. */
  spans: Array<DocumentSpanOutput>;
  /** Child elements of the footnote. */
  elements?: string[];
}

/** An object representing a figure in the document. */
export interface DocumentFigureOutput {
  /** Bounding regions covering the figure. */
  boundingRegions?: Array<BoundingRegionOutput>;
  /** Location of the figure in the reading order concatenated content. */
  spans: Array<DocumentSpanOutput>;
  /** Child elements of the figure, excluding any caption or footnotes. */
  elements?: string[];
  /** Caption associated with the figure. */
  caption?: DocumentCaptionOutput;
  /** List of footnotes associated with the figure. */
  footnotes?: Array<DocumentFootnoteOutput>;
  /** Figure ID. */
  id?: string;
}

/** An object representing a section in the document. */
export interface DocumentSectionOutput {
  /** Location of the section in the reading order concatenated content. */
  spans: Array<DocumentSpanOutput>;
  /** Child elements of the section. */
  elements?: string[];
}

/**
 * An object representing a form field with distinct field label (key) and field
 * value (may be empty).
 */
export interface DocumentKeyValuePairOutput {
  /** Field label of the key-value pair. */
  key: DocumentKeyValueElementOutput;
  /** Field value of the key-value pair. */
  value?: DocumentKeyValueElementOutput;
  /** Confidence of correctly extracting the key-value pair. */
  confidence: number;
}

/** An object representing the field key or value in a key-value pair. */
export interface DocumentKeyValueElementOutput {
  /** Concatenated content of the key-value element in reading order. */
  content: string;
  /** Bounding regions covering the key-value element. */
  boundingRegions?: Array<BoundingRegionOutput>;
  /** Location of the key-value element in the reading order concatenated content. */
  spans: Array<DocumentSpanOutput>;
}

/** An object representing observed text styles. */
export interface DocumentStyleOutput {
  /** Is content handwritten? */
  isHandwritten?: boolean;
  /**
   * Visually most similar font from among the set of supported font families, with
   * fallback fonts following CSS convention (ex. 'Arial, sans-serif').
   */
  similarFontFamily?: string;
  /**
   * Font style.
   *
   * Possible values: "normal", "italic"
   */
  fontStyle?: DocumentFontStyleOutput;
  /**
   * Font weight.
   *
   * Possible values: "normal", "bold"
   */
  fontWeight?: DocumentFontWeightOutput;
  /** Foreground color in #rrggbb hexadecimal format. */
  color?: string;
  /** Background color in #rrggbb hexadecimal format.. */
  backgroundColor?: string;
  /** Location of the text elements in the concatenated content the style applies to. */
  spans: Array<DocumentSpanOutput>;
  /** Confidence of correctly identifying the style. */
  confidence: number;
}

/** An object representing the detected language for a given text span. */
export interface DocumentLanguageOutput {
  /**
   * Detected language.  Value may an ISO 639-1 language code (ex. "en", "fr")
   * or BCP 47 language tag (ex. "zh-Hans").
   */
  locale: string;
  /**
   * Location of the text elements in the concatenated content the language applies
   * to.
   */
  spans: Array<DocumentSpanOutput>;
  /** Confidence of correctly identifying the language. */
  confidence: number;
}

/** An object describing the location and semantic content of a document. */
export interface AnalyzedDocumentOutput {
  /** Document type. */
  docType: string;
  /** Bounding regions covering the document. */
  boundingRegions?: Array<BoundingRegionOutput>;
  /** Location of the document in the reading order concatenated content. */
  spans: Array<DocumentSpanOutput>;
  /** Dictionary of named field values. */
  fields?: Record<string, DocumentFieldOutput>;
  /** Confidence of correctly extracting the document. */
  confidence: number;
}

/** An object representing the content and location of a field value. */
export interface DocumentFieldOutput {
  /**
   * Data type of the field value.
   *
   * Possible values: "string", "date", "time", "phoneNumber", "number", "integer", "selectionMark", "countryRegion", "signature", "array", "object", "currency", "address", "boolean", "selectionGroup"
   */
  type: DocumentFieldTypeOutput;
  /** String value. */
  valueString?: string;
  /** Date value in YYYY-MM-DD format (ISO 8601). */
  valueDate?: string;
  /** Time value in hh:mm:ss format (ISO 8601). */
  valueTime?: string;
  /** Phone number value in E.164 format (ex. +19876543210). */
  valuePhoneNumber?: string;
  /** Floating point value. */
  valueNumber?: number;
  /** Integer value. */
  valueInteger?: number;
  /**
   * Selection mark value.
   *
   * Possible values: "selected", "unselected"
   */
  valueSelectionMark?: DocumentSelectionMarkStateOutput;
  /**
   * Presence of signature.
   *
   * Possible values: "signed", "unsigned"
   */
  valueSignature?: DocumentSignatureTypeOutput;
  /** 3-letter country code value (ISO 3166-1 alpha-3). */
  valueCountryRegion?: string;
  /** Array of field values. */
  valueArray?: Array<DocumentFieldOutput>;
  /** Dictionary of named field values. */
  valueObject?: Record<string, DocumentFieldOutput>;
  /** Currency value. */
  valueCurrency?: CurrencyValueOutput;
  /** Address value. */
  valueAddress?: AddressValueOutput;
  /** Boolean value. */
  valueBoolean?: boolean;
  /** Selection group value. */
  valueSelectionGroup?: string[];
  /** Field content. */
  content?: string;
  /** Bounding regions covering the field. */
  boundingRegions?: Array<BoundingRegionOutput>;
  /** Location of the field in the reading order concatenated content. */
  spans?: Array<DocumentSpanOutput>;
  /** Confidence of correctly extracting the field. */
  confidence?: number;
}

/** Currency field value. */
export interface CurrencyValueOutput {
  /** Currency amount. */
  amount: number;
  /** Currency symbol label, if any. */
  currencySymbol?: string;
  /** Resolved currency code (ISO 4217), if any. */
  currencyCode?: string;
}

/** Address field value. */
export interface AddressValueOutput {
  /** House or building number. */
  houseNumber?: string;
  /** Post office box number. */
  poBox?: string;
  /** Street name. */
  road?: string;
  /** Name of city, town, village, etc. */
  city?: string;
  /** First-level administrative division. */
  state?: string;
  /** Postal code used for mail sorting. */
  postalCode?: string;
  /** Country/region. */
  countryRegion?: string;
  /** Street-level address, excluding city, state, countryRegion, and postalCode. */
  streetAddress?: string;
  /** Apartment or office number */
  unit?: string;
  /**
   * Districts or boroughs within a city, such as Brooklyn in New York City or City
   * of Westminster in London.
   */
  cityDistrict?: string;
  /** Second-level administrative division used in certain locales. */
  stateDistrict?: string;
  /** Unofficial neighborhood name, like Chinatown. */
  suburb?: string;
  /** Build name, such as World Trade Center. */
  house?: string;
  /** Floor number, such as 3F. */
  level?: string;
}

/** Status and result of the analyze batch operation. */
export interface AnalyzeBatchOperationOutput {
  /** Analyze batch operation result ID. */
  resultId?: string;
  /**
   * Operation status.  notStarted, running, succeeded, or failed
   *
   * Possible values: "notStarted", "running", "failed", "succeeded", "canceled", "skipped"
   */
  status: DocumentIntelligenceOperationStatusOutput;
  /** Date and time (UTC) when the operation was submitted. */
  createdDateTime: string;
  /** Date and time (UTC) when the status was last updated. */
  lastUpdatedDateTime: string;
  /** Operation progress (0-100). */
  percentCompleted?: number;
  /** Encountered error during batch document analysis. */
  error?: DocumentIntelligenceErrorOutput;
  /** Batch document analysis result. */
  result?: AnalyzeBatchResultOutput;
}

/** Batch document analysis result. */
export interface AnalyzeBatchResultOutput {
  /** Number of documents that completed with status succeeded. */
  succeededCount: number;
  /** Number of documents that completed with status failed. */
  failedCount: number;
  /** Number of documents that completed with status skipped. */
  skippedCount: number;
  /** Operation detail for each document in the batch. */
  details?: Array<AnalyzeBatchOperationDetailOutput>;
}

/** Operation detail for a document in a batch analysis. */
export interface AnalyzeBatchOperationDetailOutput {
  /**
   * Analyze status.  succeeded, failed, or skipped
   *
   * Possible values: "notStarted", "running", "failed", "succeeded", "canceled", "skipped"
   */
  status: DocumentIntelligenceOperationStatusOutput;
  /** URL of the source document. */
  sourceUrl: string;
  /** URL of the analyze result JSON. */
  resultUrl?: string;
  /** Encountered error. */
  error?: DocumentIntelligenceErrorOutput;
}

/** Paged collection of AnalyzeBatchOperation items */
export interface PagedAnalyzeBatchOperationOutput {
  /** The AnalyzeBatchOperation items on this page */
  value: Array<AnalyzeBatchOperationOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/**
 * Authorization to copy a document model to the specified target resource and
 * modelId.
 */
export interface ModelCopyAuthorizationOutput {
  /** ID of the target Azure resource where the document model should be copied to. */
  targetResourceId: string;
  /**
   * Location of the target Azure resource where the document model should be copied
   * to.
   */
  targetResourceRegion: string;
  /** Identifier of the target document model. */
  targetModelId: string;
  /** URL of the copied document model in the target account. */
  targetModelLocation: string;
  /** Token used to authorize the request. */
  accessToken: string;
  /** Date/time when the access token expires. */
  expirationDateTime: string;
}

/** Paged collection of DocumentModelDetails items */
export interface PagedDocumentModelDetailsOutput {
  /** The DocumentModelDetails items on this page */
  value: Array<DocumentModelDetailsOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Paged collection of DocumentClassifierDetails items */
export interface PagedDocumentClassifierDetailsOutput {
  /** The DocumentClassifierDetails items on this page */
  value: Array<DocumentClassifierDetailsOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/**
 * Authorization to copy a document classifier to the specified target resource and
 * classifierId.
 */
export interface ClassifierCopyAuthorizationOutput {
  /** ID of the target Azure resource where the document classifier should be copied to. */
  targetResourceId: string;
  /**
   * Location of the target Azure resource where the document classifier should be copied
   * to.
   */
  targetResourceRegion: string;
  /** Identifier of the target document classifier. */
  targetClassifierId: string;
  /** URL of the copied document classifier in the target account. */
  targetClassifierLocation: string;
  /** Token used to authorize the request. */
  accessToken: string;
  /** Date/time when the access token expires. */
  expirationDateTime: string;
}

/** Operation info. */
export type DocumentIntelligenceOperationDetailsOutput =
  | DocumentIntelligenceOperationDetailsOutputParent
  | DocumentModelBuildOperationDetailsOutput
  | DocumentModelComposeOperationDetailsOutput
  | DocumentModelCopyToOperationDetailsOutput
  | DocumentClassifierCopyToOperationDetailsOutput
  | DocumentClassifierBuildOperationDetailsOutput;
/** Alias for DocumentIntelligenceOperationStatusOutput */
export type DocumentIntelligenceOperationStatusOutput = string;
/** Alias for OperationKindOutput */
export type OperationKindOutput = string;
/** Alias for DocumentBuildModeOutput */
export type DocumentBuildModeOutput = string;
/** Alias for SplitModeOutput */
export type SplitModeOutput = string;
/** Alias for DocumentFieldTypeOutput */
export type DocumentFieldTypeOutput = string;
/** Alias for DocumentAnalysisFeatureOutput */
export type DocumentAnalysisFeatureOutput = string;
/** Alias for ContentSourceKindOutput */
export type ContentSourceKindOutput = string;
/** Alias for StringIndexTypeOutput */
export type StringIndexTypeOutput = string;
/** Alias for DocumentContentFormatOutput */
export type DocumentContentFormatOutput = string;
/** Alias for LengthUnitOutput */
export type LengthUnitOutput = string;
/** Alias for DocumentSelectionMarkStateOutput */
export type DocumentSelectionMarkStateOutput = string;
/** Alias for DocumentBarcodeKindOutput */
export type DocumentBarcodeKindOutput = string;
/** Alias for DocumentFormulaKindOutput */
export type DocumentFormulaKindOutput = string;
/** Alias for ParagraphRoleOutput */
export type ParagraphRoleOutput = string;
/** Alias for DocumentTableCellKindOutput */
export type DocumentTableCellKindOutput = string;
/** Alias for DocumentFontStyleOutput */
export type DocumentFontStyleOutput = string;
/** Alias for DocumentFontWeightOutput */
export type DocumentFontWeightOutput = string;
/** Alias for DocumentSignatureTypeOutput */
export type DocumentSignatureTypeOutput = string;

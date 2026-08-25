// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ContentUnderstandingClient } from "./contentUnderstandingClient.js";
// CUSTOMIZATION: EMITTER-FIX: `restorePoller` and `RestorePollerOptions` are omitted
// from the public entry point. The generated `RestorePollerOptions<TResult, TResponse extends
// PathUncheckedResponse>` signature leaks the rest-level `PathUncheckedResponse` type into
// the public API surface, which fails the Azure SDK API review. The generated helpers remain
// available in `generated/restorePollerHelpers.ts` for the `.../api` subpath; the `src/`
// counterpart is intentionally absent.
export type {
  AnalysisInput,
  ContentAnalyzerAnalyzeOperationStatus,
  OperationState,
  AnalysisResult,
  AnalysisContent,
  AnalysisContentUnion,
  AnalysisContentKind,
  ContentField,
  ContentFieldUnion,
  ContentFieldType,
  ContentSpan,
  StringField,
  DateField,
  TimeField,
  NumberField,
  IntegerField,
  BooleanField,
  ArrayField,
  ObjectField,
  JsonField,
  DocumentContent,
  LengthUnit,
  DocumentPage,
  DocumentWord,
  DocumentLine,
  DocumentBarcode,
  DocumentBarcodeKind,
  DocumentFormula,
  DocumentFormulaKind,
  DocumentParagraph,
  SemanticRole,
  DocumentSection,
  DocumentTable,
  DocumentTableCell,
  DocumentTableCellKind,
  DocumentCaption,
  DocumentFootnote,
  DocumentFigure,
  DocumentFigureUnion,
  DocumentFigureKind,
  DocumentChartFigure,
  DocumentMermaidFigure,
  DocumentAnnotation,
  DocumentAnnotationKind,
  DocumentAnnotationComment,
  DocumentSignature,
  DocumentHyperlink,
  DocumentContentSegment,
  DocumentChunk,
  AudioVisualContent,
  TranscriptPhrase,
  TranscriptWord,
  AudioVisualContentSegment,
  UsageDetails,
  ContentAnalyzerInlineResponse,
  ContentAnalyzer,
  ContentAnalyzerStatus,
  ContentAnalyzerConfig,
  TableFormat,
  ChartFormat,
  AnnotationFormat,
  ContentCategoryDefinition,
  ContentAnalyzerWorkflow,
  ChunkingStrategy,
  ChunkingStrategyUnion,
  ChunkingStrategyKind,
  SemanticChunkingStrategy,
  ContentFieldSchema,
  ContentFieldDefinition,
  GenerationMethod,
  ProcessingLocation,
  KnowledgeSource,
  KnowledgeSourceUnion,
  KnowledgeSourceKind,
  LabeledDataKnowledgeSource,
  SupportedModels,
  ContentAnalyzerOperationStatus,
  ContentUnderstandingDefaults,
  CopyAuthorization,
  RecordMergePatchUpdate,
} from "./models/index.js";
export { KnownVersions } from "./models/index.js";
export type {
  ContentUnderstandingClientOptionalParams,
  UpdateDefaultsOptionalParams,
  UpdateAnalyzerOptionalParams,
  ListAnalyzersOptionalParams,
  GrantCopyAuthorizationOptionalParams,
  GetResultFileOptionalParams,
  GetResultOptionalParams,
  GetOperationStatusOptionalParams,
  GetDefaultsOptionalParams,
  GetAnalyzerOptionalParams,
  DeleteResultOptionalParams,
  DeleteAnalyzerOptionalParams,
  CreateAnalyzerOptionalParams,
  CopyAnalyzerOptionalParams,
} from "./api/index.js";
// CUSTOMIZATION: SDK-IMPROVEMENT: The four analyze options bags come from
// `contentUnderstandingClient.js` (not from `./api/index.js`) because the
// `ContentUnderstandingClient` convenience methods use trimmed-down variants
// that hide the internal `stringEncoding` field. `AnalysisResultPoller`,
// `AnalysisOperationState`, and `AnalysisOperationMetadata` describe the
// custom poller shape the convenience methods return; exporting them keeps
// the public surface aligned with the method signatures customers actually
// call.
export type {
  AnalysisResultPoller,
  AnalysisOperationState,
  AnalysisOperationMetadata,
  AnalyzeBinaryInlineOptionalParams,
  AnalyzeInlineOptionalParams,
  AnalyzeBinaryOptionalParams,
  AnalyzeOptionalParams,
} from "./contentUnderstandingClient.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { RestError, isRestError } from "@azure/core-rest-pipeline";

// CUSTOMIZATION: SDK-IMPROVEMENT: Static helper that converts an AnalysisResult into
// LLM-friendly text (YAML front matter + markdown). Not generated from TypeSpec — this is
// a JS-native convenience for feeding CU output into a language model prompt.
export { toLlmInput, type ToLlmInputOptions } from "./static-helpers/llmInputHelper.js";

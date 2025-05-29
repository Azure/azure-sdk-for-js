// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export { AzureKeyCredential } from "@azure/core-auth";
export { KnownHybridCountAndFacetMode, KnownQueryDebugMode, KnownQueryLanguage, KnownQuerySpellerType as KnownQuerySpeller, KnownSemanticErrorMode, KnownSemanticErrorReason, KnownSemanticFieldState, KnownSemanticQueryRewritesResultType, KnownSemanticSearchResultsType, KnownVectorFilterMode, KnownVectorQueryKind, KnownVectorThresholdKind, } from "./generated/data/models/index.js";
export { KnownAIStudioModelCatalogName, KnownAzureOpenAIModelName, KnownBlobIndexerDataToExtract, KnownBlobIndexerImageAction, KnownBlobIndexerParsingMode, KnownBlobIndexerPDFTextRotationAlgorithm, KnownCustomEntityLookupSkillLanguage, KnownDocumentIntelligenceLayoutSkillMarkdownHeaderDepth, KnownDocumentIntelligenceLayoutSkillOutputMode, KnownEntityCategory, KnownEntityRecognitionSkillLanguage, KnownImageAnalysisSkillLanguage, KnownImageDetail, KnownIndexerExecutionEnvironment, KnownIndexerExecutionStatusDetail, KnownIndexingMode, KnownIndexProjectionMode, KnownKeyPhraseExtractionSkillLanguage, KnownLexicalAnalyzerName, KnownLexicalNormalizerName, KnownLexicalNormalizerName as KnownNormalizerNames, KnownMarkdownHeaderDepth, KnownMarkdownParsingSubmode, KnownOcrLineEnding, KnownOcrSkillLanguage, KnownPIIDetectionSkillMaskingMode, KnownRegexFlags, KnownSearchFieldDataType, KnownSearchIndexerDataSourceType, KnownSentimentSkillLanguage, KnownSplitSkillEncoderModelName, KnownSplitSkillLanguage, KnownSplitSkillUnit, KnownTextSplitMode, KnownTextTranslationSkillLanguage, KnownVectorEncodingFormat, KnownVectorSearchAlgorithmKind, KnownVectorSearchAlgorithmMetric, KnownVectorSearchCompressionKind, KnownVectorSearchCompressionRescoreStorageMethod, KnownVectorSearchCompressionTarget, KnownVectorSearchVectorizerKind, KnownVisualFeature, } from "./generated/service/models/index.js";
export { default as GeographyPoint } from "./geographyPoint.js";
export { IndexDocumentsBatch } from "./indexDocumentsBatch.js";
export { odata } from "./odata.js";
export { KnownSearchAudience } from "./searchAudience.js";
export { SearchClient } from "./searchClient.js";
export { SearchIndexClient } from "./searchIndexClient.js";
export { SearchIndexerClient } from "./searchIndexerClient.js";
export { DEFAULT_BATCH_SIZE, DEFAULT_FLUSH_WINDOW, DEFAULT_RETRY_COUNT, SearchIndexingBufferedSender, } from "./searchIndexingBufferedSender.js";
export { KnownAnalyzerNames, KnownCharFilterNames, KnownTokenFilterNames, KnownTokenizerNames, } from "./serviceModels.js";
export { createSynonymMapFromFile } from "./synonymMapHelper.js";
//# sourceMappingURL=index.js.map
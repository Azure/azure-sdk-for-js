// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * [Azure Cognitive Language Services](https://learn.microsoft.com/azure/cognitive-services/language-service/overview)
 * is a suite of natural language processing (NLP) skills built with
 * best-in-class Microsoft machine learning algorithms used to analyze
 * unstructured text for actions such as sentiment analysis, key phrase
 * extraction, and language detection.
 *
 * @packageDocumentation
 */

export { AzureKeyCredential } from "@azure/core-auth";

export { TextAnalysisClient } from "./textAnalysisClient.js";
export * from "./models.js";
export {
  type AssessmentSentiment,
  type SentimentAnalysisAction,
  type EntityLinkingAction,
  type EntityRecognitionAction,
  type KeyPhraseExtractionAction,
  type LanguageDetectionAction,
  type PiiEntityRecognitionAction,
  type StringIndexType,
  type LinkedEntity,
  type Entity,
  type DetectedLanguage,
  type PiiEntityCategory,
  type PiiEntityDomain,
  type SentimentConfidenceScores,
  type SentenceSentimentLabel,
  type DocumentSentimentLabel,
  type TargetConfidenceScores,
  type TokenSentimentLabel,
  type LanguageDetectionInput,
  type TextDocumentInput,
  type TextDocumentStatistics,
  type DocumentWarning,
  type WarningCode,
  type Match,
  type ActionCommon,
  type ActionPrebuilt,
  type HealthcareAction,
  type CustomEntityRecognitionAction,
  type CustomSingleLabelClassificationAction,
  type CustomMultiLabelClassificationAction,
  type ActionCustom,
  type ClassificationCategory,
  type HealthcareAssertion,
  type HealthcareEntityCategory,
  type EntityDataSource,
  type RelationType,
  type EntityAssociation,
  type EntityCertainty,
  type EntityConditionality,
  type SummaryContext,
  type AbstractiveSummary,
  type ExtractiveSummarizationAction,
  type SummarySentence,
  type ExtractiveSummarizationOrderingCriteria,
  /** orphan exports */
  KnownPiiEntityDomain,
  KnownPiiEntityCategory,
  KnownStringIndexType,
  KnownErrorCode,
  KnownInnerErrorCode,
  type TextDocumentBatchStatistics,
  KnownRelationType,
  KnownExtractiveSummarizationOrderingCriteria,
  KnownHealthcareEntityCategory,
} from "./generated/models/index.js";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * [Azure Cognitive Language Services](https://docs.microsoft.com/azure/cognitive-services/language-service/overview)
 * is a suite of natural language processing (NLP) skills built with
 * best-in-class Microsoft machine learning algorithms used to analyze
 * unstructured text for actions such as sentiment analysis, key phrase
 * extraction, and language detection.
 *
 * @packageDocumentation
 */

export { AzureKeyCredential } from "@azure/core-auth";

export { TextAnalysisClient } from "./textAnalysisClient";
export * from "./models";
export {
  AssessmentSentiment,
  SentimentAnalysisAction,
  EntityLinkingAction,
  EntityRecognitionAction,
  KeyPhraseExtractionAction,
  LanguageDetectionAction,
  PiiEntityRecognitionAction,
  StringIndexType,
  LinkedEntity,
  Entity,
  DetectedLanguage,
  PiiEntityCategory,
  PiiEntityDomain,
  SentimentConfidenceScores,
  SentenceSentimentLabel,
  DocumentSentimentLabel,
  TargetConfidenceScores,
  TokenSentimentLabel,
  LanguageDetectionInput,
  TextDocumentInput,
  TextDocumentStatistics,
  DocumentWarning,
  WarningCode,
  Match,
  ActionCommon,
  ActionPrebuilt,
  HealthcareAction,
  CustomEntityRecognitionAction,
  CustomSingleLabelClassificationAction,
  CustomMultiLabelClassificationAction,
  ExtractiveSummarizationAction,
  OperationStatus,
  ActionCustom,
  ClassificationCategory,
  HealthcareAssertion,
  HealthcareEntityCategory,
  ExtractiveSummarizationOrderingCriteria,
  SummarySentence,
  EntityDataSource,
  RelationType,
  EntityAssociation,
  EntityCertainty,
  EntityConditionality,
  FhirVersion,
  /** orphan exports */
  KnownPiiEntityDomain,
  KnownPiiEntityCategory,
  KnownStringIndexType,
  KnownErrorCode,
  KnownInnerErrorCode,
  KnownExtractiveSummarizationOrderingCriteria,
  TextDocumentBatchStatistics,
} from "./generated/models";

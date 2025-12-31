// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AbstractiveSummary,
  AssessmentSentiment,
  ClassificationCategory,
  CustomEntityRecognitionAction,
  CustomMultiLabelClassificationAction,
  CustomSingleLabelClassificationAction,
  DetectedLanguage,
  DocumentSentimentLabel,
  DocumentWarning,
  Entity,
  EntityDataSource,
  EntityLinkingAction,
  EntityRecognitionAction,
  ExtractiveSummarizationAction,
  HealthcareAction,
  HealthcareAssertion,
  HealthcareEntityCategory,
  KeyPhraseExtractionAction,
  LanguageDetectionAction,
  LinkedEntity,
  PiiEntityRecognitionAction,
  RelationType,
  SentenceSentimentLabel,
  SentimentAnalysisAction,
  SentimentConfidenceScores,
  StringIndexType,
  SummarySentence,
  TargetConfidenceScores,
  TextDocumentBatchStatistics,
  TextDocumentStatistics,
  TokenSentimentLabel,
} from "./generated/index.js";
import { KnownErrorCode, KnownInnerErrorCode } from "./generated/index.js";
import type { CommonClientOptions, OperationOptions } from "@azure/core-client";
import type { OperationState, SimplePollerLike } from "@azure/core-lro";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/**
 * Configuration options for {@link TextAnalysisClient}.
 */
export interface TextAnalysisClientOptions extends CommonClientOptions {
  /**
   * The default country hint to use. Defaults to "us".
   */
  defaultCountryHint?: string;

  /**
   * The default language to use. Defaults to "en".
   */
  defaultLanguage?: string;
  /**
   * The version of the Cognitive Language Service API to use.
   */
  serviceVersion?: string;
}

/**
 * Options common to all operations.
 */
export interface TextAnalysisOperationOptions extends OperationOptions {
  /**
   * If set to true, response will contain input and document level statistics.
   */
  includeStatistics?: boolean;
}

/**
 * Options for the begin analyze actions operation.
 */
export interface BeginAnalyzeBatchOptions extends TextAnalysisOperationOptions {
  /**
   * Time delay between poll requests, in milliseconds.
   */
  updateIntervalInMs?: number;
  /**
   * The operation's display name.
   */
  displayName?: string;
}

/**
 * Options for the begin analyze actions operation.
 */
export interface RestoreAnalyzeBatchPollerOptions extends TextAnalysisOperationOptions {
  /**
   * Time delay between poll requests, in milliseconds.
   */
  updateIntervalInMs?: number;
}

/**
 * Type of actions supported by the {@link TextAnalysisClient.analyze} method.
 */
export const AnalyzeActionNames = {
  EntityLinking: "EntityLinking",
  EntityRecognition: "EntityRecognition",
  KeyPhraseExtraction: "KeyPhraseExtraction",
  PiiEntityRecognition: "PiiEntityRecognition",
  LanguageDetection: "LanguageDetection",
  SentimentAnalysis: "SentimentAnalysis",
} as const;

/**
 * Type of actions supported by the {@link TextAnalysisClient.beginAnalyzeBatch} method.
 */
export const AnalyzeBatchActionNames = {
  SentimentAnalysis: "SentimentAnalysis",
  EntityRecognition: "EntityRecognition",
  PiiEntityRecognition: "PiiEntityRecognition",
  KeyPhraseExtraction: "KeyPhraseExtraction",
  EntityLinking: "EntityLinking",
  Healthcare: "Healthcare",
  ExtractiveSummarization: "ExtractiveSummarization",
  AbstractiveSummarization: "AbstractiveSummarization",
  CustomEntityRecognition: "CustomEntityRecognition",
  CustomSingleLabelClassification: "CustomSingleLabelClassification",
  CustomMultiLabelClassification: "CustomMultiLabelClassification",
} as const;

/**
 * Type of actions supported by the {@link TextAnalysisClient.analyze} method.
 */
export type AnalyzeActionName = keyof typeof AnalyzeActionNames;

/**
 * The type of parameters for every action in ${@link AnalyzeActionNames}.
 */
export type AnalyzeActionParameters<ActionName extends AnalyzeActionName> = {
  EntityLinking: EntityLinkingAction;
  EntityRecognition: EntityRecognitionAction;
  PiiEntityRecognition: PiiEntityRecognitionAction;
  KeyPhraseExtraction: KeyPhraseExtractionAction;
  SentimentAnalysis: SentimentAnalysisAction;
  LanguageDetection: LanguageDetectionAction;
}[ActionName];

/**
 * The type of results of every action in ${@link AnalyzeActionNames}.
 */
export type AnalyzeResult<ActionName extends AnalyzeActionName> = {
  EntityLinking: EntityLinkingResult[];
  EntityRecognition: EntityRecognitionResult[];
  PiiEntityRecognition: PiiEntityRecognitionResult[];
  KeyPhraseExtraction: KeyPhraseExtractionResult[];
  SentimentAnalysis: SentimentAnalysisResult[];
  LanguageDetection: LanguageDetectionResult[];
}[ActionName];

/** Options for an Abstractive Summarization action. */
export interface AbstractiveSummarizationAction {
  /** The approximate number of sentences to be part of the summary. */
  sentenceCount?: number;
  /**
   * Specifies the measurement unit used to calculate the offset and length properties. For a list of possible values, see {@link KnownStringIndexType}.
   *
   * The default is the JavaScript's default which is "Utf16CodeUnit".
   */
  stringIndexType?: StringIndexType;
}

/**
 * Enum of possible error codes of a {@link TextAnalysisError}.
 */
export const KnownTextAnalysisErrorCode = { ...KnownErrorCode, ...KnownInnerErrorCode };

/**
 * Type describing an API error.
 */
export interface TextAnalysisError {
  /**
   * A code describing the kind of error produced. See {@link KnownTextAnalysisErrorCode}.
   */
  readonly code: string;
  /**
   * A message from the service explaining the error
   */
  readonly message: string;
  /**
   * The target of the particular error (for example, the name of an invalid parameter)
   */
  readonly target?: string;
}

/**
 * Base type for results of an action corresponding to a single input document.
 */
export interface TextAnalysisSuccessResult {
  /**
   * Unique, non-empty document identifier.
   */
  readonly id: string;

  /**
   * Statistics about the input document and how it was processed by the service.
   * This property will have a value when includeStatistics is set to true in
   * the client call.
   */
  readonly statistics?: TextDocumentStatistics;

  /**
   * An array of warning data corresponding to this document.
   *
   * If no warnings were returned, this array will be empty.
   */
  readonly warnings: DocumentWarning[];

  /**
   * Discriminant to determine if this is an error result.
   */
  readonly error?: undefined;
}

/**
 * Base type for error results of an action corresponding to a single document.
 */
export interface TextAnalysisErrorResult {
  /**
   * Unique, non-empty document identifier.
   */
  readonly id: string;

  /**
   * The Error for this document result.
   */
  readonly error: TextAnalysisError;
}

/**
 * The result of an entity recognition action on a single document.
 */
export type EntityRecognitionResult = EntityRecognitionSuccessResult | EntityRecognitionErrorResult;

/**
 * The result of an entity recognition action on a single document, containing
 * a collection of {@link Entity} objects identified in that document.
 */
export interface EntityRecognitionSuccessResult extends TextAnalysisSuccessResult {
  /**
   * The collection of entities identified in the input document.
   */
  readonly entities: Entity[];
}

/**
 * An error result from an entity recognition action on a single document.
 */
export type EntityRecognitionErrorResult = TextAnalysisErrorResult;

/**
 * The result of an entity recognition action on a single document.
 */
export type PiiEntityRecognitionResult =
  | PiiEntityRecognitionSuccessResult
  | PiiEntityRecognitionErrorResult;

/**
 * The result of a pii entity recognition action on a single document,
 * containing the collection of {@link Entity} objects identified in that
 * document.
 */
export interface PiiEntityRecognitionSuccessResult extends TextAnalysisSuccessResult {
  /**
   * The collection of entities identified in the input document.
   */
  readonly entities: Entity[];
  /**
   * The text redacted.
   */
  readonly redactedText: string;
}

/**
 * An error result from a pii entity recognition action on a single document.
 */
export type PiiEntityRecognitionErrorResult = TextAnalysisErrorResult;

/**
 * The result of an entity linking action on a single document.
 */
export type EntityLinkingResult = EntityLinkingSuccessResult | EntityLinkingErrorResult;

/**
 * The result of a entity linking action on a single document, containing a
 * collection of the {@link LinkedEntity} objects identified in that document.
 */
export interface EntityLinkingSuccessResult extends TextAnalysisSuccessResult {
  /**
   * The collection of entities identified in the input document.
   */
  readonly entities: LinkedEntity[];
}

/**
 * An error result from an entity linking action on a single document.
 */
export type EntityLinkingErrorResult = TextAnalysisErrorResult;

/**
 * The result of a language detection action on a single document.
 */
export type LanguageDetectionResult = LanguageDetectionSuccessResult | LanguageDetectionErrorResult;

/**
 * The result of a language detection action on a single document,
 * containing a prediction of what language the document is written in.
 */
export interface LanguageDetectionSuccessResult extends TextAnalysisSuccessResult {
  /**
   * The top detected language by confidence score.
   */
  readonly primaryLanguage: DetectedLanguage;
}

/**
 * An error result from a language detection action on a single document.
 */
export type LanguageDetectionErrorResult = TextAnalysisErrorResult;

/**
 * The result of a sentiment analysis action on a single document.
 */
export type KeyPhraseExtractionResult =
  | KeyPhraseExtractionSuccessResult
  | KeyPhraseExtractionErrorResult;

/**
 * The result of a key phrase extraction action on a single document,
 * containing a collection of the key phrases identified in that document.
 */
export interface KeyPhraseExtractionSuccessResult extends TextAnalysisSuccessResult {
  /**
   * A list of representative words or phrases. The number of key phrases
   * returned is proportional to the number of words in the input document.
   */
  readonly keyPhrases: string[];
}

/**
 * An error result from a key phrase extraction action on a single document.
 */
export type KeyPhraseExtractionErrorResult = TextAnalysisErrorResult;

/**
 * The result of a sentiment analysis action on a single document.
 */
export type SentimentAnalysisResult = SentimentAnalysisSuccessResult | SentimentAnalysisErrorResult;

/**
 * The result of a sentiment analysis action on a single document,
 * containing the predicted sentiment for each sentence as well as for the full
 * document.
 */
export interface SentimentAnalysisSuccessResult extends TextAnalysisSuccessResult {
  /**
   * Predicted sentiment for document. For a list of possible values, see {@link DocumentSentimentLabel}
   */
  readonly sentiment: DocumentSentimentLabel;
  /**
   * Document level sentiment confidence scores between 0 and 1 for each
   * sentiment class.
   */
  readonly confidenceScores: SentimentConfidenceScores;
  /**
   * The predicted sentiment for each sentence in the corresponding document.
   */
  readonly sentences: SentenceSentiment[];
}

/**
 * The predicted sentiment for a given span of text. For more information
 * regarding text sentiment, see {@link https://learn.microsoft.com//azure/cognitive-services/language-service/sentiment-opinion-mining/overview}.
 */
export interface SentenceSentiment {
  /**
   * The sentence text.
   */
  readonly text: string;
  /**
   * The predicted Sentiment for the sentence. For a list of possible values,
   * see {@link SentenceSentimentLabel}
   */
  readonly sentiment: SentenceSentimentLabel;
  /**
   * The sentiment confidence score between 0 and 1 for the sentence for all
   * classes.
   */
  readonly confidenceScores: SentimentConfidenceScores;
  /**
   * The sentence text offset from the start of the document.
   */
  readonly offset: number;
  /**
   * The length of the sentence text.
   */
  readonly length: number;
  /**
   * The list of opinions mined from this sentence. For example in "The food is
   * good, but the service is bad", the following two opinions will be returned:
   * "food is good" and "service is bad".
   *
   * It is non-empty only returned if {@link includeOpinionMining} was set to
   * `true`.
   */
  readonly opinions: Opinion[];
}

/**
 * TargetSentiment contains the predicted sentiment, confidence scores and other
 * information about a target of a product. A target of a product/service is a
 * key component of that product/service. For example in "The food at Hotel Foo
 * is good", "food" is a target of "Hotel Foo".
 */
export interface TargetSentiment {
  /**
   * The sentiment confidence score between 0 and 1 for the target for
   * 'positive' and 'negative' labels.
   */
  readonly confidenceScores: TargetConfidenceScores;
  /**
   * The predicted Sentiment for the Target. For a list of possible values,
   * see {@link TokenSentimentLabel}
   */
  readonly sentiment: TokenSentimentLabel;
  /**
   * The target text.
   */
  readonly text: string;
  /**
   * The Target text offset from the start of the sentence.
   */
  readonly offset: number;
  /**
   * The length of the Target text.
   */
  readonly length: number;
}

/**
 * A mined opinion object represents an opinion we've extracted from a sentence.
 * It consists of both a target that these assessments are about, and the actual
 * assessments themselves.
 */
export interface Opinion {
  /**
   * The target of a product/service that this assessment is about.
   */
  readonly target: TargetSentiment;
  /**
   * The actual assessments of the target.
   */
  readonly assessments: AssessmentSentiment[];
}

/**
 * A healthcare entity represented as a node in a directed graph where the edges are
 * a particular type of relationship between the source and target nodes.
 */
export interface HealthcareEntity extends Entity {
  /**
   * Normalized name for the entity. For example, the normalized text for "histologically" is "histologic".
   */
  readonly normalizedText?: string;
  /**
   * Whether the entity is negated.
   */
  readonly assertion?: HealthcareAssertion;
  /**
   * Entity references in known data sources.
   */
  readonly dataSources: EntityDataSource[];
  /**
   * Defines values for HealthcareEntityCategory.
   * {@link KnownHealthcareEntityCategory} can be used interchangeably with HealthcareEntityCategory,
   *  this enum contains the known values that the service supports.
   * ### Known values supported by the service
   * **BODY_STRUCTURE**
   * **AGE**
   * **GENDER**
   * **EXAMINATION_NAME**
   * **DATE**
   * **DIRECTION**
   * **FREQUENCY**
   * **MEASUREMENT_VALUE**
   * **MEASUREMENT_UNIT**
   * **RELATIONAL_OPERATOR**
   * **TIME**
   * **GENE_OR_PROTEIN**
   * **VARIANT**
   * **ADMINISTRATIVE_EVENT**
   * **CARE_ENVIRONMENT**
   * **HEALTHCARE_PROFESSION**
   * **DIAGNOSIS**
   * **SYMPTOM_OR_SIGN**
   * **CONDITION_QUALIFIER**
   * **MEDICATION_CLASS**
   * **MEDICATION_NAME**
   * **DOSAGE**
   * **MEDICATION_FORM**
   * **MEDICATION_ROUTE**
   * **FAMILY_RELATION**
   * **TREATMENT_NAME**
   */
  readonly category: HealthcareEntityCategory;
}

/**
 * The type of different roles a healthcare entity can play in a relation.
 */
export type HealthcareEntityRelationRoleType = string;

/**
 * A healthcare entity that plays a specific role in a relation.
 */
export interface HealthcareEntityRelationRole {
  /**
   * A healthcare entity
   */
  readonly entity: HealthcareEntity;
  /**
   * The role of the healthcare entity in a particular relation.
   */
  readonly name: HealthcareEntityRelationRoleType;
}

/**
 * A relationship between two or more healthcare entities.
 */
export interface HealthcareEntityRelation {
  /**
   * The type of the healthcare relation.
   */
  readonly relationType: RelationType;
  /**
   * The list of healthcare entities and their roles in the healthcare relation.
   */
  readonly roles: HealthcareEntityRelationRole[];
  /**
   * The confidence score between 0 and 1 of the extracted relation.
   */
  readonly confidenceScore?: number;
}

/**
 * The results of a successful healthcare analysis action for a single document.
 */
export interface HealthcareSuccessResult extends TextAnalysisSuccessResult {
  /**
   * Healthcare entities.
   */
  readonly entities: HealthcareEntity[];
  /**
   * Relations between healthcare entities.
   */
  readonly entityRelations: HealthcareEntityRelation[];
}

/**
 * An error result from the healthcare analysis action on a single document.
 */
export type HealthcareErrorResult = TextAnalysisErrorResult;

/**
 * The result of the healthcare analysis action on a single document.
 */
export type HealthcareResult = HealthcareSuccessResult | HealthcareErrorResult;

/**
 * The result of the extractive summarization action on a single document.
 */
export type ExtractiveSummarizationResult =
  | ExtractiveSummarizationSuccessResult
  | ExtractiveSummarizationErrorResult;

/**
 * The result of the extractive summarization action on a single document,
 * containing a collection of the summary identified in that document.
 */
export interface ExtractiveSummarizationSuccessResult extends TextAnalysisSuccessResult {
  /**
   * A list of sentences composing a summary of the input document.
   */
  readonly sentences: SummarySentence[];
}

/**
 * An error result from the extractive summarization action on a single document.
 */
export type ExtractiveSummarizationErrorResult = TextAnalysisErrorResult;

/**
 * The result of the abstractive summarization action on a single document.
 */
export type AbstractiveSummarizationResult =
  | AbstractiveSummarizationSuccessResult
  | AbstractiveSummarizationErrorResult;

/**
 * The result of the abstractive summarization action on a single document,
 * containing a collection of the summaries identified for that document.
 */
export interface AbstractiveSummarizationSuccessResult extends TextAnalysisSuccessResult {
  /**
   * A list of summaries of the input document.
   */
  readonly summaries: AbstractiveSummary[];
}

/**
 * An error result from the abstractive summarization action on a single document.
 */
export type AbstractiveSummarizationErrorResult = TextAnalysisErrorResult;

/**
 * The result of the custom entity recognition action on a single document.
 */
export type CustomEntityRecognitionResult =
  | CustomEntityRecognitionSuccessResult
  | CustomEntityRecognitionErrorResult;

/**
 * The result of the custom entity recognition action on a single document,
 * containing a collection of the entities identified in that document.
 */
export interface CustomEntityRecognitionSuccessResult extends TextAnalysisSuccessResult {
  /**
   * The collection of entities identified in the input document.
   */
  readonly entities: Entity[];
}

/**
 * An error result from the custom entity recognition action on a single document.
 */
export type CustomEntityRecognitionErrorResult = TextAnalysisErrorResult;

/**
 * The result of the single-label classification action on a single document.
 */
export type CustomSingleLabelClassificationResult =
  | CustomSingleLabelClassificationSuccessResult
  | CustomSingleLabelClassificationErrorResult;

/**
 * The result of a successful single-label classification action on a single document,
 * containing the result of the classification.
 */
export interface CustomSingleLabelClassificationSuccessResult extends TextAnalysisSuccessResult {
  /**
   * The collection of classifications in the input document.
   */
  readonly classifications: ClassificationCategory[];
}

/**
 * An error result from the single-label classification action on a single document.
 */
export type CustomSingleLabelClassificationErrorResult = TextAnalysisErrorResult;

/**
 * The result of the multi-label classification action on a multi document.
 */
export type CustomMultiLabelClassificationResult =
  | CustomMultiLabelClassificationSuccessResult
  | CustomMultiLabelClassificationErrorResult;

/**
 * The result of a successful multi-label classification action on a multi document,
 * containing the result of the classification.
 */
export interface CustomMultiLabelClassificationSuccessResult extends TextAnalysisSuccessResult {
  /**
   * The collection of classifications in the input document.
   */
  readonly classifications: ClassificationCategory[];
}

/**
 * An error result from the multi-label classification action on a multi document.
 */
export type CustomMultiLabelClassificationErrorResult = TextAnalysisErrorResult;

/**
 * Options common to all batch actions.
 */
export interface AnalyzeBatchActionCommon {
  /**
   * The name of the action.
   */
  actionName?: string;
}

/** Options for an entity linking batch action. */
export interface EntityLinkingBatchAction extends AnalyzeBatchActionCommon, EntityLinkingAction {
  /**
   * The kind of the action.
   */
  kind: "EntityLinking";
}

/** Options for an entity recognition batch action. */
export interface EntityRecognitionBatchAction
  extends AnalyzeBatchActionCommon, EntityRecognitionAction {
  /**
   * The kind of the action.
   */
  kind: "EntityRecognition";
}

/** Options for an key phrase extraction batch action. */
export interface KeyPhraseExtractionBatchAction
  extends AnalyzeBatchActionCommon, KeyPhraseExtractionAction {
  /**
   * The kind of the action.
   */
  kind: "KeyPhraseExtraction";
}

/** Options for a pii entity recognition batch action. */
export interface PiiEntityRecognitionBatchAction
  extends AnalyzeBatchActionCommon, PiiEntityRecognitionAction {
  /**
   * The kind of the action.
   */
  kind: "PiiEntityRecognition";
}

/** Options for a healthcare batch action. */
export interface HealthcareBatchAction extends AnalyzeBatchActionCommon, HealthcareAction {
  /**
   * The kind of the action.
   */
  kind: "Healthcare";
}

/** Options for a sentiment analysis batch action. */
export interface SentimentAnalysisBatchAction
  extends AnalyzeBatchActionCommon, SentimentAnalysisAction {
  /**
   * The kind of the action.
   */
  kind: "SentimentAnalysis";
}

/** Options for an extractive summarization batch action. */
export interface ExtractiveSummarizationBatchAction
  extends AnalyzeBatchActionCommon, ExtractiveSummarizationAction {
  /**
   * The kind of the action.
   */
  kind: "ExtractiveSummarization";
}

/** Options for an abstractive summarization batch action. */
export interface AbstractiveSummarizationBatchAction
  extends AnalyzeBatchActionCommon, AbstractiveSummarizationAction {
  /**
   * The kind of the action.
   */
  kind: "AbstractiveSummarization";
}

/** Options for a custom entity recognition batch action. */
export interface CustomEntityRecognitionBatchAction
  extends AnalyzeBatchActionCommon, CustomEntityRecognitionAction {
  /**
   * The kind of the action.
   */
  kind: "CustomEntityRecognition";
}

/** Options for a custom single-label classification batch action. */
export interface CustomSingleLabelClassificationBatchAction
  extends AnalyzeBatchActionCommon, CustomSingleLabelClassificationAction {
  /**
   * The kind of the action.
   */
  kind: "CustomSingleLabelClassification";
}

/** Options for a custom multi-label classification batch action. */
export interface CustomMultiLabelClassificationBatchAction
  extends AnalyzeBatchActionCommon, CustomMultiLabelClassificationAction {
  /**
   * The kind of the action.
   */
  kind: "CustomMultiLabelClassification";
}

/**
 * Batch of actions.
 */
export type AnalyzeBatchAction =
  | EntityLinkingBatchAction
  | EntityRecognitionBatchAction
  | KeyPhraseExtractionBatchAction
  | PiiEntityRecognitionBatchAction
  | HealthcareBatchAction
  | SentimentAnalysisBatchAction
  | ExtractiveSummarizationBatchAction
  | AbstractiveSummarizationBatchAction
  | CustomEntityRecognitionBatchAction
  | CustomSingleLabelClassificationBatchAction
  | CustomMultiLabelClassificationBatchAction;

/**
 * Type of actions supported by the {@link TextAnalysisClient.beginAnalyzeBatch} method.
 */
export type AnalyzeBatchActionName = keyof typeof AnalyzeBatchActionNames;

/** The State of a batched action */
export interface BatchActionState<Kind extends AnalyzeBatchActionName> {
  /**
   * The kind of the action results.
   */
  readonly kind: Kind;
  /**
   * The name of the action.
   */
  readonly actionName?: string;
  /**
   * Action statistics.
   */
  readonly statistics?: TextDocumentBatchStatistics;
}

/**
 * Action metadata.
 */
export interface ActionMetadata {
  /**
   * The model version used to perform the action.
   */
  readonly modelVersion: string;
}

/**
 * Custom action metadata.
 */
export interface CustomActionMetadata {
  /**
   * The name of the project used to perform the action.
   */
  readonly projectName: string;
  /**
   * The name of the deployment used to perform the action.
   */
  readonly deploymentName: string;
}

/**
 * The state of a succeeded batched action.
 */
export interface BatchActionSuccessResult<
  T,
  Kind extends AnalyzeBatchActionName,
> extends BatchActionState<Kind> {
  /**
   * The list of document results.
   */
  readonly results: T[];
  /**
   * When this action was completed by the service.
   */
  readonly completedOn: Date;
  /**
   * Discriminant to determine if that this is an error result.
   */
  readonly error?: undefined;
}

/**
 * The error of an analyze batch action.
 */
export interface BatchActionErrorResult<
  Kind extends AnalyzeBatchActionName,
> extends BatchActionState<Kind> {
  /**
   * When this action was completed by the service.
   */
  readonly failedOn: Date;
  /**
   * The Error for this action result.
   */
  readonly error: TextAnalysisError;
}

/**
 * The result of a batched action.
 */
export type BatchActionResult<T, Kind extends AnalyzeBatchActionName> =
  | BatchActionSuccessResult<T, Kind>
  | BatchActionErrorResult<Kind>;

/**
 * The result of an entity linking batch action.
 */
export type EntityLinkingBatchResult = ActionMetadata &
  BatchActionResult<EntityLinkingResult, "EntityLinking">;

/**
 * The result of an entity recognition batch action.
 */
export type EntityRecognitionBatchResult = ActionMetadata &
  BatchActionResult<EntityRecognitionResult, "EntityRecognition">;

/**
 * The result of a key phrase extraction batch action.
 */
export type KeyPhraseExtractionBatchResult = ActionMetadata &
  BatchActionResult<KeyPhraseExtractionResult, "KeyPhraseExtraction">;

/**
 * The result of a pii entity recognition batch action.
 */
export type PiiEntityRecognitionBatchResult = ActionMetadata &
  BatchActionResult<PiiEntityRecognitionResult, "PiiEntityRecognition">;

/**
 * The result of a sentiment analysis batch action.
 */
export type SentimentAnalysisBatchResult = ActionMetadata &
  BatchActionResult<SentimentAnalysisResult, "SentimentAnalysis">;

/**
 * The result of a healthcare batch action.
 */
export type HealthcareBatchResult = ActionMetadata &
  BatchActionResult<HealthcareResult, "Healthcare">;

/**
 * The result of an extractive summarization batch action.
 */
export type ExtractiveSummarizationBatchResult = ActionMetadata &
  BatchActionResult<ExtractiveSummarizationResult, "ExtractiveSummarization">;

/**
 * The result of an abstractive summarization batch action.
 */
export type AbstractiveSummarizationBatchResult = ActionMetadata &
  BatchActionResult<AbstractiveSummarizationResult, "AbstractiveSummarization">;

/**
 * The result of a custom entity recognition batch action.
 */
export type CustomEntityRecognitionBatchResult = CustomActionMetadata &
  BatchActionResult<CustomEntityRecognitionResult, "CustomEntityRecognition">;

/**
 * The result of a custom single-label classification batch action.
 */
export type CustomSingleLabelClassificationBatchResult = CustomActionMetadata &
  BatchActionResult<CustomSingleLabelClassificationResult, "CustomSingleLabelClassification">;

/**
 * The result of a custom multi-label classification batch action.
 */
export type CustomMultiLabelClassificationBatchResult = CustomActionMetadata &
  BatchActionResult<CustomMultiLabelClassificationResult, "CustomMultiLabelClassification">;
/**
 * Results of a batch of actions.
 */
export type AnalyzeBatchResult =
  | EntityLinkingBatchResult
  | EntityRecognitionBatchResult
  | KeyPhraseExtractionBatchResult
  | PiiEntityRecognitionBatchResult
  | SentimentAnalysisBatchResult
  | HealthcareBatchResult
  | ExtractiveSummarizationBatchResult
  | AbstractiveSummarizationBatchResult
  | CustomEntityRecognitionBatchResult
  | CustomSingleLabelClassificationBatchResult
  | CustomMultiLabelClassificationBatchResult;

/**
 * An error result from a sentiment analysis action on a single document.
 */
export type SentimentAnalysisErrorResult = TextAnalysisErrorResult;

/**
 * Paged results of the {@link TextAnalysisClient.beginAnalyzeBatch} operation.
 */
export type PagedAnalyzeBatchResult = PagedAsyncIterableIterator<AnalyzeBatchResult>;

/**
 * A poller that polls long-running operations started by {@link TextAnalysisClient.beginAnalyzeBatch}.
 */
export type AnalyzeBatchPoller = PollerLike<AnalyzeBatchOperationState, PagedAnalyzeBatchResult>;

/**
 * The metadata for long-running operations started by {@link TextAnalysisClient.beginAnalyzeBatch}.
 */
export interface AnalyzeBatchOperationMetadata {
  /**
   * The date and time the operation was created.
   */
  readonly createdOn: Date;
  /**
   * The date and time when the operation results will expire on the server.
   */
  readonly expiresOn?: Date;
  /**
   * The operation id.
   */
  readonly id: string;
  /**
   * The time the operation status was last updated.
   */
  readonly modifiedOn: Date;
  /**
   * Number of successfully completed actions.
   */
  readonly actionSucceededCount: number;
  /**
   * Number of failed actions.
   */
  readonly actionFailedCount: number;
  /**
   * Number of actions still in progress.
   */
  readonly actionInProgressCount: number;
  /**
   * The operation's display name.
   */
  readonly displayName?: string;
}

/**
 * The state of the begin analyze polling operation.
 */
export interface AnalyzeBatchOperationState
  extends OperationState<PagedAnalyzeBatchResult>, AnalyzeBatchOperationMetadata {}

/**
 * Abstract representation of a poller, intended to expose just the minimal API that the user needs to work with.
 */
export interface PollerLike<
  TState extends OperationState<TResult>,
  TResult,
> extends SimplePollerLike<TState, TResult> {
  /**
   * sends a cancellation request.
   */
  sendCancellationRequest: () => Promise<void>;
}

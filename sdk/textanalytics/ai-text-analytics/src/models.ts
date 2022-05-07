// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
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
  HealthcareAction,
  HealthcareAssertion,
  HealthcareEntityCategory,
  KeyPhraseExtractionAction,
  KnownErrorCode,
  KnownInnerErrorCode,
  LanguageDetectionAction,
  LinkedEntity,
  PiiEntityRecognitionAction,
  RelationType,
  SentenceSentimentLabel,
  SentimentAnalysisAction,
  SentimentConfidenceScores,
  State,
  TargetConfidenceScores,
  TextDocumentBatchStatistics,
  TextDocumentStatistics,
  TokenSentimentLabel,
} from "./generated";
import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import { PollOperationState, PollerLike } from "@azure/core-lro";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

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
  apiVersion?: string;
}

/**
 * Options common to all operations.
 */
export interface TextAnalysisOperationOptions extends OperationOptions {
  /**
   * If set to true, response will contain input and document level statistics.
   */
  includeStatistics?: boolean;
  /**
   * The version of the Cognitive Language Service API to use.
   */
  apiVersion?: string;
}

/**
 * Options for the begin analyze actions operation.
 */
export interface BeginAnalyzeBatchOptions extends TextAnalysisOperationOptions {
  /**
   * Delay to wait until next poll, in milliseconds.
   */
  updateIntervalInMs?: number;
  /**
   * A serialized poller which can be used to poll an existing Long-Running-Operation.
   */
  resumeFrom?: string;
  /**
   * The operation's display name.
   */
  displayName?: string;
}

/**
 * Options for the begin analyze actions operation.
 */
export interface CreateAnalyzeBatchPollerOptions extends TextAnalysisOperationOptions {
  /**
   * Delay to wait until next poll, in milliseconds.
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
 * regarding text sentiment, see {@link https://docs.microsoft.com//azure/cognitive-services/language-service/sentiment-opinion-mining/overview}.
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
  normalizedText?: string;
  /**
   * Whether the entity is negated.
   */
  assertion?: HealthcareAssertion;
  /**
   * Entity references in known data sources.
   */
  dataSources: EntityDataSource[];
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
  category: HealthcareEntityCategory;
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
  entity: HealthcareEntity;
  /**
   * The role of the healthcare entity in a particular relation.
   */
  name: HealthcareEntityRelationRoleType;
}

/**
 * A relationship between two or more healthcare entities.
 */
export interface HealthcareEntityRelation {
  /**
   * The type of the healthcare relation.
   */
  relationType: RelationType;
  /**
   * The list of healthcare entities and their roles in the healthcare relation.
   */
  roles: HealthcareEntityRelationRole[];
}

/**
 * The results of a successful healthcare operation for a single document.
 */
export interface HealthcareSuccessResult extends TextAnalysisSuccessResult {
  /**
   * Healthcare entities.
   */
  entities: HealthcareEntity[];
  /**
   * Relations between healthcare entities.
   */
  entityRelations: HealthcareEntityRelation[];
  /**
   * JSON bundle containing a FHIR compatible object for consumption in other
   * Healthcare tools. For additional information see {@link https://www.hl7.org/fhir/overview.html}.
   */
  fhirBundle?: { [propertyName: string]: any };
}

/**
 * An error result from the healthcare operation on a single document.
 */
export type HealthcareErrorResult = TextAnalysisErrorResult;

/**
 * The result of the healthcare operation on a single document.
 */
export type HealthcareResult = HealthcareSuccessResult | HealthcareErrorResult;

/**
 * The result of the custom recognize entities operation on a single document.
 */
export type CustomEntityRecognitionResult =
  | CustomEntityRecognitionSuccessResult
  | CustomEntityRecognitionErrorResult;

/**
 * The result of the recognize custom entities operation on a single document,
 * containing a collection of the entities identified in that document.
 */
export interface CustomEntityRecognitionSuccessResult extends TextAnalysisSuccessResult {
  /**
   * The collection of entities identified in the input document.
   */
  entities: Entity[];
}

/**
 * An error result from the recognize custom entities operation on a single document.
 */
export type CustomEntityRecognitionErrorResult = TextAnalysisErrorResult;

/**
 * The result of the custom classify document single category operation on a single document.
 */
export type CustomSingleLabelClassificationResult =
  | CustomSingleLabelClassificationSuccessResult
  | CustomSingleLabelClassificationErrorResult;

/**
 * The result of the custom classify document single category operation on a single document,
 * containing the result of the classification.
 */
export interface CustomSingleLabelClassificationSuccessResult extends TextAnalysisSuccessResult {
  /**
   * The classification result of the input document.
   */
  classification: ClassificationCategory;
}

/**
 * An error result from the custom classify document single category operation on a single document.
 */
export type CustomSingleLabelClassificationErrorResult = TextAnalysisErrorResult;

/**
 * The result of the custom classify document multi categories operation on a multi document.
 */
export type CustomMultiLabelClassificationResult =
  | CustomMultiLabelClassificationSuccessResult
  | CustomMultiLabelClassificationErrorResult;

/**
 * The result of the custom classify document multi categories operation on a multi document,
 * containing the result of the classification.
 */
export interface CustomMultiLabelClassificationSuccessResult extends TextAnalysisSuccessResult {
  /**
   * The collection of classifications in the input document.
   */
  classifications: ClassificationCategory[];
}

/**
 * An error result from the custom classify document multi category operation on a multi document.
 */
export type CustomMultiLabelClassificationErrorResult = TextAnalysisErrorResult;

/**
 * Batch of actions.
 */
export type AnalyzeBatchAction = {
  actionName?: string;
} & (
  | (EntityLinkingAction & { kind: "EntityLinking" })
  | (EntityRecognitionAction & { kind: "EntityRecognition" })
  | (KeyPhraseExtractionAction & { kind: "KeyPhraseExtraction" })
  | (PiiEntityRecognitionAction & { kind: "PiiEntityRecognition" })
  | (SentimentAnalysisAction & { kind: "SentimentAnalysis" })
  | (HealthcareAction & { kind: "Healthcare" })
  | (CustomEntityRecognitionAction & { kind: "CustomEntityRecognition" })
  | (CustomSingleLabelClassificationAction & { kind: "CustomSingleLabelClassification" })
  | (CustomMultiLabelClassificationAction & { kind: "CustomMultiLabelClassification" })
);

/** The State of a batched action */
export interface BatchActionState {
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
export interface BatchActionSuccessResult<T> extends BatchActionState {
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
export interface BatchActionErrorResult extends BatchActionState {
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
export type BatchActionResult<T> = BatchActionSuccessResult<T> | BatchActionErrorResult;

/**
 * Results of a batch of actions.
 */
export type AnalyzeBatchResult =
  | (BatchActionResult<EntityLinkingResult> & ActionMetadata & { kind: "EntityLinking" })
  | (BatchActionResult<EntityRecognitionResult> & ActionMetadata & { kind: "EntityRecognition" })
  | (BatchActionResult<KeyPhraseExtractionResult> &
      ActionMetadata & { kind: "KeyPhraseExtraction" })
  | (BatchActionResult<PiiEntityRecognitionResult> &
      ActionMetadata & {
        kind: "PiiEntityRecognition";
      })
  | (BatchActionResult<SentimentAnalysisResult> & ActionMetadata & { kind: "SentimentAnalysis" })
  | (BatchActionResult<HealthcareResult> & ActionMetadata & { kind: "Healthcare" })
  | (BatchActionResult<CustomEntityRecognitionResult> &
      CustomActionMetadata & {
        kind: "CustomEntityRecognition";
      })
  | (BatchActionResult<CustomSingleLabelClassificationResult> &
      CustomActionMetadata & {
        kind: "CustomSingleLabelClassification";
      })
  | (BatchActionResult<CustomMultiLabelClassificationResult> &
      CustomActionMetadata & {
        kind: "CustomMultiLabelClassification";
      });

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
  createdOn: Date;
  /**
   * The date and time when the operation results will expire on the server.
   */
  expiresOn?: Date;
  /**
   * The operation id.
   */
  operationId: string;
  /**
   * The time the operation status was last updated.
   */
  lastModifiedOn: Date;
  /**
   * The current status of the operation.
   */
  status: State;
  /**
   * Number of successfully completed actions.
   */
  actionSucceededCount: number;
  /**
   * Number of failed actions.
   */
  actionFailedCount: number;
  /**
   * Number of actions still in progress.
   */
  actionInProgressCount: number;
  /**
   * The operation's display name.
   */
  displayName?: string;
}

/**
 * The state of the begin analyze polling operation.
 */
export interface AnalyzeBatchOperationState
  extends PollOperationState<PagedAnalyzeBatchResult>,
    AnalyzeBatchOperationMetadata {}

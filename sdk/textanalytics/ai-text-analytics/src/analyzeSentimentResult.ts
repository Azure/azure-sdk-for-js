// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult,
} from "./textAnalyticsResult";
import {
  TextAnalyticsError,
  DocumentSentimentLabel,
  SentimentConfidenceScores,
  SentenceSentiment as GeneratedSentenceSentiment,
  SentenceSentimentLabel,
  DocumentSentiment,
  SentenceTarget,
  TargetRelation,
  SentenceAssessment,
  TokenSentimentValue as SentenceTargetSentiment,
  TargetConfidenceScoreLabel,
} from "./generated/models";
import { AssessmentIndex, parseAssessmentIndex } from "./util";

/**
 * The result of the analyze sentiment operation on a single document.
 */
export type AnalyzeSentimentResult = AnalyzeSentimentSuccessResult | AnalyzeSentimentErrorResult;

/**
 *  The result of the analyze sentiment operation on a single document,
 *  containing the predicted sentiment for each sentence as well as for the full document.
 */
export interface AnalyzeSentimentSuccessResult extends TextAnalyticsSuccessResult {
  /**
   * Predicted sentiment for document. Possible values
   * include: 'positive', 'neutral', 'negative', 'mixed'
   */
  sentiment: DocumentSentimentLabel;
  /**
   * Document level sentiment confidence scores between 0 and 1 for each sentiment class.
   */
  confidenceScores: SentimentConfidenceScores;
  /**
   * The predicted sentiment for each sentence in the corresponding document.
   */
  sentences: SentenceSentiment[];
}

/**
 * The predicted sentiment for a given span of text. For more information regarding text sentiment, see https://docs.microsoft.com/azure/cognitive-services/Text-Analytics/how-tos/text-analytics-how-to-sentiment-analysis.
 */
export interface SentenceSentiment {
  /**
   * The sentence text.
   */
  text: string;
  /**
   * The predicted Sentiment for the sentence.
   */
  sentiment: SentenceSentimentLabel;
  /**
   * The sentiment confidence score between 0 and 1 for the sentence for all classes.
   */
  confidenceScores: SentimentConfidenceScores;
  /**
   * The sentence text offset from the start of the document.
   */
  offset: number;
  /**
   * The length of the sentence text.
   */
  length: number;
  /**
   * The list of opinions mined from this sentence. For example in "The food is
   * good, but the service is bad", we would mine these two opinions "food is
   * good", "service is bad". Only returned if `includeOpinionMining` is set to
   * True in the call to `analyzeSentiment`.
   */
  opinions: Opinion[];
}

/**
 * TargetSentiment contains the predicted sentiment, confidence scores and other
 * information about an target of a product. A target of a product/service is a
 * key component of that product/service. For example in "The food at Hotel Foo
 * is good", "food" is a target of "Hotel Foo".
 */
export interface TargetSentiment {
  /**
   * The sentiment confidence score between 0 and 1 for the target for
   * 'positive' and 'negative' labels.
   */
  confidenceScores: TargetConfidenceScoreLabel;
  /**
   * The predicted Sentiment for the Target. Possible values include 'positive',
   * 'mixed', and 'negative'.
   */
  sentiment: SentenceTargetSentiment;
  /**
   * The target text.
   */
  text: string;
  /**
   * The Target text offset from the start of the sentence.
   */
  offset: number;
  /**
   * The length of the Target text.
   */
  length: number;
}

/**
 * AssessmentSentiment contains the predicted sentiment, confidence scores and
 * other information about an assessment of a target. For example, in the sentence
 * "The food is good", the assessment of the target 'food' is 'good'.
 */
export interface AssessmentSentiment extends SentenceAssessment {}

/**
 * A mined opinion object represents an opinion we've extracted from a sentence.
 * It consists of both a target that these assessments are about, and the actual
 * assessments themselves.
 */
export interface Opinion {
  /**
   * The target of a product/service that this assessment is about.
   */
  target: TargetSentiment;
  /**
   * The actual assessments of the target.
   */
  assessments: AssessmentSentiment[];
}

/**
 * An error result from the analyze sentiment operation on a single document.
 */
export type AnalyzeSentimentErrorResult = TextAnalyticsErrorResult;

/**
 * @param document - A document result coming from the service.
 * @internal
 */
export function makeAnalyzeSentimentResult(
  result: DocumentSentiment
): AnalyzeSentimentSuccessResult {
  const {
    id,
    sentiment,
    confidenceScores,
    sentenceSentiments: sentences,
    warnings,
    statistics,
  } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    sentiment,
    confidenceScores,
    sentences: sentences.map((sentence) => convertGeneratedSentenceSentiment(sentence, result)),
  };
}

/**
 * @internal
 */
export function makeAnalyzeSentimentErrorResult(
  id: string,
  error: TextAnalyticsError
): AnalyzeSentimentErrorResult {
  return makeTextAnalyticsErrorResult(id, error);
}

/**
 * Converts a sentence sentiment object returned by the service to another that
 * is user-friendly.
 *
 * @param sentence - The sentence sentiment object to be converted.
 * @param response - The entire response returned by the service.
 * @returns The user-friendly sentence sentiment object.
 * @internal
 */
function convertGeneratedSentenceSentiment(
  sentence: GeneratedSentenceSentiment,
  result: DocumentSentiment
): SentenceSentiment {
  return {
    confidenceScores: sentence.confidenceScores,
    sentiment: sentence.sentiment,
    text: sentence.text,
    offset: sentence.offset,
    length: sentence.length,
    opinions: sentence.targets
      ? sentence.targets.map(
          (target: SentenceTarget): Opinion => ({
            target: {
              confidenceScores: target.confidenceScores,
              sentiment: target.sentiment,
              text: target.text,
              offset: target.offset,
              length: target.length,
            },
            assessments: target.relations
              .filter((relation) => relation.relationType === "assessment")
              .map((relation) => convertTargetRelationToAssessmentSentiment(relation, result)),
          })
        )
      : [],
  };
}

/**
 * Converts a target relation object returned by the service to an assessment
 * sentiment object where JSON pointers in the former are realized in the
 * latter.
 *
 * @param targetRelation - The target relation object to be converted.
 * @param response - The entire response returned by the service.
 * @returns The user-friendly assessment sentiment object.
 * @internal
 */
function convertTargetRelationToAssessmentSentiment(
  targetRelation: TargetRelation,
  result: DocumentSentiment
): AssessmentSentiment {
  const assessmentPtr = targetRelation.ref;
  const assessmentIndex: AssessmentIndex = parseAssessmentIndex(assessmentPtr);
  const assessment: SentenceAssessment | undefined =
    result.sentenceSentiments?.[assessmentIndex.sentence].assessments?.[assessmentIndex.assessment];
  if (assessment !== undefined) {
    return assessment;
  } else {
    throw new Error(`Pointer "${assessmentPtr}" is not a valid Assessment pointer`);
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  makeTextAnalyticsSuccessResult,
  TextAnalyticsSuccessResult,
  TextAnalyticsErrorResult,
  makeTextAnalyticsErrorResult
} from "./textAnalyticsResult";
import {
  TextAnalyticsError,
  DocumentSentimentLabel,
  SentimentConfidenceScores,
  SentenceSentiment as GeneratedSentenceSentiment,
  SentenceSentimentLabel,
  DocumentSentiment,
  SentenceAspect,
  AspectRelation,
  SentenceOpinion,
  TokenSentimentValue as SentenceAspectSentiment,
  AspectConfidenceScoreLabel
} from "./generated/models";
import { OpinionIndex, parseOpinionIndex } from "./util";

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
   * good, but the service is bad", we would mind these two opinions "food is
   * good", "service is bad". Only returned if `show_opinion_mining` is set to
   * True in the call to `analyze_sentiment`.
   */
  minedOpinions: MinedOpinion[];
}

/**
 * AspectSentiment contains the related opinions, predicted sentiment,
 * confidence scores and other information about an aspect of a product.
 * An aspect of a product/service is a key component of that product/service.
 * For example in "The food at Hotel Foo is good", "food" is an aspect of
 * "Hotel Foo".
 */
export interface AspectSentiment {
  /**
   * The sentiment confidence score between 0 and 1 for the aspect for
   * 'positive' and 'negative' labels.
   */
  confidenceScores: AspectConfidenceScoreLabel;
  /**
   * The predicted Sentiment for the aspect. Possible values include 'positive',
   * 'mixed', and 'negative'.
   */
  sentiment: SentenceAspectSentiment;
  /**
   * The aspect text.
   */
  text: string;
  /**
   * The aspect text offset from the start of the sentence.
   */
  offset: number;
  /**
   * The length of the aspect text.
   */
  length: number;
}

/**
 * OpinionSentiment contains the predicted sentiment, confidence scores and
 * other information about an opinion of an aspect. For example, in the sentence
 * "The food is good", the opinion of the aspect 'food' is 'good'.
 */
export interface OpinionSentiment extends SentenceOpinion {}

/**
 * A mined opinion object represents an opinion we've extracted from a sentence.
 * It consists of both an aspect that these opinions are about, and the actual
 * opinions themselves.
 */
export interface MinedOpinion {
  /**
   * The aspect of a product/service that this opinion is about.
   */
  aspect: AspectSentiment;
  /**
   * The actual opinions of the aspect.
   */
  opinions: OpinionSentiment[];
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
    statistics
  } = result;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    sentiment,
    confidenceScores,
    sentences: sentences.map((sentence) => convertGeneratedSentenceSentiment(sentence, result))
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
    minedOpinions: sentence.aspects
      ? sentence.aspects.map(
          (aspect: SentenceAspect): MinedOpinion => ({
            aspect: {
              confidenceScores: aspect.confidenceScores,
              sentiment: aspect.sentiment,
              text: aspect.text,
              offset: aspect.offset,
              length: aspect.length
            },
            opinions: aspect.relations
              .filter((relation) => relation.relationType === "opinion")
              .map((relation) => convertAspectRelationToOpinionSentiment(relation, result))
          })
        )
      : []
  };
}

/**
 * Converts an aspect relation object returned by the service to an opinion
 * sentiment object where JSON pointers in the former are realized in the
 * latter.
 *
 * @param aspectRelation - The aspect relation object to be converted.
 * @param response - The entire response returned by the service.
 * @returns The user-friendly opinion sentiment object.
 * @internal
 */
function convertAspectRelationToOpinionSentiment(
  aspectRelation: AspectRelation,
  result: DocumentSentiment
): OpinionSentiment {
  const opinionPtr = aspectRelation.ref;
  const opinionIndex: OpinionIndex = parseOpinionIndex(opinionPtr);
  const opinion: SentenceOpinion | undefined =
    result.sentenceSentiments?.[opinionIndex.sentence].opinions?.[opinionIndex.opinion];
  if (opinion !== undefined) {
    return opinion;
  } else {
    throw new Error(`Pointer "${opinionPtr}" is not a valid opinion pointer`);
  }
}

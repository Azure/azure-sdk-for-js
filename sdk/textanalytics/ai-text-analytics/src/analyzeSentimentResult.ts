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
  GeneratedClientSentimentResponse,
  SentenceAspect,
  AspectRelation,
  SentenceOpinion
} from "./generated/models";
import { findOpinionIndex, OpinionIndex } from "./util";

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
   * The list of opinions mined from this sentence. For example in "The food is
   * good, but the service is bad", we would mind these two opinions "food is
   * good", "service is bad". Only returned if `show_opinion_mining` is set to
   * True in the call to `analyze_sentiment`.
   */
  minedOpinions?: MinedOpinion[];
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
   * 'positive' and 'negative' labels. It's score for 'neutral' will always be
   * 0.
   */
  confidenceScores: SentimentConfidenceScores;
  /**
   * The predicted Sentiment for the aspect. Possible values include 'positive',
   * 'mixed', and 'negative'.
   */
  sentiment: DocumentSentimentLabel;
  /**
   * The aspect text.
   */
  text: string;
}

/**
 * OpinionSentiment contains the predicted sentiment, confidence scores and 
 * other information about an opinion of an aspect. For example, in the sentence 
 * "The food is good", the opinion of the aspect 'food' is 'good'.
 */
export interface OpinionSentiment {
  /**
   * The sentiment confidence score between 0 and 1 for the opinion for
   * 'positive' and 'negative' labels. It's score for 'neutral' will always be
   * 0.
   */
  confidenceScores: SentimentConfidenceScores;
  /**
   * Whether the opinion is negated. For example, in "The food is not good", the
   * opinion "good" is negated.
   */
  isNegated: boolean;
  /**
   * The predicted Sentiment for the opinion. Possible values include
   * 'positive', 'mixed', and 'negative'.
   */
  sentiment: DocumentSentimentLabel;
  /**
   * The opinion text.
   */
  text: string;
}

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

export function makeAnalyzeSentimentResult(
  document: DocumentSentiment,
  response: GeneratedClientSentimentResponse
): AnalyzeSentimentSuccessResult {
  const {
    id,
    sentiment,
    confidenceScores,
    sentenceSentiments: sentences,
    warnings,
    statistics
  } = document;
  return {
    ...makeTextAnalyticsSuccessResult(id, warnings, statistics),
    sentiment,
    confidenceScores,
    sentences: sentences.map((sentence) => convertGeneratedSentenceSentiment(sentence, response))
  };
}

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
 */
function convertGeneratedSentenceSentiment(
  sentence: GeneratedSentenceSentiment,
  response: GeneratedClientSentimentResponse
): SentenceSentiment {
  return {
    confidenceScores: sentence.confidenceScores,
    sentiment: sentence.sentiment,
    text: sentence.text,
    minedOpinions: sentence.aspects?.map(
      (aspect: SentenceAspect): MinedOpinion => ({
        aspect: {
          confidenceScores: {
            ...(aspect.confidenceScores as SentimentConfidenceScores),
            neutral: 0
          },
          sentiment: aspect.sentiment,
          text: aspect.text
        },
        opinions: aspect.relations
          .filter((relation) => relation.relationType === "opinion")
          .map((relation) => convertAspectRelationToOpinionSentiment(relation, response))
      })
    )
  };
}

/**
 * Converts a sentence opinion returned by the service to an opinion 
 * sentiment object.
 *
 * @param opinion - The sentence opinion object to be converted.
 * @param response - The entire response returned by the service.
 * @returns The user-friendly opinion sentiment object.
 */
function convertSentenceOpinionToOpinionSentiment(opinion: SentenceOpinion): OpinionSentiment {
  const opinionConfidenceScore: SentimentConfidenceScores = {
    positive: opinion.confidenceScores.positive,
    negative: opinion.confidenceScores.negative,
    neutral: 0
  };
  return {
    confidenceScores: opinionConfidenceScore,
    isNegated: opinion.isNegated,
    sentiment: opinion.sentiment,
    text: opinion.text
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
 */
function convertAspectRelationToOpinionSentiment(
  aspectRelation: AspectRelation,
  response: GeneratedClientSentimentResponse
): OpinionSentiment {
  const opinionPtr = aspectRelation.ref;
  const opinionIndex: OpinionIndex = findOpinionIndex(opinionPtr);
  const opinion: SentenceOpinion | undefined =
    response.documents?.[opinionIndex.document].sentenceSentiments?.[opinionIndex.sentence]
      .opinions?.[opinionIndex.opinion];
  if (opinion !== undefined) {
    return convertSentenceOpinionToOpinionSentiment(opinion);
  } else {
    throw new Error(`Pointer "${opinionPtr}" is not a valid opinion pointer`);
  }
}

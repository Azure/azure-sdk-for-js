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
  AspectRelation, SentenceOpinion
} from "./generated/models";
import { dereferenceJsonPointer } from "./util";

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

  minedOpinions?: MinedOpinion[];
}

export interface AspectSentiment {
  /**
   * AspectSentiment contains the related opinions, predicted sentiment,
   * confidence scores and other information about an aspect of a product.
   * An aspect of a product/service is a key component of that product/service.
   * For example in "The food at Hotel Foo is good", "food" is an aspect of
   * "Hotel Foo".
   */
  confidenceScores: SentimentConfidenceScores;
  sentiment: DocumentSentimentLabel;
  text: string;
}

export interface OpinionSentiment {
  confidenceScores: SentimentConfidenceScores;
  isNegated: boolean;
  sentiment: DocumentSentimentLabel;
  text: string;
}


export interface MinedOpinion {
  aspect: AspectSentiment;
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
          confidenceScores: aspect.confidenceScores as SentimentConfidenceScores,
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

function convertSentenceOpinionToOpinionSentiment(opinion : SentenceOpinion) : OpinionSentiment {
  const opinionConfidenceScore : SentimentConfidenceScores = { positive:opinion.confidenceScores.positive, negative:opinion.confidenceScores.negative, neutral:0};
  return {
    confidenceScores: opinionConfidenceScore,
    isNegated:opinion.isNegated,
    sentiment:opinion.sentiment,
    text:opinion.text
  };
}

function convertAspectRelationToOpinionSentiment(
  aspectRelation: AspectRelation,
  response: GeneratedClientSentimentResponse
): OpinionSentiment {
  const opinion : SentenceOpinion = dereferenceJsonPointer(response, aspectRelation.ref) as SentenceOpinion;
  return convertSentenceOpinionToOpinionSentiment(opinion);
}
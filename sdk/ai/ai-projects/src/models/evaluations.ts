// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Identifiers for built-in evaluators available in the AI Projects service.
 * These evaluators can be referenced by their URI values.
 */
export const EvaluatorIds = {
  /** Evaluator for assessing relevance */
  RELEVANCE: "azureai://built-in/evaluators/relevance",

  /** Evaluator for detecting hate speech and unfairness */
  HATE_UNFAIRNESS: "azureai://built-in/evaluators/hate_unfairness",

  /** Evaluator for detecting violent content */
  VIOLENCE: "azureai://built-in/evaluators/violence",

  /** Evaluator for assessing groundedness */
  GROUNDEDNESS: "azureai://built-in/evaluators/groundedness",

  /** Advanced evaluator for assessing groundedness */
  GROUNDEDNESS_PRO: "azureai://built-in/evaluators/groundedness_pro",

  /** Evaluator for calculating BLUE score */
  BLUE_SCORE: "azureai://built-in/evaluators/blue_score",

  /** Evaluator for detecting code vulnerabilities */
  CODE_VULNERABILITY: "azureai://built-in/evaluators/code_vulnerability",

  /** Evaluator for assessing text coherence */
  COHERENCE: "azureai://built-in/evaluators/coherence",

  /** Evaluator for content safety analysis */
  CONTENT_SAFETY: "azureai://built-in/evaluators/content_safety",

  /** Evaluator for calculating F1 score */
  F1_SCORE: "azureai://built-in/evaluators/f1_score",

  /** Evaluator for assessing text fluency */
  FLUENCY: "azureai://built-in/evaluators/fluency",

  /** Evaluator for calculating GLEU score */
  GLEU_SCORE: "azureai://built-in/evaluators/gleu_score",

  /** Evaluator for detecting indirect attacks */
  INDIRECT_ATTACK: "azureai://built-in/evaluators/indirect_attack",

  // INTENT_RESOLUTION: "azureai://built-in/evaluators/intent_resolution", // Commented out as in original

  /** Evaluator for calculating METEOR score */
  METEOR_SCORE: "azureai://built-in/evaluators/meteor_score",

  /** Evaluator for detecting protected material */
  PROTECTED_MATERIAL: "azureai://built-in/evaluators/protected_material",

  /** Evaluator for assessing retrieval quality */
  RETRIEVAL: "azureai://built-in/evaluators/retrieval",

  /** Evaluator for calculating ROUGE score */
  ROUGE_SCORE: "azureai://built-in/evaluators/rouge_score",

  /** Evaluator for detecting self-harm content */
  SELF_HARM: "azureai://built-in/evaluators/self_harm",

  /** Evaluator for detecting sexual content */
  SEXUAL: "azureai://built-in/evaluators/sexual",

  /** Evaluator for calculating similarity score */
  SIMILARITY_SCORE: "azureai://built-in/evaluators/similarity_score",

  // TASK_ADHERENCE: "azureai://built-in/evaluators/task_adherence", // Commented out as in original
  // TOOL_CALL_ACCURACY: "azureai://built-in/evaluators/tool_call_accuracy", // Commented out as in original

  /** Evaluator for detecting ungrounded attributes */
  UNGROUNDED_ATTRIBUTES: "azureai://built-in/evaluators/ungrounded_attributes",

  /** Evaluator for assessing response completeness */
  RESPONSE_COMPLETENESS: "azureai://built-in/evaluators/response_completeness",
} as const;

/**
 * Type for EvaluatorIds values
 */
export type EvaluatorId = (typeof EvaluatorIds)[keyof typeof EvaluatorIds];

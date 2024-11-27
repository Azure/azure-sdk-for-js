// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ErrorModel } from "@azure-rest/core-client";

/** Information about content filtering evaluated against generated model output. */
export interface ContentFilterResultsForChoiceOutput {
  /**
   * Describes language related to anatomical organs and genitals, romantic relationships,
   *  acts portrayed in erotic or affectionate terms, physical sexual acts, including
   *  those portrayed as an assault or a forced sexual violent act against one’s will,
   *  prostitution, pornography, and abuse.
   */
  sexual?: ContentFilterResultOutput;
  /**
   * Describes language related to physical actions intended to hurt, injure, damage, or
   * kill someone or something; describes weapons, etc.
   */
  violence?: ContentFilterResultOutput;
  /**
   * Describes language attacks or uses that include pejorative or discriminatory language
   * with reference to a person or identity group on the basis of certain differentiating
   * attributes of these groups including but not limited to race, ethnicity, nationality,
   * gender identity and expression, sexual orientation, religion, immigration status, ability
   * status, personal appearance, and body size.
   */
  hate?: ContentFilterResultOutput;
  /**
   * Describes language related to physical actions intended to purposely hurt, injure,
   * or damage one’s body, or kill oneself.
   */
  self_harm?: ContentFilterResultOutput;
  /** Describes whether profanity was detected. */
  profanity?: ContentFilterDetectionResultOutput;
  /**
   * Describes an error returned if the content filtering system is
   * down or otherwise unable to complete the operation in time.
   */
  error?: ErrorModel;
  /** Information about detection of protected text material. */
  protected_material_text?: ContentFilterDetectionResultOutput;
  /** Information about detection of protected code material. */
  protected_material_code?: ContentFilterCitedDetectionResultOutput;
}

/** Represents the outcome of a detection operation against protected resources as performed by content filtering. */
export interface ContentFilterCitedDetectionResultOutput {
  /** A value indicating whether or not the content has been filtered. */
  filtered: boolean;
  /** A value indicating whether detection occurred, irrespective of severity or whether the content was filtered. */
  detected: boolean;
  /** The internet location associated with the detection. */
  URL?: string;
  /** The license description associated with the detection. */
  license?: string;
}

/** Content filtering results for a single prompt in the request. */
export interface ContentFilterResultsForPromptOutput {
  /** The index of this prompt in the set of prompt results */
  prompt_index: number;
  /** Content filtering results for this prompt */
  content_filter_results: ContentFilterResultDetailsForPromptOutput;
}

/** Information about content filtering evaluated against input data to Azure OpenAI. */
export interface ContentFilterResultDetailsForPromptOutput {
  /**
   * Describes language related to anatomical organs and genitals, romantic relationships,
   *  acts portrayed in erotic or affectionate terms, physical sexual acts, including
   *  those portrayed as an assault or a forced sexual violent act against one’s will,
   *  prostitution, pornography, and abuse.
   */
  sexual?: ContentFilterResultOutput;
  /**
   * Describes language related to physical actions intended to hurt, injure, damage, or
   * kill someone or something; describes weapons, etc.
   */
  violence?: ContentFilterResultOutput;
  /**
   * Describes language attacks or uses that include pejorative or discriminatory language
   * with reference to a person or identity group on the basis of certain differentiating
   * attributes of these groups including but not limited to race, ethnicity, nationality,
   * gender identity and expression, sexual orientation, religion, immigration status, ability
   * status, personal appearance, and body size.
   */
  hate?: ContentFilterResultOutput;
  /**
   * Describes language related to physical actions intended to purposely hurt, injure,
   * or damage one’s body, or kill oneself.
   */
  self_harm?: ContentFilterResultOutput;
  /** Describes whether profanity was detected. */
  profanity?: ContentFilterDetectionResultOutput;
  /**
   * Describes an error returned if the content filtering system is
   * down or otherwise unable to complete the operation in time.
   */
  error?: ErrorModel;
  /** Whether a jailbreak attempt was detected in the prompt. */
  jailbreak?: ContentFilterDetectionResultOutput;
}

/** Information about filtered content severity level and if it has been filtered or not. */
export interface ContentFilterResultOutput {
  /**
   * Ratings for the intensity and risk level of filtered content.
   *
   * Possible values: "safe", "low", "medium", "high"
   */
  severity: string;
  /** A value indicating whether or not the content has been filtered. */
  filtered: boolean;
}

/** Represents the outcome of a detection operation performed by content filtering. */
export interface ContentFilterDetectionResultOutput {
  /** A value indicating whether or not the content has been filtered. */
  filtered: boolean;
  /** A value indicating whether detection occurred, irrespective of severity or whether the content was filtered. */
  detected: boolean;
}

/**
 * A representation of the additional context information available when Azure OpenAI chat extensions are involved
 * in the generation of a corresponding chat completions response. This context information is only populated when
 * using an Azure OpenAI request configured to use a matching extension.
 */
export interface AzureChatExtensionsMessageContextOutput {
  /**
   * The contextual information associated with the Azure chat extensions used for a chat completions request.
   * These messages describe the data source retrievals, plugin invocations, and other intermediate steps taken in the
   * course of generating a chat completions response that was augmented by capabilities from Azure OpenAI chat
   * extensions.
   */
  citations?: Array<AzureChatExtensionDataSourceResponseCitationOutput>;
  /** The detected intent from the chat history, used to pass to the next turn to carry over the context. */
  intent?: string;
}

/**
 * A single instance of additional context information available when Azure OpenAI chat extensions are involved
 * in the generation of a corresponding chat completions response. This context information is only populated when
 * using an Azure OpenAI request configured to use a matching extension.
 */
export interface AzureChatExtensionDataSourceResponseCitationOutput {
  /** The content of the citation. */
  content: string;
  /** The title of the citation. */
  title?: string;
  /** The URL of the citation. */
  url?: string;
  /** The file path of the citation. */
  filepath?: string;
  /** The chunk ID of the citation. */
  chunk_id?: string;
}

/** Describes the content filtering result for the image generation request. */
export interface ImageGenerationContentFilterResults {
  /**
   * Describes language related to anatomical organs and genitals, romantic relationships,
   * acts portrayed in erotic or affectionate terms, physical sexual acts, including
   * those portrayed as an assault or a forced sexual violent act against one’s will,
   * prostitution, pornography, and abuse.
   */
  sexual?: ContentFilterResultOutput;
  /**
   * Describes language related to physical actions intended to hurt, injure, damage, or
   * kill someone or something; describes weapons, etc.
   */
  violence?: ContentFilterResultOutput;
  /**
   * Describes language attacks or uses that include pejorative or discriminatory language
   * with reference to a person or identity group on the basis of certain differentiating
   * attributes of these groups including but not limited to race, ethnicity, nationality,
   * gender identity and expression, sexual orientation, religion, immigration status, ability
   * status, personal appearance, and body size.
   */
  hate?: ContentFilterResultOutput;
  /**
   * Describes language related to physical actions intended to purposely hurt, injure,
   * or damage one’s body, or kill oneself.
   */
  self_harm?: ContentFilterResultOutput;
}

/**
 * Describes the content filtering results for the prompt of a image generation request.
 */
export interface ImageGenerationPromptFilterResults {
  /**
   * Describes language related to anatomical organs and genitals, romantic relationships,
   * acts portrayed in erotic or affectionate terms, physical sexual acts, including
   * those portrayed as an assault or a forced sexual violent act against one’s will,
   * prostitution, pornography, and abuse.
   */
  sexual?: ContentFilterResultOutput;
  /**
   * Describes language related to physical actions intended to hurt, injure, damage, or
   * kill someone or something; describes weapons, etc.
   */
  violence?: ContentFilterResultOutput;
  /**
   * Describes language attacks or uses that include pejorative or discriminatory language
   * with reference to a person or identity group on the basis of certain differentiating
   * attributes of these groups including but not limited to race, ethnicity, nationality,
   * gender identity and expression, sexual orientation, religion, immigration status, ability
   * status, personal appearance, and body size.
   */
  hate?: ContentFilterResultOutput;
  /**
   * Describes language related to physical actions intended to purposely hurt, injure,
   * or damage one’s body, or kill oneself.
   */
  self_harm?: ContentFilterResultOutput;
  /** Describes whether profanity was detected. */
  profanity?: ContentFilterDetectionResultOutput;
  /** Whether a jailbreak attempt was detected in the prompt. */
  jailbreak?: ContentFilterDetectionResultOutput;
}

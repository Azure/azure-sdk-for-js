// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  /** Describes detection results against configured custom blocklists. */
  custom_blocklists?: ContentFilterDetailedResults;
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

/** Represents a structured collection of result details for content filtering. */
export interface ContentFilterDetailedResults {
  /** A value indicating whether or not the content has been filtered. */
  filtered: boolean;

  /** The collection of detailed blocklist result information. */
  details: ContentFilterBlocklistIdResultOutput[];
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

/**
 * Represents the output results of Azure enhancements to chat completions, as configured via the matching input provided
 * in the request.
 */
export interface AzureChatEnhancementsOutput {
  /** The grounding enhancement that returns the bounding box of the objects detected in the image. */
  grounding?: AzureGroundingEnhancementOutput;
}

/** The grounding enhancement that returns the bounding box of the objects detected in the image. */
export interface AzureGroundingEnhancementOutput {
  /** The lines of text detected by the grounding enhancement. */
  lines: Array<AzureGroundingEnhancementLineOutput>;
}

/** A content line object consisting of an adjacent sequence of content elements, such as words and selection marks. */
export interface AzureGroundingEnhancementLineOutput {
  /** The text within the line. */
  text: string;
  /** An array of spans that represent detected objects and its bounding box information. */
  spans: Array<AzureGroundingEnhancementLineSpanOutput>;
}

/** A span object that represents a detected object and its bounding box information. */
export interface AzureGroundingEnhancementLineSpanOutput {
  /** The text content of the span that represents the detected object. */
  text: string;
  /**
   * The character offset within the text where the span begins. This offset is defined as the position of the first
   * character of the span, counting from the start of the text as Unicode codepoints.
   */
  offset: number;
  /** The length of the span in characters, measured in Unicode codepoints. */
  length: number;
  /** An array of objects representing points in the polygon that encloses the detected object. */
  polygon: Array<AzureGroundingEnhancementCoordinatePointOutput>;
}

/** A representation of a single polygon point as used by the Azure grounding enhancement. */
export interface AzureGroundingEnhancementCoordinatePointOutput {
  /** The x-coordinate (horizontal axis) of the point. */
  x: number;
  /** The y-coordinate (vertical axis) of the point. */
  y: number;
}

/** An abstract representation of structured information about why a chat completions response terminated. */
export interface ChatFinishDetailsOutputParent {
  /** The object type. */
  type: string;
}

/** A structured representation of a stop reason that signifies natural termination by the model. */
export interface StopFinishDetailsOutput extends ChatFinishDetailsOutputParent {
  /** The object type, which is always 'stop' for this object. */
  type: "stop";
  /** The token sequence that the model terminated with. */
  stop: string;
}

/**
 * A structured representation of a stop reason that signifies a token limit was reached before the model could naturally
 * complete.
 */
export interface MaxTokensFinishDetailsOutput extends ChatFinishDetailsOutputParent {
  /** The object type, which is always 'max_tokens' for this object. */
  type: "max_tokens";
}

/**
 *   A representation of the additional context information available when Azure OpenAI chat extensions are involved
 *   in the generation of a corresponding chat completions response. This context information is only populated when
 *   using an Azure OpenAI request configured to use a matching extension.
 */
export interface AzureChatExtensionsMessageContextOutput {
  /**
   *   The contextual information associated with the Azure chat extensions used for a chat completions request.
   *   These messages describe the data source retrievals, plugin invocations, and other intermediate steps taken in the
   *   course of generating a chat completions response that was augmented by capabilities from Azure OpenAI chat
   *   extensions.
   */
  citations?: Array<AzureChatExtensionDataSourceResponseCitationOutput>;
  /** The detected intent from the chat history, used to pass to the next turn to carry over the context. */
  intent?: string;
}

/**
 *   A representation of the additional context information available when Azure OpenAI chat extensions are involved
 *   in the generation of a corresponding chat completions response. This context information is only populated when
 *   using an Azure OpenAI request configured to use a matching extension.
 */
export interface AzureChatExtensionsMessageContextOutput {
  /**
   *   The contextual information associated with the Azure chat extensions used for a chat completions request.
   *   These messages describe the data source retrievals, plugin invocations, and other intermediate steps taken in the
   *   course of generating a chat completions response that was augmented by capabilities from Azure OpenAI chat
   *   extensions.
   */
  citations?: Array<AzureChatExtensionDataSourceResponseCitationOutput>;
  /** The detected intent from the chat history, used to pass to the next turn to carry over the context. */
  intent?: string;
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
  /** Describes detection results against configured custom blocklists. */
  custom_blocklists?: ContentFilterDetailedResults;
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

/** Represents the outcome of an evaluation against a custom blocklist as performed by content filtering. */
export interface ContentFilterBlocklistIdResultOutput {
  /** The ID of the custom blocklist evaluated. */
  id: string;
  /** A value indicating whether or not the content has been filtered. */
  filtered: boolean;
}

/** A representation of a single polygon point as used by the Azure grounding enhancement. */
export interface AzureGroundingEnhancementCoordinatePointOutput {
  /** The x-coordinate (horizontal axis) of the point. */
  x: number;
  /** The y-coordinate (vertical axis) of the point. */
  y: number;
}

/** A content line object consisting of an adjacent sequence of content elements, such as words and selection marks. */
export interface AzureGroundingEnhancementLineOutput {
  /** The text within the line. */
  text: string;
  /** An array of spans that represent detected objects and its bounding box information. */
  spans: Array<AzureGroundingEnhancementLineSpanOutput>;
}

/** A span object that represents a detected object and its bounding box information. */
export interface AzureGroundingEnhancementLineSpanOutput {
  /** The text content of the span that represents the detected object. */
  text: string;
  /**
   * The character offset within the text where the span begins. This offset is defined as the position of the first
   * character of the span, counting from the start of the text as Unicode codepoints.
   */
  offset: number;
  /** The length of the span in characters, measured in Unicode codepoints. */
  length: number;
  /** An array of objects representing points in the polygon that encloses the detected object. */
  polygon: Array<AzureGroundingEnhancementCoordinatePointOutput>;
}

/** The grounding enhancement that returns the bounding box of the objects detected in the image. */
export interface AzureGroundingEnhancementOutput {
  /** The lines of text detected by the grounding enhancement. */
  lines: Array<AzureGroundingEnhancementLineOutput>;
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

/** An abstract representation of structured information about why a chat completions response terminated. */
export type ChatFinishDetailsOutput =
  | ChatFinishDetailsOutputParent
  | StopFinishDetailsOutput
  | MaxTokensFinishDetailsOutput;

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Disable eslint for declaration merging using namespace
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-namespace */

import type {
  Completion,
  CompletionCreateParamsNonStreaming,
  CompletionCreateParamsStreaming,
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionCreateParamsStreaming,
  ChatCompletion,
  ChatCompletionChunk,
  ChatCompletionMessage,
} from "openai/resources/index";
import type {
  ContentFilterResultsForPromptOutput,
  ContentFilterResultsForChoiceOutput,
  AzureChatEnhancementsOutput,
  AzureChatExtensionsMessageContextOutput,
  ImageGenerationPromptFilterResults,
  ImageGenerationContentFilterResults,
} from "./outputModels.js";
import type {
  AzureChatExtensionConfiguration,
  AzureChatEnhancementConfiguration,
} from "./models.js";

declare module "openai/resources/index" {
  interface Completion {
    /**
     * Content filtering results for zero or more prompts in the request. In a streaming request,
     * results for different prompts may arrive at different times or in different orders.
     */
    prompt_filter_results?: Array<ContentFilterResultsForPromptOutput>;
  }

  interface ChatCompletionCreateParamsNonStreaming {
    /**
     *   The configuration entries for Azure OpenAI chat extensions that use them.
     *   This additional specification is only compatible with Azure OpenAI.
     */
    data_sources?: Array<AzureChatExtensionConfiguration>;
    /** If provided, the configuration options for available Azure OpenAI chat enhancements. */
    enhancements?: AzureChatEnhancementConfiguration;
  }

  interface ChatCompletionCreateParamsStreaming {
    /**
     *   The configuration entries for Azure OpenAI chat extensions that use them.
     *   This additional specification is only compatible with Azure OpenAI.
     */
    data_sources?: Array<AzureChatExtensionConfiguration>;
    /** If provided, the configuration options for available Azure OpenAI chat enhancements. */
    enhancements?: AzureChatEnhancementConfiguration;
  }

  interface ChatCompletion {
    /**
     * Content filtering results for zero or more prompts in the request. In a streaming request,
     * results for different prompts may arrive at different times or in different orders.
     */
    prompt_filter_results?: Array<ContentFilterResultsForPromptOutput>;
  }

  interface ChatCompletionMessage {
    /**
     * If Azure OpenAI chat extensions are configured, this array represents the incremental steps performed by those
     * extensions while processing the chat completions request.
     */
    context?: AzureChatExtensionsMessageContextOutput;
  }

  interface CompletionChoice {
    /**
     * Information about the content filtering category (hate, sexual, violence, self_harm), if it
     * has been detected, as well as the severity level (very_low, low, medium, high-scale that
     * determines the intensity and risk level of harmful content) and if it has been filtered or not.
     */
    content_filter_results?: ContentFilterResultsForChoiceOutput;
  }

  namespace ChatCompletion {
    interface Choice {
      /**
       * Information about the content filtering category (hate, sexual, violence, self_harm), if it
       * has been detected, as well as the severity level (very_low, low, medium, high-scale that
       * determines the intensity and risk level of harmful content) and if it has been filtered or not.
       */
      content_filter_results?: ContentFilterResultsForChoiceOutput;
      /**
       * Represents the output results of Azure OpenAI enhancements to chat completions, as configured via the matching input
       * provided in the request. This supplementary information is only available when using Azure OpenAI and only when the
       * request is configured to use enhancements.
       */
      enhancements?: AzureChatEnhancementsOutput;
    }
  }

  interface ChatCompletionChunk {
    /**
     * Content filtering results for zero or more prompts in the request. In a streaming request,
     * results for different prompts may arrive at different times or in different orders.
     */
    prompt_filter_results?: Array<ContentFilterResultsForPromptOutput>;
  }

  namespace ChatCompletionChunk {
    interface Choice {
      /**
       * Information about the content filtering category (hate, sexual, violence, self_harm), if it
       * has been detected, as well as the severity level (very_low, low, medium, high-scale that
       * determines the intensity and risk level of harmful content) and if it has been filtered or not.
       */
      content_filter_results?: ContentFilterResultsForChoiceOutput;
      /**
       * Represents the output results of Azure OpenAI enhancements to chat completions, as configured via the matching input
       * provided in the request. This supplementary information is only available when using Azure OpenAI and only when the
       * request is configured to use enhancements.
       */
      enhancements?: AzureChatEnhancementsOutput;
    }

    namespace Choice {
      /**
       * A chat completion delta generated by streamed model responses.
       */
      interface Delta {
        /**
         * If Azure OpenAI chat extensions are configured, this array represents the incremental steps performed by those
         * extensions while processing the chat completions request.
         */
        context?: AzureChatExtensionsMessageContextOutput;
      }
    }
  }

  interface ImagesResponse {
    /**
     * Information about the content filtering category (hate, sexual, violence, self_harm), if
     * it has been detected, as well as the severity level (very_low, low, medium, high-scale
     * that determines the intensity and risk level of harmful content) and if it has been
     * filtered or not. Information about jailbreak content and profanity, if it has been detected,
     * and if it has been filtered or not. And information about customer block list, if it has
     * been filtered and its id.
     */
    content_filter_results?: ImageGenerationContentFilterResults;
    /**
     * Information about the content filtering category (hate, sexual, violence, self_harm), if
     * it has been detected, as well as the severity level (very_low, low, medium, high-scale
     * that determines the intensity and risk level of harmful content) and if it has been
     * filtered or not. Information about jailbreak content and profanity, if it has been detected,
     * and if it has been filtered or not. And information about customer block list, if it has
     * been filtered and its id.
     */
    prompt_filter_results?: ImageGenerationPromptFilterResults;
  }
}

export {
  Completion,
  CompletionCreateParamsNonStreaming,
  CompletionCreateParamsStreaming,
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionCreateParamsStreaming,
  ChatCompletion,
  ChatCompletionChunk,
  ChatCompletionMessage,
};
export * from "./outputModels.js";
export * from "./models.js";

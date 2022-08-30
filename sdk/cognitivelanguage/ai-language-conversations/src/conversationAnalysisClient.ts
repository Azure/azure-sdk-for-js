/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  ConversationAnalysisClientOptionalParams,
  AnalyzeConversationTaskUnion,
  AnalyzeConversationOptionalParams,
  AnalyzeConversationResponse,
  AnalyzeConversationJobsInput,
  ConversationAnalysisOptionalParams,
  ConversationAnalysisResponse
} from "./generated/models";
import { conversationAnalysisAzureKeyCredentialPolicy } from "./azureKeyCredentialPolicy";
import { DEFAULT_COGNITIVE_SCOPE, SDK_VERSION } from "./constants";
import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import { ConversationAnalysisClient as GeneratedClient } from "./generated";
import { createTracingClient, TracingClient } from "@azure/core-tracing";

export class ConversationAnalysisClient {
  private readonly _client: GeneratedClient;
  private readonly _tracing: TracingClient;

  /**
   * Initializes a new instance of the ConversationAnalysisClient class.
   * @param endpoint Supported Cognitive Services endpoint (e.g.,
   *                 https://<resource-name>.api.cognitiveservices.azure.com).
   * @param options The parameter options
   */
   constructor(
    endpoint: string,
    credential: TokenCredential | KeyCredential,
    options: ConversationAnalysisClientOptionalParams = {}
  ) {

    this._client = new GeneratedClient(endpoint, options);

    this._tracing = createTracingClient({
      packageName: "@azure/ai-language-conversations",
      packageVersion: SDK_VERSION,
      namespace: "Microsoft.CognitiveServices",
    });

    const authPolicy = isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy({ credential, scopes: DEFAULT_COGNITIVE_SCOPE })
      : conversationAnalysisAzureKeyCredentialPolicy(credential);

    this._client.pipeline.addPolicy(authPolicy);
  }

  /**
   * Analyzes the input conversation utterance.
   * @param task A single conversational task to execute.
   * @param options The options parameters.
   */
  analyzeConversation(
    task: AnalyzeConversationTaskUnion,
    options?: AnalyzeConversationOptionalParams
  ): Promise<AnalyzeConversationResponse> {
    return this._tracing.withSpan("ConversationAnalysisClient.analyzeConversation", options || {}, (updatedOptions) => this._client.analyzeConversation(task, updatedOptions));
  }

  /**
   * Submit a collection of conversations for analysis. Specify one or more unique tasks to be executed.
   * @param task The collection of conversations to analyze and one or more tasks to execute.
   * @param options The options parameters.
   */
  async beginConversationAnalysis(
    task: AnalyzeConversationJobsInput,
    options?: ConversationAnalysisOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<ConversationAnalysisResponse>,
      ConversationAnalysisResponse
    >
  > {
    return this._tracing.withSpan("ConversationAnalysisClient.beginConversationAnalysis", options || {}, (updatedOptions) => this._client.beginConversationAnalysis(task, updatedOptions));
  }

  /**
   * Submit a collection of conversations for analysis. Specify one or more unique tasks to be executed.
   * @param task The collection of conversations to analyze and one or more tasks to execute.
   * @param options The options parameters.
   */
  async beginConversationAnalysisAndWait(
    task: AnalyzeConversationJobsInput,
    options?: ConversationAnalysisOptionalParams
  ): Promise<ConversationAnalysisResponse> {
    return this._tracing.withSpan("ConversationAnalysisClient.beginConversationAnalysisAndWait", options || {}, (updatedOptions) => this._client.beginConversationAnalysisAndWait(task, updatedOptions));
  }
}
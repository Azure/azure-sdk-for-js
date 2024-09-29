// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import {
  AnalyzeConversationJobsInput,
  AnalyzeConversationOptionalParams,
  AnalyzeConversationResponse,
  AnalyzeConversationTaskUnion,
  ConversationAnalysisClientOptionalParams,
  ConversationAnalysisOptionalParams,
  ConversationAnalysisResponse,
} from "./models";
import { DEFAULT_COGNITIVE_SCOPE, SDK_VERSION } from "./constants";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { PollOperationState, PollerLike } from "@azure/core-lro";
import { TracingClient, createTracingClient } from "@azure/core-tracing";
import { ConversationAnalysisClient as GeneratedClient } from "./generated";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { conversationAnalysisAzureKeyCredentialPolicy } from "./azureKeyCredentialPolicy";

/**
 * A client for interacting with the conversational language understanding
 * features in Azure Cognitive Language Service.
 *
 * The client needs the endpoint of a Language resource and an authentication
 * method such as an API key or AAD. The API key and endpoint can be found in
 * the Language resource page in the Azure portal. They will be located in the
 * resource's Keys and Endpoint page, under Resource Management.
 *
 * ### Examples for authentication:
 *
 * #### API Key
 *
 * ```js
 * import { AzureKeyCredential } from "@azure/core-auth";
 * import { ConversationAnalysisClient } from "@azure/ai-language-conversations";
 *
 * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
 * const credential = new AzureKeyCredential("<api key>");
 *
 * const client = new ConversationAnalysisClient(endpoint, credential);
 * ```
 *
 * #### Azure Active Directory
 *
 * See the [`@azure/identity`](https://npmjs.com/package/\@azure/identity)
 * package for more information about authenticating with Azure Active Directory.
 *
 * ```js
 * import { ConversationAnalysisClient } from "@azure/ai-language-conversations";
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const endpoint = "https://<resource name>.cognitiveservices.azure.com";
 * const credential = new DefaultAzureCredential();
 *
 * const client = new ConversationAnalysisClient(endpoint, credential);
 * ```
 */
export class ConversationAnalysisClient {
  private readonly _client: GeneratedClient;
  private readonly _tracing: TracingClient;

  /**
   * Initializes a new instance of the ConversationAnalysisClient class.
   * @param endpoint - Supported Cognitive Services endpoint (e.g.,
   *                 https://<resource-name>.api.cognitiveservices.azure.com).
   * @param options - The parameter options
   */
  constructor(
    endpoint: string,
    credential: TokenCredential | KeyCredential,
    options: ConversationAnalysisClientOptionalParams = {},
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
   * @param task - A single conversational task to execute.
   * @param options - The options parameters.
   */
  analyzeConversation(
    task: AnalyzeConversationTaskUnion,
    options?: AnalyzeConversationOptionalParams,
  ): Promise<AnalyzeConversationResponse> {
    return this._tracing.withSpan(
      "ConversationAnalysisClient.analyzeConversation",
      options || {},
      (updatedOptions) =>
        this._client.analyzeConversation(
          task,
          updatedOptions,
        ) as Promise<AnalyzeConversationResponse>,
    );
  }

  /**
   * Submit a collection of conversations for analysis. Specify one or more unique tasks to be executed.
   * @param task - The collection of conversations to analyze and one or more tasks to execute.
   * @param options - The options parameters.
   */
  async beginConversationAnalysis(
    task: AnalyzeConversationJobsInput,
    options?: ConversationAnalysisOptionalParams,
  ): Promise<
    PollerLike<PollOperationState<ConversationAnalysisResponse>, ConversationAnalysisResponse>
  > {
    return this._tracing.withSpan(
      "ConversationAnalysisClient.beginConversationAnalysis",
      options || {},
      (updatedOptions) =>
        this._client.beginConversationAnalysis(task, updatedOptions) as Promise<
          PollerLike<PollOperationState<ConversationAnalysisResponse>, ConversationAnalysisResponse>
        >,
    );
  }
}

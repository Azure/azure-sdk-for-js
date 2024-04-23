// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential, isTokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import { AssistantsClientOptions } from "../generated/src/index.js";
import { AssistantsContext } from "../generated/src/rest/index.js";
import { createAssistants } from "../generated/src/api/AssistantsContext.js";
import { nonAzurePolicy } from "./api/policies/nonAzure.js";

function createOpenAIEndpoint(version: number): string {
  return `https://api.openai.com/v${version}`;
}

function isCred(cred: Record<string, any>): cred is TokenCredential | KeyCredential {
  return isTokenCredential(cred) || cred.key !== undefined;
}

/**
 * A client for interacting with Azure OpenAI.
 *
 * The client needs the endpoint of an OpenAI resource and an authentication
 * method such as an API key or token. The API key and endpoint can be found in
 * the OpenAI resource page. They will be located in the resource's Keys and Endpoint page.
 *
 * ### Examples for authentication:
 *
 * #### API Key
 *
 * ```js
 * import { AssistantsClient } from "@azure/openai-assistants";
 * import { AzureKeyCredential } from "@azure/core-auth";
 *
 * const endpoint = "<azure endpoint>";
 * const credential = new AzureKeyCredential("<api key>");
 *
 * const client = new AssistantsClient(endpoint, credential);
 * ```
 *
 * #### Azure Active Directory
 *
 * ```js
 * import { AssistantsClient } from "@azure/openai";
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const endpoint = "<azure endpoint>";
 * const credential = new DefaultAzureCredential();
 *
 * const client = new AssistantsClient(endpoint, credential);
 * ```
 */
export class AssistantsClient {
  private _client: AssistantsContext;
  private _isAzure = false;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /**
   * Initializes an instance of AssistantsClient for use with an OpenAI resource.
   * @param endpoint - The URI for an Azure OpenAI resource, including protocol and hostname.
   *                 For example: https://my-resource.openai.azure.com.
   * @param credential - A key credential used to authenticate to an Azure OpenAI resource.
   * @param options - The options for configuring the client.
   * @remarks
   *   This constructor initializes an AssistantsClient object that can only be used with Azure OpenAI resources.
   *   To use AssistantsClient with a non-Azure OpenAI inference endpoint, use a constructor that accepts a non-Azure OpenAI API key instead.
   */
  constructor(endpoint: string, credential: KeyCredential, options?: AssistantsClientOptions);
  /**
   * Initializes an instance of AssistantsClient for use with an Azure OpenAI resource.
   * @param endpoint - The URI for an Azure OpenAI resource, including protocol and hostname.
   *                 For example: https://my-resource.openai.azure.com.
   * @param credential - A token credential used to authenticate with an Azure OpenAI resource.
   * @param options - The options for configuring the client.
   */
  constructor(endpoint: string, credential: TokenCredential, options?: AssistantsClientOptions);
  /**
   * Initializes an instance of AssistantsClient for use with the non-Azure OpenAI endpoint.
   * @param openAiApiKey - The API key to use when connecting to the non-Azure OpenAI endpoint.
   * @param options - The options for configuring the client.
   * @remarks
   *   AssistantsClient objects initialized with this constructor can only be used with the non-Azure OpenAI inference endpoint.
   *   To use AssistantsClient with an Azure OpenAI resource, use a constructor that accepts a resource URI and Azure authentication credential instead.
   */
  constructor(openAiApiKey: KeyCredential, options?: AssistantsClientOptions);
  constructor(
    endpointOrOpenAiKey: string | KeyCredential,
    credOrOptions: KeyCredential | TokenCredential | AssistantsClientOptions = {},
    options: AssistantsClientOptions = {},
  ) {
    let opts: AssistantsClientOptions;
    let endpoint: string;
    let cred: KeyCredential | TokenCredential;
    if (isCred(credOrOptions)) {
      endpoint = endpointOrOpenAiKey as string;
      cred = credOrOptions;
      opts = options;
      this._isAzure = true;
    } else {
      endpoint = createOpenAIEndpoint(1);
      cred = endpointOrOpenAiKey as KeyCredential;
      const { credentials, ...restOpts } = credOrOptions;
      opts = {
        baseUrl: endpoint,
        credentials: {
          apiKeyHeaderName: credentials?.apiKeyHeaderName ?? "Authorization",
          scopes: credentials?.scopes,
        },
        ...restOpts,
      };
    }
    this._client = createAssistants(endpoint, cred, {
      ...opts,
      ...(this._isAzure
        ? {}
        : {
            additionalPolicies: [
              ...(opts.additionalPolicies ?? []),
              {
                position: "perCall",
                policy: nonAzurePolicy(),
              },
            ],
          }),
    });
    this.pipeline = this._client.pipeline;
  }
}

/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import * as coreClient from "@azure/core-client";
import {
  bearerTokenAuthenticationPolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest
} from "@azure/core-rest-pipeline";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "./generated/lroImpl";
import * as Parameters from "./generated/models/parameters";
import * as Mappers from "./generated/models/mappers";
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
import { DEFAULT_COGNITIVE_SCOPE } from "./constants";
import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";

/** @internal */
export class ConversationAnalysisClient extends coreClient.ServiceClient {
  endpoint: string;
  apiVersion: string;

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
    if (endpoint === undefined) {
      throw new Error("'endpoint' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: ConversationAnalysisClientOptionalParams = {
      requestContentType: "application/json; charset=utf-8"
    };

    const packageDetails = `azsdk-js-ai-language-conversations/1.0.0-beta.1`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix
      },
      baseUri: options.endpoint ?? options.baseUri ?? "{Endpoint}/language"
    };
    super(optionsWithDefaults);

    const authPolicy = isTokenCredential(credential)
      ? bearerTokenAuthenticationPolicy({ credential, scopes: DEFAULT_COGNITIVE_SCOPE })
      : conversationAnalysisAzureKeyCredentialPolicy(credential);

    this.pipeline.addPolicy(authPolicy);


    // Parameter assignments
    this.endpoint = endpoint;

    // Assigning values to Constant parameters
    this.apiVersion = options.apiVersion || "2022-05-15-preview";
    this.addCustomApiVersionPolicy(options.apiVersion);
  }

  /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
  private addCustomApiVersionPolicy(apiVersion?: string) {
    if (!apiVersion) {
      return;
    }
    const apiVersionPolicy = {
      name: "CustomApiVersionPolicy",
      async sendRequest(
        request: PipelineRequest,
        next: SendRequest
      ): Promise<PipelineResponse> {
        const param = request.url.split("?");
        if (param.length > 1) {
          const newParams = param[1].split("&").map((item) => {
            if (item.indexOf("api-version") > -1) {
              return "api-version=" + apiVersion;
            } else {
              return item;
            }
          });
          request.url = param[0] + "?" + newParams.join("&");
        }
        return next(request);
      }
    };
    this.pipeline.addPolicy(apiVersionPolicy);
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
    return this.sendOperationRequest(
      { task, options },
      analyzeConversationOperationSpec
    );
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
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<ConversationAnalysisResponse> => {
      return this.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { task, options },
      conversationAnalysisOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
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
    const poller = await this.beginConversationAnalysis(task, options);
    return poller.pollUntilDone();
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const analyzeConversationOperationSpec: coreClient.OperationSpec = {
  path: "/:analyze-conversations",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AnalyzeConversationTaskResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
      headersMapper:
        Mappers.ConversationAnalysisClientAnalyzeConversationExceptionHeaders
    }
  },
  requestBody: Parameters.task,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const conversationAnalysisOperationSpec: coreClient.OperationSpec = {
  path: "/analyze-conversations/jobs",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AnalyzeConversationJobState
    },
    201: {
      bodyMapper: Mappers.AnalyzeConversationJobState
    },
    202: {
      bodyMapper: Mappers.AnalyzeConversationJobState
    },
    204: {
      bodyMapper: Mappers.AnalyzeConversationJobState
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.task1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};

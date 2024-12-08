// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import type { TokenCredential, KeyCredential } from "@azure/core-auth";
import type { DocumentIntelligenceClient } from "./clientDefinitions.js";
import { RestError } from "@azure/core-rest-pipeline";
import { streamToUint8Array } from "./utils.js";

/** The optional parameters for the client */
export interface DocumentIntelligenceClientOptions extends ClientOptions {
  /** The api version option of the client */
  apiVersion?: string;
}

/**
 * Initialize a new instance of `DocumentIntelligenceClient`
 * @param endpointParam - The Document Intelligence service endpoint.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  credentials: TokenCredential | KeyCredential,
  { apiVersion = "2024-07-31-preview", ...options }: DocumentIntelligenceClientOptions = {},
): DocumentIntelligenceClient {
  const endpointUrl =
    options.endpoint ?? options.baseUrl ?? `${endpointParam}/documentintelligence`;
  const userAgentInfo = `azsdk-js-ai-document-intelligence-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
    loggingOptions: {
      logger: options.loggingOptions?.logger ?? logger.info,
    },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://cognitiveservices.azure.com/.default"],
      apiKeyHeaderName: options.credentials?.apiKeyHeaderName ?? "Ocp-Apim-Subscription-Key",
    },
  };
  const client = getClient(endpointUrl, credentials, options) as DocumentIntelligenceClient;

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  client.pipeline.addPolicy({
    name: "ClientApiVersionPolicy",
    sendRequest: (req, next) => {
      // Use the apiVersion defined in request url directly
      // Append one if there is no apiVersion and we have one at client options
      const url = new URL(req.url);
      if (!url.searchParams.get("api-version") && apiVersion) {
        req.url = `${req.url}${Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"
          }api-version=${apiVersion}`;
      }

      return next(req);
    },
  });

  client.pipeline.addPolicy({
    name: "ResponseStreamToUint8ArrayPolicy",
    sendRequest: async (req, next) => {
      logger.info("ResponseStreamToUint8ArrayPolicy starts");

      const figuresUrlPattern = /\/documentModels\/[^/]+\/analyzeResults\/[^/]+\/figures\/[^/]+/;
      if (req.method === "GET" && figuresUrlPattern.test(req.url)) {
        logger.info(`Matched URL pattern for figures: ${req.url}`);
        req.streamResponseStatusCodes = new Set([200]);
        logger.info("Set streamResponseStatusCodes to 200 for the figures API");
      };

      const response = await next(req);

      if (req.method === "GET" && figuresUrlPattern.test(req.url)) {
        logger.info(`Handling response for figures URL: ${req.url}`);
        if (!response.readableStreamBody) {
          logger.error("Expected response to have a readable stream but found none");
          throw new RestError("Expected response to have a readable stream", {
            code: RestError.PARSE_ERROR,
          });
        }
        logger.info("Converting readable stream to Uint8Array");
        // Casting Uint8Array as NodeJS.ReadableStream so that the users can directly consume Uint8Array response body
        response.readableStreamBody = await streamToUint8Array(response.readableStreamBody) as unknown as NodeJS.ReadableStream;
        logger.info("ResponseStreamToUint8ArrayPolicy ends");
      };

      return response;
    },
  });

  return client;
}

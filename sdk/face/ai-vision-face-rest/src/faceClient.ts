// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { FaceClient } from "./clientDefinitions.js";
import { Versions } from "./models.js";

export interface FaceClientOptions extends ClientOptions {
  apiVersion?: Versions;
}

/**
 * Initialize a new instance of `FaceClient`
 * @param endpointParam - Supported Cognitive Services endpoints (protocol and hostname, for example:
 * https://{resource-name}.cognitiveservices.azure.com).
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  credentials: TokenCredential | KeyCredential,
  options: FaceClientOptions = {},
): FaceClient {
  const apiVersion = options.apiVersion ?? "v1.1-preview.1";
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `${endpointParam}/face/${apiVersion}`;

  const userAgentInfo = `azsdk-js-ai-vision-face-rest/1.0.0-beta.1`;
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

  const client = getClient(endpointUrl, credentials, options) as FaceClient;

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });

  client.pipeline.addPolicy({
    name: "VerifyImageFilenamePolicy",
    sendRequest: (request, next) => {
      for (const part of request.multipartBody?.parts ?? []) {
        const contentDisposition = part.headers.get("content-disposition");
        if (
          contentDisposition &&
          contentDisposition.includes(`name="VerifyImage"`) &&
          !contentDisposition.includes("filename=")
        ) {
          part.headers.set("content-disposition", `form-data; name="VerifyImage"; filename="blob"`);
        }
      }
      return next(request);
    },
  });

  return client;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { KnownServiceApiVersions } from "../models/models.js";
import type { Client, ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { KeyCredential } from "@azure/core-auth";

export interface TranscriptionContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownServiceApiVersions} that the service accepts. */
  apiVersion: string;
}

/** Optional parameters for the client. */
export interface TranscriptionClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownServiceApiVersions} that the service accepts. */
  apiVersion?: string;
}

export function createTranscription(
  endpoint: string,
  credential: KeyCredential,
  options: TranscriptionClientOptionalParams = {},
): TranscriptionContext {
  const endpointUrl = options.endpoint ?? `${endpoint}/speechtotext`;
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-azure-ai-speech-transcription/1.0.0-beta.1`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      apiKeyHeaderName: options.credentials?.apiKeyHeaderName ?? "Ocp-Apim-Subscription-Key",
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  const apiVersion = options.apiVersion ?? "2025-10-15";
  clientContext.pipeline.addPolicy({
    name: "ClientApiVersionPolicy",
    sendRequest: (req, next) => {
      // Use the apiVersion defined in request url directly
      // Append one if there is no apiVersion and we have one at client options
      const url = new URL(req.url);
      if (!url.searchParams.get("api-version")) {
        req.url = `${req.url}${
          Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"
        }api-version=${apiVersion}`;
      }

      return next(req);
    },
  });
  return { ...clientContext, apiVersion } as TranscriptionContext;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../../logger.js";
import { KnownVersions } from "../../models/models.js";
import type { Client, ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";

/** Client for the Azure AI Document Translation service, used to translate batches of documents stored in Azure Blob Storage. */
export interface DocumentTranslationContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface DocumentTranslationClientOptionalParams extends ClientOptions {
  /** The service API version to use for this operation. */
  serviceVersion?: `${KnownVersions}`;
}

/** Client for the Azure AI Document Translation service, used to translate batches of documents stored in Azure Blob Storage. */
export function createDocumentTranslation(
  endpointParam: string,
  credential: KeyCredential | TokenCredential,
  options: DocumentTranslationClientOptionalParams = {},
): DocumentTranslationContext {
  const endpointUrl = options.endpoint ?? `${endpointParam}/translator`;
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-ai-translation-document/1.0.1`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} ${userAgentInfo}`
    : `${userAgentInfo}`;
  const { serviceVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://cognitiveservices.azure.com/.default"],
      apiKeyHeaderName: options.credentials?.apiKeyHeaderName ?? "Ocp-Apim-Subscription-Key",
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const apiVersion = options.serviceVersion;
  return { ...clientContext, apiVersion } as DocumentTranslationContext;
}

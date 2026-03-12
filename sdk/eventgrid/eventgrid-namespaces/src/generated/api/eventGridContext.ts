// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { KnownServiceApiVersions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import {
  KeyCredential,
  isKeyCredential,
  TokenCredential,
} from "@azure/core-auth";

/** Azure Messaging EventGrid Client */
export interface EventGridContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownServiceApiVersions} that the service accepts. */
  apiVersion: string;
}

/** Optional parameters for the client. */
export interface EventGridClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownServiceApiVersions} that the service accepts. */
  apiVersion?: string;
}

/** Azure Messaging EventGrid Client */
export function createEventGrid(
  endpointParam: string,
  credential: KeyCredential | TokenCredential,
  options: EventGridClientOptionalParams = {},
): EventGridContext {
  const endpointUrl =
    options.endpoint ?? options.baseUrl ?? String(endpointParam);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-eventgrid-namespaces/1.0.1`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? [
        "https://eventgrid.azure.net/.default",
      ],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);

  if (isKeyCredential(credential)) {
    clientContext.pipeline.addPolicy({
      name: "customKeyCredentialPolicy",
      sendRequest(request, next) {
        request.headers.set(
          "Authorization",
          "SharedAccessKey " + credential.key,
        );
        return next(request);
      },
    });
  }
  clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  const apiVersion = options.apiVersion ?? "2024-06-01";
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
  return { ...clientContext, apiVersion } as EventGridContext;
}

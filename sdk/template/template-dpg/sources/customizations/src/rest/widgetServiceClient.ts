// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientOptions, addCredentialPipelinePolicy } from "@azure-rest/core-client";
import { WidgetServiceContext } from "../../../generated/src/rest/clientDefinitions.js";
import _createClient from "../../../generated/src/rest/widgetServiceClient.js";
import { TokenCredential, isTokenCredential } from "@azure/core-auth";

/**
 * This customization adds credential support to the client. And overloads for when it is optional
 */
export default function createClient(
  endpoint: string,
  credential: TokenCredential,
  options?: ClientOptions,
): WidgetServiceContext;

export default function createClient(
  endpoint: string,
  options?: ClientOptions,
): WidgetServiceContext;

export default function createClient(
  endpoint: string,
  credentialOrOptions?: TokenCredential | ClientOptions,
  options: ClientOptions = {},
): WidgetServiceContext {
  let credential: TokenCredential | undefined;
  if (isTokenCredential(credentialOrOptions)) {
    credential = credentialOrOptions;
  } else {
    options = credentialOrOptions ?? {};
  }

  const client = _createClient(endpoint, options);

  addCredentialPipelinePolicy(client.pipeline, endpoint, { credential, clientOptions: options });
  return client;
}

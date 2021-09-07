// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { PipelineRequestOptions, createPipelineRequest } from "@azure/core-rest-pipeline";
import { IdentityClient } from "../../client/identityClient";
import { DefaultScopeSuffix } from "./constants";
import { MSIExpiresInParser } from "./models";

/**
 * Transforms the received scope or array of scopes from getToken to a resource string.
 * We only keep the first scope we receive, and we remove the permissions or the /.default path after the domain.
 */
export function mapScopesToResource(scopes: string | string[]): string {
  let scope = "";
  if (Array.isArray(scopes)) {
    scope = scopes[0];
  } else if (typeof scopes === "string") {
    scope = scopes;
  }

  if (!scope.endsWith(DefaultScopeSuffix)) {
    return scope;
  }

  return scope.substr(0, scope.lastIndexOf(DefaultScopeSuffix));
}

export async function msiGenericGetToken(
  identityClient: IdentityClient,
  requestOptions: PipelineRequestOptions,
  expiresInParser: MSIExpiresInParser | undefined,
  getTokenOptions: GetTokenOptions = {}
): Promise<AccessToken | null> {
  const request = createPipelineRequest({
    abortSignal: getTokenOptions.abortSignal,
    ...requestOptions,
    allowInsecureConnection: true
  });

  const tokenResponse = await identityClient.sendTokenRequest(request, expiresInParser);
  return (tokenResponse && tokenResponse.accessToken) || null;
}

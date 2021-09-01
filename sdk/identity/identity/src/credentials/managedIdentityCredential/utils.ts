// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { PipelineRequestOptions, createPipelineRequest } from "@azure/core-rest-pipeline";
import { IdentityClient } from "../../client/identityClient";
import { DefaultScopeSuffix } from "./constants";
import { MSIExpiresInParser } from "./models";

export function mapScopesToResource(scopes: string | string[]): string {
  let scope = "";
  if (Array.isArray(scopes)) {
    if (scopes.length !== 1) {
      throw new Error(
        "To convert to a resource string the specified array must be exactly length 1"
      );
    }

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

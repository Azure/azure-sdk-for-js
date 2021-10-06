// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { PipelineRequestOptions, createPipelineRequest } from "@azure/core-rest-pipeline";
import { IdentityClient } from "../../client/identityClient";
import { DefaultScopeSuffix } from "./constants";
import { MSIExpiresInParser } from "./models";

/**
 * Most MSIs send requests to the IMDS endpoint, or a similar endpoint. These are GET requests that require sending a `resource` parameter on the query.
 * This resource can be derived from the scopes received through the getToken call, as long as only one scope is received.
 * Multiple scopes assume that the resulting token will have access to multiple resources, which won't be the case.
 *
 * For that reason, when we encounter multiple scopes, we return undefined.
 * It's up to the individual MSI implementations to throw the errors (which helps us provide less generic errors).
 */
export function mapScopesToResource(scopes: string | string[]): string | undefined {
  let scope = "";
  if (Array.isArray(scopes)) {
    if (scopes.length !== 1) {
      return;
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

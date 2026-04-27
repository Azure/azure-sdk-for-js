// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceContext as Client } from "./index.js";
import {
  ArtifactGenerationProperties,
  artifactGenerationPropertiesSerializer,
  errorResponseDeserializer,
  GitHubOAuthResponse,
  gitHubOAuthResponseDeserializer,
  GitHubOAuthListResponse,
  gitHubOAuthListResponseDeserializer,
  gitHubOAuthCallRequestSerializer,
  GitHubOAuthInfoResponse,
  gitHubOAuthInfoResponseDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  GitHubOAuthOptionalParams,
  ListGitHubOAuthOptionalParams,
  GitHubOAuthCallbackOptionalParams,
  GeneratePreviewArtifactsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _gitHubOAuthSend(
  context: Client,
  location: string,
  options: GitHubOAuthOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DevHub/locations/{location}/githuboauth/default/getGitHubOAuthInfo{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["parameters"]
      ? options["parameters"]
      : gitHubOAuthCallRequestSerializer(options["parameters"]),
  });
}

export async function _gitHubOAuthDeserialize(
  result: PathUncheckedResponse,
): Promise<GitHubOAuthInfoResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gitHubOAuthInfoResponseDeserializer(result.body);
}

/** Gets GitHubOAuth info used to authenticate users with the Developer Hub GitHub App. */
export async function gitHubOAuth(
  context: Client,
  location: string,
  options: GitHubOAuthOptionalParams = { requestOptions: {} },
): Promise<GitHubOAuthInfoResponse> {
  const result = await _gitHubOAuthSend(context, location, options);
  return _gitHubOAuthDeserialize(result);
}

export function _listGitHubOAuthSend(
  context: Client,
  location: string,
  options: ListGitHubOAuthOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DevHub/locations/{location}/githuboauth{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listGitHubOAuthDeserialize(
  result: PathUncheckedResponse,
): Promise<GitHubOAuthListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gitHubOAuthListResponseDeserializer(result.body);
}

/** Callback URL to hit once authenticated with GitHub App to have the service store the OAuth token. */
export async function listGitHubOAuth(
  context: Client,
  location: string,
  options: ListGitHubOAuthOptionalParams = { requestOptions: {} },
): Promise<GitHubOAuthListResponse> {
  const result = await _listGitHubOAuthSend(context, location, options);
  return _listGitHubOAuthDeserialize(result);
}

export function _gitHubOAuthCallbackSend(
  context: Client,
  location: string,
  code: string,
  state: string,
  options: GitHubOAuthCallbackOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DevHub/locations/{location}/githuboauth/default{?api%2Dversion,code,state}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      code: code,
      state: state,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _gitHubOAuthCallbackDeserialize(
  result: PathUncheckedResponse,
): Promise<GitHubOAuthResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return gitHubOAuthResponseDeserializer(result.body);
}

/** Callback URL to hit once authenticated with GitHub App to have the service store the OAuth token. */
export async function gitHubOAuthCallback(
  context: Client,
  location: string,
  code: string,
  state: string,
  options: GitHubOAuthCallbackOptionalParams = { requestOptions: {} },
): Promise<GitHubOAuthResponse> {
  const result = await _gitHubOAuthCallbackSend(context, location, code, state, options);
  return _gitHubOAuthCallbackDeserialize(result);
}

export function _generatePreviewArtifactsSend(
  context: Client,
  location: string,
  parameters: ArtifactGenerationProperties,
  options: GeneratePreviewArtifactsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DevHub/locations/{location}/generatePreviewArtifacts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: artifactGenerationPropertiesSerializer(parameters),
  });
}

export async function _generatePreviewArtifactsDeserialize(
  result: PathUncheckedResponse,
): Promise<Record<string, string>> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return Object.fromEntries(Object.entries(result.body).map(([k, p]: [string, any]) => [k, p]));
}

/** Generate preview dockerfile and manifests. */
export async function generatePreviewArtifacts(
  context: Client,
  location: string,
  parameters: ArtifactGenerationProperties,
  options: GeneratePreviewArtifactsOptionalParams = { requestOptions: {} },
): Promise<Record<string, string>> {
  const result = await _generatePreviewArtifactsSend(context, location, parameters, options);
  return _generatePreviewArtifactsDeserialize(result);
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequest, sendRequest } from "./_client.js";
import { NotificationHubsClientContext } from "../index.js";
import { RegistrationDescription } from "../../models/registration.js";
import { RegistrationQueryOptions } from "../../models/options.js";
import { RegistrationQueryResponse } from "../../models/response.js";
import { registrationDescriptionParser } from "../../serializers/registrationSerializer.js";

export async function* listRegistrationsAll(
  context: NotificationHubsClientContext,
  options: RegistrationQueryOptions,
): AsyncIterableIterator<RegistrationDescription> {
  for await (const page of listRegistrationPagingPage(context, options)) {
    yield* page;
  }
}

export async function* listRegistrationPagingPage(
  context: NotificationHubsClientContext,
  options: RegistrationQueryOptions,
): AsyncIterableIterator<RegistrationDescription[]> {
  let result = await _listRegistrations(context, options);
  yield result.registrations || [];
  let continuationToken = result.continuationToken;
  while (continuationToken) {
    result = await _listRegistrations(context, options, continuationToken);
    continuationToken = result.continuationToken;
    yield result.registrations || [];
  }
}

async function _listRegistrations(
  context: NotificationHubsClientContext,
  options: RegistrationQueryOptions,
  continuationToken?: string,
): Promise<RegistrationQueryResponse> {
  const endpoint = context.requestUrl();
  endpoint.pathname += "/registrations";
  if (options.top !== undefined) {
    endpoint.searchParams.set("$top", `${options.top}`);
  }

  if (options.filter !== undefined) {
    endpoint.searchParams.set("$filter", options.filter);
  }

  if (continuationToken !== undefined) {
    endpoint.searchParams.set("continuationtoken", continuationToken);
  }

  const headers = await context.createHeaders("listRegistrations");
  const request = createRequest(endpoint, "GET", headers, options);
  const response = await sendRequest(context, request, 200);

  const registrations = await registrationDescriptionParser.parseRegistrationFeed(
    response.bodyAsText!,
  );
  const nextToken = response.headers.get("x-ms-continuationtoken");
  return {
    registrations,
    continuationToken: nextToken,
  };
}

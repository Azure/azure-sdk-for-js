// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRequest, sendRequest } from "./internal/_client.js";
import { NotificationHubsClientContext } from "./index.js";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RegistrationDescription } from "../models/registration.js";
import { RegistrationQueryOptions } from "../models/options.js";
import { RegistrationQueryResponse } from "../models/response.js";
import { registrationDescriptionParser } from "../serializers/registrationSerializer.js";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "listRegistrations";

/**
 * Gets all registrations for the notification hub with the given query options.
 * @param context - The Notification Hubs client.
 * @param options - The options for querying the registrations such as $top and $filter.
 * @returns A paged async iterable containing all of the registrations for the notification hub.
 */
export function listRegistrations(
  context: NotificationHubsClientContext,
  options: RegistrationQueryOptions = {}
): PagedAsyncIterableIterator<RegistrationDescription> {
  const { span, updatedOptions } = tracingClient.startSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options
  );
  try {
    const iter = listRegistrationsAll(context, updatedOptions);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return listRegistrationPagingPage(context, options);
      },
    };
  } catch (e: any) {
    span.setStatus({ status: "error", error: e });
    throw e;
  } finally {
    span.end();
  }
}

async function* listRegistrationsAll(
  context: NotificationHubsClientContext,
  options: RegistrationQueryOptions
): AsyncIterableIterator<RegistrationDescription> {
  for await (const page of listRegistrationPagingPage(context, options)) {
    yield* page;
  }
}

async function* listRegistrationPagingPage(
  context: NotificationHubsClientContext,
  options: RegistrationQueryOptions
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
  continuationToken?: string
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

  const headers = await context.createHeaders(OPERATION_NAME);
  const request = createRequest(endpoint, "GET", headers, options);
  const response = await sendRequest(context, request, 200);

  const registrations = await registrationDescriptionParser.parseRegistrationFeed(
    response.bodyAsText!
  );
  const nextToken = response.headers.get("x-ms-continuationtoken");
  return {
    registrations,
    continuationToken: nextToken,
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient, createRequest } from "./index.js";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RegistrationDescription } from "../models/registration.js";
import { RegistrationQueryOptions } from "../models/options.js";
import { RegistrationQueryResponse } from "../models/response.js";
import { RestError } from "@azure/core-rest-pipeline";
import { registrationDescriptionParser } from "../serializers/registrationSerializer.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Gets all registrations for the notification hub with the given query options.
 * @param client - The Notification Hubs client.
 * @param options - The options for querying the registrations such as $top and $filter.
 * @returns A paged async iterable containing all of the registrations for the notification hub.
 */
export function listRegistrations(
  client: NotificationHubsClient,
  options: RegistrationQueryOptions = {}
): PagedAsyncIterableIterator<RegistrationDescription> {
  const { span, updatedOptions } = tracingClient.startSpan(
    "NotificationHubsClient-listRegistrations",
    options
  );
  try {
    const iter = listRegistrationsAll(client, updatedOptions);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return listRegistrationPagingPage(client, options);
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
  client: NotificationHubsClient,
  options: RegistrationQueryOptions
): AsyncIterableIterator<RegistrationDescription> {
  for await (const page of listRegistrationPagingPage(client, options)) {
    yield* page;
  }
}

async function* listRegistrationPagingPage(
  client: NotificationHubsClient,
  options: RegistrationQueryOptions
): AsyncIterableIterator<RegistrationDescription[]> {
  let result = await _listRegistrations(client, options);
  yield result.registrations || [];
  let continuationToken = result.continuationToken;
  while (continuationToken) {
    result = await _listRegistrations(client, options, continuationToken);
    continuationToken = result.continuationToken;
    yield result.registrations || [];
  }
}

async function _listRegistrations(
  client: NotificationHubsClient,
  options: RegistrationQueryOptions,
  continuationToken?: string
): Promise<RegistrationQueryResponse> {
  const endpoint = client.getBaseUrl();
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

  const headers = client.createHeaders();

  const request = createRequest(endpoint, "GET", headers, options);
  const response = await client.sendRequest(request);
  if (response.status !== 200) {
    throw new RestError(`listRegistrations failed with ${response.status}`, {
      statusCode: response.status,
      response: response,
    });
  }

  const registrations = await registrationDescriptionParser.parseRegistrationFeed(
    response.bodyAsText!
  );
  const nextToken = response.headers.get("x-ms-continuationtoken");
  return {
    registrations,
    continuationToken: nextToken,
  };
}

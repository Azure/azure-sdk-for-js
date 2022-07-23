// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient, createRequest } from "./index.js";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RegistrationDescription } from "../models/registration.js";
import { RegistrationQueryLimitOptions } from "../models/options.js";
import { RegistrationQueryResponse } from "../models/response.js";
import { RestError } from "@azure/core-rest-pipeline";
import { registrationDescriptionParser } from "../serializers/registrationSerializer.js";
import { tracingClient } from "../utils/tracing.js";

/**
 * Lists all registrations with the matching tag.
 * @param client - The Notification Hubs client.
 * @param tag - The tag to query for matching registrations.
 * @param options - The query options such as $top.
 * @returns A paged async iterable containing the matching registrations for the notification hub.
 */
export function listRegistrationsByTag(
  client: NotificationHubsClient,
  tag: string,
  options: RegistrationQueryLimitOptions = {}
): PagedAsyncIterableIterator<RegistrationDescription> {
  const { span, updatedOptions } = tracingClient.startSpan(
    "NotificationHubsClient-listRegistrationsByTag",
    options
  );
  try {
    const iter = listRegistrationsByTagAll(client, tag, updatedOptions);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return listRegistrationsByTagPagingPage(client, tag, options);
      },
    };
  } catch (e: any) {
    span.setStatus({ status: "error", error: e });
    throw e;
  } finally {
    span.end();
  }
}

async function* listRegistrationsByTagAll(
  client: NotificationHubsClient,
  tag: string,
  options: RegistrationQueryLimitOptions
): AsyncIterableIterator<RegistrationDescription> {
  for await (const page of listRegistrationsByTagPagingPage(client, tag, options)) {
    yield* page;
  }
}

async function* listRegistrationsByTagPagingPage(
  client: NotificationHubsClient,
  tag: string,
  options: RegistrationQueryLimitOptions
): AsyncIterableIterator<RegistrationDescription[]> {
  let result = await _listRegistrationsByTag(client, tag, options);
  yield result.registrations || [];
  let continuationToken = result.continuationToken;
  while (continuationToken) {
    result = await _listRegistrationsByTag(client, tag, options, continuationToken);
    continuationToken = result.continuationToken;
    yield result.registrations || [];
  }
}

async function _listRegistrationsByTag(
  client: NotificationHubsClient,
  tag: string,
  options: RegistrationQueryLimitOptions,
  continuationToken?: string
): Promise<RegistrationQueryResponse> {
  const endpoint = client.getBaseUrl();
  endpoint.pathname += `/tags/${tag}/registrations`;
  if (options.top !== undefined) {
    endpoint.searchParams.set("$top", `${options.top}`);
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

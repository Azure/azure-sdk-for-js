// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequest, sendRequest } from "./internal/_client.js";
import { NotificationHubsClientContext } from "./index.js";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RegistrationDescription } from "../models/registration.js";
import { RegistrationQueryLimitOptions } from "../models/options.js";
import { RegistrationQueryResponse } from "../models/response.js";
import { registrationDescriptionParser } from "../serializers/registrationSerializer.js";
import { tracingClient } from "../utils/tracing.js";

const OPERATION_NAME = "listRegistrationsByTag";

/**
 * Lists all registrations with the matching tag.
 * @param context - The Notification Hubs client.
 * @param tag - The tag to query for matching registrations.
 * @param options - The query options such as $top.
 * @returns A paged async iterable containing the matching registrations for the notification hub.
 */
export function listRegistrationsByTag(
  context: NotificationHubsClientContext,
  tag: string,
  options: RegistrationQueryLimitOptions = {},
): PagedAsyncIterableIterator<RegistrationDescription> {
  const { span, updatedOptions } = tracingClient.startSpan(
    `NotificationHubsClientContext.${OPERATION_NAME}`,
    options,
  );
  try {
    const iter = listRegistrationsByTagAll(context, tag, updatedOptions);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return listRegistrationsByTagPagingPage(context, tag, options);
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
  context: NotificationHubsClientContext,
  tag: string,
  options: RegistrationQueryLimitOptions,
): AsyncIterableIterator<RegistrationDescription> {
  for await (const page of listRegistrationsByTagPagingPage(context, tag, options)) {
    yield* page;
  }
}

async function* listRegistrationsByTagPagingPage(
  context: NotificationHubsClientContext,
  tag: string,
  options: RegistrationQueryLimitOptions,
): AsyncIterableIterator<RegistrationDescription[]> {
  let result = await _listRegistrationsByTag(context, tag, options);
  yield result.registrations || [];
  let continuationToken = result.continuationToken;
  while (continuationToken) {
    result = await _listRegistrationsByTag(context, tag, options, continuationToken);
    continuationToken = result.continuationToken;
    yield result.registrations || [];
  }
}

async function _listRegistrationsByTag(
  context: NotificationHubsClientContext,
  tag: string,
  options: RegistrationQueryLimitOptions,
  continuationToken?: string,
): Promise<RegistrationQueryResponse> {
  const endpoint = context.requestUrl();
  endpoint.pathname += `/tags/${tag}/registrations`;
  if (options.top !== undefined) {
    endpoint.searchParams.set("$top", `${options.top}`);
  }

  if (continuationToken !== undefined) {
    endpoint.searchParams.set("continuationtoken", continuationToken);
  }

  const headers = await context.createHeaders(OPERATION_NAME);
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

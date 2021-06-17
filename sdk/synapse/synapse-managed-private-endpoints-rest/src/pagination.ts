// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="esnext.asynciterable" />

import { Client, HttpResponse, PathUncheckedResponse } from "@azure-rest/core-client";
import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

type GetArrayType<T> = T extends Array<infer TData> ? TData : never;

export type PaginateReturn<TResult> = TResult extends
  | {
      body: { value: infer TPage };
    }
  | {
      body: { values: infer TPage };
    }
  | {
      body: { items: infer TPage };
    }
  ? GetArrayType<TPage>
  : Array<any>;

export function paginate<TReturn extends PathUncheckedResponse>(
  client: Client,
  initialResponse: TReturn
): PagedAsyncIterableIterator<PaginateReturn<TReturn>, PaginateReturn<TReturn>[], {}> {
  return corePaginate<PaginateReturn<TReturn>>(client, initialResponse);
}
/**
 * NOTE: !!!!! Everything below this line will be moved to @azure-rest/core-client. It is included here just for the purpose of this prototype
 */

const Http2xxStatusCodes = ["200", "201", "202", "203", "204", "205", "206", "207", "208", "226"];

const DEFAULT_NEXTLINK = "nextLink";
const DEFAULT_VALUES = "value";

interface PaginateOptions {
  nextLinkName?: string;
  valuesName?: string;
}

function corePaginate<TReturn = Record<string, unknown>>(
  client: Client,
  initialResponse: HttpResponse,
  options: PaginateOptions = {}
): PagedAsyncIterableIterator<TReturn, TReturn[], {}> {
  const iter = listAll<TReturn>(client, initialResponse, options);
  return {
    next() {
      return iter.next();
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    byPage: () => {
      return listPage<TReturn>(client, initialResponse, options);
    }
  };
}

async function* listAll<T>(
  client: Client,
  initialResponse: PathUncheckedResponse,
  paginateOptions: PaginateOptions
): AsyncIterableIterator<T> {
  for await (const page of listPage<T>(client, initialResponse, paginateOptions)) {
    yield* page;
  }
}

async function* listPage<T = Record<string, any>[]>(
  client: Client,
  initialResponse: PathUncheckedResponse,
  options: PaginateOptions
): AsyncIterableIterator<T[]> {
  let result = initialResponse;
  checkPagingRequest(result);
  let nextLink = getNextLink(result.body, options);
  let values = getElements<T>(result.body, options);

  yield values;

  while (nextLink) {
    result = await client.pathUnchecked(nextLink).get();
    checkPagingRequest(result);
    nextLink = getNextLink(result.body, options);
    values = getElements<T>(result.body, options);
    yield values;
  }
}

function checkPagingRequest(response: PathUncheckedResponse) {
  if (!Http2xxStatusCodes.includes(response.status)) {
    throw response.body?.error ?? {
      message: `Pagination failed`,
      request: response.request,
      response: response,
      status: response.status
    };
  }
}

function getNextLink(body: Record<string, unknown>, paginateOptions: PaginateOptions = {}) {
  const nextLinkName = paginateOptions.nextLinkName ?? DEFAULT_NEXTLINK;
  return (body[nextLinkName] as string) ?? undefined;
}
function getElements<T = unknown>(
  body: Record<string, unknown>,
  paginateOptions: PaginateOptions = {}
): T[] {
  const valueName = paginateOptions?.valuesName ?? DEFAULT_VALUES;
  return (body[valueName] as T[]) ?? [];
}

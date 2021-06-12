/// <reference lib="esnext.asynciterable" />

import { Client, PathUncheckedResponse } from "./getClient";
import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

const DEFAULT_NEXTLINK = "nextLink";
const DEFAULT_VALUES = "value";

interface PaginateOptions {
  nextLinkName?: string;
  valuesName?: string;
}

export function paginate<TPath extends string, TReturn = Record<string, unknown>>(
  client: Client,
  path: TPath,
  paginateOptions: PaginateOptions = {}
): PagedAsyncIterableIterator<TReturn, TReturn[], {}> {
  const iter = listAll<TReturn>(client, path, paginateOptions);
  return {
    next() {
      return iter.next();
    },
    [Symbol.asyncIterator]() {
      return this;
    },
    byPage: () => {
      return listPage<TReturn>(client, path, paginateOptions);
    },
  };
}

async function* listAll<T>(
  client: Client,
  path: string,
  paginateOptions: PaginateOptions
): AsyncIterableIterator<T> {
  for await (const page of listPage<T>(client, path, paginateOptions)) {
    yield* page;
  }
}

async function* listPage<T = Record<string, any>[]>(
  client: Client,
  path: string,
  paginateOptions: PaginateOptions
): AsyncIterableIterator<T[]> {
  let result = await client.pathUnchecked(path).get();
  checkPagingRequest(result);
  let nextLink = getNextLink(result.body, paginateOptions);
  let values = getElements<T>(result.body, paginateOptions);

  yield values;

  while (nextLink) {
    result = await client.pathUnchecked(nextLink).get();
    checkPagingRequest(result);
    nextLink = getNextLink(result.body, paginateOptions);
    values = getElements<T>(result.body, paginateOptions);
    yield values;
  }
}

function checkPagingRequest(response: PathUncheckedResponse) {
  if (!["200", "201", "204"].includes(response.status)) {
    throw (
      response.body?.error ?? {
        message: `Pagination failed`,
        request: response.request,
        response: response,
        status: response.status,
      }
    );
  }
}

function getNextLink(body: Record<string, unknown>, paginateOptions: PaginateOptions) {
  const nextLinkName = paginateOptions.nextLinkName ?? DEFAULT_NEXTLINK;
  return (body[nextLinkName] as string) ?? undefined;
}
function getElements<T = unknown>(
  body: Record<string, unknown>,
  paginateOptions: PaginateOptions
): T[] {
  const valueName = paginateOptions?.valuesName ?? DEFAULT_VALUES;
  return (body[valueName] as T[]) ?? [];
}

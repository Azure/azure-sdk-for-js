// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "node:assert/strict";
import test from "node:test";
import { parse } from "./modules.mjs";
import { isReviewedHelperUpdate } from "./reviewed-helper-updates.mjs";

const paging = "static-helpers/pagingHelpers.ts";
const polling = "static-helpers/pollingHelpers.ts";
const accepted = (file, before, after) =>
  isReviewedHelperUpdate(file, parse(before).statements[0], parse(after).statements[0]);

test("reviewed backward-cursor option cannot waive other members or modules", () => {
  const before =
    "export interface BuildPagedAsyncIteratorOptions { cursorFieldName?: string; keep?: boolean; }";
  const after = before.replace(
    "cursorFieldName?: string;",
    "cursorFieldName?: string; firstCursorFieldName?: string;",
  );
  assert.equal(accepted(paging, before, after), true);
  assert.equal(accepted("util.ts", before, after), false);
  assert.equal(accepted(paging, before, after.replace("keep?: boolean", "keep?: string")), false);
  assert.equal(
    accepted(
      paging,
      before,
      after.replace("firstCursorFieldName?: string", "firstCursorFieldName: string"),
    ),
    false,
  );
});

test("reviewed cursor transition preserves all surrounding paging behavior", () => {
  const before = `export function buildPagedAsyncIterator() {
    const unchanged = "headers and errors";
    const body = results as Record<string, unknown>;
    if (body[hasMoreFieldName] === true && body[cursorFieldName]) {
      initialRequestUrl.searchParams.set("after", body[cursorFieldName] as string);
      resolvedNextLink = initialRequestUrl.toString();
    }
    return unchanged;
  }`;
  const after = `export function buildPagedAsyncIterator() {
    const unchanged = "headers and errors";
    const body = results as Record<string, unknown>;
    const backwardsCursor = options.firstCursorFieldName;
    const backwards = backwardsCursor !== undefined && initialRequestUrl.searchParams.has("before");
    const cursor = backwards ? backwardsCursor : cursorFieldName;
    if (body[hasMoreFieldName] === true && cursor && body[cursor]) {
      if (backwardsCursor !== undefined) {
        initialRequestUrl.searchParams.delete(backwards ? "after" : "before");
      }
      initialRequestUrl.searchParams.set(backwards ? "before" : "after", body[cursor] as string);
      resolvedNextLink = initialRequestUrl.toString();
    }
    return unchanged;
  }`;
  assert.equal(accepted(paging, before, after), true);
  assert.equal(accepted(paging, before, after.replace('"headers and errors"', '"dropped"')), false);
  assert.equal(
    accepted(
      paging,
      before,
      after.replace("const cursor = backwards", "const cursor = !backwards"),
    ),
    false,
  );
  assert.equal(accepted(paging, before, after.replace("return unchanged", "return []")), false);
  assert.equal(
    accepted(
      paging,
      before.replace("const unchanged =", "const values = [1,]; const unchanged ="),
      after.replace("const unchanged =", "const values = [1,,]; const unchanged ="),
    ),
    false,
  );
});

test("reviewed resource-location option keeps cancellation and optionality intact", () => {
  const before = `export interface GetLongRunningPollerOptions<TResponse> {
    abortSignal?: AbortSignalLike;
    getInitialResponse?: () => PromiseLike<TResponse>;
  }`;
  const after = before.replace(
    "getInitialResponse?: () => PromiseLike<TResponse>;",
    `getInitialResponse?: () => PromiseLike<TResponse>;
     getResourceLocation?: (response: TResponse, initialResponse?: TResponse) => string | undefined;`,
  );
  assert.equal(accepted(polling, before, after), true);
  assert.equal(
    accepted(
      polling,
      before,
      after.replace("abortSignal?: AbortSignalLike", "abortSignal?: string"),
    ),
    false,
  );
  assert.equal(accepted(paging, before, after), false);
});

test("reviewed poller wiring changes only the callback and initial-response arguments", () => {
  const before = `export function getLongRunningPoller<TResponse>(options: Options) {
    const { restoreFrom, getInitialResponse, apiVersion, pollHeaders, statusNormalizations } = options;
    const unchanged = "abort and headers";
    const first = getLroResponse(initialResponse, expectedStatuses, statusNormalizations);
    const next = getLroResponse(response as TResponse, expectedStatuses, statusNormalizations);
    return { first, next, unchanged };
  }`;
  const after = before
    .replace(
      "statusNormalizations } = options",
      "statusNormalizations, getResourceLocation } = options",
    )
    .replace(
      "getLroResponse(initialResponse, expectedStatuses, statusNormalizations)",
      "getLroResponse(initialResponse, expectedStatuses, statusNormalizations, getResourceLocation, initialResponse,)",
    )
    .replace(
      "getLroResponse(response as TResponse, expectedStatuses, statusNormalizations)",
      "getLroResponse(response as TResponse, expectedStatuses, statusNormalizations, getResourceLocation, initialResponse,)",
    );
  assert.equal(accepted(polling, before, after), true);
  assert.equal(
    accepted(polling, before, after.replace("getResourceLocation }", "getResourceLocation, }")),
    true,
  );
  assert.equal(accepted(polling, before, after.replace('"abort and headers"', '"changed"')), false);
  assert.equal(
    accepted(
      polling,
      before,
      after.replace("response as TResponse", "initialResponse as TResponse"),
    ),
    false,
  );
});

test("reviewed LRO normalization retains error checks and the original flat response", () => {
  const before = `function getLroResponse<TResponse>(
    response: TResponse,
    expectedStatuses: string[],
    statusNormalizations?: Record<string, OperationStatus>,
  ) {
    if (!expectedStatuses.includes(response.status)) throw createRestError(response);
    const normalizedBody = response.body;
    return {
      flatResponse: response,
      rawResponse: {
        ...response,
        statusCode: Number.parseInt(response.status),
        body: normalizedBody,
      },
    };
  }`;
  const after = `function getLroResponse<TResponse>(
    response: TResponse,
    expectedStatuses: string[],
    statusNormalizations?: Record<string, OperationStatus>,
    getResourceLocation?: GetLongRunningPollerOptions<TResponse>["getResourceLocation"],
    initialResponse?: TResponse,
  ) {
    if (!expectedStatuses.includes(response.status)) throw createRestError(response);
    const normalizedBody = response.body;
    const resourceLocation = getResourceLocation?.(response, initialResponse);
    return {
      flatResponse: response,
      rawResponse: {
        ...response,
        statusCode: Number.parseInt(response.status),
        body: resourceLocation === undefined ? normalizedBody : { ...normalizedBody, resourceLocation },
      },
    };
  }`;
  assert.equal(accepted(polling, before, after), true);
  assert.equal(
    accepted(
      polling,
      before,
      after.replace("!expectedStatuses.includes(response.status)", "false"),
    ),
    false,
  );
  assert.equal(
    accepted(polling, before, after.replace("flatResponse: response", "flatResponse: undefined")),
    false,
  );
  assert.equal(accepted("getCustomFetch.ts", before, after), false);
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { HttpMethods, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { isSessionEligible } from "../../src/session/ContainerSessionProvider.js";

describe("isSessionEligible", () => {
  const account = "https://myaccount.blob.core.windows.net";

  interface Case {
    readonly name: string;
    readonly url: string;
    readonly method?: HttpMethods;
    readonly headers?: Record<string, string>;
  }

  const eligible: Case[] = [
    { name: "blob download", url: `${account}/container/blob.txt` },
    { name: "blob in a virtual directory", url: `${account}/container/nested/path/blob.txt` },
    {
      name: "blob with a snapshot",
      url: `${account}/container/blob.txt?snapshot=2026-01-01T00%3A00%3A00Z`,
    },
    { name: "blob with a version id", url: `${account}/container/blob.txt?versionid=2026-01-01` },
    {
      name: "blob on an IP-style endpoint",
      url: "http://127.0.0.1:10000/devstoreaccount1/container/blob.txt",
    },
    {
      name: "blob download carrying an unrelated header",
      url: `${account}/container/blob.txt`,
      headers: { "x-ms-range": "bytes=0-1023" },
    },
  ];

  const ineligible: Case[] = [
    { name: "PUT", url: `${account}/container/blob.txt`, method: "PUT" },
    { name: "HEAD (get properties)", url: `${account}/container/blob.txt`, method: "HEAD" },
    { name: "DELETE", url: `${account}/container/blob.txt`, method: "DELETE" },
    { name: "container-level request", url: `${account}/container` },
    { name: "container-level request with a trailing slash", url: `${account}/container/` },
    { name: "service-level request", url: `${account}/` },
    { name: "list containers", url: `${account}/?comp=list` },
    { name: "get block list", url: `${account}/container/blob.txt?comp=blocklist` },
    { name: "get blob metadata", url: `${account}/container/blob.txt?comp=metadata` },
    { name: "get blob tags", url: `${account}/container/blob.txt?comp=tags` },
    { name: "restype=container", url: `${account}/container?restype=container` },
    { name: "restype=account", url: `${account}/container/blob.txt?restype=account` },
    { name: "restype=service", url: `${account}/?restype=service` },
    {
      name: "DataLake dfs endpoint",
      url: "https://myaccount.dfs.core.windows.net/filesystem/file.txt",
    },
    {
      name: "DataLake dfs endpoint behind a private endpoint",
      url: "https://myaccount.privatelink.dfs.core.windows.net/filesystem/file.txt",
    },
    {
      name: "comp with non-canonical casing",
      url: `${account}/container/blob.txt?Comp=blocklist`,
    },
    {
      name: "restype with non-canonical casing",
      url: `${account}/container/blob.txt?RESTYPE=account`,
    },
    {
      name: "container-level request on an IP-style endpoint",
      url: "http://127.0.0.1:10000/devstoreaccount1/container",
    },
    {
      name: "structured message download",
      url: `${account}/container/blob.txt`,
      headers: { "x-ms-structured-body": "XSM/1.0; properties=crc64" },
    },
    {
      name: "structured message download with a differently cased header",
      url: `${account}/container/blob.txt`,
      headers: { "X-MS-Structured-Body": "XSM/1.0; properties=crc64" },
    },
  ];

  function requestFor({ url, method = "GET", headers = {} }: Case): PipelineRequest {
    return createPipelineRequest({ url, method, headers: createHttpHeaders(headers) });
  }

  for (const testCase of eligible) {
    it(`allows ${testCase.name}`, () => {
      assert.isTrue(isSessionEligible(requestFor(testCase)));
    });
  }

  for (const testCase of ineligible) {
    it(`rejects ${testCase.name}`, () => {
      assert.isFalse(isSessionEligible(requestFor(testCase)));
    });
  }
});

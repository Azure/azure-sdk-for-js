// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/ban-ts-comment */

import { SearchClient, SelectFields } from "../src/index";

type Model = {
  key?: string;
  a?: string | null;
  b?: { a?: string | null; b?: string | null } | null;
  c?: Array<string>;
  d?: Array<{ a?: string | null; b?: { a?: string | null; b?: string | null } | null }>;
};

type Model2 = {
  key: string;
  a: string | null;
  b: { a: string | null; b: string | null } | null;
  c: Array<string>;
  d: Array<{ a: string | null; b: { a: string | null; b: string | null } | null }>;
};

// The model with all properties set to optional should be transparent, i.e.
// narrowed documents should be able to be used in any context Model can be
// @ts-ignore
async function fun() {
  const client = new SearchClient<Model>("azure", "sdk", "js" as any, {});
  const wideDocument: Model = { key: "azure", a: null, b: null, c: [], d: [{ a: "sdk", b: null }] };
  const select: SelectFields<Model>[] = ["key", "a", "b/a", "d/b"];
  const selectNarrowed = ["key", "a", "b/a", "d/b"] as const;
  const narrowedDocument: {
    key?: string;
    a?: string | null;
    b?: { a?: string | null } | null;
    d?: Array<{ b?: { a?: string | null; b?: string | null } | null }>;
  } = { key: "azure", a: null, b: null, d: [{ b: null }] };

  const select1 = await client.search("New", {
    select,
  });
  const select2 = await client.search("New", {
    select: selectNarrowed,
  });
  const select3 = await client.search("New", {
    select: ["key", "a", "b/a", "d/b"],
  });

  for await (const result of select1.results) {
    const document: Model = result.document;
    result.document = wideDocument;
    const isNarrowed: typeof narrowedDocument = result.document;
    result.document = narrowedDocument;
    // These assignments suppress the noUnusedLocals warning
    result.document = document;
    result.document = isNarrowed;
    break;
  }
  for await (const result of select2.results) {
    const document: Model = result.document;
    result.document = wideDocument;
    const isNarrowed: typeof narrowedDocument = result.document;
    result.document = narrowedDocument;
    result.document = document;
    result.document = isNarrowed;
    break;
  }
  for await (const result of select3.results) {
    const document: Model = result.document;
    result.document = wideDocument;
    const isNarrowed: typeof narrowedDocument = result.document;
    result.document = narrowedDocument;
    result.document = document;
    result.document = isNarrowed;
    break;
  }

  const searchFields1 = await client.search("New", {
    searchFields: select,
  });
  const searchFields2 = await client.search("New", {
    searchFields: selectNarrowed,
  });
  const searchFields3 = await client.search("New", {
    searchFields: ["key", "a", "b/a", "d/b"],
  });

  for await (const result of searchFields1.results) {
    const document: Model = result.document;
    result.document = wideDocument;
    const isNarrowed: typeof narrowedDocument = result.document;
    result.document = narrowedDocument;
    result.document = document;
    result.document = isNarrowed;
    break;
  }
  for await (const result of searchFields2.results) {
    const document: Model = result.document;
    result.document = wideDocument;
    const isNarrowed: typeof narrowedDocument = result.document;
    result.document = narrowedDocument;
    result.document = document;
    result.document = isNarrowed;
    break;
  }
  for await (const result of searchFields3.results) {
    const document: Model = result.document;
    result.document = wideDocument;
    const isNarrowed: typeof narrowedDocument = result.document;
    result.document = narrowedDocument;
    result.document = document;
    result.document = isNarrowed;
    break;
  }
}

// This model strictly enforces which properties should be present.
// @ts-ignore
async function fun2() {
  const client = new SearchClient<Model2>("azure", "sdk", "js" as any, {});
  const wideDocument: Model2 = {
    key: "azure",
    a: null,
    b: null,
    c: [],
    d: [{ a: "sdk", b: null }],
  };
  const select: SelectFields<Model2>[] = ["key", "a", "b/a", "d/b"];
  const selectNarrowed = ["key", "a", "b/a", "d/b"] as const;
  const narrowedDocument: {
    key: string;
    a: string | null;
    b: { a: string | null } | null;
    d: Array<{ b: { a: string | null; b: string | null } | null }>;
  } = { key: "azure", a: null, b: null, d: [{ b: null }] };

  const select1 = await client.search("New", {
    select,
  });
  const select2 = await client.search("New", {
    select: selectNarrowed,
  });
  const select3 = await client.search("New", {
    select: ["key", "a", "b/a", "d/b"],
  });

  for await (const result of select1.results) {
    const document: Model2 = result.document;
    result.document = wideDocument;
    const isNarrowed: typeof narrowedDocument = result.document;
    // @ts-expect-error
    result.document = narrowedDocument;
    result.document = document;
    // @ts-ignore
    result.document = isNarrowed;
    break;
  }
  for await (const result of select2.results) {
    // @ts-expect-error
    const document: Model2 = result.document;
    result.document = wideDocument;
    const isNarrowed: typeof narrowedDocument = result.document;
    result.document = narrowedDocument;
    result.document = document;
    result.document = isNarrowed;
    break;
  }
  for await (const result of select3.results) {
    // @ts-expect-error
    const document: Model2 = result.document;
    result.document = wideDocument;
    const isNarrowed: typeof narrowedDocument = result.document;
    result.document = narrowedDocument;
    result.document = document;
    result.document = isNarrowed;
    break;
  }

  const searchFields1 = await client.search("New", {
    searchFields: select,
  });
  const searchFields2 = await client.search("New", {
    searchFields: selectNarrowed,
  });
  const searchFields3 = await client.search("New", {
    searchFields: ["key", "a", "b/a", "d/b"],
  });

  for await (const result of searchFields1.results) {
    const document: Model2 = result.document;
    result.document = wideDocument;
    const isNarrowed: typeof narrowedDocument = result.document;
    // @ts-expect-error
    result.document = narrowedDocument;
    result.document = document;
    // @ts-ignore
    result.document = isNarrowed;
    break;
  }
  for await (const result of searchFields2.results) {
    const document: Model2 = result.document;
    result.document = wideDocument;
    const isNarrowed: typeof narrowedDocument = result.document;
    // @ts-expect-error
    result.document = narrowedDocument;
    result.document = document;
    // @ts-ignore
    result.document = isNarrowed;
    break;
  }
  for await (const result of searchFields3.results) {
    const document: Model2 = result.document;
    result.document = wideDocument;
    const isNarrowed: typeof narrowedDocument = result.document;
    // @ts-expect-error
    result.document = narrowedDocument;
    result.document = document;
    // @ts-ignore
    result.document = isNarrowed;
    break;
  }
}

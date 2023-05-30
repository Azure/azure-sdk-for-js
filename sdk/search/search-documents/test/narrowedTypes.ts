// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-constant-condition */

import { SearchClient, SelectFields } from "../src/index";
import {
  SearchFieldArray,
  SearchPick,
  SelectArray,
  NarrowedModel as GenericNarrowedModel,
  SuggestNarrowedModel,
} from "../src/indexModels";

type Equals<T1, T2> = (<T>() => T extends T1 ? true : false) extends <T>() => T extends T2
  ? true
  : false
  ? any
  : never;

type Model = {
  key?: string;
  a?: string | null;
  b?: { a?: string | null; b?: string | null } | null;
  c?: Array<string>;
  d?: Array<{ a?: string | null; b?: { a?: string | null; b?: string | null } | null }>;
};

type ModelFields =
  | "key"
  | "a"
  | "b"
  | "b/a"
  | "b/b"
  | "c"
  | "d"
  | "d/a"
  | "d/b"
  | "d/b/a"
  | "d/b/b";

type NarrowedModel = {
  key?: string;
  a?: string | null;
  b?: { a?: string | null } | null;
  d?: Array<{ b?: { a?: string | null; b?: string | null } | null }>;
};

type NarrowedModelFields = "key" | "a" | "b/a" | "d/b";

// @ts-ignore
function testSelectFields() {
  const a: Equals<SelectFields<never>, string> = "pass";
  const b: Equals<SelectFields<any>, string> = "pass";
  const c: Equals<SelectFields<object>, string> = "pass";
  const d: Equals<SelectFields<Model>, ModelFields> = "pass";

  // @ts-ignore
  const e: Equals<SelectFields<unknown>, string> = "pass";

  return [a, b, c, d, e];
}

// @ts-ignore
function testSearchPick() {
  const a: Equals<SearchPick<object, never>, object> = "pass";
  const b: Equals<SearchPick<Model, any>, Model> = "pass";
  const c: Equals<SearchPick<Model, never>, Model> = "pass";
  const d1: Model = {} as SearchPick<Model, ModelFields>;
  const d2: SearchPick<Model, ModelFields> = {} as Model;
  const e1: NarrowedModel = {} as SearchPick<Model, NarrowedModelFields>;
  const e2: SearchPick<Model, NarrowedModelFields> = {} as NarrowedModel;

  // @ts-ignore
  const f: Equals<SearchPick<object, any>, object> = "fail";
  // @ts-ignore
  const g: Equals<SearchPick<object, unknown>, object> = "fail";
  // @ts-ignore
  const h: Equals<SearchPick<object, string>, object> = "fail";
  // @ts-ignore
  const i: Equals<SearchPick<object, ModelFields>, object> = "fail";
  // @ts-ignore
  const j: Equals<SearchPick<Model, string>, Model> = "fail";
  // @ts-ignore
  const k: Equals<SearchPick<Model, unknown>, Model> = "pass";

  return [a, b, c, d1, d2, e1, e2, f, g, h, i, j, k];
}

// @ts-ignore
function testNarrowedModel() {
  const a1: GenericNarrowedModel<Model, NarrowedModelFields> = {} as NarrowedModel;
  const a2: NarrowedModel = {} as GenericNarrowedModel<Model, NarrowedModelFields>;

  const b: Equals<GenericNarrowedModel<never, never>, never> = "pass";
  const c: Equals<GenericNarrowedModel<never, any>, never> = "pass";
  const d: Equals<GenericNarrowedModel<never, string>, never> = "pass";
  const e: Equals<GenericNarrowedModel<never, NarrowedModelFields>, never> = "pass";
  const f: Equals<GenericNarrowedModel<object, never>, object> = "pass";
  const g: Equals<GenericNarrowedModel<object, any>, object> = "pass";
  const h: Equals<GenericNarrowedModel<object, string>, object> = "pass";
  const i: Equals<GenericNarrowedModel<object, NarrowedModelFields>, object> = "pass";
  const j: Equals<GenericNarrowedModel<Model, never>, never> = "pass";
  const k: Equals<GenericNarrowedModel<Model, any>, Model> = "pass";

  const l1: SuggestNarrowedModel<Model, NarrowedModelFields> = {} as NarrowedModel;
  const l2: NarrowedModel = {} as SuggestNarrowedModel<Model, NarrowedModelFields>;

  const m: Equals<SuggestNarrowedModel<never, never>, never> = "pass";
  const n: Equals<SuggestNarrowedModel<never, any>, never> = "pass";

  const o: Equals<SuggestNarrowedModel<never, string>, never> = "pass";
  const p: Equals<SuggestNarrowedModel<never, NarrowedModelFields>, never> = "pass";
  const q: Equals<SuggestNarrowedModel<object, never>, object> = "pass";
  const r: Equals<SuggestNarrowedModel<object, any>, object> = "pass";
  const s: Equals<SuggestNarrowedModel<object, string>, object> = "pass";
  const t: Equals<SuggestNarrowedModel<object, NarrowedModelFields>, object> = "pass";
  const u: Equals<SuggestNarrowedModel<Model, never>, { key?: string }> = "pass";
  const v: Equals<SuggestNarrowedModel<Model, any>, Model> = "pass";

  // @ts-ignore
  const w: Equals<GenericNarrowedModel<object, unknown>, object> = "fail";
  // @ts-ignore
  const x: Equals<GenericNarrowedModel<never, unknown>, never> = "fail";
  // @ts-ignore
  const y: Equals<GenericNarrowedModel<Model, unknown>, Model> = "fail";
  // @ts-ignore
  const z: Equals<GenericNarrowedModel<Model, string>, Model> = "fail";

  // @ts-ignore
  const aa: Equals<SuggestNarrowedModel<never, unknown>, never> = "fail";
  // @ts-ignore
  const ab: Equals<SuggestNarrowedModel<object, unknown>, object> = "fail";
  // @ts-ignore
  const ac: Equals<SuggestNarrowedModel<Model, unknown>, Model> = "fail";
  // @ts-ignore
  const ad: Equals<SuggestNarrowedModel<Model, string>, Model> = "fail";

  return [
    a1,
    a2,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    k,
    l1,
    l2,
    m,
    n,
    o,
    p,
    q,
    r,
    s,
    t,
    u,
    v,
    w,
    x,
    y,
    z,
    aa,
    ab,
    ac,
    ad,
  ];
}

// @ts-ignore
function testSelectArray() {
  const a: Equals<SelectArray<never>, string[] | readonly string[]> = "pass";
  const b: Equals<SelectArray<"field1">, Array<"field1"> | Readonly<Array<"field1">>> = "pass";
  const c: Equals<
    SelectArray<"field1" | "field2">,
    Array<"field1" | "field2"> | Readonly<Array<"field1" | "field2">>
  > = "pass";

  // @ts-ignore
  const d: Equals<SelectArray<any>, string[] | readonly string[]> = "fail";
  // @ts-ignore
  const e: Equals<SelectArray<unknown>, string[] | readonly string[]> = "fail";
  return [a, b, c, d, e];
}

// @ts-ignore
function testSearchFieldArray() {
  const a: Equals<SearchFieldArray<object>, string[] | readonly string[]> = "pass";
  const b: Equals<
    SearchFieldArray<Model>,
    Array<ModelFields> | Readonly<Array<ModelFields>>
  > = "pass";
  const c: Equals<SearchFieldArray<never>, string[] | readonly string[]> = "pass";
  const d: Equals<SearchFieldArray<any>, string[] | readonly string[]> = "pass";

  // @ts-ignore
  const e: Equals<SearchFieldArray<unknown>, string[] | readonly string[]> = "pass";

  return [a, b, c, d, e];
}

// @ts-ignore
function testNarrowedClient() {
  const client = new SearchClient<Model>("azure", "sdk", "js" as any, {});

  const select: SelectFields<Model>[] = ["key", "a", "b/a", "d/b"];
  const selectNarrowed = ["key", "a", "b/a", "d/b"] as const;

  async () => {
    const suggest = await client.suggest("", "", {});
    for await (const result of suggest.results) {
      const a: Equals<
        (typeof result)["document"],
        {
          key?: string;
        }
      > = "pass";
      // @ts-ignore
      const b = result.document.a;
      return [a, b];
    }
    return;
  };

  async () => {
    const select1 = await client.search("New", {
      select,
    });
    const select2 = await client.search("New", {
      select: selectNarrowed,
    });
    const select3 = await client.search("New", {
      select: ["key", "a", "b/a", "d/b"],
    });

    const suppressUnusedWarning: any[] = [];

    for await (const result of select1.results) {
      const a: Equals<(typeof result)["document"], Model> = "pass";
      const b = result.document.c;
      suppressUnusedWarning.push(a);
      suppressUnusedWarning.push(b);
    }
    for await (const result of select2.results) {
      const a1: (typeof result)["document"] = {} as NarrowedModel;
      const a2: NarrowedModel = {} as (typeof result)["document"];
      // @ts-ignore
      const b = result.document.c;
      suppressUnusedWarning.push(a1);
      suppressUnusedWarning.push(a2);
      suppressUnusedWarning.push(b);
    }
    for await (const result of select3.results) {
      const a1: (typeof result)["document"] = {} as NarrowedModel;
      const a2: NarrowedModel = {} as (typeof result)["document"];
      // @ts-ignore
      const b = result.document.c;
      suppressUnusedWarning.push(a1);
      suppressUnusedWarning.push(a2);
      suppressUnusedWarning.push(b);
    }
    return suppressUnusedWarning;
  };
  async () => {
    const select1 = await client.search("New", {
      searchFields: select,
    });
    const select2 = await client.search("New", {
      searchFields: selectNarrowed,
    });
    const select3 = await client.search("New", {
      searchFields: ["key", "a", "b/a", "d/b"],
    });

    const suppressUnusedWarning: any[] = [];

    for await (const result of select1.results) {
      const a: Equals<(typeof result)["document"], Model> = "pass";
      suppressUnusedWarning.push(a);
    }
    for await (const result of select2.results) {
      const a: Equals<(typeof result)["document"], Model> = "pass";
      suppressUnusedWarning.push(a);
    }
    for await (const result of select3.results) {
      const a: Equals<(typeof result)["document"], Model> = "pass";
      suppressUnusedWarning.push(a);
    }
    return suppressUnusedWarning;
  };
  async () => {
    const select1 = await client.search("New", {
      select,
      searchFields: select,
    });
    const select2 = await client.search("New", {
      select: selectNarrowed,
      searchFields: selectNarrowed,
    });
    const select3 = await client.search("New", {
      select: ["key", "a", "b/a", "d/b"],
      searchFields: ["key", "a", "b/a", "d/b"],
    });

    const suppressUnusedWarning: any[] = [];

    for await (const result of select1.results) {
      const a: Equals<(typeof result)["document"], Model> = "pass";
      suppressUnusedWarning.push(a);
    }
    for await (const result of select2.results) {
      const a1: (typeof result)["document"] = {} as NarrowedModel;
      const a2: NarrowedModel = {} as (typeof result)["document"];
      // @ts-ignore
      const b = result.document.c;
      suppressUnusedWarning.push(a1);
      suppressUnusedWarning.push(a2);
      suppressUnusedWarning.push(b);
    }
    for await (const result of select3.results) {
      const a1: (typeof result)["document"] = {} as NarrowedModel;
      const a2: NarrowedModel = {} as (typeof result)["document"];
      // @ts-ignore
      const b = result.document.c;
      suppressUnusedWarning.push(a1);
      suppressUnusedWarning.push(a2);
      suppressUnusedWarning.push(b);
    }
    return suppressUnusedWarning;
  };
}

// @ts-ignore
function testWideClient() {
  const client = new SearchClient("azure", "sdk", "js" as any, {});

  const select: string[] = ["key", "a", "b/a", "d/b"];
  const selectNarrowed = ["key", "a", "b/a", "d/b"] as const;

  async () => {
    const suggest = await client.suggest("", "", {});
    for await (const result of suggest.results) {
      const a: Equals<(typeof result)["document"], object> = "pass";
      return a;
    }
  };

  async () => {
    const select1 = await client.search("New", {
      select,
    });
    const select2 = await client.search("New", {
      select: selectNarrowed,
    });
    const select3 = await client.search("New", {
      select: ["key", "a", "b/a", "d/b"],
    });

    const suppressUnusedWarning: any[] = [];

    for await (const result of select1.results) {
      const a: Equals<(typeof result)["document"], object> = "pass";
      suppressUnusedWarning.push(a);
    }
    for await (const result of select2.results) {
      const a: Equals<(typeof result)["document"], object> = "pass";
      suppressUnusedWarning.push(a);
    }
    for await (const result of select3.results) {
      const a: Equals<(typeof result)["document"], object> = "pass";
      suppressUnusedWarning.push(a);
    }
  };
  async () => {
    const select1 = await client.search("New", {
      searchFields: select,
    });
    const select2 = await client.search("New", {
      searchFields: selectNarrowed,
    });
    const select3 = await client.search("New", {
      searchFields: ["key", "a", "b/a", "d/b"],
    });

    const suppressUnusedWarning: any[] = [];

    for await (const result of select1.results) {
      const a: Equals<(typeof result)["document"], object> = "pass";
      suppressUnusedWarning.push(a);
    }
    for await (const result of select2.results) {
      const a: Equals<(typeof result)["document"], object> = "pass";
      suppressUnusedWarning.push(a);
    }
    for await (const result of select3.results) {
      const a: Equals<(typeof result)["document"], object> = "pass";
      suppressUnusedWarning.push(a);
    }
    return suppressUnusedWarning;
  };
  async () => {
    const select1 = await client.search("New", {
      select,
      searchFields: select,
    });
    const select2 = await client.search("New", {
      select: selectNarrowed,
      searchFields: selectNarrowed,
    });
    const select3 = await client.search("New", {
      select: ["key", "a", "b/a", "d/b"],
      searchFields: ["key", "a", "b/a", "d/b"],
    });

    const suppressUnusedWarning: any[] = [];

    for await (const result of select1.results) {
      const a: Equals<(typeof result)["document"], object> = "pass";
      suppressUnusedWarning.push(a);
    }
    for await (const result of select2.results) {
      const a: Equals<(typeof result)["document"], object> = "pass";
      suppressUnusedWarning.push(a);
    }
    for await (const result of select3.results) {
      const a: Equals<(typeof result)["document"], object> = "pass";
      suppressUnusedWarning.push(a);
    }
    return suppressUnusedWarning;
  };
}

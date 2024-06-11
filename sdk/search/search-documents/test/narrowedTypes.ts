// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { SearchClient, SelectFields } from "../src/index";
import {
  NarrowedModel as GenericNarrowedModel,
  SearchFieldArray,
  SearchPick,
  SelectArray,
  SuggestNarrowedModel,
} from "../src/indexModels";

type Equals<T1, T2> =
  (<T>() => T extends T1 ? true : false) extends <T>() => T extends T2 ? true : false ? any : never;

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

// @ts-expect-error
function testSelectFields() {
  // SelectFields<T> where T has properties should be T,
  // otherwise string
  const a: Equals<SelectFields<never>, string> = "pass";
  const b: Equals<SelectFields<any>, string> = "pass";
  const c: Equals<SelectFields<object>, string> = "pass";
  const d: Equals<SelectFields<Model>, ModelFields> = "pass";

  // SelectFields<unknown> should be an error, as unknown should be cast
  // @ts-expect-error
  const e: Equals<SelectFields<unknown>, string> = "fail";

  return [a, b, c, d, e];
}

// @ts-expect-error
function testSearchPick() {
  // SearchPick<Model, Fields> should be Model when Fields is not a strict subset of
  // SelectFields<Model>
  const a: Equals<SearchPick<object, never>, object> = "pass";
  const b: Equals<SearchPick<Model, any>, Model> = "pass";
  const c: Equals<SearchPick<Model, never>, Model> = "pass";
  const d1: Model = {} as SearchPick<Model, ModelFields>;
  const d2: SearchPick<Model, ModelFields> = {} as Model;
  // SearchPick should correctly narrow the model to the specified fields
  const e1: NarrowedModel = {} as SearchPick<Model, NarrowedModelFields>;
  const e2: SearchPick<Model, NarrowedModelFields> = {} as NarrowedModel;

  // A narrowed model should be assignable to the base model type
  const f: Model = {} as SearchPick<Model, NarrowedModelFields>;

  // If the model has unknown properties, SearchPick should yield the object type
  const g: Equals<SearchPick<object, any>, object> = "pass";
  const h: Equals<SearchPick<object, string>, object> = "pass";
  const i: Equals<SearchPick<object, ModelFields>, object> = "pass";

  // SearchPick should reject the string type when using a model with known properties
  // Ideally, this would just yield the model type, but we haven't found a way to make that happen
  // without losing the type inference that powers the IntelliSense behavior we want.
  // @ts-expect-error
  const j: Equals<SearchPick<Model, string>, Model> = "fail";
  // @ts-expect-error
  const k: Equals<SearchPick<Model, unknown>, Model> = "fail";

  return [a, b, c, d1, d2, e1, e2, f, g, h, i, j, k];
}

// @ts-expect-error
function testNarrowedModel() {
  const a1: GenericNarrowedModel<Model, NarrowedModelFields> = {} as NarrowedModel;
  const a2: NarrowedModel = {} as GenericNarrowedModel<Model, NarrowedModelFields>;

  // Narrowing the never type should yield never
  const b: Equals<GenericNarrowedModel<never, never>, never> = "pass";
  const c: Equals<GenericNarrowedModel<never, any>, never> = "pass";
  const d: Equals<GenericNarrowedModel<never, string>, never> = "pass";
  const e: Equals<GenericNarrowedModel<never, NarrowedModelFields>, never> = "pass";
  // Narrowing the object type should yield object
  const f: Equals<GenericNarrowedModel<object, never>, object> = "pass";
  const g: Equals<GenericNarrowedModel<object, any>, object> = "pass";
  const h: Equals<GenericNarrowedModel<object, string>, object> = "pass";
  const i: Equals<GenericNarrowedModel<object, NarrowedModelFields>, object> = "pass";
  // Narrowing a model with never fields implies an empty array was used to select fields,
  // so either never or an empty object are sensible. We're rolling with never since that behavior
  // is less likely to break if we find a convincing reason to change it.
  const j: Equals<GenericNarrowedModel<Model, never>, never> = "pass";

  // Narrowing a model with any fields should yield the model itself
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
  // SuggestNarrowedModel is the same story as above, but this never case corresponds to the
  // default behavior of the service, which is to return only the document key. To this end,
  // SuggestNarrowedModel with never fields yields an interface with only the non-null properties
  // of the model.
  const u: Equals<SuggestNarrowedModel<Model, never>, { key?: string }> = "pass";
  const v: Equals<SuggestNarrowedModel<Model, any>, Model> = "pass";

  // Passing unknown or string as fields are type errors
  // @ts-expect-error
  const w: Equals<GenericNarrowedModel<object, unknown>, object> = "fail";
  // @ts-expect-error
  const x: Equals<GenericNarrowedModel<never, unknown>, never> = "fail";
  // @ts-expect-error
  const y: Equals<GenericNarrowedModel<Model, unknown>, Model> = "fail";
  // @ts-expect-error
  const z: Equals<GenericNarrowedModel<Model, string>, Model> = "fail";

  // @ts-expect-error
  const aa: Equals<SuggestNarrowedModel<never, unknown>, never> = "fail";
  // @ts-expect-error
  const ab: Equals<SuggestNarrowedModel<object, unknown>, object> = "fail";
  // @ts-expect-error
  const ac: Equals<SuggestNarrowedModel<Model, unknown>, Model> = "fail";
  // @ts-expect-error
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

// @ts-expect-error
function testSelectArray() {
  const a: Equals<SelectArray<never>, readonly string[]> = "pass";
  const b: Equals<SelectArray<"field1">, readonly "field1"[]> = "pass";
  const c: Equals<SelectArray<"field1" | "field2">, readonly ("field1" | "field2")[]> = "pass";

  // @ts-expect-error
  const d: Equals<SelectArray<any>, readonly string[]> = "fail";
  // @ts-expect-error
  const e: Equals<SelectArray<unknown>, readonly string[]> = "fail";
  return [a, b, c, d, e];
}

// @ts-expect-error
function testSearchFieldArray() {
  const a: Equals<SearchFieldArray<object>, readonly string[]> = "pass";
  const b: Equals<SearchFieldArray<Model>, readonly ModelFields[]> = "pass";
  const c: Equals<SearchFieldArray<never>, readonly string[]> = "pass";
  const d: Equals<SearchFieldArray<any>, readonly string[]> = "pass";

  // @ts-expect-error
  const e: Equals<SearchFieldArray<unknown>, readonly string[]> = "pass";

  return [a, b, c, d, e];
}

// @ts-expect-error
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
      // @ts-expect-error
      const b = result.document.a;
      return [a, b];
    }
    return;
  };

  async () => {
    type VectorFields = NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<Parameters<(typeof client)["search"]>[1]>["vectorSearchOptions"]
        >["queries"]
      >[number]["fields"]
    >;
    const a: Equals<VectorFields, readonly ModelFields[]> = "pass";
    return a;
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
      // @ts-expect-error
      const b = result.document.c;
      suppressUnusedWarning.push(a1);
      suppressUnusedWarning.push(a2);
      suppressUnusedWarning.push(b);
    }
    for await (const result of select3.results) {
      const a1: (typeof result)["document"] = {} as NarrowedModel;
      const a2: NarrowedModel = {} as (typeof result)["document"];
      // @ts-expect-error
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
      // @ts-expect-error
      const b = result.document.c;
      suppressUnusedWarning.push(a1);
      suppressUnusedWarning.push(a2);
      suppressUnusedWarning.push(b);
    }
    for await (const result of select3.results) {
      const a1: (typeof result)["document"] = {} as NarrowedModel;
      const a2: NarrowedModel = {} as (typeof result)["document"];
      // @ts-expect-error
      const b = result.document.c;
      suppressUnusedWarning.push(a1);
      suppressUnusedWarning.push(a2);
      suppressUnusedWarning.push(b);
    }
    return suppressUnusedWarning;
  };
}

// @ts-expect-error
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
    type VectorFields = NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<Parameters<(typeof client)["search"]>[1]>["vectorSearchOptions"]
        >["queries"]
      >[number]["fields"]
    >;
    const a: Equals<VectorFields, readonly string[]> = "pass";
    return a;
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

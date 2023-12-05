// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { SearchClient, SelectFields } from "../src/index";
import {
  SearchFieldArray,
  SearchPick,
  SelectArray,
  NarrowedModel as GenericNarrowedModel,
  SuggestNarrowedModel,
} from "../src/indexModels";
import { testType } from "type-plus";

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
  testType.equal<SelectFields<never>, string>(true);
  testType.equal<SelectFields<any>, string>(true);
  testType.equal<SelectFields<object>, string>(true);
  testType.equal<SelectFields<Model>, ModelFields>(true);

  // SelectFields<unknown> should be an error, as unknown should be cast
  // @ts-expect-error
  type T = SelectFields<unknown>;
}

// @ts-expect-error
function testSearchPick() {
  // SearchPick<Model, Fields> should be Model when Fields is not a strict subset of
  // SelectFields<Model>
  testType.equal<SearchPick<object, never>, object>(true);
  testType.equal<SearchPick<Model, any>, Model>(true);
  testType.equal<SearchPick<Model, never>, Model>(true);

  // SearchPick<Model, Fields> should be Model when Fields is exactly SelectFields<Model>
  testType.equal<SearchPick<Model, ModelFields>, Model>(true);
  // SearchPick should correctly narrow the model to the specified fields
  testType.equal<SearchPick<Model, NarrowedModelFields>, NarrowedModel>(true);

  // A narrowed model should be assignable to the base model type
  testType.canAssign<SearchPick<Model, NarrowedModelFields>, Model>(true);

  // If the model has unknown properties, SearchPick should yield the object type
  testType.equal<SearchPick<object, any>, object>(true);
  testType.equal<SearchPick<object, string>, object>(true);
  testType.equal<SearchPick<object, ModelFields>, object>(true);

  // SearchPick should reject the string type when using a model with known properties
  // Ideally, this would just yield the model type, but we haven't found a way to make that happen
  // without losing the type inference that powers the LSP completion behavior we want.
  // @ts-expect-error
  type T = SearchPick<Model, string>;
  // @ts-expect-error
  type U = SearchPick<Model, string>;
}

// @ts-expect-error
function testNarrowedModel() {
  testType.equal<GenericNarrowedModel<Model, NarrowedModelFields>, NarrowedModel>(true);

  // Narrowing the never type should yield never
  testType.equal<GenericNarrowedModel<never, never>, never>(true);
  testType.equal<GenericNarrowedModel<never, any>, never>(true);
  testType.equal<GenericNarrowedModel<never, string>, never>(true);
  testType.equal<GenericNarrowedModel<never, NarrowedModelFields>, never>(true);
  // Narrowing the object type should yield object
  testType.equal<GenericNarrowedModel<object, never>, object>(true);
  testType.equal<GenericNarrowedModel<object, any>, object>(true);
  testType.equal<GenericNarrowedModel<object, string>, object>(true);
  testType.equal<GenericNarrowedModel<object, NarrowedModelFields>, object>(true);
  // Narrowing a model with never fields implies an empty array was used to select fields,
  // so either never or an empty object are sensible. We're rolling with never since that behavior
  // is less likely to break if we find a convincing reason to change it.
  testType.equal<GenericNarrowedModel<Model, never>, never>(true);

  // Narrowing a model with any fields should yield the model itself
  testType.equal<GenericNarrowedModel<Model, any>, Model>(true);

  testType.equal<SuggestNarrowedModel<Model, NarrowedModelFields>, NarrowedModel>(true);

  testType.equal<SuggestNarrowedModel<never, never>, never>(true);
  testType.equal<SuggestNarrowedModel<never, any>, never>(true);

  testType.equal<SuggestNarrowedModel<never, string>, never>(true);
  testType.equal<SuggestNarrowedModel<never, NarrowedModelFields>, never>(true);
  testType.equal<SuggestNarrowedModel<object, never>, object>(true);
  testType.equal<SuggestNarrowedModel<object, any>, object>(true);
  testType.equal<SuggestNarrowedModel<object, string>, object>(true);
  testType.equal<SuggestNarrowedModel<object, NarrowedModelFields>, object>(true);
  // SuggestNarrowedModel is the same story as above, but this never case corresponds to the
  // default behavior of the service, which is to return only the document key. To this end,
  // SuggestNarrowedModel with never fields yields an interface with only the non-null properties
  // of the model.
  testType.equal<SuggestNarrowedModel<Model, never>, { key?: string }>(true);
  testType.equal<SuggestNarrowedModel<Model, any>, Model>(true);

  // Passing unknown or string as fields are type errors
  // @ts-expect-error
  type A = GenericNarrowedModel<object, unknown>;
  // @ts-expect-error
  type B = GenericNarrowedModel<never, unknown>;
  // @ts-expect-error
  type C = GenericNarrowedModel<Model, unknown>;
  // @ts-expect-error
  type D = GenericNarrowedModel<Model, string>;

  // @ts-expect-error
  type E = SuggestNarrowedModel<never, unknown>;
  // @ts-expect-error
  type F = SuggestNarrowedModel<object, unknown>;
  // @ts-expect-error
  type G = SuggestNarrowedModel<Model, unknown>;
  // @ts-expect-error
  type H = SuggestNarrowedModel<Model, string>;
}

// @ts-expect-error
function testSelectArray() {
  testType.equal<SelectArray<never>, readonly string[]>(true);
  testType.equal<SelectArray<"field1">, readonly "field1"[]>(true);
  testType.equal<SelectArray<"field1" | "field2">, readonly ("field1" | "field2")[]>(true);

  testType.equal<SelectArray<any>, readonly string[]>(false);
  testType.equal<SelectArray<unknown>, readonly string[]>(false);
}

// @ts-expect-error
function testSearchFieldArray() {
  testType.equal<SearchFieldArray<object>, readonly string[]>(true);
  testType.equal<SearchFieldArray<Model>, readonly ModelFields[]>(true);
  testType.equal<SearchFieldArray<never>, readonly string[]>(true);
  testType.equal<SearchFieldArray<any>, readonly string[]>(true);

  // @ts-expect-error
  type T = SearchFieldArray<unknown>;
}

// @ts-expect-error
function testNarrowedClient() {
  const client = new SearchClient<Model>("azure", "sdk", "js" as any, {});

  const select: SelectFields<Model>[] = ["key", "a", "b/a", "d/b"];
  const selectNarrowed = ["key", "a", "b/a", "d/b"] as const;

  async () => {
    const suggest = await client.suggest("", "", {});
    for await (const result of suggest.results) {
      testType.equal<(typeof result)["document"], { key?: string }>(true);
      return;
    }
    return;
  };

  async () => {
    const suggest = await client.suggest("", "", { select: selectNarrowed });
    for await (const result of suggest.results) {
      testType.equal<(typeof result)["document"], NarrowedModel>(true);
      return;
    }
    return;
  };

  async () => {
    const searchOptions = {} as Parameters<(typeof client)["search"]>[1];
    const vectorFields = searchOptions?.vectorSearchOptions?.queries[0].fields;
    type VectorFields = NonNullable<typeof vectorFields>;
    testType.equal<VectorFields, readonly ModelFields[]>(true);
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

    for await (const result of select1.results) {
      testType.equal<(typeof result)["document"], Model>(true);
    }
    for await (const result of select2.results) {
      testType.equal<(typeof result)["document"], NarrowedModel>(true);
    }
    for await (const result of select3.results) {
      testType.equal<(typeof result)["document"], NarrowedModel>(true);
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

    for await (const result of select1.results) {
      testType.equal<(typeof result)["document"], Model>(true);
    }
    for await (const result of select2.results) {
      testType.equal<(typeof result)["document"], Model>(true);
    }
    for await (const result of select3.results) {
      testType.equal<(typeof result)["document"], Model>(true);
    }
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

    for await (const result of select1.results) {
      testType.equal<(typeof result)["document"], Model>(true);
    }
    for await (const result of select2.results) {
      testType.equal<(typeof result)["document"], NarrowedModel>(true);
    }
    for await (const result of select3.results) {
      testType.equal<(typeof result)["document"], NarrowedModel>(true);
    }
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
      testType.equal<(typeof result)["document"], object>(true);
    }
  };

  async () => {
    const suggest = await client.suggest("", "", { select: selectNarrowed });
    for await (const result of suggest.results) {
      testType.equal<(typeof result)["document"], object>(true);
      return;
    }
    return;
  };

  async () => {
    const searchOptions = {} as Parameters<(typeof client)["search"]>[1];
    const vectorFields = searchOptions?.vectorSearchOptions?.queries[0].fields;
    type VectorFields = NonNullable<typeof vectorFields>;
    testType.equal<VectorFields, readonly string[]>(true);
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

    for await (const result of select1.results) {
      testType.equal<(typeof result)["document"], object>(true);
    }
    for await (const result of select2.results) {
      testType.equal<(typeof result)["document"], object>(true);
    }
    for await (const result of select3.results) {
      testType.equal<(typeof result)["document"], object>(true);
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

    for await (const result of select1.results) {
      testType.equal<(typeof result)["document"], object>(true);
    }
    for await (const result of select2.results) {
      testType.equal<(typeof result)["document"], object>(true);
    }
    for await (const result of select3.results) {
      testType.equal<(typeof result)["document"], object>(true);
    }
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

    for await (const result of select1.results) {
      testType.equal<(typeof result)["document"], object>(true);
    }
    for await (const result of select2.results) {
      testType.equal<(typeof result)["document"], object>(true);
    }
    for await (const result of select3.results) {
      testType.equal<(typeof result)["document"], object>(true);
    }
  };
}

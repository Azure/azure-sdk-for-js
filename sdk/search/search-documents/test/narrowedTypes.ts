// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */


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

// @ts-expect-error

// @ts-expect-error

// @ts-expect-error

// @ts-expect-error

// @ts-expect-error

// @ts-expect-error

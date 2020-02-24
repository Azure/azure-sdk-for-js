// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export type SomeRequired<T, K extends keyof T> = {
  [P in K]-?: T[P];
};

export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
  ? U
  : never;

export type ReplaceProperties<T, From, To> = {
  [K in keyof T]: K extends keyof From
    ? T[K] extends From[K]
      ? K extends keyof To
        ? To[K]
    : T[K]
  : T[K]
  : T[K];
};

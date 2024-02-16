// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}`
  ? `${Lowercase<P1>}${Capitalize<CamelCase<P2>>}`
  : Lowercase<S>;
type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${SnakeCase<U>}`
  : S;

type MapCamelCaseKeysOverCollections<T> =
  T extends Array<infer X> ? Array<MapCamelCaseKeysOverCollections<X>> : CamelCaseKeys<T>;
type MapSnakeCaseKeysOverCollections<T> =
  T extends Array<infer X>
    ? Array<MapSnakeCaseKeysOverCollections<X>>
    : // : T extends (infer X | infer Y)
      // ? MapSnakeCaseKeysOverCollections<X> | MapSnakeCaseKeysOverCollections<Y>
      SnakeCaseKeys<T>;
type CamelCaseKeys<T> = {
  [K in keyof T as CamelCase<K & string>]: MapCamelCaseKeysOverCollections<T[K]>;
};
export type SnakeCaseKeys<T> = {
  [K in keyof T as SnakeCase<K & string>]: MapSnakeCaseKeysOverCollections<T[K]>;
};

export function wrapError<T>(f: () => T, message: string): T {
  try {
    const result = f();
    return result;
  } catch (cause) {
    throw new Error(`${message}: ${cause}`, { cause });
  }
}

export function camelCaseKeys<O extends Record<string, any>>(obj: O): CamelCaseKeys<O> {
  if (typeof obj !== "object" || !obj) return obj;
  if (Array.isArray(obj)) {
    return obj.map((v) =>
      camelCaseKeys<O extends Array<infer X> ? (X extends Record<string, any> ? X : never) : never>(
        v,
      ),
    ) as CamelCaseKeys<O>;
  } else {
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      const newKey = tocamelCase(key);
      if (newKey !== key) {
        delete obj[key];
      }
      (obj[newKey] as Record<string, any>) =
        typeof obj[newKey] === "object" ? camelCaseKeys(value) : value;
    }
    return obj;
  }
}

export function snakeCaseKeys<O extends Record<string, any>>(obj: O): SnakeCaseKeys<O> {
  if (typeof obj !== "object" || !obj) return obj;
  if (Array.isArray(obj)) {
    return obj.map((v) =>
      snakeCaseKeys<O extends Array<infer X> ? (X extends Record<string, any> ? X : never) : never>(
        v,
      ),
    ) as SnakeCaseKeys<O>;
  } else {
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      const newKey = toSnakeCase(key);
      if (newKey !== key) {
        delete obj[key];
      }
      (obj[newKey] as Record<string, any>) =
        typeof obj[newKey] === "object" ? snakeCaseKeys(value) : value;
    }
    return obj;
  }
}

function tocamelCase<P extends string>(str: P): CamelCase<P> {
  return str
    .toLowerCase()
    .replace(/([_][a-z])/g, (group) => group.toUpperCase().replace("_", "")) as CamelCase<P>;
}

function toSnakeCase<P extends string>(str: P): SnakeCase<P> {
  return str
    .replace(/([A-Z])/g, (group) => `_${group.toLowerCase()}`)
    .replace(/^_/, "") as SnakeCase<P>;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export const isDefined = <T extends Record<string, any>, V extends Array<keyof T>>(
  obj: T,
  props: V
): WithRequired<T, V[number]> => {
  for (const prop of props) {
    if (obj[prop] === undefined) {
      throw new Error(`Expected ${String(prop)} to be present`);
    }
  }

  return obj as WithRequired<T, V[number]>;
};

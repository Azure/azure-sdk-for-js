// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// return undefined if the response has 404 code
export async function undefinedfyOn404<T>(c: Promise<T>): Promise<T | undefined> {
  try {
    const r = await c;
    return r;
  } catch (e) {
    if (typeof e === "object" && (e as { statusCode: number })?.statusCode === 404) {
      return undefined;
    }
    throw e;
  }
}

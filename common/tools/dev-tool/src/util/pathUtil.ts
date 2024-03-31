// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import path from "node:path";

function toPosixWrapper<T extends (...args: any[]) => any>(f: T): T {
  const wrapped = (...args: Parameters<T>): ReturnType<T> => {
    const newArgs = args.map((arg: any) =>
      typeof arg === "string" ? arg.replace(/\\/g, "/") : arg,
    ) as Parameters<T>;
    const fixedOutput = f(...newArgs);

    if (typeof fixedOutput === "string") {
      return fixedOutput.replace(/\\/g, "/") as ReturnType<T>;
    }

    if (typeof fixedOutput === "object") {
      // node path doesn't need this to be deeply recursive
      Object.keys(fixedOutput).forEach(([key, value]) => {
        if (typeof value === "string") {
          fixedOutput[key] = value.replace(/\\/g, "/");
        }
      });
    }

    return fixedOutput;
  };
  return wrapped as T;
}

const posixPath: path.PlatformPath = { ...path };
(Object.keys(path) as Array<keyof path.PlatformPath>).forEach((key) => {
  const value = posixPath[key];
  if (typeof value === "function") {
    const wrapped: typeof value = toPosixWrapper(value);
    (posixPath[key] as typeof value) = wrapped;
  }
});

export default posixPath;

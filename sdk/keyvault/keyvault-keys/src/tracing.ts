// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import { createSpanFunction, OperationTracingOptions } from "@azure/core-tracing";
import { Span } from "@opentelemetry/api";

/*
 * @internal
 */
export const createSpan: <T extends {
  tracingOptions?: OperationTracingOptions | undefined;
}>(
  operationName: string,
  operationOptions: T | undefined
) => {
  span: Span;
  updatedOptions: T;
} = createSpanFunction({
  packagePrefix: "KeyClient",
  namespace: "Microsoft.KeyVault"
});

export function instrument(obj: any, excludeList: string[] = []): void {
  // throw if obj not a class (or narrow the types)
  // Try to find the name of the object, via metadata or other means, so you can set up tracing options
  const proto = obj.prototype;
  for (let property of Object.getOwnPropertyNames(proto)) {
    if (typeof proto[property] === "function" && !excludeList.includes(property)) {
      proto[property] = instrumentFn(obj.name, proto[property]);
    }
  }
}

export function instrumentFn<T extends (...args: any[]) => any>(
  objName: string,
  func: T
): (...funcArgs: Parameters<T>) => Promise<ReturnType<T>> {
  function isOperationOptions(arg: any): arg is OperationOptions {
    if (
      typeof arg === "object" &&
      ("abortSignal" in arg || "requestOptions" in arg || "tracingOptions" in arg)
    ) {
      return true;
    }
    return false;
  }

  const spliceOptions = (args: Parameters<T>[]) => {
    const rest = [];
    let options: OperationOptions = {};

    for (let arg of args) {
      if (isOperationOptions(arg)) {
        options = arg;
      } else {
        rest.push(arg);
      }
    }

    return { options, rest };
  };

  return function(...args: Parameters<T>): ReturnType<T> {
    const { options, rest } = spliceOptions(args);
    const { span, updatedOptions } = createSpan(`${objName}-${func.name}`, options);
    try {
      let returnVal: ReturnType<T>;
      returnVal = func(...rest, updatedOptions);
      return returnVal;
    } finally {
      span.end();
    }
  };
}

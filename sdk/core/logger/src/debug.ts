// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { log } from "./log";

export interface Debug {
  (namespace: string): Debugger;
  log: (...args: any[]) => void;
  enable: (namespaces: string) => void;
  enabled: (namespace: string) => void;
  disable: () => string;
}

export interface Debugger {
  (...args: any[]): void;
  enabled: boolean;
  destroy: () => boolean;
  log: (...args: any[]) => void;
  namespace: string;
  extend: (namespace: string) => Debugger;
}

const debugEnvVariable =
  (typeof process !== "undefined" && process.env && process.env.DEBUG) || undefined;

let enabledNamespaces: string[] = [];
const debuggers: Debugger[] = [];

if (debugEnvVariable) {
  enable(debugEnvVariable);
}

function enable(namespaces: string): void {
  // TODO: support wildcard (*) and skip (-) syntax
  enabledNamespaces = namespaces.split(",");
  for (const instance of debuggers) {
    instance.enabled = enabled(instance.namespace);
  }
}

function enabled(namespace: string): boolean {
  for (const ns of enabledNamespaces) {
    if (ns === namespace) {
      return true;
    }
  }
  return false;
}

function disable(): string {
  const result = enabledNamespaces.join(",");
  enable("");
  return result;
}

function createDebugger(namespace: string): Debugger {
  function debug(...args: any[]) {
    if (!newDebugger.enabled) {
      return;
    }
    newDebugger.log(...args);
  }

  const newDebugger: Debugger = Object.assign(debug, {
    enabled: enabled(namespace),
    destroy,
    log: debugObj.log,
    namespace,
    extend
  });

  debuggers.push(newDebugger);

  return newDebugger;
}

function destroy(this: Debugger): boolean {
  const index = debuggers.indexOf(this);
  if (index >= 0) {
    debuggers.splice(index, 1);
    return true;
  }
  return false;
}

function extend(this: Debugger, namespace: string): Debugger {
  const newDebugger = createDebugger(`${this.namespace}:${namespace}`);
  newDebugger.log = this.log;
  return newDebugger;
}

const debugObj: Debug = Object.assign(
  (namespace: string): Debugger => {
    return createDebugger(namespace);
  },
  {
    enable,
    enabled,
    disable,
    log
  }
);

export default debugObj;

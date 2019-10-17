// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { log } from "./log";

/**
 * A simple mechanism for enabling logging.
 * Intended to mimic the publicly available `debug` package.
 */
export interface Debug {
  /**
   * Creates a new logger with the given namespace.
   */
  (namespace: string): Debugger;
  /**
   * The default log method (defaults to console)
   */
  log: (...args: any[]) => void;
  /**
   * Enables a particular set of namespaces.
   * To enable multiple separate them with commas, e.g. "info,debug".
   * Supports wildcards, e.g. "azure:*"
   * Supports skip syntax, e.g. "azure:*,-azure:storage:*" will enable
   * everything under azure except for things under azure:storage.
   */
  enable: (namespaces: string) => void;
  /**
   * Checks if a particular namespace is enabled.
   */
  enabled: (namespace: string) => boolean;
  /**
   * Disables all logging, returns what was previously enabled.
   */
  disable: () => string;
}

/**
 * A log function that can be dynamically enabled and redirected.
 */
export interface Debugger {
  /**
   * Logs the given arguments to the `log` method.
   */
  (...args: any[]): void;
  /**
   * True if this logger is active and logging.
   */
  enabled: boolean;
  /**
   * Used to cleanup/remove this logger.
   */
  destroy: () => boolean;
  /**
   * The current log method. Can be overridden to redirect output.
   */
  log: (...args: any[]) => void;
  /**
   * The namespace of this logger.
   */
  namespace: string;
  /**
   * Extends this logger with a child namespace.
   * Namespaces are separated with a ':' character.
   */
  extend: (namespace: string) => Debugger;
}

const debugEnvVariable =
  (typeof process !== "undefined" && process.env && process.env.DEBUG) || undefined;

let enabledString: string | undefined;
let enabledNamespaces: RegExp[] = [];
let skippedNamespaces: RegExp[] = [];
const debuggers: Debugger[] = [];

if (debugEnvVariable) {
  enable(debugEnvVariable);
}

function enable(namespaces: string): void {
  enabledString = namespaces;
  enabledNamespaces = [];
  skippedNamespaces = [];
  const wildcard = /\*/g;
  const namespaceList = namespaces.split(",").map((ns) => ns.trim().replace(wildcard, ".*?"));
  for (const ns of namespaceList) {
    if (ns.startsWith("-")) {
      skippedNamespaces.push(new RegExp(`^${ns.substr(1)}$`));
    } else {
      enabledNamespaces.push(new RegExp(`^${ns}$`));
    }
  }
  for (const instance of debuggers) {
    instance.enabled = enabled(instance.namespace);
  }
}

function enabled(namespace: string): boolean {
  if (namespace.endsWith("*")) {
    return true;
  }

  for (const skipped of skippedNamespaces) {
    if (skipped.test(namespace)) {
      return false;
    }
  }
  for (const enabled of enabledNamespaces) {
    if (enabled.test(namespace)) {
      return true;
    }
  }
  return false;
}

function disable(): string {
  const result = enabledString || "";
  enable("");
  return result;
}

function createDebugger(namespace: string): Debugger {
  function debug(...args: any[]) {
    if (!newDebugger.enabled) {
      return;
    }
    if (args.length > 0) {
      args[0] = `${namespace} ${args[0]}`;
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

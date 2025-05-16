// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { log } from "./log.js";

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
   * Supports wildcards, e.g. "typeSpecRuntime:*"
   * Supports skip syntax, e.g. "typeSpecRuntime:*,-typeSpecRuntime:storage:*" will enable
   * everything under typeSpecRuntime except for things under typeSpecRuntime:storage.
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
let enabledNamespaces: string[] = [];
let skippedNamespaces: string[] = [];
const debuggers: Debugger[] = [];

if (debugEnvVariable) {
  enable(debugEnvVariable);
}

const debugObj: Debug = Object.assign(
  (namespace: string): Debugger => {
    return createDebugger(namespace);
  },
  {
    enable,
    enabled,
    disable,
    log,
  },
);

function enable(namespaces: string): void {
  enabledString = namespaces;
  enabledNamespaces = [];
  skippedNamespaces = [];
  const namespaceList = namespaces.split(",").map((ns) => ns.trim());
  for (const ns of namespaceList) {
    if (ns.startsWith("-")) {
      skippedNamespaces.push(ns.substring(1));
    } else {
      enabledNamespaces.push(ns);
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
    if (namespaceMatches(namespace, skipped)) {
      return false;
    }
  }
  for (const enabledNamespace of enabledNamespaces) {
    if (namespaceMatches(namespace, enabledNamespace)) {
      return true;
    }
  }
  return false;
}

/**
 * Given a namespace, check if it matches a pattern.
 * Patterns only have a single wildcard character which is *.
 * The behavior of * is that it matches zero or more other characters.
 */
function namespaceMatches(namespace: string, pattern: string): boolean {
  let namespaceIndex = 0;
  let patternIndex = 0;
  const patternLength = pattern.length;
  const namespaceLength = namespace.length;
  let lastWildcard = -1;
  let lastWildcardNamespace = -1;

  while (namespaceIndex < namespaceLength && patternIndex < patternLength) {
    if (pattern[patternIndex] === "*") {
      lastWildcard = patternIndex;
      patternIndex++;
      if (patternIndex === patternLength) {
        // if wildcard is the last character, it will match the remaining namespace string
        return true;
      }
      let nextPatternChar = pattern[patternIndex];
      // ignore successive wildcards
      while (nextPatternChar === "*") {
        lastWildcard = patternIndex;
        patternIndex++;
        // this handles patterns that ends in multiple wildcard characters
        if (patternIndex === patternLength) {
          return true;
        }
        nextPatternChar = pattern[patternIndex];
      }

      // now we let the wildcard eat characters until we match the next literal in the pattern
      let nextNamespaceChar = namespace[namespaceIndex];
      while (nextNamespaceChar !== nextPatternChar) {
        namespaceIndex++;
        // reached the end of the namespace without a match
        if (namespaceIndex === namespaceLength) {
          return false;
        }
        nextNamespaceChar = namespace[namespaceIndex];
      }

      // now that we have a match, let's try to continue on
      // however, it's possible we could find a later match
      // so keep a reference in case we have to backtrack
      lastWildcardNamespace = namespaceIndex;
      namespaceIndex++;
      patternIndex++;
      continue;
    } else if (pattern[patternIndex] === namespace[namespaceIndex]) {
      // simple case: literal pattern matches so keep going
      patternIndex++;
      namespaceIndex++;
    } else if (lastWildcard >= 0) {
      // special case: we don't have a literal match, but there is a previous wildcard
      // which we can backtrack to and try having the wildcard eat the match instead
      patternIndex = lastWildcard + 1;
      // we know the last wildcard was not the final character since we handle that in the earlier branch
      const nextPatternChar = pattern[patternIndex];
      namespaceIndex = lastWildcardNamespace + 1;
      // we've reached the end of the namespace without a match
      if (namespaceIndex === namespaceLength) {
        return false;
      }
      let nextNamespaceChar = namespace[namespaceIndex];
      // similar to the previous logic, let's keep going until we find the next literal match
      while (nextNamespaceChar !== nextPatternChar) {
        namespaceIndex++;
        if (namespaceIndex === namespaceLength) {
          return false;
        }
        nextNamespaceChar = namespace[namespaceIndex];
      }
      lastWildcardNamespace = namespaceIndex;
      namespaceIndex++;
      patternIndex++;
      continue;
    } else {
      return false;
    }
  }

  const namespaceDone = namespaceIndex === namespace.length;
  const patternDone = patternIndex === pattern.length;
  // this is to detect the case of an unneeded final wildcard
  // e.g. the pattern `ab*` should match the string `ab`
  const trailingWildCard = patternIndex === pattern.length - 1 && pattern[patternIndex] === "*";
  return namespaceDone && (patternDone || trailingWildCard);
}

function disable(): string {
  const result = enabledString || "";
  enable("");
  return result;
}

function createDebugger(namespace: string): Debugger {
  const newDebugger: Debugger = Object.assign(debug, {
    enabled: enabled(namespace),
    destroy,
    log: debugObj.log,
    namespace,
    extend,
  });

  function debug(...args: any[]): void {
    if (!newDebugger.enabled) {
      return;
    }
    if (args.length > 0) {
      args[0] = `${namespace} ${args[0]}`;
    }
    newDebugger.log(...args);
  }

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

export default debugObj;

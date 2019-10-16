export interface Debug {
  (namespace: string): Debugger;
  log: (...args: any[]) => any;
  enable: (namespaces: string) => void;
  enabled: (namespace: string) => void;
  disable: () => string;
}

export interface Debugger {
  (...args: any[]): void;
  enabled: boolean;
  log: (...args: any[]) => any;
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

function log(...args: any[]): any {
  // TODO: log to the right place!
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
    log,
    namespace,
    extend
  });

  debuggers.push(newDebugger);

  return newDebugger;
}

function extend(this: Debugger, namespace: string): Debugger {
  const newDebugger = createDebugger(`${this.namespace}:${namespace}`);
  newDebugger.log = this.log;
  return newDebugger;
}

export const debug: Debug = Object.assign(
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

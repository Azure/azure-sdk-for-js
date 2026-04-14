// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Node.js built-in modules — comprehensive static fallback set. */
export const NODE_BUILTIN_MODULES_STATIC = new Set([
    "assert", "assert/strict", "async_hooks", "buffer", "child_process",
    "cluster", "console", "constants", "crypto", "dgram",
    "diagnostics_channel", "dns", "dns/promises", "domain", "events",
    "fs", "fs/promises", "http", "http2", "https", "inspector",
    "inspector/promises", "module", "net", "os", "path", "path/posix",
    "path/win32", "perf_hooks", "process", "punycode", "querystring",
    "readline", "readline/promises", "repl", "stream", "stream/consumers",
    "stream/promises", "stream/web", "string_decoder", "sys", "test",
    "timers", "timers/promises", "tls", "trace_events", "tty", "url",
    "util", "util/types", "v8", "vm", "wasi", "worker_threads", "zlib",
]);

/**
 * Lazily-resolved set of built-in module names. Prefers the runtime's own
 * `module.builtinModules` list (always correct for the running Node version)
 * and falls back to the static set when unavailable (e.g., older Node, Bun).
 */
let _resolvedBuiltinModules: Set<string> | undefined;
export function getBuiltinModules(): Set<string> {
    if (_resolvedBuiltinModules) return _resolvedBuiltinModules;
    try {
        // Use dynamic require to avoid ts-morph/bundler issues
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const mod = require("module");
        if (Array.isArray(mod.builtinModules) && mod.builtinModules.length > 0) {
            _resolvedBuiltinModules = new Set(mod.builtinModules as string[]);
            return _resolvedBuiltinModules;
        }
    } catch { /* runtime doesn't expose builtinModules — use static set */ }
    _resolvedBuiltinModules = NODE_BUILTIN_MODULES_STATIC;
    return _resolvedBuiltinModules;
}

export function isNodeBuiltinModule(packageName: string): boolean {
    if (packageName.startsWith("node:")) return true;
    return getBuiltinModules().has(packageName);
}

/**
 * Checks if a package is part of the Node.js runtime.
 * Currently only @types/node is considered a Node.js runtime package.
 */
export function isNodePackage(packageName: string): boolean {
    return packageName === "@types/node" || packageName.startsWith("@types/node/") || isNodeBuiltinModule(packageName);
}

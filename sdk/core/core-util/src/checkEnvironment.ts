// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

declare global {
  interface Window {
    document: unknown;
  }

  interface DedicatedWorkerGlobalScope {
    constructor: {
      name: string;
    };

    importScripts: (...paths: string[]) => void;
  }

  interface Navigator {
    product: string;
  }

  interface DenoGlobal {
    version: {
      deno: string;
    };
  }

  interface BunGlobal {
    version: string;
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-no-window
  const window: Window;
  const self: DedicatedWorkerGlobalScope;
  const Deno: DenoGlobal;
  const Bun: BunGlobal;
  const navigator: Navigator;
}

/**
 * A constant that indicates whether the environment the code is running is a Web Browser.
 */
// eslint-disable-next-line @azure/azure-sdk/ts-no-window
export const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";

/**
 * A constant that indicates whether the environment the code is running is a Web Worker.
 */
export const isWebWorker =
  typeof self === "object" &&
  typeof self?.importScripts === "function" &&
  (self.constructor?.name === "DedicatedWorkerGlobalScope" ||
    self.constructor?.name === "ServiceWorkerGlobalScope" ||
    self.constructor?.name === "SharedWorkerGlobalScope");

/**
 * A constant that indicates whether the environment the code is running is Deno.
 */
export const isDeno =
  typeof Deno !== "undefined" &&
  typeof Deno.version !== "undefined" &&
  typeof Deno.version.deno !== "undefined";

/**
 * A constant that indicates whether the environment the code is running is Node.JS.
 */
export const isNode =
  typeof process !== "undefined" &&
  Boolean(process.version) &&
  Boolean(process.versions?.node) &&
  // Deno thought it was a good idea to spoof process.versions.node, see https://deno.land/std@0.177.0/node/process.ts?s=versions
  !isDeno;

/**
 * A constant that indicates whether the environment the code is running is Bun.sh.
 */
export const isBun = typeof Bun !== "undefined" && typeof Bun.version !== "undefined";

/**
 * A constant that indicates whether the environment the code is running is in React-Native.
 */
// https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Core/setUpNavigator.js
export const isReactNative =
  typeof navigator !== "undefined" && navigator?.product === "ReactNative";

// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict";

import { modelFetcher } from "./modelFetcherHandler";

interface resolverOptions {
  resolveDependencies: "disabled" | "enabled" | "tryFromExpanded";
}

function checkIfTryFromExpanded(options?: resolverOptions): boolean {
  if (options && options.resolveDependencies && options.resolveDependencies === "tryFromExpanded") {
    return true;
  }
  return false;
}

function checkIfResolveDependencies(options?: resolverOptions): boolean {
  if (options && options.resolveDependencies && options.resolveDependencies === "enabled") {
    return true;
  }
  return false;
}

/**
 * resolve - get interfaces (dtdls) associated to a given dtmi
 *
 * @param dtmi code used to label and organize dtdl
 * @param endpoint URL or local path for dtdl repository
 * @param options object containing optional parameters
 *
 * @returns Promise that resolves to mapping of dtmi(s) to JSON dtdl(s)
 */
function resolve(dtmi: string, endpoint: string): Promise<{ [dtmi: string]: any }>;
function resolve(
  dtmi: string,
  endpoint: string,
  options: resolverOptions
): Promise<{ [dtmi: string]: any }>;
function resolve(
  dtmi: string,
  endpoint: string,
  options?: resolverOptions
): Promise<{ [dtmi: string]: any }> {
  const tryFromExpanded = checkIfTryFromExpanded(options);
  const resolveDependencies = checkIfResolveDependencies(options);

  return modelFetcher(dtmi, endpoint, resolveDependencies, tryFromExpanded);
}

export { resolve };

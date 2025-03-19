// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Rewrites a given URL to use the specified base URL.
 * It preserves the pathname, search parameters, and fragment.
 * Handles relative URLs and proper encoding.
 *
 * @param params - An object containing the url and baseUrl.
 *                    url - The original URL (absolute or relative).
 *                    baseUrl - The new base URL to use.
 * @returns The rewritten URL as a string.
 */
export function rewriteUrl({
  url,
  baseUrl,
}: {
  url?: string;
  baseUrl?: string;
}): string | undefined {
  if (!url) {
    return undefined;
  }
  if (!baseUrl) {
    return url;
  }

  let originalUrl: URL;

  try {
    // Try to parse inputUrl as an absolute URL.
    originalUrl = new URL(url);
  } catch {
    // If inputUrl is relative, resolve using the provided baseUrl.
    try {
      originalUrl = new URL(url, baseUrl);
    } catch (e) {
      throw new Error(`Invalid input URL provided: ${url}`);
    }
  }

  let newBase: URL;
  try {
    newBase = new URL(baseUrl);
  } catch (e) {
    throw new Error(`Invalid base URL provided: ${baseUrl}`);
  }

  const rewrittenUrl = new URL(
    `${originalUrl.pathname}${originalUrl.search}${originalUrl.hash}`,
    newBase,
  );

  return rewrittenUrl.toString();
}

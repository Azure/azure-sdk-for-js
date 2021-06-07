// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Handles etag quoting in AppConfig response objects.
 *
 * This is important because the etag inside the body of the configuration
 * object isn't quoted, even though the header is.
 *
 * @param etag - the tag to quote, if it isn't quoted already
 *
 * @internal
 */
export function quoteETag(etag: string | undefined): string | undefined {
  // https://tools.ietf.org/html/rfc7232#section-3.1
  if (etag === undefined || etag === "*") {
    return etag;
  }

  if (etag.startsWith('"') && etag.endsWith('"')) {
    return etag;
  }

  if (etag.startsWith("'") && etag.endsWith("'")) {
    return etag;
  }

  return `"${etag}"`;
}

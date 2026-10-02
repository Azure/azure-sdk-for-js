// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isRestError } from "@azure/core-rest-pipeline";
import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";
import type {
  BlobGetLayoutOptionalParams,
  BlobLayout,
  BlobOperations,
} from "../generated/index.js";
import type { ExpiringValue } from "./AutoRefreshingCache.js";

/** How long a fetched layout may be used before it has to be read again. */
const LAYOUT_LIFETIME_MS = 5 * 60 * 1000;

/** How far ahead of expiry a still-usable layout starts refreshing in the background. */
const LAYOUT_REFRESH_BUFFER_MS = 30 * 1000;

/**
 * A contiguous byte range of a blob together with the endpoint that serves it.
 */
export interface BlobLayoutSegment {
  /** The start byte offset of the segment. */
  start: number;
  /** The end byte offset of the segment, inclusive. */
  end: number;
  /** Absolute URI of the endpoint serving this segment, including scheme and port. */
  endpoint: string;
}

/**
 * Flattens a Get Blob Layout page into segments, resolving each range's endpoint index against
 * the endpoint list of the same page.
 *
 * Ranges whose endpoint index has no matching entry are dropped rather than throwing. Routing is
 * only ever an optimization, so an unresolvable range falls back to the account endpoint.
 */
export function toBlobLayoutSegments(layout: BlobLayout): BlobLayoutSegment[] {
  const ranges = layout.ranges?.range;
  if (!ranges?.length) {
    return [];
  }

  // Keyed on the endpoint's own Index attribute, which is what ranges reference, rather than on
  // position in the list.
  const endpoints = new Map<number, string>();
  for (const endpoint of layout.endpoints?.endpoint ?? []) {
    endpoints.set(endpoint.index, endpoint.value);
  }

  const segments: BlobLayoutSegment[] = [];
  for (const range of ranges) {
    const endpoint = endpoints.get(range.endpointIndex);
    if (endpoint) {
      segments.push({ start: range.start, end: range.end, endpoint });
    }
  }
  return segments;
}

/**
 * Finds the endpoint of the segment covering `offset` by binary searching for the first segment
 * ending at or after it. Returns `undefined` when no segment covers it, including an offset in a
 * gap left by a dropped range, in which case the caller should fall back to the account endpoint.
 *
 * A chunk spanning several segments is routed whole to the endpoint owning its start offset
 * rather than being split. Every endpoint can serve every range, relaying when the data is not
 * local, so a suboptimal choice costs a relayed read and never returns wrong bytes.
 *
 * Assumes segments are sorted and non-overlapping, which is how the service returns them.
 */
export function getLayoutEndpoint(
  offset: number,
  segments: BlobLayoutSegment[],
): string | undefined {
  let low = 0;
  let high = segments.length - 1;
  let candidate: BlobLayoutSegment | undefined;

  while (low <= high) {
    const mid = (low + high) >>> 1;
    if (segments[mid].end >= offset) {
      candidate = segments[mid];
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return candidate && candidate.start <= offset ? candidate.endpoint : undefined;
}

/**
 * A layout the service declined to produce is not an error. 400 means it cannot describe this
 * blob, 5xx means it cannot right now; either way the caller reads from the account endpoint
 * instead. Every other status, including 403, 404, 409 and 412, is a real failure of the read
 * and must reach the caller.
 */
function isRecoverableLayoutFailure(err: unknown): boolean {
  if (!isRestError(err) || err.statusCode === undefined) {
    return false;
  }
  return err.statusCode === 400 || err.statusCode >= 500;
}

/**
 * Reads the layout of a blob, following continuation markers until every range is described,
 * and flattens the pages into segments.
 *
 * Pages after the first are locked to the ETag the first page reported, so a blob rewritten
 * mid-enumeration cannot yield a layout stitched together from two different versions. Pass
 * `ifMatch` to additionally lock the first page to a version already observed by the caller.
 *
 * Three outcomes, all of which a caller should cache:
 * - segments — route by them.
 * - `[]` — the service described no layout; read from the account endpoint.
 * - `undefined` — the service declined to produce one (see {@link isRecoverableLayoutFailure}).
 *
 * The last is a decision, not a missing value: cache it for the same lifetime as a real layout,
 * or every chunk of the download will call Get Blob Layout again.
 */
export async function fetchLayout(
  blobContext: BlobOperations,
  options: Omit<BlobGetLayoutOptionalParams, "marker"> = {},
): Promise<BlobLayoutSegment[] | undefined> {
  const segments: BlobLayoutSegment[] = [];
  let ifMatch = options.ifMatch;
  let marker: string | undefined;

  try {
    do {
      const layout = await blobContext.getLayout({ ...options, ifMatch, marker });
      ifMatch = layout.etag ?? ifMatch;
      segments.push(...toBlobLayoutSegments(layout));
      marker = layout.nextMarker || undefined;
    } while (marker);
  } catch (err) {
    if (isRecoverableLayoutFailure(err)) {
      return undefined;
    }
    throw err;
  }

  return segments;
}

/**
 * A layout held for the lifetime of one download.
 */
export interface BlobLayoutCacheValue extends ExpiringValue {
  /**
   * The segments to route by, or `undefined` if the service declined to describe the layout and
   * the whole transfer should read from the account endpoint.
   */
  readonly segments: BlobLayoutSegment[] | undefined;
}

/**
 * Wraps the result of {@link fetchLayout} for caching.
 *
 * A declined layout is cached exactly like a real one. It is a decision, not a missing value:
 * left uncached, every chunk of the download would call Get Blob Layout again. It is also never
 * refreshed early — a service that could not produce a layout is not worth re-asking before the
 * decision was due to be reconsidered.
 */
export function toBlobLayoutCacheValue(
  segments: BlobLayoutSegment[] | undefined,
): BlobLayoutCacheValue {
  const expiresOnTimestamp = Date.now() + LAYOUT_LIFETIME_MS;
  return {
    segments,
    expiresOnTimestamp,
    refreshAfterTimestamp: segments
      ? expiresOnTimestamp - LAYOUT_REFRESH_BUFFER_MS
      : expiresOnTimestamp,
  };
}

/**
 * Where a Get Blob Layout enumeration resumes: the service marker, and the ETag every continuation
 * must be locked to.
 */
export interface LayoutContinuation {
  marker: string;
  etag?: string;
}

/**
 * Packs a continuation into the opaque token `getLayout` hands out, so that resuming from the token
 * alone keeps the ETag lock the service requires.
 */
export function encodeLayoutContinuationToken(continuation: LayoutContinuation): string {
  return uint8ArrayToString(stringToUint8Array(JSON.stringify(continuation), "utf-8"), "base64");
}

/**
 * Unpacks a token from {@link encodeLayoutContinuationToken}. Any other token is taken as a bare
 * service marker.
 */
export function decodeLayoutContinuationToken(token: string): LayoutContinuation {
  try {
    const parsed = JSON.parse(uint8ArrayToString(stringToUint8Array(token, "base64"), "utf-8"));
    if (typeof parsed?.marker === "string") {
      return {
        marker: parsed.marker,
        etag: typeof parsed.etag === "string" ? parsed.etag : undefined,
      };
    }
  } catch {
    // Not one of ours.
  }
  return { marker: token };
}

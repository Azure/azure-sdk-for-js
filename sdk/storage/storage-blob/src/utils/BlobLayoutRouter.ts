// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import { isNodeLike } from "@azure/core-util";
import type { LayoutAwareRouting } from "../Clients.js";
import type { BlobOperations, EncryptionAlgorithmType } from "../generated/index.js";
import type { CpkInfo, DownloadHint } from "../generatedModels.js";
import { rangeToString } from "../Range.js";
import type { CommonOptions } from "../StorageClient.js";
import { AutoRefreshingCache } from "./AutoRefreshingCache.js";
import type { BlobLayoutCacheValue } from "./BlobLayoutSegment.js";
import { fetchLayout, getLayoutEndpoint, toBlobLayoutCacheValue } from "./BlobLayoutSegment.js";

/**
 * What a router needs to fetch the layout of the part of a blob that one download has left to read.
 */
export interface BlobLayoutRouterOptions {
  /** Where the part left to read starts. */
  offset: number;
  /** How many bytes are left to read. */
  count: number;
  /** ETag of the version the download is reading; the layout must describe the same one. */
  etag?: string;
  /** Customer Provided Key Info. */
  customerProvidedKey?: CpkInfo;
  /** Signal that cancels the download, and with it the layout request. */
  abortSignal?: AbortSignalLike;
  /** Tracing options of the download. */
  tracingOptions?: CommonOptions["tracingOptions"];
}

/**
 * Sends the blocks of one download to the endpoints that hold them. The layout is fetched on first
 * use and cached for the rest of the download.
 */
export class BlobLayoutRouter {
  private readonly cache: AutoRefreshingCache<BlobLayoutCacheValue>;

  /**
   * Returns a router for one download, or undefined when every block should be read from the
   * account endpoint: the caller opted out, the service sent no layout hint, nothing is left to
   * read, or the platform cannot set the `Host` header that routing depends on.
   */
  static forDownload(
    blobContext: BlobOperations,
    options: BlobLayoutRouterOptions & { routing: LayoutAwareRouting; downloadHint?: DownloadHint },
  ): BlobLayoutRouter | undefined {
    // `auto` resolves to enabled today; the third state exists so the default can move later
    // without reinterpreting what an explicit choice meant.
    if (
      options.routing === "disabled" ||
      options.downloadHint?.toLowerCase() !== "layout" ||
      options.count <= 0 ||
      !isNodeLike
    ) {
      return undefined;
    }
    return new BlobLayoutRouter(blobContext, options);
  }

  private constructor(blobContext: BlobOperations, options: BlobLayoutRouterOptions) {
    const range = rangeToString({ offset: options.offset, count: options.count });
    this.cache = new AutoRefreshingCache<BlobLayoutCacheValue>(async (timeoutSignal) => {
      // This cache serves one download, so cancelling it cancels the layout request too.
      const controller = new AbortController();
      const abort = (): void => controller.abort();
      const signals = [timeoutSignal, options.abortSignal];
      for (const signal of signals) {
        if (signal?.aborted) {
          abort();
        }
        signal?.addEventListener("abort", abort, { once: true });
      }
      try {
        return toBlobLayoutCacheValue(
          await fetchLayout(blobContext, {
            abortSignal: controller.signal,
            range,
            ifMatch: options.etag,
            encryptionKey: options.customerProvidedKey?.encryptionKey,
            encryptionKeySha256: options.customerProvidedKey?.encryptionKeySha256,
            encryptionAlgorithm: options.customerProvidedKey
              ?.encryptionAlgorithm as EncryptionAlgorithmType,
            tracingOptions: options.tracingOptions,
          }),
        );
      } finally {
        for (const signal of signals) {
          signal?.removeEventListener("abort", abort);
        }
      }
    });
  }

  /**
   * Returns the endpoint to read the block starting at `offset` from, or undefined to read it from
   * the account endpoint.
   */
  async endpointFor(offset: number, abortSignal?: AbortSignalLike): Promise<string | undefined> {
    const { segments } = await this.cache.get(abortSignal);
    return segments && getLayoutEndpoint(offset, segments);
  }
}

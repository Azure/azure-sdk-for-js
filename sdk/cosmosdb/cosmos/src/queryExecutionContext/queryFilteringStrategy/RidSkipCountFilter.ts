// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FilterContext, FilterStrategy } from "../index.js";
import { compareOrderByItems } from "../orderByComparator.js";

/**
 * Implements post-fetch filtering for ORDER BY queries to handle continuation tokens correctly.
 * This logic is applied only to the target partition from which a query is resumed.
 * It filters out documents that have already been emitted in previous pages by comparing
 * ORDER BY item values first, then document _rid, and finally using skip count for tie-breaking.
 *
 * Follows the .NET SDK FilterNextAsync logic:
 * 1. Compare OrderBy values with continuation token values
 * 2. Skip documents that come before continuation point
 * 3. For exact OrderBy matches, use RID comparison
 * 4. For exact RID matches, apply skip count logic
 */
export class RidSkipCountFilter implements FilterStrategy {
  private remainingSkipCount: number;

  /**
   * @param filterContext - The context containing values from the continuation token.
   */
  constructor(private readonly filterContext: FilterContext) {
    this.remainingSkipCount = this.filterContext.skipCount;
  }

  /**
   * Applies the comprehensive OrderBy + RID + SkipCount filtering logic.
   * @param documents - The documents fetched from the target partition.
   * @returns A new array containing only the documents that should be processed.
   */
  public applyFilter(documents: any[]): any[] {
    console.log(`[FILTER-DEBUG] === Starting RidSkipCountFilter.applyFilter ===`);
    console.log(`[FILTER-DEBUG] Input documents count: ${documents.length}`);
    console.log(`[FILTER-DEBUG] Filter context:`, {
      orderByItems: this.filterContext.orderByItems,
      sortOrders: this.filterContext.sortOrders,
      rid: this.filterContext.rid,
      skipCount: this.filterContext.skipCount,
      initialSkipCount: this.remainingSkipCount,
    });

    const filteredDocs: any[] = [];
    let skippedCount = 0;

    for (const doc of documents) {
      if (!this.shouldIncludeDocument(doc)) {
        skippedCount++;
        continue;
      }
      filteredDocs.push(doc);
    }

    console.log(`[FILTER-DEBUG] === Filter Results ===`);
    console.log(`[FILTER-DEBUG] Filtered documents count: ${filteredDocs.length}`);
    console.log(`[FILTER-DEBUG] Skipped documents count: ${skippedCount}`);
    console.log(`[FILTER-DEBUG] Remaining skip count: ${this.remainingSkipCount}`);

    return filteredDocs;
  }

  /**
   * Determines if a document should be included based on OrderBy values, RID, and skip count.
   * Implements the .NET SDK's FilterNextAsync logic with robust OrderBy comparison.
   */
  private shouldIncludeDocument(doc: any): boolean {
    const docPayload = doc.payload || doc;
    const docId = docPayload?.id || "unknown";
    const docAmount = docPayload?.amount || "unknown";

    console.log(
      `[FILTER-DETAIL] === shouldIncludeDocument for ${docId} (amount: ${docAmount}) ===`,
    );
    console.log(`[FILTER-DETAIL] Document orderByItems:`, doc.orderByItems);
    console.log(`[FILTER-DETAIL] Continuation orderByItems:`, this.filterContext.orderByItems);

    // Step 1: OrderBy Value Filtering using OrderByComparator
    const sortOrderCompare = this.compareOrderByItems(doc);
    console.log(`[FILTER-DETAIL] OrderBy comparison result: ${sortOrderCompare}`);

    // FIXED: Correct the inverted logic!
    // compareOrderByItems returns: negative if doc < continuation, positive if doc > continuation
    // But for filtering: negative means doc comes BEFORE (skip), positive means doc comes AFTER (include)

    // If sortOrderCompare < 0, this document comes before the continuation point
    if (sortOrderCompare < 0) {
      return true; // Include documents that come after continuation point
    }

    // If sortOrderCompare > 0, this document comes after the continuation point
    if (sortOrderCompare > 0) {
      return false; // Skip documents that come before continuation point
    }

    // Step 2: RID Filtering (sortOrderCompare === 0, same OrderBy values)
    // Check if RID is available for comparison (some queries like JOIN may not have RID)
    // if (!this.filterContext.rid) {
    //   console.log(`[FILTER-DETAIL] No RID in continuation token, using skip count only`);
    //   // Without RID, we can't do RID-based filtering, so include the document
    //   // The skipCount logic will handle any necessary filtering
    //   if (this.remainingSkipCount > 0) {
    //     console.log(`[FILTER-DETAIL] ✗ Skip count remaining: ${this.remainingSkipCount}, skipping`);
    //     this.remainingSkipCount--;
    //     return false;
    //   }
    //   console.log(`[FILTER-DETAIL] ✓ Skip count exhausted, including`);
    //   return true;
    // }

    // For ORDER BY queries, _rid is at the top level of doc, not in payload
    // Query rewrites to: SELECT c._rid, [...] AS orderByItems, {...} AS payload
    const docRid = doc._rid;

    let ridOrderCompare: number;
    if (this.filterContext.rid === docRid) {
      ridOrderCompare = 0;
    } else {
      // Use BigInt comparison for accurate RID comparison
      const continuationBigInt = this.ridToBigInt(this.filterContext.rid);
      const docBigInt = this.ridToBigInt(docRid);

      if (continuationBigInt < docBigInt) {
        ridOrderCompare = -1;
      } else if (continuationBigInt > docBigInt) {
        ridOrderCompare = 1;
      } else {
        ridOrderCompare = 0;
      }
    }
    // Apply direction logic based on sort order and query execution info
    const sortOrders = this.filterContext.sortOrders || [];
    const queryExecutionInfo = this.filterContext.queryExecutionInfo;

    // Direction logic based on index scan direction
    // Find the first descending sort order in the array
    const hasDescendingSort = sortOrders.some((order) => order === "Descending");

    if (!queryExecutionInfo || queryExecutionInfo.reverseRidEnabled) {
      // Default behavior or when reverseRidEnabled is true
      if (hasDescendingSort) {
        ridOrderCompare = -ridOrderCompare; // Flip for DESC sort order
      }
    } else {
      // When reverseRidEnabled is false, use reverseIndexScan
      if (queryExecutionInfo.reverseIndexScan) {
        ridOrderCompare = -ridOrderCompare; // Flip based on index scan direction
      }
    }

    // if (ridOrderCompare > 0) continue; // Skip
    if (ridOrderCompare > 0) {
      return false; // Skip documents that were already processed
    }

    if (ridOrderCompare < 0) {
      return true; // Include documents that come after continuation
    }

    // Step 3: SkipCount Logic (ridOrderCompare === 0, exact same RID)
    if (this.remainingSkipCount > 0) {
      this.remainingSkipCount--;
      return false; // Skip this document due to skip count
    }

    return true; // Include this document (skip count exhausted)
  }

  /**
   * Convert RID to BigInt for accurate comparison.
   * Decodes base64 RID and extracts the Document ID portion (8 bytes at offset 8) as BigInt.
   *
   * RID Structure (from Java SDK ResourceId.java):
   * - Bytes 0-3: Database ID (4 bytes)
   * - Bytes 4-7: Collection ID (4 bytes)
   * - Bytes 8-15: Document ID (8 bytes, stored in Big Endian but compared in Little Endian)
   * - Bytes 16-19: Attachment ID (4 bytes, optional)
   */
  private ridToBigInt(rid: string): bigint {
    // Validate input RID
    if (rid === null || rid === undefined) {
      throw new Error(`RID is null or undefined`);
    }
    if (typeof rid !== "string") {
      throw new Error(`RID must be a string, got ${typeof rid}`);
    }
    if (rid.trim().length === 0) {
      throw new Error(`RID is empty string`);
    }

    try {
      const normalizedRid = rid.replace(/-/g, "/");
      const bytes = Buffer.from(normalizedRid, "base64");

      // Validate RID length - must be at least 16 bytes to contain document ID
      if (bytes.length < 16) {
        throw new Error(`RID too short: expected at least 16 bytes, got ${bytes.length}`);
      }

      // Extract Document ID portion (8 bytes at offset 8-15)
      // The bytes are stored as Big Endian but must be compared as Little Endian
      let result = 0n;
      for (let i = 15; i >= 8; i--) {
        result = (result << 8n) | BigInt(bytes[i] & 0xff); // & 0xFF treats as unsigned
      }

      return result;
    } catch (error) {
      throw new Error(
        `Failed to convert RID '${rid}' to BigInt: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Compares the OrderBy items of a document with the continuation token's OrderBy items.
   * Uses the exported compareOrderByItems utility function from orderByItemComparator.
   * @param doc - The document to compare
   * @returns negative if doc comes before continuation, 0 if same, positive if doc comes after
   */
  private compareOrderByItems(doc: any): number {
    const docOrderByItems = doc.orderByItems || [];
    const continuationOrderByItems = this.filterContext.orderByItems || [];
    const sortOrders = this.filterContext.sortOrders || [];

    // Compare doc vs continuation (not continuation vs doc!)
    // Returns: negative if doc < continuation, 0 if equal, positive if doc > continuation
    return compareOrderByItems(docOrderByItems, continuationOrderByItems, sortOrders);
  }
}

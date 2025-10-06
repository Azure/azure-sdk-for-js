
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FilterContext, FilterStrategy } from "./FilterStrategy.js";
import { compareOrderByItems } from "../orderByComparator.js";

/**
 * @internal
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
    console.log(`[RidSkipCountFilter] Constructor - Filter context: ${JSON.stringify({
      orderByItems: this.filterContext.orderByItems,
      rid: this.filterContext.rid,
      skipCount: this.filterContext.skipCount,
      sortOrders: this.filterContext.sortOrders
    })}`);
  }

  /**
   * Applies the comprehensive OrderBy + RID + SkipCount filtering logic.
   * @param documents - The documents fetched from the target partition.
   * @returns A new array containing only the documents that should be processed.
   */
  public applyFilter(documents: any[]): any[] {    
    const filteredDocs: any[] = [];
    let skippedCount = 0;
    
    for (const doc of documents) {
      
      if (!this.shouldIncludeDocument(doc)) {
        skippedCount++;
        continue;
      }
      filteredDocs.push(doc);
    }
    
    return filteredDocs;
  }

  /**
   * Determines if a document should be included based on OrderBy values, RID, and skip count.
   * Implements the .NET SDK's FilterNextAsync logic with robust OrderBy comparison.
   */
  private shouldIncludeDocument(doc: any): boolean {
    const docPayload = doc.payload || doc;
    
    // Log full document structure for DISTINCT queries
    console.log(`[RidSkipCountFilter] === Processing Document ===`);
    console.log(`[RidSkipCountFilter] Doc structure: ${JSON.stringify({
      _rid: doc._rid,
      orderByItems: doc.orderByItems,
      payload: docPayload.category || docPayload.id,
      _hash: doc._hash || 'N/A'
    })}`);
    
    // Step 1: OrderBy Value Filtering using OrderByComparator
    const sortOrderCompare = this.compareOrderByItems(doc);
    console.log(`[RidSkipCountFilter] OrderBy comparison: ${sortOrderCompare} (doc vs continuation)`);
    console.log(`[RidSkipCountFilter]   Doc orderByItems: ${JSON.stringify(doc.orderByItems)}`);
    console.log(`[RidSkipCountFilter]   Continuation orderByItems: ${JSON.stringify(this.filterContext.orderByItems)}`);

    // If sortOrderCompare > 0, this document comes after the continuation point
    if (sortOrderCompare > 0) {
      console.log(`[RidSkipCountFilter] ✓ INCLUDE: OrderBy > continuation (${docPayload.category || docPayload.id})`);
      return true; // Include documents that come after continuation point
    }
    
    // If sortOrderCompare < 0, this document comes before the continuation point
    if (sortOrderCompare < 0) {
      console.log(`[RidSkipCountFilter] ✗ SKIP: OrderBy < continuation (${docPayload.category || docPayload.id})`);
      return false; // Skip documents that come before continuation point
    }

    // Step 2: RID Filtering (sortOrderCompare === 0, same OrderBy values)
    // 
    // RID Comparison Logic (from Java SDK):
    // - RIDs are base64-encoded structures containing database, collection, and document IDs
    // - We extract and compare ONLY the Document ID portion (8 bytes at offset 8-15)
    // - Document IDs are stored in Big Endian format and must be compared as unsigned integers
    // - ridOrderCompare = continuationRid.Document.CompareTo(docRid.Document)
    
    // Check if RID is available for comparison (some queries like JOIN may not have RID)
    if (!this.filterContext.rid) {
      console.log(`[RidSkipCountFilter] No RID in filter context - using skipCount only`);
      // Without RID, we can't do RID-based filtering, so include the document
      // The skipCount logic will handle any necessary filtering
      if (this.remainingSkipCount > 0) {
        console.log(`[RidSkipCountFilter] ✗ SKIP: skipCount=${this.remainingSkipCount} (${docPayload.category || docPayload.id})`);
        this.remainingSkipCount--;
        return false;
      }
      console.log(`[RidSkipCountFilter] ✓ INCLUDE: skipCount exhausted (${docPayload.category || docPayload.id})`);
      return true;
    }
    
    // For ORDER BY queries, _rid is at the top level of doc, not in payload
    // Query rewrites to: SELECT c._rid, [...] AS orderByItems, {...} AS payload
    const docRid = doc._rid ;
    
    let ridOrderCompare: number;
    if(this.filterContext.rid === docRid) {  
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
    console.log(`[RidSkipCountFilter] Base RID comparison: continuation(${this.filterContext.rid}) vs doc(${docRid}) = ${ridOrderCompare}`);
    
    // Apply direction logic based on sort order and query execution info 
    const sortOrders = this.filterContext.sortOrders || [];
    const queryExecutionInfo = this.filterContext.queryExecutionInfo;
    
    // Direction logic based on index scan direction (following .NET SDK lines 1485-1511)
    // Find the first descending sort order in the array
    const hasDescendingSort = sortOrders.some(order => order === 'Descending');
    console.log(`[RidSkipCountFilter] Sort orders: [${sortOrders.join(', ')}], Has descending: ${hasDescendingSort}, QueryExecutionInfo: ${JSON.stringify(queryExecutionInfo)}`);
    
    if (!queryExecutionInfo || queryExecutionInfo.reverseRidEnabled) {
      // Default behavior or when reverseRidEnabled is true
      if (hasDescendingSort) {
        ridOrderCompare = -ridOrderCompare; // Flip for DESC sort order
        console.log(`[RidSkipCountFilter] Flipped RID comparison for DESC sort order (reverseRidEnabled): ${ridOrderCompare}`);
      }
    } else {
      // When reverseRidEnabled is false, use reverseIndexScan
      if (queryExecutionInfo.reverseIndexScan) {
        ridOrderCompare = -ridOrderCompare; // Flip based on index scan direction
        console.log(`[RidSkipCountFilter] Flipped RID comparison for reverseIndexScan: ${ridOrderCompare}`);
      }
    }
    
    console.log(`[RidSkipCountFilter] Final RID comparison result: ${ridOrderCompare}`);
    
    // Following .NET SDK: if (ridOrderCompare > 0) continue; // Skip
    if (ridOrderCompare > 0) {
      console.log(`[RidSkipCountFilter] ✗ SKIP: RID already processed (${docPayload.category || docPayload.id})`);
      return false; // Skip documents that were already processed
    }
    
    if (ridOrderCompare < 0) {
      console.log(`[RidSkipCountFilter] ✓ INCLUDE: RID comes after continuation (${docPayload.category || docPayload.id})`);
      return true; // Include documents that come after continuation
    }

    // Step 3: SkipCount Logic (ridOrderCompare === 0, exact same RID)
    console.log(`[RidSkipCountFilter] Same RID - checking skipCount (remaining: ${this.remainingSkipCount})`);
    if (this.remainingSkipCount > 0) {
      console.log(`[RidSkipCountFilter] ✗ SKIP: Same RID, skipCount=${this.remainingSkipCount} (${docPayload.category || docPayload.id})`);
      this.remainingSkipCount--;
      return false; // Skip this document due to skip count
    }
    
    console.log(`[RidSkipCountFilter] ✓ INCLUDE: Same RID, skipCount exhausted (${docPayload.category || docPayload.id})`);
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
    if (typeof rid !== 'string') {
      throw new Error(`RID must be a string, got ${typeof rid}`);
    }
    if (rid.trim().length === 0) {
      throw new Error(`RID is empty string`);
    }
    
    try {
      const normalizedRid = rid.replace(/-/g, '/');
      const bytes = Buffer.from(normalizedRid, "base64");

      // Validate RID length - must be at least 16 bytes to contain document ID
      if (bytes.length < 16) {
        throw new Error(`RID too short: expected at least 16 bytes, got ${bytes.length}`);
      }

      // Extract Document ID portion (8 bytes at offset 8-15)
      // The bytes are stored as Big Endian but must be compared as Little Endian
      let result = 0n;
      for (let i = 15; i >= 8; i--) {
        result = (result << 8n) | BigInt(bytes[i] & 0xFF); // & 0xFF treats as unsigned
      }

      return result;
    } catch (error) {
      throw new Error(`Failed to convert RID '${rid}' to BigInt: ${error instanceof Error ? error.message : String(error)}`);
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

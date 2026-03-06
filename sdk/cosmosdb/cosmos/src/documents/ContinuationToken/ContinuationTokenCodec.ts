// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BaseContinuationToken } from "./CompositeQueryContinuationToken.js";
import type { CompositeQueryContinuationToken } from "./CompositeQueryContinuationToken.js";
import type { OrderByQueryContinuationToken } from "./OrderByQueryContinuationToken.js";
import { ErrorResponse } from "../../request/ErrorResponse.js";

/**
 * Centralized codec for encoding and decoding continuation tokens with versioning support.
 * Handles backward compatibility with legacy (v0) tokens and validation of token structure.
 * @hidden
 */
export class ContinuationTokenCodec {
  /**
   * Current continuation token format version
   */
  static readonly CURRENT_VERSION = 1;

  /**
   * Serializes a continuation token to a string.
   * Stamps the current version before serializing.
   * @param token - The continuation token to serialize
   * @returns JSON string representation of the token
   */
  static encode(token: BaseContinuationToken): string {
    const versionedToken = { ...token, version: this.CURRENT_VERSION };
    return JSON.stringify(versionedToken);
  }

  /**
   * Deserializes a continuation token string.
   * Handles version dispatch — v0 (no version field) and v1 (current).
   * Validates required fields and structure.
   * @param tokenString - The continuation token string to deserialize
   * @returns Parsed and validated continuation token
   * @throws ErrorResponse with clear message on malformed tokens
   */
  static decode(tokenString: string): BaseContinuationToken {
    if (!tokenString || typeof tokenString !== "string") {
      throw new ErrorResponse(
        "Invalid continuation token: token must be a non-empty string",
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(tokenString);
    } catch (error) {
      throw new ErrorResponse(
        `Invalid continuation token: failed to parse JSON - ${(error as Error).message}`,
      );
    }

    // Validate structure
    this.validate(parsed);

    return parsed;
  }

  /**
   * Deserializes specifically as a CompositeQueryContinuationToken.
   * @param tokenString - The continuation token string to deserialize
   * @returns Parsed and validated composite query continuation token
   * @throws ErrorResponse if token is not a valid composite token
   */
  static decodeComposite(tokenString: string): CompositeQueryContinuationToken {
    const token = this.decode(tokenString);

    // Composite tokens should not have orderByItems
    if ("orderByItems" in token) {
      throw new ErrorResponse(
        "Invalid continuation token: expected composite token but found ORDER BY token (contains 'orderByItems')",
      );
    }

    return token as CompositeQueryContinuationToken;
  }

  /**
   * Deserializes specifically as an OrderByQueryContinuationToken.
   * @param tokenString - The continuation token string to deserialize
   * @returns Parsed and validated order-by query continuation token
   * @throws ErrorResponse if token is not a valid order-by token
   */
  static decodeOrderBy(tokenString: string): OrderByQueryContinuationToken {
    const token = this.decode(tokenString);

    if (!this.isOrderByToken(token)) {
      throw new ErrorResponse(
        "Invalid continuation token: expected ORDER BY token but missing required fields (orderByItems, skipCount, or documentRid)",
      );
    }

    return token;
  }

  /**
   * Type guard: checks if a parsed token is an OrderBy token
   * @param token - The token to check
   * @returns true if the token has ORDER BY specific fields
   */
  static isOrderByToken(token: BaseContinuationToken): token is OrderByQueryContinuationToken {
    return (
      "orderByItems" in token &&
      Array.isArray((token as any).orderByItems) &&
      "skipCount" in token &&
      typeof (token as any).skipCount === "number"
    );
  }

  /**
   * Validates the structural integrity of a parsed token.
   * Checks required fields, rangeMappings structure, etc.
   * Handles both v0 (legacy, no version field) and v1 (current) tokens.
   * @param token - The token to validate
   * @throws ErrorResponse with specific validation failure message
   */
  private static validate(token: unknown): asserts token is BaseContinuationToken {
    if (!token || typeof token !== "object") {
      throw new ErrorResponse(
        "Invalid continuation token: token must be a JSON object",
      );
    }

    const obj = token as Record<string, unknown>;

    // Check version field if present (optional for backward compatibility)
    if (obj.version !== undefined) {
      if (typeof obj.version !== "number") {
        throw new ErrorResponse(
          "Invalid continuation token: 'version' field must be a number",
        );
      }
      if (obj.version !== 0 && obj.version !== 1) {
        throw new ErrorResponse(
          `Invalid continuation token: unsupported version ${obj.version} (expected 0 or 1)`,
        );
      }
    }

    // Validate required fields
    if (!obj.rid || typeof obj.rid !== "string") {
      throw new ErrorResponse(
        "Invalid continuation token: missing or invalid 'rid' field",
      );
    }

    if (!obj.rangeMappings || !Array.isArray(obj.rangeMappings)) {
      throw new ErrorResponse(
        "Invalid continuation token: missing or invalid 'rangeMappings' field (must be an array)",
      );
    }

    if (obj.rangeMappings.length === 0) {
      throw new ErrorResponse(
        "Invalid continuation token: 'rangeMappings' array cannot be empty",
      );
    }

    // Validate each range mapping
    for (let i = 0; i < obj.rangeMappings.length; i++) {
      const mapping = obj.rangeMappings[i];
      if (!mapping || typeof mapping !== "object") {
        throw new ErrorResponse(
          `Invalid continuation token: rangeMappings[${i}] must be an object`,
        );
      }

      const mappingObj = mapping as Record<string, unknown>;

      if (!mappingObj.queryRange || typeof mappingObj.queryRange !== "object") {
        throw new ErrorResponse(
          `Invalid continuation token: rangeMappings[${i}] missing or invalid 'queryRange' field`,
        );
      }

      const queryRange = mappingObj.queryRange as Record<string, unknown>;

      if (!queryRange.min || typeof queryRange.min !== "string") {
        throw new ErrorResponse(
          `Invalid continuation token: rangeMappings[${i}].queryRange missing or invalid 'min' field`,
        );
      }

      if (!queryRange.max || typeof queryRange.max !== "string") {
        throw new ErrorResponse(
          `Invalid continuation token: rangeMappings[${i}].queryRange missing or invalid 'max' field`,
        );
      }

      // continuationToken can be string or undefined
      if (
        mappingObj.continuationToken !== undefined &&
        typeof mappingObj.continuationToken !== "string"
      ) {
        throw new ErrorResponse(
          `Invalid continuation token: rangeMappings[${i}].continuationToken must be a string or undefined`,
        );
      }
    }

    // Validate optional fields if present
    if (obj.offset !== undefined && typeof obj.offset !== "number") {
      throw new ErrorResponse(
        "Invalid continuation token: 'offset' field must be a number",
      );
    }

    if (obj.limit !== undefined && typeof obj.limit !== "number") {
      throw new ErrorResponse(
        "Invalid continuation token: 'limit' field must be a number",
      );
    }

    // For ORDER BY tokens, validate additional fields
    if ("orderByItems" in obj) {
      if (!Array.isArray(obj.orderByItems)) {
        throw new ErrorResponse(
          "Invalid continuation token: 'orderByItems' field must be an array",
        );
      }

      if (obj.skipCount === undefined || typeof obj.skipCount !== "number") {
        throw new ErrorResponse(
          "Invalid continuation token: ORDER BY token missing or invalid 'skipCount' field",
        );
      }

      // documentRid is optional but should be a string if present
      if (obj.documentRid !== undefined && typeof obj.documentRid !== "string") {
        throw new ErrorResponse(
          "Invalid continuation token: 'documentRid' field must be a string",
        );
      }

      // hashedLastResult is optional but should be a string if present
      if (obj.hashedLastResult !== undefined && typeof obj.hashedLastResult !== "string") {
        throw new ErrorResponse(
          "Invalid continuation token: 'hashedLastResult' field must be a string",
        );
      }
    }
  }
}

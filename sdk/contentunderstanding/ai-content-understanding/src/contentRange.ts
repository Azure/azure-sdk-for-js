// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Represents a content range for specifying which parts of a document or media to analyze.
 * Document content uses 1-based page numbers; audio/video content uses integer milliseconds.
 *
 * Use the static factory methods to create instances:
 *
 * @example
 * ```ts snippet:ignore
 * // Document pages (1-based)
 * const range = ContentRange.pages(1, 3);           // "1-3"
 * const single = ContentRange.page(5);              // "5"
 *
 * // Audio/video time ranges (milliseconds)
 * const time = ContentRange.timeRange(0, 5000);     // "0-5000"
 *
 * // Combine multiple ranges
 * const combined = ContentRange.combine(
 *   ContentRange.pages(1, 3),
 *   ContentRange.page(5),
 *   ContentRange.pagesFrom(9),
 * );                                                // "1-3,5,9-"
 *
 * // Use with analyzeBinary options
 * client.analyzeBinary(analyzerId, binaryInput, "application/pdf", {
 *   contentRange: ContentRange.pages(1, 3),
 * });
 *
 * // Use with AnalyzeInput
 * const input: AnalyzeInput = {
 *   url: "https://example.com/doc.pdf",
 *   contentRange: ContentRange.combine(
 *     ContentRange.pages(1, 3),
 *     ContentRange.page(5),
 *   ),                                               // "1-3,5"
 * };
 *
 * // Use a raw string via fromString
 * const input2: AnalyzeInput = {
 *   url: "https://example.com/doc.pdf",
 *   contentRange: ContentRange.fromString("1-3,5"),
 * };
 * ```
 */
export class ContentRange {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  /**
   * Creates a range for a single page (1-based page number).
   * @param pageNumber - The 1-based page number.
   * @returns A ContentRange representing a single page.
   *
   * @example
   * ```ts snippet:ignore
   * ContentRange.page(5).toString(); // "5"
   * ```
   */
  static page(pageNumber: number): ContentRange {
    validatePositiveInteger(pageNumber, "pageNumber");
    return new ContentRange(String(pageNumber));
  }

  /**
   * Creates a range spanning from `startPage` to `endPage` inclusive (1-based page numbers).
   * @param startPage - The 1-based starting page number.
   * @param endPage - The 1-based ending page number (must be greater than or equal to startPage).
   * @returns A ContentRange representing a page range.
   *
   * @example
   * ```ts snippet:ignore
   * ContentRange.pages(1, 3).toString(); // "1-3"
   * ```
   */
  static pages(startPage: number, endPage: number): ContentRange {
    validatePositiveInteger(startPage, "startPage");
    validatePositiveInteger(endPage, "endPage");
    if (endPage < startPage) {
      throw new RangeError(`endPage (${endPage}) must be >= startPage (${startPage})`);
    }
    return new ContentRange(`${startPage}-${endPage}`);
  }

  /**
   * Creates an open-ended range starting from `startPage` to the end of the document (1-based page number).
   * @param startPage - The 1-based starting page number.
   * @returns A ContentRange representing pages from `startPage` onward.
   *
   * @example
   * ```ts snippet:ignore
   * ContentRange.pagesFrom(9).toString(); // "9-"
   * ```
   */
  static pagesFrom(startPage: number): ContentRange {
    validatePositiveInteger(startPage, "startPage");
    return new ContentRange(`${startPage}-`);
  }

  /**
   * Creates a time range in milliseconds for audio/video content.
   * @param startMs - The start time in milliseconds (must be >= 0).
   * @param endMs - The end time in milliseconds (must be >= startMs).
   * @returns A ContentRange representing a time range.
   *
   * @example
   * ```ts snippet:ignore
   * ContentRange.timeRange(0, 5000).toString(); // "0-5000"
   * ```
   */
  static timeRange(startMs: number, endMs: number): ContentRange {
    validateNonNegativeInteger(startMs, "startMs");
    validateNonNegativeInteger(endMs, "endMs");
    if (endMs < startMs) {
      throw new RangeError(`endMs (${endMs}) must be >= startMs (${startMs})`);
    }
    return new ContentRange(`${startMs}-${endMs}`);
  }

  /**
   * Creates an open-ended time range starting from `startMs` to the end of the media (milliseconds).
   * @param startMs - The start time in milliseconds (must be >= 0).
   * @returns A ContentRange representing time from `startMs` onward.
   *
   * @example
   * ```ts snippet:ignore
   * ContentRange.timeRangeFrom(5000).toString(); // "5000-"
   * ```
   */
  static timeRangeFrom(startMs: number): ContentRange {
    validateNonNegativeInteger(startMs, "startMs");
    return new ContentRange(`${startMs}-`);
  }

  /**
   * Combines multiple ContentRange instances into a single comma-separated range string.
   * @param ranges - One or more ContentRange instances to combine.
   * @returns A ContentRange representing the combined ranges.
   *
   * @example
   * ```ts snippet:ignore
   * ContentRange.combine(
   *   ContentRange.pages(1, 3),
   *   ContentRange.page(5),
   *   ContentRange.pagesFrom(9),
   * ).toString(); // "1-3,5,9-"
   * ```
   */
  static combine(...ranges: ContentRange[]): ContentRange {
    if (ranges.length === 0) {
      throw new Error("At least one range must be provided");
    }
    return new ContentRange(ranges.map((r) => r.toString()).join(","));
  }

  /**
   * Creates a ContentRange from a raw range string.
   * Use this when you already have a pre-formatted range string.
   * @param rangeString - A range string (e.g. "1-3,5,9-").
   * @returns A ContentRange wrapping the provided string.
   *
   * @example
   * ```ts snippet:ignore
   * ContentRange.fromString("1-3,5,9-").toString(); // "1-3,5,9-"
   * ```
   */
  static fromString(rangeString: string): ContentRange {
    return new ContentRange(rangeString);
  }

  /**
   * Returns the string representation of the range.
   * @returns The range string (e.g. "1-3", "5", "0-5000", "1-3,5,9-").
   */
  toString(): string {
    return this._value;
  }
}

function validatePositiveInteger(value: number, paramName: string): void {
  if (!Number.isInteger(value) || value < 1) {
    throw new RangeError(`${paramName} must be a positive integer, got ${value}`);
  }
}

function validateNonNegativeInteger(value: number, paramName: string): void {
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError(`${paramName} must be a non-negative integer, got ${value}`);
  }
}

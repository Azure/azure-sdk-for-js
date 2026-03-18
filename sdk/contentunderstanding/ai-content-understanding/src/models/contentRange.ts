// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Represents a range of content to analyze.
 *
 * For documents, ranges use 1-based page numbers (e.g., `"1-3"`, `"5"`, `"9-"`).
 * For audio/video, ranges use integer milliseconds (e.g., `"0-5000"`, `"5000-"`).
 * Multiple ranges can be combined with commas (e.g., `"1-3,5,9-"`).
 *
 * @example
 * ```ts
 * // Document pages
 * const range1 = ContentRange.page(5);                     // "5"
 * const range2 = ContentRange.pages(1, 3);                 // "1-3"
 * const range3 = ContentRange.pagesFrom(9);                // "9-"
 *
 * // Audio/video time ranges (milliseconds)
 * const range4 = ContentRange.timeRange(0, 5000);          // "0-5000"
 * const range5 = ContentRange.timeRangeFrom(5000);         // "5000-"
 *
 * // Combine multiple ranges
 * const range6 = ContentRange.combine(
 *   ContentRange.pages(1, 3),
 *   ContentRange.page(5),
 *   ContentRange.pagesFrom(9));                            // "1-3,5,9-"
 *
 * // Or construct from a raw string
 * const range7 = new ContentRange("1-3,5,9-");
 * ```
 */
export class ContentRange {
  private readonly _value: string;

  /**
   * Creates a new ContentRange from a raw range string.
   * @param value - The range string value (e.g., `"1-3"`, `"0-5000"`, `"1-3,5,9-"`).
   * @throws Error if value is null, undefined, or empty.
   */
  constructor(value: string) {
    if (!value) {
      throw new Error("ContentRange value must not be null, undefined, or empty.");
    }
    this._value = value;
  }

  /**
   * Create a ContentRange for a single document page (1-based).
   * @param pageNumber - The 1-based page number.
   * @returns A ContentRange representing a single page, e.g. `"5"`.
   * @throws Error if pageNumber is less than 1 or not an integer.
   */
  static page(pageNumber: number): ContentRange {
    if (pageNumber < 1) {
      throw new Error("Page number must be >= 1.");
    }
    if (!Number.isInteger(pageNumber)) {
      throw new Error("Page number must be an integer.");
    }
    return new ContentRange(String(pageNumber));
  }

  /**
   * Create a ContentRange for a contiguous range of document pages (1-based, inclusive).
   * @param start - The 1-based start page number (inclusive).
   * @param end - The 1-based end page number (inclusive).
   * @returns A ContentRange representing the page range, e.g. `"1-3"`.
   * @throws Error if start is less than 1, end is less than start, or either is not an integer.
   */
  static pages(start: number, end: number): ContentRange {
    if (start < 1) {
      throw new Error("Start page must be >= 1.");
    }
    if (end < start) {
      throw new Error("End page must be >= start page.");
    }
    if (!Number.isInteger(start)) {
      throw new Error("Start page must be an integer.");
    }
    if (!Number.isInteger(end)) {
      throw new Error("End page must be an integer.");
    }
    return new ContentRange(`${start}-${end}`);
  }

  /**
   * Create a ContentRange for all pages from a starting page to the end (1-based).
   * @param startPage - The 1-based start page number (inclusive).
   * @returns A ContentRange representing the open-ended range, e.g. `"9-"`.
   * @throws Error if startPage is less than 1 or not an integer.
   */
  static pagesFrom(startPage: number): ContentRange {
    if (startPage < 1) {
      throw new Error("Start page must be >= 1.");
    }
    if (!Number.isInteger(startPage)) {
      throw new Error("Start page must be an integer.");
    }
    return new ContentRange(`${startPage}-`);
  }

  /**
   * Create a ContentRange for a time range in milliseconds (for audio/video content).
   * @param startMs - The start time in milliseconds (inclusive).
   * @param endMs - The end time in milliseconds (inclusive).
   * @returns A ContentRange representing the time range, e.g. `"0-5000"`.
   * @throws Error if startMs is negative, endMs is less than startMs,
   * or either value is not an integer number of milliseconds.
   */
  static timeRange(startMs: number, endMs: number): ContentRange {
    if (!Number.isInteger(startMs)) {
      throw new Error("Start time must be an integer number of milliseconds.");
    }
    if (!Number.isInteger(endMs)) {
      throw new Error("End time must be an integer number of milliseconds.");
    }
    if (startMs < 0) {
      throw new Error("Start time must be >= 0.");
    }
    if (endMs < startMs) {
      throw new Error("End time must be >= start time.");
    }
    if (!Number.isInteger(startMs)) {
      throw new Error("Start time must be an integer number of milliseconds.");
    }
    if (!Number.isInteger(endMs)) {
      throw new Error("End time must be an integer number of milliseconds.");
    }
    return new ContentRange(`${startMs}-${endMs}`);
  }

  /**
   * Create a ContentRange from a starting time to the end in milliseconds (for audio/video content).
   * @param startMs - The start time in milliseconds (inclusive).
   * @returns A ContentRange representing the open-ended time range, e.g. `"5000-"`.
   * @throws Error if startMs is negative or is not an integer number of milliseconds.
   */
  static timeRangeFrom(startMs: number): ContentRange {
    if (!Number.isInteger(startMs)) {
      throw new Error("Start time must be an integer number of milliseconds.");
    }
    if (startMs < 0) {
      throw new Error("Start time must be >= 0.");
    }
    if (!Number.isInteger(startMs)) {
      throw new Error("Start time must be an integer number of milliseconds.");
    }
    return new ContentRange(`${startMs}-`);
  }

  /**
   * Combine multiple ContentRange values into a single comma-separated range.
   * @param ranges - The ranges to combine.
   * @returns A ContentRange representing the combined ranges, e.g. `"1-3,5,9-"`.
   * @throws Error if no ranges are provided.
   */
  static combine(...ranges: ContentRange[]): ContentRange {
    if (!ranges || ranges.length === 0) {
      throw new Error("At least one range must be provided.");
    }
    return new ContentRange(ranges.map((r) => r._value).join(","));
  }

  /**
   * Returns the wire format string representation of this ContentRange.
   */
  toString(): string {
    return this._value;
  }
}

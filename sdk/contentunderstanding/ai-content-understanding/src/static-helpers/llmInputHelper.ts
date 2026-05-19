// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ErrorModel } from "@azure-rest/core-client";
import type {
  AnalysisContentUnion,
  AnalysisResult,
  ArrayField,
  AudioVisualContent,
  ContentField,
  ContentFieldUnion,
  DocumentContent,
  DocumentContentSegment,
  DocumentPage,
  JsonField,
  ObjectField,
} from "../models/models.js";

/**
 * Options for {@link toLlmInput}.
 */
export interface ToLlmInputOptions {
  /**
   * Whether to include structured fields in the output. Defaults to `true`.
   * Set to `false` for markdown-only output (smaller token footprint, no
   * structured data).
   */
  includeFields?: boolean;
  /**
   * Whether to include markdown content in the output. Defaults to `true`.
   * Set to `false` for fields-only output.
   */
  includeMarkdown?: boolean;
  /**
   * Optional user-supplied key/value pairs to include in the YAML front
   * matter. Common keys include `"source"` (filename), `"department"`,
   * `"batchId"`, etc. Metadata keys are placed after `contentType` and
   * before auto-detected keys (`timeRange`, `category`, `pages`).
   *
   * Metadata keys must not conflict with helper-generated front matter
   * keys: `contentType`, `timeRange`, `category`, `pages`, `fields`, or
   * `rai_warnings`.
   */
  metadata?: Record<string, unknown>;
}

const RESERVED_METADATA_KEYS: ReadonlySet<string> = new Set([
  "contentType",
  "timeRange",
  "category",
  "pages",
  "fields",
  "rai_warnings",
]);

/**
 * Convert a Content Understanding analysis result into LLM-friendly text.
 *
 * Produces a YAML front matter block (delimited by `---`) followed by a
 * markdown body, suitable for injecting into an LLM prompt, storing in a
 * vector database, or passing as tool output.
 *
 * The YAML front matter may include:
 * - `contentType` — document, audioVisual
 * - `pages` — page number or range (e.g. `1` or `1-3`)
 * - `timeRange` — media time span (multi-segment audio/video only)
 * - `category` — classification label
 * - `fields` — extracted structured fields as YAML
 * - `rai_warnings` — content safety flags
 * - any caller-supplied `metadata` entries
 *
 * The markdown body contains the extracted text with page-break markers
 * (`<!-- page N -->`) inserted at page boundaries so downstream consumers
 * can locate content by page number.
 *
 * For single-content results (documents, images), the output is a flat
 * text block. For multi-segment results (video, audio), each segment is
 * rendered with its time range. For document classification results
 * (parent with nested segments), the helper automatically expands the
 * parent into per-segment blocks with category labels and markdown
 * slices.
 *
 * @param result - The {@link AnalysisResult} from a Content Understanding
 *   analyze operation.
 * @param options - Optional rendering options. See {@link ToLlmInputOptions}.
 * @returns A formatted string with YAML front matter followed by markdown
 *   content. Returns an empty string when `result.contents` is empty.
 *
 * @throws TypeError when `result` is not a valid `AnalysisResult`.
 * @throws Error when `metadata` contains a reserved front matter key.
 *
 * @example Basic usage
 * ```ts snippet:ignore
 * import {
 *   ContentUnderstandingClient,
 *   toLlmInput,
 * } from "@azure/ai-content-understanding";
 * import { DefaultAzureCredential } from "@azure/identity";
 *
 * const client = new ContentUnderstandingClient(endpoint, new DefaultAzureCredential());
 * const poller = client.analyze("prebuilt-invoice", [{ url }]);
 * const result = await poller.pollUntilDone();
 * const text = toLlmInput(result);
 * ```
 */
export function toLlmInput(result: AnalysisResult, options: ToLlmInputOptions = {}): string {
  if (!result || !Array.isArray((result as AnalysisResult).contents)) {
    throw new TypeError("Expected an AnalysisResult with a 'contents' array.");
  }

  const includeFields = options.includeFields ?? true;
  const includeMarkdown = options.includeMarkdown ?? true;
  const metadata = options.metadata;
  validateMetadata(metadata);

  if (result.contents.length === 0) {
    return "";
  }

  const contents = getRenderableContents(result.contents);
  if (contents.length === 0) {
    return "";
  }

  const avCount = contents.reduce(
    (count, content) => (content.kind === "audioVisual" ? count + 1 : count),
    0,
  );
  const isMultiSegment = avCount > 1;

  const blocks: string[] = [];
  for (const content of contents) {
    const block = renderContentBlock(content, result, {
      includeFields,
      includeMarkdown,
      metadata,
      isMultiSegment,
    });
    if (block) {
      blocks.push(block);
    }
  }

  return blocks.join("\n\n*****\n\n");
}

function validateMetadata(metadata: Record<string, unknown> | undefined): void {
  if (!metadata) {
    return;
  }
  const reserved = Object.keys(metadata)
    .filter((key) => RESERVED_METADATA_KEYS.has(key))
    .sort();
  if (reserved.length > 0) {
    throw new Error(
      `metadata contains reserved front matter key(s): ${reserved.join(", ")}. ` +
        "Use custom keys such as 'source', 'documentId', or 'department' instead.",
    );
  }
}

// ---------------------------------------------------------------------------
// Field resolution
// ---------------------------------------------------------------------------

/**
 * Recursively flattens a `ContentField` tree to plain JSON-friendly values.
 * Internal helper exported only for tests; not part of the public API.
 *
 * @internal
 */
export function _resolveFields(fields: Record<string, ContentFieldUnion>): Record<string, unknown> {
  const resolved: Record<string, unknown> = {};
  for (const [name, field] of Object.entries(fields)) {
    if (!field) {
      continue;
    }
    const val = resolveFieldValue(field);
    if (val !== null && val !== undefined) {
      resolved[name] = val;
    }
  }
  return resolved;
}

function resolveFieldValue(field: ContentFieldUnion | ContentField): unknown {
  // Object field - recurse into nested fields.
  if ((field as ObjectField).fieldType === "object") {
    const obj = (field as ObjectField).value;
    if (!obj) {
      return null;
    }
    const resolved = _resolveFields(obj);
    return Object.keys(resolved).length > 0 ? resolved : null;
  }

  // Array field - resolve each item.
  if ((field as ArrayField).fieldType === "array") {
    const arr = (field as ArrayField).value;
    if (!arr || arr.length === 0) {
      return null;
    }
    const items: unknown[] = [];
    for (const item of arr) {
      const resolved = resolveFieldValue(item);
      if (resolved !== null && resolved !== undefined) {
        items.push(resolved);
      }
    }
    return items.length > 0 ? items : null;
  }

  // JSON field - the value is already a parsed JS value tree.
  if ((field as JsonField).fieldType === "json") {
    const val = (field as JsonField).value;
    return val === undefined ? null : val;
  }

  // Leaf field - read the unified `value` convenience property.
  const val = (field as ContentField).value;
  if (val === undefined || val === null) {
    return null;
  }

  // ISO format dates so the YAML serializer treats them as scalars.
  if (val instanceof Date) {
    return val.toISOString().slice(0, 10);
  }

  return val;
}

// ---------------------------------------------------------------------------
// Content rendering
// ---------------------------------------------------------------------------

/**
 * Flattens the contents list for rendering. In classification scenarios, the
 * service returns a parent DocumentContent (with full markdown and segments)
 * plus separate routed DocumentContent items (with their own markdown and
 * fields) for segments that matched a specific analyzer.
 *
 * Example input:
 *   contents[0] = parent doc
 *     path="input1", category=undefined
 *     markdown="INVOICE\nVendor: Contoso\nTotal: $1500\n<!-- PageBreak -->\nRECEIPT\nStore: Fabrikam"
 *     segments=[
 *       { segmentId: "seg1", category: "invoice", startPageNumber: 1, span: {offset:0, length:38} },
 *       { segmentId: "seg2", category: "receipt", startPageNumber: 2, span: {offset:55, length:37} }
 *     ]
 *   contents[1] = routed doc (produced by prebuilt-invoice analyzer)
 *     path="input1/seg1", category="invoice"
 *     markdown="INVOICE\nVendor: Contoso\nTotal: $1500"  (analyzer's own markdown)
 *     fields={ vendor: "Contoso", total: 1500 }
 *
 * This function:
 *   1. Identifies contents[1] as a routed version of seg1 (path "input1/seg1" matches).
 *   2. Skips seg1 during parent expansion — the routed version (with its own
 *      markdown and fields) will be used directly instead of slicing from the parent.
 *   3. Creates a synthetic DocumentContent for seg2 by slicing the parent's markdown
 *      using span {offset:55, length:37}.
 *   4. Sorts all results by page number so blocks appear in document order.
 *
 * Result: [routed invoice (page 1, own markdown + fields), synthetic receipt (page 2, sliced markdown)]
 */
function getRenderableContents(contents: AnalysisContentUnion[]): AnalysisContentUnion[] {
  // Collect paths of routed top-level content items.
  const routedPaths = new Set<string>();
  for (const c of contents) {
    if (c.kind === "document" && c.category && c.path) {
      routedPaths.add(c.path);
    }
  }

  const ordered: { content: AnalysisContentUnion; originalOrder: number }[] = [];
  let expandedClassification = false;
  let originalOrder = 0;

  for (const c of contents) {
    if (c.kind === "document") {
      const dc = c as DocumentContent;
      if (dc.segments && dc.segments.length > 0 && !dc.category) {
        expandedClassification = true;
        const parentPath = dc.path ?? "";
        for (const seg of dc.segments) {
          const segPath = seg.segmentId ? `${parentPath}/${seg.segmentId}` : undefined;
          if (segPath && routedPaths.has(segPath)) {
            // The routed top-level content (with fields) is rendered instead.
            continue;
          }
          ordered.push({
            content: synthesizeSegmentContent(dc, seg),
            originalOrder: originalOrder++,
          });
        }
        continue;
      }
    }
    ordered.push({ content: c, originalOrder: originalOrder++ });
  }

  if (expandedClassification) {
    // Sort classification blocks by start page so routed segments (with fields)
    // appear in document order. Tie-break on original order to remain stable.
    ordered.sort((a, b) => {
      const pa = a.content.kind === "document" ? (a.content as DocumentContent).startPageNumber : 0;
      const pb = b.content.kind === "document" ? (b.content as DocumentContent).startPageNumber : 0;
      return pa !== pb ? pa - pb : a.originalOrder - b.originalOrder;
    });
  }

  return ordered.map((item) => item.content);
}

function synthesizeSegmentContent(
  parent: DocumentContent,
  seg: DocumentContentSegment,
): DocumentContent {
  let markdown: string | undefined;
  if (parent.markdown && seg.span) {
    const offset = seg.span.offset ?? 0;
    const length = seg.span.length ?? 0;
    if (offset >= 0 && offset + length <= parent.markdown.length) {
      markdown = parent.markdown.substring(offset, offset + length);
    }
  }
  return {
    kind: "document",
    mimeType: parent.mimeType,
    category: seg.category,
    markdown,
    startPageNumber: seg.startPageNumber,
    endPageNumber: seg.endPageNumber,
  };
}

interface RenderOptions {
  includeFields: boolean;
  includeMarkdown: boolean;
  metadata: Record<string, unknown> | undefined;
  isMultiSegment: boolean;
}

function renderContentBlock(
  content: AnalysisContentUnion,
  result: AnalysisResult,
  opts: RenderOptions,
): string {
  // Build ordered front matter entries.
  const fm: [string, unknown][] = [];

  // 1. contentType
  fm.push(["contentType", content.kind ?? "unknown"]);

  // 2. user metadata
  if (opts.metadata) {
    for (const [key, value] of Object.entries(opts.metadata)) {
      fm.push([key, value]);
    }
  }

  // 3. timeRange (only multi-segment audioVisual)
  if (content.kind === "audioVisual" && opts.isMultiSegment) {
    const av = content as AudioVisualContent;
    fm.push(["timeRange", formatTimeRange(av.startTimeMs, av.endTimeMs)]);
  }

  // 4. category
  if (content.category) {
    fm.push(["category", content.category]);
  }

  // 5. pages
  const pagesVal = formatPages(content);
  if (pagesVal !== null && pagesVal !== undefined) {
    fm.push(["pages", pagesVal]);
  }

  // 6. fields
  if (opts.includeFields && content.fields) {
    const resolved = _resolveFields(content.fields);
    if (Object.keys(resolved).length > 0) {
      fm.push(["fields", resolved]);
    }
  }

  // 7. rai_warnings (always emitted regardless of include flags)
  if (result.warnings && result.warnings.length > 0) {
    const warningsList = formatWarnings(result.warnings);
    if (warningsList.length > 0) {
      fm.push(["rai_warnings", warningsList]);
    }
  }

  const frontMatter = buildFrontMatter(fm);

  if (opts.includeMarkdown && content.markdown) {
    let md = content.markdown;
    if (content.kind === "document") {
      md = addPageMarkers(content as DocumentContent, md);
    }
    return `${frontMatter}\n${md}`;
  }
  return frontMatter;
}

// ---------------------------------------------------------------------------
// Page numbering
// ---------------------------------------------------------------------------

const PAGE_BREAK_PATTERN = /\n*<!-- PageBreak -->\n*/g;

function addPageMarkers(content: DocumentContent, markdown: string): string {
  if (content.pages && content.pages.length > 0) {
    const fromSpans = pageMarkersFromSpans(markdown, content.pages);
    if (fromSpans !== markdown) {
      return fromSpans;
    }
  }
  return pageMarkersFromBreaks(markdown, content);
}

function pageMarkersFromSpans(markdown: string, pages: DocumentPage[]): string {
  const markers: { offset: number; pageNumber: number }[] = [];
  for (const page of pages) {
    if (page.spans && page.spans.length > 0) {
      markers.push({ offset: page.spans[0].offset, pageNumber: page.pageNumber });
    }
  }
  if (markers.length === 0) {
    return markdown;
  }
  markers.sort((a, b) => a.offset - b.offset);

  // Strip <!-- PageBreak --> markers since page markers replace them.
  const cleaned = markdown.replace(PAGE_BREAK_PATTERN, "\n\n");

  // Compute offset shifts to remap original offsets onto the cleaned string.
  const shifts: { position: number; delta: number }[] = [];
  PAGE_BREAK_PATTERN.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = PAGE_BREAK_PATTERN.exec(markdown)) !== null) {
    const replacementLen = 2; // "\n\n"
    shifts.push({ position: m.index, delta: m[0].length - replacementLen });
  }
  PAGE_BREAK_PATTERN.lastIndex = 0;

  function adjustedOffset(orig: number): number {
    let total = 0;
    for (const s of shifts) {
      if (orig > s.position) {
        total += s.delta;
      }
    }
    return orig - total;
  }

  const parts: string[] = [];
  let prev = 0;
  for (const marker of markers) {
    const adj = Math.min(adjustedOffset(marker.offset), cleaned.length);
    if (adj > prev) {
      parts.push(cleaned.substring(prev, adj));
    }
    parts.push(`<!-- page ${marker.pageNumber} -->\n\n`);
    prev = adj;
  }
  if (prev < cleaned.length) {
    parts.push(cleaned.substring(prev));
  }
  return parts.join("");
}

function pageMarkersFromBreaks(markdown: string, content: DocumentContent): string {
  const startPage = content.startPageNumber > 0 ? content.startPageNumber : 1;
  const chunks = markdown.split(PAGE_BREAK_PATTERN);
  PAGE_BREAK_PATTERN.lastIndex = 0;
  const parts: string[] = [];
  for (let i = 0; i < chunks.length; i++) {
    const text = chunks[i].trim();
    if (text) {
      parts.push(`<!-- page ${startPage + i} -->\n\n${text}`);
    }
  }
  return parts.join("\n\n");
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function formatTimeRange(startMs: number, endMs: number): string {
  const fmt = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  return `${fmt(startMs)} \u2013 ${fmt(endMs)}`;
}

function formatPages(content: AnalysisContentUnion): number | string | null {
  if (content.kind !== "document") {
    return null;
  }
  const dc = content as DocumentContent;
  if (dc.pages && dc.pages.length > 0) {
    const nums: number[] = [];
    for (const p of dc.pages) {
      if (typeof p.pageNumber === "number" && p.pageNumber > 0) {
        nums.push(p.pageNumber);
      }
    }
    if (nums.length > 0) {
      nums.sort((a, b) => a - b);
      return compressPageNumbers(nums);
    }
  }
  const start = dc.startPageNumber;
  const end = dc.endPageNumber;
  if (!start && !end) {
    return null;
  }
  if (start === end) {
    return start;
  }
  return `${start}-${end}`;
}

/**
 * Compress a sorted list of page numbers into a compact representation.
 * Examples: `[1] -> 1`, `[1, 2, 3] -> "1-3"`, `[2, 3, 5] -> "2-3, 5"`.
 *
 * @internal
 */
export function _compressPageNumbers(nums: number[]): number | string {
  return compressPageNumbers(nums);
}

function compressPageNumbers(nums: number[]): number | string {
  if (nums.length === 0) {
    return 0;
  }
  if (nums.length === 1) {
    return nums[0];
  }
  const ranges: string[] = [];
  let rangeStart = nums[0];
  let prev = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === prev + 1) {
      prev = nums[i];
    } else {
      ranges.push(rangeStart === prev ? `${rangeStart}` : `${rangeStart}-${prev}`);
      rangeStart = nums[i];
      prev = nums[i];
    }
  }
  ranges.push(rangeStart === prev ? `${rangeStart}` : `${rangeStart}-${prev}`);
  return ranges.join(", ");
}

function formatWarnings(warnings: ErrorModel[]): Record<string, string>[] {
  const items: Record<string, string>[] = [];
  for (const w of warnings) {
    if (!w) {
      continue;
    }
    const entry: Record<string, string> = {};
    if (w.code) {
      entry.code = w.code;
    }
    if (w.message) {
      entry.message = w.message;
    }
    if (w.target) {
      entry.target = w.target;
    }
    if (Object.keys(entry).length > 0) {
      items.push(entry);
    }
  }
  return items;
}

// ---------------------------------------------------------------------------
// Minimal YAML serializer (no external dependency)
// ---------------------------------------------------------------------------

const YAML_SPECIAL_START = /^[-?:,[\]{}#&*!|>'"%@`]/;
const YAML_SPECIAL_INSIDE = /[:#] |[\n\r]/;
const YAML_BOOL = /^(true|false|yes|no|on|off|null)$/i;
const YAML_NUMBER = /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/;
const YAML_DATE = /^\d{4}-\d{2}-\d{2}/;

/**
 * Serialize a JS value to its YAML scalar form.
 *
 * @internal
 */
export function _yamlScalar(value: unknown): string {
  return yamlScalar(value);
}

function yamlScalar(value: unknown): string {
  if (value === null || value === undefined) {
    return "null";
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return String(value);
    }
    return Number.isInteger(value) ? String(value) : String(value);
  }
  const s = String(value);
  const needsQuote =
    s.length === 0 ||
    YAML_BOOL.test(s) ||
    YAML_NUMBER.test(s) ||
    YAML_DATE.test(s) ||
    YAML_SPECIAL_START.test(s) ||
    YAML_SPECIAL_INSIDE.test(s);
  return needsQuote ? `'${s.replace(/'/g, "''")}'` : s;
}

/**
 * Build a `---` delimited YAML front matter string from an ordered list of entries.
 *
 * @internal
 */
export function _buildFrontMatter(entries: [string, unknown][]): string {
  return buildFrontMatter(entries);
}

function buildFrontMatter(entries: [string, unknown][]): string {
  const lines: string[] = ["---"];
  emitEntries(lines, entries, 0);
  lines.push("---");
  return lines.join("\n");
}

function emitEntries(lines: string[], entries: [string, unknown][], indent: number): void {
  const prefix = "  ".repeat(indent);
  for (const [key, value] of entries) {
    if (value === null || value === undefined) {
      continue;
    }
    const safeKey = yamlScalar(key);
    if (isPlainObject(value)) {
      const nested = Object.entries(value as Record<string, unknown>);
      if (nested.length === 0) {
        continue;
      }
      lines.push(`${prefix}${safeKey}:`);
      emitEntries(lines, nested as [string, unknown][], indent + 1);
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        continue;
      }
      lines.push(`${prefix}${safeKey}:`);
      emitSequence(lines, value, indent);
    } else {
      lines.push(`${prefix}${safeKey}: ${yamlScalar(value)}`);
    }
  }
}

function emitSequence(lines: string[], sequence: unknown[], indent: number): void {
  const prefix = "  ".repeat(indent);
  for (const item of sequence) {
    if (isPlainObject(item)) {
      const entries = Object.entries(item as Record<string, unknown>).filter(
        ([, v]) => v !== null && v !== undefined,
      );
      if (entries.length === 0) {
        continue;
      }
      let first = true;
      for (const [k, v] of entries) {
        const tag = first ? `${prefix}- ` : `${prefix}  `;
        const safeKey = yamlScalar(k);
        if (isPlainObject(v)) {
          const nested = Object.entries(v as Record<string, unknown>);
          if (nested.length > 0) {
            lines.push(`${tag}${safeKey}:`);
            emitEntries(lines, nested as [string, unknown][], indent + 2);
          } else {
            lines.push(`${tag}${safeKey}: ${yamlScalar(v)}`);
          }
        } else if (Array.isArray(v) && v.length > 0) {
          lines.push(`${tag}${safeKey}:`);
          emitSequence(lines, v, indent + 2);
        } else {
          lines.push(`${tag}${safeKey}: ${yamlScalar(v)}`);
        }
        first = false;
      }
    } else {
      lines.push(`${prefix}- ${yamlScalar(item)}`);
    }
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== "object") {
    return false;
  }
  if (Array.isArray(value) || value instanceof Date) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

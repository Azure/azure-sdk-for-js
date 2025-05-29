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
export declare function quoteETag(etag: string | undefined): string | undefined;
//# sourceMappingURL=util.d.ts.map
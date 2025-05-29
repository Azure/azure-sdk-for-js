/**
 * Rewrites a given URL to use the specified base URL.
 * It preserves the pathname, search parameters, and fragment.
 * Handles relative URLs and proper encoding.
 *
 * @param params - An object containing the url and baseUrl.
 *                    url - The original URL (absolute or relative).
 *                    baseUrl - The new base URL to use.
 * @returns The rewritten URL as a string.
 */
export declare function rewriteUrl({ url, baseUrl, }: {
    url?: string;
    baseUrl?: string;
}): string | undefined;
//# sourceMappingURL=utils.d.ts.map
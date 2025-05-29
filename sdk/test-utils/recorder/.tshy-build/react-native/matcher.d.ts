import { HttpClient } from "@azure/core-rest-pipeline";
export type Matcher = "HeaderlessMatcher" | "BodilessMatcher" | "CustomDefaultMatcher";
/**
 * Body the customer matcher expects.
 */
export interface CustomMatcherOptions {
    /**
     * Should the body value be compared during lookup operations?
     */
    compareBodies?: boolean;
    /**
     * Array of additional headers that should be excluded during matching.
     */
    excludedHeaders?: string[];
    /**
     * By default, the test-proxy does not sort query params before matching. Setting true will sort query params alphabetically before comparing URI.
     */
    ignoreQueryOrdering?: boolean;
}
/**
 * Body the customer matcher expects.
 *
 * // Ignored Headers option is not exposed to the users as of now.
 * // If needed, this can be moved into CustomMatcherOptions.
 */
interface InternalCustomMatcherOptions extends CustomMatcherOptions {
    /**
     * Array of additional headers that should be ignored during matching.
     * Any headers that are "ignored" will not do value comparison when matching.
     * This means that if the recording has a header that isn't in the request, a test mismatch exception will be thrown noting the lack of header in the request.
     *
     * This also applies if the header is present in the request but not recording.
     */
    ignoredHeaders?: string[];
}
export declare function setMatcher(recorderUrl: string, httpClient: HttpClient, matcher: Matcher, recordingId?: string, matcherBody?: InternalCustomMatcherOptions): Promise<void>;
export {};
//# sourceMappingURL=matcher.d.ts.map
import type { ChangeFeedStartFrom } from "./ChangeFeedStartFrom.js";
import type { ChangeFeedMode } from "./ChangeFeedMode.js";
/**
 * Specifies options for the change feed
 *
 * If none of those options are set, it will start reading changes from now for the entire container.
 */
export interface ChangeFeedIteratorOptions {
    /**
     * Max amount of items to return per page
     */
    maxItemCount?: number;
    /**
     * The session token to use. If not specified, will use the most recent captured session token to start with.
     */
    sessionToken?: string;
    /**
     * Signals where to start from in the change feed.
     */
    changeFeedStartFrom?: ChangeFeedStartFrom;
    /**
     * Signals the mode in which the change feed needs to start.
     */
    changeFeedMode?: ChangeFeedMode;
}
//# sourceMappingURL=ChangeFeedIteratorOptions.d.ts.map
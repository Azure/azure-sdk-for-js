import type { LogsQueryOptions } from "../models/publicLogsModels.js";
/**
 * @internal
 */
export declare function formatPreferHeader(args: Pick<LogsQueryOptions, "serverTimeoutInSeconds" | "includeQueryStatistics" | "includeVisualization"> | undefined): {
    Prefer: string;
} | undefined;
//# sourceMappingURL=util.d.ts.map
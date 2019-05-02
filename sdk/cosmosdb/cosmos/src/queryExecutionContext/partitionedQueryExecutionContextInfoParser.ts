/** @hidden */
const PartitionedQueryContants = {
  QueryInfoPath: "queryInfo",
  TopPath: ["queryInfo", "top"],
  OrderByPath: ["queryInfo", "orderBy"],
  AggregatePath: ["queryInfo", "aggregates"],
  QueryRangesPath: "queryRanges",
  RewrittenQueryPath: ["queryInfo", "rewrittenQuery"]
};

/** @hidden */
export interface PartitionedQueryExecutionContextInfo {
  [key: string]: any;
}

// TODO: any partitionedQueryExecutionInfo
/** @hidden */
export class PartitionedQueryExecutionContextInfoParser {
  public static parseRewrittenQuery(partitionedQueryExecutionInfo: { [key: string]: any }) {
    return this._extract(partitionedQueryExecutionInfo, PartitionedQueryContants.RewrittenQueryPath);
  }
  public static parseQueryRanges(partitionedQueryExecutionInfo: { [key: string]: any }) {
    return this._extract(partitionedQueryExecutionInfo, PartitionedQueryContants.QueryRangesPath);
  }
  public static parseOrderBy(partitionedQueryExecutionInfo: { [key: string]: any }) {
    return this._extract(partitionedQueryExecutionInfo, PartitionedQueryContants.OrderByPath);
  }
  public static parseAggregates(partitionedQueryExecutionInfo: { [key: string]: any }) {
    return this._extract(partitionedQueryExecutionInfo, PartitionedQueryContants.AggregatePath);
  }
  public static parseTop(partitionedQueryExecutionInfo: { [key: string]: any }) {
    return this._extract(partitionedQueryExecutionInfo, PartitionedQueryContants.TopPath);
  }
  private static _extract(partitionedQueryExecutionInfo: { [key: string]: any }, path: string | string[]) {
    let item = partitionedQueryExecutionInfo;
    if (typeof path === "string") {
      return item[path];
    }
    if (!Array.isArray(path)) {
      throw new Error(`JSON.stringify(path is expected to be an array`);
    }
    for (const p of path) {
      item = item[p];
      if (item === undefined) {
        return;
      }
    }
    return item;
  }
}

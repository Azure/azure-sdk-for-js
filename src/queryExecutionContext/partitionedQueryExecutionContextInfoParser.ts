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
export function parseRewrittenQuery(partitionedQueryExecutionInfo: { [key: string]: any }) {
  return _extract(partitionedQueryExecutionInfo, PartitionedQueryContants.RewrittenQueryPath);
}
export function parseQueryRanges(partitionedQueryExecutionInfo: { [key: string]: any }) {
  return _extract(partitionedQueryExecutionInfo, PartitionedQueryContants.QueryRangesPath);
}
export function parseOrderBy(partitionedQueryExecutionInfo: { [key: string]: any }) {
  return _extract(partitionedQueryExecutionInfo, PartitionedQueryContants.OrderByPath);
}
export function parseAggregates(partitionedQueryExecutionInfo: { [key: string]: any }) {
  return _extract(partitionedQueryExecutionInfo, PartitionedQueryContants.AggregatePath);
}
export function parseTop(partitionedQueryExecutionInfo: { [key: string]: any }) {
  return _extract(partitionedQueryExecutionInfo, PartitionedQueryContants.TopPath);
}
function _extract(partitionedQueryExecutionInfo: { [key: string]: any }, path: string | string[]) {
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

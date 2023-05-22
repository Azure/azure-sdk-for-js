import {
  KnownSearchFieldDataType,
  KnownVectorSearchAlgorithmMetric,
} from "../../src/generated/service";
import {
  KnownSemanticPartialResponseReason,
  KnownSemanticPartialResponseType,
  KnownQueryDebugMode,
  KnownSemanticErrorHandling,
  KnownQueryResultDocumentSemanticFieldState,
} from "../../src/generated/data";
import {
  ComplexDataType,
  SearchFieldDataType,
  SemanticPartialResponseReason,
  SemanticPartialResponseType,
  QueryDebugMode,
  SemanticErrorHandling,
  QueryResultDocumentSemanticFieldState,
  VectorSearchAlgorithmMetric,
} from "../../src/index";

type IsIdentical<T1, T2> = (<T>() => T extends T1 ? true : false) extends <T>() => T extends T2
  ? true
  : false
  ? any
  : never;

type ExpectSearchFieldDataType = Exclude<
  `${KnownSearchFieldDataType}` | `Collection(${KnownSearchFieldDataType})`,
  ComplexDataType | "Edm.Single"
>;
type ExpectSemanticPartialResponseReason = `${KnownSemanticPartialResponseReason}`;
type ExpectSemanticPartialResponseType = `${KnownSemanticPartialResponseType}`;
type ExpectQueryDebugMode = `${KnownQueryDebugMode}`;
type ExpectSemanticErrorHandling = `${KnownSemanticErrorHandling}`;
type ExpectQueryResultDocumentSemanticFieldState = `${KnownQueryResultDocumentSemanticFieldState}`;
type ExpectVectorSearchAlgorithmMetric = `${KnownVectorSearchAlgorithmMetric}`;

//@ts-ignore
function fun() {
  const a: IsIdentical<ExpectSearchFieldDataType, SearchFieldDataType> = "pass";
  const b: IsIdentical<ExpectSemanticPartialResponseReason, SemanticPartialResponseReason> = "pass";
  const c: IsIdentical<ExpectSemanticPartialResponseType, SemanticPartialResponseType> = "pass";
  const d: IsIdentical<ExpectQueryDebugMode, QueryDebugMode> = "pass";
  const e: IsIdentical<ExpectSemanticErrorHandling, SemanticErrorHandling> = "pass";
  const f: IsIdentical<
    ExpectQueryResultDocumentSemanticFieldState,
    QueryResultDocumentSemanticFieldState
  > = "pass";
  const g: IsIdentical<ExpectVectorSearchAlgorithmMetric, VectorSearchAlgorithmMetric> = "pass";

  return [a, b, c, d, e, f, g];
}

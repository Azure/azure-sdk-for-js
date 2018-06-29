import { IndexingMode } from ".";
import { DataType, IndexKind } from "./documents";

export interface IndexingPolicy {
    /** The indexing mode (consistent or lazy) {@link IndexingMode}. */
    indexingMode?: IndexingMode;
    automatic?: boolean;
    /** An array of {@link IncludedPath} represents the paths to be included for indexing. */
    includedPaths?: IndexedPath[];
    /** An array of {@link IncludedPath} represents the paths to be excluded for indexing. */
    excludedPaths?: IndexedPath[];
}

export interface IndexedPath {
    path: string;
    indexes?: Index[];
}

export interface Index {
    kind: IndexKind;
    dataType: DataType;
    precision?: number;
}

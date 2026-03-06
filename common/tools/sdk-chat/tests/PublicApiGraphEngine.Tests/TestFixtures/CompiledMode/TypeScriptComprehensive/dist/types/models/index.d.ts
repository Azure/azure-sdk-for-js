/**
 * Resource represents a managed resource in the system.
 */
export interface Resource {
    readonly id: string;
    readonly createdAt: Date;
    tags?: Record<string, string>;
    [key: string]: unknown;
}

/**
 * A paginated result set.
 */
export interface PagedResult<T> {
    items: T[];
    continuationToken?: string;
}

/**
 * Discriminated union representing the result of an operation.
 */
export type OperationResult<T> = {
    status: "succeeded";
    value: T;
} | {
    status: "failed";
    error: Error;
};

/**
 * Recursively makes all properties optional.
 */
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 * Extracts keys of T whose values extend V.
 */
export type KeysOfType<T, V> = {
    [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

/**
 * A read-only version of Resource.
 */
export type ReadonlyResource = Readonly<Resource>;

/**
 * A Resource or an Error.
 */
export type ResourceOrError = Resource | Error;

/**
 * Nested generic type alias.
 */
export type NestedGeneric<T> = PagedResult<OperationResult<T>>;

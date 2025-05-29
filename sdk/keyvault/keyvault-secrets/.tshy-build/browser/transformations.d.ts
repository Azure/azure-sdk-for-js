import type { PagedAsyncIterableIterator } from "./generated/index.js";
import type { DeletedSecretBundle, SecretBundle } from "./generated/models/index.js";
import type { KeyVaultSecret } from "./secretsModels.js";
import type { OperationOptions } from "@azure-rest/core-client";
/**
 * @internal
 * Shapes the exposed {@link KeyVaultKey} based on either a received secret bundle or deleted secret bundle.
 */
export declare function getSecretFromSecretBundle(bundle: SecretBundle | DeletedSecretBundle): KeyVaultSecret;
/**
 * A helper supporting compatibility between modular and legacy paged async iterables.
 *
 * Provides the following compatibility:
 * 1. Maps the values of the paged async iterable using the provided mapper function.
 * 2. Supports `maxPageSize` operation on the paged async iterable.
 *
 * TODO: move this to keyvault-common once everything is merged
 */
export declare function mapPagedAsyncIterable<TGenerated, TPublic, TOptions extends OperationOptions & {
    maxresults?: number;
}>(operation: (options: TOptions) => PagedAsyncIterableIterator<TGenerated>, operationOptions: TOptions, mapper: (x: TGenerated) => TPublic): PagedAsyncIterableIterator<TPublic>;
//# sourceMappingURL=transformations.d.ts.map
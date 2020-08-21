import { CommonOptions } from '@azure/storage-blob';
import { AbortSignalLike } from '@azure/core-http';

/**
 * Options to configure {@link BlobChangeFeedClient.listChanges} operation.
 *
 * @export
 * @interface BlobChangeFeedListChangesOptions
 */
export interface BlobChangeFeedListChangesOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof BlobChangeFeedListChangesOptions
     */
    abortSignal?: AbortSignalLike;
    start?: Date;
    end?: Date;
}

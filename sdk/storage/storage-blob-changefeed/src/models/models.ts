import { CommonOptions } from "@azure/storage-blob";
import { AbortSignalLike } from "@azure/core-http";

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

  /**
   * Specify the start of the time range during which the change feed records will be fetched.
   * Note that for now the change feed client will round start time down to the nearest hour.
   *
   * @type {Date}
   * @memberof BlobChangeFeedListChangesOptions
   */
  start?: Date;

  /**
   * Specify the end of the time range during which the change feed records will be fetched.
   * Note that for now the change feed client will round end time up to the nearest hour.
   *
   * @type {Date}
   * @memberof BlobChangeFeedListChangesOptions
   */
  end?: Date;
}

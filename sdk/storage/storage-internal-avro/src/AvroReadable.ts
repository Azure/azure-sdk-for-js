// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";

/**
 * Options to configure the {@link AvroReadable.read} operation.
 *
 * @export
 * @interface AvroReadableReadOptions
 */
export interface AvroReadableReadOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AvroReadableReadOptions
   */
  abortSignal?: AbortSignalLike;
}

export abstract class AvroReadable {
  public abstract get position(): number;
  public abstract read(size: number, options?: AvroReadableReadOptions): Promise<Uint8Array>;
}

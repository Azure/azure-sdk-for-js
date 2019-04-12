/// <reference lib="esnext.asynciterable" />

/**
 * The resuming point of {@link ResumableAsyncIterableIterator<T>}
 *
 * @interface ResumePoint
 */
export interface ResumePoint {
  /**
   * @member {string} [nextMarker] Marker to retrieve next listing segment.
   */
  nextMarker: string;
  /**
   * @member {number} [lastIndex] last index of the item within the current segment.
   */
  lastIndex: number;
}

/**
 * An async iterable iterator whose iterations can be resumed at the {@link resumePoint}.
 *
 * @interface ResumableAsyncIterableIterator
 * @extends {AsyncIterableIterator<T>}
 * @template T
 */
export interface ResumableAsyncIterableIterator<T> extends AsyncIterableIterator<T> {
  resumePoint: ResumePoint;
}


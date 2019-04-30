/**
 * Enum for media read mode values.
 */
export enum MediaReadMode {
  /**
   * Content is buffered at the client and not directly streamed from the content store.
   * <p>Use Buffered to reduce the time taken to read and write media files.</p>
   */
  Buffered = "Buffered",
  /**
   * Content is directly streamed from the content store without any buffering at the client.
   * <p>Use Streamed to reduce the client memory overhead of reading and writing media files. </p>
   */
  Streamed = "Streamed"
}

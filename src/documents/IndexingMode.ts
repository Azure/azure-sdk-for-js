/**
 * Specifies the supported indexing modes.
 * @property Consistent
 * @property Lazy
 */
export enum IndexingMode {
  /**
   * <p>Index is updated synchronously with a create or update operation. <br>
   * With consistent indexing, query behavior is the same as the default consistency level for the container.
   * The index is always kept up to date with the data. </p>
   */
  Consistent = "consistent",
  /**
   * <p>Index is updated asynchronously with respect to a create or update operation. <br>
   * With lazy indexing, queries are eventually consistent. The index is updated when the container is idle.</p>
   */
  Lazy = "lazy",
  /** No Index is provided. */
  None = "none"
}

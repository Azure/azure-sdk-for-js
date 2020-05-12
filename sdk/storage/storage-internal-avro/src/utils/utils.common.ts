export interface Metadata {
  /**
   * A name-value pair.
   */
  [propertyName: string]: string;
}

export interface Dictionary<T> {
  [key: string]: T;
}

export interface KeyValuePair<T> {
  key: string;
  value: T;
}

export function arraysEqual(a: Uint8Array, b: Uint8Array) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

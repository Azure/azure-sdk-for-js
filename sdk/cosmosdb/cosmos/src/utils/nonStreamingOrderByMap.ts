// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Stores the most favourable distinct result from a set of nonStreamingOrderBy results.
 */
export class NonStreamingOrderByMap<T> {
  private map: Map<string, T>;
  private compareFn: (a: T | undefined, b: T | undefined) => number;

  constructor(compareFn: (a: T | undefined, b: T | undefined) => number) {
    this.compareFn = compareFn;
    this.map = new Map<string, T>();
  }

  public set(key: string, value: T): void {
    if (!this.map.has(key)) {
      // If the key is not present in the map, add it.
      this.map.set(key, value);
    } else {
      // If the key is present in the map, compare the similarity score of the new value with the old value. Keep the more favourable one.
      const oldValue = this.map.get(key);
      if (this.replaceResults(oldValue, value)) {
        this.map.set(key, value);
      }
    }
  }

  public get(key: string): T | undefined {
    if (!this.map.has(key)) return undefined;

    return this.map.get(key);
  }
  /**
   * Returns all the values in the map and resets the map.
   */
  public getAllValuesAndReset(): T[] {
    const res: T[] = [];
    for (const [key, value] of this.map) {
      res.push(value);
      this.map.delete(key);
    }
    return res;
  }

  private replaceResults(res1: T | undefined, res2: T | undefined): boolean {
    const res = this.compareFn(res1, res2);
    if (res < 0) return true;

    return false;
  }

  public size(): number {
    return this.map.size;
  }
}

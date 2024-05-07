// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export class NonStreamingOrderByMap<T> {
  private map: Map<string, T>;
  private compareFn: (a: T, b: T) => number;

  constructor(compareFn: (a: T, b: T) => number) {
    this.compareFn = compareFn;
    this.map = new Map<string, T>();
  }

  public set(key: string, value: T) : void {
    if (!this.map.has(key)) {
      this.map.set(key, value);
    } else {
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

  public getAllValues(): T[] {
    const res: T[] = [];
    for (const [key, value] of this.map) {
      res.push(value);
      this.map.delete(key);
    }
    return res;
  }

  private replaceResults(res1: T | undefined, res2: T | undefined): boolean {
    const res = this.compareFn(res1 as T, res2 as T);
    if (res < 0) return true;

    return false;
  }

  public size(): number {
    return this.map.size;
  }
}

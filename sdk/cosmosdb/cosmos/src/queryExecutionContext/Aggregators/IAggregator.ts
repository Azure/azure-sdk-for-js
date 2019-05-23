/** @hidden */
export interface IAggregator<T> {
  aggregate: (other: T) => void;
  getResult: () => number;
}

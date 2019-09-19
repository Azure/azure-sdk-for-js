/** @hidden */
export interface IAggregator {
  aggregate: (other: any) => void;
  getResult: () => number;
}

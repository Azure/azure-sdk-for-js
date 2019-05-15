/** @hidden */
export class MockedQueryIterator {
  constructor(private results: any) {}
  public async toArray() {
    return { result: this.results };
  }
}

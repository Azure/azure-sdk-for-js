export class MockedQueryIterator {
    constructor(private results: any) { }
    public toArray(callback: any) {
        callback(undefined, this.results);
    }
}

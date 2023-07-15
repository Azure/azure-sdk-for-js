export class UnwrappedDekCache {
  private dataEncryptionKeyCache: { [key: string]: { value: string } } = {};

  constructor() {
    this.dataEncryptionKeyCache = {};
  }

  public setDataEncryptionKey(key: string, value: string): void {
    this.dataEncryptionKeyCache[key] = { value: value };
    console.log("dekset_unwrapped");
  }

  public getDataEncryptionKey(key: string): string | undefined {
    return this.dataEncryptionKeyCache[key].value;
    console.log("dekfetched_unwrapped");
  }
}

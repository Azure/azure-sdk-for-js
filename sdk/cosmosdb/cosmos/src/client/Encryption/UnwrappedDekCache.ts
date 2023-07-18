export class UnwrappedDekCache {
  private dataEncryptionKeyCache: { [key: string]: { value: string } } = {};

  constructor() {
    this.dataEncryptionKeyCache = {};
  }

  public setDataEncryptionKey(key: string, value: string): void {
    this.dataEncryptionKeyCache[key] = { value: value };
    }

  public getDataEncryptionKey(key: string): string | undefined {
   
   if(this.dataEncryptionKeyCache[key] !== undefined){
    return this.dataEncryptionKeyCache[key].value;
  }
   return undefined;
  }
}

import { EncryptionKeyWrapMetadata } from "./EncryptionKeyWrapMetadata";

export class WrappedDekCache {
  private dataEncryptionKeyCache: {
    [key: string]: { value: [string, EncryptionKeyWrapMetadata] };
  } = {};

  constructor() {
    this.dataEncryptionKeyCache = {};
  }

  public setDataEncryptionKey(
    key: string,
    wrappedKey: string,
    encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata
  ): void {
    this.dataEncryptionKeyCache[key] = { value: [wrappedKey, encryptionKeyWrapMetadata] };
  }

  public getDataEncryptionKey(key: string): [string, EncryptionKeyWrapMetadata] | undefined {
    //TODO check value of dek inside cache. If exists, return it. Else check cosmos service. If there return it. Else return undefined.
    if(this.dataEncryptionKeyCache[key] !== undefined){
    return this.dataEncryptionKeyCache[key].value;
    }
   return undefined;
  }

 
}

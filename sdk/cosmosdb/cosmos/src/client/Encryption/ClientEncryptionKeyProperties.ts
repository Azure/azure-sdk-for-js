import { EncryptionKeyWrapMetadata } from './EncryptionKeyWrapMetadata';

export class ClientEncryptionKeyProperties {
  public readonly Id: string;
  public readonly EncryptionAlgorithm: string;
  public readonly WrappedDataEncryptionKey: Uint8Array;
  public readonly EncryptionKeyWrapMetadata: EncryptionKeyWrapMetadata;

  constructor(
    id: string,
    encryptionAlgorithm: string,
    wrappedDataEncryptionKey: Uint8Array,
    encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata
  ) {
    if (!id) {
      throw new Error('id parameter must not be null or empty.');
    }
    if (!encryptionAlgorithm) {
      throw new Error('encryptionAlgorithm parameter must not be null or empty.');
    }
    if (!wrappedDataEncryptionKey) {
      throw new Error('wrappedDataEncryptionKey parameter must not be null or empty.');
    }
    if (!encryptionKeyWrapMetadata) {
      throw new Error('encryptionKeyWrapMetadata parameter must not be null or empty.');
    }

    this.Id = id;
    this.EncryptionAlgorithm = encryptionAlgorithm;
    this.WrappedDataEncryptionKey = wrappedDataEncryptionKey;
    this.EncryptionKeyWrapMetadata = encryptionKeyWrapMetadata;
  }
}

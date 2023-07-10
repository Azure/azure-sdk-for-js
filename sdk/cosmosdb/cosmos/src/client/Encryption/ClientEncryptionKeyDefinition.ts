import { EncryptionKeyWrapMetadata } from "./EncryptionKeyWrapMetadata";

export interface ClientEncryptionKeyDefinition {
  id: string;
  encryptionAlgorithm: string;
  //wrappedDataEncryptionKey: Uint8Array;
  encryptionKeyWrapMetadata: EncryptionKeyWrapMetadata;
}

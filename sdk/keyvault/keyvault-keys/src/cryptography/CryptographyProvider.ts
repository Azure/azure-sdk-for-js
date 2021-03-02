import {
  EncryptParameters,
  EncryptOptions,
  EncryptResult,
  KeyWrapAlgorithm,
  WrapKeyOptions,
  WrapResult,
  VerifyOptions,
  VerifyResult,
  DecryptParameters,
  DecryptOptions,
  DecryptResult,
  UnwrapKeyOptions,
  SignOptions,
  SignResult
} from "..";
import { SignatureAlgorithm, UnwrapResult } from "../cryptographyClientModels";
import { KeyOperation } from "../keysModels";

export interface CryptographyProvider {
  encrypt(encryptParameters: EncryptParameters, options: EncryptOptions): Promise<EncryptResult>;

  decrypt(decryptParameters: DecryptParameters, options: DecryptOptions): Promise<DecryptResult>;

  supportsAlgorithm(algorithm: string): boolean;

  supportsOperation(opertion: KeyOperation): boolean;

  wrapKey(
    algorithm: KeyWrapAlgorithm,
    keyToWrap: Uint8Array,
    options: WrapKeyOptions
  ): Promise<WrapResult>;

  unwrapKey(
    algorithm: KeyWrapAlgorithm,
    encryptedKey: Uint8Array,
    options: UnwrapKeyOptions
  ): Promise<UnwrapResult>;

  sign(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    options: SignOptions
  ): Promise<SignResult>;

  verify(
    algorithm: SignatureAlgorithm,
    digest: Uint8Array,
    signature: Uint8Array,
    options: VerifyOptions
  ): Promise<VerifyResult>;
}

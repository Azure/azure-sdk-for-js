import { ClientEncryptionPolicy } from "./ClientEncryptionPolicy";
export class ClientEncryptionPolicyCache {
  private clientEncryptionPolicyCache: { [key: string]: { value: ClientEncryptionPolicy } } = {};

  constructor() {
    this.clientEncryptionPolicyCache = {};
  }

  public setClientEncryptionPolicyCache(key: string, value: ClientEncryptionPolicy): void {
    this.clientEncryptionPolicyCache[key] = { value: value };
  }

  public getClientEncryptionPolicyCache(key: string): ClientEncryptionPolicy | undefined {
    return this.clientEncryptionPolicyCache[key].value;
  }
}

import { ClientSecretCredential } from "@azure/identity";
import { CryptographyClient } from "@azure/keyvault-keys";

export class CustomerManagedKey {
  private path: string;
  private cryptographyClient: CryptographyClient;

  constructor(path: string, credentials: ClientSecretCredential) {
    this.path = path;
    this.cryptographyClient = new CryptographyClient(this.path, credentials);
  }

  public async wrapDek(unwrappedDek: string): Promise<string> {
    const wrappedKey = await this.cryptographyClient.wrapKey("RSA-OAEP", Buffer.from(unwrappedDek));
    return Buffer.from(wrappedKey.result).toString("hex");
    // sends request to wrap the DEK
  }

  public async unwrapDek(wrappedDek: string): Promise<string> {
    const unwrappedKey = await this.cryptographyClient.unwrapKey(
      "RSA-OAEP",
      Buffer.from(wrappedDek)
    );
    return Buffer.from(unwrappedKey.result).toString("hex");
    // sends request to unwrap the DEK
  }
}

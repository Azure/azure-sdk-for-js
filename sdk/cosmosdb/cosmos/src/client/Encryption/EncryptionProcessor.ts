import { ClientEncryptionPolicyCache } from "./ClientEncryptionPolicyCache";
import { UnwrappedDekCache } from "./UnwrappedDekCache";
import { createCipheriv, randomBytes, createHash } from "crypto";
import { ClientEncryptionPolicy } from "./ClientEncryptionPolicy";
// import { Items } from "../Item";

export class EncryptionProcessor {
  constructor(
    private clientencryptionpolicycache?: ClientEncryptionPolicyCache,
    private unwrappeddekcache?: UnwrappedDekCache
  ) {}

  public async identifypath(item: any): Promise<void> {
    console.log("inside identify path, policy cache",this.clientencryptionpolicycache);
    console.log("inside identify path, unwrappeddek cache",this.unwrappeddekcache);
    const itemKeys = Object.keys(item);
    itemKeys.map(async (prop) => {
      if (this.clientencryptionpolicycache.getClientEncryptionPolicyCache(prop) !== undefined) {
        console.log("property to encrypt present in item");
        const value = this.clientencryptionpolicycache.getClientEncryptionPolicyCache(prop);
        const encryptedPath = await this.encrypt(item[prop], value);
        item.prop = encryptedPath;
      }
    });
    console.log("encrypted data");
  }
  

  public async encrypt(
    propertyvalue: string,
    clientencryptionpolicy: ClientEncryptionPolicy
  ): Promise<string> {
    console.log("inside encrypt", propertyvalue, clientencryptionpolicy);
    // const encryptionpolicy = new ClientEncryptionPolicy(path, clientencryptionkeyid, Encryptiontype, Encryptionalgorithm);

    // this.clientencryptionpolicycache.setClientEncryptionPolicyCache(encryptionpolicy.path, encryptionpolicy);
    const propertytoencrypt = propertyvalue;
    const key = clientencryptionpolicy.clientencryptionkeyid;
    let iv: Buffer = undefined;

    const dek = this.unwrappeddekcache.getDataEncryptionKey(key);
    console.log("dek", dek);
    if (clientencryptionpolicy.Encryptiontype === "Deterministic") {
      const hash = createHash("sha256").update(propertytoencrypt).digest();
      iv = hash.slice(0, 16);
    } else if (clientencryptionpolicy.Encryptiontype === "Randomized") {
      iv = randomBytes(16);
    }
    console.log("iv", iv);
    const cipher = createCipheriv(clientencryptionpolicy.Encryptionalgorithm, dek, iv);
    console.log("cipher", cipher);
    const encrypteddata = cipher.update(propertytoencrypt);
    console.log("encrypteddata", encrypteddata);
    const final_encrypteddata = Buffer.concat([encrypteddata, cipher.final()]);
    console.log("final_encrypteddata", final_encrypteddata);
    const cipher_text = final_encrypteddata.toString("hex");
    return cipher_text;
  }
}

import { ClientEncryptionPolicyCache } from "./ClientEncrptionPolicyCache";
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
    const itemKeys = Object.keys(item);
    itemKeys.map(async (prop) => {
      if (this.clientencryptionpolicycache.getClientEncryptionPolicyCache(prop) !== undefined) {
        const value = this.clientencryptionpolicycache.getClientEncryptionPolicyCache(prop);
        const encryptedPath = await this.encrypt(item.prop, value);
        item.prop = encryptedPath;
      }
    });
  }
  // if (item && this.clientencryptionpolicycache) {
  //   for (const item of items) {
  //       const itemKeys = Object.keys(item);

  //       for (const key of itemKeys) {
  //         const value = item[key];

  //         if (value == this.clientencryptionpolicycache.getClientEncryptionPolicyCache(path)) {

  //           const encryptionpolicy = this.clientencryptionpolicycache.getClientEncryptionPolicyCache(path);
  //           const encryptedPath = await this.encrypt(path, encryptionpolicy.clientencryptionkeyid, encryptionpolicy.Encryptiontype, encryptionpolicy.Encryptionalgorithm);
  //           return encryptedPath
  //         }
  //       }
  //   }
  // }

  // {
  //   "name" :"aman",
  //   "surname": "Rao",
  // }

  public async encrypt(
    propertyvalue: string,
    clientencryptionpolicy: ClientEncryptionPolicy
  ): Promise<string> {
    // const encryptionpolicy = new ClientEncryptionPolicy(path, clientencryptionkeyid, Encryptiontype, Encryptionalgorithm);

    // this.clientencryptionpolicycache.setClientEncryptionPolicyCache(encryptionpolicy.path, encryptionpolicy);
    const propertytoencrypt = propertyvalue;
    const key = clientencryptionpolicy.clientencryptionkeyid;
    let iv: Buffer = undefined;

    const dek = this.unwrappeddekcache.getDataEncryptionKey(key);

    if (clientencryptionpolicy.Encryptiontype === "Deterministic") {
      const hash = createHash("sha256").update(propertytoencrypt).digest();
      iv = hash.slice(0, 16);
    } else if (clientencryptionpolicy.Encryptiontype === "Randomized") {
      iv = randomBytes(16);
    }

    const cipher = createCipheriv(clientencryptionpolicy.Encryptionalgorithm, dek, iv);
    const encrypteddata = cipher.update(propertytoencrypt);
    const final_encrypteddata = Buffer.concat([encrypteddata, cipher.final()]);
    const cipher_text = final_encrypteddata.toString("hex");
    return cipher_text;
  }
}

import { ClientEncryptionPolicyCache } from "./ClientEncryptionPolicyCache";
import { UnwrappedDekCache } from "./UnwrappedDekCache";
import { createCipheriv, randomBytes, createHash } from "crypto";
import { ClientEncryptionPolicy } from "./ClientEncryptionPolicy";


export class EncryptionProcessor {
  constructor(
    private clientencryptionpolicycache?: ClientEncryptionPolicyCache,
    private dekCache?: UnwrappedDekCache
  ) {}

  public async identifyPath(item: any): Promise<void> {
    const itemKeys = Object.keys(item);
    itemKeys.map(async (prop) => {
      if (this.clientencryptionpolicycache.getClientEncryptionPolicyCache(prop) !== undefined) {
        const value = this.clientencryptionpolicycache.getClientEncryptionPolicyCache(prop);
        const encryptedPath = await this.encrypt(item[prop], value);
        item[prop] = encryptedPath;
      }  
    });
  }
  

  public async encrypt(
    propertyvalue: string,
    clientencryptionpolicy: ClientEncryptionPolicy
  ): Promise<string> {
   
    const propertytoencrypt = propertyvalue;
    const key = clientencryptionpolicy.clientencryptionkeyid;
    let iv: Buffer;
    
    const dek = this.dekCache.getDataEncryptionKey(key);
    const dekBuffer = Buffer.from(dek,"hex");
   
  
    if (clientencryptionpolicy.Encryptiontype === "Deterministic") {
      const hash = createHash("sha256").update(propertytoencrypt).digest();
      iv = hash.slice(0, 16);
    } 
    else if (clientencryptionpolicy.Encryptiontype === "Randomized") {
      iv = randomBytes(16);
    }
    
    const cipher = createCipheriv(clientencryptionpolicy.Encryptionalgorithm, dekBuffer, iv);
    const encrypteddata = cipher.update(propertytoencrypt);
    const final_encrypteddata = Buffer.concat([encrypteddata, cipher.final()]);
    const cipher_text = final_encrypteddata.toString("hex");
    return cipher_text;
  }
}

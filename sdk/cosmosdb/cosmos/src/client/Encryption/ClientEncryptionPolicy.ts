export class ClientEncryptionPolicy {
  public path: string;

  public clientencryptionkeyid: string;

  public Encryptiontype: string;

  public Encryptionalgorithm: string;

  constructor(
    path: string,
    clientencryptionkeyid: string,
    Encryptiontype: string,
    Encryptionalgorithm: string
  ) {
    this.path = path;
    this.clientencryptionkeyid = clientencryptionkeyid;
    this.Encryptiontype = Encryptiontype;
    this.Encryptionalgorithm = Encryptionalgorithm;
  }
}

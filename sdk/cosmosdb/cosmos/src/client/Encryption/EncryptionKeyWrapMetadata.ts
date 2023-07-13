export class EncryptionKeyWrapMetadata {
  public type: string;

  public name: string;

  public value: string;

  public algorithm: string;

  constructor(type: string, name: string, value: string, algorithm: string) {
    this.type = type;
    this.name = name;
    this.value = value;
    this.algorithm = algorithm;
  }
}

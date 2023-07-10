
function calculateHashCode(value: string): number {
  let hashCode = 0;
  if (value.length === 0) {
    return hashCode;
  }
  for (let i = 0; i < value.length; i++) {
    const charCode = value.charCodeAt(i);
    hashCode = (hashCode << 5) - hashCode + charCode;
    hashCode |= 0; // Convert to 32-bit integer
  }
  return hashCode;
}

export interface EncryptionKeyWrapMetadata {
  type: string;
  name: string;
  value: string;
  algorithm: string;
  additionalProperties: Record<string, unknown>;
}

export class EncryptionKeyWrapMetadata implements EncryptionKeyWrapMetadata {
 constructor(
    type: string,
    name: string,
    value: string,
    algorithm: string
  ) {
    if (!type) {
      throw new Error("type is required.");
    }
    if (!name) {
      throw new Error("name is required.");
    }
    if (!value) {
      throw new Error("value is required.");
    }
    if (!algorithm) {
      throw new Error("algorithm is required.");
    }

    this.type = type;
    this.name = name;
    this.value = value;
    this.algorithm = algorithm;
    this.additionalProperties = null;
  }
	
// constructor(source?: EncryptionKeyWrapMetadata) {
//     this.type = source?.type;
//     this.name = source?.name;
//     this.value = source?.value;
//     this.algorithm = source?.algorithm;
//     this.additionalProperties = null;
// }
  // @JsonProperty({ propertyName: 'type', nullValueHandling: NullValueHandling.Ignore })
  // public type: string;

//  @JsonProperty({ propertyName: 'name', nullValueHandling: NullValueHandling.Ignore })
//   public name: string;
//  @JsonProperty({ propertyName: 'value', nullValueHandling: NullValueHandling.Ignore })
//   public value: string;
//  @JsonProperty({ propertyName: 'algorithm', nullValueHandling: NullValueHandling.Ignore })
//   public algorithm: string;

hashCode(): number {
    let hashCode = 1265339359;
    hashCode = (hashCode * -1521134295) + calculateHashCode(this.type);
    hashCode = (hashCode * -1521134295) + calculateHashCode(this.name);
    hashCode = (hashCode * -1521134295) + calculateHashCode(this.value);
    hashCode = (hashCode * -1521134295) + calculateHashCode(this.algorithm);
    return hashCode;
  }

  public equals(other: EncryptionKeyWrapMetadata): boolean {
    return (
      other != null &&
      this.type === other.type &&
      this.name === other.name &&
      this.value === other.value &&
      this.algorithm === other.algorithm &&
      this.additionalProperties === other.additionalProperties
    );
  }
}

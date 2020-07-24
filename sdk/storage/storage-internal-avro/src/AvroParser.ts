import { AvroReadable } from "./AvroReadable";
import { KeyValuePair } from "./utils/utils.common";

export class AvroParser {
  /**
   * Reads a fixed number of bytes from the stream.
   *
   * @static
   * @param stream
   * @param length
   */
  public static async readFixedBytes(stream: AvroReadable, length: number): Promise<Uint8Array> {
    const bytes = await stream.read(length);
    if (bytes.length != length) {
      throw new Error("Hit stream end.");
    }
    return bytes;
  }

  /**
   * Reads a single byte from the stream.
   *
   * @static
   * @param stream
   */
  private static async readByte(stream: AvroReadable): Promise<number> {
    const buf = await AvroParser.readFixedBytes(stream, 1);
    return buf[0];
  }

  // int and long are stored in variable-length zig-zag coding.
  // variable-length: https://lucene.apache.org/core/3_5_0/fileformats.html#VInt
  // zig-zag: https://developers.google.com/protocol-buffers/docs/encoding?csw=1#types
  private static async readZigZagLong(stream: AvroReadable): Promise<number> {
    let zigZagEncoded = 0;
    let significanceInBit = 0;
    let byte, haveMoreByte, significanceInFloat;

    do {
      byte = await AvroParser.readByte(stream);
      haveMoreByte = byte & 0x80;
      zigZagEncoded |= (byte & 0x7f) << significanceInBit;
      significanceInBit += 7;
    } while (haveMoreByte && significanceInBit < 28); // bitwise operation only works for 32-bit integers

    if (haveMoreByte) {
      // Switch to float arithmetic
      // FIXME: this only works when zigZagEncoded is no more than Number.MAX_SAFE_INTEGER (2**53 - 1)
      zigZagEncoded = zigZagEncoded;
      significanceInFloat = 268435456; // 2 ** 28.
      do {
        byte = await AvroParser.readByte(stream);
        zigZagEncoded += (byte & 0x7f) * significanceInFloat;
        significanceInFloat *= 128; // 2 ** 7
      } while (byte & 0x80);
      return (zigZagEncoded % 2 ? -(zigZagEncoded + 1) : zigZagEncoded) / 2;
    }

    return (zigZagEncoded >> 1) ^ -(zigZagEncoded & 1);
  }

  public static async readLong(stream: AvroReadable): Promise<number> {
    return AvroParser.readZigZagLong(stream);
  }

  public static async readInt(stream: AvroReadable): Promise<number> {
    return AvroParser.readZigZagLong(stream);
  }

  public static async readNull(): Promise<null> {
    return null;
  }

  public static async readBoolean(stream: AvroReadable): Promise<Boolean> {
    const b = await AvroParser.readByte(stream);
    if (b == 1) {
      return true;
    } else if (b == 0) {
      return false;
    } else {
      throw new Error("Byte was not a boolean.");
    }
  }

  public static async readFloat(stream: AvroReadable): Promise<number> {
    const u8arr = await AvroParser.readFixedBytes(stream, 4);
    const view = new DataView(u8arr.buffer, u8arr.byteOffset, u8arr.byteLength);
    return view.getFloat32(0, true); // littleEndian = true
  }

  public static async readDouble(stream: AvroReadable): Promise<number> {
    const u8arr = await AvroParser.readFixedBytes(stream, 8);
    const view = new DataView(u8arr.buffer, u8arr.byteOffset, u8arr.byteLength);
    return view.getFloat64(0, true); // littleEndian = true
  }

  public static async readBytes(stream: AvroReadable): Promise<Uint8Array> {
    const size = await AvroParser.readLong(stream);
    if (size < 0) {
      throw new Error("Bytes size was negative.");
    }

    return await stream.read(size);
  }

  public static async readString(stream: AvroReadable): Promise<string> {
    const u8arr = await AvroParser.readBytes(stream);

    // polyfill TextDecoder to be backward compatible with older
    // nodejs that doesn't expose TextDecoder as a global variable
    if (typeof TextDecoder === "undefined" && typeof require !== "undefined") {
      (global as any).TextDecoder = require("util").TextDecoder;
    }

    // FIXME: need TextDecoder polyfill for IE
    let utf8decoder = new TextDecoder();
    return utf8decoder.decode(u8arr);
  }

  private static async readMapPair<T>(
    stream: AvroReadable,
    readItemMethod: (s: AvroReadable) => Promise<T>
  ): Promise<KeyValuePair<T>> {
    const key = await AvroParser.readString(stream);
    // FIXME: what about readFixed which need a length as parameter.
    const value = await readItemMethod(stream);
    return { key, value };
  }

  public static async readMap<T>(
    stream: AvroReadable,
    readItemMethod: (s: AvroReadable) => Promise<T>
  ): Promise<Record<string, T>> {
    const readPairMethod = async (stream: AvroReadable): Promise<KeyValuePair<T>> => {
      return await AvroParser.readMapPair(stream, readItemMethod);
    };

    const pairs: KeyValuePair<T>[] = await AvroParser.readArray(stream, readPairMethod);
    let dict: Record<string, T> = {};
    for (const pair of pairs) {
      dict[pair.key] = pair.value;
    }
    return dict;
  }

  private static async readArray<T>(
    stream: AvroReadable,
    readItemMethod: (s: AvroReadable) => Promise<T>
  ): Promise<T[]> {
    let items: T[] = [];
    for (
      let count = await AvroParser.readLong(stream);
      count != 0;
      count = await AvroParser.readLong(stream)
    ) {
      if (count < 0) {
        // Ignore block sizes
        await AvroParser.readLong(stream);
        count = -count;
      }

      while (count--) {
        const item: T = await readItemMethod(stream);
        items.push(item);
      }
    }
    return items;
  }
}

interface RecordField {
  name: string;
  type: string | ObjectSchema | (string | ObjectSchema)[]; // Unions may not immediately contain other unions.
}

enum AvroComplex {
  RECORD = "record",
  ENUM = "enum",
  ARRAY = "array",
  MAP = "map",
  UNION = "union",
  FIXED = "fixed"
}

interface ObjectSchema {
  type: Exclude<AvroComplex, AvroComplex.UNION>;
  name?: string;
  aliases?: string;
  fields?: RecordField[];
  symbols?: string[];
  values?: string;
  size?: number;
}

export abstract class AvroType {
  /**
   * Reads an object from the stream.
   *
   * @param stream
   */
  public abstract read(stream: AvroReadable): Promise<Object | null>;

  /**
   * Determines the AvroType from the Avro Schema.
   */
  public static fromSchema(schema: string | Object): AvroType {
    if (typeof schema == "string") {
      return AvroType.fromStringSchema(schema);
    } else if (Array.isArray(schema)) {
      return AvroType.fromArraySchema(schema);
    } else {
      return AvroType.fromObjectSchema(schema as ObjectSchema);
    }
  }

  private static fromStringSchema(schema: string): AvroType {
    // FIXME: simpler way to tell if schema is of type AvroPrimitive?
    switch (schema) {
      case AvroPrimitive.NULL:
      case AvroPrimitive.BOOLEAN:
      case AvroPrimitive.INT:
      case AvroPrimitive.LONG:
      case AvroPrimitive.FLOAT:
      case AvroPrimitive.DOUBLE:
      case AvroPrimitive.BYTES:
      case AvroPrimitive.STRING:
        return new AvroPrimitiveType(schema as AvroPrimitive);
      default:
        throw new Error(`Unexpected Avro type ${schema}`);
    }
  }

  private static fromArraySchema(schema: any[]): AvroType {
    return new AvroUnionType(schema.map(AvroType.fromSchema));
  }

  private static fromObjectSchema(schema: ObjectSchema): AvroType {
    const type = schema.type;
    // Primitives can be defined as strings or objects
    try {
      return AvroType.fromStringSchema(type);
    } catch (err) {}

    switch (type) {
      case AvroComplex.RECORD:
        if (schema.aliases) {
          throw new Error(`aliases currently is not supported, schema: ${schema}`);
        }
        if (!schema.name) {
          throw new Error(`Required attribute 'name' doesn't exist on schema: ${schema}`);
        }

        let fields: Record<string, AvroType> = {};
        if (!schema.fields) {
          throw new Error(`Required attribute 'fields' doesn't exist on schema: ${schema}`);
        }
        for (const field of schema.fields) {
          fields[field.name] = AvroType.fromSchema(field.type);
        }
        return new AvroRecordType(fields, schema.name);
      case AvroComplex.ENUM:
        if (schema.aliases) {
          throw new Error(`aliases currently is not supported, schema: ${schema}`);
        }
        if (!schema.symbols) {
          throw new Error(`Required attribute 'symbols' doesn't exist on schema: ${schema}`);
        }
        return new AvroEnumType(schema.symbols);
      case AvroComplex.MAP:
        if (!schema.values) {
          throw new Error(`Required attribute 'values' doesn't exist on schema: ${schema}`);
        }
        return new AvroMapType(AvroType.fromSchema(schema.values));
      case AvroComplex.ARRAY: // Unused today
      case AvroComplex.FIXED: // Unused today
      default:
        throw new Error(`Unexpected Avro type ${type} in ${schema}`);
    }
  }
}

enum AvroPrimitive {
  NULL = "null",
  BOOLEAN = "boolean",
  INT = "int",
  LONG = "long",
  FLOAT = "float",
  DOUBLE = "double",
  BYTES = "bytes",
  STRING = "string"
}

class AvroPrimitiveType extends AvroType {
  private _primitive: AvroPrimitive;

  constructor(primitive: AvroPrimitive) {
    super();
    this._primitive = primitive;
  }

  public async read(stream: AvroReadable): Promise<Object | null> {
    switch (this._primitive) {
      case AvroPrimitive.NULL:
        return await AvroParser.readNull();
      case AvroPrimitive.BOOLEAN:
        return await AvroParser.readBoolean(stream);
      case AvroPrimitive.INT:
        return await AvroParser.readInt(stream);
      case AvroPrimitive.LONG:
        return await AvroParser.readLong(stream);
      case AvroPrimitive.FLOAT:
        return await AvroParser.readFloat(stream);
      case AvroPrimitive.DOUBLE:
        return await AvroParser.readDouble(stream);
      case AvroPrimitive.BYTES:
        return await AvroParser.readBytes(stream);
      case AvroPrimitive.STRING:
        return await AvroParser.readString(stream);
      default:
        throw new Error("Unknown Avro Primitive");
    }
  }
}

class AvroEnumType extends AvroType {
  private readonly _symbols: string[];

  constructor(symbols: string[]) {
    super();
    this._symbols = symbols;
  }

  public async read(stream: AvroReadable): Promise<Object> {
    const value = await AvroParser.readInt(stream);
    return this._symbols[value];
  }
}

class AvroUnionType extends AvroType {
  private readonly _types: AvroType[];

  constructor(types: AvroType[]) {
    super();
    this._types = types;
  }

  public async read(stream: AvroReadable): Promise<Object | null> {
    const typeIndex = await AvroParser.readInt(stream);
    return await this._types[typeIndex].read(stream);
  }
}

class AvroMapType extends AvroType {
  private readonly _itemType: AvroType;

  constructor(itemType: AvroType) {
    super();
    this._itemType = itemType;
  }

  public async read(stream: AvroReadable): Promise<Object> {
    const readItemMethod = async (s: AvroReadable): Promise<Object | null> => {
      return await this._itemType.read(s);
    };
    return await AvroParser.readMap(stream, readItemMethod);
  }
}

class AvroRecordType extends AvroType {
  private readonly _name: string;
  private readonly _fields: Record<string, AvroType>;

  constructor(fields: Record<string, AvroType>, name: string) {
    super();
    this._fields = fields;
    this._name = name;
  }

  public async read(stream: AvroReadable): Promise<Object> {
    let record: Record<string, Object | null> = {};
    //  FIXME: what for?
    record["$schema"] = this._name;
    for (const key in this._fields) {
      if (this._fields.hasOwnProperty(key)) {
        record[key] = await this._fields[key].read(stream);
      }
    }
    return record;
  }
}

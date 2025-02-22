// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as errors from "./errors.js";
import * as util from "./util.js";

// Categories
const CAT_FIXED = 1;
const CAT_constiable = 2;
const CAT_COMPOUND = 3;
const CAT_ARRAY = 4;

// Class representing a typed value.
export class Typed<T extends { toJSON?: () => any } = any> {
  type: TypeDesc | any;
  value: T;
  array_constructor?: { typecode: number; descriptor?: any };
  descriptor?: any;

  constructor(type: TypeDesc, value: T, code?: number, descriptor?: any) {
    this.type = type;
    this.value = value;
    if (code !== undefined) {
      this.array_constructor = { typecode: code };
      if (descriptor !== undefined) {
        this.array_constructor.descriptor = descriptor;
      }
    }
  }

  toString(): string | null {
    return this.value ? this.value.toString() : null;
  }

  toLocaleString(): string | null {
    return this.value ? this.value.toLocaleString() : null;
  }

  valueOf(): T {
    return this.value;
  }

  toJSON(): any {
    return this.value && typeof this.value.toJSON === "function"
      ? this.value.toJSON()
      : this.value;
  }

  toRheaTyped(): this {
    return this;
  }
}

// Helper function to convert a numeric value to a hexadecimal string.
function hex(i: number): string {
  return i.toString(16);
}

export interface Annotations {
  read?: (buffer: Buffer, offset: number) => any;
  write?: (buffer: Buffer, value: any, offset: number) => void;
  encoding?: BufferEncoding;
}

// Class for type description.
export class TypeDesc {
  name: string;
  typecode: number;
  width: number;
  category: number;
  read?: (buffer: Buffer, offset: number) => any;
  write?: (buffer: Buffer, value: any, offset: number) => void;
  encoding?: BufferEncoding;
  create: (...args: any[]) => Typed;

  constructor(
    name: string,
    typecode: number,
    props?: Annotations,
    empty_value?: any
  ) {
    this.name = name;
    this.typecode = typecode;
    const subcategory = typecode >>> 4;
    switch (subcategory) {
      case 0x4:
        this.width = 0;
        this.category = CAT_FIXED;
        break;
      case 0x5:
        this.width = 1;
        this.category = CAT_FIXED;
        break;
      case 0x6:
        this.width = 2;
        this.category = CAT_FIXED;
        break;
      case 0x7:
        this.width = 4;
        this.category = CAT_FIXED;
        break;
      case 0x8:
        this.width = 8;
        this.category = CAT_FIXED;
        break;
      case 0x9:
        this.width = 16;
        this.category = CAT_FIXED;
        break;
      case 0xA:
        this.width = 1;
        this.category = CAT_constiable;
        break;
      case 0xB:
        this.width = 4;
        this.category = CAT_constiable;
        break;
      case 0xC:
        this.width = 1;
        this.category = CAT_COMPOUND;
        break;
      case 0xD:
        this.width = 4;
        this.category = CAT_COMPOUND;
        break;
      case 0xE:
        this.width = 1;
        this.category = CAT_ARRAY;
        break;
      case 0xF:
        this.width = 4;
        this.category = CAT_ARRAY;
        break;
      default:
        // Should not happen.
        this.width = 0;
        this.category = CAT_FIXED;
        break;
    }

    if (props) {
      if (props.read) {
        this.read = props.read;
      }
      if (props.write) {
        this.write = props.write;
      }
      if (props.encoding) {
        this.encoding = props.encoding;
      }
    }

    if (subcategory === 0x4) {
      // "empty" types don't take a value.
      this.create = function () {
        return new Typed(this, empty_value);
      }.bind(this);
    } else if (subcategory === 0xE || subcategory === 0xF) {
      this.create = function (v: any, code?: number, descriptor?: any) {
        return new Typed(this, v, code, descriptor);
      }.bind(this);
    } else {
      this.create = function (v: any) {
        return new Typed(this, v);
      }.bind(this);
    }
  }

  toString(): string {
    return this.name + "#" + hex(this.typecode);
  }
}

// Types object to hold defined types.
export const types: any = { by_code: {} };
Object.defineProperty(types, "MAX_UINT", { value: 4294967295, writable: false, configurable: false });
Object.defineProperty(types, "MAX_USHORT", { value: 65535, writable: false, configurable: false });

function define_type(
  name: string,
  typecode: number,
  annotations?: Annotations,
  empty_value?: any
): void {
  const t = new TypeDesc(name, typecode, annotations, empty_value);
  (t.create as any).typecode = t.typecode; // hack
  types.by_code[t.typecode] = t;
  types[name] = t.create;
}

function buffer_uint8_ops() {
  return {
    read: (buffer: Buffer, offset: number): number => buffer.readUInt8(offset),
    write: (buffer: Buffer, value: number, offset: number): void => {
      buffer.writeUInt8(value, offset);
    },
  };
}

function buffer_uint16be_ops() {
  return {
    read: (buffer: Buffer, offset: number): number => buffer.readUInt16BE(offset),
    write: (buffer: Buffer, value: number, offset: number): void => {
      buffer.writeUInt16BE(value, offset);
    },
  };
}

function buffer_uint32be_ops() {
  return {
    read: (buffer: Buffer, offset: number): number => buffer.readUInt32BE(offset),
    write: (buffer: Buffer, value: number, offset: number): void => {
      buffer.writeUInt32BE(value, offset);
    },
  };
}

function buffer_int8_ops() {
  return {
    read: (buffer: Buffer, offset: number): number => buffer.readInt8(offset),
    write: (buffer: Buffer, value: number, offset: number): void => {
      buffer.writeInt8(value, offset);
    },
  };
}

function buffer_int16be_ops() {
  return {
    read: (buffer: Buffer, offset: number): number => buffer.readInt16BE(offset),
    write: (buffer: Buffer, value: number, offset: number): void => {
      buffer.writeInt16BE(value, offset);
    },
  };
}

function buffer_int32be_ops() {
  return {
    read: (buffer: Buffer, offset: number): number => buffer.readInt32BE(offset),
    write: (buffer: Buffer, value: number, offset: number): void => {
      buffer.writeInt32BE(value, offset);
    },
  };
}

function buffer_floatbe_ops() {
  return {
    read: (buffer: Buffer, offset: number): number => buffer.readFloatBE(offset),
    write: (buffer: Buffer, value: number, offset: number): void => {
      buffer.writeFloatBE(value, offset);
    },
  };
}

function buffer_doublebe_ops() {
  return {
    read: (buffer: Buffer, offset: number): number => buffer.readDoubleBE(offset),
    write: (buffer: Buffer, value: number, offset: number): void => {
      buffer.writeDoubleBE(value, offset);
    },
  };
}

const MAX_UINT = 4294967296; // 2^32
const MIN_INT = -2147483647;

function write_ulong(buffer: Buffer, value: number | Number | Buffer, offset: number): void {
  if (typeof value === "number" || value instanceof Number) {
    const hi = Math.floor(value as number / MAX_UINT);
    const lo = value as number % MAX_UINT;
    buffer.writeUInt32BE(hi, offset);
    buffer.writeUInt32BE(lo, offset + 4);
  } else {
    value.copy(buffer, offset);
  }
}

function read_ulong(buffer: Buffer, offset: number): number | Buffer {
  const hi = buffer.readUInt32BE(offset);
  const lo = buffer.readUInt32BE(offset + 4);
  if (hi < 2097153) {
    return hi * MAX_UINT + lo;
  } else {
    return buffer.slice(offset, offset + 8);
  }
}

function write_long(buffer: Buffer, value: number | Buffer, offset: number): void {
  if (typeof value === "number") {
    const absVal = Math.abs(value);
    const hi = Math.floor(absVal / MAX_UINT);
    const lo = absVal % MAX_UINT;
    buffer.writeInt32BE(hi, offset);
    buffer.writeUInt32BE(lo, offset + 4);
    if (value < 0) {
      let carry = 1;
      for (let i = 0; i < 8; i++) {
        const index = offset + (7 - i);
        const sum = ((buffer[index] ^ 0xff) + carry);
        buffer[index] = sum & 0xff;
        carry = sum >> 8;
      }
    }
  } else {
    value.copy(buffer, offset);
  }
}

function write_timestamp(buffer: Buffer, value: Date | number, offset: number): void {
    const val = typeof value === "object" && value !== null && typeof (value as Date).getTime === "function" ? value.getTime() : value as number;
  write_long(buffer, val, offset);
}

function read_long(buffer: Buffer, offset: number): number | Buffer {
  const hi = buffer.readInt32BE(offset);
  const lo = buffer.readUInt32BE(offset + 4);
  if (hi < 2097153 && hi > -2097153) {
    return hi * MAX_UINT + lo;
  } else {
    return buffer.slice(offset, offset + 8);
  }
}

function read_timestamp(buffer: Buffer, offset: number): Date {
  const l = read_long(buffer, offset);
  return new Date(l as number);
}

define_type("Null", 0x40, undefined, null);
define_type("Boolean", 0x56, buffer_uint8_ops());
define_type("True", 0x41, undefined, true);
define_type("False", 0x42, undefined, false);
define_type("Ubyte", 0x50, buffer_uint8_ops());
define_type("Ushort", 0x60, buffer_uint16be_ops());
define_type("Uint", 0x70, buffer_uint32be_ops());
define_type("SmallUint", 0x52, buffer_uint8_ops());
define_type("Uint0", 0x43, undefined, 0);
define_type("Ulong", 0x80, { write: write_ulong, read: read_ulong });
define_type("SmallUlong", 0x53, buffer_uint8_ops());
define_type("Ulong0", 0x44, undefined, 0);
define_type("Byte", 0x51, buffer_int8_ops());
define_type("Short", 0x61, buffer_int16be_ops());
define_type("Int", 0x71, buffer_int32be_ops());
define_type("SmallInt", 0x54, buffer_int8_ops());
define_type("Long", 0x81, { write: write_long, read: read_long });
define_type("SmallLong", 0x55, buffer_int8_ops());
define_type("Float", 0x72, buffer_floatbe_ops());
define_type("Double", 0x82, buffer_doublebe_ops());
define_type("Decimal32", 0x74);
define_type("Decimal64", 0x84);
define_type("Decimal128", 0x94);
define_type("CharUTF32", 0x73, buffer_uint32be_ops());
define_type("Timestamp", 0x83, { write: write_timestamp, read: read_timestamp });
define_type("Uuid", 0x98); // TODO: convert to/from stringified form?
define_type("Vbin8", 0xa0);
define_type("Vbin32", 0xb0);
define_type("Str8", 0xa1, { encoding: "utf8" });
define_type("Str32", 0xb1, { encoding: "utf8" });
define_type("Sym8", 0xa3, { encoding: "ascii" });
define_type("Sym32", 0xb3, { encoding: "ascii" });
define_type("List0", 0x45, undefined, []);
define_type("List8", 0xc0);
define_type("List32", 0xd0);
define_type("Map8", 0xc1);
define_type("Map32", 0xd1);
define_type("Array8", 0xe0);
define_type("Array32", 0xf0);

function is_one_of(o: Typed, typelist: Array<{ typecode: number }>): boolean {
  for (let i = 0; i < typelist.length; i++) {
    if (o.type.typecode === typelist[i].typecode) return true;
  }
  return false;
}

function buffer_zero(b: Buffer, len: number, neg: boolean): boolean {
  for (let i = 0; i < len && i < b.length; i++) {
    if (b[i] !== (neg ? 0xff : 0)) return false;
  }
  return true;
}

types.is_ulong = function (o: Typed): boolean {
  return is_one_of(o, [types.Ulong, types.Ulong0, types.SmallUlong]);
};
types.is_string = function (o: Typed): boolean {
  return is_one_of(o, [types.Str8, types.Str32]);
};
types.is_symbol = function (o: Typed): boolean {
  return is_one_of(o, [types.Sym8, types.Sym32]);
};
types.is_list = function (o: Typed): boolean {
  return is_one_of(o, [types.List0, types.List8, types.List32]);
};
types.is_map = function (o: Typed): boolean {
  return is_one_of(o, [types.Map8, types.Map32]);
};

types.wrap_boolean = function (v: boolean): Typed {
  return v ? types.True() : types.False();
};

types.wrap_ulong = function (l: number | Buffer): Typed {
  if (Buffer.isBuffer(l)) {
    if (buffer_zero(l, 8, false)) return types.Ulong0();
    return buffer_zero(l, 7, false) ? types.SmallUlong(l[7]) : types.Ulong(l);
  } else {
    if (l === 0) return types.Ulong0();
    else return l > 255 ? types.Ulong(l) : types.SmallUlong(l);
  }
};

types.wrap_uint = function (l: number): Typed {
  if (l === 0) return types.Uint0();
  else return l > 255 ? types.Uint(l) : types.SmallUint(l);
};

types.wrap_ushort = function (l: number): Typed {
  return types.Ushort(l);
};

types.wrap_ubyte = function (l: number): Typed {
  return types.Ubyte(l);
};

types.wrap_long = function (l: number | Buffer): Typed {
  if (Buffer.isBuffer(l)) {
    const negFlag = (l[0] & 0x80) !== 0;
    if (buffer_zero(l, 7, negFlag) && (l[7] & 0x80) === (negFlag ? 0x80 : 0)) {
      return types.SmallLong(negFlag ? -((l[7] ^ 0xff) + 1) : l[7]);
    }
    return types.Long(l);
  } else {
    return l > 127 || l < -128 ? types.Long(l) : types.SmallLong(l);
  }
};

types.wrap_int = function (l: number): Typed {
  return l > 127 || l < -128 ? types.Int(l) : types.SmallInt(l);
};

types.wrap_short = function (l: number): Typed {
  return types.Short(l);
};

types.wrap_byte = function (l: number): Typed {
  return types.Byte(l);
};

types.wrap_float = function (l: number): Typed {
  return types.Float(l);
};

types.wrap_double = function (l: number): Typed {
  return types.Double(l);
};

types.wrap_timestamp = function (l: number | Date): Typed {
  return types.Timestamp(l instanceof Date ? l.getTime() : l);
};

types.wrap_char = function (v: any): Typed {
  return types.CharUTF32(v);
};

types.wrap_uuid = function (v: any): Typed {
  return types.Uuid(v);
};

types.wrap_binary = function (s: Buffer | Uint8Array): Typed {
  return s.length > 255 ? types.Vbin32(s) : types.Vbin8(s);
};

types.wrap_string = function (s: string): Typed {
  return Buffer.byteLength(s) > 255 ? types.Str32(s) : types.Str8(s);
};

types.wrap_symbol = function (s: string): Typed {
  return Buffer.byteLength(s) > 255 ? types.Sym32(s) : types.Sym8(s);
};

types.wrap_list = function (l: any[]): Typed {
  if (l.length === 0) return types.List0();
  const items = l.map(types.wrap);
  return types.List32(items);
};

types.wrap_set_as_list = function (l: Set<any>): Typed {
  if (l.size === 0) return types.List0();
  const items = Array.from(l, types.wrap);
  return types.List32(items);
};

types.wrap_map = function (m: Record<string, any>, key_wrapper?: (k: any) => Typed): Typed {
  const items: any[] = [];
  for (const k in m) {
    items.push(key_wrapper ? key_wrapper(k) : types.wrap(k));
    items.push(types.wrap(m[k]));
  }
  return types.Map32(items);
};

types.wrap_map_as_map = function (m: Map<any, any>): Typed {
  const items: any[] = [];
  for (const [k, v] of m) {
    items.push(types.wrap(k));
    items.push(types.wrap(v));
  }
  return types.Map32(items);
};

types.wrap_symbolic_map = function (m: any): Typed {
  return types.wrap_map(m, types.wrap_symbol);
};

types.wrap_array = function (l: any[], code: any, descriptors: any): Typed {
  if (code) {
    return types.Array32(l, code, descriptors);
  } else {
    console.trace("An array must specify a type for its elements");
    throw new errors.TypeError("An array must specify a type for its elements");
  }
};

types.wrap = function (o: any): Typed {
  const t = typeof o;
  if (t === "object" && o !== null && typeof o.toRheaTyped === "function") {
    return o.toRheaTyped();
  } else if (t === "string") {
    return types.wrap_string(o);
  } else if (t === "boolean") {
    return o ? types.True() : types.False();
  } else if (t === "number" || o instanceof Number) {
    if (isNaN(o)) {
      return types.Null();
    } else if (Math.floor(o) - o !== 0) {
      return types.Double(o);
    } else if (o > 0) {
      if (o < MAX_UINT) {
        return types.wrap_uint(o);
      } else {
        return types.wrap_ulong(o);
      }
    } else {
      if (o > MIN_INT) {
        return types.wrap_int(o);
      } else {
        return types.wrap_long(o);
      }
    }
  } else if (o instanceof Date) {
    return types.wrap_timestamp(o.getTime());
  } else if (Buffer.isBuffer(o) || o instanceof Uint8Array) {
    return types.wrap_binary(o);
  } else if (t === "undefined" || o === null) {
    return types.Null();
  } else if (Array.isArray(o)) {
    return types.wrap_list(o);
  } else if (o instanceof Map) {
    return types.wrap_map_as_map(o);
  } else if (o instanceof Set) {
    return types.wrap_set_as_list(o);
  } else {
    return types.wrap_map(o);
  }
};

types.wrap_described = function (value: any, descriptor: any): Typed {
  let result = types.wrap(value);
  if (descriptor) {
    if (typeof descriptor === "string") {
      result = types.described(types.wrap_symbol(descriptor), result);
    } else if (typeof descriptor === "number" || descriptor instanceof Number) {
      result = types.described(types.wrap_ulong(descriptor), result);
    }
  }
  return result;
};

types.wrap_message_id = function (o: any): Typed {
  const t = typeof o;
  if (t === "string") {
    return types.wrap_string(o);
  } else if (t === "number" || o instanceof Number) {
    return types.wrap_ulong(o);
  } else if (Buffer.isBuffer(o)) {
    return types.wrap_uuid(o);
  } else if (o instanceof Typed) {
    return o;
  } else {
    throw new errors.TypeError("invalid message id:" + o);
  }
};

function mapify(elements: any[]): Record<string, any> {
  const result: Record<string, any> = {};
  for (let i = 0; i + 1 < elements.length; ) {
    result[elements[i++]] = elements[i++];
  }
  return result;
}

const by_descriptor: { [key: string]: any } = {};

types.unwrap_map_simple = function (o: Typed): any {
  return mapify(o.value.map((i: any) => types.unwrap(i, true)));
};

types.unwrap = function (o: any, leave_described?: boolean): any {
  if (o instanceof Typed) {
    if (o.descriptor) {
      const c = by_descriptor[o.descriptor.value];
      if (c) {
        return new c(o.value);
      } else if (leave_described) {
        return o;
      }
    }
    const u = types.unwrap(o.value, true);
    return types.is_map(o) ? mapify(u) : u;
  } else if (Array.isArray(o)) {
    return o.map((i) => types.unwrap(i, true));
  } else {
    return o;
  }
};

/*
types.described = function (descriptor, typedvalue) {
    const o = Object.create(typedvalue);
    if (descriptor.length) {
        o.descriptor = descriptor.shift();
        return types.described(descriptor, o);
    } else {
        o.descriptor = descriptor;
        return o;
    }
};
*/
types.described_nc = function (descriptor: any, o: any): any {
  if (descriptor.length) {
    o.descriptor = descriptor.shift();
    return types.described(descriptor, o);
  } else {
    o.descriptor = descriptor;
    return o;
  }
};
types.described = types.described_nc;

function get_type(code: number): TypeDesc {
  const type = types.by_code[code];
  if (!type) {
    throw new errors.TypeError("Unrecognised typecode: " + hex(code));
  }
  return type;
}

// Reader class
types.Reader = class Reader {
  buffer: Buffer;
  position: number = 0;

  constructor(buffer: Buffer) {
    this.buffer = buffer;
  }

  read_typecode(): number {
    return this.read_uint(1);
  }

  read_uint(width: number): number {
    const current = this.position;
    this.position += width;
    if (width === 1) {
      return this.buffer.readUInt8(current);
    } else if (width === 2) {
      return this.buffer.readUInt16BE(current);
    } else if (width === 4) {
      return this.buffer.readUInt32BE(current);
    } else {
      throw new errors.TypeError("Unexpected width for uint " + width);
    }
  }

  read_fixed_width(type: TypeDesc): any {
    const current = this.position;
    this.position += type.width;
    if (type.read) {
      return type.read(this.buffer, current);
    } else {
      return this.buffer.slice(current, this.position);
    }
  }

  read_constiable_width(type: TypeDesc): any {
    const size = this.read_uint(type.width);
    const slice = this.read_bytes(size);
    return type.encoding ? slice.toString(type.encoding) : slice;
  }

  read(): any {
    const constructor = this.read_constructor();
    const value = this.read_value(get_type(constructor.typecode));
    return constructor.descriptor ? types.described_nc(constructor.descriptor, value) : value;
  }

  read_constructor(descriptors?: any[]): { typecode: number; descriptor?: any; descriptors?: any[] } {
    const code = this.read_typecode();
    if (code === 0x00) {
      if (descriptors === undefined) {
        descriptors = [];
      }
      descriptors.push(this.read());
      return this.read_constructor(descriptors);
    } else {
      if (descriptors === undefined) {
        return { typecode: code };
      } else if (descriptors.length === 1) {
        return { typecode: code, descriptor: descriptors[0] };
      } else {
        return { typecode: code, descriptor: descriptors[0], descriptors: descriptors };
      }
    }
  }

  read_value(type: TypeDesc): any {
    if (type.width === 0) {
      return type.create();
    } else if (type.category === CAT_FIXED) {
      return type.create(this.read_fixed_width(type));
    } else if (type.category === CAT_constiable) {
      return type.create(this.read_constiable_width(type));
    } else if (type.category === CAT_COMPOUND) {
      return this.read_compound(type);
    } else if (type.category === CAT_ARRAY) {
      return this.read_array(type);
    } else {
      throw new errors.TypeError("Invalid category for type: " + type);
    }
  }

  read_array_items(n: number, type: TypeDesc): any[] {
    const items: any[] = [];
    while (items.length < n) {
      items.push(this.read_value(type));
    }
    return items;
  }

  read_n(n: number): any[] {
    const items: any[] = new Array(n);
    for (let i = 0; i < n; i++) {
      items[i] = this.read();
    }
    return items;
  }

  read_size_count(width: number): { size: number; count: number } {
    return { size: this.read_uint(width), count: this.read_uint(width) };
  }

  read_compound(type: TypeDesc): any {
    const limits = this.read_size_count(type.width);
    return type.create(this.read_n(limits.count));
  }

  read_array(type: TypeDesc): any {
    const limits = this.read_size_count(type.width);
    const constructor = this.read_constructor();
    return type.create(
      this.read_array_items(limits.count, get_type(constructor.typecode)),
      constructor.typecode,
      constructor.descriptor
    );
  }

  toString(): string {
    let s = "buffer@" + this.position;
    if (this.position) s += ": ";
    for (let i = this.position; i < this.buffer.length; i++) {
      if (i > 0) s += ",";
      s += "0x" + Number(this.buffer[i]).toString(16);
    }
    return s;
  }

  reset(): void {
    this.position = 0;
  }

  skip(bytes: number): void {
    this.position += bytes;
  }

  read_bytes(bytes: number): Buffer {
    const current = this.position;
    this.position += bytes;
    return this.buffer.slice(current, this.position);
  }

  remaining(): number {
    return this.buffer.length - this.position;
  }
};

// Writer class
types.Writer = class Writer {
  buffer: Buffer;
  position: number = 0;

  constructor(buffer?: Buffer) {
    this.buffer = buffer ? buffer : util.allocateBuffer(1024);
  }

  toBuffer(): Buffer {
    return this.buffer.slice(0, this.position);
  }

  ensure(length: number): void {
    if (this.buffer.length < length) {
      const bigger = util.allocateBuffer(Math.max(this.buffer.length * 2, length));
      this.buffer.copy(bigger);
      this.buffer = bigger;
    }
  }

  write_typecode(code: number): void {
    this.write_uint(code, 1);
  }

  write_uint(value: number, width: number): void {
    const current = this.position;
    this.ensure(this.position + width);
    this.position += width;
    if (width === 1) {
      this.buffer.writeUInt8(value, current);
    } else if (width === 2) {
      this.buffer.writeUInt16BE(value, current);
    } else if (width === 4) {
      this.buffer.writeUInt32BE(value, current);
    } else {
      throw new errors.TypeError("Unexpected width for uint " + width);
    }
  }

  write_fixed_width(type: TypeDesc, value: any): void {
    const current = this.position;
    this.ensure(this.position + type.width);
    this.position += type.width;
    if (type.write) {
      type.write(this.buffer, value, current);
    } else if (value.copy) {
      value.copy(this.buffer, current);
    } else {
      throw new errors.TypeError("Cannot handle write for " + type);
    }
  }

  write_constiable_width(type: TypeDesc, value: any): void {
    const source = type.encoding ? Buffer.from(value, type.encoding) : Buffer.from(value);
    this.write_uint(source.length, type.width);
    this.write_bytes(source);
  }

  write_bytes(source: Buffer): void {
    const current = this.position;
    this.ensure(this.position + source.length);
    this.position += source.length;
    source.copy(this.buffer, current);
  }

  write_constructor(typecode: number, descriptor?: any): void {
    if (descriptor) {
      this.write_typecode(0x00);
      this.write(descriptor);
    }
    this.write_typecode(typecode);
  }

  write(o: any): void {
    if (o.type === undefined) {
      if (o.described) {
        this.write(o.described());
      } else {
        throw new errors.TypeError("Cannot write " + JSON.stringify(o));
      }
    } else {
      this.write_constructor(o.type.typecode, o.descriptor);
      this.write_value(o.type, o.value, o.array_constructor);
    }
  }

  write_value(type: TypeDesc, value: any, constructor?: any): void {
    if (type.width === 0) {
      return;
    } else if (type.category === CAT_FIXED) {
      this.write_fixed_width(type, value);
    } else if (type.category === CAT_constiable) {
      this.write_constiable_width(type, value);
    } else if (type.category === CAT_COMPOUND) {
      this.write_compound(type, value);
    } else if (type.category === CAT_ARRAY) {
      this.write_array(type, value, constructor);
    } else {
      throw new errors.TypeError("Invalid category " + type.category + " for type: " + type);
    }
  }

  backfill_size(width: number, saved: number): void {
    const gap = this.position - saved;
    this.position = saved;
    this.write_uint(gap - width, width);
    this.position += gap - width;
  }

  write_compound(type: TypeDesc, value: any[]): void {
    const saved = this.position;
    this.position += type.width; // skip size field
    this.write_uint(value.length, type.width); // count field
    for (let i = 0; i < value.length; i++) {
      if (value[i] === undefined || value[i] === null) {
        this.write(types.Null());
      } else {
        this.write(value[i]);
      }
    }
    this.backfill_size(type.width, saved);
  }

  write_array(type: TypeDesc, value: any[], constructor: any): void {
    const saved = this.position;
    this.position += type.width; // skip size field
    this.write_uint(value.length, type.width); // count field
    this.write_constructor(constructor.typecode, constructor.descriptor);
    const ctype = get_type(constructor.typecode);
    for (let i = 0; i < value.length; i++) {
      this.write_value(ctype, value[i]);
    }
    this.backfill_size(type.width, saved);
  }

  toString(): string {
    let s = "buffer@" + this.position;
    if (this.position) s += ": ";
    for (let i = 0; i < this.position; i++) {
      if (i > 0) s += ",";
      s += ("00" + Number(this.buffer[i]).toString(16)).slice(-2);
    }
    return s;
  }

  skip(bytes: number): void {
    this.ensure(this.position + bytes);
    this.position += bytes;
  }

  clear(): void {
    this.buffer.fill(0x00);
    this.position = 0;
  }

  remaining(): number {
    return this.buffer.length - this.position;
  }
};

function get_constructor(typename: string): any {
  if (typename === "symbol") {
    return { typecode: types.Sym8.typecode };
  }
  throw new errors.TypeError("TODO: Array of type " + typename + " not yet supported");
}

function wrap_field(definition: any, instance: any): any {
  if (instance !== undefined && instance !== null) {
    if (Array.isArray(instance)) {
      if (!definition.multiple) {
        throw new errors.TypeError("Field " + definition.name + " does not support multiple values, got " + JSON.stringify(instance));
      }
      const constructor = get_constructor(definition.type);
      return types.wrap_array(instance, constructor.typecode, constructor.descriptor);
    } else if (definition.type === "*") {
      return instance;
    } else {
      const wrapper = types["wrap_" + definition.type];
      if (wrapper) {
        return wrapper(instance);
      } else {
        throw new errors.TypeError("No wrapper for field " + definition.name + " of type " + definition.type);
      }
    }
  } else if (definition.mandatory) {
    throw new errors.TypeError("Field " + definition.name + " is mandatory");
  } else {
    return types.Null();
  }
}

// Instead of setting up a 'prototype' with methods that use 'this',
// define a composite factory function returning plain objects.
types.define_composite = function (def: any): any {
  const descriptor = {
    numeric: def.code,
    symbolic: "amqp:" + def.name + ":list",
  };

  function createInstance(fields?: any): any {
    // Internal array for storing field data
    const valueArray: any[] = [];

    // Build the instance object
    const instance = {
      // The underlying list data
      value: valueArray,

      // Formerly c.prototype.dispatch
      dispatch: (target: any, frame: any) => {
        target["on_" + def.name](frame);
      },

      // Formerly c.prototype.toJSON
      toJSON: () => {
        const o: any = {};
        for (const [key, value] of Object.entries(instance)) {
          if (key !== "value" && typeof value !== "function" && value) {
            o[key] = value;
          }
        }
        return o;
      },

      // Formerly c.prototype.described
      described: () => {
        return types.described_nc(types.wrap_ulong(descriptor.numeric), types.wrap_list(valueArray));
      },
    } as const;

    // Create getters and setters for each defined field
    def.fields.forEach((fieldDef: any, index: number) => {
      Object.defineProperty(instance, fieldDef.name, {
        get: () => {
          return fieldDef.type === "*" ? valueArray[index] : types.unwrap(valueArray[index]);
        },
        set: (val: any) => {
          valueArray[index] = wrap_field(fieldDef, val);
        },
        enumerable: true,
        configurable: false,
      });
    });

    // If fields object is passed, assign them
    if (fields) {
      for (const [prop, value] of Object.entries(fields)) {
        (instance as Record<string, any>)[prop] = value;
      }
    }

    return instance;
  }

  const composite = {
    descriptor,
    // Creates and initializes a new composite instance
    create: createInstance,
    // Formerly c.toString
    toString: (): string => {
      return def.name + "#" + Number(def.code).toString(16);
    },
  };

  return composite;
};

function add_type(def: any): void {
  const c = types.define_composite(def);
  types["wrap_" + def.name] = function (fields: any) {
    return c.create(fields).described();
  };
  by_descriptor[Number(c.descriptor.numeric).toString(10)] = c;
  by_descriptor[c.descriptor.symbolic] = c;
}

add_type({
  name: "error",
  code: 0x1d,
  fields: [
    { name: "condition", type: "symbol", mandatory: true },
    { name: "description", type: "string" },
    { name: "info", type: "map" },
  ],
});

export default types;

export const AvroConstants = {
  SYNC_MARKER_SIZE: 16,

  // 'O', 'b', 'j', 1
  INIT_BYTES: new Uint8Array([79, 98, 106, 1]),

  CODEC_KEY: "avro.codec",

  SCHEMA_KEY: "avro.schema",

  NULL: "null",

  BOOLEAN: "boolean",

  INT: "int",

  LONG: "long",

  FLOAT: "float",

  DOUBLE: "double",

  BYTES: "bytes",

  STRING: "string",

  RECORD: "record",

  ENUM: "enum",

  MAP: "map",

  ARRAY: "array",

  UNION: "union",

  FIXED: "fixed",

  ALIASES: "aliases",

  NAME: "name",

  FIELDS: "fields",

  TYPE: "type",

  SYMBOLS: "symbols",

  VALUES: "values"
};

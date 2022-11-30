// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import { bifilter, unreachable } from "./etc";

export type Schema =
  | ObjectSchema
  | MapSchema
  | ArraySchema
  | TupleSchema
  | PrimitiveSchema
  | LiteralSchema
  | ValidatorSchema
  | UnionSchema
  | IntersectionSchema;

export const enum SchemaKind {
  Object = "object",
  Map = "map",
  Array = "array",
  Tuple = "tuple",
  Primitive = "primitive",
  Literal = "literal",
  Validator = "validator",
  Union = "union",
  Intersection = "intersection",
}

export type Index = string | number | symbol;
export type TypeOf = "string" | "number" | "bigint" | "boolean" | "symbol";

export type TypeOfMap = {
  string: string;
  number: number;
  bigint: bigint;
  boolean: boolean;
  symbol: symbol;
};

export type BaseIndexSchema = PrimitiveSchema<"string" | "number" | "symbol">;
export type IndexSchema = BaseIndexSchema | ValidatorSchema<BaseIndexSchema>;
export type TopObjectSchema = { [k: Index]: Schema };
export type TopIndexerSchema = [IndexSchema, Schema] | undefined;

export interface ObjectSchema<
  Fields extends TopObjectSchema = TopObjectSchema,
  Indexer extends TopIndexerSchema = TopIndexerSchema
> {
  kind: SchemaKind.Object;
  indexer?: Indexer;
  fields: Fields;
  closed?: boolean;
}

export interface MapSchema<K extends Schema = Schema, V extends Schema = Schema> {
  kind: SchemaKind.Map;
  key: K;
  value: V;
}

export interface ArraySchema<Values extends Schema = Schema> {
  kind: SchemaKind.Array;
  values: Values;
}

export interface TupleSchema<Values extends Schema[] = Schema[]> {
  kind: SchemaKind.Tuple;
  values: Values;
}

export interface LiteralSchema<Literal = unknown> {
  kind: SchemaKind.Literal;
  value: Literal;
}

export interface PrimitiveSchema<T extends TypeOf = TypeOf> {
  kind: SchemaKind.Primitive;
  type: T;
}

export interface ValidatorSchema<Inner extends Schema = Schema> {
  kind: SchemaKind.Validator;
  inner: Inner;

  validationMessage?: string;
  validate: (value: Schema extends Inner ? never : ReifySchema<Inner>) => boolean;
}

export interface UnionSchema<Variants extends Schema[] = Schema[]> {
  kind: SchemaKind.Union;
  variants: Variants;
}

export interface IntersectionSchema<Constraints extends Schema[] = Schema[]> {
  kind: SchemaKind.Intersection;
  constraints: Constraints;
}

export type UnionToIntersection<U> = (U extends unknown ? (_: U) => unknown : never) extends (
  _: infer I
) => unknown
  ? I
  : never;

export type ReifySchema<S extends Schema> = Schema extends S
  ? unknown
  : S extends ObjectSchema<infer Fields, infer Indexer>
  ? Indexer extends [infer IKey extends Index, infer ISchema extends Schema]
    ? { [K in IKey]: ReifySchema<ISchema> } & { [K in keyof Fields]: ReifySchema<Fields[K]> }
    : { [K in keyof Fields]: ReifySchema<Fields[K]> }
  : S extends MapSchema<infer K, infer V>
  ? ReifySchema<K> extends infer ReifiedK extends Index
    ? { [K in ReifiedK]: ReifySchema<V> }
    : never
  : S extends ArraySchema<infer Values>
  ? ReifySchema<Values>[]
  : S extends TupleSchema<infer Values>
  ? { [K in keyof Values]: ReifySchema<Values[K]> }
  : S extends PrimitiveSchema<infer T>
  ? TypeOfMap[T]
  : S extends LiteralSchema<infer V>
  ? V
  : S extends ValidatorSchema<infer Inner>
  ? ReifySchema<Inner>
  : S extends UnionSchema<infer Variants>
  ? { [K in keyof Variants]: ReifySchema<Variants[K]> }[number]
  : S extends IntersectionSchema<infer Constraints>
  ? UnionToIntersection<{ [K in keyof Constraints]: Constraints[K] }[number]>
  : never;

export const Schema = (function () {
  const base = {
    primitive: <T extends TypeOf>(type: T): PrimitiveSchema<T> => ({
      kind: SchemaKind.Primitive,
      type,
    }),
    literal: <V extends unknown>(value: V): LiteralSchema<V> => ({
      kind: SchemaKind.Literal,
      value,
    }),
    withValidator: <Inner extends Schema>(
      inner: Inner,
      validate: (value: ReifySchema<Inner>) => boolean,
      validationMessage?: string
    ): ValidatorSchema<Inner> => ({
      kind: SchemaKind.Validator,
      inner,
      validate,
      validationMessage,
    }),
    union: <Variants extends Schema[]>(...variants: Variants): UnionSchema<Variants> => ({
      kind: SchemaKind.Union,
      variants,
    }),
    intersection: <Constraints extends Schema[]>(
      ...constraints: Constraints
    ): IntersectionSchema<Constraints> => ({
      kind: SchemaKind.Intersection,
      constraints,
    }),
  } as const;

  const primitive = {
    string: base.primitive("string"),
    symbol: base.primitive("symbol"),
    bigint: base.primitive("bigint"),
    boolean: base.primitive("boolean"),
    number: base.primitive("number"),
    undefined: base.literal(undefined),
    null: base.literal(null),

    // Neat little identity
    never: base.union(),
    unknown: base.intersection(),
  } as const;
  return Object.freeze({
    ...base,
    ...primitive,

    array: <Values extends Schema>(values: Values): ArraySchema<Values> => ({
      kind: SchemaKind.Array,
      values,
    }),
    tuple: <Values extends Schema[]>(...values: Values): TupleSchema<Values> => ({
      kind: SchemaKind.Tuple,
      values,
    }),

    map: <Key extends Schema, Value extends Schema>(
      key: Key,
      value: Value
    ): MapSchema<Key, Value> => ({
      kind: SchemaKind.Map,
      key,
      value,
    }),
    object: <Fields extends TopObjectSchema, Indexer extends TopIndexerSchema>(
      fields: Fields,
      indexer: Indexer | undefined = undefined,
      closed: boolean = true
    ): ObjectSchema<Fields, Indexer> => ({
      kind: SchemaKind.Object,
      fields,
      indexer,
      closed,
    }),

    optional: <S extends Schema>(schema: S): UnionSchema<[S, typeof primitive.undefined]> =>
      base.union(schema, primitive.undefined),
    nullable: <S extends Schema>(schema: S): UnionSchema<[S, typeof primitive.null]> =>
      base.union(schema, primitive.null),

    regex: (expr: RegExp): ValidatorSchema<PrimitiveSchema<"string">> =>
      base.withValidator(
        primitive.string,
        (v) => expr.test(v),
        `expected regular expression '${expr.toString()}' to match`
      ),

    url: base.withValidator(
      primitive.string,
      (v) => {
        try {
          new URL(v);
          return true;
        } catch {
          return false;
        }
      },
      "expected a valid URL"
    ),
  } as const);
})();

export function validate<S extends Schema>(
  s: S,
  value: unknown,
  name: string = "root"
): asserts value is ReifySchema<S> {
  const errors: ValidationErrorInfo[] = [];
  // Prevents excessive recursion from instantiating the body of the validation function.
  const result = _validate(s, value, name, (e) => errors.push(e));

  if (errors.length > 0) {
    throw new ValidationError(errors);
  } else if (!result) {
    throw new Error("internal error: object failed validation but no errors were returned");
  }
}

export class ValidationError extends Error {
  constructor(public errors: ValidationErrorInfo[]) {
    super("object failed validation");
  }

  public *formatMessage(): Iterable<string> {
    for (const e of this.errors) yield* formatValidationErrorInfo(e);
  }
}

function formatValue(v: unknown): string {
  return typeof v === "string" ? `"${v}"` : String(v);
}

function getMessage(info: ValidationErrorInfo): string {
  const schema = info.schema;

  switch (schema.kind) {
    case SchemaKind.Array:
    case SchemaKind.Tuple:
      return `expected an array (type is "${typeof info.value}")`;
    case SchemaKind.Literal:
      return `expected exactly ${formatValue(schema.value)}`;
    case SchemaKind.Map:
    case SchemaKind.Object:
      return `expected an object (type is "${typeof info.value}")`;
    case SchemaKind.Primitive:
      return `expected ${schema.type} (type is "${typeof info.value}")`;
    case SchemaKind.Union:
      return "value did not match any variant";
    case SchemaKind.Intersection:
      return "value did not match all constraints";
    case SchemaKind.Validator:
      return `object failed custom validation: ${
        schema.validationMessage ?? schema.validate.name ?? "<unknown validation>"
      }`;
    default:
      unreachable(schema);
  }
}

function* indent(input: Iterable<string>): Iterable<string> {
  for (const line of input) yield `  ${line}`;
}

function* formatValidationErrorInfo(
  info: ValidationErrorInfo,
  silenceValue: boolean = false
): Iterable<string> {
  // A readability optimization for intersections
  if (info.schema.kind === SchemaKind.Intersection) {
    if (info.cause === undefined)
      throw new Error("Reached intersection error with no underlying cause.");

    for (const cause of info.cause) {
      yield* formatValidationErrorInfo(cause);
    }

    return;
  }

  const message = info.message ?? getMessage(info);

  yield `${info.context}: ${message} (schema: ${info.schema.kind})`;

  const valueString = JSON.stringify(info.value, null, 2)?.split(/\r?\n/) ?? ["undefined"];

  yield* indent(
    (function* () {
      if (!silenceValue) yield* ["Value: " + valueString[0], ...valueString.slice(1)];

      if (info.cause && info.cause.length > 0) {
        yield "Caused By:";
        for (const ei of info.cause) {
          const causeStrings = [...formatValidationErrorInfo(ei, true)];

          yield "- " + causeStrings[0];
          yield* indent(causeStrings.slice(1));
        }
      }
    })()
  );
}

export interface ValidationErrorInfo {
  context: string;
  message?: string;
  schema: Schema;
  value: unknown;
  cause?: ValidationErrorInfo[];
}

type ValidationErrorHandler = (e: ValidationErrorInfo) => void;

function _validate(
  schema: Schema,
  value: unknown,
  context: string,
  onValidationError: ValidationErrorHandler
): boolean {
  function raise(message?: string, cause?: ValidationErrorInfo[]): false {
    // Stub for now.
    onValidationError({
      context,
      message,
      schema,
      value,
      cause,
    });

    return false;
  }

  switch (schema.kind) {
    case SchemaKind.Array: {
      if (!Array.isArray(value)) return raise();

      let result = true;

      for (const [v, idx] of value.map((v, idx) => [v, idx] as const)) {
        if (!_validate(schema.values, v, context + renderPropertyAccess(idx), onValidationError))
          result = false;
      }

      return result;
    }
    case SchemaKind.Object: {
      if (typeof value !== "object" || value === null) return raise();

      let result = true;

      const schemaFields = new Set(Object.keys(schema.fields));

      const allFieldPairs = Object.entries(value);

      const [modelFieldPairs, indexerFieldPairs] = bifilter(allFieldPairs, ([k]) =>
        schemaFields.has(k)
      );

      const modelFields = Object.fromEntries(modelFieldPairs);

      for (const k of schemaFields) {
        const fieldSchema = schema.fields[k];
        const fieldValue = modelFields[k];

        if (
          !_validate(fieldSchema, fieldValue, context + renderPropertyAccess(k), onValidationError)
        )
          result = false;
      }

      if (schema.indexer !== undefined) {
        if (indexerFieldPairs.length > 0) {
          // TODO: this is some kind of error. Need to inspect the `closed` field...
          throw new Error();
        }

        for (const [k, v] of indexerFieldPairs) {
          if (
            !_validate(schema.indexer[0], k, `(${renderKey(k)} of ${context})`, onValidationError)
          )
            result = false;
          else {
            if (!_validate(schema.indexer[1], v, `${context}[${renderKey(k)}]`, onValidationError))
              result = false;
          }
        }
      }

      return result;
    }
    case SchemaKind.Literal:
      if (value !== schema.value) return raise();

      return true;
    case SchemaKind.Primitive:
      if (typeof value !== schema.type) return raise();

      return true;
    case SchemaKind.Validator:
      if (!_validate(schema.inner, value, context, onValidationError)) return false;

      if (!schema.validate(value as never)) return raise(schema.validationMessage);

      return true;
    case SchemaKind.Tuple: {
      if (!Array.isArray(value)) return raise();

      let result = true;

      for (const [entrySchema, idx] of schema.values.map((v, idx) => [v, idx] as const)) {
        if (
          !_validate(
            entrySchema,
            value[idx],
            context + renderPropertyAccess(idx),
            onValidationError
          )
        )
          result = false;
      }

      return result;
    }
    case SchemaKind.Map: {
      if (typeof value !== "object" || value === null) return raise();

      let result = true;

      for (const [k, v] of Object.entries(value)) {
        if (!_validate(schema.key, k, `${renderKey(k)} of ${context}`, onValidationError))
          result = false;
        else if (!_validate(schema.value, v, context + renderPropertyAccess(k), onValidationError))
          result = false;
      }

      return result;
    }
    case SchemaKind.Union: {
      let result = false;

      const errors: ValidationErrorInfo[] = [];

      for (const variant of schema.variants) {
        if (_validate(variant, value, context, (e) => errors.push(e))) result = true;
      }

      if (result === false) raise("value didn't match any union variant", errors);

      return result;
    }
    case SchemaKind.Intersection: {
      let result = true;

      const errors: ValidationErrorInfo[] = [];

      for (const constraint of schema.constraints) {
        if (!_validate(constraint, value, context, (e) => errors.push(e))) result = false;
      }

      if (result === false) raise("value didn't match all intersection constraints", errors);

      return result;
    }
    default:
      return unreachable(schema);
  }
}

function renderKey(k: Index): string {
  return typeof k === "string" ? `"${k}"` : k.toString();
}

const validIdentifier = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const keywords = new Set([
  "break",
  "case",
  "catch",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "finally",
  "for",
  "function",
  "if",
  "in",
  "instanceof",
  "new",
  "return",
  "switch",
  "this",
  "throw",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
]);

function renderPropertyAccess(k: Index) {
  return typeof k !== "string"
    ? `[${k.toString()}]`
    : validIdentifier.test(k) && !keywords.has(k)
    ? "." + k
    : `["${k}"]`;
}

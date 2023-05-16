/**
 * Represents a primitive JavaScript type string, number, bigint and symbol.
 */
export type Primitive<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends bigint
  ? bigint
  : T extends symbol
  ? symbol
  : unknown;

/**
 * This is a unique symbol that we declare. This symbol is used as a property key in our $NonExhaustive type.
 * The use of a unique symbol guarantees that this property won't conflict with any other string-named properties that might exist.
 */
declare const __non_exhaustive: unique symbol;
/**
 * This is a mapped type that represents an object with a single optional property. The property key is the __non_exhaustive symbol we declared earlier, and the property value is of type never.
 */
export type $NonExhaustive = { [__non_exhaustive]?: never };
/**
 * This is the main type we will use to define our extensible enums.
 * It is a union of T and a type intersection of Primitive<T> and $NonExhaustive.
 * This effectively means that the type can be any value of T or any other value that matches the primitive type of T.
 * The intersection with $NonExhaustive is what prevents TypeScript from collapsing the union with string into just string.
 */
export type NonExhaustive<T> = T | (Primitive<T> & $NonExhaustive);

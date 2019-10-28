import { digest } from "./digest";
import stableStringify from "fast-json-stable-stringify";

export async function hashObject(object: any) {
  const stringifiedObject = stableStringify(object);
  return digest(stringifiedObject);
}

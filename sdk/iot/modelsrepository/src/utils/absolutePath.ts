import {isAbsolute} from "path";

export function isLocalPath(p: string): boolean {
  return isAbsolute(p);
}

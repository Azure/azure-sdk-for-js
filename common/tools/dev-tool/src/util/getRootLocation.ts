import path from "path";
import fs from "fs-extra";

export async function resolveRoot(start?: string): Promise<string> {
  start ??= process.cwd();
  if (await fs.pathExists(path.join(start, "rush.json"))) {
    return start;
  } else {
    const nextPath = path.resolve(start, "..");
    if (nextPath === start) {
      throw new Error("Reached filesystem root, but no rush.json was found.");
    } else {
      return resolveRoot(nextPath);
    }
  }
}

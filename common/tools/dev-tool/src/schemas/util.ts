// TODO: didn't account for async schemas that need to look at the filesystem...

import { Schema } from "../util/schema";

import path from "path";
import fs from "fs-extra";

// TODO: may want to pass in context such as working directory instead of assuming cwd.
export const fileExists = Schema.withValidator(
  Schema.string,
  (name) => {
    try {
      const stat = fs.statSync(path.resolve(process.cwd(), name));

      return stat.isFile();
    } catch {
      // If we got an error, the file does not exist.
      return false;
    }
  },
  "file does not exist in filesystem (or is not a file)"
);

// TODO: reduce duplication of above.
export const exists = Schema.withValidator(
  Schema.string,
  function exists(name) {
    try {
      fs.statSync(path.resolve(process.cwd(), name));

      return true;
    } catch {
      return false;
    }
  },
  "path does not exist in filesystem"
);

/**
 * Create a schema that validates that certain values are included in the result.
 *
 * @param values - the values to ensure are included
 */
export const includes = (...values: string[]) =>
  Schema.withValidator(
    Schema.array(Schema.string),
    (result) => values.every((value) => result.includes(value)),
    "array did not include all expected values" + JSON.stringify(values)
  );

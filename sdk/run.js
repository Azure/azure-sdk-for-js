import { promises as fs } from "fs";
import path from "path";

const TEST_FILE        = path.join("test", "snippets.spec.ts");
const OUTPUT_FILE      = "tsconfig.snippets.json";
const OUTPUT_CONTENT   = `{
  "extends": ["../../../tsconfig.snippets.base.json"]
}
`;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const dirsWithTests = new Set();

  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;

    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nested = await walk(full);
      nested.forEach(dirsWithTests.add, dirsWithTests);
    } else if (entry.isFile() && entry.name === path.basename(TEST_FILE)) {
      if (full.endsWith(TEST_FILE)) {
        dirsWithTests.add(path.dirname(path.dirname(full))); // directory that contains "test"
      }
    }
  }
  return [...dirsWithTests];
}

async function main() {
  const root = process.cwd();
  const dirs = await walk(root);

  console.log(`Found ${dirs.length} folders with ${TEST_FILE}`);
  await Promise.all(
    dirs.map(async (dir) => {
      const outPath = path.join(dir, OUTPUT_FILE);
      await fs.writeFile(outPath, OUTPUT_CONTENT, "utf8");
      console.log(`Wrote ${outPath}`);
    })
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
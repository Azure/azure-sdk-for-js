import * as fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, "..", "samples");

async function findJsFiles(dir) {
  let results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await findJsFiles(fullPath));
    } else if (
      entry.isFile() &&
      entry.name.endsWith(".js") &&
      fullPath.includes(path.join("javascript", ""))
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    // Regex to match: require("@azure/openai/types"); using either ' or " for the quotes.
    const regex = /require\((['"])@azure\/openai\/types\1\);?\s*\n?/g;
    const newContent = content.replace(regex, "\n");
    if (newContent !== content) {
      await fs.writeFile(filePath, newContent, "utf-8");
      console.log(`Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function main() {
  const jsFiles = await findJsFiles(baseDir);
  console.log(`Found ${jsFiles.length} JavaScript file(s) in samples/**/javascript/.`);
  for (const filePath of jsFiles) {
    await processFile(filePath);
  }
}

main();

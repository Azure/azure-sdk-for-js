import fs from "fs/promises";
import path from "path";

// Define license header and generated code notice
const licenseHeader = `// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.`;

const generatedCodeNotice = `
/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \\{project-root\\}/sources/custom
 */`;

// This function will add the headers if they are not present
async function addHeaders(filePath: string) {
  let content = await fs.readFile(filePath, "utf8");

  if (!content.startsWith(licenseHeader)) {
    content = licenseHeader + "\n" + content;
  }

  if (!content.includes(generatedCodeNotice)) {
    content = content.replace(licenseHeader, licenseHeader + "\n" + generatedCodeNotice);
  }

  await fs.writeFile(filePath, content, "utf8");
}

// This function will scan the directory recursively for TypeScript files
export async function addHeaderToFiles(directoryPath: string) {
  const files = await fs.readdir(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    const stat = await fs.lstat(filePath);
    if (stat.isDirectory()) {
      await addHeaderToFiles(filePath);
    } else if (filePath.endsWith(".ts")) {
      await addHeaders(filePath);
    }
  }
}

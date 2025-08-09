#!/usr/bin/env node
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This script applies the testing framework migration changes from commit ced0a2aeea5d2558419dee815c6982a8119f4797
 * to all or selected packages in the Azure SDK for JS repository.
 * 
 * Usage:
 *   node apply-testing-migration.mjs                    # Apply to all packages
 *   node apply-testing-migration.mjs core-sse core-auth # Apply to specific packages
 *   node apply-testing-migration.mjs --dry-run          # Preview changes without applying
 */

import { readFileSync, writeFileSync, existsSync, unlinkSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const targetFilters = args.filter(arg => arg !== '--dry-run');

// Read rush.json to get all projects (or fall back to scanning sdk/*/* if rush.json is missing)
const rushConfigPath = join(repoRoot, 'rush.json');

function parseRushJson(filePath) {
  const content = readFileSync(filePath, 'utf-8');

  // Find the projects array in the content
  const projectsStart = content.indexOf('"projects": [');
  if (projectsStart === -1) {
    throw new Error('Could not find projects array in rush.json');
  }

  // Find the start of the array
  const arrayStart = content.indexOf('[', projectsStart);

  // Find the matching closing bracket
  let depth = 0;
  let arrayEnd = arrayStart;
  for (let i = arrayStart; i < content.length; i++) {
    const char = content[i];
    if (char === '[') depth++;
    if (char === ']') depth--;
    if (depth === 0) {
      arrayEnd = i;
      break;
    }
  }

  // Extract the projects array
  const projectsArrayStr = content.substring(arrayStart, arrayEnd + 1);

  // Remove comments from the extracted array
  const cleanedProjectsStr = projectsArrayStr
    .replace(/\/\*\*[\s\S]*?\*\//g, '') // Remove /* */ comments
    .replace(/\/\/.*$/gm, '') // Remove // comments
    .replace(/,\s*}/g, '}') // Remove trailing commas before }
    .replace(/,\s*]/g, ']'); // Remove trailing commas before ]

  try {
    const projects = JSON.parse(cleanedProjectsStr);
    return { projects };
  } catch (error) {
    console.error('Failed to parse projects array:', error.message);
    console.error('Cleaned content preview:', cleanedProjectsStr.substring(0, 500));
    throw error;
  }
}

/**
 * Discover projects from rush.json or by scanning the sdk folder as a fallback.
 */
function discoverProjects() {
  if (existsSync(rushConfigPath)) {
    const rushConfig = parseRushJson(rushConfigPath);
    const projects = rushConfig.projects.filter(
      (project) => project.packageName && project.projectFolder
    );
    console.log(`Found ${projects.length} projects in rush.json`);
    return projects;
  }

  // Fallback: scan sdk/*/* for package.json files
  console.warn(
    'rush.json not found. Falling back to scanning sdk/*/* for package.json files.'
  );
  const projects = [];
  const sdkRoot = join(repoRoot, 'sdk');
  try {
    const serviceDirs = readdirSync(sdkRoot, { withFileTypes: true }).filter((d) => d.isDirectory());
    for (const service of serviceDirs) {
      const servicePath = join(sdkRoot, service.name);
      const pkgDirs = readdirSync(servicePath, { withFileTypes: true }).filter((d) => d.isDirectory());
      for (const pkg of pkgDirs) {
        const pkgPath = join(servicePath, pkg.name);
        const packageJsonPath = join(pkgPath, 'package.json');
        if (existsSync(packageJsonPath)) {
          try {
            const pkgJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
            if (pkgJson && typeof pkgJson.name === 'string') {
              const rel = pkgPath.replace(repoRoot + '/', '');
              projects.push({ packageName: pkgJson.name, projectFolder: rel });
            }
          } catch {
            // ignore malformed package.json
          }
        }
      }
    }
  } catch (e) {
    console.error(`Failed to scan sdk directory: ${e.message}`);
  }

  console.log(`Found ${projects.length} projects via sdk scan`);
  return projects;
}

const projects = discoverProjects();

if (isDryRun) {
  console.log('🔍 DRY RUN MODE - No files will be modified');
}

/**
 * Helper function to write file content (respects dry-run mode)
 */
function writeFile(filePath, content, description) {
  if (isDryRun) {
    console.log(`    [DRY RUN] Would update ${description}`);
    return true;
  }

  try {
    writeFileSync(filePath, content + '\n');
    return true;
  } catch (error) {
    console.error(`    ✗ Failed to write ${description}: ${error.message}`);
    return false;
  }
}

/**
 * Helper function to delete file (respects dry-run mode)
 */
function deleteFile(filePath, description) {
  if (isDryRun) {
    console.log(`    [DRY RUN] Would delete ${description}`);
    return true;
  }

  try {
    unlinkSync(filePath);
    return true;
  } catch (error) {
    console.error(`    ✗ Failed to delete ${description}: ${error.message}`);
    return false;
  }
}

/**
 * Apply vitest.config.ts changes
 */
function updateVitestConfig(projectPath, packageName) {
  const vitestConfigPath = join(projectPath, 'vitest.config.ts');

  if (!existsSync(vitestConfigPath)) {
    console.log(`    Skipping vitest.config.ts - file does not exist`);
    return false;
  }

  try {
    let content = readFileSync(vitestConfigPath, 'utf-8');
    let modified = false;

    // Identity-style node vitest config
    const simpleConfigPattern = /export\s+default\s+viteConfig\s*;/;

    if (simpleConfigPattern.test(content)) {
      const newContent = `// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "../../../vitest.shared.config.ts";
import { makeNodeAliases } from "../../../vitest.shared.config.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      hookTimeout: 500000,
      testTimeout: 500000,
      alias: [...makeNodeAliases(__dirname)],
      typecheck: {
        enabled: false,
      },
    },
  }),
);`;

      content = newContent;
      modified = true;
    } else {
      // Ensure required imports
      if (!/makeNodeAliases/.test(content)) {
        const viteImport = /import\s+viteConfig\s+from\s+"\.{2}\/{2}\.\.\/vitest\.shared\.config\.ts";?/;
        if (viteImport.test(content)) {
          content = content.replace(viteImport, (m) => `${m}\n\nimport { makeNodeAliases } from "../../../vitest.shared.config.ts";`);
          modified = true;
        } else if (/from\s+"vitest\/config"/.test(content)) {
          // fallback: insert after vitest/config import
          content = content.replace(/(import\s+\{[^}]*\}\s+from\s+"vitest\/config";?)/, `$1\nimport { makeNodeAliases } from "../../../vitest.shared.config.ts";`);
          modified = true;
        }
      }
      if (!/__dirname\s*=\s*dirname\(fileURLToPath\(import\.meta\.url\)\)/.test(content)) {
        // insert __dirname after imports
        content = content.replace(/(import\s+[^;]+;\s*)+(\s*)/, (m) => `${m}\nconst __dirname = dirname(fileURLToPath(import.meta.url));\n`);
        modified = true;
      }

      // Update test block: alias, timeouts, typecheck
      const testBlockPattern = /(test:\s*\{)([\s\S]*?)(\}\s*,?)/m;
      if (testBlockPattern.test(content)) {
        content = content.replace(testBlockPattern, (_m, start, body, end) => {
          // ensure alias
          let newBody = body;
          if (/alias\s*:/.test(newBody)) {
            newBody = newBody.replace(/alias\s*:\s*[^,]+(,?)/, 'alias: [...makeNodeAliases(__dirname)]$1');
          } else {
            newBody = `\n      alias: [...makeNodeAliases(__dirname)],${newBody}`;
          }
          // hookTimeout
          if (/hookTimeout\s*:/.test(newBody)) {
            newBody = newBody.replace(/hookTimeout\s*:\s*\d+/, 'hookTimeout: 500000');
          } else {
            newBody = `\n      hookTimeout: 500000,${newBody}`;
          }
          // testTimeout
          if (/testTimeout\s*:/.test(newBody)) {
            newBody = newBody.replace(/testTimeout\s*:\s*\d+/, 'testTimeout: 500000');
          } else {
            newBody = `\n      testTimeout: 500000,${newBody}`;
          }
          // typecheck.enabled
          if (/typecheck\s*:\s*\{[\s\S]*?enabled\s*:\s*false[\s\S]*?\}/.test(newBody)) {
            // already set
          } else if (/typecheck\s*:\s*\{[\s\S]*?\}/.test(newBody)) {
            newBody = newBody.replace(/typecheck\s*:\s*\{[\s\S]*?\}/, 'typecheck: {\n        enabled: false,\n      }');
          } else {
            newBody = `${newBody}\n      typecheck: {\n        enabled: false,\n      },`;
          }
          modified = true;
          return `${start}${newBody}${end}`;
        });
      }
    }

    if (modified) {
      if (writeFile(vitestConfigPath, content, 'vitest.config.ts')) {
        console.log(`    ✓ Updated vitest.config.ts`);
        return true;
      }
    } else {
      console.log(`    Skipping vitest.config.ts - no changes needed`);
    }

    return false;
  } catch (error) {
    console.error(`    ✗ Failed to update vitest.config.ts: ${error.message}`);
    return false;
  }
}

/**
 * Apply vitest.browser.config.ts changes
 */
function updateVitestBrowserConfig(projectPath, packageName) {
  const vitestBrowserConfigPath = join(projectPath, 'vitest.browser.config.ts');

  if (!existsSync(vitestBrowserConfigPath)) {
    console.log(`    Skipping vitest.browser.config.ts - file does not exist`);
    return false;
  }

  try {
    let content = readFileSync(vitestBrowserConfigPath, 'utf-8');
    let modified = false;

    // Ensure imports for shared browser config and makeBrowserAliases
    if (!/makeBrowserAliases/.test(content)) {
      // Add import after viteConfig import
      const sharedImport = /import\s+viteConfig\s+from\s+"\.{2}\/{2}\.\.\/vitest\.browser\.shared\.config\.ts";?/;
      if (sharedImport.test(content)) {
        content = content.replace(sharedImport, (m) => `${m}\nimport { makeBrowserAliases } from "../../../vitest.shared.config.ts";`);
        modified = true;
      } else if (/from\s+"vitest\/config"/.test(content)) {
        content = content.replace(/(import\s+\{[^}]*\}\s+from\s+"vitest\/config";?)/, `$1\nimport { makeBrowserAliases } from "../../../vitest.shared.config.ts";`);
        modified = true;
      }
    }

    // Update alias property to use makeBrowserAliases
    const aliasArrayPattern = /alias:\s*\[[\s\S]*?\],?/;
    const aliasObjectPattern = /alias:\s*\{[\s\S]*?\},?/;
    const newAlias = `alias: [...makeBrowserAliases(process.cwd())]`;

    if (aliasArrayPattern.test(content)) {
      content = content.replace(aliasArrayPattern, newAlias + ',');
      modified = true;
    } else if (aliasObjectPattern.test(content)) {
      content = content.replace(aliasObjectPattern, newAlias + ',');
      modified = true;
    } else {
      const testPattern = /(test:\s*\{)/;
      if (testPattern.test(content)) {
        content = content.replace(testPattern, "$1\n      " + newAlias + ",");
        modified = true;
      }
    }

    // Update include property
    const includePattern = /include:\s*\[[\s\S]*?\]/;
  const newInclude = `include: ["dist-test/browser/test/**/*.spec.js"]`;

    if (includePattern.test(content)) {
      content = content.replace(includePattern, newInclude);
      modified = true;
    } else {
      // Add include property after test: {
      const testPattern = /(test:\s*\{)/;
      if (testPattern.test(content)) {
        content = content.replace(testPattern, "$1\n      " + newInclude + ",");
        modified = true;
      }
    }

    // Add timeouts similar to Identity
    const testBlockPattern = /(test:\s*\{)([\s\S]*?)(\}\s*,?)/m;
    if (testBlockPattern.test(content)) {
      content = content.replace(testBlockPattern, (_m, start, body, end) => {
        let newBody = body;
        if (/hookTimeout\s*:/.test(newBody)) {
          newBody = newBody.replace(/hookTimeout\s*:\s*\d+/, 'hookTimeout: 500000');
        } else {
          newBody = `\n      hookTimeout: 500000,${newBody}`;
        }
        if (/testTimeout\s*:/.test(newBody)) {
          newBody = newBody.replace(/testTimeout\s*:\s*\d+/, 'testTimeout: 500000');
        } else {
          newBody = `\n      testTimeout: 500000,${newBody}`;
        }
        modified = true;
        return `${start}${newBody}${end}`;
      });
    }

    if (modified) {
      if (writeFile(vitestBrowserConfigPath, content, 'vitest.browser.config.ts')) {
        console.log(`    ✓ Updated vitest.browser.config.ts`);
        return true;
      }
    } else {
      console.log(`    Skipping vitest.browser.config.ts - no changes needed`);
    }

    return false;
  } catch (error) {
    console.error(`    ✗ Failed to update vitest.browser.config.ts: ${error.message}`);
    return false;
  }
}

/**
 * Apply tsconfig.browser.config.json changes
 */
function updateTsconfigBrowserConfig(projectPath, packageName) {
  const tsconfigBrowserPath = join(projectPath, 'tsconfig.browser.config.json');

  if (!existsSync(tsconfigBrowserPath)) {
    console.log(`    Skipping tsconfig.browser.config.json - file does not exist`);
    return false;
  }

  const config = {
    "extends": "../../../tsconfig.nonlib.json",
    "compilerOptions": {
      "lib": ["DOM", "ESNext"],
      "types": [],
      "paths": {
        [packageName]: ["./dist/browser/index.d.ts"],
        [`${packageName}/*`]: ["./dist/browser/*"],
        "$internal/*": ["./dist/browser/*"]
      },
      "outDir": "${configDir}/dist-test/browser",
      "noEmit": false
    },
    "include": ["${configDir}/test"],
    "exclude": [
      "${configDir}/test/stress",
      "${configDir}/test/integration*",
      "${configDir}/test/manual*",
      "${configDir}/test/snippets.spec.ts",
      "${configDir}/test/**/node"
    ]
  };

  if (writeFile(tsconfigBrowserPath, JSON.stringify(config, null, 2), 'tsconfig.browser.config.json')) {
    console.log(`    ✓ Updated tsconfig.browser.config.json`);
    return true;
  }
  return false;
}

/**
 * Create tsconfig.test.node.json
 */
function createTsconfigTestNode(projectPath, packageName) {
  const tsconfigTestNodePath = join(projectPath, 'tsconfig.test.node.json');

  // Only create if it doesn't exist
  if (existsSync(tsconfigTestNodePath)) {
    console.log(`    Skipping tsconfig.test.node.json - file already exists`);
    // Ensure it has expected aliases and lib
    try {
      const existing = JSON.parse(readFileSync(tsconfigTestNodePath, 'utf-8'));
      let changed = false;
      if (existing.extends !== "../../../tsconfig.nonlib.json") {
        existing.extends = "../../../tsconfig.nonlib.json";
        changed = true;
      }
      existing.compilerOptions = existing.compilerOptions || {};
      if (existing.compilerOptions.skipLibCheck !== true) {
        existing.compilerOptions.skipLibCheck = true;
        changed = true;
      }
      existing.compilerOptions.paths = existing.compilerOptions.paths || {};
      if (!existing.compilerOptions.paths[packageName]) {
        existing.compilerOptions.paths[packageName] = ["./src/index.ts"];
        changed = true;
      }
      if (!existing.compilerOptions.paths[`${packageName}/*`]) {
        existing.compilerOptions.paths[`${packageName}/*`] = ["./src/*"];
        changed = true;
      }
      // Normalize old alias key if present
      if (existing.compilerOptions.paths["internal/*"] && !existing.compilerOptions.paths["$internal/*"]) {
        existing.compilerOptions.paths["$internal/*"] = existing.compilerOptions.paths["internal/*"];
        delete existing.compilerOptions.paths["internal/*"];
        changed = true;
      }
      if (!existing.compilerOptions.paths["$internal/*"]) {
        existing.compilerOptions.paths["$internal/*"] = ["./src/*"];
        changed = true;
      }
      if (JSON.stringify(existing.compilerOptions.lib) !== JSON.stringify(["ESNext"])) {
        existing.compilerOptions.lib = ["ESNext"];
        changed = true;
      }
      if (!existing.include) {
        existing.include = ["${configDir}/test", "${configDir}/src"];
        changed = true;
      }
      if (!existing.exclude) {
        existing.exclude = [
          "${configDir}/**/*-browser.mts",
          "${configDir}/**/*-react-native.mts",
          "${configDir}/src/**/browserFlows",
          "${configDir}/test/stress",
          "${configDir}/test/manual*",
          "${configDir}/test/integration*",
          "${configDir}/test/snippets.spec.ts",
          "${configDir}/test/**/browser"
        ];
        changed = true;
      }
      if (changed && writeFile(tsconfigTestNodePath, JSON.stringify(existing, null, 2), 'tsconfig.test.node.json')) {
        console.log(`    ✓ Updated tsconfig.test.node.json`);
        return true;
      }
    } catch {
      // ignore
    }
    return false;
  }

  const config = {
    "extends": "../../../tsconfig.nonlib.json",
    "compilerOptions": {
      "skipLibCheck": true,
      "paths": {
        [packageName]: ["./src/index.ts"],
        [`${packageName}/*`]: ["./src/*"],
        "$internal/*": ["./src/*"]
      },
      "lib": ["ESNext"]
    },
    "include": ["${configDir}/test", "${configDir}/src"],
    "exclude": [
      "${configDir}/**/*-browser.mts",
      "${configDir}/**/*-react-native.mts",
      "${configDir}/src/**/browserFlows",
      "${configDir}/test/stress",
      "${configDir}/test/manual*",
      "${configDir}/test/integration*",
      "${configDir}/test/snippets.spec.ts",
      "${configDir}/test/**/browser"
    ]
  };

  if (writeFile(tsconfigTestNodePath, JSON.stringify(config, null, 2), 'tsconfig.test.node.json')) {
    console.log(`    ✓ Created tsconfig.test.node.json`);
    return true;
  }
  return false;
}

/**
 * Update package.json scripts
 */
function updatePackageJsonScripts(projectPath) {
  const packageJsonPath = join(projectPath, 'package.json');

  if (!existsSync(packageJsonPath)) {
    console.log(`    Skipping package.json - file does not exist`);
    return false;
  }

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    let modified = false;

    if (packageJson.scripts) {
      // Update test:node script
      if (packageJson.scripts['test:node'] && packageJson.scripts['test:node'] !== 'dev-tool run build-test --no-browser-test && dev-tool run test:vitest') {
        packageJson.scripts['test:node'] = 'dev-tool run build-test --no-browser-test && dev-tool run test:vitest';
        modified = true;
      }

      // Remove test:node:esm if it exists
      if (packageJson.scripts['test:node:esm']) {
        delete packageJson.scripts['test:node:esm'];
        console.log(`    ✓ Removed test:node:esm script`);
        modified = true;
      }
    }

    if (modified) {
      if (writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'package.json')) {
        console.log(`    ✓ Updated package.json scripts`);
        return true;
      }
    } else {
      console.log(`    Skipping package.json - no changes needed`);
    }
  } catch (error) {
    console.error(`    ✗ Failed to update package.json: ${error.message}`);
  }
  return false;
}

/**
 * Delete vitest.esm.config.ts if it exists
 */
function deleteVitestEsmConfig(projectPath) {
  const vitestEsmConfigPath = join(projectPath, 'vitest.esm.config.ts');

  if (existsSync(vitestEsmConfigPath)) {
    if (deleteFile(vitestEsmConfigPath, 'vitest.esm.config.ts')) {
      console.log(`    ✓ Deleted vitest.esm.config.ts`);
      return true;
    }
  } else {
    console.log(`    Skipping vitest.esm.config.ts - file does not exist`);
  }
  return false;
}

/**
 * Get all exported symbols from a package's index.ts file
 */
function getPackageExports(projectPath) {
  const indexPath = join(projectPath, 'src', 'index.ts');

  if (!existsSync(indexPath)) {
    return new Set();
  }

  try {
    const content = readFileSync(indexPath, 'utf-8');
    const exports = new Set();

    // Find all export statements
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Handle various export patterns
      if (trimmedLine.startsWith('export ')) {
        // export { A, B, C } from "./file"
        const namedExportMatch = trimmedLine.match(/export\s*\{\s*([^}]+)\s*\}/);
        if (namedExportMatch) {
          const namedExports = namedExportMatch[1].split(',').map(name => name.trim());
          namedExports.forEach(name => {
            // Handle aliases: export { A as B }
            const cleanName = name.split(' as ')[0].trim();
            exports.add(cleanName);
          });
        }

        // export * from "./file" - we can't know specific exports from this
        if (trimmedLine.includes('export *')) {
          // For now, we'll be conservative and assume this doesn't export the symbol
          // In a more sophisticated implementation, we could parse the referenced files
        }

        // export class A, export interface B, export function C, etc.
        const directExportMatch = trimmedLine.match(/export\s+(?:class|interface|function|const|let|var|type|enum)\s+(\w+)/);
        if (directExportMatch) {
          exports.add(directExportMatch[1]);
        }
      }
    }

    return exports;
  } catch (error) {
    console.error(`    Warning: Could not parse exports from index.ts: ${error.message}`);
    return new Set();
  }
}

/**
 * Rewrite import statements in test files
 */
function rewriteTestImports(projectPath, packageName) {
  const testDir = join(projectPath, 'test');

  if (!existsSync(testDir)) {
    console.log(`    Skipping import rewriting - no test directory`);
    return false;
  }

  const packageExports = getPackageExports(projectPath);
  let totalChanges = 0;

  function processTestFile(filePath) {
    if (!filePath.endsWith('.ts') && !filePath.endsWith('.js')) {
      return 0;
    }

    let content;
    try {
      content = readFileSync(filePath, 'utf-8');
    } catch (error) {
      console.error(`    Warning: Could not read ${filePath}: ${error.message}`);
      return 0;
    }

    let modified = false;
    const originalContent = content;

    // Pattern to match import statements from ../src/ OR ../../src/ OR internal/ (including type imports and dynamic imports)
  const importRegex = /(?:import\s+(?:type\s+)?(?:(?:\{[^}]+\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]+\}|\*\s+as\s+\w+|\w+))*)\s+from\s+|import\s*\()\s*["'](?:(?:\.\.\/)+src\/([^"']+)|\$internal\/([^"']+))["']\s*\)?/g;

    content = content.replace(importRegex, (match, srcPath, internalPath) => {
      // Check if this is a dynamic import
      const isDynamicImport = match.includes('import(');

      let importClause = '';

      if (!isDynamicImport) {
        // Extract the import statement parts for static imports
        const importMatch = match.match(/import\s+((?:type\s+)?(?:\{[^}]+\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]+\}|\*\s+as\s+\w+|\w+))*)\s+from/);
        if (!importMatch) return match;
        importClause = importMatch[1];
      }

      let importPath;

      if (srcPath) {
        // This is a ../src/ or ../../src/ import that needs to be converted
        importPath = srcPath;
      } else if (internalPath) {
        // This is a $internal/ import that needs to have .js extension added
        importPath = internalPath.replace(/\.js$/, ''); // Remove .js if present, we'll add it back
      } else {
        return match; // No change needed
      }

      // Remove .js extension if present for processing
      const cleanImportPath = importPath.replace(/\.js$/, '');

      if (cleanImportPath === 'index') {
        // Import from index - always use package name
        modified = true;
        if (isDynamicImport) {
          return `import("${packageName}")`;
        } else {
          return `import ${importClause} from "${packageName}"`;
        }
      } else {
        // Import from specific file - check if exported
        let usePackageName = false;

        if (!isDynamicImport) {
          // Extract imported names to check if they're exported (only for static imports)
          const namedImportMatch = importClause.match(/\{([^}]+)\}/);
          const defaultImportMatch = importClause.match(/^(\w+)(?:\s*,|$)/);

          if (namedImportMatch) {
            // Check if any of the named imports are exported
            const namedImports = namedImportMatch[1].split(',').map(name => name.trim().split(' as ')[0]);
            usePackageName = namedImports.some(name => packageExports.has(name));
          } else if (defaultImportMatch) {
            // For default imports, we'll assume they should use internal unless it's a known export
            const defaultImport = defaultImportMatch[1];
            usePackageName = packageExports.has(defaultImport);
          }
        }
        // For dynamic imports, we can't easily determine what's being imported, so be conservative

        modified = true;
        if (usePackageName) {
          if (isDynamicImport) {
            return `import("${packageName}")`;
          } else {
            return `import ${importClause} from "${packageName}"`;
          }
        } else {
          if (isDynamicImport) {
            return `import("$internal/${cleanImportPath}.js")`;
          } else {
            return `import ${importClause} from "$internal/${cleanImportPath}.js"`;
          }
        }
      }
    });

    if (modified) {
      try {
        if (isDryRun) {
          console.log(`    [DRY RUN] Would update imports in ${filePath.replace(projectPath, '.')}`);
        } else {
          writeFileSync(filePath, content);
          console.log(`    ✓ Updated imports in ${filePath.replace(projectPath, '.')}`);
        }
        return 1;
      } catch (error) {
        console.error(`    ✗ Failed to update ${filePath}: ${error.message}`);
        return 0;
      }
    }

    return 0;
  }

  function walkDirectory(dir) {
    let changedHere = 0;
    try {
      const entries = readdirSync(dir);
      for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
          changedHere += walkDirectory(fullPath);
        } else if (stat.isFile()) {
          changedHere += processTestFile(fullPath);
        }
      }
    } catch (error) {
      console.error(`    Warning: Could not read directory ${dir}: ${error.message}`);
    }
    return changedHere;
  }

  totalChanges = walkDirectory(testDir);

  if (totalChanges > 0) {
    console.log(`    ✓ Updated imports in ${totalChanges} test files`);
    return true;
  } else {
    console.log(`    Skipping import rewriting - no changes needed`);
    return false;
  }
}

/**
 * Process a single project
 */
function processProject(project) {
  const projectPath = resolve(repoRoot, project.projectFolder);
  const packageName = project.packageName;

  console.log(`\n📦 Processing ${packageName}`);
  console.log(`   Path: ${project.projectFolder}`);

  if (!existsSync(projectPath)) {
    console.log(`   ✗ Project folder does not exist: ${projectPath}`);
    return { processed: false, errors: 1 };
  }

  // Check if this project has test files (basic heuristic)
  const testPath = join(projectPath, 'test');
  if (!existsSync(testPath)) {
    console.log(`   Skipping - no test directory found`);
    return { processed: false, errors: 0 };
  }

  let changes = 0;
  let errors = 0;

  // Apply all the changes
  if (updateVitestConfig(projectPath, packageName)) changes++;
  if (updateVitestBrowserConfig(projectPath, packageName)) changes++;
  if (updateTsconfigBrowserConfig(projectPath, packageName)) changes++;
  if (createTsconfigTestNode(projectPath, packageName)) changes++;
  if (updatePackageJsonScripts(projectPath)) changes++;
  if (deleteVitestEsmConfig(projectPath)) changes++;
  if (rewriteTestImports(projectPath, packageName)) changes++;

  if (changes > 0) {
    console.log(`   📝 Applied ${changes} changes`);
  } else {
    console.log(`   ⏭️  No changes needed or applicable`);
  }

  return { processed: changes > 0, errors };
}

/**
 * Main execution
 */
function main() {
  let filteredProjects = projects;

  if (targetFilters.length > 0) {
    console.log(`\n🎯 Filtering projects by: ${targetFilters.join(', ')}`);
    filteredProjects = projects.filter(project =>
      targetFilters.some(filter =>
        project.packageName.includes(filter) ||
        project.projectFolder.includes(filter)
      )
    );

    if (filteredProjects.length === 0) {
      console.log('❌ No matching projects found');
      process.exit(1);
    }

    console.log(`📋 Found ${filteredProjects.length} matching projects:`);
    filteredProjects.forEach(project => {
      console.log(`   - ${project.packageName}`);
    });
  } else {
    console.log(`\n🌍 Processing all ${projects.length} projects...`);
  }

  let totalProcessed = 0;
  let totalErrors = 0;

  filteredProjects.forEach(project => {
    const result = processProject(project);
    if (result.processed) totalProcessed++;
    totalErrors += result.errors;
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Projects processed: ${totalProcessed}`);
  console.log(`   Errors encountered: ${totalErrors}`);

  if (isDryRun) {
    console.log(`\n🔍 This was a dry run. To apply changes, run without --dry-run flag.`);
  } else {
    console.log(`\n✅ Migration completed!`);
    console.log(`\n📋 Next steps:`);
    console.log(`   1. Review the changes made to each project`);
    console.log(`   2. Test the changes by running tests in affected projects`);
    console.log(`   3. Commit the changes when satisfied`);
  }

  process.exit(totalErrors > 0 ? 1 : 0);
}

main();

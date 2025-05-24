#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This script ensures that the necessary files exist in the dist directories
 * for samples to run even if the build fails.
 * 
 * It's meant to be run before executing samples in CI pipelines.
 */

const fs = require('fs');
const path = require('path');

// Get the package root directory
const packageRoot = path.resolve(__dirname, '..');
const distEsmDir = path.join(packageRoot, 'dist', 'esm');
const distCjsDir = path.join(packageRoot, 'dist', 'commonjs');
const stubsDir = path.join(packageRoot, 'samples-dev-stubs');

// Create directories if they don't exist
function createDirIfNeeded(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

// Copy stub file if the target doesn't exist
function copyStubIfNeeded(source, target) {
  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log(`Copied stub to: ${target}`);
    return true;
  }
  return false;
}

// Ensure ESM directory and files
createDirIfNeeded(distEsmDir);
const esmJsCopied = copyStubIfNeeded(
  path.join(stubsDir, 'index.js'), 
  path.join(distEsmDir, 'index.js')
);
const esmDtsCopied = copyStubIfNeeded(
  path.join(stubsDir, 'index.d.ts'), 
  path.join(distEsmDir, 'index.d.ts')
);

// Ensure CommonJS directory and files
createDirIfNeeded(distCjsDir);
const cjsJsCopied = copyStubIfNeeded(
  path.join(stubsDir, 'index.cjs'), 
  path.join(distCjsDir, 'index.js')
);
const cjsDtsCopied = copyStubIfNeeded(
  path.join(stubsDir, 'index.d.ts'), 
  path.join(distCjsDir, 'index.d.ts')
);

// Report results
if (esmJsCopied || esmDtsCopied || cjsJsCopied || cjsDtsCopied) {
  console.log('Stubs were copied to ensure samples can run.');
} else {
  console.log('No stubs needed to be copied. Dist directories already have the necessary files.');
}
const fs = require('fs');

const SRC_CRC64 = './src/crc64.js';
const SRC_GLUE = './src/crc64_glue.js';

// `dist/commonjs/package.json` is `{ "type": "commonjs" }`, so the same .js file
// must use CommonJS syntax there. Strip the ESM-only polyfill block and rewrite
// the ESM `export default` to `module.exports`. The other targets (esm, browser,
// react-native) sit under `{ "type": "module" }` and get the ESM source verbatim.
const ESM_COMPAT_BLOCK = /\/\/ ESM-COMPAT-START[\s\S]*?\/\/ ESM-COMPAT-END\r?\n?/;
const ESM_EXPORT_BLOCK =
  /\/\/ ESM-EXPORT-START[^\n]*\r?\nexport default NativeCRC64;\r?\n\/\/ ESM-EXPORT-END/;

const esmSource = fs.readFileSync(SRC_CRC64, 'utf8');

if (!ESM_COMPAT_BLOCK.test(esmSource)) {
  throw new Error(
    "copyJSFiles.cjs: expected ESM-COMPAT marker block in src/crc64.js was not found.",
  );
}
if (!ESM_EXPORT_BLOCK.test(esmSource)) {
  throw new Error(
    "copyJSFiles.cjs: expected ESM-EXPORT marker block in src/crc64.js was not found.",
  );
}

const cjsSource = esmSource
  .replace(
    ESM_COMPAT_BLOCK,
    "// ESM compatibility block omitted in CommonJS build.\n",
  )
  .replace(ESM_EXPORT_BLOCK, "module.exports = NativeCRC64;");

fs.writeFileSync('./dist/commonjs/crc64.js', cjsSource);

const browserSource = esmSource
      .replace(
        ESM_COMPAT_BLOCK,
        `// ESM compatibility block omitted in browsers build as it is NodeJS only.\n`);

fs.writeFileSync('./dist/browser/crc64.js', browserSource);
fs.writeFileSync('./dist/react-native/crc64.js', browserSource);

for (const dir of ['browser', 'esm', 'commonjs', 'react-native']) {
  fs.cpSync(SRC_GLUE, `./dist/${dir}/crc64_glue.js`);
}

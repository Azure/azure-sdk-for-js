const fs = require("fs");

const SRC_CRC64 = "./src/crc64.js";
const SRC_GLUE = "./src/crc64_glue.js";

// `src/crc64.js` is Emscripten output whose wasm is base64-embedded, so it no longer
// performs any filesystem/URL I/O: the Node `require('fs')`/`require('path')` reads and
// the ESM `import.meta.url` polyfill have been removed at the source. As a result the
// esm, browser and react-native builds (all under `{ "type": "module" }`) are byte
// identical and get the source verbatim. The only per-target difference is the module
// system: `dist/commonjs/package.json` is `{ "type": "commonjs" }`, so the ESM
// `export default` is rewritten to `module.exports` there.
const ESM_EXPORT_BLOCK =
  /\/\/ ESM-EXPORT-START[^\n]*\r?\nexport default NativeCRC64;\r?\n\/\/ ESM-EXPORT-END/;

const esmSource = fs.readFileSync(SRC_CRC64, "utf8");

if (!ESM_EXPORT_BLOCK.test(esmSource)) {
  throw new Error(
    "copyJSFiles.cjs: expected ESM-EXPORT marker block in src/crc64.js was not found.",
  );
}

// esm, browser and react-native share the identical ESM source.
for (const dir of ["esm", "browser", "react-native"]) {
  fs.writeFileSync(`./dist/${dir}/crc64.js`, esmSource);
}

const cjsSource = esmSource.replace(ESM_EXPORT_BLOCK, "module.exports = NativeCRC64;");

fs.writeFileSync("./dist/commonjs/crc64.js", cjsSource);

for (const dir of ["browser", "esm", "commonjs", "react-native"]) {
  fs.cpSync(SRC_GLUE, `./dist/${dir}/crc64_glue.js`);
}

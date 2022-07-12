import MagicString from "magic-string";
import fs from "fs";
import nodeResolve from "@rollup/plugin-node-resolve";
import path from "path";
import pkg from "./package.json";

const executable = (options = {}) => {
  let fileName;
  const shebangReplacements = new Map();
  return {
    name: "rollup-plugin-executable",
    transform(code, module) {
      let shebang;
      code = code.replace(/^#![^\n]*/, (match) => ((shebang = match), ""));
      if (!shebang) return null;
      shebangReplacements.set(module, shebang);
      return { code, map: null };
      /*return {
        code: code.replace(
          /^#![^\n]/,
          (shebang) => (shebangReplacements.set(module, shebang), "")
        ),
        map: null,
      };*/
    },
    renderChunk(code, chunk, { sourcemap }) {
      const shebang = shebangReplacements.get(chunk.facadeModuleId);
      if (!shebang) return null;
      const s = new MagicString(code);
      s.prepend(`${options.shebang || shebang}\n`);
      return {
        code: s.toString(),
        map: sourcemap ? s.generateMap({ hires: true }) : null,
      };
    },
    generateBundle(options) {
      fileName = options.file;
    },
    writeBundle() {
      if (fileName && process.platform !== "win32") {
        const stat = fs.statSync(fileName);

        // chmod a+x -> 0o111
        fs.chmodSync(fileName, stat.mode | 0o111);
      }
    },
  };
};

function copyTemplates() {
  return {
    name: "copy-templates",
    generateBundle() {
      const from = path.join("src", "templates");
      const to = path.join("bin");
      fs.mkdirSync("bin", { recursive: true });
      const log = (msg) => console.log("\x1b[36m%s\x1b[0m", msg);
      log(`copy templates: ${from} → ${to}`);
      copyFolderRecursiveSync(from, to);
    },
  };
}

function copyFileSync(source, target) {
  var targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
  var files = [];

  // Check if folder needs to be created or integrated
  var targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

/** @type {import('rollup').RollupOptions} */
const config = {
  input: ["dist-esm/src/bin/execute.js"],
  output: {
    format: "cjs",
    file: "bin/execute.js",
  },
  external: [...Object.keys(pkg.dependencies), "@azure/identity"],
  plugins: [
    executable(),
    nodeResolve({
      preferBuiltins: true,
    }),
    copyTemplates(),
  ],
};

export default config;

import nodeResolve from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";

export default [
  {
    input: "dist-esm/index.js",
    output: {
      file: "dist/index.js",
      format: "umd",
      name: "Microsoft.Azure.Cosmos",
      sourcemap: true
    },
    preserveSymlinks: false,
    plugins: [
      cjs(),
      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false
      }),
    ]
  }
];

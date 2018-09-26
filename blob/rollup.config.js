import nodeResolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import shim from 'rollup-plugin-shim';

export default [
  {
    external: ['ms-rest-js', 'crypto', 'fs', 'events', 'os'],
    input: 'dist-esm/lib/index.js',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [nodeResolve({ module: true }), uglify()]
  },
  {
    external: ['ms-rest-js'],
    input: 'dist-esm/lib/index.browser.js',
    output: {
      globals: {
        'ms-rest-js': 'msRest'
      },
      file: 'dist/index.browser.js',
      format: 'umd',
      name: 'azblob',
      sourcemap: true
    },
    plugins: [
      replace({
        delimiters: ['', ''],
        values: {
          // replace dynamic checks with if (false) since this is for
          // browser only. Rollup's dead code elimination will remove
          // any code guarded by if (isNode) { ... }
          'if (isNode)': 'if (false)'
        }
      }),
      // os is not used by the browser bundle, so just shim it
      shim({
        os: `
            export const type = 1;
            export const release = 1;
          `
      }),
      nodeResolve({
        module: true,
        browser: true,
        preferBuiltins: false
      }),
      commonjs({
        namedExports: {
          events: ['EventEmitter'],
          assert: ['ok', 'deepEqual', 'equal', 'fail', 'deepStrictEqual']
        }
      }),
      uglify()
    ]
  }
];

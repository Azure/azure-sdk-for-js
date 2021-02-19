import resolve from '@rollup/plugin-node-resolve'
import auto from '@rollup/plugin-auto-install'

export default {
  input: 'dist-esm/index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [ auto(), resolve()],
}
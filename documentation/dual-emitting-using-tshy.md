The Azure SDK for JS client libraries are built for both CommonJS and ESM.

While the two formats are largely compatible, a few caveats apply.

## Usage of __dirname and __filename

When a module is `require`d in commonJS, __dirname and __filename are available via the module system; however, in ESM the same globals* are not available. 

Likewise, in CommonJS the globals `import.meta.*` are not available for usage.

Our build tool, [isaacs/tshy](https://github.com/isaacs/tshy?tab=readme-ov-file#commonjs-dialect-polyfills) provides a mechanism for automatically polyfilling the correct syntax depending on the import type.

In order to properly fetch the current filename or current dirname you could do the following:

```ts
// myFile.ts - ESM flavor, use import.meta
const currentDir = dirname(fileURLToPath(import.meta.url));

// myFile-cjs.cts - CommonJS flavor, use __dirname and __filename
const currentDir = __dirname
```

Note that the file naming convention is important! The commonJS polyfill _must_:

1. begin with the same file name as the ESM flavor
2. Add the `-cjs` postfix to the file name
3. Use `.cts` extension
# Dual Emitting Using Warp

The Azure SDK for JS client libraries are built for both CommonJS and ESM using [@microsoft/warp](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/warp/README.md).

While the two formats are largely compatible, a few caveats apply.

## Usage of __dirname and __filename

When a module is `require`d in commonJS, `__dirname` and `__filename` are available via the module system; however, in ESM the same globals are not available.

Likewise, in CommonJS the globals `import.meta.*` are not available for usage.

Our build tool, [warp](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/warp/README.md), provides a [polyfill substitution](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/warp/README.md#polyfill-substitution) mechanism for automatically substituting the correct source file depending on the build target.

In order to properly fetch the current filename or current dirname you could do the following:

```ts
// myFile.ts - ESM flavor, use import.meta
const currentDir = dirname(fileURLToPath(import.meta.url));

// myFile-cjs.cts - CommonJS flavor, use __dirname and __filename
const currentDir = __dirname;
```

Note that the file naming convention is important! The CommonJS polyfill _must_:

1. Begin with the same file name as the ESM flavor
2. Add the `-cjs` postfix to the file name
3. Use `.cts` extension

For more details on polyfill substitution and the full configuration options, see the [warp README](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/warp/README.md).
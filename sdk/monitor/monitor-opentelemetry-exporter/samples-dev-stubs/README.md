# Samples Dev Stubs

These stub files are provided to help run the samples when the actual build of the package fails. This is especially important in nightly builds where we want to ensure samples can be executed even if there are temporary build issues.

## Usage

In CI pipelines before running samples, copy these files to the appropriate locations:

```shell
# Create ESM distribution directory
mkdir -p ./dist/esm
cp ./samples-dev-stubs/index.js ./dist/esm/
cp ./samples-dev-stubs/index.d.ts ./dist/esm/

# Create CommonJS distribution directory
mkdir -p ./dist/commonjs
cp ./samples-dev-stubs/index.cjs ./dist/commonjs/index.js
cp ./samples-dev-stubs/index.d.ts ./dist/commonjs/
```

This will ensure that when the samples try to import from the package, they'll get these stub classes instead of failing with "Cannot find module" errors.

The stubs implement minimal versions of the exporter classes with console logging to indicate they are being used.
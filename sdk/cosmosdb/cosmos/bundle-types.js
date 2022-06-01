// TODO. The api-extractor CLI command forces us into their docs generation and will error.
// By invoking the node API we avoid this.
// But we also swallow errors.
// See https://github.com/Microsoft/web-build-tools/issues/920
const ApiExtractor = require("@microsoft/api-extractor");
const NodeCoreLib = require("@microsoft/node-core-library");
const config = NodeCoreLib.JsonFile.loadAndValidate(
  "api-extractor.json",
  ApiExtractor.Extractor.jsonSchema
);

// This interface provides additional runtime state that is NOT part of the config file
const options = {
  localBuild: process.argv.indexOf("--ship") < 0,
};
const extractor = new ApiExtractor.Extractor(config, options);
extractor.processProject();

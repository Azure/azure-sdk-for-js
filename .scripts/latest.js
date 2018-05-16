const dependencies = require("./dependencies");

const previewVersion = dependencies.getNpmPackageVersion("ms-rest-js", "latest");
dependencies.updatePackageJsonDependency("ms-rest-js", `^${previewVersion}`);
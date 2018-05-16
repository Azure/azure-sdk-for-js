const dependencies = require("./dependencies");

const previewVersion = dependencies.getNpmPackageVersion("ms-rest-js", "preview");
dependencies.updatePackageJsonDependency("ms-rest-js", `^${previewVersion}`);
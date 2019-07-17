const gulp = require("gulp");
const zip = require("gulp-zip");

const version = require("./package.json").version;
const zipFileName = `azurekeyvaultsecrets-${version}.zip`;

gulp.task("zip", function(callback) {
  gulp
    .src(["browser/azure-keyvault-secrets.js"])
    .pipe(zip(zipFileName))
    .pipe(gulp.dest("browser"))
    .on("end", callback);
});

const gulp = require("gulp");
const zip = require("gulp-zip");

const version = require("./package.json").version;
const zipFileName = `azurekeyvaultkeys.queue-${version}.zip`;

gulp.task("zip", function (callback) {
  gulp
    .src([
      "browser/azure-keyvault-keys.js",
    ])
    .pipe(zip(zipFileName))
    .pipe(gulp.dest("browser"))
    .on("end", callback);
});

const gulp = require("gulp");
const zip = require("gulp-zip");

const version = require("./package.json").version;
const zipFileName = `azurestoragejs.file-${version}.zip`;

gulp.task("zip", async () => {
  return gulp
    .src([
      "browser/azure-storage.file.js",
      "browser/azure-storage.file.min.js",
      "browser/*.txt"
    ])
    .pipe(zip(zipFileName))
    .pipe(gulp.dest("browser"));
});

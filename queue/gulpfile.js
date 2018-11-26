const gulp = require("gulp");
const zip = require("gulp-zip");

const version = require("./package.json").version;
const zipFileName = `azurestoragejs.queue-${version}.zip`;

gulp.task("zip", async() => {
    return gulp
        .src([
            "browser/azure-storage.queue.js",
            "browser/azure-storage.queue.min.js",
            "browser/*.txt"
        ])
        .pipe(zip(zipFileName))
        .pipe(gulp.dest("browser"));
});
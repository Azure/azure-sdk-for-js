var gulp = require("gulp"),
  tslint = require("gulp-tslint"),
  tsc = require("gulp-typescript"),
  sourcemaps = require("gulp-sourcemaps"),
  runSequence = require("run-sequence"),
  mocha = require("gulp-mocha");

gulp.task('default', function () {
  console.log("run gulp -T to see all available tasks.\n");
});

gulp.task("lint", () =>
  gulp.src([
    "lib/**/**.ts",
    "test/**/**.ts"
  ])
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report())
);

// TODO: Doesn't yet confirm to folder structure
gulp.task("build", () =>
  gulp.src([
    "lib/**/**.ts"
  ])
    .pipe(tsc(tsc.createProject("tsconfig.json")))
    .js.pipe(gulp.dest("dist/lib/"))
);

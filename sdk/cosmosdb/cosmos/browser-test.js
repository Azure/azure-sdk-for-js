const tests = require.context("./lib/", true, /\.spec\.js$/);

tests.keys().forEach(tests);
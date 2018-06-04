/*
The MIT License (MIT)
Copyright (c) 2014 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict";

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');
    require("time-grunt")(grunt);
    // Load grunt tasks automatically
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
      eslint: {
          src: [
              "lib/*.js",
              "lib/hash/*.js",
              "lib/queryExecutionContext/*.js",
              "lib/routing/*.js",
              "test/*.js"],
          options: {
              configFile: ".eslintrc"
          }
      }, 
      mochaTest: {
        test: {
          options: {
            reporter: 'mocha-multi-reporters',
            reporterOptions: {
                "reporterEnabled": "mocha-junit-reporter, tap",
                "mochaJunitReporterReporterOptions": {
                    "mochaFile": "TEST-nodejs.xml"
                }
            },
            // Require blanket wrapper here to instrument other required
            // files on the fly. 
            //
            // NB. We cannot require blanket directly as it
            // detects that we are not running mocha cli and loads differently.
            //
            // NNB. As mocha is 'clever' enough to only run the tests once for
            // each file the following coverage task does not actually run any
            // tests which is why the coverage instrumentation has to be done here
   //         require: 'coverage/blanket'
            timeout: 20000,
          },
          src: ['test/**/*.js']
        }
      }
    });
   
    grunt.registerTask("lint", ["eslint"]);
   // TODO: we should have lint enabled
   // grunt.registerTask("default", "lint");
    grunt.registerTask('tests', 'mochaTest');
};

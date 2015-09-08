"use strict";

module.exports = function (grunt) {
    require("time-grunt")(grunt);
    // Load grunt tasks automatically
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        eslint: {
            src: ["lib/*.js", "test/*.js"],
            options: {
                configFile: ".eslintrc"
            }
        }
    });

    grunt.registerTask("lint", ["eslint"]);
    grunt.registerTask("default", "lint");
};
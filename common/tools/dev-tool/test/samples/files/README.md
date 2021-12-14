## Azure dev-tool sample tests

This directory holds test files for the sample tool. The `inputs` folder contains example sample folders, and the `expectations` folder should contain a directory with the exact same name.

- inputs/ (each child of "inputs" should be like a "samples-dev" folder)
  - a/
    - config.json
    - sampleB.ts
    - sample.env
  - b/
    - config.json
    - sampleB.ts
    - sample.env
- expectations/ (should mirror "inputs", but each folder should be like the output of sample generation)
  - a/
    - javascript/
      - README.md
      - ...
    - typescript/
      - README.md
      - src/
      - ...
  - b/
    - javascript/
      - README.md
      - ...
    - typescript/
      - README.md
      - src/
      - ...

Instead of providing a `//sampleConfiguration` in a `package.json` file, a `config.json` containing _only_ the entries from the sample configuration should be placed in each input folder, e.g. `inputs/a/config.json`. These values will be passed to the generator. Additionally, a `sample.env` file is required in each input folder (it will be copied to the expectation folder as if it were in the package root).

### Specifying a version number

The version number may be specified in the NPM style as part of the input/expectation directory name:

- inputs/
  - simple@1.0.0-beta.1

The test harness will parse this version number if it is specified and use it during generation.

## Creating New Expectations

You may edit the expectation files manually (for test-driven development purposes) or create new expectations by running the tests with `TEST_MODE=record`, just like when using the live test recorder. Running the sample test system in this mode is destructive (it will delete the whole `expectations` folder and replace it with whatever the current output of the tool is), but _it will refuse to run if the `expectations` folder is dirty (if it has changes in git -- note that it will still destroy **untracked** files)_.

Follow these instructions to run the tests locally.

## Prerequisites

1. Clone Azure/azure-documentdb-node repository
Please clone the source and tests from [https://github.com/Azure/azure-documentdb-node](https://github.com/Azure/azure-documentdb-node)

2. Install Node.js and npm
[https://docs.npmjs.com/getting-started/installing-node](https://docs.npmjs.com/getting-started/installing-node)

3. Install mocha package globally
> npm install -g mocha

## Running the tests
Using your command-line tool, from the root of your local copy of azure-documentdb-node repository: 
If you are contributing changes and submitting PR then you need to ensure that you run the tests against your local copy of the source, and not the published npm package. 

If you just want to run the tests against the published npm package then skip steps #1 & #2 proceed directly to step #3

1. Remove documentdb, if previously installed
> npm remove documentdb

2. Install documentdb
> npm install source

3. Change to `test` directory 
> cd test

3. Run the tests
> mocha -t 0 -R spec

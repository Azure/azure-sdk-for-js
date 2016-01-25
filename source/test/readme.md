##Prerequisites

1. Clone Azure/azure-documentdb-node repository
Please clone the source and tests from [https://github.com/Azure/azure-documentdb-node](https://github.com/Azure/azure-documentdb-node)

2. Install Node.js and npm
[https://docs.npmjs.com/getting-started/installing-node](https://docs.npmjs.com/getting-started/installing-node)

3. Install mocha package globally
> npm install -g mocha

##Running the tests
Using your command-line tool, from the root of your local copy of azure-documentdb-node repository: 

1. Remove documentdb, if previously installed
> npm remove documentdb

2. Install documentdb
> npm install source

3. Change to `source` directory 
> cd source

3. Run the tests
> mocha -t 0 -R spec

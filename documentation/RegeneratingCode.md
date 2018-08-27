# Regenerating Code

- Please execute `npm install` locally from the root of the cloned repo (This will install gulp locally for the repo).
- Please install gulp globally `npm install gulp -g`
- Please install autorest `npm install -g autorest`
- Check the help `autorest --help`
- Make sure you have updated the [mappings object](https://github.com/Azure/azure-sdk-for-node/blob/master/codegen_mappings.json) correctly for generating the source code for your service
- To list all the tasks execute `gulp -T` from the root of the repo
- Regenertion command options
  - If you want to regenerate all the services then execute `gulp codegen`
  - If you want to generate for your project then execute `gulp codegen --project <your project name a.k.a the key of the mappings object in codegen_mappings.json>`
  - If you want to use a local file then save the file locally say "D:\sdk" and make sure to have the same path as defined in the source of your project in the mappings object. Execute `gulp codegen --spec-root "D:\sdk" --project <your-project-name>`.
- If generation is successful then you will see the generated code in the lib folder under `lib/services/<YourServiceName>`
- Make sure you have License.txt (MIT), README.md and package.json file. Take a look at [StorageManagement2](https://github.com/Azure/azure-sdk-for-node/tree/master/lib/services/storageManagement2) as an example.
- **Please make sure to have accurate examples in README.md as that is what customers will see when they search for your client libraries on [npm](https://npmjs.com).**
- If you are adding a brand new client library or adding a new client to your library then please make sure that a function to create a client for your service is exported in the rollup azure file (azure-sdk-for-node/lib/azure.js). You can take a look at an exported function as an example over [here](https://github.com/Azure/azure-sdk-for-node/blob/master/lib/azure.js#L1640).

## Publishing to npm
- Once your PR is merged into the master branch, you can publish your package to npm by following the instructions in "step 6" over [here](https://github.com/Azure/adx-documentation-pr/blob/master/clis/azure-cli/guide.md#swagger-specs---using-autorest----node-sdk--------azure-cli)

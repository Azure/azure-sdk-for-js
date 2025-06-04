Please also read the contributing guidelines from the [Azure Team](https://azure.microsoft.com/blog/simple-contribution-to-azure-documentation-and-sdk/)

# Contributing

## Client SDK Re-generation

Steps

0. to work around a code generator limitation at this point, we need a script to help with generation. Copy it from `sdk/keyvault` directory:

   `cp sdk/keyvault/generate.js sdk/eventgrid/generate.cjs`

1. update the commit id in `tsp-location.yaml` to be the one for the new version.

2. change directory to `sdk/eventgrid/eventgrid-systemevents`

3. run the script we just copied

   `node ../generate.cjs`

4. update `src/index.ts` to re-export new public types from `./generated/index.js`.

5. update `src/predcates.ts` to add mapping between new event names and their corresponding `*EventData` types.

6. build the package `rush build -t @azure/eventgrid-systemevents` or `rush build -t .` when under the `sdk/eventgrid/eventgrid-systemevents` directory

7. commit the updated `sdk/eventgrid/eventgrid-systemevents/review/eventgrid-systemevents.api.md` together with other changes.

For an example, please see the changes to `sdk/eventgrid/eventgrid-systemevents` in pull request https://github.com/Azure/azure-sdk-for-js/pull/33917

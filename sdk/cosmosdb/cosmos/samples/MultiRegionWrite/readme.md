# Multi-Region Write

This demo shows off writing to multiple regions at the same time. It also demos different conflict handling scenarios.

## Quick start

1. Install packages: `npm i`
2. Set environment variables
   1. endpoint - the endpoint url
   2. key - the masterkey for the account
   3. regions - a semicolon deliminated list of regions (aka westus;eastus)
   4. There are additional config options in the config.ts file, but they are not required.
3. Start: `npm start`

## Debugging with VS Code

There is a launch.json config named "MultiRegionWrite Debug" which you can use to attach via VS Code.

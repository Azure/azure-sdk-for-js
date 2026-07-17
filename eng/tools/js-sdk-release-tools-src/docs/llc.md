# Azure JS RLC Tool

Azure JS RLC Tool can help you get llc codes by one command in few minutes.

_Note: Currently, this tools only supports generating dataplane sdk, and only can run in powershell/bash._

## Install

```shell script
npm install -g @azure-tools/js-sdk-release-tools
```

## How to use

### Prerequisites

1. Install Any of the [LTS versions of Node.js](https://nodejs.org/en/about/releases/).
2. Install autorest: `npm install -g autorest`.
3. use [Git](https://git-scm.com/) to clone [azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) or [azure-sdk-for-js-pr](https://github.com/Azure/azure-sdk-for-js-pr). Then go to the root of sdk repository and run `pnpm install`. For example:

```shell
cd azure-sdk-for-js
pnpm install
```

### Steps

##### Step 1. Run command:

```
rlc-code-gen --package-name=<your package name>
```

_Note_:

- _Please replace with your package name, for example: `rlc-code-gen --package-name=@azure-rest/purview-account`. If you don't provide it, the tool will ask you to input it interactively._
- _You also can use command `rlc-code-gen --readme=<the path of swagger/README.md>` to generate codes if `swagger/README.md` exists. Then it will skip Step 2 and go to Step 3 directly._
- _If you run command with `--interactive`, then the tool asks to re-check some values in `swagger/README.md` if it exists._

##### Step 2. Generate swagger/README.md

If your package is first release or doesn't contain `swagger/README.md`, the tool will ask you to input some necessary information. If not, please skip this step.

For example:

```
Which resource provider do you want to store your package in sdk folder? Please input it: purview
```

You need to provide following information. You can refer to `swagger/README.md` as an example.

| parameter         | description                                                                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| service-name      | The folder name under [sdk](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk). If the service name you provided is not under [sdk](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk), we will create a new one for you. |
| package-name      | The package name of the sdk, which should be in format @azure-rest/xxxxx                                                                                                                                                              |
| title             | The title of the sdk.                                                                                                                                                                                                                 |
| description       | The description of the sdk.                                                                                                                                                                                                           |
| input-file        | The swagger files to generate sdk. If you have multi input files, please use semicolons to separate.                                                                                                                                  |
| package-version   | The sdk version you want to generate.                                                                                                                                                                                                 |
| credential-scopes | The credential scopes of your service.                                                                                                                                                                                                |

You also can provide the information when running command `rlc-code-gen`, such as `rlc-code-gen --package-name=<your package name> --title=<your title> --description=<your description>`.

##### Step 3. The tool will generate codes and build generated codes automatically. Finally, you can get RLC codes.

- If you want to write test, please start from sample test from `test` folder.

Please refer to [template](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/template/template) as a good start.

# Contribute

If you want to contribute to this tool, please start from [src/rlcCodegenCli.ts].
Also, you need to know what the tool does:

#### Generate Codes:

1. Generate `swagger/README.md`
2. Generate source code by codegen
3. Add/update ci.yml
4. Add/update ci.yml

#### Build Codes:

1. Run `pnpm install`
2. Run `pnpm build --filter <your package name>...`
3. Generate changelog(Because released package doesn't include review folder, so we generate an initial release changelog if there is no existing CHANGELOG.md.)
4. Clean compiled codes

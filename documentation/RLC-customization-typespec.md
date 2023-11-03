# Customization on the RLC rest-level client libraries

## Customization process

0. **Prerequisite**
    
    Before any customization process please ensure your existing SDK repo could run commands `rush update && rush build -t @azure-rest/communication-job-router` successfully so that below commands could be touched. You could refer others steps in [get started doc](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md).

1. **Update configuration**
    
    You can update `tsp-location.yaml` under sdk project folder to set the typespec project. 
  
    You can refer to the [tsp-location.yaml](https://github.com/Azure/azure-sdk-tools/blob/main/doc/common/TypeSpec-Project-Scripts.md#tsp-locationyaml) which describes the supported properties in the file.

2. **Create `sources` folder**

    If this is your first time to customize code, we need to create a `sources` folder to put our customization and generated code.

    ```shell
    cd sdk/communication/communication-job-router-rest
    mkdir sources
    ```

3. **Generate code**

    Run the following two scripts from project directory (i.e your current directory is `path/to/azure-sdk-for-js/sdk/communication/communication-job-router-rest`) to generate the code:

    > NOTE: These scripts require PowerShell version 7 or higher

    ```ps
    pwsh ../../../eng/common/scripts/TypeSpec-Project-Sync.ps1 .
    ```
    followed by

    ```ps
    pwsh ../../../eng/common/scripts/TypeSpec-Project-Generate.ps1 .
    ```

    After generated the SDK should be generated under `sources/generated` folder.

4. **Create `customizations` folder under `sources`**

    All customization codes should be under the `sources/customizations` so if no just create one.

    ```shell
    mkdir sources/customizations
    ```

5. **Customize code**

    We give an example on how to customize the authentication in following sections and you could refer for more details.

6. **Run command to apply customization**

    Once we finish our customization we will run command to apply them. First we could add below script under `scripts` section in  `package.json`.
    ```json
      "customize": "rimraf src && dev-tool customization apply -s sources/generated/src && npm run format",
    ```

    Then run `rushx customize` command to apply, then all changes should be under `src` project root folder. 

    ```shell
    rushx customize
    ```

## Detailed customization example

### Customization tool

Simply speaking the customization tool would `merge` the codes under `customizations` and ones under `generated/src`. So you can imagine that:
- If the customizations folder is empty which means there is no newly-applied code under generated SDKs;
- If I'd like to add a new file like `OpenAIKeyCredential` which includes customized `KeyCredential` at the top level, I could add it [here](https://github.com/Azure/azure-sdk-for-js/blob/79a6000fb3c733ad444660b880a0c25a2cf5c7ff/sdk/openai/openai/sources/customizations/OpenAIKeyCredential.ts) and don't forget to expose it in [index.ts](https://github.com/Azure/azure-sdk-for-js/blob/79a6000fb3c733ad444660b880a0c25a2cf5c7ff/sdk/openai/openai/sources/customizations/index.ts#L17) file;
- If I'd like to change the generated `createClient`, I would create the same filename and same method name but with my own logic. Then the newly one would override the existing one e.g: [generated method](https://github.com/Azure/azure-sdk-for-js/blob/79a6000fb3c733ad444660b880a0c25a2cf5c7ff/sdk/openai/openai/sources/generated/src/api/operations.ts#L232) and [customized method](https://github.com/Azure/azure-sdk-for-js/blob/79a6000fb3c733ad444660b880a0c25a2cf5c7ff/sdk/openai/openai/sources/customizations/api/operations.ts#L329);
- If I expect no changes for other code snippet, I can do nothing for them.

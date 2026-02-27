Merge guidelines for newly emitted code from the .\incoming directory:
- The following files should not be deleted or changed:
    src\aiProjectClient.ts
    src\constants.ts
    src\getCustomFetch-browser.mts
    src\getCustomFetch.ts
    src\overwriteOpenAiClient.ts
    src\utils.ts
    src\aiProjectContext.ts
    src\api\telemetry\index.ts
    src\api\telemetry\operations.ts
    src\api\datasets\operations.ts
    src\classic\telemetry\index.ts
    src\classic\datasets\index.ts
    src\classic\index.ts
    src\static-helpers\**
- IMPORTANT: If any change or deletion has occured in the files listed above, the merge has failed, and all operations should be aborted.
- in src\models\models.ts, please only accept added models. Unless otherwise instructed in the prompt, do not change or delete existing models in this file.
- in src\models\index.ts, please only accept added models. Unless otherwise instructed in the prompt, do not change or delete existing models in this file.
- foundryFeatures must not be a parameter for any method, internal or external facing. instead, instatiate it locally to a default value before sending it over the wire. any changes making foundryFeatures a method parameter should be reverted to the pattern just described.

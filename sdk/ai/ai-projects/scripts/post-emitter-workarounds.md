As of 2/20/2026, the following changes consistently need to be reverted after emitting from TypeSpec:

- in src/models/models.ts, any readonly fields were changed from optional to required should be reverted back to optional
- in src/models/models.ts, all fields that change to become nullable (adding " | null" to the type) need to be reverted back to non-nullable.
- foundryFeatures must not be a parameter for any method, internal or external facing. instead, instatiate it locally to a default value before sending it over the wire. any changes making foundryFeatures a method parameter should be reverted to the pattern just described.
- ErrorModel should be used instead of ApiError for the interface name in models.ts.
- TelemetryOperations, a completely custom namespace, should not be removed from src/index.ts or classic/index.ts. Neither should DatasetUploadOptions.

# Batch delete and purge preview

Batch delete and purge are deferred from the `@azure/service-bus` 7.10.0 GA release. A stable package and its APIView must contain only stable APIs, while this feature still requires API design changes. The last stable release, 7.9.5, did not expose these APIs.

The implementation is tracked by [Azure/azure-sdk-for-js#39309](https://github.com/Azure/azure-sdk-for-js/pull/39309). That pull request must be rebuilt on `main` after 7.10.0 is released so the complete feature is reintroduced from the stable baseline.

## Intended public API

```ts
interface DeleteMessagesOptions extends OperationOptionsBase {
  beforeEnqueueTime?: Date;
}

interface DeleteMessagesResult {
  deletedCount: number;
}

interface PurgeMessagesOptions extends OperationOptionsBase {
  beforeEnqueueTime?: Date;
  maxMessagesPerBatch?: number;
}

interface PurgeMessagesResult {
  deletedCount: number;
}

deleteMessages(
  maxMessageCount: number,
  options?: DeleteMessagesOptions,
): Promise<DeleteMessagesResult>;

purgeMessages(options?: PurgeMessagesOptions): Promise<PurgeMessagesResult>;
```

The required `maxMessageCount` is positional rather than part of an options bag. Both operations return result objects so additional response values can be added later without a breaking return-type change.

## Removed for 7.10.0 GA

- `DeleteMessagesOptions` and `PurgeMessagesOptions` exports.
- `ServiceBusReceiver.deleteMessages` and `ServiceBusReceiver.purgeMessages`, including session receiver implementations.
- The internal management request path used only by these receiver methods.
- Batch delete and purge tests.
- JavaScript, TypeScript, and development samples, including their README entries.
- Batch delete and purge release notes.
- The corresponding generated API report entries.

The internal AMQP operation constants in `@azure/core-amqp` are unchanged. They are not part of the `@azure/service-bus` public API and can be reused when the feature returns.

## Reintroduction checklist

1. Rebuild #39309 on the post-7.10.0 `main` branch so its diff contains the complete feature.
2. Restore the public models, exports, receiver methods, session receiver methods, and management request implementation using the intended API above.
3. Restore focused unit and live tests, including response validation, cancellation, timeout, session, cutoff-time, and per-tier batch-size coverage.
4. Restore the development and versioned beta samples and their README entries.
5. Add a new changelog entry for the release that makes the feature stable.
6. Regenerate the API report and verify the APIView shows the positional count and result objects.
7. Complete Stable/GA APIView approval before including the feature in a stable package.

# Migrating from `@azure/abort-controller` v1 to v2

In `@azure/abort-controller` v2, our polyfill implementation for `AbortSignal` and `AbortController` has been removed as they are now supported across our minimum required run-time environments.

If `AbortController` and `AbortSignal` are the only things imported from `@azure/abort-controller` v1, then the dependency can be removed now.

If other APIs are used, upgrade the version to v2, for example:

```diff
   "dependencies": {
-    "@azure/abort-controller": "^1.0.0",
+    "@azure/abort-controller": "^2.0.0",
```

## Migration examples

The following two examples shows that import of `AbortController` from `@azure/abort-controller` should be removed

```diff
-import { AbortController } from "@azure/abort-controller";
```

```diff
-import { AbortController, AbortSignalLike } from "@azure/abort-controller";
+import { AbortSignalLike } from "@azure/abort-controller";
```

The following example shows how to migrate the `AbortController.timeout()` call by replacing it with `AbortSignal.timeout()` call

```diff
         serviceBusAtomManagementClient.getNamespaceProperties({
-          abortSignal: AbortController.timeout(1),
+          abortSignal: AbortSignal.timeout(1),
         }),

```

The `AbortController` constructor that takes an array of `AbortSignal`s is gone. Some simple usage may be replaced with abort signal listener.

```diff
         const aborter = new AbortController();
-        const { signal } = new AbortController([
-          aborter.signal,
-          ...(abortSignal ? [abortSignal] : []),
-        ]);
+
+        const abortListener = () => {
+          aborter.abort();
+        };
+        abortSignal?.addEventListener("abort", abortListener);
 
         if (!this.isOpen()) {
           await Promise.race([
-            this._init(signal),
+            this._init(aborter.signal),
             delay(retryTimeoutInMs, { abortSignal: aborter.signal }).then(() => {
               throw {
                 name: "OperationTimeoutError",
                 message: "The management request timed out. Please try again later.",
               };
             }),
-          ]).finally(() => aborter.abort());
+          ]).finally(() => {
+            aborter.abort();
+            abortSignal?.removeEventListener("abort", abortListener);
+          });
         }
```

On NodeJS v20+ or latest browsers, use `AbortSignal.any` instead:

```diff
         const aborter = new AbortController();
-        const { signal } = new AbortController([
-          aborter.signal,
-          ...(abortSignal ? [abortSignal] : []),
-        ]);
+        const signal = AbortSignal.any([
+          aborter.signal,
+          ...(abortSignal ? [abortSignal] : []),
+       ]);

         if (!this.isOpen()) {
           await Promise.race([
-            this._init(signal),
+            this._init(signal),
             delay(retryTimeoutInMs, { abortSignal: aborter.signal }).then(() => {
               throw {
                 name: "OperationTimeoutError",
                 message: "The management request timed out. Please try again later.",
               };
             }),
           ]).finally(() => aborter.abort());
         }
```

Static property `AbortSignal.none` is gone. Use a `AbortController`'s `signal` property instead. You should not call its `abort()` method.

```diff
-    const options = { abortSignal: AbortSignal.none };
+    const aborter = new AbortController();
+    const options = { abortSignal: aborter.signal };
```

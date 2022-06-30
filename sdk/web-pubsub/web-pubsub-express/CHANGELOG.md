# Release History

## 1.0.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.3 (2022-06-15)

### Bugs Fixed
- Fix issue https://github.com/Azure/azure-sdk-for-js/issues/22134 that hub name should be case insensitive

## 1.0.2 (2022-01-30)

### Bugs Fixed

- Fix the issue that `UserEventRequest` failed to process request with content-type `application/octet-stream` correctly into `dataType` `binary`

### Other Changes

- Remove `cloudevents` package dependency

## 1.0.1 (2022-01-11)

### Bugs Fixed

- Fix the `data` definition for `UserEventRequest` when `dataType` is `json`. When `dataType` is `json`, `data` is the JSON parsed result from request body, so the type of `data` depends on the user scenario.
- Fix the CloudEvents parsing issue that now `data` also can be `boolean` or `number`.

## 1.0.0 (2021-11-11)

No changes.

## 1.0.0-beta.4 (2021-11-09)

### Breaking Changes

- Move `allowedEndpoints` settings into `WebPubSubEventHandlerOptions`. If not set, the default behavior is allowing all the incoming endpoints.

  ```js
  const handler = new WebPubSubEventHandler("chat", {
    handleConnect(req, res) {
      // You can set the state for the connection, it lasts throughout the lifetime of the connection
      res.setState("calledTime", 1);
      res.success();
    },
    handleUserEvent(req, res) {
      var calledTime = req.context.states.calledTime++;
      console.log(calledTime);
      // You can also set the state here
      res.setState("calledTime", calledTime);
      res.success();
    },
    allowedEndpoints: ["https://xxx.webpubsub.azure.com"]
  });
  ```

- Remove `dumpRequest` flag and leverage @azure/logger instead.

## 1.0.0-beta.3 (2021-07-30)

- Support reading and setting connection states, sample usage:
  ```js
  const handler = new WebPubSubEventHandler("chat", ["https://xxx.webpubsub.azure.com"], {
    handleConnect(req, res) {
      // You can set the state for the connection, it lasts throughout the lifetime of the connection
      res.setState("calledTime", 1);
      res.success();
    },
    handleUserEvent(req, res) {
      var calledTime = req.context.states.calledTime++;
      console.log(calledTime);
      // You can also set the state here
      res.setState("calledTime", calledTime);
      res.success();
    }
  });
  ```

## 1.0.0-beta.2 (2021-07-20)

- Removed unnecessary dependencies.

## 1.0.0-beta.1 (2021-04-23)

This is the first release of the @azure/web-pubsub-express package.

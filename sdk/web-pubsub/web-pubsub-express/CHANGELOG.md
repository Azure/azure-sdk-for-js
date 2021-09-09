# Release History

## 1.0.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

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

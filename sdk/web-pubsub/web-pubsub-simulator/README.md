# Azure Web PubSub Simulator

This project simulates the Azure Web PubSub service to facilitate client testing. It provides a WebSocket server that can handle secure and insecure connections, allowing developers to test their applications without needing access to the actual Azure service.

## Sample Usage

Below is an example of how to start the Web PubSub simulator server:

```typescript
import { startWebPubSubServer } from "@azure-tools/web-pubsub-simulator";

async function run() {
  const server = await startWebPubSubServer({ port: 8443 });
  console.log(`Server is running:
    - WebSocket client URL: ${server.webPubSubClientUrl}
    - HTTPS URL: ${server.httpsUrl}
  `);

  // When you're ready to shutdown:
  // server.close();
}

run().catch((err) => {
  console.error("Error starting Web PubSub Simulator:", err);
});
```


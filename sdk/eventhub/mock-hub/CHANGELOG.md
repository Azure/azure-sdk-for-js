
## 2.0.0 (2024-02-14)

Marks the first release of mock-hub utility library. This package exposes a mock Event Hubs service for use in testing, based on the "rhea" library. Please note that this package is intended for testing purposes only and should not be used in production environments.

The mock service currently represents a single Event Hub within a namespace.

### Features
- **Event Receiving and Storing**: The service can receive and store events from a client.
- **Event Partition Assignment**: Supports partition assignment based on partition id, partition key, or round robin.
- **Event Sending**: Capable of sending events to a client while respecting link credits, starting event position (source filter), and tracking last enqueued event properties.
- **Multiple Consumer Groups**: Supports multiple consumer groups.
- **Event Hub Properties**: Can read Event Hub properties and Event Hub partition properties.
- **Validation/Errors**: Includes validation and error handling for various scenarios such as invalid partition id, CBS auth requested for invalid entity, exceeded message size, owner level validation, invalid consumer group, and invalid Event Hub name.
- **TLS Support**: The service supports TLS.

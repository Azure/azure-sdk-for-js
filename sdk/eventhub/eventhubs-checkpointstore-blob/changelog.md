### 2019-09-10 1.0.0-preview.1

Version 1.0.0-preview.1 is a preview of our efforts in creating a client library that is developer-friendly, idiomatic
to the JS world, and as consistent across different languages and platforms as possible. The principles that guide
our efforts can be found in the [Azure SDK Design Guidelines for Typescript](https://azure.github.io/azure-sdk/typescript_introduction.html).

### Features

- Receive messages from all partitions of an Azure Event Hub using `EventProcessor`.
- Provide an instance of `BlobPartitionManager` to your Event Processor. `BlobPartitionManager` uses Storage Blobs to
  store checkpoints and balance partition load among all instances of Event Processors.
- Store checkpoint and partition ownership details in [Azure Storage Blobs](https://azure.microsoft.com/en-us/services/storage/blobs/).

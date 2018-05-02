## 2018-05-02 0.1.0
- First version of `azure-event-processor-host` based on the new `azure-event-hubs` sdk.
- This client library makes it easier to manage receivers for an EventHub.
- You can checkpoint the received data to an Azure Storage Blob. The processor does checkpointing
on your behalf at regular intervals. This makes it easy to start receiving events from the point you
left at a later time.
# Release History

## 1.0.0-beta.1 (Unreleased)

### Features Added
This is the initial azure-rest version of job router sdk,
the previous sdk is under a different package named @azure/communication-job-router

### Breaking Changes

Here are changes compare to previous sdk which is @azure/communication-job-router 1.0.0-beta.1

#### Operation Changes
- All List ops changed to return `TEntity` rather than `TEntityItem`

#### Contract Changes

##### DistributionPolicy
- Add `Etag`

##### RouterQueue
- Add `Etag`

##### ClassificationPolicy
- Rename property `QueueSelectors` -> `QueueSelectorAttachments`
- Rename property `WorkerSelectors` -> `WorkerSelectorAttachments`
- Add `Etag`

##### ExceptionPolicy
- `ExceptionRules` - Changed `Dictionary<string, ExceptionRule>` -> `ICollection<ExceptionRule>`
- Add `Etag`

###### ExceptionRule
- `Actions` - Changed `Dictionary<string, ExceptionAction>` -> `ICollection<ExceptionAction>`
- Add `Id`

##### ExceptionAction
- Add `Id`. Property is made read-only. if ID exists in payload, just use it directly, if it doesn't exist, generate one

##### RouterJob
- Changed `Notes` - `SortedDictionary<DateTimeOffset, string>` -> `ICollection<RouterJobNote>`. `RouterJobNote` is a simple wrapper equivalent of `KeyValuePair<DateTimeOffset, string>`
- Add `Etag`

##### RouterWorker
- Rename property `QueueAssignments` -> `Queues`
- `Queues` - Changed `Dictionary<string, RouterQueueAssignment>` -> `ICollection<string>`
- Rename property `TotalCapacity` -> `Capacity`
- Rename property `ChannelConfigurations` -> `Channels`
- `Channels` - Changed `Dictionary<string, ChannelConfiguration>` -> `ICollection<RouterChannel>`
- Add `Etag`

##### RouterChannel
- Add `ChannelId`

##### ScoringRuleOptions
- Rename property `AllowScoringBatchOfWorkers` -> `IsBatchScoringEnabled`

##### Renames
- `ChannelConfiguration` -> `RouterChannel`
- `CancelJobRequest` -> `CancelJobOptions`
- `CloseJobRequest` -> `CloseJobOptions`
- `CompleteJobRequest` -> `CompleteJobOptions`
- `DeclineJobOfferRequest` -> `DeclineJobOfferOptions`
- `ReclassifyJobRequest` -> `ReclassifyJobOptions`
- `UnassignJobRequest` -> `UnassignJobOptions`
- `Oauth2ClientCredential` -> `OAuth2WebhookClientCredential`

##### Addition
- `RouterJobNote`

##### Deletions
- `ClassificationPolicyItem`
- `DistributionPolicyItem`
- `ExceptionPolicyItem`
- `RouterQueueItem`
- `RouterWorkerItem`
- `RouterJobItem`
- `RouterQueueAssignment`

### Bugs Fixed

### Other Changes

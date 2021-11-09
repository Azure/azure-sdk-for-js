let nock = require('nock');

module.exports.hash = "6834378f81e4dc598a5ef0666cc4be8f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureCosmosDB","dataFeedName":"js-test-cosmosFeed-163636432991203498","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","database":"sample","collectionId":"sample"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/c91ea6b5-ddd0-4e49-b386-d3882ceb3ebb',
  'x-request-id',
  '08f935ae-e5ce-4c44-aa0f-8807f36cd09f',
  'x-envoy-upstream-service-time',
  '501',
  'apim-request-id',
  '08f935ae-e5ce-4c44-aa0f-8807f36cd09f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/c91ea6b5-ddd0-4e49-b386-d3882ceb3ebb')
  .reply(200, {"dataFeedId":"c91ea6b5-ddd0-4e49-b386-d3882ceb3ebb","dataFeedName":"js-test-cosmosFeed-163636432991203498","metrics":[{"metricId":"a0b5437a-8d2e-4fd1-8323-b012b68dcae9","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"8fd2ec4a-51ae-4158-892e-b5760f84c6b4","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureCosmosDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T09:38:55Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"sample","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","collectionId":"sample"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1315',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ea0a775a-2e04-432a-85d9-428870b7dea3',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  'ea0a775a-2e04-432a-85d9-428870b7dea3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:55 GMT'
]);

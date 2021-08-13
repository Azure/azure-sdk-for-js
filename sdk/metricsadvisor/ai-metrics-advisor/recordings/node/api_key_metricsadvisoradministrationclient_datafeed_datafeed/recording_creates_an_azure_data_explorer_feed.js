let nock = require('nock');

module.exports.hash = "d40a632bfefe5944264fcbd33c7c3698";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataExplorer","dataFeedName":"js-test-dataExplorerFeed-162267904090102583","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"ManagedIdentity","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","query":"let starttime=datetime(@StartTime); let endtime=starttime"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/5d2bddd0-0c56-434b-8d1b-fb7b33ae24c7',
  'x-request-id',
  'de31554c-cd6c-47e4-a245-3ae9a641d87d',
  'x-envoy-upstream-service-time',
  '779',
  'apim-request-id',
  'de31554c-cd6c-47e4-a245-3ae9a641d87d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5d2bddd0-0c56-434b-8d1b-fb7b33ae24c7')
  .reply(200, {"dataFeedId":"5d2bddd0-0c56-434b-8d1b-fb7b33ae24c7","dataFeedName":"js-test-dataExplorerFeed-162267904090102583","metrics":[{"metricId":"1fea50fa-c356-48b8-a4ce-c0bfcfa60a0c","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"8de18cc3-4ffb-43f2-87e3-3e31b629b476","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataExplorer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-03T00:11:00Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"let starttime=datetime(@StartTime); let endtime=starttime"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8c656e1a-e536-4c82-b6a2-ed80881fffec',
  'x-envoy-upstream-service-time',
  '166',
  'apim-request-id',
  '8c656e1a-e536-4c82-b6a2-ed80881fffec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:00 GMT'
]);

let nock = require('nock');

module.exports.hash = "39a392903a280c07866950c3b38134b7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataExplorer","dataFeedName":"js-test-dataExplorerFeed-163634432099806912","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"ManagedIdentity","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","query":"let starttime=datetime(@StartTime); let endtime=starttime"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/6e6eb136-9bbe-4c2b-9e42-4cb217d4cfef',
  'x-request-id',
  'a3d2bbac-f921-440e-9661-ddd0e66c9128',
  'x-envoy-upstream-service-time',
  '656',
  'apim-request-id',
  'a3d2bbac-f921-440e-9661-ddd0e66c9128',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6e6eb136-9bbe-4c2b-9e42-4cb217d4cfef')
  .reply(200, {"dataFeedId":"6e6eb136-9bbe-4c2b-9e42-4cb217d4cfef","dataFeedName":"js-test-dataExplorerFeed-163634432099806912","metrics":[{"metricId":"e0b1c036-d61f-4f8d-8f19-5c3211aa8fc6","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"88a2ab84-1e1c-4e52-9762-2312136c20b6","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataExplorer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:28Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"let starttime=datetime(@StartTime); let endtime=starttime"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b2eb2b35-b2f2-45bf-aed1-bdcd3608ee96',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  'b2eb2b35-b2f2-45bf-aed1-bdcd3608ee96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:28 GMT'
]);

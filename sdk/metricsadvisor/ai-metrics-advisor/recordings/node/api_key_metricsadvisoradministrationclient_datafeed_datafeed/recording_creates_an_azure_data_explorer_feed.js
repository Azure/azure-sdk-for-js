let nock = require('nock');

module.exports.hash = "39a392903a280c07866950c3b38134b7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataExplorer","dataFeedName":"js-test-dataExplorerFeed-163978429259805188","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"ManagedIdentity","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","query":"let starttime=datetime(@StartTime); let endtime=starttime"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/833272d3-42f5-4dc5-87e3-fec1b4b2c857',
  'x-request-id',
  '47d3872d-0b61-4273-98fb-84c7056f2121',
  'x-envoy-upstream-service-time',
  '516',
  'apim-request-id',
  '47d3872d-0b61-4273-98fb-84c7056f2121',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/833272d3-42f5-4dc5-87e3-fec1b4b2c857')
  .reply(200, {"dataFeedId":"833272d3-42f5-4dc5-87e3-fec1b4b2c857","dataFeedName":"js-test-dataExplorerFeed-163978429259805188","metrics":[{"metricId":"4c128d55-db85-418c-a7cc-df3cf9c5b6ea","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"320211af-8a38-4579-a93f-d211f746333a","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataExplorer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:20Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"let starttime=datetime(@StartTime); let endtime=starttime"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e90ecac3-0011-4ffd-bd1f-44fb575932ba',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  'e90ecac3-0011-4ffd-bd1f-44fb575932ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:20 GMT'
]);

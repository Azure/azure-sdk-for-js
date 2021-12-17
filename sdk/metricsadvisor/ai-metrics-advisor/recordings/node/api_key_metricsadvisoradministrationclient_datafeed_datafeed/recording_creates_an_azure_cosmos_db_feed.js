let nock = require('nock');

module.exports.hash = "6834378f81e4dc598a5ef0666cc4be8f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureCosmosDB","dataFeedName":"js-test-cosmosFeed-163978429259800502","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","database":"sample","collectionId":"sample"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/4b1094cb-c65d-4f1e-ba2f-e2455f9222d1',
  'x-request-id',
  '2b4ec04f-c6b0-4915-85fa-3d71feb9a228',
  'x-envoy-upstream-service-time',
  '536',
  'apim-request-id',
  '2b4ec04f-c6b0-4915-85fa-3d71feb9a228',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/4b1094cb-c65d-4f1e-ba2f-e2455f9222d1')
  .reply(200, {"dataFeedId":"4b1094cb-c65d-4f1e-ba2f-e2455f9222d1","dataFeedName":"js-test-cosmosFeed-163978429259800502","metrics":[{"metricId":"9255948e-f6ec-405a-953d-01e714e36c08","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"b3c624d5-f2fd-47b6-87cc-bde22d5eeda6","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureCosmosDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-12-17T23:38:19Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"sample","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","collectionId":"sample"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1315',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b59df831-4668-4525-9148-5afb0d72092b',
  'x-envoy-upstream-service-time',
  '198',
  'apim-request-id',
  'b59df831-4668-4525-9148-5afb0d72092b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:18 GMT'
]);

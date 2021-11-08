let nock = require('nock');

module.exports.hash = "6834378f81e4dc598a5ef0666cc4be8f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureCosmosDB","dataFeedName":"js-test-cosmosFeed-163634432099804715","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"Basic","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","database":"sample","collectionId":"sample"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/91b4e6ee-bc42-462a-b64c-f11672cbc5e3',
  'x-request-id',
  'a39a9124-add2-476e-bcee-3733228fbd4c',
  'x-envoy-upstream-service-time',
  '745',
  'apim-request-id',
  'a39a9124-add2-476e-bcee-3733228fbd4c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/91b4e6ee-bc42-462a-b64c-f11672cbc5e3')
  .reply(200, {"dataFeedId":"91b4e6ee-bc42-462a-b64c-f11672cbc5e3","dataFeedName":"js-test-cosmosFeed-163634432099804715","metrics":[{"metricId":"331016a9-26ec-4564-bbaa-56c8dffbb7ea","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"3d2e9f8c-28d2-4837-991b-d2c8100f446d","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureCosmosDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-11-08T04:05:27Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"database":"sample","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","collectionId":"sample"},"authenticationType":"Basic"}, [
  'Content-Length',
  '1315',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cf528b96-918a-4d72-924d-37a7e34a01fd',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  'cf528b96-918a-4d72-924d-37a7e34a01fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:27 GMT'
]);

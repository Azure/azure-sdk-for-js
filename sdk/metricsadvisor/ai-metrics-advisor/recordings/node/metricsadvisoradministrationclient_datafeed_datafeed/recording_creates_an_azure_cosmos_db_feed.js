let nock = require('nock');

module.exports.hash = "749a76003b022af447ffcbfbbf328384";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureCosmosDB","dataFeedName":"js-test-cosmosFeed-160522265192809210","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","database":"sample","collectionId":"sample"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/f28d592f-baae-4d8f-ac7c-eabfb85d57ea',
  'x-request-id',
  '9d71dd9a-2eb9-43c6-a574-ac697fd79488',
  'x-envoy-upstream-service-time',
  '601',
  'apim-request-id',
  '9d71dd9a-2eb9-43c6-a574-ac697fd79488',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f28d592f-baae-4d8f-ac7c-eabfb85d57ea')
  .reply(200, {"dataFeedId":"f28d592f-baae-4d8f-ac7c-eabfb85d57ea","dataFeedName":"js-test-cosmosFeed-160522265192809210","metrics":[{"metricId":"ffc00d82-9371-42de-a973-83baeeee6264","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"a35c61d6-e9ae-4c91-8cb6-3e2ceeb41729","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureCosmosDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-12T23:11:02Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","database":"sample","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","collectionId":"sample"}}, [
  'Content-Length',
  '1405',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e9c44e4f-6555-4021-9bff-e3864047fcc3',
  'x-envoy-upstream-service-time',
  '504',
  'apim-request-id',
  'e9c44e4f-6555-4021-9bff-e3864047fcc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:02 GMT'
]);

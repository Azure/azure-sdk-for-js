let nock = require('nock');

module.exports.hash = "76d2ee155f56b2829daa0e273b0c9142";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureTable","dataFeedName":"js-test-tableFeed-160522265192804776","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://table.example.net","table":"table-name","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/761b2c29-131b-4b1a-8c39-6c9f3c80fbc2',
  'x-request-id',
  '2bfc4c92-d252-4dd5-b2e2-deaf4de651a6',
  'x-envoy-upstream-service-time',
  '421',
  'apim-request-id',
  '2bfc4c92-d252-4dd5-b2e2-deaf4de651a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/761b2c29-131b-4b1a-8c39-6c9f3c80fbc2')
  .reply(200, {"dataFeedId":"761b2c29-131b-4b1a-8c39-6c9f3c80fbc2","dataFeedName":"js-test-tableFeed-160522265192804776","metrics":[{"metricId":"67f43330-aac1-42c9-9bab-ea183177a496","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"5a66439f-7728-4b7c-90df-1d250b599371","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureTable","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-12T23:11:06Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://table.example.net","query":"partition-key eq @start-time","table":"table-name"}}, [
  'Content-Length',
  '1332',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6a07fe7b-8217-432b-9db8-aa225601f724',
  'x-envoy-upstream-service-time',
  '273',
  'apim-request-id',
  '6a07fe7b-8217-432b-9db8-aa225601f724',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:06 GMT'
]);

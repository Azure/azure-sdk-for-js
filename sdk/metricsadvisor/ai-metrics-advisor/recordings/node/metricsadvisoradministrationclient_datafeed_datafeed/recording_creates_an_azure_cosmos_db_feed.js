let nock = require('nock');

module.exports.hash = "a8710b5da20f47e300e40bc429789016";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureCosmosDB","dataFeedName":"js-test-cosmosFeed-160072575346106475","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","database":"sample","collectionId":"sample"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/d32b4a7c-b8f4-4868-9a07-5e885d5840d5',
  'x-request-id',
  '300ca7c6-be19-42ed-83c6-a8bc068a7c22',
  'x-envoy-upstream-service-time',
  '355',
  'apim-request-id',
  '300ca7c6-be19-42ed-83c6-a8bc068a7c22',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d32b4a7c-b8f4-4868-9a07-5e885d5840d5')
  .reply(200, {"dataFeedId":"d32b4a7c-b8f4-4868-9a07-5e885d5840d5","dataFeedName":"js-test-cosmosFeed-160072575346106475","metrics":[{"metricId":"d6519a2f-03fc-45ed-b71c-7e9cc788f295","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"4e325640-bcc5-4f82-a269-7a3b60b2ff1b","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureCosmosDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-09-21T22:02:44Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","database":"sample","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","collectionId":"sample"}}, [
  'Content-Length',
  '1382',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4aa5a030-fc70-4cc7-9403-66991aabadf5',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  '4aa5a030-fc70-4cc7-9403-66991aabadf5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:44 GMT'
]);

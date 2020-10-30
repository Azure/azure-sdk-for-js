let nock = require('nock');

module.exports.hash = "8e192e9a667684a11ebab4e304b0c5e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureTable","dataFeedName":"js-test-tableFeed-160323420510607307","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"https://table.example.net","table":"table-name","query":"partition-key eq @start-time"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/76ee9de9-32a7-4abc-a00a-641d29cb4266',
  'x-request-id',
  'bdeba3f6-893f-414a-95ba-04cf0c47419c',
  'x-envoy-upstream-service-time',
  '287',
  'apim-request-id',
  'bdeba3f6-893f-414a-95ba-04cf0c47419c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:43 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/76ee9de9-32a7-4abc-a00a-641d29cb4266')
  .reply(200, {"dataFeedId":"76ee9de9-32a7-4abc-a00a-641d29cb4266","dataFeedName":"js-test-tableFeed-160323420510607307","metrics":[{"metricId":"68f52a5c-657b-416d-8e71-647f8a450529","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"09a00750-90a5-4bdd-89a5-ebd03049b997","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureTable","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-10-20T22:50:44Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"https://table.example.net","query":"partition-key eq @start-time","table":"table-name"}}, [
  'Content-Length',
  '1330',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8d354ee9-4dce-46ad-996d-2874ae885a69',
  'x-envoy-upstream-service-time',
  '125',
  'apim-request-id',
  '8d354ee9-4dce-46ad-996d-2874ae885a69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:44 GMT',
  'Connection',
  'close'
]);

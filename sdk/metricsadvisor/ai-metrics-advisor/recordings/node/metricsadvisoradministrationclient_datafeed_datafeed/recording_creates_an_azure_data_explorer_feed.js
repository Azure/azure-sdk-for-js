let nock = require('nock');

module.exports.hash = "6712f7d0f0ba5a9efb288389ce3a37aa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataExplorer","dataFeedName":"js-test-dataExplorerFeed-160323420510600056","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","query":"let starttime=datetime(@StartTime); let endtime=starttime"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/0a41beaa-e836-4228-bd5f-95450fd8fdba',
  'x-request-id',
  'ead3a43d-2720-4e78-9304-4cfdf3cd4b70',
  'x-envoy-upstream-service-time',
  '303',
  'apim-request-id',
  'ead3a43d-2720-4e78-9304-4cfdf3cd4b70',
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
  .get('/metricsadvisor/v1.0/dataFeeds/0a41beaa-e836-4228-bd5f-95450fd8fdba')
  .reply(200, {"dataFeedId":"0a41beaa-e836-4228-bd5f-95450fd8fdba","dataFeedName":"js-test-dataExplorerFeed-160323420510600056","metrics":[{"metricId":"402267c5-0490-4104-ad93-3cab25b259b8","metricName":"Metric1","metricDisplayName":"Metric1","metricDescription":""},{"metricId":"18573658-2fe9-45eb-9ca8-10a11d9d9a85","metricName":"Metric2","metricDisplayName":"Metric2","metricDescription":""}],"dimension":[{"dimensionName":"Dim1","dimensionDisplayName":"Dim1 display"},{"dimensionName":"Dim2","dimensionDisplayName":"Dim2 display"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataExplorer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["yumeng@microsoft.com"],"viewers":[],"creator":"yumeng@microsoft.com","status":"Active","createdTime":"2020-10-20T22:50:43Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","query":"let starttime=datetime(@StartTime); let endtime=starttime"}}, [
  'Content-Length',
  '1366',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '482a51c9-3425-4264-b78a-1b9ccef2e0c6',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '482a51c9-3425-4264-b78a-1b9ccef2e0c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:42 GMT',
  'Connection',
  'close'
]);

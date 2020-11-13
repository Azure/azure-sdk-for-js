let nock = require('nock');

module.exports.hash = "749a76003b022af447ffcbfbbf328384";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureCosmosDB","dataFeedName":"js-test-cosmosFeed-160529679231909384","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","database":"sample","collectionId":"sample"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/7c4f3a7a-80f2-438f-9469-9425e1a247f8',
  'x-request-id',
  '74584922-7963-4bca-a476-60e7d2616149',
  'x-envoy-upstream-service-time',
  '571',
  'apim-request-id',
  '74584922-7963-4bca-a476-60e7d2616149',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7c4f3a7a-80f2-438f-9469-9425e1a247f8')
  .reply(200, {"dataFeedId":"7c4f3a7a-80f2-438f-9469-9425e1a247f8","dataFeedName":"js-test-cosmosFeed-160529679231909384","metrics":[{"metricId":"969d5784-2519-4e17-859c-15e713d3d386","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"e4893e02-7208-4ee5-884a-787d3b7bf8a6","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureCosmosDB","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","granularityAmount":null,"allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","rollUpColumns":[],"dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2020-11-13T19:46:38Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","database":"sample","sqlQuery":"let starttime=datetime(@StartTime); let endtime=starttime","collectionId":"sample"}}, [
  'Content-Length',
  '1391',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '11dcc1cc-ec17-4391-a104-d7af42363caf',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  '11dcc1cc-ec17-4391-a104-d7af42363caf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:39 GMT'
]);

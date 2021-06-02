let nock = require('nock');

module.exports.hash = "d40a632bfefe5944264fcbd33c7c3698";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds', {"dataSourceType":"AzureDataExplorer","dataFeedName":"js-test-dataExplorerFeed-162260297550806768","dataFeedDescription":"Data feed description","granularityName":"Daily","metrics":[{"metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00.000Z","startOffsetInSeconds":0,"maxConcurrency":-1,"minRetryIntervalInSeconds":-1,"stopRetryAfterInSeconds":-1,"needRollup":"NeedRollup","rollUpMethod":"Sum","allUpIdentification":"__CUSTOM_SUM__","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"viewMode":"Private","authenticationType":"ManagedIdentity","dataSourceParameter":{"connectionString":"Server=server.example.net;Encrypt=True;","query":"let starttime=datetime(@StartTime); let endtime=starttime"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/dataFeeds/ed591867-5252-4ece-9bf4-3a0f7f32c342',
  'x-request-id',
  '017abfe7-3a92-42e3-a1a9-fdcecc2b46e4',
  'x-envoy-upstream-service-time',
  '484',
  'apim-request-id',
  '017abfe7-3a92-42e3-a1a9-fdcecc2b46e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/ed591867-5252-4ece-9bf4-3a0f7f32c342')
  .reply(200, {"dataFeedId":"ed591867-5252-4ece-9bf4-3a0f7f32c342","dataFeedName":"js-test-dataExplorerFeed-162260297550806768","metrics":[{"metricId":"600d5345-427f-4760-9f7d-a92e7a2abdc7","metricName":"cost","metricDisplayName":"cost","metricDescription":""},{"metricId":"e64f5ba6-1767-420f-a18a-ee1d2dcd21dc","metricName":"revenue","metricDisplayName":"revenue","metricDescription":""}],"dimension":[{"dimensionName":"category","dimensionDisplayName":"category"},{"dimensionName":"city","dimensionDisplayName":"city"}],"dataStartFrom":"2020-08-21T00:00:00Z","dataSourceType":"AzureDataExplorer","timestampColumn":"","startOffsetInSeconds":0,"maxQueryPerMinute":30,"granularityName":"Daily","allUpIdentification":"__CUSTOM_SUM__","needRollup":"NeedRollup","fillMissingPointType":"CustomValue","fillMissingPointValue":555,"rollUpMethod":"Sum","dataFeedDescription":"Data feed description","stopRetryAfterInSeconds":-1,"minRetryIntervalInSeconds":-1,"maxConcurrency":-1,"viewMode":"Private","admins":["kaghiya@microsoft.com"],"viewers":[],"creator":"kaghiya@microsoft.com","status":"Active","createdTime":"2021-06-02T03:03:19Z","isAdmin":true,"actionLinkTemplate":"","dataSourceParameter":{"query":"let starttime=datetime(@StartTime); let endtime=starttime"},"authenticationType":"ManagedIdentity"}, [
  'Content-Length',
  '1288',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ebefcee4-185e-476b-a90e-fed3ce0c5481',
  'x-envoy-upstream-service-time',
  '175',
  'apim-request-id',
  'ebefcee4-185e-476b-a90e-fed3ce0c5481',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:19 GMT'
]);

let nock = require('nock');

module.exports.hash = "242dd6aeeb630c90c9d78e6220bcb07d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://someEndpoint', {"encodedQueryParams":true})
  .patch('/routing/exceptionPolicies/exception-policy-123', {"name":"test-policy","exceptionRules":{"MaxWaitTimeExceeded":{"trigger":{"kind":"wait-time","thresholdSeconds":5},"actions":{"MoveJobToEscalatedQueue":{"kind":"reclassify","classificationPolicyId":"Main","labelsToUpsert":{"escalated":true}}}}}})
  .query(true)
  .reply(200, {"id":"exception-policy-123","name":"test-policy","exceptionRules":{"MaxWaitTimeExceeded":{"trigger":{"kind":"wait-time","thresholdSeconds":5},"actions":{"MoveJobToEscalatedQueue":{"kind":"reclassify","classificationPolicyId":"Main","labelsToUpsert":{"escalated":true}}}}}}, [
  'Date',
  'Thu, 04 Aug 2022 22:32:01 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Last-Modified',
  'Thu, 04 Aug 2022 19:46:49 GMT',
  'ETag',
  '"8400f8c5-0000-0700-0000-62ec22290000"',
  'Request-Context',
  'appId=',
  'trace-id',
  'a8c201a3d79165d7b4e39176dac0ce5b',
  'api-supported-versions',
  '2021-04-07-preview1, 2021-10-20-preview2, 2022-07-18-preview',
  'x-azure-ref',
  '20220804T223200Z-tur6dybg817yr054hm9efewep800000001eg00000001pxtr',
  'X-Cache',
  'CONFIG_NOCACHE'
]);

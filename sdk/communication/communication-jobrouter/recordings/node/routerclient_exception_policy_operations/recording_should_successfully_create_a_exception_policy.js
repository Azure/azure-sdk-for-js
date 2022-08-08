let nock = require('nock');

module.exports.hash = "242dd6aeeb630c90c9d78e6220bcb07d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://someEndpoint', {"encodedQueryParams":true})
  .patch('/routing/exceptionPolicies/exception-policy-123', {"name":"test-policy","exceptionRules":{"MaxWaitTimeExceeded":{"trigger":{"kind":"wait-time","thresholdSeconds":5},"actions":{"MoveJobToEscalatedQueue":{"kind":"reclassify","classificationPolicyId":"Main","labelsToUpsert":{"escalated":true}}}}}})
  .query(true)
  .reply(200, {"id":"exception-policy-123","name":"test-policy","exceptionRules":{"MaxWaitTimeExceeded":{"trigger":{"kind":"wait-time","thresholdSeconds":5},"actions":{"MoveJobToEscalatedQueue":{"kind":"reclassify","classificationPolicyId":"Main","labelsToUpsert":{"escalated":true}}}}}}, [
  'Date',
  'Mon, 08 Aug 2022 01:30:48 GMT',
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
  '28ba54f08a553d9244d8e762351be7b1',
  'api-supported-versions',
  '2021-04-07-preview1, 2021-10-20-preview2, 2022-07-18-preview',
  'x-azure-ref',
  '20220808T013041Z-afb852g2vh6591nsqudzty20xs00000004g000000000r8z1',
  'X-Cache',
  'CONFIG_NOCACHE'
]);

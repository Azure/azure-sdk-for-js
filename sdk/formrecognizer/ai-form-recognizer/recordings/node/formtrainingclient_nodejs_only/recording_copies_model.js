let nock = require('nock');

module.exports.hash = "4ec91c8a02172889bbf82f3bfbd0df30";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0/custom/models/copyAuthorization')
  .reply(201, {"modelId":"4427c94c-7eb1-4c80-8317-7e13df1ba522","accessToken":"accessToken","expirationDateTimeTicks":1596756591}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.0/custom/models/4427c94c-7eb1-4c80-8317-7e13df1ba522',
  'x-envoy-upstream-service-time',
  '27',
  'apim-request-id',
  '69b5e386-f453-4626-b464-8500bb60dca6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0/custom/models/718c523f-7326-4425-b496-acd0504c2327/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"4427c94c-7eb1-4c80-8317-7e13df1ba522","accessToken":"accessToken","expirationDateTimeTicks":1596756591}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.0/custom/models/718c523f-7326-4425-b496-acd0504c2327/copyresults/5ed3c150-8851-4938-a277-4750a36ced05',
  'x-envoy-upstream-service-time',
  '36',
  'apim-request-id',
  'bb6a396a-1f6a-42c4-8803-5f3084530a1e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/718c523f-7326-4425-b496-acd0504c2327/copyResults/5ed3c150-8851-4938-a277-4750a36ced05')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-08-05T23:29:51Z","lastUpdatedDateTime":"2020-08-05T23:29:51Z","copyResult":{"modelId":"4427c94c-7eb1-4c80-8317-7e13df1ba522"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'd750bdd8-7ff4-41fb-999c-1db90d4f2bab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/718c523f-7326-4425-b496-acd0504c2327/copyResults/5ed3c150-8851-4938-a277-4750a36ced05')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-08-05T23:29:51Z","lastUpdatedDateTime":"2020-08-05T23:29:51Z","copyResult":{"modelId":"4427c94c-7eb1-4c80-8317-7e13df1ba522"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'ad3febdb-7e91-44c0-a49f-7f435ac263a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/718c523f-7326-4425-b496-acd0504c2327/copyResults/5ed3c150-8851-4938-a277-4750a36ced05')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-08-05T23:29:52.9066304Z","lastUpdatedDateTime":"2020-08-05T23:29:52.9066306Z","copyResult":{"modelId":"4427c94c-7eb1-4c80-8317-7e13df1ba522"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  'e23e3b7d-8ac7-4bdb-9413-35893bf4840c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 05 Aug 2020 23:29:56 GMT'
]);

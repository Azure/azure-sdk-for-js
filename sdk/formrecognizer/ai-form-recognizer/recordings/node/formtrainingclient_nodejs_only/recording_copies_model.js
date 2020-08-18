let nock = require('nock');

module.exports.hash = "1f2e9f0024ff1f33954032f77ddcacb0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0/custom/models/copyAuthorization')
  .reply(201, {"modelId":"0be60588-b50e-46e2-a3ce-28e82420eadd","accessToken":"accessToken","expirationDateTimeTicks":1597862863}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://endpoint/formrecognizer/v2.0/custom/models/0be60588-b50e-46e2-a3ce-28e82420eadd',
  'x-envoy-upstream-service-time',
  '164',
  'apim-request-id',
  '21522b23-0f0d-4bff-96a0-b20d21df294a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/formrecognizer/v2.0/custom/models/4ec054a8-15f0-41bb-aa8f-051646530b13/copy', {"targetResourceId":"/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr","targetResourceRegion":"westus2","copyAuthorization":{"modelId":"0be60588-b50e-46e2-a3ce-28e82420eadd","accessToken":"accessToken","expirationDateTimeTicks":1597862863}})
  .reply(202, "", [
  'Content-Length',
  '0',
  'Operation-Location',
  'https://endpoint/formrecognizer/v2.0/custom/models/4ec054a8-15f0-41bb-aa8f-051646530b13/copyresults/3ca56a33-a75c-4aa2-be5c-52aa59435d74',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'c41e1d60-6cfc-4efd-a07e-7fca5057dcf2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/4ec054a8-15f0-41bb-aa8f-051646530b13/copyResults/3ca56a33-a75c-4aa2-be5c-52aa59435d74')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-08-18T18:47:43Z","lastUpdatedDateTime":"2020-08-18T18:47:43Z","copyResult":{"modelId":"0be60588-b50e-46e2-a3ce-28e82420eadd"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '34adf6cc-99d5-459b-9f55-33af199122d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/4ec054a8-15f0-41bb-aa8f-051646530b13/copyResults/3ca56a33-a75c-4aa2-be5c-52aa59435d74')
  .reply(200, {"status":"notStarted","createdDateTime":"2020-08-18T18:47:43Z","lastUpdatedDateTime":"2020-08-18T18:47:43Z","copyResult":{"modelId":"0be60588-b50e-46e2-a3ce-28e82420eadd"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  '001c06cb-28cc-4862-87a5-43db72109d05',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/4ec054a8-15f0-41bb-aa8f-051646530b13/copyResults/3ca56a33-a75c-4aa2-be5c-52aa59435d74')
  .reply(200, {"status":"running","createdDateTime":"2020-08-18T18:47:48.7111153Z","lastUpdatedDateTime":"2020-08-18T18:47:48.7111155Z","copyResult":{"modelId":"0be60588-b50e-46e2-a3ce-28e82420eadd"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '12',
  'apim-request-id',
  '7572e470-c593-4786-a6ed-03c7fe1b7766',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0/custom/models/4ec054a8-15f0-41bb-aa8f-051646530b13/copyResults/3ca56a33-a75c-4aa2-be5c-52aa59435d74')
  .reply(200, {"status":"succeeded","createdDateTime":"2020-08-18T18:47:48.9395348Z","lastUpdatedDateTime":"2020-08-18T18:47:48.9395352Z","copyResult":{"modelId":"0be60588-b50e-46e2-a3ce-28e82420eadd"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '17',
  'apim-request-id',
  'e37c46c5-0b94-4539-8b69-85ccedad1aac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 18 Aug 2020 18:47:53 GMT'
]);

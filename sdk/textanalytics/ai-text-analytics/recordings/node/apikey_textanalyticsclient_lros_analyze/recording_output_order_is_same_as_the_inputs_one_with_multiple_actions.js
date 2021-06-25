let nock = require('nock');

module.exports.hash = "0d0220320898553ba2b19148d77076f4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('//text/analytics/v3.1/analyze', {"analysisInput":{"documents":[{"id":"1","text":"one"},{"id":"2","text":"two"},{"id":"3","text":"three"},{"id":"4","text":"four"},{"id":"5","text":"five"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/analyze/jobs/750cd76f-0c68-4537-83c8-510dd38bec73',
  'x-envoy-upstream-service-time',
  '428',
  'apim-request-id',
  '37bc758e-ea56-4773-888d-935525982701',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/750cd76f-0c68-4537-83c8-510dd38bec73')
  .query(true)
  .reply(200, {"jobId":"750cd76f-0c68-4537-83c8-510dd38bec73","lastUpdateDateTime":"2021-06-25T19:51:09Z","createdDateTime":"2021-06-25T19:51:08Z","expirationDateTime":"2021-06-26T19:51:08Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'f400cb0b-e38d-4a76-843c-47660f284a89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/750cd76f-0c68-4537-83c8-510dd38bec73')
  .query(true)
  .reply(200, {"jobId":"750cd76f-0c68-4537-83c8-510dd38bec73","lastUpdateDateTime":"2021-06-25T19:51:09Z","createdDateTime":"2021-06-25T19:51:08Z","expirationDateTime":"2021-06-26T19:51:08Z","status":"notStarted","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '02c05a06-be71-497f-977c-2b511ae9ba02',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/750cd76f-0c68-4537-83c8-510dd38bec73')
  .query(true)
  .reply(200, {"jobId":"750cd76f-0c68-4537-83c8-510dd38bec73","lastUpdateDateTime":"2021-06-25T19:51:10Z","createdDateTime":"2021-06-25T19:51:08Z","expirationDateTime":"2021-06-26T19:51:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4998ba5e-a8fc-4579-a27a-61d77cab8b98',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:11 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/750cd76f-0c68-4537-83c8-510dd38bec73')
  .query(true)
  .reply(200, {"jobId":"750cd76f-0c68-4537-83c8-510dd38bec73","lastUpdateDateTime":"2021-06-25T19:51:10Z","createdDateTime":"2021-06-25T19:51:08Z","expirationDateTime":"2021-06-26T19:51:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '63b7d234-25da-4074-b9f0-9de5b8625d95',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/750cd76f-0c68-4537-83c8-510dd38bec73')
  .query(true)
  .reply(200, {"jobId":"750cd76f-0c68-4537-83c8-510dd38bec73","lastUpdateDateTime":"2021-06-25T19:51:10Z","createdDateTime":"2021-06-25T19:51:08Z","expirationDateTime":"2021-06-26T19:51:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'b1ddfff3-0da3-4a58-a6f5-c1d8d53f2a9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:15 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/750cd76f-0c68-4537-83c8-510dd38bec73')
  .query(true)
  .reply(200, {"jobId":"750cd76f-0c68-4537-83c8-510dd38bec73","lastUpdateDateTime":"2021-06-25T19:51:16Z","createdDateTime":"2021-06-25T19:51:08Z","expirationDateTime":"2021-06-26T19:51:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:16.7043461Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:16.0826854Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  'd2c79561-8653-4f0d-99ae-9ef3e883cd79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/750cd76f-0c68-4537-83c8-510dd38bec73')
  .query(true)
  .reply(200, {"jobId":"750cd76f-0c68-4537-83c8-510dd38bec73","lastUpdateDateTime":"2021-06-25T19:51:16Z","createdDateTime":"2021-06-25T19:51:08Z","expirationDateTime":"2021-06-26T19:51:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:16.7043461Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:16.0826854Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  '02aadba2-3b04-4ab5-a914-1b989dfc5c06',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/750cd76f-0c68-4537-83c8-510dd38bec73')
  .query(true)
  .reply(200, {"jobId":"750cd76f-0c68-4537-83c8-510dd38bec73","lastUpdateDateTime":"2021-06-25T19:51:16Z","createdDateTime":"2021-06-25T19:51:08Z","expirationDateTime":"2021-06-26T19:51:08Z","status":"running","errors":[],"displayName":"NA","tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:16.7043461Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:16.0826854Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  '6b504b3f-723e-41ef-9f27-17172a5f99a1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/750cd76f-0c68-4537-83c8-510dd38bec73')
  .query(true)
  .reply(200, {"jobId":"750cd76f-0c68-4537-83c8-510dd38bec73","lastUpdateDateTime":"2021-06-25T19:51:23Z","createdDateTime":"2021-06-25T19:51:08Z","expirationDateTime":"2021-06-26T19:51:08Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:16.7043461Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:23.8884808Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:16.0826854Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '247',
  'apim-request-id',
  'cdae66d2-a624-44af-98ec-01e66efb33b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('//text/analytics/v3.1/analyze/jobs/750cd76f-0c68-4537-83c8-510dd38bec73')
  .query(true)
  .reply(200, {"jobId":"750cd76f-0c68-4537-83c8-510dd38bec73","lastUpdateDateTime":"2021-06-25T19:51:23Z","createdDateTime":"2021-06-25T19:51:08Z","expirationDateTime":"2021-06-26T19:51:08Z","status":"succeeded","errors":[],"displayName":"NA","tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:16.7043461Z","taskName":"NamedEntityRecognition_latest","state":"succeeded","results":{"documents":[{"id":"1","entities":[{"text":"one","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"2","entities":[{"text":"two","category":"Quantity","subcategory":"Number","offset":0,"length":3,"confidenceScore":0.8}],"warnings":[]},{"id":"3","entities":[{"text":"three","category":"Quantity","subcategory":"Number","offset":0,"length":5,"confidenceScore":0.8}],"warnings":[]},{"id":"4","entities":[{"text":"four","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]},{"id":"5","entities":[{"text":"five","category":"Quantity","subcategory":"Number","offset":0,"length":4,"confidenceScore":0.8}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:23.8884808Z","taskName":"PersonallyIdentifiableInformation_latest","state":"succeeded","results":{"documents":[{"redactedText":"one","id":"1","entities":[],"warnings":[]},{"redactedText":"two","id":"2","entities":[],"warnings":[]},{"redactedText":"three","id":"3","entities":[],"warnings":[]},{"redactedText":"four","id":"4","entities":[],"warnings":[]},{"redactedText":"five","id":"5","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-06-25T19:51:16.0826854Z","taskName":"KeyPhraseExtraction_latest","state":"succeeded","results":{"documents":[{"id":"1","keyPhrases":[],"warnings":[]},{"id":"2","keyPhrases":[],"warnings":[]},{"id":"3","keyPhrases":[],"warnings":[]},{"id":"4","keyPhrases":[],"warnings":[]},{"id":"5","keyPhrases":[],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '224',
  'apim-request-id',
  'f4cd97a5-0919-47c3-b080-bf38593af20d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:51:24 GMT'
]);

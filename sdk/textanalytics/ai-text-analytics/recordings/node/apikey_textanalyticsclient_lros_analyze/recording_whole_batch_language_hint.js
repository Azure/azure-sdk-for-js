let nock = require('nock');

module.exports.hash = "d2c34eac441d97eba273055b1b130792";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/analyze', {"analysisInput":{"documents":[{"id":"0","text":"This was the best day of my life.","language":"en"},{"id":"1","text":"I did not like the hotel we stayed at. It was too expensive.","language":"en"},{"id":"2","text":"The restaurant was not as good as I hoped.","language":"en"}]},"tasks":{"entityRecognitionTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"entityRecognitionPiiTasks":[{"parameters":{"model-version":"latest","stringIndexType":"Utf16CodeUnit"}}],"keyPhraseExtractionTasks":[{"parameters":{"model-version":"latest"}}]}})
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.2/analyze/jobs/bb00cb56-1b56-445e-a5da-42ef620c43e2',
  'x-envoy-upstream-service-time',
  '363',
  'apim-request-id',
  'd4fd0988-e447-4b74-b6a8-7a830ba81e19',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/bb00cb56-1b56-445e-a5da-42ef620c43e2')
  .query(true)
  .reply(200, {"jobId":"bb00cb56-1b56-445e-a5da-42ef620c43e2","lastUpdateDateTime":"2021-10-23T00:39:20Z","createdDateTime":"2021-10-23T00:39:19Z","expirationDateTime":"2021-10-24T00:39:19Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '760223c3-f3d5-4f2d-ac18-4108163e8cd5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/bb00cb56-1b56-445e-a5da-42ef620c43e2')
  .query(true)
  .reply(200, {"jobId":"bb00cb56-1b56-445e-a5da-42ef620c43e2","lastUpdateDateTime":"2021-10-23T00:39:20Z","createdDateTime":"2021-10-23T00:39:19Z","expirationDateTime":"2021-10-24T00:39:19Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '15',
  'apim-request-id',
  '35d749ab-67ec-4217-95c4-fb79c60735ee',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/bb00cb56-1b56-445e-a5da-42ef620c43e2')
  .query(true)
  .reply(200, {"jobId":"bb00cb56-1b56-445e-a5da-42ef620c43e2","lastUpdateDateTime":"2021-10-23T00:39:20Z","createdDateTime":"2021-10-23T00:39:19Z","expirationDateTime":"2021-10-24T00:39:19Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '47',
  'apim-request-id',
  'abe813fb-7e5a-4afb-90d4-e7a38ce5389d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/bb00cb56-1b56-445e-a5da-42ef620c43e2')
  .query(true)
  .reply(200, {"jobId":"bb00cb56-1b56-445e-a5da-42ef620c43e2","lastUpdateDateTime":"2021-10-23T00:39:20Z","createdDateTime":"2021-10-23T00:39:19Z","expirationDateTime":"2021-10-24T00:39:19Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '02705f6d-be4a-4d90-98ec-0722965af344',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/bb00cb56-1b56-445e-a5da-42ef620c43e2')
  .query(true)
  .reply(200, {"jobId":"bb00cb56-1b56-445e-a5da-42ef620c43e2","lastUpdateDateTime":"2021-10-23T00:39:26Z","createdDateTime":"2021-10-23T00:39:19Z","expirationDateTime":"2021-10-24T00:39:19Z","status":"running","errors":[],"tasks":{"completed":0,"failed":0,"inProgress":3,"total":3}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'f64152f2-c843-4b8c-9dd6-094ba76e3363',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/bb00cb56-1b56-445e-a5da-42ef620c43e2')
  .query(true)
  .reply(200, {"jobId":"bb00cb56-1b56-445e-a5da-42ef620c43e2","lastUpdateDateTime":"2021-10-23T00:39:27Z","createdDateTime":"2021-10-23T00:39:19Z","expirationDateTime":"2021-10-24T00:39:19Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.9549324Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.5885573Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  'e599aef8-404e-411a-9c92-a74602dcce14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/bb00cb56-1b56-445e-a5da-42ef620c43e2')
  .query(true)
  .reply(200, {"jobId":"bb00cb56-1b56-445e-a5da-42ef620c43e2","lastUpdateDateTime":"2021-10-23T00:39:27Z","createdDateTime":"2021-10-23T00:39:19Z","expirationDateTime":"2021-10-24T00:39:19Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.9549324Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.5885573Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '184',
  'apim-request-id',
  '23eaa42e-766e-41a3-842e-f7cf4484d960',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/bb00cb56-1b56-445e-a5da-42ef620c43e2')
  .query(true)
  .reply(200, {"jobId":"bb00cb56-1b56-445e-a5da-42ef620c43e2","lastUpdateDateTime":"2021-10-23T00:39:27Z","createdDateTime":"2021-10-23T00:39:19Z","expirationDateTime":"2021-10-24T00:39:19Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.9549324Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.5885573Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  'a30e662b-5e9f-4752-b1b6-3d77e2ec7d86',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/bb00cb56-1b56-445e-a5da-42ef620c43e2')
  .query(true)
  .reply(200, {"jobId":"bb00cb56-1b56-445e-a5da-42ef620c43e2","lastUpdateDateTime":"2021-10-23T00:39:27Z","createdDateTime":"2021-10-23T00:39:19Z","expirationDateTime":"2021-10-24T00:39:19Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.9549324Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.5885573Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  '81419da7-25fa-4eaf-a129-a61d12604bc2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:35 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/bb00cb56-1b56-445e-a5da-42ef620c43e2')
  .query(true)
  .reply(200, {"jobId":"bb00cb56-1b56-445e-a5da-42ef620c43e2","lastUpdateDateTime":"2021-10-23T00:39:27Z","createdDateTime":"2021-10-23T00:39:19Z","expirationDateTime":"2021-10-24T00:39:19Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.9549324Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.5885573Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  '5b98bf26-1a57-4e01-b81a-5d54e4e72a92',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:37 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/bb00cb56-1b56-445e-a5da-42ef620c43e2')
  .query(true)
  .reply(200, {"jobId":"bb00cb56-1b56-445e-a5da-42ef620c43e2","lastUpdateDateTime":"2021-10-23T00:39:27Z","createdDateTime":"2021-10-23T00:39:19Z","expirationDateTime":"2021-10-24T00:39:19Z","status":"running","errors":[],"tasks":{"completed":2,"failed":0,"inProgress":1,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.9549324Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.5885573Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  'ac6ab48c-ffc1-43e3-ae5e-35bf6c12828e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/bb00cb56-1b56-445e-a5da-42ef620c43e2')
  .query(true)
  .reply(200, {"jobId":"bb00cb56-1b56-445e-a5da-42ef620c43e2","lastUpdateDateTime":"2021-10-23T00:39:40Z","createdDateTime":"2021-10-23T00:39:19Z","expirationDateTime":"2021-10-24T00:39:19Z","status":"succeeded","errors":[],"tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.9549324Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.5885573Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:40.0960974Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '393',
  'apim-request-id',
  '7723ff73-7c55-4982-ba96-33eb1a1cc1e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:41 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.2/analyze/jobs/bb00cb56-1b56-445e-a5da-42ef620c43e2')
  .query(true)
  .reply(200, {"jobId":"bb00cb56-1b56-445e-a5da-42ef620c43e2","lastUpdateDateTime":"2021-10-23T00:39:40Z","createdDateTime":"2021-10-23T00:39:19Z","expirationDateTime":"2021-10-24T00:39:19Z","status":"succeeded","errors":[],"tasks":{"completed":3,"failed":0,"inProgress":0,"total":3,"entityRecognitionTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.9549324Z","state":"succeeded","results":{"documents":[{"id":"0","entities":[],"warnings":[]},{"id":"1","entities":[{"text":"hotel","category":"Location","offset":19,"length":5,"confidenceScore":0.99}],"warnings":[]},{"id":"2","entities":[{"text":"restaurant","category":"Location","subcategory":"Structural","offset":4,"length":10,"confidenceScore":0.96}],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}],"entityRecognitionPiiTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:27.5885573Z","state":"succeeded","results":{"documents":[{"redactedText":"This was the best day of my life.","id":"0","entities":[],"warnings":[]},{"redactedText":"I did not like the hotel we stayed at. It was too expensive.","id":"1","entities":[],"warnings":[]},{"redactedText":"The restaurant was not as good as I hoped.","id":"2","entities":[],"warnings":[]}],"errors":[],"modelVersion":"2021-01-15"}}],"keyPhraseExtractionTasks":[{"lastUpdateDateTime":"2021-10-23T00:39:40.0960974Z","state":"succeeded","results":{"documents":[{"id":"0","keyPhrases":["best day","life"],"warnings":[]},{"id":"1","keyPhrases":["hotel"],"warnings":[]},{"id":"2","keyPhrases":["restaurant"],"warnings":[]}],"errors":[],"modelVersion":"2021-06-01"}}]}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '211',
  'apim-request-id',
  'f02fee19-2c27-49a9-9a0d-f8ca8d78e100',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:39:41 GMT'
]);

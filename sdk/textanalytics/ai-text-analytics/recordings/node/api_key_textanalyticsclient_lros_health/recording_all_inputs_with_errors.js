let nock = require('nock');

module.exports.hash = "c593c23bb954898040bbb1706f0cdaf7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1-preview.3/entities/health/jobs', {"documents":[{"id":"1","text":"","language":"en"},{"id":"2","text":"Patient does not suffer from high blood pressure.","language":"english"},{"id":"3","text":"","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1-preview.3/entities/health/jobs/06f47b95-a57b-467d-baac-bf88599bb456',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  '4fb48e0d-b70d-4e1c-95ec-a92c5bccb1cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/06f47b95-a57b-467d-baac-bf88599bb456')
  .query(true)
  .reply(200, {"jobId":"06f47b95-a57b-467d-baac-bf88599bb456","lastUpdateDateTime":"2020-12-30T17:28:12Z","createdDateTime":"2020-12-30T17:28:12Z","expirationDateTime":"2020-12-31T17:28:12Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'be877665-f849-4fea-aa99-e27443c9f989',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/06f47b95-a57b-467d-baac-bf88599bb456')
  .query(true)
  .reply(200, {"jobId":"06f47b95-a57b-467d-baac-bf88599bb456","lastUpdateDateTime":"2020-12-30T17:28:12Z","createdDateTime":"2020-12-30T17:28:12Z","expirationDateTime":"2020-12-31T17:28:12Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'f0eaebc4-92e5-44b7-a709-ec2e444ddbc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/06f47b95-a57b-467d-baac-bf88599bb456')
  .query(true)
  .reply(200, {"jobId":"06f47b95-a57b-467d-baac-bf88599bb456","lastUpdateDateTime":"2020-12-30T17:28:12Z","createdDateTime":"2020-12-30T17:28:12Z","expirationDateTime":"2020-12-31T17:28:12Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '5',
  'apim-request-id',
  'eaee0c31-51c9-40af-bd20-34e4c8d2ecde',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/06f47b95-a57b-467d-baac-bf88599bb456')
  .query(true)
  .reply(200, {"jobId":"06f47b95-a57b-467d-baac-bf88599bb456","lastUpdateDateTime":"2020-12-30T17:28:15Z","createdDateTime":"2020-12-30T17:28:12Z","expirationDateTime":"2020-12-31T17:28:12Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'bdb11b86-e0c5-44f2-9764-84a394e23971',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1-preview.3/entities/health/jobs/06f47b95-a57b-467d-baac-bf88599bb456')
  .query(true)
  .reply(200, {"jobId":"06f47b95-a57b-467d-baac-bf88599bb456","lastUpdateDateTime":"2020-12-30T17:28:15Z","createdDateTime":"2020-12-30T17:28:12Z","expirationDateTime":"2020-12-31T17:28:12Z","status":"succeeded","errors":[],"results":{"documents":[],"errors":[{"id":"1","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}},{"id":"2","error":{"code":"InvalidArgument","message":"Invalid Language Code.","innererror":{"code":"UnsupportedLanguageCode","message":"Invalid language code. Supported languages: en"}}},{"id":"3","error":{"code":"InvalidArgument","message":"Invalid document in request.","innererror":{"code":"InvalidDocument","message":"Document text is empty."}}}],"modelVersion":"2020-09-03"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '52',
  'apim-request-id',
  '9595c1b3-b08b-41b7-83bd-13916268807b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Dec 2020 17:28:16 GMT'
]);

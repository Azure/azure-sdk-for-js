let nock = require('nock');

module.exports.hash = "b05b4bf7009369b70b036897b144ee54";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"0","text":"👩🏻‍👩🏽‍👧🏾‍👦🏿 ibuprofen","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0',
  'x-envoy-upstream-service-time',
  '190',
  'apim-request-id',
  'f5642e14-c5da-47b1-8fc5-20220f1bc81e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:01Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '8003cf20-4184-40f3-9b67-a3072a34a7cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:01Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'ae1cb81c-4b7f-4373-aeda-2d414c662819',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:01 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:01Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  'd3baa2ec-5c22-4e39-9888-a30d5b6bc632',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:01Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'a8a36748-4f1e-4120-ade1-ad5c9a0a4f04',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:05 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:01Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'cb17ec1f-ba85-459f-8a14-5cd040a9987e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:08 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:01Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '09b287d2-897b-4584-92e0-bfaf55279b3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:10 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:01Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '0d235c90-7204-402c-ae07-8cd123be2483',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:12 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:01Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'c9a45e25-e32e-45fa-9b74-e922fcd08fd0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:14 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:01Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '73d66e9b-a35a-4eab-b4a4-69eb7e8edca3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:16 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:16Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '10cf561d-38c8-4be8-81e1-182f211dc437',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:18 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:16Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '65e8c616-9b2a-4ff4-abe3-7ae6bb7ccfec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:20 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:16Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '4f6ece24-04f8-469b-a5e7-7848aad4fdf3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:22 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:16Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '25253237-7373-4e8e-8557-a0c716c8568f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:24 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:16Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '64790aef-89a7-49ca-9fb8-338014a3b3c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:26 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:16Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '6a80377f-5ee8-48ef-9f7a-10bdad65ccd6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:29Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":20,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":0.99,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  '4fc61ac6-c4b6-40e5-8b66-ff42bb4101a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0')
  .query(true)
  .reply(200, {"jobId":"c872b8c3-8ba0-41cf-bd51-8dd7c274a0a0","lastUpdateDateTime":"2021-06-25T19:57:29Z","createdDateTime":"2021-06-25T19:57:01Z","expirationDateTime":"2021-06-26T19:57:01Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":20,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":0.99,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]}],"relations":[],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  '04a82b15-30db-40c9-9eea-ae3bc7d62222',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:57:30 GMT'
]);

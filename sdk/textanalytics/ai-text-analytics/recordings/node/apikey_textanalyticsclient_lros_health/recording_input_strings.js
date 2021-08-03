let nock = require('nock');

module.exports.hash = "e8fe4b7a699e69181a6d1d694a0b8992";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.1/entities/health/jobs', {"documents":[{"id":"0","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"1","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint//text/analytics/v3.2-preview.1/entities/health/jobs/24079596-8531-49de-b71a-f1f460e3273a',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  'a868a183-ea7b-4040-aa78-e1f708b25a2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:52 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/24079596-8531-49de-b71a-f1f460e3273a')
  .query(true)
  .reply(200, {"jobId":"24079596-8531-49de-b71a-f1f460e3273a","lastUpdateDateTime":"2021-08-03T03:14:53Z","createdDateTime":"2021-08-03T03:14:53Z","expirationDateTime":"2021-08-04T03:14:53Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '44b2bed7-4e0b-47a5-aa6a-82bc21a6b088',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:52 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/24079596-8531-49de-b71a-f1f460e3273a')
  .query(true)
  .reply(200, {"jobId":"24079596-8531-49de-b71a-f1f460e3273a","lastUpdateDateTime":"2021-08-03T03:14:53Z","createdDateTime":"2021-08-03T03:14:53Z","expirationDateTime":"2021-08-04T03:14:53Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '9facd6c8-80dc-403c-8ca1-cdf3917986b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:52 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/24079596-8531-49de-b71a-f1f460e3273a')
  .query(true)
  .reply(200, {"jobId":"24079596-8531-49de-b71a-f1f460e3273a","lastUpdateDateTime":"2021-08-03T03:14:53Z","createdDateTime":"2021-08-03T03:14:53Z","expirationDateTime":"2021-08-04T03:14:53Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '9b471aea-0431-432c-89d9-1cf7e7afc0d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:54 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/24079596-8531-49de-b71a-f1f460e3273a')
  .query(true)
  .reply(200, {"jobId":"24079596-8531-49de-b71a-f1f460e3273a","lastUpdateDateTime":"2021-08-03T03:14:53Z","createdDateTime":"2021-08-03T03:14:53Z","expirationDateTime":"2021-08-04T03:14:53Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  'fe6d5881-6f78-409e-9032-17fbb6183323',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:56 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/24079596-8531-49de-b71a-f1f460e3273a')
  .query(true)
  .reply(200, {"jobId":"24079596-8531-49de-b71a-f1f460e3273a","lastUpdateDateTime":"2021-08-03T03:14:53Z","createdDateTime":"2021-08-03T03:14:53Z","expirationDateTime":"2021-08-04T03:14:53Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '4b707109-69ac-4ea2-a912-783a63004b25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:14:58 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/24079596-8531-49de-b71a-f1f460e3273a')
  .query(true)
  .reply(200, {"jobId":"24079596-8531-49de-b71a-f1f460e3273a","lastUpdateDateTime":"2021-08-03T03:14:53Z","createdDateTime":"2021-08-03T03:14:53Z","expirationDateTime":"2021-08-04T03:14:53Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'ff8df967-fcb5-4d86-8ca6-e53407aca6d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:02 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/24079596-8531-49de-b71a-f1f460e3273a')
  .query(true)
  .reply(200, {"jobId":"24079596-8531-49de-b71a-f1f460e3273a","lastUpdateDateTime":"2021-08-03T03:14:53Z","createdDateTime":"2021-08-03T03:14:53Z","expirationDateTime":"2021-08-04T03:14:53Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '88711d2e-d7cb-4ac9-a1e2-e55e28476bfd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:04 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/24079596-8531-49de-b71a-f1f460e3273a')
  .query(true)
  .reply(200, {"jobId":"24079596-8531-49de-b71a-f1f460e3273a","lastUpdateDateTime":"2021-08-03T03:14:53Z","createdDateTime":"2021-08-03T03:14:53Z","expirationDateTime":"2021-08-04T03:14:53Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '10',
  'apim-request-id',
  '7ac6efe4-dfbd-48bb-b84a-fb105dfc7d48',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:06 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/24079596-8531-49de-b71a-f1f460e3273a')
  .query(true)
  .reply(200, {"jobId":"24079596-8531-49de-b71a-f1f460e3273a","lastUpdateDateTime":"2021-08-03T03:14:53Z","createdDateTime":"2021-08-03T03:14:53Z","expirationDateTime":"2021-08-04T03:14:53Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '2730ffe1-9a30-49e4-ab73-3f8f8baf359a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:08 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/24079596-8531-49de-b71a-f1f460e3273a')
  .query(true)
  .reply(200, {"jobId":"24079596-8531-49de-b71a-f1f460e3273a","lastUpdateDateTime":"2021-08-03T03:15:08Z","createdDateTime":"2021-08-03T03:14:53Z","expirationDateTime":"2021-08-04T03:14:53Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '1ff584c9-76ab-42af-b404-b2aa047d772e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:10 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/24079596-8531-49de-b71a-f1f460e3273a')
  .query(true)
  .reply(200, {"jobId":"24079596-8531-49de-b71a-f1f460e3273a","lastUpdateDateTime":"2021-08-03T03:15:08Z","createdDateTime":"2021-08-03T03:14:53Z","expirationDateTime":"2021-08-04T03:14:53Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  'e389844e-f2c8-4003-8a16-1a5253777a34',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:12 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/24079596-8531-49de-b71a-f1f460e3273a')
  .query(true)
  .reply(200, {"jobId":"24079596-8531-49de-b71a-f1f460e3273a","lastUpdateDateTime":"2021-08-03T03:15:14Z","createdDateTime":"2021-08-03T03:14:53Z","expirationDateTime":"2021-08-04T03:14:53Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":29,"length":19,"text":"high blood pressure","category":"SymptomOrSign","confidenceScore":1,"assertion":{"certainty":"negative"},"name":"Hypertensive disease","links":[{"dataSource":"UMLS","id":"C0020538"},{"dataSource":"AOD","id":"0000023317"},{"dataSource":"BI","id":"BI00001"},{"dataSource":"CCPSS","id":"1017493"},{"dataSource":"CCS","id":"7.1"},{"dataSource":"CHV","id":"0000015800"},{"dataSource":"COSTAR","id":"397"},{"dataSource":"CSP","id":"0571-5243"},{"dataSource":"CST","id":"HYPERTENS"},{"dataSource":"DXP","id":"U002034"},{"dataSource":"HPO","id":"HP:0000822"},{"dataSource":"ICD10","id":"I10-I15.9"},{"dataSource":"ICD10AM","id":"I10-I15.9"},{"dataSource":"ICD10CM","id":"I10"},{"dataSource":"ICD9CM","id":"997.91"},{"dataSource":"ICPC2ICD10ENG","id":"MTHU035456"},{"dataSource":"ICPC2P","id":"K85004"},{"dataSource":"LCH","id":"U002317"},{"dataSource":"LCH_NW","id":"sh85063723"},{"dataSource":"LNC","id":"LA14293-7"},{"dataSource":"MDR","id":"10020772"},{"dataSource":"MEDCIN","id":"33288"},{"dataSource":"MEDLINEPLUS","id":"34"},{"dataSource":"MSH","id":"D006973"},{"dataSource":"MTH","id":"005"},{"dataSource":"MTHICD9","id":"997.91"},{"dataSource":"NANDA-I","id":"00905"},{"dataSource":"NCI","id":"C3117"},{"dataSource":"NCI_CPTAC","id":"C3117"},{"dataSource":"NCI_CTCAE","id":"E13785"},{"dataSource":"NCI_CTRP","id":"C3117"},{"dataSource":"NCI_FDA","id":"1908"},{"dataSource":"NCI_GDC","id":"C3117"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000458091"},{"dataSource":"NCI_NICHD","id":"C3117"},{"dataSource":"NOC","id":"060808"},{"dataSource":"OMIM","id":"MTHU002068"},{"dataSource":"PCDS","id":"PRB_11000.06"},{"dataSource":"PDQ","id":"CDR0000686951"},{"dataSource":"PSY","id":"23830"},{"dataSource":"RCD","id":"XE0Ub"},{"dataSource":"SNM","id":"F-70700"},{"dataSource":"SNMI","id":"D3-02000"},{"dataSource":"SNOMEDCT_US","id":"38341003"},{"dataSource":"WHO","id":"0210"}]}],"relations":[],"warnings":[]},{"id":"1","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1}],"relations":[{"relationType":"DosageOfMedication","entities":[{"ref":"#/results/documents/1/entities/0","role":"Dosage"},{"ref":"#/results/documents/1/entities/1","role":"Medication"}]},{"relationType":"FrequencyOfMedication","entities":[{"ref":"#/results/documents/1/entities/1","role":"Medication"},{"ref":"#/results/documents/1/entities/2","role":"Frequency"}]}],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  '351776e2-c53a-420d-b855-1e5f23257574',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:14 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/24079596-8531-49de-b71a-f1f460e3273a')
  .query(true)
  .reply(200, {"jobId":"24079596-8531-49de-b71a-f1f460e3273a","lastUpdateDateTime":"2021-08-03T03:15:14Z","createdDateTime":"2021-08-03T03:14:53Z","expirationDateTime":"2021-08-04T03:14:53Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":29,"length":19,"text":"high blood pressure","category":"SymptomOrSign","confidenceScore":1,"assertion":{"certainty":"negative"},"name":"Hypertensive disease","links":[{"dataSource":"UMLS","id":"C0020538"},{"dataSource":"AOD","id":"0000023317"},{"dataSource":"BI","id":"BI00001"},{"dataSource":"CCPSS","id":"1017493"},{"dataSource":"CCS","id":"7.1"},{"dataSource":"CHV","id":"0000015800"},{"dataSource":"COSTAR","id":"397"},{"dataSource":"CSP","id":"0571-5243"},{"dataSource":"CST","id":"HYPERTENS"},{"dataSource":"DXP","id":"U002034"},{"dataSource":"HPO","id":"HP:0000822"},{"dataSource":"ICD10","id":"I10-I15.9"},{"dataSource":"ICD10AM","id":"I10-I15.9"},{"dataSource":"ICD10CM","id":"I10"},{"dataSource":"ICD9CM","id":"997.91"},{"dataSource":"ICPC2ICD10ENG","id":"MTHU035456"},{"dataSource":"ICPC2P","id":"K85004"},{"dataSource":"LCH","id":"U002317"},{"dataSource":"LCH_NW","id":"sh85063723"},{"dataSource":"LNC","id":"LA14293-7"},{"dataSource":"MDR","id":"10020772"},{"dataSource":"MEDCIN","id":"33288"},{"dataSource":"MEDLINEPLUS","id":"34"},{"dataSource":"MSH","id":"D006973"},{"dataSource":"MTH","id":"005"},{"dataSource":"MTHICD9","id":"997.91"},{"dataSource":"NANDA-I","id":"00905"},{"dataSource":"NCI","id":"C3117"},{"dataSource":"NCI_CPTAC","id":"C3117"},{"dataSource":"NCI_CTCAE","id":"E13785"},{"dataSource":"NCI_CTRP","id":"C3117"},{"dataSource":"NCI_FDA","id":"1908"},{"dataSource":"NCI_GDC","id":"C3117"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000458091"},{"dataSource":"NCI_NICHD","id":"C3117"},{"dataSource":"NOC","id":"060808"},{"dataSource":"OMIM","id":"MTHU002068"},{"dataSource":"PCDS","id":"PRB_11000.06"},{"dataSource":"PDQ","id":"CDR0000686951"},{"dataSource":"PSY","id":"23830"},{"dataSource":"RCD","id":"XE0Ub"},{"dataSource":"SNM","id":"F-70700"},{"dataSource":"SNMI","id":"D3-02000"},{"dataSource":"SNOMEDCT_US","id":"38341003"},{"dataSource":"WHO","id":"0210"}]}],"relations":[],"warnings":[]},{"id":"1","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1}],"relations":[{"relationType":"DosageOfMedication","entities":[{"ref":"#/results/documents/1/entities/0","role":"Dosage"},{"ref":"#/results/documents/1/entities/1","role":"Medication"}]},{"relationType":"FrequencyOfMedication","entities":[{"ref":"#/results/documents/1/entities/1","role":"Medication"},{"ref":"#/results/documents/1/entities/2","role":"Frequency"}]}],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  'ff6792ae-a95f-4a6f-9501-c3e0366ee6fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 03 Aug 2021 03:15:14 GMT'
]);

let nock = require('nock');

module.exports.hash = "e8fe4b7a699e69181a6d1d694a0b8992";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.2-preview.2/entities/health/jobs', {"documents":[{"id":"0","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"1","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.2-preview.1/entities/health/jobs/e942d3fb-f1e9-4f38-8969-605e1458540b',
  'x-envoy-upstream-service-time',
  '173',
  'apim-request-id',
  '16680f6b-b415-420c-8f30-bb832d89a668',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/e942d3fb-f1e9-4f38-8969-605e1458540b')
  .query(true)
  .reply(200, {"jobId":"e942d3fb-f1e9-4f38-8969-605e1458540b","lastUpdateDateTime":"2021-10-23T00:41:17Z","createdDateTime":"2021-10-23T00:41:17Z","expirationDateTime":"2021-10-24T00:41:17Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'cd161b79-bb81-4986-b356-97d596114671',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/e942d3fb-f1e9-4f38-8969-605e1458540b')
  .query(true)
  .reply(200, {"jobId":"e942d3fb-f1e9-4f38-8969-605e1458540b","lastUpdateDateTime":"2021-10-23T00:41:17Z","createdDateTime":"2021-10-23T00:41:17Z","expirationDateTime":"2021-10-24T00:41:17Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '54fb4e52-10b5-445b-922a-4a02d32dac80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:17 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/e942d3fb-f1e9-4f38-8969-605e1458540b')
  .query(true)
  .reply(200, {"jobId":"e942d3fb-f1e9-4f38-8969-605e1458540b","lastUpdateDateTime":"2021-10-23T00:41:17Z","createdDateTime":"2021-10-23T00:41:17Z","expirationDateTime":"2021-10-24T00:41:17Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '38a304cf-3633-4814-aff0-be15e9d54957',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:19 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/e942d3fb-f1e9-4f38-8969-605e1458540b')
  .query(true)
  .reply(200, {"jobId":"e942d3fb-f1e9-4f38-8969-605e1458540b","lastUpdateDateTime":"2021-10-23T00:41:17Z","createdDateTime":"2021-10-23T00:41:17Z","expirationDateTime":"2021-10-24T00:41:17Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '66c0741e-8797-48ec-b164-01f417cb17fc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:21 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/e942d3fb-f1e9-4f38-8969-605e1458540b')
  .query(true)
  .reply(200, {"jobId":"e942d3fb-f1e9-4f38-8969-605e1458540b","lastUpdateDateTime":"2021-10-23T00:41:22Z","createdDateTime":"2021-10-23T00:41:17Z","expirationDateTime":"2021-10-24T00:41:17Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  'f55cf3a4-b353-46c4-ba58-181ba419bd5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/e942d3fb-f1e9-4f38-8969-605e1458540b')
  .query(true)
  .reply(200, {"jobId":"e942d3fb-f1e9-4f38-8969-605e1458540b","lastUpdateDateTime":"2021-10-23T00:41:22Z","createdDateTime":"2021-10-23T00:41:17Z","expirationDateTime":"2021-10-24T00:41:17Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '7133cfdb-18d1-411d-a22e-aaee3ffe68ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/e942d3fb-f1e9-4f38-8969-605e1458540b')
  .query(true)
  .reply(200, {"jobId":"e942d3fb-f1e9-4f38-8969-605e1458540b","lastUpdateDateTime":"2021-10-23T00:41:22Z","createdDateTime":"2021-10-23T00:41:17Z","expirationDateTime":"2021-10-24T00:41:17Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '921b5599-7570-474f-90dc-d9a1aac1f87a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/e942d3fb-f1e9-4f38-8969-605e1458540b')
  .query(true)
  .reply(200, {"jobId":"e942d3fb-f1e9-4f38-8969-605e1458540b","lastUpdateDateTime":"2021-10-23T00:41:22Z","createdDateTime":"2021-10-23T00:41:17Z","expirationDateTime":"2021-10-24T00:41:17Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  'c864436e-1de6-473b-bbf1-b738bdf495e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/e942d3fb-f1e9-4f38-8969-605e1458540b')
  .query(true)
  .reply(200, {"jobId":"e942d3fb-f1e9-4f38-8969-605e1458540b","lastUpdateDateTime":"2021-10-23T00:41:30Z","createdDateTime":"2021-10-23T00:41:17Z","expirationDateTime":"2021-10-24T00:41:17Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":29,"length":19,"text":"high blood pressure","category":"SymptomOrSign","confidenceScore":1,"assertion":{"certainty":"negative"},"name":"Hypertensive disease","links":[{"dataSource":"UMLS","id":"C0020538"},{"dataSource":"AOD","id":"0000023317"},{"dataSource":"BI","id":"BI00001"},{"dataSource":"CCPSS","id":"1017493"},{"dataSource":"CCS","id":"7.1"},{"dataSource":"CHV","id":"0000015800"},{"dataSource":"COSTAR","id":"397"},{"dataSource":"CSP","id":"0571-5243"},{"dataSource":"CST","id":"HYPERTENS"},{"dataSource":"DXP","id":"U002034"},{"dataSource":"HPO","id":"HP:0000822"},{"dataSource":"ICD10","id":"I10-I15.9"},{"dataSource":"ICD10AM","id":"I10-I15.9"},{"dataSource":"ICD10CM","id":"I10"},{"dataSource":"ICD9CM","id":"997.91"},{"dataSource":"ICPC2ICD10ENG","id":"MTHU035456"},{"dataSource":"ICPC2P","id":"K85004"},{"dataSource":"LCH","id":"U002317"},{"dataSource":"LCH_NW","id":"sh85063723"},{"dataSource":"LNC","id":"LA14293-7"},{"dataSource":"MDR","id":"10020772"},{"dataSource":"MEDCIN","id":"33288"},{"dataSource":"MEDLINEPLUS","id":"34"},{"dataSource":"MSH","id":"D006973"},{"dataSource":"MTH","id":"005"},{"dataSource":"MTHICD9","id":"997.91"},{"dataSource":"NANDA-I","id":"00905"},{"dataSource":"NCI","id":"C3117"},{"dataSource":"NCI_CPTAC","id":"C3117"},{"dataSource":"NCI_CTCAE","id":"E13785"},{"dataSource":"NCI_CTRP","id":"C3117"},{"dataSource":"NCI_FDA","id":"1908"},{"dataSource":"NCI_GDC","id":"C3117"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000458091"},{"dataSource":"NCI_NICHD","id":"C3117"},{"dataSource":"NOC","id":"060808"},{"dataSource":"OMIM","id":"MTHU002068"},{"dataSource":"PCDS","id":"PRB_11000.06"},{"dataSource":"PDQ","id":"CDR0000686951"},{"dataSource":"PSY","id":"23830"},{"dataSource":"RCD","id":"XE0Ub"},{"dataSource":"SNM","id":"F-70700"},{"dataSource":"SNMI","id":"D3-02000"},{"dataSource":"SNOMEDCT_US","id":"38341003"},{"dataSource":"WHO","id":"0210"}]}],"relations":[],"warnings":[]},{"id":"1","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1}],"relations":[{"relationType":"DosageOfMedication","entities":[{"ref":"#/results/documents/1/entities/0","role":"Dosage"},{"ref":"#/results/documents/1/entities/1","role":"Medication"}]},{"relationType":"FrequencyOfMedication","entities":[{"ref":"#/results/documents/1/entities/1","role":"Medication"},{"ref":"#/results/documents/1/entities/2","role":"Frequency"}]}],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  'ca301aac-3eff-4230-bc66-055ca741ec61',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.2-preview.1/entities/health/jobs/e942d3fb-f1e9-4f38-8969-605e1458540b')
  .query(true)
  .reply(200, {"jobId":"e942d3fb-f1e9-4f38-8969-605e1458540b","lastUpdateDateTime":"2021-10-23T00:41:30Z","createdDateTime":"2021-10-23T00:41:17Z","expirationDateTime":"2021-10-24T00:41:17Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":29,"length":19,"text":"high blood pressure","category":"SymptomOrSign","confidenceScore":1,"assertion":{"certainty":"negative"},"name":"Hypertensive disease","links":[{"dataSource":"UMLS","id":"C0020538"},{"dataSource":"AOD","id":"0000023317"},{"dataSource":"BI","id":"BI00001"},{"dataSource":"CCPSS","id":"1017493"},{"dataSource":"CCS","id":"7.1"},{"dataSource":"CHV","id":"0000015800"},{"dataSource":"COSTAR","id":"397"},{"dataSource":"CSP","id":"0571-5243"},{"dataSource":"CST","id":"HYPERTENS"},{"dataSource":"DXP","id":"U002034"},{"dataSource":"HPO","id":"HP:0000822"},{"dataSource":"ICD10","id":"I10-I15.9"},{"dataSource":"ICD10AM","id":"I10-I15.9"},{"dataSource":"ICD10CM","id":"I10"},{"dataSource":"ICD9CM","id":"997.91"},{"dataSource":"ICPC2ICD10ENG","id":"MTHU035456"},{"dataSource":"ICPC2P","id":"K85004"},{"dataSource":"LCH","id":"U002317"},{"dataSource":"LCH_NW","id":"sh85063723"},{"dataSource":"LNC","id":"LA14293-7"},{"dataSource":"MDR","id":"10020772"},{"dataSource":"MEDCIN","id":"33288"},{"dataSource":"MEDLINEPLUS","id":"34"},{"dataSource":"MSH","id":"D006973"},{"dataSource":"MTH","id":"005"},{"dataSource":"MTHICD9","id":"997.91"},{"dataSource":"NANDA-I","id":"00905"},{"dataSource":"NCI","id":"C3117"},{"dataSource":"NCI_CPTAC","id":"C3117"},{"dataSource":"NCI_CTCAE","id":"E13785"},{"dataSource":"NCI_CTRP","id":"C3117"},{"dataSource":"NCI_FDA","id":"1908"},{"dataSource":"NCI_GDC","id":"C3117"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000458091"},{"dataSource":"NCI_NICHD","id":"C3117"},{"dataSource":"NOC","id":"060808"},{"dataSource":"OMIM","id":"MTHU002068"},{"dataSource":"PCDS","id":"PRB_11000.06"},{"dataSource":"PDQ","id":"CDR0000686951"},{"dataSource":"PSY","id":"23830"},{"dataSource":"RCD","id":"XE0Ub"},{"dataSource":"SNM","id":"F-70700"},{"dataSource":"SNMI","id":"D3-02000"},{"dataSource":"SNOMEDCT_US","id":"38341003"},{"dataSource":"WHO","id":"0210"}]}],"relations":[],"warnings":[]},{"id":"1","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1}],"relations":[{"relationType":"DosageOfMedication","entities":[{"ref":"#/results/documents/1/entities/0","role":"Dosage"},{"ref":"#/results/documents/1/entities/1","role":"Medication"}]},{"relationType":"FrequencyOfMedication","entities":[{"ref":"#/results/documents/1/entities/1","role":"Medication"},{"ref":"#/results/documents/1/entities/2","role":"Frequency"}]}],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  '42365aa6-281f-4c37-a40f-3e1073add1b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 23 Oct 2021 00:41:32 GMT'
]);

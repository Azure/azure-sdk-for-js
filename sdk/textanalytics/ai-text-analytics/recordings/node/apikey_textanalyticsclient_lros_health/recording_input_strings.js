let nock = require('nock');

module.exports.hash = "e8fe4b7a699e69181a6d1d694a0b8992";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/text/analytics/v3.1/entities/health/jobs', {"documents":[{"id":"0","text":"Patient does not suffer from high blood pressure.","language":"en"},{"id":"1","text":"Prescribed 100mg ibuprofen, taken twice daily.","language":"en"}]})
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'operation-location',
  'https://endpoint/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  'b332f371-5799-48aa-8a52-6f3b1025023b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:28Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'cf70648d-d293-4296-a6c0-a7efca09074d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:28Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'dc700053-6557-4f6b-86ef-e790b7c77171',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:28 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:28Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '4c420389-eb1b-409a-a488-05325650b1fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:30 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:28Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '45166bef-3094-4e19-9a9d-c3068ba228fb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:32 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:28Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '4153aaad-5eb3-444d-b55a-f643ec134875',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:34 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:28Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  'bef067c5-3b5d-4d8a-ba4d-4105d8dd9a07',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:36 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:28Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '6f22ce61-e6ec-4df5-89d8-db4388f84537',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:38 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:28Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '8',
  'apim-request-id',
  '671c97cf-bc30-48ff-acbc-8a53defdc94e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:40 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:28Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"notStarted","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '17430a29-7cfb-4bc5-901f-ed8dcbd55b18',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:42 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:43Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '9',
  'apim-request-id',
  '869a9c19-5da8-452d-9781-1d1701e807d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:44 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:43Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '02be75e8-25cb-4093-bb76-7468d09f3353',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:46 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:43Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '11',
  'apim-request-id',
  '7eb44855-b592-47e7-9c2c-ce61cec83e7a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:48 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:43Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '7',
  'apim-request-id',
  '9d239647-ab77-4c71-935f-b95dead3d10b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:50 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:43Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '13',
  'apim-request-id',
  'a6f14dab-36ae-480d-bf33-0ea3535ba848',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:52 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:43Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"running","errors":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '6',
  'apim-request-id',
  '89064c19-87ac-49db-9356-4aa6450b77be',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:54 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:56Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":29,"length":19,"text":"high blood pressure","category":"SymptomOrSign","confidenceScore":1,"assertion":{"certainty":"negative"},"name":"Hypertensive disease","links":[{"dataSource":"UMLS","id":"C0020538"},{"dataSource":"AOD","id":"0000023317"},{"dataSource":"BI","id":"BI00001"},{"dataSource":"CCPSS","id":"1017493"},{"dataSource":"CCS","id":"7.1"},{"dataSource":"CHV","id":"0000015800"},{"dataSource":"COSTAR","id":"397"},{"dataSource":"CSP","id":"0571-5243"},{"dataSource":"CST","id":"HYPERTENS"},{"dataSource":"DXP","id":"U002034"},{"dataSource":"HPO","id":"HP:0000822"},{"dataSource":"ICD10","id":"I10-I15.9"},{"dataSource":"ICD10AM","id":"I10-I15.9"},{"dataSource":"ICD10CM","id":"I10"},{"dataSource":"ICD9CM","id":"997.91"},{"dataSource":"ICPC2ICD10ENG","id":"MTHU035456"},{"dataSource":"ICPC2P","id":"K85004"},{"dataSource":"LCH","id":"U002317"},{"dataSource":"LCH_NW","id":"sh85063723"},{"dataSource":"LNC","id":"LA14293-7"},{"dataSource":"MDR","id":"10020772"},{"dataSource":"MEDCIN","id":"33288"},{"dataSource":"MEDLINEPLUS","id":"34"},{"dataSource":"MSH","id":"D006973"},{"dataSource":"MTH","id":"005"},{"dataSource":"MTHICD9","id":"997.91"},{"dataSource":"NANDA-I","id":"00905"},{"dataSource":"NCI","id":"C3117"},{"dataSource":"NCI_CPTAC","id":"C3117"},{"dataSource":"NCI_CTCAE","id":"E13785"},{"dataSource":"NCI_CTRP","id":"C3117"},{"dataSource":"NCI_FDA","id":"1908"},{"dataSource":"NCI_GDC","id":"C3117"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000458091"},{"dataSource":"NCI_NICHD","id":"C3117"},{"dataSource":"NOC","id":"060808"},{"dataSource":"OMIM","id":"MTHU002068"},{"dataSource":"PCDS","id":"PRB_11000.06"},{"dataSource":"PDQ","id":"CDR0000686951"},{"dataSource":"PSY","id":"23830"},{"dataSource":"RCD","id":"XE0Ub"},{"dataSource":"SNM","id":"F-70700"},{"dataSource":"SNMI","id":"D3-02000"},{"dataSource":"SNOMEDCT_US","id":"38341003"},{"dataSource":"WHO","id":"0210"}]}],"relations":[],"warnings":[]},{"id":"1","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1}],"relations":[{"relationType":"DosageOfMedication","entities":[{"ref":"#/results/documents/1/entities/0","role":"Dosage"},{"ref":"#/results/documents/1/entities/1","role":"Medication"}]},{"relationType":"FrequencyOfMedication","entities":[{"ref":"#/results/documents/1/entities/1","role":"Medication"},{"ref":"#/results/documents/1/entities/2","role":"Frequency"}]}],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '3112286d-3db1-4be9-9ea8-0206d1ac714d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:57 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/text/analytics/v3.1/entities/health/jobs/b403a3df-4de3-4763-9e14-14e8ecc76174')
  .query(true)
  .reply(200, {"jobId":"b403a3df-4de3-4763-9e14-14e8ecc76174","lastUpdateDateTime":"2021-06-25T19:55:56Z","createdDateTime":"2021-06-25T19:55:28Z","expirationDateTime":"2021-06-26T19:55:28Z","status":"succeeded","errors":[],"results":{"documents":[{"id":"0","entities":[{"offset":29,"length":19,"text":"high blood pressure","category":"SymptomOrSign","confidenceScore":1,"assertion":{"certainty":"negative"},"name":"Hypertensive disease","links":[{"dataSource":"UMLS","id":"C0020538"},{"dataSource":"AOD","id":"0000023317"},{"dataSource":"BI","id":"BI00001"},{"dataSource":"CCPSS","id":"1017493"},{"dataSource":"CCS","id":"7.1"},{"dataSource":"CHV","id":"0000015800"},{"dataSource":"COSTAR","id":"397"},{"dataSource":"CSP","id":"0571-5243"},{"dataSource":"CST","id":"HYPERTENS"},{"dataSource":"DXP","id":"U002034"},{"dataSource":"HPO","id":"HP:0000822"},{"dataSource":"ICD10","id":"I10-I15.9"},{"dataSource":"ICD10AM","id":"I10-I15.9"},{"dataSource":"ICD10CM","id":"I10"},{"dataSource":"ICD9CM","id":"997.91"},{"dataSource":"ICPC2ICD10ENG","id":"MTHU035456"},{"dataSource":"ICPC2P","id":"K85004"},{"dataSource":"LCH","id":"U002317"},{"dataSource":"LCH_NW","id":"sh85063723"},{"dataSource":"LNC","id":"LA14293-7"},{"dataSource":"MDR","id":"10020772"},{"dataSource":"MEDCIN","id":"33288"},{"dataSource":"MEDLINEPLUS","id":"34"},{"dataSource":"MSH","id":"D006973"},{"dataSource":"MTH","id":"005"},{"dataSource":"MTHICD9","id":"997.91"},{"dataSource":"NANDA-I","id":"00905"},{"dataSource":"NCI","id":"C3117"},{"dataSource":"NCI_CPTAC","id":"C3117"},{"dataSource":"NCI_CTCAE","id":"E13785"},{"dataSource":"NCI_CTRP","id":"C3117"},{"dataSource":"NCI_FDA","id":"1908"},{"dataSource":"NCI_GDC","id":"C3117"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000458091"},{"dataSource":"NCI_NICHD","id":"C3117"},{"dataSource":"NOC","id":"060808"},{"dataSource":"OMIM","id":"MTHU002068"},{"dataSource":"PCDS","id":"PRB_11000.06"},{"dataSource":"PDQ","id":"CDR0000686951"},{"dataSource":"PSY","id":"23830"},{"dataSource":"RCD","id":"XE0Ub"},{"dataSource":"SNM","id":"F-70700"},{"dataSource":"SNMI","id":"D3-02000"},{"dataSource":"SNOMEDCT_US","id":"38341003"},{"dataSource":"WHO","id":"0210"}]}],"relations":[],"warnings":[]},{"id":"1","entities":[{"offset":11,"length":5,"text":"100mg","category":"Dosage","confidenceScore":1},{"offset":17,"length":9,"text":"ibuprofen","category":"MedicationName","confidenceScore":1,"name":"ibuprofen","links":[{"dataSource":"UMLS","id":"C0020740"},{"dataSource":"AOD","id":"0000019879"},{"dataSource":"ATC","id":"M01AE01"},{"dataSource":"CCPSS","id":"0046165"},{"dataSource":"CHV","id":"0000006519"},{"dataSource":"CSP","id":"2270-2077"},{"dataSource":"DRUGBANK","id":"DB01050"},{"dataSource":"GS","id":"1611"},{"dataSource":"LCH_NW","id":"sh97005926"},{"dataSource":"LNC","id":"LP16165-0"},{"dataSource":"MEDCIN","id":"40458"},{"dataSource":"MMSL","id":"d00015"},{"dataSource":"MSH","id":"D007052"},{"dataSource":"MTHSPL","id":"WK2XYI10QM"},{"dataSource":"NCI","id":"C561"},{"dataSource":"NCI_CTRP","id":"C561"},{"dataSource":"NCI_DCP","id":"00803"},{"dataSource":"NCI_DTP","id":"NSC0256857"},{"dataSource":"NCI_FDA","id":"WK2XYI10QM"},{"dataSource":"NCI_NCI-GLOSS","id":"CDR0000613511"},{"dataSource":"NDDF","id":"002377"},{"dataSource":"PDQ","id":"CDR0000040475"},{"dataSource":"RCD","id":"x02MO"},{"dataSource":"RXNORM","id":"5640"},{"dataSource":"SNM","id":"E-7772"},{"dataSource":"SNMI","id":"C-603C0"},{"dataSource":"SNOMEDCT_US","id":"387207008"},{"dataSource":"USP","id":"m39860"},{"dataSource":"USPMG","id":"MTHU000060"},{"dataSource":"VANDF","id":"4017840"}]},{"offset":34,"length":11,"text":"twice daily","category":"Frequency","confidenceScore":1}],"relations":[{"relationType":"DosageOfMedication","entities":[{"ref":"#/results/documents/1/entities/0","role":"Dosage"},{"ref":"#/results/documents/1/entities/1","role":"Medication"}]},{"relationType":"FrequencyOfMedication","entities":[{"ref":"#/results/documents/1/entities/1","role":"Medication"},{"ref":"#/results/documents/1/entities/2","role":"Frequency"}]}],"warnings":[]}],"errors":[],"modelVersion":"2021-05-15"}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '4c8acc94-eca6-4932-8242-834f3828d90e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Jun 2021 19:55:57 GMT'
]);

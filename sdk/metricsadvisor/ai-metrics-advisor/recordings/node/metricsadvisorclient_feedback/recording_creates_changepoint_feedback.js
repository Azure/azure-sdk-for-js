let nock = require('nock');

module.exports.hash = "0e69c6ea691f567479e1411d0b2cd188";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"Dim1":"Common Lime","Dim2":"Ant"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/4c9cda9b-6bb3-4699-b5cb-65f9d7abe60e',
  'x-request-id',
  '6df236d2-dbeb-49e5-aaa6-4cfcea88fbaa',
  'x-envoy-upstream-service-time',
  '309',
  'apim-request-id',
  '6df236d2-dbeb-49e5-aaa6-4cfcea88fbaa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 22:12:13 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/4c9cda9b-6bb3-4699-b5cb-65f9d7abe60e')
  .reply(200, {"feedbackId":"4c9cda9b-6bb3-4699-b5cb-65f9d7abe60e","createdTime":"2020-09-25T22:12:13.769Z","userPrincipal":"yumeng@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"Dim1":"Common Lime","Dim2":"Ant"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8a4d31cd-5c67-4d00-a423-8aa8f808f0ba',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  '8a4d31cd-5c67-4d00-a423-8aa8f808f0ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 22:12:14 GMT',
  'Connection',
  'close'
]);

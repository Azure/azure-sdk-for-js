let nock = require('nock');

module.exports.hash = "99dfa54f2ac208d7849bd13c7262ba4b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[]})
  .query(true)
  .reply(200, {"trunks":{},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'kqwuPq0tzEa0SpFQVDYIGg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '258ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0yOuoYgAAAADr1SPuwRb9R4TuBg0X7kEZUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:56 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'Y3NQS84aQkmWiJoRQAKmJA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '248ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0yeuoYgAAAACzIjPXYHlsSKGId3pGsQZoUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:57 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{}})
  .query(true)
  .reply(422, {"error":{"code":"UnprocessableConfiguration","message":"One or more request inputs are not valid.","innererror":{"code":"EmptyPatch","message":"Patch with no data provided."}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  'NmWw/SvzB0K2Gdi2N6DF3g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '19ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0yeuoYgAAAADtugBmXwAvT6GwwJ5M4pT4UFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:57 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"trunks":{"test-sbc.foo.bar":{"sipSignalingPort":5678}}})
  .query(true)
  .reply(200, {"trunks":{"test-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'B6NMauFomUeo0zfbCyS59A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '712ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0yeuoYgAAAACqDz+nWX8DTrOecRFzUoSMUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:58 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["test-sbc.foo.bar"]}]})
  .query(true)
  .reply(200, {"trunks":{"test-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["test-sbc.foo.bar"]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '22+3/N4CDUipqbKS6Jo5ow.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '324ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0yuuoYgAAAADnOPiw7wKQTZkVq5YsAVNNUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:58 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{"test-sbc.foo.bar":{"sipSignalingPort":5678}},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":["test-sbc.foo.bar"]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'wp7VLzc5bEeqOK4JpXTXtg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '216ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0yuuoYgAAAAC9pkBsMuBeQYP/FdT51IzXUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:58 GMT'
]);

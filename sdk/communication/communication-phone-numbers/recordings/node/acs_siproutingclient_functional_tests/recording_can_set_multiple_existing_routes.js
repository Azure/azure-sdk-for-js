let nock = require('nock');

module.exports.hash = "e2238aeb01a450dd89e8097b48fc4007";

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
  'qrykV7xMcEuvbtxwXQ7dhw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '314ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0xuuoYgAAAAAjlN9lwAWqSra8jrW+JJIUUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:54 GMT'
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
  '8+miF6WBPk+Zr387OTFtSA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '218ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0x+uoYgAAAABHOuIvv1EBSKTh94bCqkIgUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:55 GMT'
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
  'qqQauLUGykaaw2toaX2coQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '19ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0x+uoYgAAAABxF6TJApXoRqpuvARe2BxYUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:55 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]})
  .query(true)
  .reply(200, {"trunks":{},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'wSDNIWGoNk6NiYwRZE6r5Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '320ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0x+uoYgAAAADUIq/InL5bSaxX/WnN3RpXUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:55 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .patch('/sip', {"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^.*$","trunks":[]},{"description":"ALTERED mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]})
  .query(true)
  .reply(200, {"trunks":{},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^.*$","trunks":[]},{"description":"ALTERED mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'exZGK6gTKEqUNumHMk6RyQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '254ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0x+uoYgAAAACHJgC3MKttSpXL164UIGMUUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:56 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^.*$","trunks":[]},{"description":"ALTERED mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'UCi1RpYHvUKC5lof8WM3NQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '239ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0yOuoYgAAAADVwBEgueDVSZgmsIDPClLRUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:56 GMT'
]);

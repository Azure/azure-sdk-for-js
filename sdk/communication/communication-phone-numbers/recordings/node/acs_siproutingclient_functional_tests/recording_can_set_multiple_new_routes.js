let nock = require('nock');

module.exports.hash = "e5ed209b7e3bf2d7982a3587d526e902";

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
  'DVb5ak44LUS6GtCkOypJ9A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '331ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0xOuoYgAAAAD1r49i9co2Q6KG6KnFC2HOUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:53 GMT'
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
  'BLILXU0DVUimyCfTWMACgQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '228ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0xeuoYgAAAAAFGTm5oMWxQ6F0IpqzbHhIUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:53 GMT'
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
  'oPmGsyrbw0a4fymmeXWfrw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '18ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0xeuoYgAAAAC2SdC8hLKyQY6s/XNdAmTpUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:53 GMT'
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
  'kRtyU7H0hkSQkCvYccD1RA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '313ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0xeuoYgAAAADbCpTdATe+SY3ucDuVkjYUUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:53 GMT'
]);

nock('https://jannovak.communication.azure.com:443', {"encodedQueryParams":true})
  .get('/sip')
  .query(true)
  .reply(200, {"trunks":{},"routes":[{"description":"myFirstRoute's description","name":"myFirstRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]},{"description":"mySecondRoute's description","name":"mySecondRoute","numberPattern":"^+[1-9][0-9]{3,23}$","trunks":[]}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'u0Cz/k19iE6rU8mnZ9YF/Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '233ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0xuuoYgAAAAC3a0gN/jRARIg6687A8FtdUFJHMDFFREdFMDYxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 14 Jun 2022 20:12:54 GMT'
]);

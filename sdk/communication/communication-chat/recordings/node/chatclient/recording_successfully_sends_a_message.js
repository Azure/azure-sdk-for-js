let nock = require('nock');

module.exports.hash = "44a1a3fb76689a98de0cbdfbe9b12da6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A883ce5bf892c47d6a7da73da6df31c7e%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1610503608398"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://13.64.171.212/chat/threads/19%3A883ce5bf892c47d6a7da73da6df31c7e@thread.v2/messages/1610503608398',
  'MS-CV',
  'fmxawLbhrEG+fEaIVwsKJQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '261ms',
  'X-Azure-Ref',
  '0uFX+XwAAAADMcnMZIWzzQKdXRtCQYkZ7V1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:48 GMT'
]);

let nock = require('nock');

module.exports.hash = "2ba74d50c4846a389606b0f286409955";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:answer', {"incomingCallContext":"2sfssfs2ffef","callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(500, {"error":{"code":"InternalServerError","message":"The magic number in GZip header is not correct. Make sure you are passing in a GZip stream."}}, [
  'Content-Length',
  '144',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '80474325-6b14-4c98-8bd6-9357285e5899',
  'X-Microsoft-Skype-Chain-ID',
  '743e1c97-0b95-415b-b75c-507fe00060ad',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0HwbhYQAAAABkrYCC8m7oRZrgTkfRHe3ZREVMMDFFREdFMDUxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 05:11:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:answer', {"incomingCallContext":"2sfssfs2ffef","callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(500, {"error":{"code":"InternalServerError","message":"The magic number in GZip header is not correct. Make sure you are passing in a GZip stream."}}, [
  'Content-Length',
  '144',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '80474325-6b14-4c98-8bd6-9357285e5899',
  'X-Microsoft-Skype-Chain-ID',
  '2f549c52-a10d-4d9f-9d64-8be31d10f0c5',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0IAbhYQAAAACy1fPWwCPiQby/tl3OoHGaREVMMDFFREdFMDUxNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 14 Jan 2022 05:11:59 GMT'
]);

let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-04-30T22:41:08.282Z"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2018-03-28","ss":"tqf","srt":"sco","se":"2019-05-01T22%3A41%3A08Z","sp":"rwdlacup","sig":"EQC22tB%2BYpWB9LySIvLQ2gi5Vb0N%2B4PGx2ynDsnt3bY%3D","restype":"service","comp":"properties"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:ca1d2349-501e-0062-56a5-ffda80000000\nTime:2019-04-30T22:41:08.6544260Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ca1d2349-501e-0062-56a5-ffda80000000',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 30 Apr 2019 22:41:08 GMT',
  'Connection',
  'close' ]);


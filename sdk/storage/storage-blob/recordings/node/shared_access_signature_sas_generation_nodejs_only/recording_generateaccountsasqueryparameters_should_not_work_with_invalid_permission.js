let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-05-24T23:02:55.788Z"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2018-03-28","ss":"btqf","srt":"sco","se":"2019-05-25T23%3A02%3A55Z","sp":"wdlcup","sig":"lrvYqsNcwOLSE20heS5MqXJ3%2F2kT0disrh0Rx2%2F9s1M%3D","restype":"service","comp":"properties"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationPermissionMismatch</Code><Message>This request is not authorized to perform this operation using this permission.\nRequestId:27538939-701e-0031-6a84-12c68f000000\nTime:2019-05-24T23:02:55.8073504Z</Message></Error>", [ 'Content-Length',
  '279',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '27538939-701e-0031-6a84-12c68f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:02:55 GMT',
  'Connection',
  'close' ]);


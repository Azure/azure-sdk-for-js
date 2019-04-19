let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-04-19T03:51:43.324Z"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2018-03-28","ss":"btqf","srt":"sco","se":"2019-04-20T03%3A51%3A43Z","sp":"wdlcup","sig":"KYaZEm82B%2BTZvySN80PCaDfFah5%2FH6b47UC33SpukOA%3D","restype":"service","comp":"properties","timeout":"30"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationPermissionMismatch</Code><Message>This request is not authorized to perform this operation using this permission.\nRequestId:d9d8190a-4003-0010-4063-f6abbe000000\nTime:2019-04-19T03:51:43.7011595Z</Message></Error>", [ 'Content-Length',
  '279',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd9d8190a-4003-0010-4063-f6abbe000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 19 Apr 2019 03:51:42 GMT',
  'Connection',
  'close' ]);

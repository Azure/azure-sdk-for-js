let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-05-24T21:39:26.322Z"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2018-03-28","ss":"btqf","srt":"sco","se":"2019-05-25T21%3A39%3A26Z","sp":"wdlcup","sig":"Zg7pKkyPYkNPFkYia6bIQB2bIXz1tR4WnL0ZZgd7GWs%3D","restype":"service","comp":"properties"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationPermissionMismatch</Code><Message>This request is not authorized to perform this operation using this permission.\nRequestId:339433c5-901a-0056-1779-127528000000\nTime:2019-05-24T21:39:26.2903253Z</Message></Error>", [ 'Content-Length',
  '279',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '339433c5-901a-0056-1779-127528000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:39:25 GMT',
  'Connection',
  'close' ]);


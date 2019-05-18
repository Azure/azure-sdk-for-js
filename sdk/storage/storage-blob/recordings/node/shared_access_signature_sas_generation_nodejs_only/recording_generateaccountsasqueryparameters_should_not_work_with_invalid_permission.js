let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-04-30T22:41:07.871Z"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2018-03-28","ss":"btqf","srt":"sco","se":"2019-05-01T22%3A41%3A07Z","sp":"wdlcup","sig":"2WUBjPzuQWM98HbZl2wmZGXnARodz3pC843s1trR%2Bf8%3D","restype":"service","comp":"properties"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationPermissionMismatch</Code><Message>This request is not authorized to perform this operation using this permission.\nRequestId:1a0ca89f-501e-004b-0ca5-ffacc2000000\nTime:2019-04-30T22:41:08.2434635Z</Message></Error>", [ 'Content-Length',
  '279',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1a0ca89f-501e-004b-0ca5-ffacc2000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 30 Apr 2019 22:41:07 GMT',
  'Connection',
  'close' ]);


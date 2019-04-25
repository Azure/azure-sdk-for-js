let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-04-25T01:09:57.894Z"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2018-03-28","ss":"btqf","srt":"sco","se":"2019-04-26T01%3A09%3A57Z","sp":"wdlcup","sig":"wmzBFssHjVMKDU6jscacLrRbqevnwId%2Bk5Gf9U6YAHA%3D","restype":"service","comp":"properties"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationPermissionMismatch</Code><Message>This request is not authorized to perform this operation using this permission.\nRequestId:6e9d83c6-a01a-0077-4403-fb1819000000\nTime:2019-04-25T01:09:58.2765241Z</Message></Error>", [ 'Content-Length',
  '279',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6e9d83c6-a01a-0077-4403-fb1819000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Apr 2019 01:09:57 GMT',
  'Connection',
  'close' ]);

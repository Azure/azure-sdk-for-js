let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-04-25T01:09:58.764Z"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2016-05-31","ss":"btqf","srt":"co","spr":"https%2Chttp","se":"2019-04-26T01%3A09%3A58Z","sip":"0.0.0.0-255.255.255.255","sp":"rwdlacup","sig":"EtuB1o12kkMvF5OoFR%2FjpDp5K4OvZlhZ%2Bp%2F9d9%2Bal%2Bk%3D","restype":"service","comp":"properties"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationResourceTypeMismatch</Code><Message>This request is not authorized to perform this operation using this resource type.\nRequestId:1a2a1fc6-001a-0071-3303-fbef61000000\nTime:2019-04-25T01:09:59.1609729Z</Message></Error>", [ 'Content-Length',
  '284',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1a2a1fc6-001a-0071-3303-fbef61000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationResourceTypeMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Apr 2019 01:09:58 GMT',
  'Connection',
  'close' ]);

let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-05-24T21:39:27.024Z"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2016-05-31","ss":"btqf","srt":"co","spr":"https%2Chttp","se":"2019-05-25T21%3A39%3A27Z","sip":"0.0.0.0-255.255.255.255","sp":"rwdlacup","sig":"4jh9vn8ENgzV17FVWlR8zN%2BzcaQ5vExejI2NlocKURc%3D","restype":"service","comp":"properties"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationResourceTypeMismatch</Code><Message>This request is not authorized to perform this operation using this resource type.\nRequestId:761d2ac6-f01a-002b-1b79-12e9e0000000\nTime:2019-05-24T21:39:27.1143564Z</Message></Error>", [ 'Content-Length',
  '284',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '761d2ac6-f01a-002b-1b79-12e9e0000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationResourceTypeMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:39:26 GMT',
  'Connection',
  'close' ]);


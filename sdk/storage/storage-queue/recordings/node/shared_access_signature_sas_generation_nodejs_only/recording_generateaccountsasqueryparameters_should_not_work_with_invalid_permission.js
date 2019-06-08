let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-06-08T02:09:32.192Z"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2018-03-28","ss":"btqf","srt":"sco","se":"2019-06-09T02%3A09%3A32Z","sp":"wdlcup","sig":"AagTBBbKWGRBWv2g6O5Ie%2FHch%2BmHtOceVHOIgorahRM%3D","restype":"service","comp":"properties","timeout":"30"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationPermissionMismatch</Code><Message>This request is not authorized to perform this operation using this permission.\nRequestId:457d328a-2003-0000-1f9f-1d9d58000000\nTime:2019-06-08T02:09:32.1801275Z</Message></Error>", [ 'Content-Length',
  '279',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '457d328a-2003-0000-1f9f-1d9d58000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationPermissionMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 08 Jun 2019 02:09:31 GMT',
  'Connection',
  'close' ]);


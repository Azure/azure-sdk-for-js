let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-05-24T23:02:56.605Z"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2016-05-31","ss":"btqf","srt":"co","spr":"https%2Chttp","se":"2019-05-25T23%3A02%3A56Z","sip":"0.0.0.0-255.255.255.255","sp":"rwdlacup","sig":"J6dLYyVjvliq1GOadodqL2CMJ1%2B7t%2FE8hLhql42BB24%3D","restype":"service","comp":"properties"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationResourceTypeMismatch</Code><Message>This request is not authorized to perform this operation using this resource type.\nRequestId:ffd3559a-501e-0026-0e84-1206ec000000\nTime:2019-05-24T23:02:56.6304291Z</Message></Error>", [ 'Content-Length',
  '284',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ffd3559a-501e-0026-0e84-1206ec000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationResourceTypeMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 23:02:56 GMT',
  'Connection',
  'close' ]);


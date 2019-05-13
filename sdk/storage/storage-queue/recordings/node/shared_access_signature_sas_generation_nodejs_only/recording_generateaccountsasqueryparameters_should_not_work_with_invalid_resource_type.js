let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-04-22T21:00:14.914Z"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2016-05-31","ss":"btqf","srt":"co","spr":"https%2Chttp","se":"2019-04-23T21%3A00%3A14Z","sip":"0.0.0.0-255.255.255.255","sp":"rwdlacup","sig":"w%2BzVbPXqIHO%2BOpK1BpJgS1Y%2BVzLllGCaABlxgrxu%2FXg%3D","restype":"service","comp":"properties","timeout":"30"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationResourceTypeMismatch</Code><Message>This request is not authorized to perform this operation using this resource type.\nRequestId:08fe64c3-8003-0060-6a4e-f9d87a000000\nTime:2019-04-22T21:00:16.0027822Z</Message></Error>", [ 'Content-Length',
  '284',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '08fe64c3-8003-0060-6a4e-f9d87a000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationResourceTypeMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 21:00:15 GMT',
  'Connection',
  'close' ]);

let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-04-19T03:51:43.745Z"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2018-03-28","ss":"b","srt":"sco","se":"2019-04-20T03%3A51%3A43Z","sp":"rwdlacup","sig":"c8MeJI6fvx2EdK3DdcPmkM40LYlORHfczMn%2F%2BVwlF3E%3D","restype":"service","comp":"properties","timeout":"30"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:276300a0-b003-002c-3763-f61f65000000\nTime:2019-04-19T03:51:44.1216239Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '276300a0-b003-002c-3763-f61f65000000',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 19 Apr 2019 03:51:43 GMT',
  'Connection',
  'close' ]);

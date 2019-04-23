let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-04-22T21:00:14.439Z"}

nock('https://coolstorageaccount1234.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2018-03-28","ss":"b","srt":"sco","se":"2019-04-23T21%3A00%3A14Z","sp":"rwdlacup","sig":"%2BdR8ZBAJAsE81g%2FQkrLEleIUlxR5IeKYJdJ8SMaV0eg%3D","restype":"service","comp":"properties","timeout":"30"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:4d087b07-c003-0082-174e-f93c08000000\nTime:2019-04-22T21:00:14.8242943Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4d087b07-c003-0082-174e-f93c08000000',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 22 Apr 2019 21:00:13 GMT',
  'Connection',
  'close' ]);

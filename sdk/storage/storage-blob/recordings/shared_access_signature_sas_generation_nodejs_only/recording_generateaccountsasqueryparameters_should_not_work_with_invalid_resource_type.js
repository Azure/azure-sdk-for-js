let nock = require('nock');

module.exports.testInfo = {"tmr":"2019-04-30T22:41:08.685Z"}

nock('https://coolstorageaccount1234.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2016-05-31","ss":"btqf","srt":"co","spr":"https%2Chttp","se":"2019-05-01T22%3A41%3A08Z","sip":"0.0.0.0-255.255.255.255","sp":"rwdlacup","sig":"jCtiPyOzgBqejGLQDuwWngipn0yOz%2BFoHOqafUdO9aE%3D","restype":"service","comp":"properties"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationResourceTypeMismatch</Code><Message>This request is not authorized to perform this operation using this resource type.\nRequestId:26a1987c-c01e-0089-0da5-ff247c000000\nTime:2019-04-30T22:41:09.0607981Z</Message></Error>", [ 'Content-Length',
  '284',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26a1987c-c01e-0089-0da5-ff247c000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'AuthorizationResourceTypeMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 30 Apr 2019 22:41:08 GMT',
  'Connection',
  'close' ]);


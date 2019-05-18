let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-04-25T01:09:58.336Z"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2018-03-28","ss":"btq","srt":"sco","se":"2019-04-26T01%3A09%3A58Z","sp":"rwdlacup","sig":"7tWDomJyxFzoGwgWB3XFw4s4rVLn5ESeetucZ0f5eAg%3D","restype":"service","comp":"properties"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:b63f7e6f-201a-004f-5a03-fb5940000000\nTime:2019-04-25T01:09:58.7213241Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b63f7e6f-201a-004f-5a03-fb5940000000',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 25 Apr 2019 01:09:58 GMT',
  'Connection',
  'close' ]);

let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-05-24T21:39:26.675Z"}

nock('https://coolstorageaccount1234.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query({"sv":"2018-03-28","ss":"btq","srt":"sco","se":"2019-05-25T21%3A39%3A26Z","sp":"rwdlacup","sig":"YXoDpshYssRYtBWwGfouvoVyRRB2dQEuttAu23rcvWY%3D","restype":"service","comp":"properties"})
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthorizationServiceMismatch</Code><Message>This request is not authorized to perform this operation using this service.\nRequestId:a5f228e7-501a-0004-7379-1268da000000\nTime:2019-05-24T21:39:26.6403745Z</Message></Error>", [ 'Content-Length',
  '273',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a5f228e7-501a-0004-7379-1268da000000',
  'x-ms-error-code',
  'AuthorizationServiceMismatch',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 24 May 2019 21:39:26 GMT',
  'Connection',
  'close' ]);


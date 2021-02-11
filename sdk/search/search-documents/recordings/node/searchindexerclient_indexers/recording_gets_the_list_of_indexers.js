let nock = require('nock');

module.exports.hash = "01e8c11583d0a837e9d7fd4bbe4307ad";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97d7cd47a38f2eb3729d7ff4e87b1634b5b920b8bfef473bef0e9e1e3c39fdf4f8e0c1e9d393fb9fdefb7d3fa2f6cb6c41cd3f5a5c6f673f58d7f9b682dadea5ef667933ad8b555b544b6af2d4fd959e5775fa3a5bacca3c3d9317d09cba7b5dadeb69fec202c567db0d7fc8209bb7455936792b2d96ebb21c7dd466f545de321cf9f8a379d5e6e576595ce6dba0c31ebd382b9a6c52e6b38f1e9d670480204de7f96c5d527381b2ca6a7ab9cd890afac9799197b32fb2d5aa585ed087dffbfee8a36addaed6edb3fe17f9725a5ff3d87eaffc5a00fc92d1261a1e3c38797af0f474230d19efdc528d9afcbca3e1f77fc9ff03d859b385e4020000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '003bdf82-062f-45cb-ab97-876ec5a1ef2d',
  'elapsed-time',
  '18',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 22 Jan 2021 00:13:23 GMT',
  'Content-Length',
  '423'
]);

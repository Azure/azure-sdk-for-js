let nock = require('nock');

module.exports.hash = "34b91299ac351ae512f26f62ce6221d3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df2ac9ece67d5b499bd1dcb1fe3ab6239abae9af1326feffe6e8bbccdf0ee8fe39fa65ad7d3bcf968f4d16556aef38f1e7dcf82a6661704f7f7fd68e7ddc1d3837b4f9f9e9c1c3cdddf7f7272eff7fd88da2fb30535ff6871bd8dd6db02687b97be99e5cdb42e566d512d3f7ab45c97e5e8a3f67a85c6d3aa5954cd6c428d9af5443e9406d33a9fe5cbb6c8cae6a347bf981a2e97f914105eb775b1243cd0ec97503b1a6f562cf31aad148579d5e6f4dae8a35fb4ceeb6bdb14689dccb3e545fe346f05d8cbaa2ca6da421a3ccdcb1cdf0c34c997d3fa9a47f27be5fae12f196da4d0e9c9e9dec9d30d14daa36f7e5e53e8d983ddd3073b1b28748fbef9f94ca1873bbb3b4f9e6da2d03e7df3f39b42a7f7ef3f3cde40a1fbf4cdcf570add7b70fae4f4e0f4e1f1ce814fa13acfcabc69b336df5e37db4db65895397d1b50e9a3e7d534c3af2900a7abbaba2c66f92c9d5ca7abbc5e144d83efaaf3f4f72262a427d57ad95e3f4a617ac8f25c5d5ddd1fbfa52fa6fcf9f8a2babc7b513480b4aaea362bef8ed32fdb795e0bf0a249eb8cecd2a2bc4e2f72222561364be993b49957eb72962eab369de42991ba21246862e8cb3423ea5ce66959342df534a601c8f47d94fd605de7cd2f2ae9936f704e9f4b3fcdef7ffff7fafd316619f2efffdd63eae68733cddfff25ff0ff3038067ed070000"], [ 'Cache-Control',
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
  '6824b93b-2e78-43e3-afd6-eb717610dbc5',
  'elapsed-time',
  '76',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:56:25 GMT',
  'Content-Length',
  '635' ]);

let nock = require('nock');

module.exports.hash = "68c8ed3f66fdf0e30a74bfedc8b60274";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde361f8d3ebaccca75fed1a3ef59d8d4e88200ffbe1fedbc3b787a70b0f3f0c9debd27a77bc7f7767fdf8fa8fd325b50f38f16d7dbd90fd6753e29abc9b681b7bd4b0d667933ad8b555b544b6af75abf4afd8f471fc91b7eb7edf50a707ffc8b625a574d75de8ee5d5f11b1ae8f874d916edf5ab7c5a5d2c0bc0e02f0990a2f3e3bd9e97ebb21c7de4087577564dd78b7cd952c369d6e617555de4c0e0a39779ddd01ba38f7e629d7137f4eb97f545b62c7e9031acd1475fbd7a4eff9e2eb2027d3eaf08807cf19420bd290885efa3fbf36c5db6cfb3e5c53abbc84faa1930cbd16c512c8bc57af1b2cea745833715bd62392dd7b3fc0d8dbdcc9b8647c95899af576b9a245049c7c98321f255eb7a8abfeda8ee2ef2fa229ffdfe3c601ea4b439c1dff44e17e2f77fc9c8022d7d8ccd8bf4b9036e5ad86f87c11221aa75ab7fda2e564c63f05b9b119eed0bf371b52af38f7c5c94b6bda6ee8b5fc29d28275ce6aff3fab2983aa2bd5d5657653ebbc85fb7554d6fcaa7f9725a5f336bfc5ef9b57c885e95f9623c7f727a6fefc9bd9b797e8f1a049cf7239eff11cf03d4ff2b79fefbbfe4ff016d478dc745060000"], [ 'Cache-Control',
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
  'd965c116-ae50-4429-adb1-9fb23c8814b0',
  'elapsed-time',
  '64',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:25:14 GMT',
  'Content-Length',
  '605' ]);

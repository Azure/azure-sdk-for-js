let nock = require('nock');

module.exports.hash = "2e6a34916f081d81a9c04a248096cd0f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e66d51964dde361f8d3ebaccca75fed1a3ef59d8d4e88200ffbe1fedbc3b787a70efe9e9c9f1c1c3d3d3e3674f7fdf8fa8fd325b50f38f16d7dbd90fd6753e29abc9b681b7bd4b0d667933ad8b555b544b6af75abf4afd8f471fc91b7eb7edf50a707ffc8b625a574d75de8ee5d5f11b1ae8f874d916edf5ab7c5a5d2c0bc0e02f0990a2f3e3bd9e97ebb21c7de4087577564dd78b7cd952c369d6e617555de4c0e0a39779ddd01ba38f7e629d7137f4eb97f545b62c7e9031acd1475fbd7a4eff9e2eb2027d3eaf08807cf19420bd290885efa3fbf36c5db6cfb3e5c53abbc84faa1930cbd16c512c8bc57af1b2cea745833715bd62392dd7b3fc0d8dbdcc9b8647c95899af576b9a245049c7c98321f255eb7a8abfeda8ee2ef2fa229ffdfe3c601ea4b439c1dff44e17e2f77fc9c8022d7d8ccd8bf4b9036e5ad86f87c11221aa75ab7fda2e564c63f05b9b119eed0bf371b52af38f3c5c2a8ff0bde6e197de5ba5ce48ef0df7c52f61d4947f2ef3d7797d594c1da9df2eabab329f5de4afdbaaa637e5d37c39adaf99a17eaffc5a3e44afcab23149397e78faf0c1e9cd92b2470d027efd91a4fc485200eae78da43cb97fffe9bd5b48ca3d6a10f0eb8f24e5479202503f6f24e56487acca2d24659f1a04fcfa2349f991a400d4cf1f497976bcf3e41692729f1a04fcfa2349f991a400d4ad25c5b176a7a9fbe21be3f9efff92ff07d4ce7193f90f0000"], [ 'Cache-Control',
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
  '0b178648-3c70-4ec2-bae4-55f94619e218',
  'elapsed-time',
  '109',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:50:02 GMT',
  'Content-Length',
  '693' ]);

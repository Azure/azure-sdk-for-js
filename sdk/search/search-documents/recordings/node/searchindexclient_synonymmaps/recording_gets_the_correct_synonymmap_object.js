let nock = require('nock');

module.exports.hash = "6e1ed0bbc1e01b8472e3a2bb5b7f7e6f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27my-azure-synonymmap-1%27)')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195efff1e67a592daf178b6cd5dcfdddf2655bb4d71f8d0c6c6a7441807fdf8f76de1d3c3df8746fffc1c183dda73b4ff79efcbe1f51ab65b6c8e9ebc5f576f683759d6f3b58dbbbf4f579552f3220d654654d7febd70d7df2d5b268f359fabacd08d9511afc9956e7e9f122af8b69967e76947ef5faf8f75d7e376be6c5f2a2ad96a314bf8ff1cd778f0968be9cd6d7abb6a896bf577efdd1a3e5ba2c7fc9ff0343a479331c010000"], [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'ETag',
  'W/"0x8D86247871D0D2B"',
  'Vary',
  'Accept-Encoding',
  'request-id',
  '411474be-0a06-441c-a9d6-c1640f298e53',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Sat, 26 Sep 2020 18:11:05 GMT',
  'Content-Length',
  '334' ]);

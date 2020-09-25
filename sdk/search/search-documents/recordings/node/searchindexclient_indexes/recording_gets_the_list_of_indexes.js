let nock = require('nock');

module.exports.hash = "29cf1d2b57f14fb8bece8e651e4b3b90";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef147bf6735cbda6c3cad966dfeaefde8d147f3b65d358feede6df3a66df2ac9ecea759933763f97d7c552c67d555335ee6eddddf6d91b7195eff71fa307f97371f8d3ebaccca75fed1a3ef59c8d4e482c0febe1fedbc3b787af0e9eede93277bcfeeefdc3f79f0fb7e44ed97d9829a7f34afdabcdc2e8bcb7c1b1ddfa36f66f979b62edbd7d3aa2e96172febeabc28a9e9725d96a38fce8bbc9c35dc8f422866f44e7bbdc2efa7b3c5f8758bd7e833413c9be0e5f3ac6c72bc5db6791d7c54e7d43ebf94cfda7a4d1f3555ddcadfdae63c9bd268fc4fdee6d7a63593e0789995d73fc86b83a6f4ddfd34ebfcdd5c2fabe5f5e28b6c85117dff978ceca0b2abbca916f9326f9ae7f9655ed270bc213eadd640860070370166fe1005c18d2394bfbd01ca073c3e85f8b332c059de4ceb62d516d592c6e18d2d3a7d82943f34c56de3d8b48d3738fde48730ba362b4a888537b2936ab12af3776ff00961d563649217ef8d93aa2cf329e8b38597852c77e87bc14dc62323f6e9229fbc2759a4c5cf12557cbacc8bd92c5f7e372f2ee62d0d45878af19d2ddb7b7bf491f42168292efef0f4a3607cfad9a601ea273f5b23a48f0265c51f8f3ea2cf9a2f99c5e9037d757d71416a2eafe9133431a0f5cfb67a9b2f8bcedfcf78fcfa09d1a60e3ec897d3fa9a3bf9bd303aeda658146556172d7d6215b252fbc7bf28a675d554e7edf8f807eb3a1fbfe6418f9f7cb177ffb57b8fa8b56bc04de4975ff24bbeff4bfe1f36a8dbde39060000"], [ 'Cache-Control',
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
  '950e6e5b-82b6-4f81-8b5b-2e97faa0ac26',
  'elapsed-time',
  '65',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:19:20 GMT',
  'Content-Length',
  '662' ]);

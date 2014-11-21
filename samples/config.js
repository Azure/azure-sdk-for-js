var fs = require('fs');

exports.connection = {
    endpoint: 'https://ryancrawcour.documents.azure.com:443/',
    authKey: 'NC4KZ6Lh5/wukMHMunWlFx6qWfjwMV1MIODmu4WfvL9smr1aT05wT2nD/w4+CKY49ljXHmNK6x8+ejMK3k64SQ=='
};

exports.names = {
	database: 'NodeSamples',
	collection: 'Families',
};

exports.documentDefinitions = function () {
    var data = fs.readFileSync('../Data.json');
    return JSON.parse(data).Families;
};
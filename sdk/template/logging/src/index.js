const azi = require('@azure/identity');
const logger = require('@azure/logger');
logger.setLogLevel('verbose');


var creds = new azi.ManagedIdentityCredential();
var tokenP = creds.getToken('https://vault.azure.net');
tokenP.then(v => {
    console.log('got token', v);
}).catch(e => {
    console.error(e);
})
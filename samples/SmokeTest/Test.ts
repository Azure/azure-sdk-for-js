import { SecretsClient } from "@azure/keyvault-secrets";
import { EnvironmentCredential } from "@azure/identity";
import { EventHubClient } from "@azure/event-hubs";
var assert = require('assert');

describe('KEY VAULT', function() {
    const credential = new EnvironmentCredential();
    const url = process.env["AZURE_PROJECT_URL"];

    if(url === undefined){
        assert.fail('The connection string is undefined');
        return;
    }
    const client = new SecretsClient(url,credential);

    const secretName = "MySecretName";
    const secretValue = "MySecretValue";

    describe('Set a secret', function() {
        it('Should create a new secret.', async function() {
            const result = await client.setSecret(secretName, secretValue);
        });
    });

    describe('Get that secret', function() {
        it('Should get the secret previusly created..', async function() {
            const getResult = await client.getSecret(secretName);
            assert.equal(getResult.name,secretName);
            assert.equal(getResult.value, secretValue);
        });
    });

    describe('Delete the secret previously created', function() {
        it('Should delete the secret.', async function() {
            await client.deleteSecret(secretName);
        });
    });
});

describe('EVENT HUBS', function() {
    describe('Send and Receive a batch of events', function(){
        var client:EventHubClient;
        var partitionId:string[];
        
        it('Should create a client', async function() {
            const eventHubName = "myeventhub";
            const eventHubConnectionString = process.env["EVENT_HUBS_CONNECTION_STRING"];

            if(eventHubConnectionString === undefined) {
                assert.fail('The connection string is undefined');
                return;
            }

            client = EventHubClient.createFromConnectionString(eventHubConnectionString,eventHubName);
        });

        it('Should get the first partition id', async function(){
            partitionId = await client.getPartitionIds();
        })

        it('Should send a batch of events', async function(){
            await client.sendBatch(
                [
                    { body: "JS Event Test 1" },
                    { body: "JS Event Test 2" },
                    { body: "JS Event Test 3" }
                ], partitionId[0]
                );
                var closed = client.close();
        });

        it('Should receive a batch of events', async function(){
            const myEvents = await client.receiveBatch(partitionId[0],5000,10);
            var closed = client.close();
        });
    });
});
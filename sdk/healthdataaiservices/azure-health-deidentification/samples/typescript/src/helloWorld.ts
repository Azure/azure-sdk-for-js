import createClient, {
  DeidentificationContent,
  DeidentificationResultOutput,
} from '@azure-rest/azure-health-deidentification';
import { DefaultAzureCredential } from '@azure/identity';

const credential = new DefaultAzureCredential();
const serviceEndpoint = 'https://example.api.cac001.deid.azure.com';
const client = createClient(serviceEndpoint, credential);

const content: DeidentificationContent = {
  dataType: 'Plaintext',
  inputText: 'Hello John!',
  operation: 'Surrogate',
};

const response = await client.path('/deid').post({ body: content });

console.log((response.body as DeidentificationResultOutput).outputText); // Hello, Tom!

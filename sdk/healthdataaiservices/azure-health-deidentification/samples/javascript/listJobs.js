import createClient, {paginate} from '@azure-rest/azure-health-deidentification';
import { DefaultAzureCredential } from '@azure/identity';

const credential = new DefaultAzureCredential();
const serviceEndpoint = 'https://example.api.cac001.deid.azure.com';
const client = createClient(serviceEndpoint, credential);

const jobs = await client.path("/jobs").get();
const items = [];
const iter = paginate(client, jobs);
for await (const item of iter) {
  items.push(item);
}

console.log(items); //items will contain all the jobs

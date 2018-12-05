import { Namespace, SubscriptionClient } from "../../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const topic = process.env.TOPIC_NAME || "";
const subscriptionDefaultFilter = process.env.SUBSCRIPTION_NAME_DEFAULT_FILTER || "";
const subscriptionSqlFilter = process.env.SUBSCRIPTION_NAME_SQL_FILTER || "";
const subscriptionCorrelationFilter = process.env.SUBSCRIPTION_NAME_CORRELATION_FILTER || "";

let ns: Namespace;

async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);

  const subscriptionClientNoFilter = ns.createSubscriptionClient(topic, subscriptionDefaultFilter);
  await getRules(subscriptionClientNoFilter);

  const subscriptionClientSqlFilter = ns.createSubscriptionClient(topic, subscriptionSqlFilter);
  await getRules(subscriptionClientSqlFilter);

  const subscriptionClientCorrelationFilter = ns.createSubscriptionClient(topic, subscriptionCorrelationFilter);
  await getRules(subscriptionClientCorrelationFilter);

  await subscriptionClientNoFilter.close();
  await subscriptionClientSqlFilter.close();
  await subscriptionClientCorrelationFilter.close();

}

async function getRules(client: SubscriptionClient): Promise<void> {
  const rules = await client.getRules();
  console.log(`${rules.length} rules found for ${client.name}`);

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    console.log(`Rule Name: ${rule.name}`);
    console.log(`Filter: ${JSON.stringify(rule.filter)}`);
    if (rule.action) {
      console.log(`Action: ${JSON.stringify(rule.action)}`);
    }
  }
}


main().then(() => {
  console.log(">>>> Calling close....");
  return ns.close();
}).catch((err) => {
  console.log("error: ", err);
  return ns.close();
});

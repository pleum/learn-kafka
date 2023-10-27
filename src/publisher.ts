import process from "process";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "app-publisher",
  brokers: ["localhost:29092"],
});

const producer = kafka.producer();

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));
app.get("/publish", async (c) => {
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello KafkaJS user!" }],
  });

  return c.text("Published");
});

async function main() {
  await producer.connect();

  try {
    serve({
      fetch: app.fetch,
      port: 3000,
    });
  } catch (err) {
    console.error(err);
  }
}

main().catch((err) => {
  console.error(err);
});

function gracefulShutdown() {
  producer.disconnect();
}

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

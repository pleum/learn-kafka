import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "app-consumer",
  brokers: ["localhost:29092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

async function main() {
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
}

main().catch((err) => {
  console.error(err);
});

# learn-kafka


```
-- start kafka broker
docker-compose up -d

-- start publisher and consumer
pnpm i
pnpm start:publisher
pnpm start:consumer

-- publish message
curl http://localhost:3000/publish

-- stop kafka broker
docker-compose down
```
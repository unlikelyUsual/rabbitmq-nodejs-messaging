## Rabbit MQ Intergration Setup

# Run rabbit mq docker image
- Start rabbit mq on port 5672
- Open management tool on localhost:15672
- 
```shell
docker run -d --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.11-management
```

# Run express server

```shell
npm run dev
```

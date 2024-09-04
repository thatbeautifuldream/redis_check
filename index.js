require("dotenv").config();

const redis = require("redis");
function main() {
  console.log("main fn starts here ========================");
  // Replace the following values with your ElastiCache configuration details
  const host = process.env.HOST;
  const port = process.env.PORT; // Default Redis port

  // Create the Redis client
  const redisClient = redis.createClient({ host, port });
  console.log("after redis client ========================");

  redisClient.on("connect", () => {
    console.log("Connected to Redis12345");
  });

  redisClient.on("error", (err) => {
    console.log(err.message);
  });
  console.log("after redis error ========================");

  redisClient.on("ready", () => {
    console.log("Redis is ready");
  });
  console.log("after redis ready ========================");

  redisClient.on("end", () => {
    console.log("Redis connection ended");
  });
  console.log("after redis end ========================");

  process.on("SIGINT", () => {
    redisClient.quit();
  });
  console.log("after redis sigint ========================");

  redisClient
    .connect()
    .then(async () => {
      console.log("Connected to Redis");
      // await redisClient.set('key', 'value23');
      const value = await redisClient.get("key");
      console.log(value);
      console.log("after redis get ========================");
    })
    .catch((err) => {
      console.log("after redis error catch ========================");
      console.log("ERROR : ", err.message);
    });
}
main();

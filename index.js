require("dotenv").config();

const redis = require("redis");
function main() {
  console.log(process.env.HOST);
  console.log(process.env.PORT);
  // Replace the following values with your ElastiCache configuration details
  const host = process.env.HOST;
  const port = process.env.PORT; // Default Redis port

  // Create the Redis client
  const redisClient = redis.createClient({
    url: `redis://${host}:${port}`,
  });

  redisClient.on("connect", () => {
    console.log("Connected to Redis12345");
  });

  redisClient.on("error", (err) => {
    console.log(err.message);
  });

  redisClient.on("ready", () => {
    console.log("Redis is ready");
  });

  redisClient.on("end", () => {
    console.log("Redis connection ended");
  });

  process.on("SIGINT", () => {
    redisClient.quit();
  });

  redisClient
    .connect()
    .then(async () => {
      console.log("Connected to Redis");
      await redisClient.set("key2", "milind");
      const value = await redisClient.get("key2");
      console.log({ value });
    })
    .catch((err) => {
      console.log(err.message);
    });
}
main();

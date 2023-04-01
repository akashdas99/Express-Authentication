const redis = require("redis");

const client = redis.createClient({
  url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_URI}:${process.env.REDIS_PORT}`,
});

client.on("connect", () => console.log("Client connected to redis"));
client.on("ready", () =>
  console.log("Client connected to redis and ready to use")
);
client.on("error", (error) => console.log(error.message));
client.on("end", () => console.log("Client disconnected from redis"));

process.on("SIGINT", () => client.quit());
(async () => {
  await client.connect();
})();
module.exports = client;

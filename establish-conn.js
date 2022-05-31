const { Client } = require("pg");

// The export handler will run every time the event is triggered
exports.handler = async(ev, ctx) => {
  const { route } = ctx;
  const { CONN_STRING } = ctx.env;

  const client = new Client({
    connectionString: CONN_STRING,
    ssl: {
        rejectUnauthorized: false,
    },
  });
  await client.connect();
  ev.client = client;

  // Route event data to corresponding output port
  route(ev, ev.method.toLowerCase());
};

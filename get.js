// The export handler will run every time the event is triggered
exports.handler = async(ev, ctx) => {
    const { emit } = ctx;
  
    const { rows } = await ev.client.query("SELECT * FROM products WHERE name = $1", [ev.body.name]);
    await ev.client.end();
    emit("response", { statusCode: 200, body: rows });
  };

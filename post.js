// The export handler will run every time the event is triggered
exports.handler = async(ev, ctx) => {
    const { emit } = ctx;

    const { rows } = await ev.client.query(
        "INSERT INTO products(name, quantity) VALUES($1, $2) RETURNING *",
        [ev.body.name, ev.body.quantity]
    );
    await ev.client.end();
    emit("response", { statusCode: 200, body: rows[0] });
};

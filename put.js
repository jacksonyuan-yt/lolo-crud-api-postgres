// The export handler will run every time the event is triggered
exports.handler = async(ev, ctx) => {
    const { emit } = ctx;

    const { rows } = await ev.client.query(`
        UPDATE products
        SET name = $2,
            quantity = $3
        WHERE name = $1
        RETURNING *
        `,
        [ev.body.name, ev.body.newName, ev.body.newQuantity]
    );
    await ev.client.end();
    emit("response", { statusCode: 200, body: rows[0] });
};

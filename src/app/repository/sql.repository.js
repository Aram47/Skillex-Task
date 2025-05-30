import { getConnection } from "../config/db.conf.js";

export default class SqlRepository {
	constructor() {
		this.connection = getConnection();
	}

	saveCombinations = async (flatItems, combinations) => {
		const conn = this.connection;

		const itemMap = new Map();
		let combination_id;
		let comboRecordId;

		try {
			await conn.beginTransaction();

			for (const name of flatItems) {
				const [rows] = await conn.execute(
					'INSERT INTO items (name) VALUES (?) ON DUPLICATE KEY UPDATE name=name',
					[name]
				);

				if (rows.insertId) {
					itemMap.set(name, rows.insertId);
				} else {
					const [[item]] = await conn.execute('SELECT id FROM items WHERE name = ?', [name]);
					itemMap.set(name, item.id);
				}
			}

			const [[{ maxId }]] = await conn.execute('SELECT MAX(combination_id) AS maxId FROM combinations');
			combination_id = (maxId || 0) + 1;

			const [comboRow] = await conn.execute(
				'INSERT INTO combinations (combination_id) VALUES (?)',
				[combination_id]
			);
			comboRecordId = comboRow.insertId;

			for (const combo of combinations) {
				for (const itemName of combo) {
					const itemId = itemMap.get(itemName);
					await conn.execute(
						'INSERT INTO combination_items (combination_id, item_id) VALUES (?, ?)',
						[comboRecordId, itemId]
					);
				}
			}

			await conn.execute(
				'INSERT INTO responses (combination_id, response_json) VALUES (?, ?)',
				[combination_id, JSON.stringify(combinations)]
			);

			await conn.commit();
			return {
				id: combination_id,
				combination: combinations
			};
		} catch (err) {
			await conn.rollback();
			throw err;
		}
	};
}
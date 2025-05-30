import SqlRepository from '../../app/repository/sql.repository.js';
import generateValidCombinations from '../../app/service/comb.generator.js';

export default class GeneratorService {
	constructor() {
		this.sqlRepository = new SqlRepository();
	}
	
	generator = async ({ items, length }) => {
		const { combinations, flatItems } = generateValidCombinations(items, length);

		const result = await this.sqlRepository.saveCombinations(flatItems, combinations);

		return result;
	}
}
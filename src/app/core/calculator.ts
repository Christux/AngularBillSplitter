import { Person } from "./person";
import { TransactionMatrix } from "./transactionMatrix";
import { Coordinate } from "./coordinate";
import { Iterator } from './iterator';
import { CoordinateIterator, CoordinateIteratorRandomized } from "./coordinateIterator";

export class Calculator {

	constructor(
		private persons: Person[]
	) { }

	getNumberOfPersons(): number {
		return this.persons.length;
	}

	getTotalCost(): number {
		let total = 0;
		this.persons.forEach(p => total += p.cost);
		return total;
	}

	getNumberOfParts(): number {
		let n = 0;
		this.persons.forEach(p => n += p.nPart);
		return n;
	}

	getPartValue(): number {
		return this.getTotalCost() / this.getNumberOfParts();
	}

	getDebts(): number[] {
		const partValue = this.getPartValue();
		return this.persons.map(p => partValue * p.nPart - p.cost);
	}

	verify(transactions: TransactionMatrix): boolean {

		const ok: boolean[] = [];
		const part = this.getPartValue();
		const n = this.getNumberOfPersons();
		const costs = this.persons.map(o => o.cost);
		const np = this.persons.map(o => o.nPart);

		for (let i = 0; i < n; i++) {

			const total = costs[i] + transactions.getRow(i).sum() - transactions.getColumn(i).sum();
			ok[i] = this.isEqual(total, part * np[i], 1e-2);
		}

		return ok.filter(o => o).length === n;
	}

	isEqual(a: number, b: number, precision: number) {
		return Math.abs(a - b) / Math.abs(a) < precision;
	}

	private computeTransactionMatrix(iterator: Iterator<Coordinate>): TransactionMatrix {

		const n = this.getNumberOfPersons();
		const transactions = new TransactionMatrix(n);
		const debts = this.getDebts();

		while (iterator.hasNext()) {

			const coord = iterator.next();
			const [i, j] = [coord.i, coord.j];

			if (j !== i) {

				const debtI = debts[i] - transactions.getRow(i).sum() + transactions.getColumn(i).sum();
				const debtJ = debts[j] - transactions.getRow(j).sum() + transactions.getColumn(j).sum();

				if (debtI === 0 || debtJ === 0) {
					// Do nothing
				}
				else {
					if (Math.sign(debtI) === Math.sign(debtJ)) {
						// Do nothing
					}
					else {
						const t = Math.sign(debtI) * Math.min(Math.abs(debtI), Math.abs(debtJ));
						transactions.setElement(i, j, t);
					}
				}
			}
		}
		return transactions;
	}

	compute(): TransactionMatrix {
		const n = this.getNumberOfPersons();
		return this.computeTransactionMatrix(new CoordinateIterator(n, n));
	}

	optimize(): TransactionMatrix {

		const n = this.getNumberOfPersons();
		const loops = 10 * n * Math.floor(Math.log(n) + 1);
		let solution = this.computeTransactionMatrix(new CoordinateIterator(n, n));

		for (let i = 0; i < loops; i++) {

			const solus = this.computeTransactionMatrix(new CoordinateIteratorRandomized(n, n));

			if (solus.numberNonZero() < solution.numberNonZero()) {
				solution = solus;
			}
		}
		return solution;
	}

	repport(transactions: TransactionMatrix): string[] {

		const n = this.getNumberOfPersons();
		const names: string[] = this.persons.map(o => o.name);
		const result: string[] = [];

		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {

				const trans = transactions.getElement(i, j);

				if (trans !== 0) {

					if (trans > 0) {
						result.push(`${names[i]} should give ${trans.toFixed(2)} to ${names[j]}.`);
					}
					else {
						result.push(`${names[j]} should give ${(-1 * trans).toFixed(2)} to ${names[i]}.`);
					}
				}
			}
		}
		return result;
	}
}

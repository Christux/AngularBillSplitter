import { Coordinate } from "./coordinate";
import { Iterator } from './iterator';

export class CoordinateIterator implements Iterator<Coordinate> {

	idx = 0;
	l: number;
	coordinates: Coordinate[] = [];

	constructor(m: number, n: number) {

		for (let i = 0; i < m; i++) {
			for (let j = 0; j < n; j++) {
				this.coordinates.push({ i: i, j: j });
			}
		}
		this.l = this.coordinates.length;
	}

	hasNext() {
		return this.idx < this.l;
	}

	next(): Coordinate {
		return this.coordinates[this.idx++];
	}
}

export class CoordinateIteratorRandomized extends CoordinateIterator {

	constructor(m: number, n: number) {
		super(m, n);
		this.shuffleArray();
	}

	shuffleArray() {
		for (let i = this.l - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.coordinates[i], this.coordinates[j]] = [this.coordinates[j], this.coordinates[i]];
		}
	}
}

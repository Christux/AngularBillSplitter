export class Matrix {

	constructor(
		protected m: number,
		protected n: number,
		protected di = n,
		protected dj = 1,
		protected o = 0,
		protected T?: number[]
	) {
		if (this.T == null) {
			this.T = new Array(this.m * this.n).fill(0);
		}
	}

	getElement(i: number, j: number): number {

		if (i < 0 || j < 0 || i >= this.m || j >= this.n) {
			throw new Error('Matrix indexes exeded');
		}

		return this._getElement(i, j);
	}

	setElement(i: number, j: number, value: number) {

		if (i < 0 || j < 0 || i >= this.m || j >= this.n) {
			throw new Error('Matrix indexes exeded');
		}

		this._setElement(i, j, value);
	}

	private _getElement(i: number, j: number): number {
		return this.T[i * this.di + j * this.dj + this.o];
	}

	private _setElement(i: number, j: number, value: number) {
		this.T[i * this.di + j * this.dj + this.o] = value;
	}

	setAllElements(value: number) {
		this.forEachElement((_, i, j) => this._setElement(i, j, value));
	}

	forEachElement(callback: { (value: number, i?: number, j?: number): void }) {
		for (let i = 0; i < this.m; i++) {
			for (let j = 0; j < this.n; j++) {
				callback(this._getElement(i, j), i, j);
			}
		}
	}

	print() {
		for (let i = 0; i < this.m; i++) {
			let row = '';
			this.getRow(i).forEachElement(value => row += value + ' ');
			console.log(row);
		}
	}

	getRow(i: number) {
		return new RowVector(this.n, this.di, this.dj, this.o + this.n * i, this.T);
	}

	getColumn(j: number) {
		return new ColumnVector(this.m, this.di, this.dj, this.o + j, this.T);
	}

	sum(): number {
		let sum = 0;
		this.forEachElement(value => sum += value);
		return sum;
	}

	norm2(): number {
		let norm = 0;
		this.forEachElement(value => norm += value * value);
		return Math.sqrt(norm);
	}

	numberNonZero(): number {
		let n = 0;
		this.forEachElement(value => n += value !== 0 ? 1 : 0);
		return n;
	}
}

export class SquareMatrix extends Matrix {

	constructor(m: number) {
		super(m, m);
	}
}

export class RowVector extends Matrix {

	constructor(
		n: number,
		di = n,
		dj = 1,
		o?: number,
		T?: number[]
	) {
		super(1, n, di, dj, o, T);
	}
}

export class ColumnVector extends Matrix {

	constructor(
		m: number,
		di = 1,
		dj = m,
		o?: number,
		T?: number[]
	) {
		super(m, 1, di, dj, o, T);
	}
}

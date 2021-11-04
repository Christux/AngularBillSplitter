import { Iterator } from './iterator';

export class IndexIterator implements Iterator<number> {

	private idx = 0;

	hasNext() {
		return true;
	}

	next(): number {
		return this.idx++;
	}

}

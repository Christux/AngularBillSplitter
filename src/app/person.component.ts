import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { flatMap } from 'rxjs/operators';
import { Person } from './core/person';
import { empty, of, Observable, Subject } from 'rxjs';

@Component({
	selector: 'app-person',
	templateUrl: './person.component.html',
	styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

	@Input() person: Person;
	@Input() partValue$: Subject<number>;
	@Output() changePerson = new EventEmitter<Person>();
	@Output() deletePerson = new EventEmitter<Person>();

	nameFormControl = new FormControl('', [Validators.required]);
	costFormControl = new FormControl('', [Validators.required]);
	partFormControl = new FormControl('', [Validators.required]);
	debtFormControl = new FormControl({value: '0', disabled: true});

	ngOnInit() {
		this.nameFormControl.setValue(this.person.name);
		this.costFormControl.setValue(this.person.cost);
		this.partFormControl.setValue(this.person.nPart);

		this.nameFormControl.valueChanges.subscribe(name => {
			this.person.name = name;
			this.sendPerson();
		});

		this.costFormControl.valueChanges.subscribe(cost => {
			this.person.cost = cost;
			this.sendPerson();
		});

		this.partFormControl.valueChanges.subscribe(n => {
			this.person.nPart = n;
			this.sendPerson();
		});

		this.partValue$.subscribe(value => {
			const debt = value * this.person.nPart - this.person.cost;
			this.debtFormControl.setValue(debt.toFixed(2));
		});
	}

	sendPerson() {
		this.changePerson.emit(this.person);
	}

	delete() {
		this.deletePerson.emit(this.person);
	}

}

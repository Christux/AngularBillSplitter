import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Person } from './core/person';
import { IndexIterator } from './core/indexIterator';
import { Calculator } from './core/calculator';
import { Subject } from 'rxjs';
import { ClippyService } from 'js-clippy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  persons: Person[] = PersonList; //[];
  private indexIterator = new IndexIterator();
  private calculator =  new Calculator(this.persons);
  computationResult: string[] = [];
  partValue$ = new Subject<number>();

  constructor(private clippy: ClippyService) {
    this.clippy.create("Clippy");
  }

  ngOnInit() {
    if (this.persons.length === 0) {
      this.addPerson();
    }
    this.update();

    //this.clippy.show(true);
    //this.clippy.speak("hello world",true);
  }

  ngAfterViewInit() {
    this.partValue$.next(this.calculator.getPartValue());
  }

  addPerson() {
    this.persons.push(new Person(this.indexIterator.next(), '', 0, 1));
  }

  private update() {
    this.partValue$.next(this.calculator.getPartValue());
    this.compute();
  }

  change(person: Person) {
    this.persons.filter(p => p.id === person.id)[0] = person;
    this.update();
  }

  delete(person: Person) {

    this.persons.forEach( (p, index) => {
      if (p.id === person.id) {
        this.persons.splice(index, 1);
      }
    });

    this.update();
  }

  private compute() {
    const result = this.calculator.compute();
    this.computationResult = this.calculator.repport(result);
  }

  optimize() {
    const result = this.calculator.optimize();
    this.computationResult = this.calculator.repport(result);
  }

}

const PersonList = [
  new Person(50, 'Bob', 150, 1),
  new Person(51, 'Joe', 100, 1),
  new Person(52, 'Bruce', 100, 1),
  new Person(53, 'Karla', 10, 1),
  new Person(54, 'Mary&Fred&Greg', 50, 3),
  new Person(55, 'Fran', 200, 1),
  new Person(56, 'Lee', 20, 1),
  new Person(57, 'Oliver&Jack', 120, 2),
  new Person(58, 'Rose', 30, 1)
];

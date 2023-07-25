//? interfaces
//* can also be used for functions, but custom types are more common
// type AddFunction = (a: number, b: number) => number;
interface AddFunction {
  (a: number, b: number): number;
}

let add: AddFunction;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

//* in simplest terms it describes the structure of an object, what it should look like
//* the interface keyword is TS thing
//? interface vs custom type
//* can be used almost interchangeably, but interfaces are more commonly seen
// interface Person {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

//* interfaces can also inherit, and can inherit from multiple sources
interface Named {
  readonly name?: string;
  //* optional methods/properties, just add a ? after the name
  //* it tells TS that objects could have this property but don't have to
  outputName?: string;
}

interface Greetable extends Named {
  //* public/private don't work on interfaces, readonly is the only add-on allowed
  // readonly name: string;

  greet(phrase: string): void;
}

//* points to interfaces because you can implement multiple interfaces but can only extend one class
//* class Person implements Greetable, AnotherOne, ETC {}
class Person implements Greetable {
  name?: string;
  age = 34;

  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("Ehhhhhh");
    }
  }
}

//* allows you to typecheck an object
//* if for some reason you don't initialize it immediately, but this tells the compiler that eventually user1 is going to be a Person object
//? let user1: Person;
//* interfaces are powerful because you can basically say, I don't know what all this object will have in it, but it HAS to have the greet() method
let user1: Greetable;

//* if you hover this it will tell you what it is expecting and what is missing
// user1 = {};
//* this object is good to go because it satisfies all criteria of our interface
// user1 = {
//   name: "Geo",
//   age: 34,
//   greet(phrase: string) {
//     console.log(phrase + " " + this.name);
//   },
// };

//* now you can just instantiate the class
user1 = new Person("Geo");
//* below throws an error because name is readonly
// user1.name = 'Kallyn'

user1.greet("Ayy whaddup, it's ya boi");

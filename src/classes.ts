//* abstract keyword is necessary up top to allow for abstract methods within the class
//* worth noting, abstract classes cannot be instantiated, only classes that extend them can
abstract class Department {
  //* static fields can be accessed without instantiating an object from the class
  static fiscalYear = 2023;
  //* while an object has key value pairs, a class has fields
  //* default values can also be set here
  // private id: string;
  // private name: string;
  // employees: string[] = [];
  //* adding private makes this only accessible within this class, ie via methods of the class
  // private employees: string[] = [];
  //* protected fields are accessible to the parent and any classes that extend it
  protected employees: string[] = [];

  //* constructor is a special method for classes that does something to the object as it's created
  //* functions inside objects are methods
  // constructor(id: string, name: string) {
  //* you can avoid all of the duplicate code by writing it like this (adding axis modifiers):
  //* note: here you will have to explicitly say public if a field is public
  // constructor(private id: string, public name: string) {
  //* the readonly modifier is a TS thing that makes changes to this field post initialization impossible, even in the class methods
  constructor(protected readonly id: string, public name: string) {
    //* this sets the name field to whatever is received as the name arg when the object is created
    // this.id = id;
    // this.name = name;
    //* static properties are not readily accessible in the constructor because it deals with an instance of the class
    //* ex consol.log(fiscalYear) <-- this will not work because fiscalYear is static
    //* ex console.log(Department.fiscalYear) <-- this is how you access a static property
  }

  //* static methods are called directly on the class itself and available without instantiating an object
  static createEmployee(name: string) {
    return { name: name };
  }

  //* defining a method inside a class
  //* adding the 'this' arg is special and tells it to always refer to an instance of the Department class
  //* adding an abstract method means that any class based on this class needs to implement this method
  abstract describe(this: Department): void;
  //* creating an empty method in the base class
  // console.log(`Department: (${this.id}): ${this.name}`); //* 'this' refers to the object being created

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

//* extends means it inherits from another class, meaning it gets all fields from the parent class AND any specified in the child class
class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    //* super takes the place of the constructor in the parent class
    //* must be called first in the child class constructor, but can have a defined name value in place, IT here
    super(id, "IT");
    this.admins = admins;
  }

  describe() {
    console.log("IT Department - ID: " + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  //* this stores a private accounting instance
  //* basically this stores the only available instance of this object within the class itself
  private static instance: AccountingDepartment;

  //* a getter is a property that executes a function/method when you retrieve a value
  //* getters MUST return something
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found");
  }
  //* a setter is a property that executes a function/method when you set a value
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please provide a value");
    }
    this.addReport(value);
  }

  //* a private constructor means there will only ever be one instance of this object
  //! Singleton pattern
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    // if (this.instance) {
    // 	return this.instance
    // }
    if (AccountingDepartment.instance) {
      return AccountingDepartment.instance;
    }
    this.instance = new AccountingDepartment("d1", []);
    return this.instance;
  }

  describe() {
    console.log("Accounting Department - ID: " + this.id);
  }

  addEmployee(name: string) {
    if (name === "Geo") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

//* calling this static method doesn't require instantiating a 'new' Department
const employee1 = Department.createEmployee("Geo");
//* here we can directly access the static fiscalYear field of the class without instantiating an object
console.log(employee1, Department.fiscalYear);

//* creating a new object with the class is used by invoking the class with the new keyword, and can be stored in a variable
// const accounting = new Department("Accounting");
// const accounting = new Department("d1", "Accounting");
const it = new ITDepartment("d2", ["Geo"]);

//* instead of calling a new instance (can't because of private constructor)
// const accounting = new AccountingDepartment("d1", []);
//* we call the getInstance method that checks if the instance exists and either returns the existing instance or creates and returns one
const accounting = AccountingDepartment.getInstance();
//even doing this will still just point to the same, singular instance
const accounting2 = AccountingDepartment.getInstance();

//* using the setter to assign a value, accessed like a property no () needed
accounting.mostRecentReport = "Did it work?";
accounting.addReport("Some goood soup");

console.log(accounting.mostRecentReport);

accounting.printReports();
accounting.addEmployee("Geo");
console.log(accounting);
console.log(it);
// console.log(accounting); //* this logs a Department object with a name: 'Accounting' key value pair

accounting.addEmployee("Geo");
accounting.addEmployee("Kallyn");
it.addEmployee("Geo");
it.addEmployee("Kallyn");

//* this is a loophole way of adding another employee and should be closed
//? do this by adding private to the field (can also be added to methods)
// accounting.employees[2] = "Meister";
//* invoking the describe method on the Department object stored in the accounting variable
// accounting.describe();
accounting.printEmployeeInformation();
it.describe();
it.printEmployeeInformation();

// const accountingCopy = { name: "Dummy", describe: accounting.describe };
// accountingCopy.describe();

accounting.describe();

//* 'this' typically refers to thing responsible for calling the method

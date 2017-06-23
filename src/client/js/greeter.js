class Greeter {
  constructor() {
    this.greeting = "Hello from the greeter!";
  }

  greet() {
    alert(this.greeting);
  }
}

module.exports = Greeter;
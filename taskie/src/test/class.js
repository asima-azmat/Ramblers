// Class
class Greeter {
// Properties
   constructor() {
       this.a = "";
       this.b = "";
       this.c = "";
   }
}
// Creating Object
let greeter = new Greeter();
// Setting properties

greeter.a = "hello";
greeter.b = "Asima";
greeter.c = "Azmat";
// Printing Properties
console.log(greeter.a + greeter.b + greeter.c);
// Push object in Array
var custs;
custs = [];
custs.push(greeter);
// Looping through all the objects
custs.forEach( (element) => {
   console.log(element.a)
});
// Direct
console.log(custs[0].c);
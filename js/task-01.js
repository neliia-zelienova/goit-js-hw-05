// Напиши функцию-конструктор Account, которая создает объект со свойствами login и email. 
// В prototype функции-конструктора добавь метод getInfo(), который выводит в консоль 
// значения полей login и email объекта который его вызвал.
const Account = function(login, email) {
    this.login = login;
    this.email = email;
};
Account.prototype.getInfo = function() {
    return `login: ${this.login}, email: ${this.email}`;
};


console.log(Account.prototype.getInfo); // function

const mango = new Account( 'Mangozedog', 'mango@dog.woof');
console.log(mango.getInfo()); 
// 'login : Mangozedog, email: mango@dog.woof'

 const poly = new Account( 'Poly', 'poly@mail.com');
//console.log(poly.getInfo());
// 'login : Poly, email: poly@mail.com'


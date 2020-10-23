// const Manager = function(name = 'manager', sales = 0) {
//     this.name = name;
//     this.sales = sales;
  
//     this.sell = function(product) {
//       this.sales += 1;
//       return `Manager ${this.name} sold ${product}.`;
//     };
//   };
  
//   const mango = new Manager('Mango', 5);
//   console.log(mango.sales); // 5
//   console.log(mango.sell('TV')); // Manager Mango sold TV
//   console.log(mango.sell('Microwave')); // Manager Mango sold Microwave
//   console.log(mango.sales); // 7
  
//   const poly = new Manager('Poly', 10);
//   console.log(poly.sales); // 10
//   console.log(poly.sell('TV')); // Manager Poly sold TV
//   console.log(poly.sell('Microwave')); // Manager Poly sold Microwave
//   console.log(poly.sales); // 12
  

// const animal = { eats: true };
// const dog = { barks: true };

// dog.__proto__ = animal;

// // В dog можно найти оба свойства
// console.log(dog.barks); // true
// console.log(dog.eats); // true

// Использовать напрямую __proto__ - грубое нарушение. на практике используются св-ва Object

// create()

// const animal = { eats: true };
// const dog = Object.create(animal);
// dog.barks = true;

// console.log(dog.barks); // true
// console.log(dog.eats); // true

// hasOwnProperty() 
// возвращает true, если свойство prop принадлежит самому объекту obj, а не его прототипу, иначе false
// const animal = { eats: true };
// const dog = Object.create(animal);
// dog.barks = true;

// for (const key in dog) {
//   console.log(key); // barks, eats
// }

// const animal = { eats: true };
// const dog = Object.create(animal);
// dog.barks = true;

// for (const key in dog) {
//   if (!dog.hasOwnProperty(key)) continue;

//   console.log(key); // barks
// }

//  Object.keys() вернет массив только собственных ключей объекта
// const animal = { eats: true };
// const dog = Object.create(animal);
// dog.barks = true;

// const dogKeys = Object.keys(dog);

// console.log(dogKeys); // ['barks']


// Свойство Function.prototype

// Свойство Function.prototype:

// Является объектом
// В него можно записывать свойства и методы
// Свойства и методы prototype будут доступны по ссылке __proto__ объекта
// У свойства prototype изначально есть метод constructor

// const Guest = function(name, room) {
//     this.name = name;
//     this.room = room;
//   };

//   console.log(Guest.prototype);

//   const mango = new Guest('Mango', 28);

// console.log(mango);

// const Guest = function(name, room) {
//     this.name = name;
//     this.room = room;
//   };
  
//   Guest.prototype.showGuestInfo = function() {
//     console.log(`name: ${this.name}, room: ${this.room}`);
//   };
  
//   const mango = new Guest('Mango', 28);
//   const poly = new Guest('Poly', 36);

//   console.log(mango);
//   console.log(poly);
  
//   mango.showGuestInfo(); // name: Mango, room: 28
//   poly.showGuestInfo(); // name: Poly, room: 36



// Наследование и конструкторы

const Hero = function(name, xp) {
    this.name = name;
    this.xp = xp;
  };
  
  /*
   * Теперь у нас есть конструктор базового класса героя,
   * добавим в prototype какой-то метод.
   */
  Hero.prototype.gainXp = function(amount) {
    console.log(`${this.name} gained ${amount} experience points`);
    this.xp += amount;
  };
  
  const mango = new Hero('Mango', 1000);
  console.log(mango); // Hero { name: 'Mango', xp: 1000 }
  
  // Так как mango это экземпляр Hero, то ему доступны методы из Hero.prototype
  mango.gainXp(500); // Mango gained 500 experience points
  console.log(mango); // Hero { name: 'Mango', xp: 1500 }


  const Warrior = function(name, xp, weapon) {
    /*
     * Во время выполнения функции Warrior вызываем функцию Hero
     * в контексте объекта создающегося в Warrior, а так же передаем
     * аргументы для инициализации полей this.name и this.xp
     *
     * this это будущий экземпляр Warrior
     */
    Hero.call(this, name, xp);
  
    // Тут добавляем новое свойство - оружие
    this.weapon = weapon;
  };
  
/*
 * Используем Object.create() для того чтобы изначально записать
 * в Warrior.prototype пустой объект, в __proto__ которого будет
 * ссылка на Hero.prototype. Это необходимо сделать до того
 * как добавлять методы
 */
Warrior.prototype = Object.create(Hero.prototype);

// Не забываем добавить в Warrior.prototype свойство constructor
Warrior.prototype.constructor = Warrior;

// Добавим метод для атаки
Warrior.prototype.attack = function() {
  console.log(`${this.name} attacks with ${this.weapon}`);
};
  
  const poly = new Warrior('Poly', 200, 'sword');
  
  console.log(poly); // Warrior {name: "Poly", xp: 200, weapon: "sword"}
  poly.attack(); // Poly attacks with sword

  // Попробуем теперь
poly.gainXp(300); // Poly gained 300 experience points
  
// Task 1
// RU: Написать функцию keyValueIterable(target),
//     которая на вход получает объект и возвращает итерируемый объект.
//     Итерируемый объект позволяет получить пары ключ/значение.
//     Выведите в консоль цвета из объекта colors.
// EN: Create a function keyValueIterable(target)
//     which takes an objects and returns iterable object.
//     Iterable object allows you to get key/value pairs.
//     Display in a console all colors from the object colors.

const colors = {
  green: '#0e0',
  orange: '#f50',
  pink: '#e07'
};

const keyValueIterable = function (target) {
  target[Symbol.iterator] = function () {
    const keys = Object.keys(target);
    return {
      next() {
        const done = keys.length === 0;
        const key = keys.shift();
        return {
          value: [key, target[key]],
          done
        }
      }
    }
  };
  return target;
};

const itColors = keyValueIterable(colors);
for (const [, color] of itColors) {
  console.log(color);
}

// Task 2
// RU: Написать функцию take(sequence, amount), которая из бесконечного итерируемого объекта random
//     вернет указаное количество элементов.
// EN: Create a function take(sequence, amount), which returns a specified amount of numbers
//     from iterable object random

const random = {
  [Symbol.iterator]: () => ({
    next: () => ({
      value: Math.random()
    })
  })
};

const take = function (sequence, amount) {
  return {
    [Symbol.iterator]() {
      const iterator = sequence[Symbol.iterator]();
      return {
        next() {
          if (amount-- < 1) { return { done: true } };
          return iterator.next();
        }
      }
    }
  };
}

const a = [...take(random, 3)];
console.log(a);

// Task 3
// RU: Написать итерируемый итератор, который возвращает числа Фибоначи
//     Реализовать метод return для остановки итератора с помощью for-of + break
// EN: Create iterable iterator, which produces Fibonacci numbers
//     Implement method return, which allows you to stop iterator using for-of + break

const Fib = {
  [Symbol.iterator]() {
    let n1 = 1;
    let n2 = 1;

    return {
      [Symbol.iterator](){
        return this;
      },

      next() {
        let current = n2;
        n2 = n1;
        n1 = n1 + current;  

        return {
          value: current,
          done: false
        }
      },

      return (v) {
        console.log('terminated');
        return {
          value: v,
          done: true
        }
      }
    }
  }
}

for (let v of Fib) {
  console.log(v);
  if (v > 50) break;
}

// Task 4
// RU: Написать итератор для чисел, который позволит получать массивы последовательных целых элементов.
//     Например, [...-3] => [0, -1, -2, -3], [...3] => [0, 1, 2, 3]
// EN: Create iterator for numbers, which allows you to get arrays of sequential integers.
//     Example, [...-3] => [0, -1, -2, -3], [...3] => [0, 1, 2, 3]

Object.defineProperty(Number.prototype, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function() {
    const initialValue = this.valueOf();
    let index = initialValue > 0 ? -1 : 1;

    return {
      [Symbol.iterator]: (current) => {
        return {
          next: () => ({
            value: current
          })
        }
      },
      
      next() {
        if (index == initialValue) { return { done: true } };
        index = index + Math.sign(initialValue);
        return this[Symbol.iterator](index).next();
      }
    }
  }
});

console.log([...-5]);
console.log([...5]);
console.log([...-3]);

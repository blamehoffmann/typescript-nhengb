// 1. Add typings/access modifiers to the fruitBasket constant
enum Fruit {
  BANANA = 'banana',
  ORANGE = 'orange',
  KIWI = 'kiwi',
  APPLE = 'apple'
}
type fruitBasket = { [key in Fruit]: number };
const fruitBasket: fruitBasket = {
  banana: 2,
  orange: 3,
  kiwi: 2,
  apple: 3
};

// 2. Add typings/access modifiers to the Person class
interface PersonInterface {
  name: string;
  gender: string;
  age: number;
  likes: string[];
  introduce(): string;
}
class Person implements PersonInterface {
  name: string;
  gender: string;
  age: number;
  likes: string[];
  public constructor(
    name: string,
    gender: string,
    age: number,
    likes: string[]
  ) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.likes = likes;
  }

  public introduce(): string {
    const { name, gender, age, likes } = this;
    const goodLookingMap = new Map([['male', 'handsome'], ['female', 'cute']]);
    return `
      Hello, I'm ${name}, ${age} years old, I like: ${likes.join(', ')}. 
      As you can see, I'm quite ${goodLookingMap.get(gender)} too!
    `;
  }
}

const Dima = new Person('Dima', 'male', 22, ['video games', 'martial arts']);

// 3. Add typings/access modifiers to MovieService class

interface Logger {
  log(err: Error): void;
}
type T = {
  logger(): void;
  getMovies: (string: string) => Promise<string>;
  log: (string: string) => string;
};
class MovieService<T> {
  logger: T;
  constructor(logger: T) {
    this.logger = logger;
  }
  public getMovies() {
    return Promise.resolve(['Jaws', 'Spider-Man']).catch(err => {
      this.logger.log(err);
      return [];
    });
  }
}

class LoggerOne implements Logger {
  public log(err: Error) {
    console.log('sending logs to log storage 1', err);
  }
}
class LoggerTwo implements Logger {
  public log(err: Error) {
    console.log('sending logs to log storage 2', err);
  }
}

const movieService1 = new MovieService<LoggerOne>(new LoggerOne());
const movieService2 = new MovieService<LoggerTwo>(new LoggerTwo());
console.log(movieService1, movieService2);

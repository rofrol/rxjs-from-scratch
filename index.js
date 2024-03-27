"use strict";

function map(transformFn) {
  const observable = this;
  return {
    ...observable,
    subscribe(observer) {
      observable.subscribe({
        ...observer,
        next(x) {
          console.log("x", x);
          observer.next(transformFn(x));
        },
      });
    },
  };
}

function filter(conditionFn) {
  const observable = this;
  return {
    ...observable,
    subscribe(observer) {
      observable.subscribe({
        ...observer,
        next(x) {
          if (conditionFn(x)) {
            observer.next(x);
          }
        },
      });
    },
  };
}

const arrayObservable = {
  map,
  filter,
  subscribe(observer) {
    [10, 20, 30].forEach(observer.next);
    observer.complete();
  },
};

const observer = {
  next(data) {
    console.log(data);
  },
  error(err) {
    console.error(err);
  },
  complete() {
    console.log("done");
  },
};

arrayObservable
  .map((x) => x / 10)
  .filter((x) => x !== 2)
  .subscribe(observer);

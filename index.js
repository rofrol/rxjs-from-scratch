"use strict";

function map(transformFn) {
  const observable = this;
  return {
    ...observable,
    subscribe(observer) {
      observable.subscribe({
        ...observer,
        next(x) {
          const y = transformFn(x);
          observer.next(y);
        },
      });
    },
  };
}

function filter(conditionFn) {
  const observable = this;
  return createObservable(function subscribe(observer) {
    observable.subscribe({
      ...observer,
      next(x) {
        if (conditionFn(x)) {
          observer.next(x);
        }
      },
    });
  });
}

const createObservable = (subscribe) => ({
  subscribe,
  map,
  filter,
});

const arrayObservable = createObservable(function subscribe(observer) {
  [10, 20, 30].forEach(observer.next);
  observer.complete();
});

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

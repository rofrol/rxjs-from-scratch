"use strict";

function map(transformFn) {
  const inputObservable = this;
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      ...outputObserver,
      next: (x) => {
        const y = transformFn(x);
        outputObserver.next(y);
      },
    });
  });
  return outputObservable;
}

function filter(conditionFn) {
  const inputObservable = this;
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      ...outputObserver,
      next: (x) => {
        if (conditionFn(x)) {
          outputObserver.next(x);
        }
      },
    });
  });
  return outputObservable;
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
  next: (data) => {
    console.log(data);
  },
  error: (err) => {
    console.error(err);
  },
  complete: () => {
    console.log("done");
  },
};

arrayObservable
  .map((x) => x / 10)
  .filter((x) => x !== 2)
  .subscribe(observer);

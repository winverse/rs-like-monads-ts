export type Ok<T> = {
  readonly _tag: "Ok";
  readonly result: T;
};

export type Err<E> = {
  readonly _tag: "Err";
  readonly error: E;
};

export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Result<T, never> => ({
  _tag: "Ok",
  result: value,
});

export const err = <E>(value: E): Result<never, E> => ({
  _tag: "Err",
  error: value,
});

export const isOk = <T>(value: Result<T, unknown>): value is Ok<T> =>
  value._tag === "Ok";

export const isErr = <E>(value: Result<unknown, E>): value is Err<E> =>
  value._tag === "Err";

export const unwrapOrDefault = <T, E>(
  self: Result<T, E>,
  defaultValue: (e: E) => T
): T => {
  if (isErr(self)) return defaultValue(self.error);
  return self.result;
};

export const unwrapOrElse = <T, E>(self: Result<T, E>, defaultValue: T): T => {
  if (isErr(self)) return defaultValue;
  return self.result;
};

export const map = <T, E, U>(
  self: Result<T, E>,
  f: (a: T) => U
): Result<U, E> => {
  if (isErr(self)) return self;
  return ok(f(self.result));
};

export const mapOrElse = <T, E, U>(
  self: Result<T, E>,
  f: (a: T) => U,
  defaultValue: U
): U => {
  return unwrapOrElse(map(self, f), defaultValue);
};

// Not exsist in rust document
export const KeepOk = <T, E>(selfs: Array<Result<T, E>>): Array<T> => {
  const res = selfs.flatMap((self) => {
    if (isOk(self)) return [self.result];
    return [];
  });
  return res;
};

// Not exsist in rust document
export const flat = <T, E>(self: Result<Result<T, E>, E>): Result<T, E> => {
  if (isOk(self)) return self.result;
  return self;
};

// Not exsist in rust document
export const flatMap = <T, E, U>(
  self: Result<T, E>,
  f: (a: T) => Result<U, E>
): Result<U, E> => {
  return flat(map(self, f));
};

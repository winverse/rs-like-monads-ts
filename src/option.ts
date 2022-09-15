export type Some<T> = {
  readonly _tag: "Some";
  readonly value: T;
};

export type None = {
  readonly _tag: "None";
};

export type Option<T> = Some<T> | None;

export const Some = <T>(value: T): Option<T> => ({ _tag: "Some", value });

export const None = (): Option<never> => ({ _tag: "None" });

export const isSome = <T>(self: Option<T>): self is Some<T> =>
  self._tag === "Some";

export const isNone = <T>(self: Option<T>): self is None =>
  self._tag === "None";

export const unwrapOrDefualt = <T>(self: Option<T>, defaultValue: T): T => {
  if (isNone(self)) return defaultValue;
  return self.value;
};

export const map = <T, U>(self: Option<T>, f: (a: T) => U): Option<U> => {
  if (isNone(self)) return self;
  return Some(f(self.value));
};

export const mapOrElse = <T, U>(
  self: Option<T>,
  f: (a: T) => U,
  defaultValue: U
): U => {
  return unwrapOrDefualt(map(self, f), defaultValue);
};

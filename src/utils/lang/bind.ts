/**
 * A method decorator that binds a method to it instance.
 */
export const Bind: MethodDecorator = (target: any, name: string | symbol, descriptor: PropertyDescriptor) => {
  return {
    get(): any {
      const bound = descriptor.value.bind(this);
      Object.defineProperty(this, name, {
        value: bound
      });
      return bound;
    }
  };
};

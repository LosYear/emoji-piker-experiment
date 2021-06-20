const validationRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isEmail = (string: string) => validationRule.test(string);

export default isEmail;

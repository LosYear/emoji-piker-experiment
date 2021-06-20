const validationRule = /#(\w+)\b/gi;

const isHashtag = (string: string) => validationRule.test(string);

export default isHashtag;

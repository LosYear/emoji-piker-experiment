const validationRule = /(?:^|[^a-zA-Z0-9_＠!@#$%&*])(?:(?:@|＠)(?!\/))([a-zA-Z0-9/_]{1,15})(?:\b(?!@|＠)|$)/;

const isMention = (string: string) => validationRule.test(string);

export default isMention;

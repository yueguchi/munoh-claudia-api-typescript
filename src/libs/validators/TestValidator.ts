import * as Joi from 'joi';

export default class TestValidator {
  public static checkTest(targetObject: any) {
    const schema = Joi.object().keys({
      word: Joi.string().min(2).required(),
      date: Joi.number().integer().min(10).max(20)
    })
    return Joi.validate(targetObject, schema);
  }

  public static checkWord(targetObject: any) {
    const schema = Joi.object().keys({
      word: Joi.string().min(2).required()
    })
    return Joi.validate(targetObject, schema);
  }
}

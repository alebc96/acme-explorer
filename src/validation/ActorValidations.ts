import { check } from "express-validator";

const creationValidator = [
  check("name")
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .trim()
    .escape(),
  check("surname")
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .trim()
    .escape(),
  check("email")
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .isEmail()
    .trim()
    .escape(),
  check("password")
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .isStrongPassword({ minLength: 5 }),
  check("phone_number")
    .optional()
    .isString()
    .trim()
    .escape(),
  check("address")
    .optional()
    .isString()
    .trim()
    .escape(),
  check("role")
    .exists({ checkNull: true, checkFalsy: true })
    .isString()
    .isIn(["EXPLORER", "MANAGER", "ADMINISTRATOR", "SPONSOR"]),
];

export { creationValidator };
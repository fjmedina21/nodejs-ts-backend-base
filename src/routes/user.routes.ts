import { Router } from "express";
import { check } from "express-validator";

import {
	GetUser,
	GetUsers,
	PatchUser,
	DeleteUser,
	ChangeUserPassword,
} from "../controllers";

import { UserIdExist } from "../helpers";
import { ValidateFields, IsAdmin, ValidateJWT } from "../middlewares";

const UserRoutes = Router();

UserRoutes.get("/", [IsAdmin, ValidateFields], GetUsers);

UserRoutes.get(
	"/:id",
	[
		IsAdmin,
		ValidateJWT,
		check("id", "Invalid ID").isUUID().custom(UserIdExist),
		ValidateFields,
	],
	GetUser
);

UserRoutes.patch(
	"/:id",
	[
		ValidateJWT,
		check(["id", "firstName", "lastName", "email", "password"]).trim(),
		check("id", "Invalid ID").isUUID().custom(UserIdExist),
		ValidateFields,
	],
	PatchUser
);

UserRoutes.patch(
	"/password/:id",
	[
		ValidateJWT,
		check(["id", "currentPassword", "newPassword", "confirmPassword"]).trim(),
		check("id", "Invalid ID").isUUID().custom(UserIdExist),
		check(
			["currentPassword", "newPassword", "confirmPassword"],
			"All fields are required"
		)
			.not()
			.isEmpty(),
		check(
			"newPassword",
			"The new password must be 8 character minimum."
		).isLength({
			min: 8,
		}),
		ValidateFields,
	],
	ChangeUserPassword
);

UserRoutes.delete(
	"/:id",
	[
		IsAdmin,
		ValidateJWT,
		check("id", "Invalid ID").isUUID().custom(UserIdExist),
		ValidateFields,
	],
	DeleteUser
);

export { UserRoutes };

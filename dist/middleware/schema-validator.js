"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidator = void 0;
const zod_1 = require("zod");
const schemaValidator = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res
                .status(400)
                .json(error.issues.map(issues => ({ message: issues.message })));
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.schemaValidator = schemaValidator;

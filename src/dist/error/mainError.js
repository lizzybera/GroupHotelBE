"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainError = exports.HTTP = void 0;
var HTTP;
(function (HTTP) {
    HTTP[HTTP["OK"] = 200] = "OK";
    HTTP[HTTP["BAD_REQUEST"] = 404] = "BAD_REQUEST";
    HTTP[HTTP["CREATE"] = 201] = "CREATE";
})(HTTP = exports.HTTP || (exports.HTTP = {}));
class mainError extends Error {
    constructor(args) {
        super(args.message);
        this.success = true;
        Object.setPrototypeOf(this, new.target.prototype);
        this.message = args.message;
        this.name = args.name;
        this.status = args.status;
        if (this.success !== undefined) {
            this.success = args.success;
        }
        Error.captureStackTrace(this);
    }
}
exports.mainError = mainError;

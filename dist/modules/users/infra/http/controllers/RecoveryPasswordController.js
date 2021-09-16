"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _SendRecoveryPasswordEmailService = _interopRequireDefault(require("../../../services/SendRecoveryPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RecoveryPasswordController {
  async create(request, response) {
    const {
      email
    } = request.body;

    const sendRecoveryPasswordEmail = _tsyringe.container.resolve(_SendRecoveryPasswordEmailService.default);

    await sendRecoveryPasswordEmail.execute({
      email
    });
    return response.status(204).json();
  }

}

exports.default = RecoveryPasswordController;
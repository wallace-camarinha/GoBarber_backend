"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

var _UpdateUserAvatarService = _interopRequireDefault(require("../../../services/UpdateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersAvatarController {
  async update(request, response) {
    var _request$file;

    const updateUserService = _tsyringe.container.resolve(_UpdateUserAvatarService.default);

    const user = await updateUserService.execute({
      user_id: request.user.id,
      avatarFilename: (_request$file = request.file) === null || _request$file === void 0 ? void 0 : _request$file.filename
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UsersAvatarController;
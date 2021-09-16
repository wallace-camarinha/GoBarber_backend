"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderMonthAvailabilityController {
  async index(request, response) {
    const {
      day,
      month,
      year
    } = request.body;
    const {
      provider_id
    } = request.params;

    const listProviderDayAvailability = _tsyringe.container.resolve(_ListProviderDayAvailabilityService.default);

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day,
      month,
      year
    });
    return response.json(availability);
  }

}

exports.default = ProviderMonthAvailabilityController;
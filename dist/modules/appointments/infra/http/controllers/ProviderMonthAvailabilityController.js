"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderMonthAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderMonthAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderMonthAvailabilityController {
  async index(request, response) {
    const {
      month,
      year
    } = request.body;
    const {
      provider_id
    } = request.params;

    const listProviderMonthAvailability = _tsyringe.container.resolve(_ListProviderMonthAvailabilityService.default);

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year
    });
    return response.json(availability);
  }

}

exports.default = ProviderMonthAvailabilityController;
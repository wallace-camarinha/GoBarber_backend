"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class ChangeProviderFieldToProviderId1626409703629 {
  async up(queryRunner) {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'provider_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('appointments', new _typeorm.TableForeignKey({
      name: 'AppointmentProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'name',
      type: 'varchar'
    }));
  }

}

exports.default = ChangeProviderFieldToProviderId1626409703629;
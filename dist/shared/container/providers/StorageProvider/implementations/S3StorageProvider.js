"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DiskStorageProvider {
  // private client: S3;
  // constructor() {
  //   this.client = new aws.S3({
  //     region: 'us-east-1',
  //   });
  // }
  async saveFile(file) {
    const originalPath = _path.default.resolve(_upload.default.tmpFolder, file); // const ContentType = mime.getType(originalPath);
    // if (!ContentType) {
    //   throw new Error('File not found!');
    // }


    const fileContent = await _fs.default.promises.readFile(originalPath); // await this.client
    //   .putObject({
    //     Bucket: uploadConfig.config.aws.bucket,
    //     Key: file,
    //     ACL: 'public-read',
    //     Body: fileContent,
    //     ContentType,
    //   })
    //   .promise();

    await _fs.default.promises.unlink(originalPath);
    return file;
  }

  async deleteFile(file) {// await this.client
    //   .deleteObject({
    //     Bucket: uploadConfig.config.aws.bucket,
    //     Key: file,
    //   })
    //   .promise();
  }

}

var _default = DiskStorageProvider;
exports.default = _default;
import BaseAPI, { SignFileConfig, FileConfig } from "./baseAPI";

interface SignMeConfig {
  apiKey: string;
  serverName?: string;
  userPhone?: string;
  password?: string;
}

export { BaseAPI };
export default class SignMe {
  baseAPI: BaseAPI;

  private key: string;
  private phone: string;
  private password: string;

  constructor(config: SignMeConfig) {
    this.baseAPI = new BaseAPI(config.serverName || "https://sign.me");

    this.key = config.apiKey;
    this.phone = config.userPhone;
    this.password = config.password;
  }

  sendFiles(files: [FileConfig, ...FileConfig[]], config?: SignFileConfig) {
    return this.baseAPI.signFiles({
      key: this.key,
      files,
      ...config,
    });
  }

  sign(id: string) {
    return this.baseAPI.signByUUID({
      type: "multi",
      id,
      key: this.key,
      user_ph: this.phone,
      passw: this.password,
    });
  }

  check(md5: string) {
    return this.baseAPI.signatureCheck({ md5 });
  }
}

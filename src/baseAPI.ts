import fetch from "cross-fetch";
import formurlencoded from "form-urlencoded";

type base64 = string;

export interface FileConfig {
  filet: base64;
  fname: string;
  md5?: string;
}

export interface SignFileConfig {
  //key: string;
  url?: string;
  user_email?: string;
  user_ph?: string;
  user_snils?: string;
  company_inn?: string;
  company_ogrn?: string;
  noemail?: number;
  forcesms?: string;
  IF?: number;
}

export interface SingleSignFileConfig extends FileConfig, SignFileConfig {
  key: string;
}

export interface MultiSignFileConfig extends SignFileConfig {
  key: string;
  files: [FileConfig, ...FileConfig[]];
}

export interface SignConfig {
  type: string;
  id: string;
  key: string;
  user_ph: string;
  passw: string;
}

export interface SignatureCheckConfig {
  filet?: base64;
  md5: string;
}

export interface SignatureCheckResponse {
  count: number;
}

export default class BaseAPI {
  serverName: string;

  constructor(serverName: string) {
    this.serverName = serverName;
  }

  signFile(config: SingleSignFileConfig): Promise<string> {
    return fetch(`${this.serverName}/signapi/sjson`, {
      method: "POST",
      body: JSON.stringify(config),
    }).then((response) => response.text());
  }

  signFiles(config: MultiSignFileConfig): Promise<string> {
    return fetch(`${this.serverName}/signapi/multijson`, {
      method: "POST",
      body: JSON.stringify(config),
    }).then((response) => response.text());
  }

  signByUUID(config: SignConfig) {
    return fetch(`${this.serverName}/signapi/sign`, {
      method: "POST",
      body: formurlencoded(config),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }).then((response) => response.text());
  }

  signatureCheck(
    config: SignatureCheckConfig
  ): Promise<SignatureCheckResponse | Error> {
    return fetch(`${this.serverName}/signaturecheck/json`, {
      method: "POST",
      body: JSON.stringify(config),
    })
      .then((res) => res.text())
      .then((text) => {
        try {
          return JSON.parse(text);
        } catch (err) {
          throw new Error(text);
        }
      });
  }
}

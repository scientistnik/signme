import { BaseAPI } from "../src";
import { config } from "dotenv";

config();

const md5 = require("md5");

const { SIGNME_API_KEY } = process.env;
const api = new BaseAPI("https://sandbox.sign.me");

describe("sign file", () => {
  test("error", async () => {
    let response = await api.signFile({
      filet: Buffer.from("Hello").toString("base64"),
      fname: "hello.html",
      key: "",
    });

    expect(response).toMatch(/error/);
  });

  test("ok", async () => {
    let response = await api.signFile({
      filet: Buffer.from("Hello").toString("base64"),
      fname: "hello.html",
      key: SIGNME_API_KEY,
    });

    expect(response).not.toMatch(/error/);
  });
});

describe("signature check", () => {
  beforeAll(() =>
    api.signFile({
      filet: Buffer.from("Hello").toString("base64"),
      fname: "hello.html",
      key: SIGNME_API_KEY,
    })
  );

  test("error", async () => {
    expect(() => api.signatureCheck({ md5: "" })).toThrow(Error);
  });

  test("ok", async () => {
    let response = await api.signatureCheck({ md5: md5("Hello") });
    console.log(response);

    expect(response).toHaveProperty("count");
  });
});

describe("sign files", () => {
  test("error", async () => {
    let response = await api.signFiles({
      files: [
        { filet: Buffer.from("Hello").toString("base64"), fname: "hello.html" },
      ],
      key: "",
    });

    expect(response).toMatch(/error/);
  });

  test("ok", async () => {
    let response = await api.signFiles({
      files: [
        { filet: Buffer.from("Hello").toString("base64"), fname: "hello.html" },
      ],
      key: SIGNME_API_KEY,
    });

    expect(response).not.toMatch(/error/);
  });
});

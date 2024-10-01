import path from "path";
import dotenv from "dotenv";
import * as process from "process";

dotenv.config({
  path: path.resolve(__dirname, `../config/test.env`),
});

export interface Config {
  EMAIL: string;
  PASSWORD: string;
  BASE_URL: string;
}

const notDefined = "not defined";
const getErrorMessage = (parameter: string) => `${parameter} ${notDefined}`;

const getConfig = (): Config => {
  const email = process.env.EMAIL
    ? process.env.EMAIL
    : getErrorMessage("EMAIL");
  const password = process.env.PASSWORD
    ? process.env.PASSWORD
    : getErrorMessage("PASSWORD");
  const baseUrl = process.env.BASE_URL
    ? process.env.BASE_URL
    : getErrorMessage("BASE_URL");

  [email, password, baseUrl].forEach((value) => {
    if (value.includes("not defined")) {
      throw new Error(value);
    }
  });

  return {
    EMAIL: email,
    PASSWORD: password,
    BASE_URL: baseUrl,
  };
};

export default getConfig();

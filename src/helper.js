import axios from "axios";
import Qs from "qs";
import { captureException } from "./tracker";
import {
BASEURL
} from "./constants";
import { handleUserLogout } from "./helper";

const createApi = config => {
  const api = axios.create(config);
  api.interceptors.request.use(config => {
    config.paramsSerializer = params => {
      return Qs.stringify(params, {
        arrayFormat: "comma",
        indices: false,
      });
    };
    config.transformRequest = [
      (requestBody, _) => {
        if (requestBody) {
          Object.keys(requestBody).forEach(key => {
            requestBody[key] = typeof requestBody[key] === "string" ? requestBody[key].trim() : requestBody[key];
          });
          Object.keys(requestBody)
            .filter(key => requestBody[key] === "" || requestBody[key] === undefined)
            .forEach(key => (requestBody[key] = null));
        }
        return requestBody;
      },
      ...axios.defaults.transformRequest,
    ];
    return config;
  });
  api.interceptors.response.use(
    response => response.data,
    error => {
      if (error.response) {
        if (error.response.data) {
          error = Object.assign(error, error.response.data);
        }

        if (error.response.status === 401) {
          handleUserLogout();
          return;
        } else if (error.response.status >= 500) {
          captureException(error);
        }
      }

      return Promise.reject(error);
    },
  );
  return api;
};

const config = {
  withCredentials: true,
  headers: {},
};

if (localStorage.getItem("accessToken")) {
  config.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
}

const audeConfig = { ...config, baseURL: AUDE_API_BASEURL };
const financeConfig = { ...config, baseURL: FINANCE_API_BASEURL };
const paymentLinksConfig = { ...config, baseURL: PAYMENT_LINKS_API_BASEURL };
const masterFeeDataConfig = { ...config, baseURL: MASTER_FEE_DATA_API_BASEURL };

const audeApi = createApi(audeConfig);
const financeApi = createApi(financeConfig);
const paymentLinksApi = createApi(paymentLinksConfig);
const masterFeeDataApi = createApi(masterFeeDataConfig);

export { audeApi, financeApi, paymentLinksApi, masterFeeDataApi };

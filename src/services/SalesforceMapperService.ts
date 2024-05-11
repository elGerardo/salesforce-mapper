import axios from "axios";

export default class SalesforceMapperService {

  public static async login(data: object) {
    console.log(data)
    let response: any = {};
    let status: any = 200;

    await axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/salesforce/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        console.log(error)
        response = error.response.data;
        status = error.response.status;
      })
      .then((callout) => {
        response = callout?.data;
        status = callout?.status;
      });

    return { response, status };
  }

  public static async describe(sobject: string, instance_url: string | undefined, access_token: string | undefined) {
    let response: any = {};
    let status: any = 200;
    await axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/salesforce/describe/${sobject}`, {
        headers: {
          "Content-Type": "application/json",
          "X-INSTANCE-URL": instance_url,
          "X-ACCESS-TOKEN": access_token
        },
      })
      .catch((error) => {
        console.log(error)
        response = error.response.data;
        status = error.response.status;
      })
      .then((callout) => {
        response = callout?.data;
        status = callout?.status;
      });

    return { response, status };
  }

  public static async get(sobject: string, instance_url: string | undefined, access_token: string | undefined, params: { fields: Array<string>, limit: string, offset: string }) {
    let response: any = {};
    let status: any = 200;
    await axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/salesforce/get/${sobject}?fields=${JSON.stringify(params.fields)}&limit=${params.offset}&offset=${params.offset}`, {
        headers: {
          "Content-Type": "application/json",
          "X-INSTANCE-URL": instance_url,
          "X-ACCESS-TOKEN": access_token
        }
      })
      .catch((error) => {
        console.log(error)
        response = error.response.data;
        status = error.response.status;
      })
      .then((callout) => {
        response = callout?.data;
        status = callout?.status;
      });

    return { response, status };
  }
  
}

import axios from "axios";
import { BASE_URL } from "../config/axios-config";

const client = axios.create({
  baseURL: BASE_URL,
});

export const getDomainAnchor = () => client.get(`/get-domain-anchor`);

const DomainAnchorClientApi = {
  getDomainAnchor,
};

export default DomainAnchorClientApi;

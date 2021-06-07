import axios from "axios";
import { BASE_URL } from "../config/axios-config";

const client = axios.create({
  baseURL: BASE_URL,
});
export const saveDomain = (payload) =>
  client.post(`/domain/post-domain-anchor`, payload);
export const getAllDomain = () => client.get(`/domain/get-domain`);
export const deleteDomainById = (payload) =>
  client.delete("/domain/delete-domain", { data: payload });
export const updateDomainById = (payload) =>
  client.put(`/domain/update-domain`, payload);
const DomainClientApi = {
  getAllDomain,
  saveDomain,
  deleteDomainById,
  updateDomainById,
};

export default DomainClientApi;

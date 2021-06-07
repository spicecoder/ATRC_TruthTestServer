import axios from "axios";
import { BASE_URL } from "../config/axios-config";

const client = axios.create({
  baseURL: BASE_URL,
});
export const addResolutionPattern = (payload) =>
  client.put(`/resolution-pattern/add-resolution-pattern`, payload);
export const getResolutionPattern = (payload) =>
  client.get(`/resolution-pattern/post-resolution-pattern`, {
    params: { payload },
  });
export const deleteEntityById = (payload) =>
  client.delete("/resolution-pattern/remove-entity", { data: payload });
export const updateEntityById = (payload) =>
  client.put(`/resolution-pattern/update-entity`, payload);
const ResolutionPatternClientApi = {
  getResolutionPattern,
  addResolutionPattern,
  deleteEntityById,
  updateEntityById,
  //   saveResolutionPattern,
  //   deleteResolutionPatternById,
  //   updateResolutionPatternById,
};

export default ResolutionPatternClientApi;

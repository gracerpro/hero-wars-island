import ApiRequest from "../core/ApiRequest";

export const TYPE_NODE = 0;
export const TYPE_START = 1;
export const TYPE_TOWN = 2;

export const STATUS_CREATED = 0;
export const STATUS_ON_MODERATION = 1;
export const STATUS_ACCEPTED_SUCCESS = 2;

export default class HeroClient {
  constructor() {
    this._apiRequest = new ApiRequest();
  }

  /**
   * @returns {Object|null}
   */
  async getActualIsland() {
    return await this._apiRequest.get("/islands/actual");
  }

  /**
   * @param {Number} islandId
   * @returns {Object}
   */
  async getNodes(islandId) {
    return await this._apiRequest.get(`/islands/${islandId}/nodes`);
  }

  /**
   * @param {Number} nodeId
   * @param {Object} data
   * @returns {Object}
   */
  async updateNode(nodeId, data) {
    return await this._apiRequest.post(`/island-nodes/${nodeId}/update`, data);
  }
}

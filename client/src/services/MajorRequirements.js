import axios from "../utils/axios.js";

class MajorDataService {
  async find(query) {
    const value = await axios.get("/major/requirements", { name: query });
    return value;
  }
}

export default new MajorDataService();

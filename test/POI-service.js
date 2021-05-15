"use strict";

const axios = require("axios");

class POIService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users", newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }



  async getPOI(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/POIs/" + id + "/POIs");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllPOIs() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/POIs");
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async addPOI(newPOI) {
    try {
      const response = await axios.post(this.baseUrl + "/api/POIs", newPOI);
      return response.data;
    } catch (e) {
      return null;
    }
  }

}

module.exports = POIService;
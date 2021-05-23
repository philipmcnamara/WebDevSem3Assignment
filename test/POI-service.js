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

  async deleteAllReviews() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/reviews");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createReview(newReview) {
    try {
      const response = await axios.post(this.baseUrl + "/api/reviews", newReview);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async getReview(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/reviews/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async getReviews() {
    try {
      const response = await axios.get(this.baseUrl + "/api/reviews");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneReview(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/reviews/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }



  async deleteAllPOIS() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/POIs");
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async createPOI(newPOI) {
    try {
      const response = await axios.post(this.baseUrl + "/api/POIs", newPOI);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async getPOI(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/POIs/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async getPOIs() {
    try {
      const response = await axios.get(this.baseUrl + "/api/POIs");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOnePOI(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/POIs/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }



}

module.exports = POIService;
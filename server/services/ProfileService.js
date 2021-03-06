import mongoose from "mongoose";
import Profile from "../models/Profile";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Profile", Profile);

class ProfileService {
  async getProfileByUserId(id) {
    // Gets the profile by the user id for when a user wants their own profile
    let profile = await _repository.findOne({ userId: id });
    return profile;
  }
  async createProfile(profileInfo) {
    //creates a profile
    let profile = await _repository.create(profileInfo);
    return profile;
  }
  async getById(profileId) {
    // Basic getById
    let profile = await _repository.findOne({ _id: profileId });
    return profile;
  }
  async edit(id, uid, update) {
    // Finds a profile with the right userid and profile id, makes sure that user is authorized an extra time
    let data = await _repository.findOneAndUpdate(
      { _id: id, userId: uid },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board", 400);
    }
    return data;
  }
}

const _profileService = new ProfileService();
export default _profileService;

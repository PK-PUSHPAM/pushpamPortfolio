import Profile from "../models/Profile.js";

export const getProfile = async (req, res) => {
  const profile = await Profile.findOne();

  res.json({
    success: true,
    data: profile,
  });
};

export const upsertProfile = async (req, res) => {
  const {
    fullName,
    title,
    bio,
    about,
    profileImage,
    resumeUrl,
    location,
    email,
  } = req.body;

  if (!fullName || !title) {
    return res.status(400).json({
      success: false,
      message: "fullName and title are required",
    });
  }

  let profile = await Profile.findOne();

  if (!profile) {
    profile = await Profile.create({
      fullName,
      title,
      bio,
      about,
      profileImage,
      resumeUrl,
      location,
      email,
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  }

  profile.fullName = fullName;
  profile.title = title;
  profile.bio = bio ?? profile.bio;
  profile.about = about ?? profile.about;
  profile.profileImage = profileImage ?? profile.profileImage;
  profile.resumeUrl = resumeUrl ?? profile.resumeUrl;
  profile.location = location ?? profile.location;
  profile.email = email ?? profile.email;

  await profile.save();

  res.json({
    success: true,
    message: "Profile updated successfully",
    data: profile,
  });
};

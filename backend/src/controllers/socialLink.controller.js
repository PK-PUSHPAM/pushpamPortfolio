import SocialLink from "../models/SocialLink.js";

export const getAllSocialLinks = async (req, res) => {
  const socialLinks = await SocialLink.find().sort({
    displayOrder: 1,
    createdAt: -1,
  });

  res.json({
    success: true,
    count: socialLinks.length,
    data: socialLinks,
  });
};

export const createSocialLink = async (req, res) => {
  const { platform, url, icon, isActive, displayOrder } = req.body;

  if (!platform || !url) {
    return res.status(400).json({
      success: false,
      message: "Platform and url are required",
    });
  }

  const socialLink = await SocialLink.create({
    platform,
    url,
    icon,
    isActive,
    displayOrder,
  });

  res.status(201).json({
    success: true,
    message: "Social link created successfully",
    data: socialLink,
  });
};

export const updateSocialLink = async (req, res) => {
  const socialLink = await SocialLink.findById(req.params.id);

  if (!socialLink) {
    return res.status(404).json({
      success: false,
      message: "Social link not found",
    });
  }

  const updatedSocialLink = await SocialLink.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  res.json({
    success: true,
    message: "Social link updated successfully",
    data: updatedSocialLink,
  });
};

export const deleteSocialLink = async (req, res) => {
  const socialLink = await SocialLink.findById(req.params.id);

  if (!socialLink) {
    return res.status(404).json({
      success: false,
      message: "Social link not found",
    });
  }

  await SocialLink.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Social link deleted successfully",
  });
};

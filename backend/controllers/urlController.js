import Url from "../models/url.js";
import { nanoid } from 'nanoid';


export const createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const base = process.env.BASE_URL || "http://localhost:5000";
  const shortID = nanoid(6);
  const shortUrl = `${base}/${shortID}`;

  try {
    // Check if URL already exists
    let urlEntry = await Url.findOne({ longUrl: originalUrl });

    if (!urlEntry) {
      // Create new URL entry
      urlEntry = await Url.create({
        longUrl: originalUrl,
        shortUrl,
        shortID            
      });
    }

    res.status(200).json({
      message: "Link created successfully",
      success: true,
      newUrl: {
        shortID: urlEntry.shortID,
        shortUrl: urlEntry.shortUrl,
        longUrl: urlEntry.longUrl,
        clicks: urlEntry.clicks
      }
    });

  } catch (error) {
    console.error("Error in createShortUrl:", error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// Redirect to original URL
export const redirectToUrl = async (req, res) => {
  const { shortID } = req.params;
  try {
    const urlEntry = await Url.findOne({ shortID });

    if (!urlEntry) {
      return res.status(404).json({
        message: "Not found",
        success: false
      });
    }

    urlEntry.clicks++;
    await urlEntry.save();

    res.redirect(urlEntry.longUrl);

  } catch (error) {
    console.error("Error in redirectToUrl:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false
    });
  }
};

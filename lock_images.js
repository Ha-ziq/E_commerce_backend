import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Products.js";

dotenv.config();

const updates = [
  {
    name: "Linen Throw Blanket",
    imageUrl: "https://loremflickr.com/g/800/800/blanket,linen/all?lock=10"
  },
  {
    name: "Solid Gold Petite Micropave Ring",
    imageUrl: "https://loremflickr.com/g/800/800/ring,gold/all?lock=25"
  },
  {
    name: "WD 2TB Elements Portable External Hard Drive",
    imageUrl: "https://loremflickr.com/g/800/800/harddrive,usb/all?lock=31"
  },
  {
    name: "Silicon Power 256GB SSD 3D NAND",
    imageUrl: "https://loremflickr.com/g/800/800/ssd,circuit/all?lock=41"
  },
  {
    name: "WD 4TB Gaming Drive Works with Playstation 4",
    imageUrl: "https://loremflickr.com/g/800/800/playstation,console/all?lock=52"
  },
  {
    name: "Women's PU Leather Moto Biker Jacket",
    imageUrl: "https://loremflickr.com/g/800/800/leather,jacket,moto/all?lock=68"
  }
];

const fixDynamicImages = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to DB.");

    let updatedCount = 0;
    for (const item of updates) {
      const result = await Product.updateOne(
        { name: item.name },
        { $set: { imageUrl: item.imageUrl } }
      );
      if (result.modifiedCount > 0) {
        console.log(`✅ Locked image for: ${item.name}`);
        updatedCount++;
      }
    }

    console.log(`Finished locking ${updatedCount} product images.`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Error fixing images:", err);
    process.exit(1);
  }
};

fixDynamicImages();

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
    console.log("[Multer] Saving file to:", "./public/temp"); // Add this
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
        console.log("[Multer] Saved file:", file.originalname); // Add this
  },
});

export const upload = multer({ storage: storage });

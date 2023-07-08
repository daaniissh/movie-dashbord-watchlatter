const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movies' }],
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Users", userSchema);
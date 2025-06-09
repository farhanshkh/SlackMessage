import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        // eslint-disable-next-line
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minLength: [3, 'Username must be atleast 3 character'],
      match: [
        /^[a-zA-Z0-9]+$/,
        'Username must contain only letters and numbers'
      ]
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

// Pre-save hook to hash password and set avatar
UserSchema.pre('save', async function (next) {
  try {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // Set avatar only if it's not already set
    if (!this.avatar) {
      this.avatar = `https://robohash.org/${this.username}`;
    }

    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', UserSchema);
export default User;

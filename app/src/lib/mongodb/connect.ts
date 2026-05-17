import mongoose from "mongoose";

function getMongoUri() {
  return process.env.MONGODB_URI || process.env.ATLAS_URI || "";
}

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: Cached = {
  conn: null,
  promise: null,
};

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = getMongoUri();
    if (!uri) {
      throw new Error(
        "MONGODB_URI or ATLAS_URI must be defined in environment variables",
      );
    }

    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

import { Client, Databases, Permission, Role } from "node-appwrite";

const APPWRITE_DATABASE_ID = "demo-blog-appwrite-nextjs";
const APPWRITE_USERS_COLLECTION_ID = "users";

export default async ({ req, res, log }) => {
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers["x-appwrite-key"]);

  const database = new Databases(client);

  log(`Creating profile for user ${JSON.stringify(req.body, null, 2)}`);

  if (!req.body.$id) {
    log("User ID is required");
    return res.json({
      success: false,
      message: "User ID is required",
    });
  }

  const user = await database.getDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_USERS_COLLECTION_ID,
    req.body.$id,
  );

  if (user) {
    log("Profile already exists for user");
    return res.empty();
  }

  await database.createDocument(
    APPWRITE_DATABASE_ID,
    APPWRITE_USERS_COLLECTION_ID,
    req.body.$id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    [Permission.read(Role.any()), Permission.write(Role.user(user?.$id))],
  );

  return res.json({
    success: true,
    message: "Profile created successfully",
  });
};

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

  const profile = await database.listDocuments(
    APPWRITE_DATABASE_ID,
    APPWRITE_USERS_COLLECTION_ID,
    [Query.equal("$id", req.body.$id)],
  );

  if (profile.total > 0) {
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
    [Permission.read(Role.any()), Permission.write(Role.user(req.body.$id))],
  );

  return res.json({
    success: true,
    message: "Profile created successfully",
  });
};

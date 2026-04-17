/**
 * Appwrite client configuration
 *
 * Required .env variables (in frontend/.env):
 *   REACT_APP_APPWRITE_ENDPOINT   — e.g. https://cloud.appwrite.io/v1
 *   REACT_APP_APPWRITE_PROJECT_ID — your Appwrite project ID
 *   REACT_APP_APPWRITE_DATABASE_ID  — your Appwrite database ID
 *   REACT_APP_APPWRITE_COLLECTION_ID — the "waitlist" collection ID
 */

import { Client, Databases, ID, Query } from "appwrite";

const endpoint =
  process.env.REACT_APP_APPWRITE_ENDPOINT || "https://sgp.cloud.appwrite.io/v1";
const projectId = process.env.REACT_APP_APPWRITE_PROJECT_ID || "";
export const DATABASE_ID = process.env.REACT_APP_APPWRITE_DATABASE_ID || "";
export const COLLECTION_ID = process.env.REACT_APP_APPWRITE_COLLECTION_ID || "";

const client = new Client().setEndpoint(endpoint).setProject(projectId);

export const databases = new Databases(client);

/**
 * Add an entry to the waitlist collection.
 * Returns { success, inviteUrl, message } or throws an AppwriteException.
 */
export async function addToWaitlist({ name, email, whatsapp, role }) {
  // Check for duplicates by email
  const emailQuery = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal("email", email),
  ]);
  if (emailQuery.total > 0) {
    const err = new Error("This email is already registered.");
    err.code = "DUPLICATE_EMAIL";
    throw err;
  }

  // Check for duplicates by whatsapp
  const phoneQuery = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
    Query.equal("whatsapp", whatsapp),
  ]);
  if (phoneQuery.total > 0) {
    const err = new Error("This mobile number is already registered.");
    err.code = "DUPLICATE_PHONE";
    throw err;
  }

  // Create document with a unique auto-generated ID
  await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
    name,
    email,
    whatsapp,
    role,
  });

  return { success: true };
}

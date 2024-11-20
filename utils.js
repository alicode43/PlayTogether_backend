import { v4 as uuidv4 } from "uuid";

// Function to generate a unique ID for each session
export const generateUniqueId = () => {
  return uuidv4(); // Generates a unique ID using UUID version 4
};

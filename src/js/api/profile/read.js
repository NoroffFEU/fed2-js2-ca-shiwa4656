const API_URL = "https://v2.api.noroff.dev/social/profiles/shirwac";

export async function readProfile(username) {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Token from local storage
        "X-Noroff-API-Key": "9b16dd46-dba3-44c7-a516-66599a3c7358",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error reading profile:", error);
  }
}

export async function readProfiles(limit, page) {}

import useUserStore from "@/hooks/useUserStore";
import { Edge } from "@xyflow/react";

interface SavedItem {
  id: string;
  name: string;
  prompt: string;
  nodes?: Node[];
  edges?: Edge[];
  terraformCode: string;
}


async function fetchSavedItems(token: string, email: string): Promise<void> {
    const setSavedItems = useUserStore((state: any) => state.setSavedItems);
    if (!token || !email) {
        console.error("Token and email are required to fetch saved items.");
        return;
    }

    try {
        const res = await fetch("https://airis-backend.onrender.com/getSaved", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            token: token,
        },
        body: JSON.stringify({ email }),
        });

        const response = await res.json();

        if (!res.ok) {
        console.error(`Failed to fetch saved items: ${response.message}`);
        return;
        }

    const savedItemsResponse = response?.data?.saved || [];
    const savedItems: SavedItem[] = savedItemsResponse.map((item: any) => ({
      id: item._id || "",
      name: item.name || "",
      prompt: item.prompt || "",
      nodes: item.nodes || null,
      edges: item.edges || null,
      terraformCode: item.terraform || "",
    }));
    console.log(savedItems)
    setSavedItems(savedItems);
  } catch (error) {
    console.error("Error fetching saved items:", error);
  }
}

export default fetchSavedItems;

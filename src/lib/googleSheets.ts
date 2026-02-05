import { Project } from "@/data/types";

const SHEET_ID = "19i3aS7_PslvodPuSD9Cdbf4-0W_ZzNWHYDed-wo1fcE";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

// Convert Google Drive sharing URLs to direct image URLs
function convertGoogleDriveUrl(url: string): string {
  // Match Google Drive sharing URL pattern
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) {
    const fileId = driveMatch[1];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  return url;
}

function parseCSV(csv: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = "";
  let insideQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote
        currentCell += '"';
        i++;
      } else {
        // Toggle quote mode
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      currentRow.push(currentCell);
      currentCell = "";
    } else if ((char === "\n" || (char === "\r" && nextChar === "\n")) && !insideQuotes) {
      currentRow.push(currentCell);
      rows.push(currentRow);
      currentRow = [];
      currentCell = "";
      if (char === "\r") i++; // Skip \n in \r\n
    } else if (char !== "\r") {
      currentCell += char;
    }
  }

  // Handle last cell/row
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell);
    rows.push(currentRow);
  }

  return rows;
}

export async function fetchProjectsFromSheet(): Promise<Project[]> {
  try {
    const response = await fetch(SHEET_URL, { 
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      console.error(`Sheet fetch failed with status: ${response.status}`);
      throw new Error("Failed to fetch sheet data");
    }

    const csv = await response.text();
    const rows = parseCSV(csv);

    // Skip header row (index 0)
    const projects: Project[] = [];
    
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      
      // Skip empty rows (check column A for title)
      if (!row[0]?.trim()) continue;

      const title = row[0]?.trim() || "";
      const description = row[1]?.trim() || "";
      const images = [row[2], row[3], row[4], row[5], row[6]]
        .map((url) => url?.trim())
        .filter((url) => url && url.length > 0)
        .map(convertGoogleDriveUrl);
      const tags = (row[7] || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      const link = row[8]?.trim() || undefined;
      const featured = row[9]?.trim()?.toUpperCase() === "TRUE";

      if (title) {
        projects.push({
          id: `sheet-${i}`,
          title,
          description,
          images: images.length > 0 ? images : ["/images/projects/placeholder.jpg"],
          tags,
          link,
          featured,
        });
      }
    }

    return projects;
  } catch (error) {
    console.error("Error fetching projects from Google Sheet:", error);
    return [];
  }
}

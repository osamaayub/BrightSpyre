
import he from "he";
import striptags from "striptags";




export function cleanDescription(html: string) {
    return he.decode(striptags(html));
  }

  export function extractBulletPointsFromDescription(html: string): string[] {
    const cleanText = he.decode(striptags(html));
    
    return cleanText
      .split('\n')
      .map(line => line.trim())
      .filter(line => /^[-•*]/.test(line)) // Match lines starting with -, •, or *
      .map(line => line.replace(/^[-•*]\s*/, '')); // Remove the symbol
  }
  
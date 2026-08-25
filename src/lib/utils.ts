import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function downloadCsv(data: Record<string, any>[], filename: string) {
  if (!data || data.length === 0) {
    console.error("No data to export for CSV.");
    return;
  }

  const header = Object.keys(data[0]);
  const csv = [
    header.join(','),
    ...data.map(row => header.map(fieldName => {
        const value = row[fieldName];
        if (value === null || value === undefined) {
            return '""';
        }
        const stringValue = String(value);
        // Escape quotes by doubling them, and wrap the whole field in quotes.
        const escapedValue = stringValue.replace(/"/g, '""');
        return `"${escapedValue}"`;
    }).join(','))
  ].join('\r\n');

  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

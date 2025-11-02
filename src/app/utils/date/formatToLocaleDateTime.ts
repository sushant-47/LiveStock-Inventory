
/** `date` in ISO string */
export function formatToLocaleDateTime(date: string): string {
    const utcDate = new Date(date);
    return `${utcDate.toDateString()} ${utcDate.toLocaleTimeString().toUpperCase()}`;
}
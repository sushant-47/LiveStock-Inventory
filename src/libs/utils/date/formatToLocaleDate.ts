
/** `date` in ISO string */
export function formatToLocaleDate(date: string): string {
    const utcDate = new Date(date);
    return `${utcDate.toDateString()}`;
}
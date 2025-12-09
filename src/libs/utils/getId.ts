
const counter: Record<string, number> = {};

export function getId(prefix: string): string {
    if (!counter.hasOwnProperty(prefix)) {
        counter[prefix] = 0;
    }
    return `${prefix}-${counter[prefix]++}`;
}

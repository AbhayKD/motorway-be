export function shallowCopy(source: any, target: any) {
    Object.keys(target).forEach((key) => {
        if (source[key] !== undefined) {
            target[key] = source[key];
        }
    });

    return target;
}

export function formatDateWithOffset(date: Date): string {
    const offsetHours = -date.getTimezoneOffset() / 60;
    const offsetString = offsetHours >= 0 ? `+${offsetHours}` : `${offsetHours}`;
    return date.toISOString().replace('Z', '') + offsetString;
}

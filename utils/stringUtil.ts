export function isBlank(str: string) {
  return !str || str.trim().length === 0;
}

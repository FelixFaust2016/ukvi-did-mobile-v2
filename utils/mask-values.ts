function maskText(
  text: string,
  visibleCount: number = 4,
  maskChar: string = "*"
): string {
  if (text.length <= visibleCount) return text;

  const visiblePart = text.slice(0, visibleCount);
  const maskedPart = maskChar.repeat(text.length - visibleCount);

  return visiblePart + maskedPart;
}

export { maskText };

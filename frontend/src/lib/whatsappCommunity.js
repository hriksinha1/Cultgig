/** Opens WhatsApp group invite in a new tab when the server returns a valid URL. */
export function openWhatsappInviteIfValid(inviteUrl) {
  if (typeof inviteUrl !== 'string') return false;
  const trimmed = inviteUrl.trim();
  if (!/^https?:\/\//i.test(trimmed)) return false;
  window.open(trimmed, '_blank', 'noopener,noreferrer');
  return true;
}

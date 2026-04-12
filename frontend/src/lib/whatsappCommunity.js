/**
 * WhatsApp invite opens must start in the same synchronous turn as the user's click.
 * After await fetch(), window.open is usually blocked — so we open about:blank first, then navigate.
 */

export function openWhatsappInvitePlaceholder() {
  try {
    return window.open('about:blank', '_blank');
  } catch {
    return null;
  }
}

/** Prefer API URL; optional CRA env fallbacks if the server omits inviteUrl. */
export function resolveWhatsappInviteUrl(apiInviteUrl, role) {
  const fromApi = typeof apiInviteUrl === 'string' ? apiInviteUrl.trim() : '';
  if (fromApi && /^https?:\/\//i.test(fromApi)) return fromApi;

  const fallback =
    role === 'business'
      ? process.env.REACT_APP_WHATSAPP_GROUP_BUSINESS_URL
      : process.env.REACT_APP_WHATSAPP_GROUP_ARTIST_URL;
  const f = typeof fallback === 'string' ? fallback.trim() : '';
  if (f && /^https?:\/\//i.test(f)) return f;

  return null;
}

/**
 * Navigates the pre-opened tab to the invite, or the current tab if popups were blocked.
 */
export function navigateToWhatsappInvite(inviteUrl, placeholderWindow) {
  const trimmed = typeof inviteUrl === 'string' ? inviteUrl.trim() : '';
  if (!/^https?:\/\//i.test(trimmed)) {
    if (placeholderWindow && !placeholderWindow.closed) placeholderWindow.close();
    return;
  }

  if (placeholderWindow && !placeholderWindow.closed) {
    try {
      placeholderWindow.location.replace(trimmed);
      return;
    } catch {
      placeholderWindow.close();
    }
  }

  window.location.assign(trimmed);
}

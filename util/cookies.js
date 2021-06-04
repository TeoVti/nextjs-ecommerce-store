import cookies from 'js-cookie';

export function getAddedPresetCookieValue() {
  const cookieValue = cookies.getJSON('addedPreset');
  return Array.isArray(cookieValue) ? cookieValue : [];
}

export function toggleBuyPresetByPresetId(presetId) {
  const previousCookieValue = getAddedPresetCookieValue();

  let newCookieValue;

  if (previousCookieValue.includes(presetId)) {
    newCookieValue = previousCookieValue.filter((pid) => pid.id !== presetId);
  } else {
    newCookieValue = [...previousCookieValue, presetId];
  }

  cookies.set('addedPreset', newCookieValue);
  return newCookieValue;
}

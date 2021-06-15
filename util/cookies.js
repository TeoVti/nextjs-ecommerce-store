import cookies from 'js-cookie';

export function getAddedPresetCookieValue() {
  const cookieValue = cookies.getJSON('addedPreset');
  return Array.isArray(cookieValue) ? cookieValue : [];
}

export function addPresetToCookieById(presetId) {
  const newCookieValue = [...getAddedPresetCookieValue()];

  const presetQuantity = newCookieValue.find((pid) => pid.id === presetId);

  if (presetQuantity) {
    presetQuantity.quantity = presetQuantity.quantity + 1;
  } else {
    newCookieValue.push({
      id: presetId,
      quantity: 1,
    });
  }
  cookies.set('addedPreset', newCookieValue);
}

export function removePresetToCookieById(presetId) {
  const newCookieValue = [...getAddedPresetCookieValue()];
  const presetIdInCookie = newCookieValue.find((p) => p.id === presetId);
  const removeId = newCookieValue.findIndex((p) => p.id === presetId);

  if (presetIdInCookie) {
    newCookieValue.splice(removeId, 1);
  } else {
    return newCookieValue;
  }
  cookies.set('addedPreset', newCookieValue);
  return newCookieValue;
}

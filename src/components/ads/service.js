import client from "../../api/client";

const adsBaseUrl = "/api/v1/adverts";

export const getLatestAds = () => {
  const url = `${adsBaseUrl}`;
  return client.get(url);
};

export const createAd = async (ad) => {
  const url = `${adsBaseUrl}`;
  return client.post(url, ad);
};

export const getAd = (adId) => {
  const url = `${adsBaseUrl}/${adId}`;
  return client.get(url);
};
export const deleteAd = (adId) => {
  const url = `${adsBaseUrl}/${adId}`;
  return client.delete(url);
};
export const getTags = () => {
  const url = `${adsBaseUrl}/tags`;
  return client.get(url);
};

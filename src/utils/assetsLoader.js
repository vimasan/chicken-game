import { SPRITES } from '../config/config';

export const loadAssets = async () => {
  const assets = {
    chicken: await loadImages(SPRITES.CHICKEN),
    egg: await loadImages(SPRITES.EGG)
  };

  return assets;
};

export const loadImages = (path) => {
  return new Promise((resolve) => {
    const img = new globalThis.Image();
    img.src = path;
    img.onload = () => {
      resolve(img);
    };
  });
};

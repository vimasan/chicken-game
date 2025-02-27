import { AUDIO, SPRITES } from '../config/config';

export const loadAssets = async () => {
  const assets = {
    chicken: await loadImages(SPRITES.CHICKEN),
    egg: await loadImages(SPRITES.EGG),
    sound: {
      eggLay: await loadAudio(AUDIO.EGG_LAY),
      eggHatch: await loadAudio(AUDIO.EGG_HATCH)
    }
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

export const loadAudio = (path) => {
  return new Promise((resolve, reject) => {
    const audio = new globalThis.Audio(path);
    audio.preload = 'auto';
    audio.oncanplay = () => {
      resolve(audio);
    };
    audio.onerror = reject;
  });
};

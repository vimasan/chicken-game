export const PHYSICS = {
  MAX_SPEED: 2,
  ACCELERATION: 0.1,
  FRICTION: 0.93,
  COLLISION_RADIUS: 36,
  REPEL_FORCE: 1.8,
  TURN_RATE: 0.08,
  EGG_SPAWN_RADIUS: 35,
  BOUNCE_MARGIN: 34,
  BOUNCE_FACTOR: 0.8,
  RANDOM_FORCE: 0.3,
  DIRECTION_CHANGE_INTERVAL: 90
};

export const SPRITES = {
  CHICKEN: 'assets/sprites/chicken.png',
  EGG: 'assets/sprites/egg.png'
};

export const AUDIO = {
  EGG_LAY: 'assets/sounds/eggLay.mp3',
  EGG_HATCH: 'assets/sounds/eggHatch.mp3',
  VOLUME: 0.3
};

export const CHICKEN = {
  EGG_PROBABILITY: 0.003, // 3% de posibilidades de huevo.
  EGG_PROBABILITY_HATCH: 0.3,
  MAX: 100
};

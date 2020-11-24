import { World } from './core/world'

import {
  ShapeRendererSystem,
  TextureRendererSystem,
  KeyVisualizerSystem,
  MovementSystem,
  ColliderSystem,
  KeyVisualizerSystem,
} from './core/systems'

import { pixi } from './gfx/pixi'

export const world = new World()

world.addEntity('player', {
  position: { x: 100, y: 100 },
  movement: { speed: 10 },

  texture: {
    width: 60,
    height: 90,
    src: '/assets/minions.png',
    glowColor: '#fed330',
  },

  collider: {
    enabled: true,
    role: 'target',
    size: 90,
  },
})

world.addEntity('wall', {
  position: { x: 500, y: 800 },
  shape: { type: 'square', size: 300, color: '#fc5c65' },

  collider: {
    enabled: true,
    role: 'target',
    size: 300,

    // onCollision: action('@wall/speedboost'),
  },
})

world.addEntity('game', {
  keyState: {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  },

  timer: {
    enabled: true,
    deltaTime: 0,
    initialTime: Date.now(),
  },
})

world.addSystem(TextureRendererSystem)
world.addSystem(ShapeRendererSystem)
world.addSystem(MovementSystem)
world.addSystem(ColliderSystem)
world.addSystem(KeyVisualizerSystem)

world.addSystem({
  onSetup: (e, w) => {
    if (!pixi) return

    document.body.appendChild(pixi.view)
    pixi.renderer.backgroundColor = 0x2d2d30

    const game = world.get('game').data

    document.addEventListener('keydown', (e) => {
      game.keyState[e.key] = true
    })

    document.addEventListener('keyup', (e) => {
      game.keyState[e.key] = false
    })
  },
})

world.start()

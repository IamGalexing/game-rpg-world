class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      width: levelCfg.map[0].length,
      height: levelCfg.map.length,
    });
  }

  init() {
    const { map } = this.levelCfg;
    map.forEach((cfgRow, y) => {
      cfgRow.forEach((cfgCell, x) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', cfgCell[0]],
          frame: 0,
          x: x * 48,
          y: y * 48,
          w: 48,
          h: 48,
        });
      });
    });
  }
}
export default ClientWorld;

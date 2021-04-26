# kaboom-platformer-plugin

This plugin currently adds three components to the kaboom library.

The first component is called playerControls and it takes an argument for velocity, which is the speed the player should move.
It adds several properties to the player game object and a tag called 'player' to handle the logic required to move with moving platforms.

A player with the playerControls component also requires a body and a pos component.

The next two componets are for moving platforms.

The first is horizontal(), which takes a config object with a distance and a speed.  The distance is how far you want the platform to move and the speed is how fast
the platform will move.

Platforms with the horizontal or vertical platform will be given a tag of 'platform' and properties that are used to move the player with the platform.

A platform with the vertical or horizontal component requires a pos component.

Example:

const player = add([
  sprite('player'),
  pos(0, 0),
  body(),
  playerControls(200)
]);

const horizontalPlatform = add([
  sprite('platform'),
  pos(width() / 2, height() / 2),
  horizontal({ distance: 120, speed: 100 })
]);

const verticalPlatform = add([
  sprite('platform'),
  pos(width() / 2, 10),
  vertical({ distance: 120, speed: 100 })
]);

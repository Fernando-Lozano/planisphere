#About
This project will automatically display the starry sky relative to the user's latitude using starwheels made by Dominic Ford.

#To run python scripts:
activate virtualenv with:
  source ~/projects/environments/planisphere/bin/activate
deactivate virtualenv with:
  deactivate

imgPaths.json contains all latitudes and also a decimal number that is the ratio from the bottom of the holder image that the starwheel needs to center on.

On the holder, 12AM is 270 degrees in polar coordinates. For north latitudes, the clockwheel goes counter-clockwise, and for south latitudes the clockwheel goes clockwise.

On the starwheel, North latitudes the months go clockwise on the wheel, and South latitudes the months go counter-clockwise.
Todo:
  make website functional:
    re-factor init function
    load correct image relative to users latitude (this is slow)
      try to make more effecient or have user choose their latitude.
    rotate starwheel at intervals relative to time
    allow for swiping to turn the planisphere
    after inactivity re-align the planisphere

  remove green circle in images
  find desired color scheme
  output all latitudes of data

Idea:
  Right now I have the point where the starwheel needs to center highlighted in green.
  I think I will find the hight of the green circle relative to the hight of that image, and center the starwheel image to that.

  Once it is fully functioning, I think I will have only the window displayed on the webiste and size everything to the starwheel(Much easier aproach for preserving aspect ratios I think).

  add a helpers script to break up the code
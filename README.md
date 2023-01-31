# Product Specification

## Frontend
- Landing page
- Art gallery:
    - Visually customisable
    - Invite others to view it via email
    - Can trade with other users
    - Can set up auctions to sell your artwork
    - 3D navigatbale space using three.js
- Art generator:
    - Connects to a websocket workspace that lets you:
        - Generate images from scratch with prompt assits
        - Edit images using instruct-pix2pix
        - Add images to your gallery
        - Mint your artwork as an NFT 
- Augmented reality app:
    - Pin your artwork at locations around the world where others who use the AR app and look at the same thing can see the artwork you've pinned up

## Backend
- S3 bucket to store the generated artwork
- Websocket server that manages the art generator sessions (built on forked)
- A way to easily add models to the backend websocket manager 
- Ability to convert artwork into NFTS
- Abiltiy to purchase the art generation tokens using fiat (stripe) or crypto

## Deep learning
- Build some of the models yourself eg: style transfer and train in the cloud
- Fine tune instruct-pix2pix some more (extra marks)
- Find ways to gather data

## TODO:
- Get the websocket backend working:
    - User can create a session booting up a model
    - User can inference the various models

- Frontend:
    - Gallery:
        - Switch from loop based animation to event based update ie: should only rerender frames when user walk around ie: not every second


## Gallery setup and design:
    - Uses a list called updateables that hold objects with a tick function that is called every frame update (note only objects that need updating require this)



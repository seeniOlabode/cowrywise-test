# Cowrywise Frontend Engineer Test

This project is a mini unsplash, users can load photos and search photos from the unsplash API.

This solution prioritizes routes for a shareable and navigable search experience. The preview mode also prioritizes a full view of the photo without cropping it. The tradeoff is that the preview modal takes the size of the smaller resolution photo (shown in place before the main image loads), adding some friction to the modal reveal animation, after that it's smooth sailing.

Pay attention to how the long portrait photo below displays without cropping:
<img width="1680" alt="Screen Shot 2024-10-09 at 8 08 54 AM" src="https://github.com/user-attachments/assets/fab7cd93-caee-4929-af86-45089a6de330">

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

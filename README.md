# Hey There 

This project is a mini unsplash, users can load photos and search photos from the unsplash API.

This solution prioritizes using route queries for a shareable and navigable search experience. The preview mode also prioritizes a full view of the photo without cropping it. The tradeoff is that the preview modal takes the size of the smaller resolution photo (shown in place before the main image loads), adding some friction to the modal reveal animation, after that it's smooth sailing.

Pay attention to how the long portrait photo below displays without cropping:

<img width="1680" alt="Screen Shot 2024-10-09 at 8 08 54 AM" src="https://github.com/user-attachments/assets/fab7cd93-caee-4929-af86-45089a6de330">

This is an important consideration for a photo displaying website, photographers provide different photos, in different orientations, we ensure that those photos are displayed to their audience in their full glories.

The Mobile view was also given strong consideration, the preview is shifted to full screen and bottom sheet:

https://github.com/user-attachments/assets/d2a6a3c9-7ef1-41e1-b4ac-fac989803efc




## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

 const imageContainer = document.getElementById('image-container');
            const loader = document.getElementById('loader');

            let ready = false;
            let loadedImages = 0;
            let totalImages = 0;
            let pictureArr = [];

            // Fetching Unsplash API
            const count = 10
            // You shouldn't store API Keys publicly like this, but this is an exception because it is free and the data are anyways available.
            const APIkey = config.APIkeySplash
            const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${APIkey}&count=${count}&query=${query};`

            // Check if all the images are loaded (total) to hide the loaded
            function isLoaded() {
                loadedImages++;
                if (loadedImages === totalImages) {
                    ready = true;
                    loader.hidden = true;
                }
            }

            // Helper Function to Set Attributes on DOM Elements
            function setAttributes(element, attributes) {
                for (const key in attributes) {
                    element.setAttribute(key, attributes[key]);
                }
            }



            // Create <a>Link and add to DOM
            function showPictures() {
                loadedImages = 0;
                //get number of images loaded from API
                totalImages = pictureArr.length;
                //for each object in pictureArr
                pictureArr.forEach((photo) => {
                    // Create link to original photo (to see the full picture and the original author)
                    const item = document.createElement('a');
                    setAttributes(item, {
                        href: photo.links.html,
                        target: '_blank',
                    });
                    // Create <img> for photo
                    const img = document.createElement('img');
                    setAttributes(img, {
                        src: photo.urls.regular,
                        alt: photo.alt_description,
                        title: photo.alt_description,
                    });
                    // Event Listener, check when each is finished loading
                    img.addEventListener('load', isLoaded);
                    // add to imageContainer div
                    item.appendChild(img);
                    imageContainer.appendChild(item);
                });
            }

            // Get photos function from API
            async function getPhotos() {
                try {
                    const response = await fetch(apiUrl);
                    pictureArr = await response.json();
                    showPictures();
                } catch (error) {
                    console.log(error);
                }
            }

            // Check to see if scrolling near bottom of page, Load More Photos
            window.addEventListener('scroll', () => {
                if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
                    ready = false;
                    getPhotos();
                }
            });

            // After Loading
            
           setTimeout(function () {
                  getPhotos();
                }, 1500);

            

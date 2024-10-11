import requests
from keys import UNSPLASH_ACCESS_KEY


def get_random_unsplash_image():
    access_key = UNSPLASH_ACCESS_KEY
    width = 650  # Set quality to 650px or more (1:1 ratio)
    height = 650

    url = f"https://api.unsplash.com/photos/random?client_id={access_key}&w={width}&h={height}"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses
        data = response.json()
        return data['urls']['regular']  # Return the URL of the image
    except requests.exceptions.RequestException as e:
        print(f"Error fetching random image: {e}")
        return None


def get_image_as_bytes(image_url):
    try:
        response = requests.get(image_url)
        response.raise_for_status()  # Check if the request was successful
        return response.content  # This will return the image as bytes
    except requests.exceptions.RequestException as e:
        print(f"Error fetching image: {e}")
        return None

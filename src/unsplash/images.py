import requests
from keys import UNSPLASH_ACCESS_KEY


def get_random_unsplash_image():
    access_key = UNSPLASH_ACCESS_KEY
    width = 650
    height = 650

    url = f"https://api.unsplash.com/photos/random?client_id={access_key}&w={width}&h={height}&q=portrait"  # Optional: Filter by "portrait" (may not guarantee profile pics)

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data['urls']['regular']
    except requests.exceptions.RequestException as e:
        print(f"Error fetching random image: {e}")
        return None


def get_image_as_bytes(image_url):
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        return response.content
    except requests.exceptions.RequestException as e:
        print(f"Error fetching    image: {e}")
        return None


if __name__ == "__main__":
    image_url = get_random_unsplash_image()

    if image_url:
        image_bytes = get_image_as_bytes(image_url)
        if image_bytes:
            # Use the image bytes for your purpose (e.g., display, store)
            print("Image retrieved successfully!")
        else:
            print("Error getting image bytes.")
    else:
        print("Error fetching random image.")
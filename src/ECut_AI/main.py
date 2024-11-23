import re

def standardize_maps_url(url, zoom_level=15):
    # Extract fixed coordinates (3d=latitude and 4d=longitude)
    dynamic_coords = re.search(r'@([-.\d]+),([-.\d]+),([\d.]+)z', url)

    print(dynamic_coords)

    if dynamic_coords:
        lat, lng, _ = dynamic_coords.groups()  # Extract latitude, longitude
        # Build the standardized URL with the new zoom level
        print("Lat:", lat, "Lng: ",  lng, "\n")
        standardized_url = f"https://www.google.com/maps/@{lat},{lng},{zoom_level}z"
        return standardized_url
    return url

# Example usage
urls = [
    "https://www.google.com/maps/place/Mbun+Brownies+Panggang+Jakarta/@-6.2072282,106.7843938,15.46z/data=!4m6!3m5!1s0x2e69f6e08288ee5b:0x455b3862d9996e0c!8m2!3d-6.2066368!4d106.7850514!16s%2Fg%2F11f0_grg2s?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D",
    "https://www.google.com/maps/place/Mbun+Brownies+Panggang+Jakarta/@-6.2073009,106.7847409,15z/data=!4m6!3m5!1s0x2e69f6e08288ee5b:0x455b3862d9996e0c!8m2!3d-6.2066368!4d106.7850514!16s%2Fg%2F11f0_grg2s?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D"
]

standardized_urls = [standardize_maps_url(url) for url in urls]

for url in standardized_urls:
    print(url)

#!/usr/bin/env python3
"""Process partner logos: remove backgrounds, standardize height, save as transparent PNGs."""

from PIL import Image
import os

TARGET_HEIGHT = 40  # px — uniform height for all logos

SOURCES = [
    ("aws",         os.path.expanduser("~/Downloads/aws-color.png"),         "white"),
    ("azure",       os.path.expanduser("~/Downloads/azure-color.png"),       "white"),
    ("databricks",  os.path.expanduser("~/Downloads/dbrx-color.png"),        "white"),
    ("nvidia",      "/Users/greggeiler/Developer/D8:WEBSITE/public/images/nvidia-inception-program-badge-rgb-for-screen.png", "auto"),
    ("google-cloud",os.path.expanduser("~/Downloads/googlecloud-color.png"), "white"),
]

OUT_DIR = "/Users/greggeiler/Developer/D8:WEBSITE/public/images/partners"


def remove_bg(img: Image.Image, bg_mode: str, tolerance: int = 30) -> Image.Image:
    """Remove solid background color, returning RGBA image with transparency."""
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size

    if bg_mode == "white":
        bg_color = (255, 255, 255)
    elif bg_mode == "auto":
        # Sample the four corners and pick the most common
        corners = [pixels[0, 0], pixels[w-1, 0], pixels[0, h-1], pixels[w-1, h-1]]
        rgb_corners = [c[:3] for c in corners]
        from collections import Counter
        bg_color = Counter(rgb_corners).most_common(1)[0][0]
    else:
        bg_color = bg_mode  # tuple passed directly

    br, bg, bb = bg_color[:3]

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if abs(r - br) <= tolerance and abs(g - bg) <= tolerance and abs(b - bb) <= tolerance:
                pixels[x, y] = (r, g, b, 0)

    return img


def trim_and_resize(img: Image.Image, target_height: int) -> Image.Image:
    """Auto-crop transparent border then resize to target height."""
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    w, h = img.size
    new_w = round(w * target_height / h)
    return img.resize((new_w, target_height), Image.LANCZOS)


os.makedirs(OUT_DIR, exist_ok=True)

for name, src_path, bg_mode in SOURCES:
    out_path = os.path.join(OUT_DIR, f"{name}.png")
    if not os.path.exists(src_path):
        print(f"SKIP {name}: source not found at {src_path}")
        continue
    img = Image.open(src_path)
    img = remove_bg(img, bg_mode)
    img = trim_and_resize(img, TARGET_HEIGHT)
    img.save(out_path, "PNG")
    print(f"OK   {name}: {img.size} → {out_path}")

print("Done.")

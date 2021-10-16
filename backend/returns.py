from conversion import conversion
from area import areas
from overlay import overlay
import cv2
import math

def returns(loc1 = (1.3539504607263098, 103.68779725423865),loc2 =(1.353934978563778, 103.68775499966486),
            imgPath = "test1.png", bitmapPath = "bitmap.jpg"):

    overlay(imgPath, "imgOverlay.jpg", bitmapPath)

    bitmapImg = cv2.imread(bitmapPath)
    area, maxwActl, heightActl = areas(bitmapImg, 111111*math.dist(loc1,loc2)) # approx estimation as lat and lng are near the equator for 111,111
    BaseTemp, NewTemp, monthEnergy = conversion(loc1, loc2, maxwActl, heightActl)

    return BaseTemp, NewTemp, area, monthEnergy

if __name__== "__main__":
    BaseTemp, NewTemp, area, monthEnergy = returns()
    print("Base Temp =", BaseTemp)
    print("New Temp =", NewTemp)
    print("Area Calculate =", area)
    print("Energy Used in a Month =", monthEnergy)
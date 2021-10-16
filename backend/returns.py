from conversion import conversion
from area import areas
from overlay import overlay
import cv2
import math

def returns(loc1 = (1.3539504607263098, 103.68779725423865),loc2 =(1.3539461235261003, 103.68765894647215),
            imgPath = "test1.png", bitmapPath = "ntubitmap.jpg"):

    overlay(imgPath, "imgOverlay2.jpg", bitmapPath)

    bitmapImg = cv2.imread(bitmapPath)
    area, maxwActl, heightActl = areas(bitmapImg, math.dist(loc1,loc2))
    BaseTemp, NewTemp, monthEnergy = conversion(loc1, loc2, maxwActl, heightActl)

    return BaseTemp, NewTemp, area, monthEnergy

if __name__== "__main__":
    BaseTemp, NewTemp, area, monthEnergy = returns()
    print("Base Temp =", BaseTemp)
    print("New Temp =", NewTemp)
    print("Area Calculate =", area)
    print("Energy Used in a Month =", monthEnergy)
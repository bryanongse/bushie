import cv2
import numpy as np
import math

#input == bitmap, depth in meters
def areas(img,depth):

    def hw(img):
        maxw = 0
        for x in range((img.shape[0])):
            for y in range((img.shape[1])):
                if img[x,y, 0] == 8:
                    start = y
                    break
            for y in range(img.shape[1]-1,start,-1):
                if img[x, y, 0] == 8:
                    stop = y
                    break
            if abs(start-stop)>maxw:
                maxw = abs(start-stop)

        maxh = 0
        for y in range((img.shape[1])):
            for x in range((img.shape[0])):
                if img[x,y, 0] == 8:
                    start = x
                    break
            for x in range(img.shape[0]-1,start,-1):
                if img[x, y, 0] == 8:
                    stop = x
                    break
            if abs(start-stop)>maxh:
                maxh = abs(start-stop)

        return (maxw,maxh)

    areaPixel = np.count_nonzero(img == 8)
    maxw, maxh = hw(img)

    actlSize = ( (0.28 * maxh) / depth) # focal length, cm
    multiplier = actlSize/maxh

    area = areaPixel*(multiplier**2)
    maxwActl = maxw*multiplier
    print(depth)
    print("maxw", maxw)
    print("maxh", actlSize)
    print(multiplier, "multiplier")

    return(area, maxwActl, actlSize)

if __name__== "__main__":
    bitmapImg = cv2.imread("test1.png")
    area, maxwActl, heightActl = areas(bitmapImg, 111111*math.dist((1.3539504607263098, 103.68779725423865),(1.353934978563778, 103.68775499966486))) # 111,111 is an approximation for lat and lng near the equator

    print("Area = ", area)
    print("width", maxwActl)
    print("height", heightActl)
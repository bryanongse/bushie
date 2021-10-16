import cv2
import numpy as np

#input == bitmap, depth in meters
def areas(img,depth):

    def hw(img):
        maxh = 0
        for x in range((img.shape[0])):
            for y in range((img.shape[1])):
                if img[x,y, 0] == 8:
                    start = y
                    break
            for y in range(img.shape[1]-1,0,-1):
                if img[x, y, 0] == 8:
                    stop = y
            if abs(start-stop)>maxh:
                maxh = start-stop

        maxw = 0
        for y in range((img.shape[1])):
            for x in range((img.shape[0])):
                if img[x,y, 0] == 8:
                    start = x
                    break
            for x in range(img.shape[0]-1,0,-1):
                if img[x, y, 0] == 8:
                    stop = x
            if abs(start-stop)>maxw:
                maxw = start-stop

        return (maxw,maxh)

    areaPixel = np.count_nonzero(img == 8)
    maxw, maxh = hw(img)
    actlSize = (0.004 * maxh) / depth
    multiplier = actlSize/maxh
    area = areaPixel*(multiplier**2)
    maxwActl = maxw*maxh

    return(area, maxwActl, actlSize)

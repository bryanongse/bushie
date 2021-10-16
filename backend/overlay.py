import cv2
import numpy as np
import math
import os

def overlay(preprocess = "test1.png", overlay = "imgOverlay.jpg", bitmap = "bitmap.jpg"):


    img = cv2.imread(preprocess)
    overlay = cv2.imread(overlay)
    bitmap = cv2.imread(bitmap)


    noOfHzTile = math.ceil(img.shape[1]/overlay.shape[1])
    noOfVrTile = math.ceil(img.shape[0]/overlay.shape[0])

    # print(overlay.shape)
    # print(img.shape)
    # print(bitmap.shape)

    tiledOverlay = np.tile(overlay,(noOfVrTile, noOfHzTile, 1))

    for x in range( (bitmap.shape[0]) ):
        for y in range( (bitmap.shape[1]) ):
            if bitmap[x,y,0] == 8:
                for i in range(3):
                    img[x,y,i] = tiledOverlay[x,y,i]
            else:
                continue

    #img = cv2.resize(img, (img.shape[1]//4, img.shape[0]//4))
    cv2.imshow('test', img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    #cv2.imwrite(os.path.join(os.getcwd(), "final.png"), img)

if __name__== "__main__":
    overlay()
import math
def conversion(loc1, loc2, length, height):

    angle = math.atan2(loc2[1]-loc1[1], loc2[0]-loc1[0])

    '''Temperature Calculations'''
    avgTemp = 27 # Correlating indoor and outdoor temperature and humidity in a sample of buildings in tropical climates
    orientationMultiplier = 1.01 # Effect Of Orientation On Indoor Temperature Case Study: Yekape Penjaringansari Housing in Surabaya

    angle = angle-180 if (angle>180) else angle # normalise to 180
    BaseTemp = avgTemp + abs(math.sin(angle)) * orientationMultiplier # to incl: UHI impacts
    NewTemp = BaseTemp - 2 # Thermal evaluation of vertical greenery systems for building walls


    '''Energy Calculations'''
    airHeatCapacity = 1012 # j/(kg K)
    airDensity = 1.225 # kg/m^3
    roomVol = length**2 * height
    btuConversion = 1/1055
    energyEfficentRatio = 9 # BTU/watt

    BTU = 2 * airDensity * roomVol * airHeatCapacity * btuConversion
    wattHour = BTU/energyEfficentRatio
    dayEnergy = wattHour*24
    monthEnergy = dayEnergy*30

    return (BaseTemp, NewTemp, monthEnergy)

import math
def conversion(loc1, loc2, length, height):

    angle = math.degrees(math.atan2(loc1[0]-loc2[0], loc1[1]-loc2[1]))

    '''Temperature Calculations'''
    avgTemp = 27 # Correlating indoor and outdoor temperature and humidity in a sample of buildings in tropical climates
    orientationMultiplier = 1.01 # Effect Of Orientation On Indoor Temperature Case Study: Yekape Penjaringansari Housing in Surabaya

    angle = angle-180 if (angle>180) else angle # normalise to 180
    BaseTemp = avgTemp + abs(math.cos(angle)) * orientationMultiplier # to incl: UHI impacts
    NewTemp = BaseTemp - 2 # Thermal evaluation of vertical greenery systems for building walls


    '''Energy Calculations'''
    airHeatCapacity = 1012 # j/(kg K)
    airDensity = 1.225 # kg/m^3
    roomVol = length**2 * height
    btuConversion = 1/1055
    energyEfficentRatio = 10 # BTU removed per hour/watt drawn


    BTU = 2 * airDensity * roomVol * airHeatCapacity * btuConversion # Q = (Change in temp) * (Mass) * (Heat capacity)
    wattHour = BTU/energyEfficentRatio
    dayEnergy = wattHour*24
    monthEnergy = dayEnergy*30

    return (BaseTemp, NewTemp, monthEnergy)

if __name__== "__main__":
    BaseTemp, NewTemp, monthEnergy = conversion((1.3539504607263098,103.68779725423865)
                                                             , (1.3539566667549052, 103.68758550537318),
                                                             26.9677, 47.9519)
    print("Base Temp =", BaseTemp)
    print("New Temp =", NewTemp)
    print("Energy Used in a Month =", monthEnergy)